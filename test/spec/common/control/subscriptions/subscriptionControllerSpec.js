import Ctrl from '../../../../../src/app/js/common/control/subscriptions/SubscriptionController';


describe("common/control/subscriptions/SubscriptionController\n", function() {
	var controller, sb;

	beforeEach(function() {
		sb = sinon.sandbox.create();
		sb.stub(Ctrl.prototype, 'initialize');
		sb.stub(ctx, 'get');
		controller = new Ctrl();
	});

	afterEach(function() {
		sb.restore();
	})

	describe("SubscriptionController - func", function() {

		describe('Topics should exist', function() {
			it("should have 'EventDetails' Topic", function() {
				expect(controller.topics.EventDetails).to.exist;
			});
			it("should have 'EventSummary' Topic", function() {
				expect(controller.topics.EventSummary).to.exist;
			});
			it("should have 'MarketTypes' Topic", function() {
				expect(controller.topics.MarketTypes).to.exist;
			});
			it("should have 'Schedule' Topic", function() {
				expect(controller.topics.Schedule).to.exist;
			});
			it("should have 'Cashout' Topic", function() {
				expect(controller.topics.Cashout).to.exist;
			});
		})

		describe('Func invokation', function() {
			var add, remove, send;
			beforeEach(function() {
				add = sb.stub(controller, 'add');
				remove = sb.stub(controller, 'remove');
				send = sb.stub(controller, 'send');
			});

			it("should invoke 'controller.add' when 'type' == 1", function() {
				controller.func(1)();
				expect(add).to.have.been.called.once;
			});
			it("should invoke 'controller.remove' when 'type' == 2", function() {
				controller.func(2)();
				expect(remove).to.have.been.called.once;
			});
			it("should invoke 'controller.send' when 'type' == anything else", function() {
				controller.func()();
				expect(send).to.have.been.called.once;
			});
		})


//
//		//controller, 'func');
//		//var spy = sinon.spy(Ctrl.prototype, 'func');
//		//controller.func(1);
//		//expect(true).to.be.ok;
//
//		//mock.expects('subscribeToEventView').once().withArgs(1);
//		//mock.subscribeToEventView(1);
//		//mock.verify();
//
//
//		//mock.expects('add').once();
//		//mock
	});
//
// xdescribe("subscription methods", function() {
//	//    it("should invoke 'subscribeToEventView' method upon 'command:subscribe:events' event", function() {
//	//        var spy = spyOn(controller, 'subscribeToEventView');
//
//			//controller.vent.trigger('command:subscribe:events');
//			//expect(controller.subscribeToEventView).toHaveBeenCalled();
//			//
//			//
//			//controller.vent = new Marionette.EventAggregator()
//			//
//			//controller.vent.trigger('command:subscribe:events', 'jamie')
//			//expect(spy).toHaveBeenCalledWith('jamie');
//
//			//var vent = ctx.get('vent');
//
//			//console.log('map: '+ _.values(ctx.map));
//			//expect(vent).toBeDefined();
//		//});
//	//})
});
