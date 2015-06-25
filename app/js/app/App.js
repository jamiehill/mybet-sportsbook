import Radio from 'backbone.radio';
import timestamp from 'core/system/NiceConsole';
import AppLayout from './AppLayout';
import TopNav from './view/topNav/TopNav';
import Dashboard from './view/header/Header';
import SubNav from './view/subNav/SubNav';
import Main from './view/main/Main';
import Footer from './view/footer/Footer';
import BetSlip from './view/betSlip/BetSlip';


var Application = Marionette.Application.extend({

	// setup our channels
	session: Radio.channel('session'),
	socket:  Radio.channel('socket'),
	router:  Radio.channel('router'),
	bus:  	 Radio.channel('bus'),


	bootstrap: [
		'app/AppConfig',
		'core/system/bootstrap/DomainResolver',
		'core/system/bootstrap/MarionetteConfig',
		'core/system/bootstrap/GetSportData'
		//'core/system/bootstrap/TranslatorConfig',
		//'core/system/bootstrap/GetRegionalSports'
	],

	modules: {
		'Views.TopNav': TopNav,
		'Views.Dashboard': Dashboard,
		'Views.SubNav': SubNav,
		'Views.Main': 	Main,
		'Views.BetSlip': BetSlip,
		'Views.Footer': Footer
	},

	/**
	 * Initialize the app layout
	 */
	initialize() {
		_.bindAll(this, 'start');

		window.App = this;
		window.ctx = this.ctx = di.createContext();

		// initialize src layout
		this.layout = new AppLayout();
		this.layout.render();

		timestamp(console);
		this.prestart();
	},

	/**
	 * kick the boot sequence off
	 */
	prestart() {
		var that = this;
		System.import('core/CoreModule').then(function(inst){
			var module = App.module('Core', inst.default);
			module.boot(that.bootstrap).then(that.start);
		});
	},

	/**
	 * On start kick off the views
	 */
	onStart() {
		console.log('App: Start');
		this.ctx.initialize();

		// initialize and start each required module
		_.each(this.modules, function(Module, name) {
			App.module(name, Module).start();
		});



		// then startup the routers
		console.log("Backbone: history - started");
		Backbone.history.on('route', this.onRoute);
		Backbone.history.start({pushState: true, root: this.Urls.root || ''});
	},

	/**
	 * Shut down applicatiopn
	 */
	onStop() {
		console.log("Backbone: history - stopped");
		Backbone.history.stop();
	},


	/**
	 * Broadcast global route changes
	 */
	onRoute(router, name, args) {
		console.log('Router: '+name);
		App.router.trigger('route:change', name);
	}
});

// exports singleton instance
let inst = new Application();
export default inst;
