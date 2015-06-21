import AppLayout from './AppLayout';
import Header from './module/view/HeaderModule';
import SubNav from './module/view/SubNavModule';
import Main from './module/view/MainModule';
import Footer from './module/view/FooterModule';
import BetSlip from './module/view/BetSlipModule';
import {BOOT_COMPLETE} from './AppConstants';

// setup application instance
var Application = Marionette.Application.extend({
	bootstrap: [
		'app/AppConfig',
		'common/bootstrap/DomainResolver'
		//'common/bootstrap/TranslatorConfig',
		//'common/bootstrap/RootLadder',
		//'common/bootstrap/GetRegionalSports'
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
		this.listenTo(this.vent, BOOT_COMPLETE, this.start);
	},


	onStart() {
		console.log('App: Start');
		this.ctx.initialize();

		console.log("Modules: "+this.modules);

		// initialize and start each required module
		_.each(this.modules, function(Module, name) {
			console.log("Module: "+name);
			App.module(name, Module).start();
		});

		// then startup the routers
		Backbone.history.start({pushState: true, root: this.Urls.root || ''});
	},

	stop() {
		Backbone.history.stop();
	}
});

// exports singleton instance
let inst = new Application();
window.App = inst;
window.ctx = inst.ctx;
export default inst;
