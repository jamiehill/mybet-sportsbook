import DeferredBase from '../core/Deferred';
import service from '../service/ApiService';


export default class GetRegionalSports extends DeferredBase {
	constructor() {
		super('GetRegionalSports');
	}


	initialize() {
		var model = ctx.get('sportsBookModel'), that = this;
		service.getRegionalSports().done(function(resp) {
			model.set({sports: resp.SportTypes.sports});
			that.success();
		});
	}

}
