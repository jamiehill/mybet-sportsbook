import Deferred from './Deferred';

export default class DummyDeferred extends Deferred {
	constructor(name, resolution = 'resolve', delay = '1000') {
		super('DummyDeferred');
		this.resolution = resolution;
		this.delay = delay;
	}

	init() {
		var that = this;
		var promise = new Promise(function(resolve, reject) {
			if (that.resolution == 'resolve') var func = resolve;
			if (that.resolution == 'reject')  var func = reject;
			_.delay(func, that.delay);
		});
		this.initialize();
		return promise;
	}

}
