import React from 'react';
import template from './MainTemplate.html!text';
import View from '../../../common/react/ReactView';
import Component from '../../../modules/highlights/HighlightsView.jsx!';

export default Marionette.LayoutView.extend({

	template: _.template(template),
	regions: {
		"highlights": ".row"
	},

	onShow() {
		var model = {
			date: "Today",
			time: "10:30",
			homeTeam: "Middlesbrough",
			homePrice: "1.3",
			drawTeam: "Draw",
			drawPrice: "2.4",
			awayTeam: "Manchester United",
			awayPrice: "1.1",
			numMarkets: "+34"
		};

		var collection = this.mockCollection(),
			Comp = React.createFactory(Component);

		this.highlights.show(new View({
			component: Comp,
			data: {
				collection: collection
			}
		}));

		//var that = this;
		//_.delay(function() {
		//	console.log("New name Bob!");
		//	model.set({name: 'Bob'});
		//}, 10000);
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
