import RouteController from 'core/controller/RouteController';


/**
 * Defines all application routes.  Any Object can subscribe to have
 * the handles - as defined below - invoked on them by subscribing
 * for route change notifications.
 *
 * Example:
 * import controller from 'app/AppRouter';
 *
 * class SomeClass {
 * 	constructor() {
 * 		controller.register(this);
 * 	}
 *
 * 	onHomeInplay() {
 * 	  // will be invoked when 'inplay' rote is triggered
 * 	}
 * }
 *
 * @type {*|void}
 */
var Controller = RouteController.extend({
	appRoutes: {

		''                              		: 'onHome',
		'inplay'                         		: 'onHomeInplay',
		'dashboard'								: 'onDashboard',

		':sport(/)'                      		: 'onSport',
		':sport/inplay'                  		: 'onSportInplay',
		':sport/competitions'           		: 'onCompetitions',

		':sport/event/*eventname?*id'  			: 'onEvent',
		':sport/outright/*outrightname?*id'		: 'onOutright',
		':sport/competition/*compname?*id'		: 'onCompetition',
		':sport/country/*countryname?*id'		: 'onCountry',

		'*splat'                        		: 'onNotFound'
	}
});

let inst = new Controller();
export default inst;
