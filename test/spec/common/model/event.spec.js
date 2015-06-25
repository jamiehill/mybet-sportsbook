import json from '../../../lib/data/event.json!';
import ladder from '../../../lib/data/rootLadder.json!';
import factory from 'core/model/factory/OddsFactory';
import Event from 'core/model/Event';
import Market from 'core/model/Market';
import Selection from 'core/model/Selection';

describe("Event", function() {
	var data = factory.parse(ladder);
	factory.set(data);

	sinon.stub(Market.prototype, 'oddsFactory', function() {
		return factory;
	});

	var event = new Event(json.Event, {parse: true});
	var market = event.Markets.get('28917290');
	var selection = market.Selections.get('96651945');

	describe('Instantiate Event, Market and Selection Object', function() {
		it('should have created an Event', function() {
			expect(event).to.be.defined;
		})

		it('should have create a Market', function() {
			expect(market).to.be.defined;
		})

		it('should have create a Selection', function() {
			expect(selection).to.be.defined;
		})
	})

	xdescribe('Properties should be set correctly', function() {
		it('should always have a String value for id', function() {
			expect(selection.id).to.be.a('string');
		})
		it('state should not be S, A, O or V', function() {
			expect(selection.state).to.not.equal('S');
			expect(selection.state).to.not.equal('A');
			expect(selection.state).to.not.equal('O');
			expect(selection.state).to.not.equal('V');
		})
	})

})
