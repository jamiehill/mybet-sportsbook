define(function(require) {
    var ATSWebSocket = require('common/framework/service/ATSWebSocket'),
        ContextFactory = require('common/factory/ContextFactory');
    return ATSWebSocket.extend({
        
        PUBLIC_LOGIN_REQ_ID: 0,
        KEEP_ALIVE_REQ_ID: 1,
        USER_LOGIN_REQ_ID: 2,
        
        defaults: {
            sessionToken: function() {
                return this.session.getSessionToken();
            },
            application: function() {
                return this.appid;
            }
        },

        initialize: function() {
            ContextFactory.satisfy(this, this.dependencies);
            ATSWebSocket.prototype.initialize.call(this);
        },
        
        start: function() {
        	this.connect();
        },

        keepAlive: function() {
            this.sendKeepAlive();
        },
        
        loginUser: function(obj) {
            obj.UpgradePublicLoginRequest.reqId = this.USER_LOGIN_REQ_ID;
            this.send(JSON.stringify(obj));

        },

        requestPublicLogin: function(obj) {
            obj.PublicLoginRequest.reqId = this.PUBLIC_LOGIN_REQ_ID;
            this.send(JSON.stringify(obj));
        },
        
        subscribe: function(data) {
        	this.send(data);
        },
        
        parseMessage: function(data) {
            //this.vent.trigger('app:log', 'WS DATA RECEIVED ' + JSON.stringify(data));
            if (_.has(data, 'Response')) {
                var status = data.Response.status;
                var lowerError = status.toLowerCase();
                if (lowerError == 'error') {
                    this.throwError('There is a problem with the WebSocket');
                    return;
                }
                var reqId = data.Response.reqId;
                if (reqId == this.PUBLIC_LOGIN_REQ_ID) {
                    this.vent.trigger('streaming:publicLoginComplete');
                    return;
                }
                else if (reqId == this.KEEP_ALIVE_REQ_ID) {
                    return;
                }
            }
            
            this.trigger("streaming:message", data);
            
        },
        
    });
});


