import Topic from '../../../../../src/app/js/common/control/subscriptions/Topic';

describe("common/control/subscriptions/Topic.js\n", function() {
	var topic;

	beforeEach(function() {
		topic = new Topic();
	});

	describe("Topic size", function() {
		it("should return the correct number of ids in the topic", function() {
			topic.reset();
			topic.add('1234, 2345, 3456');
			expect(topic.size()).to.equal(3);
			topic.remove('1234, 2345, 3456');
			expect(topic.size()).to.equal(0);
		});
	});

	describe("Topic reset", function() {
		it("should clear out the ids hash when reseting", function() {
			topic.reset();
			topic.add('1234, 2345, 3456');
			expect(topic.size()).to.equal(3);
			topic.reset();
			expect(topic.size()).to.equal(0);
		});
	});

	describe("Topic action", function() {
		beforeEach(function() { topic.reset() });
		it("should add ids when the type is 1", function() {
			topic.action(1, '1234, 2345');
			expect(topic.size()).to.equal(2);
			expect(topic.ids['1234']).to.exist;
			expect(topic.ids['2345']).to.exist;
		});
		it("should remove ids when the type is 2", function() {
			topic.add('1234, 2345, 3456');
			topic.action(2, '1234');
			expect(topic.size()).to.equal(2);
		});
		it("should substitute empty ids for a * wildcard", function() {
			topic.action(1);
			expect(topic.ids['*']).to.exist;
		});
	});

	describe("Topic add", function() {

		beforeEach(function() {
			topic.reset();
		});

		it("should add single id when single id provided", function() {
			topic.add('1234');
			expect(_.size(topic.ids)).to.equal(1);
		});

		it("should add multiple ids when comma delimited string of ids added", function() {
			topic.add('1234, 2345, 3456, 4567');
			expect(_.size(topic.ids)).to.equal(4);
		});

		if("should trim id with erroneous whitespace", function() {
			topic.add('         1234  ');
			expect(_.has(topic.ids, '1234')).to.be.ok;
		})

		it("should add multiple ids when comma delimited string of ids added, with erroneous white space", function() {
			topic.add('         1234  , 2345,    3456,    4567');
			expect(_.size(topic.ids)).to.equal(4);
		});

		it("should clear ids when reset is called", function() {
			topic.add('1234, 2345, 3456, 4567');
			topic.reset();
			expect(_.size(topic.ids)).to.equal(0);
		});

		it("should create new id coounter when adding an id for the first time", function() {
			topic.add("1234");
			expect(topic.ids["1234"]).to.equal(1);
		});

		it("should increment id counter when adding a previously added id", function() {
			topic.add('1234');
			expect(topic.ids['1234']).to.equal(1);
			topic.add('1234');
			expect(topic.ids['1234']).to.equal(2);
			topic.add('1234');
			expect(topic.ids['1234']).to.equal(3);
			topic.add('1234');
			expect(topic.ids['1234']).to.equal(4);
		});

		it("should return the added id/s, not all previously added ids", function() {
			topic.add('1234, 2345, 3456');

			var added = JSON.parse(topic.add('4567')),
				ids = added.ids.split(',');

			expect(_.size(ids)).to.equal(1);
			expect(_.contains(ids, '4567')).to.be.ok;
		})
	});

	describe("Topic remove", function() {

		beforeEach(function() {
			topic.reset();
		});

		it("should remove single id when single id provided", function() {
			topic.add('1234, 2345, 3456');
			topic.remove('2345');
			expect(topic.size()).to.equal(2);
		});

		it("should remove multiple ids when multiple ids provided", function() {
			topic.add('1234, 2345, 3456');
			topic.remove('2345, 3456');
			expect(topic.size()).to.equal(1);
		});

		it("should decrement id counter when removing an id with > 1 counter val", function() {
			topic.add('1234');
			topic.add('1234');
			topic.add('1234');
			topic.add('1234');
			expect(topic.ids['1234']).to.equal(4);
			topic.remove('1234');
			expect(topic.ids['1234']).to.equal(3);
		});

		it("should delete id when counter reaches zero", function() {
			topic.add('1234');
			topic.add('1234');
			topic.add('1234');
			topic.remove('1234');
			expect(topic.ids['1234']).to.equal(2);
			topic.remove('1234');
			expect(topic.ids['1234']).to.equal(1);
			topic.remove('1234');
			expect(topic.ids['1234']).to.not.exist;
		});

		it("should return the removed id/s, not all previously added ids", function() {
			topic.add('1234, 2345, 3456');

			var removed = JSON.parse(topic.remove('4567')),
				ids = removed.ids.split(',');

			expect(_.size(ids)).to.equal(1);
			expect(_.contains(ids, '4567')).to.be.ok;
		})
	});

	describe("Topic get", function() {
		beforeEach(function() {
			topic.reset();
		});

		it("should return empty string if topic has no ids", function() {
			expect(topic.get()).to.have.string("");
		});

		it("should return the serialized topic with all ids if no ids provided", function() {
			topic.add('1234, 2345');
			var obj = JSON.parse(topic.get()),
				ids = obj.ids.split(',');
			expect(_.size(ids)).to.equal(2);
		});

		it("should return the serialized topic with just the ids provided", function() {
			topic.add('1234, 2345, 3456, 4567, 5678');
			var obj = JSON.parse(topic.get('1234, 2345')),
				ids = obj.ids.split(',');
			expect(_.size(ids)).to.equal(2);
		});

		// If there is, for example, an 'eventDetails' subscription registered for id 1234,
		// we shouldn't also be sending a eventSummary subscription for the same id.  By
		// registering a 'checker' topic here, the checker will always have supremacy over
		// a matching id, and the inferior id will not be returned.
		it("should should not return an id, if another topic has supremacy over the id", function() {
			// create the checker topic.  eventDetails id will always
			// be returned over our 'checked' topics id
			var checker = new Topic({name: 'eventDetails'});
			checker.add('1234');
			// add the checker topic to our topic
			topic.add('1234, 2345, 3456');
			topic.check(checker);
			// get the ids, which shouldn't contain the
			// one matched from the checker topic
			var obj = JSON.parse(topic.get()),
				ids = obj.ids.split(',');
			expect(_.size(ids)).to.equal(2);
			expect(_.contains(ids, '1234')).to.be.false;
		});
	});
});
