import json from '../../../lib/market.json!';
import Market from 'core/model/Market';

describe("Market", function() {
	var data;
	beforeEach(function() {
		data = _.clone(json);
	})

	afterEach(function() {
		data = null;
	})

	var create = function(data) {
		return new Market(data || json, {parse: true});
	}

	describe('Instantiate Market Object', function() {
		it('should instantiate a Market Object', function() {
			expect(create()).to.be.defined;
		})
		it('should instantiate Selections collection for selectons', function() {
			expect(create().Selections).to.be.defined;
		})
	})

	describe('Properties should be set correctly', function() {
		it('should always have a String value for id', function() {
			expect(create().id).to.be.a('string');
		})
		it('state should not be S, A, O or V', function() {
			expect(create().state).to.not.equal('S');
			expect(create().state).to.not.equal('A');
			expect(create().state).to.not.equal('O');
			expect(create().state).to.not.equal('V');
		})
		it('should convert state=S to state=SUSPENDED', function() {
			data.state = 'S';
			expect(create(data).get('state')).to.equal('SUSPENDED');
		})
		it('should convert state=A to state=ACTIVE', function() {
			data.state = 'A';
			expect(create(data).get('state')).to.equal('ACTIVE');
		})
		it('should convert state=O to state=ACTIVE', function() {
			data.state = 'O';
			expect(create(data).get('state')).to.equal('ACTIVE');
		})
		it('should convert state=V to state=VOID', function() {
			data.state = 'V';
			expect(create(data).get('state')).to.equal('VOID');
		})
		it('should convert state=C to state=CLOSED', function() {
			data.state = 'C';
			expect(create(data).get('state')).to.equal('CLOSED');
		})
		it('should convert suspended, into state=SUSPENDED and delete suspended', function() {
			data.suspended = true;
			var selection = create(data);
			expect(selection.get('state')).to.be.truthy;
			expect(selection.get('suspended')).to.be.not.defined;
		})
	})

	xdescribe('Methods work as expected', function() {
		// TODO
	})

})
