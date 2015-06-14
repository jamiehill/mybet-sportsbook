//var amdType = require('../lib/AMDModule');
//var cjsType = require('../lib/CJSModule');
//var es6Type = require('../lib/ES6Module');

//import amdType from '../lib/AMDModule';
//import cjsType from '../lib/CJSModule';
//import es6Type from '../lib/ES6Module';

xdescribe('Module Types', function() {

	it("should instantiate AMD Module and return it's name", function() {

		//System.import('../lib/AMDModule').then(function(amdType) {
		//	expect(amdType.type).toEqual("AhMD");
		//});

		expect(amdType.type).toEqual("AMD");
	});

	xit("should instantiate CJS Module and return it's name", function() {
		expect(cjsType.type).toEqual("CJS");
	});

	xit("should instantiate ES6 Module and return it's name", function() {
		expect(es6Type.type).toEqual("ES6");
	});
});
