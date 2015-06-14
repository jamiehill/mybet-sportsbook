import Marionette from 'backbone.marionette';
import template from './AppTemplate.hbs!';

export default Marionette.LayoutView.extend({
	template: template,
	el: '#main',

	regions: {
		header: 	'#header-main',
		sidebar: 	'#content-side-panel-1',
		rightbar: 	'#content-side-panel-3',
		footer: 	'#footer-main-panel',
		content: 	'#content-main',
		betslip: 	'#content-side-panel-2'
	}
});
