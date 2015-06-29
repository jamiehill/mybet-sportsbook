import Module from '../BaseViewModule';
import BetSlipView from './BetSlipView';


export default Module.extend({
	viewClass: BetSlipView,
	regionName: 'rightbar',

	appRoutes: {
		"": "onHome"
	},


	onHome: function() {
		this.showView();
	}
});
