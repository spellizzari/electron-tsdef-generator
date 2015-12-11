// Type definitions for Electron 0.35.4 (for both main and renderer process)
// Project: http://electron.atom.io/

/// <reference path="../node/node.d.ts" />

declare module 'electron' {

	import * as events from "events";
	type Accelerator = string;

	class Task {
		/** Path of the program to execute, usually you should pecify `process.execPath` which opens the current program. */
		program: string;
		/** The command line arguments when `program` is xecuted. */
		arguments: string;
		/** The string to be displayed in a JumpList. */
		title: string;
		/** Description of this task. */
		description: string;
		/** The absolute path to an icon to be displayed in a umpList, which can be an arbitrary resource file that contains an icon. You an usually specify `process.execPath` to show the icon of the program. */
		iconPath: string;
		/** The icon index in the icon file. If an icon file onsists of two or more icons, set this value to identify the icon. If an con file consists of one icon, this value is 0. */
		iconIndex: number;
	}

	/**
	 * The `app` module is responsible for controlling the application's lifecycle.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md}
	 */
	interface AppModule extends NodeJS.EventEmitter {
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the application has finished basic startup.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#event-willfinishlaunching}
		 */
		on(event: 'will-finish-launching', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when Electron has finished initialization.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#event-ready}
		 */
		on(event: 'ready', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when all windows have been closed.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#event-windowallclosed}
		 */
		on(event: 'window-all-closed', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted before the application starts closing its windows.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#event-beforequit}
		 * @param event
		 */
		on(event: 'before-quit', listener: (event: Event) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when all windows have been closed and the application will quit.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#event-willquit}
		 * @param event
		 */
		on(event: 'will-quit', listener: (event: Event) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when the application is quitting.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#event-quit}
		 */
		on(event: 'quit', listener: Function): NodeJS.EventEmitter;
		/**
		 * (OS X) Emitted when the user wants to open a file with the application.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#event-openfile-os-x}
		 * @param event
		 * @param path
		 */
		on(event: 'open-file', listener: (event: Event, path: string) => void): NodeJS.EventEmitter;
		/**
		 * (OS X) Emitted when the user wants to open a URL with the application.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#event-openurl-os-x}
		 * @param event
		 * @param url
		 */
		on(event: 'open-url', listener: (event: Event, url: string) => void): NodeJS.EventEmitter;
		/**
		 * (OS X) Emitted when the application is activated, which usually happens when clicks on the applications's dock icon.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#event-activate-os-x}
		 * @param event
		 * @param hasVisibleWindows
		 */
		on(event: 'activate', listener: (event: Event, hasVisibleWindows: Boolean) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when a [browserWindow](browser-window.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#event-browserwindowblur}
		 * @param event
		 * @param window
		 */
		on(event: 'browser-window-blur', listener: (event: Event, window: BrowserWindow) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when a [browserWindow](browser-window.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#event-browserwindowfocus}
		 * @param event
		 * @param window
		 */
		on(event: 'browser-window-focus', listener: (event: Event, window: BrowserWindow) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when a new [browserWindow](browser-window.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#event-browserwindowcreated}
		 * @param event
		 * @param window
		 */
		on(event: 'browser-window-created', listener: (event: Event, window: BrowserWindow) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when failed to verify the `certificate` for `url`, to trust the certificate you should prevent the default behavior with `event.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#event-certificateerror}
		 * @param event
		 * @param webContents
		 * @param url
		 * @param error - The error code
		 * @param certificate
		 * @param callback
		 */
		on(event: 'certificate-error', listener: (event: Event, webContents: WebContents, url: URL, error: string, certificate: { data: Buffer; issuerName: string; }, callback: (value: boolean) => void) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when a client certificate is requested.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#event-selectclientcertificate}
		 * @param event
		 * @param webContents
		 * @param url
		 * @param certificateList
		 * @param callback
		 */
		on(event: 'select-client-certificate', listener: (event: Event, webContents: WebContents, url: URL, certificateList: { data: Buffer; issuerName: string; }[], callback: (value: any) => void) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when `webContents` wants to do basic auth.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#event-login}
		 * @param event
		 * @param webContents
		 * @param request
		 * @param authInfo
		 * @param callback
		 */
		on(event: 'login', listener: (event: Event, webContents: WebContents, request: { method: string; url: URL; referrer: URL; }, authInfo: { isProxy: Boolean; scheme: string; host: string; port: number; realm: string; }, callback: (username: string, secret: string) => void) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when the gpu process crashes.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#event-gpuprocesscrashed}
		 */
		on(event: 'gpu-process-crashed', listener: Function): NodeJS.EventEmitter;
		//
		// Methods
		//
		/**
		 * Try to close all windows.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appquit}
		 */
		quit(): void;
		/**
		 * Exits immediately with `exitCode`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appexitexitcode}
		 * @param exitCode
		 */
		exit(exitCode: number): void;
		/**
		 * Returns the current application directory.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appgetapppath}
		 */
		getAppPath(): string;
		/**
		 * Retrieves a path to a special directory or file associated with `name`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appgetpathname}
		 * @param name
		 */
		getPath(name: string): string;
		/**
		 * Overrides the `path` to a special directory or file associated with `name`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appsetpathname-path}
		 * @param name
		 * @param path
		 */
		setPath(name: string, path: string): void;
		/**
		 * Returns the version of the loaded application.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appgetversion}
		 */
		getVersion(): string;
		/**
		 * Returns the current application's name, which is the name in the application's `package.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appgetname}
		 */
		getName(): string;
		/**
		 * Returns the current application locale.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appgetlocale}
		 */
		getLocale(): string;
		/**
		 * (Windows) Adds `path` to the recent documents list.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appaddrecentdocumentpath-os-x-windows}
		 * @param path
		 */
		addRecentDocument(path: string): void;
		/**
		 * (Windows) Clears the recent documents list.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appclearrecentdocuments-os-x-windows}
		 */
		clearRecentDocuments(): void;
		/**
		 * (Windows) Adds `tasks` to the [Tasks][tasks] category of the JumpList on Windows.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appsetusertaskstasks-windows}
		 * @param tasks - Array of `Task` objects
		 */
		setUserTasks(tasks: Task[]): void;
		/**
		 * Dynamically sets whether to always send credentials for HTTP NTLM or Negotiate authentication - normally, Electron will only send NTLM/Kerberos credentials for URLs that fall under "Local Intranet" sites (i.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appallowntlmcredentialsforalldomainsallow}
		 * @param allow
		 */
		allowNTLMCredentialsForAllDomains(allow: Boolean): void;
		/**
		 * This method makes your application a Single Instance Application - instead of allowing multiple instances of your app to run, this will ensure that only a single instance of your app is running, and other instances signal this instance and exit.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appmakesingleinstancecallback}
		 * @param callback
		 */
		makeSingleInstance(callback: (argv: string[], workingDirectory: string) => boolean): void;
		/**
		 * (Windows) Changes the [Application User Model ID][app-user-model-id] to `id`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appsetappusermodelidid-windows}
		 * @param id
		 */
		setAppUserModelId(id: string): void;
		//
		// Grouped Definitions
		//
		commandLine: {
			/**
			 * Append a switch (with optional `value`) to Chromium's command line.
			 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appcommandlineappendswitchswitch-value}
			 * @param _switch
			 * @param value
			 */
			appendSwitch(_switch: any, value?: any): void;
			/**
			 * Append an argument to Chromium's command line.
			 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appcommandlineappendargumentvalue}
			 * @param value
			 */
			appendArgument(value: any): void;
		};
		dock: {
			/**
			 * (OS X) When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.
			 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appdockbouncetype-os-x}
			 * @param type - Can be `critical` or `informational`. The default is informational`
			 */
			bounce(type?: string): number;
			/**
			 * (OS X) Cancel the bounce of `id`.
			 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appdockcancelbounceid-os-x}
			 * @param id
			 */
			cancelBounce(id: number): void;
			/**
			 * (OS X) Sets the string to be displayed in the dock’s badging area.
			 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appdocksetbadgetext-os-x}
			 * @param text
			 */
			setBadge(text: string): void;
			/**
			 * (OS X) Returns the badge string of the dock.
			 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appdockgetbadge-os-x}
			 */
			getBadge(): string;
			/**
			 * (OS X) Hides the dock icon.
			 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appdockhide-os-x}
			 */
			hide(): void;
			/**
			 * (OS X) Shows the dock icon.
			 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appdockshow-os-x}
			 */
			show(): void;
			/**
			 * (OS X) Sets the application's [dock menu][dock-menu].
			 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md#appdocksetmenumenu-os-x}
			 * @param menu
			 */
			setMenu(menu: Menu): void;
		};
	}

	/**
	 * This module provides an interface for the `Squirrel` auto-updater framework.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/auto-updater.md}
	 */
	interface AutoUpdaterModule extends NodeJS.EventEmitter {
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when there is an error while updating.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/auto-updater.md#event-error}
		 * @param error
		 */
		on(event: 'error', listener: (error: Error) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when checking if an update has started.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/auto-updater.md#event-checkingforupdate}
		 */
		on(event: 'checking-for-update', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when there is an available update.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/auto-updater.md#event-updateavailable}
		 */
		on(event: 'update-available', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when there is no available update.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/auto-updater.md#event-updatenotavailable}
		 */
		on(event: 'update-not-available', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when an update has been downloaded.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/auto-updater.md#event-updatedownloaded}
		 * @param event
		 * @param releaseNotes
		 * @param releaseName
		 * @param releaseDate
		 * @param updateURL
		 */
		on(event: 'update-downloaded', listener: (event: Event, releaseNotes: string, releaseName: string, releaseDate: Date, updateURL: string) => void): NodeJS.EventEmitter;
		//
		// Methods
		//
		/**
		 * Sets the `url` and initialize the auto updater.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/auto-updater.md#autoupdatersetfeedurlurl}
		 * @param url
		 */
		setFeedURL(url: string): void;
		/**
		 * Asks the server whether there is an update.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/auto-updater.md#autoupdatercheckforupdates}
		 */
		checkForUpdates(): void;
		/**
		 * Restarts the app and installs the update after it has been downloaded.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/auto-updater.md#autoupdaterquitandinstall}
		 */
		quitAndInstall(): void;
	}

	class Button {
		/** The icon showing in thumbnail oolbar. */
		icon: NativeImage;
		/** The text of the button's tooltip. */
		tooltip: string;
		/** Control specific states and behaviors f the button. By default, it uses `enabled`. It can include following trings: */
		flags: any[];
		/** Function */
		click: Function;
	}

	/**
	 * The `BrowserWindow` class gives you the ability to create a browser window.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md}
	 */
	class BrowserWindow extends events.EventEmitter {
		//
		// Properties
		//
		/**
		 * The `WebContents` object this window owns, all web page related events and operations will be done via it.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winwebcontents}
		 */
		webContents: WebContents;
		/**
		 * The unique ID of this window.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winid}
		 */
		id: number;
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the document changed its title, calling `event.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-pagetitleupdated}
		 * @param event
		 */
		on(event: 'page-title-updated', listener: (event: Event) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when the window is going to be closed.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-close}
		 * @param event
		 */
		on(event: 'close', listener: (event: Event) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when the window is closed.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-closed}
		 */
		on(event: 'closed', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the web page becomes unresponsive.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-unresponsive}
		 */
		on(event: 'unresponsive', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the unresponsive web page becomes responsive again.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-responsive}
		 */
		on(event: 'responsive', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the window loses focus.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-blur}
		 */
		on(event: 'blur', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the window gains focus.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-focus}
		 */
		on(event: 'focus', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when window is maximized.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-maximize}
		 */
		on(event: 'maximize', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the window exits from maximized state.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-unmaximize}
		 */
		on(event: 'unmaximize', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the window is minimized.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-minimize}
		 */
		on(event: 'minimize', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the window is restored from minimized state.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-restore}
		 */
		on(event: 'restore', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the window is getting resized.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-resize}
		 */
		on(event: 'resize', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the window is getting moved to a new position.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-move}
		 */
		on(event: 'move', listener: Function): NodeJS.EventEmitter;
		/**
		 * (OS X) Emitted once when the window is moved to a new position.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-moved-os-x}
		 */
		on(event: 'moved', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the window enters full screen state.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-enterfullscreen}
		 */
		on(event: 'enter-full-screen', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the window leaves full screen state.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-leavefullscreen}
		 */
		on(event: 'leave-full-screen', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the window enters full screen state triggered by html api.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-enterhtmlfullscreen}
		 */
		on(event: 'enter-html-full-screen', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the window leaves full screen state triggered by html api.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-leavehtmlfullscreen}
		 */
		on(event: 'leave-html-full-screen', listener: Function): NodeJS.EventEmitter;
		/**
		 * (Windows) Emitted when an [App Command](https://msdn.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#event-appcommand-windows}
		 */
		on(event: 'app-command', listener: Function): NodeJS.EventEmitter;
		//
		// Methods
		//
		/**
		 * Force closing the window, the `unload` and `beforeunload` event won't be emitted for the web page, and `close` event will also not be emitted for this window, but it guarantees the `closed` event will be emitted.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#windestroy}
		 */
		destroy(): void;
		/**
		 * Try to close the window, this has the same effect with user manually clicking the close button of the window.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winclose}
		 */
		close(): void;
		/**
		 * Focus on the window.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winfocus}
		 */
		focus(): void;
		/**
		 * Returns a boolean, whether the window is focused.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winisfocused}
		 */
		isFocused(): boolean;
		/**
		 * Shows and gives focus to the window.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winshow}
		 */
		show(): void;
		/**
		 * Shows the window but doesn't focus on it.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winshowinactive}
		 */
		showInactive(): void;
		/**
		 * Hides the window.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winhide}
		 */
		hide(): void;
		/**
		 * Returns a boolean, whether the window is visible to the user.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winisvisible}
		 */
		isVisible(): boolean;
		/**
		 * Maximizes the window.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winmaximize}
		 */
		maximize(): void;
		/**
		 * Unmaximizes the window.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winunmaximize}
		 */
		unmaximize(): void;
		/**
		 * Returns a boolean, whether the window is maximized.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winismaximized}
		 */
		isMaximized(): boolean;
		/**
		 * Minimizes the window.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winminimize}
		 */
		minimize(): void;
		/**
		 * Restores the window from minimized state to its previous state.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winrestore}
		 */
		restore(): void;
		/**
		 * Returns a boolean, whether the window is minimized.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winisminimized}
		 */
		isMinimized(): boolean;
		/**
		 * Sets whether the window should be in fullscreen mode.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetfullscreenflag}
		 * @param flag
		 */
		setFullScreen(flag: Boolean): void;
		/**
		 * Returns a boolean, whether the window is in fullscreen mode.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winisfullscreen}
		 */
		isFullScreen(): boolean;
		/**
		 * (OS X) This will have a window maintain an aspect ratio.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetaspectratioaspectratio-extrasize-os-x}
		 * @param aspectRatio
		 * @param extraSize - The extra size not to be included while aintaining the aspect ratio. Properties:
		 */
		setAspectRatio(aspectRatio: number, extraSize?: { width: number; height: number; }): void;
		/**
		 * Resizes and moves the window to `width`, `height`, `x`, `y`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetboundsoptions}
		 * @param options
		 */
		setBounds(options: { x: number; y: number; width: number; height: number; }): void;
		/**
		 * Returns an object that contains window's width, height, x and y values.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#wingetbounds}
		 */
		getBounds(): { x: number; y: number; width: number; height: number; };
		/**
		 * Resizes the window to `width` and `height`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetsizewidth-height}
		 * @param width
		 * @param height
		 */
		setSize(width: number, height: number): void;
		/**
		 * Returns an array that contains window's width and height.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#wingetsize}
		 */
		getSize(): number[];
		/**
		 * Resizes the window's client area (e.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetcontentsizewidth-height}
		 * @param width
		 * @param height
		 */
		setContentSize(width: number, height: number): void;
		/**
		 * Returns an array that contains window's client area's width and height.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#wingetcontentsize}
		 */
		getContentSize(): number[];
		/**
		 * Sets the minimum size of window to `width` and `height`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetminimumsizewidth-height}
		 * @param width
		 * @param height
		 */
		setMinimumSize(width: number, height: number): void;
		/**
		 * Returns an array that contains window's minimum width and height.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#wingetminimumsize}
		 */
		getMinimumSize(): number[];
		/**
		 * Sets the maximum size of window to `width` and `height`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetmaximumsizewidth-height}
		 * @param width
		 * @param height
		 */
		setMaximumSize(width: number, height: number): void;
		/**
		 * Returns an array that contains window's maximum width and height.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#wingetmaximumsize}
		 */
		getMaximumSize(): number[];
		/**
		 * Sets whether the window can be manually resized by user.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetresizableresizable}
		 * @param resizable
		 */
		setResizable(resizable: Boolean): void;
		/**
		 * Returns whether the window can be manually resized by user.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winisresizable}
		 */
		isResizable(): boolean;
		/**
		 * Sets whether the window should show always on top of other windows.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetalwaysontopflag}
		 * @param flag
		 */
		setAlwaysOnTop(flag: Boolean): void;
		/**
		 * Returns whether the window is always on top of other windows.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winisalwaysontop}
		 */
		isAlwaysOnTop(): boolean;
		/**
		 * Moves window to the center of the screen.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#wincenter}
		 */
		center(): void;
		/**
		 * Moves window to `x` and `y`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetpositionx-y}
		 * @param x
		 * @param y
		 */
		setPosition(x: number, y: number): void;
		/**
		 * Returns an array that contains window's current position.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#wingetposition}
		 */
		getPosition(): number[];
		/**
		 * Changes the title of native window to `title`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsettitletitle}
		 * @param title
		 */
		setTitle(title: string): void;
		/**
		 * Returns the title of the native window.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#wingettitle}
		 */
		getTitle(): string;
		/**
		 * Starts or stops flashing the window to attract user's attention.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winflashframeflag}
		 * @param flag
		 */
		flashFrame(flag: Boolean): void;
		/**
		 * Makes the window not show in the taskbar.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetskiptaskbarskip}
		 * @param skip
		 */
		setSkipTaskbar(skip: Boolean): void;
		/**
		 * Enters or leaves the kiosk mode.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetkioskflag}
		 * @param flag
		 */
		setKiosk(flag: Boolean): void;
		/**
		 * Returns whether the window is in kiosk mode.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winiskiosk}
		 */
		isKiosk(): boolean;
		/**
		 * (Windows) Hooks a windows message.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winhookwindowmessagemessage-callback-windows}
		 * @param message
		 * @param callback
		 */
		hookWindowMessage(message: number, callback: Function): void;
		/**
		 * (Windows) Returns `true` or `false` depending on whether the message is hooked.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winiswindowmessagehookedmessage-windows}
		 * @param message
		 */
		isWindowMessageHooked(message: number): boolean;
		/**
		 * (Windows) Unhook the window message.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winunhookwindowmessagemessage-windows}
		 * @param message
		 */
		unhookWindowMessage(message: number): void;
		/**
		 * (Windows) Unhooks all of the window messages.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winunhookallwindowmessages-windows}
		 */
		unhookAllWindowMessages(): void;
		/**
		 * (OS X) Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetrepresentedfilenamefilename-os-x}
		 * @param filename
		 */
		setRepresentedFilename(filename: string): void;
		/**
		 * (OS X) Returns the pathname of the file the window represents.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#wingetrepresentedfilename-os-x}
		 */
		getRepresentedFilename(): string;
		/**
		 * (OS X) Specifies whether the window’s document has been edited, and the icon in title bar will become grey when set to `true`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetdocumenteditededited-os-x}
		 * @param edited
		 */
		setDocumentEdited(edited: Boolean): void;
		/**
		 * (OS X) Whether the window's document has been edited.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winisdocumentedited-os-x}
		 */
		isDocumentEdited(): boolean;
		/**
		 * 
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winfocusonwebview}
		 */
		focusOnWebView(): void;
		/**
		 * 
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winblurwebview}
		 */
		blurWebView(): void;
		/**
		 * Captures a snapshot of the page within `rect`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#wincapturepagerect-callback}
		 * @param rect - The area of page to be captured, properties:
		 * @param callback
		 */
		capturePage(rect: { x: number; y: number; width: number; height: number; }, callback: Function): void;
		/**
		 * Same as `webContents.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winprintoptions}
		 * @param options
		 */
		print(options?: any): void;
		/**
		 * Same as `webContents.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winprinttopdfoptions-callback}
		 * @param options
		 * @param callback
		 */
		printToPDF(options: any, callback: any): void;
		/**
		 * Same as `webContents.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winloadurlurl-options}
		 * @param url
		 * @param options
		 */
		loadURL(url: any, options?: any): void;
		/**
		 * Same as `webContents.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winreload}
		 */
		reload(): void;
		/**
		 * (Windows) Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetmenumenu-linux-windows}
		 * @param menu
		 */
		setMenu(menu: Menu): void;
		/**
		 * Sets progress value in progress bar.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetprogressbarprogress}
		 * @param progress
		 */
		setProgressBar(progress: number): void;
		/**
		 * (Windows 7+) Sets a 16px overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetoverlayiconoverlay-description-windows-7}
		 * @param overlay - the icon to display on the bottom ight corner of the taskbar icon. If this parameter is `null`, the overlay is leared
		 * @param description - a description that will be provided to Accessibility creen readers
		 */
		setOverlayIcon(overlay: NativeImage, description: string): void;
		/**
		 * (Windows 7+) `button` Object, properties:
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetthumbarbuttonsbuttons-windows-7}
		 * @param buttons
		 */
		setThumbarButtons(buttons: Button[]): boolean;
		/**
		 * (OS X) Shows pop-up dictionary that searches the selected word on the page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winshowdefinitionforselection-os-x}
		 */
		showDefinitionForSelection(): void;
		/**
		 * Sets whether the window menu bar should hide itself automatically.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetautohidemenubarhide}
		 * @param hide
		 */
		setAutoHideMenuBar(hide: Boolean): void;
		/**
		 * Returns whether menu bar automatically hides itself.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winismenubarautohide}
		 */
		isMenuBarAutoHide(): boolean;
		/**
		 * Sets whether the menu bar should be visible.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetmenubarvisibilityvisible}
		 * @param visible
		 */
		setMenuBarVisibility(visible: Boolean): void;
		/**
		 * Returns whether the menu bar is visible.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winismenubarvisible}
		 */
		isMenuBarVisible(): boolean;
		/**
		 * Sets whether the window should be visible on all workspaces.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winsetvisibleonallworkspacesvisible}
		 * @param visible
		 */
		setVisibleOnAllWorkspaces(visible: Boolean): void;
		/**
		 * Returns whether the window is visible on all workspaces.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#winisvisibleonallworkspaces}
		 */
		isVisibleOnAllWorkspaces(): boolean;
		/**
		 * Returns an array of all opened browser windows.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#browserwindowgetallwindows}
		 */
		static getAllWindows(): BrowserWindow[];
		/**
		 * Returns the window that is focused in this application.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#browserwindowgetfocusedwindow}
		 */
		static getFocusedWindow(): BrowserWindow;
		/**
		 * Find a window according to the `webContents` it owns.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#browserwindowfromwebcontentswebcontents}
		 * @param webContents
		 */
		static fromWebContents(webContents: WebContents): BrowserWindow;
		/**
		 * Find a window according to its ID.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#browserwindowfromidid}
		 * @param id
		 */
		static fromId(id: number): BrowserWindow;
		/**
		 * Adds DevTools extension located at `path`, and returns extension's name.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#browserwindowadddevtoolsextensionpath}
		 * @param path
		 */
		static addDevToolsExtension(path: string): void;
		/**
		 * Remove the DevTools extension whose name is `name`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md#browserwindowremovedevtoolsextensionname}
		 * @param name
		 */
		static removeDevToolsExtension(name: string): void;
	}

	/**
	 * The `clipboard` module provides methods to perform copy and paste operations.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/clipboard.md}
	 */
	interface ClipboardModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/**
		 * Returns the content in the clipboard as plain text.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/clipboard.md#clipboardreadtexttype}
		 * @param type
		 */
		readText(type?: string): string;
		/**
		 * Writes the `text` into the clipboard as plain text.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/clipboard.md#clipboardwritetexttext-type}
		 * @param text
		 * @param type
		 */
		writeText(text: string, type?: string): void;
		/**
		 * Returns the content in the clipboard as markup.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/clipboard.md#clipboardreadhtmltype}
		 * @param type
		 */
		readHtml(type?: string): string;
		/**
		 * Writes `markup` to the clipboard.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/clipboard.md#clipboardwritehtmlmarkup-type}
		 * @param markup
		 * @param type
		 */
		writeHtml(markup: string, type?: string): void;
		/**
		 * Returns the content in the clipboard as a [NativeImage](native-image.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/clipboard.md#clipboardreadimagetype}
		 * @param type
		 */
		readImage(type?: string): NativeImage;
		/**
		 * Writes `image` to the clipboard.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/clipboard.md#clipboardwriteimageimage-type}
		 * @param image
		 * @param type
		 */
		writeImage(image: NativeImage, type?: string): void;
		/**
		 * Clears the clipboard content.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/clipboard.md#clipboardcleartype}
		 * @param type
		 */
		clear(type?: string): void;
		/**
		 * Returns an array of supported formats for the clipboard `type`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/clipboard.md#clipboardavailableformatstype}
		 * @param type
		 */
		availableFormats(type?: string): string[];
		/**
		 * (Experimental) Returns whether the clipboard supports the format of specified `data`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/clipboard.md#clipboardhasdata-type-experimental}
		 * @param data
		 * @param type
		 */
		has(data: string, type?: string): boolean;
		/**
		 * (Experimental) Reads `data` from the clipboard.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/clipboard.md#clipboardreaddata-type-experimental}
		 * @param data
		 * @param type
		 */
		read(data: string, type?: string): any;
		/**
		 * ```javascript clipboard.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/clipboard.md#clipboardwritedata-type}
		 * @param data
		 * @param type
		 */
		write(data: { text: string; html: string; image: NativeImage; }, type?: string): void;
	}

	/**
	 * The `content-tracing` module is used to collect tracing data generated by the underlying Chromium content module.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/content-tracing.md}
	 */
	interface ContentTracingModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/**
		 * Get a set of category groups.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/content-tracing.md#contenttracinggetcategoriescallback}
		 * @param callback
		 */
		getCategories(callback: Function): any;
		/**
		 * Start recording on all processes.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/content-tracing.md#contenttracingstartrecordingoptions-callback}
		 * @param options
		 * @param callback
		 */
		startRecording(options: { categoryFilter: string; traceOptions: string; }, callback: Function): void;
		/**
		 * Stop recording on all processes.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/content-tracing.md#contenttracingstoprecordingresultfilepath-callback}
		 * @param resultFilePath
		 * @param callback
		 */
		stopRecording(resultFilePath: string, callback: Function): void;
		/**
		 * Start monitoring on all processes.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/content-tracing.md#contenttracingstartmonitoringoptions-callback}
		 * @param options
		 * @param callback
		 */
		startMonitoring(options: { categoryFilter: string; traceOptions: string; }, callback: Function): void;
		/**
		 * Stop monitoring on all processes.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/content-tracing.md#contenttracingstopmonitoringcallback}
		 * @param callback
		 */
		stopMonitoring(callback: Function): void;
		/**
		 * Get the current monitoring traced data.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/content-tracing.md#contenttracingcapturemonitoringsnapshotresultfilepath-callback}
		 * @param resultFilePath
		 * @param callback
		 */
		captureMonitoringSnapshot(resultFilePath: string, callback: Function): void;
		/**
		 * Get the maximum usage across processes of trace buffer as a percentage of the full state.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/content-tracing.md#contenttracinggettracebufferusagecallback}
		 * @param callback
		 */
		getTraceBufferUsage(callback: Function): number;
		/**
		 * `callback` will will be called every time the given event occurs on any process.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/content-tracing.md#contenttracingsetwatcheventcategoryname-eventname-callback}
		 * @param categoryName
		 * @param eventName
		 * @param callback
		 */
		setWatchEvent(categoryName: string, eventName: string, callback: Function): void;
		/**
		 * Cancel the watch event.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/content-tracing.md#contenttracingcancelwatchevent}
		 */
		cancelWatchEvent(): void;
	}

	/**
	 * The `crash-reporter` module enables sending your app's crash reports.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/crash-reporter.md}
	 */
	interface CrashReporterModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/**
		 * You are required to call this method before using other `crashReporter` APIs.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/crash-reporter.md#crashreporterstartoptions}
		 * @param options
		 */
		start(options: { productName: string; companyName: string; submitURL: string; autoSubmit: Boolean; ignoreSystemCrashHandler: Boolean; extra: Object; }): void;
		/**
		 * Returns the date and ID of the last crash report.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/crash-reporter.md#crashreportergetlastcrashreport}
		 */
		getLastCrashReport(): any;
		/**
		 * Returns all uploaded crash reports.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/crash-reporter.md#crashreportergetuploadedreports}
		 */
		getUploadedReports(): any[];
	}

	/**
	 * The `dialog` module provides APIs to show native system dialogs, such as opening files or alerting, so web applications can deliver the same user experience as native applications.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/dialog.md}
	 */
	interface DialogModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/**
		 * On success this method returns an array of file paths chosen by the user, otherwise it returns `undefined`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options-callback}
		 * @param browserWindow
		 * @param options
		 * @param callback
		 */
		showOpenDialog(browserWindow?: BrowserWindow, options?: { title: string; defaultPath: string; filters: any[]; properties: any[]; }, callback?: (filenames: string[]) => void): string[];
		/**
		 * On success this method returns the path of the file chosen by the user, otherwise it returns `undefined`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/dialog.md#dialogshowsavedialogbrowserwindow-options-callback}
		 * @param browserWindow
		 * @param options
		 * @param callback
		 */
		showSaveDialog(browserWindow?: BrowserWindow, options?: { title: string; defaultPath: string; filters: any[]; }, callback?: (filename: string) => void): string;
		/**
		 * Shows a message box, it will block the process until the message box is closed.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/dialog.md#dialogshowmessageboxbrowserwindow-options-callback}
		 * @param browserWindow
		 * @param options
		 * @param callback
		 */
		showMessageBox(browserWindow?: BrowserWindow, options?: { type: string; buttons: any[]; title: string; message: string; detail: string; icon: NativeImage; cancelId: number; noLink: Boolean; }, callback?: (response: any) => void): any;
		/**
		 * Displays a modal dialog that shows an error message.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/dialog.md#dialogshowerrorboxtitle-content}
		 * @param title
		 * @param content
		 */
		showErrorBox(title: any, content: any): void;
	}

	/**
	 * `DownloadItem` is an EventEmitter represents a download item in Electron.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/download-item.md}
	 */
	class DownloadItem extends events.EventEmitter {
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/**
		 * Emits when the `downloadItem` gets updated.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/download-item.md#event-updated}
		 */
		on(event: 'updated', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emits when the download is in a terminal state.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/download-item.md#event-done}
		 * @param event
		 * @param state
		 */
		on(event: 'done', listener: (event: Event, state: string) => void): NodeJS.EventEmitter;
		//
		// Methods
		//
		/**
		 * The API is only available in session's `will-download` callback function.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/download-item.md#downloaditemsetsavepathpath}
		 * @param path - Set the save file path of the download item.
		 */
		setSavePath(path: string): void;
		/**
		 * Pauses the download.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/download-item.md#downloaditempause}
		 */
		pause(): void;
		/**
		 * Resumes the download that has been paused.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/download-item.md#downloaditemresume}
		 */
		resume(): void;
		/**
		 * Cancels the download operation.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/download-item.md#downloaditemcancel}
		 */
		cancel(): void;
		/**
		 * Returns a `String` represents the origin url where the item is downloaded from.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/download-item.md#downloaditemgeturl}
		 */
		getURL(): string;
		/**
		 * Returns a `String` represents the mime type.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/download-item.md#downloaditemgetmimetype}
		 */
		getMimeType(): string;
		/**
		 * Returns a `Boolean` indicates whether the download has user gesture.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/download-item.md#downloaditemhasusergesture}
		 */
		hasUserGesture(): Boolean;
		/**
		 * Returns a `String` represents the file name of the download item.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/download-item.md#downloaditemgetfilename}
		 */
		getFilename(): string;
		/**
		 * Returns a `Integer` represents the total size in bytes of the download item.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/download-item.md#downloaditemgettotalbytes}
		 */
		getTotalBytes(): number;
		/**
		 * Returns a `Integer` represents the received bytes of the download item.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/download-item.md#downloaditemgetreceivedbytes}
		 */
		getReceivedBytes(): number;
		/**
		 * Returns a `String` represents the Content-Disposition field from the response header.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/download-item.md#downloaditemgetcontentdisposition}
		 */
		getContentDisposition(): string;
	}

	/**
	 * The `global-shortcut` module can register/unregister a global keyboard shortcut with the operating system so that you can customize the operations for various shortcuts.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/global-shortcut.md}
	 */
	interface GlobalShortcutModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/**
		 * Registers a global shortcut of `accelerator`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/global-shortcut.md#globalshortcutregisteraccelerator-callback}
		 * @param accelerator
		 * @param callback
		 */
		register(accelerator: Accelerator, callback: Function): void;
		/**
		 * Returns `true` or `false` depending on whether the shortcut `accelerator` is registered.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/global-shortcut.md#globalshortcutisregisteredaccelerator}
		 * @param accelerator
		 */
		isRegistered(accelerator: Accelerator): boolean;
		/**
		 * Unregisters the global shortcut of `accelerator`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/global-shortcut.md#globalshortcutunregisteraccelerator}
		 * @param accelerator
		 */
		unregister(accelerator: Accelerator): void;
		/**
		 * Unregisters all of the global shortcuts.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/global-shortcut.md#globalshortcutunregisterall}
		 */
		unregisterAll(): void;
	}

	/**
	 * The `ipcMain` module, when used in the main process, handles asynchronous and synchronous messages sent from a renderer process (web page).
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/ipc-main.md}
	 */
	interface IpcMainModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/**
		 * When the event occurs the `callback` is called with an `event` object and a message, `arg`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/ipc-main.md#ipcmainonchannel-callback}
		 * @param channel - The event name.
		 * @param callback
		 */
		on(channel: string, callback: (event: { returnValue: any; sender: WebContents; }) => void): NodeJS.EventEmitter;
	}

	/**
	 * The `ipcRenderer` module provides a few methods so you can send synchronous and asynchronous messages from the render process (web page) to the main process.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/ipc-renderer.md}
	 */
	interface IpcRendererModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/**
		 * When the event occurs the `callback` is called with an `event` object and arbitrary arguments.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/ipc-renderer.md#ipcrendereronchannel-callback}
		 * @param channel - The event name.
		 * @param callback
		 */
		on(channel: string, callback: (event: any) => void): NodeJS.EventEmitter;
		/**
		 * Send an event to the main process asynchronously via a `channel`, you can also send arbitrary arguments.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/ipc-renderer.md#ipcrenderersendchannel-arg1-arg2}
		 * @param channel - The event name.
		 * @param arg
		 */
		send(channel: string, ...arg: any[]): void;
		/**
		 * Send an event to the main process synchronously via a `channel`, you can also send arbitrary arguments.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/ipc-renderer.md#ipcrenderersendsyncchannel-arg1-arg2}
		 * @param channel - The event name.
		 * @param arg
		 */
		sendSync(channel: string, ...arg: any[]): void;
		/**
		 * Like `ipcRenderer.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/ipc-renderer.md#ipcrenderersendtohostchannel-arg1-arg2}
		 * @param channel - The event name.
		 * @param arg
		 */
		sendToHost(channel: string, ...arg: any[]): void;
	}

	/**
	 * The `menu-item` module allows you to add items to an application or context [`menu`](menu.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/menu-item.md}
	 */
	class MenuItem extends events.EventEmitter {
	}

	/**
	 * The `menu` class is used to create native menus that can be used as application menus and [context menus](https://developer.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/menu.md}
	 */
	class Menu extends events.EventEmitter {
		//
		// Methods
		//
		/**
		 * Sets `menu` as the application menu on OS X.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/menu.md#menusetapplicationmenumenu}
		 * @param menu
		 */
		static setApplicationMenu(menu: Menu): void;
		/**
		 * (OS X) Sends the `action` to the first responder of application.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/menu.md#menusendactiontofirstresponderaction-os-x}
		 * @param action
		 */
		static sendActionToFirstResponder(action: string): void;
		/**
		 * Generally, the `template` is just an array of `options` for constructing a [MenuItem](menu-item.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/menu.md#menubuildfromtemplatetemplate}
		 * @param template
		 */
		static buildFromTemplate(template: any[]): void;
		/**
		 * Pops up this menu as a context menu in the `browserWindow`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/menu.md#menupopupbrowserwindow-x-y}
		 * @param browserWindow
		 * @param x
		 * @param y
		 */
		static popup(browserWindow?: BrowserWindow, x?: Number, y?: Number): void;
		/**
		 * Appends the `menuItem` to the menu.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/menu.md#menuappendmenuitem}
		 * @param menuItem
		 */
		static append(menuItem: MenuItem): void;
		/**
		 * Inserts the `menuItem` to the `pos` position of the menu.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/menu.md#menuinsertpos-menuitem}
		 * @param pos
		 * @param menuItem
		 */
		static insert(pos: number, menuItem: MenuItem): void;
		/**
		 * Get an array containing the menu's items.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/menu.md#menuitems}
		 */
		static items(): MenuItem[];
	}

	/**
	 * In Electron, for the APIs that take images, you can pass either file paths or `nativeImage` instances.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/native-image.md}
	 */
	class NativeImage extends events.EventEmitter {
		//
		// Methods
		//
		/**
		 * Returns a [Buffer][buffer] that contains the image's `PNG` encoded data.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/native-image.md#imagetopng}
		 */
		toPng(): Buffer;
		/**
		 * Returns a [Buffer][buffer] that contains the image's `JPEG` encoded data.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/native-image.md#imagetojpegquality}
		 * @param quality - 100 (**required**)
		 */
		toJpeg(quality: number): Buffer;
		/**
		 * Returns the data URL of the image.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/native-image.md#imagetodataurl}
		 */
		toDataURL(): string;
		/**
		 * Returns a boolean whether the image is empty.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/native-image.md#imageisempty}
		 */
		isEmpty(): boolean;
		/**
		 * Returns the size of the image.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/native-image.md#imagegetsize}
		 */
		getSize(): number[];
		/**
		 * Marks the image as template image.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/native-image.md#imagesettemplateimageoption}
		 * @param option
		 */
		setTemplateImage(option: Boolean): void;
		/**
		 * Returns a boolean whether the image is a template image.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/native-image.md#imageistemplateimage}
		 */
		isTemplateImage(): boolean;
		/**
		 * Creates an empty `nativeImage` instance.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/native-image.md#nativeimagecreateempty}
		 */
		static createEmpty(): NativeImage;
		/**
		 * Creates a new `nativeImage` instance from a file located at `path`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/native-image.md#nativeimagecreatefrompathpath}
		 * @param path
		 */
		static createFromPath(path: string): NativeImage;
		/**
		 * Creates a new `nativeImage` instance from `buffer`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/native-image.md#nativeimagecreatefrombufferbuffer-scalefactor}
		 * @param buffer
		 * @param scaleFactor
		 */
		static createFromBuffer(buffer: Buffer, scaleFactor?: number): NativeImage;
		/**
		 * Creates a new `nativeImage` instance from `dataURL`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/native-image.md#nativeimagecreatefromdataurldataurl}
		 * @param dataURL
		 */
		static createFromDataURL(dataURL: string): NativeImage;
	}

	/**
	 * The `power-monitor` module is used to monitor power state changes.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/power-monitor.md}
	 */
	interface PowerMonitorModule extends NodeJS.EventEmitter {
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the system is suspending.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/power-monitor.md#event-suspend}
		 */
		on(event: 'suspend', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when system is resuming.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/power-monitor.md#event-resume}
		 */
		on(event: 'resume', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the system changes to AC power.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/power-monitor.md#event-onac}
		 */
		on(event: 'on-ac', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when system changes to battery power.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/power-monitor.md#event-onbattery}
		 */
		on(event: 'on-battery', listener: Function): NodeJS.EventEmitter;
	}

	/**
	 * The `powerSaveBlocker` module is used to block the system from entering low-power (sleep) mode and thus allowing the app to keep the system and screen active.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/power-save-blocker.md}
	 */
	interface PowerSaveBlockerModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/**
		 * Starts preventing the system from entering lower-power mode.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/power-save-blocker.md#powersaveblockerstarttype}
		 * @param type - Power save blocker type.
		 */
		start(type: string): number;
		/**
		 * Stops the specified power save blocker.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/power-save-blocker.md#powersaveblockerstopid}
		 * @param id - The power save blocker id returned by `powerSaveBlocker.start`.
		 */
		stop(id: number): void;
		/**
		 * Returns a boolean whether the corresponding `powerSaveBlocker` has started.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/power-save-blocker.md#powersaveblockerisstartedid}
		 * @param id - The power save blocker id returned by `powerSaveBlocker.start`.
		 */
		isStarted(id: number): boolean;
	}

	/**
	 * The `protocol` module can register a custom protocol or intercept an existing protocol.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/protocol.md}
	 */
	interface ProtocolModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/**
		 * A standard `scheme` adheres to what RFC 3986 calls [generic URI syntax](https://tools.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/protocol.md#protocolregisterstandardschemesschemes}
		 * @param schemes - Custom schemes to be registered as standard schemes.
		 */
		registerStandardSchemes(schemes: string[]): void;
		/**
		 * Registers a protocol of `scheme` that will send the file as a response.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/protocol.md#protocolregisterfileprotocolscheme-handler-completion}
		 * @param scheme
		 * @param handler
		 * @param completion
		 */
		registerFileProtocol(scheme: string, handler: Function, completion?: Function): void;
		/**
		 * Registers a protocol of `scheme` that will send a `Buffer` as a response.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/protocol.md#protocolregisterbufferprotocolscheme-handler-completion}
		 * @param scheme
		 * @param handler
		 * @param completion
		 */
		registerBufferProtocol(scheme: string, handler: Function, completion?: Function): void;
		/**
		 * Registers a protocol of `scheme` that will send a `String` as a response.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/protocol.md#protocolregisterstringprotocolscheme-handler-completion}
		 * @param scheme
		 * @param handler
		 * @param completion
		 */
		registerStringProtocol(scheme: string, handler: Function, completion?: Function): void;
		/**
		 * Registers a protocol of `scheme` that will send an HTTP request as a response.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/protocol.md#protocolregisterhttpprotocolscheme-handler-completion}
		 * @param scheme
		 * @param handler
		 * @param completion
		 */
		registerHttpProtocol(scheme: string, handler: Function, completion?: Function): void;
		/**
		 * Unregisters the custom protocol of `scheme`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/protocol.md#protocolunregisterprotocolscheme-completion}
		 * @param scheme
		 * @param completion
		 */
		unregisterProtocol(scheme: string, completion?: Function): void;
		/**
		 * The `callback` will be called with a boolean that indicates whether there is already a handler for `scheme`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/protocol.md#protocolisprotocolhandledscheme-callback}
		 * @param scheme
		 * @param callback
		 */
		isProtocolHandled(scheme: string, callback: Function): boolean;
		/**
		 * Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a file as a response.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/protocol.md#protocolinterceptfileprotocolscheme-handler-completion}
		 * @param scheme
		 * @param handler
		 * @param completion
		 */
		interceptFileProtocol(scheme: string, handler: Function, completion?: Function): void;
		/**
		 * Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `String` as a response.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/protocol.md#protocolinterceptstringprotocolscheme-handler-completion}
		 * @param scheme
		 * @param handler
		 * @param completion
		 */
		interceptStringProtocol(scheme: string, handler: Function, completion?: Function): void;
		/**
		 * Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `Buffer` as a response.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/protocol.md#protocolinterceptbufferprotocolscheme-handler-completion}
		 * @param scheme
		 * @param handler
		 * @param completion
		 */
		interceptBufferProtocol(scheme: string, handler: Function, completion?: Function): void;
		/**
		 * Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a new HTTP request as a response.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/protocol.md#protocolintercepthttpprotocolscheme-handler-completion}
		 * @param scheme
		 * @param handler
		 * @param completion
		 */
		interceptHttpProtocol(scheme: string, handler: Function, completion?: Function): void;
		/**
		 * Remove the interceptor installed for `scheme` and restore its original handler.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/protocol.md#protocoluninterceptprotocolscheme-completion}
		 * @param scheme
		 * @param completion
		 */
		uninterceptProtocol(scheme: string, completion?: Function): void;
	}

	/**
	 * The `remote` module provides a simple way to do inter-process communication (IPC) between the renderer process (web page) and the main process.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/remote.md}
	 */
	interface RemoteModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/**
		 * Returns the object returned by `require(module)` in the main process.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/remote.md#remoterequiremodule}
		 * @param module
		 */
		require(module: string): any;
		/**
		 * Returns the [`BrowserWindow`](browser-window.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/remote.md#remotegetcurrentwindow}
		 */
		getCurrentWindow(): BrowserWindow;
		/**
		 * Returns the [`WebContents`](web-contents.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/remote.md#remotegetcurrentwebcontents}
		 */
		getCurrentWebContents(): WebContents;
		/**
		 * Returns the global variable of `name` (e.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/remote.md#remotegetglobalname}
		 * @param name
		 */
		getGlobal(name: string): any;
	}

	/**
	 * The `screen` module retrieves information about screen size, displays, cursor position, etc.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/screen.md}
	 */
	interface ScreenModule extends NodeJS.EventEmitter {
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when `newDisplay` has been added.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/screen.md#event-displayadded}
		 * @param event
		 * @param newDisplay
		 */
		on(event: 'display-added', listener: (event: Event, newDisplay: Object) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when `oldDisplay` has been removed.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/screen.md#event-displayremoved}
		 * @param event
		 * @param oldDisplay
		 */
		on(event: 'display-removed', listener: (event: Event, oldDisplay: Object) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when one or more metrics change in a `display`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/screen.md#event-displaymetricschanged}
		 * @param event
		 * @param display
		 * @param changedMetrics
		 */
		on(event: 'display-metrics-changed', listener: (event: Event, display: Object, changedMetrics: any[]) => void): NodeJS.EventEmitter;
		//
		// Methods
		//
		/**
		 * Returns the current absolute position of the mouse pointer.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/screen.md#screengetcursorscreenpoint}
		 */
		getCursorScreenPoint(): number[];
		/**
		 * Returns the primary display.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/screen.md#screengetprimarydisplay}
		 */
		getPrimaryDisplay(): any;
		/**
		 * Returns an array of displays that are currently available.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/screen.md#screengetalldisplays}
		 */
		getAllDisplays(): any[];
		/**
		 * Returns the display nearest the specified point.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/screen.md#screengetdisplaynearestpointpoint}
		 * @param point
		 */
		getDisplayNearestPoint(point: { x: number; y: number; }): any;
		/**
		 * Returns the display that most closely intersects the provided bounds.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/screen.md#screengetdisplaymatchingrect}
		 * @param rect
		 */
		getDisplayMatching(rect: { x: number; y: number; width: number; height: number; }): any;
	}

	/**
	 * The `session` module can be used to create new `Session` objects.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/session.md}
	 */
	class Session extends events.EventEmitter {
		//
		// Properties
		//
		/**
		 * Returns the default session object of the app.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/session.md#sessiondefaultsession}
		 */
		static defaultSession: Session;
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when Electron is about to download `item` in `webContents`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/session.md#event-willdownload}
		 * @param event
		 * @param item
		 * @param webContents
		 */
		on(event: 'will-download', listener: (event: Event, item: DownloadItem, webContents: WebContents) => void): NodeJS.EventEmitter;
		//
		// Methods
		//
		/**
		 * Clears the session’s HTTP cache.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/session.md#sesclearcachecallback}
		 * @param callback - Called when operation is done
		 */
		clearCache(callback: Function): void;
		/**
		 * Clears the data of web storages.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/session.md#sesclearstoragedataoptions-callback}
		 * @param options
		 * @param callback - Called when operation is done.
		 */
		clearStorageData(options: { origin: string; storages: any[]; quotas: any[]; }, callback: Function): void;
		/**
		 * If `config` is a PAC url, it is used directly otherwise `config` is parsed based on the following rules indicating which proxies to use for the session.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/session.md#sessetproxyconfig-callback}
		 * @param config
		 * @param callback - Called when operation is done.
		 */
		setProxy(config: string, callback: Function): void;
		/**
		 * Returns a new `Session` instance from `partition` string.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/session.md#sessionfrompartitionpartition}
		 * @param partition
		 */
		static fromPartition(partition: string): void;
		//
		// Grouped Definitions
		//
		cookies: {
			/**
			 * 
			 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/session.md#sescookiesgetdetails-callback}
			 * @param details
			 * @param callback
			 */
			get(details: { url: string; name: string; domain: string; path: string; secure: Boolean; session: Boolean; callback: Function; error: Error; cookies: any[]; }, callback: any): void;
			/**
			 * * `callback` Function - function(error) * `error` Error
			 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/session.md#sescookiessetdetails-callback}
			 * @param details
			 * @param callback
			 */
			set(details: { url: string; name: string; value: string; domain: string; path: string; secure: Boolean; session: Boolean; expirationDate: any; }, callback: any): void;
			/**
			 * 
			 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/session.md#sescookiesremovedetails-callback}
			 * @param details
			 * @param callback - function(error)
			 */
			remove(details: { url: string; name: string; }, callback: Function): void;
		};
	}

	/**
	 * The `shell` module provides functions related to desktop integration.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/shell.md}
	 */
	interface ShellModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/**
		 * Show the given file in a file manager.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/shell.md#shellshowiteminfolderfullpath}
		 * @param fullPath
		 */
		showItemInFolder(fullPath: string): void;
		/**
		 * Open the given file in the desktop's default manner.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/shell.md#shellopenitemfullpath}
		 * @param fullPath
		 */
		openItem(fullPath: string): void;
		/**
		 * Open the given external protocol URL in the desktop's default manner.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/shell.md#shellopenexternalurl}
		 * @param url
		 */
		openExternal(url: string): void;
		/**
		 * Move the given file to trash and returns a boolean status for the operation.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/shell.md#shellmoveitemtotrashfullpath}
		 * @param fullPath
		 */
		moveItemToTrash(fullPath: string): void;
		/**
		 * Play the beep sound.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/shell.md#shellbeep}
		 */
		beep(): void;
	}

	/**
	 * A `Tray` represents an icon in an operating system's notification area, it is usually attached with a context menu.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md}
	 */
	class Tray extends events.EventEmitter {
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the tray icon is clicked.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#event-click}
		 * @param event
		 * @param bounds - the bounds of tray icon.
		 */
		on(event: 'click', listener: (event: Event, bounds: { x: number; y: number; width: number; height: number; }) => void): NodeJS.EventEmitter;
		/**
		 * (Windows) Emitted when the tray icon is right clicked.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#event-rightclick-os-x-windows}
		 * @param event
		 * @param bounds - the bounds of tray icon.
		 */
		on(event: 'right-click', listener: (event: Event, bounds: { x: number; y: number; width: number; height: number; }) => void): NodeJS.EventEmitter;
		/**
		 * (Windows) Emitted when the tray icon is double clicked.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#event-doubleclick-os-x-windows}
		 * @param event
		 * @param bounds - the bounds of tray icon
		 */
		on(event: 'double-click', listener: (event: Event, bounds: { x: number; y: number; width: number; height: number; }) => void): NodeJS.EventEmitter;
		/**
		 * (Windows) Emitted when the tray balloon shows.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#event-balloonshow-windows}
		 */
		on(event: 'balloon-show', listener: Function): NodeJS.EventEmitter;
		/**
		 * (Windows) Emitted when the tray balloon is clicked.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#event-balloonclick-windows}
		 */
		on(event: 'balloon-click', listener: Function): NodeJS.EventEmitter;
		/**
		 * (Windows) Emitted when the tray balloon is closed because of timeout or user manually closes it.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#event-balloonclosed-windows}
		 */
		on(event: 'balloon-closed', listener: Function): NodeJS.EventEmitter;
		/**
		 * (OS X) Emitted when any dragged items are dropped on the tray icon.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#event-drop-os-x}
		 */
		on(event: 'drop', listener: Function): NodeJS.EventEmitter;
		/**
		 * (OS X) Emitted when dragged files are dropped in the tray icon.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#event-dropfiles-os-x}
		 * @param event
		 * @param files - the file path of dropped files.
		 */
		on(event: 'drop-files', listener: (event: any, files: any[]) => void): NodeJS.EventEmitter;
		/**
		 * (OS X) Emitted when a drag operation enters the tray icon.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#event-dragenter-os-x}
		 */
		on(event: 'drag-enter', listener: Function): NodeJS.EventEmitter;
		/**
		 * (OS X) Emitted when a drag operation exits the tray icon.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#event-dragleave-os-x}
		 */
		on(event: 'drag-leave', listener: Function): NodeJS.EventEmitter;
		/**
		 * (OS X) Emitted when a drag operation ends on the tray or ends at another location.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#event-dragend-os-x}
		 */
		on(event: 'drag-end', listener: Function): NodeJS.EventEmitter;
		//
		// Methods
		//
		/**
		 * Destroys the tray icon immediately.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#traydestroy}
		 */
		destroy(): void;
		/**
		 * Sets the `image` associated with this tray icon.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#traysetimageimage}
		 * @param image
		 */
		setImage(image: NativeImage): void;
		/**
		 * (OS X) Sets the `image` associated with this tray icon when pressed on OS X.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#traysetpressedimageimage-os-x}
		 * @param image
		 */
		setPressedImage(image: NativeImage): void;
		/**
		 * Sets the hover text for this tray icon.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#traysettooltiptooltip}
		 * @param toolTip
		 */
		setToolTip(toolTip: string): void;
		/**
		 * (OS X) Sets the title displayed aside of the tray icon in the status bar.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#traysettitletitle-os-x}
		 * @param title
		 */
		setTitle(title: string): void;
		/**
		 * (OS X) Sets whether the tray icon's background becomes highlighted (in blue) when the tray icon is clicked.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#traysethighlightmodehighlight-os-x}
		 * @param highlight
		 */
		setHighlightMode(highlight: Boolean): void;
		/**
		 * (Windows) Displays a tray balloon.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#traydisplayballoonoptions-windows}
		 * @param options
		 */
		displayBalloon(options: { icon: NativeImage; title: string; content: string; }): void;
		/**
		 * (Windows) Popups the context menu of tray icon.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#traypopupcontextmenumenu-position-os-x-windows}
		 * @param menu
		 * @param position - The pop up position.
		 */
		popUpContextMenu(menu?: Menu, position?: { x: number; y: number; }): void;
		/**
		 * Sets the context menu for this icon.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md#traysetcontextmenumenu}
		 * @param menu
		 */
		setContextMenu(menu: Menu): void;
	}

	/**
	 * `webContents` is an [EventEmitter](http://nodejs.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md}
	 */
	class WebContents extends events.EventEmitter {
		//
		// Properties
		//
		/**
		 * Returns the [session](session.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentssession}
		 */
		session: Session;
		/**
		 * Get the `WebContents` of DevTools for this `WebContents`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsdevtoolswebcontents}
		 */
		devToolsWebContents: WebContents;
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when the navigation is done, i.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-didfinishload}
		 */
		on(event: 'did-finish-load', listener: Function): NodeJS.EventEmitter;
		/**
		 * This event is like `did-finish-load` but emitted when the load failed or was cancelled, e.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-didfailload}
		 * @param event
		 * @param errorCode
		 * @param errorDescription
		 * @param validatedURL
		 */
		on(event: 'did-fail-load', listener: (event: Event, errorCode: number, errorDescription: string, validatedURL: string) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when a frame has done navigation.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-didframefinishload}
		 * @param event
		 * @param isMainFrame
		 */
		on(event: 'did-frame-finish-load', listener: (event: Event, isMainFrame: Boolean) => void): NodeJS.EventEmitter;
		/**
		 * Corresponds to the points in time when the spinner of the tab started spinning.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-didstartloading}
		 */
		on(event: 'did-start-loading', listener: Function): NodeJS.EventEmitter;
		/**
		 * Corresponds to the points in time when the spinner of the tab stopped spinning.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-didstoploading}
		 */
		on(event: 'did-stop-loading', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when details regarding a requested resource are available.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-didgetresponsedetails}
		 * @param event
		 * @param status
		 * @param newURL
		 * @param originalURL
		 * @param httpResponseCode
		 * @param requestMethod
		 * @param referrer
		 * @param headers
		 */
		on(event: 'did-get-response-details', listener: (event: Event, status: Boolean, newURL: string, originalURL: string, httpResponseCode: number, requestMethod: string, referrer: string, headers: Object) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when a redirect is received while requesting a resource.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-didgetredirectrequest}
		 * @param event
		 * @param oldURL
		 * @param newURL
		 * @param isMainFrame
		 * @param httpResponseCode
		 * @param requestMethod
		 * @param referrer
		 * @param headers
		 */
		on(event: 'did-get-redirect-request', listener: (event: Event, oldURL: string, newURL: string, isMainFrame: Boolean, httpResponseCode: number, requestMethod: string, referrer: string, headers: Object) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when the document in the given frame is loaded.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-domready}
		 * @param event
		 */
		on(event: 'dom-ready', listener: (event: Event) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when page receives favicon urls.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-pagefaviconupdated}
		 * @param event
		 * @param favicons - Array of URLs
		 */
		on(event: 'page-favicon-updated', listener: (event: Event, favicons: any[]) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when the page requests to open a new window for a `url`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-newwindow}
		 * @param event
		 * @param url
		 * @param frameName
		 * @param disposition - Can be `default`, `foreground-tab`, `background-tab`, new-window` and `other`.
		 * @param options - The options which will be used for creating the new BrowserWindow`.
		 */
		on(event: 'new-window', listener: (event: Event, url: string, frameName: string, disposition: string, options: Object) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when a user or the page wants to start navigation.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-willnavigate}
		 * @param event
		 * @param url
		 */
		on(event: 'will-navigate', listener: (event: Event, url: string) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when the renderer process has crashed.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-crashed}
		 */
		on(event: 'crashed', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when a plugin process has crashed.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-plugincrashed}
		 * @param event
		 * @param name
		 * @param version
		 */
		on(event: 'plugin-crashed', listener: (event: Event, name: string, version: string) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when `webContents` is destroyed.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-destroyed}
		 */
		on(event: 'destroyed', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when DevTools is opened.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-devtoolsopened}
		 */
		on(event: 'devtools-opened', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when DevTools is closed.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-devtoolsclosed}
		 */
		on(event: 'devtools-closed', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when DevTools is focused / opened.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-devtoolsfocused}
		 */
		on(event: 'devtools-focused', listener: Function): NodeJS.EventEmitter;
		/**
		 * Emitted when failed to verify the `certificate` for `url`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-certificateerror}
		 * @param event
		 * @param url
		 * @param error - The error code
		 * @param certificate
		 * @param callback
		 */
		on(event: 'certificate-error', listener: (event: Event, url: URL, error: string, certificate: { data: Buffer; issuerName: string; }, callback: Function) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when a client certificate is requested.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-selectclientcertificate}
		 * @param event
		 * @param url
		 * @param certificateList
		 * @param callback
		 */
		on(event: 'select-client-certificate', listener: (event: Event, url: URL, certificateList: { data: Buffer; issuerName: string; }[], callback: Function) => void): NodeJS.EventEmitter;
		/**
		 * Emitted when `webContents` wants to do basic auth.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#event-login}
		 * @param event
		 * @param request
		 * @param authInfo
		 * @param callback
		 */
		on(event: 'login', listener: (event: Event, request: { method: string; url: URL; referrer: URL; }, authInfo: { isProxy: Boolean; scheme: string; host: string; port: number; realm: string; }, callback: Function) => void): NodeJS.EventEmitter;
		//
		// Methods
		//
		/**
		 * Loads the `url` in the window, the `url` must contain the protocol prefix, e.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsloadurlurl-options}
		 * @param url
		 * @param options
		 */
		loadURL(url: URL, options?: { httpReferrer: string; userAgent: string; extraHeaders: string; }): void;
		/**
		 * Initiates a download of the resource at `url` without navigating.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsdownloadurlurl}
		 * @param url
		 */
		downloadURL(url: URL): void;
		/**
		 * Returns URL of the current web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsgeturl}
		 */
		getURL(): string;
		/**
		 * Returns the title of the current web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsgettitle}
		 */
		getTitle(): string;
		/**
		 * Returns whether web page is still loading resources.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsisloading}
		 */
		isLoading(): boolean;
		/**
		 * Returns whether the web page is waiting for a first-response from the main resource of the page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsiswaitingforresponse}
		 */
		isWaitingForResponse(): boolean;
		/**
		 * Stops any pending navigation.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsstop}
		 */
		stop(): void;
		/**
		 * Reloads the current web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsreload}
		 */
		reload(): void;
		/**
		 * Reloads current page and ignores cache.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsreloadignoringcache}
		 */
		reloadIgnoringCache(): void;
		/**
		 * Returns whether the browser can go back to previous web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentscangoback}
		 */
		canGoBack(): boolean;
		/**
		 * Returns whether the browser can go forward to next web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentscangoforward}
		 */
		canGoForward(): boolean;
		/**
		 * Returns whether the web page can go to `offset`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentscangotooffsetoffset}
		 * @param offset
		 */
		canGoToOffset(offset: number): boolean;
		/**
		 * Clears the navigation history.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsclearhistory}
		 */
		clearHistory(): void;
		/**
		 * Makes the browser go back a web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsgoback}
		 */
		goBack(): void;
		/**
		 * Makes the browser go forward a web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsgoforward}
		 */
		goForward(): void;
		/**
		 * Navigates browser to the specified absolute web page index.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsgotoindexindex}
		 * @param index
		 */
		goToIndex(index: number): void;
		/**
		 * Navigates to the specified offset from the "current entry".
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsgotooffsetoffset}
		 * @param offset
		 */
		goToOffset(offset: number): void;
		/**
		 * Whether the renderer process has crashed.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsiscrashed}
		 */
		isCrashed(): boolean;
		/**
		 * Overrides the user agent for this web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentssetuseragentuseragent}
		 * @param userAgent
		 */
		setUserAgent(userAgent: string): void;
		/**
		 * Returns a `String` representing the user agent for this web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsgetuseragent}
		 */
		getUserAgent(): string;
		/**
		 * Injects CSS into the current web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsinsertcsscss}
		 * @param css
		 */
		insertCSS(css: string): void;
		/**
		 * Evaluates `code` in page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsexecutejavascriptcode-usergesture}
		 * @param code
		 * @param userGesture
		 */
		executeJavaScript(code: string, userGesture?: Boolean): void;
		/**
		 * Mute the audio on the current web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentssetaudiomutedmuted}
		 * @param muted
		 */
		setAudioMuted(muted: Boolean): void;
		/**
		 * Returns whether this page has been muted.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsisaudiomuted}
		 */
		isAudioMuted(): boolean;
		/**
		 * Executes the editing command `undo` in web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsundo}
		 */
		undo(): void;
		/**
		 * Executes the editing command `redo` in web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsredo}
		 */
		redo(): void;
		/**
		 * Executes the editing command `cut` in web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentscut}
		 */
		cut(): void;
		/**
		 * Executes the editing command `copy` in web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentscopy}
		 */
		copy(): void;
		/**
		 * Executes the editing command `paste` in web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentspaste}
		 */
		paste(): void;
		/**
		 * Executes the editing command `pasteAndMatchStyle` in web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentspasteandmatchstyle}
		 */
		pasteAndMatchStyle(): void;
		/**
		 * Executes the editing command `delete` in web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsdelete}
		 */
		delete(): void;
		/**
		 * Executes the editing command `selectAll` in web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsselectall}
		 */
		selectAll(): void;
		/**
		 * Executes the editing command `unselect` in web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsunselect}
		 */
		unselect(): void;
		/**
		 * Executes the editing command `replace` in web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsreplacetext}
		 * @param text
		 */
		replace(text: string): void;
		/**
		 * Executes the editing command `replaceMisspelling` in web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsreplacemisspellingtext}
		 * @param text
		 */
		replaceMisspelling(text: string): void;
		/**
		 * Checks if any ServiceWorker is registered and returns a boolean as response to `callback`.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentshasserviceworkercallback}
		 * @param callback
		 */
		hasServiceWorker(callback: Function): boolean;
		/**
		 * Unregisters any ServiceWorker if present and returns a boolean as response to `callback` when the JS promise is fulfilled or false when the JS promise is rejected.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsunregisterserviceworkercallback}
		 * @param callback
		 */
		unregisterServiceWorker(callback: Function): void;
		/**
		 * Prints window's web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsprintoptions}
		 * @param options
		 */
		print(options?: { silent: Boolean; printBackground: Boolean; }): void;
		/**
		 * `callback` Function - `function(error, data) {}`
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsprinttopdfoptions-callback}
		 * @param options
		 * @param callback
		 */
		printToPDF(options: { marginsType: number; pageSize: string; printBackground: Boolean; printSelectionOnly: Boolean; landscape: Boolean; }, callback: any): void;
		/**
		 * Adds the specified path to DevTools workspace.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsaddworkspacepath}
		 * @param path
		 */
		addWorkSpace(path: string): void;
		/**
		 * Removes the specified path from DevTools workspace.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsremoveworkspacepath}
		 * @param path
		 */
		removeWorkSpace(path: string): void;
		/**
		 * Opens the developer tools.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsopendevtoolsoptions}
		 * @param options
		 */
		openDevTools(options?: any): void;
		/**
		 * Closes the developer tools.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsclosedevtools}
		 */
		closeDevTools(): void;
		/**
		 * Returns whether the developer tools are opened.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsisdevtoolsopened}
		 */
		isDevToolsOpened(): boolean;
		/**
		 * Toggles the developer tools.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentstoggledevtools}
		 */
		toggleDevTools(): void;
		/**
		 * Returns whether the developer tools is focused.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsisdevtoolsfocused}
		 */
		isDevToolsFocused(): boolean;
		/**
		 * Starts inspecting element at position (`x`, `y`).
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsinspectelementx-y}
		 * @param x
		 * @param y
		 */
		inspectElement(x: number, y: number): void;
		/**
		 * Opens the developer tools for the service worker context.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsinspectserviceworker}
		 */
		inspectServiceWorker(): void;
		/**
		 * Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentssendchannel-arg1-arg2}
		 * @param channel
		 * @param arg
		 */
		send(channel: string, ...arg: any[]): void;
		/**
		 * Enable device emulation with the given parameters.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsenabledeviceemulationparameters}
		 * @param parameters
		 */
		enableDeviceEmulation(parameters: { screenPosition: string; screenSize: { width: number; height: number; }; viewPosition: { x: number; y: number; }; deviceScaleFactor: number; viewSize: { width: number; height: number; }; fitToView: Boolean; offset: { x: number; y: number; }; scale: number; }): void;
		/**
		 * Disable device emulation enabled by `webContents.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsdisabledeviceemulation}
		 */
		disableDeviceEmulation(): void;
		/**
		 * Sends an input `event` to the page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentssendinputeventevent}
		 * @param event
		 */
		sendInputEvent(event: { type: string; modifiers: any[]; }): void;
		/**
		 * Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(frameBuffer)` when there is a presentation event.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsbeginframesubscriptioncallback}
		 * @param callback
		 */
		beginFrameSubscription(callback: Function): void;
		/**
		 * End subscribing for frame presentation events.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentsendframesubscription}
		 */
		endFrameSubscription(): void;
		/**
		 * Returns true if the process of saving page has been initiated successfully.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md#webcontentssavepagefullpath-savetype-callback}
		 * @param fullPath - The full file path.
		 * @param saveType - Specify the save type.
		 * @param callback - `function(error) {}`.
		 */
		savePage(fullPath: string, saveType: string, callback: Function): void;
	}

	/**
	 * The `web-frame` module allows you to customize the rendering of the current web page.
	 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-frame.md}
	 */
	interface WebFrameModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/**
		 * Changes the zoom factor to the specified factor.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-frame.md#webframesetzoomfactorfactor}
		 * @param factor - Zoom factor.
		 */
		setZoomFactor(factor: Number): void;
		/**
		 * Returns the current zoom factor.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-frame.md#webframegetzoomfactor}
		 */
		getZoomFactor(): number;
		/**
		 * Changes the zoom level to the specified level.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-frame.md#webframesetzoomlevellevel}
		 * @param level - Zoom level
		 */
		setZoomLevel(level: Number): void;
		/**
		 * Returns the current zoom level.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-frame.md#webframegetzoomlevel}
		 */
		getZoomLevel(): number;
		/**
		 * Sets the maximum and minimum zoom level.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-frame.md#webframesetzoomlevellimitsminimumlevel-maximumlevel}
		 * @param minimumLevel
		 * @param maximumLevel
		 */
		setZoomLevelLimits(minimumLevel: Number, maximumLevel: Number): void;
		/**
		 * Sets a provider for spell checking in input fields and text areas.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-frame.md#webframesetspellcheckproviderlanguage-autocorrectword-provider}
		 * @param language
		 * @param autoCorrectWord
		 * @param provider
		 */
		setSpellCheckProvider(language: string, autoCorrectWord: Boolean, provider: Object): void;
		/**
		 * Registers the `scheme` as secure scheme.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-frame.md#webframeregisterurlschemeassecurescheme}
		 * @param scheme
		 */
		registerURLSchemeAsSecure(scheme: string): void;
		/**
		 * Resources will be loaded from this `scheme` regardless of the current page's Content Security Policy.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-frame.md#webframeregisterurlschemeasbypassingcspscheme}
		 * @param scheme
		 */
		registerURLSchemeAsBypassingCSP(scheme: string): void;
		/**
		 * Registers the `scheme` as secure, bypasses content security policy for resources and allows registering ServiceWorker.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-frame.md#webframeregisterurlschemeasprivilegedscheme}
		 * @param scheme
		 */
		registerURLSchemeAsPrivileged(scheme: string): void;
	}

	interface Electron {
		/**
		 * The `app` module is responsible for controlling the application's lifecycle.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md}
		 */
		app: AppModule;
		/**
		 * This module provides an interface for the `Squirrel` auto-updater framework.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/auto-updater.md}
		 */
		autoUpdater: AutoUpdaterModule;
		/** The `BrowserWindow` class gives you the ability to create a browser window. */
		BrowserWindow: typeof BrowserWindow;
		/**
		 * The `clipboard` module provides methods to perform copy and paste operations.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/clipboard.md}
		 */
		clipboard: ClipboardModule;
		/**
		 * The `content-tracing` module is used to collect tracing data generated by the underlying Chromium content module.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/content-tracing.md}
		 */
		contentTracing: ContentTracingModule;
		/**
		 * The `crash-reporter` module enables sending your app's crash reports.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/crash-reporter.md}
		 */
		crashReporter: CrashReporterModule;
		/**
		 * The `dialog` module provides APIs to show native system dialogs, such as opening files or alerting, so web applications can deliver the same user experience as native applications.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/dialog.md}
		 */
		dialog: DialogModule;
		/** `DownloadItem` is an EventEmitter represents a download item in Electron. */
		DownloadItem: typeof DownloadItem;
		/**
		 * The `global-shortcut` module can register/unregister a global keyboard shortcut with the operating system so that you can customize the operations for various shortcuts.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/global-shortcut.md}
		 */
		globalShortcut: GlobalShortcutModule;
		/**
		 * The `ipcMain` module, when used in the main process, handles asynchronous and synchronous messages sent from a renderer process (web page).
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/ipc-main.md}
		 */
		ipcMain: IpcMainModule;
		/**
		 * The `ipcRenderer` module provides a few methods so you can send synchronous and asynchronous messages from the render process (web page) to the main process.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/ipc-renderer.md}
		 */
		ipcRenderer: IpcRendererModule;
		/** The `menu-item` module allows you to add items to an application or context [`menu`](menu. */
		MenuItem: typeof MenuItem;
		/** The `menu` class is used to create native menus that can be used as application menus and [context menus](https://developer. */
		Menu: typeof Menu;
		/** In Electron, for the APIs that take images, you can pass either file paths or `nativeImage` instances. */
		NativeImage: typeof NativeImage;
		/**
		 * The `power-monitor` module is used to monitor power state changes.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/power-monitor.md}
		 */
		powerMonitor: PowerMonitorModule;
		/**
		 * The `powerSaveBlocker` module is used to block the system from entering low-power (sleep) mode and thus allowing the app to keep the system and screen active.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/power-save-blocker.md}
		 */
		powerSaveBlocker: PowerSaveBlockerModule;
		/**
		 * The `protocol` module can register a custom protocol or intercept an existing protocol.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/protocol.md}
		 */
		protocol: ProtocolModule;
		/**
		 * The `remote` module provides a simple way to do inter-process communication (IPC) between the renderer process (web page) and the main process.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/remote.md}
		 */
		remote: RemoteModule;
		/**
		 * The `screen` module retrieves information about screen size, displays, cursor position, etc.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/screen.md}
		 */
		screen: ScreenModule;
		/** The `session` module can be used to create new `Session` objects. */
		Session: typeof Session;
		/**
		 * The `shell` module provides functions related to desktop integration.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/shell.md}
		 */
		shell: ShellModule;
		/** A `Tray` represents an icon in an operating system's notification area, it is usually attached with a context menu. */
		Tray: typeof Tray;
		/** `webContents` is an [EventEmitter](http://nodejs. */
		WebContents: typeof WebContents;
		/**
		 * The `web-frame` module allows you to customize the rendering of the current web page.
		 * @see {@link https://github.com/atom/electron/blob/v0.35.4/docs/api/web-frame.md}
		 */
		webFrame: WebFrameModule;
		// Data types defined in https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md
		Task: typeof Task;
		// Data types defined in https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md
		Button: typeof Button;
	}
	var electron: Electron;
	export = electron;
}
