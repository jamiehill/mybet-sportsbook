import Module from '../BaseViewModule';
import AccountView from './AccountView.jsx!';

export default Module.extend({
	regionName: 'account',
	onHome: function() {
		this.showReact(AccountView);
	}
});
