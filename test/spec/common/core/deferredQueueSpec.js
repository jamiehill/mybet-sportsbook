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

	it('should import the deferred object, before executing the queue, when queue made up of path strings', function(done) {
		sinon.spy(queue1, 'next');
		queue1.init().then(done);
		expect(queue1.next).to.have.been.called.twice;
	})

	it('should just execute the queue, when queue made up of Deferred Objects', function(done) {
		sinon.spy(queue2, 'next');
		queue2.init().then(done);
		expect(queue2.next).to.have.been.called.twice;
	})

	it("should call 'next' 2 times when running the queue", function(done) {
		sinon.spy(queue1, 'next');
		queue1.init().then(done);
		expect(queue1.next).to.have.been.called.twice;
	})
})
