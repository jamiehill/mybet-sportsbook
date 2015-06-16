import DeferredQueue from 'common/core/DeferredQueue';
import {trigger} from './app/AppConstants';

console.log('Bootstrap: Start');

var deferreds = App.bootstrap(),
	queue = new DeferredQueue(deferreds);
queue.init().then(trigger);
