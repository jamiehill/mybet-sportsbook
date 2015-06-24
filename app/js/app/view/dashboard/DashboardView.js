import template from './DashboardTemplate.html!text';

export default Marionette.LayoutView.extend({
	template: _.template(template)
});
