(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['underscore'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('underscore'));
	} else {
		// Browser globals
		factory(_);
	}
}(function (_) {

	var templateSettings = {
		interpolate: /<[%?]=([\s\S]+?)[%?]>/g,
		evaluate: /<%([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	};

	var mixins = {


		/**
		 * mixin to add translation capability to underscore templating
		 * @param text
		 * @param data
		 * @param settings
		 * @returns {Function}
		 */
		translateTemplate: function(text, data, settings) {
			settings = settings || templateSettings;
			var func = _.template(text, null, settings);
			return _.wrap(func, function(f, d) {
				var translations = App.translator.currentLocaleTranslations;
				return f(_.extend(translations, d));
			});
		}
	};

	// add the mixins to underscore
	_.mixin(mixins);

}));
