import config from '../../configuration.json!';
import BOOT_COMPLETE from '../../app/AppEvents';
import SportsBook from '../../app/App';
import DomainResolver from '../../common/bootstrap/DomainResolver';
import Translator from '../../common/bootstrap/TranslatorConfig';
import RootLadder from '../../common/bootstrap/RootLadder';
import Sequence from './Sequence';


export default Marionette.Module.extend({

	bootSequence: [
		DomainResolver,
		Translator,
		RootLadder
	],

	/**
	 * Initializes the bootstrap sequence
	 */
	initialize(){
		SportsBook.Config = config;
	},

	/**
	 * On module startup automatically starts the sequence
	 */
	onStart() {
		var that = this,
			sequence = new Sequence({sequence: this.bootSequence});
		sequence.deferred.done(that.sequenceComplete);
		sequence.start();
	},

	/**
	 * Dispatch 'boot complete' when done
	 */
	sequenceComplete() {
		SportsBook.vent.trigger(BOOT_COMPLETE);
	}
});
