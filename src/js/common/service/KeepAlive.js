/**
 * Created by jamie on 20/01/15.
 */
define(function (require) {
    var HttpResponse = require('trading/services/HttpResponse');

    return Marionette.Controller.extend({
        keepAliveInterval: 10 * 1000,
        reconnectInterval: 12 * 1000,


        /**
         *
         */
        initialize: function() {
            _.bindAll(this, 'onSessionStarted', 'onSessionEnded', 'onKeepAliveSuccess', 'onKeepAliveFail');

            this.vent = ctx.get('vent');
            this.sessionModel = ctx.get('sessionModel');
            this.service = ctx.get('apiService');

            this.listenTo(this.vent, 'session:loggedin', this.onSessionStarted);
            this.listenTo(this.vent, 'session:loggedout', this.onSessionEnded);

            // if already logged in, start keepalive
            if (this.sessionModel.isLoggedIn())
                this.onSessionStarted();
        },


        /**
         * When a session is validated, start the keep alive request
         */
        onSessionStarted: function() {
            console.log('KeepAlive :: Started');
            this.keepAlive();
        },


        /**
         *
         */
        onSessionEnded: function() {

        },


        /**
         * Action the keep alive request
         */
        keepAlive: function() {
            if (this.sessionModel.isNotLoggedIn()) return;
            if (App.Config.client == 'Coral') return;
            var promise, that = this;

            _.delay(function() {
                promise = that.service.keepAlive();
                promise.then(that.onKeepAliveSuccess, that.onKeepAliveFail);
                console.log('KeepAlive :: Ok');
            }, this.keepAliveInterval);
        },


        /**
         * @param resp
         */
        onKeepAliveSuccess: function(resp) {
            if (HttpResponse.isNotLoggedIn(resp)) {
                this.vent.trigger('error:notLoggedIn');
                return;
            }
            this.keepAlive();
        },


        /**
         * @param er
         */
        onKeepAliveFail: function(er) {
            this.vent.trigger('error:notLoggedIn');
            console.log('KeepAlive :: Fail');
        }
    });
});


