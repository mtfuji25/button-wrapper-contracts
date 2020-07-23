# cordova-plugin-permission

> This plugin provides the ability to verify and request grants for Android [app permissions](https://developer.android.com/guide/topics/permissions/index.html).

## Installation

```bash
cordova plugin add cordova-plugin-permission
```

## Supported platforms

* Android

## Usage

```javascript
var Permission = window.plugins.Permission

var permission = 'android.permission.RECORD_AUDIO'

Permission.has(permission, function(results) {
    if (!results[permission]) {
        Permission.request(permission, function(results) {
            if (result[permission]) {
                // permission is granted
            }
        }, alert)
    }
}, alert)
```

## API

## Modules

<dl>
<dt><a href="#window.plugins.module_Permission">Permission</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#successCallback">successCallback</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#errorCallback">errorCallback</a> : <code>function</code></dt>
<dd></dd>
</dl>

<a name="window.plugins.module_Permission"></a>

## Permission

* [Permission](#window.plugins.module_Permission)
    * [.has(permissions, successCallback, errorCallback)](#window.plugins.module_Permission.has)
    * [.request(permissions, successCallback, errorCallback)](#window.plugins.module_Permission.request)

<a name="window.plugins.module_Permission.has"></a>

### Permission.has(permissions, successCallback, errorCallback)
Asynchronously returns an object indicating whether given permissions are granted.

**Kind**: static method of [<code>Permission</code>](#window.plugins.module_Permission)  

| Param | Type | Description |
| --- | --- | --- |
| permissions | <code>String</code> \| <code>Array.&lt;String&gt;</code> | A permission or an array of permissions. |
| successCallback | [<code>successCallback</code>](#successCallback) |  |
| errorCallback | [<code>errorCallback</code>](#errorCallback) |  |

**Example**  
```js
var Permission = window.plugins.Permission

// verify grant for a permission
var permission = 'android.permission.RECORD_AUDIO'
Permission.has(permission, function(results) {
    if (results[permission]) {
        // permission is granted
    }
}, alert)

// verify grant for multiple permissions
var permissions = ['android.permission.RECORD_AUDIO', 'android.permission.READ_CONTACTS']
Permission.has(permissions, function(results) {
    if (results['android.permission.RECORD_AUDIO']) {
        // permission is granted
    }
}, alert)
```
<a name="window.plugins.module_Permission.request"></a>

### Permission.request(permissions, successCallback, errorCallback)
Requests permissions and asynchronously returns an object indicating whether given
permissions are granted.

**Kind**: static method of [<code>Permission</code>](#window.plugins.module_Permission)  

| Param | Type | Description |
| --- | --- | --- |
| permissions | <code>String</code> \| <code>Array.&lt;String&gt;</code> | A permission or an array of permissions. |
| successCallback | [<code>successCallback</code>](#successCallback) |  |
| errorCallback | [<code>errorCallback</code>](#errorCallback) |  |

**Example**  
```js
var Permission = window.plugins.Permission

// request grant for a permission
var permission = 'android.permission.RECORD_AUDIO'
Permission.request(permission, function(results) {
    if (results[permission]) {
        // permission is granted
    }
}, alert)

// request grant for multiple permissions
var permissions = ['android.permission.RECORD_AUDIO', 'android.permission.READ_CONTACTS']
Permission.request(permissions, function(results) {
    if (results['android.permission.RECORD_AUDIO']) {
        // permission is granted
    }
}, alert)
```
<a name="successCallback"></a>

## successCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| results | <code>Object.&lt;String, Boolean&gt;</code> | Each property of the object is a string indicating an app permission. Each value is a boolean indicating whether the app permission is granted. |

<a name="errorCallback"></a>

## errorCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| err | <code>Error</code> | 


## License

This project is [MIT-licensed](LICENSE)
