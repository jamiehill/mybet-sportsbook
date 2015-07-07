import Module from '../BaseViewModule';
import HeaderView from './HeroView.jsx!';
import DashboardView from './DashboardView.jsx!';

export default Module.extend({
	regionName: 'hero',

	onHome: function() {
		this.showReact(HeaderView);
	},

	onDashboard: function() {
		this.showReact(DashboardView);
	}
});
