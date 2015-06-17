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

	describe('\n	Displaying the module', function() {
		it('should have layout to attach region to', function() {
			expect(App.layout instanceof Marionette.LayoutView).to.be.true;
		})
		it('should have region to show view in', function() {
			expect(App.layout.main instanceof Marionette.Region).to.be.true;
		})
	})
});
