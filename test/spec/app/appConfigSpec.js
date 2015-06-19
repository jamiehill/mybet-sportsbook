import App from '../../../src/js/app/App';

describe("- AppConfigg.spec.js\n", function() {
	var ctx, Model = Backbone.Model.extend({
		id: "someModel",
		dependencies: 'string, str=string'
	});
	var singleton = function(){
		return ctx.get('singleton');
	};
	var newInstance = function(){
		return ctx.get('newInstance');
	};
	var constructor = function(){
		return ctx.get('constructor');
	};

	// Setup/teardown ------------------------------------------


	beforeEach(function(){
		ctx = di.createContext();
		ctx.register('singleton', Model);
		ctx.register('constructor', Model, {arg: 'someArg'});
		ctx.register('newInstance', Model).strategy(di.strategy.proto);
		ctx.register('string').object('helloJamie');
		ctx.initialize();
	});

	afterEach(function(){
		ctx.clear();
		ctx = null;
	});


	// Specs ----------------------------------------------------


	describe("initialization", function() {
		it("should have ctx", function() {
			expect(ctx).to.be.defined;
		});
		it("should have 4 registrations", function() {
			expect(_.size(ctx.map)).to.equal(4);
		});
	});


	describe("singletons", function() {
		it("can register object by key", function () {
			expect(singleton()).to.be.instanceof(Model);
		});
		it("should give same instance of singleton", function() {
			expect(singleton()).to.equal(singleton());
		});
	});


	describe("newInstances", function() {
		it("can register object by key", function () {
			expect(newInstance()).to.be.instanceof(Model);
		});
		it("should give different instance each time", function() {
			expect(newInstance()).not.to.equal(newInstance());
		});
	});


	describe("existing objects", function() {
		it("can register existing object to be managed", function () {
			ctx.register('obj').object({hello:'Jamie'});
			expect(ctx.get('obj').hello).to.equal('Jamie');
		});
	});


	describe("arguments", function() {
		it("can pass constructor arguments to instance", function () {
			expect(constructor().get('arg')).to.equal('someArg');
		});
	});


	describe("dependencies resolution", function() {
		it("can inject dependencies into instance", function () {
			expect(singleton().string).to.equal('helloJamie');
		});
		it("can inject dependencies by alias into instance", function () {
			expect(singleton().str).to.equal('helloJamie');
		});
	});


	describe("destruction", function() {
		it("should destroy the context when instructed", function () {
			ctx.clear();
			expect(_.size(ctx.map)).to.equal(0);
		});
	});

});

