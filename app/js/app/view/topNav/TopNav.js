import Module from '../BaseViewModule';
import View from './TopNavView';


export default Module.extend({

	viewClass: View,
	regionName: 'topNav',


	appRoutes: {
		"": "onHome"
	},


	onHome: function() {
		this.showView();
	}
});
