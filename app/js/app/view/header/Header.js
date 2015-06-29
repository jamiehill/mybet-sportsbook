import Module from '../BaseViewModule';
import View from './HeaderView';


export default Module.extend({

	viewClass: View,
	regionName: 'dashboard',


	appRoutes: {
		"": "onHome"
	},


	onHome: function() {
		this.showView();
	}

});
