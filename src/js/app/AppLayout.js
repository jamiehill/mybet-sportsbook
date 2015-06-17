import template from './AppTemplate.html!text';

export default Marionette.LayoutView.extend({
	template: _.template(template),
	el: '#main',

	regions: {
		header: 	'#header-container',
		subNav: 	'#sub-nav-container',
		sidebar: 	'#content-side-panel-1',
		rightbar: 	'#content-side-panel-3',
		footer: 	'#footer-container',
		main: 		'#main-content',
		betslip: 	'#right-sidebar'
	}
});
