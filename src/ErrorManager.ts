"use strict";
/// <reference path="../typings/node/node.d.ts" />

// See https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script for color reference

import * as util from 'util';

/** Gets or sets whether to break on errors. */
export var breakOnErrors: boolean = false;

/** Gets or sets whether to break on warnings. */
export var breakOnWarnings: boolean = false;

/** Gets whether errors occurred. */
export var gotErrors: boolean = false;

/** Logs an error into the console. */
export function logError(url: string, lineNum: number, errorFormat: string, ...params: any[]) {
	if (breakOnErrors) debugger;
	gotErrors = true;
	var errorString = util.format.apply(null, [errorFormat].concat(params)); 
	console.log("\x1b[36m\x1b[31m%s, line %d: error: %s\x1b[0m", url, lineNum, errorString);
}

/** Logs a warning into the console. */
export function logWarning(url: string, lineNum: number, errorFormat: string, ...params: any[]) {
	if (breakOnWarnings) debugger;
	var errorString = util.format.apply(null, [errorFormat].concat(params));
	console.log("\x1b[36m\x1b[33m%s, line %d: warning: %s\x1b[0m", url, lineNum, errorString);
}

/** Logs a verbose message into the console. */
export function logVerbose(errorFormat: string, ...params: any[]) {
	var errorString = util.format.apply(null, [errorFormat].concat(params));
	console.log("\x1b[2m\x1b[37m%s\x1b[0m", errorString);
}