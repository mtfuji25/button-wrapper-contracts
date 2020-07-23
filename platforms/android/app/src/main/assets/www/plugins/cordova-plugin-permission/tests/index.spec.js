cordova.define("cordova-plugin-permission.tests", function(require, exports, module) {
exports.defineAutoTests = function() {
    var Permission = window.plugins.Permission

    it('should be defined', function() {
        expect(Permission).toBeDefined()
    })

    describe('has', function() {
        it('should be a function', function() {
            expect(typeof Permission.has).toBe('function')
        })

        it("should throw when 'errorCallback' is missing or invalid", function() {
            expect(function() {
                Permission.has()
            }).toThrowError(/Wrong type for argument 3/)
        })

        it("should asynchronously return an error when 'successCallback' is missing or invalid", function(done) {
            Permission.has([], null, function(err) {
                expect(err instanceof TypeError).toBe(true)
                expect(err.message).toMatch(/Wrong type for argument 2/)
                done()
            })
        })

        it("should asynchronously return an error when 'permissions' is missing or invalid", function(done) {
            var callback = function(err) {
                expect(err).toBeDefined()
                expect(err instanceof TypeError)
                expect(err.message).toMatch(/Wrong type for argument 1/)
                done()
            }
            Permission.has(null, callback, callback)
        })

        it('should asynchronously return an object indicating whether given permissions are granted', function(done) {
            var permission = 'android.permission.RECORD_AUDIO'
            var callback = function(results) {
                expect(isObject(results)).toBe(true)
                expect(results[permission]).toBeDefined()
                expect(typeof results[permission]).toBe('boolean')
                done()
            }
            Permission.has(permission, callback, callback)
        })
    })

    describe('request', function() {
        it('should be a function', function() {
            expect(typeof Permission.request).toBe('function')
        })

        it("should throw when 'errorCallback' is missing or invalid", function() {
            expect(function() {
                Permission.request()
            }).toThrowError(/Wrong type for argument 3/)
        })

        it("should asynchronously return an error when 'successCallback' is missing or invalid", function(done) {
            Permission.request([], null, function(err) {
                expect(err instanceof TypeError).toBe(true)
                expect(err.message).toMatch(/Wrong type for argument 2/)
                done()
            })
        })

        it("should asynchronously return an error when 'permissions' is missing or invalid", function(done) {
            var callback = function(err) {
                expect(err).toBeDefined()
                expect(err instanceof TypeError)
                expect(err.message).toMatch(/Wrong type for argument 1/)
                done()
            }
            Permission.request(null, callback, callback)
        })

        it('should asynchronously return an object indicating whether given permissions are granted', function(done) {
            var permission = 'android.permission.RECORD_AUDIO'
            var callback = function(results) {
                expect(isObject(results)).toBe(true)
                expect(results[permission]).toBeDefined()
                expect(typeof results[permission]).toBe('boolean')
                done()
            }
            Permission.request(permission, callback, callback)
        })
    })
}

function isObject(value) {
    return /^\[object Object\]$/.test(Object.prototype.toString.call(value))
}

});
