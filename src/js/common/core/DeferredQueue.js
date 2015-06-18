import Deferred from './Deferred';


export default class DeferredQueue extends Deferred {
	constructor(queue) {
		super();
		_.bindAll(this, 'next');
		this.queue = queue;
	}


	/**
	 * Starts the queue
 	 */
	initialize() {
		this.next();
	}


	/**
	 * Exeecute next deferred object in the queue
	 */
	next() {
		var that = this;
		console.log('Queuelength: '+this.queue.length);
		// if there's steps left in the sequence, action them
		if (!!this.queue.length) {
			var obj = this.queue.shift();
			if (_.isString(obj)) {
				console.log('Queue: [String] found :: importing module');
				System.import(obj).then(function(Obj) {
					console.log('Queue: [String] :: initializing module');
					obj = new Obj.default(that.options);
					obj.init().then(that.next).catch(that.failure);
				}).catch(that.failure);
			}

			else {
				console.log('Queue: [Object] found :: initializing module');
				obj = new (obj())(this.options);
				obj.init().done(that.next).fail(that.fail);
			}

			return;
		}
		console.log('Queue: Complete - calling success');
		// otherwise finish up
		this.success();
	}

}
