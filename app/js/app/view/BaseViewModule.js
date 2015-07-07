import Marionette from 'backbone.marionette';
import controller from 'app/AppRouter';
import React from 'react';
import View from 'core/system/react/ReactView';

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

		this.region = this.app.layout[this.regionName];
		if (this.viewClass) {
			this.view = new this.viewClass();
		}

		controller.register(this);
	},


	/**
	 * Shows a React component in the region
	 */
	showComponent(component) {
		this.region.show(new View({
			component: React.createFactory(component)
		}));
	},


	/**
	 * Renders a React component directly intop this regions element
	 */
	showReact(Component) {
		const node = $(this.region.$el.selector)[0];
		if (!Component) {
			React.unmountComponentAtNode(node);
			return;
		}
		React.render(<Component/>, node);
	},


	/**
	 * Shows a Marionette View in the region
	 */
	showView(view) {
		if (!view) {
			this.region.empty();
		}

		// if an alternate view has been specified,
		// instantiate that, otherwise use the default view
		this.view = view ? new view() : this.view

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
