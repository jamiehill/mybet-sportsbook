import Radio from 'backbone.radio';
import appRouter from './AppRouter';
import timestamp from 'core/system/NiceConsole';
import AppLayout from './AppLayout';
import TopNav from './view/topNav/TopNav';
import Dashboard from './view/header/Header';
import SubNav from './view/subNav/SubNav';
import SideBar from './view/sideBar/SideBar';
import Main from './view/main/Main';
import Footer from './view/footer/Footer';
import BetSlip from './view/betSlip/BetSlip';
import login from 'core/command/Login';


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
		//'core/system/bootstrap/GetSportData'
		//'core/system/bootstrap/TranslatorConfig',
		//'core/system/bootstrap/GetRegionalSports'
	],

	modules: {
		'Views.TopNav': TopNav,
		'Views.Dashboard': Dashboard,
		'Views.SubNav': SubNav,
		'Views.SideBar': SideBar,
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

		// commands
		App.command = App.bus.command;

		// initialize src layout
		this.layout = new AppLayout();
		this.layout.render();

		timestamp(console);
		this.prestart();
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

		this.postStart();
	},

	/**
	 * Shut down applicatiopn
	 */
	onStop() {
		console.log("Backbone: history - stopped");
		Backbone.history.stop();
		Radio.reset();
	},


	/**
	 * kick the boot sequence off
	 */
	prestart() {
		console.log('App: PreStart');
		var that = this;
		System.import('core/CoreModule').then(function(inst){
			var module = App.module('Core', inst.default);
			module.boot(that.bootstrap).then(that.start);
		});
	},


	/**
	 * Startup router and history
	 */
	postStart() {
		console.log('App: PostStart');
		this.Router = appRouter.start();

		var options = {pushState: true, root: this.Urls.root || ''};
		Backbone.history.start(options);

		//var index = window.location.pathname.indexOf('index.html');
		//if (~index) {
		//	window.location.pathname = window.location.pathname.substring(0, index);
			//Backbone.history.navigate(url, {trigger: false, replace: true});
		//}

		login('test1', 'test1');
	},


	/**
	 * Shortcut for navigating to specified route
	 */
	navigate(route = '', trigger = true, replace = true) {
		Backbone.history.navigate(route, {trigger: trigger, replace: replace});
	}
});

// exports singleton instance
let inst = new Application();
export default inst;
