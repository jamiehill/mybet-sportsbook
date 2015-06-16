import DeferredBase from '../core/Deferred';
import Translator from '../../common/translation/Translator';


export default class TranslatorConfig extends DeferredBase {
	constructor(name) {
		super('TranslatorConfig');
	}


	initialize() {
		App.Translator = new Translator();
		//App.translator.on("onTranslatorReady", this.promise.resolve);
		App.Translator.build();
		this.success();
	}

}
