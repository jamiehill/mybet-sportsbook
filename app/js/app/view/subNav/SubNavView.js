import template from './SubNavTemplate.html!text';

export default Marionette.ItemView.extend({
	template: _.template(template),
	className: 'container'
});
