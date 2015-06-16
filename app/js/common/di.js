//
//
//var Container = function Container(name) {
//	this.name = name;
//	this.map  = {};
//};
//
//_.extend(Container.prototype, {
//
//	/*
//
//	{
//		"registeredName": Object
//	}
//
//	 */
//	map: [],
//
//	initialize: function() {
//		_.each(this.map, function(obj) {
//			_.extend(obj, {instance: null});
//		});
//	},
//
//
//	get: function(name) {
//		var obj = this.map[name];
//		if (obj == void 0) {
//			throw new Error('Context does not have object named '+name+' registered');
//		}
//		if (obj.instance) {
//			return obj.instance;
//		}
//
//		obj.instance = new obj.
//		return obj.instance = new
//	}
//
//});
//
//export default class Container {
//	constructor(name = 'root', parent = {}) {
//		//TODO this.parent = parent;
//		this.name = name;
//	}
//
//	initialize() {
//
//	}
//
//
//	get(token) {
//		if (!this.singleton[token] && !this.proto[token]) {
//			throw Error('Token not registered : '+token+' for context : '+this.name);
//		}
//	}
//};
