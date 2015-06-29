import RouteController from 'core/controller/RouteController';


var Controller = RouteController.extend({
	appRoutes: {
		''                              : 'onHome',
		':sport/event/:id(/)'           : 'onEvent',
		':sport/competitions'           : 'onSportCompetitions',
		'dashboard'						: 'onDashboard',
		'*splat'                        : 'onNotFound'
	}
});

let inst = new Controller();
export default inst;
