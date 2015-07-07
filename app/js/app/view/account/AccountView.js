import template from './AccountTemplate.html!text';

export default Marionette.LayoutView.extend({
	template: _.template(template),
	id: 'account-nav',

	regions: {
		content: '#content-container'
	}
});
