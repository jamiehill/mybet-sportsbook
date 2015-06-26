import React from 'react';
import template from './MainTemplate.html!text';
import View from 'core/system/react/ReactView';
import Component from 'highlights/HighlightsView.jsx!';

export default Marionette.LayoutView.extend({

	template: _.template(template),
	regions: {
		"highlights": ".row"
	},

	onShow() {
		this.highlights.show(new View({
			component: React.createFactory(Component),
			data: {}
		}));
	}
});
