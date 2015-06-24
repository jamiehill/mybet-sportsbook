import Radio from 'backbone.radio';
import timestamp from 'core/system/NiceConsole';
import AppLayout from './AppLayout';
import Header from './module/HeaderModule';
import SubNav from './module/SubNavModule';
import Main from './module/MainModule';
import Footer from './module/FooterModule';
import BetSlip from './module/BetSlipModule';
import {BOOT_COMPLETE} from './AppConstants';


var Application = Marionette.Application.extend({
	$body: $(document.body),


	bootstrap: [
		'app/AppConfig',
		'core/system/bootstrap/DomainResolver',
		//'core/system/bootstrap/TranslatorConfig',
		'core/system/bootstrap/RootLadder',
		'core/system/bootstrap/GetRegionalSports'
	],

	modules: {
		'Views.Header': Header,
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

		// setup our channels
		App.session = Radio.channel('session');
		App.socket  = Radio.channel('socket');
		App.bus 	= Radio.channel('bus');

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
		// and load/start the boot sequence
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
		Backbone.history.start({pushState: true, root: this.Urls.root || ''});
	},

	/**
	 * Shut down applicatiopn
	 */
	stop() {
		console.log("Backbone: history - stopped");
		Backbone.history.stop();
	}
});

// exports singleton instance
let inst = new Application();
export default inst;
