import SportsBook from './app/App';
import DeferredQueue from 'common/core/DeferredQueue';
import Bootstrap from './common/bootstrap/BootStrap';
import {trigger} from './app/AppConstants';

//import Header from 'app/module/view/HeaderModule'
//import BetSlip from 'app/module/view/BetSlipModule'
//import Footer from 'app/module/view/FooterModule'


// initialize view modules.
//SportsBook.module('Views.Header', Header);
//SportsBook.module('Views.BetSlip', BetSlip);
//SportsBook.module('Views.Footer', Footer);

// instantiate core module
//SportsBook.module('Bootstrap', Bootstrap);

// start the boot sequence
//var deferreds = App.bootstrap(),
//	queue = new DeferredQueue(deferreds);
//queue.init().then(
//	_.bind(SportsBook.start, SportsBook)
//);

console.log('Bootstrap: Start');

var deferreds = App.bootstrap(),
	queue = new DeferredQueue(deferreds);
queue.init().then(trigger);
