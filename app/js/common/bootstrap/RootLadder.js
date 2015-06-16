import DeferredBase from '../core/Deferred';


export default class RootLadder extends DeferredBase {
	constructor(name) {
		super('RootLadder');
	}


	initialize() {
		ctx.get('oddsFactory')
			.fetch().done(this.success);
	}

}
