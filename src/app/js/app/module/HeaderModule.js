import Module from './BaseViewModule';
import HeaderView from '../view/header/HeaderView';


export default Module.extend({

	view: HeaderView,
	regionName: 'header',

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
