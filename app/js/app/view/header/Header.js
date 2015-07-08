import Module from '../BaseViewModule';
import HeaderView from './components/HeroView.jsx!';
import DashboardView from './components/DashboardView.jsx!';

export default Module.extend({
	regionName: 'hero',

	/**
	 * All routes show the view
	 */
	onNoMatch: function() {
		this.showReact(HeaderView);
	},

	/**
	 * Except for dashboard
	 */
	onDashboard: function() {
		this.showReact(DashboardView);
	}
});
