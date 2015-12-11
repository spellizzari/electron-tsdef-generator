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

/** Interface for the configuration file. */
interface GeneratorConfig {
	rawBaseUrl: string;
	htmlBaseUrl: string;
	cacheDir: string;
	typeAliases: {
		[typeName: string]: string;
	}
	files: {
		[fileName: string]: {
			mode: string;
			name: string;
			parsing: {
				uncommonSections: {
					[sectionName: string]: string;
				}
				methodsAreInstance: boolean
			},
			patches: {
				methods: {
					[methodName: string]: {
						returns: string;
						params: {
							[parameterName: string]: string;
						}
					}
				}
				events: {
					[eventName: string]: {
						returnParams: {
							[parameterName: string]: string;
						}
					}
				}
				properties: {
					[propertyName: string]: {
						type: string;
					}
				}
			}
		}
	}
}


class DownloadedContent {
	constructor (public name: string, public content: string, public htmlUrl: string) { }
}

class DownloadedContentMap {
	[fileName: string]: DownloadedContent;
}

/** The application entry point. */
async function main(): Promise<void> {
	// Load the configuration file.
	const ConfigFileName = 'generatorConfig.json';
	ErrorManager.logVerbose('loading configuration file %s', ConfigFileName);
	var config = <GeneratorConfig>require('../' + ConfigFileName);
	
	// Create the download manager.
	var downloadManager = new DownloadManager(config.rawBaseUrl, config.cacheDir);
	
	// First we download all the stuff.
	var downloadedContentMap = new DownloadedContentMap();
	for (var fileName in config.files) {
		// Download it (or load it from the cache).
		var fileContent = await downloadManager.downloadAsync(fileName);
		
		// Wrap it.
		var downloadedContent = new DownloadedContent(fileName, fileContent, config.htmlBaseUrl + '/' + fileName);
		downloadedContentMap[fileName] = downloadedContent;
	}
	
	// Then we parse and patch everyone.
	var parsedContentList = <gen.GeneratedOutput[]>[];
	for (var fileName in config.files) {
		// Get stuff.
		var contentConfig = config.files[fileName];
		var downloadedContent = downloadedContentMap[fileName];
		
		// Prepare parser settings.
		var parserSettings = new gen.ParserSettings();
		parserSettings.mode = gen.OutputMode[contentConfig.mode];
		parserSettings.name = contentConfig.name;
		if (contentConfig.parsing) {
			if (contentConfig.parsing.methodsAreInstance)
				parserSettings.methodsAreInstance = true;
			if (contentConfig.parsing.uncommonSections) {
				for (var sectionName in contentConfig.parsing.uncommonSections) {
					var sectionRole = contentConfig.parsing.uncommonSections[sectionName];
					parserSettings.uncommonSections[sectionName] = gen.SectionRole[sectionRole];
				}
			}
		}
		
		// Parse it.
		var parsedContent = gen.generate(downloadedContent.htmlUrl, downloadedContent.content, parserSettings);
		
		// If we have patches...
		if (contentConfig.patches) {
			
			// If we have patches for methods...
			if (contentConfig.patches.methods) {
				for (var methodName in contentConfig.patches.methods) {
					var methodPatch = contentConfig.patches.methods[methodName];
					if (methodPatch.returns)
						parsedContent.patchMethodReturnType(methodName, methodPatch.returns);
					if (methodPatch.params) {
						for (var parameterName in methodPatch.params) {
							var parameterType = methodPatch.params[parameterName];
							parsedContent.patchMethodParameterType(methodName, parameterName, parameterType);
						}
					}
				}
			}
			
			// If we have patches for events...
			if (contentConfig.patches.events) {
				for (var eventName in contentConfig.patches.events) {
					var eventPatch = contentConfig.patches.events[eventName];
					if (eventPatch.returnParams) {
						for (var parameterName in eventPatch.returnParams) {
							var parameterType = eventPatch.returnParams[parameterName];
							parsedContent.patchEventReturnParameterType(eventName, parameterName, parameterType);
						}
					}
				}
			}
			
			// If we have patches for properties...
			if (contentConfig.patches.properties) {
				for (var propertyName in contentConfig.patches.properties) {
					var propertyPatch = contentConfig.patches.properties[propertyName];
					if (propertyPatch.type)
						parsedContent.patchPropertyType(propertyName, propertyPatch.type);
				}
			}
		}
		
		// Add to list.
		parsedContentList.push(parsedContent);
	}
	
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
			// Write coma.
			if (parameterIndex > 0)
				outputFile.write(', ');
				
			// Write parameter name.
			if (parameter.isRest) {
				outputFile.write('...');
				outputFile.write(parameter.name);
			} else {
				outputFile.write(parameter.name);
				if (parameter.optional)
					outputFile.write('?');
			}
			
			// Write parameter type.
			outputFile.write(': ');
			if (parameter.type)
				outputFile.write(parameter.type);
			else {
				emitAnonymousType(parameter.anonymousType);
			}
		});
	}
	
	function emitComment(comment: string, url?: string, platforms?: string[], parameters?: gen.ParameterDefinition[], returns?: gen.ParameterDefinition) {
		var singleLine = !url && !parameters && !returns;
		if (singleLine)
			outputFile.write('/** ');
		else {
			outputFile.writeLine('/**');
			outputFile.write(' * ');
		}
		if (platforms)
			outputFile.writeFormat('(%s) ', platforms.join(', '));
		if (singleLine)
			outputFile.writeLineFormat('%s */', comment);
		else {
			outputFile.writeLine(comment);
			if (url)
				outputFile.writeLineFormat(' * @see {@link %s}', url);
			if (parameters)
				parameters.forEach(param => {
					if (param.comment)
						outputFile.writeLineFormat(' * @param %s - %s', param.name, param.comment);
					else
						outputFile.writeLineFormat(' * @param %s', param.name);
				});
			if (returns && returns.comment)
				outputFile.writeLineFormat(' * @returns %s', returns.comment);
			outputFile.writeLine(' */');
		}
	}
	
	function emitProperty(property: gen.PropertyDefinition) {
		// Write comment.
		emitComment(property.comment, property.url, property.platforms);
		// Write it.
		if (property.static)
			outputFile.write('static ');
		outputFile.writeFormat('%s: ', property.name);
		if (property.type)
			outputFile.write(property.type);
		else
			emitAnonymousType(property.anonymousType);
		outputFile.writeLine(';');
	}
	
	function emitMethod(method: gen.MethodDefinition, isCtor?: boolean) {
		// Write comment.
		emitComment(method.comment, method.url, method.platforms, method.parameters, method.returns);
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
						emitComment(member.comment);
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
		emitComment(content.comment, content.url);
		if (content.mode == gen.OutputMode.Module)
			outputFile.writeLineFormat('interface %sModule extends NodeJS.EventEmitter {', toCamelCase(content.name));
		else
			outputFile.writeLineFormat('class %s extends events.EventEmitter {', content.name);
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
				emitComment(event.comment, event.url, event.platforms, event.returns);
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
	outputFile.writeLine('import * as events from "events";');
	// ----------------------------
	if (config.typeAliases) {
		for (var typeAlias in config.typeAliases) {
			var aliasedType = config.typeAliases[typeAlias];
			outputFile.writeLineFormat("type %s = %s;", typeAlias, aliasedType);
		}
		outputFile.writeLine();
	}
	// ----------------------------
	for (var i = 0; i < parsedContentList.length; i++) {
		emitParsedContent(parsedContentList[i]);
		outputFile.writeLine();
	}
	// ----------------------------
	outputFile.writeLine('interface Electron {');
	outputFile.indent();
	// Write modules.
	for (var i = 0; i < parsedContentList.length; i++) {
		var content = parsedContentList[i];
		if (content.mode == gen.OutputMode.Module) {
			emitComment(content.comment, content.url);
			outputFile.writeLineFormat('%s: %sModule;', content.name, toCamelCase(content.name));
		} else {
			outputFile.writeLineFormat('/** %s */', content.comment);
			outputFile.writeLineFormat('%s: typeof %s;', content.name, content.name);
		}
	}
	// Write data types.
	for (var i = 0; i < parsedContentList.length; i++) {
		var content = parsedContentList[i];
		if (content.dataTypes && content.dataTypes.length > 0) {
			outputFile.writeLineFormat('// Data types defined in %s', content.url);
			content.dataTypes.forEach(dataType => {
				outputFile.writeLineFormat('%s: typeof %s;', dataType.name, dataType.name);
			});
		}
	}
	// Write aliased types.
	//if (config.typeAliases) {
	//	outputFile.writeLine('// Type aliases');
	//	for (var typeAlias in config.typeAliases) {
	//		outputFile.writeLineFormat("%s: typeof %s;", typeAlias, typeAlias);
	//	}
	//}
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
