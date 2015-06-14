import SportsBook from '../../app/App';
import DeferredBase from './DeferredBase';
import Translator from '../translation/Translator';


export default class TranslatorConfig extends DeferredBase {
	constructor(name) {
		super('TranslatorConfig');
	}


	initialize() {
		//SportsBook.translator = new Translator();
		//SportsBook.translator.on("onTranslatorReady", this.promise.resolve);
		//SportsBook.translator.build();
		this.success();
	}

}
