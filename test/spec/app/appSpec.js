import SportsBook from '../../../src/js/app/App';

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
		expect(App instanceof Marionette.Application).to.be.ok;
	})

	it('layout should be an instance of Marionette.LayoutView', function() {
		expect(App.layout instanceof Marionette.LayoutView).to.be.true;
	});

	xit('should invoke "onStart", when SportsBook started', function() {
		var spy = sinon.spy(App, 'onStart');
		App.start();
		expect(spy).to.have.been.called;
	})
});
