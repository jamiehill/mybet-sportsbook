import Module from '../BaseViewModule';
import BetSlipView from './BetSlipView';
import {getComponent} from 'core/utils/Href';


export default Module.extend({
	regionName: 'rightbar',

	onRouteChange: function() {
		var route = getComponent(0);
		switch(route) {
			case 'register':
			case 'login':
				this.showReact();
				break;
			default:
				this.showView(BetSlipView);
				break;
		}
	}
});
