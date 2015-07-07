/**
 * @author    Jamie Hill
 */
'use strict';

import util from 'gulp-util';
import moment from 'moment';
import pkg from '../package.json';

export const API_URL = 'http://sports.qacore.pyr';
export const CDN_URL = 'http://your-cdn-url.com/'; // make sure you include slash in the end!!
export const HAS_CDN = !!util.env.cdn;

const argv = util.env;
export const ENV = !!argv.env ? argv.env : 'DEV';
export const DEV = !!ENV.match(new RegExp(/dev|test/i));
export const VERSION = !!argv.build ? argv.build : '';

export const LOG = util.log;
export const COLOURS = util.colors;

// swicth between self contained SFX
// builds and non self-contained
export const SFX = false;


/**
 * This banner is added to the top of the production source file/s
 */
export const BANNER = util.template(
	'/**\n' +
	' * <%= pkg.description %>\n' +
	' * @version <%= pkg.version %> - <%= today %>\n' +
	' * @author <%= pkg.author.name %>\n' +
	' * @copyright <%= year %>(c) <%= pkg.author.name %>\n' +
	' * @license <%= pkg.license %>\n' +
	' */\n', {file: '', pkg: pkg, today: moment(new Date()).format('D/MM/YYYY'), year: new Date().toISOString().substr(0, 4)}
);
