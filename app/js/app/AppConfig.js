import Deferred from 'core/system/defer/Deferred';
import config from '../configuration.json!';
import globals from 'core/Globals';

import EventCache from 'core/model/EventCache';
import SessionModel from 'core/model/SessionModel';
//import OddsFactory from 'core/model/factory/OddsFactory';


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
		ctx.register('vent').object(App.vent);
		// models
		//ctx.register('sessionModel', SessionModel);
		ctx.register('eventCache', EventCache);
		// factories
		//ctx.register('oddsFactory', OddsFactory);
		// finish up
		this.success();
	}
}
