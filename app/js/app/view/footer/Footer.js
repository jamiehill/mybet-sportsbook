import Module from '../BaseViewModule';
import FooterView from './FooterView'

export default Module.extend({

	viewClass: FooterView,
	regionName: 'footer',

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
