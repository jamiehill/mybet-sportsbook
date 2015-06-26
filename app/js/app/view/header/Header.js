import Module from '../BaseViewModule';
import View from './HeaderView';


export default Module.extend({

	viewClass: View,
	regionName: 'dashboard',


	onHome: function() {
		console.log('ShowHero');
	},

	onDashboard: function() {
		console.log('ShowDashboard');
	}

});
