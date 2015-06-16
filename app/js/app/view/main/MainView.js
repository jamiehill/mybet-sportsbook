import template from './MainTemplate.html!text';
import View from '../../../common/react/ReactView';
import Component from '../../../modules/highlights/HighlightsView.jsx!';

export default Marionette.LayoutView.extend({

	template: _.template(template),
	regions: {
		"highlights": ".row"
	},

	onShow() {
		var model   = new Backbone.Model({name: "Jamie"}),
			options = {component: Component, data: {model: model}};
		this.highlights.show(new View(options));

		//var that = this;
		//_.delay(function() {
		//	console.log("New name Bob!");
		//	model.set({name: 'Bob'});
		//}, 10000);
	}
});
