import Module from '../BaseViewModule';
import TopNavView from './TopNavView.jsx!';


export default Module.extend({
	regionName: 'topNav',
	onNoMatch: function() {
		this.showReact(TopNavView);
	}
});
