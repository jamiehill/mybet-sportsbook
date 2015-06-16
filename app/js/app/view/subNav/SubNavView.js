import template from './SubNavTemplate.html!text';
import React from 'react';

export default Marionette.ItemView.extend({
	template: _.template(template),
	className: 'container'
});
