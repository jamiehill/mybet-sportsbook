import Ctrl from 'core/controller/subscriptions/SubscriptionController';


describe("common/controller/subscriptions/SubscriptionController\n", function() {
	var controller, sb;

	beforeEach(function() {
		stub(Ctrl.prototype, 'initialize');
		stub(ctx, 'get');
		controller = new Ctrl();
	});

	describe("SubscriptionController - func", function() {

		describe('Topics should exist', function () {
			it("should have 'EventDetails' Topic", function () {
				expect(controller.topics.EventDetails).to.exist;
			});
			it("should have 'EventSummary' Topic", function () {
				expect(controller.topics.EventSummary).to.exist;
			});
			it("should have 'MarketTypes' Topic", function () {
				expect(controller.topics.MarketTypes).to.exist;
			});
			it("should have 'Schedule' Topic", function () {
				expect(controller.topics.Schedule).to.exist;
			});
			it("should have 'Cashout' Topic", function () {
				expect(controller.topics.Cashout).to.exist;
			});
		})

		describe('Func invokation', function () {
			var add, remove, send;
			beforeEach(function () {
				add = stub(controller, 'add');
				remove = stub(controller, 'remove');
				send = stub(controller, 'send');
			});

			it("should invoke 'controller.add' when 'type' == 1", function () {
				controller.func(1)();
				expect(add).to.have.been.called.once;
			});
			it("should invoke 'controller.remove' when 'type' == 2", function () {
				controller.func(2)();
				expect(remove).to.have.been.called.once;
			});
			it("should invoke 'controller.send' when 'type' == anything else", function () {
				controller.func()();
				expect(send).to.have.been.called.once;
			});
		})
	});
});
