//if (!document || !window) {
//	require('babel/register');
//
//	var jsdom = require('jsdom').jsdom;
//
//	global.document = jsdom('<html><head><script></script></head><body><div id="main"></div></body></html>', null, {
//		FetchExternalResources   : ['script'],
//		ProcessExternalResources : ['script'],
//		MutationEvents           : '2.0',
//		QuerySelector            : false
//	});
//
//	window = document.parentWindow;
//	navigator = window.navigator;
//	location = window.location;
//}
//
//$ = global.jQuery = require('jquery');
//
//var sinon = require('sinon');
//var chai = require('chai');
//var sinonChai = require('sinon-chai');
//
//chai.use(sinonChai);
//
//global.sinon = sinon;
//global.expect = chai.expect;
