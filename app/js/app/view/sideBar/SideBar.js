import Module from '../BaseViewModule';
import View from 'core/system/react/ReactView';
import Competitions from './components/Competitions.jsx!';
import {TOGGLE_SIDE_BAR} from '../../AppConstants';

export default Module.extend({
	regionName: 'sidebar',

	/**
	 * Show the competitions sidebar panel
	 */
	onHome() {
		this.showReact(Competitions);
	}
});
