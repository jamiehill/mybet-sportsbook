import template from './FooterTemplate.html!text';

export default Marionette.ItemView.extend({
	template: _.template(template)
});
