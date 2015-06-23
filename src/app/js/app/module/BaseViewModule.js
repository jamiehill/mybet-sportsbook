import BOOT_COMPLETE from '../AppConstants'


export default Marionette.Module.extend({
	startWithParent: false,

	view: null,
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
		console.log(this.moduleName+': Start');
		// attach the view
		if (this.view && this.regionName) {
			this.app.layout[this.regionName].show(new this.view());
		}
		// start up the module router
		new this.Router({ controller: this.api });
	},


	/**
	 *
	 */
	onStop() {

	}
});
