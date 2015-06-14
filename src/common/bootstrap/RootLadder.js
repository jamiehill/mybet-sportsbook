import _ from 'underscore';
import DeferredBase from './DeferredBase';
import factory from '../factory/OddsFactory';


export default class RootLadder extends DeferredBase {
	constructor(name) {
		super('RootLadder');
	}


	initialize() {
		factory.fetch().done(this.success);
	}

}
