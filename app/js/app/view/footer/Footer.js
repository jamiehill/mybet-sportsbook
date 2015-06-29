import Module from '../BaseViewModule';
import FooterView from './FooterView'

export default Module.extend({
	viewClass: FooterView,
	regionName: 'footer',


	appRoutes: {
		"": "onHome"
	},


	onHome: function() {
		this.showView();
	}
});
