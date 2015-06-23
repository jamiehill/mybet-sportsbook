import template from './BetSlipTemplate.html!text';

export default Marionette.ItemView.extend({
	template: _.template(template)
});
