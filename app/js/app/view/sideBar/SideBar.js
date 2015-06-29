import Module from '../BaseViewModule';
import View from 'core/system/react/ReactView';
import CompetitionsView from './components/Competitions.jsx!';
import {TOGGLE_SIDE_BAR} from '../../AppConstants';

export default Module.extend({

	regionName: 'sidebar',
	appRoutes: {
		"": "onHome"
	},


	/**
	 *
	 */
	initialize(moduleName, app, options) {
		Module.prototype.initialize.apply(this, arguments);
		_.bindAll(this, 'onToggle');
		App.bus.on(TOGGLE_SIDE_BAR, this.onToggle);
	},


	/**
	 * toggle the side bar
	 */
	onToggle() {
		this.region.$el.toggleClass('open');
	},


	/**
	 * Show the competitions sidebar panel
	 */
	onHome() {
		this.showComponent(CompetitionsView);
	}
});
