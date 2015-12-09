// Type definitions for Electron 0.35.4 (for both main and renderer process)
// Project: http://electron.atom.io/

/// <reference path="../node/node.d.ts" />

declare module 'electron' {

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md

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

	/** The `app` module is responsible for controlling the application's lifecycle. */
	interface AppModule extends NodeJS.EventEmitter {
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/** Emitted when the application has finished basic startup. */
		on(event: 'will-finish-launching', listener: Function): NodeJS.EventEmitter;
		/** Emitted when Electron has finished initialization. */
		on(event: 'ready', listener: Function): NodeJS.EventEmitter;
		/** Emitted when all windows have been closed. */
		on(event: 'window-all-closed', listener: Function): NodeJS.EventEmitter;
		/** Emitted before the application starts closing its windows. */
		on(event: 'before-quit', listener: (event: Event) => void): NodeJS.EventEmitter;
		/** Emitted when all windows have been closed and the application will quit. */
		on(event: 'will-quit', listener: (event: Event) => void): NodeJS.EventEmitter;
		/** Emitted when the application is quitting. */
		on(event: 'quit', listener: Function): NodeJS.EventEmitter;
		/** (OS X) Emitted when the user wants to open a file with the application. */
		on(event: 'open-file', listener: (event: Event, path: string) => void): NodeJS.EventEmitter;
		/** (OS X) Emitted when the user wants to open a URL with the application. */
		on(event: 'open-url', listener: (event: Event, url: string) => void): NodeJS.EventEmitter;
		/** (OS X) Emitted when the application is activated, which usually happens when clicks on the applications's dock icon. */
		on(event: 'activate', listener: (event: Event, hasVisibleWindows: Boolean) => void): NodeJS.EventEmitter;
		/** Emitted when a [browserWindow](browser-window. */
		on(event: 'browser-window-blur', listener: (event: Event, window: BrowserWindow) => void): NodeJS.EventEmitter;
		/** Emitted when a [browserWindow](browser-window. */
		on(event: 'browser-window-focus', listener: (event: Event, window: BrowserWindow) => void): NodeJS.EventEmitter;
		/** Emitted when a new [browserWindow](browser-window. */
		on(event: 'browser-window-created', listener: (event: Event, window: BrowserWindow) => void): NodeJS.EventEmitter;
		/** Emitted when failed to verify the `certificate` for `url`, to trust the certificate you should prevent the default behavior with `event. */
		on(event: 'certificate-error', listener: (event: Event, webContents: WebContents, url: URL, error: string, certificate: { data: Buffer; issuerName: string; }, callback: (value: boolean) => void) => void): NodeJS.EventEmitter;
		/** Emitted when a client certificate is requested. */
		on(event: 'select-client-certificate', listener: (event: Event, webContents: WebContents, url: URL, certificateList: { data: Buffer; issuerName: string; }[], callback: (value: any) => void) => void): NodeJS.EventEmitter;
		/** Emitted when `webContents` wants to do basic auth. */
		on(event: 'login', listener: (event: Event, webContents: WebContents, request: { method: string; url: URL; referrer: URL; }, authInfo: { isProxy: Boolean; scheme: string; host: string; port: number; realm: string; }, callback: (username: string, secret: string) => void) => void): NodeJS.EventEmitter;
		/** Emitted when the gpu process crashes. */
		on(event: 'gpu-process-crashed', listener: Function): NodeJS.EventEmitter;
		//
		// Methods
		//
		/** Try to close all windows. */
		quit(): void;
		/** Exits immediately with `exitCode`. */
		exit(exitCode: number): void;
		/** Returns the current application directory. */
		getAppPath(): string;
		/** Retrieves a path to a special directory or file associated with `name`. */
		getPath(name: string): string;
		/** Overrides the `path` to a special directory or file associated with `name`. */
		setPath(name: string, path: string): void;
		/** Returns the version of the loaded application. */
		getVersion(): string;
		/** Returns the current application's name, which is the name in the application's `package. */
		getName(): string;
		/** Returns the current application locale. */
		getLocale(): string;
		/** (Windows) Adds `path` to the recent documents list. */
		addRecentDocument(path: string): void;
		/** (Windows) Clears the recent documents list. */
		clearRecentDocuments(): void;
		/** (Windows) Adds `tasks` to the [Tasks][tasks] category of the JumpList on Windows. */
		/** @param tasks - Array of `Task` objects */
		setUserTasks(tasks: Task[]): void;
		/** Dynamically sets whether to always send credentials for HTTP NTLM or Negotiate authentication - normally, Electron will only send NTLM/Kerberos credentials for URLs that fall under "Local Intranet" sites (i. */
		allowNTLMCredentialsForAllDomains(allow: Boolean): void;
		/** This method makes your application a Single Instance Application - instead of allowing multiple instances of your app to run, this will ensure that only a single instance of your app is running, and other instances signal this instance and exit. */
		makeSingleInstance(callback: (argv: string[], workingDirectory: string) => boolean): void;
		/** (Windows) Changes the [Application User Model ID][app-user-model-id] to `id`. */
		setAppUserModelId(id: string): void;
		//
		// Grouped Definitions
		//
		commandLine: {
			/** Append a switch (with optional `value`) to Chromium's command line. */
			appendSwitch(_switch: any, value?: any): void;
			/** Append an argument to Chromium's command line. */
			appendArgument(value: any): void;
		};
		dock: {
			/** (OS X) When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled. */
			/** @param type - Can be `critical` or `informational`. The default is informational` */
			bounce(type?: string): number;
			/** (OS X) Cancel the bounce of `id`. */
			cancelBounce(id: number): void;
			/** (OS X) Sets the string to be displayed in the dock’s badging area. */
			setBadge(text: string): void;
			/** (OS X) Returns the badge string of the dock. */
			getBadge(): string;
			/** (OS X) Hides the dock icon. */
			hide(): void;
			/** (OS X) Shows the dock icon. */
			show(): void;
			/** (OS X) Sets the application's [dock menu][dock-menu]. */
			setMenu(menu: Menu): void;
		};
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/auto-updater.md

	/** This module provides an interface for the `Squirrel` auto-updater framework. */
	interface AutoUpdaterModule extends NodeJS.EventEmitter {
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/** Emitted when there is an error while updating. */
		on(event: 'error', listener: (error: Error) => void): NodeJS.EventEmitter;
		/** Emitted when checking if an update has started. */
		on(event: 'checking-for-update', listener: Function): NodeJS.EventEmitter;
		/** Emitted when there is an available update. */
		on(event: 'update-available', listener: Function): NodeJS.EventEmitter;
		/** Emitted when there is no available update. */
		on(event: 'update-not-available', listener: Function): NodeJS.EventEmitter;
		/** Emitted when an update has been downloaded. */
		on(event: 'update-downloaded', listener: (event: Event, releaseNotes: string, releaseName: string, releaseDate: Date, updateURL: string) => void): NodeJS.EventEmitter;
		//
		// Methods
		//
		/** Sets the `url` and initialize the auto updater. */
		setFeedURL(url: string): void;
		/** Asks the server whether there is an update. */
		checkForUpdates(): void;
		/** Restarts the app and installs the update after it has been downloaded. */
		quitAndInstall(): void;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md

	class button {
		/** The icon showing in thumbnail oolbar. */
		icon: NativeImage;
		/** The text of the button's tooltip. */
		tooltip?: string;
		/** Control specific states and behaviors f the button. By default, it uses `enabled`. It can include following trings: */
		flags?: Array;
		/** Function */
		click: Function;
	}

	/** The `BrowserWindow` class gives you the ability to create a browser window. */
	class BrowserWindow extends NodeJS.EventEmitter {
		//
		// Constructors
		//
		/** Builds a new instance of the BrowserWindow class. */
		constructor(options?: { width: number; height: number; x: number; y: number; useContentSize: Boolean; center: Boolean; minWidth: number; minHeight: number; maxWidth: number; maxHeight: number; resizable: Boolean; alwaysOnTop: Boolean; fullscreen: Boolean; skipTaskbar: Boolean; kiosk: Boolean; title: string; icon: NativeImage; show: Boolean; frame: Boolean; acceptFirstMouse: Boolean; disableAutoHideCursor: Boolean; autoHideMenuBar: Boolean; enableLargerThanScreen: Boolean; backgroundColor: string; darkTheme: Boolean; transparent: Boolean; type: string; titleBarStyle: string; webPreferences: { nodeIntegration: Boolean; preload: string; partition: string; zoomFactor: Number; javascript: Boolean; webSecurity: Boolean; allowDisplayingInsecureContent: Boolean; allowRunningInsecureContent: Boolean; images: Boolean; java: Boolean; textAreasAreResizable: Boolean; webgl: Boolean; webaudio: Boolean; plugins: Boolean; experimentalFeatures: Boolean; experimentalCanvasFeatures: Boolean; overlayScrollbars: Boolean; overlayFullscreenVideo: Boolean; sharedWorker: Boolean; directWrite: Boolean; pageVisibility: Boolean; }; });
		//
		// Properties
		//
		/** The `WebContents` object this window owns, all web page related events and operations will be done via it. */
		webContents: WebContents;
		/** The unique ID of this window. */
		id: number;
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/** Emitted when the document changed its title, calling `event. */
		on(event: 'page-title-updated', listener: (event: Event) => void): NodeJS.EventEmitter;
		/** Emitted when the window is going to be closed. */
		on(event: 'close', listener: (event: Event) => void): NodeJS.EventEmitter;
		/** Emitted when the window is closed. */
		on(event: 'closed', listener: Function): NodeJS.EventEmitter;
		/** Emitted when the web page becomes unresponsive. */
		on(event: 'unresponsive', listener: Function): NodeJS.EventEmitter;
		/** Emitted when the unresponsive web page becomes responsive again. */
		on(event: 'responsive', listener: Function): NodeJS.EventEmitter;
		/** Emitted when the window loses focus. */
		on(event: 'blur', listener: Function): NodeJS.EventEmitter;
		/** Emitted when the window gains focus. */
		on(event: 'focus', listener: Function): NodeJS.EventEmitter;
		/** Emitted when window is maximized. */
		on(event: 'maximize', listener: Function): NodeJS.EventEmitter;
		/** Emitted when the window exits from maximized state. */
		on(event: 'unmaximize', listener: Function): NodeJS.EventEmitter;
		/** Emitted when the window is minimized. */
		on(event: 'minimize', listener: Function): NodeJS.EventEmitter;
		/** Emitted when the window is restored from minimized state. */
		on(event: 'restore', listener: Function): NodeJS.EventEmitter;
		/** Emitted when the window is getting resized. */
		on(event: 'resize', listener: Function): NodeJS.EventEmitter;
		/** Emitted when the window is getting moved to a new position. */
		on(event: 'move', listener: Function): NodeJS.EventEmitter;
		/** (OS X) Emitted once when the window is moved to a new position. */
		on(event: 'moved', listener: Function): NodeJS.EventEmitter;
		/** Emitted when the window enters full screen state. */
		on(event: 'enter-full-screen', listener: Function): NodeJS.EventEmitter;
		/** Emitted when the window leaves full screen state. */
		on(event: 'leave-full-screen', listener: Function): NodeJS.EventEmitter;
		/** Emitted when the window enters full screen state triggered by html api. */
		on(event: 'enter-html-full-screen', listener: Function): NodeJS.EventEmitter;
		/** Emitted when the window leaves full screen state triggered by html api. */
		on(event: 'leave-html-full-screen', listener: Function): NodeJS.EventEmitter;
		/** (Windows) Emitted when an [App Command](https://msdn. */
		on(event: 'app-command', listener: Function): NodeJS.EventEmitter;
		//
		// Methods
		//
		/** Force closing the window, the `unload` and `beforeunload` event won't be emitted for the web page, and `close` event will also not be emitted for this window, but it guarantees the `closed` event will be emitted. */
		destroy(): void;
		/** Try to close the window, this has the same effect with user manually clicking the close button of the window. */
		close(): void;
		/** Focus on the window. */
		focus(): void;
		/** Returns a boolean, whether the window is focused. */
		isFocused(): boolean;
		/** Shows and gives focus to the window. */
		show(): void;
		/** Shows the window but doesn't focus on it. */
		showInactive(): void;
		/** Hides the window. */
		hide(): void;
		/** Returns a boolean, whether the window is visible to the user. */
		isVisible(): boolean;
		/** Maximizes the window. */
		maximize(): void;
		/** Unmaximizes the window. */
		unmaximize(): void;
		/** Returns a boolean, whether the window is maximized. */
		isMaximized(): boolean;
		/** Minimizes the window. */
		minimize(): void;
		/** Restores the window from minimized state to its previous state. */
		restore(): void;
		/** Returns a boolean, whether the window is minimized. */
		isMinimized(): boolean;
		/** Sets whether the window should be in fullscreen mode. */
		setFullScreen(flag: Boolean): void;
		/** Returns a boolean, whether the window is in fullscreen mode. */
		isFullScreen(): boolean;
		/** (OS X) This will have a window maintain an aspect ratio. */
		/** @param extraSize - The extra size not to be included while aintaining the aspect ratio. Properties: */
		setAspectRatio(aspectRatio: number, extraSize?: { width: number; height: number; }): void;
		/** Resizes and moves the window to `width`, `height`, `x`, `y`. */
		setBounds(options: { x: number; y: number; width: number; height: number; }): void;
		/** Returns an object that contains window's width, height, x and y values. */
		getBounds(): { x: number; y: number; width: number; height: number; };
		/** Resizes the window to `width` and `height`. */
		setSize(width: number, height: number): void;
		/** Returns an array that contains window's width and height. */
		getSize(): number[];
		/** Resizes the window's client area (e. */
		setContentSize(width: number, height: number): void;
		/** Returns an array that contains window's client area's width and height. */
		getContentSize(): number[];
		/** Sets the minimum size of window to `width` and `height`. */
		setMinimumSize(width: number, height: number): void;
		/** Returns an array that contains window's minimum width and height. */
		getMinimumSize(): number[];
		/** Sets the maximum size of window to `width` and `height`. */
		setMaximumSize(width: number, height: number): void;
		/** Returns an array that contains window's maximum width and height. */
		getMaximumSize(): number[];
		/** Sets whether the window can be manually resized by user. */
		setResizable(resizable: Boolean): void;
		/** Returns whether the window can be manually resized by user. */
		isResizable(): boolean;
		/** Sets whether the window should show always on top of other windows. */
		setAlwaysOnTop(flag: Boolean): void;
		/** Returns whether the window is always on top of other windows. */
		isAlwaysOnTop(): boolean;
		/** Moves window to the center of the screen. */
		center(): void;
		/** Moves window to `x` and `y`. */
		setPosition(x: number, y: number): void;
		/** Returns an array that contains window's current position. */
		getPosition(): number[];
		/** Changes the title of native window to `title`. */
		setTitle(title: string): void;
		/** Returns the title of the native window. */
		getTitle(): string;
		/** Starts or stops flashing the window to attract user's attention. */
		flashFrame(flag: Boolean): void;
		/** Makes the window not show in the taskbar. */
		setSkipTaskbar(skip: Boolean): void;
		/** Enters or leaves the kiosk mode. */
		setKiosk(flag: Boolean): void;
		/** Returns whether the window is in kiosk mode. */
		isKiosk(): boolean;
		/** (Windows) Hooks a windows message. */
		hookWindowMessage(message: number, callback: Function): void;
		/** (Windows) Returns `true` or `false` depending on whether the message is hooked. */
		isWindowMessageHooked(message: number): boolean;
		/** (Windows) Unhook the window message. */
		unhookWindowMessage(message: number): void;
		/** (Windows) Unhooks all of the window messages. */
		unhookAllWindowMessages(): void;
		/** (OS X) Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar. */
		setRepresentedFilename(filename: string): void;
		/** (OS X) Returns the pathname of the file the window represents. */
		getRepresentedFilename(): string;
		/** (OS X) Specifies whether the window’s document has been edited, and the icon in title bar will become grey when set to `true`. */
		setDocumentEdited(edited: Boolean): void;
		/** (OS X) Whether the window's document has been edited. */
		isDocumentEdited(): boolean;
		/** undefined */
		focusOnWebView(): void;
		/** undefined */
		blurWebView(): void;
		/** Captures a snapshot of the page within `rect`. */
		/** @param rect - The area of page to be captured, properties: */
		capturePage(rect?: { x: number; y: number; width: number; height: number; }, callback?: Function): void;
		/** Same as `webContents. */
		print(options?: any): void;
		/** Same as `webContents. */
		printToPDF(options: any, callback: any): void;
		/** Same as `webContents. */
		loadURL(url: any, options?: any): void;
		/** Same as `webContents. */
		reload(): void;
		/** (Windows) Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar. */
		setMenu(menu: Menu): void;
		/** Sets progress value in progress bar. */
		setProgressBar(progress: Double): void;
		/** (Windows 7+) Sets a 16px overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user. */
		/** @param overlay - the icon to display on the bottom ight corner of the taskbar icon. If this parameter is `null`, the overlay is leared */
		/** @param description - a description that will be provided to Accessibility creen readers */
		setOverlayIcon(overlay: NativeImage, description: string): void;
		/** (Windows 7+) `button` Object, properties: */
		setThumbarButtons(buttons: button[]): boolean;
		/** (OS X) Shows pop-up dictionary that searches the selected word on the page. */
		showDefinitionForSelection(): void;
		/** Sets whether the window menu bar should hide itself automatically. */
		setAutoHideMenuBar(hide: Boolean): void;
		/** Returns whether menu bar automatically hides itself. */
		isMenuBarAutoHide(): boolean;
		/** Sets whether the menu bar should be visible. */
		setMenuBarVisibility(visible: Boolean): void;
		/** Returns whether the menu bar is visible. */
		isMenuBarVisible(): boolean;
		/** Sets whether the window should be visible on all workspaces. */
		setVisibleOnAllWorkspaces(visible: Boolean): void;
		/** Returns whether the window is visible on all workspaces. */
		isVisibleOnAllWorkspaces(): boolean;
		/** Returns an array of all opened browser windows. */
		static getAllWindows(): BrowserWindow[];
		/** Returns the window that is focused in this application. */
		static getFocusedWindow(): BrowserWindow;
		/** Find a window according to the `webContents` it owns. */
		static fromWebContents(webContents: WebContents): BrowserWindow;
		/** Find a window according to its ID. */
		static fromId(id: number): BrowserWindow;
		/** Adds DevTools extension located at `path`, and returns extension's name. */
		static addDevToolsExtension(path: string): void;
		/** Remove the DevTools extension whose name is `name`. */
		static removeDevToolsExtension(name: string): void;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/clipboard.md

	/** The `clipboard` module provides methods to perform copy and paste operations. */
	interface ClipboardModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/** Returns the content in the clipboard as plain text. */
		readText(type?: string): string;
		/** Writes the `text` into the clipboard as plain text. */
		writeText(text: string, type?: string): void;
		/** Returns the content in the clipboard as markup. */
		readHtml(type?: string): string;
		/** Writes `markup` to the clipboard. */
		writeHtml(markup: string, type?: string): void;
		/** Returns the content in the clipboard as a [NativeImage](native-image. */
		readImage(type?: string): NativeImage;
		/** Writes `image` to the clipboard. */
		writeImage(image: NativeImage, type?: string): void;
		/** Clears the clipboard content. */
		clear(type?: string): void;
		/** Returns an array of supported formats for the clipboard `type`. */
		availableFormats(type?: string): string[];
		/** (Experimental) Returns whether the clipboard supports the format of specified `data`. */
		has(data: string, type?: string): boolean;
		/** (Experimental) Reads `data` from the clipboard. */
		read(data: string, type?: string): any;
		/** ```javascript clipboard. */
		write(data: { text: string; html: string; image: NativeImage; }, type?: string): void;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/content-tracing.md

	/** The `content-tracing` module is used to collect tracing data generated by the underlying Chromium content module. */
	interface ContentTracingModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/** Get a set of category groups. */
		getCategories(callback: Function): any;
		/** Start recording on all processes. */
		startRecording(options: { categoryFilter: string; traceOptions: string; }, callback: Function): void;
		/** Stop recording on all processes. */
		stopRecording(resultFilePath: string, callback: Function): void;
		/** Start monitoring on all processes. */
		startMonitoring(options: { categoryFilter: string; traceOptions: string; }, callback: Function): void;
		/** Stop monitoring on all processes. */
		stopMonitoring(callback: Function): void;
		/** Get the current monitoring traced data. */
		captureMonitoringSnapshot(resultFilePath: string, callback: Function): void;
		/** Get the maximum usage across processes of trace buffer as a percentage of the full state. */
		getTraceBufferUsage(callback: Function): number;
		/** `callback` will will be called every time the given event occurs on any process. */
		setWatchEvent(categoryName: string, eventName: string, callback: Function): void;
		/** Cancel the watch event. */
		cancelWatchEvent(): void;
	}

	interface Electron {
		/** The `app` module is responsible for controlling the application's lifecycle. */
		app: AppModule;
		/** This module provides an interface for the `Squirrel` auto-updater framework. */
		autoUpdater: AutoUpdaterModule;
		/** The `BrowserWindow` class gives you the ability to create a browser window. */
		BrowserWindow: typeof BrowserWindow;
		/** The `clipboard` module provides methods to perform copy and paste operations. */
		clipboard: ClipboardModule;
		/** The `content-tracing` module is used to collect tracing data generated by the underlying Chromium content module. */
		contentTracing: ContentTracingModule;
		// Data types defined in https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md
		Task: typeof Task;
		// Data types defined in https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md
		button: typeof button;
	}
	var electron: Electron;
	export = electron;
}
