import Deferred from '../common/core/Deferred';
import config from '../configuration.json!';
import globals from '../common/core/Globals';

import SportsBookModel from '../common/model/SportsBookModel';
import BonusEntitlement from '../common/model/BonusEntitlementModel';
import KeyMarkets from '../common/model/KeyMarketsModel';
import EventCache from '../common/model/EventCache';
import FeaturedEvents from '../common/model/FeaturedEventsModel';
import FrontPageModel from '../common/model/FrontPageModel';
import Session from '../common/model/SessionModel';
import MarketGroups from '../common/model/MarketGroupsModel';
import TimerModel from '../common/model/TimerModel';
import PopularBets from '../common/model/PopularBetsModel';
import RecentlyViewed from '../common/model/RecentViewedModel';
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
		// app
		ctx.register('vent').object(App.channel);
		ctx.register('commands').object(App.command);
		// models
		ctx.register('sportsBookModel', SportsBookModel);
		//ctx.register('bonusEntitlementModel', BonusEntitlement);
		//ctx.register('keyMarketsModel', KeyMarkets);
		ctx.register('eventCache', EventCache);
		//ctx.register('featuredEventsModel', FeaturedEvents);
		//ctx.register('sessionModel', Session);
		//ctx.register('marketGroupsModel', MarketGroups);
		//ctx.register('timerModel', TimerModel);
		//ctx.register('popularBetsModel', PopularBets);
		//ctx.register('recentlyViewedModel', RecentlyViewed);
		// factories
		ctx.register('oddsFactory', OddsFactory);
		// finish up
		this.success();
	}
}
