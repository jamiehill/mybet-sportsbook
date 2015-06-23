import Deferred from 'core/defer/Deferred';
import config from '../configuration.json!';
import globals from 'core/Globals';

import SportsBookModel from 'core/model/SportsBookModel';
import EventCache from 'core/model/EventCache';
import SessionModel from 'core/model/SessionModel';
import OddsFactory from 'core/factory/OddsFactory';


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
		ctx.register('sessionModel', SessionModel);
		ctx.register('sportsBookModel', SportsBookModel);
		ctx.register('eventCache', EventCache);
		// factories
		ctx.register('oddsFactory', OddsFactory);
		// finish up
		this.success();
	}
}
