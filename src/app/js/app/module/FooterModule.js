import Module from './BaseViewModule';
import FooterView from '../view/footer/FooterView'

export default Module.extend({

	view: FooterView,
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
