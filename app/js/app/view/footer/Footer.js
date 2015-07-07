import Module from '../BaseViewModule';
import FooterView from './FooterView.jsx!'

export default Module.extend({
	regionName: 'footer',


	onHome: function() {
		this.showReact(FooterView);
	}
});
