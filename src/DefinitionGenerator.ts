"use strict";
/// <reference path="../typings/node/node.d.ts" />

import * as mk from './MarkdownUtils';
import * as ErrorManager from './ErrorManager';

/** Represents a type of output. */
export enum OutputMode {
	Module,
	Class,
}

/** An interface for definitions that contain groups. */
export interface IHasGroups {
	/** The definition groups. */
	groups: DefinitionGroup[];
}

/** Represents the result of definition generation. */
export class GeneratedOutput implements IHasGroups {
	/** Output mode. */
	mode: OutputMode;
	/** The help url. */
	url: string;
	/** The name of the module/class. */
	name: string;
	/** The comment line. */
	comment: string;
	/** The events. */
	events: EventDefinition[] = [];
	/** The methods. */
	methods: MethodDefinition[] = [];
	/** The definition groups. */
	groups: DefinitionGroup[] = [];
	/** The data types. */
	dataTypes: DataTypeDefinition[] = [];
	/** The constructors. */
	constructors: MethodDefinition[] = [];
	/** The properties. */
	properties: PropertyDefinition[] = [];
	
	/** Gets or creates the group that corresponds to the specified prefix chain. */
	getGroup(prefixes: string[], existingOnly?: boolean): DefinitionGroup {
		var group = <IHasGroups>this;
		for (var i = 0; i < prefixes.length; i++) {
			// Find the group. 
			var subgroup: IHasGroups;
			if (group.groups)
				subgroup = group.groups.find(item => item.name == prefixes[i]);
				
			// Create it if necessary.
			if (!subgroup) {
				if (existingOnly) return null;
				if (!group.groups)
					group.groups = [];
				subgroup = new DefinitionGroup(prefixes[i]);
				group.groups.push(<DefinitionGroup>subgroup);
			}
			
			// Select it.
			group = subgroup;
		}
		return <DefinitionGroup>subgroup;
	}
	
	/** Finds a method. */
	findMethod(method: string): MethodDefinition {
		var parts = method.split('.');
		if (parts.length == 1)
			return this.methods.find(item => item.name == parts[0]);
		else {
			var group = this.getGroup(parts.slice(0, parts.length - 1), true);
			if (!group) return null;
			return group.methods.find(item => item.name == parts[parts.length - 1]);
		}
	}
	
	/** Finds a property. */
	findProperty(property: string): PropertyDefinition {
		var parts = property.split('.');
		if (parts.length == 1)
			return this.properties.find(item => item.name == parts[0]);
		else {
			var group = this.getGroup(parts.slice(0, parts.length - 1), true);
			if (!group) return null;
			return group.properties.find(item => item.name == parts[parts.length - 1]);
		}
	}
	
	patchPropertyType(property: string, type: string) {
		var propertyDefinition = this.findProperty(property);
		if (!propertyDefinition) {
			ErrorManager.logError(this.url, 0, 'PATCH: could not find property %s', property);
			return;
		}
		propertyDefinition.type = type;
	}
	
	/** Patches the return type of a method. */
	patchMethodReturnType(method: string, returnType: string) {
		var methodDefinition = this.findMethod(method);
		if (!methodDefinition) {
			ErrorManager.logError(this.url, 0, 'PATCH: could not find method %s', method);
			return;
		}
		methodDefinition.returns = new ParameterDefinition();
		methodDefinition.returns.type = returnType;
	}
	
	/** Patches the type of a method parameter. */
	patchMethodParameterType(method: string, param: string, type: string) {
		var methodDefinition = this.findMethod(method);
		if (!methodDefinition) {
			ErrorManager.logError(this.url, 0, 'PATCH: could not find method %s', method);
			return;
		}
		var parameter = methodDefinition.parameters.find(item => item.name === param);
		if (!parameter) {
			ErrorManager.logError(this.url, 0, 'PATCH: method %s has no parameter %s', method, param);
			return;
		}
		parameter.anonymousType = null;
		parameter.type = type;
	}
	
	/** Patches the type of an event return parameter. */
	patchEventReturnParameterType(event: string, returnParam: string, type: string) {
		var eventDefinition = this.events.find(item => item.name === event);
		if (!eventDefinition) {
			ErrorManager.logError(this.url, 0, 'PATCH: could not find event %s', event);
			return;
		}
		if (!eventDefinition.returns) {
			ErrorManager.logError(this.url, 0, 'PATCH: event %s has no return parameters', event);
			return;
		}
		var parameter = eventDefinition.returns.find(item => item.name === returnParam);
		if (!parameter) {
			ErrorManager.logError(this.url, 0, 'PATCH: could not find return parameter %s in event %s', returnParam, event);
			return;
		}
		parameter.anonymousType = null;
		parameter.type = type;
	}
}

/** Represents a property definition. */
export class PropertyDefinition {
	/** The help url. */
	url: string;
	/** The property name. */
	name: string;
	/** The comment line. */
	comment: string;
	/** The property type. */
	type: string;
	/** The prefixes. */
	prefixes: string[];
	/** The property type. */
	anonymousType: AnonymousTypeDefinition;
	/** The list of platforms. */
	platforms: string[];
}

/** Represents a method definition. */
export class MethodDefinition {
	/** The help url. */
	url: string;
	/** The method name. */
	name: string;
	/** The comment line. */
	comment: string;
	/** Is this method static? */
	isStatic: boolean;
	/** The list of platforms. */
	platforms: string[];
	/** The parameters. */
	parameters: ParameterDefinition[];
	/** The return value. */
	returns: ParameterDefinition;
	/** The prefixes. */
	prefixes: string[];
}

/** Represents a data type definition. */
export class DataTypeDefinition {
	/** The type name. */
	name: string;
	/** The members. */
	members: ParameterDefinition[];
	/** Is it an interface type? */
	isInterface: boolean;
	makeAllMembersOptional() {
		DataTypeDefinition.makeMembersOptional(this.members);
	}
	private static makeMembersOptional(members: ParameterDefinition[]) {
		members.forEach(member => {
			member.optional = true;
			if (member.anonymousType)
				DataTypeDefinition.makeMembersOptional(member.anonymousType.members);
		});
	}
}

/** Represents a definition group. */
export class DefinitionGroup implements IHasGroups {
	/** The group name. */
	name: string;
	/** The methods. */
	methods: MethodDefinition[];
	/** The properties. */
	properties: PropertyDefinition[];
	/** The definition groups. */
	groups: DefinitionGroup[];
	/** Constructor. */
	constructor(name: string) {
		this.name = name;
	}
}

/** Represents an anonymous type definition. */
export class AnonymousTypeDefinition {
	/** The members. */
	members: ParameterDefinition[];
	/** Is this an array? */
	isArray: boolean;
}

/** Represents a parameter definition. */
export class ParameterDefinition {
	/** The line that defines the parameter. */
	lineNum: number;
	/** The parameter name. */
	name: string;
	/** The parameter type. */
	type: string;
	/** The comment line. */
	comment: string;
	/** Is it optional? */
	optional: boolean;
	/** Anonymous type definition. */
	anonymousType: AnonymousTypeDefinition;
}

/** Represents an event definition. */
export class EventDefinition {
	/** The help url. */
	url: string;
	/** The event name. */
	name: string;
	/** The comment line. */
	comment: string;
	/** The list of platforms. */
	platforms: string[];
	/** The event return values. */
	returns: ParameterDefinition[];
}

// Some constants.
const EventsSectionName = "Events";
const MethodsSectionName = "Methods";
const InstanceMethodsSectionName = "Instance Methods";
const InstancePropertiesSectionName = "Instance Properties";

/** Parses the specified code */
export function generate(url: string, code: string, mode: OutputMode): GeneratedOutput {
	var output = new GeneratedOutput();
	output.mode = mode;
	
	// Turn into lines.
	var codeLines = mk.splitIntoLines(code);
	
	// Extract 1st level sections.
	var sectionsLvl1 = mk.splitIntoSectionSequence(codeLines, "# ");
	
	// Parse only the first one.
	parseTopLevelSection(url, sectionsLvl1.sections[0], output);
	
	// Patch methods is*** with no known return type.
	output.methods.forEach(method => {
		if (!method.returns && /^is[A-Z]\w*$/.test(method.name)) {
				method.returns = new ParameterDefinition();
				method.returns.type = 'boolean';
			}
	});
	
	return output;
}

function checkReservedName(name: string): string {
	switch (name) {
		case 'switch':
			return '_' + name;
		default: return name;
	}
}

function parseTopLevelSection(url: string, section: mk.Section, output: GeneratedOutput) {
	// Save the help url.
	output.url = url;
	
	// Get the section name.
	output.name = section.name;
	
	// Split into sections again.
	var subsections = mk.splitIntoSectionSequence(section.lines, "## ");
	
	// Extract paragraphs from the preamble.
	var preambleParagraphs = mk.splitIntoParagraphs(subsections.linesBefore);
	
	// Turn the first one into sentences.
	var preambleFirstParagraphSentences = mk.SplitIntoSentences(preambleParagraphs[0].lines);
	
	// Take the first sentence and save it as a comment.
	var firstSentence = preambleFirstParagraphSentences[0];
	output.comment = firstSentence.text;
	
	// If it's a class...
	if (output.mode == OutputMode.Class) {
		
		// Look for the constructors section.
		var ctorSection = subsections.findSection('Class: ' + output.name);
		if (ctorSection)
			parseMethods(url, ctorSection, output.constructors, output.dataTypes, { areCtor: true });
			
		// Look for the Events section.
		var eventsSection = subsections.findSection(EventsSectionName);
		if (eventsSection)
			parseEvents(url, eventsSection, output.events, output.dataTypes);
			
		// Look for the Instance Methods section.
		var instanceMethodsSection = subsections.findSection(InstanceMethodsSectionName);
		if (instanceMethodsSection)
			parseMethods(url, instanceMethodsSection, output.methods, output.dataTypes, { });
		
		// Look for the Methods section (those are static).
		var methodsSection = subsections.findSection(MethodsSectionName);
		if (methodsSection)
			parseMethods(url, methodsSection, output.methods, output.dataTypes, { areStatic: true });
			
		// Look for the Instance Properties section.
		var instancePropertiesSection = subsections.findSection(InstancePropertiesSectionName);
		if (instancePropertiesSection)
			parseProperties(url, instancePropertiesSection, output.properties, output.dataTypes);
		
	} else {
		
		// Look for the Events section.
		var eventsSection = subsections.findSection(EventsSectionName);
		if (eventsSection)
			parseEvents(url, eventsSection, output.events, output.dataTypes);
		
		// Look for the Methods section.
		var methodsSection = subsections.findSection(MethodsSectionName);
		if (methodsSection)
			parseMethods(url, methodsSection, output.methods, output.dataTypes, { });
		
	}
	
	// Group the methods.
	if (output.methods) {
		for (var i = 0; i < output.methods.length; i++) {
			var methodDefinition = output.methods[i];
			if (methodDefinition.prefixes) {
				// Add to the group.
				var group = output.getGroup(methodDefinition.prefixes);
				methodDefinition.prefixes = null;
				if (!group.methods)
					group.methods = [];
				group.methods.push(methodDefinition);
				output.methods.splice(i, 1);
				i--;
			}
		}
	}
	
	// Group the properties.
	if (output.properties) {
		for (var i = 0; i < output.properties.length; i++) {
			var propertyDefinition = output.properties[i];
			if (propertyDefinition.prefixes) {
				// Add to the group.
				var group = output.getGroup(propertyDefinition.prefixes);
				propertyDefinition.prefixes = null;
				if (!group.properties)
					group.properties = [];
				group.properties.push(propertyDefinition);
				output.properties.splice(i, 1);
				i--;
			}
		}
	}
}

function parseSimpleType(type: string): string {
	switch (type) {
		case 'String': return 'string';
		case 'Integer': return 'number';
		default: return type;
	}
}

function parseParameterList(url: string, items: mk.ListItem[], referencedDataTypes?: mk.Sentence[]): ParameterDefinition[] {
	var parameters = <ParameterDefinition[]>[];
	
	// For each item...
	for (var itemIndex = 0; itemIndex < items.length; itemIndex++) {
		var item = items[itemIndex];
		var parameter = new ParameterDefinition();
		parameter.lineNum = item.lineNum;
		
		// Trim any comment.
		const CommentMarker = '- ';
		var codeline = item.text;
		var commentIndex = codeline.indexOf(CommentMarker);
		if (commentIndex != -1) {
			parameter.comment = codeline.substring(commentIndex + CommentMarker.length);
			codeline = codeline.substring(0, commentIndex).trim();
		}
		
		// Try to parse it.
		var match = codeline.trim().match(/^`(\w+)` *([^,]*)(?:, *(.+))?$/);
		var invalid = false;
		if (!match) {
			invalid = true;
			parameter.name = 'p' + (itemIndex + 1);
			parameter.type = 'any';
		} else {
			var typeMatch = <RegExpMatchArray>null;
			parameter.name = checkReservedName(match[1]);
			parameter.type = match[2];
			
			// If there's (optional) at the end of the type, remove it.
			const OptionalPostfix = '(optional)';
			if (parameter.type.toLowerCase().endsWith(OptionalPostfix)) {
				parameter.type = parameter.type.substring(0, parameter.type.length - OptionalPostfix.length).trim();
				parameter.optional = true;
			}

			// If type is empty, then try with the comment.
			if (parameter.type.length == 0 && parameter.comment)
				parameter.type = parameter.comment;

			// If it's an Object...
			if (parameter.type === 'Object') {
				// If we have subitems in the list...
				if (item.items) {
					// Make it an anonymous type.
					parameter.type = null;
					parameter.anonymousType = new AnonymousTypeDefinition();
					parameter.anonymousType.members = parseParameterList(url, item.items);
				}
			}
			// If it's an array of Objects...
			else if (parameter.type === '[Objects]') {
				// If we have subitems in the list...
				if (item.items) {
					// Make it an anonymous type.
					parameter.type = null;
					parameter.anonymousType = new AnonymousTypeDefinition();
					parameter.anonymousType.members = parseParameterList(url, item.items);
					parameter.anonymousType.isArray = true;
				}
			}
			// If it's an Array...
			else if (parameter.type === 'Array') {
				// If the comment is well-formed...
				var commentMatch = parameter.comment.trim().match(/^array of `(\w+)` objects$/i);
				if (commentMatch && referencedDataTypes) {
					// Add to the list.
					referencedDataTypes.push({ text: commentMatch[1], lineNum: item.lineNum });
					parameter.type = commentMatch[1] + '[]';
				}
			}
			// If it's an Array...
			else if (parameter.type.startsWith('Array of `')) {
				// If the comment is well-formed...
				var commentMatch = parameter.type.trim().match(/^array of `(\w+)`.*$/i);
				if (commentMatch && referencedDataTypes) {
					// Add to the list.
					referencedDataTypes.push({ text: commentMatch[1], lineNum: item.lineNum });
					parameter.type = commentMatch[1] + '[]';
				}
			}
			// If the type is a simple name...
			else if (/^\w+$/.test(parameter.type)) {
				// Transform it.
				parameter.type = parseSimpleType(parameter.type);
			}
			// If the type is a custom type...
			else if (typeMatch = parameter.type.match(/^\[(\w+)\]\(.*\)$/)) {
				// Use the custom type name.
				parameter.type = typeMatch[1];
			} else {
				// Can't parse type.
				invalid = true;
				parameter.type = 'any';
			}
		}
		
		// If invalid...
		if (invalid)
			ErrorManager.logWarning(url, item.lineNum, 'Invalid parameter line "%s"', item.text);

		// Add it.
		parameters.push(parameter);
	}
	
	return parameters;
}

function parseProperties(url: string, section: mk.Section, output: PropertyDefinition[], dataTypes: DataTypeDefinition[]) {
	
	ErrorManager.logVerbose('parsing properties from %s', url);
	
	// Split into sections again.
	var subsections = mk.splitIntoSectionSequence(section.lines, "### ");
	
	// For each section...
	subsections.sections.forEach(section => {
		// Parse the property name.
		var propertyNameMatch = section.name.match(/^`([^`]+)`(?:\s+_([^_]+)_)*$/);
		if (!propertyNameMatch) {
			ErrorManager.logError(url, section.lineNum, 'Invalid property line "%s"', section.name);
			return;
		}
		
		// Extract the property name with its prefixes.
		var propertyNameWithPrefixes = propertyNameMatch[1].split('.');
		
		// Create the property definition.
		var propertyDefinition = new PropertyDefinition();
		propertyDefinition.name = propertyNameWithPrefixes[propertyNameWithPrefixes.length - 1];
		propertyDefinition.url = mk.makeUrl(url, section.name);
		propertyDefinition.type = 'any';
		if (propertyNameWithPrefixes.length > 2)
			propertyDefinition.prefixes = propertyNameWithPrefixes.slice(1, propertyNameWithPrefixes.length - 1);
		output.push(propertyDefinition);
		
		// Parse the platforms.
		if (propertyNameMatch[2])
			propertyDefinition.platforms = propertyNameMatch.slice(2, propertyNameMatch.length);
			
		// Split into paragraphs.
		var paragraphs = mk.splitIntoParagraphs(section.lines);
		patchMemberParagraphs(paragraphs);
		var summaryParagraphIndex = 0;
		
		// Extract the first sentence.
		if (paragraphs.length > summaryParagraphIndex) {
			var summarySentences = mk.SplitIntoSentences(paragraphs[summaryParagraphIndex].lines);
			propertyDefinition.comment = summarySentences[0].text;
		}
	});
}

function parseMethods(url: string, section: mk.Section, output: MethodDefinition[], dataTypes: DataTypeDefinition[],
	options: { areCtor?: boolean; areStatic?: boolean; }) {
	
	if (options.areCtor)
		ErrorManager.logVerbose('parsing constructors from %s', url);
	else if (options.areStatic)
		ErrorManager.logVerbose('parsing static methods from %s', url);
	else
		ErrorManager.logVerbose('parsing methods from %s', url);
	
	// Split into sections again.
	var subsections = mk.splitIntoSectionSequence(section.lines, "### ");
	
	// For each section...
	subsections.sections.forEach(section => {
		// Parse the method name.
		var methodNameMatch = section.name.match(/^`([^`]+)`(?:\s+_([^_]+)_)*$/);
		if (!methodNameMatch) {
			ErrorManager.logError(url, section.lineNum, 'Invalid method line "%s"', section.name);
			return;
		}
		
		// Extract the method signature and parse it.
		var methodSignature = methodNameMatch[1];
		// https://regex101.com/r/mX9oE4/1
		var methodSignatureMatch = methodSignature.match(/^([^(]+)\(([^)]*)\)$/);
		if (!methodSignatureMatch) {
			ErrorManager.logError(url, section.lineNum, 'Invalid method signature "%s"', methodSignature);
			return;
		}
		
		// Extract the method name with its prefixes.
		var methodNameWithPrefixes = methodSignatureMatch[1].split('.');
		
		// Separate parameters and optional parameters.
		var methodParametersString = methodSignatureMatch[2];
		var methodParametersReversed = false;
		var methodParametersStringMatch = methodParametersString.match(/^([^\[]*)(?:\[([^\]]+)\])?$/);
		if (!methodParametersStringMatch) {
			// Try the other way around.
			methodParametersStringMatch = methodParametersString.match(/^\[([^\]]+)\]([^\[]*)?$/);
			if (!methodParametersStringMatch) {
				ErrorManager.logError(url, section.lineNum, 'Invalid method parameters "%s"', methodParametersString);
				return;
			} else {
				methodParametersReversed = true;
			}
		}
		
		// Parse the parameters.
		var methodParameterNames = methodParametersStringMatch[1].split(',').map(item => checkReservedName(item.trim()));
		var optionalMethodParameterNames = methodParametersStringMatch[2] ? methodParametersStringMatch[2].split(',').map(item => checkReservedName(item.trim())) : null;
		
		// Remove empty entries.
		if (methodParameterNames)
			methodParameterNames = methodParameterNames.filter(item => item.length > 0);
		if (optionalMethodParameterNames)
			optionalMethodParameterNames = optionalMethodParameterNames.filter(item => item.length > 0);
			
		// If the method parameters are reversed (optional ones come before) then mark all as optional.
		if (methodParametersReversed) {
			optionalMethodParameterNames = methodParameterNames.concat(optionalMethodParameterNames);
			methodParameterNames = [];
		}
		
		// Create the method definition.
		var methodDefinition = new MethodDefinition();
		methodDefinition.url = mk.makeUrl(url, section.name);
		methodDefinition.name = methodNameWithPrefixes[methodNameWithPrefixes.length - 1];
		methodDefinition.isStatic = options.areStatic;
		if (methodNameWithPrefixes.length > 2)
			methodDefinition.prefixes = methodNameWithPrefixes.slice(1, methodNameWithPrefixes.length - 1);
		output.push(methodDefinition);
		
		// Add the parameters.
		methodDefinition.parameters = [];
		for (var i = 0; i < methodParameterNames.length; i++) {
			var parameterDefinition = new ParameterDefinition();
			parameterDefinition.name = methodParameterNames[i];
			parameterDefinition.type = 'any';
			methodDefinition.parameters.push(parameterDefinition);
		}
		if (optionalMethodParameterNames) {
			for (var i = 0; i < optionalMethodParameterNames.length; i++) {
				var parameterDefinition = new ParameterDefinition();
				parameterDefinition.name = optionalMethodParameterNames[i];
				parameterDefinition.type = 'any';
				parameterDefinition.optional = true;
				methodDefinition.parameters.push(parameterDefinition);
			}
		}
		
		// Parse the platforms.
		if (methodNameMatch[2])
			methodDefinition.platforms = methodNameMatch.slice(2, methodNameMatch.length);
			
		// Patch stuff for ctors.
		if (options.areCtor) {
			const CtorPrefix = 'new ';
			var className = methodDefinition.name.substring(CtorPrefix.length);
			
			// Change stuff.
			methodDefinition.name = null;
			methodDefinition.comment = 'Builds a new instance of the '+className+' class.';
		}
			
		// Split into paragraphs.
		var paragraphs = mk.splitIntoParagraphs(section.lines);
		patchMemberParagraphs(paragraphs);
		var summaryParagraphIndex = 0;
		
		// If the first paragraph starts with a bullet...
		if (paragraphs.length > 0 && paragraphs[0].lines[0].text.startsWith('*')) {
			// Parse list.
			var list = mk.parseList(paragraphs[0].lines, '*');
			
			// Parse parameters.
			var referencedDataTypes = <mk.Sentence[]>[];
			var parametersList = parseParameterList(url, list, referencedDataTypes);
			
			// Update data type definitions.
			if (referencedDataTypes.length > 0)
				updateDataTypeDefinitions(url, referencedDataTypes, dataTypes, paragraphs);
			
			// For each parameter in the list...
			for (var i = 0; i < parametersList.length; i++) {
				var parameter = parametersList[i];
				
				// Look for the existing parameter.
				var existingParameter = methodDefinition.parameters.find(item => item.name == parameter.name);
				if (!existingParameter) {
					ErrorManager.logWarning(url, parameter.lineNum, 'undefined parameter name "%s"', parameter.name);
				} else {
					// Copy stuff.
					existingParameter.type = parameter.type;
					existingParameter.comment = parameter.comment;
					existingParameter.lineNum = parameter.lineNum;
					existingParameter.anonymousType = parameter.anonymousType;
				}
			}
			
			// Skip them to fo to the summary.
			summaryParagraphIndex = 1;
		}
		
		// Extract the first sentence.
		if (paragraphs.length > summaryParagraphIndex) {
			var summarySentences = mk.SplitIntoSentences(paragraphs[summaryParagraphIndex].lines);
			methodDefinition.comment = summarySentences[0].text;
		}
	});
} 

function parseEvents(url: string, section: mk.Section, output: EventDefinition[], dataTypes: DataTypeDefinition[]) {
	
	ErrorManager.logVerbose('parsing events from %s', url);
	
	// Split into sections again.
	var subsections = mk.splitIntoSectionSequence(section.lines, "### ");
	
	// For each section...
	subsections.sections.forEach(section => {
		// Parse the event name.
		var eventNameMatch = section.name.match(/^Event: '([a-zA-Z0-9\-]+)'(?:\s+_([^_]+)_)*$/);
		if (!eventNameMatch) {
			ErrorManager.logError(url, section.lineNum, 'Invalid event line "%s"', section.name);
			return;
		}
		
		// Create the event definition.
		var eventDefinition = new EventDefinition();
		eventDefinition.url = mk.makeUrl(url, section.name);
		eventDefinition.name = eventNameMatch[1];
		output.push(eventDefinition);
		
		// Parse the platforms.
		if (eventNameMatch[2])
			eventDefinition.platforms = eventNameMatch.slice(2, eventNameMatch.length);
		
		// Split into paragraphs.
		var paragraphs = mk.splitIntoParagraphs(section.lines);
		patchMemberParagraphs(paragraphs);
		var summaryParagraphIndex = 0;
		
		// If the first paragraph is 'Returns:'...
		if (paragraphs[0].lines[0].text == 'Returns:') {
			// Parse list.
			var returnsList = mk.parseList(paragraphs[1].lines, '*');
			
			// Parse parameters.
			var referencedDataTypes = <mk.Sentence[]>[];
			eventDefinition.returns = parseParameterList(url, returnsList, referencedDataTypes);
			
			// Update the data types definitions.
			if (referencedDataTypes.length > 0)
				updateDataTypeDefinitions(url, referencedDataTypes, dataTypes, paragraphs);
			
			// Skip them to fo to the summary.
			summaryParagraphIndex = 2;
		}
		
		// Extract the first sentence.
		var summarySentences = mk.SplitIntoSentences(paragraphs[summaryParagraphIndex].lines);
		eventDefinition.comment = summarySentences[0].text;
	});
}

function updateDataTypeDefinitions(url: string, referencedDataTypes: mk.Sentence[], dataTypes: DataTypeDefinition[], paragraphs: mk.Paragraph[]) {
	// For each data type...
	referencedDataTypes.forEach(referencedDataType => {
		// Look for it.
		var dataType = dataTypes.find(item => item.name === referencedDataType.text);
		
		// If it doesn't exist...
		if (!dataType) {
			// Try to look for the defining paragraph.
			var definingParagraphIndex = paragraphs.findIndex(item => item.lines.length > 0 &&
				item.lines[0].text.startsWith('`'+referencedDataType.text+'` Object'));
			if (definingParagraphIndex != -1) {
				var definingParagraph = paragraphs[definingParagraphIndex];
				
				// Create the definition.
				dataType = new DataTypeDefinition();
				dataType.name = referencedDataType.text;
				dataTypes.push(dataType);
				
				// If it contains only one line...
				var membersList: mk.ListItem[];
				if (definingParagraph.lines.length == 1) {
					// Parse the next paragraph.
					membersList = mk.parseList(paragraphs[definingParagraphIndex + 1].lines, '*');
				} else {
					// Parse this paragraph but remove the first line.
					membersList = mk.parseList(definingParagraph.lines.slice(1, definingParagraph.lines.length), '*');
				}
				
				// Parse members.
				dataType.members = parseParameterList(url, membersList, referencedDataTypes);
			} else {
				ErrorManager.logWarning(url, referencedDataType.lineNum, 'could not find the definition of type %s', referencedDataType.text);
				dataType = new DataTypeDefinition();
				dataType.name = referencedDataType.text;
				dataType.members = [];
				dataType.isInterface = true;
				dataTypes.push(dataType);
			}
		}
	});
}

function patchMemberParagraphs(paragraphs: mk.Paragraph[]) {
	// Sometimes the paragraphs inside a property or method section are ill-formed.
	// We patch them when possible here.
	
	// Case #1: they forgot to start the parameters list with a bullet.
	// Line #1 of paragraph #1 starts with a `
	if (paragraphs.length >= 1 &&
		paragraphs[0].lines.length >= 1 &&
		paragraphs[0].lines[0].text.startsWith('`')) {
		
		// Make it a bullet list.
		for (var i = 0; i < paragraphs[0].lines.length; i++)
			paragraphs[0].lines[i].text = '* ' + paragraphs[0].lines[i].text;
			
		// If the next paragraph is also a bullet list...
		if (paragraphs.length >= 2 &&
			paragraphs[1].lines.length >= 1 &&
			paragraphs[1].lines[0].text.startsWith('* ')) {
				
			// Indent it.
			for (var i = 0; i < paragraphs[1].lines.length; i++)
				paragraphs[1].lines[i].text = '  ' + paragraphs[1].lines[i].text;
				
			// Fuse it with the first paragraph.
			paragraphs[0].lines = paragraphs[0].lines.concat(paragraphs[1].lines);
			paragraphs.splice(1, 1);
		}
	}
}

function toCamelCase(s: string): string {
	return s.charAt(0).toUpperCase() + s.substring(1);
}