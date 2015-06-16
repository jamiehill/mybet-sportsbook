import template from './MainTemplate.html!text';

export default Marionette.LayoutView.extend({
	template: _.template(template)
});
