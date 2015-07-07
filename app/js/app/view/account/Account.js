import Module from '../BaseViewModule';
import AccountView from './AccountView.jsx!';
import {getComponent} from 'core/utils/Href';

export default Module.extend({
	regionName: 'account',

	onRouteChange: function() {
		var route = getComponent(0);
		switch(route) {
			case 'register':
			case 'login':
				this.showReact();
				break;
			default:
				this.showReact(AccountView);
				break;
		}
	}
});
