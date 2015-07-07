import Module from '../BaseViewModule';
import SubNavView from './SubNavView.jsx!'

export default Module.extend({
	regionName: 'subNav',

	onHome: function() {
		this.showReact(SubNavView);
	}

});
