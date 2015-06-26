import {modelProps} from 'core/utils/AppUtil';
import {execute} from 'core/utils/AppUtil';

class SomeClass {
	constructor() {
		this.execute = execute(this);
	}
	someFunction(name, age) {
		console.log('Name: ${name}, Age: ${age}');
	}
}

describe("core/utils/AppUtil", function() {
	describe('ModelProps', function() {

	})

	describe('Execute', function() {
		it('should execute a proxied method in the specified scope', function() {

			var obj = new SomeClass();

			obj.execute('someFunction', 'Jamie', 25);



		})
	})

})
