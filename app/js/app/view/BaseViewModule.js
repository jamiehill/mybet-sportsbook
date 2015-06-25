import Marionette from 'backbone.marionette';

export default Marionette.Module.extend({
	startWithParent: false,

	viewClass: null,
	regionName: '',
	appRoutes: {},
	api: {},


	/**
	 *
	 */
	initialize(moduleName, app, options) {
		// store for internal use
		this.moduleName = moduleName;
		this.app = app;
		this.options = options;

		this.view = new this.viewClass();
		this.region = this.app.layout[this.regionName];

		// create module specific router
		this.Router = Marionette.AppRouter.extend({
			appRoutes: this.appRoutes
		});

		//this.start();
	},


	/**
	 *
	 */
	onStart() {
		console.log("Module: Views."+this.moduleName+' - started');

		// attach the view
		if (this.viewClass && this.regionName) {
			this.region.show(this.view);
		}
		// start up the module router
		new this.Router({ controller: this });
	},


	/**
	 *
	 */
	onStop() {

	}
});
