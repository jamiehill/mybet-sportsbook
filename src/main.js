import _ from 'underscore';
import Backbone from 'backbone';
import SportsBook from './app/App';
import Bootstrap from './common/bootstrap/BootStrap';
import Header from './module/view/HeaderModule'
import Footer from './module/view/FooterModule'


// instantiate view modules.  modules not started
// with application startup, but will do upon
// AppEvents.BOOT_COMPLETE event dispatch
SportsBook.module('Views.Header', Header);
SportsBook.module('Views.Footer', Footer);

// instantiate core module
SportsBook.module('Bootstrap', Bootstrap);

// start her up.
SportsBook.start();
Backbone.history.start();

//_.delay(function() {
//	Backbone.history.navigate('contacts/1234');
//}, 3000);
