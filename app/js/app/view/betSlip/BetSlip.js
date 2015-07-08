import Module from '../BaseViewModule';
import BetSlipView from './BetSlipView.jsx!';
import {getComponent} from 'core/utils/Href';


export default Module.extend({
	regionName: 'rightbar',

	onRouteChange: function() {
		var route = getComponent(0);
		switch(route) {
			case 'register':
			case 'login':
			case 'deposit':
				this.showReact();
				break;
			default:
				this.showReact(BetSlipView);
				break;
		}
	}
});
