import Module from '../BaseViewModule';
import View from './HeaderView';


export default Module.extend({

	viewClass: View,
	regionName: 'dashboard',

	appRoutes: {
		"": "showHero",
		"dashboard": "showDashboard"
	},


	showHero: function() {
		console.log('ShowHero');
		this.region.show(this.view);
	},


	showDashboard: function(id) {
		console.log('ShowDashboard');
		//this.region.empty();
	}
});
