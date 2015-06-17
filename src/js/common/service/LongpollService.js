define(function(require) {
	
    var ATSLongpoll = require('common/framework/service/ATSLongpoll'),
        ContextFactory = require('common/factory/ContextFactory'),
        Command =  require('common/framework/command/Backbone.Command');
    
    return ATSLongpoll.extend({
        
        betsyncToken: null,
        betsyncTokenBackup: null,
        pollStopped : true,
        pingFailuresCount : 0,
        
        pendingRequests : {loginUser : null, subscribe : []},

        initialize: function() {
            ContextFactory.satisfy(this, this.dependencies);
            ATSLongpoll.prototype.initialize.call(this);
        },
        
        /**
         * starts the longpoll service
         */
        start: function() {
        	this.trigger("streaming:open");
        },

        /**
         * sends ping messages to server.
         * also decides if a restart of longpoll service is required based on ping responses.
         */
        keepAlive: function() {
        	var $this = this;
        	
        	if (this.betsyncToken == null && this.betsyncTokenBackup == null) {
        		this.vent.trigger('app:log', 'longpoll :: token null, restarting streaming');
        		this.start();
        		return;
        	}
        	
        	if (this.betsyncTokenBackup == null) {
        		//polling is being done, ping not required
        		return;
        	}
        	
        	this.ping(this.betsyncTokenBackup)
	        	.done(function(r){
	        		if ($this.betsyncToken == null) {
	        			//connection re established with old token
	        			$this.betsyncToken = $this.betsyncTokenBackup;
	        			if ($this.pollStopped) {
	        				$this.poll();
	        			}
	        			$this.betsyncTokenBackup = null;
	        		}
	        	})
	        	.fail(function(r, xhr){
	        		if (xhr.status != 200) {
		        		$this.betsyncToken = null;
		        		
		        		if (xhr.status == 401 || $this.pingFailuresCount > 5) {
		        			//error is unauthorized, setting betsyncTokenBackup= null will force restart during next poll
		        			$this.betsyncTokenBackup = null;
		        			$this.pingFailuresCount = 0;
		        		}
		        		else {
		        			$this.pingFailuresCount = $this.pingFailuresCount + 1
		        		}
		        		
	        		}
	        	});
        },
        
        
        onFailure: function() {
        	//set betsyncTokenBackup so that ping will take place
        	this.betsyncTokenBackup = this.betsyncToken;
        	this.betsyncToken = null;
        	this.pollStopped = true;
        },
        
        /**
         * upgrades the public login
         */
        loginUser: function(obj) {
        	var $this = this;
        	
        	if (this.betsyncToken == null) {
        		this.vent.trigger('app:log', 'longpoll :: BetsyncToken not available. adding to pending list');
        		this.pendingRequests.loginUser = obj;
        		return;
        	}
        	
        	this.upgrade(obj.UpgradePublicLoginRequest.username, obj.UpgradePublicLoginRequest.accountId)
	        	.done(function(r){
	        		$this.vent.trigger('app:log', 'longpoll :: User login successful');
	        	})
	        	.fail(function(r, xhr){
	        		if (xhr.status !=  200) {
    	        		$this.vent.trigger('app:log', 'longpoll :: user login Failed');
    	        		$this.onFailure();
	        		}
	        	});
        },

        /**
         * does a public login and gets the betsynctoken back
         */
        requestPublicLogin: function(obj) {
        	var $this = this;
        	
        	var r = obj.PublicLoginRequest;
        	
        	this.connect(r.locale, r.channel, r.application, r.apiVersion)
	        	.done(function(r){
	        		$this.vent.trigger('app:log', 'longpoll :: public login successful');
	        		
	        		$this.betsyncToken = r.BetsyncToken;
	        		$this.betsyncTokenBackup = null; 
        			if ($this.pollStopped) {
        				$this.poll();
        			}
        			$this.replayPendingMessages();
	        		$this.vent.trigger('streaming:publicLoginComplete');
	        	})
	        	.fail(function(r){
	        		$this.vent.trigger('app:log', 'longpoll :: PublicLogin Failed');
	        	});
        },
        
        replayPendingMessages: function() {
        	var requests = this.pendingRequests;
        	this.pendingRequests = {loginUser : null, subscribe : []};
        	
        	if (requests.loginUser) {
        		this.loginUser(requests.loginUser);
        	}
        	
        	_.each(requests.subscribe, this.subscribe, this);
        },
        
        /**
         * subscribes to topics, only if betsynctoken is available
         */
        subscribe: function(topics) {
        	var $this = this;
        	
        	if (topics == null || topics instanceof Object) {
        		return;
        	}
        	
        	if (this.betsyncToken == null) {
        		this.vent.trigger('app:log', 'longpoll :: BetsyncToken not available. adding to pending list');
        		this.pendingRequests.subscribe.push(topics);
        		return;
        	}
        	
        	this.subscriptions(topics)
	        	.done(function(r){
	        		$this.vent.trigger('app:log', 'longpoll :: subscription successful');
	        	})
	        	.fail(function(r, xhr){
	        		if (xhr.status !=  200) {
    	        		$this.vent.trigger('app:log', 'longpoll :: subscription Failed');
    	        		$this.onFailure();
	        		}
	        	});
        },
        
        /**
         * polls for messages from server.
         * server returns this call when there are any messages or when poll request is timed out
         */
        poll : function() {
        	var $this = this;
        	
        	if (this.betsyncToken == null) {
        		this.vent.trigger('app:log', 'longpoll :: BetsyncToken not available. not doing polling');
        		this.pollStopped = true;
        		return;
        	}
        	
        	this.pollStopped = false;
        	
        	setTimeout(function () {
        		
        		$this.messages()
    	        	.done(function(r){
    	        		$this.vent.trigger('app:log', 'longpoll :: messages successful');

    	        		$this.poll();
    	        		
    	        		var emptyMessage = r.msg != null && r.msg == '';
    	        		
    	            	if (!emptyMessage) {
    	            		$this.trigger("streaming:message", r);
    	        		}

    	        	})
    	        	.fail(function(r, xhr){
    	        		if (xhr.status !=  200) {
        	        		$this.vent.trigger('app:log', 'longpoll :: messages Failed : ' + JSON.stringify(r));
        	        		$this.onFailure();
    	        		}
    	        		else {
    	        			$this.poll();
    	        		}
    	        	});
        		
            }, 1);
        },
        
    });
});


