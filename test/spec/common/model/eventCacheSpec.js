import SportsBook from '../../../../app/js/app/App';
import cache from '../../../../common/model/EventCache';

describe("EventCache", function() {


	// Setup/teardown ------------------------------------------
	// Specs ----------------------------------------------------


	describe("initialization", function() {
		it("should be defined", function() {
			expect(cache).to.be.ok;
		});
	});

});
