// Type definitions for Electron 0.35.4 (for both main and renderer process)
// Project: http://electron.atom.io/

/// <reference path="../node/node.d.ts" />

declare module 'electron' {

	class Accelerator extends string { };

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
		on(event: 'select-client-certificate', listener: (event: Event, webContents: WebContents, url: URL, certificateList: Objects, callback: (value: any) => void) => void): NodeJS.EventEmitter;
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
			appendSwitch(switch: any, value?: any): void;
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
		capturePage(rect: { x: number; y: number; width: number; height: number; }, callback: Function): void;
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

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/crash-reporter.md

	/** The `crash-reporter` module enables sending your app's crash reports. */
	interface CrashReporterModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/** You are required to call this method before using other `crashReporter` APIs. */
		start(options: { productName: string; companyName: string; submitURL: string; autoSubmit: Boolean; ignoreSystemCrashHandler: Boolean; extra: Object; }): void;
		/** Returns the date and ID of the last crash report. */
		getLastCrashReport(): any;
		/** Returns all uploaded crash reports. */
		getUploadedReports(): any[];
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/dialog.md

	/** The `dialog` module provides APIs to show native system dialogs, such as opening files or alerting, so web applications can deliver the same user experience as native applications. */
	interface DialogModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/** On success this method returns an array of file paths chosen by the user, otherwise it returns `undefined`. */
		showOpenDialog(browserWindow?: BrowserWindow, options?: { title: string; defaultPath: string; filters: Array; properties: Array; }, callback?: (filenames: string[]) => void): string[];
		/** On success this method returns the path of the file chosen by the user, otherwise it returns `undefined`. */
		showSaveDialog(browserWindow?: BrowserWindow, options?: { title: string; defaultPath: string; filters: Array; }, callback?: (filename: string) => void): string;
		/** Shows a message box, it will block the process until the message box is closed. */
		showMessageBox(browserWindow?: BrowserWindow, options?: { type: string; buttons: Array; title: string; message: string; detail: string; icon: NativeImage; cancelId: number; noLink: Boolean; }, callback?: (response: any) => void): any;
		/** Displays a modal dialog that shows an error message. */
		showErrorBox(title: any, content: any): void;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/download-item.md

	/** `DownloadItem` is an EventEmitter represents a download item in Electron. */
	class DownloadItem extends NodeJS.EventEmitter {
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/** Emits when the `downloadItem` gets updated. */
		on(event: 'updated', listener: Function): NodeJS.EventEmitter;
		/** Emits when the download is in a terminal state. */
		on(event: 'done', listener: (event: Event, state: string) => void): NodeJS.EventEmitter;
		//
		// Methods
		//
		/** The API is only available in session's `will-download` callback function. */
		/** @param path - Set the save file path of the download item. */
		setSavePath(path: string): void;
		/** Pauses the download. */
		pause(): void;
		/** Resumes the download that has been paused. */
		resume(): void;
		/** Cancels the download operation. */
		cancel(): void;
		/** Returns a `String` represents the origin url where the item is downloaded from. */
		getURL(): string;
		/** Returns a `String` represents the mime type. */
		getMimeType(): string;
		/** Returns a `Boolean` indicates whether the download has user gesture. */
		hasUserGesture(): Boolean;
		/** Returns a `String` represents the file name of the download item. */
		getFilename(): string;
		/** Returns a `Integer` represents the total size in bytes of the download item. */
		getTotalBytes(): number;
		/** Returns a `Integer` represents the received bytes of the download item. */
		getReceivedBytes(): number;
		/** Returns a `String` represents the Content-Disposition field from the response header. */
		getContentDisposition(): string;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/global-shortcut.md

	/** The `global-shortcut` module can register/unregister a global keyboard shortcut with the operating system so that you can customize the operations for various shortcuts. */
	interface Global-shortcutModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/** Registers a global shortcut of `accelerator`. */
		register(accelerator: Accelerator, callback: Function): void;
		/** Returns `true` or `false` depending on whether the shortcut `accelerator` is registered. */
		isRegistered(accelerator: Accelerator): boolean;
		/** Unregisters the global shortcut of `accelerator`. */
		unregister(accelerator: Accelerator): void;
		/** Unregisters all of the global shortcuts. */
		unregisterAll(): void;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/ipc-main.md

	/** The `ipcMain` module, when used in the main process, handles asynchronous and synchronous messages sent from a renderer process (web page). */
	interface IpcMainModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/** When the event occurs the `callback` is called with an `event` object and a message, `arg`. */
		/** @param channel - The event name. */
		on(channel: string, callback: (event: { returnValue: any; sender: WebContents; }) => void): void;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/ipc-renderer.md

	/** The `ipcRenderer` module provides a few methods so you can send synchronous and asynchronous messages from the render process (web page) to the main process. */
	interface IpcRendererModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/** When the event occurs the `callback` is called with an `event` object and arbitrary arguments. */
		/** @param channel - The event name. */
		on(channel: string, callback: (event: any) => void): void;
		/** Send an event to the main process asynchronously via a `channel`, you can also send arbitrary arguments. */
		/** @param channel - The event name. */
		send(channel: string, ...arg: any[]): void;
		/** Send an event to the main process synchronously via a `channel`, you can also send arbitrary arguments. */
		/** @param channel - The event name. */
		sendSync(channel: string, ...arg: any[]): void;
		/** Like `ipcRenderer. */
		/** @param channel - The event name. */
		sendToHost(channel: string, ...arg: any[]): void;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/menu-item.md

	/** The `menu-item` module allows you to add items to an application or context [`menu`](menu. */
	class MenuItem extends NodeJS.EventEmitter {
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/menu.md

	/** The `menu` class is used to create native menus that can be used as application menus and [context menus](https://developer. */
	class Menu extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/** Sets `menu` as the application menu on OS X. */
		static setApplicationMenu(menu: Menu): void;
		/** (OS X) Sends the `action` to the first responder of application. */
		static sendActionToFirstResponder(action: string): void;
		/** Generally, the `template` is just an array of `options` for constructing a [MenuItem](menu-item. */
		static buildFromTemplate(template: Array): void;
		/** Pops up this menu as a context menu in the `browserWindow`. */
		static popup(browserWindow?: BrowserWindow, x?: Number, y?: Number): void;
		/** Appends the `menuItem` to the menu. */
		static append(menuItem: MenuItem): void;
		/** Inserts the `menuItem` to the `pos` position of the menu. */
		static insert(pos: number, menuItem: MenuItem): void;
		/** Get an array containing the menu's items. */
		static items(): MenuItem[];
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/native-image.md

	/** In Electron, for the APIs that take images, you can pass either file paths or `nativeImage` instances. */
	class NativeImage extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/** Returns a [Buffer][buffer] that contains the image's `PNG` encoded data. */
		toPng(): Buffer;
		/** Returns a [Buffer][buffer] that contains the image's `JPEG` encoded data. */
		/** @param quality - 100 (**required**) */
		toJpeg(quality: number): Buffer;
		/** Returns the data URL of the image. */
		toDataURL(): string;
		/** Returns a boolean whether the image is empty. */
		isEmpty(): boolean;
		/** Returns the size of the image. */
		getSize(): number[];
		/** Marks the image as template image. */
		setTemplateImage(option: Boolean): void;
		/** Returns a boolean whether the image is a template image. */
		isTemplateImage(): boolean;
		/** Creates an empty `nativeImage` instance. */
		static createEmpty(): NativeImage;
		/** Creates a new `nativeImage` instance from a file located at `path`. */
		static createFromPath(path: string): NativeImage;
		/** Creates a new `nativeImage` instance from `buffer`. */
		static createFromBuffer(buffer: Buffer, scaleFactor?: Double): NativeImage;
		/** Creates a new `nativeImage` instance from `dataURL`. */
		static createFromDataURL(dataURL: string): NativeImage;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/power-monitor.md

	/** The `power-monitor` module is used to monitor power state changes. */
	interface PowerMonitorModule extends NodeJS.EventEmitter {
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/** Emitted when the system is suspending. */
		on(event: 'suspend', listener: Function): NodeJS.EventEmitter;
		/** Emitted when system is resuming. */
		on(event: 'resume', listener: Function): NodeJS.EventEmitter;
		/** Emitted when the system changes to AC power. */
		on(event: 'on-ac', listener: Function): NodeJS.EventEmitter;
		/** Emitted when system changes to battery power. */
		on(event: 'on-battery', listener: Function): NodeJS.EventEmitter;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/power-save-blocker.md

	/** The `powerSaveBlocker` module is used to block the system from entering low-power (sleep) mode and thus allowing the app to keep the system and screen active. */
	interface PowerSaveBlockerModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/** Starts preventing the system from entering lower-power mode. */
		/** @param type - Power save blocker type. */
		start(type: string): number;
		/** Stops the specified power save blocker. */
		/** @param id - The power save blocker id returned by `powerSaveBlocker.start`. */
		stop(id: number): void;
		/** Returns a boolean whether the corresponding `powerSaveBlocker` has started. */
		/** @param id - The power save blocker id returned by `powerSaveBlocker.start`. */
		isStarted(id: number): boolean;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/protocol.md

	/** The `protocol` module can register a custom protocol or intercept an existing protocol. */
	interface ProtocolModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/** A standard `scheme` adheres to what RFC 3986 calls [generic URI syntax](https://tools. */
		/** @param schemes - Custom schemes to be registered as standard schemes. */
		registerStandardSchemes(schemes: string[]): void;
		/** Registers a protocol of `scheme` that will send the file as a response. */
		registerFileProtocol(scheme: string, handler: Function, completion?: Function): void;
		/** Registers a protocol of `scheme` that will send a `Buffer` as a response. */
		registerBufferProtocol(scheme: string, handler: Function, completion?: Function): void;
		/** Registers a protocol of `scheme` that will send a `String` as a response. */
		registerStringProtocol(scheme: string, handler: Function, completion?: Function): void;
		/** Registers a protocol of `scheme` that will send an HTTP request as a response. */
		registerHttpProtocol(scheme: string, handler: Function, completion?: Function): void;
		/** Unregisters the custom protocol of `scheme`. */
		unregisterProtocol(scheme: string, completion?: Function): void;
		/** The `callback` will be called with a boolean that indicates whether there is already a handler for `scheme`. */
		isProtocolHandled(scheme: string, callback: Function): boolean;
		/** Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a file as a response. */
		interceptFileProtocol(scheme: string, handler: Function, completion?: Function): void;
		/** Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `String` as a response. */
		interceptStringProtocol(scheme: string, handler: Function, completion?: Function): void;
		/** Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `Buffer` as a response. */
		interceptBufferProtocol(scheme: string, handler: Function, completion?: Function): void;
		/** Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a new HTTP request as a response. */
		interceptHttpProtocol(scheme: string, handler: Function, completion?: Function): void;
		/** Remove the interceptor installed for `scheme` and restore its original handler. */
		uninterceptProtocol(scheme: string, completion?: Function): void;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/remote.md

	/** The `remote` module provides a simple way to do inter-process communication (IPC) between the renderer process (web page) and the main process. */
	interface RemoteModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/** Returns the object returned by `require(module)` in the main process. */
		require(module: string): any;
		/** Returns the [`BrowserWindow`](browser-window. */
		getCurrentWindow(): BrowserWindow;
		/** Returns the [`WebContents`](web-contents. */
		getCurrentWebContents(): WebContents;
		/** Returns the global variable of `name` (e. */
		getGlobal(name: string): any;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/screen.md

	/** The `screen` module retrieves information about screen size, displays, cursor position, etc. */
	interface ScreenModule extends NodeJS.EventEmitter {
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/** Emitted when `newDisplay` has been added. */
		on(event: 'display-added', listener: (event: Event, newDisplay: Object) => void): NodeJS.EventEmitter;
		/** Emitted when `oldDisplay` has been removed. */
		on(event: 'display-removed', listener: (event: Event, oldDisplay: Object) => void): NodeJS.EventEmitter;
		/** Emitted when one or more metrics change in a `display`. */
		on(event: 'display-metrics-changed', listener: (event: Event, display: Object, changedMetrics: Array) => void): NodeJS.EventEmitter;
		//
		// Methods
		//
		/** Returns the current absolute position of the mouse pointer. */
		getCursorScreenPoint(): number[];
		/** Returns the primary display. */
		getPrimaryDisplay(): any;
		/** Returns an array of displays that are currently available. */
		getAllDisplays(): any[];
		/** Returns the display nearest the specified point. */
		getDisplayNearestPoint(point: { x: number; y: number; }): any;
		/** Returns the display that most closely intersects the provided bounds. */
		getDisplayMatching(rect: { x: number; y: number; width: number; height: number; }): any;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/session.md

	/** The `session` module can be used to create new `Session` objects. */
	class Session extends NodeJS.EventEmitter {
		//
		// Properties
		//
		/** Returns the default session object of the app. */
		static defaultSession: Session;
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/** Emitted when Electron is about to download `item` in `webContents`. */
		on(event: 'will-download', listener: (event: Event, item: DownloadItem, webContents: WebContents) => void): NodeJS.EventEmitter;
		//
		// Methods
		//
		/** Clears the session’s HTTP cache. */
		/** @param callback - Called when operation is done */
		clearCache(callback: Function): void;
		/** Clears the data of web storages. */
		/** @param callback - Called when operation is done. */
		clearStorageData(options: { origin: string; storages: Array; quotas: Array; }, callback: Function): void;
		/** If `config` is a PAC url, it is used directly otherwise `config` is parsed based on the following rules indicating which proxies to use for the session. */
		/** @param callback - Called when operation is done. */
		setProxy(config: string, callback: Function): void;
		/** Returns a new `Session` instance from `partition` string. */
		static fromPartition(partition: string): void;
		//
		// Grouped Definitions
		//
		cookies: {
			/** undefined */
			get(details: { url: string; name: string; domain: string; path: string; secure: Boolean; session: Boolean; callback: Function; error: Error; cookies: Array; }, callback: any): void;
			/** * `callback` Function - function(error) * `error` Error */
			set(details: { url: string; name: string; value: string; domain: string; path: string; secure: Boolean; session: Boolean; expirationDate: any; }, callback: any): void;
			/** undefined */
			/** @param callback - function(error) */
			remove(details: { url: string; name: string; }, callback: Function): void;
		};
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/shell.md

	/** The `shell` module provides functions related to desktop integration. */
	interface ShellModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/** Show the given file in a file manager. */
		showItemInFolder(fullPath: string): void;
		/** Open the given file in the desktop's default manner. */
		openItem(fullPath: string): void;
		/** Open the given external protocol URL in the desktop's default manner. */
		openExternal(url: string): void;
		/** Move the given file to trash and returns a boolean status for the operation. */
		moveItemToTrash(fullPath: string): void;
		/** Play the beep sound. */
		beep(): void;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/tray.md

	/** A `Tray` represents an icon in an operating system's notification area, it is usually attached with a context menu. */
	class Tray extends NodeJS.EventEmitter {
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/** Emitted when the tray icon is clicked. */
		on(event: 'click', listener: (event: Event, bounds: { x: number; y: number; width: number; height: number; }) => void): NodeJS.EventEmitter;
		/** (Windows) Emitted when the tray icon is right clicked. */
		on(event: 'right-click', listener: (event: Event, bounds: { x: number; y: number; width: number; height: number; }) => void): NodeJS.EventEmitter;
		/** (Windows) Emitted when the tray icon is double clicked. */
		on(event: 'double-click', listener: (event: Event, bounds: { x: number; y: number; width: number; height: number; }) => void): NodeJS.EventEmitter;
		/** (Windows) Emitted when the tray balloon shows. */
		on(event: 'balloon-show', listener: Function): NodeJS.EventEmitter;
		/** (Windows) Emitted when the tray balloon is clicked. */
		on(event: 'balloon-click', listener: Function): NodeJS.EventEmitter;
		/** (Windows) Emitted when the tray balloon is closed because of timeout or user manually closes it. */
		on(event: 'balloon-closed', listener: Function): NodeJS.EventEmitter;
		/** (OS X) Emitted when any dragged items are dropped on the tray icon. */
		on(event: 'drop', listener: Function): NodeJS.EventEmitter;
		/** (OS X) Emitted when dragged files are dropped in the tray icon. */
		on(event: 'drop-files', listener: (event: any, files: Array) => void): NodeJS.EventEmitter;
		/** (OS X) Emitted when a drag operation enters the tray icon. */
		on(event: 'drag-enter', listener: Function): NodeJS.EventEmitter;
		/** (OS X) Emitted when a drag operation exits the tray icon. */
		on(event: 'drag-leave', listener: Function): NodeJS.EventEmitter;
		/** (OS X) Emitted when a drag operation ends on the tray or ends at another location. */
		on(event: 'drag-end', listener: Function): NodeJS.EventEmitter;
		//
		// Methods
		//
		/** Destroys the tray icon immediately. */
		destroy(): void;
		/** Sets the `image` associated with this tray icon. */
		setImage(image: NativeImage): void;
		/** (OS X) Sets the `image` associated with this tray icon when pressed on OS X. */
		setPressedImage(image: NativeImage): void;
		/** Sets the hover text for this tray icon. */
		setToolTip(toolTip: string): void;
		/** (OS X) Sets the title displayed aside of the tray icon in the status bar. */
		setTitle(title: string): void;
		/** (OS X) Sets whether the tray icon's background becomes highlighted (in blue) when the tray icon is clicked. */
		setHighlightMode(highlight: Boolean): void;
		/** (Windows) Displays a tray balloon. */
		displayBalloon(options: { icon: NativeImage; title: string; content: string; }): void;
		/** (Windows) Popups the context menu of tray icon. */
		/** @param position - The pop up position. */
		popUpContextMenu(menu?: Menu, position?: { x: number; y: number; }): void;
		/** Sets the context menu for this icon. */
		setContextMenu(menu: Menu): void;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/web-contents.md

	/** `webContents` is an [EventEmitter](http://nodejs. */
	class WebContents extends NodeJS.EventEmitter {
		//
		// Properties
		//
		/** Returns the [session](session. */
		session: Session;
		/** Get the `WebContents` of DevTools for this `WebContents`. */
		devToolsWebContents: WebContents;
		//
		// Events
		//
		on(event: string, listener: Function): NodeJS.EventEmitter;
		/** Emitted when the navigation is done, i. */
		on(event: 'did-finish-load', listener: Function): NodeJS.EventEmitter;
		/** This event is like `did-finish-load` but emitted when the load failed or was cancelled, e. */
		on(event: 'did-fail-load', listener: (event: Event, errorCode: number, errorDescription: string, validatedURL: string) => void): NodeJS.EventEmitter;
		/** Emitted when a frame has done navigation. */
		on(event: 'did-frame-finish-load', listener: (event: Event, isMainFrame: Boolean) => void): NodeJS.EventEmitter;
		/** Corresponds to the points in time when the spinner of the tab started spinning. */
		on(event: 'did-start-loading', listener: Function): NodeJS.EventEmitter;
		/** Corresponds to the points in time when the spinner of the tab stopped spinning. */
		on(event: 'did-stop-loading', listener: Function): NodeJS.EventEmitter;
		/** Emitted when details regarding a requested resource are available. */
		on(event: 'did-get-response-details', listener: (event: Event, status: Boolean, newURL: string, originalURL: string, httpResponseCode: number, requestMethod: string, referrer: string, headers: Object) => void): NodeJS.EventEmitter;
		/** Emitted when a redirect is received while requesting a resource. */
		on(event: 'did-get-redirect-request', listener: (event: Event, oldURL: string, newURL: string, isMainFrame: Boolean, httpResponseCode: number, requestMethod: string, referrer: string, headers: Object) => void): NodeJS.EventEmitter;
		/** Emitted when the document in the given frame is loaded. */
		on(event: 'dom-ready', listener: (event: Event) => void): NodeJS.EventEmitter;
		/** Emitted when page receives favicon urls. */
		on(event: 'page-favicon-updated', listener: (event: Event, favicons: Array) => void): NodeJS.EventEmitter;
		/** Emitted when the page requests to open a new window for a `url`. */
		on(event: 'new-window', listener: (event: Event, url: string, frameName: string, disposition: string, options: Object) => void): NodeJS.EventEmitter;
		/** Emitted when a user or the page wants to start navigation. */
		on(event: 'will-navigate', listener: (event: Event, url: string) => void): NodeJS.EventEmitter;
		/** Emitted when the renderer process has crashed. */
		on(event: 'crashed', listener: Function): NodeJS.EventEmitter;
		/** Emitted when a plugin process has crashed. */
		on(event: 'plugin-crashed', listener: (event: Event, name: string, version: string) => void): NodeJS.EventEmitter;
		/** Emitted when `webContents` is destroyed. */
		on(event: 'destroyed', listener: Function): NodeJS.EventEmitter;
		/** Emitted when DevTools is opened. */
		on(event: 'devtools-opened', listener: Function): NodeJS.EventEmitter;
		/** Emitted when DevTools is closed. */
		on(event: 'devtools-closed', listener: Function): NodeJS.EventEmitter;
		/** Emitted when DevTools is focused / opened. */
		on(event: 'devtools-focused', listener: Function): NodeJS.EventEmitter;
		/** Emitted when failed to verify the `certificate` for `url`. */
		on(event: 'certificate-error', listener: (event: Event, url: URL, error: string, certificate: { data: Buffer; issuerName: string; }, callback: Function) => void): NodeJS.EventEmitter;
		/** Emitted when a client certificate is requested. */
		on(event: 'select-client-certificate', listener: (event: Event, url: URL, certificateList: Objects, callback: Function) => void): NodeJS.EventEmitter;
		/** Emitted when `webContents` wants to do basic auth. */
		on(event: 'login', listener: (event: Event, request: { method: string; url: URL; referrer: URL; }, authInfo: { isProxy: Boolean; scheme: string; host: string; port: number; realm: string; }, callback: Function) => void): NodeJS.EventEmitter;
		//
		// Methods
		//
		/** Loads the `url` in the window, the `url` must contain the protocol prefix, e. */
		loadURL(url: URL, options?: { httpReferrer: string; userAgent: string; extraHeaders: string; }): void;
		/** Initiates a download of the resource at `url` without navigating. */
		downloadURL(url: URL): void;
		/** Returns URL of the current web page. */
		getURL(): string;
		/** Returns the title of the current web page. */
		getTitle(): string;
		/** Returns whether web page is still loading resources. */
		isLoading(): boolean;
		/** Returns whether the web page is waiting for a first-response from the main resource of the page. */
		isWaitingForResponse(): boolean;
		/** Stops any pending navigation. */
		stop(): void;
		/** Reloads the current web page. */
		reload(): void;
		/** Reloads current page and ignores cache. */
		reloadIgnoringCache(): void;
		/** Returns whether the browser can go back to previous web page. */
		canGoBack(): boolean;
		/** Returns whether the browser can go forward to next web page. */
		canGoForward(): boolean;
		/** Returns whether the web page can go to `offset`. */
		canGoToOffset(offset: number): boolean;
		/** Clears the navigation history. */
		clearHistory(): void;
		/** Makes the browser go back a web page. */
		goBack(): void;
		/** Makes the browser go forward a web page. */
		goForward(): void;
		/** Navigates browser to the specified absolute web page index. */
		goToIndex(index: number): void;
		/** Navigates to the specified offset from the "current entry". */
		goToOffset(offset: number): void;
		/** Whether the renderer process has crashed. */
		isCrashed(): boolean;
		/** Overrides the user agent for this web page. */
		setUserAgent(userAgent: string): void;
		/** Returns a `String` representing the user agent for this web page. */
		getUserAgent(): string;
		/** Injects CSS into the current web page. */
		insertCSS(css: string): void;
		/** Evaluates `code` in page. */
		executeJavaScript(code: string, userGesture?: Boolean): void;
		/** Mute the audio on the current web page. */
		setAudioMuted(muted: Boolean): void;
		/** Returns whether this page has been muted. */
		isAudioMuted(): boolean;
		/** Executes the editing command `undo` in web page. */
		undo(): void;
		/** Executes the editing command `redo` in web page. */
		redo(): void;
		/** Executes the editing command `cut` in web page. */
		cut(): void;
		/** Executes the editing command `copy` in web page. */
		copy(): void;
		/** Executes the editing command `paste` in web page. */
		paste(): void;
		/** Executes the editing command `pasteAndMatchStyle` in web page. */
		pasteAndMatchStyle(): void;
		/** Executes the editing command `delete` in web page. */
		delete(): void;
		/** Executes the editing command `selectAll` in web page. */
		selectAll(): void;
		/** Executes the editing command `unselect` in web page. */
		unselect(): void;
		/** Executes the editing command `replace` in web page. */
		replace(text: string): void;
		/** Executes the editing command `replaceMisspelling` in web page. */
		replaceMisspelling(text: string): void;
		/** Checks if any ServiceWorker is registered and returns a boolean as response to `callback`. */
		hasServiceWorker(callback: Function): boolean;
		/** Unregisters any ServiceWorker if present and returns a boolean as response to `callback` when the JS promise is fulfilled or false when the JS promise is rejected. */
		unregisterServiceWorker(callback: Function): void;
		/** Prints window's web page. */
		print(options?: { silent: Boolean; printBackground: Boolean; }): void;
		/** `callback` Function - `function(error, data) {}` */
		printToPDF(options: { marginsType: number; pageSize: string; printBackground: Boolean; printSelectionOnly: Boolean; landscape: Boolean; }, callback: any): void;
		/** Adds the specified path to DevTools workspace. */
		addWorkSpace(path: string): void;
		/** Removes the specified path from DevTools workspace. */
		removeWorkSpace(path: string): void;
		/** Opens the developer tools. */
		openDevTools(options?: any): void;
		/** Closes the developer tools. */
		closeDevTools(): void;
		/** Returns whether the developer tools are opened. */
		isDevToolsOpened(): boolean;
		/** Toggles the developer tools. */
		toggleDevTools(): void;
		/** Returns whether the developer tools is focused. */
		isDevToolsFocused(): boolean;
		/** Starts inspecting element at position (`x`, `y`). */
		inspectElement(x: number, y: number): void;
		/** Opens the developer tools for the service worker context. */
		inspectServiceWorker(): void;
		/** Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. */
		send(channel: string, ...arg: any[]): void;
		/** Enable device emulation with the given parameters. */
		enableDeviceEmulation(parameters: { screenPosition: string; screenSize: { width: number; height: number; }; viewPosition: { x: number; y: number; }; deviceScaleFactor: number; viewSize: { width: number; height: number; }; fitToView: Boolean; offset: { x: Float; y: Float; }; scale: Float; }): void;
		/** Disable device emulation enabled by `webContents. */
		disableDeviceEmulation(): void;
		/** Sends an input `event` to the page. */
		sendInputEvent(event: { type: string; modifiers: Array; }): void;
		/** Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(frameBuffer)` when there is a presentation event. */
		beginFrameSubscription(callback: Function): void;
		/** End subscribing for frame presentation events. */
		endFrameSubscription(): void;
		/** Returns true if the process of saving page has been initiated successfully. */
		/** @param fullPath - The full file path. */
		/** @param saveType - Specify the save type. */
		/** @param callback - `function(error) {}`. */
		savePage(fullPath: string, saveType: string, callback: Function): void;
	}

	// Code generated from https://github.com/atom/electron/blob/v0.35.4/docs/api/web-frame.md

	/** The `web-frame` module allows you to customize the rendering of the current web page. */
	interface WebFrameModule extends NodeJS.EventEmitter {
		//
		// Methods
		//
		/** Changes the zoom factor to the specified factor. */
		/** @param factor - Zoom factor. */
		setZoomFactor(factor: Number): void;
		/** Returns the current zoom factor. */
		getZoomFactor(): number;
		/** Changes the zoom level to the specified level. */
		/** @param level - Zoom level */
		setZoomLevel(level: Number): void;
		/** Returns the current zoom level. */
		getZoomLevel(): number;
		/** Sets the maximum and minimum zoom level. */
		setZoomLevelLimits(minimumLevel: Number, maximumLevel: Number): void;
		/** Sets a provider for spell checking in input fields and text areas. */
		setSpellCheckProvider(language: string, autoCorrectWord: Boolean, provider: Object): void;
		/** Registers the `scheme` as secure scheme. */
		registerURLSchemeAsSecure(scheme: string): void;
		/** Resources will be loaded from this `scheme` regardless of the current page's Content Security Policy. */
		registerURLSchemeAsBypassingCSP(scheme: string): void;
		/** Registers the `scheme` as secure, bypasses content security policy for resources and allows registering ServiceWorker. */
		registerURLSchemeAsPrivileged(scheme: string): void;
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
		/** The `crash-reporter` module enables sending your app's crash reports. */
		crashReporter: CrashReporterModule;
		/** The `dialog` module provides APIs to show native system dialogs, such as opening files or alerting, so web applications can deliver the same user experience as native applications. */
		dialog: DialogModule;
		/** `DownloadItem` is an EventEmitter represents a download item in Electron. */
		DownloadItem: typeof DownloadItem;
		/** The `global-shortcut` module can register/unregister a global keyboard shortcut with the operating system so that you can customize the operations for various shortcuts. */
		global-shortcut: Global-shortcutModule;
		/** The `ipcMain` module, when used in the main process, handles asynchronous and synchronous messages sent from a renderer process (web page). */
		ipcMain: IpcMainModule;
		/** The `ipcRenderer` module provides a few methods so you can send synchronous and asynchronous messages from the render process (web page) to the main process. */
		ipcRenderer: IpcRendererModule;
		/** The `menu-item` module allows you to add items to an application or context [`menu`](menu. */
		MenuItem: typeof MenuItem;
		/** The `menu` class is used to create native menus that can be used as application menus and [context menus](https://developer. */
		Menu: typeof Menu;
		/** In Electron, for the APIs that take images, you can pass either file paths or `nativeImage` instances. */
		NativeImage: typeof NativeImage;
		/** The `power-monitor` module is used to monitor power state changes. */
		powerMonitor: PowerMonitorModule;
		/** The `powerSaveBlocker` module is used to block the system from entering low-power (sleep) mode and thus allowing the app to keep the system and screen active. */
		powerSaveBlocker: PowerSaveBlockerModule;
		/** The `protocol` module can register a custom protocol or intercept an existing protocol. */
		protocol: ProtocolModule;
		/** The `remote` module provides a simple way to do inter-process communication (IPC) between the renderer process (web page) and the main process. */
		remote: RemoteModule;
		/** The `screen` module retrieves information about screen size, displays, cursor position, etc. */
		screen: ScreenModule;
		/** The `session` module can be used to create new `Session` objects. */
		Session: typeof Session;
		/** The `shell` module provides functions related to desktop integration. */
		shell: ShellModule;
		/** A `Tray` represents an icon in an operating system's notification area, it is usually attached with a context menu. */
		Tray: typeof Tray;
		/** `webContents` is an [EventEmitter](http://nodejs. */
		WebContents: typeof WebContents;
		/** The `web-frame` module allows you to customize the rendering of the current web page. */
		webFrame: WebFrameModule;
		// Data types defined in https://github.com/atom/electron/blob/v0.35.4/docs/api/app.md
		Task: typeof Task;
		// Data types defined in https://github.com/atom/electron/blob/v0.35.4/docs/api/browser-window.md
		button: typeof button;
		// Type aliases
		Accelerator: typeof Accelerator;
	}
	var electron: Electron;
	export = electron;
}
