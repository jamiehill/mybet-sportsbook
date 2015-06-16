Marionette JSPM/ES6 Project
===========================

A Hello World built with Backbone Marionette, using JSPM for dependencies and SystemJS for ES6 module loading.  This is intentionally skeletal, and should be used as a starting point for developing Marionette applications, requiring ECMAScript 6 support.

Setup
-----
Clone the repository and install the dependencies.

    $ git clone https://github.com/jamiehill/marionette-jspm.git
    $ cd marionette-jspm
    $ npm install
    $ jspm install
    $ run index.html

Migration notes
---------------

Imports

* 'marionette' should be replaced with 'backbone.marionette'
* syntax for importing html is now 'app/view/myview.tpl.html!text' not 'text!app/view/myview.tpl.html'

Depreciations

Context no longer used.  do not import 'ctx'.  All contextual objects now available on the root SportsBook app object.

Licence
-------
Licensed under the MIT license.
