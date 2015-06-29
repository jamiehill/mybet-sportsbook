import template from './AppTemplate.html!text';

export default Marionette.LayoutView.extend({
	template: _.template(template),
	//el: '#main',
	el: 'body',

	regions: {
		topNav: 	'#topnav-container',
		dashboard: 	'#dashboard-container',
		subNav: 	'#sub-nav-container',
		sidebar: 	'#left-sidebar',
		rightbar: 	'#right-sidebar',
		footer: 	'#footer-container',
		main: 		'#main-content'
	}
});
