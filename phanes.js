(function() {
    "use strict";

    var Run = function() {
        Object.defineProperties(Array.prototype, {
            chunk: {
                value: function(n) {
                    var r = [];
                    for (var i=0; i<this.length; i+=n) {
                        r.push(this.slice(i, i+n));
                    }
                    return r;
                }
            },
            flatten: {
                value: function(r) {
                    r = r || [];
                    for(var a=this, i=0; i<a.length; i++) {
                        if(a[i] !== null) {
                            if(a[i] instanceof Array) {
                                a[i].flatten(r);
                            } else {
                                r.push(a[i]);
                            }
                        }
                    }
                    return r;
                }
            },
            distinct: {
                value: function() {
                    for(var a=this, i=0, r=[]; i<a.length; i++) {
                        if(r.indexOf(a[i]) === -1) {
                            r.push(a[i]);
                        }
                    }
                    return r;
                }
            },
            compact: {
                value: function() {
                    return this.filter(function(item) {
                        return item;
                    });
                }
            },
            head: {
                get: function() {
                    return this[0];
                },
                set: function(v) {
                    this[0] = v;
                }
            },
            tail: {
                get: function() {
                    return this[this.length - 1];
                },
                set: function(v) {
                    if(this.length) {
                        //Array has at least one item
                        this[this.length - 1] = v;
                    }
                }
            },
            has: {
                value: function(item) {
                    if(item instanceof RegExp) {
                        var re = item;
                        return !!this.filter(function(item) {
                            return re.test(item);
                        }).length;
                    }
                    return !!~this.indexOf(item);
                }
            },
            remove: {
                value: function(predicate) {
                    var i = this.findIndex(predicate);
                    if(i !== -1) {
                        return this.splice(i, 1);
                    }
                    return [];
                }
            },
            indexBy: {
                value: function(property) {
                    var result = {};
                    angular.forEach(this, function(item) {
                        result[item[property]] = item;
                    });
                    return result;
                }
            }
        });
        if(!Array.prototype.findIndex) {
            Object.defineProperty(Array.prototype, "findIndex", {
                value: function(predicate) {
                    if(this === null) {
                        throw new TypeError("Array.prototype.findIndex called on null or undefined");
                    }
                    if(typeof predicate !== "function") {
                        throw new TypeError("predicate must be a function");
                    }
                    var list = Object(this);
                    var length = list.length >>> 0;
                    var thisArg = arguments[1];
                    var value;
                    for(var i = 0; i < length; i++) {
                        value = list[i];
                        if(predicate.call(thisArg, value, i, list)) {
                            return i;
                        }
                    }
                    return -1;
                },
                enumerable: false,
                configurable: false,
                writable: false
            });
        }
        Object.defineProperties(Object.prototype, {
            isEmpty: {
                value: function() {
                    return !Object.getOwnPropertyNames(this).length;
                }
            },
            pop: {
                value: function(key) {
                    var value;
                    if(this.hasOwnProperty(key)) {
                        value = this[key];
                        delete this[key];
                    }
                    return value;
                }
            }
        });
        Object.defineProperties(String.prototype, {
            repeat: {
                value: function(n) {
                    var s = String.empty;
                    while(n--) {
                        s += this;
                    }
                    return s;
                }
            },
            contains: {
                value: function(substring) {
                    return ~this.indexOf(substring);
                }
            },
            toBoolean: {
                value: function() {
                    return (/^(true|1)$/i).test(this);
                }
            }
        });
        Object.defineProperties(Number.prototype, {
            isBetween: {
                value: function(a, b) {
                    return Math.min(a, b) <= this && this <= Math.max(a, b);
                }
            }
        });
        Object.defineProperties(Function.prototype, {
            inheritsFrom: {
                value: function(ParentClassOrObject) { 
                    if(ParentClassOrObject.constructor === Function) {
                        //Normal Inheritance 
                        this.prototype = new ParentClassOrObject();
                        this.prototype.base = ParentClassOrObject.prototype;
                        this.prototype.constructor = this;
                    } else {
                        //Pure Virtual Inheritance 
                        this.prototype = ParentClassOrObject;
                        this.prototype.base = ParentClassOrObject;
                        this.prototype.constructor = this;
                    }
                    return this;
                }
            }
        });
        Object.values = function(obj) {
            return Object.keys(obj).map(function(key) {
                return obj[key];
            });
        };
        Object.map = function(obj, mapFunction) {
            var result = {};
            for(var key in obj) {
                if(obj.hasOwnProperty(key)) {
                    result[key] = mapFunction(key, obj[key]);
                }
            }
            return result;
        };
        Object.filter = function(obj, predicate) {
            var result = {};
            for(var key in obj) {
                if (obj.hasOwnProperty(key) && predicate(obj[key], key)) {
                    result[key] = obj[key];
                }
            }
            return result;
        };
        String.empty = "";
    };
    var localStorageService = function($window) {
        angular.extend(this, {
            exists: function(key) {
                //Not !this.get(key), because existing key with falsy value (e.g. 0, "") would evaluate to true
                return this.get(key) !== null;
            },
            get: function(key) {
                return angular.fromJson($window.localStorage.getItem(key));
            },
            set: function(key, value) {
                $window.localStorage.setItem(key, angular.toJson(value));
            },
            edit: function(key, fn) {
                if(this.exists(key)) {
                    this.set(key, fn(this.get(key)));
                }
            },
            extend: function(key, value) {
                this.set(key, angular.extend({}, this.get(key), value));
            },
            delete: function(key) {
                $window.localStorage.removeItem(key);
            },
            clear: function() {
                $window.localStorage.clear();
            },
            keys: function() {
                return Object.keys($window.localStorage);
            }
        });
    };

    angular.module("phanes", [])
        .run([Run])
        .service("localStorage", ["$window", localStorageService])
    ;
}());