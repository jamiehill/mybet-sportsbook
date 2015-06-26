import RouteController from 'core/controller/RouteController';


var Controller = RouteController.extend({
	appRoutes: {
		''                              : 'onHome',
		'dashboard'						: 'onDashboard',
		'*splat'                        : 'onNotFound'
	}
});

let inst = new Controller();
export default inst;
