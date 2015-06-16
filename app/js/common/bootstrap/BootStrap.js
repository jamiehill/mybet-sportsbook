import config from '../../configuration.json!';
import globals from '../core/Globals';
import DeferredQueue from '../core/DeferredQueue';
import BOOT_SEQUENCE from '../../app/AppConstants';


export default class BootStrap {
	constructor(){
		App.Config  = config;
		App.Globals = new globals;
		this.start();
	}

	/**
	 * On module startup automatically starts the sequence
	 */
	start() {
		var deferreds = App.bootstrap(),
			queue = new DeferredQueue(deferreds);
		queue.init().then(BOOT_SEQUENCE);
	}
};
