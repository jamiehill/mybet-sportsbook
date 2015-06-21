export const PUBLIC_LOGIN_REQ_ID = 0;
export const KEEP_ALIVE_REQ_ID = 1;
export const USER_LOGIN_REQ_ID = 2;

export default Marionette.Controller.extend({
	initialize() {
		this.pendingMessages = [];
		this.socket = null;
	},

	/**
	 * Initiate the socket
	 */
	connect() {
		this.socket = this.ConnectSocket();
		this.socket.onopen = this.onOpen;
		this.socket.onmessage = this.onMessage;
		this.socket.onclose = this.onClose;
		this.socket.onerror = this.onError;
	},

	/**
	 * Disconnect the socket
	 */
	close() {
		this.socket.close();
	},

	/**
	 * Send a message across the socket
	 * @param data
	 */
	send(data) {
		if (_.isObject(data)) {
			data = JSON.stringify(data);
		}

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
	onOpen(event) {
		console.log('Websocket :: Open');
		this.trigger("streaming:open");
	},

	/**
	 * handle received socket messages
	 */
	onMessage(event) {
		var data = JSON.parse(event.data);
		if (_.has(data, 'Response')) {
			var status = data.Response.status,
				lowerError = status.toLowerCase();
			if (lowerError == 'error') {
				this.throwError('There is a problem with the WebSocket');
				return;
			}
			var reqId = data.Response.reqId;
			if (reqId == PUBLIC_LOGIN_REQ_ID) {
				App.vent.trigger('streaming:publicLoginComplete');
				this.sendPendingMessages();
				return;
			}
		}
		if (_.has(data, 'error')) {
			this.throwError(data.error);
			return;
		}

		this.parseMessage(data);
	},


	/**
	 * Abstract method. Override in Subclass.
	 * @param data
	 */
	parseMessage(data) {

	},

	/**
	 *
	 */
	onClose(event) {
		console.log('Websocket :: Closed');
	},

	/**
	 * Handle socket error events
	 */
	onError(err) {
		this.throwError(err);
	},

	/**
	 * Private --------------------------------------------------------
	 */

	/**
	 * @returns {WS}
	 * @constructor
	 */
	ConnectSocket() {
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
		return new window[WS](App.Urls.wsendpoint);
	},

	/**
	 * Abstract method. Override in Subclass.
	 * @param data
	 */
	parseMessage(data) {},

	/**
	 * Connecting - readyState: 0,
	 * Open       - readyState: 1,
	 * Closing    - readyState: 2,
	 * Closed     - readyState: 3
	 */
	sendKeepAlive() {
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
	sendPendingMessages() {
		console.log('Websocket :: SendingPendingMessages');
		_.each(this.pendingMessages, this.send, this);
		this.pendingMessages = [];
	},

	/**
	 * Convenience method for throwing socket errors
	 * @param message
	 */
	throwError(error) {
		console.log('Websocket :: Error :: '+JSON.stringify(error));
	}

});


