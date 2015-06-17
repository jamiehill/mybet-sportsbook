export default class Deferred {
	constructor(name = 'Deferred') {
		_.bind(this.initialize, this);
		this.name = name;
	}


	/**
	 * Starts the async operation
	 * @returns {Promise}
	 */
	init() {
		var that = this;
		return new Promise(function(resolve, reject) {
			that.success = _.wrap(resolve, function(f) {
				console.log('Bootstrap: '+that.name+' - Success');
				f();
			});
			that.failure = _.wrap(reject, function(f) {
				console.log('Bootstrap: '+this.name+' - Failure');
				f();
			});
			that.initialize();
		});
	}


	/**
	 * Override in subclasses
	 */
	initialize() {

	}
}
