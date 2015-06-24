import Module from '../../../../../app/js/app/view/BaseViewModule';

export default Module.extend({
	appRoutes: {
		"/": "onHomeRoute",
		"": "onHomeRoute",
		"test": "onTestRoute",
		"test/:id": "onTestIdRoute"
	},

	api: {
		onHomeRoute: function() {
			var blah = "blah";
		},
		onTestRoute: function(id) {
			var blah = "blah";
		},
		onTestIdRoute: function(id) {
			var blah = "blah";
		}
	}
});
