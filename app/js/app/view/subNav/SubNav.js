import Module from '../BaseViewModule';
import SubNavView from './SubNavView.jsx!'

export default Module.extend({
	viewClass: SubNavView,
	regionName: 'subNav',

	appRoutes: {
		"": "onHome"
	},


	onHome: function() {
		this.showComponent(SubNavView);
	}

});
