import $ from 'jquery';
import _ from 'underscore';
import DeferredBase from './DeferredBase';


export default class Sequence extends DeferredBase {
	constructor(options) {
		super();
		_.bindAll(this, 'start', 'next', 'success', 'failure');
		this.options = _.extend(options, {scope: this});
		this.sequence = options.sequence;
	}


	/**
	 * Star the sequence
	 */
	start() {
		this.next();
	}


	/**
	 * Exeecute next deferred object in sequence
	 */
	next() {
		var obj, that = this;
		// if there's steps left in the sequence, action them
		if (!!this.sequence.length) {
			obj = new (this.sequence.shift())(this.options);
			obj.deferred.done(that.next).fail(that.fail);
			return;
		}
		// otherwise finish up
		this.success();
	}


	/**
	 * Should be called when the async operation completes successfully
	 * @param data
	 */
	success(data){
		console.log('Bootstrap: Complete');
		this.deferred.resolve(data);
	}


	/**
	 * Should be called when the async operation fails
	 * @param data
	 */
	failure(data){
		console.log('Bootstrap: Failure');
		this.deferred.reject(data);
	}

}
