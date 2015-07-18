/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1).Init();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var JThreeContext = __webpack_require__(2);
	var JThreeContextProxy = __webpack_require__(67);
	var $ = __webpack_require__(10);
	var JThreeInterface = __webpack_require__(219);
	var JThreeStatic = (function () {
	    function JThreeStatic() {
	    }
	    JThreeStatic.prototype.addComponent = function (declaration) {
	        var context = JThreeContextProxy.getJThreeContext();
	        context.GomlLoader.componentRegistry.addComponent(declaration);
	    };
	    return JThreeStatic;
	})();
	var JThreeInit = (function () {
	    function JThreeInit() {
	    }
	    JThreeInit.j3 = function (query) {
	        var context = JThreeContextProxy.getJThreeContext();
	        if (typeof query === 'function') {
	            context.GomlLoader.onload(query);
	            return undefined;
	        }
	        var targetObject = context.GomlLoader.rootObj.find(query);
	        return new JThreeInterface(targetObject);
	    };
	    JThreeInit.Init = function () {
	        window["j3"] = JThreeInit.j3;
	        var pro = Object.getPrototypeOf(window["j3"]);
	        for (var key in JThreeStatic.prototype) {
	            pro[key] = JThreeStatic.prototype[key];
	        }
	        $(function () {
	            var j3 = JThreeContext.getInstanceForProxy();
	            j3.GomlLoader.onload(function () {
	            });
	            j3.init();
	        });
	    };
	    return JThreeInit;
	})();
	module.exports = JThreeInit;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var ContextTimer = __webpack_require__(3);
	var GomlLoader = __webpack_require__(7);
	var ResourceManager = __webpack_require__(188);
	var JThreeObject = __webpack_require__(5);
	var CanvasListChangedEventArgs = __webpack_require__(217);
	var SceneManager = __webpack_require__(218);
	var ListStateChangedType = __webpack_require__(191);
	var JThreeCollection = __webpack_require__(54);
	var JThreeEvent = __webpack_require__(12);
	var JThreeContext = (function (_super) {
	    __extends(JThreeContext, _super);
	    function JThreeContext() {
	        _super.call(this);
	        this.canvasManagers = [];
	        this.animaters = new JThreeCollection();
	        this.canvasChangedEvent = new JThreeEvent();
	        this.resourceManager = new ResourceManager();
	        this.timer = new ContextTimer();
	        this.sceneManager = new SceneManager();
	        this.gomlLoader = new GomlLoader();
	    }
	    JThreeContext.getInstanceForProxy = function () {
	        JThreeContext.instance = JThreeContext.instance || new JThreeContext();
	        return JThreeContext.instance;
	    };
	    JThreeContext.prototype.addAnimater = function (animater) {
	        this.animaters.insert(animater);
	    };
	    JThreeContext.prototype.updateAnimation = function () {
	        var _this = this;
	        var time = this.timer.Time;
	        this.animaters.each(function (v) {
	            if (v.update(time))
	                _this.animaters.del(v);
	        });
	    };
	    Object.defineProperty(JThreeContext.prototype, "SceneManager", {
	        get: function () {
	            return this.sceneManager;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(JThreeContext.prototype, "GomlLoader", {
	        get: function () {
	            return this.gomlLoader;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    JThreeContext.prototype.init = function () {
	        var _this = this;
	        this.gomlLoader.initForPage();
	        this.registerNextLoop =
	            window.requestAnimationFrame
	                ?
	                    function () {
	                        window.requestAnimationFrame(_this.loop.bind(_this));
	                    }
	                :
	                    function () {
	                        window.setTimeout(_this.loop.bind(_this), 1000 / 60);
	                    };
	        this.loop();
	    };
	    JThreeContext.prototype.loop = function () {
	        this.timer.updateTimer();
	        this.updateAnimation();
	        this.gomlLoader.update();
	        this.sceneManager.renderAll();
	        this.registerNextLoop();
	    };
	    Object.defineProperty(JThreeContext.prototype, "CanvasManagers", {
	        get: function () {
	            return this.canvasManagers;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(JThreeContext.prototype, "Timer", {
	        get: function () {
	            return this.timer;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(JThreeContext.prototype, "ResourceManager", {
	        get: function () {
	            return this.resourceManager;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    JThreeContext.prototype.addCanvasManager = function (renderer) {
	        if (this.canvasManagers.indexOf(renderer) === -1) {
	            this.canvasManagers.push(renderer);
	            this.canvasChangedEvent.fire(this, new CanvasListChangedEventArgs(ListStateChangedType.Add, renderer));
	        }
	    };
	    JThreeContext.prototype.removeCanvasManager = function (renderer) {
	        if (this.canvasManagers.indexOf(renderer) !== -1) {
	            for (var i = 0; i < this.canvasManagers.length; i++) {
	                if (this.canvasManagers[i] === renderer) {
	                    this.canvasManagers.splice(i, 1);
	                    break;
	                }
	            }
	            this.canvasChangedEvent.fire(this, new CanvasListChangedEventArgs(ListStateChangedType.Delete, renderer));
	        }
	    };
	    JThreeContext.prototype.onRendererChanged = function (func) {
	        this.canvasChangedEvent.addListerner(func);
	    };
	    JThreeContext.instance = new JThreeContext();
	    return JThreeContext;
	})(JThreeObject);
	module.exports = JThreeContext;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Timer = __webpack_require__(4);
	var ContextTimer = (function (_super) {
	    __extends(ContextTimer, _super);
	    function ContextTimer() {
	        _super.apply(this, arguments);
	    }
	    ContextTimer.prototype.updateTimer = function () {
	        this.currentFrame++;
	        var date = Date.now();
	        this.TimeFromLast = date - this.Time;
	        this.time = date;
	    };
	    return ContextTimer;
	})(Timer);
	module.exports = ContextTimer;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var Timer = (function (_super) {
	    __extends(Timer, _super);
	    function Timer() {
	        _super.call(this);
	        this.currentFrame = 0;
	        this.time = 0;
	        this.timeFromLast = 0;
	    }
	    Object.defineProperty(Timer.prototype, "CurrentFrame", {
	        get: function () {
	            return this.currentFrame;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Timer.prototype, "Time", {
	        get: function () {
	            return this.time;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Timer.prototype, "TimeFromLast", {
	        get: function () {
	            return this.timeFromLast;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Timer;
	})(JThreeObject);
	module.exports = Timer;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var JsHack = __webpack_require__(6);
	var JThreeObject = (function () {
	    function JThreeObject() {
	    }
	    JThreeObject.prototype.toString = function () {
	        return JsHack.getObjectName(this);
	    };
	    JThreeObject.prototype.getTypeName = function () {
	        return JsHack.getObjectName(this);
	    };
	    return JThreeObject;
	})();
	module.exports = JThreeObject;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var JsHack = (function () {
	    function JsHack() {
	    }
	    JsHack.getObjectName = function (obj) {
	        var funcNameRegex = /function (.{1,})\(/;
	        var result = (funcNameRegex).exec((obj).constructor.toString());
	        return (result && result.length > 1) ? result[1] : "";
	    };
	    return JsHack;
	})();
	module.exports = JsHack;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var jThreeObject = __webpack_require__(5);
	var Exceptions = __webpack_require__(9);
	var $ = __webpack_require__(10);
	var GomlNodeDictionary = __webpack_require__(11);
	var JThreeEvent = __webpack_require__(12);
	var AssociativeArray = __webpack_require__(8);
	var ComponentRegistry = __webpack_require__(13);
	var GomlLoaderConfigurator = __webpack_require__(14);
	var ComponentRunner = __webpack_require__(186);
	var PluginLoader = __webpack_require__(187);
	var GomlLoader = (function (_super) {
	    __extends(GomlLoader, _super);
	    function GomlLoader() {
	        _super.call(this);
	        this.pluginLoader = new PluginLoader();
	        this.onLoadEvent = new JThreeEvent();
	        this.configurator = new GomlLoaderConfigurator();
	        this.nodeRegister = new GomlNodeDictionary();
	        this.componentRegistry = new ComponentRegistry();
	        this.componentRunner = new ComponentRunner();
	        this.rootNodes = new AssociativeArray();
	        this.NodesById = new AssociativeArray();
	        this.ready = false;
	        var scriptTags = document.getElementsByTagName('script');
	        this.selfTag = scriptTags[scriptTags.length - 1];
	    }
	    GomlLoader.prototype.update = function () {
	        if (!this.ready)
	            return;
	        this.componentRunner.executeForAllComponents("update");
	    };
	    GomlLoader.prototype.onload = function (act) {
	        this.onLoadEvent.addListerner(act);
	    };
	    Object.defineProperty(GomlLoader.prototype, "Configurator", {
	        get: function () {
	            return this.configurator;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    GomlLoader.prototype.initForPage = function () {
	        var _this = this;
	        this.attemptToLoadGomlInScriptAttr();
	        var gomls = $("script[type='text/goml']");
	        gomls.each(function (index, elem) {
	            _this.loadScriptTag($(elem));
	        });
	    };
	    GomlLoader.prototype.attemptToLoadGomlInScriptAttr = function () {
	        var _this = this;
	        var url = this.selfTag.getAttribute('x-goml');
	        $.get(url, [], function (d) {
	            _this.scriptLoaded(d);
	        });
	    };
	    GomlLoader.prototype.loadScriptTag = function (scriptTag) {
	        var _this = this;
	        var srcSource = scriptTag[0].getAttribute("src");
	        if (srcSource) {
	            $.get(srcSource, [], function (d) {
	                _this.scriptLoaded(d);
	            });
	        }
	        else {
	            this.scriptLoaded(scriptTag.text());
	        }
	    };
	    GomlLoader.prototype.scriptLoaded = function (source) {
	        var _this = this;
	        var catched = this.rootObj = $(source);
	        if (catched[0].tagName !== "GOML")
	            throw new Exceptions.InvalidArgumentException("Root should be goml");
	        var children = catched.find("plugins").children();
	        this.rootNodes.set("plugins", []);
	        var pluginRequest = [];
	        children.each(function (i, e) {
	            if (e.tagName !== "PLUGIN")
	                return;
	            pluginRequest.push({
	                id: e.getAttribute("id"),
	                versionId: e.getAttribute("version")
	            });
	        });
	        this.pluginLoader.resolvePlugins(pluginRequest, function () {
	            _this.configurator.GomlRootNodes.forEach(function (v) {
	                var children = catched.find(v).children();
	                _this.rootNodes.set(v, []);
	                _this.parseChildren(null, children, function (e) {
	                    _this.rootNodes.get(v).push(e);
	                });
	            });
	            _this.eachNode(function (v) { return v.beforeLoad(); });
	            _this.eachNode(function (v) { return v.Load(); });
	            _this.eachNode(function (v) { return v.afterLoad(); });
	            _this.eachNode(function (v) { return v.attributes.applyDefaultValue(); });
	            _this.onLoadEvent.fire(_this, source);
	            _this.ready = true;
	        });
	    };
	    GomlLoader.prototype.eachNode = function (act, targets) {
	        var _this = this;
	        if (targets) {
	            targets.forEach(function (v) {
	                v.callRecursive(act);
	            });
	            return;
	        }
	        this.configurator.GomlRootNodes.forEach(function (v) {
	            _this.rootNodes.get(v).forEach(function (e) { return e.callRecursive(act); });
	        });
	    };
	    GomlLoader.prototype.parseChildren = function (parent, child, actionForChildren) {
	        if (!child)
	            return;
	        for (var i = 0; i < child.length; i++) {
	            var elem = child[i];
	            var tagFactory = this.configurator.getGomlTagFactory(elem.tagName);
	            if (tagFactory) {
	                var newNode = tagFactory.CreateNodeForThis(elem, this, parent);
	                if (newNode == null) {
	                    console.warn(elem.tagName + " tag was parsed,but failed to create instance. Skipped.");
	                    continue;
	                }
	                actionForChildren(newNode);
	                if (!tagFactory.NoNeedParseChildren)
	                    this.parseChildren(newNode, $(elem).children(), function (e) { });
	            }
	            else {
	                console.warn(elem.tagName + " was not parsed.'");
	            }
	        }
	    };
	    GomlLoader.prototype.instanciateTemplate = function (template, parentNode) {
	        var templateInElems = $(template);
	        this.append(templateInElems, parentNode.Element, false);
	    };
	    GomlLoader.prototype.append = function (source, parent, needLoad) {
	        if (typeof needLoad === 'undefined')
	            needLoad = true;
	        var id = parent.getAttribute("x-j3-id");
	        var parentOfGoml = this.NodesById.get(id);
	        var loadedGomls = [];
	        for (var i = 0; i < source.length; i++) {
	            var s = source[i];
	            this.parseChildren(parentOfGoml, $(s), function (v) { loadedGomls.push(v); });
	        }
	        if (!needLoad)
	            return;
	        this.eachNode(function (v) { return v.beforeLoad(); }, loadedGomls);
	        this.eachNode(function (v) { return v.Load(); }, loadedGomls);
	        this.eachNode(function (v) { return v.afterLoad(); }, loadedGomls);
	        this.eachNode(function (v) { return v.attributes.applyDefaultValue(); }, loadedGomls);
	    };
	    GomlLoader.prototype.getNode = function (id) {
	        return this.NodesById.get(id);
	    };
	    GomlLoader.prototype.getNodeByQuery = function (query) {
	        var result = [];
	        var found = this.rootObj.find(query);
	        for (var index = 0; index < found.length; index++) {
	            var id = found[index].getAttribute("x-j3-id");
	            result.push(this.getNode(id));
	        }
	        return result;
	    };
	    return GomlLoader;
	})(jThreeObject);
	module.exports = GomlLoader;


/***/ },
/* 8 */
/***/ function(module, exports) {

	var AssociativeArray = (function () {
	    function AssociativeArray() {
	        this.target = new Map();
	    }
	    AssociativeArray.prototype.clear = function () {
	        this.target.clear();
	    };
	    AssociativeArray.prototype.delete = function (key) {
	        return this.target.delete(key);
	    };
	    AssociativeArray.prototype.forEach = function (callbackfn, thisArg) {
	        this.target.forEach(callbackfn, thisArg);
	    };
	    AssociativeArray.prototype.get = function (key) {
	        return this.target.get(key);
	    };
	    AssociativeArray.prototype.has = function (key) {
	        return this.target.has(key);
	    };
	    AssociativeArray.prototype.set = function (key, value) {
	        this.target.set(key, value);
	        return this;
	    };
	    Object.defineProperty(AssociativeArray.prototype, "size", {
	        get: function () {
	            return this.target.size;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AssociativeArray.prototype, "asArray", {
	        get: function () {
	            var array = new Array(this.size);
	            var i = 0;
	            this.forEach(function (v) {
	                array[i] = v;
	                i++;
	            });
	            return array;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return AssociativeArray;
	})();
	module.exports = AssociativeArray;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var jThreeException = (function (_super) {
	    __extends(jThreeException, _super);
	    function jThreeException(name, message) {
	        _super.call(this);
	        this.name = name;
	        this.message = message;
	    }
	    jThreeException.prototype.toString = function () {
	        return "Exception:" + _super.prototype.toString.call(this) + "\nName:" + this.name + "\nMessage:" + this.message;
	    };
	    return jThreeException;
	})(JThreeObject);
	exports.jThreeException = jThreeException;
	var IrregularElementAccessException = (function (_super) {
	    __extends(IrregularElementAccessException, _super);
	    function IrregularElementAccessException(accessIndex) {
	        _super.call(this, "Irregular vector element was accessed.", "You attempted to access " + accessIndex + " element. But,this vector have enough dimension.");
	    }
	    return IrregularElementAccessException;
	})(jThreeException);
	exports.IrregularElementAccessException = IrregularElementAccessException;
	var InvalidArgumentException = (function (_super) {
	    __extends(InvalidArgumentException, _super);
	    function InvalidArgumentException(message) {
	        _super.call(this, "Invalid argument was passed.", message);
	    }
	    return InvalidArgumentException;
	})(jThreeException);
	exports.InvalidArgumentException = InvalidArgumentException;
	var SingularMatrixException = (function (_super) {
	    __extends(SingularMatrixException, _super);
	    function SingularMatrixException(m) {
	        _super.call(this, "Passed matrix is singular matrix", "passed matrix:" + m.toString());
	    }
	    return SingularMatrixException;
	})(jThreeException);
	exports.SingularMatrixException = SingularMatrixException;
	var AbstractClassMethodCalledException = (function (_super) {
	    __extends(AbstractClassMethodCalledException, _super);
	    function AbstractClassMethodCalledException() {
	        debugger;
	        _super.call(this, "Invalid method was called.", "This method is abstract method, cant call by this instance");
	    }
	    return AbstractClassMethodCalledException;
	})(jThreeException);
	exports.AbstractClassMethodCalledException = AbstractClassMethodCalledException;
	var WebGLErrorException = (function (_super) {
	    __extends(WebGLErrorException, _super);
	    function WebGLErrorException(text) {
	        _super.call(this, "WebGL reported error.", text);
	    }
	    return WebGLErrorException;
	})(jThreeException);
	exports.WebGLErrorException = WebGLErrorException;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.1.3
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2014-12-18T15:11Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//

	var arr = [];

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,

		version = "2.1.3",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {
		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function( callback, args ) {
			return jQuery.each( this, callback, args );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map(this, function( elem, i ) {
				return callback.call( elem, i, elem );
			}));
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor(null);
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type(obj) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
		},

		isPlainObject: function( obj ) {
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call(obj) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {
				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf("use strict") === 1 ) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {
				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval
					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		// args is for internal usage only
		each: function( obj, callback, args ) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike( obj );

			if ( args ) {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				}

			// A special, fast, case for the most common use of each
			} else {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArraylike( Object(arr) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike( elems ),
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});

	function isArraylike( obj ) {
		var length = obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.nodeType === 1 && length ) {
			return true;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.0-pre
	 * http://sizzlejs.com/
	 *
	 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2014-12-16
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
		// http://www.w3.org/TR/css3-syntax/#characters
		characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Loosely modeled on CSS identifier characters
		// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
		// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = characterEncoding.replace( "w", "w#" ),

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + characterEncoding + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + characterEncoding + ")" ),
			"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
			"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var match, elem, m, nodeType,
			// QSA vars
			i, groups, old, nid, newContext, newSelector;

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}

		context = context || document;
		results = results || [];
		nodeType = context.nodeType;

		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		if ( !seed && documentIsHTML ) {

			// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
				// Speed-up: Sizzle("#ID")
				if ( (m = match[1]) ) {
					if ( nodeType === 9 ) {
						elem = context.getElementById( m );
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document (jQuery #6963)
						if ( elem && elem.parentNode ) {
							// Handle the case where IE, Opera, and Webkit return items
							// by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}
					} else {
						// Context is not a document
						if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
							contains( context, elem ) && elem.id === m ) {
							results.push( elem );
							return results;
						}
					}

				// Speed-up: Sizzle("TAG")
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Speed-up: Sizzle(".CLASS")
				} else if ( (m = match[3]) && support.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// QSA path
			if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				nid = old = expando;
				newContext = context;
				newSelector = nodeType !== 1 && selector;

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );

					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";

					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + toSelector( groups[i] );
					}
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
					newSelector = groups.join(",");
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = attrs.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// If no document and documentElement is available, return
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Set our document
		document = doc;
		docElem = doc.documentElement;
		parent = doc.defaultView;

		// Support: IE>8
		// If iframe document is assigned to "document" variable and if iframe has been reloaded,
		// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
		// IE6-8 do not support the defaultView property so parent will be undefined
		if ( parent && parent !== parent.top ) {
			// IE11 does not have attachEvent, so all must suffer
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Support tests
		---------------------------------------------------------------------- */
		documentIsHTML = !isXML( doc );

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( doc.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\f]' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = doc.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully does not implement inclusive descendent
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === doc ? -1 :
					b === doc ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return doc;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, outerCache, node, diff, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
								// Seek `elem` from a previously-cached index
								outerCache = parent[ expando ] || (parent[ expando ] = {});
								cache = outerCache[ type ] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = cache[0] === dirruns && cache[2];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										outerCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							// Use previously-cached element index if available
							} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
								diff = cache[1];

							// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
							} else {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
										// Cache the index of each encountered element
										if ( useCache ) {
											(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
							if ( (oldCache = outerCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								outerCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context !== document && context;
				}

				// Add elements passing elementMatchers directly to results
				// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context, xml ) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// Apply set filters to unmatched elements
				matchedCount += i;
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is no seed and only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			});

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			});

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
		});
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	};

	jQuery.fn.extend({
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter(function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				}) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow(this, selector || [], false) );
		},
		not: function( selector ) {
			return this.pushStack( winnow(this, selector || [], true) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	});


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && (match[1] || !context) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[1] ) {
						context = context instanceof jQuery ? context[0] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[2] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || rootjQuery ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return typeof rootjQuery.ready !== "undefined" ?
					rootjQuery.ready( selector ) :
					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.extend({
		dir: function( elem, dir, until ) {
			var matched = [],
				truncate = until !== undefined;

			while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
				if ( elem.nodeType === 1 ) {
					if ( truncate && jQuery( elem ).is( until ) ) {
						break;
					}
					matched.push( elem );
				}
			}
			return matched;
		},

		sibling: function( n, elem ) {
			var matched = [];

			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					matched.push( n );
				}
			}

			return matched;
		}
	});

	jQuery.fn.extend({
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter(function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[i] ) ) {
						return true;
					}
				}
			});
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
					// Always skip document fragments
					if ( cur.nodeType < 11 && (pos ?
						pos.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector(cur, selectors)) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.unique(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter(selector)
			);
		}
	});

	function sibling( cur, dir ) {
		while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each({
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return jQuery.dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return jQuery.dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return jQuery.dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return jQuery.sibling( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.unique( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	});
	var rnotwhite = (/\S+/g);



	// String to Object options format cache
	var optionsCache = {};

	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
		var object = optionsCache[ options ] = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		});
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			( optionsCache[ options ] || createOptions( options ) ) :
			jQuery.extend( {}, options );

		var // Last fire value (for non-forgettable lists)
			memory,
			// Flag to know if list was already fired
			fired,
			// Flag to know if list is currently firing
			firing,
			// First callback to fire (used internally by add and fireWith)
			firingStart,
			// End of the loop when firing
			firingLength,
			// Index of currently firing callback (modified by remove if needed)
			firingIndex,
			// Actual callback list
			list = [],
			// Stack of fire calls for repeatable lists
			stack = !options.once && [],
			// Fire callbacks
			fire = function( data ) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for ( ; list && firingIndex < firingLength; firingIndex++ ) {
					if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
						memory = false; // To prevent further calls using add
						break;
					}
				}
				firing = false;
				if ( list ) {
					if ( stack ) {
						if ( stack.length ) {
							fire( stack.shift() );
						}
					} else if ( memory ) {
						list = [];
					} else {
						self.disable();
					}
				}
			},
			// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
						// First, we save the current length
						var start = list.length;
						(function add( args ) {
							jQuery.each( args, function( _, arg ) {
								var type = jQuery.type( arg );
								if ( type === "function" ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && type !== "string" ) {
									// Inspect recursively
									add( arg );
								}
							});
						})( arguments );
						// Do we need to add the callbacks to the
						// current firing batch?
						if ( firing ) {
							firingLength = list.length;
						// With memory, if we're not firing then
						// we should call right away
						} else if ( memory ) {
							firingStart = start;
							fire( memory );
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function() {
					if ( list ) {
						jQuery.each( arguments, function( _, arg ) {
							var index;
							while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
								list.splice( index, 1 );
								// Handle firing indexes
								if ( firing ) {
									if ( index <= firingLength ) {
										firingLength--;
									}
									if ( index <= firingIndex ) {
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
				},
				// Remove all callbacks from the list
				empty: function() {
					list = [];
					firingLength = 0;
					return this;
				},
				// Have the list do nothing anymore
				disable: function() {
					list = stack = memory = undefined;
					return this;
				},
				// Is it disabled?
				disabled: function() {
					return !list;
				},
				// Lock the list in its current state
				lock: function() {
					stack = undefined;
					if ( !memory ) {
						self.disable();
					}
					return this;
				},
				// Is it locked?
				locked: function() {
					return !stack;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( list && ( !fired || stack ) ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						if ( firing ) {
							stack.push( args );
						} else {
							fire( args );
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend({

		Deferred: function( func ) {
			var tuples = [
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks("memory") ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred(function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[1] ](function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
									}
								});
							});
							fns = null;
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[1] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add(function() {
						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[0] ] = function() {
					deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[0] + "With" ] = list.fireWith;
			});

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject )
							.progress( updateFunc( i, progressContexts, progressValues ) );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	});


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend({
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	});

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called after the browser event has already occurred.
			// We once tried to use readyState "interactive" here, but it caused issues like the one
			// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
			if ( document.readyState === "complete" ) {
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed, false );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed, false );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[0], key ) : emptyGet;
	};


	/**
	 * Determines whether an object can have data
	 */
	jQuery.acceptData = function( owner ) {
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};


	function Data() {
		// Support: Android<4,
		// Old WebKit does not have Object.preventExtensions/freeze method,
		// return new empty object instead with no [[set]] accessor
		Object.defineProperty( this.cache = {}, 0, {
			get: function() {
				return {};
			}
		});

		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;
	Data.accepts = jQuery.acceptData;

	Data.prototype = {
		key: function( owner ) {
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return the key for a frozen object.
			if ( !Data.accepts( owner ) ) {
				return 0;
			}

			var descriptor = {},
				// Check if the owner object already has a cache key
				unlock = owner[ this.expando ];

			// If not, create one
			if ( !unlock ) {
				unlock = Data.uid++;

				// Secure it in a non-enumerable, non-writable property
				try {
					descriptor[ this.expando ] = { value: unlock };
					Object.defineProperties( owner, descriptor );

				// Support: Android<4
				// Fallback to a less secure definition
				} catch ( e ) {
					descriptor[ this.expando ] = unlock;
					jQuery.extend( owner, descriptor );
				}
			}

			// Ensure the cache object
			if ( !this.cache[ unlock ] ) {
				this.cache[ unlock ] = {};
			}

			return unlock;
		},
		set: function( owner, data, value ) {
			var prop,
				// There may be an unlock assigned to this node,
				// if there is no entry for this "owner", create one inline
				// and set the unlock as though an owner entry had always existed
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {
				// Fresh assignments by object are shallow copied
				if ( jQuery.isEmptyObject( cache ) ) {
					jQuery.extend( this.cache[ unlock ], data );
				// Otherwise, copy the properties one-by-one to the cache object
				} else {
					for ( prop in data ) {
						cache[ prop ] = data[ prop ];
					}
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			// Either a valid cache is found, or will be created.
			// New caches will be created and the unlock returned,
			// allowing direct access to the newly created
			// empty data object. A valid owner object must be provided.
			var cache = this.cache[ this.key( owner ) ];

			return key === undefined ?
				cache : cache[ key ];
		},
		access: function( owner, key, value ) {
			var stored;
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					((key && typeof key === "string") && value === undefined) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase(key) );
			}

			// [*]When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];

			if ( key === undefined ) {
				this.cache[ unlock ] = {};

			} else {
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );
					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {
						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;
				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}
		},
		hasData: function( owner ) {
			return !jQuery.isEmptyObject(
				this.cache[ owner[ this.expando ] ] || {}
			);
		},
		discard: function( owner ) {
			if ( owner[ this.expando ] ) {
				delete this.cache[ owner[ this.expando ] ];
			}
		}
	};
	var data_priv = new Data();

	var data_user = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :
						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch( e ) {}

				// Make sure we set the data so it isn't changed later
				data_user.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function( elem ) {
			return data_user.hasData( elem ) || data_priv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return data_user.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			data_user.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to data_priv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return data_priv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			data_priv.remove( elem, name );
		}
	});

	jQuery.fn.extend({
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = data_user.get( elem );

					if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice(5) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						data_priv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each(function() {
					data_user.set( this, key );
				});
			}

			return access( this, function( value ) {
				var data,
					camelKey = jQuery.camelCase( key );

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
					// Attempt to get data from the cache
					// with the key as-is
					data = data_user.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to get data from the cache
					// with the key camelized
					data = data_user.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function() {
					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = data_user.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					data_user.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf("-") !== -1 && data !== undefined ) {
						data_user.set( this, key, value );
					}
				});
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each(function() {
				data_user.remove( this, key );
			});
		}
	});


	jQuery.extend({
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = data_priv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = data_priv.access( elem, type, jQuery.makeArray(data) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return data_priv.get( elem, key ) || data_priv.access( elem, key, {
				empty: jQuery.Callbacks("once memory").add(function() {
					data_priv.remove( elem, [ type + "queue", key ] );
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[0], type );
			}

			return data === undefined ?
				this :
				this.each(function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[0] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				});
		},
		dequeue: function( type ) {
			return this.each(function() {
				jQuery.dequeue( this, type );
			});
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = data_priv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	});
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {
			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
		};

	var rcheckableType = (/^(?:checkbox|radio)$/i);



	(function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	})();
	var strundefined = typeof undefined;



	support.focusinBubbles = "onfocusin" in window;


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !(events = elemData.events) ) {
				events = elemData.events = {};
			}
			if ( !(eventHandle = elemData.handle) ) {
				eventHandle = elemData.handle = function( e ) {
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join(".")
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !(handlers = events[ type ]) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle, false );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.hasData( elem ) && data_priv.get( elem );

			if ( !elemData || !(events = elemData.events) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				delete elemData.handle;
				data_priv.remove( elem, "events" );
			}
		},

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf(".") >= 0 ) {
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === (elem.ownerDocument || document) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
					jQuery.acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
								.apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( (event.result = ret) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			// Avoid non-left-click bubbling in Firefox (#3861)
			if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.disabled !== true || event.type !== "click" ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) >= 0 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		},

		simulate: function( type, elem, event, bubble ) {
			// Piggyback on a donor event to simulate a different one.
			// Fake originalEvent to avoid donor's stopPropagation, but if the
			// simulated event prevents default then we do the same on the donor.
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true,
					originalEvent: {}
				}
			);
			if ( bubble ) {
				jQuery.event.trigger( e, null, elem );
			} else {
				jQuery.event.dispatch.call( elem, e );
			}
			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	};

	jQuery.Event = function( src, props ) {
		// Allow instantiation without the 'new' keyword
		if ( !(this instanceof jQuery.Event) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && e.preventDefault ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && e.stopPropagation ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && e.stopImmediatePropagation ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// Support: Chrome 15+
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mousenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	});

	// Support: Firefox, Chrome, Safari
	// Create "bubbling" focus and blur events
	if ( !support.focusinBubbles ) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
					jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
				};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						data_priv.remove( doc, fix );

					} else {
						data_priv.access( doc, fix, attaches );
					}
				}
			};
		});
	}

	jQuery.fn.extend({

		on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
			var origFn, type;

			// Types can be a map of types/handlers
			if ( typeof types === "object" ) {
				// ( types-Object, selector, data )
				if ( typeof selector !== "string" ) {
					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for ( type in types ) {
					this.on( type, selector, data, types[ type ], one );
				}
				return this;
			}

			if ( data == null && fn == null ) {
				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if ( fn == null ) {
				if ( typeof selector === "string" ) {
					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {
					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if ( fn === false ) {
				fn = returnFalse;
			} else if ( !fn ) {
				return this;
			}

			if ( one === 1 ) {
				origFn = fn;
				fn = function( event ) {
					// Can use an empty set, since event contains the info
					jQuery().off( event );
					return origFn.apply( this, arguments );
				};
				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
			}
			return this.each( function() {
				jQuery.event.add( this, types, fn, data, selector );
			});
		},
		one: function( types, selector, data, fn ) {
			return this.on( types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each(function() {
				jQuery.event.remove( this, types, fn, selector );
			});
		},

		trigger: function( type, data ) {
			return this.each(function() {
				jQuery.event.trigger( type, data, this );
			});
		},
		triggerHandler: function( type, data ) {
			var elem = this[0];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	});


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

		// We have to close these tags to support XHTML (#13200)
		wrapMap = {

			// Support: IE9
			option: [ 1, "<select multiple='multiple'>", "</select>" ],

			thead: [ 1, "<table>", "</table>" ],
			col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

			_default: [ 0, "", "" ]
		};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	// Support: 1.x compatibility
	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

			elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
			elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			data_priv.set(
				elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
			);
		}
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( data_priv.hasData( src ) ) {
			pdataOld = data_priv.access( src );
			pdataCur = data_priv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( data_user.hasData( src ) ) {
			udataOld = data_user.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			data_user.set( dest, udataCur );
		}
	}

	function getAll( context, tag ) {
		var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
				context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	jQuery.extend({
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		buildFragment: function( elems, context, scripts, selection ) {
			var elem, tmp, tag, wrap, contains, j,
				fragment = context.createDocumentFragment(),
				nodes = [],
				i = 0,
				l = elems.length;

			for ( ; i < l; i++ ) {
				elem = elems[ i ];

				if ( elem || elem === 0 ) {

					// Add nodes directly
					if ( jQuery.type( elem ) === "object" ) {
						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

					// Convert non-html into a text node
					} else if ( !rhtml.test( elem ) ) {
						nodes.push( context.createTextNode( elem ) );

					// Convert html into DOM nodes
					} else {
						tmp = tmp || fragment.appendChild( context.createElement("div") );

						// Deserialize a standard representation
						tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
						wrap = wrapMap[ tag ] || wrapMap._default;
						tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

						// Descend through wrappers to the right content
						j = wrap[ 0 ];
						while ( j-- ) {
							tmp = tmp.lastChild;
						}

						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, tmp.childNodes );

						// Remember the top-level container
						tmp = fragment.firstChild;

						// Ensure the created nodes are orphaned (#12392)
						tmp.textContent = "";
					}
				}
			}

			// Remove wrapper from fragment
			fragment.textContent = "";

			i = 0;
			while ( (elem = nodes[ i++ ]) ) {

				// #4087 - If origin and destination elements are the same, and this is
				// that element, do not do anything
				if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
					continue;
				}

				contains = jQuery.contains( elem.ownerDocument, elem );

				// Append to fragment
				tmp = getAll( fragment.appendChild( elem ), "script" );

				// Preserve script evaluation history
				if ( contains ) {
					setGlobalEval( tmp );
				}

				// Capture executables
				if ( scripts ) {
					j = 0;
					while ( (elem = tmp[ j++ ]) ) {
						if ( rscriptType.test( elem.type || "" ) ) {
							scripts.push( elem );
						}
					}
				}
			}

			return fragment;
		},

		cleanData: function( elems ) {
			var data, elem, type, key,
				special = jQuery.event.special,
				i = 0;

			for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
				if ( jQuery.acceptData( elem ) ) {
					key = elem[ data_priv.expando ];

					if ( key && (data = data_priv.cache[ key ]) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
						if ( data_priv.cache[ key ] ) {
							// Discard any remaining `private` data
							delete data_priv.cache[ key ];
						}
					}
				}
				// Discard any remaining `user` data
				delete data_user.cache[ elem[ data_user.expando ] ];
			}
		}
	});

	jQuery.fn.extend({
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each(function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					});
			}, null, value, arguments.length );
		},

		append: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			});
		},

		prepend: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			});
		},

		before: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			});
		},

		after: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			});
		},

		remove: function( selector, keepData /* Internal Use Only */ ) {
			var elem,
				elems = selector ? jQuery.filter( selector, this ) : this,
				i = 0;

			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}

				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}

			return this;
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; (elem = this[i]) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			});
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = value.replace( rxhtmlTag, "<$1></$2>" );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var arg = arguments[ 0 ];

			// Make the changes, replacing each context element with the new content
			this.domManip( arguments, function( elem ) {
				arg = this.parentNode;

				jQuery.cleanData( getAll( this ) );

				if ( arg ) {
					arg.replaceChild( elem, this );
				}
			});

			// Force removal if there was no new content (e.g., from empty arguments)
			return arg && (arg.length || arg.nodeType) ? this : this.remove();
		},

		detach: function( selector ) {
			return this.remove( selector, true );
		},

		domManip: function( args, callback ) {

			// Flatten any nested arrays
			args = concat.apply( [], args );

			var fragment, first, scripts, hasScripts, node, doc,
				i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[ 0 ],
				isFunction = jQuery.isFunction( value );

			// We can't cloneNode fragments that contain checked, in WebKit
			if ( isFunction ||
					( l > 1 && typeof value === "string" &&
						!support.checkClone && rchecked.test( value ) ) ) {
				return this.each(function( index ) {
					var self = set.eq( index );
					if ( isFunction ) {
						args[ 0 ] = value.call( this, index, self.html() );
					}
					self.domManip( args, callback );
				});
			}

			if ( l ) {
				fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
				first = fragment.firstChild;

				if ( fragment.childNodes.length === 1 ) {
					fragment = first;
				}

				if ( first ) {
					scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
					hasScripts = scripts.length;

					// Use the original fragment for the last item instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for ( ; i < l; i++ ) {
						node = fragment;

						if ( i !== iNoClone ) {
							node = jQuery.clone( node, true, true );

							// Keep references to cloned scripts for later restoration
							if ( hasScripts ) {
								// Support: QtWebKit
								// jQuery.merge because push.apply(_, arraylike) throws
								jQuery.merge( scripts, getAll( node, "script" ) );
							}
						}

						callback.call( this[ i ], node, i );
					}

					if ( hasScripts ) {
						doc = scripts[ scripts.length - 1 ].ownerDocument;

						// Reenable scripts
						jQuery.map( scripts, restoreScript );

						// Evaluate executable scripts on first document insertion
						for ( i = 0; i < hasScripts; i++ ) {
							node = scripts[ i ];
							if ( rscriptType.test( node.type || "" ) &&
								!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

								if ( node.src ) {
									// Optional AJAX dependency, but won't run scripts if not present
									if ( jQuery._evalUrl ) {
										jQuery._evalUrl( node.src );
									}
								} else {
									jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
								}
							}
						}
					}
				}
			}

			return this;
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	});


	var iframe,
		elemdisplay = {};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */
	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var style,
			elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			// getDefaultComputedStyle might be reliably used only on attached element
			display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

				// Use of this method is a temporary fix (more like optimization) until something better comes along,
				// since it was removed from specification and supported only in FF
				style.display : jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = (/^margin/);

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {
			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			if ( elem.ownerDocument.defaultView.opener ) {
				return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
			}

			return window.getComputedStyle( elem, null );
		};



	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];
		}

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// Support: iOS < 6
			// A tribute to the "awesome hack by Dean Edwards"
			// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?
			// Support: IE
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply( this, arguments );
			}
		};
	}


	(function() {
		var pixelPositionVal, boxSizingReliableVal,
			docElem = document.documentElement,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
			"position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computePixelPositionAndBoxSizingReliable() {
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
				"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
				"border:1px;padding:1px;width:4px;position:absolute";
			div.innerHTML = "";
			docElem.appendChild( container );

			var divStyle = window.getComputedStyle( div, null );
			pixelPositionVal = divStyle.top !== "1%";
			boxSizingReliableVal = divStyle.width === "4px";

			docElem.removeChild( container );
		}

		// Support: node.js jsdom
		// Don't assume that getComputedStyle is a property of the global object
		if ( window.getComputedStyle ) {
			jQuery.extend( support, {
				pixelPosition: function() {

					// This test is executed only once but we still do memoizing
					// since we can use the boxSizingReliable pre-computing.
					// No need to check if the test was already performed, though.
					computePixelPositionAndBoxSizingReliable();
					return pixelPositionVal;
				},
				boxSizingReliable: function() {
					if ( boxSizingReliableVal == null ) {
						computePixelPositionAndBoxSizingReliable();
					}
					return boxSizingReliableVal;
				},
				reliableMarginRight: function() {

					// Support: Android 2.3
					// Check if div with explicit width and no margin-right incorrectly
					// gets computed margin-right based on width of container. (#3333)
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// This support function is only executed once so no memoizing is needed.
					var ret,
						marginDiv = div.appendChild( document.createElement( "div" ) );

					// Reset CSS: box-sizing; display; margin; border; padding
					marginDiv.style.cssText = div.style.cssText =
						// Support: Firefox<29, Android 2.3
						// Vendor-prefix box-sizing
						"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
						"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
					marginDiv.style.marginRight = marginDiv.style.width = "0";
					div.style.width = "1px";
					docElem.appendChild( container );

					ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

					docElem.removeChild( container );
					div.removeChild( marginDiv );

					return ret;
				}
			});
		}
	})();


	// A method for quickly swapping in/out CSS properties to get correct calculations.
	jQuery.swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var
		// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
		rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( style, name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in style ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in style ) {
				return name;
			}
		}

		return origName;
	}

	function setPositiveNumber( elem, value, subtract ) {
		var matches = rnumsplit.exec( value );
		return matches ?
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
			// If we already have the right measurement, avoid augmentation
			4 :
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {
			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test(val) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = data_priv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && (ret = rrelNum.exec( value )) ) {
					value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number, add 'px' to the (except for certain CSS properties)
				if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
					value += "px";
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
					style[ name ] = value;
				}

			} else {
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
			}
			return val;
		}
	});

	jQuery.each([ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
						jQuery.swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						}) :
						getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var styles = extra && getStyles( elem );
				return setPositiveNumber( elem, value, extra ?
					augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					) : 0
				);
			}
		};
	});

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return jQuery.swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each(function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			});
		}
	});


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				if ( tween.elem[ tween.prop ] != null &&
					(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		}
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
		rrun = /queueHooks$/,
		animationPrefilters = [ defaultPrefilter ],
		tweeners = {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value ),
					target = tween.cur(),
					parts = rfxnum.exec( value ),
					unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

					// Starting value computation is required for potential unit mismatches
					start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
						rfxnum.exec( jQuery.css( tween.elem, prop ) ),
					scale = 1,
					maxIterations = 20;

				if ( start && start[ 3 ] !== unit ) {
					// Trust units reported by jQuery.css
					unit = unit || start[ 3 ];

					// Make sure we update the tween properties later on
					parts = parts || [];

					// Iteratively approximate from a nonzero starting point
					start = +target || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*.
						// Use string for doubling so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur(),
					// break the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				// Update tween properties
				if ( parts ) {
					start = tween.start = +start || +target || 0;
					tween.unit = unit;
					// If a +=/-= token was provided, we're doing a relative animation
					tween.end = parts[ 1 ] ?
						start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
						+parts[ 2 ];
				}

				return tween;
			} ]
		};

	// Animations created synchronously will run synchronously
	function createFxNow() {
		setTimeout(function() {
			fxNow = undefined;
		});
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( (tween = collection[ index ].call( animation, prop, value )) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = data_priv.get( elem, "fxshow" );

		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function() {
				// Ensure the complete handler is called before this completes
				anim.always(function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = data_priv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done(function() {
					jQuery( elem ).hide();
				});
			}
			anim.done(function() {
				var prop;

				data_priv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			});
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = animationPrefilters.length,
			deferred = jQuery.Deferred().always( function() {
				// Don't match elem in the :animated selector
				delete tick.elem;
			}),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ]);

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, { specialEasing: {} }, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			}),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			})
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.split(" ");
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				tweeners[ prop ] = tweeners[ prop ] || [];
				tweeners[ prop ].unshift( callback );
			}
		},

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				animationPrefilters.unshift( callback );
			} else {
				animationPrefilters.push( callback );
			}
		}
	});

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate({ opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || data_priv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = data_priv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			});
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each(function() {
				var index,
					data = data_priv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;

	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		clearInterval( timerId );
		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	};


	(function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();


	var nodeHook, boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each(function() {
				jQuery.removeAttr( this, name );
			});
		}
	});

	jQuery.extend({
		attr: function( elem, name, value ) {
			var hooks, ret,
				nType = elem.nodeType;

			// don't get/set attributes on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === strundefined ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
			}

			if ( value !== undefined ) {

				if ( value === null ) {
					jQuery.removeAttr( elem, name );

				} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
					return ret;

				} else {
					elem.setAttribute( name, value + "" );
					return value;
				}

			} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				ret = jQuery.find.attr( elem, name );

				// Non-existent attributes return null, we normalize to undefined
				return ret == null ?
					undefined :
					ret;
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( (name = attrNames[i++]) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {
						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	});




	var rfocusable = /^(?:input|select|textarea|button)$/i;

	jQuery.fn.extend({
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each(function() {
				delete this[ jQuery.propFix[ name ] || name ];
			});
		}
	});

	jQuery.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},

		prop: function( elem, name, value ) {
			var ret, hooks, notxml,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

			if ( notxml ) {
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
					ret :
					( elem[ name ] = value );

			} else {
				return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
					ret :
					elem[ name ];
			}
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {
					return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
						elem.tabIndex :
						-1;
				}
			}
		}
	});

	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			}
		};
	}

	jQuery.each([
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	});




	var rclass = /[\t\r\n\f]/g;

	jQuery.fn.extend({
		addClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = typeof value === "string" && value,
				i = 0,
				len = this.length;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).addClass( value.call( this, j, this.className ) );
				});
			}

			if ( proceed ) {
				// The disjunction here is for better compressibility (see removeClass)
				classes = ( value || "" ).match( rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						" "
					);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = arguments.length === 0 || typeof value === "string" && value,
				i = 0,
				len = this.length;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).removeClass( value.call( this, j, this.className ) );
				});
			}
			if ( proceed ) {
				classes = ( value || "" ).match( rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						""
					);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = value ? jQuery.trim( cur ) : "";
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( i ) {
					jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
				});
			}

			return this.each(function() {
				if ( type === "string" ) {
					// Toggle individual class names
					var className,
						i = 0,
						self = jQuery( this ),
						classNames = value.match( rnotwhite ) || [];

					while ( (className = classNames[ i++ ]) ) {
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( type === strundefined || type === "boolean" ) {
					if ( this.className ) {
						// store className if set
						data_priv.set( this, "__className__", this.className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
				}
			});
		},

		hasClass: function( selector ) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for ( ; i < l; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			}

			return false;
		}
	});




	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[0];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?
						// Handle most common string cases
						ret.replace(rreturn, "") :
						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each(function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function( elem ) {
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						jQuery.trim( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE6-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});




	// Return jQuery for attributes-only inclusion


	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	});

	jQuery.fn.extend({
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		},

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
		}
	});


	var nonce = jQuery.now();

	var rquery = (/\?/);



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Document location
		ajaxLocation = window.location.href,

		// Segment location into parts
		ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {
				// For each dataType in the dataTypeExpression
				while ( (dataType = dataTypes[i++]) ) {
					// Prepend if requested
					if ( dataType[0] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

					// Otherwise append
					} else {
						(structure[ dataType ] = structure[ dataType ] || []).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			});
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s[ "throws" ] ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,
				// URL without anti-cache param
				cacheURL,
				// Response headers
				responseHeadersString,
				responseHeaders,
				// timeout handle
				timeoutTimer,
				// Cross-domain detection vars
				parts,
				// To know if global events are to be dispatched
				fireGlobals,
				// Loop variable
				i,
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
				// Callbacks context
				callbackContext = s.context || s,
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
				// The jqXHR state
				state = 0,
				// Default abort message
				strAbort = "canceled",
				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( (match = rheaders.exec( responseHeadersString )) ) {
									responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
				.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when we have a protocol:host:port mismatch
			if ( s.crossDomain == null ) {
				parts = rurl.exec( s.url.toLowerCase() );
				s.crossDomain = !!( parts &&
					( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
						( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
							( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
				);
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
					s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = setTimeout(function() {
						jqXHR.abort("timeout");
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	});

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			});
		};
	});


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};


	jQuery.fn.extend({
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapAll( html.call(this, i) );
				});
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map(function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapInner( html.call(this, i) );
				});
			}

			return this.each(function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			});
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each(function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
			});
		},

		unwrap: function() {
			return this.parent().each(function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			}).end();
		}
	});


	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};
	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
					// Treat each array item as a scalar.
					add( prefix, v );

				} else {
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
				}
			});

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {
			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend({
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map(function() {
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			})
			.filter(function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			})
			.map(function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						}) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			}).get();
		}
	});


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new XMLHttpRequest();
		} catch( e ) {}
	};

	var xhrId = 0,
		xhrCallbacks = {},
		xhrSuccessStatus = {
			// file protocol always yields status code 0, assume 200
			0: 200,
			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	// Support: IE9
	// Open requests must be manually aborted on unload (#5280)
	// See https://support.microsoft.com/kb/2856746 for more info
	if ( window.attachEvent ) {
		window.attachEvent( "onunload", function() {
			for ( var key in xhrCallbacks ) {
				xhrCallbacks[ key ]();
			}
		});
	}

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function( options ) {
		var callback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								delete xhrCallbacks[ id ];
								callback = xhr.onload = xhr.onerror = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
									complete(
										// file: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
										// Support: IE9
										// Accessing binary-data responseText throws an exception
										// (#11426)
										typeof xhr.responseText === "string" ? {
											text: xhr.responseText
										} : undefined,
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					xhr.onerror = callback("error");

					// Create the abort callback
					callback = xhrCallbacks[ id ] = callback("abort");

					try {
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});




	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery("<script>").prop({
						async: true,
						charset: s.scriptCharset,
						src: s.url
					}).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function() {
				// Restore preexisting value
				window[ callbackName ] = overwritten;

				// Save back as free
				if ( s[ callbackName ] ) {
					// make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});




	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf(" ");

		if ( off >= 0 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax({
				url: url,

				// if "type" variable is undefined, then "GET" method will be used
				type: type,
				dataType: "html",
				data: params
			}).done(function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			}).complete( callback && function( jqXHR, status ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			});
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	});




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};




	var docElem = window.document.documentElement;

	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {
				options = options.call( elem, i, curOffset );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend({
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each(function( i ) {
						jQuery.offset.setOffset( this, options, i );
					});
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			// Support: BlackBerry 5, iOS 3 (original iPhone)
			// If we don't have gBCR, just use 0,0 rather than error
			if ( typeof elem.getBoundingClientRect !== strundefined ) {
				box = elem.getBoundingClientRect();
			}
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {
				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || docElem;

				while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || docElem;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : window.pageXOffset,
						top ? val : window.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length, null );
		};
	});

	// Support: Safari<7+, Chrome<37+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	});


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		});
	});


	// The number of elements contained in the matched element set
	jQuery.fn.size = function() {
		return this.length;
	};

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}




	var
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( typeof noGlobal === strundefined ) {
		window.jQuery = window.$ = jQuery;
	}




	return jQuery;

	}));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var jThreeObject = __webpack_require__(5);
	var AssociativeArray = __webpack_require__(8);
	var JThreeEvent = __webpack_require__(12);
	var GomlNodeDictionary = (function (_super) {
	    __extends(GomlNodeDictionary, _super);
	    function GomlNodeDictionary() {
	        _super.apply(this, arguments);
	        this.dictionary = new AssociativeArray();
	        this.onAliasMemberChanged = new AssociativeArray();
	    }
	    GomlNodeDictionary.prototype.addObject = function (alias, name, obj) {
	        if (!this.dictionary.has(alias)) {
	            this.dictionary.set(alias, new AssociativeArray());
	            this.onAliasMemberChanged.set(alias, new JThreeEvent());
	        }
	        this.dictionary.get(alias).set(name, obj);
	        this.onAliasMemberChanged.get(alias).fire(this, obj);
	    };
	    GomlNodeDictionary.prototype.hasAlias = function (alias) {
	        return this.dictionary.has(alias);
	    };
	    GomlNodeDictionary.prototype.getObject = function (alias, name) {
	        if (!this.dictionary.has(alias)) {
	            console.error("there is no such alias");
	            return null;
	        }
	        else {
	            return this.dictionary.get(alias).get(name);
	        }
	    };
	    GomlNodeDictionary.prototype.getAliasMap = function (alias) {
	        return this.dictionary.get(alias);
	    };
	    GomlNodeDictionary.prototype.onAliasObjectChanged = function (alias, handler) {
	        if (this.hasAlias(alias)) {
	            this.onAliasMemberChanged.get(alias).addListerner(handler);
	        }
	        else {
	            console.warn("there is no such alias");
	        }
	    };
	    return GomlNodeDictionary;
	})(jThreeObject);
	module.exports = GomlNodeDictionary;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var Exceptions = __webpack_require__(9);
	var JThreeEvent = (function (_super) {
	    __extends(JThreeEvent, _super);
	    function JThreeEvent() {
	        _super.call(this);
	        this.eventHandlers = [];
	    }
	    JThreeEvent.prototype.fire = function (object, eventArg) {
	        this.eventHandlers.forEach(function (h) { return h(object, eventArg); });
	    };
	    JThreeEvent.prototype.addListerner = function (handler) {
	        if (typeof handler === 'undefined')
	            throw new Exceptions.InvalidArgumentException("you can not add undefined as event handler");
	        this.eventHandlers.push(handler);
	    };
	    JThreeEvent.prototype.removeListener = function (handler) {
	        for (var i = 0; i < this.eventHandlers.length; i++) {
	            var val = this.eventHandlers[i];
	            if (val === handler) {
	                this.eventHandlers.splice(i, 1);
	                break;
	            }
	        }
	    };
	    return JThreeEvent;
	})(JThreeObject);
	module.exports = JThreeEvent;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var AssociativeArray = __webpack_require__(8);
	var ComponentRegistry = (function (_super) {
	    __extends(ComponentRegistry, _super);
	    function ComponentRegistry() {
	        _super.call(this);
	        this.components = new AssociativeArray();
	    }
	    ComponentRegistry.prototype.addComponent = function (components) {
	        for (var componentKey in components) {
	            var component = components[componentKey];
	            this.components.set(componentKey, component);
	        }
	    };
	    ComponentRegistry.prototype.getComponent = function (componentName) {
	        return this.components.get(componentName);
	    };
	    return ComponentRegistry;
	})(JThreeObject);
	module.exports = ComponentRegistry;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var AssociativeArray = __webpack_require__(8);
	var GomlLoaderConigurator = (function (_super) {
	    __extends(GomlLoaderConigurator, _super);
	    function GomlLoaderConigurator() {
	        _super.call(this);
	        this.rootNodes = [];
	        this.easingFunctions = new AssociativeArray();
	        this.converters = new AssociativeArray();
	        this.gomlTagFactories = new AssociativeArray();
	        this.initializeRootObjectNames();
	        this.initializeEasingFunctions();
	        this.initializeConverters();
	        this.initializeGomlTags();
	    }
	    GomlLoaderConigurator.prototype.getConverter = function (name) {
	        return this.converters.get(name);
	    };
	    GomlLoaderConigurator.prototype.getEasingFunction = function (name) {
	        return this.easingFunctions.get(name);
	    };
	    GomlLoaderConigurator.prototype.getGomlTagFactory = function (tagName) {
	        return this.gomlTagFactories.get(tagName);
	    };
	    Object.defineProperty(GomlLoaderConigurator.prototype, "GomlRootNodes", {
	        get: function () {
	            return this.rootNodes;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    GomlLoaderConigurator.prototype.initializeRootObjectNames = function () {
	        this.rootNodes = __webpack_require__(19);
	    };
	    GomlLoaderConigurator.prototype.initializeEasingFunctions = function () {
	        this.loadIntoAssociativeArray(this.easingFunctions, __webpack_require__(15));
	    };
	    GomlLoaderConigurator.prototype.initializeConverters = function () {
	        this.loadIntoAssociativeArray(this.converters, __webpack_require__(20));
	    };
	    GomlLoaderConigurator.prototype.initializeGomlTags = function () {
	        var _this = this;
	        var newList = __webpack_require__(48);
	        newList.forEach(function (v) {
	            for (var key in v.NodeTypes) {
	                var keyInString = key;
	                keyInString = keyInString.toUpperCase();
	                var nodeType = v.NodeTypes[keyInString];
	                var tag = new v.Factory(keyInString, nodeType);
	                _this.gomlTagFactories.set(tag.TagName, tag);
	            }
	        });
	    };
	    GomlLoaderConigurator.prototype.loadIntoAssociativeArray = function (targetArray, list) {
	        for (var key in list) {
	            var type = list[key];
	            targetArray.set(key, new type());
	        }
	    };
	    return GomlLoaderConigurator;
	})(JThreeObject);
	module.exports = GomlLoaderConigurator;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var easingFunction = {
	    "linear": __webpack_require__(16),
	    "swing": __webpack_require__(18)
	};
	module.exports = easingFunction;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var EasingFunctionBase = __webpack_require__(17);
	var LinearEasingFunction = (function (_super) {
	    __extends(LinearEasingFunction, _super);
	    function LinearEasingFunction() {
	        _super.apply(this, arguments);
	    }
	    LinearEasingFunction.prototype.Ease = function (begin, end, progress) {
	        return begin + (end - begin) * progress;
	    };
	    return LinearEasingFunction;
	})(EasingFunctionBase);
	module.exports = LinearEasingFunction;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var EasingFunctionBase = (function (_super) {
	    __extends(EasingFunctionBase, _super);
	    function EasingFunctionBase() {
	        _super.apply(this, arguments);
	    }
	    EasingFunctionBase.prototype.Ease = function (begin, end, progress) {
	        return null;
	    };
	    return EasingFunctionBase;
	})(JThreeObject);
	module.exports = EasingFunctionBase;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var EasingFunctionBase = __webpack_require__(17);
	var SwingEasingFunction = (function (_super) {
	    __extends(SwingEasingFunction, _super);
	    function SwingEasingFunction() {
	        _super.apply(this, arguments);
	    }
	    SwingEasingFunction.prototype.Ease = function (begin, end, progress) {
	        var p = 0.5 - Math.cos(progress * Math.PI) / 2;
	        return begin + (end - begin) * p;
	    };
	    return SwingEasingFunction;
	})(EasingFunctionBase);
	module.exports = SwingEasingFunction;


/***/ },
/* 19 */
/***/ function(module, exports) {

	var topNodes = [
	    "renderers",
	    "resources",
	    "templates",
	    "scenes"
	];
	module.exports = topNodes;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var converterList = {
	    "angle": __webpack_require__(21),
	    "number": __webpack_require__(28),
	    "vector3": __webpack_require__(33),
	    "rotation": __webpack_require__(35),
	    "color4": __webpack_require__(37),
	    "color3": __webpack_require__(42),
	    "boolean": __webpack_require__(44),
	    "integer": __webpack_require__(45),
	    "string": __webpack_require__(47)
	};
	module.exports = converterList;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Exceptions = __webpack_require__(9);
	var AttributeParser = __webpack_require__(22);
	var AttributeConverterBase = __webpack_require__(27);
	var AngleAttributeConverter = (function (_super) {
	    __extends(AngleAttributeConverter, _super);
	    function AngleAttributeConverter() {
	        _super.call(this);
	    }
	    AngleAttributeConverter.prototype.ToAttribute = function (val) {
	        return val;
	    };
	    AngleAttributeConverter.prototype.FromAttribute = function (attr) {
	        return AttributeParser.ParseAngle(attr);
	    };
	    AngleAttributeConverter.prototype.FromInterface = function (val) {
	        if (typeof val === 'string') {
	            return this.FromAttribute(val);
	        }
	        else if (typeof val === 'number') {
	            return val;
	        }
	        throw new Exceptions.InvalidArgumentException("val can't parse");
	    };
	    return AngleAttributeConverter;
	})(AttributeConverterBase);
	module.exports = AngleAttributeConverter;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var jThreeObject = __webpack_require__(5);
	var Quaternion = __webpack_require__(23);
	var Vector3 = __webpack_require__(24);
	var AttributeParser = (function (_super) {
	    __extends(AttributeParser, _super);
	    function AttributeParser() {
	        _super.apply(this, arguments);
	    }
	    AttributeParser.ParseAngle = function (input) {
	        if (input.match(/^p$/))
	            return Math.PI;
	        var isDegree = input.match(/[0-9E/\(\)\.-]+d$/);
	        var needPiMultiply = input.match(/[0-9E/\(\)\.-]+p/);
	        var replaced = input.replace(/^([0-9E/\(\)\.-]+)p?d?$/, '$1');
	        var evalued = eval(replaced);
	        if (isDegree != null) {
	            evalued *= 2 * Math.PI / 360;
	        }
	        if (needPiMultiply != null) {
	            evalued *= Math.PI;
	        }
	        return evalued;
	    };
	    AttributeParser.ParseRotation3D = function (input) {
	        if (input.match(/^[xyz]\(.+\)$/)) {
	            var signature = input.replace(/^([xyz])\(.+\)$/, "$1");
	            var value = input.replace(/^[xyz]\((.+)\)$/, "$1");
	            var angle = AttributeParser.ParseAngle(value);
	            if (signature == 'x') {
	                return Quaternion.AngleAxis(angle, Vector3.XUnit);
	            }
	            else if (signature == 'y') {
	                return Quaternion.AngleAxis(angle, Vector3.YUnit);
	            }
	            else {
	                return Quaternion.AngleAxis(angle, Vector3.ZUnit);
	            }
	        }
	        else if (input.match(/^eular\([0-9E/\(\)\.]+p?d?,[0-9E/\(\)\.]+p?d?,[0-9E/\(\)\.]+p?d?\)$/)) {
	            var angles = input.replace(/^eular\(([0-9E/\(\)\.]+p?d?),([0-9E/\(\)\.]+p?d?),([0-9E/\(\)\.]+p?d?)\)$/, "$1,$2,$3");
	            var splitted = angles.split(/,/);
	            return Quaternion.Eular(AttributeParser.ParseAngle(splitted[0]), AttributeParser.ParseAngle(splitted[1]), AttributeParser.ParseAngle(splitted[2]));
	        }
	        else if (input.match(/^axis\([0-9E/\(\)\.-]+p?d?,[\d\.]+,[\d\.]+,[\d\.]\)$/)) {
	            var angles = input.replace(/^axis\(([0-9E/\(\)\.-]+p?d?),([\d\.]+),([\d\.]+),([\d\.]+)\)$/, "$1,$2,$3,$4");
	            var splitted = angles.split(/,/);
	            return Quaternion.AngleAxis(AttributeParser.ParseAngle(splitted[0]), new Vector3(parseFloat(splitted[1]), parseFloat(splitted[2]), parseFloat(splitted[3])));
	        }
	        return null;
	    };
	    return AttributeParser;
	})(jThreeObject);
	module.exports = AttributeParser;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var Vector3 = __webpack_require__(24);
	var glm = __webpack_require__(26);
	var Quaternion = (function (_super) {
	    __extends(Quaternion, _super);
	    function Quaternion(targetQuat) {
	        _super.call(this);
	        this.targetQuat = targetQuat;
	    }
	    Object.defineProperty(Quaternion, "Identity", {
	        get: function () {
	            return new Quaternion(glm.quat.create());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Quaternion.prototype, "X", {
	        get: function () {
	            return this.targetQuat[0];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Quaternion.prototype, "Y", {
	        get: function () {
	            return this.targetQuat[1];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Quaternion.prototype, "Z", {
	        get: function () {
	            return this.targetQuat[2];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Quaternion.prototype, "W", {
	        get: function () {
	            return this.targetQuat[3];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Quaternion.prototype, "ImaginaryPart", {
	        get: function () {
	            return new Vector3(this.X, this.Y, this.Z);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Quaternion.prototype, "Conjugate", {
	        get: function () {
	            var newQuat = glm.quat.create();
	            return new Quaternion(glm.quat.conjugate(newQuat, this.targetQuat));
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Quaternion.prototype, "Length", {
	        get: function () {
	            return glm.quat.len(this.targetQuat);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Quaternion.prototype.Normalize = function () {
	        var newQuat = glm.quat.create();
	        return new Quaternion(glm.quat.normalize(newQuat, this.targetQuat));
	    };
	    Quaternion.prototype.Inverse = function () {
	        var newQuat = glm.quat.create();
	        return new Quaternion(glm.quat.invert(newQuat, this.targetQuat));
	    };
	    Quaternion.Add = function (q1, q2) {
	        var newQuat = glm.quat.create();
	        return new Quaternion(glm.quat.add(newQuat, q1.targetQuat, q2.targetQuat));
	    };
	    Quaternion.Multiply = function (q1, q2) {
	        var newQuat = glm.quat.create();
	        return new Quaternion(glm.quat.mul(newQuat, q1.targetQuat, q2.targetQuat));
	    };
	    Quaternion.AngleAxis = function (angle, axis) {
	        var axisVec = glm.vec3.create();
	        axisVec[0] = axis.X;
	        axisVec[1] = axis.Y;
	        axisVec[2] = axis.Z;
	        var newQuat = glm.quat.create();
	        return new Quaternion(glm.quat.setAxisAngle(newQuat, axisVec, angle));
	    };
	    Quaternion.Eular = function (x, y, z) {
	        return Quaternion.Multiply(Quaternion.AngleAxis(z, Vector3.ZUnit), Quaternion.Multiply(Quaternion.AngleAxis(x, Vector3.XUnit), Quaternion.AngleAxis(y, Vector3.YUnit)));
	    };
	    Quaternion.Slerp = function (q1, q2, t) {
	        var newQuat = glm.quat.create();
	        return new Quaternion(glm.quat.slerp(newQuat, q1.targetQuat, q2.targetQuat, t));
	    };
	    Quaternion.prototype.toAngleAxisString = function () {
	        var angle = 2 * Math.acos(this.W);
	        var imm = Math.sqrt(1 - this.W * this.W);
	        if (angle != 180 && angle != 0) {
	            return "axis(" + angle + "," + this.X / imm + "," + this.Y / imm + "," + this.Z / imm + ")";
	        }
	        else if (angle == 0) {
	            return "axis(" + angle + ",0,1,0)";
	        }
	        else {
	            return "axis(180d," + this.X + "," + this.Y + "," + this.Z + ")";
	        }
	    };
	    return Quaternion;
	})(JThreeObject);
	module.exports = Quaternion;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var VectorBase = __webpack_require__(25);
	var glm = __webpack_require__(26);
	var Vector3 = (function (_super) {
	    __extends(Vector3, _super);
	    function Vector3(x, y, z) {
	        _super.call(this);
	        if (typeof y === 'undefined') {
	            this.targetVector = x;
	            return;
	        }
	        this.targetVector = [x, y, z];
	    }
	    Object.defineProperty(Vector3, "XUnit", {
	        get: function () {
	            return new Vector3(1, 0, 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector3, "YUnit", {
	        get: function () {
	            return new Vector3(0, 1, 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector3, "ZUnit", {
	        get: function () {
	            return new Vector3(0, 0, 1);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector3, "Zero", {
	        get: function () {
	            return new Vector3(0, 0, 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector3.prototype, "X", {
	        get: function () {
	            return this.targetVector[0];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector3.prototype, "Y", {
	        get: function () {
	            return this.targetVector[1];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector3.prototype, "Z", {
	        get: function () {
	            return this.targetVector[2];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Vector3.dot = function (v1, v2) {
	        return glm.vec2.dot(v1.targetVector, v2.targetVector);
	    };
	    Vector3.add = function (v1, v2) {
	        var newVec = glm.vec3.create();
	        return new Vector3(glm.vec3.add(newVec, v1.targetVector, v2.targetVector));
	    };
	    Vector3.subtract = function (v1, v2) {
	        var newVec = glm.vec3.create();
	        return new Vector3(glm.vec3.sub(newVec, v1.targetVector, v2.targetVector));
	    };
	    Vector3.multiply = function (s, v) {
	        var newVec = glm.vec3.create();
	        return new Vector3(glm.vec3.scale(newVec, v.targetVector, s));
	    };
	    Vector3.negate = function (v1) {
	        return Vector3.multiply(-1, v1);
	    };
	    Vector3.equal = function (v1, v2) {
	        return VectorBase.elementEqual(v1, v2);
	    };
	    Vector3.normalize = function (v1) {
	        var newVec = glm.vec3.create();
	        return new Vector3(glm.vec3.normalize(newVec, v1.targetVector));
	    };
	    Vector3.cross = function (v1, v2) {
	        var newVec = glm.vec3.create();
	        return new Vector3(glm.vec3.cross(newVec, v1.targetVector, v2.targetVector));
	    };
	    Vector3.prototype.normalizeThis = function () {
	        return Vector3.normalize(this);
	    };
	    Vector3.prototype.dotWith = function (v) {
	        return Vector3.dot(this, v);
	    };
	    Vector3.prototype.addWith = function (v) {
	        return Vector3.add(this, v);
	    };
	    Vector3.prototype.subtractWith = function (v) {
	        return Vector3.subtract(this, v);
	    };
	    Vector3.prototype.multiplyWith = function (s) {
	        return Vector3.multiply(s, this);
	    };
	    Vector3.prototype.negateThis = function () {
	        return Vector3.negate(this);
	    };
	    Vector3.prototype.equalWith = function (v) {
	        return Vector3.equal(this, v);
	    };
	    Vector3.prototype.crossWith = function (v) {
	        return Vector3.cross(this, v);
	    };
	    Vector3.prototype.toString = function () {
	        return "Vector3(" + this.X + ", " + this.Y + ", " + this.Z + ")";
	    };
	    Object.defineProperty(Vector3.prototype, "ElementCount", {
	        get: function () { return 3; },
	        enumerable: true,
	        configurable: true
	    });
	    Vector3.parse = function (str) {
	        var resultVec;
	        var negativeMatch = str.match(/^-n?(\(.+\))$/);
	        var needNegate = false;
	        if (negativeMatch) {
	            needNegate = true;
	            str = negativeMatch[1];
	        }
	        var normalizeMatch = str.match(/^n(\(.+\))$/);
	        var needNormalize = false;
	        if (normalizeMatch) {
	            needNormalize = true;
	            str = normalizeMatch[1];
	        }
	        str = str.match(/^n?\(?([^\)]+)\)?$/)[1];
	        var strNums = str.split(/,/g);
	        if (strNums.length == 1) {
	            var elemNum = parseFloat(strNums[0]);
	            resultVec = new Vector3(elemNum, elemNum, elemNum);
	        }
	        else if (strNums.length == 3) {
	            resultVec = new Vector3(parseFloat(strNums[0]), parseFloat(strNums[1]), parseFloat(strNums[2]));
	        }
	        else {
	            throw Error("passed argument was invalid");
	        }
	        if (needNormalize)
	            resultVec = resultVec.normalizeThis();
	        if (needNegate)
	            resultVec = resultVec.negateThis();
	        return resultVec;
	    };
	    return Vector3;
	})(VectorBase);
	module.exports = Vector3;


/***/ },
/* 25 */
/***/ function(module, exports) {

	var VectorBase = (function () {
	    function VectorBase() {
	        this.magnitudeSquaredCache = -1;
	        this.magnitudeCache = -1;
	    }
	    Object.defineProperty(VectorBase.prototype, "magnitudeSquared", {
	        get: function () {
	            if (this.magnitudeSquaredCache < 0) {
	                var sum = 0;
	                var r = this.RawElements;
	                for (var i = 0; i < this.ElementCount; i++) {
	                    sum += r[i] * r[i];
	                }
	                this.magnitudeSquaredCache = sum;
	            }
	            return this.magnitudeSquaredCache;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    VectorBase.elementEqual = function (v1, v2) {
	        if (v1.ElementCount !== v2.ElementCount)
	            return false;
	        for (var i = 0; i < v1.ElementCount; i++) {
	            if (v1.RawElements[i] !== v2.RawElements[i])
	                return false;
	        }
	        return true;
	    };
	    Object.defineProperty(VectorBase.prototype, "magnitude", {
	        get: function () {
	            if (this.magnitudeCache < 0) {
	                this.magnitudeCache = Math.sqrt(this.magnitudeSquared);
	            }
	            return this.magnitudeCache;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(VectorBase.prototype, "ElementCount", {
	        get: function () {
	            return 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(VectorBase.prototype, "RawElements", {
	        get: function () {
	            return null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return VectorBase;
	})();
	module.exports = VectorBase;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @fileoverview gl-matrix - High performance matrix and vector operations
	 * @author Brandon Jones
	 * @author Colin MacKenzie IV
	 * @version 2.3.0
	 */

	/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE. */

	!function(t,n){if(true)module.exports=n();else if("function"==typeof define&&define.amd)define(n);else{var r=n();for(var a in r)("object"==typeof exports?exports:t)[a]=r[a]}}(this,function(){return function(t){function n(a){if(r[a])return r[a].exports;var e=r[a]={exports:{},id:a,loaded:!1};return t[a].call(e.exports,e,e.exports,n),e.loaded=!0,e.exports}var r={};return n.m=t,n.c=r,n.p="",n(0)}([function(t,n,r){n.glMatrix=r(1),n.mat2=r(2),n.mat2d=r(3),n.mat3=r(4),n.mat4=r(5),n.quat=r(6),n.vec2=r(9),n.vec3=r(7),n.vec4=r(8)},function(t,n){var r={};r.EPSILON=1e-6,r.ARRAY_TYPE="undefined"!=typeof Float32Array?Float32Array:Array,r.RANDOM=Math.random,r.setMatrixArrayType=function(t){GLMAT_ARRAY_TYPE=t};var a=Math.PI/180;r.toRadian=function(t){return t*a},t.exports=r},function(t,n,r){var a=r(1),e={};e.create=function(){var t=new a.ARRAY_TYPE(4);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t},e.clone=function(t){var n=new a.ARRAY_TYPE(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n},e.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t},e.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t},e.transpose=function(t,n){if(t===n){var r=n[1];t[1]=n[2],t[2]=r}else t[0]=n[0],t[1]=n[2],t[2]=n[1],t[3]=n[3];return t},e.invert=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r*u-e*a;return o?(o=1/o,t[0]=u*o,t[1]=-a*o,t[2]=-e*o,t[3]=r*o,t):null},e.adjoint=function(t,n){var r=n[0];return t[0]=n[3],t[1]=-n[1],t[2]=-n[2],t[3]=r,t},e.determinant=function(t){return t[0]*t[3]-t[2]*t[1]},e.multiply=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[0],c=r[1],f=r[2],s=r[3];return t[0]=a*i+u*c,t[1]=e*i+o*c,t[2]=a*f+u*s,t[3]=e*f+o*s,t},e.mul=e.multiply,e.rotate=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),c=Math.cos(r);return t[0]=a*c+u*i,t[1]=e*c+o*i,t[2]=a*-i+u*c,t[3]=e*-i+o*c,t},e.scale=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[0],c=r[1];return t[0]=a*i,t[1]=e*i,t[2]=u*c,t[3]=o*c,t},e.fromRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=-r,t[3]=a,t},e.fromScaling=function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=n[1],t},e.str=function(t){return"mat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},e.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2))},e.LDU=function(t,n,r,a){return t[2]=a[2]/a[0],r[0]=a[0],r[1]=a[1],r[3]=a[3]-t[2]*r[1],[t,n,r]},t.exports=e},function(t,n,r){var a=r(1),e={};e.create=function(){var t=new a.ARRAY_TYPE(6);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t},e.clone=function(t){var n=new a.ARRAY_TYPE(6);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n},e.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t},e.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t},e.invert=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],c=r*u-a*e;return c?(c=1/c,t[0]=u*c,t[1]=-a*c,t[2]=-e*c,t[3]=r*c,t[4]=(e*i-u*o)*c,t[5]=(a*o-r*i)*c,t):null},e.determinant=function(t){return t[0]*t[3]-t[1]*t[2]},e.multiply=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=r[0],s=r[1],h=r[2],M=r[3],l=r[4],v=r[5];return t[0]=a*f+u*s,t[1]=e*f+o*s,t[2]=a*h+u*M,t[3]=e*h+o*M,t[4]=a*l+u*v+i,t[5]=e*l+o*v+c,t},e.mul=e.multiply,e.rotate=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=Math.sin(r),s=Math.cos(r);return t[0]=a*s+u*f,t[1]=e*s+o*f,t[2]=a*-f+u*s,t[3]=e*-f+o*s,t[4]=i,t[5]=c,t},e.scale=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=r[0],s=r[1];return t[0]=a*f,t[1]=e*f,t[2]=u*s,t[3]=o*s,t[4]=i,t[5]=c,t},e.translate=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=r[0],s=r[1];return t[0]=a,t[1]=e,t[2]=u,t[3]=o,t[4]=a*f+u*s+i,t[5]=e*f+o*s+c,t},e.fromRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=-r,t[3]=a,t[4]=0,t[5]=0,t},e.fromScaling=function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=n[1],t[4]=0,t[5]=0,t},e.fromTranslation=function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=n[0],t[5]=n[1],t},e.str=function(t){return"mat2d("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+")"},e.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+1)},t.exports=e},function(t,n,r){var a=r(1),e={};e.create=function(){var t=new a.ARRAY_TYPE(9);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},e.fromMat4=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[4],t[4]=n[5],t[5]=n[6],t[6]=n[8],t[7]=n[9],t[8]=n[10],t},e.clone=function(t){var n=new a.ARRAY_TYPE(9);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n},e.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t},e.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},e.transpose=function(t,n){if(t===n){var r=n[1],a=n[2],e=n[5];t[1]=n[3],t[2]=n[6],t[3]=r,t[5]=n[7],t[6]=a,t[7]=e}else t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8];return t},e.invert=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],c=n[6],f=n[7],s=n[8],h=s*o-i*f,M=-s*u+i*c,l=f*u-o*c,v=r*h+a*M+e*l;return v?(v=1/v,t[0]=h*v,t[1]=(-s*a+e*f)*v,t[2]=(i*a-e*o)*v,t[3]=M*v,t[4]=(s*r-e*c)*v,t[5]=(-i*r+e*u)*v,t[6]=l*v,t[7]=(-f*r+a*c)*v,t[8]=(o*r-a*u)*v,t):null},e.adjoint=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],c=n[6],f=n[7],s=n[8];return t[0]=o*s-i*f,t[1]=e*f-a*s,t[2]=a*i-e*o,t[3]=i*c-u*s,t[4]=r*s-e*c,t[5]=e*u-r*i,t[6]=u*f-o*c,t[7]=a*c-r*f,t[8]=r*o-a*u,t},e.determinant=function(t){var n=t[0],r=t[1],a=t[2],e=t[3],u=t[4],o=t[5],i=t[6],c=t[7],f=t[8];return n*(f*u-o*c)+r*(-f*e+o*i)+a*(c*e-u*i)},e.multiply=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=n[6],s=n[7],h=n[8],M=r[0],l=r[1],v=r[2],m=r[3],p=r[4],d=r[5],A=r[6],R=r[7],w=r[8];return t[0]=M*a+l*o+v*f,t[1]=M*e+l*i+v*s,t[2]=M*u+l*c+v*h,t[3]=m*a+p*o+d*f,t[4]=m*e+p*i+d*s,t[5]=m*u+p*c+d*h,t[6]=A*a+R*o+w*f,t[7]=A*e+R*i+w*s,t[8]=A*u+R*c+w*h,t},e.mul=e.multiply,e.translate=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=n[6],s=n[7],h=n[8],M=r[0],l=r[1];return t[0]=a,t[1]=e,t[2]=u,t[3]=o,t[4]=i,t[5]=c,t[6]=M*a+l*o+f,t[7]=M*e+l*i+s,t[8]=M*u+l*c+h,t},e.rotate=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=n[6],s=n[7],h=n[8],M=Math.sin(r),l=Math.cos(r);return t[0]=l*a+M*o,t[1]=l*e+M*i,t[2]=l*u+M*c,t[3]=l*o-M*a,t[4]=l*i-M*e,t[5]=l*c-M*u,t[6]=f,t[7]=s,t[8]=h,t},e.scale=function(t,n,r){var a=r[0],e=r[1];return t[0]=a*n[0],t[1]=a*n[1],t[2]=a*n[2],t[3]=e*n[3],t[4]=e*n[4],t[5]=e*n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t},e.fromTranslation=function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=n[0],t[7]=n[1],t[8]=1,t},e.fromRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=0,t[3]=-r,t[4]=a,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},e.fromScaling=function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=n[1],t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},e.fromMat2d=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=0,t[3]=n[2],t[4]=n[3],t[5]=0,t[6]=n[4],t[7]=n[5],t[8]=1,t},e.fromQuat=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r+r,i=a+a,c=e+e,f=r*o,s=a*o,h=a*i,M=e*o,l=e*i,v=e*c,m=u*o,p=u*i,d=u*c;return t[0]=1-h-v,t[3]=s-d,t[6]=M+p,t[1]=s+d,t[4]=1-f-v,t[7]=l-m,t[2]=M-p,t[5]=l+m,t[8]=1-f-h,t},e.normalFromMat4=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],c=n[6],f=n[7],s=n[8],h=n[9],M=n[10],l=n[11],v=n[12],m=n[13],p=n[14],d=n[15],A=r*i-a*o,R=r*c-e*o,w=r*f-u*o,q=a*c-e*i,Y=a*f-u*i,g=e*f-u*c,y=s*m-h*v,x=s*p-M*v,P=s*d-l*v,E=h*p-M*m,T=h*d-l*m,b=M*d-l*p,D=A*b-R*T+w*E+q*P-Y*x+g*y;return D?(D=1/D,t[0]=(i*b-c*T+f*E)*D,t[1]=(c*P-o*b-f*x)*D,t[2]=(o*T-i*P+f*y)*D,t[3]=(e*T-a*b-u*E)*D,t[4]=(r*b-e*P+u*x)*D,t[5]=(a*P-r*T-u*y)*D,t[6]=(m*g-p*Y+d*q)*D,t[7]=(p*w-v*g-d*R)*D,t[8]=(v*Y-m*w+d*A)*D,t):null},e.str=function(t){return"mat3("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+")"},e.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2))},t.exports=e},function(t,n,r){var a=r(1),e={};e.create=function(){var t=new a.ARRAY_TYPE(16);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},e.clone=function(t){var n=new a.ARRAY_TYPE(16);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n},e.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t},e.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},e.transpose=function(t,n){if(t===n){var r=n[1],a=n[2],e=n[3],u=n[6],o=n[7],i=n[11];t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=r,t[6]=n[9],t[7]=n[13],t[8]=a,t[9]=u,t[11]=n[14],t[12]=e,t[13]=o,t[14]=i}else t[0]=n[0],t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=n[1],t[5]=n[5],t[6]=n[9],t[7]=n[13],t[8]=n[2],t[9]=n[6],t[10]=n[10],t[11]=n[14],t[12]=n[3],t[13]=n[7],t[14]=n[11],t[15]=n[15];return t},e.invert=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],c=n[6],f=n[7],s=n[8],h=n[9],M=n[10],l=n[11],v=n[12],m=n[13],p=n[14],d=n[15],A=r*i-a*o,R=r*c-e*o,w=r*f-u*o,q=a*c-e*i,Y=a*f-u*i,g=e*f-u*c,y=s*m-h*v,x=s*p-M*v,P=s*d-l*v,E=h*p-M*m,T=h*d-l*m,b=M*d-l*p,D=A*b-R*T+w*E+q*P-Y*x+g*y;return D?(D=1/D,t[0]=(i*b-c*T+f*E)*D,t[1]=(e*T-a*b-u*E)*D,t[2]=(m*g-p*Y+d*q)*D,t[3]=(M*Y-h*g-l*q)*D,t[4]=(c*P-o*b-f*x)*D,t[5]=(r*b-e*P+u*x)*D,t[6]=(p*w-v*g-d*R)*D,t[7]=(s*g-M*w+l*R)*D,t[8]=(o*T-i*P+f*y)*D,t[9]=(a*P-r*T-u*y)*D,t[10]=(v*Y-m*w+d*A)*D,t[11]=(h*w-s*Y-l*A)*D,t[12]=(i*x-o*E-c*y)*D,t[13]=(r*E-a*x+e*y)*D,t[14]=(m*R-v*q-p*A)*D,t[15]=(s*q-h*R+M*A)*D,t):null},e.adjoint=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=n[4],i=n[5],c=n[6],f=n[7],s=n[8],h=n[9],M=n[10],l=n[11],v=n[12],m=n[13],p=n[14],d=n[15];return t[0]=i*(M*d-l*p)-h*(c*d-f*p)+m*(c*l-f*M),t[1]=-(a*(M*d-l*p)-h*(e*d-u*p)+m*(e*l-u*M)),t[2]=a*(c*d-f*p)-i*(e*d-u*p)+m*(e*f-u*c),t[3]=-(a*(c*l-f*M)-i*(e*l-u*M)+h*(e*f-u*c)),t[4]=-(o*(M*d-l*p)-s*(c*d-f*p)+v*(c*l-f*M)),t[5]=r*(M*d-l*p)-s*(e*d-u*p)+v*(e*l-u*M),t[6]=-(r*(c*d-f*p)-o*(e*d-u*p)+v*(e*f-u*c)),t[7]=r*(c*l-f*M)-o*(e*l-u*M)+s*(e*f-u*c),t[8]=o*(h*d-l*m)-s*(i*d-f*m)+v*(i*l-f*h),t[9]=-(r*(h*d-l*m)-s*(a*d-u*m)+v*(a*l-u*h)),t[10]=r*(i*d-f*m)-o*(a*d-u*m)+v*(a*f-u*i),t[11]=-(r*(i*l-f*h)-o*(a*l-u*h)+s*(a*f-u*i)),t[12]=-(o*(h*p-M*m)-s*(i*p-c*m)+v*(i*M-c*h)),t[13]=r*(h*p-M*m)-s*(a*p-e*m)+v*(a*M-e*h),t[14]=-(r*(i*p-c*m)-o*(a*p-e*m)+v*(a*c-e*i)),t[15]=r*(i*M-c*h)-o*(a*M-e*h)+s*(a*c-e*i),t},e.determinant=function(t){var n=t[0],r=t[1],a=t[2],e=t[3],u=t[4],o=t[5],i=t[6],c=t[7],f=t[8],s=t[9],h=t[10],M=t[11],l=t[12],v=t[13],m=t[14],p=t[15],d=n*o-r*u,A=n*i-a*u,R=n*c-e*u,w=r*i-a*o,q=r*c-e*o,Y=a*c-e*i,g=f*v-s*l,y=f*m-h*l,x=f*p-M*l,P=s*m-h*v,E=s*p-M*v,T=h*p-M*m;return d*T-A*E+R*P+w*x-q*y+Y*g},e.multiply=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=n[6],s=n[7],h=n[8],M=n[9],l=n[10],v=n[11],m=n[12],p=n[13],d=n[14],A=n[15],R=r[0],w=r[1],q=r[2],Y=r[3];return t[0]=R*a+w*i+q*h+Y*m,t[1]=R*e+w*c+q*M+Y*p,t[2]=R*u+w*f+q*l+Y*d,t[3]=R*o+w*s+q*v+Y*A,R=r[4],w=r[5],q=r[6],Y=r[7],t[4]=R*a+w*i+q*h+Y*m,t[5]=R*e+w*c+q*M+Y*p,t[6]=R*u+w*f+q*l+Y*d,t[7]=R*o+w*s+q*v+Y*A,R=r[8],w=r[9],q=r[10],Y=r[11],t[8]=R*a+w*i+q*h+Y*m,t[9]=R*e+w*c+q*M+Y*p,t[10]=R*u+w*f+q*l+Y*d,t[11]=R*o+w*s+q*v+Y*A,R=r[12],w=r[13],q=r[14],Y=r[15],t[12]=R*a+w*i+q*h+Y*m,t[13]=R*e+w*c+q*M+Y*p,t[14]=R*u+w*f+q*l+Y*d,t[15]=R*o+w*s+q*v+Y*A,t},e.mul=e.multiply,e.translate=function(t,n,r){var a,e,u,o,i,c,f,s,h,M,l,v,m=r[0],p=r[1],d=r[2];return n===t?(t[12]=n[0]*m+n[4]*p+n[8]*d+n[12],t[13]=n[1]*m+n[5]*p+n[9]*d+n[13],t[14]=n[2]*m+n[6]*p+n[10]*d+n[14],t[15]=n[3]*m+n[7]*p+n[11]*d+n[15]):(a=n[0],e=n[1],u=n[2],o=n[3],i=n[4],c=n[5],f=n[6],s=n[7],h=n[8],M=n[9],l=n[10],v=n[11],t[0]=a,t[1]=e,t[2]=u,t[3]=o,t[4]=i,t[5]=c,t[6]=f,t[7]=s,t[8]=h,t[9]=M,t[10]=l,t[11]=v,t[12]=a*m+i*p+h*d+n[12],t[13]=e*m+c*p+M*d+n[13],t[14]=u*m+f*p+l*d+n[14],t[15]=o*m+s*p+v*d+n[15]),t},e.scale=function(t,n,r){var a=r[0],e=r[1],u=r[2];return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*e,t[5]=n[5]*e,t[6]=n[6]*e,t[7]=n[7]*e,t[8]=n[8]*u,t[9]=n[9]*u,t[10]=n[10]*u,t[11]=n[11]*u,t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t},e.rotate=function(t,n,r,e){var u,o,i,c,f,s,h,M,l,v,m,p,d,A,R,w,q,Y,g,y,x,P,E,T,b=e[0],D=e[1],L=e[2],_=Math.sqrt(b*b+D*D+L*L);return Math.abs(_)<a.EPSILON?null:(_=1/_,b*=_,D*=_,L*=_,u=Math.sin(r),o=Math.cos(r),i=1-o,c=n[0],f=n[1],s=n[2],h=n[3],M=n[4],l=n[5],v=n[6],m=n[7],p=n[8],d=n[9],A=n[10],R=n[11],w=b*b*i+o,q=D*b*i+L*u,Y=L*b*i-D*u,g=b*D*i-L*u,y=D*D*i+o,x=L*D*i+b*u,P=b*L*i+D*u,E=D*L*i-b*u,T=L*L*i+o,t[0]=c*w+M*q+p*Y,t[1]=f*w+l*q+d*Y,t[2]=s*w+v*q+A*Y,t[3]=h*w+m*q+R*Y,t[4]=c*g+M*y+p*x,t[5]=f*g+l*y+d*x,t[6]=s*g+v*y+A*x,t[7]=h*g+m*y+R*x,t[8]=c*P+M*E+p*T,t[9]=f*P+l*E+d*T,t[10]=s*P+v*E+A*T,t[11]=h*P+m*E+R*T,n!==t&&(t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t)},e.rotateX=function(t,n,r){var a=Math.sin(r),e=Math.cos(r),u=n[4],o=n[5],i=n[6],c=n[7],f=n[8],s=n[9],h=n[10],M=n[11];return n!==t&&(t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[4]=u*e+f*a,t[5]=o*e+s*a,t[6]=i*e+h*a,t[7]=c*e+M*a,t[8]=f*e-u*a,t[9]=s*e-o*a,t[10]=h*e-i*a,t[11]=M*e-c*a,t},e.rotateY=function(t,n,r){var a=Math.sin(r),e=Math.cos(r),u=n[0],o=n[1],i=n[2],c=n[3],f=n[8],s=n[9],h=n[10],M=n[11];return n!==t&&(t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=u*e-f*a,t[1]=o*e-s*a,t[2]=i*e-h*a,t[3]=c*e-M*a,t[8]=u*a+f*e,t[9]=o*a+s*e,t[10]=i*a+h*e,t[11]=c*a+M*e,t},e.rotateZ=function(t,n,r){var a=Math.sin(r),e=Math.cos(r),u=n[0],o=n[1],i=n[2],c=n[3],f=n[4],s=n[5],h=n[6],M=n[7];return n!==t&&(t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=u*e+f*a,t[1]=o*e+s*a,t[2]=i*e+h*a,t[3]=c*e+M*a,t[4]=f*e-u*a,t[5]=s*e-o*a,t[6]=h*e-i*a,t[7]=M*e-c*a,t},e.fromTranslation=function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t},e.fromScaling=function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=n[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},e.fromRotation=function(t,n,r){var e,u,o,i=r[0],c=r[1],f=r[2],s=Math.sqrt(i*i+c*c+f*f);return Math.abs(s)<a.EPSILON?null:(s=1/s,i*=s,c*=s,f*=s,e=Math.sin(n),u=Math.cos(n),o=1-u,t[0]=i*i*o+u,t[1]=c*i*o+f*e,t[2]=f*i*o-c*e,t[3]=0,t[4]=i*c*o-f*e,t[5]=c*c*o+u,t[6]=f*c*o+i*e,t[7]=0,t[8]=i*f*o+c*e,t[9]=c*f*o-i*e,t[10]=f*f*o+u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t)},e.fromXRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a,t[6]=r,t[7]=0,t[8]=0,t[9]=-r,t[10]=a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},e.fromYRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=0,t[2]=-r,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=r,t[9]=0,t[10]=a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},e.fromZRotation=function(t,n){var r=Math.sin(n),a=Math.cos(n);return t[0]=a,t[1]=r,t[2]=0,t[3]=0,t[4]=-r,t[5]=a,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},e.fromRotationTranslation=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=a+a,c=e+e,f=u+u,s=a*i,h=a*c,M=a*f,l=e*c,v=e*f,m=u*f,p=o*i,d=o*c,A=o*f;return t[0]=1-(l+m),t[1]=h+A,t[2]=M-d,t[3]=0,t[4]=h-A,t[5]=1-(s+m),t[6]=v+p,t[7]=0,t[8]=M+d,t[9]=v-p,t[10]=1-(s+l),t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t},e.fromRotationTranslationScale=function(t,n,r,a){var e=n[0],u=n[1],o=n[2],i=n[3],c=e+e,f=u+u,s=o+o,h=e*c,M=e*f,l=e*s,v=u*f,m=u*s,p=o*s,d=i*c,A=i*f,R=i*s,w=a[0],q=a[1],Y=a[2];return t[0]=(1-(v+p))*w,t[1]=(M+R)*w,t[2]=(l-A)*w,t[3]=0,t[4]=(M-R)*q,t[5]=(1-(h+p))*q,t[6]=(m+d)*q,t[7]=0,t[8]=(l+A)*Y,t[9]=(m-d)*Y,t[10]=(1-(h+v))*Y,t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t},e.fromRotationTranslationScaleOrigin=function(t,n,r,a,e){var u=n[0],o=n[1],i=n[2],c=n[3],f=u+u,s=o+o,h=i+i,M=u*f,l=u*s,v=u*h,m=o*s,p=o*h,d=i*h,A=c*f,R=c*s,w=c*h,q=a[0],Y=a[1],g=a[2],y=e[0],x=e[1],P=e[2];return t[0]=(1-(m+d))*q,t[1]=(l+w)*q,t[2]=(v-R)*q,t[3]=0,t[4]=(l-w)*Y,t[5]=(1-(M+d))*Y,t[6]=(p+A)*Y,t[7]=0,t[8]=(v+R)*g,t[9]=(p-A)*g,t[10]=(1-(M+m))*g,t[11]=0,t[12]=r[0]+y-(t[0]*y+t[4]*x+t[8]*P),t[13]=r[1]+x-(t[1]*y+t[5]*x+t[9]*P),t[14]=r[2]+P-(t[2]*y+t[6]*x+t[10]*P),t[15]=1,t},e.fromQuat=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r+r,i=a+a,c=e+e,f=r*o,s=a*o,h=a*i,M=e*o,l=e*i,v=e*c,m=u*o,p=u*i,d=u*c;return t[0]=1-h-v,t[1]=s+d,t[2]=M-p,t[3]=0,t[4]=s-d,t[5]=1-f-v,t[6]=l+m,t[7]=0,t[8]=M+p,t[9]=l-m,t[10]=1-f-h,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},e.frustum=function(t,n,r,a,e,u,o){var i=1/(r-n),c=1/(e-a),f=1/(u-o);return t[0]=2*u*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*u*c,t[6]=0,t[7]=0,t[8]=(r+n)*i,t[9]=(e+a)*c,t[10]=(o+u)*f,t[11]=-1,t[12]=0,t[13]=0,t[14]=o*u*2*f,t[15]=0,t},e.perspective=function(t,n,r,a,e){var u=1/Math.tan(n/2),o=1/(a-e);return t[0]=u/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=u,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(e+a)*o,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*e*a*o,t[15]=0,t},e.perspectiveFromFieldOfView=function(t,n,r,a){var e=Math.tan(n.upDegrees*Math.PI/180),u=Math.tan(n.downDegrees*Math.PI/180),o=Math.tan(n.leftDegrees*Math.PI/180),i=Math.tan(n.rightDegrees*Math.PI/180),c=2/(o+i),f=2/(e+u);return t[0]=c,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=f,t[6]=0,t[7]=0,t[8]=-((o-i)*c*.5),t[9]=(e-u)*f*.5,t[10]=a/(r-a),t[11]=-1,t[12]=0,t[13]=0,t[14]=a*r/(r-a),t[15]=0,t},e.ortho=function(t,n,r,a,e,u,o){var i=1/(n-r),c=1/(a-e),f=1/(u-o);return t[0]=-2*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*c,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*f,t[11]=0,t[12]=(n+r)*i,t[13]=(e+a)*c,t[14]=(o+u)*f,t[15]=1,t},e.lookAt=function(t,n,r,u){var o,i,c,f,s,h,M,l,v,m,p=n[0],d=n[1],A=n[2],R=u[0],w=u[1],q=u[2],Y=r[0],g=r[1],y=r[2];return Math.abs(p-Y)<a.EPSILON&&Math.abs(d-g)<a.EPSILON&&Math.abs(A-y)<a.EPSILON?e.identity(t):(M=p-Y,l=d-g,v=A-y,m=1/Math.sqrt(M*M+l*l+v*v),M*=m,l*=m,v*=m,o=w*v-q*l,i=q*M-R*v,c=R*l-w*M,m=Math.sqrt(o*o+i*i+c*c),m?(m=1/m,o*=m,i*=m,c*=m):(o=0,i=0,c=0),f=l*c-v*i,s=v*o-M*c,h=M*i-l*o,m=Math.sqrt(f*f+s*s+h*h),m?(m=1/m,f*=m,s*=m,h*=m):(f=0,s=0,h=0),t[0]=o,t[1]=f,t[2]=M,t[3]=0,t[4]=i,t[5]=s,t[6]=l,t[7]=0,t[8]=c,t[9]=h,t[10]=v,t[11]=0,t[12]=-(o*p+i*d+c*A),t[13]=-(f*p+s*d+h*A),t[14]=-(M*p+l*d+v*A),t[15]=1,t)},e.str=function(t){return"mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"},e.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2)+Math.pow(t[9],2)+Math.pow(t[10],2)+Math.pow(t[11],2)+Math.pow(t[12],2)+Math.pow(t[13],2)+Math.pow(t[14],2)+Math.pow(t[15],2))},t.exports=e},function(t,n,r){var a=r(1),e=r(4),u=r(7),o=r(8),i={};i.create=function(){var t=new a.ARRAY_TYPE(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t},i.rotationTo=function(){var t=u.create(),n=u.fromValues(1,0,0),r=u.fromValues(0,1,0);return function(a,e,o){var c=u.dot(e,o);return-.999999>c?(u.cross(t,n,e),u.length(t)<1e-6&&u.cross(t,r,e),u.normalize(t,t),i.setAxisAngle(a,t,Math.PI),a):c>.999999?(a[0]=0,a[1]=0,a[2]=0,a[3]=1,a):(u.cross(t,e,o),a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=1+c,i.normalize(a,a))}}(),i.setAxes=function(){var t=e.create();return function(n,r,a,e){return t[0]=a[0],t[3]=a[1],t[6]=a[2],t[1]=e[0],t[4]=e[1],t[7]=e[2],t[2]=-r[0],t[5]=-r[1],t[8]=-r[2],i.normalize(n,i.fromMat3(n,t))}}(),i.clone=o.clone,i.fromValues=o.fromValues,i.copy=o.copy,i.set=o.set,i.identity=function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t},i.setAxisAngle=function(t,n,r){r=.5*r;var a=Math.sin(r);return t[0]=a*n[0],t[1]=a*n[1],t[2]=a*n[2],t[3]=Math.cos(r),t},i.add=o.add,i.multiply=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3],i=r[0],c=r[1],f=r[2],s=r[3];return t[0]=a*s+o*i+e*f-u*c,t[1]=e*s+o*c+u*i-a*f,t[2]=u*s+o*f+a*c-e*i,t[3]=o*s-a*i-e*c-u*f,t},i.mul=i.multiply,i.scale=o.scale,i.rotateX=function(t,n,r){r*=.5;var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),c=Math.cos(r);return t[0]=a*c+o*i,t[1]=e*c+u*i,t[2]=u*c-e*i,t[3]=o*c-a*i,t},i.rotateY=function(t,n,r){r*=.5;var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),c=Math.cos(r);return t[0]=a*c-u*i,t[1]=e*c+o*i,t[2]=u*c+a*i,t[3]=o*c-e*i,t},i.rotateZ=function(t,n,r){r*=.5;var a=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(r),c=Math.cos(r);return t[0]=a*c+e*i,t[1]=e*c-a*i,t[2]=u*c+o*i,t[3]=o*c-u*i,t},i.calculateW=function(t,n){var r=n[0],a=n[1],e=n[2];return t[0]=r,t[1]=a,t[2]=e,t[3]=Math.sqrt(Math.abs(1-r*r-a*a-e*e)),t},i.dot=o.dot,i.lerp=o.lerp,i.slerp=function(t,n,r,a){var e,u,o,i,c,f=n[0],s=n[1],h=n[2],M=n[3],l=r[0],v=r[1],m=r[2],p=r[3];return u=f*l+s*v+h*m+M*p,0>u&&(u=-u,l=-l,v=-v,m=-m,p=-p),1-u>1e-6?(e=Math.acos(u),o=Math.sin(e),i=Math.sin((1-a)*e)/o,c=Math.sin(a*e)/o):(i=1-a,c=a),t[0]=i*f+c*l,t[1]=i*s+c*v,t[2]=i*h+c*m,t[3]=i*M+c*p,t},i.sqlerp=function(){var t=i.create(),n=i.create();return function(r,a,e,u,o,c){return i.slerp(t,a,o,c),i.slerp(n,e,u,c),i.slerp(r,t,n,2*c*(1-c)),r}}(),i.invert=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r*r+a*a+e*e+u*u,i=o?1/o:0;return t[0]=-r*i,t[1]=-a*i,t[2]=-e*i,t[3]=u*i,t},i.conjugate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=n[3],t},i.length=o.length,i.len=i.length,i.squaredLength=o.squaredLength,i.sqrLen=i.squaredLength,i.normalize=o.normalize,i.fromMat3=function(t,n){var r,a=n[0]+n[4]+n[8];if(a>0)r=Math.sqrt(a+1),t[3]=.5*r,r=.5/r,t[0]=(n[5]-n[7])*r,t[1]=(n[6]-n[2])*r,t[2]=(n[1]-n[3])*r;else{var e=0;n[4]>n[0]&&(e=1),n[8]>n[3*e+e]&&(e=2);var u=(e+1)%3,o=(e+2)%3;r=Math.sqrt(n[3*e+e]-n[3*u+u]-n[3*o+o]+1),t[e]=.5*r,r=.5/r,t[3]=(n[3*u+o]-n[3*o+u])*r,t[u]=(n[3*u+e]+n[3*e+u])*r,t[o]=(n[3*o+e]+n[3*e+o])*r}return t},i.str=function(t){return"quat("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},t.exports=i},function(t,n,r){var a=r(1),e={};e.create=function(){var t=new a.ARRAY_TYPE(3);return t[0]=0,t[1]=0,t[2]=0,t},e.clone=function(t){var n=new a.ARRAY_TYPE(3);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n},e.fromValues=function(t,n,r){var e=new a.ARRAY_TYPE(3);return e[0]=t,e[1]=n,e[2]=r,e},e.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t},e.set=function(t,n,r,a){return t[0]=n,t[1]=r,t[2]=a,t},e.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t},e.subtract=function(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t},e.sub=e.subtract,e.multiply=function(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t},e.mul=e.multiply,e.divide=function(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t},e.div=e.divide,e.min=function(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t},e.max=function(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t},e.scale=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t},e.scaleAndAdd=function(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t},e.distance=function(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2];return Math.sqrt(r*r+a*a+e*e)},e.dist=e.distance,e.squaredDistance=function(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2];return r*r+a*a+e*e},e.sqrDist=e.squaredDistance,e.length=function(t){var n=t[0],r=t[1],a=t[2];return Math.sqrt(n*n+r*r+a*a)},e.len=e.length,e.squaredLength=function(t){var n=t[0],r=t[1],a=t[2];return n*n+r*r+a*a},e.sqrLen=e.squaredLength,e.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t},e.inverse=function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t},e.normalize=function(t,n){var r=n[0],a=n[1],e=n[2],u=r*r+a*a+e*e;return u>0&&(u=1/Math.sqrt(u),t[0]=n[0]*u,t[1]=n[1]*u,t[2]=n[2]*u),t},e.dot=function(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]},e.cross=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[0],i=r[1],c=r[2];return t[0]=e*c-u*i,t[1]=u*o-a*c,t[2]=a*i-e*o,t},e.lerp=function(t,n,r,a){var e=n[0],u=n[1],o=n[2];return t[0]=e+a*(r[0]-e),t[1]=u+a*(r[1]-u),t[2]=o+a*(r[2]-o),t},e.hermite=function(t,n,r,a,e,u){var o=u*u,i=o*(2*u-3)+1,c=o*(u-2)+u,f=o*(u-1),s=o*(3-2*u);return t[0]=n[0]*i+r[0]*c+a[0]*f+e[0]*s,t[1]=n[1]*i+r[1]*c+a[1]*f+e[1]*s,t[2]=n[2]*i+r[2]*c+a[2]*f+e[2]*s,t},e.bezier=function(t,n,r,a,e,u){var o=1-u,i=o*o,c=u*u,f=i*o,s=3*u*i,h=3*c*o,M=c*u;return t[0]=n[0]*f+r[0]*s+a[0]*h+e[0]*M,t[1]=n[1]*f+r[1]*s+a[1]*h+e[1]*M,t[2]=n[2]*f+r[2]*s+a[2]*h+e[2]*M,t},e.random=function(t,n){n=n||1;var r=2*a.RANDOM()*Math.PI,e=2*a.RANDOM()-1,u=Math.sqrt(1-e*e)*n;return t[0]=Math.cos(r)*u,t[1]=Math.sin(r)*u,t[2]=e*n,t},e.transformMat4=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[3]*a+r[7]*e+r[11]*u+r[15];return o=o||1,t[0]=(r[0]*a+r[4]*e+r[8]*u+r[12])/o,t[1]=(r[1]*a+r[5]*e+r[9]*u+r[13])/o,t[2]=(r[2]*a+r[6]*e+r[10]*u+r[14])/o,t},e.transformMat3=function(t,n,r){var a=n[0],e=n[1],u=n[2];return t[0]=a*r[0]+e*r[3]+u*r[6],t[1]=a*r[1]+e*r[4]+u*r[7],t[2]=a*r[2]+e*r[5]+u*r[8],t},e.transformQuat=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[0],i=r[1],c=r[2],f=r[3],s=f*a+i*u-c*e,h=f*e+c*a-o*u,M=f*u+o*e-i*a,l=-o*a-i*e-c*u;return t[0]=s*f+l*-o+h*-c-M*-i,t[1]=h*f+l*-i+M*-o-s*-c,t[2]=M*f+l*-c+s*-i-h*-o,t},e.rotateX=function(t,n,r,a){var e=[],u=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],u[0]=e[0],u[1]=e[1]*Math.cos(a)-e[2]*Math.sin(a),u[2]=e[1]*Math.sin(a)+e[2]*Math.cos(a),t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t},e.rotateY=function(t,n,r,a){var e=[],u=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],u[0]=e[2]*Math.sin(a)+e[0]*Math.cos(a),u[1]=e[1],u[2]=e[2]*Math.cos(a)-e[0]*Math.sin(a),t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t},e.rotateZ=function(t,n,r,a){var e=[],u=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],u[0]=e[0]*Math.cos(a)-e[1]*Math.sin(a),u[1]=e[0]*Math.sin(a)+e[1]*Math.cos(a),u[2]=e[2],t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t},e.forEach=function(){var t=e.create();return function(n,r,a,e,u,o){var i,c;for(r||(r=3),a||(a=0),c=e?Math.min(e*r+a,n.length):n.length,i=a;c>i;i+=r)t[0]=n[i],t[1]=n[i+1],t[2]=n[i+2],u(t,t,o),n[i]=t[0],n[i+1]=t[1],n[i+2]=t[2];return n}}(),e.angle=function(t,n){var r=e.fromValues(t[0],t[1],t[2]),a=e.fromValues(n[0],n[1],n[2]);e.normalize(r,r),e.normalize(a,a);var u=e.dot(r,a);return u>1?0:Math.acos(u)},e.str=function(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")"},t.exports=e},function(t,n,r){var a=r(1),e={};e.create=function(){var t=new a.ARRAY_TYPE(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=0,t},e.clone=function(t){var n=new a.ARRAY_TYPE(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n},e.fromValues=function(t,n,r,e){var u=new a.ARRAY_TYPE(4);return u[0]=t,u[1]=n,u[2]=r,u[3]=e,u},e.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t},e.set=function(t,n,r,a,e){return t[0]=n,t[1]=r,t[2]=a,t[3]=e,t},e.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t},e.subtract=function(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t},e.sub=e.subtract,e.multiply=function(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t[3]=n[3]*r[3],t},e.mul=e.multiply,e.divide=function(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t[3]=n[3]/r[3],t},e.div=e.divide,e.min=function(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t[3]=Math.min(n[3],r[3]),t},e.max=function(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t[3]=Math.max(n[3],r[3]),t},e.scale=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t},e.scaleAndAdd=function(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t[2]=n[2]+r[2]*a,t[3]=n[3]+r[3]*a,t},e.distance=function(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2],u=n[3]-t[3];return Math.sqrt(r*r+a*a+e*e+u*u)},e.dist=e.distance,e.squaredDistance=function(t,n){var r=n[0]-t[0],a=n[1]-t[1],e=n[2]-t[2],u=n[3]-t[3];return r*r+a*a+e*e+u*u},e.sqrDist=e.squaredDistance,e.length=function(t){var n=t[0],r=t[1],a=t[2],e=t[3];return Math.sqrt(n*n+r*r+a*a+e*e)},e.len=e.length,e.squaredLength=function(t){var n=t[0],r=t[1],a=t[2],e=t[3];return n*n+r*r+a*a+e*e},e.sqrLen=e.squaredLength,e.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=-n[3],t},e.inverse=function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t[3]=1/n[3],t},e.normalize=function(t,n){var r=n[0],a=n[1],e=n[2],u=n[3],o=r*r+a*a+e*e+u*u;return o>0&&(o=1/Math.sqrt(o),t[0]=r*o,t[1]=a*o,t[2]=e*o,t[3]=u*o),t},e.dot=function(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]+t[3]*n[3]},e.lerp=function(t,n,r,a){var e=n[0],u=n[1],o=n[2],i=n[3];return t[0]=e+a*(r[0]-e),t[1]=u+a*(r[1]-u),t[2]=o+a*(r[2]-o),t[3]=i+a*(r[3]-i),t},e.random=function(t,n){return n=n||1,t[0]=a.RANDOM(),t[1]=a.RANDOM(),t[2]=a.RANDOM(),t[3]=a.RANDOM(),e.normalize(t,t),e.scale(t,t,n),t},e.transformMat4=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=n[3];return t[0]=r[0]*a+r[4]*e+r[8]*u+r[12]*o,t[1]=r[1]*a+r[5]*e+r[9]*u+r[13]*o,t[2]=r[2]*a+r[6]*e+r[10]*u+r[14]*o,t[3]=r[3]*a+r[7]*e+r[11]*u+r[15]*o,t},e.transformQuat=function(t,n,r){var a=n[0],e=n[1],u=n[2],o=r[0],i=r[1],c=r[2],f=r[3],s=f*a+i*u-c*e,h=f*e+c*a-o*u,M=f*u+o*e-i*a,l=-o*a-i*e-c*u;return t[0]=s*f+l*-o+h*-c-M*-i,t[1]=h*f+l*-i+M*-o-s*-c,t[2]=M*f+l*-c+s*-i-h*-o,t[3]=n[3],t},e.forEach=function(){var t=e.create();return function(n,r,a,e,u,o){var i,c;for(r||(r=4),a||(a=0),c=e?Math.min(e*r+a,n.length):n.length,i=a;c>i;i+=r)t[0]=n[i],t[1]=n[i+1],t[2]=n[i+2],t[3]=n[i+3],u(t,t,o),n[i]=t[0],n[i+1]=t[1],n[i+2]=t[2],n[i+3]=t[3];return n}}(),e.str=function(t){return"vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},t.exports=e},function(t,n,r){var a=r(1),e={};e.create=function(){var t=new a.ARRAY_TYPE(2);return t[0]=0,t[1]=0,t},e.clone=function(t){var n=new a.ARRAY_TYPE(2);return n[0]=t[0],n[1]=t[1],n},e.fromValues=function(t,n){var r=new a.ARRAY_TYPE(2);return r[0]=t,r[1]=n,r},e.copy=function(t,n){return t[0]=n[0],t[1]=n[1],t},e.set=function(t,n,r){return t[0]=n,t[1]=r,t},e.add=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t},e.subtract=function(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t},e.sub=e.subtract,e.multiply=function(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t},e.mul=e.multiply,e.divide=function(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t},e.div=e.divide,e.min=function(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t},e.max=function(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t},e.scale=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t},e.scaleAndAdd=function(t,n,r,a){return t[0]=n[0]+r[0]*a,t[1]=n[1]+r[1]*a,t},e.distance=function(t,n){var r=n[0]-t[0],a=n[1]-t[1];return Math.sqrt(r*r+a*a)},e.dist=e.distance,e.squaredDistance=function(t,n){var r=n[0]-t[0],a=n[1]-t[1];return r*r+a*a},e.sqrDist=e.squaredDistance,e.length=function(t){var n=t[0],r=t[1];return Math.sqrt(n*n+r*r)},e.len=e.length,e.squaredLength=function(t){var n=t[0],r=t[1];return n*n+r*r},e.sqrLen=e.squaredLength,e.negate=function(t,n){return t[0]=-n[0],t[1]=-n[1],t},e.inverse=function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t},e.normalize=function(t,n){var r=n[0],a=n[1],e=r*r+a*a;return e>0&&(e=1/Math.sqrt(e),t[0]=n[0]*e,t[1]=n[1]*e),t},e.dot=function(t,n){return t[0]*n[0]+t[1]*n[1]},e.cross=function(t,n,r){var a=n[0]*r[1]-n[1]*r[0];return t[0]=t[1]=0,t[2]=a,t},e.lerp=function(t,n,r,a){var e=n[0],u=n[1];return t[0]=e+a*(r[0]-e),t[1]=u+a*(r[1]-u),t},e.random=function(t,n){n=n||1;var r=2*a.RANDOM()*Math.PI;return t[0]=Math.cos(r)*n,t[1]=Math.sin(r)*n,t},e.transformMat2=function(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[2]*e,t[1]=r[1]*a+r[3]*e,t},e.transformMat2d=function(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[2]*e+r[4],t[1]=r[1]*a+r[3]*e+r[5],t},e.transformMat3=function(t,n,r){
	var a=n[0],e=n[1];return t[0]=r[0]*a+r[3]*e+r[6],t[1]=r[1]*a+r[4]*e+r[7],t},e.transformMat4=function(t,n,r){var a=n[0],e=n[1];return t[0]=r[0]*a+r[4]*e+r[12],t[1]=r[1]*a+r[5]*e+r[13],t},e.forEach=function(){var t=e.create();return function(n,r,a,e,u,o){var i,c;for(r||(r=2),a||(a=0),c=e?Math.min(e*r+a,n.length):n.length,i=a;c>i;i+=r)t[0]=n[i],t[1]=n[i+1],u(t,t,o),n[i]=t[0],n[i+1]=t[1];return n}}(),e.str=function(t){return"vec2("+t[0]+", "+t[1]+")"},t.exports=e}])});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var Exceptions = __webpack_require__(9);
	var AttributeConverterBase = (function (_super) {
	    __extends(AttributeConverterBase, _super);
	    function AttributeConverterBase() {
	        _super.call(this);
	    }
	    AttributeConverterBase.prototype.ToAttribute = function (val) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    AttributeConverterBase.prototype.FromAttribute = function (attr) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    AttributeConverterBase.prototype.FromInterface = function (val) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    AttributeConverterBase.prototype.GetAnimater = function (attr, beginVal, endVal, beginTime, duration, easing, onComplete) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    return AttributeConverterBase;
	})(JThreeObject);
	module.exports = AttributeConverterBase;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var AttributeConverterBase = __webpack_require__(27);
	var Exceptions = __webpack_require__(9);
	var NumberAnimater = __webpack_require__(29);
	var NumberAttributeConverter = (function (_super) {
	    __extends(NumberAttributeConverter, _super);
	    function NumberAttributeConverter() {
	        _super.call(this);
	    }
	    NumberAttributeConverter.prototype.ToAttribute = function (val) {
	        return val;
	    };
	    NumberAttributeConverter.prototype.FromAttribute = function (attr) {
	        return Number(attr);
	    };
	    NumberAttributeConverter.prototype.FromInterface = function (val) {
	        if (typeof val === 'string') {
	            return Number(val);
	        }
	        else if (typeof val === 'number') {
	            return val;
	        }
	        throw new Exceptions.InvalidArgumentException("val can't parse");
	    };
	    NumberAttributeConverter.prototype.GetAnimater = function (attr, beginVal, endVal, beginTime, duration, easing, onComplete) {
	        return new NumberAnimater(attr, beginTime, duration, beginVal, endVal, easing, onComplete);
	    };
	    return NumberAttributeConverter;
	})(AttributeConverterBase);
	module.exports = NumberAttributeConverter;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var AnimagterBase = __webpack_require__(30);
	var NumberAnimater = (function (_super) {
	    __extends(NumberAnimater, _super);
	    function NumberAnimater() {
	        _super.apply(this, arguments);
	    }
	    NumberAnimater.prototype.updateAnimation = function (progress) {
	        this.targetAttribute.Value = this.easingFunction.Ease(this.beginValue, this.endValue, progress);
	    };
	    return NumberAnimater;
	})(AnimagterBase);
	module.exports = NumberAnimater;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObjectWithID = __webpack_require__(31);
	var AnimaterBase = (function (_super) {
	    __extends(AnimaterBase, _super);
	    function AnimaterBase(targetAttribute, begintime, duration, beginValue, endValue, easing, onComplete) {
	        _super.call(this);
	        this.targetAttribute = targetAttribute;
	        this.beginTime = begintime;
	        this.duration = duration;
	        this.onComplete = onComplete;
	        this.easingFunction = easing;
	        this.beginValue = this.targetAttribute.Converter.FromInterface(beginValue);
	        this.endValue = this.targetAttribute.Converter.FromInterface(endValue);
	    }
	    AnimaterBase.prototype.update = function (time) {
	        var progress = (time - this.beginTime) / this.duration;
	        var isFinish = progress >= 1;
	        progress = Math.min(Math.max(progress, 0), 1);
	        this.updateAnimation(progress);
	        if (isFinish && typeof this.onComplete === 'function')
	            this.onComplete();
	        return isFinish;
	    };
	    AnimaterBase.prototype.updateAnimation = function (progress) {
	    };
	    return AnimaterBase;
	})(JThreeObjectWithID);
	module.exports = AnimaterBase;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var JThreeID = __webpack_require__(32);
	var JThreeObjectWithID = (function (_super) {
	    __extends(JThreeObjectWithID, _super);
	    function JThreeObjectWithID(id) {
	        _super.call(this);
	        this.id = id || JThreeID.getUniqueRandom(10);
	    }
	    Object.defineProperty(JThreeObjectWithID.prototype, "ID", {
	        get: function () {
	            return this.id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return JThreeObjectWithID;
	})(JThreeObject);
	module.exports = JThreeObjectWithID;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var JThreeID = (function (_super) {
	    __extends(JThreeID, _super);
	    function JThreeID() {
	        _super.apply(this, arguments);
	    }
	    JThreeID.getUniqueRandom = function (length) {
	        var random = "";
	        for (var i = 0; i < length; i++) {
	            random += JThreeID.randomChars.charAt(Math.random() * JThreeID.randomChars.length);
	        }
	        return random;
	    };
	    JThreeID.randomChars = "abcdefghijklmnopqrstuvwxyzABCDEFHIJKLMNOPQRSTUVWXYZ1234567890-";
	    return JThreeID;
	})(JThreeObject);
	module.exports = JThreeID;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var AttributeConverterBase = __webpack_require__(27);
	var Exceptions = __webpack_require__(9);
	var Vector3 = __webpack_require__(24);
	var Vector3Animater = __webpack_require__(34);
	var Vector3AttributeConverter = (function (_super) {
	    __extends(Vector3AttributeConverter, _super);
	    function Vector3AttributeConverter() {
	        _super.call(this);
	    }
	    Vector3AttributeConverter.prototype.ToAttribute = function (val) {
	        return val;
	    };
	    Vector3AttributeConverter.prototype.FromAttribute = function (attr) {
	        return Vector3.parse(attr);
	    };
	    Vector3AttributeConverter.prototype.FromInterface = function (val) {
	        if (typeof val === 'string') {
	            return Vector3.parse(val);
	        }
	        else if (typeof val === 'object') {
	            return val;
	        }
	        throw new Exceptions.InvalidArgumentException("val can't parse");
	    };
	    Vector3AttributeConverter.prototype.GetAnimater = function (attr, beginVal, endVal, beginTime, duration, easing, onComplete) {
	        return new Vector3Animater(attr, beginTime, duration, beginVal, endVal, easing, onComplete);
	    };
	    return Vector3AttributeConverter;
	})(AttributeConverterBase);
	module.exports = Vector3AttributeConverter;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var AnimagterBase = __webpack_require__(30);
	var Vector3 = __webpack_require__(24);
	var Vector3Animater = (function (_super) {
	    __extends(Vector3Animater, _super);
	    function Vector3Animater() {
	        _super.apply(this, arguments);
	    }
	    Vector3Animater.prototype.updateAnimation = function (progress) {
	        var b = this.beginValue;
	        var e = this.endValue;
	        var ef = this.easingFunction.Ease;
	        this.targetAttribute.Value = new Vector3(ef(b.X, e.X, progress), ef(b.Y, e.Y, progress), ef(b.Z, e.Z, progress));
	    };
	    return Vector3Animater;
	})(AnimagterBase);
	module.exports = Vector3Animater;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var Exceptions = __webpack_require__(9);
	var AttributeParser = __webpack_require__(22);
	var RotationAnimater = __webpack_require__(36);
	var RotationAttributeConverter = (function (_super) {
	    __extends(RotationAttributeConverter, _super);
	    function RotationAttributeConverter() {
	        _super.call(this);
	    }
	    RotationAttributeConverter.prototype.ToAttribute = function (val) {
	        return val;
	    };
	    RotationAttributeConverter.prototype.FromAttribute = function (attr) {
	        return AttributeParser.ParseRotation3D(attr);
	    };
	    RotationAttributeConverter.prototype.FromInterface = function (val) {
	        if (typeof val === 'string') {
	            return this.FromAttribute(val);
	        }
	        else if (typeof val === 'object') {
	            return val;
	        }
	        throw new Exceptions.InvalidArgumentException("val can't parse");
	    };
	    RotationAttributeConverter.prototype.GetAnimater = function (attr, beginVal, endVal, beginTime, duration, easing, onComplete) {
	        return new RotationAnimater(attr, beginTime, duration, beginVal, endVal, easing, onComplete);
	    };
	    return RotationAttributeConverter;
	})(JThreeObject);
	module.exports = RotationAttributeConverter;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var AnimagterBase = __webpack_require__(30);
	var Quaternion = __webpack_require__(23);
	var RotationAnimater = (function (_super) {
	    __extends(RotationAnimater, _super);
	    function RotationAnimater() {
	        _super.apply(this, arguments);
	    }
	    RotationAnimater.prototype.updateAnimation = function (progress) {
	        var b = this.beginValue;
	        var e = this.endValue;
	        var ef = this.easingFunction.Ease;
	        this.targetAttribute.Value = Quaternion.Slerp(b, e, ef(0, 1, progress));
	    };
	    return RotationAnimater;
	})(AnimagterBase);
	module.exports = RotationAnimater;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var AttributeConverterBase = __webpack_require__(27);
	var Exceptions = __webpack_require__(9);
	var Color4 = __webpack_require__(38);
	var Color4Animater = __webpack_require__(41);
	var Color4AttributeConverter = (function (_super) {
	    __extends(Color4AttributeConverter, _super);
	    function Color4AttributeConverter() {
	        _super.call(this);
	    }
	    Color4AttributeConverter.prototype.ToAttribute = function (val) {
	        return val;
	    };
	    Color4AttributeConverter.prototype.FromAttribute = function (attr) {
	        return Color4.parseColor(attr);
	    };
	    Color4AttributeConverter.prototype.FromInterface = function (val) {
	        if (typeof val === 'string') {
	            return Color4.parseColor(val);
	        }
	        else if (typeof val === 'object') {
	            return val;
	        }
	        throw new Exceptions.InvalidArgumentException("val can't parse");
	    };
	    Color4AttributeConverter.prototype.GetAnimater = function (attr, beginVal, endVal, beginTime, duration, easing, onComplete) {
	        return new Color4Animater(attr, beginTime, duration, beginVal, endVal, easing, onComplete);
	    };
	    return Color4AttributeConverter;
	})(AttributeConverterBase);
	module.exports = Color4AttributeConverter;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var Vector4 = __webpack_require__(39);
	var Color4 = (function (_super) {
	    __extends(Color4, _super);
	    function Color4(r, g, b, a) {
	        _super.call(this);
	        this.a = a;
	        this.r = r;
	        this.g = g;
	        this.b = b;
	    }
	    Object.defineProperty(Color4.prototype, "A", {
	        get: function () {
	            return this.a;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Color4.prototype, "R", {
	        get: function () {
	            return this.r;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Color4.prototype, "G", {
	        get: function () {
	            return this.g;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Color4.prototype, "B", {
	        get: function () {
	            return this.b;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Color4.prototype.toVector = function () {
	        return new Vector4(this.R, this.G, this.B, this.A);
	    };
	    Color4.internalParse = function (color, isFirst) {
	        if (isFirst && Color4.colorTable[color]) {
	            return Color4.internalParse(Color4.colorTable[color], false);
	        }
	        if (isFirst) {
	            var m = color.match(/^#([0-9a-f]{3})$/i);
	            if (m) {
	                var s = m[1];
	                return new Color4(parseInt(s.charAt(0), 16) / 0xf, parseInt(s.charAt(1), 16) / 0xf, parseInt(s.charAt(2), 16) / 0xf, 1);
	            }
	        }
	        if (isFirst) {
	            m = color.match(/^#([0-9a-f]{3})$/i);
	            if (m) {
	                var s = m[1];
	                return new Color4(parseInt(s.charAt(0), 16) / 0xf, parseInt(s.charAt(1), 16) / 0xf, parseInt(s.charAt(2), 16) / 0xf, parseInt(s.charAt(3), 16) / 0xf);
	            }
	        }
	        m = color.match(/^#([0-9a-f]{6})$/i);
	        if (m) {
	            var s = m[1];
	            return new Color4(parseInt(s.substr(0, 2), 16) / 0xff, parseInt(s.substr(2, 2), 16) / 0xff, parseInt(s.substr(4, 2), 16) / 0xff, 1);
	        }
	        if (isFirst) {
	            m = color.match(/^#([0-9a-f]{8})$/i);
	            if (m) {
	                var s = m[1];
	                return new Color4(parseInt(s.substr(0, 2), 16) / 0xff, parseInt(s.substr(2, 2), 16) / 0xff, parseInt(s.substr(4, 2), 16) / 0xff, parseInt(s.substr(6, 2), 16) / 0xff);
	            }
	        }
	        var n = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
	        if (n && isFirst) {
	            return new Color4(parseInt(n[1]) / 0xff, parseInt(n[2]) / 0xff, parseInt(n[3]) / 0xff, 1);
	        }
	        var n = color.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*(\d+)\s*\)$/i);
	        if (n && isFirst) {
	            var d = parseInt(n[4]);
	            d = d <= 1 ? d : d / 0xff;
	            return new Color4(parseInt(n[1]) / 0xff, parseInt(n[2]) / 0xff, parseInt(n[3]) / 0xff, parseInt(n[4]));
	        }
	        throw new Error("color parse failed.");
	    };
	    Color4.parseColor = function (color) {
	        return Color4.internalParse(color, true);
	    };
	    Color4.prototype.toString = function () {
	        var st = "#";
	        st += Math.round(this.R * 0xff).toString(16).toUpperCase();
	        st += Math.round(this.G * 0xff).toString(16).toUpperCase();
	        st += Math.round(this.B * 0xff).toString(16).toUpperCase();
	        st += Math.round(this.A * 0xff).toString(16).toUpperCase();
	        return "Color4(" + this.R + ", " + this.G + ", " + this.B + "," + this.A + "," + st + ")";
	    };
	    Color4.colorTable = __webpack_require__(40);
	    return Color4;
	})(JThreeObject);
	module.exports = Color4;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var VectorBase = __webpack_require__(25);
	var glm = __webpack_require__(26);
	var Vector4 = (function (_super) {
	    __extends(Vector4, _super);
	    function Vector4(x, y, z, w) {
	        _super.call(this);
	        if (typeof y === 'undefined') {
	            this.targetVector = x;
	            return;
	        }
	        this.targetVector = [x, y, z, w];
	    }
	    Object.defineProperty(Vector4, "XUnit", {
	        get: function () {
	            return new Vector4(1, 0, 0, 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector4, "YUnit", {
	        get: function () {
	            return new Vector4(0, 1, 0, 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector4, "ZUnit", {
	        get: function () {
	            return new Vector4(0, 0, 1, 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector4, "WUnit", {
	        get: function () {
	            return new Vector4(0, 0, 0, 1);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector4.prototype, "RawElements", {
	        get: function () {
	            return this.targetVector;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector4.prototype, "X", {
	        get: function () {
	            return this.targetVector[0];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector4.prototype, "Y", {
	        get: function () {
	            return this.targetVector[1];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector4.prototype, "Z", {
	        get: function () {
	            return this.targetVector[2];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector4.prototype, "W", {
	        get: function () {
	            return this.targetVector[3];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Vector4.dot = function (v1, v2) {
	        return glm.vec4.dot(v1.targetVector, v2.targetVector);
	    };
	    Vector4.add = function (v1, v2) {
	        var newVec = glm.vec4.create();
	        return new Vector4(glm.vec4.add(newVec, v1.targetVector, v2.targetVector));
	    };
	    Vector4.subtract = function (v1, v2) {
	        var newVec = glm.vec4.create();
	        return new Vector4(glm.vec4.sub(newVec, v1.targetVector, v2.targetVector));
	    };
	    Vector4.multiply = function (s, v) {
	        var newVec = glm.vec4.create();
	        return new Vector4(glm.vec4.scale(newVec, v.targetVector, s));
	    };
	    Vector4.negate = function (v1) {
	        return Vector4.multiply(-1, v1);
	    };
	    Vector4.equal = function (v1, v2) {
	        return VectorBase.elementEqual(v1, v2);
	    };
	    Vector4.normalize = function (v1) {
	        var newVec = glm.vec4.create();
	        return new Vector4(glm.vec4.normalize(newVec, v1.targetVector));
	    };
	    Vector4.prototype.normalizeThis = function () {
	        return Vector4.normalize(this);
	    };
	    Vector4.prototype.dotWith = function (v) {
	        return Vector4.dot(this, v);
	    };
	    Vector4.prototype.addWith = function (v) {
	        return Vector4.add(this, v);
	    };
	    Vector4.prototype.subtractWith = function (v) {
	        return Vector4.subtract(v, this);
	    };
	    Vector4.prototype.multiplyWith = function (s) {
	        return Vector4.multiply(s, this);
	    };
	    Vector4.prototype.negateThis = function () {
	        return Vector4.negate(this);
	    };
	    Vector4.prototype.equalWith = function (v) {
	        return Vector4.equal(this, v);
	    };
	    Object.defineProperty(Vector4.prototype, "ElementCount", {
	        get: function () { return 4; },
	        enumerable: true,
	        configurable: true
	    });
	    Vector4.prototype.toString = function () {
	        return "Vector4(" + this.X + ", " + this.Y + ", " + this.Z + "," + this.W + ")";
	    };
	    return Vector4;
	})(VectorBase);
	module.exports = Vector4;


/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = {
		"aliceblue": "#F0F8FF",
		"antiquewhite": "#FAEBD7",
		"aqua": "#00FFFF",
		"aquamarine": "#7FFFD4",
		"azure": "#F0FFFF",
		"beige": "#F5F5DC",
		"bisque": "#FFE4C4",
		"black": "#000000",
		"blanchedalmond": "#FFEBCD",
		"blue": "#0000FF",
		"blueviolet": "#8A2BE2",
		"brown": "#A52A2A",
		"burlywood": "#DEB887",
		"cadetblue": "#5F9EA0",
		"chartreuse": "#7FFF00",
		"chocolate": "#D2691E",
		"coral": "#FF7F50",
		"cornflowerblue": "#6495ED",
		"cornsilk": "#FFF8DC",
		"crimson": "#DC143C",
		"cyan": "#00FFFF",
		"darkblue": "#00008B",
		"darkcyan": "#008B8B",
		"darkgoldenrod": "#B8860B",
		"darkgray": "#A9A9A9",
		"darkgreen": "#006400",
		"darkgrey": "#A9A9A9",
		"darkkhaki": "#BDB76B",
		"darkmagenta": "#8B008B",
		"darkolivegreen": "#556B2F",
		"darkorange": "#FF8C00",
		"darkorchid": "#9932CC",
		"darkred": "#8B0000",
		"darksalmon": "#E9967A",
		"darkseagreen": "#8FBC8F",
		"darkslateblue": "#483D8B",
		"darkslategray": "#2F4F4F",
		"darkslategrey": "#2F4F4F",
		"darkturquoise": "#00CED1",
		"darkviolet": "#9400D3",
		"deeppink": "#FF1493",
		"deepskyblue": "#00BFFF",
		"dimgray": "#696969",
		"dimgrey": "#696969",
		"dodgerblue": "#1E90FF",
		"firebrick": "#B22222",
		"floralwhite": "#FFFAF0",
		"forestgreen": "#228B22",
		"fuchsia": "#FF00FF",
		"gainsboro": "#DCDCDC",
		"ghostwhite": "#F8F8FF",
		"gold": "#FFD700",
		"goldenrod": "#DAA520",
		"gray": "#808080",
		"green": "#008000",
		"greenyellow": "#ADFF2F",
		"grey": "#808080",
		"honeydew": "#F0FFF0",
		"hotpink": "#FF69B4",
		"indianred": "#CD5C5C",
		"indigo": "#4B0082",
		"ivory": "#FFFFF0",
		"khaki": "#F0E68C",
		"lavender": "#E6E6FA",
		"lavenderblush": "#FFF0F5",
		"lawngreen": "#7CFC00",
		"lemonchiffon": "#FFFACD",
		"lightblue": "#ADD8E6",
		"lightcoral": "#F08080",
		"lightcyan": "#E0FFFF",
		"lightgoldenrodyellow": "#FAFAD2",
		"lightgray": "#D3D3D3",
		"lightgreen": "#90EE90",
		"lightgrey": "#D3D3D3",
		"lightpink": "#FFB6C1",
		"lightsalmon": "#FFA07A",
		"lightseagreen": "#20B2AA",
		"lightskyblue": "#87CEFA",
		"lightslategray": "#778899",
		"lightslategrey": "#778899",
		"lightsteelblue": "#B0C4DE",
		"lightyellow": "#FFFFE0",
		"lime": "#00FF00",
		"limegreen": "#32CD32",
		"linen": "#FAF0E6",
		"magenta": "#FF00FF",
		"maroon": "#800000",
		"mediumaquamarine": "#66CDAA",
		"mediumblue": "#0000CD",
		"mediumorchid": "#BA55D3",
		"mediumpurple": "#9370DB",
		"mediumseagreen": "#3CB371",
		"mediumslateblue": "#7B68EE",
		"mediumspringgreen": "#00FA9A",
		"mediumturquoise": "#48D1CC",
		"mediumvioletred": "#C71585",
		"midnightblue": "#191970",
		"mintcream": "#F5FFFA",
		"mistyrose": "#FFE4E1",
		"moccasin": "#FFE4B5",
		"navajowhite": "#FFDEAD",
		"navy": "#000080",
		"oldlace": "#FDF5E6",
		"olive": "#808000",
		"olivedrab": "#6B8E23",
		"orange": "#FFA500",
		"orangered": "#FF4500",
		"orchid": "#DA70D6",
		"palegoldenrod": "#EEE8AA",
		"palegreen": "#98FB98",
		"paleturquoise": "#AFEEEE",
		"palevioletred": "#DB7093",
		"papayawhip": "#FFEFD5",
		"peachpuff": "#FFDAB9",
		"peru": "#CD853F",
		"pink": "#FFC0CB",
		"plum": "#DDA0DD",
		"powderblue": "#B0E0E6",
		"purple": "#800080",
		"red": "#FF0000",
		"rosybrown": "#BC8F8F",
		"royalblue": "#4169E1",
		"saddlebrown": "#8B4513",
		"salmon": "#FA8072",
		"sandybrown": "#F4A460",
		"seagreen": "#2E8B57",
		"seashell": "#FFF5EE",
		"sienna": "#A0522D",
		"silver": "#C0C0C0",
		"skyblue": "#87CEEB",
		"slateblue": "#6A5ACD",
		"slategray": "#708090",
		"slategrey": "#708090",
		"snow": "#FFFAFA",
		"springgreen": "#00FF7F",
		"steelblue": "#4682B4",
		"tan": "#D2B48C",
		"teal": "#008080",
		"thistle": "#D8BFD8",
		"tomato": "#FF6347",
		"turquoise": "#40E0D0",
		"violet": "#EE82EE",
		"wheat": "#F5DEB3",
		"white": "#FFFFFF",
		"whitesmoke": "#F5F5F5",
		"yellow": "#FFFF00",
		"yellowgreen": "#9ACD32"
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var AnimagterBase = __webpack_require__(30);
	var Color4 = __webpack_require__(38);
	var Color4Animater = (function (_super) {
	    __extends(Color4Animater, _super);
	    function Color4Animater() {
	        _super.apply(this, arguments);
	    }
	    Color4Animater.prototype.updateAnimation = function (progress) {
	        var b = this.beginValue;
	        var e = this.endValue;
	        var ef = this.easingFunction.Ease;
	        this.targetAttribute.Value = new Color4(ef(b.R, e.R, progress), ef(b.G, e.G, progress), ef(b.B, e.B, progress), ef(b.A, b.A, progress));
	    };
	    return Color4Animater;
	})(AnimagterBase);
	module.exports = Color4Animater;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var AttributeConverterBase = __webpack_require__(27);
	var Exceptions = __webpack_require__(9);
	var Color3 = __webpack_require__(43);
	var Color3AttributeConverter = (function (_super) {
	    __extends(Color3AttributeConverter, _super);
	    function Color3AttributeConverter() {
	        _super.call(this);
	    }
	    Color3AttributeConverter.prototype.ToAttribute = function (val) {
	        return val;
	    };
	    Color3AttributeConverter.prototype.FromAttribute = function (attr) {
	        return Color3.parseColor(attr);
	    };
	    Color3AttributeConverter.prototype.FromInterface = function (val) {
	        if (typeof val === 'string') {
	            return Color3.parseColor(val);
	        }
	        else if (typeof val === 'object') {
	            return val;
	        }
	        throw new Exceptions.InvalidArgumentException("val can't parse");
	    };
	    Color3AttributeConverter.prototype.GetAnimater = function (attr, beginVal, endVal, beginTime, duration, easing, onComplete) {
	        return null;
	    };
	    return Color3AttributeConverter;
	})(AttributeConverterBase);
	module.exports = Color3AttributeConverter;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var Vector3 = __webpack_require__(24);
	var Color4 = __webpack_require__(38);
	var Vector4 = __webpack_require__(39);
	var Color3 = (function (_super) {
	    __extends(Color3, _super);
	    function Color3(r, g, b) {
	        _super.call(this);
	        this.r = r;
	        this.g = g;
	        this.b = b;
	    }
	    Object.defineProperty(Color3.prototype, "R", {
	        get: function () {
	            return this.r;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Color3.prototype, "G", {
	        get: function () {
	            return this.g;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Color3.prototype, "B", {
	        get: function () {
	            return this.b;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Color3.FromColor4 = function (col) {
	        return new Color3(col.R, col.G, col.B);
	    };
	    Color3.prototype.toVector = function () {
	        return new Vector3(this.R, this.G, this.B);
	    };
	    Color3.prototype.toVector4 = function (a) {
	        if (typeof a === 'undefined')
	            a = 0;
	        return new Vector4(this.R, this.G, this.B, a);
	    };
	    Color3.internalParse = function (color, isFirst) {
	        if (isFirst && Color4.colorTable[color]) {
	            var col = Color4.internalParse(Color4.colorTable[color], false);
	            return Color3.FromColor4(col);
	        }
	        if (isFirst) {
	            var m = color.match(/^#([0-9a-f]{3})$/i);
	            if (m) {
	                var s = m[1];
	                return new Color3(parseInt(s.charAt(0), 16) / 0xf, parseInt(s.charAt(1), 16) / 0xf, parseInt(s.charAt(2), 16) / 0xf);
	            }
	        }
	        m = color.match(/^#([0-9a-f]{6})$/i);
	        if (m) {
	            var s = m[1];
	            return new Color3(parseInt(s.substr(0, 2), 16) / 0xff, parseInt(s.substr(2, 2), 16) / 0xff, parseInt(s.substr(4, 2), 16) / 0xff);
	        }
	        var n = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
	        if (n && isFirst) {
	            return new Color3(parseInt(n[1]) / 0xff, parseInt(n[2]) / 0xff, parseInt(n[3]) / 0xff);
	        }
	        throw new Error("color parse failed.");
	    };
	    Color3.parseColor = function (color) {
	        return Color3.internalParse(color, true);
	    };
	    Color3.prototype.toString = function () {
	        var st = "#";
	        st += Math.round(this.R * 0xff).toString(16).toUpperCase();
	        st += Math.round(this.G * 0xff).toString(16).toUpperCase();
	        st += Math.round(this.B * 0xff).toString(16).toUpperCase();
	        return "Color3(" + this.R + "," + this.G + "," + this.B + "," + st + ")";
	    };
	    Color3.colorTable = __webpack_require__(40);
	    return Color3;
	})(JThreeObject);
	module.exports = Color3;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var AttributeConverterBase = __webpack_require__(27);
	var BooleanAttributeConverter = (function (_super) {
	    __extends(BooleanAttributeConverter, _super);
	    function BooleanAttributeConverter() {
	        _super.call(this);
	    }
	    BooleanAttributeConverter.prototype.ToAttribute = function (val) {
	        return val;
	    };
	    BooleanAttributeConverter.prototype.FromAttribute = function (attr) {
	        return attr === 'true';
	    };
	    BooleanAttributeConverter.prototype.FromInterface = function (val) {
	        if (typeof val === 'boolean')
	            return val;
	        return this.FromAttribute(val);
	    };
	    return BooleanAttributeConverter;
	})(AttributeConverterBase);
	module.exports = BooleanAttributeConverter;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var AttributeConverterBase = __webpack_require__(27);
	var IntegerAnimater = __webpack_require__(46);
	var IntegerAttributeConverter = (function (_super) {
	    __extends(IntegerAttributeConverter, _super);
	    function IntegerAttributeConverter() {
	        _super.call(this);
	    }
	    IntegerAttributeConverter.prototype.ToAttribute = function (val) {
	        return val;
	    };
	    IntegerAttributeConverter.prototype.FromAttribute = function (attr) {
	        return parseInt(attr);
	    };
	    IntegerAttributeConverter.prototype.FromInterface = function (val) {
	        if (typeof val === 'number') {
	            return Math.floor(val);
	        }
	        else if (typeof val === 'string') {
	            return Math.floor(this.FromAttribute(val));
	        }
	    };
	    IntegerAttributeConverter.prototype.GetAnimater = function (attr, beginVal, endVal, beginTime, duration, easing, onComplete) {
	        return new IntegerAnimater(attr, beginTime, duration, beginVal, endVal, easing, onComplete);
	    };
	    return IntegerAttributeConverter;
	})(AttributeConverterBase);
	module.exports = IntegerAttributeConverter;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var AnimagterBase = __webpack_require__(30);
	var IntegerAnimater = (function (_super) {
	    __extends(IntegerAnimater, _super);
	    function IntegerAnimater() {
	        _super.apply(this, arguments);
	    }
	    IntegerAnimater.prototype.updateAnimation = function (progress) {
	        var b = this.beginValue;
	        var e = this.endValue;
	        var ef = this.easingFunction.Ease;
	        var val = Math.floor(ef(b, e, progress));
	        if (this.targetAttribute.Value !== val)
	            this.targetAttribute.Value = val;
	    };
	    return IntegerAnimater;
	})(AnimagterBase);
	module.exports = IntegerAnimater;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Exceptions = __webpack_require__(9);
	var AttributeConverterBase = __webpack_require__(27);
	var StringAttributeConverter = (function (_super) {
	    __extends(StringAttributeConverter, _super);
	    function StringAttributeConverter() {
	        _super.call(this);
	    }
	    StringAttributeConverter.prototype.ToAttribute = function (val) {
	        return val;
	    };
	    StringAttributeConverter.prototype.FromAttribute = function (attr) {
	        return attr;
	    };
	    StringAttributeConverter.prototype.FromInterface = function (val) {
	        if (typeof val === 'string') {
	            return this.FromAttribute(val);
	        }
	        throw new Exceptions.InvalidArgumentException("val can't parse");
	    };
	    return StringAttributeConverter;
	})(AttributeConverterBase);
	module.exports = StringAttributeConverter;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var GomlNodeListElement = __webpack_require__(65);
	var gomlList = [
	    new GomlNodeListElement('jthree.geometries', __webpack_require__(66), {
	        "TRI": __webpack_require__(68),
	        "GRID": __webpack_require__(76),
	        "CUBE": __webpack_require__(78),
	        "CIRCLE": __webpack_require__(80),
	        "CYLINDER": __webpack_require__(82),
	        "QUAD": __webpack_require__(84)
	    }),
	    new GomlNodeListElement('jthree.basic', __webpack_require__(66), {
	        "RENDERER": __webpack_require__(86),
	        "VIEWPORT": __webpack_require__(97),
	        "SCENE": __webpack_require__(126),
	    }),
	    new GomlNodeListElement('jthree.materials', __webpack_require__(66), {
	        "SOLID": __webpack_require__(128),
	        "LAMBERT": __webpack_require__(133),
	        "PHONG": __webpack_require__(136),
	        "SPRITE": __webpack_require__(139),
	        "DDEBUG": __webpack_require__(142),
	        "TDEBUG": __webpack_require__(144)
	    }),
	    new GomlNodeListElement('jthree.sceneobject', __webpack_require__(145), {
	        "CAMERA": __webpack_require__(49),
	        "OCAMERA": __webpack_require__(146),
	        "MESH": __webpack_require__(148),
	        "OBJECT": __webpack_require__(149),
	        "PLIGHT": __webpack_require__(150),
	        "DLIGHT": __webpack_require__(154),
	        "PMX": __webpack_require__(160)
	    }),
	    new GomlNodeListElement("jthree.components", __webpack_require__(66), {
	        "COMPONENTS": __webpack_require__(175),
	    }),
	    new GomlNodeListElement("jthree.component", __webpack_require__(176), {
	        "COMPONENT": __webpack_require__(177)
	    }),
	    new GomlNodeListElement("jthree.template", __webpack_require__(178), {
	        "TEMPLATE": __webpack_require__(179)
	    }),
	    new GomlNodeListElement("jthree.pmx.morph", __webpack_require__(180), {
	        "MORPH": __webpack_require__(181),
	    }),
	    new GomlNodeListElement("jthree.pmx.bone", __webpack_require__(182), {
	        "BONE": __webpack_require__(183),
	    }),
	    new GomlNodeListElement("jthree.pmx.contents", __webpack_require__(66), {
	        "MORPHS": __webpack_require__(184),
	        "BONES": __webpack_require__(185)
	    })
	];
	module.exports = gomlList;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var PerspectiveCamera = __webpack_require__(50);
	var GomlTreeCameraNodeBase = __webpack_require__(58);
	var GomlTreeCameraNode = (function (_super) {
	    __extends(GomlTreeCameraNode, _super);
	    function GomlTreeCameraNode(elem, loader, parent, parentSceneNode, parentObject) {
	        var _this = this;
	        _super.call(this, elem, loader, parent, parentSceneNode, parentObject);
	        this.attributes.defineAttribute({
	            "fovy": {
	                value: Math.PI / 4,
	                converter: "angle",
	                handler: function (v) { _this.targetPerspective.Fovy = v.Value; }
	            },
	            "aspect": {
	                value: 1,
	                converter: "number",
	                handler: function (v) { _this.targetPerspective.Aspect = v.Value; }
	            },
	            "near": {
	                value: 0.1,
	                converter: "number",
	                handler: function (v) { _this.targetPerspective.Near = v.Value; }
	            },
	            "far": {
	                value: 10,
	                converter: "number",
	                handler: function (v) { _this.targetPerspective.Far = v.Value; }
	            }
	        });
	    }
	    GomlTreeCameraNode.prototype.ConstructCamera = function () {
	        var camera = new PerspectiveCamera();
	        this.targetPerspective = camera;
	        camera.Fovy = this.Fovy;
	        camera.Aspect = this.Aspect;
	        camera.Near = this.Near;
	        camera.Far = this.Far;
	        return camera;
	    };
	    Object.defineProperty(GomlTreeCameraNode.prototype, "Fovy", {
	        get: function () {
	            return this.attributes.getValue("fovy");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GomlTreeCameraNode.prototype, "Aspect", {
	        get: function () {
	            return this.attributes.getValue("aspect");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GomlTreeCameraNode.prototype, "Near", {
	        get: function () {
	            return this.attributes.getValue("near");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GomlTreeCameraNode.prototype, "Far", {
	        get: function () {
	            return this.attributes.getValue("far");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return GomlTreeCameraNode;
	})(GomlTreeCameraNodeBase);
	module.exports = GomlTreeCameraNode;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var ViewCamera = __webpack_require__(51);
	var Matrix = __webpack_require__(56);
	var PerspectiveCamera = (function (_super) {
	    __extends(PerspectiveCamera, _super);
	    function PerspectiveCamera() {
	        _super.apply(this, arguments);
	        this.fovy = Math.PI / 4;
	        this.aspect = 1;
	        this.near = 0.1;
	        this.far = 10;
	    }
	    PerspectiveCamera.prototype.updateProjection = function () {
	        this.projection = Matrix.perspective(this.fovy, this.aspect, this.near, this.far);
	    };
	    Object.defineProperty(PerspectiveCamera.prototype, "Fovy", {
	        get: function () {
	            return this.fovy;
	        },
	        set: function (fovy) {
	            this.fovy = fovy;
	            this.updateProjection();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PerspectiveCamera.prototype, "Aspect", {
	        get: function () {
	            return this.aspect;
	        },
	        set: function (aspect) {
	            this.aspect = aspect;
	            this.updateProjection();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PerspectiveCamera.prototype, "Near", {
	        get: function () {
	            return this.near;
	        },
	        set: function (near) {
	            this.near = near;
	            this.updateProjection();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PerspectiveCamera.prototype, "Far", {
	        get: function () {
	            return this.far;
	        },
	        set: function (far) {
	            this.far = far;
	            this.updateProjection();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PerspectiveCamera.prototype, "ProjectionMatrix", {
	        get: function () {
	            return this.projection;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return PerspectiveCamera;
	})(ViewCamera);
	module.exports = PerspectiveCamera;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Camera = __webpack_require__(52);
	var Vector3 = __webpack_require__(24);
	var Matrix = __webpack_require__(56);
	var ViewCameraBase = (function (_super) {
	    __extends(ViewCameraBase, _super);
	    function ViewCameraBase() {
	        var _this = this;
	        _super.call(this);
	        this.position = new Vector3(0, 0, 0);
	        this.lookAt = new Vector3(0, 0, -1);
	        this.updir = new Vector3(0, 1, 0);
	        this.UpdateViewMatrix();
	        this.transformer.onUpdateTransform(function (t, o) { return _this.UpdateViewMatrix(o); });
	    }
	    Object.defineProperty(ViewCameraBase.prototype, "Position", {
	        get: function () {
	            return this.position;
	        },
	        set: function (vec) {
	            this.position = vec;
	            this.UpdateViewMatrix();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ViewCameraBase.prototype, "LookAt", {
	        get: function () {
	            return this.lookAt;
	        },
	        set: function (vec) {
	            this.lookAt = vec;
	            this.UpdateViewMatrix();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ViewCameraBase.prototype, "UpDirection", {
	        get: function () {
	            return this.updir;
	        },
	        set: function (vec) {
	            this.updir = vec;
	            this.UpdateViewMatrix();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ViewCameraBase.prototype, "ViewMatrix", {
	        get: function () {
	            return this.viewMatrix;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ViewCameraBase.prototype.UpdateViewMatrix = function (obj) {
	        var cam = obj || this;
	        var newPos = Vector3.add(cam.Position, this.transformer.Position);
	        var pos2la = Vector3.subtract(cam.LookAt, cam.Position);
	        pos2la = Matrix.transformNormal(Matrix.RotationQuaternion(this.transformer.Rotation), pos2la);
	        var newLa = Vector3.add(newPos, pos2la);
	        var newUp = Matrix.transformNormal(Matrix.RotationQuaternion(this.transformer.Rotation), this.updir);
	        this.viewMatrix = Matrix.lookAt(newPos, newLa, newUp);
	    };
	    return ViewCameraBase;
	})(Camera);
	module.exports = ViewCameraBase;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var SceneObject = __webpack_require__(53);
	var Exceptions = __webpack_require__(9);
	var Camera = (function (_super) {
	    __extends(Camera, _super);
	    function Camera() {
	        _super.call(this);
	    }
	    Object.defineProperty(Camera.prototype, "Position", {
	        get: function () {
	            throw new Exceptions.AbstractClassMethodCalledException();
	        },
	        set: function (pos) {
	            throw new Exceptions.AbstractClassMethodCalledException();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Camera.prototype, "LookAt", {
	        get: function () {
	            throw new Exceptions.AbstractClassMethodCalledException();
	        },
	        set: function (vec) {
	            throw new Exceptions.AbstractClassMethodCalledException();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Camera.prototype, "UpDirection", {
	        get: function () {
	            throw new Exceptions.AbstractClassMethodCalledException();
	        },
	        set: function (vec) {
	            throw new Exceptions.AbstractClassMethodCalledException();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Camera.prototype, "ViewMatrix", {
	        get: function () {
	            throw new Exceptions.AbstractClassMethodCalledException();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Camera.prototype, "ProjectionMatrix", {
	        get: function () {
	            throw new Exceptions.AbstractClassMethodCalledException();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Camera.prototype.update = function () {
	        _super.prototype.update.call(this);
	    };
	    return Camera;
	})(SceneObject);
	module.exports = Camera;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObjectWithID = __webpack_require__(31);
	var JThreeCollection = __webpack_require__(54);
	var Transformer = __webpack_require__(55);
	var AssociativeArray = __webpack_require__(8);
	var SceneObject = (function (_super) {
	    __extends(SceneObject, _super);
	    function SceneObject(transformer) {
	        _super.call(this);
	        this.materialChanagedHandler = [];
	        this.materials = new AssociativeArray();
	        this.children = new JThreeCollection();
	        this.transformer = transformer || new Transformer(this);
	    }
	    Object.defineProperty(SceneObject.prototype, "Children", {
	        get: function () {
	            return this.children;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SceneObject.prototype.addChild = function (obj) {
	        this.children.insert(obj);
	        obj.parent = this;
	        obj.Transformer.updateTransform();
	    };
	    Object.defineProperty(SceneObject.prototype, "Parent", {
	        get: function () {
	            return this.parent;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneObject.prototype, "ParentScene", {
	        get: function () {
	            if (!this.parentScene) {
	                if (!this.parent) {
	                    console.warn("Cant't retrieve the scene contain this SceneObject.This SceneObject is not belonging to any Scene.");
	                    return null;
	                }
	                else {
	                    this.parentScene = this.parent.ParentScene;
	                    return this.parentScene;
	                }
	            }
	            else {
	                return this.parentScene;
	            }
	        },
	        set: function (scene) {
	            this.parentScene = scene;
	            if (this.parent.ParentScene.ID != scene.ID)
	                console.error("The is something wrong in Scene structure.");
	            this.children.each(function (v) {
	                v.ParentScene = scene;
	            });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SceneObject.prototype.onMaterialChanged = function (func) {
	        this.materialChanagedHandler.push(func);
	    };
	    SceneObject.prototype.eachMaterial = function (func) {
	        this.materials.forEach(function (v) { return v.each(function (e) { return func(e); }); });
	    };
	    SceneObject.prototype.addMaterial = function (mat) {
	        if (!this.materials.has(mat.MaterialAlias)) {
	            this.materials.set(mat.MaterialAlias, new JThreeCollection());
	        }
	        this.materials.get(mat.MaterialAlias).insert(mat);
	    };
	    SceneObject.prototype.getMaterial = function (matAlias) {
	        if (this.materials.has(matAlias)) {
	            var a = this.materials.get(matAlias);
	            var ret = null;
	            a.each(function (e) {
	                ret = e;
	                return;
	            });
	            return ret;
	        }
	        return null;
	    };
	    SceneObject.prototype.getMaterials = function (matAlias) {
	        if (this.materials.has(matAlias)) {
	            return this.materials.get(matAlias).asArray();
	        }
	        return [];
	    };
	    Object.defineProperty(SceneObject.prototype, "Geometry", {
	        get: function () {
	            return this.geometry;
	        },
	        set: function (geo) {
	            this.geometry = geo;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneObject.prototype, "Transformer", {
	        get: function () {
	            return this.transformer;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SceneObject.prototype.update = function () {
	    };
	    return SceneObject;
	})(JThreeObjectWithID);
	module.exports = SceneObject;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var AssociativeArray = __webpack_require__(8);
	var JThreeCollection = (function () {
	    function JThreeCollection() {
	        this.collection = new AssociativeArray();
	    }
	    JThreeCollection.prototype.getById = function (id) {
	        return this.collection.get(id);
	    };
	    JThreeCollection.prototype.isContained = function (item) {
	        return this.collection.has(item.ID);
	    };
	    JThreeCollection.prototype.insert = function (item) {
	        if (this.collection.has(item.ID)) {
	            return false;
	        }
	        else {
	            this.collection.set(item.ID, item);
	            return true;
	        }
	    };
	    JThreeCollection.prototype.del = function (item) {
	        if (this.collection.has(item.ID)) {
	            this.collection.delete(item.ID);
	            return true;
	        }
	        else
	            return false;
	    };
	    JThreeCollection.prototype.each = function (act) {
	        var _this = this;
	        this.collection.forEach(function (a, b) { return act(a, b, _this); });
	    };
	    JThreeCollection.prototype.asArray = function () {
	        return this.collection.asArray;
	    };
	    return JThreeCollection;
	})();
	module.exports = JThreeCollection;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Quaternion = __webpack_require__(23);
	var Vector3 = __webpack_require__(24);
	var Matrix = __webpack_require__(56);
	var JThreeObject = __webpack_require__(5);
	var glm = __webpack_require__(26);
	var JThreeEvent = __webpack_require__(12);
	var Transformer = (function (_super) {
	    __extends(Transformer, _super);
	    function Transformer(sceneObj) {
	        _super.call(this);
	        this.cacheMat = glm.mat4.create();
	        this.cacheMat2 = glm.mat4.create();
	        this.fowardCache = glm.vec3.create();
	        this.cacheVec = glm.vec4.create();
	        this.onUpdateTransformHandler = new JThreeEvent();
	        this.relatedTo = sceneObj;
	        this.position = Vector3.Zero;
	        this.rotation = Quaternion.Identity;
	        this.scale = new Vector3(1, 1, 1);
	        this.foward = new Vector3(0, 0, -1);
	        this.updateTransform();
	    }
	    Transformer.prototype.onUpdateTransform = function (action) {
	        this.onUpdateTransformHandler.addListerner(action);
	    };
	    Transformer.prototype.updateTransform = function () {
	        glm.mat4.identity(this.cacheMat);
	        glm.mat4.scale(this.cacheMat, this.cacheMat, this.Scale.targetVector);
	        glm.mat4.fromQuat(this.cacheMat2, this.rotation.targetQuat);
	        glm.mat4.multiply(this.cacheMat, this.cacheMat, this.cacheMat2);
	        glm.mat4.identity(this.cacheMat2);
	        glm.mat4.translate(this.cacheMat2, this.cacheMat2, this.position.targetVector);
	        glm.mat4.multiply(this.cacheMat, this.cacheMat, this.cacheMat2);
	        this.localTransform = new Matrix(this.cacheMat);
	        if (this.relatedTo != null && this.relatedTo.Parent != null) {
	            glm.mat4.copy(this.cacheMat2, this.relatedTo.Parent.Transformer.LocalToGlobal.rawElements);
	        }
	        else {
	            glm.mat4.identity(this.cacheMat2);
	        }
	        this.localToGlobal = new Matrix(glm.mat4.multiply(this.cacheMat2, this.cacheMat2, this.localTransform.rawElements));
	        glm.vec4.transformMat4(this.cacheVec, this.cacheMat2, [0, 0, 1, 0]);
	        glm.vec3.normalize(this.fowardCache, this.cacheVec);
	        if (this.relatedTo.Children)
	            this.relatedTo.Children.each(function (v) {
	                v.Transformer.updateTransform();
	            });
	        this.onUpdateTransformHandler.fire(this, this.relatedTo);
	    };
	    Transformer.prototype.calculateMVPMatrix = function (renderer) {
	        return Matrix.multiply(Matrix.multiply(renderer.Camera.ProjectionMatrix, renderer.Camera.ViewMatrix), this.LocalToGlobal);
	    };
	    Object.defineProperty(Transformer.prototype, "Foward", {
	        get: function () {
	            return this.foward;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Transformer.prototype, "LocalToGlobal", {
	        get: function () {
	            return this.localToGlobal;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Transformer.prototype, "Rotation", {
	        get: function () {
	            return this.rotation;
	        },
	        set: function (quat) {
	            this.rotation = quat;
	            this.updateTransform();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Transformer.prototype, "Position", {
	        get: function () {
	            return this.position;
	        },
	        set: function (vec) {
	            this.position = vec;
	            this.updateTransform();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Transformer.prototype, "Scale", {
	        get: function () {
	            return this.scale;
	        },
	        set: function (vec) {
	            this.scale = vec;
	            this.updateTransform();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Transformer;
	})(JThreeObject);
	module.exports = Transformer;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var MatrixBase = __webpack_require__(57);
	var Vector3 = __webpack_require__(24);
	var Vector4 = __webpack_require__(39);
	var glm = __webpack_require__(26);
	var Matrix = (function (_super) {
	    __extends(Matrix, _super);
	    function Matrix(arr) {
	        _super.call(this);
	        this.targetMatrix = glm.mat4.create();
	        this.targetMatrix = arr;
	    }
	    Matrix.zero = function () {
	        return new Matrix([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	    };
	    Matrix.identity = function () {
	        return new Matrix(glm.mat4.create());
	    };
	    Matrix.fromElements = function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
	        return new Matrix([m00, m10, m20, m30, m01, m11, m21, m31, m02, m12, m22, m32, m03, m13, m23, m33]);
	    };
	    Matrix.fromFunc = function (f) {
	        return new Matrix([f(0, 0), f(1, 0), f(2, 0), f(3, 0), f(0, 1), f(1, 1), f(2, 1), f(3, 1), f(0, 2), f(1, 2), f(2, 2), f(3, 2), f(0, 3), f(1, 3), f(2, 3), f(3, 3)]);
	    };
	    Object.defineProperty(Matrix.prototype, "rawElements", {
	        get: function () {
	            return this.targetMatrix;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Matrix.prototype, "RawElements", {
	        get: function () {
	            return this.targetMatrix;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Matrix.prototype.isValidArray = function (arr) {
	        if (arr.length !== 16)
	            return false;
	        return true;
	    };
	    Matrix.prototype.getAt = function (row, colmun) {
	        return this.targetMatrix[colmun * 4 + row];
	    };
	    Matrix.prototype.setAt = function (colmun, row, val) {
	        this.targetMatrix[colmun * 4 + row] = val;
	    };
	    Matrix.prototype.getBySingleIndex = function (index) {
	        return this.targetMatrix[index];
	    };
	    Matrix.prototype.getColmun = function (col) {
	        return new Vector4(this.targetMatrix[col * 4], this.targetMatrix[col * 4 + 1], this.targetMatrix[col * 4 + 2], this.targetMatrix[col * 4 + 3]);
	    };
	    Matrix.prototype.getRow = function (row) {
	        return new Vector4(this.targetMatrix[row], this.targetMatrix[row + 4], this.targetMatrix[row + 8], this.targetMatrix[row + 12]);
	    };
	    Matrix.equal = function (m1, m2) {
	        return Matrix.elementEqual(m1, m2);
	    };
	    Matrix.add = function (m1, m2) {
	        var mat = glm.mat4.create();
	        for (var i = 0; i < 16; i++) {
	            mat[i] = m1.targetMatrix[i] + m2.targetMatrix[i];
	        }
	        return new Matrix(mat);
	    };
	    Matrix.subtract = function (m1, m2) {
	        return Matrix.add(m1, Matrix.negate(m2));
	    };
	    Matrix.scalarMultiply = function (s, m) {
	        var newMat = glm.mat4.create();
	        glm.mat4.multiply(newMat, [s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s], m.targetMatrix);
	        return new Matrix(newMat);
	    };
	    Matrix.multiply = function (m1, m2) {
	        var newMat = glm.mat4.create();
	        return new Matrix(glm.mat4.mul(newMat, m1.targetMatrix, m2.targetMatrix));
	    };
	    Matrix.TRS = function (t, rot, s) {
	        var newMat = glm.mat4.create();
	        var cacheMat = glm.mat4.create();
	        glm.mat4.mul(newMat, glm.mat4.translate(newMat, glm.mat4.create(), t.targetVector), glm.mat4.fromQuat(cacheMat, rot.targetQuat));
	        glm.mat4.scale(newMat, newMat, s.targetVector);
	        return new Matrix(newMat);
	    };
	    Matrix.negate = function (m) {
	        return this.scalarMultiply(-1, m);
	    };
	    Matrix.transpose = function (m) {
	        var newMat = glm.mat4.create();
	        return new Matrix(glm.mat4.transpose(newMat, m.targetMatrix));
	    };
	    Matrix.transformPoint = function (m, t) {
	        var newVec = glm.vec3.create();
	        glm.vec3.transformMat4(newVec, t.targetVector, m.targetMatrix);
	        return new Vector3(newVec);
	    };
	    Matrix.transformNormal = function (m, t) {
	        var newVec = glm.vec4.create();
	        var trans = glm.vec4.create();
	        trans[0] = t.X;
	        trans[1] = t.Y;
	        trans[2] = t.Z;
	        trans[3] = 0;
	        glm.vec4.transformMat4(newVec, trans, m.targetMatrix);
	        return new Vector3(newVec[0], newVec[1], newVec[2]);
	    };
	    Matrix.transform = function (m, t) {
	        var newVec = glm.vec4.create();
	        var trans = glm.vec4.create();
	        trans[0] = t.X;
	        trans[1] = t.Y;
	        trans[2] = t.Z;
	        trans[3] = t.W;
	        glm.vec4.transformMat4(newVec, trans, m.targetMatrix);
	        return new Vector4(newVec[0], newVec[1], newVec[2], newVec[3]);
	    };
	    Matrix.determinant = function (m) {
	        return glm.mat4.determinant(m.targetMatrix);
	    };
	    Matrix.inverse = function (m) {
	        var newMat = glm.mat4.create();
	        return new Matrix(glm.mat4.invert(newMat, m.targetMatrix));
	    };
	    Matrix.translate = function (v) {
	        var newMat = glm.mat4.create();
	        glm.mat4.translate(newMat, newMat, v.targetVector);
	        return new Matrix(newMat);
	    };
	    Matrix.scale = function (v) {
	        var newMat = glm.mat4.create();
	        glm.mat4.scale(newMat, newMat, v.targetVector);
	        return new Matrix(newMat);
	    };
	    Matrix.rotateX = function (angle) {
	        var newMat = glm.mat4.create();
	        glm.mat4.rotateX(newMat, newMat, angle);
	        return new Matrix(newMat);
	    };
	    Matrix.rotateY = function (angle) {
	        var newMat = glm.mat4.create();
	        glm.mat4.rotateY(newMat, newMat, angle);
	        return new Matrix(newMat);
	    };
	    Matrix.rotateZ = function (angle) {
	        var newMat = glm.mat4.create();
	        glm.mat4.rotateZ(newMat, newMat, angle);
	        return new Matrix(newMat);
	    };
	    Matrix.RotationQuaternion = function (quat) {
	        var quaternion = glm.quat.create();
	        var newMat = glm.mat4.create();
	        glm.quat.normalize(quaternion, quat.targetQuat);
	        glm.mat4.fromQuat(newMat, quaternion);
	        return new Matrix(newMat);
	    };
	    Matrix.frustum = function (left, right, bottom, top, near, far) {
	        var newMat = glm.mat4.create();
	        glm.mat4.frustum(newMat, left, right, bottom, top, near, far);
	        return new Matrix(newMat);
	    };
	    Matrix.ortho = function (left, right, bottom, top, near, far) {
	        var newMat = glm.mat4.create();
	        glm.mat4.ortho(newMat, left, right, bottom, top, near, far);
	        return new Matrix(newMat);
	    };
	    Matrix.perspective = function (fovy, aspect, near, far) {
	        var newMat = glm.mat4.create();
	        glm.mat4.perspective(newMat, fovy, aspect, near, far);
	        return new Matrix(newMat);
	    };
	    Matrix.lookAt = function (eye, lookAt, up) {
	        var newMat = glm.mat4.create();
	        glm.mat4.lookAt(newMat, eye.targetVector, lookAt.targetVector, up.targetVector);
	        return new Matrix(newMat);
	    };
	    Matrix.prototype.multiplyWith = function (m) {
	        return Matrix.multiply(this, m);
	    };
	    Matrix.prototype.toString = function () {
	        return ("|" + this.getBySingleIndex(0) + " " + this.getBySingleIndex(4) + " " + this.getBySingleIndex(8) + " " + this.getBySingleIndex(12) + "|\n\n                 |" + this.getBySingleIndex(1) + " " + this.getBySingleIndex(5) + " " + this.getBySingleIndex(9) + " " + this.getBySingleIndex(13) + "|\n\n                 |" + this.getBySingleIndex(2) + " " + this.getBySingleIndex(6) + " " + this.getBySingleIndex(10) + " " + this.getBySingleIndex(14) + "|\n\n                 |" + this.getBySingleIndex(3) + " " + this.getBySingleIndex(7) + " " + this.getBySingleIndex(11) + " " + this.getBySingleIndex(15) + "|");
	    };
	    Object.defineProperty(Matrix.prototype, "ElementCount", {
	        get: function () { return 16; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Matrix.prototype, "RowCount", {
	        get: function () { return 4; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Matrix.prototype, "ColmunCount", {
	        get: function () { return 4; },
	        enumerable: true,
	        configurable: true
	    });
	    return Matrix;
	})(MatrixBase);
	module.exports = Matrix;


/***/ },
/* 57 */
/***/ function(module, exports) {

	var MatrixBase = (function () {
	    function MatrixBase() {
	    }
	    MatrixBase.elementEqual = function (m1, m2) {
	        if (m1.RowCount !== m2.RowCount || m1.ColmunCount !== m2.ColmunCount)
	            return false;
	        var count = m1.RowCount * m2.ColmunCount;
	        for (var i = 0; i < count; i++) {
	            if (m1.getBySingleIndex(i) !== m2.getBySingleIndex(i))
	                return false;
	        }
	        return true;
	    };
	    Object.defineProperty(MatrixBase.prototype, "RowCount", {
	        get: function () {
	            return 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MatrixBase.prototype, "ColmunCount", {
	        get: function () {
	            return 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MatrixBase.prototype.getAt = function (row, colmun) {
	        throw new Error("Not implemented");
	    };
	    MatrixBase.prototype.getBySingleIndex = function (index) {
	        throw new Error("Not implemented");
	    };
	    Object.defineProperty(MatrixBase.prototype, "RawElements", {
	        get: function () {
	            return null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return MatrixBase;
	})();
	module.exports = MatrixBase;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeID = __webpack_require__(32);
	var SceneObjectNodeBase = __webpack_require__(59);
	var GomlTreeCameraNodeBase = (function (_super) {
	    __extends(GomlTreeCameraNodeBase, _super);
	    function GomlTreeCameraNodeBase(elem, loader, parent, parentSceneNode, parentObject) {
	        _super.call(this, elem, loader, parent, parentSceneNode, parentObject);
	        loader.nodeRegister.addObject("jthree.camera", this.Name, this);
	    }
	    Object.defineProperty(GomlTreeCameraNodeBase.prototype, "TargetCamera", {
	        get: function () {
	            return this.targetCamera;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    GomlTreeCameraNodeBase.prototype.ConstructCamera = function () {
	        return null;
	    };
	    GomlTreeCameraNodeBase.prototype.ConstructTarget = function () {
	        this.targetCamera = this.ConstructCamera();
	        return this.targetCamera;
	    };
	    GomlTreeCameraNodeBase.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	    };
	    GomlTreeCameraNodeBase.prototype.Load = function () {
	        _super.prototype.Load.call(this);
	        this.ContainedSceneNode.targetScene.addCamera(this.targetCamera);
	    };
	    Object.defineProperty(GomlTreeCameraNodeBase.prototype, "Name", {
	        get: function () {
	            this.name = this.name || this.element.getAttribute('name') || JThreeID.getUniqueRandom(10);
	            return this.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return GomlTreeCameraNodeBase;
	})(SceneObjectNodeBase);
	module.exports = GomlTreeCameraNodeBase;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GomlTreeNodeBase = __webpack_require__(60);
	var Vector3 = __webpack_require__(24);
	var Quaternion = __webpack_require__(23);
	var AttributeParser = __webpack_require__(22);
	var SceneObjectNodeBase = (function (_super) {
	    __extends(SceneObjectNodeBase, _super);
	    function SceneObjectNodeBase(elem, loader, parent, parentSceneNode, parentObject) {
	        var _this = this;
	        _super.call(this, elem, loader, parent);
	        this.containedSceneNode = null;
	        this.parentSceneObjectNode = null;
	        this.containedSceneNode = parentSceneNode;
	        this.parentSceneObjectNode = parentObject;
	        this.attributes.defineAttribute({
	            "position": {
	                value: new Vector3(0, 0, 0),
	                converter: "vector3", handler: function (v) { if (_this.targetSceneObject != null)
	                    _this.targetSceneObject.Transformer.Position = v.Value; }
	            },
	            "scale": {
	                value: new Vector3(1, 1, 1),
	                converter: "vector3", handler: function (v) { if (_this.targetSceneObject != null)
	                    _this.targetSceneObject.Transformer.Scale = v.Value; }
	            },
	            "rotation": {
	                value: Quaternion.Identity,
	                converter: "rotation",
	                handler: function (v) {
	                    if (_this.targetSceneObject != null)
	                        _this.targetSceneObject.Transformer.Rotation = v.Value;
	                }
	            }
	        });
	    }
	    SceneObjectNodeBase.prototype.ConstructTarget = function () {
	        return null;
	    };
	    SceneObjectNodeBase.prototype.targetUpdated = function () {
	    };
	    SceneObjectNodeBase.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	        this.targetSceneObject = this.ConstructTarget();
	        if (this.targetSceneObject == null)
	            return;
	        if (!this.targetSceneObject) {
	            console.error("SceneObject node must override ConstructTarget and return the object extending SceneObjnect");
	        }
	        else {
	            if (this.parentSceneObjectNode == null)
	                this.containedSceneNode.targetScene.addObject(this.targetSceneObject);
	            else {
	                this.parentSceneObjectNode.targetSceneObject.addChild(this.targetSceneObject);
	                this.ContainedSceneNode.targetScene.addRenderQueue(this.targetSceneObject);
	            }
	        }
	        this.attributes.applyDefaultValue();
	    };
	    Object.defineProperty(SceneObjectNodeBase.prototype, "ContainedSceneNode", {
	        get: function () {
	            return this.containedSceneNode;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneObjectNodeBase.prototype, "ParentSceneObjectNode", {
	        get: function () {
	            return this.parentSceneObjectNode;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneObjectNodeBase.prototype, "Position", {
	        get: function () {
	            return this.position || Vector3.parse(this.element.getAttribute('position') || "0");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneObjectNodeBase.prototype, "Rotation", {
	        get: function () {
	            return this.rotation || AttributeParser.ParseRotation3D(this.element.getAttribute('rotation') || "x(0)");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SceneObjectNodeBase.prototype, "Scale", {
	        get: function () {
	            return this.scale || Vector3.parse(this.element.getAttribute('scale') || "1");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return SceneObjectNodeBase;
	})(GomlTreeNodeBase);
	module.exports = SceneObjectNodeBase;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var AttributeDictionary = __webpack_require__(61);
	var ComponentContainerNode = __webpack_require__(63);
	var GomlTreeNodeBase = (function (_super) {
	    __extends(GomlTreeNodeBase, _super);
	    function GomlTreeNodeBase(elem, loader, parent) {
	        _super.call(this, elem, parent, loader);
	        elem.classList.add("x-j3-" + this.ID);
	        elem.setAttribute('x-j3-id', this.ID);
	        loader.NodesById.set(this.ID, this);
	        this.attributes = new AttributeDictionary(this, loader, elem);
	    }
	    GomlTreeNodeBase.prototype.beforeLoad = function () {
	    };
	    GomlTreeNodeBase.prototype.Load = function () {
	    };
	    GomlTreeNodeBase.prototype.afterLoad = function () {
	    };
	    return GomlTreeNodeBase;
	})(ComponentContainerNode);
	module.exports = GomlTreeNodeBase;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var JThreeCollection = __webpack_require__(54);
	var GomlAttribute = __webpack_require__(62);
	var AttributeDictionary = (function (_super) {
	    __extends(AttributeDictionary, _super);
	    function AttributeDictionary(node, loader, element) {
	        _super.call(this);
	        this.attributes = new JThreeCollection();
	        this.loader = loader;
	        this.element = element;
	        this.node = node;
	    }
	    AttributeDictionary.prototype.getValue = function (attrName) {
	        var attr = this.attributes.getById(attrName);
	        if (attr == null)
	            console.warn("attribute \"" + attrName + "\" is not found.");
	        else
	            return attr.Converter.FromInterface(attr.Value);
	    };
	    AttributeDictionary.prototype.setValue = function (attrName, value) {
	        var attr = this.attributes.getById(attrName);
	        if (attr == null)
	            console.warn("attribute \"" + attrName + "\" is not found.");
	        else
	            attr.Value = attr.Converter.FromInterface(value);
	    };
	    AttributeDictionary.prototype.getAnimater = function (attrName, beginTime, duration, beginVal, endVal, easing, onComplete) {
	        var attr = this.attributes.getById(attrName);
	        if (attr == null)
	            console.warn("attribute \"" + attrName + "\" is not found.");
	        else
	            return attr.Converter.GetAnimater(attr, beginVal, endVal, beginTime, duration, easing, onComplete);
	    };
	    AttributeDictionary.prototype.isDefined = function (attrName) {
	        return this.attributes.getById(attrName) != null;
	    };
	    AttributeDictionary.prototype.defineAttribute = function (attributes) {
	        for (var key in attributes) {
	            var attribute = attributes[key];
	            this.attributes.insert(new GomlAttribute(this.node, this.element, key, attribute.value, this.loader.Configurator.getConverter(attribute.converter), attribute.handler));
	        }
	    };
	    AttributeDictionary.prototype.applyDefaultValue = function () {
	        this.attributes.each(function (v) {
	            if (typeof v.Value !== 'undefined')
	                v.notifyValueChanged();
	        });
	    };
	    AttributeDictionary.prototype.updateValue = function (attrName) {
	        if (typeof attrName === 'undefined') {
	            this.attributes.each(function (v) {
	                v.notifyValueChanged();
	            });
	        }
	        else {
	            var target = this.attributes.getById(attrName);
	            target.notifyValueChanged();
	        }
	    };
	    return AttributeDictionary;
	})(JThreeObject);
	module.exports = AttributeDictionary;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObjectWithID = __webpack_require__(31);
	var JThreeEvent = __webpack_require__(12);
	var GomlAttribute = (function (_super) {
	    __extends(GomlAttribute, _super);
	    function GomlAttribute(node, element, name, value, converter, handler) {
	        _super.call(this, name);
	        this.cached = false;
	        this.value = undefined;
	        this.onchangedHandlers = new JThreeEvent();
	        this.element = element;
	        this.converter = converter;
	        this.value = converter.FromInterface(value);
	        this.managedClass = node;
	        if (handler)
	            this.onchangedHandlers.addListerner(handler);
	    }
	    Object.defineProperty(GomlAttribute.prototype, "Name", {
	        get: function () {
	            return this.ID;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GomlAttribute.prototype, "Value", {
	        get: function () {
	            if (this.cached) {
	                return this.value;
	            }
	            else {
	                var attr = this.element.getAttribute(this.Name);
	                if (attr) {
	                    this.value = this.Converter.FromAttribute(this.element.getAttribute(this.Name));
	                    this.cached = true;
	                }
	                return this.value;
	            }
	        },
	        set: function (val) {
	            this.value = this.Converter.FromInterface(val);
	            this.element.setAttribute(this.Name, this.Converter.ToAttribute(val));
	            this.cached = true;
	            this.notifyValueChanged();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GomlAttribute.prototype, "Converter", {
	        get: function () {
	            return this.converter;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    GomlAttribute.prototype.notifyValueChanged = function () {
	        var t = this;
	        this.onchangedHandlers.fire(this, this);
	    };
	    return GomlAttribute;
	})(JThreeObjectWithID);
	module.exports = GomlAttribute;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var TreeNodeBase = __webpack_require__(64);
	var AssociativeArray = __webpack_require__(8);
	var ComponentContainerNodeBase = (function (_super) {
	    __extends(ComponentContainerNodeBase, _super);
	    function ComponentContainerNodeBase(elem, parent, loader) {
	        _super.call(this, elem, parent);
	        this.components = new AssociativeArray();
	        this.loader = loader;
	    }
	    ComponentContainerNodeBase.prototype.addComponent = function (component) {
	        this.loader.componentRunner.addComponent(component, this);
	        if (!this.components.has(component.ComponentName))
	            this.components.set(component.ComponentName, []);
	        this.components.get(component.ComponentName).push(component);
	    };
	    ComponentContainerNodeBase.prototype.getComponents = function (componentName) {
	        return this.components.get(componentName);
	    };
	    return ComponentContainerNodeBase;
	})(TreeNodeBase);
	module.exports = ComponentContainerNodeBase;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObjectWithID = __webpack_require__(31);
	var TreeNodeBase = (function (_super) {
	    __extends(TreeNodeBase, _super);
	    function TreeNodeBase(elem, parent) {
	        _super.call(this);
	        this.children = [];
	        this.element = elem;
	        if (parent != null)
	            parent.addChild(this);
	    }
	    Object.defineProperty(TreeNodeBase.prototype, "Element", {
	        get: function () {
	            return this.element;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TreeNodeBase.prototype.addChild = function (child) {
	        child.parent = this;
	        this.children.push(child);
	        console.log("children changed this:" + this + " child:" + child);
	    };
	    TreeNodeBase.prototype.callRecursive = function (act) {
	        act(this);
	        this.children.forEach(function (v) { return v.callRecursive(act); });
	    };
	    return TreeNodeBase;
	})(JThreeObjectWithID);
	module.exports = TreeNodeBase;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var GomlNodeListElement = (function (_super) {
	    __extends(GomlNodeListElement, _super);
	    function GomlNodeListElement(group, factory, nodeTypes) {
	        _super.call(this);
	        this.group = group;
	        this.nodeTypes = nodeTypes;
	        this.factory = factory;
	    }
	    Object.defineProperty(GomlNodeListElement.prototype, "Group", {
	        get: function () {
	            return this.group;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GomlNodeListElement.prototype, "NodeTypes", {
	        get: function () {
	            return this.nodeTypes;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GomlNodeListElement.prototype, "Factory", {
	        get: function () {
	            return this.factory;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return GomlNodeListElement;
	})(JThreeObject);
	module.exports = GomlNodeListElement;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var jThreeObject = __webpack_require__(5);
	var JThreeContextProxy = __webpack_require__(67);
	var TagFactory = (function (_super) {
	    __extends(TagFactory, _super);
	    function TagFactory(tagName, nodeType) {
	        _super.call(this);
	        this.tagName = tagName;
	        this.nodeType = nodeType;
	    }
	    Object.defineProperty(TagFactory.prototype, "TagName", {
	        get: function () {
	            return this.tagName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TagFactory.prototype, "NoNeedParseChildren", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TagFactory.prototype.CreateNodeForThis = function (elem, loader, parent) {
	        return new this.nodeType(elem, loader, parent);
	    };
	    TagFactory.prototype.getTag = function (name) {
	        return JThreeContextProxy.getJThreeContext().GomlLoader.Configurator.getGomlTagFactory(name);
	    };
	    return TagFactory;
	})(jThreeObject);
	module.exports = TagFactory;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var JThreeContextProxy = (function (_super) {
	    __extends(JThreeContextProxy, _super);
	    function JThreeContextProxy() {
	        _super.apply(this, arguments);
	    }
	    JThreeContextProxy.getJThreeContext = function () {
	        JThreeContextProxy.instance = JThreeContextProxy.instance || __webpack_require__(2).getInstanceForProxy();
	        return JThreeContextProxy.instance;
	    };
	    return JThreeContextProxy;
	})(JThreeObject);
	module.exports = JThreeContextProxy;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GeometryNodeBase = __webpack_require__(69);
	var Vector3 = __webpack_require__(24);
	var TriangleGeometry = __webpack_require__(70);
	var GomlTreeTriNode = (function (_super) {
	    __extends(GomlTreeTriNode, _super);
	    function GomlTreeTriNode(elem, loader, parent) {
	        _super.call(this, elem, loader, parent);
	    }
	    GomlTreeTriNode.prototype.ConstructGeometry = function () {
	        return this.TriGeometry = new TriangleGeometry(this.Name);
	    };
	    GomlTreeTriNode.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	        this.TriGeometry.First = this.First;
	        this.TriGeometry.Second = this.Second;
	        this.TriGeometry.Third = this.Third;
	    };
	    Object.defineProperty(GomlTreeTriNode.prototype, "First", {
	        get: function () {
	            this.first = this.first || Vector3.parse(this.element.getAttribute('first') || "(-1,0,0)");
	            return this.first;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GomlTreeTriNode.prototype, "Second", {
	        get: function () {
	            this.second = this.second || Vector3.parse(this.element.getAttribute('second') || "(0,1,0)");
	            return this.second;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GomlTreeTriNode.prototype, "Third", {
	        get: function () {
	            this.third = this.third || Vector3.parse(this.element.getAttribute('third') || "(1,0,0)");
	            return this.third;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return GomlTreeTriNode;
	})(GeometryNodeBase);
	module.exports = GomlTreeTriNode;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GomlTreeNodeBase = __webpack_require__(60);
	var JThreeID = __webpack_require__(32);
	var GomlTreeGeometryNode = (function (_super) {
	    __extends(GomlTreeGeometryNode, _super);
	    function GomlTreeGeometryNode(elem, loader, parent) {
	        _super.call(this, elem, loader, parent);
	        this.lazy = undefined;
	    }
	    Object.defineProperty(GomlTreeGeometryNode.prototype, "Name", {
	        get: function () {
	            this.name = this.name || this.element.getAttribute('name') || JThreeID.getUniqueRandom(10);
	            return this.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GomlTreeGeometryNode.prototype, "Lazy", {
	        get: function () {
	            this.lazy = typeof this.lazy === 'undefined' ? this.element.getAttribute('lazy').toLowerCase() == 'true' : this.lazy;
	            return this.lazy;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GomlTreeGeometryNode.prototype, "TargetGeometry", {
	        get: function () {
	            return this.targetGeometry;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    GomlTreeGeometryNode.prototype.ConstructGeometry = function () {
	        return null;
	    };
	    GomlTreeGeometryNode.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	        this.targetGeometry = this.ConstructGeometry();
	        this.loader.nodeRegister.addObject("jthree.geometries", this.Name, this);
	    };
	    return GomlTreeGeometryNode;
	})(GomlTreeNodeBase);
	module.exports = GomlTreeGeometryNode;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Geometry = __webpack_require__(71);
	var JThreeContextProxy = __webpack_require__(67);
	var BufferTargetType = __webpack_require__(73);
	var BufferUsageType = __webpack_require__(74);
	var ElementType = __webpack_require__(75);
	var Vector3 = __webpack_require__(24);
	var PrimitiveTopology = __webpack_require__(72);
	var TriangleGeometry = (function (_super) {
	    __extends(TriangleGeometry, _super);
	    function TriangleGeometry(name) {
	        _super.call(this);
	        this.first = new Vector3(0, 1, 0);
	        this.second = new Vector3(1, 0, 0);
	        this.third = new Vector3(-1, 0, 0);
	        var j3 = JThreeContextProxy.getJThreeContext();
	        this.primitiveTopology = PrimitiveTopology.Triangles;
	        this.indexBuffer = j3.ResourceManager.createBuffer(name + "index", BufferTargetType.ElementArrayBuffer, BufferUsageType.StaticDraw, 1, ElementType.UnsignedByte);
	        this.positionBuffer = j3.ResourceManager.createBuffer(name + "-pos", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
	        this.normalBuffer = j3.ResourceManager.createBuffer(name + "-nor", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
	        this.uvBuffer = j3.ResourceManager.createBuffer(name + "-uv", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 2, ElementType.Float);
	        this.updateBuffers();
	    }
	    Object.defineProperty(TriangleGeometry.prototype, "First", {
	        set: function (vec) {
	            this.first = vec;
	            this.updateBuffers();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TriangleGeometry.prototype, "Second", {
	        set: function (vec) {
	            this.second = vec;
	            this.updateBuffers();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TriangleGeometry.prototype, "Third", {
	        set: function (vec) {
	            this.third = vec;
	            this.updateBuffers();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TriangleGeometry.prototype.updatePositionBuffer = function () {
	        this.positionBuffer.update(new Float32Array([this.first.X, this.first.Y, this.first.Z, this.second.X, this.second.Y, this.second.Z, this.third.X, this.third.Y, this.third.Z]), 9);
	    };
	    TriangleGeometry.prototype.updateNormalBuffer = function () {
	        this.normalBuffer.update(new Float32Array([0, 0, -1, 0, 0, -1, 0, 0, -1]), 9);
	    };
	    TriangleGeometry.prototype.updateUvBuffer = function () {
	        this.uvBuffer.update(new Float32Array([0.5, 0.5, 1, 0, 0, 0]), 6);
	    };
	    TriangleGeometry.prototype.updateIndexBuffer = function () {
	        this.indexBuffer.update(new Uint8Array([0, 1, 2]), 3);
	    };
	    TriangleGeometry.prototype.updateBuffers = function () {
	        this.updatePositionBuffer();
	        this.updateNormalBuffer();
	        this.updateUvBuffer();
	        this.updateIndexBuffer();
	    };
	    return TriangleGeometry;
	})(Geometry);
	module.exports = TriangleGeometry;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var jThreeObject = __webpack_require__(5);
	var PrimitiveTopology = __webpack_require__(72);
	var Vector3 = __webpack_require__(24);
	var Geometry = (function (_super) {
	    __extends(Geometry, _super);
	    function Geometry() {
	        _super.apply(this, arguments);
	        this.primitiveTopology = PrimitiveTopology.Triangles;
	    }
	    Object.defineProperty(Geometry.prototype, "PositionBuffer", {
	        get: function () {
	            return this.positionBuffer;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Geometry.prototype, "NormalBuffer", {
	        get: function () {
	            return this.normalBuffer;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Geometry.prototype, "UVBuffer", {
	        get: function () {
	            return this.uvBuffer;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Geometry.prototype, "IndexBuffer", {
	        get: function () {
	            return this.indexBuffer;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Geometry.prototype, "PrimitiveTopology", {
	        get: function () {
	            return this.primitiveTopology;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Geometry.prototype.drawElements = function (contextManager, material) {
	        contextManager.Context.DrawElements(this.PrimitiveTopology, this.IndexBuffer.Length, this.IndexBuffer.ElementType, 0);
	    };
	    Geometry.prototype.addQuad = function (pos, normal, uv, index, points) {
	        var v0 = points[0], v1 = points[1], v2 = points[2];
	        var v02v1 = v1.subtractWith(v0);
	        var v02v2 = v2.subtractWith(v0);
	        var v3 = v0.addWith(v02v1).addWith(v02v2);
	        var nV = v02v2.crossWith(v02v1).normalizeThis();
	        var startIndex = pos.length / 3;
	        normal.push(nV.X, nV.Y, nV.Z, nV.X, nV.Y, nV.Z, nV.X, nV.Y, nV.Z, nV.X, nV.Y, nV.Z);
	        uv.push(0, 1, 1, 1, 1, 0, 0, 0);
	        pos.push(v0.X, v0.Y, v0.Z, v1.X, v1.Y, v1.Z, v3.X, v3.Y, v3.Z, v2.X, v2.Y, v2.Z);
	        index.push(startIndex, startIndex + 2, startIndex + 1, startIndex, startIndex + 3, startIndex + 2);
	    };
	    Geometry.prototype.addCircle = function (pos, normal, uv, index, divide, center, normalVector, tangentVector) {
	        var tan2 = Vector3.cross(tangentVector, normalVector);
	        var vecCount = 2 + divide;
	        var baseIndex = uv.length / 2;
	        for (var i = 0; i < vecCount; i++) {
	            var v = this.calcNextPointInCircle(i, divide, center, tangentVector, tan2);
	            var u = this.calcUVInCircle(i, divide);
	            pos.push(v.X, v.Y, v.Z);
	            normal.push(normalVector.X, normalVector.Y, normalVector.Z);
	            uv.push(u[0], u[1]);
	        }
	        for (var i = 0; i < divide; i++) {
	            index.push(baseIndex);
	            index.push(baseIndex + i + 2);
	            index.push(baseIndex + i + 1);
	        }
	    };
	    Geometry.prototype.calcUVInCircle = function (index, divCount) {
	        if (index == 0)
	            return [0, 0];
	        var angle = (index - 1) * 2 * Math.PI / divCount;
	        return [Math.cos(angle), Math.sin(angle)];
	    };
	    Geometry.prototype.calcNextPointInCircle = function (index, divCount, center, tan, tan2) {
	        var angle = (index - 1) * 2 * Math.PI / divCount;
	        return index === 0 ? center :
	            Vector3.add(center, Vector3.add(tan.multiplyWith(Math.sin(angle)), tan2.multiplyWith(Math.cos(angle))));
	    };
	    Geometry.prototype.addCylinder = function (pos, normal, uv, index, divide, start, end, tangent, radius) {
	        var dest = Vector3.subtract(end, start);
	        var tangentNormalized = tangent.normalizeThis();
	        var tan2 = Vector3.cross(dest.normalizeThis(), tangentNormalized);
	        tangentNormalized = tangentNormalized.multiplyWith(radius);
	        tan2 = tan2.multiplyWith(radius);
	        for (var i = 0; i < divide; i++) {
	            var angle = (i - 1) * 2 * Math.PI / divide;
	            var angleTo = i * 2 * Math.PI / divide;
	            var currentNormal = Vector3.add(tan2.multiplyWith(Math.cos(angle)), tangentNormalized.multiplyWith(Math.sin(angle)));
	            var nextNormal = Vector3.add(tan2.multiplyWith(Math.cos(angleTo)), tangentNormalized.multiplyWith(Math.sin(angleTo)));
	            var v0 = Vector3.add(start, currentNormal);
	            var v1 = Vector3.add(start, nextNormal);
	            var v2 = Vector3.add(v0, dest);
	            var v3 = v1.addWith(dest);
	            var startIndex = pos.length / 3;
	            normal.push(currentNormal.X, currentNormal.Y, currentNormal.Z, nextNormal.X, nextNormal.Y, nextNormal.Z, nextNormal.X, nextNormal.Y, nextNormal.Z, currentNormal.X, currentNormal.Y, currentNormal.Z);
	            uv.push(0, 1, 1, 0, 1, 0, 0, 0);
	            pos.push(v0.X, v0.Y, v0.Z, v1.X, v1.Y, v1.Z, v3.X, v3.Y, v3.Z, v2.X, v2.Y, v2.Z);
	            index.push(startIndex, startIndex + 1, startIndex + 2, startIndex, startIndex + 2, startIndex + 3);
	        }
	    };
	    Geometry.prototype.bindIndexBuffer = function (contextManager) {
	        this.IndexBuffer.getForRenderer(contextManager).bindBuffer();
	    };
	    return Geometry;
	})(jThreeObject);
	module.exports = Geometry;


/***/ },
/* 72 */
/***/ function(module, exports) {

	var PrimitiveTopology;
	(function (PrimitiveTopology) {
	    PrimitiveTopology[PrimitiveTopology["Triangles"] = 4] = "Triangles";
	    PrimitiveTopology[PrimitiveTopology["TriangleStrip"] = 5] = "TriangleStrip";
	    PrimitiveTopology[PrimitiveTopology["TriangleFan"] = 6] = "TriangleFan";
	    PrimitiveTopology[PrimitiveTopology["Lines"] = 1] = "Lines";
	    PrimitiveTopology[PrimitiveTopology["LineStrip"] = 3] = "LineStrip";
	    PrimitiveTopology[PrimitiveTopology["LineLoop"] = 2] = "LineLoop";
	    PrimitiveTopology[PrimitiveTopology["Points"] = 0] = "Points";
	})(PrimitiveTopology || (PrimitiveTopology = {}));
	module.exports = PrimitiveTopology;


/***/ },
/* 73 */
/***/ function(module, exports) {

	var BufferTargetType;
	(function (BufferTargetType) {
	    BufferTargetType[BufferTargetType["ArrayBuffer"] = 34962] = "ArrayBuffer";
	    BufferTargetType[BufferTargetType["ElementArrayBuffer"] = 34963] = "ElementArrayBuffer";
	})(BufferTargetType || (BufferTargetType = {}));
	module.exports = BufferTargetType;


/***/ },
/* 74 */
/***/ function(module, exports) {

	var BufferUsageType;
	(function (BufferUsageType) {
	    BufferUsageType[BufferUsageType["StaticDraw"] = 35044] = "StaticDraw";
	    BufferUsageType[BufferUsageType["StreamDraw"] = 35040] = "StreamDraw";
	    BufferUsageType[BufferUsageType["DynamicDraw"] = 35048] = "DynamicDraw";
	})(BufferUsageType || (BufferUsageType = {}));
	module.exports = BufferUsageType;


/***/ },
/* 75 */
/***/ function(module, exports) {

	var ElementType;
	(function (ElementType) {
	    ElementType[ElementType["Float"] = 5126] = "Float";
	    ElementType[ElementType["UnsignedByte"] = 5121] = "UnsignedByte";
	    ElementType[ElementType["Short"] = 5122] = "Short";
	    ElementType[ElementType["UnsignedShort"] = 5123] = "UnsignedShort";
	    ElementType[ElementType["UnsignedInt"] = 5125] = "UnsignedInt";
	    ElementType[ElementType["Int"] = 5124] = "Int";
	})(ElementType || (ElementType = {}));
	module.exports = ElementType;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GeometryNodeBase = __webpack_require__(69);
	var GridGeometry = __webpack_require__(77);
	var GridGeometryNode = (function (_super) {
	    __extends(GridGeometryNode, _super);
	    function GridGeometryNode(elem, loader, parent) {
	        _super.call(this, elem, loader, parent);
	        this.hdiv = 10;
	        this.vdiv = 10;
	    }
	    GridGeometryNode.prototype.ConstructGeometry = function () {
	        return this.gridGeometry = new GridGeometry(this.Name);
	    };
	    GridGeometryNode.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	        this.gridGeometry.HolizontalDivide = this.HDiv;
	        this.gridGeometry.VerticalDivide = this.VDiv;
	    };
	    Object.defineProperty(GridGeometryNode.prototype, "HDiv", {
	        get: function () {
	            this.hdiv = parseFloat(this.element.getAttribute('hdiv'));
	            this.hdiv = this.hdiv || 10;
	            return this.hdiv;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GridGeometryNode.prototype, "VDiv", {
	        get: function () {
	            this.vdiv = parseFloat(this.element.getAttribute('vdiv'));
	            this.vdiv = this.vdiv || 10;
	            return this.vdiv;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return GridGeometryNode;
	})(GeometryNodeBase);
	module.exports = GridGeometryNode;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Geometry = __webpack_require__(71);
	var JThreeContextProxy = __webpack_require__(67);
	var BufferTargetType = __webpack_require__(73);
	var BufferUsageType = __webpack_require__(74);
	var ElementType = __webpack_require__(75);
	var PrimitiveTopology = __webpack_require__(72);
	var GridGeometry = (function (_super) {
	    __extends(GridGeometry, _super);
	    function GridGeometry(name) {
	        _super.call(this);
	        this.holizontalDivide = 10;
	        this.verticalDivide = 10;
	        var j3 = JThreeContextProxy.getJThreeContext();
	        this.primitiveTopology = PrimitiveTopology.Lines;
	        this.indexBuffer = j3.ResourceManager.createBuffer(name + "index", BufferTargetType.ElementArrayBuffer, BufferUsageType.StaticDraw, 1, ElementType.UnsignedShort);
	        this.positionBuffer = j3.ResourceManager.createBuffer(name + "-pos", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
	        this.normalBuffer = j3.ResourceManager.createBuffer(name + "-nor", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
	        this.uvBuffer = j3.ResourceManager.createBuffer(name + "-uv", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 2, ElementType.Float);
	        this.updateBuffers();
	    }
	    Object.defineProperty(GridGeometry.prototype, "HolizontalDivide", {
	        get: function () {
	            return this.holizontalDivide;
	        },
	        set: function (num) {
	            this.holizontalDivide = num;
	            this.updateBuffers();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GridGeometry.prototype, "VerticalDivide", {
	        get: function () {
	            return this.verticalDivide;
	        },
	        set: function (num) {
	            this.verticalDivide = num;
	            this.updateBuffers();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GridGeometry.prototype, "VerticiesCount", {
	        get: function () {
	            return (this.HolizontalDivide + 1) * 2 + (this.VerticalDivide + 1) * 2;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    GridGeometry.prototype.updatePositionBuffer = function () {
	        var arr = [];
	        for (var i = 0; i < this.HolizontalDivide + 1; i++) {
	            var num = -1 + 1 / this.HolizontalDivide * i * 2;
	            arr.push(num, 0, -1, num, 0, 1);
	        }
	        for (var i = 0; i < this.VerticalDivide + 1; i++) {
	            var num = -1 + 1 / this.VerticalDivide * i * 2;
	            arr.push(-1, 0, num, 1, 0, num);
	        }
	        this.positionBuffer.update(new Float32Array(arr), arr.length);
	    };
	    GridGeometry.prototype.updateNormalBuffer = function () {
	        this.normalBuffer.update(new Float32Array(new Array(this.VerticiesCount * 3)), this.VerticiesCount * 3);
	    };
	    GridGeometry.prototype.updateUvBuffer = function () {
	        this.uvBuffer.update(new Float32Array(new Array(this.VerticiesCount * 2)), this.VerticiesCount * 2);
	    };
	    GridGeometry.prototype.updateIndexBuffer = function () {
	        var arr = [];
	        for (var v = 0; v < this.VerticiesCount; v++)
	            arr.push(v);
	        this.indexBuffer.update(new Uint16Array(arr), this.VerticiesCount);
	    };
	    GridGeometry.prototype.updateBuffers = function () {
	        this.updatePositionBuffer();
	        this.updateNormalBuffer();
	        this.updateUvBuffer();
	        this.updateIndexBuffer();
	    };
	    return GridGeometry;
	})(Geometry);
	module.exports = GridGeometry;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GeometryNodeBase = __webpack_require__(69);
	var CubeGeometry = __webpack_require__(79);
	var CubeGeometryNode = (function (_super) {
	    __extends(CubeGeometryNode, _super);
	    function CubeGeometryNode(elem, loader, parent) {
	        _super.call(this, elem, loader, parent);
	    }
	    CubeGeometryNode.prototype.ConstructGeometry = function () {
	        return this.gridGeometry = new CubeGeometry(this.Name);
	    };
	    CubeGeometryNode.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	    };
	    return CubeGeometryNode;
	})(GeometryNodeBase);
	module.exports = CubeGeometryNode;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Geometry = __webpack_require__(71);
	var JThreeContextProxy = __webpack_require__(67);
	var BufferTargetType = __webpack_require__(73);
	var BufferUsageType = __webpack_require__(74);
	var ElementType = __webpack_require__(75);
	var Vector3 = __webpack_require__(24);
	var PrimitiveTopology = __webpack_require__(72);
	var CubeGeometry = (function (_super) {
	    __extends(CubeGeometry, _super);
	    function CubeGeometry(name) {
	        _super.call(this);
	        var j3 = JThreeContextProxy.getJThreeContext();
	        this.primitiveTopology = PrimitiveTopology.Triangles;
	        this.indexBuffer = j3.ResourceManager.createBuffer(name + "index", BufferTargetType.ElementArrayBuffer, BufferUsageType.StaticDraw, 1, ElementType.UnsignedByte);
	        this.positionBuffer = j3.ResourceManager.createBuffer(name + "-pos", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
	        this.normalBuffer = j3.ResourceManager.createBuffer(name + "-nor", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
	        this.uvBuffer = j3.ResourceManager.createBuffer(name + "-uv", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 2, ElementType.Float);
	        this.updateBuffers();
	    }
	    CubeGeometry.prototype.updateBuffers = function () {
	        var pos = [];
	        var normal = [];
	        var uv = [];
	        var index = [];
	        this.addQuad(pos, normal, uv, index, [new Vector3(-1, 1, 1), new Vector3(1, 1, 1), new Vector3(-1, -1, 1)]);
	        this.addQuad(pos, normal, uv, index, [new Vector3(1, 1, 1), new Vector3(1, 1, -1), new Vector3(1, -1, 1)]);
	        this.addQuad(pos, normal, uv, index, [new Vector3(1, 1, -1), new Vector3(-1, 1, -1), new Vector3(1, -1, -1)]);
	        this.addQuad(pos, normal, uv, index, [new Vector3(-1, 1, -1), new Vector3(-1, 1, 1), new Vector3(-1, -1, -1)]);
	        this.addQuad(pos, normal, uv, index, [new Vector3(-1, 1, 1), new Vector3(-1, 1, -1), new Vector3(1, 1, 1)]);
	        this.addQuad(pos, normal, uv, index, [new Vector3(1, -1, 1), new Vector3(1, -1, -1), new Vector3(-1, -1, 1)]);
	        this.indexBuffer.update(new Uint8Array(index), index.length);
	        this.normalBuffer.update(new Float32Array(normal), normal.length);
	        this.uvBuffer.update(new Float32Array(uv), uv.length);
	        this.positionBuffer.update(new Float32Array(pos), pos.length);
	    };
	    return CubeGeometry;
	})(Geometry);
	module.exports = CubeGeometry;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GeometryNodeBase = __webpack_require__(69);
	var CircleGeometry = __webpack_require__(81);
	var CircleGeometryNode = (function (_super) {
	    __extends(CircleGeometryNode, _super);
	    function CircleGeometryNode(elem, loader, parent) {
	        var _this = this;
	        _super.call(this, elem, loader, parent);
	        this.attributes.defineAttribute({
	            "divide": {
	                value: 30,
	                converter: "integer",
	                handler: function (v) { _this.gridGeometry.DiviceCount = v.Value; }
	            }
	        });
	    }
	    CircleGeometryNode.prototype.ConstructGeometry = function () {
	        this.gridGeometry = new CircleGeometry(this.Name);
	        return this.gridGeometry;
	    };
	    CircleGeometryNode.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	    };
	    return CircleGeometryNode;
	})(GeometryNodeBase);
	module.exports = CircleGeometryNode;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Geometry = __webpack_require__(71);
	var JThreeContextProxy = __webpack_require__(67);
	var BufferTargetType = __webpack_require__(73);
	var BufferUsageType = __webpack_require__(74);
	var ElementType = __webpack_require__(75);
	var Vector3 = __webpack_require__(24);
	var PrimitiveTopology = __webpack_require__(72);
	var CircleGeometry = (function (_super) {
	    __extends(CircleGeometry, _super);
	    function CircleGeometry(name) {
	        _super.call(this);
	        this.divideCount = 30;
	        var j3 = JThreeContextProxy.getJThreeContext();
	        this.primitiveTopology = PrimitiveTopology.Triangles;
	        this.indexBuffer = j3.ResourceManager.createBuffer(name + "index", BufferTargetType.ElementArrayBuffer, BufferUsageType.StaticDraw, 1, ElementType.UnsignedByte);
	        this.positionBuffer = j3.ResourceManager.createBuffer(name + "-pos", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
	        this.normalBuffer = j3.ResourceManager.createBuffer(name + "-nor", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
	        this.uvBuffer = j3.ResourceManager.createBuffer(name + "-uv", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 2, ElementType.Float);
	        this.updateBuffers();
	    }
	    Object.defineProperty(CircleGeometry.prototype, "DiviceCount", {
	        get: function () {
	            return this.divideCount;
	        },
	        set: function (count) {
	            this.divideCount = count;
	            this.updateBuffers();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    CircleGeometry.prototype.updateBuffers = function () {
	        var pos = [];
	        var normal = [];
	        var uv = [];
	        var index = [];
	        this.addCircle(pos, normal, uv, index, this.divideCount, Vector3.Zero, Vector3.YUnit, new Vector3(0, 0, -1));
	        this.indexBuffer.update(new Uint8Array(index), index.length);
	        this.normalBuffer.update(new Float32Array(normal), normal.length);
	        this.uvBuffer.update(new Float32Array(uv), uv.length);
	        this.positionBuffer.update(new Float32Array(pos), pos.length);
	    };
	    return CircleGeometry;
	})(Geometry);
	module.exports = CircleGeometry;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GeometryNodeBase = __webpack_require__(69);
	var CylinderGeometry = __webpack_require__(83);
	var CylinderGeometryNode = (function (_super) {
	    __extends(CylinderGeometryNode, _super);
	    function CylinderGeometryNode(elem, loader, parent) {
	        var _this = this;
	        _super.call(this, elem, loader, parent);
	        this.attributes.defineAttribute({
	            "divide": {
	                value: 30,
	                converter: "integer",
	                handler: function (v) { _this.gridGeometry.DivideCount = v.Value; }
	            }
	        });
	    }
	    CylinderGeometryNode.prototype.ConstructGeometry = function () {
	        return this.gridGeometry = new CylinderGeometry(this.Name);
	    };
	    CylinderGeometryNode.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	        this.gridGeometry.DivideCount = this.attributes.getValue("divide");
	    };
	    return CylinderGeometryNode;
	})(GeometryNodeBase);
	module.exports = CylinderGeometryNode;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Geometry = __webpack_require__(71);
	var JThreeContextProxy = __webpack_require__(67);
	var BufferTargetType = __webpack_require__(73);
	var BufferUsageType = __webpack_require__(74);
	var ElementType = __webpack_require__(75);
	var Vector3 = __webpack_require__(24);
	var PrimitiveTopology = __webpack_require__(72);
	var CylinderGeometry = (function (_super) {
	    __extends(CylinderGeometry, _super);
	    function CylinderGeometry(name) {
	        _super.call(this);
	        this.divideCount = 10;
	        var j3 = JThreeContextProxy.getJThreeContext();
	        this.primitiveTopology = PrimitiveTopology.Triangles;
	        this.indexBuffer = j3.ResourceManager.createBuffer(name + "index", BufferTargetType.ElementArrayBuffer, BufferUsageType.StaticDraw, 1, ElementType.UnsignedShort);
	        this.positionBuffer = j3.ResourceManager.createBuffer(name + "-pos", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
	        this.normalBuffer = j3.ResourceManager.createBuffer(name + "-nor", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
	        this.uvBuffer = j3.ResourceManager.createBuffer(name + "-uv", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 2, ElementType.Float);
	        this.updateBuffers();
	    }
	    Object.defineProperty(CylinderGeometry.prototype, "DivideCount", {
	        get: function () {
	            return this.divideCount;
	        },
	        set: function (count) {
	            this.divideCount = count;
	            this.updateBuffers();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    CylinderGeometry.prototype.updateBuffers = function () {
	        var pos = [];
	        var normal = [];
	        var uv = [];
	        var index = [];
	        this.addCylinder(pos, normal, uv, index, this.DivideCount, new Vector3(0, 1, 0), new Vector3(0, -1, 0), new Vector3(0, 0, -1), 1);
	        this.indexBuffer.update(new Uint16Array(index), index.length);
	        this.normalBuffer.update(new Float32Array(normal), normal.length);
	        this.uvBuffer.update(new Float32Array(uv), uv.length);
	        this.positionBuffer.update(new Float32Array(pos), pos.length);
	    };
	    return CylinderGeometry;
	})(Geometry);
	module.exports = CylinderGeometry;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GeometryNodeBase = __webpack_require__(69);
	var QuadGeometry = __webpack_require__(85);
	var QuadGeometryNode = (function (_super) {
	    __extends(QuadGeometryNode, _super);
	    function QuadGeometryNode(elem, loader, parent) {
	        _super.call(this, elem, loader, parent);
	    }
	    QuadGeometryNode.prototype.ConstructGeometry = function () {
	        return this.TriGeometry = new QuadGeometry(this.Name);
	    };
	    QuadGeometryNode.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	    };
	    return QuadGeometryNode;
	})(GeometryNodeBase);
	module.exports = QuadGeometryNode;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Geometry = __webpack_require__(71);
	var JThreeContextProxy = __webpack_require__(67);
	var BufferTargetType = __webpack_require__(73);
	var BufferUsageType = __webpack_require__(74);
	var ElementType = __webpack_require__(75);
	var Vector3 = __webpack_require__(24);
	var QuadGeometry = (function (_super) {
	    __extends(QuadGeometry, _super);
	    function QuadGeometry(name) {
	        _super.call(this);
	        var j3 = JThreeContextProxy.getJThreeContext();
	        this.indexBuffer = j3.ResourceManager.createBuffer(name + "index", BufferTargetType.ElementArrayBuffer, BufferUsageType.StaticDraw, 1, ElementType.UnsignedByte);
	        this.positionBuffer = j3.ResourceManager.createBuffer(name + "-pos", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
	        this.normalBuffer = j3.ResourceManager.createBuffer(name + "-nor", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
	        this.uvBuffer = j3.ResourceManager.createBuffer(name + "-uv", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 2, ElementType.Float);
	        this.updateBuffers();
	    }
	    QuadGeometry.prototype.updateBuffers = function () {
	        var pos = [];
	        var nor = [];
	        var uv = [];
	        var index = [];
	        this.addQuad(pos, nor, uv, index, [new Vector3(-1, 1, 0), new Vector3(1, 1, 0), new Vector3(-1, -1, 0)]);
	        this.positionBuffer.update(new Float32Array(pos), pos.length);
	        this.normalBuffer.update(new Float32Array(nor), nor.length);
	        this.uvBuffer.update(new Float32Array(uv), uv.length);
	        this.indexBuffer.update(new Uint8Array(index), index.length);
	    };
	    return QuadGeometry;
	})(Geometry);
	module.exports = QuadGeometry;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var CanvasManager = __webpack_require__(87);
	var JThreeContextProxy = __webpack_require__(67);
	var RendererNodeBase = __webpack_require__(96);
	var RendererNode = (function (_super) {
	    __extends(RendererNode, _super);
	    function RendererNode(elem, loader, parent) {
	        var _this = this;
	        _super.call(this, elem, loader, parent);
	        this.targetFrame = document.querySelector(this.Frame);
	        this.targetCanvas = document.createElement("canvas");
	        if (this.targetFrame)
	            this.targetFrame.appendChild(this.targetCanvas);
	        this.targetCanvas.classList.add("x-j3-c-" + this.ID);
	        this.setCanvasManager(CanvasManager.fromCanvasElement(this.targetCanvas));
	        var context = JThreeContextProxy.getJThreeContext();
	        context.addCanvasManager(this.CanvasManager);
	        this.attributes.defineAttribute({
	            "fullscreen": {
	                value: false, converter: "boolean", handler: function (v) {
	                    _this.CanvasManager.FullScreen = v.Value;
	                }
	            }
	        });
	        this.attributes.applyDefaultValue();
	    }
	    Object.defineProperty(RendererNode.prototype, "Frame", {
	        get: function () {
	            return this.element.getAttribute("frame") || "body";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RendererNode.prototype, "DefaultWidth", {
	        get: function () {
	            return this.targetFrame.clientWidth;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RendererNode.prototype, "DefaultHeight", {
	        get: function () {
	            return this.targetFrame.clientHeight;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RendererNode.prototype.sizeChanged = function (width, height) {
	        this.targetCanvas.width = width;
	        this.targetCanvas.height = height;
	    };
	    return RendererNode;
	})(RendererNodeBase);
	module.exports = RendererNode;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var ContextManagerBase = __webpack_require__(89);
	var WebGLContextWrapper = __webpack_require__(91);
	var Rectangle = __webpack_require__(93);
	var JThreeContextProxy = __webpack_require__(67);
	var ClearTargetType = __webpack_require__(88);
	var PixelStoreParamType = __webpack_require__(94);
	var JThreeEvent = __webpack_require__(12);
	var CanvasSizeChangedEventArgs = __webpack_require__(95);
	var CanvasManager = (function (_super) {
	    __extends(CanvasManager, _super);
	    function CanvasManager(glContext) {
	        _super.call(this);
	        this.fullscreen = false;
	        this.isDirty = true;
	        this.onResizeEventHandler = new JThreeEvent();
	        this.setContext(new WebGLContextWrapper(glContext));
	    }
	    CanvasManager.fromCanvasElement = function (canvas) {
	        var gl;
	        try {
	            gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
	            var renderer = new CanvasManager(gl);
	            var instance = JThreeContextProxy.getJThreeContext();
	            renderer.targetCanvas = canvas;
	            renderer.lastHeight = canvas.height;
	            renderer.lastWidth = canvas.width;
	            instance.addCanvasManager(renderer);
	            return renderer;
	        }
	        catch (e) {
	            console.error("Web GL context Generation failed");
	            if (!gl) {
	                console.error("WebGL Context Generation failed." + e);
	            }
	        }
	    };
	    Object.defineProperty(CanvasManager.prototype, "TargetCanvas", {
	        get: function () {
	            return this.targetCanvas;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CanvasManager.prototype, "FullScreen", {
	        get: function () {
	            return this.fullscreen;
	        },
	        set: function (val) {
	            if (val === this.fullscreen)
	                return;
	            this.fullscreen = val;
	            if (val)
	                this.targetCanvas.webkitRequestFullScreen();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CanvasManager.prototype, "IsDirty", {
	        get: function () {
	            return this.isDirty;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    CanvasManager.prototype.onResize = function (act) {
	        this.onResizeEventHandler.addListerner(act);
	    };
	    CanvasManager.prototype.afterRenderAll = function () {
	        this.isDirty = true;
	    };
	    CanvasManager.prototype.beforeRender = function (renderer) {
	        if (this.isDirty) {
	            this.clearCanvas();
	            this.Context.PixelStorei(PixelStoreParamType.UnpackFlipYWebGL, 1);
	            this.isDirty = false;
	        }
	    };
	    CanvasManager.prototype.beforeRenderAll = function () {
	        if (this.targetCanvas.height !== this.lastHeight || this.targetCanvas.width !== this.lastWidth) {
	            this.onResizeEventHandler.fire(this, new CanvasSizeChangedEventArgs(this, this.lastWidth, this.lastHeight, this.targetCanvas.width, this.targetCanvas.height));
	            this.lastHeight = this.targetCanvas.height;
	            this.lastWidth = this.targetCanvas.width;
	        }
	    };
	    CanvasManager.prototype.clearCanvas = function () {
	        this.Context.BindFrameBuffer(null);
	        this.applyClearColor();
	        this.Context.Clear(ClearTargetType.ColorBits | ClearTargetType.DepthBits);
	    };
	    CanvasManager.prototype.getDefaultRectangle = function () {
	        return new Rectangle(0, 0, this.targetCanvas.width, this.targetCanvas.height);
	    };
	    return CanvasManager;
	})(ContextManagerBase);
	module.exports = CanvasManager;


/***/ },
/* 88 */
/***/ function(module, exports) {

	var ClearTargetType;
	(function (ClearTargetType) {
	    ClearTargetType[ClearTargetType["ColorBits"] = 16384] = "ColorBits";
	    ClearTargetType[ClearTargetType["DepthBits"] = 256] = "DepthBits";
	    ClearTargetType[ClearTargetType["StencilBits"] = 1024] = "StencilBits";
	})(ClearTargetType || (ClearTargetType = {}));
	module.exports = ClearTargetType;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var jThreeObjectId = __webpack_require__(31);
	var GLExtensionManager = __webpack_require__(90);
	var Color4 = __webpack_require__(38);
	var ContextManagerBase = (function (_super) {
	    __extends(ContextManagerBase, _super);
	    function ContextManagerBase() {
	        _super.call(this);
	        this.extensions = new GLExtensionManager();
	    }
	    ContextManagerBase.prototype.setContext = function (context) {
	        this.context = context;
	        this.extensions.checkExtensions(context);
	    };
	    Object.defineProperty(ContextManagerBase.prototype, "Context", {
	        get: function () {
	            return this.context;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ContextManagerBase.prototype.beforeRender = function (renderer) {
	    };
	    ContextManagerBase.prototype.afterRender = function (renderer) {
	    };
	    ContextManagerBase.prototype.beforeRenderAll = function () {
	    };
	    ContextManagerBase.prototype.afterRenderAll = function () {
	    };
	    ContextManagerBase.prototype.applyClearColor = function () {
	        this.context.ClearColor(this.clearColor.R, this.clearColor.G, this.ClearColor.B, this.clearColor.A);
	    };
	    Object.defineProperty(ContextManagerBase.prototype, "ClearColor", {
	        get: function () {
	            this.clearColor = this.clearColor || new Color4(1, 1, 1, 1);
	            return this.clearColor;
	        },
	        set: function (col) {
	            this.clearColor = col || new Color4(1, 1, 1, 1);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ContextManagerBase;
	})(jThreeObjectId);
	module.exports = ContextManagerBase;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var AssociativeArray = __webpack_require__(8);
	var GLExtensionManager = (function (_super) {
	    __extends(GLExtensionManager, _super);
	    function GLExtensionManager() {
	        _super.call(this);
	        this.requiredExtensions = ["WEBGL_draw_buffers", "WEBGL_depth_texture", "OES_element_index_uint", "OES_texture_float"];
	        this.extensions = new AssociativeArray();
	    }
	    GLExtensionManager.prototype.checkExtensions = function (context) {
	        for (var i = 0; i < this.requiredExtensions.length; i++) {
	            var element = this.requiredExtensions[i];
	            var ext = context.Context.getExtension(element);
	            if (!ext) {
	                console.error("WebGL Extension:" + element + " was requested,but your browser is not supporting this feature.");
	            }
	            else {
	                console.log("WebGL Extension:" + element + " was instanciated successfully");
	            }
	            this.extensions.set(element, ext);
	        }
	    };
	    GLExtensionManager.prototype.getExtension = function (extName) {
	        return this.extensions.get(extName);
	    };
	    GLExtensionManager.prototype.hasExtension = function (extName) {
	        return this.extensions.has(extName);
	    };
	    return GLExtensionManager;
	})(JThreeObject);
	module.exports = GLExtensionManager;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GLContextWrapperBase = __webpack_require__(92);
	var WebGLContextWrapper = (function (_super) {
	    __extends(WebGLContextWrapper, _super);
	    function WebGLContextWrapper(gl) {
	        _super.call(this);
	        this.gl = gl;
	    }
	    Object.defineProperty(WebGLContextWrapper.prototype, "Context", {
	        get: function () {
	            return this.gl;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    WebGLContextWrapper.prototype.CheckErrorAsFatal = function () {
	    };
	    WebGLContextWrapper.prototype.CreateBuffer = function () {
	        this.CheckErrorAsFatal();
	        return this.gl.createBuffer();
	    };
	    WebGLContextWrapper.prototype.BindBuffer = function (target, buffer) {
	        this.CheckErrorAsFatal();
	        this.gl.bindBuffer(target, buffer);
	    };
	    WebGLContextWrapper.prototype.UnbindBuffer = function (target) {
	        this.CheckErrorAsFatal();
	        this.gl.bindBuffer(target, null);
	    };
	    WebGLContextWrapper.prototype.DeleteBuffer = function (target) {
	        this.CheckErrorAsFatal();
	        this.gl.deleteBuffer(target);
	    };
	    WebGLContextWrapper.prototype.BufferData = function (target, array, usage) {
	        this.CheckErrorAsFatal();
	        this.gl.bufferData(target, array, usage);
	    };
	    WebGLContextWrapper.prototype.ClearColor = function (red, green, blue, alpha) {
	        this.CheckErrorAsFatal();
	        this.gl.clearColor(red, green, blue, alpha);
	    };
	    WebGLContextWrapper.prototype.Clear = function (mask) {
	        this.CheckErrorAsFatal();
	        this.gl.clear(mask);
	    };
	    WebGLContextWrapper.prototype.CreateShader = function (flag) {
	        this.CheckErrorAsFatal();
	        return this.gl.createShader(flag);
	    };
	    WebGLContextWrapper.prototype.DeleteShader = function (shader) {
	        this.CheckErrorAsFatal();
	        this.gl.deleteShader(shader);
	    };
	    WebGLContextWrapper.prototype.ShaderSource = function (shader, src) {
	        this.CheckErrorAsFatal();
	        this.gl.shaderSource(shader, src);
	    };
	    WebGLContextWrapper.prototype.CompileShader = function (shader) {
	        this.CheckErrorAsFatal();
	        this.gl.compileShader(shader);
	        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
	            alert(this.gl.getShaderInfoLog(shader));
	        }
	        else {
	            console.log("compile success");
	        }
	    };
	    WebGLContextWrapper.prototype.CreateProgram = function () {
	        this.CheckErrorAsFatal();
	        return this.gl.createProgram();
	    };
	    WebGLContextWrapper.prototype.AttachShader = function (program, shader) {
	        this.CheckErrorAsFatal();
	        this.gl.attachShader(program, shader);
	    };
	    WebGLContextWrapper.prototype.LinkProgram = function (program) {
	        this.CheckErrorAsFatal();
	        this.gl.linkProgram(program);
	        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
	            alert(this.gl.getProgramInfoLog(program));
	        }
	        else {
	            console.log("link success");
	        }
	    };
	    WebGLContextWrapper.prototype.UseProgram = function (program) {
	        this.gl.useProgram(program);
	    };
	    WebGLContextWrapper.prototype.GetAttribLocation = function (program, name) {
	        return this.gl.getAttribLocation(program, name);
	    };
	    WebGLContextWrapper.prototype.EnableVertexAttribArray = function (attribNumber) {
	        this.gl.enableVertexAttribArray(attribNumber);
	    };
	    WebGLContextWrapper.prototype.VertexAttribPointer = function (attribLocation, sizePerVertex, elemType, normalized, stride, offset) {
	        this.gl.vertexAttribPointer(attribLocation, sizePerVertex, elemType, normalized, stride, offset);
	    };
	    WebGLContextWrapper.prototype.DrawArrays = function (drawType, offset, length) {
	        this.CheckErrorAsFatal();
	        this.gl.drawArrays(drawType, offset, length);
	    };
	    WebGLContextWrapper.prototype.Flush = function () {
	        this.CheckErrorAsFatal();
	        this.gl.flush();
	    };
	    WebGLContextWrapper.prototype.Finish = function () {
	        this
	            .CheckErrorAsFatal();
	        this.gl.finish();
	    };
	    WebGLContextWrapper.prototype.DeleteProgram = function (target) {
	        this.CheckErrorAsFatal();
	        this.gl.deleteProgram(target);
	    };
	    WebGLContextWrapper.prototype.GetUniformLocation = function (target, name) {
	        this.CheckErrorAsFatal();
	        return this.gl.getUniformLocation(target, name);
	    };
	    WebGLContextWrapper.prototype.UniformMatrix = function (webGlUniformLocation, matrix) {
	        this.gl.uniformMatrix4fv(webGlUniformLocation, false, matrix.rawElements);
	    };
	    WebGLContextWrapper.prototype.UniformVector2 = function (webGlUniformLocation, vector) {
	        this.gl.uniform2f(webGlUniformLocation, vector.X, vector.Y);
	    };
	    WebGLContextWrapper.prototype.UniformVector3 = function (webGlUniformLocation, vector) {
	        this.gl.uniform3f(webGlUniformLocation, vector.X, vector.Y, vector.Z);
	    };
	    WebGLContextWrapper.prototype.Uniform1i = function (webGlUniformLocation, num) {
	        this.gl.uniform1i(webGlUniformLocation, num);
	    };
	    WebGLContextWrapper.prototype.Enable = function (feature) {
	        this.CheckErrorAsFatal();
	        this.gl.enable(feature);
	    };
	    WebGLContextWrapper.prototype.Disable = function (feature) {
	        this.CheckErrorAsFatal();
	        this.gl.disable(feature);
	    };
	    WebGLContextWrapper.prototype.CullFace = function (cullMode) {
	        this.CheckErrorAsFatal();
	        this.gl.cullFace(cullMode);
	    };
	    WebGLContextWrapper.prototype.UniformVector4 = function (webGlUniformLocation, vector) {
	        this.gl.uniform4f(webGlUniformLocation, vector.X, vector.Y, vector.Z, vector.W);
	    };
	    WebGLContextWrapper.prototype.ViewPort = function (x, y, width, height) {
	        this.CheckErrorAsFatal();
	        this.gl.viewport(x, y, width, height);
	    };
	    WebGLContextWrapper.prototype.DrawElements = function (topology, length, dataType, offset) {
	        this.gl.drawElements(topology, length, dataType, offset);
	    };
	    WebGLContextWrapper.prototype.CreateFrameBuffer = function () {
	        this.CheckErrorAsFatal();
	        return this.gl.createFramebuffer();
	    };
	    WebGLContextWrapper.prototype.BindFrameBuffer = function (fbo) {
	        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);
	    };
	    WebGLContextWrapper.prototype.FrameBufferTexture2D = function (fboTarget, tex) {
	        this.CheckErrorAsFatal();
	        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, fboTarget, this.gl.TEXTURE_2D, tex, 0);
	    };
	    WebGLContextWrapper.prototype.CreateTexture = function () {
	        this.CheckErrorAsFatal();
	        return this.gl.createTexture();
	    };
	    WebGLContextWrapper.prototype.PixelStorei = function (pname, value) {
	        this.CheckErrorAsFatal();
	        this.gl.pixelStorei(pname, value);
	    };
	    WebGLContextWrapper.prototype.TexImage2D = function (targetTexture, level, internalFormat, targetFormatOrWidth, typeOrHeight, pixelsOrBorder, type, bufferObj) {
	        this.CheckErrorAsFatal();
	        if (type) {
	            this.gl.texImage2D(targetTexture, level, internalFormat, targetFormatOrWidth, typeOrHeight, pixelsOrBorder, internalFormat, type, bufferObj);
	            return;
	        }
	        else {
	            this.gl.texImage2D(targetTexture, level, internalFormat, targetFormatOrWidth, typeOrHeight, pixelsOrBorder);
	        }
	    };
	    WebGLContextWrapper.prototype.BindTexture = function (targetTexture, texture) {
	        this.gl.bindTexture(targetTexture, texture);
	    };
	    WebGLContextWrapper.prototype.GenerateMipmap = function (targetTexture) {
	        this.CheckErrorAsFatal();
	        this.gl.generateMipmap(targetTexture);
	    };
	    WebGLContextWrapper.prototype.TexParameteri = function (targetTexture, param, value) {
	        this.CheckErrorAsFatal();
	        this.gl.texParameteri(targetTexture, param, value);
	    };
	    WebGLContextWrapper.prototype.ActiveTexture = function (textureRegister) {
	        this.gl.activeTexture(textureRegister);
	    };
	    WebGLContextWrapper.prototype.CreateRenderBuffer = function () {
	        this.CheckErrorAsFatal();
	        return this.gl.createRenderbuffer();
	    };
	    WebGLContextWrapper.prototype.BindRenderBuffer = function (bindTarget) {
	        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, bindTarget);
	    };
	    WebGLContextWrapper.prototype.RenderBufferStorage = function (internalFormat, width, height) {
	        this.CheckErrorAsFatal();
	        this.gl.renderbufferStorage(this.gl.RENDERBUFFER, internalFormat, width, height);
	    };
	    WebGLContextWrapper.prototype.FrameBufferRenderBuffer = function (attachment, buffer) {
	        this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, attachment, this.gl.RENDERBUFFER, buffer);
	    };
	    WebGLContextWrapper.prototype.UniformVector2Array = function (webGlUniformLocation, vector) {
	        var arr = new Array(vector.length * 2);
	        for (var i = 0; i < vector.length; i++) {
	            arr[i * 2] = vector[i].X;
	            arr[i * 2 + 1] = vector[i].Y;
	        }
	        this.gl.uniform2fv(webGlUniformLocation, new Float32Array(arr));
	    };
	    WebGLContextWrapper.prototype.UniformVector3Array = function (webGlUniformLocation, vector) {
	        var arr = new Array(vector.length * 3);
	        for (var i = 0; i < vector.length; i++) {
	            arr[i * 3] = vector[i].X;
	            arr[i * 3 + 1] = vector[i].Y;
	            arr[i * 3 + 2] = vector[i].Z;
	        }
	        this.gl.uniform3fv(webGlUniformLocation, new Float32Array(arr));
	    };
	    WebGLContextWrapper.prototype.UniformVector4Array = function (webGlUniformLocation, vector) {
	        var arr = new Array(vector.length * 4);
	        for (var i = 0; i < vector.length; i++) {
	            arr[i * 4] = vector[i].X;
	            arr[i * 4 + 1] = vector[i].Y;
	            arr[i * 4 + 2] = vector[i].Z;
	            arr[i * 4 + 3] = vector[i].W;
	        }
	        this.gl.uniform4fv(webGlUniformLocation, new Float32Array(arr));
	    };
	    WebGLContextWrapper.prototype.Uniform1f = function (webglUniformLocation, num) {
	        this.gl.uniform1f(webglUniformLocation, num);
	    };
	    WebGLContextWrapper.prototype.IsTexture = function (tex) {
	        return this.gl.isTexture(tex);
	    };
	    WebGLContextWrapper.prototype.DeleteTexture = function (tex) {
	        this.gl.deleteTexture(tex);
	    };
	    WebGLContextWrapper.prototype.ClearDepth = function (depth) {
	        this.gl.clearDepth(depth);
	    };
	    WebGLContextWrapper.prototype.BlendFunc = function (b1, b2) {
	        this.gl.blendFunc(b1, b2);
	    };
	    WebGLContextWrapper.prototype.DepthFunc = function (func) {
	        this.gl.depthFunc(func);
	    };
	    WebGLContextWrapper.prototype.BlendEquation = function (eq) {
	        this.gl.blendEquation(eq);
	    };
	    return WebGLContextWrapper;
	})(GLContextWrapperBase);
	module.exports = WebGLContextWrapper;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Exceptions = __webpack_require__(9);
	var JThreeObject = __webpack_require__(5);
	var GLContextWrapperBase = (function (_super) {
	    __extends(GLContextWrapperBase, _super);
	    function GLContextWrapperBase() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(GLContextWrapperBase.prototype, "Context", {
	        get: function () {
	            return null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    GLContextWrapperBase.prototype.CheckErrorAsFatal = function () {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.CreateBuffer = function () {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.BindBuffer = function (target, buffer) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.BufferData = function (target, array, usage) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.UnbindBuffer = function (target) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.ClearColor = function (red, green, blue, alpha) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.Clear = function (mask) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.CreateShader = function (flag) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.DeleteShader = function (shader) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.ShaderSource = function (shader, src) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.CompileShader = function (shader) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.CreateProgram = function () {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.AttachShader = function (program, shader) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.LinkProgram = function (program) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.UseProgram = function (program) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.GetAttribLocation = function (program, name) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.EnableVertexAttribArray = function (attribNumber) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.VertexAttribPointer = function (attribLocation, sizePerVertex, elemType, normalized, stride, offset) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.Enable = function (feature) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.Disable = function (feature) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.DrawArrays = function (drawType, offset, length) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.Flush = function () {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.Finish = function () {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.DeleteBuffer = function (target) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.DeleteProgram = function (target) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.GetUniformLocation = function (target, name) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.UniformMatrix = function (webGlUniformLocation, matrix) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.UniformVector2 = function (webGlUniformLocation, vector) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.UniformVector3 = function (webGlUniformLocation, vector) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.UniformVector4 = function (webGlUniformLocation, vector) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.UniformVector2Array = function (webGlUniformLocation, vector) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.UniformVector3Array = function (webGlUniformLocation, vector) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.UniformVector4Array = function (webGlUniformLocation, vector) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.CullFace = function (cullMode) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.ViewPort = function (x, y, width, height) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.DrawElements = function (topology, length, dataType, offset) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.CreateFrameBuffer = function () {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.BindFrameBuffer = function (fbo) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.FrameBufferTexture2D = function (fboTarget, tex) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.CreateTexture = function () {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.TexImage2D = function (targetTexture, level, internalFormat, targetFormatOrWidth, typeOrHeight, pixelsOrBorder, type, bufferObj) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.BindTexture = function (targetTexture, texture) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.GenerateMipmap = function (targetTexture) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.TexParameteri = function (targetTexture, param, value) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.ActiveTexture = function (textureRegister) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.Uniform1i = function (webGlUniformLocation, num) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.CreateRenderBuffer = function () {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.BindRenderBuffer = function (bindTarget) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.RenderBufferStorage = function (internalFormat, width, height) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.FrameBufferRenderBuffer = function (attachment, buffer) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.PixelStorei = function (pname, value) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.Uniform1f = function (webglUniformLocation, num) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.IsTexture = function (tex) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.DeleteTexture = function (tex) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.ClearDepth = function (depth) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    GLContextWrapperBase.prototype.BlendFunc = function (b1, b2) {
	    };
	    GLContextWrapperBase.prototype.BlendEquation = function (eq) {
	    };
	    GLContextWrapperBase.prototype.DepthFunc = function (func) {
	    };
	    return GLContextWrapperBase;
	})(JThreeObject);
	module.exports = GLContextWrapperBase;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var jThreeObject = __webpack_require__(5);
	var Rectangle = (function (_super) {
	    __extends(Rectangle, _super);
	    function Rectangle(left, top, width, height) {
	        _super.call(this);
	        this.left = left;
	        this.top = top;
	        this.width = width;
	        this.height = height;
	    }
	    Object.defineProperty(Rectangle.prototype, "Left", {
	        get: function () {
	            return this.left;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Rectangle.prototype, "Right", {
	        get: function () {
	            return this.left + this.width;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Rectangle.prototype, "Top", {
	        get: function () {
	            return this.top;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Rectangle.prototype, "Bottom", {
	        get: function () {
	            return this.top + this.height;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Rectangle.prototype, "Width", {
	        get: function () {
	            return this.width;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Rectangle.prototype, "Height", {
	        get: function () {
	            return this.height;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Rectangle.prototype.toString = function () {
	        return "Rectangle(" + this.left + "," + this.top + "-" + this.Right + "," + this.Bottom + ")";
	    };
	    Rectangle.Equals = function (r1, r2) {
	        return r1.Left === r2.Left && r1.Right === r2.Right && r1.Top === r2.Top && r1.Bottom === r2.Bottom;
	    };
	    return Rectangle;
	})(jThreeObject);
	module.exports = Rectangle;


/***/ },
/* 94 */
/***/ function(module, exports) {

	var PixelStoreParamType;
	(function (PixelStoreParamType) {
	    PixelStoreParamType[PixelStoreParamType["PackAlignment"] = 3333] = "PackAlignment";
	    PixelStoreParamType[PixelStoreParamType["UnpackAlignment"] = 3317] = "UnpackAlignment";
	    PixelStoreParamType[PixelStoreParamType["UnpackFlipYWebGL"] = 37440] = "UnpackFlipYWebGL";
	    PixelStoreParamType[PixelStoreParamType["UnpackPremultiplyAlphaWebGL"] = 37441] = "UnpackPremultiplyAlphaWebGL";
	    PixelStoreParamType[PixelStoreParamType["UnpackColorSpaceConversionWebGL"] = 37443] = "UnpackColorSpaceConversionWebGL";
	})(PixelStoreParamType || (PixelStoreParamType = {}));
	module.exports = PixelStoreParamType;


/***/ },
/* 95 */
/***/ function(module, exports) {

	var CanvasSizeChangedEventArg = (function () {
	    function CanvasSizeChangedEventArg(target, lastWidth, lastHeight, newWidth, newHeight) {
	        this.targetCanvasManager = target;
	        this.lastWidth = lastWidth;
	        this.lastHeight = lastHeight;
	        this.newWidth = newWidth;
	        this.newHeight = newHeight;
	    }
	    Object.defineProperty(CanvasSizeChangedEventArg.prototype, "TargetCanvas", {
	        get: function () {
	            return this.targetCanvasManager;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CanvasSizeChangedEventArg.prototype, "LastWidth", {
	        get: function () {
	            return this.lastWidth;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CanvasSizeChangedEventArg.prototype, "LastHeight", {
	        get: function () {
	            return this.lastHeight;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CanvasSizeChangedEventArg.prototype, "NewWidth", {
	        get: function () {
	            return this.newWidth;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CanvasSizeChangedEventArg.prototype, "NewHeight", {
	        get: function () {
	            return this.newHeight;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return CanvasSizeChangedEventArg;
	})();
	module.exports = CanvasSizeChangedEventArg;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GomlTreeNodeBase = __webpack_require__(60);
	var RendererNodeBase = (function (_super) {
	    __extends(RendererNodeBase, _super);
	    function RendererNodeBase(elem, loader, parent) {
	        var _this = this;
	        _super.call(this, elem, loader, parent);
	        this.attributes.defineAttribute({
	            "width": {
	                value: 128, converter: "number", handler: function (v) { _this.sizeChanged(v.Value, _this.attributes.getValue("height")); }
	            },
	            "height": {
	                value: 128, converter: "number", handler: function (v) { _this.sizeChanged(_this.attributes.getValue("width"), v.Value); }
	            },
	            "clearColor": {
	                value: '#0FF', converter: "color4", handler: function (v) { _this.canvasManager.ClearColor = v.Value; }
	            },
	        });
	    }
	    RendererNodeBase.prototype.beforeLoad = function () {
	        this.attributes.setValue("width", this.DefaultWidth);
	        this.attributes.setValue("height", this.DefaultHeight);
	    };
	    RendererNodeBase.prototype.setCanvasManager = function (canvasManager) {
	        this.canvasManager = canvasManager;
	        this.sizeChanged(this.DefaultWidth, this.DefaultHeight);
	    };
	    Object.defineProperty(RendererNodeBase.prototype, "CanvasManager", {
	        get: function () {
	            return this.canvasManager;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RendererNodeBase.prototype.sizeChanged = function (width, height) {
	    };
	    Object.defineProperty(RendererNodeBase.prototype, "DefaultWidth", {
	        get: function () {
	            return 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RendererNodeBase.prototype, "DefaultHeight", {
	        get: function () {
	            return 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return RendererNodeBase;
	})(GomlTreeNodeBase);
	module.exports = RendererNodeBase;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GomlTreeNodeBase = __webpack_require__(60);
	var ViewportRenderer = __webpack_require__(98);
	var Rectangle = __webpack_require__(93);
	var JThreeContextProxy = __webpack_require__(67);
	var ViewPortNode = (function (_super) {
	    __extends(ViewPortNode, _super);
	    function ViewPortNode(elem, loader, parent) {
	        _super.call(this, elem, loader, parent);
	    }
	    Object.defineProperty(ViewPortNode.prototype, "TargetViewport", {
	        get: function () {
	            return this.targetRenderer;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ViewPortNode.prototype.afterLoad = function () {
	        var _this = this;
	        var rdr = this.parentRendererNode = this.parent;
	        var defaultRect = rdr.CanvasManager.getDefaultRectangle();
	        this.targetRenderer = new ViewportRenderer(rdr.CanvasManager, defaultRect);
	        var context = JThreeContextProxy.getJThreeContext();
	        var cameraNode = this.resolveCamera();
	        this.targetRenderer.Camera = cameraNode.TargetCamera;
	        var scene = cameraNode.ContainedSceneNode.targetScene;
	        scene.addRenderer(this.targetRenderer);
	        this.attributes.defineAttribute({
	            "width": {
	                value: defaultRect.Width,
	                converter: "number", handler: function (v) {
	                    _this.width = v.Value;
	                    _this.updateViewportArea();
	                }
	            },
	            "height": {
	                value: defaultRect.Height,
	                converter: "number", handler: function (v) {
	                    _this.height = v.Value;
	                    _this.updateViewportArea();
	                }
	            },
	            "left": {
	                value: defaultRect.Left,
	                converter: "number", handler: function (v) {
	                    _this.left = v.Value;
	                    _this.updateViewportArea();
	                }
	            },
	            "top": {
	                value: defaultRect.Top,
	                converter: "number", handler: function (v) {
	                    _this.top = v.Value;
	                    _this.updateViewportArea();
	                }
	            }
	        });
	        this.attributes.applyDefaultValue();
	    };
	    ViewPortNode.prototype.updateViewportArea = function () {
	        this.targetRenderer.ViewPortArea = new Rectangle(this.left, this.top, this.width, this.height);
	    };
	    ViewPortNode.prototype.resolveCamera = function () {
	        var camTags = this.loader.nodeRegister.getAliasMap("jthree.camera");
	        if (!camTags.has(this.Cam)) {
	            console.error("can not find camera");
	            if (camTags.size == 0) {
	                console.error("There is no scene.");
	            }
	            else {
	            }
	            return null;
	        }
	        var targetCam = camTags.get(this.Cam);
	        if (targetCam.ContainedSceneNode != null) {
	            return targetCam;
	        }
	        else {
	            console.error("cant retrieve scene!");
	        }
	    };
	    Object.defineProperty(ViewPortNode.prototype, "Cam", {
	        get: function () {
	            this.cam = this.cam || this.element.getAttribute('cam');
	            return this.cam;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ViewPortNode;
	})(GomlTreeNodeBase);
	module.exports = ViewPortNode;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Rectangle = __webpack_require__(93);
	var RendererBase = __webpack_require__(99);
	var ViewPortRenderer = (function (_super) {
	    __extends(ViewPortRenderer, _super);
	    function ViewPortRenderer(contextManager, viewportArea) {
	        _super.call(this, contextManager);
	        this.viewportArea = viewportArea;
	    }
	    Object.defineProperty(ViewPortRenderer.prototype, "ViewPortArea", {
	        get: function () {
	            return this.viewportArea;
	        },
	        set: function (area) {
	            if (!Rectangle.Equals(area, this.viewportArea)) {
	                this.viewportArea = area;
	                this.onResizeHandler.fire(this, area);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ViewPortRenderer.prototype.applyViewportConfigure = function () {
	        this.ContextManager.Context.ViewPort(this.viewportArea.Left, this.viewportArea.Top, this.viewportArea.Width, this.viewportArea.Height);
	    };
	    ViewPortRenderer.prototype.beforeRender = function () {
	        _super.prototype.beforeRender.call(this);
	        this.applyViewportConfigure();
	    };
	    ViewPortRenderer.prototype.afterRender = function () {
	        this.ContextManager.Context.Flush();
	        _super.prototype.afterRender.call(this);
	    };
	    ViewPortRenderer.prototype.configureRenderer = function () {
	        this.applyViewportConfigure();
	    };
	    return ViewPortRenderer;
	})(RendererBase);
	module.exports = ViewPortRenderer;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Exceptions = __webpack_require__(9);
	var jThreeObjectWithID = __webpack_require__(31);
	var RenderStageManager = __webpack_require__(100);
	var RB1RenderStage = __webpack_require__(107);
	var RB2RenderStage = __webpack_require__(117);
	var LightAccumulationRenderStage = __webpack_require__(119);
	var FowardRenderStage = __webpack_require__(125);
	var JThreeContextProxy = __webpack_require__(67);
	var JThreeEvent = __webpack_require__(12);
	var RendererBase = (function (_super) {
	    __extends(RendererBase, _super);
	    function RendererBase(contextManager) {
	        _super.call(this);
	        this.renderStageManager = new RenderStageManager(this);
	        this.onResizeHandler = new JThreeEvent();
	        this.contextManager = contextManager;
	        JThreeContextProxy.getJThreeContext().ResourceManager.createRBO(this.ID + ".rbo.default", 512, 512);
	        JThreeContextProxy.getJThreeContext().ResourceManager.createFBO(this.ID + ".fbo.default");
	        this.renderStageManager.StageChains.push({
	            buffers: {
	                OUT: "deffered.rb1"
	            },
	            stage: new RB1RenderStage(this)
	        }, {
	            buffers: {
	                DEPTH: "deffered.depth",
	                OUT: "deffered.rb2"
	            },
	            stage: new RB2RenderStage(this)
	        }, {
	            buffers: {
	                RB1: "deffered.rb1",
	                RB2: "deffered.rb2",
	                DEPTH: "deffered.depth",
	                DIR: "jthree.light.dir1",
	                OUT: "deffered.light"
	            },
	            stage: new LightAccumulationRenderStage(this)
	        }, {
	            buffers: {
	                LIGHT: "deffered.light",
	                OUT: "default",
	            },
	            stage: new FowardRenderStage(this)
	        });
	        this.renderStageManager.TextureBuffers = {
	            "jthree.light.dir1": {
	                generater: "rendererfit",
	                internalFormat: "DEPTH",
	                element: "USHORT"
	            },
	            "deffered.rb1": {
	                generater: "rendererfit",
	                internalFormat: "RGBA",
	                element: "UBYTE"
	            },
	            "deffered.rb2": {
	                generater: "rendererfit",
	                internalFormat: "RGBA",
	                element: "UBYTE"
	            }, "deffered.depth": {
	                generater: "rendererfit",
	                internalFormat: "DEPTH",
	                element: "USHORT"
	            },
	            "deffered.light": {
	                generater: "rendererfit",
	                internalFormat: "RGBA",
	                element: "UBYTE"
	            }
	        };
	        this.renderStageManager.generateAllTextures();
	    }
	    Object.defineProperty(RendererBase.prototype, "Camera", {
	        get: function () {
	            return this.camera;
	        },
	        set: function (camera) {
	            this.camera = camera;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RendererBase.prototype.render = function (drawAct) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    Object.defineProperty(RendererBase.prototype, "ContextManager", {
	        get: function () {
	            return this.contextManager;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RendererBase.prototype, "GLContext", {
	        get: function () {
	            return this.contextManager.Context;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RendererBase.prototype.beforeRender = function () {
	        this.ContextManager.beforeRender(this);
	    };
	    RendererBase.prototype.afterRender = function () {
	        this.ContextManager.afterRender(this);
	    };
	    Object.defineProperty(RendererBase.prototype, "RenderStageManager", {
	        get: function () {
	            return this.renderStageManager;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RendererBase.prototype.onResize = function (act) {
	        this.onResizeHandler.addListerner(act);
	    };
	    return RendererBase;
	})(jThreeObjectWithID);
	module.exports = RendererBase;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var AssociativeArray = __webpack_require__(8);
	var JThreeContextProxy = __webpack_require__(67);
	var Mesh = __webpack_require__(101);
	var QuadGeometry = __webpack_require__(85);
	var RenderStageManager = (function () {
	    function RenderStageManager(parent) {
	        this.stageChains = [];
	        this.textureBuffers = {};
	        this.generaters = new AssociativeArray();
	        this.parentRenderer = parent;
	        this.defaultQuad = new QuadGeometry("jthree.renderstage.default.quad");
	        this.initializeGeneraters();
	    }
	    RenderStageManager.prototype.initializeGeneraters = function () {
	        var generaters = __webpack_require__(102);
	        for (var key in generaters) {
	            if (generaters.hasOwnProperty(key)) {
	                var element = generaters[key];
	                this.generaters.set(key, new element(this.parentRenderer));
	            }
	        }
	    };
	    Object.defineProperty(RenderStageManager.prototype, "TextureBuffers", {
	        get: function () {
	            return this.textureBuffers;
	        },
	        set: function (val) {
	            this.textureBuffers = val;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RenderStageManager.prototype, "Generaters", {
	        get: function () {
	            return this.generaters;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RenderStageManager.prototype.generateAllTextures = function () {
	        for (var name in this.textureBuffers) {
	            var textureAllocationInfo = this.textureBuffers[name];
	            var generater = this.Generaters.get(textureAllocationInfo.generater);
	            generater.generate(name, textureAllocationInfo);
	        }
	    };
	    RenderStageManager.prototype.genChainTexture = function (chain) {
	        var texInfo = {};
	        var context = JThreeContextProxy.getJThreeContext();
	        for (var targetName in chain.buffers) {
	            var bufferName = chain.buffers[targetName];
	            if (bufferName == 'default') {
	                texInfo[targetName] = null;
	                continue;
	            }
	            var tex = context.ResourceManager.getTexture(this.parentRenderer.ID + "." + bufferName);
	            texInfo[targetName] = tex;
	        }
	        return texInfo;
	    };
	    Object.defineProperty(RenderStageManager.prototype, "StageChains", {
	        get: function () {
	            return this.stageChains;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RenderStageManager.prototype.processRender = function (scene, sceneObjects) {
	        var _this = this;
	        this.stageChains.forEach(function (chain) {
	            var texs = _this.genChainTexture(chain);
	            var stage = chain.stage;
	            var passCount = stage.getPassCount(scene);
	            var targetObjects;
	            switch (stage.TargetGeometry) {
	                case "quad":
	                    targetObjects = [new Mesh(_this.defaultQuad, null)];
	                    break;
	                case "scene":
	                default:
	                    targetObjects = sceneObjects;
	            }
	            stage.applyStageConfig();
	            for (var i = 0; i < passCount; i++) {
	                stage.preBeginStage(scene, i, texs);
	                targetObjects.forEach(function (v) {
	                    if (stage.needRender(scene, v, i))
	                        stage.render(scene, v, i, texs);
	                });
	                stage.postEndStage(scene, i, texs);
	            }
	        });
	    };
	    return RenderStageManager;
	})();
	module.exports = RenderStageManager;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var SceneObject = __webpack_require__(53);
	var Mesh = (function (_super) {
	    __extends(Mesh, _super);
	    function Mesh(geometry, mat) {
	        _super.call(this);
	        if (mat)
	            this.addMaterial(mat);
	        if (geometry)
	            this.geometry = geometry;
	    }
	    return Mesh;
	})(SceneObject);
	module.exports = Mesh;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    "rendererfit": __webpack_require__(103)
	};


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GeneraterBase = __webpack_require__(104);
	var TextureInternalFormatType = __webpack_require__(105);
	var TextureType = __webpack_require__(106);
	var Rectangle = __webpack_require__(93);
	var RendererFit = (function (_super) {
	    __extends(RendererFit, _super);
	    function RendererFit(parent) {
	        _super.call(this, parent);
	    }
	    Object.defineProperty(RendererFit.prototype, "ParentRenderRectangle", {
	        get: function () {
	            if (this.parentRenderer["ViewPortArea"]) {
	                return this.parentRenderer["ViewPortArea"];
	            }
	            else {
	                return new Rectangle(0, 0, 512, 512);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RendererFit.prototype.generate = function (name, texInfo) {
	        var rect = this.ParentRenderRectangle;
	        var width = rect.Width, height = rect.Height;
	        var internalFormat;
	        texInfo["internalFormat"] = texInfo["internalFormat"] || "RGBA";
	        switch ((new String(texInfo["internalFormat"])).toUpperCase()) {
	            case "ALPHA":
	                internalFormat = TextureInternalFormatType.Alpha;
	                break;
	            case "RGB":
	                internalFormat = TextureInternalFormatType.RGB;
	                break;
	            case "DEPTH":
	                internalFormat = TextureInternalFormatType.DEPTH_COMPONENT;
	                break;
	            case "LUMINANCE":
	                internalFormat = TextureInternalFormatType.Luminance;
	                break;
	            case "LUMINANCE_ALPHA":
	                internalFormat = TextureInternalFormatType.LuminanceAlpha;
	                break;
	            case "DEPTH_STENCIL":
	                internalFormat = TextureInternalFormatType.DEPTH_STENCIL;
	                break;
	            case "RGBA":
	                internalFormat = TextureInternalFormatType.RGBA;
	                break;
	            default:
	                console.error("the given parameter was invalid : texture format " + texInfo["internalFormat"]);
	        }
	        var elementFormat;
	        texInfo["element"] = texInfo["element"] || "UBYTE";
	        switch ((new String(texInfo["element"])).toUpperCase()) {
	            case "UBYTE":
	                elementFormat = TextureType.UnsignedByte;
	                break;
	            case "FLOAT":
	                elementFormat = TextureType.Float;
	                break;
	            case "USHORT565":
	                elementFormat = TextureType.UnsignedShort565;
	                break;
	            case "USHORT4444":
	                elementFormat = TextureType.UnsignedShort4444;
	                break;
	            case "USHORT5551":
	                elementFormat = TextureType.UnsignedShort5551;
	                break;
	            case "UINT":
	                elementFormat = TextureType.UnsignedInt;
	                break;
	            case "USHORT":
	                elementFormat = TextureType.UnsignedShort;
	                break;
	            case "UINT24_8":
	                elementFormat = TextureType.UnsignedInt24_8WebGL;
	                break;
	            default:
	                console.error("the given parameter was invalid : element format " + texInfo["element"]);
	        }
	        var resource = this.Context.ResourceManager.createTexture(this.parentRenderer.ID + "." + name, width, height, internalFormat, elementFormat);
	        this.parentRenderer.onResize(function (r, s) {
	            console.warn("resize!");
	            resource.resize(s.Width, s.Height);
	        });
	        return resource;
	    };
	    return RendererFit;
	})(GeneraterBase);
	module.exports = RendererFit;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var JThreeContextProxy = __webpack_require__(67);
	var GeneraterBase = (function () {
	    function GeneraterBase(parent) {
	        this.parentRenderer = parent;
	    }
	    GeneraterBase.prototype.generate = function (name, texInfo) {
	    };
	    Object.defineProperty(GeneraterBase.prototype, "Context", {
	        get: function () {
	            return JThreeContextProxy.getJThreeContext();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return GeneraterBase;
	})();
	module.exports = GeneraterBase;


/***/ },
/* 105 */
/***/ function(module, exports) {

	var TextureInternalFormatType;
	(function (TextureInternalFormatType) {
	    TextureInternalFormatType[TextureInternalFormatType["Alpha"] = 6406] = "Alpha";
	    TextureInternalFormatType[TextureInternalFormatType["Luminance"] = 6409] = "Luminance";
	    TextureInternalFormatType[TextureInternalFormatType["LuminanceAlpha"] = 6410] = "LuminanceAlpha";
	    TextureInternalFormatType[TextureInternalFormatType["RGB"] = 6407] = "RGB";
	    TextureInternalFormatType[TextureInternalFormatType["RGBA"] = 6408] = "RGBA";
	    TextureInternalFormatType[TextureInternalFormatType["DEPTH_COMPONENT"] = 6402] = "DEPTH_COMPONENT";
	    TextureInternalFormatType[TextureInternalFormatType["DEPTH_STENCIL"] = 34041] = "DEPTH_STENCIL";
	})(TextureInternalFormatType || (TextureInternalFormatType = {}));
	module.exports = TextureInternalFormatType;


/***/ },
/* 106 */
/***/ function(module, exports) {

	var TextureType;
	(function (TextureType) {
	    TextureType[TextureType["UnsignedByte"] = 5121] = "UnsignedByte";
	    TextureType[TextureType["Float"] = 5126] = "Float";
	    TextureType[TextureType["UnsignedShort565"] = 33635] = "UnsignedShort565";
	    TextureType[TextureType["UnsignedShort4444"] = 32819] = "UnsignedShort4444";
	    TextureType[TextureType["UnsignedShort5551"] = 32820] = "UnsignedShort5551";
	    TextureType[TextureType["UnsignedShort"] = 5123] = "UnsignedShort";
	    TextureType[TextureType["UnsignedInt"] = 5125] = "UnsignedInt";
	    TextureType[TextureType["UnsignedInt24_8WebGL"] = 34042] = "UnsignedInt24_8WebGL";
	})(TextureType || (TextureType = {}));
	module.exports = TextureType;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var RenderStageBase = __webpack_require__(108);
	var ClearTargetType = __webpack_require__(88);
	var Matrix = __webpack_require__(56);
	var RB1RenderStage = (function (_super) {
	    __extends(RB1RenderStage, _super);
	    function RB1RenderStage(renderer) {
	        _super.call(this, renderer);
	        var vs = __webpack_require__(115);
	        var fs = __webpack_require__(116);
	        this.rb1Program = this.loadProgram("jthree.shaders.vertex.basic", "jthree.shaders.fragment.deffered.rb1", "jthree.programs.rb1", vs, fs);
	    }
	    RB1RenderStage.prototype.preBeginStage = function (scene, passCount, chainInfo) {
	        var _this = this;
	        this.bindAsOutBuffer(this.DefaultFBO, [
	            {
	                texture: chainInfo["OUT"],
	                target: 0
	            },
	            {
	                texture: this.DefaultRBO,
	                target: "depth",
	                type: "rbo"
	            }
	        ], function () {
	            _this.Renderer.GLContext.ClearColor(0, 0, 0, 0);
	            _this.Renderer.GLContext.Clear(ClearTargetType.ColorBits | ClearTargetType.DepthBits);
	        });
	    };
	    RB1RenderStage.prototype.render = function (scene, object, passCount) {
	        var geometry = object.Geometry;
	        if (!geometry)
	            return;
	        this.configureProgram(object);
	        geometry.drawElements(this.Renderer.ContextManager, null);
	    };
	    RB1RenderStage.prototype.configureProgram = function (object) {
	        var geometry = object.Geometry;
	        var programWrapper = this.rb1Program.getForContext(this.Renderer.ContextManager);
	        programWrapper.useProgram();
	        var v = object.Transformer.calculateMVPMatrix(this.Renderer);
	        programWrapper.setAttributeVerticies("position", geometry.PositionBuffer.getForRenderer(this.Renderer.ContextManager));
	        programWrapper.setAttributeVerticies("normal", geometry.NormalBuffer.getForRenderer(this.Renderer.ContextManager));
	        programWrapper.setAttributeVerticies("uv", geometry.UVBuffer.getForRenderer(this.Renderer.ContextManager));
	        programWrapper.setUniformMatrix("matMVP", v);
	        programWrapper.setUniformMatrix("matV", this.Renderer.Camera.ViewMatrix);
	        programWrapper.setUniformMatrix("matMV", Matrix.multiply(this.Renderer.Camera.ViewMatrix, object.Transformer.LocalToGlobal));
	        programWrapper.setUniform1i("texture", 0);
	        geometry.IndexBuffer.getForRenderer(this.Renderer.ContextManager).bindBuffer();
	    };
	    RB1RenderStage.prototype.needRender = function (scene, object, passCount) {
	        return typeof object.Geometry != "undefined" && object.Geometry != null;
	    };
	    RB1RenderStage.prototype.getPassCount = function (scene) {
	        return 1;
	    };
	    return RB1RenderStage;
	})(RenderStageBase);
	module.exports = RB1RenderStage;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var JThreeContextProxy = __webpack_require__(67);
	var ShaderType = __webpack_require__(110);
	var TextureRegister = __webpack_require__(111);
	var GLCullMode = __webpack_require__(109);
	var GLFeature = __webpack_require__(112);
	var FrameBufferAttachmentType = __webpack_require__(113);
	var TargetTextureType = __webpack_require__(114);
	var RenderStageBase = (function (_super) {
	    __extends(RenderStageBase, _super);
	    function RenderStageBase(renderer) {
	        _super.call(this);
	        this.renderer = renderer;
	    }
	    Object.defineProperty(RenderStageBase.prototype, "Renderer", {
	        get: function () {
	            return this.renderer;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RenderStageBase.prototype, "GLContext", {
	        get: function () {
	            return this.Renderer.GLContext;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RenderStageBase.prototype.preBeginStage = function (scene, passCount, texs) {
	    };
	    RenderStageBase.prototype.postEndStage = function (scene, passCount, texs) {
	        this.Renderer.GLContext.Flush();
	    };
	    RenderStageBase.prototype.render = function (scene, object, passCount, texs) {
	    };
	    RenderStageBase.prototype.needRender = function (scene, object, passCount) {
	        return false;
	    };
	    RenderStageBase.prototype.getPassCount = function (scene) {
	        return 1;
	    };
	    Object.defineProperty(RenderStageBase.prototype, "TargetGeometry", {
	        get: function () {
	            return "scene";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RenderStageBase.prototype.applyStageConfig = function () {
	        this.applyStageConfigToGLFeature(this.RenderStageConfig.cullFace, GLFeature.CullFace, true);
	        this.applyStageConfigToGLFeature(this.RenderStageConfig.depthTest, GLFeature.DepthTest, true);
	        if (!this.RenderStageConfig.cullFront) {
	            this.GLContext.CullFace(GLCullMode.Front);
	        }
	        else {
	            this.GLContext.CullFace(GLCullMode.Back);
	        }
	        this.resetActiveTextures();
	    };
	    RenderStageBase.prototype.applyStageConfigToGLFeature = function (flag, target, def) {
	        if (typeof flag === 'undefined') {
	            flag = def;
	        }
	        if (flag) {
	            this.GLContext.Enable(target);
	        }
	        else {
	            this.GLContext.Disable(target);
	        }
	    };
	    RenderStageBase.prototype.resetActiveTextures = function () {
	        for (var i = 0; i < 32; i++) {
	            this.GLContext.ActiveTexture(TextureRegister.Texture0 + i);
	            this.GLContext.BindTexture(TargetTextureType.Texture2D, null);
	        }
	    };
	    Object.defineProperty(RenderStageBase.prototype, "RenderStageConfig", {
	        get: function () {
	            return {
	                cullFace: true,
	                cullFront: false,
	                depthTest: true
	            };
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RenderStageBase.prototype.loadProgram = function (vsid, fsid, pid, vscode, fscode) {
	        var jThreeContext = JThreeContextProxy.getJThreeContext();
	        var rm = jThreeContext.ResourceManager;
	        var vShader = rm.createShader(vsid, vscode, ShaderType.VertexShader);
	        var fShader = rm.createShader(fsid, fscode, ShaderType.FragmentShader);
	        vShader.loadAll();
	        fShader.loadAll();
	        return rm.createProgram(pid, [vShader, fShader]);
	    };
	    RenderStageBase.prototype.bindAsOutBuffer = function (fbo, bindInfo, onBind, onDefaultBuffer) {
	        var _this = this;
	        var shouldBeDefault = false;
	        var targetWrapper = fbo.getForContext(this.Renderer.ContextManager);
	        bindInfo.forEach(function (v) {
	            v.target = v.target.toString().toLowerCase();
	            var attachmentType = FrameBufferAttachmentType.ColorAttachment0;
	            if (v.target === "depth") {
	                attachmentType = FrameBufferAttachmentType.DepthAttachment;
	            }
	            else if (v.target === "stencil") {
	                attachmentType = FrameBufferAttachmentType.StencilAttachment;
	            }
	            else if (v.target === "depthstencil") {
	                attachmentType = FrameBufferAttachmentType.DepthStencilAttachment;
	            }
	            else {
	                attachmentType = (FrameBufferAttachmentType.ColorAttachment0 + new Number(v.target));
	            }
	            if (shouldBeDefault || (typeof v.isOptional !== 'undefined' && !v.isOptional && v.texture === null)) {
	                _this.attachToWrapper(v, targetWrapper, attachmentType);
	                _this.Renderer.GLContext.BindFrameBuffer(null);
	                shouldBeDefault = true;
	            }
	            else {
	                _this.attachToWrapper(v, targetWrapper, attachmentType);
	            }
	        });
	        if (shouldBeDefault) {
	            if (onDefaultBuffer)
	                onDefaultBuffer();
	        }
	        else {
	            onBind();
	        }
	    };
	    RenderStageBase.prototype.attachToWrapper = function (v, targetWrapper, targetAttachment) {
	        if (!v.type || v.type == "texture") {
	            targetWrapper.attachTexture(targetAttachment, v.texture);
	        }
	        else if (v.type = "rbo") {
	            targetWrapper.attachRBO(targetAttachment, v.texture);
	        }
	        else {
	            console.error("unknown bind type!");
	        }
	    };
	    Object.defineProperty(RenderStageBase.prototype, "DefaultFBO", {
	        get: function () {
	            return JThreeContextProxy.getJThreeContext().ResourceManager.getFBO(this.Renderer.ID + ".fbo.default");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RenderStageBase.prototype, "DefaultRBO", {
	        get: function () {
	            return JThreeContextProxy.getJThreeContext().ResourceManager.getRBO(this.Renderer.ID + ".rbo.default");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RenderStageBase.prototype, "Context", {
	        get: function () {
	            return JThreeContextProxy.getJThreeContext();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return RenderStageBase;
	})(JThreeObject);
	module.exports = RenderStageBase;


/***/ },
/* 109 */
/***/ function(module, exports) {

	var GLCullMode;
	(function (GLCullMode) {
	    GLCullMode[GLCullMode["Front"] = 1028] = "Front";
	    GLCullMode[GLCullMode["Back"] = 1029] = "Back";
	    GLCullMode[GLCullMode["FrontBack"] = 1032] = "FrontBack";
	})(GLCullMode || (GLCullMode = {}));
	module.exports = GLCullMode;


/***/ },
/* 110 */
/***/ function(module, exports) {

	var ShaderType;
	(function (ShaderType) {
	    ShaderType[ShaderType["VertexShader"] = 35633] = "VertexShader";
	    ShaderType[ShaderType["FragmentShader"] = 35632] = "FragmentShader";
	})(ShaderType || (ShaderType = {}));
	module.exports = ShaderType;


/***/ },
/* 111 */
/***/ function(module, exports) {

	var TextureRegister;
	(function (TextureRegister) {
	    TextureRegister[TextureRegister["Texture0"] = 33984] = "Texture0";
	    TextureRegister[TextureRegister["Texture1"] = 33985] = "Texture1";
	    TextureRegister[TextureRegister["Texture2"] = 33986] = "Texture2";
	    TextureRegister[TextureRegister["Texture3"] = 33987] = "Texture3";
	    TextureRegister[TextureRegister["Texture4"] = 33988] = "Texture4";
	    TextureRegister[TextureRegister["Texture5"] = 33989] = "Texture5";
	    TextureRegister[TextureRegister["Texture6"] = 33990] = "Texture6";
	    TextureRegister[TextureRegister["Texture7"] = 33991] = "Texture7";
	    TextureRegister[TextureRegister["Texture8"] = 33992] = "Texture8";
	    TextureRegister[TextureRegister["Texture9"] = 33993] = "Texture9";
	    TextureRegister[TextureRegister["Texture10"] = 33994] = "Texture10";
	    TextureRegister[TextureRegister["Texture11"] = 33995] = "Texture11";
	    TextureRegister[TextureRegister["Texture12"] = 33996] = "Texture12";
	    TextureRegister[TextureRegister["Texture13"] = 33997] = "Texture13";
	})(TextureRegister || (TextureRegister = {}));
	module.exports = TextureRegister;


/***/ },
/* 112 */
/***/ function(module, exports) {

	var GLFeatureType;
	(function (GLFeatureType) {
	    GLFeatureType[GLFeatureType["DepthTest"] = 2929] = "DepthTest";
	    GLFeatureType[GLFeatureType["CullFace"] = 2884] = "CullFace";
	    GLFeatureType[GLFeatureType["Blend"] = 3042] = "Blend";
	})(GLFeatureType || (GLFeatureType = {}));
	module.exports = GLFeatureType;


/***/ },
/* 113 */
/***/ function(module, exports) {

	var FrameBufferAttachmentType;
	(function (FrameBufferAttachmentType) {
	    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment0"] = 36064] = "ColorAttachment0";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment1"] = 36065] = "ColorAttachment1";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment2"] = 36066] = "ColorAttachment2";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment3"] = 36067] = "ColorAttachment3";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment4"] = 36068] = "ColorAttachment4";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment5"] = 36069] = "ColorAttachment5";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment6"] = 36070] = "ColorAttachment6";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment7"] = 36071] = "ColorAttachment7";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment8"] = 36072] = "ColorAttachment8";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment9"] = 36073] = "ColorAttachment9";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment10"] = 36074] = "ColorAttachment10";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment11"] = 36075] = "ColorAttachment11";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment12"] = 36076] = "ColorAttachment12";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment13"] = 36077] = "ColorAttachment13";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment14"] = 36078] = "ColorAttachment14";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["ColorAttachment15"] = 36079] = "ColorAttachment15";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["DepthAttachment"] = 36096] = "DepthAttachment";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["StencilAttachment"] = 36128] = "StencilAttachment";
	    FrameBufferAttachmentType[FrameBufferAttachmentType["DepthStencilAttachment"] = 33306] = "DepthStencilAttachment";
	})(FrameBufferAttachmentType || (FrameBufferAttachmentType = {}));
	module.exports = FrameBufferAttachmentType;


/***/ },
/* 114 */
/***/ function(module, exports) {

	var TargetTextureType;
	(function (TargetTextureType) {
	    TargetTextureType[TargetTextureType["Texture2D"] = 3553] = "Texture2D";
	    TargetTextureType[TargetTextureType["CubePositiveX"] = 34069] = "CubePositiveX";
	    TargetTextureType[TargetTextureType["CubeNegativeX"] = 34070] = "CubeNegativeX";
	    TargetTextureType[TargetTextureType["CubePositiveY"] = 34071] = "CubePositiveY";
	    TargetTextureType[TargetTextureType["CubeNegativeY"] = 34072] = "CubeNegativeY";
	    TargetTextureType[TargetTextureType["CubePositiveZ"] = 34073] = "CubePositiveZ";
	    TargetTextureType[TargetTextureType["CubeNegativeZ"] = 34074] = "CubeNegativeZ";
	})(TargetTextureType || (TargetTextureType = {}));
	module.exports = TargetTextureType;


/***/ },
/* 115 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\r\nattribute vec3 position;\r\nattribute vec3 normal;\r\nattribute vec2 uv;\r\n\r\nuniform mat4 matMVP;\r\nuniform mat4 matMV;\r\n\r\n\r\nvarying vec3 v_normal;\r\nvarying vec2 v_uv;\r\nvarying vec4 v_pos;\r\n\r\nvoid main(void){\r\nv_pos=gl_Position = matMVP*vec4(position,1.0);\r\nv_normal=normalize((matMV*vec4(normal,0)).xyz);\r\nv_uv=uv;\r\n}\r\n"

/***/ },
/* 116 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\r\nvarying vec3 v_normal;\r\nvarying  vec2 v_uv;\r\nvarying vec4 v_pos;\r\nuniform mat4 matMVP;\r\nuniform mat4 matMV;\r\nuniform mat4 matV;\r\n//R=NORMAL.X\r\n//G=NORMAL.Y\r\n//B=NORMAL.Z\r\n//A=DEPTH\r\nvoid main(void){\r\n  float w=v_pos.z;\r\n  gl_FragColor.rgb=v_normal*0.5+vec3(0.5,0.5,0.5);\r\n  gl_FragColor.a=w;\r\n}\r\n"

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var RenderStageBase = __webpack_require__(108);
	var JThreeContextProxy = __webpack_require__(67);
	var ClearTargetType = __webpack_require__(88);
	var Matrix = __webpack_require__(56);
	var RB2RenderStage = (function (_super) {
	    __extends(RB2RenderStage, _super);
	    function RB2RenderStage(renderer) {
	        _super.call(this, renderer);
	        var context = JThreeContextProxy.getJThreeContext();
	        var vs = __webpack_require__(115);
	        var fs = __webpack_require__(118);
	        this.rb2Program = this.loadProgram("jthree.shaders.vertex.basic", "jthree.shaders.fragment.deffered.rb2", "jthree.programs.rb2", vs, fs);
	    }
	    RB2RenderStage.prototype.preBeginStage = function (scene, passCount, texs) {
	        var _this = this;
	        this.bindAsOutBuffer(this.DefaultFBO, [
	            {
	                texture: texs["OUT"],
	                target: 0
	            },
	            {
	                texture: texs["DEPTH"],
	                target: "depth"
	            }
	        ], function () {
	            _this.Renderer.GLContext.ClearColor(0, 0, 0, 0);
	            _this.Renderer.GLContext.Clear(ClearTargetType.ColorBits | ClearTargetType.DepthBits);
	        });
	    };
	    RB2RenderStage.prototype.render = function (scene, object, passCount) {
	        var geometry = object.Geometry;
	        if (!geometry)
	            return;
	        this.configureProgram(object);
	        geometry.drawElements(this.Renderer.ContextManager, null);
	    };
	    RB2RenderStage.prototype.configureProgram = function (object) {
	        var geometry = object.Geometry;
	        var programWrapper = this.rb2Program.getForContext(this.Renderer.ContextManager);
	        programWrapper.useProgram();
	        var v = object.Transformer.calculateMVPMatrix(this.Renderer);
	        programWrapper.setAttributeVerticies("position", geometry.PositionBuffer.getForRenderer(this.Renderer.ContextManager));
	        programWrapper.setAttributeVerticies("normal", geometry.NormalBuffer.getForRenderer(this.Renderer.ContextManager));
	        programWrapper.setAttributeVerticies("uv", geometry.UVBuffer.getForRenderer(this.Renderer.ContextManager));
	        programWrapper.setUniformMatrix("matMVP", v);
	        programWrapper.setUniformMatrix("matV", this.Renderer.Camera.ViewMatrix);
	        programWrapper.setUniformMatrix("matMV", Matrix.multiply(this.Renderer.Camera.ViewMatrix, object.Transformer.LocalToGlobal));
	        programWrapper.setUniform1i("texture", 0);
	        geometry.IndexBuffer.getForRenderer(this.Renderer.ContextManager).bindBuffer();
	    };
	    RB2RenderStage.prototype.needRender = function (scene, object, passCount) {
	        return typeof object.Geometry != "undefined" && object.Geometry != null;
	    };
	    RB2RenderStage.prototype.getPassCount = function (scene) {
	        return 1;
	    };
	    return RB2RenderStage;
	})(RenderStageBase);
	module.exports = RB2RenderStage;


/***/ },
/* 118 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\r\nvarying vec3 v_normal;\r\nvarying  vec2 v_uv;\r\nvarying vec4 v_pos;\r\nuniform mat4 matMVP;\r\nuniform mat4 matMV;\r\nuniform mat4 matV;\r\nuniform sampler2D texture;\r\n//R=ALBEDO.R\r\n//G=ALBEDO.G\r\n//B=ALBEDO.B\r\n//A=ROUGHNESS\r\nvoid main(void){\r\n  gl_FragColor.rgb = texture2D(texture,v_uv).rgb;\r\n  gl_FragColor.a = 1.0;\r\n}\r\n"

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var RenderStageBase = __webpack_require__(108);
	var ClearTargetType = __webpack_require__(88);
	var Mesh = __webpack_require__(101);
	var Matrix = __webpack_require__(56);
	var Vector3 = __webpack_require__(24);
	var Vector2 = __webpack_require__(120);
	var agent = __webpack_require__(121);
	var LitghtAccumulationStage = (function (_super) {
	    __extends(LitghtAccumulationStage, _super);
	    function LitghtAccumulationStage(renderer) {
	        var _this = this;
	        _super.call(this, renderer);
	        var vs = __webpack_require__(124);
	        agent.get("/LightAccumulation.glsl").end(function (err, res) {
	            _this.program = _this.loadProgram("jthree.shaders.vertex.post", "jthree.shaders.fragment.deffered.lightaccum", "jthree.programs.deffered.light", vs, res.text);
	        });
	    }
	    LitghtAccumulationStage.prototype.preBeginStage = function (scene, passCount, texs) {
	        var _this = this;
	        this.bindAsOutBuffer(this.DefaultFBO, [
	            { texture: texs["OUT"], target: 0 },
	            { texture: this.DefaultRBO, type: "rbo", target: "depth", isOptional: true }
	        ], function () {
	            _this.GLContext.ClearColor(0, 0, 0, 0);
	            _this.GLContext.Clear(ClearTargetType.ColorBits);
	        });
	    };
	    LitghtAccumulationStage.prototype.render = function (scene, object, passCount, texs) {
	        var geometry = object.Geometry;
	        if (!geometry || !this.program)
	            return;
	        this.configureMaterial(scene, this.Renderer, new Mesh(geometry, null), texs);
	        geometry.drawElements(this.Renderer.ContextManager, null);
	    };
	    LitghtAccumulationStage.prototype.configureMaterial = function (scene, renderer, object, texs) {
	        var geometry = object.Geometry;
	        var programWrapper = this.program.getForContext(renderer.ContextManager);
	        programWrapper.useProgram();
	        var ip = Matrix.inverse(renderer.Camera.ProjectionMatrix);
	        programWrapper.setAttributeVerticies("position", geometry.PositionBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setAttributeVerticies("uv", geometry.UVBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setUniformVector("c_pos", renderer.Camera.Position);
	        programWrapper.setUniformVector("c_dir", renderer.Camera.LookAt.subtractWith(renderer.Camera.Position).normalizeThis());
	        programWrapper.registerTexture(renderer, texs["RB1"], 0, "rb1");
	        programWrapper.registerTexture(renderer, texs["RB2"], 1, "rb2");
	        programWrapper.registerTexture(renderer, texs["DEPTH"], 2, "depth");
	        var plights = scene.getLights("jthree.lights.pointlight");
	        var lpos = new Array(plights.length);
	        var lcol = new Array(plights.length);
	        var lcoef = new Array(plights.length);
	        for (var i = 0; i < plights.length; i++) {
	            var pl = plights[i];
	            lpos[i] = Matrix.transformPoint(renderer.Camera.ViewMatrix, plights[i].Position);
	            lcol[i] = plights[i].Color.toVector().multiplyWith(pl.Intensity);
	            lcoef[i] = new Vector2(pl.Decay, pl.Distance);
	        }
	        programWrapper.setUniformVectorArray("pl_pos", lpos);
	        programWrapper.setUniformVectorArray("pl_col", lcol);
	        programWrapper.setUniformVectorArray("pl_coef", lcoef);
	        programWrapper.setUniform1i("pl_count", plights.length);
	        var dlights = scene.getLights("jthree.lights.directionallight");
	        var ddir = new Array(dlights.length);
	        var dcol = new Array(dlights.length);
	        for (var i = 0; i < dlights.length; i++) {
	            var dl = dlights[i];
	            ddir[i] = Matrix.transformNormal(renderer.Camera.ViewMatrix, dlights[i].Transformer.Foward);
	            dcol[i] = dl.Color.toVector().multiplyWith(dl.Intensity);
	        }
	        programWrapper.setUniformVectorArray("dl_dir", ddir);
	        programWrapper.setUniformVectorArray("dl_col", dcol);
	        programWrapper.setUniform1i("dl_count", dlights.length);
	        programWrapper.setUniform1f("c_near", 0.1);
	        programWrapper.setUniform1f("c_far", 5);
	        programWrapper.setUniformMatrix("matIP", ip);
	        programWrapper.setUniformMatrix("matTV", Matrix.inverse(renderer.Camera.ViewMatrix));
	        programWrapper.setUniformMatrix("matLV", dlights[0] ? dlights[0].VP : Matrix.identity());
	        programWrapper.registerTexture(renderer, texs["DIR"], 3, "u_ldepth");
	        programWrapper.setUniformVector("posL", Matrix.transformPoint(renderer.Camera.ViewMatrix, new Vector3(1, 2, -3)));
	        programWrapper.setUniform1f("time", (new Date()).getMilliseconds() + 1000 * (new Date().getSeconds()));
	        programWrapper.setUniform1f("xtest", new Number(document.getElementsByName("x").item(0).value));
	        programWrapper.setUniform1f("ztest", new Number(document.getElementsByName("z").item(0).value));
	        geometry.IndexBuffer.getForRenderer(renderer.ContextManager).bindBuffer();
	    };
	    LitghtAccumulationStage.prototype.needRender = function (scene, object, passCount) {
	        return typeof object.Geometry != "undefined" && object.Geometry != null;
	    };
	    LitghtAccumulationStage.prototype.getPassCount = function (scene) {
	        return 1;
	    };
	    Object.defineProperty(LitghtAccumulationStage.prototype, "TargetGeometry", {
	        get: function () {
	            return "quad";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LitghtAccumulationStage.prototype, "RenderStageConfig", {
	        get: function () {
	            return {
	                depthTest: false
	            };
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return LitghtAccumulationStage;
	})(RenderStageBase);
	module.exports = LitghtAccumulationStage;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var VectorBase = __webpack_require__(25);
	var glm = __webpack_require__(26);
	var Vector2 = (function (_super) {
	    __extends(Vector2, _super);
	    function Vector2(x, y) {
	        _super.call(this);
	        if (typeof y === 'undefined') {
	            this.targetVector = x;
	            return;
	        }
	        this.targetVector = [x, y];
	    }
	    Object.defineProperty(Vector2, "XUnit", {
	        get: function () {
	            return new Vector2(1, 0);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector2, "YUnit", {
	        get: function () {
	            return new Vector2(0, 1);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector2.prototype, "X", {
	        get: function () {
	            return this.targetVector[0];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector2.prototype, "Y", {
	        get: function () {
	            return this.targetVector[1];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Vector2.dot = function (v1, v2) {
	        return glm.vec2.dot(v1.targetVector, v2.targetVector);
	    };
	    Vector2.add = function (v1, v2) {
	        var newVec = glm.vec2.create();
	        return new Vector2(glm.vec2.add(newVec, v1.targetVector, v2.targetVector));
	    };
	    Vector2.subtract = function (v1, v2) {
	        var newVec = glm.vec2.create();
	        return new Vector2(glm.vec2.sub(newVec, v1.targetVector, v2.targetVector));
	    };
	    Vector2.multiply = function (s, v) {
	        var newVec = glm.vec2.create();
	        return new Vector2(glm.vec2.scale(newVec, v.targetVector, s));
	    };
	    Vector2.negate = function (v1) {
	        return Vector2.multiply(-1, v1);
	    };
	    Vector2.equal = function (v1, v2) {
	        return VectorBase.elementEqual(v1, v2);
	    };
	    Vector2.normalize = function (v1) {
	        var newVec = glm.vec2.create();
	        return new Vector2(glm.vec2.normalize(newVec, v1.targetVector));
	    };
	    Vector2.prototype.dotWith = function (v) {
	        return Vector2.dot(this, v);
	    };
	    Vector2.prototype.addWith = function (v) {
	        return Vector2.add(this, v);
	    };
	    Vector2.prototype.subtractWith = function (v) {
	        return Vector2.subtract(v, this);
	    };
	    Vector2.prototype.multiplyWith = function (s) {
	        return Vector2.multiply(s, this);
	    };
	    Vector2.prototype.negateThis = function () {
	        return Vector2.negate(this);
	    };
	    Vector2.prototype.equalWith = function (v) {
	        return Vector2.equal(this, v);
	    };
	    Vector2.prototype.normalizeThis = function () {
	        return Vector2.normalize(this);
	    };
	    Vector2.prototype.toString = function () {
	        return "Vector2(x=" + this.X + "},y=" + this.Y + ")";
	    };
	    Object.defineProperty(Vector2.prototype, "ElementCount", {
	        get: function () { return 2; },
	        enumerable: true,
	        configurable: true
	    });
	    return Vector2;
	})(VectorBase);
	module.exports = Vector2;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Emitter = __webpack_require__(122);
	var reduce = __webpack_require__(123);

	/**
	 * Root reference for iframes.
	 */

	var root = 'undefined' == typeof window
	  ? (this || self)
	  : window;

	/**
	 * Noop.
	 */

	function noop(){};

	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * TODO: future proof, move to compoent land
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isHost(obj) {
	  var str = {}.toString.call(obj);

	  switch (str) {
	    case '[object File]':
	    case '[object Blob]':
	    case '[object FormData]':
	      return true;
	    default:
	      return false;
	  }
	}

	/**
	 * Determine XHR.
	 */

	request.getXHR = function () {
	  if (root.XMLHttpRequest
	      && (!root.location || 'file:' != root.location.protocol
	          || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  return false;
	};

	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */

	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isObject(obj) {
	  return obj === Object(obj);
	}

	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */

	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    if (null != obj[key]) {
	      pairs.push(encodeURIComponent(key)
	        + '=' + encodeURIComponent(obj[key]));
	    }
	  }
	  return pairs.join('&');
	}

	/**
	 * Expose serialization method.
	 */

	 request.serializeObject = serialize;

	 /**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */

	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var parts;
	  var pair;

	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    parts = pair.split('=');
	    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
	  }

	  return obj;
	}

	/**
	 * Expose parser.
	 */

	request.parseString = parseString;

	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */

	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};

	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */

	 request.serialize = {
	   'application/x-www-form-urlencoded': serialize,
	   'application/json': JSON.stringify
	 };

	 /**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */

	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};

	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;

	  lines.pop(); // trailing CRLF

	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }

	  return fields;
	}

	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	function type(str){
	  return str.split(/ *; */).shift();
	};

	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function params(str){
	  return reduce(str.split(/ *; */), function(obj, str){
	    var parts = str.split(/ *= */)
	      , key = parts.shift()
	      , val = parts.shift();

	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};

	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */

	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  // responseText is accessible only if responseType is '' or 'text' and on older browsers
	  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
	     ? this.xhr.responseText
	     : null;
	  this.statusText = this.req.xhr.statusText;
	  this.setStatusProperties(this.xhr.status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this.setHeaderProperties(this.header);
	  this.body = this.req.method != 'HEAD'
	    ? this.parseBody(this.text ? this.text : this.xhr.response)
	    : null;
	}

	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	Response.prototype.get = function(field){
	  return this.header[field.toLowerCase()];
	};

	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */

	Response.prototype.setHeaderProperties = function(header){
	  // content-type
	  var ct = this.header['content-type'] || '';
	  this.type = type(ct);

	  // params
	  var obj = params(ct);
	  for (var key in obj) this[key] = obj[key];
	};

	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */

	Response.prototype.parseBody = function(str){
	  var parse = request.parse[this.type];
	  return parse && str && (str.length || str instanceof Object)
	    ? parse(str)
	    : null;
	};

	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */

	Response.prototype.setStatusProperties = function(status){
	  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  if (status === 1223) {
	    status = 204;
	  }

	  var type = status / 100 | 0;

	  // status / class
	  this.status = status;
	  this.statusType = type;

	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = (4 == type || 5 == type)
	    ? this.toError()
	    : false;

	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.notFound = 404 == status;
	  this.forbidden = 403 == status;
	};

	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */

	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;

	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;

	  return err;
	};

	/**
	 * Expose `Response`.
	 */

	request.Response = Response;

	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */

	function Request(method, url) {
	  var self = this;
	  Emitter.call(this);
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {};
	  this._header = {};
	  this.on('end', function(){
	    var err = null;
	    var res = null;

	    try {
	      res = new Response(self);
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	      return self.callback(err);
	    }

	    self.emit('response', res);

	    if (err) {
	      return self.callback(err, res);
	    }

	    if (res.status >= 200 && res.status < 300) {
	      return self.callback(err, res);
	    }

	    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
	    new_err.original = err;
	    new_err.response = res;
	    new_err.status = res.status;

	    self.callback(err || new_err, res);
	  });
	}

	/**
	 * Mixin `Emitter`.
	 */

	Emitter(Request.prototype);

	/**
	 * Allow for extension
	 */

	Request.prototype.use = function(fn) {
	  fn(this);
	  return this;
	}

	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.timeout = function(ms){
	  this._timeout = ms;
	  return this;
	};

	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.clearTimeout = function(){
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};

	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */

	Request.prototype.abort = function(){
	  if (this.aborted) return;
	  this.aborted = true;
	  this.xhr.abort();
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};

	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};

	/**
	 * Remove header `field`.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};

	/**
	 * Get case-insensitive header `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 */

	Request.prototype.getHeader = function(field){
	  return this._header[field.toLowerCase()];
	};

	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.auth = function(user, pass){
	  var str = btoa(user + ':' + pass);
	  this.set('Authorization', 'Basic ' + str);
	  return this;
	};

	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/

	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};

	/**
	 * Write the field `name` and `val` for "multipart/form-data"
	 * request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} name
	 * @param {String|Blob|File} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.field = function(name, val){
	  if (!this._formData) this._formData = new root.FormData();
	  this._formData.append(name, val);
	  return this;
	};

	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.attach = function(field, file, filename){
	  if (!this._formData) this._formData = new root.FormData();
	  this._formData.append(field, file, filename);
	  return this;
	};

	/**
	 * Send `data`, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // querystring
	 *       request.get('/search')
	 *         .end(callback)
	 *
	 *       // multiple data "writes"
	 *       request.get('/search')
	 *         .send({ search: 'query' })
	 *         .send({ range: '1..5' })
	 *         .send({ order: 'desc' })
	 *         .end(callback)
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"})
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	  *      request.post('/user')
	  *        .send('name=tobi')
	  *        .send('species=ferret')
	  *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.send = function(data){
	  var obj = isObject(data);
	  var type = this.getHeader('Content-Type');

	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    if (!type) this.type('form');
	    type = this.getHeader('Content-Type');
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }

	  if (!obj || isHost(data)) return this;
	  if (!type) this.type('json');
	  return this;
	};

	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */

	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();
	  fn(err, res);
	};

	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */

	Request.prototype.crossDomainError = function(){
	  var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
	  err.crossDomain = true;
	  this.callback(err);
	};

	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */

	Request.prototype.timeoutError = function(){
	  var timeout = this._timeout;
	  var err = new Error('timeout of ' + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  this.callback(err);
	};

	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */

	Request.prototype.withCredentials = function(){
	  this._withCredentials = true;
	  return this;
	};

	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.end = function(fn){
	  var self = this;
	  var xhr = this.xhr = request.getXHR();
	  var query = this._query.join('&');
	  var timeout = this._timeout;
	  var data = this._formData || this._data;

	  // store callback
	  this._callback = fn || noop;

	  // state change
	  xhr.onreadystatechange = function(){
	    if (4 != xhr.readyState) return;

	    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"
	    var status;
	    try { status = xhr.status } catch(e) { status = 0; }

	    if (0 == status) {
	      if (self.timedout) return self.timeoutError();
	      if (self.aborted) return;
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };

	  // progress
	  var handleProgress = function(e){
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;
	    }
	    self.emit('progress', e);
	  };
	  if (this.hasListeners('progress')) {
	    xhr.onprogress = handleProgress;
	  }
	  try {
	    if (xhr.upload && this.hasListeners('progress')) {
	      xhr.upload.onprogress = handleProgress;
	    }
	  } catch(e) {
	    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	    // Reported here:
	    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
	  }

	  // timeout
	  if (timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self.timedout = true;
	      self.abort();
	    }, timeout);
	  }

	  // querystring
	  if (query) {
	    query = request.serializeObject(query);
	    this.url += ~this.url.indexOf('?')
	      ? '&' + query
	      : '?' + query;
	  }

	  // initiate request
	  xhr.open(this.method, this.url, true);

	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;

	  // body
	  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
	    // serialize stuff
	    var serialize = request.serialize[this.getHeader('Content-Type')];
	    if (serialize) data = serialize(data);
	  }

	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }

	  // send stuff
	  this.emit('request', this);
	  xhr.send(data);
	  return this;
	};

	/**
	 * Expose `Request`.
	 */

	request.Request = Request;

	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */

	function request(method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new Request('GET', method).end(url);
	  }

	  // url first
	  if (1 == arguments.length) {
	    return new Request('GET', method);
	  }

	  return new Request(method, url);
	}

	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.get = function(url, data, fn){
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.head = function(url, data, fn){
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.del = function(url, fn){
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.patch = function(url, data, fn){
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.post = function(url, data, fn){
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.put = function(url, data, fn){
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * Expose `request`.
	 */

	module.exports = request;


/***/ },
/* 122 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 123 */
/***/ function(module, exports) {

	
	/**
	 * Reduce `arr` with `fn`.
	 *
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Mixed} initial
	 *
	 * TODO: combatible error handling?
	 */

	module.exports = function(arr, fn, initial){  
	  var idx = 0;
	  var len = arr.length;
	  var curr = arguments.length == 3
	    ? initial
	    : arr[idx++];

	  while (idx < len) {
	    curr = fn.call(null, curr, arr[idx], ++idx, arr);
	  }
	  
	  return curr;
	};

/***/ },
/* 124 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\r\nattribute vec3 position;\r\nattribute vec2 uv;\r\n\r\nvarying vec2 v_uv;\r\n\r\nvoid main(void){\r\ngl_Position =vec4(position,1.0);\r\nv_uv=uv;\r\n}\r\n"

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var RenderStageBase = __webpack_require__(108);
	var JThreeContextProxy = __webpack_require__(67);
	var ClearTargetType = __webpack_require__(88);
	var FowardShadingStage = (function (_super) {
	    __extends(FowardShadingStage, _super);
	    function FowardShadingStage(renderer) {
	        _super.call(this, renderer);
	        JThreeContextProxy.getJThreeContext().ResourceManager.createRBO("pmxtestrbo", 512, 512);
	    }
	    FowardShadingStage.prototype.preBeginStage = function (scene, passCount, texs) {
	        var _this = this;
	        this.bindAsOutBuffer(this.DefaultFBO, [{
	                texture: null,
	                target: "depth",
	                type: "rbo"
	            }, {
	                texture: texs["OUT"],
	                target: 0,
	                isOptional: false
	            },], function () {
	            _this.Renderer.GLContext.Clear(ClearTargetType.ColorBits | ClearTargetType.DepthBits);
	        }, function () {
	            _this.Renderer.ContextManager.applyClearColor();
	            _this.Renderer.GLContext.Clear(ClearTargetType.DepthBits);
	        });
	    };
	    FowardShadingStage.prototype.render = function (scene, object, passCount, texs) {
	        var geometry = object.Geometry;
	        if (!geometry)
	            return;
	        var materials = object.getMaterials("jthree.materials.forematerial");
	        for (var i = 0; i < materials.length; i++) {
	            var material = materials[i];
	            if (!material || !material.Loaded)
	                return;
	            for (var pass = 0; pass < material.PassCount; pass++) {
	                material.configureMaterial(scene, this.Renderer, object, texs, pass);
	                geometry.drawElements(this.Renderer.ContextManager, material);
	            }
	        }
	    };
	    FowardShadingStage.prototype.needRender = function (scene, object, passCount) {
	        return typeof object.Geometry != "undefined" && object.Geometry != null;
	    };
	    return FowardShadingStage;
	})(RenderStageBase);
	module.exports = FowardShadingStage;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GomlTreeNodeBase = __webpack_require__(60);
	var Scene = __webpack_require__(127);
	var JThreeContextProxy = __webpack_require__(67);
	var SceneNode = (function (_super) {
	    __extends(SceneNode, _super);
	    function SceneNode(elem, loader, parent) {
	        _super.call(this, elem, loader, parent);
	    }
	    SceneNode.prototype.beforeLoad = function () {
	        this.targetScene = new Scene();
	        var context = JThreeContextProxy.getJThreeContext();
	        context.SceneManager.addScene(this.targetScene);
	    };
	    return SceneNode;
	})(GomlTreeNodeBase);
	module.exports = SceneNode;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var jThreeObjectWithID = __webpack_require__(31);
	var JThreeEvent = __webpack_require__(12);
	var AssociativeArray = __webpack_require__(8);
	var MaterialObjectPair = (function () {
	    function MaterialObjectPair(material, targetObject) {
	        this.material = material;
	        this.targetObject = targetObject;
	    }
	    Object.defineProperty(MaterialObjectPair.prototype, "Material", {
	        get: function () {
	            return this.material;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MaterialObjectPair.prototype, "TargetObject", {
	        get: function () {
	            return this.targetObject;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MaterialObjectPair.prototype, "ID", {
	        get: function () {
	            return this.material.ID + "-" + this.targetObject.ID;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return MaterialObjectPair;
	})();
	var Scene = (function (_super) {
	    __extends(Scene, _super);
	    function Scene() {
	        _super.call(this);
	        this.rendererChanged = new JThreeEvent();
	        this.renderers = [];
	        this.renderPairs = [];
	        this.sceneObjects = [];
	        this.lights = new AssociativeArray();
	        this.lightCount = 0;
	        this.cameras = new AssociativeArray();
	        this.enabled = true;
	    }
	    Scene.prototype.update = function () {
	        if (!this.enabled)
	            return;
	        this.sceneObjects.forEach(function (v) { return v.update(); });
	    };
	    Scene.prototype.render = function () {
	        var _this = this;
	        this.renderers.forEach(function (r) {
	            r.beforeRender();
	            r.RenderStageManager.processRender(_this, _this.sceneObjects);
	            r.afterRender();
	        });
	    };
	    Scene.prototype.addRenderer = function (renderer) {
	        this.renderers.push(renderer);
	        this.rendererChanged.fire(this, renderer);
	    };
	    Scene.prototype.rendererAdded = function (act) {
	        this.rendererChanged.addListerner(act);
	    };
	    Object.defineProperty(Scene.prototype, "Renderers", {
	        get: function () {
	            return this.renderers;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Scene.prototype.getLights = function (alias) {
	        var lights = this.lights.get(alias);
	        if (!lights)
	            return [];
	        return lights;
	    };
	    Scene.prototype.getLightByIndex = function (index) {
	        var i = 0;
	        var target;
	        this.lights.forEach(function (v) {
	            v.forEach(function (e) {
	                if (i == index) {
	                    target = e;
	                }
	                i++;
	            });
	        });
	        return target;
	    };
	    Object.defineProperty(Scene.prototype, "LightCount", {
	        get: function () {
	            return this.lightCount;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Scene.prototype.addLight = function (light) {
	        this.lightCount++;
	        if (!this.lights.has(light.AliasName)) {
	            this.lights.set(light.AliasName, [light]);
	            return;
	        }
	        this.lights.get(light.AliasName).push(light);
	    };
	    Scene.prototype.addObject = function (targetObject) {
	        var _this = this;
	        this.sceneObjects.push(targetObject);
	        targetObject.eachMaterial(function (m) { _this.renderPairs.push(new MaterialObjectPair(m, targetObject)); });
	        this.sortObjects();
	    };
	    Scene.prototype.addRenderQueue = function (targetObject) {
	        var _this = this;
	        targetObject.eachMaterial(function (m) { _this.renderPairs.push(new MaterialObjectPair(m, targetObject)); });
	        this.sortObjects();
	    };
	    Scene.prototype.sortObjects = function () {
	        this.renderPairs.sort(function (v1, v2) { return v1.Material.Priorty - v2.Material.Priorty; });
	    };
	    Scene.prototype.addCamera = function (camera) {
	        this.cameras.set(camera.ID, camera);
	    };
	    Scene.prototype.getCamera = function (id) {
	        return this.cameras.get(id);
	    };
	    Scene.prototype.toString = function () {
	        console.log(this);
	        return "Scene\nRenderers:\nRendererCount:" + this.renderers.length + "\nCamera Count:" + this.cameras.size + "\nSceneObjects:\nSceneObjectCount:" + this.sceneObjects.length + "\nSceneObjectCount by Material:" + this.renderPairs.length + "\n";
	    };
	    return Scene;
	})(jThreeObjectWithID);
	module.exports = Scene;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var SolidColor = __webpack_require__(129);
	var MaterialNodeBase = __webpack_require__(132);
	var SolidColorNode = (function (_super) {
	    __extends(SolidColorNode, _super);
	    function SolidColorNode(elem, loader, parent) {
	        var _this = this;
	        _super.call(this, elem, loader, parent);
	        this.attributes.defineAttribute({
	            "color": {
	                value: "#0FC", converter: "color4", handler: function (v) { _this.material.Color = v.Value; }
	            }
	        });
	    }
	    SolidColorNode.prototype.ConstructMaterial = function () {
	        this.material = new SolidColor();
	        return this.material;
	    };
	    SolidColorNode.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	    };
	    return SolidColorNode;
	})(MaterialNodeBase);
	module.exports = SolidColorNode;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Material = __webpack_require__(130);
	var JThreeContextProxy = __webpack_require__(67);
	var Matrix = __webpack_require__(56);
	var Color4 = __webpack_require__(38);
	var SolidColorMaterial = (function (_super) {
	    __extends(SolidColorMaterial, _super);
	    function SolidColorMaterial() {
	        _super.call(this);
	        this.color = Color4.parseColor('#F0F');
	        var jThreeContext = JThreeContextProxy.getJThreeContext();
	        var vs = __webpack_require__(115);
	        var fs = __webpack_require__(131);
	        this.program = this.loadProgram("jthree.shaders.vertex.basic", "jthree.shaders.fragment.solidcolor", "jthree.programs.solidcolor", vs, fs);
	        this.setLoaded();
	    }
	    Object.defineProperty(SolidColorMaterial.prototype, "Color", {
	        get: function () {
	            return this.color;
	        },
	        set: function (col) {
	            this.color = col;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SolidColorMaterial.prototype.configureMaterial = function (scene, renderer, object, texs) {
	        _super.prototype.configureMaterial.call(this, scene, renderer, object, texs);
	        var geometry = object.Geometry;
	        var programWrapper = this.program.getForContext(renderer.ContextManager);
	        programWrapper.useProgram();
	        var v = object.Transformer.calculateMVPMatrix(renderer);
	        programWrapper.setAttributeVerticies("position", geometry.PositionBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setAttributeVerticies("normal", geometry.NormalBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setUniformMatrix("matMVP", v);
	        programWrapper.setUniformMatrix("matMV", Matrix.multiply(renderer.Camera.ViewMatrix, object.Transformer.LocalToGlobal));
	        programWrapper.setUniformVector("u_color", this.Color.toVector());
	        geometry.IndexBuffer.getForRenderer(renderer.ContextManager).bindBuffer();
	    };
	    return SolidColorMaterial;
	})(Material);
	module.exports = SolidColorMaterial;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObjectWithID = __webpack_require__(31);
	var GLCullMode = __webpack_require__(109);
	var GLFeatureType = __webpack_require__(112);
	var JThreeContextProxy = __webpack_require__(67);
	var ShaderType = __webpack_require__(110);
	var Material = (function (_super) {
	    __extends(Material, _super);
	    function Material() {
	        _super.call(this);
	        this.loaded = false;
	        this.cullMode = GLCullMode.Back;
	        this.cullEnabled = true;
	        var jThreeContext = JThreeContextProxy.getJThreeContext();
	        var vs = __webpack_require__(115);
	        var fs = __webpack_require__(116);
	        this.defferedRb1Program = this.loadProgram("jthree.shaders.vertex.basic", "jthree.shaders.fragment.deffered.rb1", "jthree.programs.rb1", vs, fs);
	        this.defferedRb2Program = this.loadProgram("jthree.shaders.vertex.basic", "jthree.shaders.fragment.deffered.rb2", "jthree.program.rb2", vs, __webpack_require__(118));
	    }
	    Material.prototype.setLoaded = function (flag) {
	        flag = typeof flag === 'undefined' ? true : flag;
	        this.loaded = flag;
	    };
	    Object.defineProperty(Material.prototype, "Loaded", {
	        get: function () {
	            return this.loaded;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Material.prototype, "Priorty", {
	        get: function () {
	            return this.priorty;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Material.prototype, "CullMode", {
	        get: function () {
	            return this.cullMode;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Material.prototype, "CullEnabled", {
	        get: function () {
	            return this.cullEnabled;
	        },
	        set: function (val) {
	            this.cullEnabled = val;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Material.prototype, "MaterialAlias", {
	        get: function () {
	            return "jthree.materials.forematerial";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Material.prototype, "PassCount", {
	        get: function () {
	            return 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Material.prototype.loadProgram = function (vsid, fsid, pid, vscode, fscode) {
	        var jThreeContext = JThreeContextProxy.getJThreeContext();
	        var rm = jThreeContext.ResourceManager;
	        var vShader = rm.createShader(vsid, vscode, ShaderType.VertexShader);
	        var fShader = rm.createShader(fsid, fscode, ShaderType.FragmentShader);
	        vShader.loadAll();
	        fShader.loadAll();
	        return rm.createProgram(pid, [vShader, fShader]);
	    };
	    Material.prototype.configureMaterial = function (scene, renderer, object, texs, passCount) {
	        this.applyCullConfigure(renderer);
	        return;
	    };
	    Material.prototype.applyCullConfigure = function (renderer) {
	        if (this.CullEnabled) {
	            renderer.GLContext.Enable(GLFeatureType.CullFace);
	            renderer.GLContext.CullFace(this.cullMode);
	        }
	        else {
	            renderer.GLContext.Disable(GLFeatureType.CullFace);
	        }
	    };
	    Object.defineProperty(Material.prototype, "NeedFoward", {
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Material;
	})(JThreeObjectWithID);
	module.exports = Material;


/***/ },
/* 131 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\r\nvarying vec3 v_normal;\r\nvarying  vec2 v_uv;\r\n\r\nuniform vec4 u_color;\r\nuniform mat4 matMVP;\r\nuniform mat4 matMV;\r\nvoid main(void){\r\n  gl_FragColor = u_color;\r\n}\r\n"

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GomlTreeNodeBase = __webpack_require__(60);
	var JThreeID = __webpack_require__(32);
	var MaterialNodeBase = (function (_super) {
	    __extends(MaterialNodeBase, _super);
	    function MaterialNodeBase(elem, loader, parent) {
	        var _this = this;
	        _super.call(this, elem, loader, parent);
	        this.attributes.defineAttribute({
	            "cull": {
	                value: true,
	                converter: "boolean",
	                handler: function (v) { _this.targetMaterial.CullEnabled = v.Value; }
	            }
	        });
	    }
	    MaterialNodeBase.prototype.ConstructMaterial = function () {
	        return null;
	    };
	    MaterialNodeBase.prototype.beforeLoad = function () {
	        this.targetMaterial = this.ConstructMaterial();
	        this.loader.nodeRegister.addObject("jthree.materials", this.Name, this);
	        this.targetMaterial.CullEnabled = this.attributes.getValue("cull");
	    };
	    Object.defineProperty(MaterialNodeBase.prototype, "Name", {
	        get: function () {
	            this.name = this.name || this.element.getAttribute('name') || JThreeID.getUniqueRandom(10);
	            return this.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return MaterialNodeBase;
	})(GomlTreeNodeBase);
	module.exports = MaterialNodeBase;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Lambert = __webpack_require__(134);
	var MaterialNodeBase = __webpack_require__(132);
	var LambertNode = (function (_super) {
	    __extends(LambertNode, _super);
	    function LambertNode(elem, loader, parent) {
	        var _this = this;
	        _super.call(this, elem, loader, parent);
	        this.attributes.defineAttribute({
	            "color": {
	                value: "#f0C", converter: "color4", handler: function (v) { _this.material.Color = v.Value; }
	            }
	        });
	    }
	    LambertNode.prototype.ConstructMaterial = function () {
	        this.material = new Lambert();
	        this.material.Color = this.attributes.getValue("color");
	        return this.material;
	    };
	    LambertNode.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	    };
	    return LambertNode;
	})(MaterialNodeBase);
	module.exports = LambertNode;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Material = __webpack_require__(130);
	var Vector3 = __webpack_require__(24);
	var Matrix = __webpack_require__(56);
	var Color4 = __webpack_require__(38);
	var LambertMaterial = (function (_super) {
	    __extends(LambertMaterial, _super);
	    function LambertMaterial() {
	        _super.call(this);
	        this.color = Color4.parseColor('#F0F');
	        var vs = __webpack_require__(115);
	        var fs = __webpack_require__(135);
	        this.program = this.loadProgram("jthree.shaders.vertex.basic", "jthree.shaders.fragment.lambert", "jthree.programs.lambert", vs, fs);
	        this.setLoaded();
	    }
	    Object.defineProperty(LambertMaterial.prototype, "Color", {
	        get: function () {
	            return this.color;
	        },
	        set: function (col) {
	            this.color = col;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    LambertMaterial.prototype.configureMaterial = function (scene, renderer, object, texs) {
	        _super.prototype.configureMaterial.call(this, scene, renderer, object, texs);
	        var geometry = object.Geometry;
	        var programWrapper = this.program.getForContext(renderer.ContextManager);
	        programWrapper.useProgram();
	        var v = object.Transformer.calculateMVPMatrix(renderer);
	        programWrapper.setAttributeVerticies("position", geometry.PositionBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setAttributeVerticies("normal", geometry.NormalBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setAttributeVerticies("uv", geometry.UVBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setUniformMatrix("matMVP", v);
	        programWrapper.setUniformMatrix("matV", renderer.Camera.ViewMatrix);
	        programWrapper.setUniformMatrix("matMV", Matrix.multiply(renderer.Camera.ViewMatrix, object.Transformer.LocalToGlobal));
	        programWrapper.setUniformVector("u_color", this.Color.toVector());
	        programWrapper.setUniformVector("u_DirectionalLight", new Vector3(0, 0, -1));
	        geometry.IndexBuffer.getForRenderer(renderer.ContextManager).bindBuffer();
	    };
	    return LambertMaterial;
	})(Material);
	module.exports = LambertMaterial;


/***/ },
/* 135 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\r\nvarying vec3 v_normal;\r\nvarying  vec2 v_uv;\r\nuniform vec4 u_color;\r\nuniform vec3 u_DirectionalLight;\r\nuniform mat4 matMVP;\r\nuniform mat4 matMV;\r\nuniform mat4 matV;\r\n\r\nvoid main(void){\r\n  vec3 dlDir=-normalize((matV*vec4(u_DirectionalLight,0)).xyz);\r\n  float brightness=min(1.0,max(0.0,dot(dlDir,v_normal)));\r\n  gl_FragColor = u_color;\r\n  gl_FragColor.rgb*=brightness;\r\n}\r\n"

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Phong = __webpack_require__(137);
	var MaterialNodeBase = __webpack_require__(132);
	var JThreeContextProxy = __webpack_require__(67);
	var PhongNode = (function (_super) {
	    __extends(PhongNode, _super);
	    function PhongNode(elem, loader, parent) {
	        var _this = this;
	        _super.call(this, elem, loader, parent);
	        this.attributes.defineAttribute({
	            "diffuse": {
	                value: "#f0C", converter: "color4", handler: function (v) { _this.material.Diffuse = v.Value; }
	            },
	            "ambient": {
	                value: "#222", converter: "color4", handler: function (v) { _this.material.Ambient = v.Value; }
	            },
	            "specular": {
	                value: "#CCC", converter: "color3", handler: function (v) { _this.material.Specular = v.Value; }
	            },
	            "specularpower": {
	                value: 10, converter: "number", handler: function (v) { _this.material.SpecularCoefficient = v.Value; }
	            },
	            "texture": {
	                value: "tex", converter: "string", handler: function (v) {
	                    var context = JThreeContextProxy.getJThreeContext();
	                    context.ResourceManager.getTextureHandler(v.Value, function (v) {
	                        _this.material.Texture = v;
	                    });
	                }
	            }
	        });
	    }
	    PhongNode.prototype.ConstructMaterial = function () {
	        this.material = new Phong();
	        return this.material;
	    };
	    PhongNode.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	    };
	    return PhongNode;
	})(MaterialNodeBase);
	module.exports = PhongNode;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Material = __webpack_require__(130);
	var JThreeContextProxy = __webpack_require__(67);
	var Vector3 = __webpack_require__(24);
	var Matrix = __webpack_require__(56);
	var Color4 = __webpack_require__(38);
	var Color3 = __webpack_require__(43);
	var agent = __webpack_require__(121);
	var PhongMaterial = (function (_super) {
	    __extends(PhongMaterial, _super);
	    function PhongMaterial() {
	        var _this = this;
	        _super.call(this);
	        this.diffuse = Color4.parseColor('#F0F');
	        this.ambient = Color4.parseColor('#F0F');
	        this.specular = Color3.parseColor('#F0F');
	        this.specularCoefficient = 10;
	        var jThreeContext = JThreeContextProxy.getJThreeContext();
	        var vs = __webpack_require__(115);
	        var fs = __webpack_require__(138);
	        agent.get("http://localhost:8080/Phong.glsl").end(function (err, res) {
	            _this.program = _this.loadProgram("jthree.shaders.vertex.basic", "jthree.shaders.fragment.phong", "jthree.programs.phong", vs, res.text);
	            _this.setLoaded();
	        });
	    }
	    Object.defineProperty(PhongMaterial.prototype, "Diffuse", {
	        get: function () {
	            return this.diffuse;
	        },
	        set: function (col) {
	            this.diffuse = col;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PhongMaterial.prototype, "Ambient", {
	        get: function () {
	            return this.ambient;
	        },
	        set: function (col) {
	            this.ambient = col;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PhongMaterial.prototype, "Specular", {
	        get: function () {
	            return this.specular;
	        },
	        set: function (col) {
	            this.specular = col;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PhongMaterial.prototype, "SpecularCoefficient", {
	        get: function () {
	            return this.specularCoefficient;
	        },
	        set: function (val) {
	            this.specularCoefficient = val;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PhongMaterial.prototype, "Texture", {
	        get: function () {
	            return this.texture;
	        },
	        set: function (tex) {
	            this.texture = tex;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PhongMaterial.prototype.configureMaterial = function (scene, renderer, object, texs) {
	        if (!this.program)
	            return;
	        _super.prototype.configureMaterial.call(this, scene, renderer, object, texs);
	        var geometry = object.Geometry;
	        var programWrapper = this.program.getForContext(renderer.ContextManager);
	        programWrapper.useProgram();
	        var v = object.Transformer.calculateMVPMatrix(renderer);
	        programWrapper.registerTexture(renderer, this.Texture, 0, "u_texture");
	        programWrapper.registerTexture(renderer, texs["LIGHT"], 1, "u_sampler");
	        programWrapper.setAttributeVerticies("position", geometry.PositionBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setAttributeVerticies("normal", geometry.NormalBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setAttributeVerticies("uv", geometry.UVBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setUniformMatrix("matMVP", v);
	        programWrapper.setUniformMatrix("matV", renderer.Camera.ViewMatrix);
	        programWrapper.setUniformMatrix("matMV", Matrix.multiply(renderer.Camera.ViewMatrix, object.Transformer.LocalToGlobal));
	        programWrapper.setUniformVector("u_ambient", this.Ambient.toVector());
	        programWrapper.setUniformVector("u_diffuse", this.Diffuse.toVector());
	        programWrapper.setUniformVector("u_specular", this.Specular.toVector4(this.specularCoefficient));
	        programWrapper.setUniformVector("u_DirectionalLight", new Vector3(0, 0, -1));
	        geometry.IndexBuffer.getForRenderer(renderer.ContextManager).bindBuffer();
	    };
	    return PhongMaterial;
	})(Material);
	module.exports = PhongMaterial;


/***/ },
/* 138 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\r\nvarying vec3 v_normal;\r\nvarying  vec2 v_uv;\r\nvarying vec4 v_pos;\r\n\r\nuniform vec4 u_diffuse;\r\nuniform vec4 u_specular;\r\nuniform vec4 u_ambient;\r\nuniform vec3 u_DirectionalLight;\r\nuniform mat4 matMVP;\r\nuniform mat4 matMV;\r\nuniform mat4 matV;\r\nuniform sampler2D u_sampler;\r\nuniform sampler2D u_light;\r\n\r\nvec2 calcLightUV(vec4 projectionSpacePos)\n{\n   return (projectionSpacePos.xy/projectionSpacePos.w+vec2(1,1))/2.;\n}\n\r\n\r\nvoid main(void){\r\n  vec2 adjuv=v_uv;\r\n  //calculate light vector in view space\r\n  vec3 dlDir=-normalize((matV*vec4(u_DirectionalLight,0)).xyz);\r\n  float brightness=min(1.0,max(0.0,dot(dlDir,v_normal)));\r\n  gl_FragColor = texture2D(u_sampler,adjuv);\r\n  gl_FragColor.rgb*=brightness;\r\n  //half vector in view space\r\n  vec3 hv=normalize(dlDir+vec3(0,0,1));\r\n  float spBrightness=pow(dot(hv,v_normal),u_specular.a);\r\n  gl_FragColor.rgb+=u_ambient.rgb;\r\n  gl_FragColor.rgb+=u_specular.rgb*spBrightness;\r\n  //calculate light uv\r\n  vec2 lightUV=calcLightUV(v_pos);\r\n  gl_FragColor.rgb=texture2D(u_light,lightUV).xyz;\r\n}\r\n"

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Sprite = __webpack_require__(140);
	var MaterialNodeBase = __webpack_require__(132);
	var JThreeContextProxy = __webpack_require__(67);
	var SpriteNode = (function (_super) {
	    __extends(SpriteNode, _super);
	    function SpriteNode(elem, loader, parent) {
	        var _this = this;
	        _super.call(this, elem, loader, parent);
	        this.attributes.defineAttribute({
	            "texture": {
	                value: "tex", converter: "string", handler: function (v) {
	                    var context = JThreeContextProxy.getJThreeContext();
	                    context.ResourceManager.getTextureHandler(v.Value, function (v) {
	                        debugger;
	                        _this.material.Texture = v;
	                    });
	                }
	            }
	        });
	    }
	    SpriteNode.prototype.ConstructMaterial = function () {
	        this.material = new Sprite();
	        return this.material;
	    };
	    SpriteNode.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	    };
	    return SpriteNode;
	})(MaterialNodeBase);
	module.exports = SpriteNode;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Material = __webpack_require__(130);
	var Matrix = __webpack_require__(56);
	var SpriteMaterial = (function (_super) {
	    __extends(SpriteMaterial, _super);
	    function SpriteMaterial() {
	        _super.call(this);
	        this.ctR = 0;
	        this.ctG = 1;
	        this.ctB = 2;
	        this.ctA = 3;
	        var vs = __webpack_require__(115);
	        var fs = __webpack_require__(141);
	        this.program = this.loadProgram("jthree.shaders.vertex.basic", "jthree.shaders.fragment.sprite", "jthree.programs.sprite", vs, fs);
	        this.setLoaded();
	    }
	    Object.defineProperty(SpriteMaterial.prototype, "Texture", {
	        get: function () {
	            return this.texture;
	        },
	        set: function (tex) {
	            this.texture = tex;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SpriteMaterial.prototype, "CTR", {
	        get: function () {
	            return this.ctR;
	        },
	        set: function (ctr) {
	            this.ctR = ctr;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SpriteMaterial.prototype, "CTG", {
	        get: function () {
	            return this.ctG;
	        },
	        set: function (ctg) {
	            this.ctG = ctg;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SpriteMaterial.prototype, "CTB", {
	        get: function () {
	            return this.ctB;
	        },
	        set: function (ctb) {
	            this.ctB = ctb;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SpriteMaterial.prototype, "CTA", {
	        get: function () {
	            return this.ctA;
	        },
	        set: function (cta) {
	            this.ctA = cta;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SpriteMaterial.prototype.configureMaterial = function (scene, renderer, object, texs) {
	        _super.prototype.configureMaterial.call(this, scene, renderer, object, texs);
	        var geometry = object.Geometry;
	        var programWrapper = this.program.getForContext(renderer.ContextManager);
	        programWrapper.useProgram();
	        var v = object.Transformer.calculateMVPMatrix(renderer);
	        programWrapper.registerTexture(renderer, this.Texture, 0, "u_sampler");
	        programWrapper.setAttributeVerticies("position", geometry.PositionBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setAttributeVerticies("normal", geometry.NormalBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setAttributeVerticies("uv", geometry.UVBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setUniformMatrix("matMVP", v);
	        programWrapper.setUniformMatrix("matV", renderer.Camera.ViewMatrix);
	        programWrapper.setUniformMatrix("matMV", Matrix.multiply(renderer.Camera.ViewMatrix, object.Transformer.LocalToGlobal));
	        geometry.IndexBuffer.getForRenderer(renderer.ContextManager).bindBuffer();
	        var ctM = Matrix.zero();
	        if (this.CTR < 4)
	            ctM.setAt(this.CTR, 0, 1);
	        if (this.CTG < 4)
	            ctM.setAt(this.CTG, 1, 1);
	        if (this.CTB < 4)
	            ctM.setAt(this.CTB, 2, 1);
	        if (this.CTA < 4)
	            ctM.setAt(this.CTA, 3, 1);
	        if (this.CTA < 4) {
	            programWrapper.setUniform1i("additionA", 0);
	        }
	        else {
	            programWrapper.setUniform1i("additionA", 1);
	        }
	        programWrapper.setUniformMatrix("ctM", ctM);
	    };
	    return SpriteMaterial;
	})(Material);
	module.exports = SpriteMaterial;


/***/ },
/* 141 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\r\nvarying vec3 v_normal;\r\nvarying  vec2 v_uv;\r\n\r\nuniform mat4 matMVP;\r\nuniform mat4 matMV;\r\nuniform mat4 matV;\r\nuniform mat4 ctM;\r\nuniform float additonA;\r\nuniform sampler2D u_sampler;\r\n\r\nvoid main(void){\r\n  gl_FragColor = ctM*texture2D(u_sampler,v_uv);\r\n  gl_FragColor.a += additonA;\r\n  //if(gl_FragColor.a==0.0)discard;\r\n}\r\n"

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var DebugSprite = __webpack_require__(143);
	var MaterialNodeBase = __webpack_require__(132);
	var JThreeContextProxy = __webpack_require__(67);
	var DefferedDebugNode = (function (_super) {
	    __extends(DefferedDebugNode, _super);
	    function DefferedDebugNode(elem, loader, parent) {
	        var _this = this;
	        _super.call(this, elem, loader, parent);
	        this.attributes.defineAttribute({
	            "target": {
	                value: "rb1", converter: "string"
	            },
	            "viewport": {
	                value: "viewport", converter: "string", handler: function (v) {
	                    var context = JThreeContextProxy.getJThreeContext();
	                    var viewportTargets = loader.getNodeByQuery(v.Value);
	                    if (viewportTargets.length > 0) {
	                        var viewport = viewportTargets[0];
	                        context.ResourceManager.getTextureHandler(viewport.TargetViewport.ID + "." + _this.attributes.getValue("target"), function (v) {
	                            _this.material.Texture = v;
	                        });
	                    }
	                }
	            },
	            "R": {
	                value: "0", converter: "number", handler: function (v) { _this.material.CTR = v.Value; }
	            },
	            "G": {
	                value: "1", converter: "number", handler: function (v) { _this.material.CTG = v.Value; }
	            },
	            "B": {
	                value: "2", converter: "number", handler: function (v) { _this.material.CTB = v.Value; }
	            },
	            "A": {
	                value: "3", converter: "number", handler: function (v) { _this.material.CTA = v.Value; }
	            }
	        });
	    }
	    DefferedDebugNode.prototype.ConstructMaterial = function () {
	        this.material = new DebugSprite();
	        return this.material;
	    };
	    DefferedDebugNode.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	    };
	    return DefferedDebugNode;
	})(MaterialNodeBase);
	module.exports = DefferedDebugNode;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var SpriteMaterial = __webpack_require__(140);
	var DebugSpriteMaterial = (function (_super) {
	    __extends(DebugSpriteMaterial, _super);
	    function DebugSpriteMaterial() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(DebugSpriteMaterial.prototype, "NeedFoward", {
	        get: function () {
	            return true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return DebugSpriteMaterial;
	})(SpriteMaterial);
	module.exports = DebugSpriteMaterial;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var DebugSprite = __webpack_require__(143);
	var MaterialNodeBase = __webpack_require__(132);
	var JThreeContextProxy = __webpack_require__(67);
	var TextureDebugNode = (function (_super) {
	    __extends(TextureDebugNode, _super);
	    function TextureDebugNode(elem, loader, parent) {
	        var _this = this;
	        _super.call(this, elem, loader, parent);
	        this.attributes.defineAttribute({
	            "target": {
	                value: "rb1", converter: "string",
	                handler: function (v) {
	                    var context = JThreeContextProxy.getJThreeContext();
	                    context.ResourceManager.getTextureHandler(_this.attributes.getValue("target"), function (v) {
	                        _this.material.Texture = v;
	                    });
	                }
	            },
	            "R": {
	                value: "0", converter: "number", handler: function (v) { _this.material.CTR = v.Value; }
	            },
	            "G": {
	                value: "1", converter: "number", handler: function (v) { _this.material.CTG = v.Value; }
	            },
	            "B": {
	                value: "2", converter: "number", handler: function (v) { _this.material.CTB = v.Value; }
	            },
	            "A": {
	                value: "3", converter: "number", handler: function (v) { _this.material.CTA = v.Value; }
	            },
	        });
	    }
	    TextureDebugNode.prototype.ConstructMaterial = function () {
	        this.material = new DebugSprite();
	        return this.material;
	    };
	    TextureDebugNode.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	    };
	    return TextureDebugNode;
	})(MaterialNodeBase);
	module.exports = TextureDebugNode;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var TagFactory = __webpack_require__(66);
	var SceneObjectTagFactory = (function (_super) {
	    __extends(SceneObjectTagFactory, _super);
	    function SceneObjectTagFactory() {
	        _super.apply(this, arguments);
	    }
	    SceneObjectTagFactory.prototype.CreateNodeForThis = function (elem, loader, parent) {
	        var sceneNode = null;
	        var sceneObjectNode = null;
	        if (parent.getTypeName() == "SceneNode") {
	            sceneNode = parent;
	            sceneObjectNode = null;
	        }
	        else {
	            if (typeof parent["ContainedSceneNode"] === "undefined") {
	                console.error(parent.toString() + " is not extends SceneObjectNodeBase. Is this really ok to be contained in Scene tag?");
	                return null;
	            }
	            else {
	                sceneObjectNode = parent;
	                sceneNode = sceneObjectNode.ContainedSceneNode;
	            }
	        }
	        return this.CreateSceneObjectNodeForThis(elem, loader, parent, sceneNode, sceneObjectNode);
	    };
	    SceneObjectTagFactory.prototype.CreateSceneObjectNodeForThis = function (elem, loader, parent, containedSceneNode, parentSceneObjectNode) {
	        return new this.nodeType(elem, loader, parent, containedSceneNode, parentSceneObjectNode);
	    };
	    return SceneObjectTagFactory;
	})(TagFactory);
	module.exports = SceneObjectTagFactory;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var OrthoCamera = __webpack_require__(147);
	var GomlTreeCameraNodeBase = __webpack_require__(58);
	var OrthoCameraNode = (function (_super) {
	    __extends(OrthoCameraNode, _super);
	    function OrthoCameraNode(elem, loader, parent, parentSceneNode, parentObject) {
	        var _this = this;
	        _super.call(this, elem, loader, parent, parentSceneNode, parentObject);
	        this.attributes.defineAttribute({
	            "left": {
	                value: -100,
	                converter: "number",
	                handler: function (v) {
	                    _this.targetOrtho.Left = v.Value;
	                }
	            },
	            "right": {
	                value: 100,
	                converter: "number",
	                handler: function (v) {
	                    _this.targetOrtho.Right = v.Value;
	                }
	            },
	            "bottom": {
	                value: -100,
	                converter: "number",
	                handler: function (v) {
	                    _this.targetOrtho.Bottom = v.Value;
	                }
	            },
	            "top": {
	                value: 100,
	                converter: "number",
	                handler: function (v) {
	                    _this.targetOrtho.Top = v.Value;
	                }
	            },
	            "near": {
	                value: -100,
	                converter: "number",
	                handler: function (v) {
	                    _this.targetOrtho.Near = v.Value;
	                }
	            },
	            "far": {
	                value: -100,
	                converter: "number",
	                handler: function (v) {
	                    _this.targetOrtho.Far = v.Value;
	                }
	            }
	        });
	    }
	    OrthoCameraNode.prototype.ConstructCamera = function () {
	        var camera = new OrthoCamera();
	        this.targetOrtho = camera;
	        camera.Left = this.attributes.getValue("left");
	        camera.Bottom = this.attributes.getValue("right");
	        camera.Top = this.attributes.getValue("top");
	        camera.Right = this.attributes.getValue("right");
	        camera.Far = this.attributes.getValue('far');
	        camera.Near = this.attributes.getValue('near');
	        return camera;
	    };
	    return OrthoCameraNode;
	})(GomlTreeCameraNodeBase);
	module.exports = OrthoCameraNode;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var ViewCamera = __webpack_require__(51);
	var Matrix = __webpack_require__(56);
	var OrthoCamera = (function (_super) {
	    __extends(OrthoCamera, _super);
	    function OrthoCamera() {
	        _super.call(this);
	        this.updateProjection();
	    }
	    OrthoCamera.prototype.updateProjection = function () {
	        this.projection = Matrix.ortho(this.Left, this.Right, this.Bottom, this.Top, this.Near, this.Far);
	    };
	    Object.defineProperty(OrthoCamera.prototype, "Left", {
	        get: function () {
	            return this.left;
	        },
	        set: function (left) {
	            this.left = left;
	            this.updateProjection();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(OrthoCamera.prototype, "Right", {
	        get: function () {
	            return this.right;
	        },
	        set: function (right) {
	            this.right = right;
	            this.updateProjection();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(OrthoCamera.prototype, "Top", {
	        get: function () {
	            return this.top;
	        },
	        set: function (top) {
	            this.top = top;
	            this.updateProjection();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(OrthoCamera.prototype, "Bottom", {
	        get: function () {
	            return this.bottom;
	        },
	        set: function (bottom) {
	            this.bottom = bottom;
	            this.updateProjection();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(OrthoCamera.prototype, "Near", {
	        get: function () {
	            return this.near;
	        },
	        set: function (near) {
	            this.near = near;
	            this.updateProjection();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(OrthoCamera.prototype, "Far", {
	        get: function () {
	            return this.far;
	        },
	        set: function (far) {
	            this.far = far;
	            this.updateProjection();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(OrthoCamera.prototype, "ProjectionMatrix", {
	        get: function () {
	            return this.projection;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return OrthoCamera;
	})(ViewCamera);
	module.exports = OrthoCamera;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var SceneObjectNodeBase = __webpack_require__(59);
	var Mesh = __webpack_require__(101);
	var SolidColor = __webpack_require__(129);
	var GomlTreeMeshNode = (function (_super) {
	    __extends(GomlTreeMeshNode, _super);
	    function GomlTreeMeshNode(elem, loader, parent, parentSceneNode, parentObject) {
	        _super.call(this, elem, loader, parent, parentSceneNode, parentObject);
	    }
	    GomlTreeMeshNode.prototype.ConstructTarget = function () {
	        var geo = this.loader.nodeRegister.getObject("jthree.geometries", this.Geo);
	        var mat = this.loader.nodeRegister.getObject("jthree.materials", this.Mat);
	        this.targetMesh = new Mesh(geo.TargetGeometry, mat ? mat.targetMaterial : new SolidColor());
	        return this.targetMesh;
	    };
	    GomlTreeMeshNode.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	    };
	    GomlTreeMeshNode.prototype.Load = function () {
	        _super.prototype.Load.call(this);
	    };
	    Object.defineProperty(GomlTreeMeshNode.prototype, "Geo", {
	        get: function () {
	            this.geo = this.geo || this.element.getAttribute("geo");
	            return this.geo;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(GomlTreeMeshNode.prototype, "Mat", {
	        get: function () {
	            this.mat = this.mat || this.element.getAttribute("mat");
	            return this.mat;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return GomlTreeMeshNode;
	})(SceneObjectNodeBase);
	module.exports = GomlTreeMeshNode;


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var SceneObjectNodeBase = __webpack_require__(59);
	var Mesh = __webpack_require__(101);
	var ObjectNode = (function (_super) {
	    __extends(ObjectNode, _super);
	    function ObjectNode(elem, loader, parent, parentSceneNode, parentObject) {
	        _super.call(this, elem, loader, parent, parentSceneNode, parentObject);
	        var templateName = elem.getAttribute("template");
	        if (templateName) {
	            this.targetTemplate = this.loader.nodeRegister.getObject("jthree.template", templateName);
	            this.loader.instanciateTemplate(this.targetTemplate.GetGomlToInstanciate(this.element), this);
	        }
	    }
	    ObjectNode.prototype.ConstructTarget = function () {
	        this.targetMesh = new Mesh(null, null);
	        return this.targetMesh;
	    };
	    ObjectNode.prototype.beforeLoad = function () {
	        _super.prototype.beforeLoad.call(this);
	    };
	    ObjectNode.prototype.Load = function () {
	        _super.prototype.Load.call(this);
	    };
	    return ObjectNode;
	})(SceneObjectNodeBase);
	module.exports = ObjectNode;


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var LightNodeBase = __webpack_require__(151);
	var PointLight = __webpack_require__(152);
	var PointLightNode = (function (_super) {
	    __extends(PointLightNode, _super);
	    function PointLightNode(elem, loader, parent, parentSceneNode, parentObject) {
	        var _this = this;
	        _super.call(this, elem, loader, parent, parentSceneNode, parentObject);
	        this.attributes.defineAttribute({
	            "intensity": {
	                value: 1, converter: "number", handler: function (v) { _this.targetLight.Intensity = v.Value; }
	            },
	            "decay": {
	                value: 1, converter: "number", handler: function (v) { _this.targetLight.Decay = v.Value; }
	            },
	            "distance": {
	                value: 1, converter: "number", handler: function (v) { _this.targetLight.Distance = v.Value; }
	            }
	        });
	    }
	    PointLightNode.prototype.constructLight = function () {
	        this.targetLight = new PointLight(this.ContainedSceneNode.targetScene);
	        return this.targetLight;
	    };
	    return PointLightNode;
	})(LightNodeBase);
	module.exports = PointLightNode;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var SceneObjectNodeBase = __webpack_require__(59);
	var LightNodeBase = (function (_super) {
	    __extends(LightNodeBase, _super);
	    function LightNodeBase(elem, loader, parent, parentSceneNode, parentObject) {
	        var _this = this;
	        _super.call(this, elem, loader, parent, parentSceneNode, parentObject);
	        this.attributes.defineAttribute({
	            "color": {
	                value: "white", converter: "color4", handler: function (v) {
	                    _this.targetLightBase.Color = v.Value;
	                }
	            }
	        });
	    }
	    LightNodeBase.prototype.constructLight = function () {
	        return null;
	    };
	    LightNodeBase.prototype.ConstructTarget = function () {
	        this.targetLightBase = this.constructLight();
	        this.ContainedSceneNode.targetScene.addLight(this.targetLightBase);
	        return this.targetLightBase;
	    };
	    return LightNodeBase;
	})(SceneObjectNodeBase);
	module.exports = LightNodeBase;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var LightBase = __webpack_require__(153);
	var PointLight = (function (_super) {
	    __extends(PointLight, _super);
	    function PointLight(scene) {
	        _super.call(this, scene);
	        this.distance = 0.0;
	        this.intensity = 1.0;
	        this.decay = 1;
	    }
	    Object.defineProperty(PointLight.prototype, "Distance", {
	        get: function () {
	            return this.distance;
	        },
	        set: function (num) {
	            this.distance = num;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PointLight.prototype, "Intensity", {
	        get: function () {
	            return this.intensity;
	        },
	        set: function (intensity) {
	            this.intensity = intensity;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PointLight.prototype, "Decay", {
	        get: function () {
	            return this.decay;
	        },
	        set: function (d) {
	            this.decay = d;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PointLight.prototype, "AliasName", {
	        get: function () {
	            return "jthree.lights.pointlight";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return PointLight;
	})(LightBase);
	module.exports = PointLight;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var SceneObject = __webpack_require__(53);
	var LightBase = (function (_super) {
	    __extends(LightBase, _super);
	    function LightBase(scene) {
	        _super.call(this);
	        this.scene = scene;
	    }
	    Object.defineProperty(LightBase.prototype, "Color", {
	        get: function () {
	            return this.color;
	        },
	        set: function (col) {
	            this.color = col;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LightBase.prototype, "Position", {
	        get: function () {
	            return this.Transformer.Position;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(LightBase.prototype, "AliasName", {
	        get: function () {
	            return null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    LightBase.prototype.drawBuffer = function (renderer, scene, object, material, passCount) {
	    };
	    LightBase.prototype.beforeRender = function (target) {
	    };
	    LightBase.prototype.afterRender = function (target) {
	    };
	    return LightBase;
	})(SceneObject);
	module.exports = LightBase;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var LightNodeBase = __webpack_require__(151);
	var DirectionalLight = __webpack_require__(155);
	var DirectionalLightNode = (function (_super) {
	    __extends(DirectionalLightNode, _super);
	    function DirectionalLightNode(elem, loader, parent, parentSceneNode, parentObject) {
	        var _this = this;
	        _super.call(this, elem, loader, parent, parentSceneNode, parentObject);
	        this.attributes.defineAttribute({
	            "intensity": {
	                value: 1, converter: "number", handler: function (v) { _this.targetLight.Intensity = v.Value; }
	            }
	        });
	    }
	    DirectionalLightNode.prototype.constructLight = function () {
	        this.targetLight = new DirectionalLight(this.ContainedSceneNode.targetScene);
	        return this.targetLight;
	    };
	    return DirectionalLightNode;
	})(LightNodeBase);
	module.exports = DirectionalLightNode;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Vector3 = __webpack_require__(24);
	var LightBase = __webpack_require__(153);
	var Matrix = __webpack_require__(56);
	var DepthRenderStage = __webpack_require__(156);
	var DirectionalLight = (function (_super) {
	    __extends(DirectionalLight, _super);
	    function DirectionalLight(scene) {
	        var _this = this;
	        _super.call(this, scene);
	        this.intensity = 1.0;
	        this.targetStages = [];
	        this.vp = Matrix.multiply(Matrix.ortho(-2.828, 2.828, -1, 1, 0, 5.656), Matrix.lookAt(new Vector3(1, 2, -3), new Vector3(0, 1, 0), new Vector3(0, 1, 0)));
	        scene.Renderers.forEach(function (v) {
	            var stage = new DepthRenderStage(v);
	            _this.targetStages.push(stage);
	            v.RenderStageManager.StageChains.unshift({
	                buffers: {
	                    "OUT": "jthree.light.dir1"
	                },
	                stage: stage
	            });
	            ;
	        });
	        scene.rendererAdded(function (o, v) {
	            var stage = new DepthRenderStage(v);
	            _this.targetStages.push(stage);
	            v.RenderStageManager.StageChains.unshift({
	                buffers: {
	                    "OUT": "jthree.light.dir1"
	                },
	                stage: stage
	            });
	            ;
	            stage.VP = _this.vp;
	        });
	        this.targetStages.forEach(function (v) {
	            v.VP = _this.vp;
	        });
	    }
	    Object.defineProperty(DirectionalLight.prototype, "VP", {
	        get: function () {
	            return this.vp;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DirectionalLight.prototype, "Intensity", {
	        get: function () {
	            return this.intensity;
	        },
	        set: function (intensity) {
	            this.intensity = intensity;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DirectionalLight.prototype, "AliasName", {
	        get: function () {
	            return "jthree.lights.directionallight";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return DirectionalLight;
	})(LightBase);
	module.exports = DirectionalLight;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var RenderStageBase = __webpack_require__(108);
	var JThreeContextProxy = __webpack_require__(67);
	var ClearTargetType = __webpack_require__(88);
	var DepthMaterial = __webpack_require__(157);
	var DirectionalLightDepthStage = (function (_super) {
	    __extends(DirectionalLightDepthStage, _super);
	    function DirectionalLightDepthStage(renderer) {
	        _super.call(this, renderer);
	        this.mat = new DepthMaterial();
	        var context = JThreeContextProxy.getJThreeContext();
	        var rm = context.ResourceManager;
	        this.fbo = this.DefaultFBO;
	        var rbo = this.DefaultRBO;
	        this.tex = rm.createTexture("test.direct", 512, 512);
	    }
	    Object.defineProperty(DirectionalLightDepthStage.prototype, "VP", {
	        get: function () {
	            return this.mat.VP;
	        },
	        set: function (mat) {
	            this.mat.VP = mat;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DirectionalLightDepthStage.prototype.preBeginStage = function (scene, passCount, texs) {
	        var _this = this;
	        this.bindAsOutBuffer(this.DefaultFBO, [
	            {
	                texture: texs["OUT"],
	                target: "depth"
	            },
	            {
	                texture: this.tex,
	                target: 0
	            }
	        ], function () {
	            _this.Renderer.GLContext.Clear(ClearTargetType.ColorBits | ClearTargetType.DepthBits);
	        });
	    };
	    DirectionalLightDepthStage.prototype.render = function (scene, object, passCount, texs) {
	        var geometry = object.Geometry;
	        if (!geometry)
	            return;
	        this.mat.configureMaterial(scene, this.Renderer, object, texs);
	        geometry.drawElements(this.Renderer.ContextManager, this.mat);
	    };
	    DirectionalLightDepthStage.prototype.needRender = function (scene, object, passCount) {
	        return typeof object.Geometry != "undefined" && object.Geometry != null;
	    };
	    return DirectionalLightDepthStage;
	})(RenderStageBase);
	module.exports = DirectionalLightDepthStage;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Material = __webpack_require__(130);
	var Matrix = __webpack_require__(56);
	var GLFeatureType = __webpack_require__(112);
	var DepthMaterial = (function (_super) {
	    __extends(DepthMaterial, _super);
	    function DepthMaterial() {
	        _super.call(this);
	        var vs = __webpack_require__(158);
	        var fs = __webpack_require__(159);
	        this.program = this.loadProgram("jthree.shaders.vertex.depth", "jthree.shaders.fragment.depth", "jthree.programs.depth", vs, fs);
	        this.setLoaded();
	    }
	    Object.defineProperty(DepthMaterial.prototype, "VP", {
	        get: function () {
	            return this.matVP;
	        },
	        set: function (mat) {
	            this.matVP = mat;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DepthMaterial.prototype.configureMaterial = function (scene, renderer, object, texs) {
	        renderer.GLContext.Disable(GLFeatureType.CullFace);
	        var geometry = object.Geometry;
	        var programWrapper = this.program.getForContext(renderer.ContextManager);
	        programWrapper.useProgram();
	        var v = Matrix.multiply(this.matVP, object.Transformer.LocalToGlobal);
	        programWrapper.setAttributeVerticies("position", geometry.PositionBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setUniformMatrix("matMVP", v);
	        geometry.bindIndexBuffer(renderer.ContextManager);
	    };
	    return DepthMaterial;
	})(Material);
	module.exports = DepthMaterial;


/***/ },
/* 158 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\r\nattribute vec3 position;\r\n\r\nuniform mat4 matMVP;\r\n\r\nvarying vec4 v_pos;\r\n\r\nvoid main(void){\r\n\tv_pos=gl_Position =matMVP*vec4(position,1.0);\r\n}\r\n"

/***/ },
/* 159 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\r\nuniform mat4 matMVP;\r\nvarying vec4 v_pos;\r\nvoid main()\r\n{\r\n   gl_FragColor.r=v_pos.z/v_pos.w;\r\n   gl_FragColor.a=1.;\r\n}\r\n"

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var SceneObjectNodeBase = __webpack_require__(59);
	var PMXModel = __webpack_require__(161);
	var JThreeEvent = __webpack_require__(12);
	var PMXNode = (function (_super) {
	    __extends(PMXNode, _super);
	    function PMXNode(elem, loader, parent, parentSceneNode, parentObject) {
	        _super.call(this, elem, loader, parent, parentSceneNode, parentObject);
	        this.pmxModel = null;
	        this.pmxTargetUpdated = new JThreeEvent();
	        this.attributes.defineAttribute({
	            "url": {
	                converter: "string", value: ""
	            }
	        });
	    }
	    Object.defineProperty(PMXNode.prototype, "PMXModel", {
	        get: function () {
	            return this.pmxModel;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMXNode.prototype, "PMXModelReady", {
	        get: function () {
	            return this.PMXModel != null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PMXNode.prototype.onPMXTargetUpdate = function (handler) {
	        this.pmxTargetUpdated.addListerner(handler);
	    };
	    PMXNode.prototype.ConstructTarget = function () {
	        return this.pmxModel;
	    };
	    PMXNode.prototype.beforeLoad = function () {
	        var _this = this;
	        _super.prototype.beforeLoad.call(this);
	        PMXModel.LoadFromUrl(this.attributes.getValue("url"), function (m) {
	            _this.pmxModel = m;
	            _this.targetUpdated();
	            _this.pmxTargetUpdated.fire(_this, m);
	        });
	    };
	    PMXNode.prototype.targetUpdated = function () {
	        _super.prototype.beforeLoad.call(this);
	    };
	    PMXNode.prototype.Load = function () {
	        _super.prototype.Load.call(this);
	    };
	    return PMXNode;
	})(SceneObjectNodeBase);
	module.exports = PMXNode;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var SceneObject = __webpack_require__(53);
	var PMXModelData = __webpack_require__(162);
	var PMXGeometry = __webpack_require__(163);
	var PMXMaterial = __webpack_require__(164);
	var PMXSkeleton = __webpack_require__(170);
	var PMXMorphManager = __webpack_require__(173);
	var AssociativeArray = __webpack_require__(8);
	var PMXModel = (function (_super) {
	    __extends(PMXModel, _super);
	    function PMXModel(pmx, resourceDirectory) {
	        _super.call(this);
	        this.materialDictionary = new AssociativeArray();
	        this.modelData = pmx;
	        this.geometry = new PMXGeometry(pmx);
	        this.skeleton = new PMXSkeleton(this);
	        this.pmxMaterials = new Array(pmx.Materials.length);
	        var offset = 0;
	        for (var materialCount = 0; materialCount < pmx.Materials.length; materialCount++) {
	            var currentMat = pmx.Materials[materialCount];
	            var mat = new PMXMaterial(this, materialCount, offset, resourceDirectory);
	            this.addMaterial(mat);
	            this.pmxMaterials[materialCount] = mat;
	            this.materialDictionary.set(currentMat.materialName, mat);
	            offset += currentMat.vertexCount;
	        }
	        this.morphManager = new PMXMorphManager(this);
	    }
	    PMXModel.LoadFromUrl = function (url, onComplete) {
	        var targetUrl = url;
	        var targetDirectory = targetUrl.substr(0, targetUrl.lastIndexOf("/") + 1);
	        var oReq = new XMLHttpRequest();
	        oReq.open("GET", targetUrl, true);
	        oReq.setRequestHeader("Accept", "*/*");
	        oReq.responseType = "arraybuffer";
	        oReq.onload = function () {
	            var pmx = new PMXModelData(oReq.response);
	            var model = new PMXModel(pmx, targetDirectory);
	            onComplete(model);
	        };
	        oReq.send(null);
	    };
	    PMXModel.prototype.getPMXMaterialByName = function (name) {
	        return this.materialDictionary.get(name);
	    };
	    PMXModel.prototype.getPMXMaterialByIndex = function (index) {
	        return this.pmxMaterials[index];
	    };
	    Object.defineProperty(PMXModel.prototype, "ModelData", {
	        get: function () {
	            return this.modelData;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMXModel.prototype, "Skeleton", {
	        get: function () {
	            return this.skeleton;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMXModel.prototype, "Materials", {
	        get: function () {
	            return this.pmxMaterials;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMXModel.prototype, "MorphManager", {
	        get: function () {
	            return this.morphManager;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PMXModel.prototype.update = function () {
	        this.morphManager.applyMorph();
	        this.skeleton.updateMatricies();
	    };
	    return PMXModel;
	})(SceneObject);
	module.exports = PMXModel;


/***/ },
/* 162 */
/***/ function(module, exports) {

	var PMX = (function () {
	    function PMX(data) {
	        this.reader = new jDataView(data, 0, data.byteLength, true);
	        this.loadHeader();
	        this.loadVerticies();
	        this.loadSurfaces();
	        this.loadTextures();
	        this.loadMaterials();
	        this.loadBones();
	        this.loadMorphs();
	        this.loadDisplayFrames();
	        this.loadRigidBodies();
	        this.loadJoints();
	    }
	    Object.defineProperty(PMX.prototype, "Verticies", {
	        get: function () {
	            return this.verticies;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMX.prototype, "Surfaces", {
	        get: function () {
	            return this.surfaces;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMX.prototype, "Materials", {
	        get: function () {
	            return this.materials;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMX.prototype, "Textures", {
	        get: function () {
	            return this.textures;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMX.prototype, "Bones", {
	        get: function () {
	            return this.bones;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMX.prototype, "Morphs", {
	        get: function () {
	            return this.morphs;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PMX.prototype.readTextBuf = function () {
	        var length = this.reader.getInt32();
	        return this.reader.getString(length, this.reader.tell(), "utf8");
	    };
	    PMX.prototype.toUTF8 = function (str) {
	        var utf8 = [];
	        for (var i = 0; i < str.length; i++) {
	            var charcode = str.charCodeAt(i);
	            if (charcode < 0x80)
	                utf8.push(charcode);
	            else if (charcode < 0x800) {
	                utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
	            }
	            else if (charcode < 0xd800 || charcode >= 0xe000) {
	                utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
	            }
	            else {
	                i++;
	                charcode = 0x10000 + (((charcode & 0x3ff) << 10)
	                    | (str.charCodeAt(i) & 0x3ff));
	                utf8.push(0xf0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3f), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
	            }
	        }
	        var text = "";
	        for (var i = 0; i < utf8.length; i++) {
	            text += String.fromCharCode(utf8[i]);
	        }
	        return text;
	    };
	    PMX.prototype.loadHeader = function () {
	        var r = this.reader;
	        this.reader.getUint32();
	        this.header =
	            {
	                version: r.getFloat32(),
	                headerByteSize: r.getUint8(),
	                encoding: r.getUint8(),
	                uvAddition: r.getUint8(),
	                vertexIndexSize: r.getUint8(),
	                textureIndexSize: r.getUint8(),
	                materialIndexSize: r.getUint8(),
	                boneIndexSize: r.getUint8(),
	                morphIndexSize: r.getUint8(),
	                rigidBodyIndexSize: r.getUint8(),
	                modelName: "",
	                modelNameEn: "",
	                comment: "",
	                commentEn: ""
	            };
	        this.header.modelName = this.readTextBuf();
	        this.header.modelNameEn = this.readTextBuf();
	        this.header.comment = this.readTextBuf();
	        this.header.commentEn = this.readTextBuf();
	    };
	    PMX.prototype.readBoneIndex = function () {
	        return this.readIndexExceptVertex(this.header.boneIndexSize);
	    };
	    PMX.prototype.readTextureIndex = function () {
	        return this.readIndexExceptVertex(this.header.textureIndexSize);
	    };
	    PMX.prototype.readMorphIndex = function () {
	        return this.readIndexExceptVertex(this.header.morphIndexSize);
	    };
	    PMX.prototype.readMaterialIndex = function () {
	        return this.readIndexExceptVertex(this.header.materialIndexSize);
	    };
	    PMX.prototype.readRigidBodyIndex = function () {
	        return this.readIndexExceptVertex(this.header.rigidBodyIndexSize);
	    };
	    PMX.prototype.readVertexIndex = function () {
	        switch (this.header.vertexIndexSize) {
	            case 1:
	                return this.reader.getUint8();
	                break;
	            case 2:
	                return this.reader.getUint16();
	                break;
	            case 4:
	                return this.reader.getInt32();
	                break;
	        }
	    };
	    PMX.prototype.readIndexExceptVertex = function (byte) {
	        switch (byte) {
	            case 1:
	                return this.reader.getInt8();
	                break;
	            case 2:
	                return this.reader.getInt16();
	                break;
	            case 4:
	                return this.reader.getInt32();
	                break;
	        }
	    };
	    PMX.prototype.loadVerticies = function () {
	        var r = this.reader;
	        var count = r.getInt32();
	        var uvCount = this.header.uvAddition;
	        var additionalUvs = new Array(uvCount);
	        for (var i = 0; i < uvCount; i++) {
	            additionalUvs[i] = new Array(count * 4);
	        }
	        var bi1 = 0, bi2 = 0, bi3 = 0, bi4 = 0;
	        var bw1 = 0, bw2 = 0, bw3 = 0, bw4 = 0;
	        var sumCache = 0;
	        var result = {
	            positions: new Array(count * 3),
	            normals: new Array(count * 3),
	            uvs: new Array(count * 2),
	            additionalUV: additionalUvs,
	            edgeScaling: new Array(count),
	            verticies: new Array(count),
	            boneIndicies: new Array(count * 4),
	            boneWeights: new Array(count * 4)
	        };
	        for (var i = 0; i < count; i++) {
	            bi1 = 0;
	            bi2 = 0;
	            bi3 = 0;
	            bi4 = 0;
	            bw1 = 0;
	            bw2 = 0;
	            bw3 = 0;
	            bw4 = 0;
	            result.positions[3 * i + 0] = r.getFloat32();
	            result.positions[3 * i + 1] = r.getFloat32();
	            result.positions[3 * i + 2] = -r.getFloat32();
	            result.normals[3 * i + 0] = r.getFloat32();
	            result.normals[3 * i + 1] = r.getFloat32();
	            result.normals[3 * i + 2] = -r.getFloat32();
	            result.uvs[2 * i + 0] = r.getFloat32();
	            result.uvs[2 * i + 1] = r.getFloat32();
	            for (var j = 0; j < uvCount; j++) {
	                result.additionalUV[j][4 * i + 0] = r.getFloat32();
	                result.additionalUV[j][4 * i + 1] = r.getFloat32();
	                result.additionalUV[j][4 * i + 2] = r.getFloat32();
	                result.additionalUV[j][4 * i + 3] = r.getFloat32();
	            }
	            result.verticies[i] = { weightTransform: r.getUint8() };
	            switch (result.verticies[i].weightTransform) {
	                case 0:
	                    bi1 = this.readBoneIndex();
	                    bw1 = 1;
	                    break;
	                case 1:
	                    bi1 = this.readBoneIndex();
	                    bi2 = this.readBoneIndex();
	                    bw1 = r.getFloat32();
	                    bw2 = 1 - bw1;
	                    break;
	                case 2:
	                    bi1 = this.readBoneIndex();
	                    bi2 = this.readBoneIndex();
	                    bi3 = this.readBoneIndex();
	                    bi4 = this.readBoneIndex();
	                    bw1 = r.getFloat32();
	                    bw2 = r.getFloat32();
	                    bw3 = r.getFloat32();
	                    bw4 = r.getFloat32();
	                    sumCache = bw1 + bw2 + bw3 + bw4;
	                    bw1 /= sumCache;
	                    bw2 /= sumCache;
	                    bw3 /= sumCache;
	                    bw4 /= sumCache;
	                    break;
	                case 3:
	                    bi1 = this.readBoneIndex();
	                    bi2 = this.readBoneIndex();
	                    bw1 = r.getFloat32();
	                    bw2 = 1 - bw1;
	                    result.verticies[i].sdef =
	                        {
	                            boneParams: [
	                                r.getFloat32(),
	                                r.getFloat32(),
	                                r.getFloat32(),
	                                r.getFloat32(),
	                                r.getFloat32(),
	                                r.getFloat32(),
	                                r.getFloat32(),
	                                r.getFloat32(),
	                                r.getFloat32(),
	                            ]
	                        };
	                    break;
	            }
	            result.boneIndicies[4 * i + 0] = bi1;
	            result.boneIndicies[4 * i + 1] = bi2;
	            result.boneIndicies[4 * i + 2] = bi3;
	            result.boneIndicies[4 * i + 3] = bi4;
	            result.boneWeights[4 * i + 0] = bw1;
	            result.boneWeights[4 * i + 1] = bw2;
	            result.boneWeights[4 * i + 2] = bw3;
	            result.boneWeights[4 * i + 3] = bw4;
	            result.edgeScaling[i] = r.getFloat32();
	        }
	        this.verticies = result;
	    };
	    PMX.prototype.loadSurfaces = function () {
	        var r = this.reader;
	        var count = r.getInt32();
	        this.surfaces = new Array(count);
	        for (var i = 0; i < count / 3; i++) {
	            this.surfaces[3 * i + 0] = this.readVertexIndex();
	            this.surfaces[3 * i + 2] = this.readVertexIndex();
	            this.surfaces[3 * i + 1] = this.readVertexIndex();
	        }
	    };
	    PMX.prototype.loadTextures = function () {
	        var r = this.reader;
	        var count = r.getInt32();
	        this.textures = new Array(count);
	        for (var i = 0; i < count; i++) {
	            this.textures[i] = this.readTextBuf();
	        }
	    };
	    PMX.prototype.loadMaterials = function () {
	        var r = this.reader;
	        var count = r.getInt32();
	        this.materials = new Array(count);
	        var cache = 0;
	        for (var i = 0; i < count; i++) {
	            this.materials[i] = {
	                materialName: this.readTextBuf(),
	                materialNameEn: this.readTextBuf(),
	                diffuse: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                specular: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                ambient: [r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                drawFlag: r.getUint8(),
	                edgeColor: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                edgeSize: r.getFloat32(),
	                textureIndex: this.readTextureIndex(),
	                sphereTextureIndex: this.readTextureIndex(),
	                sphereMode: r.getUint8(),
	                sharedToonFlag: cache = r.getUint8(),
	                targetToonIndex: cache == 0 ? this.readTextureIndex() : r.getUint8(),
	                memo: this.readTextBuf(),
	                vertexCount: r.getInt32(),
	            };
	        }
	    };
	    PMX.prototype.loadBones = function () {
	        var r = this.reader;
	        var count = r.getUint32();
	        this.bones = new Array(count);
	        var boneFlagCache = 0;
	        var ikLinkCountCache = 0;
	        var ikLimitedCache = 0;
	        for (var i = 0; i < count; i++) {
	            this.bones[i] = {
	                boneName: this.readTextBuf(),
	                boneNameEn: this.readTextBuf(),
	                position: [r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                parentBoneIndex: this.readBoneIndex(),
	                transformLayer: r.getInt32(),
	                boneFlag: boneFlagCache = r.getUint16(),
	                positionOffset: (boneFlagCache & 0x0001) == 0 ? [r.getFloat32(), r.getFloat32(), r.getFloat32()] : undefined,
	                connectingBoneIndex: (boneFlagCache & 0x0001) > 0 ? this.readBoneIndex() : undefined,
	                providingBoneIndex: (boneFlagCache & 0x0100) > 0 || (boneFlagCache & 0x0200) > 0 ? this.readBoneIndex() : undefined,
	                providingRate: (boneFlagCache & 0x0100) > 0 || (boneFlagCache & 0x0200) > 0 ? r.getFloat32() : undefined,
	                fixedAxis: (boneFlagCache & 0x0400) > 0 ? [r.getFloat32(), r.getFloat32(), r.getFloat32()] : undefined,
	                localAxisX: (boneFlagCache & 0x0800) > 0 ? [r.getFloat32(), r.getFloat32(), r.getFloat32()] : undefined,
	                localAxisZ: (boneFlagCache & 0x0800) > 0 ? [r.getFloat32(), r.getFloat32(), r.getFloat32()] : undefined,
	                externalParentTransformKey: (boneFlagCache & 0x2000) > 0 ? r.getInt32() : undefined,
	                ikTargetBoneIndex: (boneFlagCache & 0x0020) > 0 ? this.readBoneIndex() : undefined,
	                ikLoopCount: (boneFlagCache & 0x0020) > 0 ? r.getInt32() : undefined,
	                ikLimitedRotation: (boneFlagCache & 0x0020) > 0 ? r.getFloat32() : undefined,
	                ikLinkCount: (boneFlagCache & 0x0020) > 0 ? ikLinkCountCache = r.getInt32() : ikLinkCountCache = undefined,
	                ikLinks: (boneFlagCache & 0x0020) > 0 ? new Array(ikLinkCountCache) : undefined
	            };
	            if (ikLinkCountCache)
	                for (var j = 0; j < ikLinkCountCache; j++) {
	                    this.bones[i].ikLinks[j] = {
	                        ikLinkBoneIndex: this.readBoneIndex(),
	                        isLimitedRotation: ikLimitedCache = r.getUint8(),
	                        limitedRotation: ikLimitedCache > 0 ? [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()] : undefined
	                    };
	                }
	        }
	    };
	    PMX.prototype.loadMorphs = function () {
	        var r = this.reader;
	        var count = r.getInt32();
	        this.morphs = new Array(count);
	        var morphCountCache = 0;
	        for (var i = 0; i < count; i++) {
	            this.morphs[i] = {
	                morphName: this.readTextBuf(),
	                morphNameEn: this.readTextBuf(),
	                editPanel: r.getUint8(),
	                morphKind: r.getUint8(),
	                morphOffsetCount: morphCountCache = r.getInt32()
	            };
	            switch (this.morphs[i].morphKind) {
	                case 0:
	                    this.morphs[i].groupMorph = new Array(morphCountCache);
	                    for (var j = 0; j < morphCountCache; j++) {
	                        this.morphs[i].groupMorph[j] = {
	                            morphIndex: this.readMorphIndex(),
	                            morphRate: r.getFloat32()
	                        };
	                    }
	                    break;
	                case 1:
	                    this.morphs[i].vertexMorph = new Array(morphCountCache);
	                    for (var j = 0; j < morphCountCache; j++) {
	                        this.morphs[i].vertexMorph[j] =
	                            {
	                                vertexIndex: this.readVertexIndex(),
	                                vertexOffset: [r.getFloat32(), r.getFloat32(), r.getFloat32()]
	                            };
	                    }
	                    break;
	                case 2:
	                    this.morphs[i].boneMorph = new Array(morphCountCache);
	                    for (var j = 0; j < morphCountCache; j++) {
	                        this.morphs[i].boneMorph[j]
	                            = {
	                                boneIndex: this.readBoneIndex(),
	                                translationOffset: [r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                                rotationOffset: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()]
	                            };
	                    }
	                    break;
	                case 3:
	                case 4:
	                case 5:
	                case 6:
	                case 7:
	                    this.morphs[i].uvMorph = new Array(morphCountCache);
	                    for (var j = 0; j < morphCountCache; j++) {
	                        this.morphs[i].uvMorph[j]
	                            = {
	                                vertexIndex: this.readVertexIndex(),
	                                uvOffset: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()]
	                            };
	                    }
	                    break;
	                case 8:
	                    this.morphs[i].materialMorph = new Array(morphCountCache);
	                    for (var j = 0; j < morphCountCache; j++) {
	                        this.morphs[i].materialMorph[j]
	                            = {
	                                materialIndex: this.readMaterialIndex(),
	                                operationType: r.getUint8(),
	                                diffuse: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                                specular: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                                ambient: [r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                                edgeColor: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                                edgeSize: r.getFloat32(),
	                                textureCoefficient: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                                sphereTextureCoefficient: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                                toonTextureCoefficient: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()]
	                            };
	                    }
	                    break;
	            }
	        }
	    };
	    PMX.prototype.loadDisplayFrames = function () {
	        var r = this.reader;
	        var count = r.getInt32();
	        this.displayFrames = new Array(count);
	        var countCache = 0;
	        var targetCache = 0;
	        for (var i = 0; i < count; i++) {
	            this.displayFrames[i] =
	                {
	                    frameName: this.readTextBuf(),
	                    frameNameEn: this.readTextBuf(),
	                    specialFrameFlag: r.getUint8(),
	                    elementCount: countCache = r.getInt32(),
	                    targetElementTypes: new Array(countCache),
	                    targetIndex: new Array(countCache)
	                };
	            for (var j = 0; j < countCache; j++) {
	                this.displayFrames[i].targetElementTypes[j] = targetCache = r.getUint8();
	                this.displayFrames[i].targetIndex[j] = targetCache > 0 ? this.readMorphIndex() : this.readBoneIndex();
	            }
	        }
	    };
	    PMX.prototype.loadRigidBodies = function () {
	        var r = this.reader;
	        var count = r.getInt32();
	        this.rigidBodies = new Array(count);
	        for (var i = 0; i < count; i++) {
	            this.rigidBodies[i] = {
	                rigidBodyName: this.readTextBuf(),
	                rigidBodyNameEn: this.readTextBuf(),
	                boneIndex: this.readBoneIndex(),
	                group: r.getUint8(),
	                unCollisionGroupFlag: r.getUint16(),
	                shape: r.getUint8(),
	                size: [r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                position: [r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                rotation: [r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                mass: r.getFloat32(),
	                translationFraction: r.getFloat32(),
	                rotationFraction: r.getFloat32(),
	                boundness: r.getFloat32(),
	                fraction: r.getFloat32(),
	                calcType: r.getUint8(),
	            };
	        }
	    };
	    PMX.prototype.loadJoints = function () {
	        var r = this.reader;
	        var count = r.getInt32();
	        this.joints = new Array(count);
	        var typeCache = 0;
	        for (var i = 0; i < count; i++) {
	            this.joints[i] = {
	                jointName: this.readTextBuf(),
	                jointNameEn: this.readTextBuf(),
	                jointType: typeCache = r.getUint8(),
	                spring: typeCache == 0 ?
	                    {
	                        targetRigidBody1: this.readRigidBodyIndex(),
	                        targetRigidBody2: this.readRigidBodyIndex(),
	                        position: [r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                        rotation: [r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                        translationLimit: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                        rotationLimit: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()],
	                        springCoefficientLimit: [r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32(), r.getFloat32()]
	                    } : undefined
	            };
	        }
	    };
	    return PMX;
	})();
	module.exports = PMX;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Geometry = __webpack_require__(71);
	var PrimitiveTopology = __webpack_require__(72);
	var BufferTargetType = __webpack_require__(73);
	var BufferUsageType = __webpack_require__(74);
	var ElementType = __webpack_require__(75);
	var JThreeContextProxy = __webpack_require__(67);
	var PMXGeometry = (function (_super) {
	    __extends(PMXGeometry, _super);
	    function PMXGeometry(pmx) {
	        _super.call(this);
	        var name = "pmxtest";
	        var j3 = JThreeContextProxy.getJThreeContext();
	        this.primitiveTopology = PrimitiveTopology.Triangles;
	        this.indexBuffer = j3.ResourceManager.createBuffer(name + "-index", BufferTargetType.ElementArrayBuffer, BufferUsageType.StaticDraw, 1, ElementType.UnsignedInt);
	        this.positionBuffer = j3.ResourceManager.createBuffer(name + "-pos", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
	        this.normalBuffer = j3.ResourceManager.createBuffer(name + "-nor", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 3, ElementType.Float);
	        this.uvBuffer = j3.ResourceManager.createBuffer(name + "-uv", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 2, ElementType.Float);
	        this.edgeSizeBuffer = j3.ResourceManager.createBuffer(name + "-edgeSize", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 1, ElementType.Float);
	        this.boneIndexBuffer = j3.ResourceManager.createBuffer(name + "-boneIndex", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 4, ElementType.Float);
	        this.boneWeightBuffer = j3.ResourceManager.createBuffer(name + "-boneWeight", BufferTargetType.ArrayBuffer, BufferUsageType.StaticDraw, 4, ElementType.Float);
	        this.updateBuffers(pmx);
	    }
	    PMXGeometry.prototype.updateBuffers = function (pmx) {
	        var surfaceBuffer = new Uint32Array(pmx.Surfaces);
	        this.positionBuferSource = new Float32Array(pmx.Verticies.positions);
	        this.uvBufferSource = new Float32Array(pmx.Verticies.uvs);
	        this.indexBuffer.update(surfaceBuffer, surfaceBuffer.length);
	        this.normalBuffer.update(new Float32Array(pmx.Verticies.normals), pmx.Verticies.normals.length);
	        this.uvBuffer.update(this.uvBufferSource, this.uvBufferSource.length);
	        this.positionBuffer.update(this.positionBuferSource, this.positionBuferSource.length);
	        this.edgeSizeBuffer.update(new Float32Array(pmx.Verticies.edgeScaling), pmx.Verticies.edgeScaling.length);
	        this.boneIndexBuffer.update(new Float32Array(pmx.Verticies.boneIndicies), pmx.Verticies.boneIndicies.length);
	        this.boneWeightBuffer.update(new Float32Array(pmx.Verticies.boneWeights), pmx.Verticies.boneWeights.length);
	    };
	    PMXGeometry.prototype.drawElements = function (context, material) {
	        var mat = material;
	        if (mat == null || !mat.VerticiesCount) {
	            context.Context.DrawElements(this.PrimitiveTopology, this.IndexBuffer.Length, this.IndexBuffer.ElementType, 0);
	            return;
	        }
	        if (mat.Diffuse.A < 0.01) {
	            return;
	        }
	        ;
	        context.Context.DrawElements(this.PrimitiveTopology, mat.VerticiesCount, this.IndexBuffer.ElementType, mat.VerticiesOffset * 4);
	    };
	    PMXGeometry.prototype.updatePositionBuffer = function () {
	        this.positionBuffer.update(this.positionBuferSource, this.positionBuferSource.length);
	    };
	    PMXGeometry.prototype.updateUVBuffer = function () {
	        this.uvBuffer.update(this.uvBufferSource, this.uvBufferSource.length);
	    };
	    return PMXGeometry;
	})(Geometry);
	module.exports = PMXGeometry;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Material = __webpack_require__(130);
	var JThreeContextProxy = __webpack_require__(67);
	var Vector3 = __webpack_require__(24);
	var Vector4 = __webpack_require__(39);
	var Matrix = __webpack_require__(56);
	var Color4 = __webpack_require__(38);
	var Color3 = __webpack_require__(43);
	var GLCullMode = __webpack_require__(109);
	var GLFeatureType = __webpack_require__(112);
	var BlendFuncParamType = __webpack_require__(165);
	var PMXMaterialMorphParamContainer = (function () {
	    function PMXMaterialMorphParamContainer(calcFlag) {
	        this.calcFlag = calcFlag;
	        var def = 1 - calcFlag;
	        this.diffuse = [def, def, def, def];
	        this.specular = [def, def, def, def];
	        this.ambient = [def, def, def];
	        this.edgeColor = [def, def, def, def];
	        this.edgeSize = def;
	        this.textureCoeff = [def, def, def, def];
	        this.sphereCoeff = [def, def, def, def];
	        this.toonCoeff = [def, def, def, def];
	    }
	    PMXMaterialMorphParamContainer.calcMorphedSingleValue = function (base, add, mul, target) {
	        return base * target(mul) + target(add);
	    };
	    PMXMaterialMorphParamContainer.calcMorphedVectorValue = function (base, add, mul, target, vecLength) {
	        switch (vecLength) {
	            case 3:
	                return new Vector3(base.X * target(mul)[0] + target(add)[0], base.Y * target(mul)[1] + target(add)[1], base.Z * target(mul)[2] + target(add)[2]);
	            case 4:
	                return new Vector4(base.X * target(mul)[0] + target(add)[0], base.Y * target(mul)[1] + target(add)[1], base.Z * target(mul)[2] + target(add)[2], base.W * target(mul)[3] + target(add)[3]);
	        }
	    };
	    return PMXMaterialMorphParamContainer;
	})();
	var PMXMaterial = (function (_super) {
	    __extends(PMXMaterial, _super);
	    function PMXMaterial(pmx, index, offset, directory) {
	        _super.call(this);
	        this.edgeColor = null;
	        this.sphere = null;
	        this.texture = null;
	        this.toon = null;
	        this.addMorphParam = new PMXMaterialMorphParamContainer(1);
	        this.mulMorphParam = new PMXMaterialMorphParamContainer(0);
	        this.parentModel = pmx;
	        this.pmxData = pmx.ModelData;
	        this.materialIndex = index;
	        var materialData = this.pmxData.Materials[index];
	        this.verticiesCount = materialData.vertexCount;
	        this.verticiesOffset = offset;
	        this.Name = materialData.materialName;
	        this.CullEnabled = !((materialData.drawFlag & 0x01) > 0);
	        this.ambient = new Color3(materialData.ambient[0], materialData.ambient[1], materialData.ambient[2]);
	        this.diffuse = new Color4(materialData.diffuse[0], materialData.diffuse[1], materialData.diffuse[2], materialData.diffuse[3]);
	        if ((materialData.drawFlag & 0x10) > 0)
	            this.edgeColor = new Color4(materialData.edgeColor[0], materialData.edgeColor[1], materialData.edgeColor[2], materialData.edgeColor[3]);
	        this.edgeSize = materialData.edgeSize;
	        this.sphereMode = materialData.sphereMode;
	        var vs = __webpack_require__(166);
	        var fs = __webpack_require__(167);
	        this.program = this.loadProgram("jthree.shaders.vertex.pmx.basic", "jthree.shaders.fragment.pmx.basic", "jthree.programs.pmx.basic", vs, fs);
	        var vs = __webpack_require__(168);
	        var fs = __webpack_require__(169);
	        this.edgeProgram = this.loadProgram("jthree.shaders.vertex.pmx.edge", "jthree.shaders.fragment.pmx.edge", "jthree.programs.pmx.edge", vs, fs);
	        this.sphere = this.loadPMXTexture(materialData.sphereTextureIndex, "sphere", directory);
	        this.texture = this.loadPMXTexture(materialData.textureIndex, "texture", directory);
	        if (materialData.sharedToonFlag == 0) {
	            this.toon = this.loadPMXTexture(materialData.targetToonIndex, "toon", directory);
	        }
	        this.setLoaded();
	    }
	    Object.defineProperty(PMXMaterial.prototype, "VerticiesCount", {
	        get: function () {
	            return this.verticiesCount;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMXMaterial.prototype, "VerticiesOffset", {
	        get: function () {
	            return this.verticiesOffset;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMXMaterial.prototype, "Diffuse", {
	        get: function () {
	            return this.diffuse;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMXMaterial.prototype, "PassCount", {
	        get: function () {
	            return this.edgeColor == null ? 1 : 2;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PMXMaterial.prototype.configureMaterial = function (scene, renderer, object, texs, pass) {
	        if (pass == 1) {
	            this.configureEdgeMaterial(renderer, object);
	            return;
	        }
	        if (!this.program)
	            return;
	        _super.prototype.configureMaterial.call(this, scene, renderer, object, texs);
	        renderer.GLContext.Enable(GLFeatureType.DepthTest);
	        renderer.GLContext.Enable(GLFeatureType.Blend);
	        renderer.GLContext.BlendFunc(BlendFuncParamType.SrcAlpha, BlendFuncParamType.OneMinusSrcAlpha);
	        var id = renderer.ID;
	        var geometry = object.Geometry;
	        var programWrapper = this.program.getForContext(renderer.ContextManager);
	        programWrapper.useProgram();
	        var v = object.Transformer.calculateMVPMatrix(renderer);
	        programWrapper.registerTexture(renderer, texs["LIGHT"], 0, "u_light");
	        programWrapper.registerTexture(renderer, this.texture, 1, "u_texture");
	        programWrapper.registerTexture(renderer, this.toon, 2, "u_toon");
	        programWrapper.registerTexture(renderer, this.sphere, 3, "u_sphere");
	        programWrapper.registerTexture(renderer, this.parentModel.Skeleton.MatrixTexture, 4, "u_boneMatricies");
	        programWrapper.setUniform1i("u_textureUsed", this.texture == null || this.texture.ImageSource == null ? 0 : 1);
	        programWrapper.setUniform1i("u_sphereMode", this.sphere == null || this.sphere.ImageSource == null ? 0 : this.sphereMode);
	        programWrapper.setUniform1i("u_toonFlag", this.toon == null || this.toon.ImageSource == null ? 0 : 1);
	        programWrapper.setAttributeVerticies("position", geometry.PositionBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setAttributeVerticies("normal", geometry.NormalBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setAttributeVerticies("uv", geometry.UVBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setAttributeVerticies("boneWeights", geometry.boneWeightBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setAttributeVerticies("boneIndicies", geometry.boneIndexBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setUniformMatrix("matMVP", v);
	        programWrapper.setUniformMatrix("matVP", Matrix.multiply(renderer.Camera.ProjectionMatrix, renderer.Camera.ViewMatrix));
	        programWrapper.setUniformVector("u_ambient", PMXMaterialMorphParamContainer.calcMorphedVectorValue(this.ambient.toVector(), this.addMorphParam, this.mulMorphParam, function (t) { return t.ambient; }, 3));
	        programWrapper.setUniformVector("u_diffuse", PMXMaterialMorphParamContainer.calcMorphedVectorValue(this.diffuse.toVector(), this.addMorphParam, this.mulMorphParam, function (t) { return t.diffuse; }, 4));
	        programWrapper.setUniform1f("u_matIndex", this.materialIndex);
	        programWrapper.setUniform1f("u_boneCount", this.parentModel.Skeleton.BoneCount);
	        programWrapper.setUniformVector("u_addTexCoeff", new Vector4(this.addMorphParam.textureCoeff));
	        programWrapper.setUniformVector("u_mulTexCoeff", new Vector4(this.mulMorphParam.textureCoeff));
	        programWrapper.setUniformVector("u_addSphereCoeff", new Vector4(this.addMorphParam.sphereCoeff));
	        programWrapper.setUniformVector("u_mulSphereCoeff", new Vector4(this.mulMorphParam.sphereCoeff));
	        programWrapper.setUniformVector("u_addToonCoeff", new Vector4(this.addMorphParam.toonCoeff));
	        programWrapper.setUniformVector("u_mulToonCoeff", new Vector4(this.mulMorphParam.toonCoeff));
	        geometry.bindIndexBuffer(renderer.ContextManager);
	    };
	    PMXMaterial.prototype.configureEdgeMaterial = function (renderer, object) {
	        if (!this.program)
	            return;
	        renderer.GLContext.Enable(GLFeatureType.CullFace);
	        renderer.GLContext.CullFace(GLCullMode.Front);
	        var id = renderer.ID;
	        var geometry = object.Geometry;
	        var programWrapper = this.edgeProgram.getForContext(renderer.ContextManager);
	        programWrapper.useProgram();
	        programWrapper.registerTexture(renderer, this.parentModel.Skeleton.MatrixTexture, 0, "u_boneMatricies");
	        programWrapper.setAttributeVerticies("position", geometry.PositionBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setAttributeVerticies("edgeScaling", geometry.edgeSizeBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setUniformMatrix("matVP", Matrix.multiply(renderer.Camera.ProjectionMatrix, renderer.Camera.ViewMatrix));
	        programWrapper.setUniform1f("u_edgeSize", PMXMaterialMorphParamContainer.calcMorphedSingleValue(this.edgeSize, this.addMorphParam, this.mulMorphParam, function (t) { return t.edgeSize; }));
	        programWrapper.setUniformVector("u_edgeColor", PMXMaterialMorphParamContainer.calcMorphedVectorValue(this.edgeColor.toVector(), this.addMorphParam, this.mulMorphParam, function (t) { return t.edgeColor; }, 4));
	        programWrapper.setAttributeVerticies("boneWeights", geometry.boneWeightBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setAttributeVerticies("boneIndicies", geometry.boneIndexBuffer.getForRenderer(renderer.ContextManager));
	        programWrapper.setUniform1f("u_boneCount", this.parentModel.Skeleton.BoneCount);
	        geometry.bindIndexBuffer(renderer.ContextManager);
	    };
	    PMXMaterial.prototype.loadPMXTexture = function (index, prefix, directory) {
	        if (index < 0)
	            return null;
	        var rm = JThreeContextProxy.getJThreeContext().ResourceManager;
	        var resourceName = "jthree.pmx." + prefix + "." + index;
	        if (rm.getTexture(resourceName)) {
	            return rm.getTexture(resourceName);
	        }
	        else {
	            var texture = rm.createTextureWithSource(resourceName, null);
	            var img = new Image();
	            img.onload = function () {
	                texture.ImageSource = img;
	            };
	            img.src = directory + this.pmxData.Textures[index];
	            return texture;
	        }
	    };
	    Object.defineProperty(PMXMaterial.prototype, "Priorty", {
	        get: function () {
	            return 100 + this.materialIndex;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return PMXMaterial;
	})(Material);
	module.exports = PMXMaterial;


/***/ },
/* 165 */
/***/ function(module, exports) {

	var BlendFuncParamType;
	(function (BlendFuncParamType) {
	    BlendFuncParamType[BlendFuncParamType["Zero"] = 0] = "Zero";
	    BlendFuncParamType[BlendFuncParamType["One"] = 1] = "One";
	    BlendFuncParamType[BlendFuncParamType["SrcColor"] = 768] = "SrcColor";
	    BlendFuncParamType[BlendFuncParamType["OneMinusSrcColor"] = 769] = "OneMinusSrcColor";
	    BlendFuncParamType[BlendFuncParamType["OneMinusDstColor"] = 775] = "OneMinusDstColor";
	    BlendFuncParamType[BlendFuncParamType["SrcAlpha"] = 770] = "SrcAlpha";
	    BlendFuncParamType[BlendFuncParamType["OneMinusSrcAlpha"] = 771] = "OneMinusSrcAlpha";
	    BlendFuncParamType[BlendFuncParamType["DstAlpha"] = 772] = "DstAlpha";
	    BlendFuncParamType[BlendFuncParamType["OneMinusDstAlpha"] = 773] = "OneMinusDstAlpha";
	    BlendFuncParamType[BlendFuncParamType["ConstantColor"] = 32769] = "ConstantColor";
	    BlendFuncParamType[BlendFuncParamType["OneMinusConstantColor"] = 32770] = "OneMinusConstantColor";
	    BlendFuncParamType[BlendFuncParamType["ConstantAlpha"] = 32771] = "ConstantAlpha";
	    BlendFuncParamType[BlendFuncParamType["OneMinusConstantAlpha"] = 32772] = "OneMinusConstantAlpha";
	    BlendFuncParamType[BlendFuncParamType["SrcAlphaSaturate"] = 776] = "SrcAlphaSaturate";
	})(BlendFuncParamType || (BlendFuncParamType = {}));
	module.exports = BlendFuncParamType;


/***/ },
/* 166 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\r\nattribute vec3 position;\r\nattribute vec3 normal;\r\nattribute vec2 uv;\r\nattribute vec4 boneWeights;\r\nattribute vec4 boneIndicies;\r\nuniform mat4 matMVP;\r\nuniform mat4 matMV;\r\nuniform mat4 matVP;\r\n\r\nvarying vec3 v_normal;\r\nvarying vec2 v_uv;\r\nvarying vec4 v_pos;\r\nvarying vec2 v_spuv;\r\n\r\n\r\nuniform mediump sampler2D u_boneMatricies;\r\nuniform float u_boneCount;\r\n\r\nmat4 matFromIndex(float index)\r\n{\r\n\tfloat y =index/u_boneCount+1./u_boneCount/2.;\r\n\ty=1.-y;\r\n\treturn mat4(\r\n\ttexture2D(u_boneMatricies,vec2(0.125,y)),\r\n\ttexture2D(u_boneMatricies,vec2(0.375,y)),\r\n\ttexture2D(u_boneMatricies,vec2(0.625,y)),\r\n\ttexture2D(u_boneMatricies,vec2(0.875,y)));\r\n}\r\n\r\nmat4 getBoneTransform()\r\n{\r\n\treturn boneWeights.x*matFromIndex(boneIndicies.x)\r\n\t+boneWeights.y*matFromIndex(boneIndicies.y)\r\n\t+boneWeights.z*matFromIndex(boneIndicies.z)\r\n\t+boneWeights.w*matFromIndex(boneIndicies.w);\r\n}\r\n\r\nvoid main(void){\r\nmat4 boneTransform=getBoneTransform();\r\nv_pos=gl_Position = matVP*boneTransform*vec4(position,1.0);\r\nv_normal=normalize((matMV*vec4(normal,0)).xyz);\r\nv_spuv=v_normal.xy/2.+vec2(0.5,0.5);\r\nv_uv=uv;\t\r\n}\r\n"

/***/ },
/* 167 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\r\nvarying vec3 v_normal;\r\nvarying  vec2 v_uv;\r\nvarying vec4 v_pos;\r\nuniform vec4 u_diffuse;\r\n\r\nuniform vec4 u_specular;\r\nuniform vec3 u_ambient;\r\nuniform vec3 u_DirectionalLight;\r\nuniform mat4 matMVP;\r\nuniform mat4 matMV;\r\nuniform mat4 matV;\r\nuniform sampler2D u_sampler;\r\nuniform sampler2D u_light;\r\nuniform sampler2D u_texture;\r\nuniform sampler2D u_sphere;\r\nuniform sampler2D u_toon;\r\nvarying vec2 v_spuv;\r\nuniform int u_textureUsed;\r\nuniform int u_sphereMode;\r\nuniform int u_toonFlag;\r\nuniform vec4 u_addTexCoeff;\r\nuniform vec4 u_mulTexCoeff;\r\nuniform vec4 u_addSphereCoeff;\r\nuniform vec4 u_mulSphereCoeff;\r\nuniform vec4 u_addToonCoeff;\r\nuniform vec4 u_mulToonCoeff;\r\n\r\nvec2 calcLightUV(vec4 projectionSpacePos)\r\n{\r\n   return (projectionSpacePos.xy/projectionSpacePos.w+vec2(1,1))/2.;\r\n}\r\n\r\nvec4 blendPMXTexture(sampler2D source,vec2 uv,vec4 addCoeff,vec4 mulCoeff)\r\n{\r\n    vec4 result=texture2D(source,uv);\r\n    result.rgb=mix(mix(result.rgb,vec3(0,0,0),addCoeff.a),vec3(1,1,1),1.-mulCoeff.a);\r\n    result.rgb=result.rgb*mulCoeff.rgb+addCoeff.rgb;\r\n    return result;\r\n}\r\n\r\nvoid main(void){\r\n  vec2 adjuv=v_uv;\r\n  adjuv.y=1.-adjuv.y;\r\n  vec2 lightUV=calcLightUV(v_pos);\r\n  gl_FragColor.rgba=u_diffuse;\r\n    if(u_textureUsed>0) gl_FragColor.rgba*=blendPMXTexture(u_texture,adjuv,u_addTexCoeff,u_mulTexCoeff);\r\n    if(u_sphereMode==1)\r\n    {\r\n      gl_FragColor.rgb*=blendPMXTexture(u_sphere,v_spuv,u_addSphereCoeff,u_mulSphereCoeff).rgb;\r\n    }else if(u_sphereMode==2)\r\n    {\r\n      gl_FragColor.rgb+=blendPMXTexture(u_sphere,v_spuv,u_addSphereCoeff,u_mulSphereCoeff).rgb;\r\n    }\r\n    vec3 lc=texture2D(u_light,lightUV).rgb;\r\n    float l=0.2;//length(lc)/1.732;\r\n    if(u_toonFlag==1)\r\n    {\r\n          gl_FragColor.rgb*=blendPMXTexture(u_toon,vec2(0,1.-l),u_addToonCoeff  ,u_mulToonCoeff ).rgb*l;\r\n    }else\r\n    {\r\n          gl_FragColor.rgb*=l;\r\n    }\r\n    gl_FragColor.rgb+=u_ambient;\r\n}\r\n"

/***/ },
/* 168 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\r\nattribute vec3 position;\r\nattribute vec3 normal;\r\nattribute float edgeScaling;\r\nattribute vec4 boneWeights;\r\nattribute vec4 boneIndicies;\r\n\r\nuniform mat4 matVP;\r\nuniform float u_edgeSize;\r\n\r\n\r\nuniform mediump sampler2D u_boneMatricies;\r\nuniform float u_boneCount;\r\n\r\nmat4 matFromIndex(float index)\r\n{\r\n\tfloat y =index/u_boneCount+1./u_boneCount/2.;\r\n\ty=1.-y;\r\n\treturn mat4(\r\n\ttexture2D(u_boneMatricies,vec2(0.125,y)),\r\n\ttexture2D(u_boneMatricies,vec2(0.375,y)),\r\n\ttexture2D(u_boneMatricies,vec2(0.625,y)),\r\n\ttexture2D(u_boneMatricies,vec2(0.875,y)));\r\n}\r\n\r\nmat4 getBoneTransform()\r\n{\r\n\treturn boneWeights.x*matFromIndex(boneIndicies.x)\r\n\t+boneWeights.y*matFromIndex(boneIndicies.y)\r\n\t+boneWeights.z*matFromIndex(boneIndicies.z)\r\n\t+boneWeights.w*matFromIndex(boneIndicies.w);\r\n}\r\nvoid main(void){\r\n\tmat4 matMVP=matVP*getBoneTransform();\r\n\tvec4 p0 = matMVP*vec4(position,1);\r\n\tvec4 p1 = matMVP*vec4(position+normal,1);\r\n\tp0.xy/=p0.w;\r\n\tp1.xy/=p1.w;\r\n\tfloat coeff=(512./2.0)*distance(p0.xy,p1.xy);\r\n\tif(coeff > 1.0) coeff = 1.0/coeff;\r\n\tcoeff*=u_edgeSize*edgeScaling;\r\n\tgl_Position = matMVP*vec4(position + coeff*normal,1);\r\n}\r\n"

/***/ },
/* 169 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\r\nuniform vec4 u_edgeColor;\r\n\r\nvoid main(void)\r\n{\r\n   gl_FragColor=u_edgeColor;\r\n}"

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var PMXBone = __webpack_require__(171);
	var AssociativeArray = __webpack_require__(8);
	var JThreeContextProxy = __webpack_require__(67);
	var TextureFormat = __webpack_require__(105);
	var ElementFormat = __webpack_require__(106);
	var PMXSkeleton = (function () {
	    function PMXSkeleton(model) {
	        this.rootBones = [];
	        this.boneDictionary = new AssociativeArray();
	        var bones = model.ModelData.Bones;
	        this.bones = new Array(model.ModelData.Bones.length);
	        this.bonesInTransformOrder = new Array(model.ModelData.Bones.length);
	        this.matricies = new Float32Array(model.ModelData.Bones.length * 16);
	        for (var i = 0; i < bones.length; i++) {
	            var bone = bones[i];
	            var pmxBone = new PMXBone(model, this, i);
	            if (bone.parentBoneIndex == -1) {
	                this.rootBones.push(pmxBone);
	            }
	            this.bonesInTransformOrder[i] = this.bones[i] = pmxBone;
	            this.boneDictionary.set(bone.boneName, pmxBone);
	        }
	        this.bones.forEach(function (v) { return v.boneDictionaryConstructed(); });
	        this.bonesInTransformOrder.sort(function (a, b) { return a.OrderCriteria - b.OrderCriteria; });
	        var j3 = JThreeContextProxy.getJThreeContext();
	        this.matrixTexture = j3.ResourceManager.createTexture("jthree.pmx.bonetransform" + model.ID, 4, this.bones.length, TextureFormat.RGBA, ElementFormat.Float);
	    }
	    Object.defineProperty(PMXSkeleton.prototype, "MatrixTexture", {
	        get: function () {
	            return this.matrixTexture;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMXSkeleton.prototype, "BoneCount", {
	        get: function () {
	            return this.bones.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PMXSkeleton.prototype.getBoneByName = function (name) {
	        return this.boneDictionary.get(name);
	    };
	    PMXSkeleton.prototype.getBoneByIndex = function (index) {
	        return this.bones[index];
	    };
	    PMXSkeleton.prototype.updateMatricies = function () {
	        for (var i = 0; i < this.bones.length; i++) {
	            this.bones[i].applyMatrixToBuffer(this.matricies);
	        }
	        this.matrixTexture.updateTexture(this.matricies);
	    };
	    PMXSkeleton.prototype.structureToString = function () {
	        var result = "";
	        this.rootBones.forEach(function (v) { return result += v.structureToString(0); });
	        return result;
	    };
	    return PMXSkeleton;
	})();
	module.exports = PMXSkeleton;


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var SceneObject = __webpack_require__(53);
	var PMXBoneTransformer = __webpack_require__(172);
	var PMXBone = (function (_super) {
	    __extends(PMXBone, _super);
	    function PMXBone(model, skeleton, boneIndex) {
	        _super.call(this, new PMXBoneTransformer(this));
	        this.targetModel = model;
	        this.targetSkeleton = skeleton;
	        this.boneIndex = boneIndex;
	    }
	    Object.defineProperty(PMXBone.prototype, "TargetBoneData", {
	        get: function () {
	            return this.targetModel.ModelData.Bones[this.boneIndex];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMXBone.prototype, "IsRootBone", {
	        get: function () {
	            return this.TargetBoneData.parentBoneIndex == -1;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMXBone.prototype, "OrderCriteria", {
	        get: function () {
	            return this.boneIndex + this.TargetBoneData.transformLayer * this.targetModel.ModelData.Bones.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMXBone.prototype, "AfterPhysics", {
	        get: function () {
	            return (this.TargetBoneData.boneFlag & 0x1000) > 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PMXBone.prototype.boneDictionaryConstructed = function () {
	        if (this.IsRootBone) {
	            this.targetModel.addChild(this);
	        }
	        else {
	            this.targetSkeleton.getBoneByIndex(this.TargetBoneData.parentBoneIndex).addChild(this);
	        }
	    };
	    PMXBone.prototype.structureToString = function (layer) {
	        var result = "";
	        for (var i = 0; i < layer; i++)
	            result += "  ";
	        result += this.toString() + '\n';
	        var arr = this.Children.asArray();
	        for (var index = 0; index < arr.length; index++) {
	            if (typeof arr[index] !== 'undefined')
	                result += arr[index].structureToString(layer + 1);
	        }
	        return result;
	    };
	    PMXBone.prototype.toString = function () {
	        return this.TargetBoneData.boneName + "(" + this.TargetBoneData.boneNameEn + ")";
	    };
	    PMXBone.prototype.applyMatrixToBuffer = function (buffer) {
	        if (!this.Transformer.transformUpdated)
	            return;
	        for (var i = 0; i < 16; i++) {
	            buffer[16 * this.boneIndex + i] = this.Transformer.LocalToGlobal.rawElements[i];
	        }
	        this.Transformer.transformUpdated = false;
	    };
	    return PMXBone;
	})(SceneObject);
	module.exports = PMXBone;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Transformer = __webpack_require__(55);
	var PMXBoneTransformer = (function (_super) {
	    __extends(PMXBoneTransformer, _super);
	    function PMXBoneTransformer() {
	        _super.apply(this, arguments);
	        this.transformUpdated = false;
	    }
	    PMXBoneTransformer.prototype.updateTransform = function () {
	        _super.prototype.updateTransform.call(this);
	        this.transformUpdated = true;
	    };
	    return PMXBoneTransformer;
	})(Transformer);
	module.exports = PMXBoneTransformer;


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	var PMXMorph = __webpack_require__(174);
	var AssociativeArray = __webpack_require__(8);
	var PMXMorphManager = (function () {
	    function PMXMorphManager(model) {
	        this.morphsDictionary = new AssociativeArray();
	        this.postProcessFlag = [false, false, false, false, false, false, false, false, false];
	        this.model = model;
	        this.morphs = new Array(model.ModelData.Morphs.length);
	        for (var i = 0; i < model.ModelData.Morphs.length; ++i) {
	            this.morphs[i] = PMXMorph.CreateMorph(model, i, this);
	            if (this.morphs[i] != null)
	                this.morphsDictionary.set(this.morphs[i].MorphName, this.morphs[i]);
	        }
	    }
	    ;
	    PMXMorphManager.prototype.applyMorph = function () {
	        for (var i = 0; i < this.morphs.length; ++i) {
	            if (this.morphs[i] != null)
	                this.morphs[i].update();
	        }
	        for (var i = 0; i < this.postProcessFlag.length; i++) {
	            if (this.postProcessFlag[i]) {
	                PMXMorph.PostProcess(this.model, i);
	                this.postProcessFlag[i] = false;
	            }
	        }
	    };
	    PMXMorphManager.prototype.getMorphByName = function (name) {
	        return this.morphsDictionary.get(name);
	    };
	    PMXMorphManager.prototype.getMorphByIndex = function (index) {
	        return this.morphs[index];
	    };
	    return PMXMorphManager;
	})();
	module.exports = PMXMorphManager;


/***/ },
/* 174 */
/***/ function(module, exports) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var PMXMorph = (function () {
	    function PMXMorph(pmxModel, index, morphManager) {
	        this.progress = 0;
	        this.progressCurrentCache = 0;
	        this.model = pmxModel;
	        this.morphIndex = index;
	        this.morphManager = morphManager;
	    }
	    PMXMorph.CreateMorph = function (model, index, morphManager) {
	        var morphData = model.ModelData.Morphs[index];
	        switch (morphData.morphKind) {
	            case 0:
	                return new PMXGroupMorph(model, index, morphManager);
	            case 1:
	                return new PMXVertexMorph(model, index, morphManager);
	            case 3:
	                return new PMXUVMorph(model, index, morphManager);
	            case 8:
	                return new PMXMaterialMorph(model, index, morphManager);
	            default:
	                return null;
	        }
	    };
	    PMXMorph.PostProcess = function (model, morphType) {
	        switch (morphType) {
	            case 1:
	                PMXVertexMorph.PostProcess(model);
	                return;
	            case 2:
	                PMXUVMorph.PostProcess(model);
	                return;
	        }
	    };
	    Object.defineProperty(PMXMorph.prototype, "Progress", {
	        get: function () {
	            return this.progress;
	        },
	        set: function (val) {
	            if (this.progressCurrentCache != val) {
	                this.progressCurrentCache = val;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMXMorph.prototype, "MorphName", {
	        get: function () {
	            return this.TargetMorphData.morphName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PMXMorph.prototype, "TargetMorphData", {
	        get: function () {
	            return this.model.ModelData.Morphs[this.morphIndex];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PMXMorph.prototype.update = function () {
	        if (this.progress != this.progressCurrentCache) {
	            this.updateProgress(this.progressCurrentCache, this.progress);
	            this.progress = this.progressCurrentCache;
	            this.morphManager.postProcessFlag[this.TargetMorphData.morphKind] = true;
	        }
	    };
	    PMXMorph.prototype.updateProgress = function (current, last) {
	    };
	    return PMXMorph;
	})();
	var PMXVertexMorph = (function (_super) {
	    __extends(PMXVertexMorph, _super);
	    function PMXVertexMorph() {
	        _super.apply(this, arguments);
	    }
	    PMXVertexMorph.PostProcess = function (model) {
	        model.Geometry.updatePositionBuffer();
	    };
	    PMXVertexMorph.prototype.updateProgress = function (current, last) {
	        var ratio = current - last;
	        for (var i = 0; i < this.TargetMorphData.morphOffsetCount; ++i) {
	            var vm = this.TargetMorphData.vertexMorph[i];
	            this.model.Geometry.positionBuferSource[3 * vm.vertexIndex + 0] += vm.vertexOffset[0] * ratio;
	            this.model.Geometry.positionBuferSource[3 * vm.vertexIndex + 1] += vm.vertexOffset[1] * ratio;
	            this.model.Geometry.positionBuferSource[3 * vm.vertexIndex + 2] += vm.vertexOffset[2] * ratio;
	        }
	    };
	    return PMXVertexMorph;
	})(PMXMorph);
	var PMXUVMorph = (function (_super) {
	    __extends(PMXUVMorph, _super);
	    function PMXUVMorph() {
	        _super.apply(this, arguments);
	    }
	    PMXUVMorph.PostProcess = function (model) {
	        model.Geometry.updateUVBuffer();
	    };
	    PMXUVMorph.prototype.updateProgress = function (current, last) {
	        var ratio = current - last;
	        for (var i = 0; i < this.TargetMorphData.morphOffsetCount; ++i) {
	            var vm = this.TargetMorphData.uvMorph[i];
	            this.model.Geometry.uvBufferSource[3 * vm.vertexIndex + 0] += vm.uvOffset[0] * ratio;
	            this.model.Geometry.uvBufferSource[3 * vm.vertexIndex + 1] += vm.uvOffset[1] * ratio;
	            this.model.Geometry.uvBufferSource[3 * vm.vertexIndex + 2] += vm.uvOffset[2] * ratio;
	        }
	    };
	    return PMXUVMorph;
	})(PMXMorph);
	var PMXGroupMorph = (function (_super) {
	    __extends(PMXGroupMorph, _super);
	    function PMXGroupMorph() {
	        _super.apply(this, arguments);
	    }
	    PMXGroupMorph.prototype.updateProgress = function (current, last) {
	        var ratio = current - last;
	        for (var i = 0; i < this.TargetMorphData.morphOffsetCount; ++i) {
	            var vm = this.TargetMorphData.groupMorph[i];
	            this.morphManager.getMorphByIndex(vm.morphIndex).Progress += ratio * vm.morphRate;
	        }
	    };
	    return PMXGroupMorph;
	})(PMXMorph);
	var PMXMaterialMorph = (function (_super) {
	    __extends(PMXMaterialMorph, _super);
	    function PMXMaterialMorph() {
	        _super.apply(this, arguments);
	    }
	    PMXMaterialMorph.prototype.updateProgress = function (current, last) {
	        var ratio = current - last;
	        for (var i = 0; i < this.TargetMorphData.morphOffsetCount; ++i) {
	            var vm = this.TargetMorphData.materialMorph[i];
	            if (vm.materialIndex == -1) {
	                var targetMaterials = this.model.Materials;
	            }
	            else {
	                var targetMaterials = [this.model.getPMXMaterialByIndex(vm.materialIndex)];
	            }
	            for (var j = 0; j < targetMaterials.length; j++) {
	                var targetMaterial = targetMaterials[j];
	                var target = vm.operationType == 1 ? targetMaterial.addMorphParam : targetMaterial.mulMorphParam;
	                target.edgeSize += ratio * (vm.edgeSize + vm.operationType - 1);
	                this.assignMorphValues(3, target.ambient, vm.ambient, ratio, vm.operationType);
	                this.assignMorphValues(4, target.diffuse, vm.diffuse, ratio, vm.operationType);
	                this.assignMorphValues(4, target.specular, vm.specular, ratio, vm.operationType);
	                this.assignMorphValues(4, target.edgeColor, vm.edgeColor, ratio, vm.operationType);
	                this.assignMorphValues(4, target.textureCoeff, vm.textureCoefficient, ratio, vm.operationType);
	                this.assignMorphValues(4, target.sphereCoeff, vm.sphereTextureCoefficient, ratio, vm.operationType);
	                this.assignMorphValues(4, target.toonCoeff, vm.toonTextureCoefficient, ratio, vm.operationType);
	            }
	        }
	    };
	    PMXMaterialMorph.prototype.assignMorphValues = function (vecLength, target, morphValues, ratio, opType) {
	        for (var i = 0; i < vecLength; i++) {
	            target[i] += ratio * (morphValues[i] + opType - 1);
	        }
	    };
	    return PMXMaterialMorph;
	})(PMXMorph);
	module.exports = PMXMorph;


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GomlTreeNodeBase = __webpack_require__(60);
	var ComponentsNode = (function (_super) {
	    __extends(ComponentsNode, _super);
	    function ComponentsNode(elem, loader, parent) {
	        _super.call(this, elem, loader, parent);
	        this.componentTarget = parent;
	    }
	    Object.defineProperty(ComponentsNode.prototype, "ComponentTarget", {
	        get: function () {
	            return this.componentTarget;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ComponentsNode;
	})(GomlTreeNodeBase);
	module.exports = ComponentsNode;


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var TagFactory = __webpack_require__(66);
	var ComponentTagFactory = (function (_super) {
	    __extends(ComponentTagFactory, _super);
	    function ComponentTagFactory() {
	        _super.apply(this, arguments);
	    }
	    ComponentTagFactory.prototype.CreateNodeForThis = function (elem, loader, parent) {
	        if (parent.getTypeName() === "ComponentsNode") {
	            var castedParent = parent;
	            return new this.nodeType(elem, loader, parent, castedParent.ComponentTarget);
	        }
	    };
	    return ComponentTagFactory;
	})(TagFactory);
	module.exports = ComponentTagFactory;


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GomlTreeNodeBase = __webpack_require__(60);
	var ComponentNode = (function (_super) {
	    __extends(ComponentNode, _super);
	    function ComponentNode(elem, loader, parent, componentTarget) {
	        var _this = this;
	        _super.call(this, elem, loader, parent);
	        this.awakenCache = false;
	        this.cachedOrder = 1000;
	        this.cachedEnabled = undefined;
	        this.updateDelegate = function () { };
	        this.startCalled = false;
	        this.startDelegate = function () { };
	        this.awakeDelegate = function () { };
	        this.onEnabledDelegate = function () { };
	        this.onDisabledDelegate = function () { };
	        this.componentTarget = componentTarget;
	        this.componentName = elem.getAttribute("name");
	        if (this.componentName) {
	            var component = loader.componentRegistry.getComponent(this.componentName);
	            if (component) {
	                if (typeof component.order !== 'undefined')
	                    this.cachedOrder = component.order;
	                if (typeof component.enabled !== 'undefined')
	                    var componentEnabled = component.enabled;
	                else
	                    componentEnabled = true;
	                if (typeof component.awake === 'function')
	                    this.awakeDelegate = component.awake;
	                if (typeof component.update === 'function')
	                    this.updateDelegate = component.update;
	                if (typeof component.start === 'function')
	                    this.startDelegate = component.start;
	                if (typeof component.onEnabled === 'function')
	                    this.onEnabledDelegate = component.onEnabled;
	                if (typeof component.onDisabled === 'function')
	                    this.onDisabledDelegate = component.onDisabled;
	                this.attributes.defineAttribute({
	                    "enabled": {
	                        converter: "boolean",
	                        value: componentEnabled,
	                        handler: function (v) {
	                            if (v.Value === _this.enabled && typeof v.Value === 'undefined') {
	                                _this.cachedEnabled = true;
	                                _this.onEnabled(_this.componentTarget);
	                            }
	                            if (v.Value === _this.enabled)
	                                return;
	                            if (v.Value)
	                                _this.onEnabled(_this.componentTarget);
	                            else
	                                _this.onDisabled(_this.componentTarget);
	                            _this.enabled = v.Value;
	                        }
	                    }
	                });
	                for (var attrKey in component.attributes) {
	                    var attr = component.attributes[attrKey];
	                    if (ComponentNode.ignoreNode.indexOf(attrKey) !== -1 || this.attributes.isDefined(attrKey)) {
	                        console.error("attribute name '" + attrKey + "' is protected attribute name. please change name");
	                        continue;
	                    }
	                    var newHandler = attr.handler ?
	                        function (v) {
	                            _this[attrKey] = v.Value;
	                            attr.handler(v);
	                        }
	                        :
	                            function (v) {
	                                _this[attrKey] = v.Value;
	                            };
	                    var attributeBody = {
	                        converter: attr.converter,
	                        value: attr.value,
	                        handler: newHandler
	                    };
	                    var attributeContainer = {};
	                    attributeContainer[attrKey] = attributeBody;
	                    this.attributes.defineAttribute(attributeContainer);
	                }
	                componentTarget.addComponent(this);
	                this.attributes.applyDefaultValue();
	            }
	            else {
	                console.warn("component\"" + elem.getAttribute("name") + "\" is not found.");
	            }
	        }
	        else {
	            console.warn("component name was not specified");
	        }
	    }
	    Object.defineProperty(ComponentNode.prototype, "ComponentName", {
	        get: function () {
	            return this.componentName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ComponentNode.prototype, "awaken", {
	        get: function () {
	            return this.awakenCache;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ComponentNode.prototype, "order", {
	        get: function () {
	            return this.cachedOrder;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ComponentNode.prototype, "enabled", {
	        get: function () {
	            return this.cachedEnabled;
	        },
	        set: function (en) {
	            this.cachedEnabled = en;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ComponentNode.prototype.update = function (target) {
	        if (!this.startCalled)
	            this.start(target);
	        this.updateDelegate(target);
	    };
	    ComponentNode.prototype.start = function (target) {
	        this.startDelegate(target);
	        this.startCalled = true;
	    };
	    ComponentNode.prototype.awake = function (target) {
	        this.awakeDelegate(target);
	        this.awakenCache = true;
	    };
	    ComponentNode.prototype.onEnabled = function (target) {
	        this.onEnabledDelegate(target);
	    };
	    ComponentNode.prototype.onDisabled = function (target) {
	        this.onDisabledDelegate(target);
	    };
	    ComponentNode.ignoreNode = ["name", "cachedOrder", "cachedEnabled", "children", "parent", "loader", "element"];
	    return ComponentNode;
	})(GomlTreeNodeBase);
	module.exports = ComponentNode;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var TagFactory = __webpack_require__(66);
	var TemplateTagFactory = (function (_super) {
	    __extends(TemplateTagFactory, _super);
	    function TemplateTagFactory() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(TemplateTagFactory.prototype, "NoNeedParseChildren", {
	        get: function () {
	            return true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return TemplateTagFactory;
	})(TagFactory);
	module.exports = TemplateTagFactory;


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GomlTreeNodeBase = __webpack_require__(60);
	var TemplateNode = (function (_super) {
	    __extends(TemplateNode, _super);
	    function TemplateNode(elem, loader, parent) {
	        _super.call(this, elem, loader, parent);
	        this.templateGoml = "";
	        var name = elem.getAttribute("name");
	        if (name) {
	            loader.nodeRegister.addObject("jthree.template", name, this);
	            this.templateGoml = elem.innerHTML;
	        }
	        else {
	            console.error("template tag should be specified name.");
	        }
	    }
	    Object.defineProperty(TemplateNode.prototype, "TemplateGoml", {
	        get: function () {
	            return this.templateGoml;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TemplateNode.prototype.GetGomlToInstanciate = function (instanciateParent) {
	        var valueMap = {};
	        var templateAttributes = this.element.attributes;
	        for (var i = 0; i < templateAttributes.length; i++) {
	            var attribute = templateAttributes.item(i);
	            if (TemplateNode.templateIgnore.indexOf(attribute.name) === -1) {
	                valueMap[attribute.name] = attribute.value;
	            }
	        }
	        var instanciateParentAttributes = instanciateParent.attributes;
	        for (var i = 0; i < instanciateParentAttributes.length; i++) {
	            var attribute = instanciateParentAttributes.item(i);
	            if (TemplateNode.parentIgnore.indexOf(attribute.name) === -1) {
	                valueMap[attribute.name] = attribute.value;
	            }
	        }
	        var replaceTarget = this.TemplateGoml;
	        for (var replaceKey in valueMap) {
	            var value = valueMap[replaceKey];
	            replaceTarget = replaceTarget.replace("{{" + replaceKey + "}}", value);
	        }
	        return replaceTarget;
	    };
	    TemplateNode.parentIgnore = ["template"];
	    TemplateNode.templateIgnore = ["name"];
	    return TemplateNode;
	})(GomlTreeNodeBase);
	module.exports = TemplateNode;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var TagFactory = __webpack_require__(66);
	var PMXMorphTagFactory = (function (_super) {
	    __extends(PMXMorphTagFactory, _super);
	    function PMXMorphTagFactory() {
	        _super.apply(this, arguments);
	    }
	    PMXMorphTagFactory.prototype.CreateNodeForThis = function (elem, loader, parent) {
	        if (parent.getTypeName() === "PMXMorphsNode") {
	            var castedParent = parent;
	            return new this.nodeType(elem, loader, parent, castedParent.TargetPMXNode);
	        }
	    };
	    return PMXMorphTagFactory;
	})(TagFactory);
	module.exports = PMXMorphTagFactory;


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GomlTreeNodeBase = __webpack_require__(60);
	var PMXMorphNode = (function (_super) {
	    __extends(PMXMorphNode, _super);
	    function PMXMorphNode(elem, loader, parent, pmx) {
	        var _this = this;
	        _super.call(this, elem, loader, parent);
	        this.targetPMX = pmx;
	        this.targetPMX.onPMXTargetUpdate(function (e, o) { _this.attributes.updateValue(); });
	        this.attributes.defineAttribute({
	            "name": {
	                value: "",
	                converter: "string"
	            },
	            "value": {
	                value: 0,
	                converter: "number",
	                handler: function (v) {
	                    if (_this.targetPMX.PMXModelReady) {
	                        var key = _this.attributes.getValue("name");
	                        var target = _this.targetPMX.PMXModel.MorphManager.getMorphByName(key);
	                        if (target != null) {
	                            target.Progress = v.Value;
	                        }
	                    }
	                }
	            }
	        });
	    }
	    return PMXMorphNode;
	})(GomlTreeNodeBase);
	module.exports = PMXMorphNode;


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var TagFactory = __webpack_require__(66);
	var PMXBoneTagFactory = (function (_super) {
	    __extends(PMXBoneTagFactory, _super);
	    function PMXBoneTagFactory() {
	        _super.apply(this, arguments);
	    }
	    PMXBoneTagFactory.prototype.CreateNodeForThis = function (elem, loader, parent) {
	        if (parent.getTypeName() === "PMXBonesNode") {
	            var castedParent = parent;
	            return new this.nodeType(elem, loader, parent, castedParent.TargetPMXNode);
	        }
	    };
	    return PMXBoneTagFactory;
	})(TagFactory);
	module.exports = PMXBoneTagFactory;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var SceneObjectNodeBase = __webpack_require__(59);
	var PMXBoneNode = (function (_super) {
	    __extends(PMXBoneNode, _super);
	    function PMXBoneNode(elem, loader, parent, pmx) {
	        var _this = this;
	        _super.call(this, elem, loader, parent, pmx.ContainedSceneNode, pmx);
	        this.targetPMX = pmx;
	        this.targetPMX.onPMXTargetUpdate(function (e, o) { _this.attributes.updateValue(); });
	        this.attributes.defineAttribute({
	            "name": {
	                value: "",
	                converter: "string",
	                handler: function (v) {
	                    if (!_this.targetPMX.PMXModelReady)
	                        return;
	                    var bone = _this.targetPMX.PMXModel.Skeleton.getBoneByName(v.Value);
	                    if (bone != null && bone != _this.targetSceneObject) {
	                        _this.targetSceneObject = bone;
	                        _super.prototype.beforeLoad.call(_this);
	                    }
	                }
	            }
	        });
	    }
	    PMXBoneNode.prototype.ConstructTarget = function () {
	        return this.targetSceneObject;
	    };
	    return PMXBoneNode;
	})(SceneObjectNodeBase);
	module.exports = PMXBoneNode;


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GomlTreeNodeBase = __webpack_require__(60);
	var PMXMorphsNode = (function (_super) {
	    __extends(PMXMorphsNode, _super);
	    function PMXMorphsNode(elem, loader, parent) {
	        _super.call(this, elem, loader, parent);
	        this.targetPMXNode = parent;
	    }
	    Object.defineProperty(PMXMorphsNode.prototype, "TargetPMXNode", {
	        get: function () {
	            return this.targetPMXNode;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return PMXMorphsNode;
	})(GomlTreeNodeBase);
	module.exports = PMXMorphsNode;


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var GomlTreeNodeBase = __webpack_require__(60);
	var PMXBonesNode = (function (_super) {
	    __extends(PMXBonesNode, _super);
	    function PMXBonesNode(elem, loader, parent) {
	        _super.call(this, elem, loader, parent);
	        this.targetPMXNode = parent;
	    }
	    Object.defineProperty(PMXBonesNode.prototype, "TargetPMXNode", {
	        get: function () {
	            return this.targetPMXNode;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return PMXBonesNode;
	})(GomlTreeNodeBase);
	module.exports = PMXBonesNode;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var JThreeCollection = __webpack_require__(54);
	var JThreeObjectWithID = __webpack_require__(31);
	var ComponentNodePair = (function (_super) {
	    __extends(ComponentNodePair, _super);
	    function ComponentNodePair(component, target) {
	        _super.call(this, component.ID);
	        this.component = component;
	        this.targetNode = target;
	    }
	    Object.defineProperty(ComponentNodePair.prototype, "Component", {
	        get: function () {
	            return this.component;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ComponentNodePair.prototype, "Target", {
	        get: function () {
	            return this.targetNode;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ComponentNodePair;
	})(JThreeObjectWithID);
	var ComponentRunner = (function (_super) {
	    __extends(ComponentRunner, _super);
	    function ComponentRunner() {
	        _super.apply(this, arguments);
	        this.dictionary = new JThreeCollection();
	        this.sortedComponents = [];
	    }
	    ComponentRunner.prototype.sortComponents = function () {
	        this.sortedComponents.sort(function (v1, v2) { return v1.Component.order - v2.Component.order; });
	    };
	    ComponentRunner.prototype.addComponent = function (node, target) {
	        var componentPair = new ComponentNodePair(node, target);
	        this.dictionary.insert(componentPair);
	        this.sortedComponents.push(componentPair);
	        this.sortComponents();
	        if (!node.awaken)
	            node.awake.call(node, target);
	    };
	    ComponentRunner.prototype.executeForAllComponents = function (componentName) {
	        this.sortedComponents.forEach(function (v) {
	            if (v.Component.enabled) {
	                v.Component[componentName](v.Target);
	            }
	        });
	    };
	    return ComponentRunner;
	})(JThreeObject);
	module.exports = ComponentRunner;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var AssociativeArray = __webpack_require__(8);
	var agent = __webpack_require__(121);
	var PluginLoader = (function () {
	    function PluginLoader() {
	        this.plugins = new AssociativeArray();
	    }
	    PluginLoader.prototype.resolvePlugins = function (plugins, completed) {
	        var dependencies = new AssociativeArray();
	        var resolveOrder = [];
	        this.resolveToAll(plugins, dependencies, resolveOrder, function () { return completed(); });
	    };
	    PluginLoader.prototype.resolveToAll = function (plugins, dependency, resolveOrder, onComplete) {
	        var _this = this;
	        if (!plugins) {
	            onComplete();
	            return;
	        }
	        var count = plugins.length;
	        plugins.forEach(function (v) {
	            _this.getDeclaration(v, function (d) {
	                _this.conflictCheck(d, dependency, resolveOrder, function () {
	                    count--;
	                    if (count == 0) {
	                        onComplete();
	                    }
	                });
	            });
	        });
	    };
	    PluginLoader.prototype.conflictCheck = function (current, dependency, resolveOrder, onComplete) {
	        var decl = current;
	        console.warn("resolved:" + decl.name);
	        if (dependency.has(decl.id)) {
	            if (this.needReplace(dependency.get(decl.id), decl)) {
	                dependency.set(decl.id, decl);
	            }
	        }
	        if (decl.dependencies) {
	            this.resolveToAll(decl.dependencies, dependency, resolveOrder, function () {
	                resolveOrder.push(decl);
	                onComplete();
	            });
	        }
	        else {
	            resolveOrder.push(decl);
	            onComplete();
	        }
	    };
	    PluginLoader.prototype.needReplace = function (base, target) {
	        if (base.versionId == target.versionId)
	            return false;
	        if (base.versionId > target.versionId) {
	            console.warn("plugin:" + base.name + " has over 2 different version dependencies which is " + base.versionId + " and " + target.versionId + ".\n jThree will resolve this dependency as version " + base.versionId);
	            return false;
	        }
	        console.warn("plugin:" + base.name + " has over 2 different version dependencies which is " + base.versionId + " and " + target.versionId + ".\n jThree will resolve this dependency as version " + target.versionId);
	        return true;
	    };
	    PluginLoader.prototype.getDeclaration = function (request, success) {
	        return agent.get(request.id + "-" + request.versionId + ".json").end(function (e, r) {
	            success(JSON.parse(r.text));
	        });
	    };
	    return PluginLoader;
	})();
	module.exports = PluginLoader;


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeContextProxy = __webpack_require__(67);
	var jThreeObject = __webpack_require__(5);
	var Buffer = __webpack_require__(195);
	var Shader = __webpack_require__(200);
	var Program = __webpack_require__(202);
	var Texture = __webpack_require__(204);
	var RBO = __webpack_require__(189);
	var ResourceArray = __webpack_require__(212);
	var FBO = __webpack_require__(213);
	var BufferTexture = __webpack_require__(215);
	var TextureFormat = __webpack_require__(105);
	var ElementFormat = __webpack_require__(106);
	var ResourceManager = (function (_super) {
	    __extends(ResourceManager, _super);
	    function ResourceManager() {
	        _super.call(this);
	        this.buffers = new ResourceArray();
	        this.shaders = new ResourceArray();
	        this.programs = new ResourceArray();
	        this.textures = new ResourceArray();
	        this.rbos = new ResourceArray();
	        this.fbos = new ResourceArray();
	    }
	    Object.defineProperty(ResourceManager.prototype, "context", {
	        get: function () {
	            return JThreeContextProxy.getJThreeContext();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ResourceManager.prototype.createBuffer = function (id, target, usage, unitCount, elementType) {
	        var _this = this;
	        return this.buffers.create(id, function () {
	            return Buffer.CreateBuffer(_this.context, target, usage, unitCount, elementType);
	        });
	    };
	    ResourceManager.prototype.getBuffer = function (id) {
	        return this.buffers.get(id);
	    };
	    ResourceManager.prototype.createShader = function (id, source, shaderType) {
	        var _this = this;
	        return this.shaders.create(id, function () {
	            return Shader.CreateShader(_this.context, source, shaderType);
	        });
	    };
	    ResourceManager.prototype.getShader = function (id) {
	        return this.shaders.get(id);
	    };
	    ResourceManager.prototype.hasShader = function (id) {
	        return this.shaders.has(id);
	    };
	    ResourceManager.prototype.createProgram = function (id, shaders) {
	        var _this = this;
	        return this.programs.create(id, function () {
	            return Program.CreateProgram(_this.context, shaders);
	        });
	    };
	    ResourceManager.prototype.getProgram = function (id) {
	        return this.programs.get(id);
	    };
	    ResourceManager.prototype.createTextureWithSource = function (id, source) {
	        var _this = this;
	        return this.textures.create(id, function () {
	            var tex = new Texture(_this.context, source);
	            tex.each(function (v) { return v.init(); });
	            return tex;
	        });
	    };
	    ResourceManager.prototype.getTexture = function (id) {
	        return this.textures.get(id);
	    };
	    ResourceManager.prototype.getTextureHandler = function (id, handler) {
	        this.textures.getHandler(id, handler);
	    };
	    ResourceManager.prototype.createRBO = function (id, width, height) {
	        var _this = this;
	        return this.rbos.create(id, function () {
	            var r = new RBO(_this.context, width, height);
	            r.each(function (v) { return v.init(); });
	            return r;
	        });
	    };
	    ResourceManager.prototype.getRBO = function (id) {
	        return this.rbos.get(id);
	    };
	    ResourceManager.prototype.createFBO = function (id) {
	        var _this = this;
	        return this.fbos.create(id, function () {
	            var fbo = new FBO(_this.context);
	            fbo.each(function (v) { return v.init(); });
	            return fbo;
	        });
	    };
	    ResourceManager.prototype.getFBO = function (id) {
	        return this.fbos.get(id);
	    };
	    ResourceManager.prototype.createTexture = function (id, width, height, texType, elemType) {
	        var _this = this;
	        if (texType === void 0) { texType = TextureFormat.RGBA; }
	        if (elemType === void 0) { elemType = ElementFormat.UnsignedShort4444; }
	        return this.textures.create(id, function () {
	            var bt = new BufferTexture(_this.context, width, height, texType, elemType);
	            bt.each(function (v) { return v.init(); });
	            return bt;
	        });
	    };
	    ResourceManager.prototype.toString = function () {
	        return "buffer:" + this.buffers.toString() + "\nshader:" + this.shaders.toString() + "\nprograms:" + this.programs.toString() + "\ntexture:" + this.textures.toString();
	    };
	    return ResourceManager;
	})(jThreeObject);
	module.exports = ResourceManager;


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var ContextSafeResourceContainer = __webpack_require__(190);
	var RBOWrapper = __webpack_require__(192);
	var RBOInternalFormatType = __webpack_require__(194);
	var RBO = (function (_super) {
	    __extends(RBO, _super);
	    function RBO(context, width, height, format) {
	        if (format === void 0) { format = RBOInternalFormatType.DepthComponent16; }
	        _super.call(this, context);
	        this.width = width;
	        this.height = height;
	        this.format = format;
	        this.initializeForFirst();
	    }
	    Object.defineProperty(RBO.prototype, "Width", {
	        get: function () {
	            return this.width;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RBO.prototype, "Height", {
	        get: function () {
	            return this.height;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RBO.prototype, "Format", {
	        get: function () {
	            return this.format;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RBO.prototype.getInstanceForRenderer = function (renderer) {
	        return new RBOWrapper(renderer, this);
	    };
	    RBO.prototype.disposeResource = function (resource) {
	    };
	    return RBO;
	})(ContextSafeResourceContainer);
	module.exports = RBO;


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var Exceptions = __webpack_require__(9);
	var ListStateChangedType = __webpack_require__(191);
	var AssociativeArray = __webpack_require__(8);
	var ContextSafeResourceContainer = (function (_super) {
	    __extends(ContextSafeResourceContainer, _super);
	    function ContextSafeResourceContainer(context) {
	        _super.call(this);
	        this.context = null;
	        this.cachedObject = new AssociativeArray();
	        this.context = context;
	        this.context.onRendererChanged(this.rendererChanged.bind(this));
	    }
	    Object.defineProperty(ContextSafeResourceContainer.prototype, "Context", {
	        get: function () {
	            return this.context;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ContextSafeResourceContainer.prototype.initializeForFirst = function () {
	        var _this = this;
	        this.context.CanvasManagers.forEach(function (v) {
	            _this.cachedObject.set(v.ID, _this.getInstanceForRenderer(v));
	        });
	    };
	    ContextSafeResourceContainer.prototype.getForContext = function (contextManager) {
	        return this.getForContextID(contextManager.ID);
	    };
	    ContextSafeResourceContainer.prototype.getForContextID = function (id) {
	        if (!this.cachedObject.has(id))
	            console.log("There is no matching object with the ID:" + id);
	        return this.cachedObject.get(id);
	    };
	    ContextSafeResourceContainer.prototype.each = function (act) {
	        this.cachedObject.forEach((function (v, i, a) {
	            act(v);
	        }));
	    };
	    ContextSafeResourceContainer.prototype.rendererChanged = function (object, arg) {
	        switch (arg.ChangeType) {
	            case ListStateChangedType.Add:
	                this.cachedObject.set(arg.AffectedRenderer.ID, this.getInstanceForRenderer(arg.AffectedRenderer));
	                break;
	            case ListStateChangedType.Delete:
	                var delTarget = this.cachedObject.get(arg.AffectedRenderer.ID);
	                this.cachedObject.delete(arg.AffectedRenderer.ID);
	                this.disposeResource(delTarget);
	                break;
	        }
	    };
	    ContextSafeResourceContainer.prototype.getInstanceForRenderer = function (renderer) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    ContextSafeResourceContainer.prototype.disposeResource = function (resource) {
	        throw new Exceptions.AbstractClassMethodCalledException();
	    };
	    return ContextSafeResourceContainer;
	})(JThreeObject);
	module.exports = ContextSafeResourceContainer;


/***/ },
/* 191 */
/***/ function(module, exports) {

	var ListStateChangedType;
	(function (ListStateChangedType) {
	    ListStateChangedType[ListStateChangedType["Add"] = 0] = "Add";
	    ListStateChangedType[ListStateChangedType["Delete"] = 1] = "Delete";
	})(ListStateChangedType || (ListStateChangedType = {}));
	module.exports = ListStateChangedType;


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var ResourceWrapper = __webpack_require__(193);
	var RBOWrapper = (function (_super) {
	    __extends(RBOWrapper, _super);
	    function RBOWrapper(contextManager, parentRBO) {
	        _super.call(this, contextManager);
	        this.parent = parentRBO;
	    }
	    Object.defineProperty(RBOWrapper.prototype, "Target", {
	        get: function () {
	            return this.targetRBO;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RBOWrapper.prototype.init = function () {
	        if (this.Initialized)
	            return;
	        this.targetRBO = this.WebGLContext.CreateRenderBuffer();
	        this.WebGLContext.BindRenderBuffer(this.targetRBO);
	        this.WebGLContext.RenderBufferStorage(this.parent.Format, this.parent.Width, this.parent.Height);
	        this.setInitialized();
	    };
	    return RBOWrapper;
	})(ResourceWrapper);
	module.exports = RBOWrapper;


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var JThreeEvent = __webpack_require__(12);
	var ResourceWrapper = (function (_super) {
	    __extends(ResourceWrapper, _super);
	    function ResourceWrapper(ownerCanvas) {
	        _super.call(this);
	        this.onInitializeChangedEvent = new JThreeEvent();
	        this.ownerCanvas = ownerCanvas;
	    }
	    Object.defineProperty(ResourceWrapper.prototype, "OwnerCanvas", {
	        get: function () {
	            return this.ownerCanvas;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ResourceWrapper.prototype, "OwnerID", {
	        get: function () {
	            return this.ownerCanvas.ID;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ResourceWrapper.prototype, "WebGLContext", {
	        get: function () {
	            return this.ownerCanvas.Context;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ResourceWrapper.prototype.onInitializeChanged = function (handler) {
	        this.onInitializeChangedEvent.addListerner(handler);
	    };
	    Object.defineProperty(ResourceWrapper.prototype, "Initialized", {
	        get: function () {
	            return this.initialized;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ResourceWrapper.prototype.setInitialized = function (initialized) {
	        if (typeof initialized === "undefined")
	            initialized = true;
	        if (initialized === this.initialized)
	            return;
	        this.initialized = initialized;
	        this.onInitializeChangedEvent.fire(this, initialized);
	    };
	    return ResourceWrapper;
	})(JThreeObject);
	module.exports = ResourceWrapper;


/***/ },
/* 194 */
/***/ function(module, exports) {

	var RBOInternalFormat;
	(function (RBOInternalFormat) {
	    RBOInternalFormat[RBOInternalFormat["RGBA4"] = 32854] = "RGBA4";
	    RBOInternalFormat[RBOInternalFormat["RGB565"] = 36194] = "RGB565";
	    RBOInternalFormat[RBOInternalFormat["RGB5A1"] = 32855] = "RGB5A1";
	    RBOInternalFormat[RBOInternalFormat["DepthComponent16"] = 33189] = "DepthComponent16";
	})(RBOInternalFormat || (RBOInternalFormat = {}));
	module.exports = RBOInternalFormat;


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var BufferProxy = __webpack_require__(196);
	var BufferWrapper = __webpack_require__(199);
	var JThreeContextProxy = __webpack_require__(67);
	var ListStateChangedType = __webpack_require__(191);
	var AssociativeArray = __webpack_require__(8);
	var Buffer = (function (_super) {
	    __extends(Buffer, _super);
	    function Buffer() {
	        _super.call(this, null, []);
	        this.normalized = false;
	        this.stride = 0;
	        this.offset = 0;
	        this.bufWrappers = new AssociativeArray();
	        this.length = 0;
	        this.parentBuffer = this;
	    }
	    Buffer.CreateBuffer = function (context, target, usage, unitCount, elementType) {
	        var buf = new Buffer();
	        buf.target = target;
	        buf.usage = usage;
	        buf.unitCount = unitCount;
	        buf.elementType = elementType;
	        context.CanvasManagers.forEach(function (v, i, a) {
	            var wrap = new BufferWrapper(buf, v.Context);
	            buf.managedProxies.push(wrap);
	            buf.bufWrappers.set(v.ID, wrap);
	        });
	        JThreeContextProxy.getJThreeContext().onRendererChanged(buf.changedRenderer);
	        return buf;
	    };
	    Buffer.prototype.changedRenderer = function (arg) {
	        if (arg.ChangeType == ListStateChangedType.Add) {
	            var wrapper = new BufferWrapper(this, arg.AffectedRenderer.Context);
	            wrapper.loadAll();
	        }
	    };
	    Object.defineProperty(Buffer.prototype, "Target", {
	        get: function () {
	            return this.target;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Buffer.prototype, "Usage", {
	        get: function () {
	            return this.usage;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Buffer.prototype, "ElementType", {
	        get: function () {
	            return this.elementType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Buffer.prototype, "Normalized", {
	        get: function () {
	            return this.normalized;
	        },
	        set: function (normalized) {
	            this.normalized = normalized;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Buffer.prototype, "Stride", {
	        get: function () {
	            return this.stride;
	        },
	        set: function (stride) {
	            this.stride = stride;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Buffer.prototype, "Offse", {
	        get: function () {
	            return this.offset;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Buffer.prototype, "Offset", {
	        set: function (offset) {
	            this.offset = offset;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Buffer.prototype, "UnitCount", {
	        get: function () {
	            return this.unitCount;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Buffer.prototype, "BufferWrappers", {
	        get: function () {
	            return this.bufWrappers;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Buffer.prototype, "Length", {
	        get: function () {
	            return this.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Buffer.prototype.update = function (array, length) {
	        this.elementCache = array;
	        this.length = length;
	        this.each(function (a) { return a.update(array, length); });
	    };
	    Buffer.prototype.getForRenderer = function (renderer) {
	        if (!this.bufWrappers.has(renderer.ID)) {
	            var wrap = new BufferWrapper(this, renderer.Context);
	            wrap.loadAll();
	            if (this.elementCache)
	                wrap.update(this.elementCache, this.length);
	            this.addProxy(wrap);
	            this.bufWrappers.set(renderer.ID, wrap);
	        }
	        return this.bufWrappers.get(renderer.ID);
	    };
	    return Buffer;
	})(BufferProxy);
	module.exports = Buffer;


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var ArrayEnumratorFactory = __webpack_require__(197);
	var Collection = __webpack_require__(198);
	var BufferProxy = (function (_super) {
	    __extends(BufferProxy, _super);
	    function BufferProxy(parentBuffer, targetProxies) {
	        var _this = this;
	        _super.call(this, targetProxies);
	        this.proxyHash = 0;
	        targetProxies = this.targetArray = Collection.DistinctArray(targetProxies, function (t) { return _this.proxyHash; });
	        this.managedProxies = targetProxies;
	        targetProxies.forEach(function (v, n, a) {
	            _this.proxyHash += v.proxyHash;
	        });
	        this.parentBuffer = parentBuffer;
	    }
	    Object.defineProperty(BufferProxy.prototype, "ManagedProxies", {
	        get: function () {
	            return Collection.CopyArray(this.managedProxies);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BufferProxy.prototype.update = function (array, length) {
	        this.each(function (a) { return a.update(array, length); });
	    };
	    BufferProxy.prototype.loadAll = function () {
	        this.each(function (a) { return a.loadAll(); });
	    };
	    Object.defineProperty(BufferProxy.prototype, "isAllInitialized", {
	        get: function () {
	            var isIniatilized = true;
	            this.each(function (a) {
	                if (!a.isAllInitialized)
	                    isIniatilized = false;
	            });
	            return isIniatilized;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BufferProxy.prototype.each = function (act) {
	        Collection.foreach(this, function (a, i) { act(a); });
	    };
	    BufferProxy.prototype.addProxy = function (proxy) {
	        var proxies = this.ManagedProxies;
	        var hasTarget = false;
	        proxies.forEach(function (v, n, a) {
	            if (v.proxyHash == proxy.proxyHash)
	                hasTarget = true;
	        });
	        if (!hasTarget)
	            proxies.push(proxy);
	        return new BufferProxy(this.parentBuffer, proxies);
	    };
	    BufferProxy.prototype.deleteProxy = function (proxy) {
	        var proxies = this.ManagedProxies;
	        var resultProxies = [];
	        proxies.forEach(function (v, i, a) {
	            if (proxy.proxyHash != v.proxyHash) {
	                resultProxies.push(v);
	            }
	        });
	        return new BufferProxy(this.parentBuffer, resultProxies);
	    };
	    BufferProxy.prototype.getEnumrator = function () {
	        return _super.prototype.getEnumrator.call(this);
	    };
	    return BufferProxy;
	})(ArrayEnumratorFactory);
	module.exports = BufferProxy;


/***/ },
/* 197 */
/***/ function(module, exports) {

	var ArrayEnumratorFactory = (function () {
	    function ArrayEnumratorFactory(targetArray) {
	        this.targetArray = targetArray;
	    }
	    ArrayEnumratorFactory.prototype.getEnumrator = function () { return new ArrayEnumerable(this.targetArray); };
	    return ArrayEnumratorFactory;
	})();
	var ArrayEnumerable = (function () {
	    function ArrayEnumerable(targetArrary) {
	        this.currentIndex = -1;
	        this.targetArrary = targetArrary;
	    }
	    ArrayEnumerable.prototype.getCurrent = function () {
	        if (this.targetArrary.length > this.currentIndex && this.currentIndex >= 0) {
	            return this.targetArrary[this.currentIndex];
	        }
	    };
	    ArrayEnumerable.prototype.next = function () {
	        this.currentIndex++;
	        if (this.currentIndex >= this.targetArrary.length)
	            return false;
	        return true;
	    };
	    return ArrayEnumerable;
	})();
	module.exports = ArrayEnumratorFactory;


/***/ },
/* 198 */
/***/ function(module, exports) {

	var Collection = (function () {
	    function Collection() {
	    }
	    Collection.foreach = function (collection, act) {
	        var enumerator = collection.getEnumrator();
	        var index = 0;
	        while (enumerator.next()) {
	            act(enumerator.getCurrent(), index);
	            index++;
	        }
	    };
	    Collection.foreachPair = function (col1, col2, act) {
	        var en1 = col1.getEnumrator();
	        var en2 = col2.getEnumrator();
	        var index = 0;
	        while (en1.next() && en2.next()) {
	            act(en1.getCurrent(), en2.getCurrent(), index);
	            index++;
	        }
	    };
	    Collection.CopyArray = function (source) {
	        var dest = new Array(source.length);
	        for (var i = 0; i < source.length; i++) {
	            dest[i] = source[i];
	        }
	        return dest;
	    };
	    Collection.DistinctArray = function (source, ident) {
	        var hashSet = new Set();
	        var resultArray = [];
	        source.forEach(function (v, n, a) {
	            if (!hashSet.has(ident(v))) {
	                resultArray.push(v);
	            }
	        });
	        return resultArray;
	    };
	    return Collection;
	})();
	module.exports = Collection;


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var BufferProxy = __webpack_require__(196);
	var BufferWrapper = (function (_super) {
	    __extends(BufferWrapper, _super);
	    function BufferWrapper(parentBuffer, glContext) {
	        _super.call(this, parentBuffer, []);
	        this.targetBuffer = null;
	        this.length = 0;
	        this.isInitialized = false;
	        this.glContext = glContext;
	        this.targetArray = [this];
	    }
	    Object.defineProperty(BufferWrapper.prototype, "IsInitialized", {
	        get: function () {
	            return this.isInitialized;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BufferWrapper.prototype, "Length", {
	        get: function () {
	            return this.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BufferWrapper.prototype, "UnitCount", {
	        get: function () {
	            return this.parentBuffer.UnitCount;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BufferWrapper.prototype, "ElementType", {
	        get: function () {
	            return this.parentBuffer.ElementType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BufferWrapper.prototype, "Normalized", {
	        get: function () {
	            return this.parentBuffer.Normalized;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BufferWrapper.prototype, "Stride", {
	        get: function () {
	            return this.parentBuffer.Stride;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BufferWrapper.prototype, "Offset", {
	        get: function () {
	            return this.parentBuffer.Offset;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BufferWrapper.prototype, "isAllInitialized", {
	        get: function () { return this.IsInitialized; },
	        enumerable: true,
	        configurable: true
	    });
	    BufferWrapper.prototype.update = function (array, length) {
	        if (!this.isInitialized) {
	            this.loadAll();
	        }
	        this.bindBuffer();
	        this.glContext.BufferData(this.parentBuffer.Target, array.buffer, this.parentBuffer.Usage);
	        this.unbindBuffer();
	        this.length = length;
	    };
	    BufferWrapper.prototype.loadAll = function () {
	        if (this.targetBuffer == null) {
	            this.targetBuffer = this.glContext.CreateBuffer();
	            this.isInitialized = true;
	        }
	    };
	    BufferWrapper.prototype.bindBuffer = function () {
	        if (this.isInitialized) {
	            this.glContext.BindBuffer(this.parentBuffer.Target, this.targetBuffer);
	        }
	        else {
	            this.loadAll();
	            this.glContext.BindBuffer(this.parentBuffer.Target, this.targetBuffer);
	        }
	    };
	    BufferWrapper.prototype.unbindBuffer = function () {
	        if (this.isInitialized) {
	            this.glContext.UnbindBuffer(this.parentBuffer.Target);
	        }
	    };
	    Object.defineProperty(BufferWrapper.prototype, "ManagedProxies", {
	        get: function () { return [this]; },
	        enumerable: true,
	        configurable: true
	    });
	    return BufferWrapper;
	})(BufferProxy);
	module.exports = BufferWrapper;


/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var ContextSafeContainer = __webpack_require__(190);
	var ShaderWrapper = __webpack_require__(201);
	var Shader = (function (_super) {
	    __extends(Shader, _super);
	    function Shader(context) {
	        _super.call(this, context);
	        this.initializeForFirst();
	    }
	    Shader.CreateShader = function (context, source, shaderType) {
	        var shader = new Shader(context);
	        shader.shaderSource = source;
	        shader.shaderType = shaderType;
	        return shader;
	    };
	    Object.defineProperty(Shader.prototype, "ShaderType", {
	        get: function () {
	            return this.shaderType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Shader.prototype, "ShaderSource", {
	        get: function () {
	            return this.shaderSource;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Shader.prototype.loadAll = function () {
	        this.each(function (v) {
	            v.init();
	        });
	    };
	    Shader.prototype.getInstanceForRenderer = function (renderer) {
	        return new ShaderWrapper(this, renderer);
	    };
	    Shader.prototype.disposeResource = function (resource) {
	        resource.dispose();
	    };
	    return Shader;
	})(ContextSafeContainer);
	module.exports = Shader;


/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var ResourceWrapper = __webpack_require__(193);
	var ShaderWrapper = (function (_super) {
	    __extends(ShaderWrapper, _super);
	    function ShaderWrapper(parent, contextManager) {
	        _super.call(this, contextManager);
	        this.targetShader = null;
	        this.parentShader = parent;
	    }
	    Object.defineProperty(ShaderWrapper.prototype, "TargetShader", {
	        get: function () {
	            if (!this.Initialized)
	                this.init();
	            return this.targetShader;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ShaderWrapper.prototype.init = function () {
	        if (!this.Initialized) {
	            this.targetShader = this.WebGLContext.CreateShader(this.parentShader.ShaderType);
	            this.WebGLContext.ShaderSource(this.targetShader, this.parentShader.ShaderSource);
	            this.WebGLContext.CompileShader(this.targetShader);
	            this.setInitialized(true);
	        }
	    };
	    ShaderWrapper.prototype.dispose = function () {
	        if (this.Initialized) {
	            this.WebGLContext.DeleteShader(this.targetShader);
	            this.targetShader = null;
	            this.setInitialized(false);
	        }
	    };
	    return ShaderWrapper;
	})(ResourceWrapper);
	module.exports = ShaderWrapper;


/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var ContextSafeContainer = __webpack_require__(190);
	var ProgramWrapper = __webpack_require__(203);
	var Program = (function (_super) {
	    __extends(Program, _super);
	    function Program(context) {
	        _super.call(this, context);
	        this.attachedShaders = [];
	        this.initializeForFirst();
	    }
	    Object.defineProperty(Program.prototype, "AttachedShaders", {
	        get: function () {
	            return this.attachedShaders;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Program.prototype.attachShader = function (shader) {
	        this.attachedShaders.push(shader);
	    };
	    Program.CreateProgram = function (context, attachShaders) {
	        var program = new Program(context);
	        program.attachedShaders = attachShaders;
	        return program;
	    };
	    Program.prototype.disposeResource = function (resource) {
	        resource.dispose();
	    };
	    Program.prototype.getInstanceForRenderer = function (renderer) {
	        return new ProgramWrapper(this, renderer);
	    };
	    return Program;
	})(ContextSafeContainer);
	module.exports = Program;


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var ResourceWrapper = __webpack_require__(193);
	var AssociativeArray = __webpack_require__(8);
	var TextureRegister = __webpack_require__(111);
	var TextureTargetType = __webpack_require__(114);
	var ProgramWrapper = (function (_super) {
	    __extends(ProgramWrapper, _super);
	    function ProgramWrapper(parent, contextManager) {
	        _super.call(this, contextManager);
	        this.isLinked = false;
	        this.targetProgram = null;
	        this.parentProgram = null;
	        this.attributeLocations = new AssociativeArray();
	        this.uniformLocations = new AssociativeArray();
	        this.parentProgram = parent;
	    }
	    Object.defineProperty(ProgramWrapper.prototype, "TargetProgram", {
	        get: function () {
	            return this.targetProgram;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ProgramWrapper.prototype.init = function () {
	        var _this = this;
	        if (!this.Initialized) {
	            this.targetProgram = this.WebGLContext.CreateProgram();
	            this.parentProgram.AttachedShaders.forEach(function (v, i, a) {
	                _this.WebGLContext.AttachShader(_this.targetProgram, v.getForContextID(_this.OwnerID).TargetShader);
	            });
	            this.setInitialized();
	        }
	    };
	    ProgramWrapper.prototype.dispose = function () {
	        if (this.Initialized) {
	            this.WebGLContext.DeleteProgram(this.targetProgram);
	            this.setInitialized(false);
	            this.targetProgram = null;
	            this.isLinked = false;
	        }
	    };
	    ProgramWrapper.prototype.linkProgram = function () {
	        if (!this.isLinked) {
	            this.WebGLContext.LinkProgram(this.targetProgram);
	            this.isLinked = true;
	        }
	    };
	    ProgramWrapper.prototype.useProgram = function () {
	        if (!this.Initialized) {
	            console.log("useProgram was called, but program was not initialized.");
	            this.init();
	        }
	        if (!this.isLinked) {
	            console.log("useProgram was called, but program was not linked.");
	            this.linkProgram();
	        }
	        this.WebGLContext.UseProgram(this.targetProgram);
	    };
	    ProgramWrapper.prototype.fetchUniformLocation = function (valName) {
	        if (!this.uniformLocations.has(valName)) {
	            this.uniformLocations.set(valName, this.WebGLContext.GetUniformLocation(this.TargetProgram, valName));
	        }
	        return this.uniformLocations.get(valName);
	    };
	    ProgramWrapper.prototype.setUniformMatrix = function (valName, matrix) {
	        this.useProgram();
	        var uniformIndex = this.fetchUniformLocation(valName);
	        this.WebGLContext.UniformMatrix(uniformIndex, matrix);
	    };
	    ProgramWrapper.prototype.setUniform1i = function (valName, num) {
	        this.useProgram();
	        var uniformIndex = this.fetchUniformLocation(valName);
	        this.WebGLContext.Uniform1i(uniformIndex, num);
	    };
	    ProgramWrapper.prototype.setUniform1f = function (valName, num) {
	        this.useProgram();
	        var uniformIndex = this.fetchUniformLocation(valName);
	        this.WebGLContext.Uniform1f(uniformIndex, num);
	    };
	    ProgramWrapper.prototype.setUniformVector = function (valName, vec) {
	        this.useProgram();
	        var uniformIndex = this.fetchUniformLocation(valName);
	        switch (vec.ElementCount) {
	            case 2:
	                this.WebGLContext.UniformVector2(uniformIndex, vec);
	                break;
	            case 3:
	                this.WebGLContext.UniformVector3(uniformIndex, vec);
	                break;
	            case 4:
	                this.WebGLContext.UniformVector4(uniformIndex, vec);
	                break;
	        }
	    };
	    ProgramWrapper.prototype.setUniformVectorArray = function (valName, vec) {
	        this.useProgram();
	        var uniformIndex = this.fetchUniformLocation(valName);
	        if (vec.length === 0)
	            return;
	        switch (vec[0].ElementCount) {
	            case 2:
	                this.WebGLContext.UniformVector2Array(uniformIndex, vec);
	                break;
	            case 3:
	                this.WebGLContext.UniformVector3Array(uniformIndex, vec);
	                break;
	            case 4:
	                this.WebGLContext.UniformVector4Array(uniformIndex, vec);
	                break;
	        }
	    };
	    ProgramWrapper.prototype.setAttributeVerticies = function (valName, buffer) {
	        this.useProgram();
	        buffer.bindBuffer();
	        if (!this.attributeLocations.has(valName)) {
	            this.attributeLocations.set(valName, this.WebGLContext.GetAttribLocation(this.TargetProgram, valName));
	        }
	        var attribIndex = this.attributeLocations.get(valName);
	        this.WebGLContext.EnableVertexAttribArray(attribIndex);
	        this.WebGLContext.VertexAttribPointer(attribIndex, buffer.UnitCount, buffer.ElementType, buffer.Normalized, buffer.Stride, buffer.Offset);
	    };
	    ProgramWrapper.prototype.registerTexture = function (renderer, tex, texNumber, samplerName) {
	        renderer.ContextManager.Context.ActiveTexture(TextureRegister.Texture0 + texNumber);
	        if (tex != null && typeof tex !== 'undefined') {
	            tex.getForContext(renderer.ContextManager).bind();
	        }
	        else {
	            this.WebGLContext.BindTexture(TextureTargetType.Texture2D, null);
	        }
	        this.setUniform1i(samplerName, texNumber);
	    };
	    return ProgramWrapper;
	})(ResourceWrapper);
	module.exports = ProgramWrapper;


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var TextureWrapper = __webpack_require__(205);
	var TextureBase = __webpack_require__(208);
	var Texture = (function (_super) {
	    __extends(Texture, _super);
	    function Texture(context, source) {
	        _super.call(this, context);
	        this.imageSource = null;
	        this.imageSource = source;
	    }
	    Object.defineProperty(Texture.prototype, "ImageSource", {
	        get: function () {
	            return this.imageSource;
	        },
	        set: function (img) {
	            this.imageSource = img;
	            this.each(function (v) { return v.init(true); });
	            this.generateMipmapIfNeed();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Texture.prototype.getInstanceForRenderer = function (contextManager) {
	        var textureWrapper = new TextureWrapper(contextManager, this);
	        return textureWrapper;
	    };
	    return Texture;
	})(TextureBase);
	module.exports = Texture;


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var TextureWrapperBase = __webpack_require__(206);
	var TextureTargetType = __webpack_require__(114);
	var TextureInternalFormat = __webpack_require__(105);
	var TextureType = __webpack_require__(106);
	var TextureWrapper = (function (_super) {
	    __extends(TextureWrapper, _super);
	    function TextureWrapper(contextManager, parent) {
	        _super.call(this, contextManager, parent);
	    }
	    TextureWrapper.prototype.init = function (isChanged) {
	        var parent = this.Parent;
	        if (this.Initialized && !isChanged)
	            return;
	        if (this.TargetTexture == null)
	            this.setTargetTexture(this.WebGLContext.CreateTexture());
	        this.WebGLContext.BindTexture(TextureTargetType.Texture2D, this.TargetTexture);
	        if (parent.ImageSource == null) {
	            this.WebGLContext.TexImage2D(TextureTargetType.Texture2D, 0, TextureInternalFormat.RGBA, 1, 1, 0, TextureType.UnsignedShort4444, null);
	        }
	        else {
	            this.WebGLContext.TexImage2D(TextureTargetType.Texture2D, 0, TextureInternalFormat.RGBA, TextureInternalFormat.RGBA, TextureType.UnsignedByte, parent.ImageSource);
	        }
	        this.applyTextureParameter();
	        this.WebGLContext.BindTexture(TextureTargetType.Texture2D, null);
	        this.setInitialized();
	    };
	    return TextureWrapper;
	})(TextureWrapperBase);
	module.exports = TextureWrapper;


/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var ResourceWrapper = __webpack_require__(193);
	var TextureTargetType = __webpack_require__(114);
	var TextureParameterType = __webpack_require__(207);
	var TextureWrapperBase = (function (_super) {
	    __extends(TextureWrapperBase, _super);
	    function TextureWrapperBase(owner, parent) {
	        _super.call(this, owner);
	        this.targetTexture = null;
	        this.parent = parent;
	        this.parent.onFilterParameterChanged(this.applyTextureParameter.bind(this));
	    }
	    Object.defineProperty(TextureWrapperBase.prototype, "Parent", {
	        get: function () {
	            return this.parent;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TextureWrapperBase.prototype.setTargetTexture = function (texture) {
	        this.targetTexture = texture;
	    };
	    Object.defineProperty(TextureWrapperBase.prototype, "TargetTexture", {
	        get: function () {
	            return this.targetTexture;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TextureWrapperBase.prototype.applyTextureParameter = function () {
	        this.WebGLContext.TexParameteri(TextureTargetType.Texture2D, TextureParameterType.MinFilter, this.parent.MinFilter);
	        this.WebGLContext.TexParameteri(TextureTargetType.Texture2D, TextureParameterType.MagFilter, this.parent.MagFilter);
	        this.WebGLContext.TexParameteri(TextureTargetType.Texture2D, TextureParameterType.WrapS, this.parent.SWrap);
	        this.WebGLContext.TexParameteri(TextureTargetType.Texture2D, TextureParameterType.WrapT, this.parent.TWrap);
	    };
	    TextureWrapperBase.prototype.bind = function () {
	        this.WebGLContext.BindTexture(TextureTargetType.Texture2D, this.targetTexture);
	    };
	    TextureWrapperBase.prototype.init = function () {
	    };
	    return TextureWrapperBase;
	})(ResourceWrapper);
	module.exports = TextureWrapperBase;


/***/ },
/* 207 */
/***/ function(module, exports) {

	var TextureParameterType;
	(function (TextureParameterType) {
	    TextureParameterType[TextureParameterType["MinFilter"] = 10241] = "MinFilter";
	    TextureParameterType[TextureParameterType["MagFilter"] = 10240] = "MagFilter";
	    TextureParameterType[TextureParameterType["WrapS"] = 10242] = "WrapS";
	    TextureParameterType[TextureParameterType["WrapT"] = 10243] = "WrapT";
	})(TextureParameterType || (TextureParameterType = {}));
	module.exports = TextureParameterType;


/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var ContextSafeResourceContainer = __webpack_require__(190);
	var TextureParameterType = __webpack_require__(207);
	var TextureMinFilterType = __webpack_require__(209);
	var TextureMagFilterType = __webpack_require__(210);
	var TextureWrapType = __webpack_require__(211);
	var JThreeEvent = __webpack_require__(12);
	var TextureTargetType = __webpack_require__(114);
	var TextureBase = (function (_super) {
	    __extends(TextureBase, _super);
	    function TextureBase(context) {
	        _super.call(this, context);
	        this.onFilterParameterChangedHandler = new JThreeEvent();
	        this.minFilter = TextureMinFilterType.Linear;
	        this.magFilter = TextureMagFilterType.Linear;
	        this.tWrap = TextureWrapType.ClampToEdge;
	        this.sWrap = TextureWrapType.ClampToEdge;
	        this.flipY = false;
	        this.initializeForFirst();
	    }
	    Object.defineProperty(TextureBase.prototype, "FlipY", {
	        get: function () {
	            return this.flipY;
	        },
	        set: function (val) {
	            this.flipY = val;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TextureBase.prototype, "MinFilter", {
	        get: function () {
	            return this.minFilter;
	        },
	        set: function (value) {
	            if (value === this.minFilter)
	                return;
	            this.minFilter = value;
	            this.onFilterParameterChangedHandler.fire(this, TextureParameterType.MinFilter);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TextureBase.prototype, "MagFilter", {
	        get: function () {
	            return this.magFilter;
	        },
	        set: function (value) {
	            if (value === this.magFilter)
	                return;
	            this.magFilter = value;
	            this.onFilterParameterChangedHandler.fire(this, TextureParameterType.MagFilter);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TextureBase.prototype, "SWrap", {
	        get: function () {
	            return this.sWrap;
	        },
	        set: function (value) {
	            if (this.sWrap === value)
	                return;
	            this.sWrap = value;
	            this.onFilterParameterChangedHandler.fire(this, TextureParameterType.WrapS);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TextureBase.prototype, "TWrap", {
	        get: function () {
	            return this.tWrap;
	        },
	        set: function (value) {
	            if (this.tWrap === value)
	                return;
	            this.tWrap = value;
	            this.onFilterParameterChangedHandler.fire(this, TextureParameterType.WrapT);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TextureBase.prototype.onFilterParameterChanged = function (handler) {
	        this.onFilterParameterChangedHandler.addListerner(handler);
	    };
	    TextureBase.prototype.generateMipmapIfNeed = function () {
	        switch (this.MinFilter) {
	            case TextureMinFilterType.LinearMipmapLinear:
	            case TextureMinFilterType.LinearMipmapNearest:
	            case TextureMinFilterType.NearestMipmapLinear:
	            case TextureMinFilterType.NearestMipmapNearest:
	                this.each(function (v) {
	                    v.bind();
	                    v.OwnerCanvas.Context.GenerateMipmap(TextureTargetType.Texture2D);
	                });
	            default:
	        }
	    };
	    return TextureBase;
	})(ContextSafeResourceContainer);
	module.exports = TextureBase;


/***/ },
/* 209 */
/***/ function(module, exports) {

	var TextureMinFilterType;
	(function (TextureMinFilterType) {
	    TextureMinFilterType[TextureMinFilterType["Nearest"] = 9728] = "Nearest";
	    TextureMinFilterType[TextureMinFilterType["Linear"] = 9729] = "Linear";
	    TextureMinFilterType[TextureMinFilterType["NearestMipmapNearest"] = 9984] = "NearestMipmapNearest";
	    TextureMinFilterType[TextureMinFilterType["LinearMipmapNearest"] = 9985] = "LinearMipmapNearest";
	    TextureMinFilterType[TextureMinFilterType["NearestMipmapLinear"] = 9986] = "NearestMipmapLinear";
	    TextureMinFilterType[TextureMinFilterType["LinearMipmapLinear"] = 9987] = "LinearMipmapLinear";
	})(TextureMinFilterType || (TextureMinFilterType = {}));
	module.exports = TextureMinFilterType;


/***/ },
/* 210 */
/***/ function(module, exports) {

	var TextureMagFilterType;
	(function (TextureMagFilterType) {
	    TextureMagFilterType[TextureMagFilterType["Nearest"] = 9728] = "Nearest";
	    TextureMagFilterType[TextureMagFilterType["Linear"] = 9729] = "Linear";
	})(TextureMagFilterType || (TextureMagFilterType = {}));
	module.exports = TextureMagFilterType;


/***/ },
/* 211 */
/***/ function(module, exports) {

	var TextureWrapType;
	(function (TextureWrapType) {
	    TextureWrapType[TextureWrapType["ClampToEdge"] = 33071] = "ClampToEdge";
	    TextureWrapType[TextureWrapType["MirroredRepeat"] = 33648] = "MirroredRepeat";
	    TextureWrapType[TextureWrapType["Repeat"] = 10497] = "Repeat";
	})(TextureWrapType || (TextureWrapType = {}));
	module.exports = TextureWrapType;


/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var AssociativeArray = __webpack_require__(8);
	var JThreeObject = __webpack_require__(5);
	var ResourceArray = (function (_super) {
	    __extends(ResourceArray, _super);
	    function ResourceArray() {
	        _super.call(this);
	        this.resourceArray = new AssociativeArray();
	        this.handlerArray = new AssociativeArray();
	    }
	    ResourceArray.prototype.create = function (id, creationFunc) {
	        if (this.resourceArray.has(id)) {
	            var resource = this.resourceArray.get(id);
	            return resource;
	        }
	        else {
	            resource = creationFunc();
	            this.resourceArray.set(id, resource);
	            var handlers = this.handlerArray.get(id);
	            if (handlers)
	                handlers.forEach(function (v) { return v(resource); });
	            return resource;
	        }
	    };
	    ResourceArray.prototype.get = function (id) {
	        return this.resourceArray.get(id);
	    };
	    ResourceArray.prototype.has = function (id) {
	        return this.resourceArray.has(id);
	    };
	    ResourceArray.prototype.getHandler = function (id, handler) {
	        if (this.has(id))
	            handler(this.get(id));
	        else {
	            if (this.handlerArray.has(id))
	                this.handlerArray.get(id).push(handler);
	            else {
	                this.handlerArray.set(id, [handler]);
	            }
	        }
	    };
	    ResourceArray.prototype.toString = function () {
	        var logInfo = "";
	        this.resourceArray.forEach(function (v, k, m) {
	            logInfo = logInfo + k + "\n";
	        });
	        return logInfo;
	    };
	    return ResourceArray;
	})(JThreeObject);
	module.exports = ResourceArray;


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var FBOWrapper = __webpack_require__(214);
	var ContextSafeResourceContainer = __webpack_require__(190);
	var FBO = (function (_super) {
	    __extends(FBO, _super);
	    function FBO(context) {
	        _super.call(this, context);
	        this.initializeForFirst();
	    }
	    FBO.prototype.getInstanceForRenderer = function (renderer) {
	        return new FBOWrapper(renderer);
	    };
	    FBO.prototype.disposeResource = function (resource) {
	    };
	    return FBO;
	})(ContextSafeResourceContainer);
	module.exports = FBO;


/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var ResourceWrapper = __webpack_require__(193);
	var ClearTargetType = __webpack_require__(88);
	var FBOWrapper = (function (_super) {
	    __extends(FBOWrapper, _super);
	    function FBOWrapper(renderer) {
	        _super.call(this, renderer);
	        this.glContext = null;
	        this.textures = [];
	        this.glContext = renderer.Context;
	    }
	    Object.defineProperty(FBOWrapper.prototype, "TargetShader", {
	        get: function () {
	            if (!this.Initialized)
	                this.init();
	            return this.targetFBO;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    FBOWrapper.prototype.init = function () {
	        if (!this.Initialized) {
	            this.targetFBO = this.glContext.CreateFrameBuffer();
	            this.glContext.BindFrameBuffer(this.targetFBO);
	            this.setInitialized();
	        }
	    };
	    FBOWrapper.prototype.bind = function () {
	        if (!this.Initialized)
	            this.init();
	        this.WebGLContext.BindFrameBuffer(this.targetFBO);
	    };
	    FBOWrapper.prototype.unbind = function () {
	        var _this = this;
	        this.WebGLContext.BindFrameBuffer(null);
	        this.textures.forEach(function (tex) {
	            tex.getForContext(_this.OwnerCanvas).bind();
	            tex.generateMipmapIfNeed();
	        });
	    };
	    FBOWrapper.prototype.attachTexture = function (attachmentType, tex) {
	        if (!this.Initialized)
	            this.init();
	        this.bind();
	        if (tex == null) {
	            this.WebGLContext.FrameBufferTexture2D(attachmentType, null);
	            return;
	        }
	        this.WebGLContext.FrameBufferTexture2D(attachmentType, tex.getForContext(this.OwnerCanvas).TargetTexture);
	        tex.getForContext(this.OwnerCanvas).bind();
	        tex.generateMipmapIfNeed();
	        if (this.textures.indexOf(tex) !== -1)
	            this.textures.push(tex);
	    };
	    FBOWrapper.prototype.attachRBO = function (attachmentType, rbo) {
	        if (!this.Initialized)
	            this.init();
	        this.bind();
	        if (rbo == null) {
	            this.WebGLContext.FrameBufferRenderBuffer(attachmentType, null);
	            return;
	        }
	        var wrapper = rbo.getForContext(this.OwnerCanvas);
	        this.WebGLContext.FrameBufferRenderBuffer(attachmentType, wrapper.Target);
	    };
	    FBOWrapper.prototype.dispose = function () {
	        if (this.Initialized) {
	            this.targetFBO = null;
	            this.setInitialized(false);
	        }
	    };
	    FBOWrapper.prototype.clear = function (r, g, b, a, d, s) {
	        this.bind();
	        var clearFlag = 0;
	        if (typeof r !== 'undefined' && typeof g !== 'undefined' && typeof b !== 'undefined' && typeof a !== 'undefined') {
	            clearFlag = clearFlag | ClearTargetType.ColorBits;
	            this.glContext.ClearColor(r, g, b, a);
	        }
	        if (typeof d !== 'undefined') {
	            clearFlag = clearFlag | ClearTargetType.DepthBits;
	            this.glContext.ClearDepth(d);
	        }
	        this.glContext.Clear(clearFlag);
	    };
	    return FBOWrapper;
	})(ResourceWrapper);
	module.exports = FBOWrapper;


/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var BufferTextureWrapper = __webpack_require__(216);
	var ElementFormat = __webpack_require__(106);
	var TextureMinFilterType = __webpack_require__(209);
	var TextureMagFilterType = __webpack_require__(210);
	var TextureBase = __webpack_require__(208);
	var BufferTexture = (function (_super) {
	    __extends(BufferTexture, _super);
	    function BufferTexture(context, width, height, textureFormat, elementFormat) {
	        _super.call(this, context);
	        this.width = width;
	        this.height = height;
	        this.textureFormat = textureFormat;
	        this.elementFormat = elementFormat;
	        if (this.elementFormat == ElementFormat.Float) {
	            this.MinFilter = TextureMinFilterType.Nearest;
	            this.MagFilter = TextureMagFilterType.Nearest;
	        }
	    }
	    Object.defineProperty(BufferTexture.prototype, "Width", {
	        get: function () {
	            return this.width;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BufferTexture.prototype, "Height", {
	        get: function () {
	            return this.height;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BufferTexture.prototype, "TextureFormat", {
	        get: function () {
	            return this.textureFormat;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BufferTexture.prototype, "ElementFormat", {
	        get: function () {
	            return this.elementFormat;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BufferTexture.prototype.getInstanceForRenderer = function (contextManager) {
	        var textureWrapper = new BufferTextureWrapper(contextManager, this);
	        return textureWrapper;
	    };
	    BufferTexture.prototype.resize = function (width, height) {
	        if (this.width !== width || this.height !== height) {
	            this.width = width;
	            this.height = height;
	            this.each(function (v) { return v.resize(width, height); });
	        }
	    };
	    BufferTexture.prototype.updateTexture = function (buffer) {
	        this.each(function (t) {
	            t.updateTexture(buffer);
	        });
	    };
	    return BufferTexture;
	})(TextureBase);
	module.exports = BufferTexture;


/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var TargetTextureType = __webpack_require__(114);
	var TextureWrapperBase = __webpack_require__(206);
	var BufferTextureWrapper = (function (_super) {
	    __extends(BufferTextureWrapper, _super);
	    function BufferTextureWrapper(ownerCanvas, parent) {
	        _super.call(this, ownerCanvas, parent);
	    }
	    BufferTextureWrapper.prototype.init = function () {
	        if (this.Initialized)
	            return;
	        var parent = this.Parent;
	        this.setTargetTexture(this.WebGLContext.CreateTexture());
	        this.bind();
	        this.WebGLContext.TexImage2D(TargetTextureType.Texture2D, 0, parent.TextureFormat, parent.Width, parent.Height, 0, parent.ElementFormat, null);
	        this.applyTextureParameter();
	        this.setInitialized();
	    };
	    BufferTextureWrapper.prototype.unbind = function () {
	        this.WebGLContext.BindTexture(TargetTextureType.Texture2D, null);
	    };
	    BufferTextureWrapper.prototype.resize = function (width, height) {
	        this.bind();
	        if (this.WebGLContext.IsTexture(this.TargetTexture)) {
	            var parent = this.Parent;
	            this.WebGLContext.TexImage2D(TargetTextureType.Texture2D, 0, parent.TextureFormat, parent.Width, parent.Height, 0, parent.ElementFormat, null);
	        }
	    };
	    BufferTextureWrapper.prototype.updateTexture = function (buffer) {
	        this.bind();
	        if (this.WebGLContext.IsTexture(this.TargetTexture)) {
	            var parent = this.Parent;
	            this.WebGLContext.TexImage2D(TargetTextureType.Texture2D, 0, parent.TextureFormat, parent.Width, parent.Height, 0, parent.ElementFormat, buffer);
	        }
	    };
	    return BufferTextureWrapper;
	})(TextureWrapperBase);
	module.exports = BufferTextureWrapper;


/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var CanvasListChangedEventArgs = (function (_super) {
	    __extends(CanvasListChangedEventArgs, _super);
	    function CanvasListChangedEventArgs(changeType, affectedRenderer) {
	        _super.call(this);
	        this.changeType = changeType;
	        this.affectedRenderer = affectedRenderer;
	    }
	    Object.defineProperty(CanvasListChangedEventArgs.prototype, "ChangeType", {
	        get: function () {
	            return this.changeType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CanvasListChangedEventArgs.prototype, "AffectedRenderer", {
	        get: function () {
	            return this.affectedRenderer;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return CanvasListChangedEventArgs;
	})(JThreeObject);
	module.exports = CanvasListChangedEventArgs;


/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var jThreeObject = __webpack_require__(5);
	var JThreeContextProxy = __webpack_require__(67);
	var AssociativeArray = __webpack_require__(8);
	var SceneManager = (function (_super) {
	    __extends(SceneManager, _super);
	    function SceneManager() {
	        _super.call(this);
	        this.scenes = new AssociativeArray();
	    }
	    SceneManager.prototype.addScene = function (scene) {
	        if (!this.scenes.has(scene.ID)) {
	            this.scenes.set(scene.ID, scene);
	        }
	    };
	    Object.defineProperty(SceneManager.prototype, "Scenes", {
	        get: function () {
	            return this.scenes.asArray;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SceneManager.prototype.removeScene = function (scene) {
	        if (this.scenes.has(scene.ID)) {
	            this.scenes.delete(scene.ID);
	        }
	    };
	    SceneManager.prototype.renderAll = function () {
	        JThreeContextProxy.getJThreeContext().CanvasManagers.forEach(function (c) { c.beforeRenderAll(); });
	        this.scenes.forEach(function (v) {
	            v.update();
	            v.render();
	        });
	        JThreeContextProxy.getJThreeContext().CanvasManagers.forEach(function (c) { c.afterRenderAll(); });
	    };
	    SceneManager.prototype.toString = function () {
	        console.log(this.scenes);
	        var sceneInfo = "";
	        this.scenes.forEach(function (scene, id) {
	            sceneInfo += "ID:" + id + "\nScene:\n" + scene.toString() + "\n";
	        });
	        return "Scene Informations:\n\n        Scene Count:" + this.scenes.size + "\n\n        Scenes:" + sceneInfo;
	    };
	    return SceneManager;
	})(jThreeObject);
	module.exports = SceneManager;


/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var JThreeObject = __webpack_require__(5);
	var JThreeContextProxy = __webpack_require__(67);
	var JThreeInterface = (function (_super) {
	    __extends(JThreeInterface, _super);
	    function JThreeInterface(jq) {
	        _super.call(this);
	        this.queuedActions = [];
	        this.isExecuting = false;
	        this.target = jq;
	    }
	    JThreeInterface.prototype.dequeue = function () {
	        this.queuedActions.shift();
	        this.isExecuting = false;
	        this.tryStartQueue();
	        return this;
	    };
	    JThreeInterface.prototype.tryStartQueue = function () {
	        if (!this.isExecuting && this.queuedActions.length > 0) {
	            this.isExecuting = true;
	            this.queuedActions[0].call(this);
	        }
	    };
	    JThreeInterface.prototype.queue = function (act) {
	        this.queuedActions.push(act);
	        this.tryStartQueue();
	        return this;
	    };
	    JThreeInterface.prototype.delay = function (time) {
	        var _this = this;
	        this.queue(function () {
	            window.setTimeout(function (t) { t.dequeue(); }, time, _this);
	        });
	        return this;
	    };
	    JThreeInterface.prototype.attr = function (attrTarget) {
	        var _this = this;
	        var f = function (attrTarget) {
	            var t = _this;
	            _this.target.each(function (n, e) {
	                var gomlNode = JThreeInterface.getNode(e);
	                for (var attrName in attrTarget) {
	                    var value = attrTarget[attrName];
	                    if (gomlNode.attributes.isDefined(attrName)) {
	                        gomlNode.attributes.setValue(attrName, value);
	                    }
	                    else {
	                        e.setAttribute(attrName, value);
	                    }
	                }
	            });
	            _this.dequeue();
	        };
	        this.queue(function () { f(attrTarget); });
	        return this;
	    };
	    JThreeInterface.prototype.animate = function (attrTarget, duration, easing, onComplete) {
	        var _this = this;
	        var t = this;
	        var f = function (attrTarget, duration, easing, onComplete) {
	            easing = easing || "linear";
	            for (var i = 0; i < t.target.length; i++) {
	                var e = _this.target[i];
	                for (var attrName in attrTarget) {
	                    var value = attrTarget[attrName];
	                    var gomlNode = JThreeInterface.getNode(e);
	                    if (gomlNode.attributes.isDefined(attrName)) {
	                        var easingFunc = JThreeInterface.Context.GomlLoader.Configurator.getEasingFunction(easing);
	                        JThreeInterface.Context.addAnimater(gomlNode.attributes.getAnimater(attrName, JThreeInterface.Context.Timer.Time, duration, gomlNode.attributes.getValue(attrName), value, easingFunc, function () {
	                            if (onComplete)
	                                onComplete();
	                            t.dequeue();
	                        }));
	                    }
	                }
	            }
	        };
	        this.queue(function () { return f(attrTarget, duration, easing, onComplete); });
	        return this;
	    };
	    JThreeInterface.prototype.find = function (attrTarget) {
	        return new JThreeInterface(this.target.find(attrTarget));
	    };
	    JThreeInterface.prototype.append = function (target) {
	        var newTarget = $(target);
	        this.target.each(function (i, e) {
	            JThreeInterface.Context.GomlLoader.append(newTarget, e);
	        });
	        return new JThreeInterface(newTarget);
	        ;
	    };
	    JThreeInterface.getNode = function (elem) {
	        var id = elem.getAttribute('x-j3-id');
	        return JThreeInterface.Context.GomlLoader.getNode(id);
	    };
	    Object.defineProperty(JThreeInterface, "Context", {
	        get: function () {
	            return JThreeContextProxy.getJThreeContext();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return JThreeInterface;
	})(JThreeObject);
	module.exports = JThreeInterface;


/***/ }
/******/ ]);