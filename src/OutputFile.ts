"use strict";
/// <reference path="../typings/node/node.d.ts" />

import * as fs from 'fs';
import * as util from 'util';

/** Manages the output file */
export class OutputFile {
	private _stream: NodeJS.WritableStream;
	private _indentLevel: number = 0;
	private _isLineStart: boolean = true;
	
	/** Creates the file on disk. */
	public constructor(path: string) {
		this._stream = fs.createWriteStream(path, { flags: 'w', encoding: 'utf8'});
	}
	
	/** Writes the indentation characters if we're at the start of a line. */
	public writeIndentation() {
		if (this._isLineStart) {
			this._isLineStart = false;
			if (this._indentLevel > 0) {
				var indent = '';
				for (var i = 0; i < this._indentLevel; i++)
					indent += '\t';
				this._stream.write(indent);
			}
		}
	}
	
	/** Writes text into the file. */
	public write(text: string) {
		this.writeIndentation();
		this._stream.write(text);
	}
	
	/** Writes formatted text into the file. */
	public writeFormat(format: string, ...params: any[]) {
		this.write(util.format.apply(null, [format].concat(params)));
	}
	
	/** Writes text and then inserts a new line. */
	public writeLine(text?: string) {
		if (text) {
			this.writeIndentation();
			this._stream.write(text);
		}
		this._stream.write('\n');
		this._isLineStart = true;
	}
	
	/** Writes formatted text and then inserts a new line. */
	public writeLineFormat(format: string, ...params: any[]) {
		this.writeLine(util.format.apply(null, [format].concat(params)));
	}
	
	/** Increments indent by one level. */
	public indent() {
		this._indentLevel++;
	}
	
	/** Decrements indent by one level. */
	public unindent() {
		this._indentLevel--;
	}
	
	/** Closes the file. */
	public async disposeAsync() {
		this._stream.end();
		await new Promise(resolve => this._stream.on('finish', resolve));
	}
}
