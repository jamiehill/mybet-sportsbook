import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import AppLayout from './AppLayout';
import BOOT_COMPLETE from './AppEvents';

// create dedicated channel for router
let routerChannel = Radio.channel('router');

// setup application instance
var Application = Marionette.Application.extend({
	initialize() {
		this.$body  = $(document.body);
		this.layout = new AppLayout();
		this.layout.render();

		// listen to the route channel for routing
		// instructions from any of the registered modules
		this.listenTo(routerChannel, {
			'before:enter:route' : this.onBeforeEnterRoute,
			'enter:route'        : this.onEnterRoute,
			'error:route'        : this.onErrorRoute
		});
	},


	// global route handlers
	onBeforeEnterRoute() {},
	onErrorRoute() {},
	onEnterRoute() {
		this.$body.scrollTop(0);
	},


	onStart() {
		//var bootModules = this.Core
		//_.each()
	},


	onStop() {

	}
});

// exports singleton instance
let inst = new Application();
export default inst;
