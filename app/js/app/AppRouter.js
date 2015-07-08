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
 * Can also use wildcard handlers.  If you add a 'onNoMatch' to any registered controller,
 * it will be trigger if a handler for the current route isn't present.  Similarly, for
 * static routes, ie. views that overlay the main view, such as login/register pages, you can
 * add a 'onStaticRoute' handler, that will be triggered when any static route is called
 *
 * @type {*|void}
 */
var Controller = RouteController.extend({
	appRoutes: {

		''                              		: 'onHome',
		'inplay'                         		: 'onHomeInplay',
		'dashboard'								: 'onDashboard',
		'login'									: 'onLogin',
		'register'								: 'onRegister',
		'deposit'								: 'onDeposit',

		':sport(/)'                      		: 'onSport',
		':sport/inplay'                  		: 'onSportInplay',
		':sport/competitions'           		: 'onCompetitions',

		':sport/event/*eventname?*id'  			: 'onEvent',
		':sport/outright/*outrightname?*id'		: 'onOutright',
		':sport/competition/*compname?*id'		: 'onCompetition',
		':sport/country/*countryname?*id'		: 'onCountry',

		'*splat'                        		: 'onNotFound'
	},

	// static routes aren't added to history
	staticRoutes: ['login', 'register', 'deposit']
});

let inst = new Controller();
export default inst;
