MyBet Sportsbook
================


Setup
-----
Clone the repository and install the dependencies.

    $ git clone https://github.com/jamiehill/mybet-sportsbook.git && cd mybet-sportsbook
    $ npm run preinstall
    $ npm install (may need to use sudo if fails)
    $ npm run postinstall
    $ run index.html on localhost

**NB/ Gulp build process is currently not functional in the current commit**

Possibly Issues
---------------

**1. Vendor Paths**

For some reason, when installing new modules, JSPM incorrectly modifies the vendor paths in `config.js`.  If you get `babel-core` missing errors in the console check that the paths section in `config.js` reads:

	System.config({
		...
		"paths": {
			"*": "*.js",
			"github:*": "../../vendor/github/*.js",
			"npm:*": "../../vendor/npm/*.js",
			"core*": "../../modules/core-module/src/js/core*.js",
			"highlights*": "../../modules/highlights-module/src/js/highlights*"
		},
		...
	})

**2. Marionette Path**

Ensure the **backbone.marionette** entry in `config.js`, in the `System.config({ "map": {})` object, is pointing to the bundled version, not the default.  The mapping should also, NOT be prefixed with `marionettejs`.

It should read:

	System.config({
		"map": {
			...
			"backbone.marionette": "github:marionettejs/backbone.marionette@2.4.1/lib/backbone.marionette"
			...
		}
	})

NOT:

	System.config({
		"map": {
			...
			"marionettejs/backbone.marionette": "github:marionettejs/backbone.marionette@2.4.1"
			...
		}
	})

**3. Marionette Shim**

There also needs to be a marionette-shim entry, in the `System.config({ "map": {})` object, to ensure marionettes dependencies are imported in the correct order.  Check that the followiing is present, and if not, add it:

	System.config({
      "map": {
      	...
		"marionette-shim": "../../modules/core-module/src/js/core/system/shims/marionette-shim"
		...
	  }
	 })

Karma
-----
	$ npm run tests

Migration notes
---------------

* `Marionette`, `Backbone`, `ctx`, `$` and `_` added as globals, so no need to explicitly import anymore
* syntax for importing html is now `'app/view/myview.tpl.html!text'` NOT `'text!app/view/myview.tpl.html'`
* can natively import json `'configuration.json!'`, css `'styles/main.css!'`, and react components `'myComponent.js!'`
