import App from '../../app/app';
import _ from 'underscore';

describe('app', function() {

	it('should have App defined', function() {
		expect(App).toBeDefined();
	});

	it('should be instance of Marionette.Application', function() {
		expect(App instanceof Marionette.Application).toBeTruthy();
	})

	it('should expose start method', function() {
		expect(_.isFunction(App.start)).toBeTruthy();
	})
});
