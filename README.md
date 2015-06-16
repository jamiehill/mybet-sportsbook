MyBet Sportsbook
================


Setup
-----
Clone the repository and install the dependencies.

    $ git clone https://github.com/jamiehill/mybet-sportsbook.git
    $ cd mybet-sportsbook
    $ npm install
    $ jspm install
    $ run index.html

Migration notes
---------------

* Marionette, Backbone, ctx, $ and _ added as globals, so no need to explicitly import anymore
* syntax for importing html is now 'app/view/myview.tpl.html!text' NOT 'text!app/view/myview.tpl.html'
