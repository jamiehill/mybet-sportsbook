import Module from '../BaseViewModule';
import HeaderView from './components/HeroView.jsx!';
import LoginView from './components/LoginView.jsx!';
import RegisterView from './components/RegisterView.jsx!';
import DepositView from './components/DepositView.jsx!';
import DashboardView from './components/DashboardView.jsx!';

export default Module.extend({
	regionName: 'hero',

	onHome: function() {
		this.showReact(HeaderView);
	},

	onLogin: function() {
		this.showReact(LoginView);
	},

	onRegister: function() {
		this.showReact(RegisterView);
	},

	onDeposit: function() {
		this.showReact(DepositView);
	},

	onDashboard: function() {
		this.showReact(DashboardView);
	},

	onNoMatch: function() {
		this.showReact(HeaderView);
	}
});
