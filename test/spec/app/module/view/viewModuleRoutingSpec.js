import App from '../../../../../app/js/app/App';

xdescribe('app/view/BaseViewModule - Routing', function() {
	this.timeout(15000);
	var testModules = function(modules, route, handler, done) {
		App.modules = modules;
		App.start();

		var spies = _.map(_.keys(modules), function(Mod) {
			return spy(App.module(Mod).api, handler);
		});

		Backbone.history.on('route', function() { done(); });
		Backbone.history.navigate(route, {trigger: true});
		return spies;
	};

	var Module = Marionette.Module.extend({
		appRoutes: { "test": "onTestRoute" },
		api: {onTestRoute: function(id) {}}
	});

	beforeEach(function() {
		App.Urls = {root: "/"};
	})

	afterEach(function() {
		Backbone.history.navigate('/', {trigger: false, replace: true});
		App.stop();
	})

	describe('Displaying the module', function() {
		it('should hit the route handler for a module, when backbone route is triggered', function(done) {
			var modules = {'Module1': Module};
			var spies = testModules(modules, 'test', 'onTestRoute', done);
			expect(spies[0]).to.have.been.called;
		})

		it('should hit the route handler for multiple modules, when backbone route is triggered', function(done) {
			var modules = {'Module1': Module, 'Module2': Module};
			var spies = testModules(modules, 'test', 'onTestRoute', done);
			expect(spies[0]).to.have.been.called;
			expect([1]).to.have.been.called;
		})
	})
});
