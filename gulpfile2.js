/**
 * @author    Jamie Hill
 * @license   GPL-3.0
 */
'use strict';

// this will automatically compile gulp tasks files on the fly from ES6 to ES5
require('babel/register');

// require all tasks
require('require-dir')('./gulp/tasks', { recurse: true });
