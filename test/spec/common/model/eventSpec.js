import json from '../../../lib/event.json!';
import ladder from '../../../lib/rootLadder.json!';
import OddsFactory from '../../../../src/app/js/common/factory/OddsFactory';
import Event from '../../../../src/app/js/common/model/Event';
import Market from '../../../../src/app/js/common/model/Market';
import Selection from '../../../../src/app/js/common/model/Selection';

describe("Event", function() {
	var factory = new OddsFactory(ladder, {parse: true});
	sinon.stub(Market.prototype, 'oddsFactory', function() {
		return factory;
	});

	var event = new Event(json.Event, {parse: true});
	var market = event.Markets.get('28917290');
	var selection = market.Selections.get('96651945');

	beforeEach(function() {
	})

	afterEach(function() {
	})

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
