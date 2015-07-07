import template from './AppTemplate.html!text';

export default Marionette.LayoutView.extend({
	template: _.template(template),
	el: 'section#body-content',

	regions: {
		topNav: 	'#header',
		account: 	'#account-content',
		hero:    	'#hero-container',
		subNav: 	'#sub-nav-container',
		sidebar: 	'#left-sidebar',
		rightbar: 	'#right-sidebar',
		footer: 	'footer',
		main: 		'#main-content'
	}
});
