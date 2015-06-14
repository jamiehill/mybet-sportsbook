import _ from 'underscore';
import Backbone from 'backbone';
import $ from 'jquery';
Backbone.$ = $;
import Marionette from 'backbone.marionette';

//import sinon from 'sinon';
//import chai from 'chai';
//chai.use(sinonChai);

//sinon = sinon;
expect = chai.expect;

//before(function() {
//	global._ = _;
//	global.Backbone = Backbone;
//	global.Marionette = Marionette;
//});
//
//beforeEach(function() {
//	this.sinon = sinon.sandbox.create();
//	global.stub = this.sinon.stub.bind(this.sinon);
//	global.spy  = this.sinon.spy.bind(this.sinon);
//});
//
//afterEach(function() {
//	this.sinon.restore();
//	Backbone.history.stop();
//});
