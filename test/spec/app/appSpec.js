import SportsBook from '../../../src/app/js/app/App';

describe('SportsBook', function() {

	before(function() {
		//fixture.load('/test/fixrures/rootElement.html');
	});

	after(function() {
		//fixture.cleanup();
	});

	it('should be defined', function() {
		expect(App).to.be.ok;
	});

	it('should be instance of Marionette.Application', function() {
		expect(App).to.be.instanceof(Marionette.Application);
	})

	it('layout should be an instance of Marionette.LayoutView', function() {
		expect(App.layout).to.be.instanceof(Marionette.LayoutView);
	});

	xit('should invoke "onStart", when SportsBook started', function() {
		var spy = sinon.spy(App, 'onStart');
		App.start();
		expect(spy).to.have.been.called;
	})
});
