import Marionette from 'backbone.marionette';
import controller from 'app/AppRouter';

export default Marionette.Module.extend({

	startWithParent: false,
	viewClass: null,
	regionName: '',


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

		controller.register(this);
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
	},


	/**
	 *
	 */
	onStop() {

	}
});
