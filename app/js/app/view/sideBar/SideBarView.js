import Module from '../BaseViewModule';
import View from './SideBarView';


export default Module.extend({

	viewClass: View,
	regionName: 'sidebar',

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
