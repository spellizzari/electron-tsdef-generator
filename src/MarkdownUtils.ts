"use strict";
/// <reference path="../typings/node/node.d.ts" />

/** Represents a line. */
export class Line {
	/** The line number. */
	num: number;
	/** The line text. */
	text: string;
	/** Constructor. */
	constructor (text: string, num: number) {
		this.text = text;
		this.num = num;
	}
}

/** Represents a sentence. */
export class Sentence {
	/** The starting line number. */
	lineNum: number;
	/** The sentence text. */
	text: string;
}

/** Represents a parsed section */
export class Section {
	/** The section prefix. */
	prefix: string;
	/** The starting line number. */
	lineNum: number;
	/** The section name. */
	name: string;
	/** The section lines. */
	lines: Line[];
	
	/** Splits into subsequences. */
	splitIntoSubsections(): SectionSequence {
		return splitIntoSectionSequence(this.lines, '#' + this.prefix);
	}
}

/** Represents a list item. */
export class ListItem {
	/** The indent level. */
	indentLevel: number;
	/** The starting line number. */
	lineNum: number;
	/** The item text. */
	text: string;
	/** The children. */
	items: ListItem[];
}

/** Represents a parsed sequence of sections. */
export class SectionSequence {
	/** The lines before the first section. */
	linesBefore: Line[];
	/** The list of sections. */
	sections: Section[];
	/** Finds the section with the specified name. */
	findSection(name: string): Section {
		return this.sections.find(value => value.name == name);
	}
}

/** Represents a paragraph. */
export class Paragraph {
	/** The paragraph lines. */
	lines: Line[];
}

/** Makes a url to a section. */
export function makeUrl(url: string, sectionName: string): string {
	// https://regex101.com/r/zK7oR5/1
	var anchor = sectionName.toLowerCase().replace(/[^\w]+/g, '-');
	return url + '#' + anchor;
}

/** Splits text data into lines and removes */
export function splitIntoLines(fileText: string): Line[] {
	return fileText.split(/\r?\n/).map((value, index) => new Line(value, index + 1));
}

/** Determines if a text is empty. */
export function isEmpty(text: string): boolean {
	return /^\s*$/.test(text);
}

/** Removes empty lines in-place. */
export function stripEmptyLines(lines: Line[]) {
	for (var i = 0; i < lines.length; i++) {
		if (isEmpty(lines[i].text)) {
			lines.splice(i, 1);
			i--;
		}
	}
}

/** Splits lines into paragraphs, where empty lines mark the beginning of a new paragraph. */
export function splitIntoParagraphs(lines: Line[]): Paragraph[] {
	var paragraphStartIndex = 0;
	var paragraphs = <Paragraph[]>[];
	
	// For each line...
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		
		// If it's the beginning of a paragraph...
		if (isEmpty(line.text)) {
			
			// If the previous paragraph is not empty...
			if (paragraphStartIndex != i) {
				paragraphs.push({
					lines: lines.slice(paragraphStartIndex, i)
				});
			}
			
			// Start a new one.
			paragraphStartIndex = i + 1;
		}
	}
	
	// Close the last section.
	if (paragraphStartIndex != lines.length) {
		paragraphs.push({
			lines: lines.slice(paragraphStartIndex, lines.length)
		});
	}
	
	return paragraphs;
}

/** Parses a list. */
export function parseList(lines: Line[], bullet: string): ListItem[] {
	if (lines.length == 0) return [];
	var items = <ListItem[]>[];
	var lastItem = <ListItem>null;
	var parentItem = <ListItem>null;
	var parentStack = <ListItem[]>[];

	// For each line...
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		
		// Measure indent.
		var indentLength = 0;
		for (var j = 0; j < line.text.length; j++) {
			if (line.text.charAt(j) != ' ') break;
			indentLength++;
		}
		
		// Skip empty lines.
		if (indentLength == line.text.length) continue;
		
		// If the next char is the bullet...
		if (line.text.charAt(indentLength) == bullet) {
			// Start a new item.
			var item = new ListItem();
			item.text = line.text.substring(indentLength + 1).trim();
			item.lineNum = line.num;
			item.indentLevel = Math.trunc(indentLength / 2);
			
			// If its indent is greater than that of the last item...
			if (lastItem && item.indentLevel > lastItem.indentLevel) {
				// Add it as a child.
				parentStack.push(parentItem);
				parentItem = lastItem;
			}
			// Otherwise while its indent is smaller...
			else while (parentItem && item.indentLevel <= parentItem.indentLevel) {
				// Go up.
				parentItem = parentStack.pop();
			}
			
			// Add to the current parent.
			if (parentItem) {
				if (!parentItem.items)
					parentItem.items = [];
				parentItem.items.push(item);
			} else {
				items.push(item);
			}
			
			// Keep track.
			lastItem = item;
		} else {
			// Append to the previous item.
			if (lastItem) {
				var newText = line.text.substring(indentLength + 1).trim();
				if (newText.length > 0)
					lastItem.text += ' ' + newText;
			}
		}
	}
	
	return items;
}

/** Splits lines into sentences. */
export function SplitIntoSentences(lines: Line[]): Sentence[] {
	if (lines.length == 0) return [];
	var currentSentence = <Sentence>null;
	var sentences = <Sentence[]>[];
	
	// Helper function to append text to the current sentence.
	function appendToCurrentSentence(text: string, lineNum: number) {
		if (!currentSentence)
			currentSentence = { text: text.trim(), lineNum: lineNum };
		else if (currentSentence.text.length == 0)
			currentSentence.text = text.trim();
		else
			currentSentence.text += ' ' + text.trim();
	}
	
	// Helper function to trim and push the current sentence.
	function pushCurrentSentence() {
		if (currentSentence) {
			currentSentence.text = currentSentence.text.trim();
			if (currentSentence.text.length > 0) {
				sentences.push(currentSentence);
				currentSentence = null;
			}
		}
	}
	
	// For each line...
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		
		// Trim it.
		var lineText = line.text.trim();
		
		// While there are characters to parse...
		for (var pos = 0; pos < lineText.length; ) {
			// Look for the next '.'.
			var nextStop = lineText.indexOf('.', pos);
			
			// If we found one...
			if (nextStop != -1) {
				// Append to the sentence, push and continue parsing the line.
				appendToCurrentSentence(lineText.substring(pos, nextStop + 1), line.num);
				pushCurrentSentence();
				pos = nextStop + 1;
			} else {
				// Append to the sentence and stop.
				appendToCurrentSentence(lineText.substring(pos), line.num);
				break;
			}
		}
	}
	
	// Push the last sentence if there is any.
	pushCurrentSentence();
	
	return sentences;
}

/** Splits a string into words. */
export function splitIntoWords(sentence: string, keepSymbols?: boolean): string[] {
	var symbolRegexp: RegExp;
	if (keepSymbols)
		// https://regex101.com/r/mG4gO1/1
		symbolRegexp = /([^\s.,:;!?\/\\]+|[.,:;!?\/\\])\s*/g;
	else
		// https://regex101.com/r/dP3pH4/1
		symbolRegexp = /(?:([^\s.,:;!?\/\\]+)|[.,:;!?\/\\])\s*/g;
	var result = <string[]>[];
	var match = symbolRegexp.exec(sentence);
	while (match) {
		if (match[1])
			result.push(match[1]);
		match = symbolRegexp.exec(sentence);
	}
	return result;
}

/** Returns the word that appears right after the specified word. */
export function getWordAfter(sentence: string, after: string): string {
	var words = splitIntoWords(sentence, false);
	var wordIndex = words.findIndex(v => v === after);
	if (wordIndex == -1 || wordIndex == words.length - 1) return null;
	return words[wordIndex + 1];
}

/** Splits lines into sections. Each section is marked by a line that starts with {@param sectionPrefix} followed by the section name. */
export function splitIntoSectionSequence(lines: Line[], sectionPrefix: string): SectionSequence {
	var sectionStartIndex = -1;
	var currentSection = <Section>null;
	var sequence = new SectionSequence();
	sequence.sections = <Section[]>[];
	
	// For each line...
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		
		// If it's the beginning of a section...
		if (line.text.startsWith(sectionPrefix)) {
			
			// If we were already in a section...
			if (currentSection) {
				// Close it.
				currentSection.lines = lines.slice(sectionStartIndex, i);
				sequence.sections.push(currentSection);
			} else {
				sequence.linesBefore = lines.slice(0, i);
			}
			
			// Make a new one.
			currentSection = new Section();
			currentSection.name = line.text.substring(sectionPrefix.length).trim();
			currentSection.prefix = sectionPrefix;
			currentSection.lineNum = line.num;
			sectionStartIndex = i + 1;
		}
	}
	
	// Close the last section.
	if (currentSection) {
		// Close it.
		currentSection.lines = lines.slice(sectionStartIndex, lines.length);
		sequence.sections.push(currentSection);
	}
	
	return sequence;
}