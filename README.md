# PHP Array from JSON or JavaScript

Convert a selected JSON or Javascript Object/Array to PHP Array notation.

## Features

### Command `JSON to PHP Array`

```json
{"key":[1,"string",true]}
```

```php
["key"=>[1,"string",true]]
```

### Command `JS Object/Array to PHP Array`

supports Javascript Sparse Arrays

```js
{key:[1,"string",NULL,,true]}
```

```php
["key"=>[1,"string",NULL,NULL,true]]
```

<!---
## Requirements

none

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.
-->

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.1

Initial release

