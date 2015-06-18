import Queue from '../../../../src/js/common/core/DeferredQueue';
import dummy from '../../../../src/js/common/core/DummyDeferred';


describe('common/core/DeferredQueue', function() {
	var queue1, queue2;
	// mocha timeout delay
	this.timeout(15000);

	beforeEach(function() {
		var path = 'src/js/common/core/DummyDeferred';
		queue1 = new Queue([path, path]);
		queue2 = new Queue([dummy, dummy]);
	})

	it('should have 2 deferreds in the queue', function() {
		expect(queue1.queue.length).to.equal(2);
	})

	it("should invoke 'initialize' when init() called", function() {
		sinon.spy(queue1, 'initialize');
		queue1.init();
		expect(queue1.initialize).to.have.been.called;
	})

	it('should import the deferred object when queue made up of path strings', function(done) {
		sinon.spy(queue1, 'next');
		sinon.spy(queue1, 'success');
		queue1.init().then(function() {
			done();
		});
		expect(queue1.next).to.have.been.called.twice;
		//expect(queue1.success).to.have.been.called.once;
	})

	xit("should call 'next' 3 times when running the queue", function(done) {
		var next = sinon.spy(queue, 'next');
		queue.init().then(done);
		expect(next).to.have.been.called.exactly(3);
	})
})
