import json from '../../../lib/selection.json!';
import Selection from 'core/model/Selection';

describe("Selection", function() {
	var data;
	beforeEach(function() {
		data = _.clone(json);
	})

	afterEach(function() {
		data = null;
	})

	var create = function(data) {
		return new Selection(data || json, {parse: true});
	}

	describe('Instantiate Selection Object', function() {
		it('should instantiate a Selection Object', function() {
			expect(create()).to.be.defined;
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
		it('should convert suspended, into state=SUSPENDED and delete suspended', function() {
			data.suspended = true;
			var selection = create(data);
			expect(selection.get('state')).to.be.truthy;
			expect(selection.get('suspended')).to.be.not.defined;
		})
		it('should map type=H, to header=1', function() {
			data.type = 'H';
			expect(create(data).get('header')).to.equal('1');
		})
		it('should map type=A, to header=2', function() {
			data.type = 'A';
			expect(create(data).get('header')).to.equal('2');
		})
		it('should map type=D, to header=x', function() {
			data.type = 'D';
			expect(create(data).get('header')).to.equal('x');
		})
		it('should map Under in selection name to U in header', function() {
			data.name = 'Jamie Under';
			expect(create(data).get('header')).to.equal('Jamie U');
		})
		it('should map Over in selection name to O in header', function() {
			data.name = 'Jamie Over';
			expect(create(data).get('header')).to.equal('Jamie O');
		})
		it('should remove {homeLine} from name and set homeLine=true', function() {
			data.name = 'Jamie {homeLine}';
			data.homeLine = false;
			expect(create(data).get('name')).to.equal('Jamie');
			expect(create(data).get('homeLine')).to.be.true;
		})
		it('should remove {Line} from name and set homeLineWithoutPlus=true', function() {
			data.name = 'Jamie {Line}';
			data.homeLineWithoutPlus = false;
			expect(create(data).get('name')).to.equal('Jamie');
			expect(create(data).get('homeLineWithoutPlus')).to.be.true;
		})
		it('should remove {awayLine} from name and set awayLine=true', function() {
			data.name = 'Jamie {awayLine}';
			data.awayLine = false;
			expect(create(data).get('name')).to.equal('Jamie');
			expect(create(data).get('awayLine')).to.be.true;
		})
	})

	xdescribe('Methods work as expected', function() {
		// TODO
	})

})
