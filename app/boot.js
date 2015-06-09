/* globals require */
import Backbone from "backbone";
import $ from "jquery";

// Load Backbone with jspm does not import jquery, so we need to do it
// manually. See https://github.com/jspm/registry/issues/234
Backbone.$ = $;

// kick off the app
System.import("app/app");
export default {};