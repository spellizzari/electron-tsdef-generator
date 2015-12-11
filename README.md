# electron-tsdef-generator
A NodeJS tool written in TypeScript that downloads the documentation
of GitHub Electron and transforms it into a Typescript definition file.

## Description

To write TypeScript .d.ts definition files by hand is tedious and error-prone, especially for large libraries. Moreover, the task needs to be repeated on every new release of the library.

The goal for this tool is to automate the process of writing .d.ts definition files for the [GitHub Electron](https://github.com/atom/electron) API. It does so by downloading the Markdown documentation files of the API from the GitHub pages of the project, and parsing them and formatting the output into a single .d.ts file.

As the documentation files are human-generated, there are some inconsistencies in the formatting of sections, lists, comments, etc. The current version of the `electron-tsdef-generator` was built to understand the documentation for the following versions of Electron:

- v0.35.4


`electron-tsdef-generator` currently supports the following features:

- parses each documentation file either as a class definition or as a module definition,
- parses event definitions into on() overloadings,
- generates jsdoc comments from the documentation with html links to the online documentation sections,
- parses instance and static methods,
- parses instance and static properties,
- decudes the return type of some methods from their comments when it starts with `Returns the [type name]` or `Returns a [type name]`,
- decudes the return type of methods which names start with `is`, `has` or `can` as `boolean`,
- supports anonymous types and classes defined in the comments of method parameters,
- supports prefixed members,
- translates common type names (Integer, Double, Float, etc) into TypeScript types,
- patches reserved names for TypeScript (eg. `switch` into `_switch`).

## Configuration

Sometimes things are missing from the document or are made difficult to parse. This is especially true for the methods return types which are never clearly specified, and need to be deduced from the method name or its description.

To manage full parsing of the documentation, `electron-tsdef-generator` needs a bit of help. This is done through the `generatorConfig.json` configuration file.

### Global configuration: `rawBaseUrl` and `htmlBaseUrl`

Those are the urls that `electron-tsdef-generator` will use to download the Markdown files and emit valid urls in the comments. The first parameter indicates the base url to download the raw content of the Markdown documentation files, while the second parameter indicates the base url of the GitHub-formatted version of those pages.

### Global configuration: `cacheDir`

`electron-tsdef-generator` caches the downloaded Markdown files on disk. This parameter indicates the relative path to the folder used by `electron-tsdef-generator`. This folder must exist before `electron-tsdef-generator` is executed.

### Global configuration: `typeAliases`

This parameter contains a dictionary of `string`/`string` values, where the key indicates the name of a type alias, and the value indicates the aliased type. This is used to preserve custom type names used in the documentation such as `Accelerator`, that are in fact just `string` values.

### Global configuration: `files`

This parameter defines all the Markdown files that are to be parsed, and for each of them, provides parameters for the parser and patch instructions to cope with missing/badly shaped information from the documentation. It is a dictionary where each key is the name of a Markdown file to download from GitHub, and each value is an object defined below.

#### Per file configuration: `mode`

Required. Indicates if the Markdown file defines a class (such as `BrowserWindow`) or a module. This parameter can be either `"Class"` or `"Module"`.

#### Per file configuration: `isEventEmitter`

Not implemented yet.

#### Per file configuration: `parsing`

Optional. This parameter provides an object that defines options for the parser :

- `uncommonSections` (optional): a dictionary of Markdown section names with a string that indicates how the parser should treat them. Valid values are:
  - `"Events"` to parse the section as a list of events,
  - `"Methods"` to parse the section as a list of methods,
  - `"Properties"` to parse the section as a list of properties.
- `methodsAreInstance` (optional): `true` to indicate that method sections are parsed as instance methods.
 
#### Per file configuration: `patches`

Optional. This parameter provides an object that defines patch instructions to modify the TypeScript definitions before code is written to the .d.ts file:

- `methods` (optional): a map of patches to apply to methods. Keys are the method names with their prefixes when they have one (eg. `dock.getBadge`). Values are objects:
  - `params` (optional): a map of patches to apply to parameters. Keys are parameter names and values are strings indicating the new type for the parameter.
  - `returns` (optional): a string value that indicates the return type of the method.
- `events` (optional): a map of patches to apply to events. Keys are event names and values are objects:
  - `returnParams` (optional): a map of patches to apply to return parameters. Keys are parameter names and values are strings indicating the new type for the parameter.
- `propreties` (optional): a map of patches to apply to properties. Keys are the property names with their prefixes when they have one. Values are objects:
  - `type` (optional): a string that indicates the new type for the property.

## How to use

Compile the TypeScript sources and just run `node main.js`. Log messages will be emitted to the console and the .d.ts file will be written in `typings/electron/electron.d.ts`.
