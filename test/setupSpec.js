import '../app/js/plugins';

import chai from 'chai';
import sinon from 'sinon';
import sinonchai from 'sinon-chai';

window.chai = chai;
window.sinon = sinon;
window.chai.use(sinonchai);

window.assert = window.chai.assert;
window.expect = window.chai.expect;
window.should = window.chai.should();

//fixture.setBase('./test/fixtures');

export default function() {
	beforeEach(function() {
		this.sandbox = window.sinon.sandbox.create();
		window.stub = this.sandbox.stub.bind(this.sandbox);
		window.spy  = this.sandbox.spy.bind(this.sandbox);
	});

	afterEach(function() {
		delete window.stub;
		delete window.spy;
		this.sandbox.restore();
	});
}
