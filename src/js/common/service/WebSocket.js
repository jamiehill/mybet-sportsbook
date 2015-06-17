define(function (require) {
    var Marionette = require('marionette');
    return Marionette.Controller.extend({
        
        dependencies: 'url=wsendpoint, session=sessionModel, appid, vent',
        socket:null,
        pendingMessages: [],


        /**
         *
         */
        initialize: function() {
            _.bindAll(this, 'onOpen', 'onClose', 'onError' , 'onMessage');
        },


        /**
         * Initiate the socket
         */
        connect: function() {
            this.socket = this.ConnectSocket();
            this.socket.onopen = this.onOpen;
            this.socket.onmessage = this.onMessage;
            this.socket.onclose = this.onClose;
            this.socket.onerror = this.onError;
        },


        /**
         * Disconnect the socket
         */
        close: function() {
            this.socket.close();
        },


        /**
         * Send a message across the socket
         * @param data
         */
        send: function(data) {
            // WebSocket.OPEN
            if (this.socket.readyState == WebSocket.OPEN)
                this.socket.send(data);

            else {
                // WebSocket.CONNECTING:
                // WebSocket.CLOSING:
                // WebSocket.CLOSED:
                // socket not ready so add to pending messages
                this.pendingMessages.push(data);
            }
        },


        /**
         * Handlers --------------------------------------------------------
         */


        /**
         * Handle socket onOpen events
         */
        onOpen: function(event) {
            this.vent.trigger('app:log', 'Websocket :: Open');
            this.trigger("streaming:open");
        },


        /**
         * handle received socket messages
         */
        onMessage: function(event) {
            var data = JSON.parse(event.data);

            if (_.has(data, 'error')) {
                this.throwError(data.error);
                return;
            }

            if (_.has(data, 'Response')) {
                if (data.Response.reqId == this.PUBLIC_LOGIN_REQ_ID) {
                    this.vent.trigger('app:log', 'Websocket :: PublicLogin - success');
                    this.sendPendingMessages();
                }
            }

            this.parseMessage(data);
        },


        /**
         *
         */
        onClose: function(event) {
            this.vent.trigger('app:log', 'Websocket :: Closed');
        },


        /**
         * Handle socket error events
         */
        onError: function(err) {
            this.throwError(err);
        },


        /**
         * Private --------------------------------------------------------
         */

        /**
         * @returns {WS}
         * @constructor
         */
        ConnectSocket: function() {
            // clean up any previous socket
            if (this.socket) {
                this.socket.close();
                delete this.socket.onopen;
                delete this.socket.onmessage;
                delete this.socket.onclose;
                delete this.socket.onerror;
            }


            // decide which type of socket we should use
            var WS = "MozWebSocket" in window ? 'MozWebSocket' : "WebSocket";

            // and return a new instance
            return new window[WS](this.url);
        },


        /**
         * Abstract method. Override in Subclass.
         * @param data
         */
        parseMessage: function(data) {

        },


        /**
         * Connecting - readyState: 0,
         * Open       - readyState: 1,
         * Closing    - readyState: 2,
         * Closed     - readyState: 3
         */
        sendKeepAlive: function() {
            // if the socket is open, do a 'keepAlive'
            if (this.socket.readyState == WebSocket.OPEN) {
                this.send('{KeepAlive:{reqId:' + this.KEEP_ALIVE_REQ_ID + '}}');
                console.log('Websocket :: KeepAlive');
            }

            // but if closed, substitute the 'keepAlive' for a 'connect'
            else {
                console.log('Websocket :: Reconnecting ...');
                this.connect();
            }
        },


        /**
         * Send all messages queued before socket was connected
         */
        sendPendingMessages: function() {
            this.vent.trigger('app:log', 'Websocket :: SendingPendingMessages');
            _.each(this.pendingMessages, this.send, this);
            this.pendingMessages = [];
        },
        

        /**
         * Convenience method for throwing socket errors
         * @param message
         */
        throwError: function(error) {
            this.vent.trigger('app:log', 'Websocket :: Error :: '+JSON.stringify(error));
        }
    });
});


