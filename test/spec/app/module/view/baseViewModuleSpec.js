import App from '../../../../../app/js/app/App';
import Module from '../../../../../app/js/app/view/MockViewModule';

xdescribe('app/view/BaseViewModule', function() {

	describe('Displaying the module', function() {
		it('should have layout to attach region to', function() {
			expect(App.layout).to.be.instanceof(Marionette.LayoutView);
		})
		it('should have region to show view in', function() {
			expect(App.layout.main).to.be.instanceof(Marionette.Region);
		})
		it('should show view when module is started', function() {
			var module = App.module('Module1', Module);
			var onStart = spy(module, 'onStart');
			module.start();
			expect(onStart).to.have.been.called;

		})
		it('should not have a currentView to start with', function() {
			expect(App.layout.main.currentView).to.be.undefined;
		})
	})
});
