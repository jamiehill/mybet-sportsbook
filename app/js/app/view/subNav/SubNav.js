import Module from '../BaseViewModule';
import SubNavView from './SubNavView.jsx!'
import {getComponent} from 'core/utils/Href';

export default Module.extend({
	regionName: 'subNav',

	/**
	 * Hide nav for all static routes
	 */
	onStaticRoute() {
		this.showReact();
	},

	/**
	 * All other routes show the nav
	 */
	onNoMatch() {
		this.showReact(SubNavView);
	}

});
