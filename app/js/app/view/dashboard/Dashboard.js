import Module from '../BaseViewModule';
import View from './DashboardView';


export default Module.extend({

	viewClass: View,
	regionName: 'dashboard',

	appRoutes: {
		"/": "showHero",
		"contacts/:id": "showContact"
	},


	api: {
		showHero: function() {
			var blah = "blah";
		},
		showContact: function(id) {
			var blah = "blah";
		},
		editContact: function() {

		}
	}
});
