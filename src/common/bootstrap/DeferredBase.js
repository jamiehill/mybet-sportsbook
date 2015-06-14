import $ from 'jquery';
import _ from 'underscore';
import q from 'q';

export default class DeferredBase {
	constructor(name = 'DeferredBase') {
		_.bindAll(this, 'initialize', 'success', 'failure');
		this.deferred = $.Deferred();
		this.name = name;
		this.initialize();
	}


	/**
	 * Override in subclasses
	 */
	initialize() {

	}


	/**
	 * Should be called when the async operation completes successfully
	 * @param data
	 */
	success(data){
		console.log('Bootstrap: '+this.name+' - Success');
		this.deferred.resolve(data);
	}


	/**
	 * Should be called when the async operation fails
	 * @param data
	 */
	failure(data){
		console.log('Bootstrap: '+this.name+' - Failure');
		this.deferred.reject(data);
	}
}
