import Module from '../BaseViewModule';
import SubNavView from './SubNavView.jsx!'
import {getComponent} from 'core/utils/Href';

export default Module.extend({
	regionName: 'subNav',

	onRouteChange: function() {
		var route = getComponent(0);
		switch(route) {
			case 'register':
			case 'login':
				this.showReact();
				break;
			default:
				this.showReact(SubNavView);
				break;
		}
	}

});
