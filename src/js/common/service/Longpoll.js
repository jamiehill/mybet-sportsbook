define(function (require) {
    var Service = require('trading/framework/Backbone.Service');
    return Service.extend({
        dependencies: 'url=lpendpoint, session=sessionModel, appid, vent',

        defaults: {
            application: function() {
                return this.appid;
            },
		    locale: function() {
		        return App.Globals.locale;
		    },
		    channelId: function() {
		        return App.Globals.channel;
		    },
		    betsyncToken: function() {
		        return this.betsyncToken;
		    },
        },

        targets: {

        	connect: {
                method: 'post',
                args: [
                       'locale',
                       'channel',
                       'application',
                       'apiVersion',
                       {connectionType: 'HTTP_LONG_POLL'},
                       {format: 'JSON'}

                ]
            },

        	upgrade: {
                method: 'post',
                args: [
                       'username',
                       'accountId',
                       {connectionType: 'HTTP_LONG_POLL'},
                       {format: 'JSON'},
                       {sessionToken: {attr : 'betsyncToken'}}
                ]
            },

        	ping: {
                method: 'post',
                args: [
                       'sessionToken',
                       {connectionType: 'HTTP_LONG_POLL'},
                       {format: 'JSON'}//,
                       //{sessionToken: {attr : 'betsyncToken'}}
                ]
            },

        	close: {
                method: 'post',
                args: [
                       {connectionType: 'HTTP_LONG_POLL'},
                       {format: 'JSON'},
                       {sessionToken: {attr : 'betsyncToken'}}
                ]
            },

        	messages: {
                method: 'post',
                args: [
                       {connectionType: 'HTTP_LONG_POLL'},
                       {format: 'JSON'},
                       {sessionToken: {attr : 'betsyncToken'}}
                ]
            },

            subscriptions: {
                method: 'post',
                args: [
                       'topics',
                       {connectionType: 'HTTP_LONG_POLL'},
                       {format: 'JSON'},
                       {sessionToken: {attr : 'betsyncToken'}}
                ]

            },

            subscriptionsUpgrade: {
                method: 'post',
                args: [
                       'topics',
                       {connectionType: 'HTTP_LONG_POLL'},
                       {format: 'JSON'},
                       { sessionToken: {attr : 'betsyncToken'}}
                ]

            }
        }
    });
});


