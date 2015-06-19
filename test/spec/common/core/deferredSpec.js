import Deferred from '../../../../src/js/common/defer/Deferred';


describe('common/defer/Deferred', function() {
	var deferred, sb;
	// mocha timeout delay
	this.timeout(15000);

	beforeEach(function() {
		sb = sinon.sandbox.create();
		sb.stub(console, 'log');
		deferred = new Deferred();
	})

	afterEach(function() {
		sb.restore();
	})

	it("should return a Promise when init'ed", function() {
		var promise = deferred.init();
		expect(promise).to.be.instanceof(Promise);
	})

	it("should store 'resolve' and 'reject' methods from Promise", function() {
		deferred.init();
		expect(_.isFunction(deferred.resolve)).to.be.true;
		expect(_.isFunction(deferred.reject)).to.be.true;
	})

	it("should invoke 'resolve' when calling 'success'", function(){
		deferred.init();
		sb.spy(deferred, 'resolve');
		deferred.success();
		expect(deferred.resolve).to.have.been.called.once;
	})
	it("should invoke 'reject' when calling 'failure'", function(){
		deferred.init();
		sb.spy(deferred, 'reject');
		deferred.failure();
		expect(deferred.reject).to.have.been.called.once;
	})
})
