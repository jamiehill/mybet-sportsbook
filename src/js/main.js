import SportsBook from './app/App';
import DeferredQueue from 'common/defer/DeferredQueue';
import {trigger} from './app/AppConstants';

console.log('Bootstrap: Start');

var defer = SportsBook.bootstrap(),
	queue = new DeferredQueue(defer);
queue.init().then(trigger);
