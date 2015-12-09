"use strict";
/// <reference path="../typings/node/node.d.ts" />

import * as fs from 'fs';
import {OutputFile} from './OutputFile';
import {DownloadManager} from './DownloadManager';
import * as mk from './MarkdownUtils';
import * as gen from './DefinitionGenerator';
import * as ErrorManager from './ErrorManager';

//ErrorManager.breakOnErrors = true;
//ErrorManager.breakOnWarnings = true;

async function main(): Promise<void> {
	const rawBaseUrl = 'https://raw.githubusercontent.com/atom/electron/v0.35.4/docs/api';
	const htmlBaseUrl = 'https://github.com/atom/electron/blob/v0.35.4/docs/api';
	
	// Create the download manager.
	var downloadManager = new DownloadManager(rawBaseUrl, 'cache/electron-v0.35.4-docs-api');
	async function downloadAsync(fileName: string) {
		var fileContent = await downloadManager.downloadAsync(fileName);
		return {
			name: fileName,
			content: fileContent,
			htmlUrl: htmlBaseUrl + '/' + fileName
		};
	}
	
	// ------------------- Download

	// Download stuff.
	var app_md = await downloadAsync('app.md');
	var autoUpdater_md = await downloadAsync('auto-updater.md');
	var browserWindow_md = await downloadAsync('browser-window.md');
	var clipboard_md = await downloadAsync('clipboard.md');
	var contentTracing_md = await downloadAsync('content-tracing.md');
	
	// ------------------- Parse
	var parsedContent = <gen.GeneratedOutput[]>[];
	
	// Parse app.md.
	var parsed_app_md = gen.generate(app_md.htmlUrl, app_md.content, gen.OutputMode.Module);
	parsed_app_md.patchMethodReturnType('getAppPath', 'string');
	parsed_app_md.patchMethodReturnType('getPath', 'string');
	parsed_app_md.patchMethodReturnType('getVersion', 'string');
	parsed_app_md.patchMethodReturnType('getName', 'string');
	parsed_app_md.patchMethodReturnType('getLocale', 'string');
	parsed_app_md.patchMethodReturnType('dock.bounce', 'number');
	parsed_app_md.patchMethodReturnType('dock.getBadge', 'string');
	parsed_app_md.patchMethodParameterType('makeSingleInstance', 'callback', '(argv: string[], workingDirectory: string) => boolean');
	parsed_app_md.patchEventReturnParameterType('certificate-error', 'callback', '(value: boolean) => void');
	parsed_app_md.patchEventReturnParameterType('select-client-certificate', 'callback', '(value: any) => void');
	parsed_app_md.patchEventReturnParameterType('login', 'callback', '(username: string, secret: string) => void');
	parsedContent.push(parsed_app_md);
	
	// Parse auto-updater.md.
	var parsed_autoUpdater_md = gen.generate(autoUpdater_md.htmlUrl, autoUpdater_md.content, gen.OutputMode.Module);
	parsedContent.push(parsed_autoUpdater_md);
	
	// Parse browser-window.md.
	var parsed_browserWindow_md = gen.generate(browserWindow_md.htmlUrl, browserWindow_md.content, gen.OutputMode.Class);
	parsed_browserWindow_md.patchMethodReturnType('getAllWindows', 'BrowserWindow[]');
	parsed_browserWindow_md.patchMethodReturnType('getFocusedWindow', 'BrowserWindow');
	parsed_browserWindow_md.patchMethodReturnType('fromWebContents', 'BrowserWindow');
	parsed_browserWindow_md.patchMethodReturnType('fromId', 'BrowserWindow');
	parsed_browserWindow_md.patchPropertyType('webContents', 'WebContents');
	parsed_browserWindow_md.patchPropertyType('id', 'number');
	parsed_browserWindow_md.patchMethodParameterType('setAspectRatio', 'aspectRatio', 'number');
	parsed_browserWindow_md.patchMethodReturnType('getBounds', '{ x: number; y: number; width: number; height: number; }');
	parsed_browserWindow_md.patchMethodReturnType('getContentSize', 'number[]');
	parsed_browserWindow_md.patchMethodReturnType('getMinimumSize', 'number[]');
	parsed_browserWindow_md.patchMethodReturnType('getMaximumSize', 'number[]');
	parsed_browserWindow_md.patchMethodReturnType('getPosition', 'number[]');
	parsed_browserWindow_md.patchMethodReturnType('getSize', 'number[]');
	parsed_browserWindow_md.patchMethodReturnType('getTitle', 'string');
	parsed_browserWindow_md.patchMethodReturnType('getRepresentedFilename', 'string');
	parsed_browserWindow_md.patchMethodReturnType('setThumbarButtons', 'boolean');
	parsedContent.push(parsed_browserWindow_md);
	
	// Parse clipboard.md.
	var parsed_clipboard_md = gen.generate(clipboard_md.htmlUrl, clipboard_md.content, gen.OutputMode.Module);
	parsed_clipboard_md.patchMethodReturnType('readText', 'string');
	parsed_clipboard_md.patchMethodReturnType('readHtml', 'string');
	parsed_clipboard_md.patchMethodReturnType('readImage', 'NativeImage');
	parsed_clipboard_md.patchMethodReturnType('availableFormats', 'string[]');
	parsed_clipboard_md.patchMethodReturnType('has', 'boolean');
	parsed_clipboard_md.patchMethodReturnType('read', 'any');
	parsedContent.push(parsed_clipboard_md);
	
	// Parse content-tracing.md.
	var parsed_contentTracing_md = gen.generate(contentTracing_md.htmlUrl, contentTracing_md.content, gen.OutputMode.Module);
	parsedContent.push(parsed_contentTracing_md);
	
	// ------------------- Code Generation
	
	function toCamelCase(s: string): string {
		return s.charAt(0).toUpperCase() + s.substring(1);
	}

	// Create the output file.
	var outputFile = new OutputFile('typings/electron/electron.d.ts');
	
	function emitAnonymousTypeMembers(members: gen.ParameterDefinition[]) {
		outputFile.write('{ ');
		members.forEach(member => {
			outputFile.write(member.name);
			if (member.optional)
				outputFile.write('?');
			outputFile.write(': ');
			if (member.type)
				outputFile.write(member.type);
			else {
				emitAnonymousType(member.anonymousType);
			}
			outputFile.write('; ');
		});
		outputFile.write('}');
	}
	
	function emitAnonymousType(type: gen.AnonymousTypeDefinition) {
		emitAnonymousTypeMembers(type.members);
		if (type.isArray)
			outputFile.write('[]');
	}
	
	function emitParameterList(params: gen.ParameterDefinition[]) {
		params.forEach((parameter, parameterIndex) => {
			if (parameterIndex > 0)
				outputFile.write(', ');
			outputFile.write(parameter.name);
			if (parameter.optional)
				outputFile.write('?');
			outputFile.write(': ');
			if (parameter.type)
				outputFile.write(parameter.type);
			else {
				emitAnonymousType(parameter.anonymousType);
			}
		});
	}
	
	function emitPlatformAwareComment(comment: string, platforms: string[]) {
		if (platforms) {
			outputFile.writeLineFormat('/** (%s) %s */', platforms.join(', '), comment);
		} else {
			outputFile.writeLineFormat('/** %s */', comment);
		}
	}
	
	function emitProperty(property: gen.PropertyDefinition) {
		// Write comment.
		emitPlatformAwareComment(property.comment, property.platforms);
		// Write it.
		outputFile.writeFormat('%s: ', property.name);
		if (property.type)
			outputFile.write(property.type);
		else
			emitAnonymousType(property.anonymousType);
		outputFile.writeLine(';');
	}
	
	function emitMethod(method: gen.MethodDefinition, isCtor?: boolean) {
		// Write comment.
		emitPlatformAwareComment(method.comment, method.platforms);
		method.parameters.forEach(parameter => {
			if (parameter.comment) {
				outputFile.writeLineFormat('/** @param %s - %s */', parameter.name, parameter.comment);
			}
		});
		if (method.returns && method.returns.comment) {
			outputFile.writeLineFormat('/** @returns %s */', method.returns.comment);
		}
		// Write method name.
		if (isCtor)
			outputFile.write('constructor(');
		else if (method.isStatic)
			outputFile.writeFormat('static %s(', method.name);
		else
			outputFile.writeFormat('%s(', method.name);
		// Write parameters.
		emitParameterList(method.parameters);
		if (isCtor) {
			outputFile.writeLine(');');
		} else {
			outputFile.write('): ');
			// Write return type.
			if (method.returns) {
				if (method.returns.anonymousType)
					emitAnonymousType(method.returns.anonymousType);
				else
					outputFile.write(method.returns.type);
			} else {
				outputFile.write('void');
			}
			outputFile.writeLine(';');
		}
	}
	
	function emitGroup(group: gen.DefinitionGroup) {
		outputFile.writeLineFormat('%s: {', group.name);
		outputFile.indent();
		if (group.properties && group.properties.length > 0) {
			group.properties.forEach(property => emitProperty(property));
		}
		if (group.methods && group.methods.length > 0) {
			group.methods.forEach(method => emitMethod(method));
		}
		outputFile.unindent();
		outputFile.writeLine('};');
	}
	
	function emitParsedContent(content: gen.GeneratedOutput) {
		// Emit comment.
		outputFile.writeLineFormat('// Code generated from %s', content.url);
		outputFile.writeLine();
		
		// Emit data types.
		if (content.dataTypes && content.dataTypes.length > 0) {
			content.dataTypes.forEach(dataType => {
				if (dataType.isInterface)
					outputFile.writeLineFormat('interface %s {', dataType.name);
				else
					outputFile.writeLineFormat('class %s {', dataType.name);
				outputFile.indent();
				if (dataType.members && dataType.members.length > 0)
					dataType.members.forEach(member => {
						// Write comment.
						outputFile.writeLineFormat('/** %s */', member.comment);
						// Write member definition.
						outputFile.write(member.name);
						if (member.optional)
							outputFile.write('?');
						outputFile.write(': ');
						if (member.type)
							outputFile.write(member.type);
						else {
							emitAnonymousType(member.anonymousType);
						}
						outputFile.writeLine(';');
					});
				outputFile.unindent();
				outputFile.writeLine('}');
				outputFile.writeLine();
			});
		}
		
		// Emit declaration.
		outputFile.writeLineFormat('/** %s */', content.comment);
		if (content.mode == gen.OutputMode.Module)
			outputFile.writeLineFormat('interface %sModule extends NodeJS.EventEmitter {', toCamelCase(content.name));
		else
			outputFile.writeLineFormat('class %s extends NodeJS.EventEmitter {', content.name);
		outputFile.indent();
		
		// Emit constructors.
		if (content.constructors && content.constructors.length > 0) {
			outputFile.writeLine('//');
			outputFile.writeLine('// Constructors');
			outputFile.writeLine('//');
			content.constructors.forEach(ctor => emitMethod(ctor, true));
		}
		
		// Emit properties.
		if (content.properties && content.properties.length > 0) {
			outputFile.writeLine('//');
			outputFile.writeLine('// Properties');
			outputFile.writeLine('//');
			content.properties.forEach(property => emitProperty(property));
		}
		
		// Emit events.
		if (content.events && content.events.length > 0) {
			outputFile.writeLine('//');
			outputFile.writeLine('// Events');
			outputFile.writeLine('//');
			outputFile.writeLine('on(event: string, listener: Function): NodeJS.EventEmitter;');
			content.events.forEach(event => {
				// Write comment.
				emitPlatformAwareComment(event.comment, event.platforms);
				// Write event name.
				outputFile.writeFormat('on(event: \'%s\', listener: ', event.name);
				// Write listener function.
				if (event.returns) {
					outputFile.write('(');
					emitParameterList(event.returns);
					outputFile.write(') => void');
				} else {
					outputFile.write('Function');
				}
				outputFile.write('): NodeJS.EventEmitter;');
				outputFile.writeLine();
			});
		}
		
		// Emit methods.
		if (content.methods && content.methods.length > 0) {
			outputFile.writeLine('//');
			outputFile.writeLine('// Methods');
			outputFile.writeLine('//');
			content.methods.forEach(method => emitMethod(method));
		}
		
		// Emit groups.
		if (content.groups && content.groups.length > 0) {
			outputFile.writeLine('//');
			outputFile.writeLine('// Grouped Definitions');
			outputFile.writeLine('//');
			content.groups.forEach(group => emitGroup(group));
		}
		
		// Close.
		outputFile.unindent();
		outputFile.writeLine('}');
	}
	
	// Emit header.
	outputFile.writeLine('// Type definitions for Electron 0.35.4 (for both main and renderer process)');
	outputFile.writeLine('// Project: http://electron.atom.io/');
	outputFile.writeLine();
	outputFile.writeLine('/// <reference path="../node/node.d.ts" />');
	outputFile.writeLine();
	outputFile.writeLine('declare module \'electron\' {');
	outputFile.indent();
	outputFile.writeLine();
	// ----------------------------
	for (var i = 0; i < parsedContent.length; i++) {
		emitParsedContent(parsedContent[i]);
		outputFile.writeLine();
	}
	// ----------------------------
	outputFile.writeLine('interface Electron {');
	outputFile.indent();
	// Write modules.
	for (var i = 0; i < parsedContent.length; i++) {
		var content = parsedContent[i];
		if (content.mode == gen.OutputMode.Module) {
			outputFile.writeLineFormat('/** %s */', content.comment);
			outputFile.writeLineFormat('%s: %sModule;', content.name, toCamelCase(content.name));
		} else {
			outputFile.writeLineFormat('/** %s */', content.comment);
			outputFile.writeLineFormat('%s: typeof %s;', content.name, content.name);
		}
	}
	// Write data types.
	for (var i = 0; i < parsedContent.length; i++) {
		var content = parsedContent[i];
		if (content.dataTypes && content.dataTypes.length > 0) {
			outputFile.writeLineFormat('// Data types defined in %s', content.url);
			content.dataTypes.forEach(dataType => {
				outputFile.writeLineFormat('%s: typeof %s;', dataType.name, dataType.name);
			});
		}
	}
	outputFile.unindent();
	outputFile.writeLine('}');
	outputFile.writeLine('var electron: Electron;');
	outputFile.writeLine('export = electron;');
	// ----------------------------
	outputFile.unindent();
	outputFile.writeLine('}');
	
	// Close the stream.
	await outputFile.disposeAsync();
	
	// Shutdown the app.
	process.exit();
}

main();
