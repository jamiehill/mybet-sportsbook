import template from './TopNavTemplate.html!text';

export default Marionette.LayoutView.extend({
	template: _.template(template)
});
