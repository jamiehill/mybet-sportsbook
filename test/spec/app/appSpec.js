import SportsBook from '../../../src/app/App';

describe('SportsBook', function() {

	it('should be defined', function() {
		expect(SportsBook).to.be.ok;
	});

	it('should be instance of Marionette.Application', function() {
		expect(SportsBook instanceof Marionette.Application).to.be.ok;
	})

	it('layout should be an instance of Marionette.LayoutView', function() {
		expect(SportsBook.layout instanceof Marionette.LayoutView).to.be.true;
	});

	it('should invoke "onStart", when SportsBook started', function() {
		var spy = sinon.spy(SportsBook, 'onStart');
		SportsBook.start();
		expect(spy).to.have.been.called;
	})
});
