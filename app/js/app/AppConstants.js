'use strict';

//import pkg from '../../../package';

//export const DEBUG = (process.env.NODE_ENV !== 'production');
//export const APP_TITLE = pkg.name;
export const BOOT_COMPLETE = "App:BootComplete";


export function trigger(msg = BOOT_COMPLETE) {
	console.log("Trigger: "+msg);
	App.vent.trigger(msg);
};
