import AppLayout from './AppLayout';
import Header from './module/view/HeaderModule';
import SubNav from './module/view/SubNavModule';
import Main from './module/view/MainModule';
import Footer from './module/view/FooterModule';
import BetSlip from './module/view/BetSlipModule';
import {BOOT_COMPLETE} from './AppConstants';

// setup application instance
var Application = Marionette.Application.extend({

	/**
	 * Main boot sequence
	 */
	bootstrap() {
		return [
			'app/AppConfig',
			'common/bootstrap/DomainResolver',
			//'common/bootstrap/TranslatorConfig',
			//'common/bootstrap/RootLadder',
			//'common/bootstrap/GetRegionalSports'
		]
	},

	initialize() {
		this.$body  = $(document.body);
		this.ctx = di.createContext();

		// initialize src layout
		this.layout = new AppLayout();
		this.layout.render();

		// initialize context before views get initialized
		this.listenTo(this.vent, BOOT_COMPLETE, this.onStart);
	},


	onStart() {
		console.log('App: Start');
		this.ctx.initialize();

		// start main views
		App.module('Views.Header', Header);
		App.module('Views.SubNav', SubNav);
		App.module('Views.Main', Main);
		App.module('Views.BetSlip', BetSlip);
		App.module('Views.Footer', Footer);

		// then startup the routers
		Backbone.history.start({pushState: true, root: this.Urls.root});
	}
});

// exports singleton instance
let inst = new Application();
window.App = inst;
window.ctx = inst.ctx;
export default inst;
