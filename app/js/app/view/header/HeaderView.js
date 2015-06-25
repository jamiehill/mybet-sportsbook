import template from './HeaderTemplate.html!text';

export default Marionette.LayoutView.extend({
	template: _.template(template)
});
