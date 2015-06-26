import React from 'react';
import template from './MainTemplate.html!text';
import View from 'core/system/react/ReactView';
import Component from 'highlights/HighlightsView.jsx!';
import EventFactory from 'core/model/factory/EventFactory';

export default Marionette.LayoutView.extend({

	template: _.template(template),
	regions: {
		"highlights": ".row"
	},

	onShow() {
		var factory = new EventFactory();
		this.highlights.show(new View({
			component: React.createFactory(Component),
			data: {
				factory: factory,
				collection: factory.collection
			}
		}));
	}
});
