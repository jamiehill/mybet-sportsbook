import Module from '../BaseViewModule';
import AccountView from './AccountView'

export default Module.extend({
	regionName: 'account',


	onHome: function() {
		this.showView(AccountView);
	}
});
