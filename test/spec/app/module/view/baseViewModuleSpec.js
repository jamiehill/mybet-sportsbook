import App from '../../../../../src/js/app/App';
import Module from '../../../../../src/js/app/module/view/BaseViewModule';

describe('BaseViewModule', function() {
	var module;
	beforeEach(function() {
		module = App.module('Test', Module);
	})

	afterEach(function() {
		module = null;
	})

	it('should be defined', function() {
		expect(module).to.be.ok;
	})

	it('should not start with parent', function() {
		expect(module.startWithParent).to.be.false;
	})

	describe('Displaying the module', function() {
		it('should have layout to attach region to', function() {
			expect(App.layout).to.be.instanceof( Marionette.LayoutView);
		})
		it('should have region to show view in', function() {
			expect(App.layout.main).to.be.instanceof(Marionette.Region);
		})
		xit('should show view when module is started', function() {
			//module.view = "view";
			//module.regionName = 'main';

			//var region = App.layout.main;

			//var show = sinon.spy(region, 'show');
			var onStart = sinon.spy(module, 'onStart');
			module.start();
			expect(onStart).to.have.been.called;

		})
		it('should not have a currentView to start with', function() {
			expect(App.layout.main.currentView).to.be.undefined;
		})
	})

	describe('Routing the module', function() {
		beforeEach(function() {
			module = App.module('Test', Module);
			module.appRoutes = {'route': 'onMyRoute'};
			module.onMyRoute = function(){};
			module.start();
		})
		it('should not have router before being started', function() {
			expect(module.Router).to.not.be.defined;
			module.start();
			expect(module.Router).to.be.defined;
		})
		it('should instantiate Router when the module is started', function() {
			module.start();
			expect(module.Router).to.be.defined;
		})
		xit('should instantiate Router when the module is started', function() {
			var spy = sinon.spy(module, 'onMyRoute');

			Backbone.history.navigate('route', {trigger: true, replace: false})
			expect(spy).to.be.have.been.called.once;

			console.log('Routes: '+_.keys(module.appRoutes));
		})
	})
});
