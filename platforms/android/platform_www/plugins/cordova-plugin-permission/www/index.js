cordova.define("cordova-plugin-permission.Permission", function(require, exports, module) {
/**
 * @module window.plugins.Permission
 */

var exec = require('cordova/exec')

/**
 * Asynchronously returns an object indicating whether given permissions are granted.
 *
 * @param {String|Array.<String>} permissions A permission or an array of permissions.
 * @param {successCallback} successCallback
 * @param {errorCallback} errorCallback
 * @example
 * var Permission = window.plugins.Permission
 *
 * // verify grant for a permission
 * var permission = 'android.permission.RECORD_AUDIO'
 * Permission.has(permission, function(results) {
 *     if (results[permission]) {
 *         // permission is granted
 *     }
 * }, alert)
 *
 * // verify grant for multiple permissions
 * var permissions = ['android.permission.RECORD_AUDIO', 'android.permission.READ_CONTACTS']
 * Permission.has(permissions, function(results) {
 *     if (results['android.permission.RECORD_AUDIO']) {
 *         // permission is granted
 *     }
 * }, alert)
 */
exports.has = function(aPermissions, successCallback, errorCallback) {
    if (!isFunction(errorCallback)) {
        throw new TypeError(
            'Wrong type for argument 3 (found: ' + typeof errorCallback + ', expected: function.)'
        )
    }

    if (!isFunction(successCallback)) {
        errorCallback(
            new TypeError(
                'Wrong type for argument 2 (found: ' +
                    typeof successCallback +
                    ", expected: 'function')"
            )
        )
        return
    }

    if (!isString(aPermissions) && !isArray(aPermissions)) {
        errorCallback(
            new TypeError(
                'Wrong type for argument 1 (found: ' +
                    typeof aPermissions +
                    ', expected: array, string.)'
            )
        )
        return
    }

    var permissions = castArray(aPermissions)

    if (!permissions.every(isString)) {
        errorCallback(new Error('One or more invalid permissions.'))
        return
    }

    exec(successCallback, wrapErrorCallback(errorCallback), 'Permission', 'has', [permissions])
}

/**
 * Requests permissions and asynchronously returns an object indicating whether given
 * permissions are granted.
 *
 * @param {(String|Array.<String>)} permissions A permission or an array of permissions.
 * @param {successCallback} successCallback
 * @param {errorCallback} errorCallback
 * @example
 * var Permission = window.plugins.Permission
 *
 * // request grant for a permission
 * var permission = 'android.permission.RECORD_AUDIO'
 * Permission.request(permission, function(results) {
 *     if (results[permission]) {
 *         // permission is granted
 *     }
 * }, alert)
 *
 * // request grant for multiple permissions
 * var permissions = ['android.permission.RECORD_AUDIO', 'android.permission.READ_CONTACTS']
 * Permission.request(permissions, function(results) {
 *     if (results['android.permission.RECORD_AUDIO']) {
 *         // permission is granted
 *     }
 * }, alert)
 */
exports.request = function(aPermissions, successCallback, errorCallback) {
    if (!isFunction(errorCallback)) {
        throw new TypeError(
            'Wrong type for argument 3 (found: ' + typeof errorCallback + ', expected: function.)'
        )
    }

    if (!isFunction(successCallback)) {
        errorCallback(
            new TypeError(
                'Wrong type for argument 2 (found: ' +
                    typeof successCallback +
                    ", expected: 'function')"
            )
        )
        return
    }

    if (!isString(aPermissions) && !isArray(aPermissions)) {
        errorCallback(
            new TypeError(
                'Wrong type for argument 1 (found: ' +
                    typeof aPermissions +
                    ', expected: array, string.)'
            )
        )
        return
    }

    var permissions = castArray(aPermissions)

    if (!permissions.every(isString)) {
        errorCallback(new Error('One or more invalid permissions.'))
        return
    }

    exec(successCallback, wrapErrorCallback(errorCallback), 'Permission', 'request', [permissions])
}

function wrapErrorCallback(errorCallback) {
    return function(err) {
        errorCallback(new Error(err))
    }
}

var toString = Object.prototype.toString

function isArray(value) {
    return /^\[object Array\]$/.test(toString.call(value))
}

function isFunction(value) {
    return /^\[object Function\]$/.test(toString.call(value))
}

function isString(value) {
    return /^\[object String\]$/.test(toString.call(value))
}

function castArray(value) {
    if (arguments.length === 0) {
        return []
    }
    return isArray(value) ? value : [value]
}

/**
 * @callback successCallback
 * @param {Object.<String, Boolean>} results Each property of the object is a string indicating
 * an app permission. Each value is a boolean indicating whether the app permission is granted.
 */

/**
 * @callback errorCallback
 * @param {Error} err
 */

});
