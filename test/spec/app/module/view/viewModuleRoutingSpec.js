import App from '../../../../../src/js/app/App';
import Module from '../../../../../src/js/app/module/view/DummyModule';

describe('BaseViewModule - Routing', function() {
	var sb; this.timeout(15000);

	var testModules = function(modules, route, handler, done) {
		App.modules = modules;
		App.start();

		var spies = _.map(_.keys(modules), function(Module) {
			var spy = sb.spy();
			return spy(App.module(Module).api, handler);
		});

		Backbone.history.on('route', function() { done(); });
		Backbone.history.navigate(route, {trigger: true});

		return spies;
	};

	beforeEach(function() {
		sb = sinon.sandbox.create();
		App.Urls = {root: "/"};
	})

	afterEach(function() {
		Backbone.history.navigate('/', {trigger: false, replace: true});
		Backbone.history.stop();
		sb.restore();
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
