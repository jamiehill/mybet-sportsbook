import Module from '../BaseViewModule';
import BetSlipView from './BetSlipView';


export default Module.extend({
	viewClass: BetSlipView,
	regionName: 'betslip',

	appRoutes: {
		"": "showOpenBets"
	},


	showOpenBets: function() {
		console.log('ShowOpenBets');
	}
});
