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
		var collection = this.mockCollection(),
			Comp = React.createFactory(Component);

		this.highlights.show(new View({
			component: Comp,
			data: {
				collection: collection
			}
		}));
	},

	mockCollection() {
		var models = _.times(12, function(n) {
			return new Backbone.Model({
				id: n,
				date: "Today",
				time: "10:30",
				homeTeam: "Middlesbrough",
				homePrice: "1.3",
				drawTeam: "Draw",
				drawPrice: "2.4",
				awayTeam: "Manchester United",
				awayPrice: "1.1",
				numMarkets: "+34"
			});
		});
		return new Backbone.Collection(models);
	}
});
