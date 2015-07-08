import Module from '../BaseViewModule';
import BetSlipView from './BetSlipView.jsx!';
import {getComponent} from 'core/utils/Href';


export default Module.extend({
	regionName: 'rightbar',

	/**
	 * Hide the view for static routes
	 */
	onStaticRoute: function() {
		this.showReact();
	},

	/**
	 * All others show the view
	 */
	onNoMatch: function() {
		this.showReact(BetSlipView);
	}


});
