import Module from '../BaseViewModule';
import View from './TopNavView';


export default Module.extend({

	viewClass: View,
	regionName: 'topNav',

	appRoutes: {
		"contacts(/filter/criterion::criterion)": "listContacts",
		"contacts/:id": "showContact"
	},


	api: {
		listContacts: function() {
			var blah = "blah";
		},
		showContact: function(id) {
			var blah = "blah";
		},
		editContact: function() {

		}
	}
});
