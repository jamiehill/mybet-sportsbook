import Deferred from '../common/defer/Deferred';
import config from '../configuration.json!';
import globals from '../common/Globals';

import SportsBookModel from '../common/model/SportsBookModel';
import EventCache from '../common/model/EventCache';
//import Session from '../common/model/SessionModel';
import OddsFactory from '../common/factory/OddsFactory';


export default class AppConfig extends Deferred {
	constructor() {
		super('AppConfig');
		// get config and globals
		App.Config  = config;
		App.Globals = new globals;
	}

	/**
	 * Add all item to register in the context here
	 */
	initialize() {
		// src
		ctx.register('vent').object(App.channel);
		// models
		ctx.register('sportsBookModel', SportsBookModel);
		ctx.register('eventCache', EventCache);
		//ctx.register('sessionModel', Session);
		// factories
		ctx.register('oddsFactory', OddsFactory);
		// finish up
		this.success();
	}
}
