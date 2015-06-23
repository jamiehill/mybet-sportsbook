import AppLayout from './AppLayout';
import DeferredQueue from 'core/defer/DeferredQueue';
import Header from './module/HeaderModule';
import SubNav from './module/SubNavModule';
import Main from './module/MainModule';
import Footer from './module/FooterModule';
import BetSlip from './module/BetSlipModule';
import {BOOT_COMPLETE} from './AppConstants';

// setup application instance
var Application = Marionette.Application.extend({
	bootstrap: [
		'app/AppConfig',
		'core/bootstrap/DomainResolver'
		//'core/bootstrap/TranslatorConfig',
		//'core/bootstrap/RootLadder',
		//'core/bootstrap/GetRegionalSports'
	],

	modules: {
		'Views.Header': Header,
		'Views.SubNav': SubNav,
		'Views.Main': 	Main,
		'Views.BetSlip': BetSlip,
		'Views.Footer': Footer
	},

	initialize() {
		this.$body  = $(document.body);
		this.ctx = di.createContext();

		// initialize src layout
		this.layout = new AppLayout();
		this.layout.render();

		// initialize context before views get initialized
		//this.listenTo(this.vent, BOOT_COMPLETE, this.start);
		this.prestart();
	},


	prestart() {
		console.log('App: Bootstrap - Start');
		var queue = new DeferredQueue(this.bootstrap),
			that  = this;
		queue.init().then(function() {
			console.log('App: Bootstrap - Complete');
			that.start();
		});
	},


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

	stop() {
		console.log("Backbone: history - stopped");
		Backbone.history.stop();
	}
});

// exports singleton instance
let inst = new Application();
window.App = inst;
window.ctx = inst.ctx;
export default inst;
