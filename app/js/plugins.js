import 'core/system/shims/marionette-shim';

import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

// set jquery on backbone
Backbone.$ = $;
// globals
window._ = _;
window.$ = $;

import Marionette from 'backbone.marionette';
window.Marionette = Marionette;

//import radioshim from 'common/shims/radio.shim';
//import script from './static/script';
import di from 'di-lite';
import _s from 'underscore.string';
//import mixins from 'app/core/framework/mixins';
import cookie from 'jquery-cookie';

// mixin underscore.string
_.mixin(_s.exports());
_.includes = _.include;

