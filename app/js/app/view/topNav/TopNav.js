import Module from '../BaseViewModule';
import TopNavView from './TopNavView.jsx!';


export default Module.extend({
	regionName: 'topNav',

	onHome: function() {
		this.showReact(TopNavView);
	}
});
