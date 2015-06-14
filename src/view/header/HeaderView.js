import Marionette from 'backbone.marionette';
import template from './HeaderTemplate.hbs!';

export default Marionette.LayoutView.extend({
	template: template,
	regions: {}
});
