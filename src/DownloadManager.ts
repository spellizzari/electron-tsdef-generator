"use strict";
/// <reference path="../typings/node/node.d.ts" />

import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import * as https from 'https';
import * as ErrorManager from './ErrorManager';

/** Manages downloads from a GitHub folder. */
export class DownloadManager {
	private _baseUrl: string;
	private _localDir: string;
	
	/** Initializes the manager. */
	public constructor(baseUrl: string, localDir: string) {
		this._baseUrl = baseUrl;
		this._localDir = localDir;
	}
	
	/** Returns the path to the local version of the specified file. */
	public getLocalFilePath(fileName: string) {
		return path.join(this._localDir, fileName);
	}
	
	public getRemoteFileUrl(fileName: string) {
		return this._baseUrl + '/' + fileName;
	}
	
	/** Downloads the specified file or returns the cached copy. */
	public async downloadAsync(fileName: string) {
		// Make the local file path.
		var localFilePath = this.getLocalFilePath(fileName);
		
		// Check to see if the local file exists.
		var localFileExists = await new Promise<boolean>(resolve => fs.exists(localFilePath, resolve));
		
		// If it doesn't...
		if (!localFileExists) {
			// Make the reomve file url.
			var remoteFileUrl = this.getRemoteFileUrl(fileName);
			ErrorManager.logVerbose('downloading %s', remoteFileUrl);
			
			// Download the file.
			var file = fs.createWriteStream(localFilePath);
			var httpResponse = await new Promise<http.IncomingMessage>(resolve => https.get(remoteFileUrl, resolve));
			var filePipe = httpResponse.pipe(file);
			await new Promise(resolve => filePipe.on('close', resolve));
		}
		
		// Return the file content.
		return await new Promise<string>(resolve => fs.readFile(localFilePath, 'utf8', (err, data) => resolve(data)));
	}
}