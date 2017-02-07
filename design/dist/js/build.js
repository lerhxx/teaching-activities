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
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	var _index = __webpack_require__(3);

	var _index2 = _interopRequireDefault(_index);

	var _vueRouter = __webpack_require__(33);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _index3 = __webpack_require__(34);

	var _index4 = _interopRequireDefault(_index3);

	var _nav = __webpack_require__(41);

	var _nav2 = _interopRequireDefault(_nav);

	var _footer = __webpack_require__(46);

	var _footer2 = _interopRequireDefault(_footer);

	var _ = __webpack_require__(51);

	var _2 = _interopRequireDefault(_);

	var _App = __webpack_require__(53);

	var _App2 = _interopRequireDefault(_App);

	var _signin = __webpack_require__(58);

	var _signin2 = _interopRequireDefault(_signin);

	var _edit = __webpack_require__(64);

	var _edit2 = _interopRequireDefault(_edit);

	__webpack_require__(71);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vueRouter2.default);

	var routes = [{
		path: '/', component: _index4.default, name: 'index'
	}, {
		path: '/404', component: _2.default, name: '404'
	}, {
		path: '/signin', component: _signin2.default, name: 'signin'
	}, {
		path: '/article', component: _signin2.default, name: 'article'
	}, {
		path: '/edit', component: _edit2.default, name: 'edit'
	}];

	var router = new _vueRouter2.default({
		routes: routes,
		linkActiveClass: 'active'
	});

	new _vue2.default({
		router: router,
		store: _index2.default,
		components: {
			Navbar: _nav2.default,
			VFooter: _footer2.default
		},
		render: function render(h) {
			return h(_App2.default);
		}
	}).$mount('#app');

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * Vue.js v2.1.6
	 * (c) 2014-2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.Vue = factory());
	}(this, (function () { 'use strict';

	/*  */

	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function _toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}

	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val, 10);
	  return (n || n === 0) ? n : val
	}

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}

	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);

	/**
	 * Remove an item from an array
	 */
	function remove$1 (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}

	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}

	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}

	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  }
	}

	/**
	 * Camelize a hyphen-delmited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});

	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});

	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	});

	/**
	 * Simple bind, faster than native
	 */
	function bind$1 (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length;
	  return boundFn
	}

	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}

	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}

	/**
	 * Perform no operation.
	 */
	function noop () {}

	/**
	 * Always return false.
	 */
	var no = function () { return false; };

	/**
	 * Return same value
	 */
	var identity = function (_) { return _; };

	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
	  return modules.reduce(function (keys, m) {
	    return keys.concat(m.staticKeys || [])
	  }, []).join(',')
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (
	    isObject(a) && isObject(b)
	      ? JSON.stringify(a) === JSON.stringify(b)
	      : false
	  )
	  /* eslint-enable eqeqeq */
	}

	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}

	/*  */

	var config = {
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),

	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,

	  /**
	   * Whether to enable devtools
	   */
	  devtools: "development" !== 'production',

	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,

	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: null,

	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),

	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,

	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,

	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,

	  /**
	   * Parse the real tag name for the specific platform.
	   */
	  parsePlatformTagName: identity,

	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,

	  /**
	   * List of asset types that a component can own.
	   */
	  _assetTypes: [
	    'component',
	    'directive',
	    'filter'
	  ],

	  /**
	   * List of lifecycle hooks.
	   */
	  _lifecycleHooks: [
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeUpdate',
	    'updated',
	    'beforeDestroy',
	    'destroyed',
	    'activated',
	    'deactivated'
	  ],

	  /**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
	  _maxUpdateCount: 100
	};

	/*  */

	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  } else {
	    var segments = path.split('.');
	    return function (obj) {
	      for (var i = 0; i < segments.length; i++) {
	        if (!obj) { return }
	        obj = obj[segments[i]];
	      }
	      return obj
	    }
	  }
	}

	/*  */
	/* globals MutationObserver */

	// can we use __proto__?
	var hasProto = '__proto__' in {};

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined';
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

	// this needs to be lazy-evaled because vue may be required before
	// vue-server-renderer can set VUE_ENV
	var _isServer;
	var isServerRendering = function () {
	  if (_isServer === undefined) {
	    /* istanbul ignore if */
	    if (!inBrowser && typeof global !== 'undefined') {
	      // detect presence of vue-server-renderer and avoid
	      // Webpack shimming the process
	      _isServer = global['process'].env.VUE_ENV === 'server';
	    } else {
	      _isServer = false;
	    }
	  }
	  return _isServer
	};

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	/* istanbul ignore next */
	function isNative (Ctor) {
	  return /native code/.test(Ctor.toString())
	}

	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;

	  function nextTickHandler () {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    var logError = function (err) { console.error(err); };
	    timerFunc = function () {
	      p.then(nextTickHandler).catch(logError);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop); }
	    };
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = function () {
	      setTimeout(nextTickHandler, 0);
	    };
	  }

	  return function queueNextTick (cb, ctx) {
	    var _resolve;
	    callbacks.push(function () {
	      if (cb) { cb.call(ctx); }
	      if (_resolve) { _resolve(ctx); }
	    });
	    if (!pending) {
	      pending = true;
	      timerFunc();
	    }
	    if (!cb && typeof Promise !== 'undefined') {
	      return new Promise(function (resolve) {
	        _resolve = resolve;
	      })
	    }
	  }
	})();

	var _Set;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] === true
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = true;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };

	    return Set;
	  }());
	}

	var warn = noop;
	var formatComponentName;

	{
	  var hasConsole = typeof console !== 'undefined';

	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ));
	    }
	  };

	  formatComponentName = function (vm) {
	    if (vm.$root === vm) {
	      return 'root instance'
	    }
	    var name = vm._isVue
	      ? vm.$options.name || vm.$options._componentTag
	      : vm.name;
	    return (
	      (name ? ("component <" + name + ">") : "anonymous component") +
	      (vm._isVue && vm.$options.__file ? (" at " + (vm.$options.__file)) : '')
	    )
	  };

	  var formatLocation = function (str) {
	    if (str === 'anonymous component') {
	      str += " - use the \"name\" option for better debugging messages.";
	    }
	    return ("\n(found in " + str + ")")
	  };
	}

	/*  */


	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$1++;
	  this.subs = [];
	};

	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};

	Dep.prototype.removeSub = function removeSub (sub) {
	  remove$1(this.subs, sub);
	};

	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};

	Dep.prototype.notify = function notify () {
	  // stablize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];

	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}

	function popTarget () {
	  Dep.target = targetStack.pop();
	}

	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;

	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments$1[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});

	/*  */

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	};

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 */
	/* istanbul ignore next */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    observerState.shouldConvert &&
	    !isServerRendering() &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  return ob
	}

	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (Array.isArray(value)) {
	          dependArray(value);
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      /* eslint-disable no-self-compare */
	      if (newVal === value || (newVal !== newVal && value !== value)) {
	        return
	      }
	      /* eslint-enable no-self-compare */
	      if ("development" !== 'production' && customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set$1 (obj, key, val) {
	  if (Array.isArray(obj)) {
	    obj.length = Math.max(obj.length, key);
	    obj.splice(key, 1, val);
	    return val
	  }
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return
	  }
	  var ob = obj.__ob__;
	  if (obj._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return
	  }
	  if (!ob) {
	    obj[key] = val;
	    return
	  }
	  defineReactive$$1(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}

	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (obj, key) {
	  var ob = obj.__ob__;
	  if (obj._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(obj, key)) {
	    return
	  }
	  delete obj[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}

	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}

	/*  */

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;

	/**
	 * Options with restrictions
	 */
	{
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}

	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  if (!from) { return to }
	  var key, toVal, fromVal;
	  var keys = Object.keys(from);
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i];
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set$1(to, key, fromVal);
	    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      "development" !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	config._lifecycleHooks.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal
	    ? extend(res, childVal)
	    : res
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child];
	  }
	  return ret
	};

	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret
	};

	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};

	/**
	 * Validate component names
	 */
	function checkComponents (options) {
	  for (var key in options.components) {
	    var lower = key.toLowerCase();
	    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	      warn(
	        'Do not use built-in or reserved HTML elements as component ' +
	        'id: ' + key
	      );
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  }
	  options.props = res;
	}

	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  {
	    checkComponents(child);
	  }
	  normalizeProps(child);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = typeof extendsFrom === 'function'
	      ? mergeOptions(parent, extendsFrom.options, vm)
	      : mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      if (mixin.prototype instanceof Vue$3) {
	        mixin = mixin.options;
	      }
	      parent = mergeOptions(parent, mixin, vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  // check local registration variations first
	  if (hasOwn(assets, id)) { return assets[id] }
	  var camelizedId = camelize(id);
	  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
	  var PascalCaseId = capitalize(camelizedId);
	  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
	  // fallback to prototype chain
	  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
	  if ("development" !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}

	/*  */

	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // handle boolean props
	  if (isBooleanType(prop.type)) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (value === '' || value === hyphenate(key)) {
	      value = true;
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert;
	    observerState.shouldConvert = true;
	    observe(value);
	    observerState.shouldConvert = prevShouldConvert;
	  }
	  {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}

	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    "development" !== 'production' && warn(
	      'Invalid default value for prop "' + key + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  if (vm && vm.$options.propsData &&
	    vm.$options.propsData[key] === undefined &&
	    vm[key] !== undefined) {
	    return vm[key]
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && prop.type !== Function
	    ? def.call(vm)
	    : def
	}

	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}

	/**
	 * Assert the type of a value
	 */
	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (expectedType === 'String') {
	    valid = typeof value === (expectedType = 'string');
	  } else if (expectedType === 'Number') {
	    valid = typeof value === (expectedType = 'number');
	  } else if (expectedType === 'Boolean') {
	    valid = typeof value === (expectedType = 'boolean');
	  } else if (expectedType === 'Function') {
	    valid = typeof value === (expectedType = 'function');
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}

	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match && match[1]
	}

	function isBooleanType (fn) {
	  if (!Array.isArray(fn)) {
	    return getType(fn) === 'Boolean'
	  }
	  for (var i = 0, len = fn.length; i < len; i++) {
	    if (getType(fn[i]) === 'Boolean') {
	      return true
	    }
	  }
	  /* istanbul ignore next */
	  return false
	}



	var util = Object.freeze({
		defineReactive: defineReactive$$1,
		_toString: _toString,
		toNumber: toNumber,
		makeMap: makeMap,
		isBuiltInTag: isBuiltInTag,
		remove: remove$1,
		hasOwn: hasOwn,
		isPrimitive: isPrimitive,
		cached: cached,
		camelize: camelize,
		capitalize: capitalize,
		hyphenate: hyphenate,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		toObject: toObject,
		noop: noop,
		no: no,
		identity: identity,
		genStaticKeys: genStaticKeys,
		looseEqual: looseEqual,
		looseIndexOf: looseIndexOf,
		isReserved: isReserved,
		def: def,
		parsePath: parsePath,
		hasProto: hasProto,
		inBrowser: inBrowser,
		UA: UA,
		isIE: isIE,
		isIE9: isIE9,
		isEdge: isEdge,
		isAndroid: isAndroid,
		isIOS: isIOS,
		isServerRendering: isServerRendering,
		devtools: devtools,
		nextTick: nextTick,
		get _Set () { return _Set; },
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		get warn () { return warn; },
		get formatComponentName () { return formatComponentName; },
		validateProp: validateProp
	});

	/* not type checking this file because flow doesn't play well with Proxy */

	var initProxy;

	{
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );

	  var warnNonPresent = function (target, key) {
	    warn(
	      "Property or method \"" + key + "\" is not defined on the instance but " +
	      "referenced during render. Make sure to declare reactive data " +
	      "properties in the data option.",
	      target
	    );
	  };

	  var hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/);

	  if (hasProxy) {
	    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
	    config.keyCodes = new Proxy(config.keyCodes, {
	      set: function set (target, key, value) {
	        if (isBuiltInModifier(key)) {
	          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
	          return false
	        } else {
	          target[key] = value;
	          return true
	        }
	      }
	    });
	  }

	  var hasHandler = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warnNonPresent(target, key);
	      }
	      return has || !isAllowed
	    }
	  };

	  var getHandler = {
	    get: function get (target, key) {
	      if (typeof key === 'string' && !(key in target)) {
	        warnNonPresent(target, key);
	      }
	      return target[key]
	    }
	  };

	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      // determine which proxy handler to use
	      var options = vm.$options;
	      var handlers = options.render && options.render._withStripped
	        ? getHandler
	        : hasHandler;
	      vm._renderProxy = new Proxy(vm, handlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}

	/*  */


	var queue = [];
	var has$1 = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;

	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  queue.length = 0;
	  has$1 = {};
	  {
	    circular = {};
	  }
	  waiting = flushing = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;

	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });

	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    var watcher = queue[index];
	    var id = watcher.id;
	    has$1[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if ("development" !== 'production' && has$1[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }

	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }

	  resetSchedulerState();
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has$1[id] == null) {
	    has$1[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i >= 0 && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(Math.max(i, index) + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}

	/*  */

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  if ( options === void 0 ) options = {};

	  this.vm = vm;
	  vm._watchers.push(this);
	  // options
	  this.deep = !!options.deep;
	  this.user = !!options.user;
	  this.lazy = !!options.lazy;
	  this.sync = !!options.sync;
	  this.expression = expOrFn.toString();
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      "development" !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value = this.getter.call(this.vm, this.vm);
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  popTarget();
	  this.cleanupDeps();
	  return value
	};

	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};

	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	      if (
	        value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          /* istanbul ignore else */
	          if (config.errorHandler) {
	            config.errorHandler.call(null, e, this.vm);
	          } else {
	            "development" !== 'production' && warn(
	              ("Error in watcher \"" + (this.expression) + "\""),
	              this.vm
	            );
	            throw e
	          }
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;

	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      remove$1(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};

	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse (val) {
	  seenObjects.clear();
	  _traverse(val, seenObjects);
	}

	function _traverse (val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);
	  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
	    return
	  }
	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;
	    if (seen.has(depId)) {
	      return
	    }
	    seen.add(depId);
	  }
	  if (isA) {
	    i = val.length;
	    while (i--) { _traverse(val[i], seen); }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) { _traverse(val[keys[i]], seen); }
	  }
	}

	/*  */

	function initState (vm) {
	  vm._watchers = [];
	  initProps(vm);
	  initMethods(vm);
	  initData(vm);
	  initComputed(vm);
	  initWatch(vm);
	}

	var isReservedProp = { key: 1, ref: 1, slot: 1 };

	function initProps (vm) {
	  var props = vm.$options.props;
	  if (props) {
	    var propsData = vm.$options.propsData || {};
	    var keys = vm.$options._propKeys = Object.keys(props);
	    var isRoot = !vm.$parent;
	    // root instance props should be converted
	    observerState.shouldConvert = isRoot;
	    var loop = function ( i ) {
	      var key = keys[i];
	      /* istanbul ignore else */
	      {
	        if (isReservedProp[key]) {
	          warn(
	            ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
	            vm
	          );
	        }
	        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
	          if (vm.$parent && !observerState.isSettingProps) {
	            warn(
	              "Avoid mutating a prop directly since the value will be " +
	              "overwritten whenever the parent component re-renders. " +
	              "Instead, use a data or computed property based on the prop's " +
	              "value. Prop being mutated: \"" + key + "\"",
	              vm
	            );
	          }
	        });
	      }
	    };

	    for (var i = 0; i < keys.length; i++) loop( i );
	    observerState.shouldConvert = true;
	  }
	}

	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? data.call(vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    "development" !== 'production' && warn(
	      'data functions should return an object:\n' +
	      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var i = keys.length;
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      "development" !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else {
	      proxy(vm, keys[i]);
	    }
	  }
	  // observe data
	  observe(data);
	  data.__ob__ && data.__ob__.vmCount++;
	}

	var computedSharedDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};

	function initComputed (vm) {
	  var computed = vm.$options.computed;
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key];
	      if (typeof userDef === 'function') {
	        computedSharedDefinition.get = makeComputedGetter(userDef, vm);
	        computedSharedDefinition.set = noop;
	      } else {
	        computedSharedDefinition.get = userDef.get
	          ? userDef.cache !== false
	            ? makeComputedGetter(userDef.get, vm)
	            : bind$1(userDef.get, vm)
	          : noop;
	        computedSharedDefinition.set = userDef.set
	          ? bind$1(userDef.set, vm)
	          : noop;
	      }
	      Object.defineProperty(vm, key, computedSharedDefinition);
	    }
	  }
	}

	function makeComputedGetter (getter, owner) {
	  var watcher = new Watcher(owner, getter, noop, {
	    lazy: true
	  });
	  return function computedGetter () {
	    if (watcher.dirty) {
	      watcher.evaluate();
	    }
	    if (Dep.target) {
	      watcher.depend();
	    }
	    return watcher.value
	  }
	}

	function initMethods (vm) {
	  var methods = vm.$options.methods;
	  if (methods) {
	    for (var key in methods) {
	      vm[key] = methods[key] == null ? noop : bind$1(methods[key], vm);
	      if ("development" !== 'production' && methods[key] == null) {
	        warn(
	          "method \"" + key + "\" has an undefined value in the component definition. " +
	          "Did you reference the function correctly?",
	          vm
	        );
	      }
	    }
	  }
	}

	function initWatch (vm) {
	  var watch = vm.$options.watch;
	  if (watch) {
	    for (var key in watch) {
	      var handler = watch[key];
	      if (Array.isArray(handler)) {
	        for (var i = 0; i < handler.length; i++) {
	          createWatcher(vm, key, handler[i]);
	        }
	      } else {
	        createWatcher(vm, key, handler);
	      }
	    }
	  }
	}

	function createWatcher (vm, key, handler) {
	  var options;
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  vm.$watch(key, handler, options);
	}

	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () {
	    return this._data
	  };
	  {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);

	  Vue.prototype.$set = set$1;
	  Vue.prototype.$delete = del;

	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}

	function proxy (vm, key) {
	  if (!isReserved(key)) {
	    Object.defineProperty(vm, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter () {
	        return vm._data[key]
	      },
	      set: function proxySetter (val) {
	        vm._data[key] = val;
	      }
	    });
	  }
	}

	/*  */

	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  context,
	  componentOptions
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = undefined;
	  this.context = context;
	  this.functionalContext = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.child = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	};

	var createEmptyVNode = function () {
	  var node = new VNode();
	  node.text = '';
	  node.isComment = true;
	  return node
	};

	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}

	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.context,
	    vnode.componentOptions
	  );
	  cloned.ns = vnode.ns;
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isCloned = true;
	  return cloned
	}

	function cloneVNodes (vnodes) {
	  var res = new Array(vnodes.length);
	  for (var i = 0; i < vnodes.length; i++) {
	    res[i] = cloneVNode(vnodes[i]);
	  }
	  return res
	}

	/*  */

	var activeInstance = null;

	function initLifecycle (vm) {
	  var options = vm.$options;

	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }

	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;

	  vm.$children = [];
	  vm.$refs = {};

	  vm._watcher = null;
	  vm._inactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}

	function lifecycleMixin (Vue) {
	  Vue.prototype._mount = function (
	    el,
	    hydrating
	  ) {
	    var vm = this;
	    vm.$el = el;
	    if (!vm.$options.render) {
	      vm.$options.render = createEmptyVNode;
	      {
	        /* istanbul ignore if */
	        if (vm.$options.template && vm.$options.template.charAt(0) !== '#') {
	          warn(
	            'You are using the runtime-only build of Vue where the template ' +
	            'option is not available. Either pre-compile the templates into ' +
	            'render functions, or use the compiler-included build.',
	            vm
	          );
	        } else {
	          warn(
	            'Failed to mount component: template or render function not defined.',
	            vm
	          );
	        }
	      }
	    }
	    callHook(vm, 'beforeMount');
	    vm._watcher = new Watcher(vm, function () {
	      vm._update(vm._render(), hydrating);
	    }, noop);
	    hydrating = false;
	    // manually mounted instance, call mounted on self
	    // mounted is called for render-created child components in its inserted hook
	    if (vm.$vnode == null) {
	      vm._isMounted = true;
	      callHook(vm, 'mounted');
	    }
	    return vm
	  };

	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevVnode = vm._vnode;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    vm._vnode = vnode;
	    // Vue.prototype.__patch__ is injected in entry points
	    // based on the rendering backend used.
	    if (!prevVnode) {
	      // initial render
	      vm.$el = vm.__patch__(
	        vm.$el, vnode, hydrating, false /* removeOnly */,
	        vm.$options._parentElm,
	        vm.$options._refElm
	      );
	    } else {
	      // updates
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    if (vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  };

	  Vue.prototype._updateFromParent = function (
	    propsData,
	    listeners,
	    parentVnode,
	    renderChildren
	  ) {
	    var vm = this;
	    var hasChildren = !!(vm.$options._renderChildren || renderChildren);
	    vm.$options._parentVnode = parentVnode;
	    vm.$vnode = parentVnode; // update vm's placeholder node without re-render
	    if (vm._vnode) { // update child tree's parent
	      vm._vnode.parent = parentVnode;
	    }
	    vm.$options._renderChildren = renderChildren;
	    // update props
	    if (propsData && vm.$options.props) {
	      observerState.shouldConvert = false;
	      {
	        observerState.isSettingProps = true;
	      }
	      var propKeys = vm.$options._propKeys || [];
	      for (var i = 0; i < propKeys.length; i++) {
	        var key = propKeys[i];
	        vm[key] = validateProp(key, vm.$options.props, propsData, vm);
	      }
	      observerState.shouldConvert = true;
	      {
	        observerState.isSettingProps = false;
	      }
	      vm.$options.propsData = propsData;
	    }
	    // update listeners
	    if (listeners) {
	      var oldListeners = vm.$options._parentListeners;
	      vm.$options._parentListeners = listeners;
	      vm._updateListeners(listeners, oldListeners);
	    }
	    // resolve slots + force update if has children
	    if (hasChildren) {
	      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	      vm.$forceUpdate();
	    }
	  };

	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };

	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove$1(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	  };
	}

	function callHook (vm, hook) {
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(vm);
	    }
	  }
	  vm.$emit('hook:' + hook);
	}

	/*  */

	var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 };
	var hooksToMerge = Object.keys(hooks);

	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (!Ctor) {
	    return
	  }

	  var baseCtor = context.$options._base;
	  if (isObject(Ctor)) {
	    Ctor = baseCtor.extend(Ctor);
	  }

	  if (typeof Ctor !== 'function') {
	    {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }

	  // async component
	  if (!Ctor.cid) {
	    if (Ctor.resolved) {
	      Ctor = Ctor.resolved;
	    } else {
	      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
	        // it's ok to queue this on every render because
	        // $forceUpdate is buffered by the scheduler.
	        context.$forceUpdate();
	      });
	      if (!Ctor) {
	        // return nothing if this is indeed an async component
	        // wait for the callback to trigger parent update.
	        return
	      }
	    }
	  }

	  // resolve constructor options in case global mixins are applied after
	  // component constructor creation
	  resolveConstructorOptions(Ctor);

	  data = data || {};

	  // extract props
	  var propsData = extractProps(data, Ctor);

	  // functional component
	  if (Ctor.options.functional) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }

	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn;

	  if (Ctor.options.abstract) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {};
	  }

	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);

	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  );
	  return vnode
	}

	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {};
	  var propOptions = Ctor.options.props;
	  if (propOptions) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData);
	    }
	  }
	  // ensure the createElement function in functional components
	  // gets a unique context - this is necessary for correct named slot check
	  var _context = Object.create(context);
	  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
	  var vnode = Ctor.options.render.call(null, h, {
	    props: props,
	    data: data,
	    parent: context,
	    children: children,
	    slots: function () { return resolveSlots(children, context); }
	  });
	  if (vnode instanceof VNode) {
	    vnode.functionalContext = context;
	    if (data.slot) {
	      (vnode.data || (vnode.data = {})).slot = data.slot;
	    }
	  }
	  return vnode
	}

	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent, // activeInstance in lifecycle state
	  parentElm,
	  refElm
	) {
	  var vnodeComponentOptions = vnode.componentOptions;
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children,
	    _parentElm: parentElm || null,
	    _refElm: refElm || null
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (inlineTemplate) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}

	function init (
	  vnode,
	  hydrating,
	  parentElm,
	  refElm
	) {
	  if (!vnode.child || vnode.child._isDestroyed) {
	    var child = vnode.child = createComponentInstanceForVnode(
	      vnode,
	      activeInstance,
	      parentElm,
	      refElm
	    );
	    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	  } else if (vnode.data.keepAlive) {
	    // kept-alive components, treat as a patch
	    var mountedNode = vnode; // work around flow
	    prepatch(mountedNode, mountedNode);
	  }
	}

	function prepatch (
	  oldVnode,
	  vnode
	) {
	  var options = vnode.componentOptions;
	  var child = vnode.child = oldVnode.child;
	  child._updateFromParent(
	    options.propsData, // updated props
	    options.listeners, // updated listeners
	    vnode, // new parent vnode
	    options.children // new children
	  );
	}

	function insert (vnode) {
	  if (!vnode.child._isMounted) {
	    vnode.child._isMounted = true;
	    callHook(vnode.child, 'mounted');
	  }
	  if (vnode.data.keepAlive) {
	    vnode.child._inactive = false;
	    callHook(vnode.child, 'activated');
	  }
	}

	function destroy$1 (vnode) {
	  if (!vnode.child._isDestroyed) {
	    if (!vnode.data.keepAlive) {
	      vnode.child.$destroy();
	    } else {
	      vnode.child._inactive = true;
	      callHook(vnode.child, 'deactivated');
	    }
	  }
	}

	function resolveAsyncComponent (
	  factory,
	  baseCtor,
	  cb
	) {
	  if (factory.requested) {
	    // pool callbacks
	    factory.pendingCallbacks.push(cb);
	  } else {
	    factory.requested = true;
	    var cbs = factory.pendingCallbacks = [cb];
	    var sync = true;

	    var resolve = function (res) {
	      if (isObject(res)) {
	        res = baseCtor.extend(res);
	      }
	      // cache resolved
	      factory.resolved = res;
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res);
	        }
	      }
	    };

	    var reject = function (reason) {
	      "development" !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	    };

	    var res = factory(resolve, reject);

	    // handle promise
	    if (res && typeof res.then === 'function' && !factory.resolved) {
	      res.then(resolve, reject);
	    }

	    sync = false;
	    // return in case resolved synchronously
	    return factory.resolved
	  }
	}

	function extractProps (data, Ctor) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (!propOptions) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  var domProps = data.domProps;
	  if (attrs || props || domProps) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey) ||
	      checkProp(res, domProps, key, altKey);
	    }
	  }
	  return res
	}

	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (hash) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}

	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {};
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var fromParent = data.hook[key];
	    var ours = hooks[key];
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	  }
	}

	function mergeHook$1 (one, two) {
	  return function (a, b, c, d) {
	    one(a, b, c, d);
	    two(a, b, c, d);
	  }
	}

	/*  */

	function mergeVNodeHook (def, hookKey, hook, key) {
	  key = key + hookKey;
	  var injectedHash = def.__injected || (def.__injected = {});
	  if (!injectedHash[key]) {
	    injectedHash[key] = true;
	    var oldHook = def[hookKey];
	    if (oldHook) {
	      def[hookKey] = function () {
	        oldHook.apply(this, arguments);
	        hook.apply(this, arguments);
	      };
	    } else {
	      def[hookKey] = hook;
	    }
	  }
	}

	/*  */

	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, cur, old, fn, event, capture, once;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    if (!cur) {
	      "development" !== 'production' && warn(
	        "Invalid handler for event \"" + name + "\": got " + String(cur),
	        vm
	      );
	    } else if (!old) {
	      once = name.charAt(0) === '~'; // Prefixed last, checked first
	      event = once ? name.slice(1) : name;
	      capture = event.charAt(0) === '!';
	      event = capture ? event.slice(1) : event;
	      if (Array.isArray(cur)) {
	        add(event, (cur.invoker = arrInvoker(cur)), once, capture);
	      } else {
	        if (!cur.invoker) {
	          fn = cur;
	          cur = on[name] = {};
	          cur.fn = fn;
	          cur.invoker = fnInvoker(cur);
	        }
	        add(event, cur.invoker, once, capture);
	      }
	    } else if (cur !== old) {
	      if (Array.isArray(old)) {
	        old.length = cur.length;
	        for (var i = 0; i < old.length; i++) { old[i] = cur[i]; }
	        on[name] = old;
	      } else {
	        old.fn = cur;
	        on[name] = old;
	      }
	    }
	  }
	  for (name in oldOn) {
	    if (!on[name]) {
	      once = name.charAt(0) === '~'; // Prefixed last, checked first
	      event = once ? name.slice(1) : name;
	      capture = event.charAt(0) === '!';
	      event = capture ? event.slice(1) : event;
	      remove$$1(event, oldOn[name].invoker, capture);
	    }
	  }
	}

	function arrInvoker (arr) {
	  return function (ev) {
	    var arguments$1 = arguments;

	    var single = arguments.length === 1;
	    for (var i = 0; i < arr.length; i++) {
	      single ? arr[i](ev) : arr[i].apply(null, arguments$1);
	    }
	  }
	}

	function fnInvoker (o) {
	  return function (ev) {
	    var single = arguments.length === 1;
	    single ? o.fn(ev) : o.fn.apply(null, arguments);
	  }
	}

	/*  */

	function normalizeChildren (children) {
	  return isPrimitive(children)
	    ? [createTextVNode(children)]
	    : Array.isArray(children)
	      ? normalizeArrayChildren(children)
	      : undefined
	}

	function normalizeArrayChildren (children, nestedIndex) {
	  var res = [];
	  var i, c, last;
	  for (i = 0; i < children.length; i++) {
	    c = children[i];
	    if (c == null || typeof c === 'boolean') { continue }
	    last = res[res.length - 1];
	    //  nested
	    if (Array.isArray(c)) {
	      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
	    } else if (isPrimitive(c)) {
	      if (last && last.text) {
	        last.text += String(c);
	      } else if (c !== '') {
	        // convert primitive to vnode
	        res.push(createTextVNode(c));
	      }
	    } else {
	      if (c.text && last && last.text) {
	        res[res.length - 1] = createTextVNode(last.text + c.text);
	      } else {
	        // default key for nested array children (likely generated by v-for)
	        if (c.tag && c.key == null && nestedIndex != null) {
	          c.key = "__vlist" + nestedIndex + "_" + i + "__";
	        }
	        res.push(c);
	      }
	    }
	  }
	  return res
	}

	/*  */

	function getFirstComponentChild (children) {
	  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
	}

	/*  */

	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  context,
	  tag,
	  data,
	  children,
	  needNormalization,
	  alwaysNormalize
	) {
	  if (Array.isArray(data) || isPrimitive(data)) {
	    needNormalization = children;
	    children = data;
	    data = undefined;
	  }
	  if (alwaysNormalize) { needNormalization = true; }
	  return _createElement(context, tag, data, children, needNormalization)
	}

	function _createElement (
	  context,
	  tag,
	  data,
	  children,
	  needNormalization
	) {
	  if (data && data.__ob__) {
	    "development" !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return createEmptyVNode()
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return createEmptyVNode()
	  }
	  // support single function children as default scoped slot
	  if (Array.isArray(children) &&
	      typeof children[0] === 'function') {
	    data = data || {};
	    data.scopedSlots = { default: children[0] };
	    children.length = 0;
	  }
	  if (needNormalization) {
	    children = normalizeChildren(children);
	  }
	  var vnode, ns;
	  if (typeof tag === 'string') {
	    var Ctor;
	    ns = config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      vnode = new VNode(
	        config.parsePlatformTagName(tag), data, children,
	        undefined, undefined, context
	      );
	    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      vnode = createComponent(Ctor, data, context, children, tag);
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      ns = tag === 'foreignObject' ? 'xhtml' : ns;
	      vnode = new VNode(
	        tag, data, children,
	        undefined, undefined, context
	      );
	    }
	  } else {
	    // direct component options / constructor
	    vnode = createComponent(tag, data, context, children);
	  }
	  if (vnode) {
	    if (ns) { applyNS(vnode, ns); }
	    return vnode
	  } else {
	    return createEmptyVNode()
	  }
	}

	function applyNS (vnode, ns) {
	  vnode.ns = ns;
	  if (vnode.children) {
	    for (var i = 0, l = vnode.children.length; i < l; i++) {
	      var child = vnode.children[i];
	      if (child.tag && !child.ns) {
	        applyNS(child, ns);
	      }
	    }
	  }
	}

	/*  */

	function initRender (vm) {
	  vm.$vnode = null; // the placeholder node in parent tree
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null;
	  var parentVnode = vm.$options._parentVnode;
	  var renderContext = parentVnode && parentVnode.context;
	  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
	  vm.$scopedSlots = {};
	  // bind the createElement fn to this instance
	  // so that we get proper render context inside it.
	  // args order: tag, data, children, needNormalization, alwaysNormalize
	  // internal version is used by render functions compiled from templates
	  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
	  // normalization is always applied for the public version, used in
	  // user-written render functions.
	  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
	  if (vm.$options.el) {
	    vm.$mount(vm.$options.el);
	  }
	}

	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    return nextTick(fn, this)
	  };

	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;

	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
	      }
	    }

	    if (_parentVnode && _parentVnode.data.scopedSlots) {
	      vm.$scopedSlots = _parentVnode.data.scopedSlots;
	    }

	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = [];
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      /* istanbul ignore else */
	      if (config.errorHandler) {
	        config.errorHandler.call(null, e, vm);
	      } else {
	        {
	          warn(("Error when rendering " + (formatComponentName(vm)) + ":"));
	        }
	        throw e
	      }
	      // return previous vnode to prevent render error causing blank component
	      vnode = vm._vnode;
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if ("development" !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = createEmptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };

	  // toString for mustaches
	  Vue.prototype._s = _toString;
	  // convert text to vnode
	  Vue.prototype._v = createTextVNode;
	  // number conversion
	  Vue.prototype._n = toNumber;
	  // empty vnode
	  Vue.prototype._e = createEmptyVNode;
	  // loose equal
	  Vue.prototype._q = looseEqual;
	  // loose indexOf
	  Vue.prototype._i = looseIndexOf;

	  // render static tree by index
	  Vue.prototype._m = function renderStatic (
	    index,
	    isInFor
	  ) {
	    var tree = this._staticTrees[index];
	    // if has already-rendered static tree and not inside v-for,
	    // we can reuse the same tree by doing a shallow clone.
	    if (tree && !isInFor) {
	      return Array.isArray(tree)
	        ? cloneVNodes(tree)
	        : cloneVNode(tree)
	    }
	    // otherwise, render a fresh tree.
	    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
	    markStatic(tree, ("__static__" + index), false);
	    return tree
	  };

	  // mark node as static (v-once)
	  Vue.prototype._o = function markOnce (
	    tree,
	    index,
	    key
	  ) {
	    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	    return tree
	  };

	  function markStatic (tree, key, isOnce) {
	    if (Array.isArray(tree)) {
	      for (var i = 0; i < tree.length; i++) {
	        if (tree[i] && typeof tree[i] !== 'string') {
	          markStaticNode(tree[i], (key + "_" + i), isOnce);
	        }
	      }
	    } else {
	      markStaticNode(tree, key, isOnce);
	    }
	  }

	  function markStaticNode (node, key, isOnce) {
	    node.isStatic = true;
	    node.key = key;
	    node.isOnce = isOnce;
	  }

	  // filter resolution helper
	  Vue.prototype._f = function resolveFilter (id) {
	    return resolveAsset(this.$options, 'filters', id, true) || identity
	  };

	  // render v-for
	  Vue.prototype._l = function renderList (
	    val,
	    render
	  ) {
	    var ret, i, l, keys, key;
	    if (Array.isArray(val)) {
	      ret = new Array(val.length);
	      for (i = 0, l = val.length; i < l; i++) {
	        ret[i] = render(val[i], i);
	      }
	    } else if (typeof val === 'number') {
	      ret = new Array(val);
	      for (i = 0; i < val; i++) {
	        ret[i] = render(i + 1, i);
	      }
	    } else if (isObject(val)) {
	      keys = Object.keys(val);
	      ret = new Array(keys.length);
	      for (i = 0, l = keys.length; i < l; i++) {
	        key = keys[i];
	        ret[i] = render(val[key], key, i);
	      }
	    }
	    return ret
	  };

	  // renderSlot
	  Vue.prototype._t = function (
	    name,
	    fallback,
	    props
	  ) {
	    var scopedSlotFn = this.$scopedSlots[name];
	    if (scopedSlotFn) { // scoped slot
	      return scopedSlotFn(props || {}) || fallback
	    } else {
	      var slotNodes = this.$slots[name];
	      // warn duplicate slot usage
	      if (slotNodes && "development" !== 'production') {
	        slotNodes._rendered && warn(
	          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	          "- this will likely cause render errors.",
	          this
	        );
	        slotNodes._rendered = true;
	      }
	      return slotNodes || fallback
	    }
	  };

	  // apply v-bind object
	  Vue.prototype._b = function bindProps (
	    data,
	    tag,
	    value,
	    asProp
	  ) {
	    if (value) {
	      if (!isObject(value)) {
	        "development" !== 'production' && warn(
	          'v-bind without argument expects an Object or Array value',
	          this
	        );
	      } else {
	        if (Array.isArray(value)) {
	          value = toObject(value);
	        }
	        for (var key in value) {
	          if (key === 'class' || key === 'style') {
	            data[key] = value[key];
	          } else {
	            var hash = asProp || config.mustUseProp(tag, key)
	              ? data.domProps || (data.domProps = {})
	              : data.attrs || (data.attrs = {});
	            hash[key] = value[key];
	          }
	        }
	      }
	    }
	    return data
	  };

	  // check v-on keyCodes
	  Vue.prototype._k = function checkKeyCodes (
	    eventKeyCode,
	    key,
	    builtInAlias
	  ) {
	    var keyCodes = config.keyCodes[key] || builtInAlias;
	    if (Array.isArray(keyCodes)) {
	      return keyCodes.indexOf(eventKeyCode) === -1
	    } else {
	      return keyCodes !== eventKeyCode
	    }
	  };
	}

	function resolveSlots (
	  children,
	  context
	) {
	  var slots = {};
	  if (!children) {
	    return slots
	  }
	  var defaultSlot = [];
	  var name, child;
	  for (var i = 0, l = children.length; i < l; i++) {
	    child = children[i];
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.functionalContext === context) &&
	        child.data && (name = child.data.slot)) {
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      defaultSlot.push(child);
	    }
	  }
	  // ignore single whitespace
	  if (defaultSlot.length && !(
	    defaultSlot.length === 1 &&
	    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
	  )) {
	    slots.default = defaultSlot;
	  }
	  return slots
	}

	/*  */

	function initEvents (vm) {
	  vm._events = Object.create(null);
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  var add = function (event, fn, once) {
	    once ? vm.$once(event, fn) : vm.$on(event, fn);
	  };
	  var remove$$1 = bind$1(vm.$off, vm);
	  vm._updateListeners = function (listeners, oldListeners) {
	    updateListeners(listeners, oldListeners || {}, add, remove$$1, vm);
	  };
	  if (listeners) {
	    vm._updateListeners(listeners);
	  }
	}

	function eventsMixin (Vue) {
	  Vue.prototype.$on = function (event, fn) {
	    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn);
	    return vm
	  };

	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };

	  Vue.prototype.$off = function (event, fn) {
	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null;
	      return vm
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args);
	      }
	    }
	    return vm
	  };
	}

	/*  */

	var uid = 0;

	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    // a uid
	    vm._uid = uid++;
	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm.constructor),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    {
	      initProxy(vm);
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    callHook(vm, 'beforeCreate');
	    initState(vm);
	    callHook(vm, 'created');
	    initRender(vm);
	  };
	}

	function initInternalComponent (vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options);
	  // doing this because it's faster than dynamic enumeration.
	  opts.parent = options.parent;
	  opts.propsData = options.propsData;
	  opts._parentVnode = options._parentVnode;
	  opts._parentListeners = options._parentListeners;
	  opts._renderChildren = options._renderChildren;
	  opts._componentTag = options._componentTag;
	  opts._parentElm = options._parentElm;
	  opts._refElm = options._refElm;
	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}

	function resolveConstructorOptions (Ctor) {
	  var options = Ctor.options;
	  if (Ctor.super) {
	    var superOptions = Ctor.super.options;
	    var cachedSuperOptions = Ctor.superOptions;
	    var extendOptions = Ctor.extendOptions;
	    if (superOptions !== cachedSuperOptions) {
	      // super option changed
	      Ctor.superOptions = superOptions;
	      extendOptions.render = options.render;
	      extendOptions.staticRenderFns = options.staticRenderFns;
	      extendOptions._scopeId = options._scopeId;
	      options = Ctor.options = mergeOptions(superOptions, extendOptions);
	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }
	  return options
	}

	function Vue$3 (options) {
	  if ("development" !== 'production' &&
	    !(this instanceof Vue$3)) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}

	initMixin(Vue$3);
	stateMixin(Vue$3);
	eventsMixin(Vue$3);
	lifecycleMixin(Vue$3);
	renderMixin(Vue$3);

	/*  */

	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this
	  };
	}

	/*  */

	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    this.options = mergeOptions(this.options, mixin);
	  };
	}

	/*  */

	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var SuperId = Super.cid;
	    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	    if (cachedCtors[SuperId]) {
	      return cachedCtors[SuperId]
	    }
	    var name = extendOptions.name || Super.options.name;
	    {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characters and the hyphen, ' +
	          'and must start with a letter.'
	        );
	      }
	    }
	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;
	    // allow further extension/mixin/plugin usage
	    Sub.extend = Super.extend;
	    Sub.mixin = Super.mixin;
	    Sub.use = Super.use;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    // cache constructor
	    cachedCtors[SuperId] = Sub;
	    return Sub
	  };
	}

	/*  */

	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            );
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = this.options._base.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}

	/*  */

	var patternTypes = [String, RegExp];

	function matches (pattern, name) {
	  if (typeof pattern === 'string') {
	    return pattern.split(',').indexOf(name) > -1
	  } else {
	    return pattern.test(name)
	  }
	}

	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,
	  props: {
	    include: patternTypes,
	    exclude: patternTypes
	  },
	  created: function created () {
	    this.cache = Object.create(null);
	  },
	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default);
	    if (vnode && vnode.componentOptions) {
	      var opts = vnode.componentOptions;
	      // check pattern
	      var name = opts.Ctor.options.name || opts.tag;
	      if (name && (
	        (this.include && !matches(this.include, name)) ||
	        (this.exclude && matches(this.exclude, name))
	      )) {
	        return vnode
	      }
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? opts.Ctor.cid + (opts.tag ? ("::" + (opts.tag)) : '')
	        : vnode.key;
	      if (this.cache[key]) {
	        vnode.child = this.cache[key].child;
	      } else {
	        this.cache[key] = vnode;
	      }
	      vnode.data.keepAlive = true;
	    }
	    return vnode
	  },
	  destroyed: function destroyed () {
	    var this$1 = this;

	    for (var key in this.cache) {
	      var vnode = this$1.cache[key];
	      callHook(vnode.child, 'deactivated');
	      vnode.child.$destroy();
	    }
	  }
	};

	var builtInComponents = {
	  KeepAlive: KeepAlive
	};

	/*  */

	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);
	  Vue.util = util;
	  Vue.set = set$1;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;

	  Vue.options = Object.create(null);
	  config._assetTypes.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });

	  // this is used to identify the "base" constructor to extend all plain-object
	  // components with in Weex's multi-instance scenarios.
	  Vue.options._base = Vue;

	  extend(Vue.options.components, builtInComponents);

	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}

	initGlobalAPI(Vue$3);

	Object.defineProperty(Vue$3.prototype, '$isServer', {
	  get: isServerRendering
	});

	Vue$3.version = '2.1.6';

	/*  */

	// attributes that should be using props for binding
	var acceptValue = makeMap('input,textarea,option,select');
	var mustUseProp = function (tag, attr) {
	  return (
	    (attr === 'value' && acceptValue(tag)) ||
	    (attr === 'selected' && tag === 'option') ||
	    (attr === 'checked' && tag === 'input') ||
	    (attr === 'muted' && tag === 'video')
	  )
	};

	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);

	var xlinkNS = 'http://www.w3.org/1999/xlink';

	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};

	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};

	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};

	/*  */

	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (childNode.child) {
	    childNode = childNode.child._vnode;
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return genClassFromData(data)
	}

	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: child.class
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}

	function genClassFromData (data) {
	  var dynamicClass = data.class;
	  var staticClass = data.staticClass;
	  if (staticClass || dynamicClass) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}

	function stringifyClass (value) {
	  var res = '';
	  if (!value) {
	    return res
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  if (Array.isArray(value)) {
	    var stringified;
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        if ((stringified = stringifyClass(value[i]))) {
	          res += stringified + ' ';
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' '; }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}

	/*  */

	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML',
	  xhtml: 'http://www.w3.org/1999/xhtml'
	};

	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	);

	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,' +
	  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);

	var isPreTag = function (tag) { return tag === 'pre'; };

	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};

	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}

	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}

	/*  */

	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      "development" !== 'production' && warn(
	        'Cannot find element: ' + selector
	      );
	      return document.createElement('div')
	    }
	  }
	  return el
	}

	/*  */

	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  if (vnode.data && vnode.data.attrs && 'multiple' in vnode.data.attrs) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}

	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}

	function createTextNode (text) {
	  return document.createTextNode(text)
	}

	function createComment (text) {
	  return document.createComment(text)
	}

	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild (node, child) {
	  node.removeChild(child);
	}

	function appendChild (node, child) {
	  node.appendChild(child);
	}

	function parentNode (node) {
	  return node.parentNode
	}

	function nextSibling (node) {
	  return node.nextSibling
	}

	function tagName (node) {
	  return node.tagName
	}

	function setTextContent (node, text) {
	  node.textContent = text;
	}

	function setAttribute (node, key, val) {
	  node.setAttribute(key, val);
	}


	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		setAttribute: setAttribute
	});

	/*  */

	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};

	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!key) { return }

	  var vm = vnode.context;
	  var ref = vnode.child || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove$1(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
	        refs[key].push(ref);
	      } else {
	        refs[key] = [ref];
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}

	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *

	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */

	var emptyNode = new VNode('', {}, []);

	var hooks$1 = ['create', 'activate', 'update', 'remove', 'destroy'];

	function isUndef (s) {
	  return s == null
	}

	function isDef (s) {
	  return s != null
	}

	function sameVnode (vnode1, vnode2) {
	  return (
	    vnode1.key === vnode2.key &&
	    vnode1.tag === vnode2.tag &&
	    vnode1.isComment === vnode2.isComment &&
	    !vnode1.data === !vnode2.data
	  )
	}

	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}

	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};

	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;

	  for (i = 0; i < hooks$1.length; ++i) {
	    cbs[hooks$1[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
	    }
	  }

	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }

	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeElement(childElm);
	      }
	    }
	    remove$$1.listeners = listeners;
	    return remove$$1
	  }

	  function removeElement (el) {
	    var parent = nodeOps.parentNode(el);
	    // element may have already been removed due to v-html
	    if (parent) {
	      nodeOps.removeChild(parent, el);
	    }
	  }

	  var inPre = 0;
	  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
	    vnode.isRootInsert = !nested; // for transition enter check
	    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	      return
	    }

	    var data = vnode.data;
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      {
	        if (data && data.pre) {
	          inPre++;
	        }
	        if (
	          !inPre &&
	          !vnode.ns &&
	          !(config.ignoredElements && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);

	      /* istanbul ignore if */
	      {
	        createChildren(vnode, children, insertedVnodeQueue);
	        if (isDef(data)) {
	          invokeCreateHooks(vnode, insertedVnodeQueue);
	        }
	        insert(parentElm, vnode.elm, refElm);
	      }

	      if ("development" !== 'production' && data && data.pre) {
	        inPre--;
	      }
	    } else if (vnode.isComment) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    }
	  }

	  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i = vnode.data;
	    if (isDef(i)) {
	      var isReactivated = isDef(vnode.child) && i.keepAlive;
	      if (isDef(i = i.hook) && isDef(i = i.init)) {
	        i(vnode, false /* hydrating */, parentElm, refElm);
	      }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(vnode.child)) {
	        initComponent(vnode, insertedVnodeQueue);
	        if (isReactivated) {
	          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	        }
	        return true
	      }
	    }
	  }

	  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i;
	    // hack for #4339: a reactivated component with inner transition
	    // does not trigger because the inner node's created hooks are not called
	    // again. It's not ideal to involve module-specific logic in here but
	    // there doesn't seem to be a better way to do it.
	    var innerNode = vnode;
	    while (innerNode.child) {
	      innerNode = innerNode.child._vnode;
	      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	        for (i = 0; i < cbs.activate.length; ++i) {
	          cbs.activate[i](emptyNode, innerNode);
	        }
	        insertedVnodeQueue.push(innerNode);
	        break
	      }
	    }
	    // unlike a newly created component,
	    // a reactivated keep-alive component doesn't insert itself
	    insert(parentElm, vnode.elm, refElm);
	  }

	  function insert (parent, elm, ref) {
	    if (parent) {
	      if (ref) {
	        nodeOps.insertBefore(parent, elm, ref);
	      } else {
	        nodeOps.appendChild(parent, elm);
	      }
	    }
	  }

	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
	    }
	  }

	  function isPatchable (vnode) {
	    while (vnode.child) {
	      vnode = vnode.child._vnode;
	    }
	    return isDef(vnode.tag)
	  }

	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (i.create) { i.create(emptyNode, vnode); }
	      if (i.insert) { insertedVnodeQueue.push(vnode); }
	    }
	  }

	  function initComponent (vnode, insertedVnodeQueue) {
	    if (vnode.data.pendingInsert) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	    }
	    vnode.elm = vnode.child.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }

	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	    if (isDef(i = activeInstance) &&
	        i !== vnode.context &&
	        isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	  }

	  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
	    }
	  }

	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }

	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          nodeOps.removeChild(parentElm, ch.elm);
	        }
	      }
	    }
	  }

	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (rm || isDef(vnode.data)) {
	      var listeners = cbs.remove.length + 1;
	      if (!rm) {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      } else {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.child) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeElement(vnode.elm);
	    }
	  }

	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, refElm;

	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
	        if (isUndef(idxInOld)) { // New element
	          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            );
	          }
	          if (sameVnode(elmToMove, newStartVnode)) {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          } else {
	            // same key but different element. treat as new element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (vnode.isStatic &&
	        oldVnode.isStatic &&
	        vnode.key === oldVnode.key &&
	        (vnode.isCloned || vnode.isOnce)) {
	      vnode.elm = oldVnode.elm;
	      vnode.child = oldVnode.child;
	      return
	    }
	    var i;
	    var data = vnode.data;
	    var hasData = isDef(data);
	    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm;
	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (hasData && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (hasData) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }

	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (initial && vnode.parent) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }

	  var bailed = false;
	  // list of modules that can skip create hook during hydration because they
	  // are already rendered on the client or has no need for initialization
	  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

	  // Note: this is a browser-only function so we can assume elms are DOM nodes.
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.child)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        // empty element, allow client to pick up and populate children
	        if (!elm.hasChildNodes()) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          var childrenMatch = true;
	          var childNode = elm.firstChild;
	          for (var i$1 = 0; i$1 < children.length; i$1++) {
	            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
	              childrenMatch = false;
	              break
	            }
	            childNode = childNode.nextSibling;
	          }
	          // if childNode is not null, it means the actual childNodes list is
	          // longer than the virtual children list.
	          if (!childrenMatch || childNode) {
	            if ("development" !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed) {
	              bailed = true;
	              console.warn('Parent: ', elm);
	              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        for (var key in data) {
	          if (!isRenderedModule(key)) {
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	            break
	          }
	        }
	      }
	    }
	    return true
	  }

	  function assertNodeMatch (node, vnode) {
	    if (vnode.tag) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
	      )
	    } else {
	      return _toString(vnode.text) === node.data
	    }
	  }

	  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
	    if (!vnode) {
	      if (oldVnode) { invokeDestroyHook(oldVnode); }
	      return
	    }

	    var elm, parent;
	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];

	    if (!oldVnode) {
	      // empty mount (likely as component), create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        // patch existing root node
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
	            oldVnode.removeAttribute('server-rendered');
	            hydrating = true;
	          }
	          if (hydrating) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }

	        // replacing existing element
	        elm = oldVnode.elm;
	        parent = nodeOps.parentNode(elm);
	        createElm(vnode, insertedVnodeQueue, parent, nodeOps.nextSibling(elm));

	        if (vnode.parent) {
	          // component root element replaced.
	          // update parent placeholder node element, recursively
	          var ancestor = vnode.parent;
	          while (ancestor) {
	            ancestor.elm = vnode.elm;
	            ancestor = ancestor.parent;
	          }
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent);
	            }
	          }
	        }

	        if (parent !== null) {
	          removeVnodes(parent, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }

	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}

	/*  */

	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};

	function updateDirectives (oldVnode, vnode) {
	  if (oldVnode.data.directives || vnode.data.directives) {
	    _update(oldVnode, vnode);
	  }
	}

	function _update (oldVnode, vnode) {
	  var isCreate = oldVnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];

	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }

	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      for (var i = 0; i < dirsWithInsert.length; i++) {
	        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	      }
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert, 'dir-insert');
	    } else {
	      callInsert();
	    }
	  }

	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
	      for (var i = 0; i < dirsWithPostpatch.length; i++) {
	        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	      }
	    }, 'dir-postpatch');
	  }

	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode);
	      }
	    }
	  }
	}

	var emptyModifiers = Object.create(null);

	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  return res
	}

	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}

	function callHook$1 (dir, hook, vnode, oldVnode) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    fn(vnode.elm, dir, vnode, oldVnode);
	  }
	}

	var baseModules = [
	  ref,
	  directives
	];

	/*  */

	function updateAttrs (oldVnode, vnode) {
	  if (!oldVnode.data.attrs && !vnode.data.attrs) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (attrs.__ob__) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }

	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  // #4391: in IE9, setting type can reset value for input[type=radio]
	  /* istanbul ignore if */
	  if (isIE9 && attrs.value !== oldAttrs.value) {
	    setAttr(elm, 'value', attrs.value);
	  }
	  for (key in oldAttrs) {
	    if (attrs[key] == null) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}

	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, key);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, value);
	    }
	  }
	}

	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};

	/*  */

	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (!data.staticClass && !data.class &&
	      (!oldData || (!oldData.staticClass && !oldData.class))) {
	    return
	  }

	  var cls = genClassForVnode(vnode);

	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (transitionClass) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }

	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}

	var klass = {
	  create: updateClass,
	  update: updateClass
	};

	/*  */

	var target;

	function add$1 (event, handler, once, capture) {
	  if (once) {
	    var oldHandler = handler;
	    handler = function (ev) {
	      remove$2(event, handler, capture);
	      arguments.length === 1
	        ? oldHandler(ev)
	        : oldHandler.apply(null, arguments);
	    };
	  }
	  target.addEventListener(event, handler, capture);
	}

	function remove$2 (event, handler, capture) {
	  target.removeEventListener(event, handler, capture);
	}

	function updateDOMListeners (oldVnode, vnode) {
	  if (!oldVnode.data.on && !vnode.data.on) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  target = vnode.elm;
	  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
	}

	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};

	/*  */

	function updateDOMProps (oldVnode, vnode) {
	  if (!oldVnode.data.domProps && !vnode.data.domProps) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (props.__ob__) {
	    props = vnode.data.domProps = extend({}, props);
	  }

	  for (key in oldProps) {
	    if (props[key] == null) {
	      elm[key] = '';
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if (key === 'textContent' || key === 'innerHTML') {
	      if (vnode.children) { vnode.children.length = 0; }
	      if (cur === oldProps[key]) { continue }
	    }
	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = cur == null ? '' : String(cur);
	      if (!elm.composing && (
	        (document.activeElement !== elm && elm.value !== strCur) ||
	        isValueChanged(vnode, strCur)
	      )) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}

	function isValueChanged (vnode, newVal) {
	  var value = vnode.elm.value;
	  var modifiers = vnode.elm._vModifiers; // injected by v-model runtime
	  if ((modifiers && modifiers.number) || vnode.elm.type === 'number') {
	    return toNumber(value) !== toNumber(newVal)
	  }
	  if (modifiers && modifiers.trim) {
	    return value.trim() !== newVal.trim()
	  }
	  return value !== newVal
	}

	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};

	/*  */

	var parseStyleText = cached(function (cssText) {
	  var res = {};
	  var listDelimiter = /;(?![^(]*\))/g;
	  var propertyDelimiter = /:(.+)/;
	  cssText.split(listDelimiter).forEach(function (item) {
	    if (item) {
	      var tmp = item.split(propertyDelimiter);
	      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return res
	});

	// merge static and dynamic style data on the same vnode
	function normalizeStyleData (data) {
	  var style = normalizeStyleBinding(data.style);
	  // static style is pre-processed into an object during compilation
	  // and is always a fresh object, so it's safe to merge into it
	  return data.staticStyle
	    ? extend(data.staticStyle, style)
	    : style
	}

	// normalize possible array / string values into Object
	function normalizeStyleBinding (bindingStyle) {
	  if (Array.isArray(bindingStyle)) {
	    return toObject(bindingStyle)
	  }
	  if (typeof bindingStyle === 'string') {
	    return parseStyleText(bindingStyle)
	  }
	  return bindingStyle
	}

	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle (vnode, checkChild) {
	  var res = {};
	  var styleData;

	  if (checkChild) {
	    var childNode = vnode;
	    while (childNode.child) {
	      childNode = childNode.child._vnode;
	      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
	        extend(res, styleData);
	      }
	    }
	  }

	  if ((styleData = normalizeStyleData(vnode.data))) {
	    extend(res, styleData);
	  }

	  var parentNode = vnode;
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	      extend(res, styleData);
	    }
	  }
	  return res
	}

	/*  */

	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;
	var setProp = function (el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else if (importantRE.test(val)) {
	    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
	  } else {
	    el.style[normalize(name)] = val;
	  }
	};

	var prefixes = ['Webkit', 'Moz', 'ms'];

	var testEl;
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div');
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	});

	function updateStyle (oldVnode, vnode) {
	  var data = vnode.data;
	  var oldData = oldVnode.data;

	  if (!data.staticStyle && !data.style &&
	      !oldData.staticStyle && !oldData.style) {
	    return
	  }

	  var cur, name;
	  var el = vnode.elm;
	  var oldStaticStyle = oldVnode.data.staticStyle;
	  var oldStyleBinding = oldVnode.data.style || {};

	  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	  var oldStyle = oldStaticStyle || oldStyleBinding;

	  var style = normalizeStyleBinding(vnode.data.style) || {};

	  vnode.data.style = style.__ob__ ? extend({}, style) : style;

	  var newStyle = getStyle(vnode, true);

	  for (name in oldStyle) {
	    if (newStyle[name] == null) {
	      setProp(el, name, '');
	    }
	  }
	  for (name in newStyle) {
	    cur = newStyle[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}

	var style = {
	  create: updateStyle,
	  update: updateStyle
	};

	/*  */

	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !cls.trim()) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !cls.trim()) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    el.setAttribute('class', cur.trim());
	  }
	}

	/*  */

	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';

	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}

	var raf = (inBrowser && window.requestAnimationFrame) || setTimeout;
	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}

	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
	  addClass(el, cls);
	}

	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove$1(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}

	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}

	var transformRE = /\b(transform|all)(,|$)/;

	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);

	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}

	function getTimeout (delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }

	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}

	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}

	/*  */

	function enter (vnode, toggleDisplay) {
	  var el = vnode.elm;

	  // call leave callback now
	  if (el._leaveCb) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return
	  }

	  /* istanbul ignore if */
	  if (el._enterCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;

	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var context = activeInstance;
	  var transitionNode = activeInstance.$vnode;
	  while (transitionNode && transitionNode.parent) {
	    transitionNode = transitionNode.parent;
	    context = transitionNode.context;
	  }

	  var isAppear = !context._isMounted || !vnode.isRootInsert;

	  if (isAppear && !appear && appear !== '') {
	    return
	  }

	  var startClass = isAppear ? appearClass : enterClass;
	  var activeClass = isAppear ? appearActiveClass : enterActiveClass;
	  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter;
	  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter;
	  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter;
	  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl =
	    enterHook &&
	    // enterHook may be a bound method which exposes
	    // the length of original fn as _length
	    (enterHook._length || enterHook.length) > 1;

	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });

	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode &&
	          pendingNode.context === vnode.context &&
	          pendingNode.tag === vnode.tag &&
	          pendingNode.elm._leaveCb) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    }, 'transition-insert');
	  }

	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled && !userWantsControl) {
	        whenTransitionEnds(el, type, cb);
	      }
	    });
	  }

	  if (vnode.data.show) {
	    toggleDisplay && toggleDisplay();
	    enterHook && enterHook(el, cb);
	  }

	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}

	function leave (vnode, rm) {
	  var el = vnode.elm;

	  // call enter callback now
	  if (el._enterCb) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return rm()
	  }

	  /* istanbul ignore if */
	  if (el._leaveCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl =
	    leave &&
	    // leave hook may be a bound method which exposes
	    // the length of original fn as _length
	    (leave._length || leave.length) > 1;

	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });

	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }

	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled && !userWantsControl) {
	          whenTransitionEnds(el, type, cb);
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}

	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {};
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'));
	    }
	    extend(res, def$$1);
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}

	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    leaveClass: (name + "-leave"),
	    appearClass: (name + "-enter"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveActiveClass: (name + "-leave-active"),
	    appearActiveClass: (name + "-enter-active")
	  }
	});

	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn();
	    }
	  }
	}

	function _enter (_, vnode) {
	  if (!vnode.data.show) {
	    enter(vnode);
	  }
	}

	var transition = inBrowser ? {
	  create: _enter,
	  activate: _enter,
	  remove: function remove (vnode, rm) {
	    /* istanbul ignore else */
	    if (!vnode.data.show) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};

	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];

	/*  */

	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);

	var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules });

	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */

	var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_-]*)?$/;

	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}

	var model = {
	  inserted: function inserted (el, binding, vnode) {
	    {
	      if (!modelableTagRE.test(vnode.tag)) {
	        warn(
	          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
	          'If you are working with contenteditable, it\'s recommended to ' +
	          'wrap a library dedicated for that purpose inside a custom component.',
	          vnode.context
	        );
	      }
	    }
	    if (vnode.tag === 'select') {
	      var cb = function () {
	        setSelected(el, binding, vnode.context);
	      };
	      cb();
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        setTimeout(cb, 0);
	      }
	    } else if (vnode.tag === 'textarea' || el.type === 'text') {
	      el._vModifiers = binding.modifiers;
	      if (!binding.modifiers.lazy) {
	        if (!isAndroid) {
	          el.addEventListener('compositionstart', onCompositionStart);
	          el.addEventListener('compositionend', onCompositionEnd);
	        }
	        /* istanbul ignore if */
	        if (isIE9) {
	          el.vmodel = true;
	        }
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
	      if (needReset) {
	        trigger(el, 'change');
	      }
	    }
	  }
	};

	function setSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    "development" !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}

	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}

	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}

	function onCompositionStart (e) {
	  e.target.composing = true;
	}

	function onCompositionEnd (e) {
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}

	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}

	/*  */

	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.child && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.child._vnode)
	    : vnode
	}

	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;

	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    var originalDisplay = el.__vOriginalDisplay =
	      el.style.display === 'none' ? '' : el.style.display;
	    if (value && transition && !isIE9) {
	      vnode.data.show = true;
	      enter(vnode, function () {
	        el.style.display = originalDisplay;
	      });
	    } else {
	      el.style.display = value ? originalDisplay : 'none';
	    }
	  },
	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;

	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (transition && !isIE9) {
	      vnode.data.show = true;
	      if (value) {
	        enter(vnode, function () {
	          el.style.display = el.__vOriginalDisplay;
	        });
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  }
	};

	var platformDirectives = {
	  model: model,
	  show: show
	};

	/*  */

	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)

	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String
	};

	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}

	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1].fn;
	  }
	  return data
	}

	function placeholder (h, rawChild) {
	  return /\d-keep-alive$/.test(rawChild.tag)
	    ? h('keep-alive')
	    : null
	}

	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}

	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,
	  render: function render (h) {
	    var this$1 = this;

	    var children = this.$slots.default;
	    if (!children) {
	      return
	    }

	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }

	    // warn multiple elements
	    if ("development" !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }

	    var mode = this.mode;

	    // warn invalid mode
	    if ("development" !== 'production' &&
	        mode && mode !== 'in-out' && mode !== 'out-in') {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }

	    var rawChild = children[0];

	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }

	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }

	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }

	    var key = child.key = child.key == null || child.isStatic
	      ? ("__v" + (child.tag + this._uid) + "__")
	      : child.key;
	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);

	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }

	    if (oldChild && oldChild.data && oldChild.key !== key) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild.data.transition = extend({}, data);

	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        }, key);
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave, key);
	        mergeVNodeHook(data, 'enterCancelled', performLeave, key);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
	          delayedLeave = leave;
	        }, key);
	      }
	    }

	    return rawChild
	  }
	};

	/*  */

	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.

	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final disired state. This way in the second pass removed
	// nodes will remain where they should be.

	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);

	delete props.mode;

	var TransitionGroup = {
	  props: props,

	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);

	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else {
	          var opts = c.componentOptions;
	          var name = opts
	            ? (opts.Ctor.options.name || opts.tag)
	            : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }

	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }

	    return h(tag, null, children)
	  },

	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },

	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }

	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);

	    // force reflow to put everything in position
	    var f = document.body.offsetHeight; // eslint-disable-line

	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },

	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      addTransitionClass(el, moveClass);
	      var info = getTransitionInfo(el);
	      removeTransitionClass(el, moveClass);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};

	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}

	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}

	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}

	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};

	/*  */

	// install platform specific utils
	Vue$3.config.isUnknownElement = isUnknownElement;
	Vue$3.config.isReservedTag = isReservedTag;
	Vue$3.config.getTagNamespace = getTagNamespace;
	Vue$3.config.mustUseProp = mustUseProp;

	// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives);
	extend(Vue$3.options.components, platformComponents);

	// install platform patch function
	Vue$3.prototype.__patch__ = inBrowser ? patch$1 : noop;

	// wrap mount
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && inBrowser ? query(el) : undefined;
	  return this._mount(el, hydrating)
	};

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$3);
	    } else if (
	      "development" !== 'production' &&
	      inBrowser && !isEdge && /Chrome\/\d+/.test(window.navigator.userAgent)
	    ) {
	      console.log(
	        'Download the Vue Devtools for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      );
	    }
	  }
	}, 0);

	/*  */

	// check whether current browser encodes a char inside attribute values
	function shouldDecode (content, encoded) {
	  var div = document.createElement('div');
	  div.innerHTML = "<div a=\"" + content + "\">";
	  return div.innerHTML.indexOf(encoded) > 0
	}

	// #3663
	// IE encodes newlines inside attribute values while other browsers don't
	var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

	/*  */

	var decoder;

	function decode (html) {
	  decoder = decoder || document.createElement('div');
	  decoder.innerHTML = html;
	  return decoder.textContent
	}

	/*  */

	var isUnaryTag = makeMap(
	  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	  'link,meta,param,source,track,wbr',
	  true
	);

	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
	  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
	  true
	);

	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
	  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	  'title,tr,track',
	  true
	);

	/**
	 * Not type-checking this file because it's mostly vendor code.
	 */

	/*!
	 * HTML Parser By John Resig (ejohn.org)
	 * Modified by Juriy "kangax" Zaytsev
	 * Original code by Erik Arvidsson, Mozilla Public License
	 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	 */

	// Regular Expressions for parsing tags and attributes
	var singleAttrIdentifier = /([^\s"'<>/=]+)/;
	var singleAttrAssign = /(?:=)/;
	var singleAttrValues = [
	  // attr value double quotes
	  /"([^"]*)"+/.source,
	  // attr value, single quotes
	  /'([^']*)'+/.source,
	  // attr value, no quotes
	  /([^\s"'=<>`]+)/.source
	];
	var attribute = new RegExp(
	  '^\\s*' + singleAttrIdentifier.source +
	  '(?:\\s*(' + singleAttrAssign.source + ')' +
	  '\\s*(?:' + singleAttrValues.join('|') + '))?'
	);

	// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
	var startTagOpen = new RegExp('^<' + qnameCapture);
	var startTagClose = /^\s*(\/?)>/;
	var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
	var doctype = /^<!DOCTYPE [^>]+>/i;
	var comment = /^<!--/;
	var conditionalComment = /^<!\[/;

	var IS_REGEX_CAPTURING_BROKEN = false;
	'x'.replace(/x(.)?/g, function (m, g) {
	  IS_REGEX_CAPTURING_BROKEN = g === '';
	});

	// Special Elements (can contain anything)
	var isScriptOrStyle = makeMap('script,style', true);
	var hasLang = function (attr) { return attr.name === 'lang' && attr.value !== 'html'; };
	var isSpecialTag = function (tag, isSFC, stack) {
	  if (isScriptOrStyle(tag)) {
	    return true
	  }
	  if (isSFC && stack.length === 1) {
	    // top-level template that has no pre-processor
	    if (tag === 'template' && !stack[0].attrs.some(hasLang)) {
	      return false
	    } else {
	      return true
	    }
	  }
	  return false
	};

	var reCache = {};

	var ltRE = /&lt;/g;
	var gtRE = /&gt;/g;
	var nlRE = /&#10;/g;
	var ampRE = /&amp;/g;
	var quoteRE = /&quot;/g;

	function decodeAttr (value, shouldDecodeNewlines) {
	  if (shouldDecodeNewlines) {
	    value = value.replace(nlRE, '\n');
	  }
	  return value
	    .replace(ltRE, '<')
	    .replace(gtRE, '>')
	    .replace(ampRE, '&')
	    .replace(quoteRE, '"')
	}

	function parseHTML (html, options) {
	  var stack = [];
	  var expectHTML = options.expectHTML;
	  var isUnaryTag$$1 = options.isUnaryTag || no;
	  var index = 0;
	  var last, lastTag;
	  while (html) {
	    last = html;
	    // Make sure we're not in a script or style element
	    if (!lastTag || !isSpecialTag(lastTag, options.sfc, stack)) {
	      var textEnd = html.indexOf('<');
	      if (textEnd === 0) {
	        // Comment:
	        if (comment.test(html)) {
	          var commentEnd = html.indexOf('-->');

	          if (commentEnd >= 0) {
	            advance(commentEnd + 3);
	            continue
	          }
	        }

	        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	        if (conditionalComment.test(html)) {
	          var conditionalEnd = html.indexOf(']>');

	          if (conditionalEnd >= 0) {
	            advance(conditionalEnd + 2);
	            continue
	          }
	        }

	        // Doctype:
	        var doctypeMatch = html.match(doctype);
	        if (doctypeMatch) {
	          advance(doctypeMatch[0].length);
	          continue
	        }

	        // End tag:
	        var endTagMatch = html.match(endTag);
	        if (endTagMatch) {
	          var curIndex = index;
	          advance(endTagMatch[0].length);
	          parseEndTag(endTagMatch[0], endTagMatch[1], curIndex, index);
	          continue
	        }

	        // Start tag:
	        var startTagMatch = parseStartTag();
	        if (startTagMatch) {
	          handleStartTag(startTagMatch);
	          continue
	        }
	      }

	      var text = (void 0), rest$1 = (void 0), next = (void 0);
	      if (textEnd > 0) {
	        rest$1 = html.slice(textEnd);
	        while (
	          !endTag.test(rest$1) &&
	          !startTagOpen.test(rest$1) &&
	          !comment.test(rest$1) &&
	          !conditionalComment.test(rest$1)
	        ) {
	          // < in plain text, be forgiving and treat it as text
	          next = rest$1.indexOf('<', 1);
	          if (next < 0) { break }
	          textEnd += next;
	          rest$1 = html.slice(textEnd);
	        }
	        text = html.substring(0, textEnd);
	        advance(textEnd);
	      }

	      if (textEnd < 0) {
	        text = html;
	        html = '';
	      }

	      if (options.chars && text) {
	        options.chars(text);
	      }
	    } else {
	      var stackedTag = lastTag.toLowerCase();
	      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
	      var endTagLength = 0;
	      var rest = html.replace(reStackedTag, function (all, text, endTag) {
	        endTagLength = endTag.length;
	        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
	          text = text
	            .replace(/<!--([\s\S]*?)-->/g, '$1')
	            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
	        }
	        if (options.chars) {
	          options.chars(text);
	        }
	        return ''
	      });
	      index += html.length - rest.length;
	      html = rest;
	      parseEndTag('</' + stackedTag + '>', stackedTag, index - endTagLength, index);
	    }

	    if (html === last && options.chars) {
	      options.chars(html);
	      break
	    }
	  }

	  // Clean up any remaining tags
	  parseEndTag();

	  function advance (n) {
	    index += n;
	    html = html.substring(n);
	  }

	  function parseStartTag () {
	    var start = html.match(startTagOpen);
	    if (start) {
	      var match = {
	        tagName: start[1],
	        attrs: [],
	        start: index
	      };
	      advance(start[0].length);
	      var end, attr;
	      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
	        advance(attr[0].length);
	        match.attrs.push(attr);
	      }
	      if (end) {
	        match.unarySlash = end[1];
	        advance(end[0].length);
	        match.end = index;
	        return match
	      }
	    }
	  }

	  function handleStartTag (match) {
	    var tagName = match.tagName;
	    var unarySlash = match.unarySlash;

	    if (expectHTML) {
	      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
	        parseEndTag('', lastTag);
	      }
	      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
	        parseEndTag('', tagName);
	      }
	    }

	    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

	    var l = match.attrs.length;
	    var attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      var args = match.attrs[i];
	      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
	      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
	        if (args[3] === '') { delete args[3]; }
	        if (args[4] === '') { delete args[4]; }
	        if (args[5] === '') { delete args[5]; }
	      }
	      var value = args[3] || args[4] || args[5] || '';
	      attrs[i] = {
	        name: args[1],
	        value: decodeAttr(
	          value,
	          options.shouldDecodeNewlines
	        )
	      };
	    }

	    if (!unary) {
	      stack.push({ tag: tagName, attrs: attrs });
	      lastTag = tagName;
	      unarySlash = '';
	    }

	    if (options.start) {
	      options.start(tagName, attrs, unary, match.start, match.end);
	    }
	  }

	  function parseEndTag (tag, tagName, start, end) {
	    var pos;
	    if (start == null) { start = index; }
	    if (end == null) { end = index; }

	    // Find the closest opened tag of the same type
	    if (tagName) {
	      var needle = tagName.toLowerCase();
	      for (pos = stack.length - 1; pos >= 0; pos--) {
	        if (stack[pos].tag.toLowerCase() === needle) {
	          break
	        }
	      }
	    } else {
	      // If no tag name is provided, clean shop
	      pos = 0;
	    }

	    if (pos >= 0) {
	      // Close all the open elements, up the stack
	      for (var i = stack.length - 1; i >= pos; i--) {
	        if (options.end) {
	          options.end(stack[i].tag, start, end);
	        }
	      }

	      // Remove the open elements from the stack
	      stack.length = pos;
	      lastTag = pos && stack[pos - 1].tag;
	    } else if (tagName.toLowerCase() === 'br') {
	      if (options.start) {
	        options.start(tagName, [], true, start, end);
	      }
	    } else if (tagName.toLowerCase() === 'p') {
	      if (options.start) {
	        options.start(tagName, [], false, start, end);
	      }
	      if (options.end) {
	        options.end(tagName, start, end);
	      }
	    }
	  }
	}

	/*  */

	function parseFilters (exp) {
	  var inSingle = false;
	  var inDouble = false;
	  var inTemplateString = false;
	  var inRegex = false;
	  var curly = 0;
	  var square = 0;
	  var paren = 0;
	  var lastFilterIndex = 0;
	  var c, prev, i, expression, filters;

	  for (i = 0; i < exp.length; i++) {
	    prev = c;
	    c = exp.charCodeAt(i);
	    if (inSingle) {
	      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
	    } else if (inDouble) {
	      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
	    } else if (inTemplateString) {
	      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
	    } else if (inRegex) {
	      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
	    } else if (
	      c === 0x7C && // pipe
	      exp.charCodeAt(i + 1) !== 0x7C &&
	      exp.charCodeAt(i - 1) !== 0x7C &&
	      !curly && !square && !paren
	    ) {
	      if (expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        expression = exp.slice(0, i).trim();
	      } else {
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break         // "
	        case 0x27: inSingle = true; break         // '
	        case 0x60: inTemplateString = true; break // `
	        case 0x28: paren++; break                 // (
	        case 0x29: paren--; break                 // )
	        case 0x5B: square++; break                // [
	        case 0x5D: square--; break                // ]
	        case 0x7B: curly++; break                 // {
	        case 0x7D: curly--; break                 // }
	      }
	      if (c === 0x2f) { // /
	        var j = i - 1;
	        var p = (void 0);
	        // find first non-whitespace prev char
	        for (; j >= 0; j--) {
	          p = exp.charAt(j);
	          if (p !== ' ') { break }
	        }
	        if (!p || !/[\w$]/.test(p)) {
	          inRegex = true;
	        }
	      }
	    }
	  }

	  if (expression === undefined) {
	    expression = exp.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  function pushFilter () {
	    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
	    lastFilterIndex = i + 1;
	  }

	  if (filters) {
	    for (i = 0; i < filters.length; i++) {
	      expression = wrapFilter(expression, filters[i]);
	    }
	  }

	  return expression
	}

	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(');
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i);
	    var args = filter.slice(i + 1);
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}

	/*  */

	var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
	var regexEscapeRE = /[-.*+?^${}()|[\]/\\]/g;

	var buildRegex = cached(function (delimiters) {
	  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
	  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
	  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
	});

	function parseText (
	  text,
	  delimiters
	) {
	  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
	  if (!tagRE.test(text)) {
	    return
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index;
	  while ((match = tagRE.exec(text))) {
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
	    }
	    // tag token
	    var exp = parseFilters(match[1].trim());
	    tokens.push(("_s(" + exp + ")"));
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push(JSON.stringify(text.slice(lastIndex)));
	  }
	  return tokens.join('+')
	}

	/*  */

	function baseWarn (msg) {
	  console.error(("[Vue parser]: " + msg));
	}

	function pluckModuleFunction (
	  modules,
	  key
	) {
	  return modules
	    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
	    : []
	}

	function addProp (el, name, value) {
	  (el.props || (el.props = [])).push({ name: name, value: value });
	}

	function addAttr (el, name, value) {
	  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
	}

	function addDirective (
	  el,
	  name,
	  rawName,
	  value,
	  arg,
	  modifiers
	) {
	  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
	}

	function addHandler (
	  el,
	  name,
	  value,
	  modifiers,
	  important
	) {
	  // check capture modifier
	  if (modifiers && modifiers.capture) {
	    delete modifiers.capture;
	    name = '!' + name; // mark the event as captured
	  }
	  if (modifiers && modifiers.once) {
	    delete modifiers.once;
	    name = '~' + name; // mark the event as once
	  }
	  var events;
	  if (modifiers && modifiers.native) {
	    delete modifiers.native;
	    events = el.nativeEvents || (el.nativeEvents = {});
	  } else {
	    events = el.events || (el.events = {});
	  }
	  var newHandler = { value: value, modifiers: modifiers };
	  var handlers = events[name];
	  /* istanbul ignore if */
	  if (Array.isArray(handlers)) {
	    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
	  } else if (handlers) {
	    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
	  } else {
	    events[name] = newHandler;
	  }
	}

	function getBindingAttr (
	  el,
	  name,
	  getStatic
	) {
	  var dynamicValue =
	    getAndRemoveAttr(el, ':' + name) ||
	    getAndRemoveAttr(el, 'v-bind:' + name);
	  if (dynamicValue != null) {
	    return parseFilters(dynamicValue)
	  } else if (getStatic !== false) {
	    var staticValue = getAndRemoveAttr(el, name);
	    if (staticValue != null) {
	      return JSON.stringify(staticValue)
	    }
	  }
	}

	function getAndRemoveAttr (el, name) {
	  var val;
	  if ((val = el.attrsMap[name]) != null) {
	    var list = el.attrsList;
	    for (var i = 0, l = list.length; i < l; i++) {
	      if (list[i].name === name) {
	        list.splice(i, 1);
	        break
	      }
	    }
	  }
	  return val
	}

	var len;
	var str;
	var chr;
	var index$1;
	var expressionPos;
	var expressionEndPos;

	/**
	 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
	 *
	 * for loop possible cases:
	 *
	 * - test
	 * - test[idx]
	 * - test[test1[idx]]
	 * - test["a"][idx]
	 * - xxx.test[a[a].test1[idx]]
	 * - test.xxx.a["asa"][test1[idx]]
	 *
	 */

	function parseModel (val) {
	  str = val;
	  len = str.length;
	  index$1 = expressionPos = expressionEndPos = 0;

	  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
	    return {
	      exp: val,
	      idx: null
	    }
	  }

	  while (!eof()) {
	    chr = next();
	    /* istanbul ignore if */
	    if (isStringStart(chr)) {
	      parseString(chr);
	    } else if (chr === 0x5B) {
	      parseBracket(chr);
	    }
	  }

	  return {
	    exp: val.substring(0, expressionPos),
	    idx: val.substring(expressionPos + 1, expressionEndPos)
	  }
	}

	function next () {
	  return str.charCodeAt(++index$1)
	}

	function eof () {
	  return index$1 >= len
	}

	function isStringStart (chr) {
	  return chr === 0x22 || chr === 0x27
	}

	function parseBracket (chr) {
	  var inBracket = 1;
	  expressionPos = index$1;
	  while (!eof()) {
	    chr = next();
	    if (isStringStart(chr)) {
	      parseString(chr);
	      continue
	    }
	    if (chr === 0x5B) { inBracket++; }
	    if (chr === 0x5D) { inBracket--; }
	    if (inBracket === 0) {
	      expressionEndPos = index$1;
	      break
	    }
	  }
	}

	function parseString (chr) {
	  var stringQuote = chr;
	  while (!eof()) {
	    chr = next();
	    if (chr === stringQuote) {
	      break
	    }
	  }
	}

	/*  */

	var dirRE = /^v-|^@|^:/;
	var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
	var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
	var bindRE = /^:|^v-bind:/;
	var onRE = /^@|^v-on:/;
	var argRE = /:(.*)$/;
	var modifierRE = /\.[^.]+/g;

	var decodeHTMLCached = cached(decode);

	// configurable state
	var warn$1;
	var platformGetTagNamespace;
	var platformMustUseProp;
	var platformIsPreTag;
	var preTransforms;
	var transforms;
	var postTransforms;
	var delimiters;

	/**
	 * Convert HTML string to AST.
	 */
	function parse (
	  template,
	  options
	) {
	  warn$1 = options.warn || baseWarn;
	  platformGetTagNamespace = options.getTagNamespace || no;
	  platformMustUseProp = options.mustUseProp || no;
	  platformIsPreTag = options.isPreTag || no;
	  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
	  transforms = pluckModuleFunction(options.modules, 'transformNode');
	  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
	  delimiters = options.delimiters;
	  var stack = [];
	  var preserveWhitespace = options.preserveWhitespace !== false;
	  var root;
	  var currentParent;
	  var inVPre = false;
	  var inPre = false;
	  var warned = false;
	  parseHTML(template, {
	    expectHTML: options.expectHTML,
	    isUnaryTag: options.isUnaryTag,
	    shouldDecodeNewlines: options.shouldDecodeNewlines,
	    start: function start (tag, attrs, unary) {
	      // check namespace.
	      // inherit parent ns if there is one
	      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

	      // handle IE svg bug
	      /* istanbul ignore if */
	      if (isIE && ns === 'svg') {
	        attrs = guardIESVGBug(attrs);
	      }

	      var element = {
	        type: 1,
	        tag: tag,
	        attrsList: attrs,
	        attrsMap: makeAttrsMap(attrs),
	        parent: currentParent,
	        children: []
	      };
	      if (ns) {
	        element.ns = ns;
	      }

	      if (isForbiddenTag(element) && !isServerRendering()) {
	        element.forbidden = true;
	        "development" !== 'production' && warn$1(
	          'Templates should only be responsible for mapping the state to the ' +
	          'UI. Avoid placing tags with side-effects in your templates, such as ' +
	          "<" + tag + ">."
	        );
	      }

	      // apply pre-transforms
	      for (var i = 0; i < preTransforms.length; i++) {
	        preTransforms[i](element, options);
	      }

	      if (!inVPre) {
	        processPre(element);
	        if (element.pre) {
	          inVPre = true;
	        }
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = true;
	      }
	      if (inVPre) {
	        processRawAttrs(element);
	      } else {
	        processFor(element);
	        processIf(element);
	        processOnce(element);
	        processKey(element);

	        // determine whether this is a plain element after
	        // removing structural attributes
	        element.plain = !element.key && !attrs.length;

	        processRef(element);
	        processSlot(element);
	        processComponent(element);
	        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
	          transforms[i$1](element, options);
	        }
	        processAttrs(element);
	      }

	      function checkRootConstraints (el) {
	        if ("development" !== 'production' && !warned) {
	          if (el.tag === 'slot' || el.tag === 'template') {
	            warned = true;
	            warn$1(
	              "Cannot use <" + (el.tag) + "> as component root element because it may " +
	              'contain multiple nodes:\n' + template
	            );
	          }
	          if (el.attrsMap.hasOwnProperty('v-for')) {
	            warned = true;
	            warn$1(
	              'Cannot use v-for on stateful component root element because ' +
	              'it renders multiple elements:\n' + template
	            );
	          }
	        }
	      }

	      // tree management
	      if (!root) {
	        root = element;
	        checkRootConstraints(root);
	      } else if (!stack.length) {
	        // allow root elements with v-if, v-else-if and v-else
	        if (root.if && (element.elseif || element.else)) {
	          checkRootConstraints(element);
	          addIfCondition(root, {
	            exp: element.elseif,
	            block: element
	          });
	        } else if ("development" !== 'production' && !warned) {
	          warned = true;
	          warn$1(
	            "Component template should contain exactly one root element:" +
	            "\n\n" + template + "\n\n" +
	            "If you are using v-if on multiple elements, " +
	            "use v-else-if to chain them instead."
	          );
	        }
	      }
	      if (currentParent && !element.forbidden) {
	        if (element.elseif || element.else) {
	          processIfConditions(element, currentParent);
	        } else if (element.slotScope) { // scoped slot
	          currentParent.plain = false;
	          var name = element.slotTarget || 'default';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
	        } else {
	          currentParent.children.push(element);
	          element.parent = currentParent;
	        }
	      }
	      if (!unary) {
	        currentParent = element;
	        stack.push(element);
	      }
	      // apply post-transforms
	      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
	        postTransforms[i$2](element, options);
	      }
	    },

	    end: function end () {
	      // remove trailing whitespace
	      var element = stack[stack.length - 1];
	      var lastNode = element.children[element.children.length - 1];
	      if (lastNode && lastNode.type === 3 && lastNode.text === ' ') {
	        element.children.pop();
	      }
	      // pop stack
	      stack.length -= 1;
	      currentParent = stack[stack.length - 1];
	      // check pre state
	      if (element.pre) {
	        inVPre = false;
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = false;
	      }
	    },

	    chars: function chars (text) {
	      if (!currentParent) {
	        if ("development" !== 'production' && !warned && text === template) {
	          warned = true;
	          warn$1(
	            'Component template requires a root element, rather than just text:\n\n' + template
	          );
	        }
	        return
	      }
	      // IE textarea placeholder bug
	      /* istanbul ignore if */
	      if (isIE &&
	          currentParent.tag === 'textarea' &&
	          currentParent.attrsMap.placeholder === text) {
	        return
	      }
	      text = inPre || text.trim()
	        ? decodeHTMLCached(text)
	        // only preserve whitespace if its not right after a starting tag
	        : preserveWhitespace && currentParent.children.length ? ' ' : '';
	      if (text) {
	        var expression;
	        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
	          currentParent.children.push({
	            type: 2,
	            expression: expression,
	            text: text
	          });
	        } else {
	          currentParent.children.push({
	            type: 3,
	            text: text
	          });
	        }
	      }
	    }
	  });
	  return root
	}

	function processPre (el) {
	  if (getAndRemoveAttr(el, 'v-pre') != null) {
	    el.pre = true;
	  }
	}

	function processRawAttrs (el) {
	  var l = el.attrsList.length;
	  if (l) {
	    var attrs = el.attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      attrs[i] = {
	        name: el.attrsList[i].name,
	        value: JSON.stringify(el.attrsList[i].value)
	      };
	    }
	  } else if (!el.pre) {
	    // non root node in pre blocks with no attributes
	    el.plain = true;
	  }
	}

	function processKey (el) {
	  var exp = getBindingAttr(el, 'key');
	  if (exp) {
	    if ("development" !== 'production' && el.tag === 'template') {
	      warn$1("<template> cannot be keyed. Place the key on real elements instead.");
	    }
	    el.key = exp;
	  }
	}

	function processRef (el) {
	  var ref = getBindingAttr(el, 'ref');
	  if (ref) {
	    el.ref = ref;
	    el.refInFor = checkInFor(el);
	  }
	}

	function processFor (el) {
	  var exp;
	  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
	    var inMatch = exp.match(forAliasRE);
	    if (!inMatch) {
	      "development" !== 'production' && warn$1(
	        ("Invalid v-for expression: " + exp)
	      );
	      return
	    }
	    el.for = inMatch[2].trim();
	    var alias = inMatch[1].trim();
	    var iteratorMatch = alias.match(forIteratorRE);
	    if (iteratorMatch) {
	      el.alias = iteratorMatch[1].trim();
	      el.iterator1 = iteratorMatch[2].trim();
	      if (iteratorMatch[3]) {
	        el.iterator2 = iteratorMatch[3].trim();
	      }
	    } else {
	      el.alias = alias;
	    }
	  }
	}

	function processIf (el) {
	  var exp = getAndRemoveAttr(el, 'v-if');
	  if (exp) {
	    el.if = exp;
	    addIfCondition(el, {
	      exp: exp,
	      block: el
	    });
	  } else {
	    if (getAndRemoveAttr(el, 'v-else') != null) {
	      el.else = true;
	    }
	    var elseif = getAndRemoveAttr(el, 'v-else-if');
	    if (elseif) {
	      el.elseif = elseif;
	    }
	  }
	}

	function processIfConditions (el, parent) {
	  var prev = findPrevElement(parent.children);
	  if (prev && prev.if) {
	    addIfCondition(prev, {
	      exp: el.elseif,
	      block: el
	    });
	  } else {
	    warn$1(
	      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
	      "used on element <" + (el.tag) + "> without corresponding v-if."
	    );
	  }
	}

	function addIfCondition (el, condition) {
	  if (!el.ifConditions) {
	    el.ifConditions = [];
	  }
	  el.ifConditions.push(condition);
	}

	function processOnce (el) {
	  var once = getAndRemoveAttr(el, 'v-once');
	  if (once != null) {
	    el.once = true;
	  }
	}

	function processSlot (el) {
	  if (el.tag === 'slot') {
	    el.slotName = getBindingAttr(el, 'name');
	    if ("development" !== 'production' && el.key) {
	      warn$1(
	        "`key` does not work on <slot> because slots are abstract outlets " +
	        "and can possibly expand into multiple elements. " +
	        "Use the key on a wrapping element instead."
	      );
	    }
	  } else {
	    var slotTarget = getBindingAttr(el, 'slot');
	    if (slotTarget) {
	      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
	    }
	    if (el.tag === 'template') {
	      el.slotScope = getAndRemoveAttr(el, 'scope');
	    }
	  }
	}

	function processComponent (el) {
	  var binding;
	  if ((binding = getBindingAttr(el, 'is'))) {
	    el.component = binding;
	  }
	  if (getAndRemoveAttr(el, 'inline-template') != null) {
	    el.inlineTemplate = true;
	  }
	}

	function processAttrs (el) {
	  var list = el.attrsList;
	  var i, l, name, rawName, value, arg, modifiers, isProp;
	  for (i = 0, l = list.length; i < l; i++) {
	    name = rawName = list[i].name;
	    value = list[i].value;
	    if (dirRE.test(name)) {
	      // mark element as dynamic
	      el.hasBindings = true;
	      // modifiers
	      modifiers = parseModifiers(name);
	      if (modifiers) {
	        name = name.replace(modifierRE, '');
	      }
	      if (bindRE.test(name)) { // v-bind
	        name = name.replace(bindRE, '');
	        value = parseFilters(value);
	        isProp = false;
	        if (modifiers) {
	          if (modifiers.prop) {
	            isProp = true;
	            name = camelize(name);
	            if (name === 'innerHtml') { name = 'innerHTML'; }
	          }
	          if (modifiers.camel) {
	            name = camelize(name);
	          }
	        }
	        if (isProp || platformMustUseProp(el.tag, name)) {
	          addProp(el, name, value);
	        } else {
	          addAttr(el, name, value);
	        }
	      } else if (onRE.test(name)) { // v-on
	        name = name.replace(onRE, '');
	        addHandler(el, name, value, modifiers);
	      } else { // normal directives
	        name = name.replace(dirRE, '');
	        // parse arg
	        var argMatch = name.match(argRE);
	        if (argMatch && (arg = argMatch[1])) {
	          name = name.slice(0, -(arg.length + 1));
	        }
	        addDirective(el, name, rawName, value, arg, modifiers);
	        if ("development" !== 'production' && name === 'model') {
	          checkForAliasModel(el, value);
	        }
	      }
	    } else {
	      // literal attribute
	      {
	        var expression = parseText(value, delimiters);
	        if (expression) {
	          warn$1(
	            name + "=\"" + value + "\": " +
	            'Interpolation inside attributes has been removed. ' +
	            'Use v-bind or the colon shorthand instead. For example, ' +
	            'instead of <div id="{{ val }}">, use <div :id="val">.'
	          );
	        }
	      }
	      addAttr(el, name, JSON.stringify(value));
	    }
	  }
	}

	function checkInFor (el) {
	  var parent = el;
	  while (parent) {
	    if (parent.for !== undefined) {
	      return true
	    }
	    parent = parent.parent;
	  }
	  return false
	}

	function parseModifiers (name) {
	  var match = name.match(modifierRE);
	  if (match) {
	    var ret = {};
	    match.forEach(function (m) { ret[m.slice(1)] = true; });
	    return ret
	  }
	}

	function makeAttrsMap (attrs) {
	  var map = {};
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    if ("development" !== 'production' && map[attrs[i].name] && !isIE) {
	      warn$1('duplicate attribute: ' + attrs[i].name);
	    }
	    map[attrs[i].name] = attrs[i].value;
	  }
	  return map
	}

	function findPrevElement (children) {
	  var i = children.length;
	  while (i--) {
	    if (children[i].tag) { return children[i] }
	  }
	}

	function isForbiddenTag (el) {
	  return (
	    el.tag === 'style' ||
	    (el.tag === 'script' && (
	      !el.attrsMap.type ||
	      el.attrsMap.type === 'text/javascript'
	    ))
	  )
	}

	var ieNSBug = /^xmlns:NS\d+/;
	var ieNSPrefix = /^NS\d+:/;

	/* istanbul ignore next */
	function guardIESVGBug (attrs) {
	  var res = [];
	  for (var i = 0; i < attrs.length; i++) {
	    var attr = attrs[i];
	    if (!ieNSBug.test(attr.name)) {
	      attr.name = attr.name.replace(ieNSPrefix, '');
	      res.push(attr);
	    }
	  }
	  return res
	}

	function checkForAliasModel (el, value) {
	  var _el = el;
	  while (_el) {
	    if (_el.for && _el.alias === value) {
	      warn$1(
	        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	        "You are binding v-model directly to a v-for iteration alias. " +
	        "This will not be able to modify the v-for source array because " +
	        "writing to the alias is like modifying a function local variable. " +
	        "Consider using an array of objects and use v-model on an object property instead."
	      );
	    }
	    _el = _el.parent;
	  }
	}

	/*  */

	var isStaticKey;
	var isPlatformReservedTag;

	var genStaticKeysCached = cached(genStaticKeys$1);

	/**
	 * Goal of the optimizer: walk the generated template AST tree
	 * and detect sub-trees that are purely static, i.e. parts of
	 * the DOM that never needs to change.
	 *
	 * Once we detect these sub-trees, we can:
	 *
	 * 1. Hoist them into constants, so that we no longer need to
	 *    create fresh nodes for them on each re-render;
	 * 2. Completely skip them in the patching process.
	 */
	function optimize (root, options) {
	  if (!root) { return }
	  isStaticKey = genStaticKeysCached(options.staticKeys || '');
	  isPlatformReservedTag = options.isReservedTag || no;
	  // first pass: mark all non-static nodes.
	  markStatic(root);
	  // second pass: mark static roots.
	  markStaticRoots(root, false);
	}

	function genStaticKeys$1 (keys) {
	  return makeMap(
	    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
	    (keys ? ',' + keys : '')
	  )
	}

	function markStatic (node) {
	  node.static = isStatic(node);
	  if (node.type === 1) {
	    // do not make component slot content static. this avoids
	    // 1. components not able to mutate slot nodes
	    // 2. static slot content fails for hot-reloading
	    if (
	      !isPlatformReservedTag(node.tag) &&
	      node.tag !== 'slot' &&
	      node.attrsMap['inline-template'] == null
	    ) {
	      return
	    }
	    for (var i = 0, l = node.children.length; i < l; i++) {
	      var child = node.children[i];
	      markStatic(child);
	      if (!child.static) {
	        node.static = false;
	      }
	    }
	  }
	}

	function markStaticRoots (node, isInFor) {
	  if (node.type === 1) {
	    if (node.static || node.once) {
	      node.staticInFor = isInFor;
	    }
	    // For a node to qualify as a static root, it should have children that
	    // are not just static text. Otherwise the cost of hoisting out will
	    // outweigh the benefits and it's better off to just always render it fresh.
	    if (node.static && node.children.length && !(
	      node.children.length === 1 &&
	      node.children[0].type === 3
	    )) {
	      node.staticRoot = true;
	      return
	    } else {
	      node.staticRoot = false;
	    }
	    if (node.children) {
	      for (var i = 0, l = node.children.length; i < l; i++) {
	        markStaticRoots(node.children[i], isInFor || !!node.for);
	      }
	    }
	    if (node.ifConditions) {
	      walkThroughConditionsBlocks(node.ifConditions, isInFor);
	    }
	  }
	}

	function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
	  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
	    markStaticRoots(conditionBlocks[i].block, isInFor);
	  }
	}

	function isStatic (node) {
	  if (node.type === 2) { // expression
	    return false
	  }
	  if (node.type === 3) { // text
	    return true
	  }
	  return !!(node.pre || (
	    !node.hasBindings && // no dynamic bindings
	    !node.if && !node.for && // not v-if or v-for or v-else
	    !isBuiltInTag(node.tag) && // not a built-in
	    isPlatformReservedTag(node.tag) && // not a component
	    !isDirectChildOfTemplateFor(node) &&
	    Object.keys(node).every(isStaticKey)
	  ))
	}

	function isDirectChildOfTemplateFor (node) {
	  while (node.parent) {
	    node = node.parent;
	    if (node.tag !== 'template') {
	      return false
	    }
	    if (node.for) {
	      return true
	    }
	  }
	  return false
	}

	/*  */

	var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
	var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40,
	  'delete': [8, 46]
	};

	var modifierCode = {
	  stop: '$event.stopPropagation();',
	  prevent: '$event.preventDefault();',
	  self: 'if($event.target !== $event.currentTarget)return;',
	  ctrl: 'if(!$event.ctrlKey)return;',
	  shift: 'if(!$event.shiftKey)return;',
	  alt: 'if(!$event.altKey)return;',
	  meta: 'if(!$event.metaKey)return;'
	};

	function genHandlers (events, native) {
	  var res = native ? 'nativeOn:{' : 'on:{';
	  for (var name in events) {
	    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
	  }
	  return res.slice(0, -1) + '}'
	}

	function genHandler (
	  name,
	  handler
	) {
	  if (!handler) {
	    return 'function(){}'
	  } else if (Array.isArray(handler)) {
	    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
	  } else if (!handler.modifiers) {
	    return fnExpRE.test(handler.value) || simplePathRE.test(handler.value)
	      ? handler.value
	      : ("function($event){" + (handler.value) + "}")
	  } else {
	    var code = '';
	    var keys = [];
	    for (var key in handler.modifiers) {
	      if (modifierCode[key]) {
	        code += modifierCode[key];
	      } else {
	        keys.push(key);
	      }
	    }
	    if (keys.length) {
	      code = genKeyFilter(keys) + code;
	    }
	    var handlerCode = simplePathRE.test(handler.value)
	      ? handler.value + '($event)'
	      : handler.value;
	    return 'function($event){' + code + handlerCode + '}'
	  }
	}

	function genKeyFilter (keys) {
	  return ("if(" + (keys.map(genFilterCode).join('&&')) + ")return;")
	}

	function genFilterCode (key) {
	  var keyVal = parseInt(key, 10);
	  if (keyVal) {
	    return ("$event.keyCode!==" + keyVal)
	  }
	  var alias = keyCodes[key];
	  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
	}

	/*  */

	function bind$2 (el, dir) {
	  el.wrapData = function (code) {
	    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
	  };
	}

	var baseDirectives = {
	  bind: bind$2,
	  cloak: noop
	};

	/*  */

	// configurable state
	var warn$2;
	var transforms$1;
	var dataGenFns;
	var platformDirectives$1;
	var staticRenderFns;
	var onceCount;
	var currentOptions;

	function generate (
	  ast,
	  options
	) {
	  // save previous staticRenderFns so generate calls can be nested
	  var prevStaticRenderFns = staticRenderFns;
	  var currentStaticRenderFns = staticRenderFns = [];
	  var prevOnceCount = onceCount;
	  onceCount = 0;
	  currentOptions = options;
	  warn$2 = options.warn || baseWarn;
	  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
	  dataGenFns = pluckModuleFunction(options.modules, 'genData');
	  platformDirectives$1 = options.directives || {};
	  var code = ast ? genElement(ast) : '_c("div")';
	  staticRenderFns = prevStaticRenderFns;
	  onceCount = prevOnceCount;
	  return {
	    render: ("with(this){return " + code + "}"),
	    staticRenderFns: currentStaticRenderFns
	  }
	}

	function genElement (el) {
	  if (el.staticRoot && !el.staticProcessed) {
	    return genStatic(el)
	  } else if (el.once && !el.onceProcessed) {
	    return genOnce(el)
	  } else if (el.for && !el.forProcessed) {
	    return genFor(el)
	  } else if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.tag === 'template' && !el.slotTarget) {
	    return genChildren(el) || 'void 0'
	  } else if (el.tag === 'slot') {
	    return genSlot(el)
	  } else {
	    // component or element
	    var code;
	    if (el.component) {
	      code = genComponent(el.component, el);
	    } else {
	      var data = el.plain ? undefined : genData(el);

	      var children = el.inlineTemplate ? null : genChildren(el, true);
	      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
	    }
	    // module transforms
	    for (var i = 0; i < transforms$1.length; i++) {
	      code = transforms$1[i](el, code);
	    }
	    return code
	  }
	}

	// hoist static sub-trees out
	function genStatic (el) {
	  el.staticProcessed = true;
	  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
	  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
	}

	// v-once
	function genOnce (el) {
	  el.onceProcessed = true;
	  if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.staticInFor) {
	    var key = '';
	    var parent = el.parent;
	    while (parent) {
	      if (parent.for) {
	        key = parent.key;
	        break
	      }
	      parent = parent.parent;
	    }
	    if (!key) {
	      "development" !== 'production' && warn$2(
	        "v-once can only be used inside v-for that is keyed. "
	      );
	      return genElement(el)
	    }
	    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
	  } else {
	    return genStatic(el)
	  }
	}

	function genIf (el) {
	  el.ifProcessed = true; // avoid recursion
	  return genIfConditions(el.ifConditions.slice())
	}

	function genIfConditions (conditions) {
	  if (!conditions.length) {
	    return '_e()'
	  }

	  var condition = conditions.shift();
	  if (condition.exp) {
	    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
	  } else {
	    return ("" + (genTernaryExp(condition.block)))
	  }

	  // v-if with v-once should generate code like (a)?_m(0):_m(1)
	  function genTernaryExp (el) {
	    return el.once ? genOnce(el) : genElement(el)
	  }
	}

	function genFor (el) {
	  var exp = el.for;
	  var alias = el.alias;
	  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
	  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
	  el.forProcessed = true; // avoid recursion
	  return "_l((" + exp + ")," +
	    "function(" + alias + iterator1 + iterator2 + "){" +
	      "return " + (genElement(el)) +
	    '})'
	}

	function genData (el) {
	  var data = '{';

	  // directives first.
	  // directives may mutate the el's other properties before they are generated.
	  var dirs = genDirectives(el);
	  if (dirs) { data += dirs + ','; }

	  // key
	  if (el.key) {
	    data += "key:" + (el.key) + ",";
	  }
	  // ref
	  if (el.ref) {
	    data += "ref:" + (el.ref) + ",";
	  }
	  if (el.refInFor) {
	    data += "refInFor:true,";
	  }
	  // pre
	  if (el.pre) {
	    data += "pre:true,";
	  }
	  // record original tag name for components using "is" attribute
	  if (el.component) {
	    data += "tag:\"" + (el.tag) + "\",";
	  }
	  // module data generation functions
	  for (var i = 0; i < dataGenFns.length; i++) {
	    data += dataGenFns[i](el);
	  }
	  // attributes
	  if (el.attrs) {
	    data += "attrs:{" + (genProps(el.attrs)) + "},";
	  }
	  // DOM props
	  if (el.props) {
	    data += "domProps:{" + (genProps(el.props)) + "},";
	  }
	  // event handlers
	  if (el.events) {
	    data += (genHandlers(el.events)) + ",";
	  }
	  if (el.nativeEvents) {
	    data += (genHandlers(el.nativeEvents, true)) + ",";
	  }
	  // slot target
	  if (el.slotTarget) {
	    data += "slot:" + (el.slotTarget) + ",";
	  }
	  // scoped slots
	  if (el.scopedSlots) {
	    data += (genScopedSlots(el.scopedSlots)) + ",";
	  }
	  // inline-template
	  if (el.inlineTemplate) {
	    var inlineTemplate = genInlineTemplate(el);
	    if (inlineTemplate) {
	      data += inlineTemplate + ",";
	    }
	  }
	  data = data.replace(/,$/, '') + '}';
	  // v-bind data wrap
	  if (el.wrapData) {
	    data = el.wrapData(data);
	  }
	  return data
	}

	function genDirectives (el) {
	  var dirs = el.directives;
	  if (!dirs) { return }
	  var res = 'directives:[';
	  var hasRuntime = false;
	  var i, l, dir, needRuntime;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    dir = dirs[i];
	    needRuntime = true;
	    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
	    if (gen) {
	      // compile-time directive that manipulates AST.
	      // returns true if it also needs a runtime counterpart.
	      needRuntime = !!gen(el, dir, warn$2);
	    }
	    if (needRuntime) {
	      hasRuntime = true;
	      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
	    }
	  }
	  if (hasRuntime) {
	    return res.slice(0, -1) + ']'
	  }
	}

	function genInlineTemplate (el) {
	  var ast = el.children[0];
	  if ("development" !== 'production' && (
	    el.children.length > 1 || ast.type !== 1
	  )) {
	    warn$2('Inline-template components must have exactly one child element.');
	  }
	  if (ast.type === 1) {
	    var inlineRenderFns = generate(ast, currentOptions);
	    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
	  }
	}

	function genScopedSlots (slots) {
	  return ("scopedSlots:{" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "}")
	}

	function genScopedSlot (key, el) {
	  return key + ":function(" + (String(el.attrsMap.scope)) + "){" +
	    "return " + (el.tag === 'template'
	      ? genChildren(el) || 'void 0'
	      : genElement(el)) + "}"
	}

	function genChildren (el, checkSkip) {
	  var children = el.children;
	  if (children.length) {
	    var el$1 = children[0];
	    // optimize single v-for
	    if (children.length === 1 &&
	        el$1.for &&
	        el$1.tag !== 'template' &&
	        el$1.tag !== 'slot') {
	      return genElement(el$1)
	    }
	    return ("[" + (children.map(genNode).join(',')) + "]" + (checkSkip
	        ? canSkipNormalization(children) ? '' : ',true'
	        : ''))
	  }
	}

	function canSkipNormalization (children) {
	  for (var i = 0; i < children.length; i++) {
	    var el = children[i];
	    if (needsNormalization(el) ||
	        (el.if && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
	      return false
	    }
	  }
	  return true
	}

	function needsNormalization (el) {
	  return el.for || el.tag === 'template' || el.tag === 'slot'
	}

	function genNode (node) {
	  if (node.type === 1) {
	    return genElement(node)
	  } else {
	    return genText(node)
	  }
	}

	function genText (text) {
	  return ("_v(" + (text.type === 2
	    ? text.expression // no need for () because already wrapped in _s()
	    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
	}

	function genSlot (el) {
	  var slotName = el.slotName || '"default"';
	  var children = genChildren(el);
	  return ("_t(" + slotName + (children ? ("," + children) : '') + (el.attrs ? ((children ? '' : ',null') + ",{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}") : '') + ")")
	}

	// componentName is el.component, take it as argument to shun flow's pessimistic refinement
	function genComponent (componentName, el) {
	  var children = el.inlineTemplate ? null : genChildren(el, true);
	  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
	}

	function genProps (props) {
	  var res = '';
	  for (var i = 0; i < props.length; i++) {
	    var prop = props[i];
	    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
	  }
	  return res.slice(0, -1)
	}

	// #3895, #4268
	function transformSpecialNewlines (text) {
	  return text
	    .replace(/\u2028/g, '\\u2028')
	    .replace(/\u2029/g, '\\u2029')
	}

	/*  */

	/**
	 * Compile a template.
	 */
	function compile$1 (
	  template,
	  options
	) {
	  var ast = parse(template.trim(), options);
	  optimize(ast, options);
	  var code = generate(ast, options);
	  return {
	    ast: ast,
	    render: code.render,
	    staticRenderFns: code.staticRenderFns
	  }
	}

	/*  */

	// operators like typeof, instanceof and in are allowed
	var prohibitedKeywordRE = new RegExp('\\b' + (
	  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
	  'super,throw,while,yield,delete,export,import,return,switch,default,' +
	  'extends,finally,continue,debugger,function,arguments'
	).split(',').join('\\b|\\b') + '\\b');
	// check valid identifier for v-for
	var identRE = /[A-Za-z_$][\w$]*/;
	// strip strings in expressions
	var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

	// detect problematic expressions in a template
	function detectErrors (ast) {
	  var errors = [];
	  if (ast) {
	    checkNode(ast, errors);
	  }
	  return errors
	}

	function checkNode (node, errors) {
	  if (node.type === 1) {
	    for (var name in node.attrsMap) {
	      if (dirRE.test(name)) {
	        var value = node.attrsMap[name];
	        if (value) {
	          if (name === 'v-for') {
	            checkFor(node, ("v-for=\"" + value + "\""), errors);
	          } else {
	            checkExpression(value, (name + "=\"" + value + "\""), errors);
	          }
	        }
	      }
	    }
	    if (node.children) {
	      for (var i = 0; i < node.children.length; i++) {
	        checkNode(node.children[i], errors);
	      }
	    }
	  } else if (node.type === 2) {
	    checkExpression(node.expression, node.text, errors);
	  }
	}

	function checkFor (node, text, errors) {
	  checkExpression(node.for || '', text, errors);
	  checkIdentifier(node.alias, 'v-for alias', text, errors);
	  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
	  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
	}

	function checkIdentifier (ident, type, text, errors) {
	  if (typeof ident === 'string' && !identRE.test(ident)) {
	    errors.push(("- invalid " + type + " \"" + ident + "\" in expression: " + text));
	  }
	}

	function checkExpression (exp, text, errors) {
	  try {
	    new Function(("return " + exp));
	  } catch (e) {
	    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
	    if (keywordMatch) {
	      errors.push(
	        "- avoid using JavaScript keyword as property name: " +
	        "\"" + (keywordMatch[0]) + "\" in expression " + text
	      );
	    } else {
	      errors.push(("- invalid expression: " + text));
	    }
	  }
	}

	/*  */

	function transformNode (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticClass = getAndRemoveAttr(el, 'class');
	  if ("development" !== 'production' && staticClass) {
	    var expression = parseText(staticClass, options.delimiters);
	    if (expression) {
	      warn(
	        "class=\"" + staticClass + "\": " +
	        'Interpolation inside attributes has been removed. ' +
	        'Use v-bind or the colon shorthand instead. For example, ' +
	        'instead of <div class="{{ val }}">, use <div :class="val">.'
	      );
	    }
	  }
	  if (staticClass) {
	    el.staticClass = JSON.stringify(staticClass);
	  }
	  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
	  if (classBinding) {
	    el.classBinding = classBinding;
	  }
	}

	function genData$1 (el) {
	  var data = '';
	  if (el.staticClass) {
	    data += "staticClass:" + (el.staticClass) + ",";
	  }
	  if (el.classBinding) {
	    data += "class:" + (el.classBinding) + ",";
	  }
	  return data
	}

	var klass$1 = {
	  staticKeys: ['staticClass'],
	  transformNode: transformNode,
	  genData: genData$1
	};

	/*  */

	function transformNode$1 (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticStyle = getAndRemoveAttr(el, 'style');
	  if (staticStyle) {
	    /* istanbul ignore if */
	    {
	      var expression = parseText(staticStyle, options.delimiters);
	      if (expression) {
	        warn(
	          "style=\"" + staticStyle + "\": " +
	          'Interpolation inside attributes has been removed. ' +
	          'Use v-bind or the colon shorthand instead. For example, ' +
	          'instead of <div style="{{ val }}">, use <div :style="val">.'
	        );
	      }
	    }
	    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
	  }

	  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
	  if (styleBinding) {
	    el.styleBinding = styleBinding;
	  }
	}

	function genData$2 (el) {
	  var data = '';
	  if (el.staticStyle) {
	    data += "staticStyle:" + (el.staticStyle) + ",";
	  }
	  if (el.styleBinding) {
	    data += "style:(" + (el.styleBinding) + "),";
	  }
	  return data
	}

	var style$1 = {
	  staticKeys: ['staticStyle'],
	  transformNode: transformNode$1,
	  genData: genData$2
	};

	var modules$1 = [
	  klass$1,
	  style$1
	];

	/*  */

	var warn$3;

	function model$1 (
	  el,
	  dir,
	  _warn
	) {
	  warn$3 = _warn;
	  var value = dir.value;
	  var modifiers = dir.modifiers;
	  var tag = el.tag;
	  var type = el.attrsMap.type;
	  {
	    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
	    if (tag === 'input' && dynamicType) {
	      warn$3(
	        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
	        "v-model does not support dynamic input types. Use v-if branches instead."
	      );
	    }
	  }
	  if (tag === 'select') {
	    genSelect(el, value, modifiers);
	  } else if (tag === 'input' && type === 'checkbox') {
	    genCheckboxModel(el, value, modifiers);
	  } else if (tag === 'input' && type === 'radio') {
	    genRadioModel(el, value, modifiers);
	  } else {
	    genDefaultModel(el, value, modifiers);
	  }
	  // ensure runtime directive metadata
	  return true
	}

	function genCheckboxModel (
	  el,
	  value,
	  modifiers
	) {
	  if ("development" !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    );
	  }
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
	  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
	  addProp(el, 'checked',
	    "Array.isArray(" + value + ")" +
	      "?_i(" + value + "," + valueBinding + ")>-1" +
	      ":_q(" + value + "," + trueValueBinding + ")"
	  );
	  addHandler(el, 'change',
	    "var $$a=" + value + "," +
	        '$$el=$event.target,' +
	        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
	    'if(Array.isArray($$a)){' +
	      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
	          '$$i=_i($$a,$$v);' +
	      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
	      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
	    "}else{" + value + "=$$c}",
	    null, true
	  );
	}

	function genRadioModel (
	    el,
	    value,
	    modifiers
	) {
	  if ("development" !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    );
	  }
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
	  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
	  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
	}

	function genDefaultModel (
	  el,
	  value,
	  modifiers
	) {
	  {
	    if (el.tag === 'input' && el.attrsMap.value) {
	      warn$3(
	        "<" + (el.tag) + " v-model=\"" + value + "\" value=\"" + (el.attrsMap.value) + "\">:\n" +
	        'inline value attributes will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      );
	    }
	    if (el.tag === 'textarea' && el.children.length) {
	      warn$3(
	        "<textarea v-model=\"" + value + "\">:\n" +
	        'inline content inside <textarea> will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      );
	    }
	  }

	  var type = el.attrsMap.type;
	  var ref = modifiers || {};
	  var lazy = ref.lazy;
	  var number = ref.number;
	  var trim = ref.trim;
	  var event = lazy || (isIE && type === 'range') ? 'change' : 'input';
	  var needCompositionGuard = !lazy && type !== 'range';
	  var isNative = el.tag === 'input' || el.tag === 'textarea';

	  var valueExpression = isNative
	    ? ("$event.target.value" + (trim ? '.trim()' : ''))
	    : trim ? "(typeof $event === 'string' ? $event.trim() : $event)" : "$event";
	  valueExpression = number || type === 'number'
	    ? ("_n(" + valueExpression + ")")
	    : valueExpression;

	  var code = genAssignmentCode(value, valueExpression);
	  if (isNative && needCompositionGuard) {
	    code = "if($event.target.composing)return;" + code;
	  }

	  // inputs with type="file" are read only and setting the input's
	  // value will throw an error.
	  if ("development" !== 'production' &&
	      type === 'file') {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
	      "File inputs are read only. Use a v-on:change listener instead."
	    );
	  }

	  addProp(el, 'value', isNative ? ("_s(" + value + ")") : ("(" + value + ")"));
	  addHandler(el, event, code, null, true);
	  if (trim || number || type === 'number') {
	    addHandler(el, 'blur', '$forceUpdate()');
	  }
	}

	function genSelect (
	    el,
	    value,
	    modifiers
	) {
	  {
	    el.children.some(checkOptionWarning);
	  }

	  var number = modifiers && modifiers.number;
	  var assignment = "Array.prototype.filter" +
	    ".call($event.target.options,function(o){return o.selected})" +
	    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
	    "return " + (number ? '_n(val)' : 'val') + "})" +
	    (el.attrsMap.multiple == null ? '[0]' : '');

	  var code = genAssignmentCode(value, assignment);
	  addHandler(el, 'change', code, null, true);
	}

	function checkOptionWarning (option) {
	  if (option.type === 1 &&
	    option.tag === 'option' &&
	    option.attrsMap.selected != null) {
	    warn$3(
	      "<select v-model=\"" + (option.parent.attrsMap['v-model']) + "\">:\n" +
	      'inline selected attributes on <option> will be ignored when using v-model. ' +
	      'Declare initial values in the component\'s data option instead.'
	    );
	    return true
	  }
	  return false
	}

	function genAssignmentCode (value, assignment) {
	  var modelRs = parseModel(value);
	  if (modelRs.idx === null) {
	    return (value + "=" + assignment)
	  } else {
	    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
	      "if (!Array.isArray($$exp)){" +
	        value + "=" + assignment + "}" +
	      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
	  }
	}

	/*  */

	function text (el, dir) {
	  if (dir.value) {
	    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
	  }
	}

	/*  */

	function html (el, dir) {
	  if (dir.value) {
	    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
	  }
	}

	var directives$1 = {
	  model: model$1,
	  text: text,
	  html: html
	};

	/*  */

	var cache = Object.create(null);

	var baseOptions = {
	  expectHTML: true,
	  modules: modules$1,
	  staticKeys: genStaticKeys(modules$1),
	  directives: directives$1,
	  isReservedTag: isReservedTag,
	  isUnaryTag: isUnaryTag,
	  mustUseProp: mustUseProp,
	  getTagNamespace: getTagNamespace,
	  isPreTag: isPreTag
	};

	function compile$$1 (
	  template,
	  options
	) {
	  options = options
	    ? extend(extend({}, baseOptions), options)
	    : baseOptions;
	  return compile$1(template, options)
	}

	function compileToFunctions (
	  template,
	  options,
	  vm
	) {
	  var _warn = (options && options.warn) || warn;
	  // detect possible CSP restriction
	  /* istanbul ignore if */
	  {
	    try {
	      new Function('return 1');
	    } catch (e) {
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        _warn(
	          'It seems you are using the standalone build of Vue.js in an ' +
	          'environment with Content Security Policy that prohibits unsafe-eval. ' +
	          'The template compiler cannot work in this environment. Consider ' +
	          'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
	          'templates into render functions.'
	        );
	      }
	    }
	  }
	  var key = options && options.delimiters
	    ? String(options.delimiters) + template
	    : template;
	  if (cache[key]) {
	    return cache[key]
	  }
	  var res = {};
	  var compiled = compile$$1(template, options);
	  res.render = makeFunction(compiled.render);
	  var l = compiled.staticRenderFns.length;
	  res.staticRenderFns = new Array(l);
	  for (var i = 0; i < l; i++) {
	    res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i]);
	  }
	  {
	    if (res.render === noop || res.staticRenderFns.some(function (fn) { return fn === noop; })) {
	      _warn(
	        "failed to compile template:\n\n" + template + "\n\n" +
	        detectErrors(compiled.ast).join('\n') +
	        '\n\n',
	        vm
	      );
	    }
	  }
	  return (cache[key] = res)
	}

	function makeFunction (code) {
	  try {
	    return new Function(code)
	  } catch (e) {
	    return noop
	  }
	}

	/*  */

	var idToTemplate = cached(function (id) {
	  var el = query(id);
	  return el && el.innerHTML
	});

	var mount = Vue$3.prototype.$mount;
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && query(el);

	  /* istanbul ignore if */
	  if (el === document.body || el === document.documentElement) {
	    "development" !== 'production' && warn(
	      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
	    );
	    return this
	  }

	  var options = this.$options;
	  // resolve template/el and convert to render function
	  if (!options.render) {
	    var template = options.template;
	    if (template) {
	      if (typeof template === 'string') {
	        if (template.charAt(0) === '#') {
	          template = idToTemplate(template);
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !template) {
	            warn(
	              ("Template element not found or is empty: " + (options.template)),
	              this
	            );
	          }
	        }
	      } else if (template.nodeType) {
	        template = template.innerHTML;
	      } else {
	        {
	          warn('invalid template option:' + template, this);
	        }
	        return this
	      }
	    } else if (el) {
	      template = getOuterHTML(el);
	    }
	    if (template) {
	      var ref = compileToFunctions(template, {
	        warn: warn,
	        shouldDecodeNewlines: shouldDecodeNewlines,
	        delimiters: options.delimiters
	      }, this);
	      var render = ref.render;
	      var staticRenderFns = ref.staticRenderFns;
	      options.render = render;
	      options.staticRenderFns = staticRenderFns;
	    }
	  }
	  return mount.call(this, el, hydrating)
	};

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 */
	function getOuterHTML (el) {
	  if (el.outerHTML) {
	    return el.outerHTML
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML
	  }
	}

	Vue$3.compile = compileToFunctions;

	return Vue$3;

	})));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	var _vuex = __webpack_require__(4);

	var _vuex2 = _interopRequireDefault(_vuex);

	var _axios = __webpack_require__(5);

	var _axios2 = _interopRequireDefault(_axios);

	var _actions = __webpack_require__(31);

	var _actions2 = _interopRequireDefault(_actions);

	var _mutations = __webpack_require__(32);

	var _mutations2 = _interopRequireDefault(_mutations);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vuex2.default);

	var store = new _vuex2.default.Store({
		state: {
			footerLinks: [],
			searchLists: [],
			articles: []
		},
		getters: {},
		mutations: _mutations2.default,
		actions: _actions2.default
	});

	exports.default = store;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * vuex v2.1.1
	 * (c) 2016 Evan You
	 * @license MIT
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.Vuex = factory());
	}(this, (function () { 'use strict';

	var devtoolHook =
	  typeof window !== 'undefined' &&
	  window.__VUE_DEVTOOLS_GLOBAL_HOOK__

	function devtoolPlugin (store) {
	  if (!devtoolHook) { return }

	  store._devtoolHook = devtoolHook

	  devtoolHook.emit('vuex:init', store)

	  devtoolHook.on('vuex:travel-to-state', function (targetState) {
	    store.replaceState(targetState)
	  })

	  store.subscribe(function (mutation, state) {
	    devtoolHook.emit('vuex:mutation', mutation, state)
	  })
	}

	function applyMixin (Vue) {
	  var version = Number(Vue.version.split('.')[0])

	  if (version >= 2) {
	    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1
	    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit })
	  } else {
	    // override init and inject vuex init procedure
	    // for 1.x backwards compatibility.
	    var _init = Vue.prototype._init
	    Vue.prototype._init = function (options) {
	      if ( options === void 0 ) options = {};

	      options.init = options.init
	        ? [vuexInit].concat(options.init)
	        : vuexInit
	      _init.call(this, options)
	    }
	  }

	  /**
	   * Vuex init hook, injected into each instances init hooks list.
	   */

	  function vuexInit () {
	    var options = this.$options
	    // store injection
	    if (options.store) {
	      this.$store = options.store
	    } else if (options.parent && options.parent.$store) {
	      this.$store = options.parent.$store
	    }
	  }
	}

	var mapState = normalizeNamespace(function (namespace, states) {
	  var res = {}
	  normalizeMap(states).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;

	    res[key] = function mappedState () {
	      var state = this.$store.state
	      var getters = this.$store.getters
	      if (namespace) {
	        var module = this.$store._modulesNamespaceMap[namespace]
	        if (!module) {
	          warnNamespace('mapState', namespace)
	          return
	        }
	        state = module.state
	        getters = module.context.getters
	      }
	      return typeof val === 'function'
	        ? val.call(this, state, getters)
	        : state[val]
	    }
	  })
	  return res
	})

	var mapMutations = normalizeNamespace(function (namespace, mutations) {
	  var res = {}
	  normalizeMap(mutations).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;

	    val = namespace + val
	    res[key] = function mappedMutation () {
	      var args = [], len = arguments.length;
	      while ( len-- ) args[ len ] = arguments[ len ];

	      return this.$store.commit.apply(this.$store, [val].concat(args))
	    }
	  })
	  return res
	})

	var mapGetters = normalizeNamespace(function (namespace, getters) {
	  var res = {}
	  normalizeMap(getters).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;

	    val = namespace + val
	    res[key] = function mappedGetter () {
	      if (!(val in this.$store.getters)) {
	        console.error(("[vuex] unknown getter: " + val))
	      }
	      return this.$store.getters[val]
	    }
	  })
	  return res
	})

	var mapActions = normalizeNamespace(function (namespace, actions) {
	  var res = {}
	  normalizeMap(actions).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;

	    val = namespace + val
	    res[key] = function mappedAction () {
	      var args = [], len = arguments.length;
	      while ( len-- ) args[ len ] = arguments[ len ];

	      return this.$store.dispatch.apply(this.$store, [val].concat(args))
	    }
	  })
	  return res
	})

	function normalizeMap (map) {
	  return Array.isArray(map)
	    ? map.map(function (key) { return ({ key: key, val: key }); })
	    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
	}

	function normalizeNamespace (fn) {
	  return function (namespace, map) {
	    if (typeof namespace !== 'string') {
	      map = namespace
	      namespace = ''
	    } else if (namespace.charAt(namespace.length - 1) !== '/') {
	      namespace += '/'
	    }
	    return fn(namespace, map)
	  }
	}

	function warnNamespace (helper, namespace) {
	  console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace))
	}

	/**
	 * forEach for object
	 */
	function forEachValue (obj, fn) {
	  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); })
	}

	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	function isPromise (val) {
	  return val && typeof val.then === 'function'
	}

	function assert (condition, msg) {
	  if (!condition) { throw new Error(("[vuex] " + msg)) }
	}

	var Module = function Module (rawModule, runtime) {
	  this.runtime = runtime
	  this._children = Object.create(null)
	  this._rawModule = rawModule
	};

	var prototypeAccessors$1 = { state: {},namespaced: {} };

	prototypeAccessors$1.state.get = function () {
	  return this._rawModule.state || {}
	};

	prototypeAccessors$1.namespaced.get = function () {
	  return !!this._rawModule.namespaced
	};

	Module.prototype.addChild = function addChild (key, module) {
	  this._children[key] = module
	};

	Module.prototype.removeChild = function removeChild (key) {
	  delete this._children[key]
	};

	Module.prototype.getChild = function getChild (key) {
	  return this._children[key]
	};

	Module.prototype.update = function update (rawModule) {
	  this._rawModule.namespaced = rawModule.namespaced
	  if (rawModule.actions) {
	    this._rawModule.actions = rawModule.actions
	  }
	  if (rawModule.mutations) {
	    this._rawModule.mutations = rawModule.mutations
	  }
	  if (rawModule.getters) {
	    this._rawModule.getters = rawModule.getters
	  }
	};

	Module.prototype.forEachChild = function forEachChild (fn) {
	  forEachValue(this._children, fn)
	};

	Module.prototype.forEachGetter = function forEachGetter (fn) {
	  if (this._rawModule.getters) {
	    forEachValue(this._rawModule.getters, fn)
	  }
	};

	Module.prototype.forEachAction = function forEachAction (fn) {
	  if (this._rawModule.actions) {
	    forEachValue(this._rawModule.actions, fn)
	  }
	};

	Module.prototype.forEachMutation = function forEachMutation (fn) {
	  if (this._rawModule.mutations) {
	    forEachValue(this._rawModule.mutations, fn)
	  }
	};

	Object.defineProperties( Module.prototype, prototypeAccessors$1 );

	var ModuleCollection = function ModuleCollection (rawRootModule) {
	  var this$1 = this;

	  // register root module (Vuex.Store options)
	  this.root = new Module(rawRootModule, false)

	  // register all nested modules
	  if (rawRootModule.modules) {
	    forEachValue(rawRootModule.modules, function (rawModule, key) {
	      this$1.register([key], rawModule, false)
	    })
	  }
	};

	ModuleCollection.prototype.get = function get (path) {
	  return path.reduce(function (module, key) {
	    return module.getChild(key)
	  }, this.root)
	};

	ModuleCollection.prototype.getNamespace = function getNamespace (path) {
	  var module = this.root
	  return path.reduce(function (namespace, key) {
	    module = module.getChild(key)
	    return namespace + (module.namespaced ? key + '/' : '')
	  }, '')
	};

	ModuleCollection.prototype.update = function update$1 (rawRootModule) {
	  update(this.root, rawRootModule)
	};

	ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
	    var this$1 = this;
	    if ( runtime === void 0 ) runtime = true;

	  var parent = this.get(path.slice(0, -1))
	  var newModule = new Module(rawModule, runtime)
	  parent.addChild(path[path.length - 1], newModule)

	  // register nested modules
	  if (rawModule.modules) {
	    forEachValue(rawModule.modules, function (rawChildModule, key) {
	      this$1.register(path.concat(key), rawChildModule, runtime)
	    })
	  }
	};

	ModuleCollection.prototype.unregister = function unregister (path) {
	  var parent = this.get(path.slice(0, -1))
	  var key = path[path.length - 1]
	  if (!parent.getChild(key).runtime) { return }

	  parent.removeChild(key)
	};

	function update (targetModule, newModule) {
	  // update target module
	  targetModule.update(newModule)

	  // update nested modules
	  if (newModule.modules) {
	    for (var key in newModule.modules) {
	      if (!targetModule.getChild(key)) {
	        console.warn(
	          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
	          'manual reload is needed'
	        )
	        return
	      }
	      update(targetModule.getChild(key), newModule.modules[key])
	    }
	  }
	}

	var Vue // bind on install

	var Store = function Store (options) {
	  var this$1 = this;
	  if ( options === void 0 ) options = {};

	  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.")
	  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.")

	  var state = options.state; if ( state === void 0 ) state = {};
	  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
	  var strict = options.strict; if ( strict === void 0 ) strict = false;

	  // store internal state
	  this._committing = false
	  this._actions = Object.create(null)
	  this._mutations = Object.create(null)
	  this._wrappedGetters = Object.create(null)
	  this._modules = new ModuleCollection(options)
	  this._modulesNamespaceMap = Object.create(null)
	  this._subscribers = []
	  this._watcherVM = new Vue()

	  // bind commit and dispatch to self
	  var store = this
	  var ref = this;
	  var dispatch = ref.dispatch;
	  var commit = ref.commit;
	    this.dispatch = function boundDispatch (type, payload) {
	    return dispatch.call(store, type, payload)
	  }
	  this.commit = function boundCommit (type, payload, options) {
	    return commit.call(store, type, payload, options)
	    }

	    // strict mode
	  this.strict = strict

	  // init root module.
	  // this also recursively registers all sub-modules
	  // and collects all module getters inside this._wrappedGetters
	  installModule(this, state, [], this._modules.root)

	  // initialize the store vm, which is responsible for the reactivity
	  // (also registers _wrappedGetters as computed properties)
	  resetStoreVM(this, state)

	  // apply plugins
	  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); })
	};

	var prototypeAccessors = { state: {} };

	prototypeAccessors.state.get = function () {
	  return this._vm.$data.state
	};

	prototypeAccessors.state.set = function (v) {
	  assert(false, "Use store.replaceState() to explicit replace store state.")
	};

	Store.prototype.commit = function commit (_type, _payload, _options) {
	    var this$1 = this;

	  // check object-style commit
	  var ref = unifyObjectStyle(_type, _payload, _options);
	    var type = ref.type;
	    var payload = ref.payload;
	    var options = ref.options;

	  var mutation = { type: type, payload: payload }
	  var entry = this._mutations[type]
	  if (!entry) {
	    console.error(("[vuex] unknown mutation type: " + type))
	    return
	  }
	  this._withCommit(function () {
	    entry.forEach(function commitIterator (handler) {
	      handler(payload)
	    })
	  })
	  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); })

	  if (options && options.silent) {
	    console.warn(
	      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
	      'Use the filter functionality in the vue-devtools'
	    )
	  }
	};

	Store.prototype.dispatch = function dispatch (_type, _payload) {
	  // check object-style dispatch
	  var ref = unifyObjectStyle(_type, _payload);
	    var type = ref.type;
	    var payload = ref.payload;

	  var entry = this._actions[type]
	  if (!entry) {
	    console.error(("[vuex] unknown action type: " + type))
	    return
	  }
	  return entry.length > 1
	    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
	    : entry[0](payload)
	};

	Store.prototype.subscribe = function subscribe (fn) {
	  var subs = this._subscribers
	  if (subs.indexOf(fn) < 0) {
	    subs.push(fn)
	  }
	  return function () {
	    var i = subs.indexOf(fn)
	    if (i > -1) {
	      subs.splice(i, 1)
	    }
	  }
	};

	Store.prototype.watch = function watch (getter, cb, options) {
	    var this$1 = this;

	  assert(typeof getter === 'function', "store.watch only accepts a function.")
	  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
	};

	Store.prototype.replaceState = function replaceState (state) {
	    var this$1 = this;

	  this._withCommit(function () {
	    this$1._vm.state = state
	  })
	};

	Store.prototype.registerModule = function registerModule (path, rawModule) {
	  if (typeof path === 'string') { path = [path] }
	  assert(Array.isArray(path), "module path must be a string or an Array.")
	  this._modules.register(path, rawModule)
	  installModule(this, this.state, path, this._modules.get(path))
	  // reset store to update getters...
	  resetStoreVM(this, this.state)
	};

	Store.prototype.unregisterModule = function unregisterModule (path) {
	    var this$1 = this;

	  if (typeof path === 'string') { path = [path] }
	  assert(Array.isArray(path), "module path must be a string or an Array.")
	    this._modules.unregister(path)
	  this._withCommit(function () {
	    var parentState = getNestedState(this$1.state, path.slice(0, -1))
	    Vue.delete(parentState, path[path.length - 1])
	  })
	  resetStore(this)
	};

	Store.prototype.hotUpdate = function hotUpdate (newOptions) {
	  this._modules.update(newOptions)
	  resetStore(this)
	};

	Store.prototype._withCommit = function _withCommit (fn) {
	  var committing = this._committing
	  this._committing = true
	  fn()
	  this._committing = committing
	};

	Object.defineProperties( Store.prototype, prototypeAccessors );

	function resetStore (store) {
	  store._actions = Object.create(null)
	  store._mutations = Object.create(null)
	  store._wrappedGetters = Object.create(null)
	  store._modulesNamespaceMap = Object.create(null)
	  var state = store.state
	  // init all modules
	  installModule(store, state, [], store._modules.root, true)
	  // reset vm
	  resetStoreVM(store, state)
	}

	function resetStoreVM (store, state) {
	  var oldVm = store._vm

	  // bind store public getters
	  store.getters = {}
	  var wrappedGetters = store._wrappedGetters
	  var computed = {}
	  forEachValue(wrappedGetters, function (fn, key) {
	    // use computed to leverage its lazy-caching mechanism
	    computed[key] = function () { return fn(store); }
	    Object.defineProperty(store.getters, key, {
	      get: function () { return store._vm[key]; },
	      enumerable: true // for local getters
	    })
	  })

	  // use a Vue instance to store the state tree
	  // suppress warnings just in case the user has added
	  // some funky global mixins
	  var silent = Vue.config.silent
	  Vue.config.silent = true
	  store._vm = new Vue({
	    data: { state: state },
	    computed: computed
	  })
	  Vue.config.silent = silent

	  // enable strict mode for new vm
	  if (store.strict) {
	    enableStrictMode(store)
	  }

	  if (oldVm) {
	    // dispatch changes in all subscribed watchers
	    // to force getter re-evaluation.
	    store._withCommit(function () {
	      oldVm.state = null
	    })
	    Vue.nextTick(function () { return oldVm.$destroy(); })
	  }
	}

	function installModule (store, rootState, path, module, hot) {
	  var isRoot = !path.length
	  var namespace = store._modules.getNamespace(path)

	  // register in namespace map
	  if (namespace) {
	    store._modulesNamespaceMap[namespace] = module
	  }

	  // set state
	  if (!isRoot && !hot) {
	    var parentState = getNestedState(rootState, path.slice(0, -1))
	    var moduleName = path[path.length - 1]
	    store._withCommit(function () {
	      Vue.set(parentState, moduleName, module.state)
	    })
	  }

	  var local = module.context = makeLocalContext(store, namespace)

	  module.forEachMutation(function (mutation, key) {
	    var namespacedType = namespace + key
	    registerMutation(store, namespacedType, mutation, path)
	  })

	  module.forEachAction(function (action, key) {
	    var namespacedType = namespace + key
	    registerAction(store, namespacedType, action, local, path)
	  })

	  module.forEachGetter(function (getter, key) {
	    var namespacedType = namespace + key
	    registerGetter(store, namespacedType, getter, local, path)
	  })

	  module.forEachChild(function (child, key) {
	    installModule(store, rootState, path.concat(key), child, hot)
	  })
	}

	/**
	 * make localized dispatch, commit and getters
	 * if there is no namespace, just use root ones
	 */
	function makeLocalContext (store, namespace) {
	  var noNamespace = namespace === ''

	  var local = {
	    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
	      var args = unifyObjectStyle(_type, _payload, _options)
	      var payload = args.payload;
	      var options = args.options;
	      var type = args.type;

	      if (!options || !options.root) {
	        type = namespace + type
	        if (!store._actions[type]) {
	          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type))
	          return
	        }
	      }

	      return store.dispatch(type, payload)
	    },

	    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
	      var args = unifyObjectStyle(_type, _payload, _options)
	      var payload = args.payload;
	      var options = args.options;
	      var type = args.type;

	      if (!options || !options.root) {
	        type = namespace + type
	        if (!store._mutations[type]) {
	          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type))
	          return
	        }
	      }

	      store.commit(type, payload, options)
	    }
	  }

	  // getters object must be gotten lazily
	  // because store.getters will be changed by vm update
	  Object.defineProperty(local, 'getters', {
	    get: noNamespace ? function () { return store.getters; } : function () { return makeLocalGetters(store, namespace); }
	  })

	  return local
	}

	function makeLocalGetters (store, namespace) {
	  var gettersProxy = {}

	  var splitPos = namespace.length
	  Object.keys(store.getters).forEach(function (type) {
	    // skip if the target getter is not match this namespace
	    if (type.slice(0, splitPos) !== namespace) { return }

	    // extract local getter type
	    var localType = type.slice(splitPos)

	    // Add a port to the getters proxy.
	    // Define as getter property because
	    // we do not want to evaluate the getters in this time.
	    Object.defineProperty(gettersProxy, localType, {
	      get: function () { return store.getters[type]; },
	      enumerable: true
	    })
	  })

	  return gettersProxy
	}

	function registerMutation (store, type, handler, path) {
	  var entry = store._mutations[type] || (store._mutations[type] = [])
	  entry.push(function wrappedMutationHandler (payload) {
	    handler(getNestedState(store.state, path), payload)
	  })
	}

	function registerAction (store, type, handler, local, path) {
	  var entry = store._actions[type] || (store._actions[type] = [])
	  entry.push(function wrappedActionHandler (payload, cb) {
	    var res = handler({
	      dispatch: local.dispatch,
	      commit: local.commit,
	      getters: local.getters,
	      state: getNestedState(store.state, path),
	      rootGetters: store.getters,
	      rootState: store.state
	    }, payload, cb)
	    if (!isPromise(res)) {
	      res = Promise.resolve(res)
	    }
	    if (store._devtoolHook) {
	      return res.catch(function (err) {
	        store._devtoolHook.emit('vuex:error', err)
	        throw err
	      })
	    } else {
	      return res
	    }
	  })
	}

	function registerGetter (store, type, rawGetter, local, path) {
	  if (store._wrappedGetters[type]) {
	    console.error(("[vuex] duplicate getter key: " + type))
	    return
	  }
	  store._wrappedGetters[type] = function wrappedGetter (store) {
	    return rawGetter(
	      getNestedState(store.state, path), // local state
	      local.getters, // local getters
	      store.state, // root state
	      store.getters // root getters
	    )
	  }
	}

	function enableStrictMode (store) {
	  store._vm.$watch('state', function () {
	    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.")
	  }, { deep: true, sync: true })
	}

	function getNestedState (state, path) {
	  return path.length
	    ? path.reduce(function (state, key) { return state[key]; }, state)
	    : state
	}

	function unifyObjectStyle (type, payload, options) {
	  if (isObject(type) && type.type) {
	    options = payload
	    payload = type
	    type = type.type
	  }
	  return { type: type, payload: payload, options: options }
	}

	function install (_Vue) {
	  if (Vue) {
	    console.error(
	      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
	    )
	    return
	  }
	  Vue = _Vue
	  applyMixin(Vue)
	}

	// auto install in dist mode
	if (typeof window !== 'undefined' && window.Vue) {
	  install(window.Vue)
	}

	var index = {
	  Store: Store,
	  install: install,
	  version: '2.1.1',
	  mapState: mapState,
	  mapMutations: mapMutations,
	  mapGetters: mapGetters,
	  mapActions: mapActions
	}

	return index;

	})));

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);
	var bind = __webpack_require__(8);
	var Axios = __webpack_require__(9);
	var defaults = __webpack_require__(10);

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(28);
	axios.CancelToken = __webpack_require__(29);
	axios.isCancel = __webpack_require__(25);

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(30);

	module.exports = axios;

	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(8);

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(10);
	var utils = __webpack_require__(7);
	var InterceptorManager = __webpack_require__(22);
	var dispatchRequest = __webpack_require__(23);
	var isAbsoluteURL = __webpack_require__(26);
	var combineURLs = __webpack_require__(27);

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	module.exports = Axios;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(7);
	var normalizeHeaderName = __webpack_require__(12);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(13);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(13);
	  }
	  return adapter;
	}

	var defaults = {
	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
	  defaults.headers[method] = {};
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});

	module.exports = defaults;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(7);
	var settle = __webpack_require__(14);
	var buildURL = __webpack_require__(17);
	var parseHeaders = __webpack_require__(18);
	var isURLSameOrigin = __webpack_require__(19);
	var createError = __webpack_require__(15);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(20);

	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (process.env.NODE_ENV !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(21);

	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        if (request.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(15);

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response
	    ));
	  }
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(16);

	/**
	 * Create an Error with the specified message, config, error code, and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, response);
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.response = response;
	  return error;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }

	      if (!utils.isArray(val)) {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);
	var transformData = __webpack_require__(24);
	var isCancel = __webpack_require__(25);
	var defaults = __webpack_require__(10);

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(7);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	module.exports = Cancel;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Cancel = __webpack_require__(28);

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	module.exports = CancelToken;


/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _axios = __webpack_require__(5);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    GET_FOOTER_LINKS: function GET_FOOTER_LINKS(_ref) {
	        var commit = _ref.commit;

	        return _axios2.default.get('/getFooterLink').then(function (res) {
	            commit('SET_FOOTER_LINKS', res.data);
	        });
	    },
	    GET_SEARCH_LISTS: function GET_SEARCH_LISTS(_ref2) {
	        var commit = _ref2.commit;

	        return _axios2.default.get('/getSearchLists').then(function (res) {
	            commit('SET_SEARCH_LISTS', res.data);
	        });
	    },
	    GET_ARTICALS: function GET_ARTICALS(_ref3) {
	        var commit = _ref3.commit;

	        return _axios2.default.get('/getArticals').then(function (res) {
	            commit('SET_ARTICAL', res.data);
	        });
	    }
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    SET_FOOTER_LINKS: function SET_FOOTER_LINKS(state, links) {
	        state.footerLinks = links;
	    },
	    SET_SEARCH_LISTS: function SET_SEARCH_LISTS(state, lists) {
	        state.searchLists = lists;
	    },
	    SET_ARTICAL: function SET_ARTICAL(state, lists) {
	        state.articles = lists;
	    }
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	  * vue-router v2.1.1
	  * (c) 2016 Evan You
	  * @license MIT
	  */
	'use strict';

	var View = {
	  name: 'router-view',
	  functional: true,
	  props: {
	    name: {
	      type: String,
	      default: 'default'
	    }
	  },
	  render: function render (h, ref) {
	    var props = ref.props;
	    var children = ref.children;
	    var parent = ref.parent;
	    var data = ref.data;

	    data.routerView = true

	    var route = parent.$route
	    var cache = parent._routerViewCache || (parent._routerViewCache = {})
	    var depth = 0
	    var inactive = false

	    while (parent) {
	      if (parent.$vnode && parent.$vnode.data.routerView) {
	        depth++
	      }
	      if (parent._inactive) {
	        inactive = true
	      }
	      parent = parent.$parent
	    }

	    data.routerViewDepth = depth
	    var matched = route.matched[depth]
	    if (!matched) {
	      return h()
	    }

	    var name = props.name
	    var component = inactive
	      ? cache[name]
	      : (cache[name] = matched.components[name])

	    if (!inactive) {
	      var hooks = data.hook || (data.hook = {})
	      hooks.init = function (vnode) {
	        matched.instances[name] = vnode.child
	      }
	      hooks.prepatch = function (oldVnode, vnode) {
	        matched.instances[name] = vnode.child
	      }
	      hooks.destroy = function (vnode) {
	        if (matched.instances[name] === vnode.child) {
	          matched.instances[name] = undefined
	        }
	      }
	    }

	    return h(component, data, children)
	  }
	}

	/*  */

	function assert (condition, message) {
	  if (!condition) {
	    throw new Error(("[vue-router] " + message))
	  }
	}

	function warn (condition, message) {
	  if (!condition) {
	    typeof console !== 'undefined' && console.warn(("[vue-router] " + message))
	  }
	}

	/*  */

	var encode = encodeURIComponent
	var decode = decodeURIComponent

	function resolveQuery (
	  query,
	  extraQuery
	) {
	  if ( extraQuery === void 0 ) extraQuery = {};

	  if (query) {
	    var parsedQuery
	    try {
	      parsedQuery = parseQuery(query)
	    } catch (e) {
	      process.env.NODE_ENV !== 'production' && warn(false, e.message)
	      parsedQuery = {}
	    }
	    for (var key in extraQuery) {
	      parsedQuery[key] = extraQuery[key]
	    }
	    return parsedQuery
	  } else {
	    return extraQuery
	  }
	}

	function parseQuery (query) {
	  var res = {}

	  query = query.trim().replace(/^(\?|#|&)/, '')

	  if (!query) {
	    return res
	  }

	  query.split('&').forEach(function (param) {
	    var parts = param.replace(/\+/g, ' ').split('=')
	    var key = decode(parts.shift())
	    var val = parts.length > 0
	      ? decode(parts.join('='))
	      : null

	    if (res[key] === undefined) {
	      res[key] = val
	    } else if (Array.isArray(res[key])) {
	      res[key].push(val)
	    } else {
	      res[key] = [res[key], val]
	    }
	  })

	  return res
	}

	function stringifyQuery (obj) {
	  var res = obj ? Object.keys(obj).map(function (key) {
	    var val = obj[key]

	    if (val === undefined) {
	      return ''
	    }

	    if (val === null) {
	      return encode(key)
	    }

	    if (Array.isArray(val)) {
	      var result = []
	      val.slice().forEach(function (val2) {
	        if (val2 === undefined) {
	          return
	        }
	        if (val2 === null) {
	          result.push(encode(key))
	        } else {
	          result.push(encode(key) + '=' + encode(val2))
	        }
	      })
	      return result.join('&')
	    }

	    return encode(key) + '=' + encode(val)
	  }).filter(function (x) { return x.length > 0; }).join('&') : null
	  return res ? ("?" + res) : ''
	}

	/*  */

	function createRoute (
	  record,
	  location,
	  redirectedFrom
	) {
	  var route = {
	    name: location.name || (record && record.name),
	    meta: (record && record.meta) || {},
	    path: location.path || '/',
	    hash: location.hash || '',
	    query: location.query || {},
	    params: location.params || {},
	    fullPath: getFullPath(location),
	    matched: record ? formatMatch(record) : []
	  }
	  if (redirectedFrom) {
	    route.redirectedFrom = getFullPath(redirectedFrom)
	  }
	  return Object.freeze(route)
	}

	// the starting route that represents the initial state
	var START = createRoute(null, {
	  path: '/'
	})

	function formatMatch (record) {
	  var res = []
	  while (record) {
	    res.unshift(record)
	    record = record.parent
	  }
	  return res
	}

	function getFullPath (ref) {
	  var path = ref.path;
	  var query = ref.query; if ( query === void 0 ) query = {};
	  var hash = ref.hash; if ( hash === void 0 ) hash = '';

	  return (path || '/') + stringifyQuery(query) + hash
	}

	var trailingSlashRE = /\/$/
	function isSameRoute (a, b) {
	  if (b === START) {
	    return a === b
	  } else if (!b) {
	    return false
	  } else if (a.path && b.path) {
	    return (
	      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query)
	    )
	  } else if (a.name && b.name) {
	    return (
	      a.name === b.name &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query) &&
	      isObjectEqual(a.params, b.params)
	    )
	  } else {
	    return false
	  }
	}

	function isObjectEqual (a, b) {
	  if ( a === void 0 ) a = {};
	  if ( b === void 0 ) b = {};

	  var aKeys = Object.keys(a)
	  var bKeys = Object.keys(b)
	  if (aKeys.length !== bKeys.length) {
	    return false
	  }
	  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
	}

	function isIncludedRoute (current, target) {
	  return (
	    current.path.indexOf(target.path.replace(/\/$/, '')) === 0 &&
	    (!target.hash || current.hash === target.hash) &&
	    queryIncludes(current.query, target.query)
	  )
	}

	function queryIncludes (current, target) {
	  for (var key in target) {
	    if (!(key in current)) {
	      return false
	    }
	  }
	  return true
	}

	/*  */

	// work around weird flow bug
	var toTypes = [String, Object]

	var Link = {
	  name: 'router-link',
	  props: {
	    to: {
	      type: toTypes,
	      required: true
	    },
	    tag: {
	      type: String,
	      default: 'a'
	    },
	    exact: Boolean,
	    append: Boolean,
	    replace: Boolean,
	    activeClass: String,
	    event: {
	      type: [String, Array],
	      default: 'click'
	    }
	  },
	  render: function render (h) {
	    var this$1 = this;

	    var router = this.$router
	    var current = this.$route
	    var ref = router.resolve(this.to, current, this.append);
	    var normalizedTo = ref.normalizedTo;
	    var resolved = ref.resolved;
	    var href = ref.href;
	    var classes = {}
	    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active'
	    var compareTarget = normalizedTo.path ? createRoute(null, normalizedTo) : resolved
	    classes[activeClass] = this.exact
	      ? isSameRoute(current, compareTarget)
	      : isIncludedRoute(current, compareTarget)

	    var handler = function (e) {
	      if (guardEvent(e)) {
	        if (this$1.replace) {
	          router.replace(normalizedTo)
	        } else {
	          router.push(normalizedTo)
	        }
	      }
	    }

	    var on = { click: guardEvent }
	    if (Array.isArray(this.event)) {
	      this.event.forEach(function (e) { on[e] = handler })
	    } else {
	      on[this.event] = handler
	    }

	    var data = {
	      class: classes
	    }

	    if (this.tag === 'a') {
	      data.on = on
	      data.attrs = { href: href }
	    } else {
	      // find the first <a> child and apply listener and href
	      var a = findAnchor(this.$slots.default)
	      if (a) {
	        // in case the <a> is a static node
	        a.isStatic = false
	        var extend = _Vue.util.extend
	        var aData = a.data = extend({}, a.data)
	        aData.on = on
	        var aAttrs = a.data.attrs = extend({}, a.data.attrs)
	        aAttrs.href = href
	      } else {
	        // doesn't have <a> child, apply listener to self
	        data.on = on
	      }
	    }

	    return h(this.tag, data, this.$slots.default)
	  }
	}

	function guardEvent (e) {
	  // don't redirect with control keys
	  /* istanbul ignore if */
	  if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
	  // don't redirect when preventDefault called
	  /* istanbul ignore if */
	  if (e.defaultPrevented) { return }
	  // don't redirect on right click
	  /* istanbul ignore if */
	  if (e.button !== 0) { return }
	  // don't redirect if `target="_blank"`
	  /* istanbul ignore if */
	  var target = e.target.getAttribute('target')
	  if (/\b_blank\b/i.test(target)) { return }

	  e.preventDefault()
	  return true
	}

	function findAnchor (children) {
	  if (children) {
	    var child
	    for (var i = 0; i < children.length; i++) {
	      child = children[i]
	      if (child.tag === 'a') {
	        return child
	      }
	      if (child.children && (child = findAnchor(child.children))) {
	        return child
	      }
	    }
	  }
	}

	var _Vue

	function install (Vue) {
	  if (install.installed) { return }
	  install.installed = true

	  _Vue = Vue

	  Object.defineProperty(Vue.prototype, '$router', {
	    get: function get () { return this.$root._router }
	  })

	  Object.defineProperty(Vue.prototype, '$route', {
	    get: function get$1 () { return this.$root._route }
	  })

	  Vue.mixin({
	    beforeCreate: function beforeCreate () {
	      if (this.$options.router) {
	        this._router = this.$options.router
	        this._router.init(this)
	        Vue.util.defineReactive(this, '_route', this._router.history.current)
	      }
	    }
	  })

	  Vue.component('router-view', View)
	  Vue.component('router-link', Link)

	  var strats = Vue.config.optionMergeStrategies
	  // use the same hook merging strategy for route hooks
	  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created
	}

	/*  */

	function resolvePath (
	  relative,
	  base,
	  append
	) {
	  if (relative.charAt(0) === '/') {
	    return relative
	  }

	  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
	    return base + relative
	  }

	  var stack = base.split('/')

	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop()
	  }

	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/')
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i]
	    if (segment === '.') {
	      continue
	    } else if (segment === '..') {
	      stack.pop()
	    } else {
	      stack.push(segment)
	    }
	  }

	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('')
	  }

	  return stack.join('/')
	}

	function parsePath (path) {
	  var hash = ''
	  var query = ''

	  var hashIndex = path.indexOf('#')
	  if (hashIndex >= 0) {
	    hash = path.slice(hashIndex)
	    path = path.slice(0, hashIndex)
	  }

	  var queryIndex = path.indexOf('?')
	  if (queryIndex >= 0) {
	    query = path.slice(queryIndex + 1)
	    path = path.slice(0, queryIndex)
	  }

	  return {
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	function cleanPath (path) {
	  return path.replace(/\/\//g, '/')
	}

	/*  */

	function createRouteMap (routes) {
	  var pathMap = Object.create(null)
	  var nameMap = Object.create(null)

	  routes.forEach(function (route) {
	    addRouteRecord(pathMap, nameMap, route)
	  })

	  return {
	    pathMap: pathMap,
	    nameMap: nameMap
	  }
	}

	function addRouteRecord (
	  pathMap,
	  nameMap,
	  route,
	  parent,
	  matchAs
	) {
	  var path = route.path;
	  var name = route.name;
	  if (process.env.NODE_ENV !== 'production') {
	    assert(path != null, "\"path\" is required in a route configuration.")
	    assert(
	      typeof route.component !== 'string',
	      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
	      "string id. Use an actual component instead."
	    )
	  }

	  var record = {
	    path: normalizePath(path, parent),
	    components: route.components || { default: route.component },
	    instances: {},
	    name: name,
	    parent: parent,
	    matchAs: matchAs,
	    redirect: route.redirect,
	    beforeEnter: route.beforeEnter,
	    meta: route.meta || {}
	  }

	  if (route.children) {
	    // Warn if route is named and has a default child route.
	    // If users navigate to this route by name, the default child will
	    // not be rendered (GH Issue #629)
	    if (process.env.NODE_ENV !== 'production') {
	      if (route.name && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
	        warn(false, ("Named Route '" + (route.name) + "' has a default child route.\n          When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), the default child route will not be rendered.\n          Remove the name from this route and use the name of the default child route for named links instead.")
	        )
	      }
	    }
	    route.children.forEach(function (child) {
	      addRouteRecord(pathMap, nameMap, child, record)
	    })
	  }

	  if (route.alias !== undefined) {
	    if (Array.isArray(route.alias)) {
	      route.alias.forEach(function (alias) {
	        addRouteRecord(pathMap, nameMap, { path: alias }, parent, record.path)
	      })
	    } else {
	      addRouteRecord(pathMap, nameMap, { path: route.alias }, parent, record.path)
	    }
	  }

	  if (!pathMap[record.path]) {
	    pathMap[record.path] = record
	  }
	  if (name) {
	    if (!nameMap[name]) {
	      nameMap[name] = record
	    } else if (process.env.NODE_ENV !== 'production') {
	      warn(false, ("Duplicate named routes definition: { name: \"" + name + "\", path: \"" + (record.path) + "\" }"))
	    }
	  }
	}

	function normalizePath (path, parent) {
	  path = path.replace(/\/$/, '')
	  if (path[0] === '/') { return path }
	  if (parent == null) { return path }
	  return cleanPath(((parent.path) + "/" + path))
	}

	var __moduleExports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};

	var isarray = __moduleExports

	/**
	 * Expose `pathToRegexp`.
	 */
	var index = pathToRegexp
	var parse_1 = parse
	var compile_1 = compile
	var tokensToFunction_1 = tokensToFunction
	var tokensToRegExp_1 = tokensToRegExp

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g')

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string}  str
	 * @param  {Object=} options
	 * @return {!Array}
	 */
	function parse (str, options) {
	  var tokens = []
	  var key = 0
	  var index = 0
	  var path = ''
	  var defaultDelimiter = options && options.delimiter || '/'
	  var res

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0]
	    var escaped = res[1]
	    var offset = res.index
	    path += str.slice(index, offset)
	    index = offset + m.length

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1]
	      continue
	    }

	    var next = str[index]
	    var prefix = res[2]
	    var name = res[3]
	    var capture = res[4]
	    var group = res[5]
	    var modifier = res[6]
	    var asterisk = res[7]

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path)
	      path = ''
	    }

	    var partial = prefix != null && next != null && next !== prefix
	    var repeat = modifier === '+' || modifier === '*'
	    var optional = modifier === '?' || modifier === '*'
	    var delimiter = res[2] || defaultDelimiter
	    var pattern = capture || group

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
	    })
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index)
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path)
	  }

	  return tokens
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @param  {Object=}            options
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str, options) {
	  return tokensToFunction(parse(str, options))
	}

	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length)

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
	    }
	  }

	  return function (obj, opts) {
	    var path = ''
	    var data = obj || {}
	    var options = opts || {}
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i]

	      if (typeof token === 'string') {
	        path += token

	        continue
	      }

	      var value = data[token.name]
	      var segment

	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix
	          }

	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j])

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment
	        }

	        continue
	      }

	      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }

	      path += token.prefix + segment
	    }

	    return path
	  }
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys
	  return re
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g)

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      })
	    }
	  }

	  return attachKeys(path, keys)
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = []

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source)
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

	  return attachKeys(regexp, keys)
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  return tokensToRegExp(parse(path, options), keys, options)
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}          tokens
	 * @param  {(Array|Object)=} keys
	 * @param  {Object=}         options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options)
	    keys = []
	  }

	  options = options || {}

	  var strict = options.strict
	  var end = options.end !== false
	  var route = ''

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i]

	    if (typeof token === 'string') {
	      route += escapeString(token)
	    } else {
	      var prefix = escapeString(token.prefix)
	      var capture = '(?:' + token.pattern + ')'

	      keys.push(token)

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*'
	      }

	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?'
	        } else {
	          capture = prefix + '(' + capture + ')?'
	        }
	      } else {
	        capture = prefix + '(' + capture + ')'
	      }

	      route += capture
	    }
	  }

	  var delimiter = escapeString(options.delimiter || '/')
	  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
	  }

	  if (end) {
	    route += '$'
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
	  }

	  return attachKeys(new RegExp('^' + route, flags(options)), keys)
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options)
	    keys = []
	  }

	  options = options || {}

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }

	  if (isarray(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }

	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}

	index.parse = parse_1;
	index.compile = compile_1;
	index.tokensToFunction = tokensToFunction_1;
	index.tokensToRegExp = tokensToRegExp_1;

	/*  */

	var regexpCache = Object.create(null)

	function getRouteRegex (path) {
	  var hit = regexpCache[path]
	  var keys, regexp

	  if (hit) {
	    keys = hit.keys
	    regexp = hit.regexp
	  } else {
	    keys = []
	    regexp = index(path, keys)
	    regexpCache[path] = { keys: keys, regexp: regexp }
	  }

	  return { keys: keys, regexp: regexp }
	}

	var regexpCompileCache = Object.create(null)

	function fillParams (
	  path,
	  params,
	  routeMsg
	) {
	  try {
	    var filler =
	      regexpCompileCache[path] ||
	      (regexpCompileCache[path] = index.compile(path))
	    return filler(params || {}, { pretty: true })
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(false, ("missing param for " + routeMsg + ": " + (e.message)))
	    }
	    return ''
	  }
	}

	/*  */

	function normalizeLocation (
	  raw,
	  current,
	  append
	) {
	  var next = typeof raw === 'string' ? { path: raw } : raw
	  // named target
	  if (next.name || next._normalized) {
	    return next
	  }

	  // relative params
	  if (!next.path && next.params && current) {
	    next = assign({}, next)
	    next._normalized = true
	    var params = assign(assign({}, current.params), next.params)
	    if (current.name) {
	      next.name = current.name
	      next.params = params
	    } else if (current.matched) {
	      var rawPath = current.matched[current.matched.length - 1].path
	      next.path = fillParams(rawPath, params, ("path " + (current.path)))
	    } else if (process.env.NODE_ENV !== 'production') {
	      warn(false, "relative params navigation requires a current route.")
	    }
	    return next
	  }

	  var parsedPath = parsePath(next.path || '')
	  var basePath = (current && current.path) || '/'
	  var path = parsedPath.path
	    ? resolvePath(parsedPath.path, basePath, append || next.append)
	    : (current && current.path) || '/'
	  var query = resolveQuery(parsedPath.query, next.query)
	  var hash = next.hash || parsedPath.hash
	  if (hash && hash.charAt(0) !== '#') {
	    hash = "#" + hash
	  }

	  return {
	    _normalized: true,
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	function assign (a, b) {
	  for (var key in b) {
	    a[key] = b[key]
	  }
	  return a
	}

	/*  */

	function createMatcher (routes) {
	  var ref = createRouteMap(routes);
	  var pathMap = ref.pathMap;
	  var nameMap = ref.nameMap;

	  function match (
	    raw,
	    currentRoute,
	    redirectedFrom
	  ) {
	    var location = normalizeLocation(raw, currentRoute)
	    var name = location.name;

	    if (name) {
	      var record = nameMap[name]
	      var paramNames = getRouteRegex(record.path).keys
	        .filter(function (key) { return !key.optional; })
	        .map(function (key) { return key.name; })

	      if (typeof location.params !== 'object') {
	        location.params = {}
	      }

	      if (currentRoute && typeof currentRoute.params === 'object') {
	        for (var key in currentRoute.params) {
	          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
	            location.params[key] = currentRoute.params[key]
	          }
	        }
	      }

	      if (record) {
	        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""))
	        return _createRoute(record, location, redirectedFrom)
	      }
	    } else if (location.path) {
	      location.params = {}
	      for (var path in pathMap) {
	        if (matchRoute(path, location.params, location.path)) {
	          return _createRoute(pathMap[path], location, redirectedFrom)
	        }
	      }
	    }
	    // no match
	    return _createRoute(null, location)
	  }

	  function redirect (
	    record,
	    location
	  ) {
	    var originalRedirect = record.redirect
	    var redirect = typeof originalRedirect === 'function'
	        ? originalRedirect(createRoute(record, location))
	        : originalRedirect

	    if (typeof redirect === 'string') {
	      redirect = { path: redirect }
	    }

	    if (!redirect || typeof redirect !== 'object') {
	      process.env.NODE_ENV !== 'production' && warn(
	        false, ("invalid redirect option: " + (JSON.stringify(redirect)))
	      )
	      return _createRoute(null, location)
	    }

	    var re = redirect
	    var name = re.name;
	    var path = re.path;
	    var query = location.query;
	    var hash = location.hash;
	    var params = location.params;
	    query = re.hasOwnProperty('query') ? re.query : query
	    hash = re.hasOwnProperty('hash') ? re.hash : hash
	    params = re.hasOwnProperty('params') ? re.params : params

	    if (name) {
	      // resolved named direct
	      var targetRecord = nameMap[name]
	      if (process.env.NODE_ENV !== 'production') {
	        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."))
	      }
	      return match({
	        _normalized: true,
	        name: name,
	        query: query,
	        hash: hash,
	        params: params
	      }, undefined, location)
	    } else if (path) {
	      // 1. resolve relative redirect
	      var rawPath = resolveRecordPath(path, record)
	      // 2. resolve params
	      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""))
	      // 3. rematch with existing query and hash
	      return match({
	        _normalized: true,
	        path: resolvedPath,
	        query: query,
	        hash: hash
	      }, undefined, location)
	    } else {
	      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))))
	      return _createRoute(null, location)
	    }
	  }

	  function alias (
	    record,
	    location,
	    matchAs
	  ) {
	    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""))
	    var aliasedMatch = match({
	      _normalized: true,
	      path: aliasedPath
	    })
	    if (aliasedMatch) {
	      var matched = aliasedMatch.matched
	      var aliasedRecord = matched[matched.length - 1]
	      location.params = aliasedMatch.params
	      return _createRoute(aliasedRecord, location)
	    }
	    return _createRoute(null, location)
	  }

	  function _createRoute (
	    record,
	    location,
	    redirectedFrom
	  ) {
	    if (record && record.redirect) {
	      return redirect(record, redirectedFrom || location)
	    }
	    if (record && record.matchAs) {
	      return alias(record, location, record.matchAs)
	    }
	    return createRoute(record, location, redirectedFrom)
	  }

	  return match
	}

	function matchRoute (
	  path,
	  params,
	  pathname
	) {
	  var ref = getRouteRegex(path);
	  var regexp = ref.regexp;
	  var keys = ref.keys;
	  var m = pathname.match(regexp)

	  if (!m) {
	    return false
	  } else if (!params) {
	    return true
	  }

	  for (var i = 1, len = m.length; i < len; ++i) {
	    var key = keys[i - 1]
	    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i]
	    if (key) { params[key.name] = val }
	  }

	  return true
	}

	function resolveRecordPath (path, record) {
	  return resolvePath(path, record.parent ? record.parent.path : '/', true)
	}

	/*  */

	var inBrowser = typeof window !== 'undefined'

	var supportsHistory = inBrowser && (function () {
	  var ua = window.navigator.userAgent

	  if (
	    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
	    ua.indexOf('Mobile Safari') !== -1 &&
	    ua.indexOf('Chrome') === -1 &&
	    ua.indexOf('Windows Phone') === -1
	  ) {
	    return false
	  }

	  return window.history && 'pushState' in window.history
	})()

	/*  */

	function runQueue (queue, fn, cb) {
	  var step = function (index) {
	    if (index >= queue.length) {
	      cb()
	    } else {
	      if (queue[index]) {
	        fn(queue[index], function () {
	          step(index + 1)
	        })
	      } else {
	        step(index + 1)
	      }
	    }
	  }
	  step(0)
	}

	/*  */


	var History = function History (router, base) {
	  this.router = router
	  this.base = normalizeBase(base)
	  // start with a route object that stands for "nowhere"
	  this.current = START
	  this.pending = null
	};

	History.prototype.listen = function listen (cb) {
	  this.cb = cb
	};

	History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
	    var this$1 = this;

	  var route = this.router.match(location, this.current)
	  this.confirmTransition(route, function () {
	    this$1.updateRoute(route)
	    onComplete && onComplete(route)
	    this$1.ensureURL()
	  }, onAbort)
	};

	History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
	    var this$1 = this;

	  var current = this.current
	  var abort = function () { onAbort && onAbort() }
	  if (isSameRoute(route, current)) {
	    this.ensureURL()
	    return abort()
	  }

	  var ref = resolveQueue(this.current.matched, route.matched);
	    var deactivated = ref.deactivated;
	    var activated = ref.activated;

	  var queue = [].concat(
	    // in-component leave guards
	    extractLeaveGuards(deactivated),
	    // global before hooks
	    this.router.beforeHooks,
	    // enter guards
	    activated.map(function (m) { return m.beforeEnter; }),
	    // async components
	    resolveAsyncComponents(activated)
	  )

	  this.pending = route
	  var iterator = function (hook, next) {
	    if (this$1.pending !== route) {
	      return abort()
	    }
	    hook(route, current, function (to) {
	      if (to === false) {
	        // next(false) -> abort navigation, ensure current URL
	        this$1.ensureURL(true)
	        abort()
	      } else if (typeof to === 'string' || typeof to === 'object') {
	        // next('/') or next({ path: '/' }) -> redirect
	        (typeof to === 'object' && to.replace) ? this$1.replace(to) : this$1.push(to)
	        abort()
	      } else {
	        // confirm transition and pass on the value
	        next(to)
	      }
	    })
	  }

	  runQueue(queue, iterator, function () {
	    var postEnterCbs = []
	    var enterGuards = extractEnterGuards(activated, postEnterCbs, function () {
	      return this$1.current === route
	    })
	    // wait until async components are resolved before
	    // extracting in-component enter guards
	    runQueue(enterGuards, iterator, function () {
	      if (this$1.pending !== route) {
	        return abort()
	      }
	      this$1.pending = null
	      onComplete(route)
	      if (this$1.router.app) {
	        this$1.router.app.$nextTick(function () {
	          postEnterCbs.forEach(function (cb) { return cb(); })
	        })
	      }
	    })
	  })
	};

	History.prototype.updateRoute = function updateRoute (route) {
	  var prev = this.current
	  this.current = route
	  this.cb && this.cb(route)
	  this.router.afterHooks.forEach(function (hook) {
	    hook && hook(route, prev)
	  })
	};

	function normalizeBase (base) {
	  if (!base) {
	    if (inBrowser) {
	      // respect <base> tag
	      var baseEl = document.querySelector('base')
	      base = baseEl ? baseEl.getAttribute('href') : '/'
	    } else {
	      base = '/'
	    }
	  }
	  // make sure there's the starting slash
	  if (base.charAt(0) !== '/') {
	    base = '/' + base
	  }
	  // remove trailing slash
	  return base.replace(/\/$/, '')
	}

	function resolveQueue (
	  current,
	  next
	) {
	  var i
	  var max = Math.max(current.length, next.length)
	  for (i = 0; i < max; i++) {
	    if (current[i] !== next[i]) {
	      break
	    }
	  }
	  return {
	    activated: next.slice(i),
	    deactivated: current.slice(i)
	  }
	}

	function extractGuard (
	  def,
	  key
	) {
	  if (typeof def !== 'function') {
	    // extend now so that global mixins are applied.
	    def = _Vue.extend(def)
	  }
	  return def.options[key]
	}

	function extractLeaveGuards (matched) {
	  return flatten(flatMapComponents(matched, function (def, instance) {
	    var guard = extractGuard(def, 'beforeRouteLeave')
	    if (guard) {
	      return Array.isArray(guard)
	        ? guard.map(function (guard) { return wrapLeaveGuard(guard, instance); })
	        : wrapLeaveGuard(guard, instance)
	    }
	  }).reverse())
	}

	function wrapLeaveGuard (
	  guard,
	  instance
	) {
	  return function routeLeaveGuard () {
	    return guard.apply(instance, arguments)
	  }
	}

	function extractEnterGuards (
	  matched,
	  cbs,
	  isValid
	) {
	  return flatten(flatMapComponents(matched, function (def, _, match, key) {
	    var guard = extractGuard(def, 'beforeRouteEnter')
	    if (guard) {
	      return Array.isArray(guard)
	        ? guard.map(function (guard) { return wrapEnterGuard(guard, cbs, match, key, isValid); })
	        : wrapEnterGuard(guard, cbs, match, key, isValid)
	    }
	  }))
	}

	function wrapEnterGuard (
	  guard,
	  cbs,
	  match,
	  key,
	  isValid
	) {
	  return function routeEnterGuard (to, from, next) {
	    return guard(to, from, function (cb) {
	      next(cb)
	      if (typeof cb === 'function') {
	        cbs.push(function () {
	          // #750
	          // if a router-view is wrapped with an out-in transition,
	          // the instance may not have been registered at this time.
	          // we will need to poll for registration until current route
	          // is no longer valid.
	          poll(cb, match.instances, key, isValid)
	        })
	      }
	    })
	  }
	}

	function poll (
	  cb, // somehow flow cannot infer this is a function
	  instances,
	  key,
	  isValid
	) {
	  if (instances[key]) {
	    cb(instances[key])
	  } else if (isValid()) {
	    setTimeout(function () {
	      poll(cb, instances, key, isValid)
	    }, 16)
	  }
	}

	function resolveAsyncComponents (matched) {
	  return flatMapComponents(matched, function (def, _, match, key) {
	    // if it's a function and doesn't have Vue options attached,
	    // assume it's an async component resolve function.
	    // we are not using Vue's default async resolving mechanism because
	    // we want to halt the navigation until the incoming component has been
	    // resolved.
	    if (typeof def === 'function' && !def.options) {
	      return function (to, from, next) {
	        var resolve = function (resolvedDef) {
	          match.components[key] = resolvedDef
	          next()
	        }

	        var reject = function (reason) {
	          warn(false, ("Failed to resolve async component " + key + ": " + reason))
	          next(false)
	        }

	        var res = def(resolve, reject)
	        if (res && typeof res.then === 'function') {
	          res.then(resolve, reject)
	        }
	      }
	    }
	  })
	}

	function flatMapComponents (
	  matched,
	  fn
	) {
	  return flatten(matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) { return fn(
	      m.components[key],
	      m.instances[key],
	      m, key
	    ); })
	  }))
	}

	function flatten (arr) {
	  return Array.prototype.concat.apply([], arr)
	}

	/*  */

	var positionStore = Object.create(null)

	function saveScrollPosition (key) {
	  if (!key) { return }
	  positionStore[key] = {
	    x: window.pageXOffset,
	    y: window.pageYOffset
	  }
	}

	function getScrollPosition (key) {
	  if (!key) { return }
	  return positionStore[key]
	}

	function getElementPosition (el) {
	  var docRect = document.documentElement.getBoundingClientRect()
	  var elRect = el.getBoundingClientRect()
	  return {
	    x: elRect.left - docRect.left,
	    y: elRect.top - docRect.top
	  }
	}

	function isValidPosition (obj) {
	  return isNumber(obj.x) || isNumber(obj.y)
	}

	function normalizePosition (obj) {
	  return {
	    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
	    y: isNumber(obj.y) ? obj.y : window.pageYOffset
	  }
	}

	function isNumber (v) {
	  return typeof v === 'number'
	}

	/*  */


	var genKey = function () { return String(Date.now()); }
	var _key = genKey()

	var HTML5History = (function (History) {
	  function HTML5History (router, base) {
	    var this$1 = this;

	    History.call(this, router, base)

	    var expectScroll = router.options.scrollBehavior
	    window.addEventListener('popstate', function (e) {
	      _key = e.state && e.state.key
	      var current = this$1.current
	      this$1.transitionTo(getLocation(this$1.base), function (next) {
	        if (expectScroll) {
	          this$1.handleScroll(next, current, true)
	        }
	      })
	    })

	    if (expectScroll) {
	      window.addEventListener('scroll', function () {
	        saveScrollPosition(_key)
	      })
	    }
	  }

	  if ( History ) HTML5History.__proto__ = History;
	  HTML5History.prototype = Object.create( History && History.prototype );
	  HTML5History.prototype.constructor = HTML5History;

	  HTML5History.prototype.go = function go (n) {
	    window.history.go(n)
	  };

	  HTML5History.prototype.push = function push (location) {
	    var this$1 = this;

	    var current = this.current
	    this.transitionTo(location, function (route) {
	      pushState(cleanPath(this$1.base + route.fullPath))
	      this$1.handleScroll(route, current, false)
	    })
	  };

	  HTML5History.prototype.replace = function replace (location) {
	    var this$1 = this;

	    var current = this.current
	    this.transitionTo(location, function (route) {
	      replaceState(cleanPath(this$1.base + route.fullPath))
	      this$1.handleScroll(route, current, false)
	    })
	  };

	  HTML5History.prototype.ensureURL = function ensureURL (push) {
	    if (getLocation(this.base) !== this.current.fullPath) {
	      var current = cleanPath(this.base + this.current.fullPath)
	      push ? pushState(current) : replaceState(current)
	    }
	  };

	  HTML5History.prototype.handleScroll = function handleScroll (to, from, isPop) {
	    var router = this.router
	    if (!router.app) {
	      return
	    }

	    var behavior = router.options.scrollBehavior
	    if (!behavior) {
	      return
	    }
	    if (process.env.NODE_ENV !== 'production') {
	      assert(typeof behavior === 'function', "scrollBehavior must be a function")
	    }

	    // wait until re-render finishes before scrolling
	    router.app.$nextTick(function () {
	      var position = getScrollPosition(_key)
	      var shouldScroll = behavior(to, from, isPop ? position : null)
	      if (!shouldScroll) {
	        return
	      }
	      var isObject = typeof shouldScroll === 'object'
	      if (isObject && typeof shouldScroll.selector === 'string') {
	        var el = document.querySelector(shouldScroll.selector)
	        if (el) {
	          position = getElementPosition(el)
	        } else if (isValidPosition(shouldScroll)) {
	          position = normalizePosition(shouldScroll)
	        }
	      } else if (isObject && isValidPosition(shouldScroll)) {
	        position = normalizePosition(shouldScroll)
	      }

	      if (position) {
	        window.scrollTo(position.x, position.y)
	      }
	    })
	  };

	  return HTML5History;
	}(History));

	function getLocation (base) {
	  var path = window.location.pathname
	  if (base && path.indexOf(base) === 0) {
	    path = path.slice(base.length)
	  }
	  return (path || '/') + window.location.search + window.location.hash
	}

	function pushState (url, replace) {
	  // try...catch the pushState call to get around Safari
	  // DOM Exception 18 where it limits to 100 pushState calls
	  var history = window.history
	  try {
	    if (replace) {
	      history.replaceState({ key: _key }, '', url)
	    } else {
	      _key = genKey()
	      history.pushState({ key: _key }, '', url)
	    }
	    saveScrollPosition(_key)
	  } catch (e) {
	    window.location[replace ? 'assign' : 'replace'](url)
	  }
	}

	function replaceState (url) {
	  pushState(url, true)
	}

	/*  */


	var HashHistory = (function (History) {
	  function HashHistory (router, base, fallback) {
	    History.call(this, router, base)
	    // check history fallback deeplinking
	    if (fallback && this.checkFallback()) {
	      return
	    }
	    ensureSlash()
	  }

	  if ( History ) HashHistory.__proto__ = History;
	  HashHistory.prototype = Object.create( History && History.prototype );
	  HashHistory.prototype.constructor = HashHistory;

	  HashHistory.prototype.checkFallback = function checkFallback () {
	    var location = getLocation(this.base)
	    if (!/^\/#/.test(location)) {
	      window.location.replace(
	        cleanPath(this.base + '/#' + location)
	      )
	      return true
	    }
	  };

	  HashHistory.prototype.onHashChange = function onHashChange () {
	    if (!ensureSlash()) {
	      return
	    }
	    this.transitionTo(getHash(), function (route) {
	      replaceHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.push = function push (location) {
	    this.transitionTo(location, function (route) {
	      pushHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.replace = function replace (location) {
	    this.transitionTo(location, function (route) {
	      replaceHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.go = function go (n) {
	    window.history.go(n)
	  };

	  HashHistory.prototype.ensureURL = function ensureURL (push) {
	    var current = this.current.fullPath
	    if (getHash() !== current) {
	      push ? pushHash(current) : replaceHash(current)
	    }
	  };

	  return HashHistory;
	}(History));

	function ensureSlash () {
	  var path = getHash()
	  if (path.charAt(0) === '/') {
	    return true
	  }
	  replaceHash('/' + path)
	  return false
	}

	function getHash () {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href
	  var index = href.indexOf('#')
	  return index === -1 ? '' : href.slice(index + 1)
	}

	function pushHash (path) {
	  window.location.hash = path
	}

	function replaceHash (path) {
	  var i = window.location.href.indexOf('#')
	  window.location.replace(
	    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
	  )
	}

	/*  */


	var AbstractHistory = (function (History) {
	  function AbstractHistory (router) {
	    History.call(this, router)
	    this.stack = []
	    this.index = -1
	  }

	  if ( History ) AbstractHistory.__proto__ = History;
	  AbstractHistory.prototype = Object.create( History && History.prototype );
	  AbstractHistory.prototype.constructor = AbstractHistory;

	  AbstractHistory.prototype.push = function push (location) {
	    var this$1 = this;

	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route)
	      this$1.index++
	    })
	  };

	  AbstractHistory.prototype.replace = function replace (location) {
	    var this$1 = this;

	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route)
	    })
	  };

	  AbstractHistory.prototype.go = function go (n) {
	    var this$1 = this;

	    var targetIndex = this.index + n
	    if (targetIndex < 0 || targetIndex >= this.stack.length) {
	      return
	    }
	    var route = this.stack[targetIndex]
	    this.confirmTransition(route, function () {
	      this$1.index = targetIndex
	      this$1.updateRoute(route)
	    })
	  };

	  AbstractHistory.prototype.ensureURL = function ensureURL () {
	    // noop
	  };

	  return AbstractHistory;
	}(History));

	/*  */

	var VueRouter = function VueRouter (options) {
	  if ( options === void 0 ) options = {};

	  this.app = null
	  this.options = options
	  this.beforeHooks = []
	  this.afterHooks = []
	  this.match = createMatcher(options.routes || [])

	  var mode = options.mode || 'hash'
	  this.fallback = mode === 'history' && !supportsHistory
	  if (this.fallback) {
	    mode = 'hash'
	  }
	  if (!inBrowser) {
	    mode = 'abstract'
	  }
	  this.mode = mode

	  switch (mode) {
	    case 'history':
	      this.history = new HTML5History(this, options.base)
	      break
	    case 'hash':
	      this.history = new HashHistory(this, options.base, this.fallback)
	      break
	    case 'abstract':
	      this.history = new AbstractHistory(this)
	      break
	    default:
	      process.env.NODE_ENV !== 'production' && assert(false, ("invalid mode: " + mode))
	  }
	};

	var prototypeAccessors = { currentRoute: {} };

	prototypeAccessors.currentRoute.get = function () {
	  return this.history && this.history.current
	};

	VueRouter.prototype.init = function init (app /* Vue component instance */) {
	    var this$1 = this;

	  process.env.NODE_ENV !== 'production' && assert(
	    install.installed,
	    "not installed. Make sure to call `Vue.use(VueRouter)` " +
	    "before creating root instance."
	  )

	  this.app = app

	  var history = this.history

	  if (history instanceof HTML5History) {
	    history.transitionTo(getLocation(history.base))
	  } else if (history instanceof HashHistory) {
	    var setupHashListener = function () {
	      window.addEventListener('hashchange', function () {
	        history.onHashChange()
	      })
	    }
	    history.transitionTo(getHash(), setupHashListener, setupHashListener)
	  }

	  history.listen(function (route) {
	    this$1.app._route = route
	  })
	};

	VueRouter.prototype.beforeEach = function beforeEach (fn) {
	  this.beforeHooks.push(fn)
	};

	VueRouter.prototype.afterEach = function afterEach (fn) {
	  this.afterHooks.push(fn)
	};

	VueRouter.prototype.push = function push (location) {
	  this.history.push(location)
	};

	VueRouter.prototype.replace = function replace (location) {
	  this.history.replace(location)
	};

	VueRouter.prototype.go = function go (n) {
	  this.history.go(n)
	};

	VueRouter.prototype.back = function back () {
	  this.go(-1)
	};

	VueRouter.prototype.forward = function forward () {
	  this.go(1)
	};

	VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
	  var route = to
	    ? this.resolve(to).resolved
	    : this.currentRoute
	  if (!route) {
	    return []
	  }
	  return [].concat.apply([], route.matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) {
	      return m.components[key]
	    })
	  }))
	};

	VueRouter.prototype.resolve = function resolve (
	  to,
	  current,
	  append
	) {
	  var normalizedTo = normalizeLocation(to, current || this.history.current, append)
	  var resolved = this.match(normalizedTo, current)
	  var fullPath = resolved.redirectedFrom || resolved.fullPath
	  var base = this.history.base
	  var href = createHref(base, fullPath, this.mode)
	  return {
	    normalizedTo: normalizedTo,
	    resolved: resolved,
	    href: href
	  }
	};

	Object.defineProperties( VueRouter.prototype, prototypeAccessors );

	function createHref (base, fullPath, mode) {
	  var path = mode === 'hash' ? '#' + fullPath : fullPath
	  return base ? cleanPath(base + '/' + path) : path
	}

	VueRouter.install = install

	if (inBrowser && window.Vue) {
	  window.Vue.use(VueRouter)
	}

	module.exports = VueRouter;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(35)

	/* script */
	__vue_exports__ = __webpack_require__(39)

	/* template */
	var __vue_template__ = __webpack_require__(40)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\code\\teaching-activities\\design\\src\\pages\\index.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-9b46fa2c", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-9b46fa2c", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] index.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(36);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(38)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-9b46fa2c!./../../node_modules/stylus-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-9b46fa2c!./../../node_modules/stylus-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "\nform {\n  padding: 45px;\n  margin: auto;\n}\nlabel {\n  text-align: right;\n}\n.group-con {\n  margin: 15px 0;\n}\n.group-btn {\n  margin: 0;\n}\n.btn {\n  padding: 8px 20px;\n  margin: 0 15px;\n  border: 1px solid rgba(51,51,51,0.5);\n  outline: none;\n  -webkit-border-radius: 8px;\n  -moz-border-radius: 8px;\n  border-radius: 8px;\n  color: #fff;\n  font-size: 16px;\n  cursor: pointer;\n}\n.btn-l {\n  padding: 8px 50px;\n  font-size: 1.3em;\n}\n.btn-certain {\n  background: #ed5e0f;\n}\n.btn-cancle {\n  background: #4e4e4e;\n}\n.btn-edit {\n  background: #2d0a08;\n}\n.must {\n  margin-right: 0.5em;\n  color: #f00;\n}\n#app {\n  position: relative;\n  ((null)): 0;\n  ((null)): 0;\n  overflow: hidden;\n}\n.index {\n  margin-bottom: 60px;\n}\n.in-list {\n  max-width: 1000px;\n  padding-top: 15px;\n  margin: auto;\n}\n.in-cover {\n  width: 100%;\n  height: 300px;\n}\n.in-search {\n  padding: 15px;\n  text-align: center;\n  border-bottom: 1px solid #bbb;\n}\n.in-search label {\n  margin-right: 10px;\n}\n.in-search select {\n  min-width: 80px;\n  margin: 0 10px;\n}\n.in-list-item {\n  display: inline-block;\n  width: 33.33%;\n  padding: 0 15px;\n  margin: 10px 0;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  -o-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.in-list-item img {\n  width: 100%;\n  height: 150px;\n}\n.in-list-item .abs {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n", ""]);

	// exports


/***/ },
/* 37 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _vuex = __webpack_require__(4);

	exports.default = {
		data: function data() {
			return {
				img: '../../dist/imgs/cover-b.jpg'
			};
		},

		created: function created() {
			this.$store.dispatch('GET_SEARCH_LISTS');
			this.$store.dispatch('GET_ARTICALS');
		},
		computed: (0, _vuex.mapState)(['searchLists', 'articles'])
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "index"
	  }, [_c('img', {
	    staticClass: "in-cover",
	    attrs: {
	      "src": _vm.img
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "in-search"
	  }, [_c('label', [_vm._v("系：")]), _vm._v(" "), _c('select', {
	    staticClass: "faculty"
	  }, _vm._l((_vm.searchLists.faculties), function(faculty) {
	    return _c('option', [_vm._v("\n\t\t\t\t" + _vm._s(faculty) + "\n\t\t\t")])
	  })), _vm._v(" "), _c('label', [_vm._v("类型：")]), _vm._v(" "), _c('select', {
	    staticClass: "type"
	  }, _vm._l((_vm.searchLists.types), function(type) {
	    return _c('option', [_vm._v("\n\t\t\t\t" + _vm._s(type) + "\n\t\t\t")])
	  })), _vm._v(" "), _c('label', [_vm._v("时效：")]), _vm._v(" "), _c('select', {
	    staticClass: "time"
	  }, _vm._l((_vm.searchLists.timeliness), function(time) {
	    return _c('option', [_vm._v("\n\t\t\t\t" + _vm._s(time) + "\n\t\t\t")])
	  }))]), _vm._v(" "), _c('ul', {
	    staticClass: "in-list"
	  }, _vm._l((_vm.articles), function(item) {
	    return _c('li', {
	      staticClass: "in-list-item"
	    }, [_c('img', {
	      attrs: {
	        "src": item.url
	      }
	    }), _vm._v(" "), _c('h3', [_c('router-link', {
	      attrs: {
	        "to": {
	          name: "article"
	        }
	      }
	    }, [_vm._v(_vm._s(item.title))])]), _vm._v(" "), _c('p', {
	      staticClass: "abs"
	    }, [_vm._v(_vm._s(item.abs))])])
	  }))])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-9b46fa2c", module.exports)
	  }
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(42)

	/* script */
	__vue_exports__ = __webpack_require__(44)

	/* template */
	var __vue_template__ = __webpack_require__(45)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\code\\teaching-activities\\design\\src\\components\\nav.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-30842c46", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-30842c46", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] nav.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(43);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(38)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-30842c46!./../../node_modules/stylus-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./nav.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-30842c46!./../../node_modules/stylus-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./nav.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "\n#nav {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 45px;\n  overflow: hidden;\n  background-color: rgba(0,0,0,0.7);\n  z-index: 99;\n}\n#nav .navbar {\n  float: right;\n}\n#nav .navbar li {\n  display: inline-block;\n}\n#nav .navbar a {\n  display: block;\n  height: 45px;\n  margin: 0 25px;\n  color: #fff;\n  line-height: 45px;\n}\n", ""]);

	// exports


/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
		data: function data() {
			return {
				SignIn: false,
				items: [{
					text: '发布',
					url: 'edit'
				}, {
					text: '搜索',
					url: 'search'
				}]
			};
		}
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    attrs: {
	      "id": "nav"
	    }
	  }, [_c('div', {
	    attrs: {
	      "id": "logo"
	    }
	  }), _vm._v(" "), _c('ul', {
	    staticClass: "navbar"
	  }, [(_vm.SignIn) ? _c('li', [_c('router-link', {
	    attrs: {
	      "to": "/signout"
	    }
	  }, [_vm._v("\n\t\t\t\t登出\n\t\t\t")])]) : _c('li', [_c('router-link', {
	    attrs: {
	      "to": "/signin"
	    }
	  }, [_vm._v("\n\t\t\t\t登录\n\t\t\t")])]), _vm._v(" "), _vm._v(" "), _vm._l((_vm.items), function(item) {
	    return _c('li', [_c('router-link', {
	      attrs: {
	        "to": item.url
	      }
	    }, [_vm._v("\n\t\t\t\t" + _vm._s(item.text) + "\n\t\t\t")])])
	  })], true)])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-30842c46", module.exports)
	  }
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(47)

	/* script */
	__vue_exports__ = __webpack_require__(49)

	/* template */
	var __vue_template__ = __webpack_require__(50)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\code\\teaching-activities\\design\\src\\components\\footer.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-096c8fd1", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-096c8fd1", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] footer.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(48);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(38)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-096c8fd1!./../../node_modules/stylus-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./footer.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-096c8fd1!./../../node_modules/stylus-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./footer.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "\n#footer {\n  width: 100%;\n  padding: 10px 50px;\n  font-size: 12px;\n  overflow: hidden;\n  background-color: #303048;\n}\n#footer .links li {\n  display: inline-block;\n  width: 33%;\n}\n#footer .links a {\n  display: block;\n  color: #fff;\n  text-align: center;\n}\n", ""]);

	// exports


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _vuex = __webpack_require__(4);

	exports.default = {
		data: function data() {
			return {
				links: []
			};
		},
		created: function created() {
			this.$store.dispatch('GET_FOOTER_LINKS');
		},

		computed: (0, _vuex.mapState)(['footerLinks'])
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    attrs: {
	      "id": "footer"
	    }
	  }, [_c('ul', {
	    staticClass: "links"
	  }, _vm._l((_vm.footerLinks), function(link) {
	    return _c('li', [_c('a', {
	      attrs: {
	        "href": link.url
	      }
	    }, [_vm._v(_vm._s(link.text))])])
	  }))])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-096c8fd1", module.exports)
	  }
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* template */
	var __vue_template__ = __webpack_require__(52)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\code\\teaching-activities\\design\\src\\pages\\404.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3b8da050", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-3b8da050", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] 404.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', [_vm._v("\n\t404\n")])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3b8da050", module.exports)
	  }
	}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(54)

	/* script */
	__vue_exports__ = __webpack_require__(56)

	/* template */
	var __vue_template__ = __webpack_require__(57)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\code\\teaching-activities\\design\\src\\App.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-69f192b1", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-69f192b1", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] App.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(55);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(38)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-69f192b1!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-69f192b1!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

	// exports


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _nav = __webpack_require__(41);

	var _nav2 = _interopRequireDefault(_nav);

	var _footer = __webpack_require__(46);

	var _footer2 = _interopRequireDefault(_footer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
		components: {
			Navbar: _nav2.default,
			VFooter: _footer2.default
		}
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    attrs: {
	      "id": "app"
	    }
	  }, [_c('navbar'), _vm._v(" "), _c('router-view'), _vm._v(" "), _c('v-footer')])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-69f192b1", module.exports)
	  }
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(59)

	/* script */
	__vue_exports__ = __webpack_require__(62)

	/* template */
	var __vue_template__ = __webpack_require__(63)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\code\\teaching-activities\\design\\src\\pages\\signin.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3c4430ba", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-3c4430ba", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] signin.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(60);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(38)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3c4430ba!./../../node_modules/stylus-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./signin.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3c4430ba!./../../node_modules/stylus-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./signin.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "\n.sign-container {\n  width: 100vw;\n  height: 100vh;\n  padding-top: 45px;\n  background: url(" + __webpack_require__(61) + ");\n  overflow: hidden;\n}\n.sign-form {\n  width: 300px;\n  margin-top: 60px;\n  border: 1px solid rgba(161,161,161,0.5);\n  -webkit-border-radius: 10px;\n  -moz-border-radius: 10px;\n  border-radius: 10px;\n  background: rgba(255,255,255,0.5);\n}\n.sign-form input[type='text'],\n.sign-form input[type='password'] {\n  width: 95%;\n  padding: 5px;\n  margin: auto;\n  border: 1px solid rgba(51,51,51,0.5);\n  outline: none;\n  -webkit-border-radius: 8px;\n  -moz-border-radius: 8px;\n  border-radius: 8px;\n  font-size: 16px;\n  line-height: 20px;\n  text-align: center;\n  background: #fff;\n}\n.sign-form input[type='text']:focus,\n.sign-form input[type='password']:focus {\n  border-color: rgba(71,182,224,0.5);\n}\ncaption {\n  display: block;\n  margin-top: 10px;\n  margin-bottom: 30px;\n  color: #555;\n  font-size: 20px;\n}\n@media screen and (-webkt-min-device-pixel-ratio: 1.5) {\n.group-conafter {\n    width: 150%;\n    height: 150%;\n    -webkit-transfor: scale3d(0.3, 0.3, 0.3);\n    -moz-transfor: scale3d(0.3, 0.3, 0.3);\n    -ms-transfor: scale3d(0.3, 0.3, 0.3);\n    -o-transfor: scale3d(0.3, 0.3, 0.3);\n    transfor: scale3d(0.3, 0.3, 0.3);\n}\n}\n", ""]);

	// exports


/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAE9CAIAAACqX6OrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAACnYZJREFUeAEE4VuvbeuWpWe9pdSvtT7GmOu0I3YcnJEpnEbyBcJCSFxyw//mDyAQJwlkyYY0tvMUsY9rzTlH7619tRaeR6//6f/e5L6+zszj+CJp+oVwHUwCcokhSEaz7wuQFAKSwOoeUzD3/SktMOaog4AOZK/q61lePg+Sz8+/5vX89vm9+/nx5cv7x+/W8abjALJ3aEmzE7WkJKWH1kKCDezXLcau799+vZ7ff/jp972f1/P7l59/L+u+L4Y//Pv/7n799svv/8368mWu18dPv3x+/e3XP3/9L/7Nv9VZcz1jRNV6o5bWAdY6kPL9e9RaD5h0A2S4L4DzJGZfBJjZLx8PsH/4XWa4r+Tm7vt6Hu8//uXf/w8//d0/1o8/5/Pr/+f//f/84cf3n373NzMtjeo4Hx/G8qJMRBW9kXAxQznP7xlUBZPQ92smx+P08Tafnx2O9x+u79+Se9X6/PxaVa4FzAzh/cuPv/7lj3/4T//53/zb/6pt9W2p1kN2ZquWHx/ZNzJYpeRmhrE+fszzN51f8vpG2e8/5r6YnfuTKjpaj9zX/fp2/vC36f78639G6zi+UDkeH3r/UXX89/+n/+Mvf/PL2/tP719+1nFgM5O+yWg9kp77O9hrgREE+UGZkPvF7MmG8fHB3mi03oG5P1Un07iScT0o/vqf/sfjfHv/6W9n71//+B/fPn6WZp0PrYdn6/FIwgyAJ/elLMqw+3rZDprZvfs8PlQLBWn23dcFqXWq+O0vf7yv59vHT0w/3r64VvdNhHx8fOjx5S//8//3en5/e/9yPj7efvpbDn//w3+w/Pjhd+kXztxTjx+YW3Wmb50PmLw+o4jqfTMbuc632a9IIvfrE9mURDKv17fj/LA0093P8+13x5ef/8N/9//4+utvf/ev/svH4/Ht268fP//+sdZ6vHO80U+d73jN17/o/KK3M68nmH5mv3R8yf0t3ar6/PXPU3o7v+zXZz1Wdx/1/vr85jr2fnkds3dm39cr8P7+/vG3//T1n//9f/if/t1xno/3D7IlPT8/n89vf/t3//TL7/5u7/3Hf/4ffvjl94/z/S9//Odffv+P9vH967+8ffyC+frnP7x/+bnW8ad//p+/ff3Dz3/7r376+R++/vVPf/7jv/+H/+q/qazr+lpemVyvr7v38cPffP/jP//6h3/+X/yv/pvHyhJAmDEWmrk345Fr4hFnrWNmMxMrO9IRdcAuYHqkWodzJ+AqpVwP2AEfByBi05ooCGAwsrTSQ6ISZRCJahFJyjzlSSQbBQLJROuxDt+vb7IFItD3vmYilJnZ977v+34u6ziOc325706SIEku6YGv6ad0ViEf9FDONJmkEQhiCTKo4gWRKoS15vV0rSEOCAIBIVU0lpn9eX3/Ye+yUUmTvvfrWUcBRoKeLVQYSaoIDD3IxGAYSYlhJCOgSLTKu5lex7pf9+4t27Ws2vuevm0ncaZ7y7VqdQ/C54GsEXLSCALc2VAFYOgNoGE26y33BZO5kRlpncgotVauz9fzN9tepw/v+2Ytvb1xT8CqWg/VQWAAAASGJkOVwciqShoBgwYb21kgqcLONGmpGPAkWx3VIkMgg6XzUN8QmHW+2RaTtAY0GDAMCQyCOARJqkJaChFBkGhm0oCSpTVhd1ZpDwmJJPWMAS8wQ5R1HKPOfur8wdJ+PR9fLhSG9IYNwhCwAWymQ1ukJBnCjLwkEQwitdYk2WGxc1VpraPKGIFlq87z4/X5eX/7/vG731FLcjjn+1c9vujxJc9vKsEm1vmOoGA72ZLXOl69hSZZKrqbnowBMB5GLtfKtH0gT+juo2p5Ie7r+vz6Fc/b29uEScuu40Gcvfd1n49jJr1b8tDyIjO9NXH5zjD33/7+3xy18rr68/P787ee637dr/v6cj3ZbaeYDGv33d1W2WvSM3fm3hN4WOAOhunZAgCZFNlhysvlHlFTR/W9xZrEaQjEEkgovY1lUBgWbDjWW99fhe0DyGypALnIgI2wqcUAgAAAJEto0pmWpEBGJqPX85m5y2/2ruPsvrrvgyEhUR2q0u2jTjADGWwCDAEGICBjaGe/IFB4cX1ikIBapx7veX1mNoEMApC97yciDJmkJfb+vF/W+oXOsapn2Bubo5DTTYYBJn3Lx8yWlTSJXF7LE68F7BkZHDq2pbXZwGRPX9e+zvWu49BxeEiiGQACYOOTASCZ/fQ6kOgrEz8+mE2gh1qSsl/M4MGwCZ39fXLv513ea7nWlx7V42HMwN25NxOXXJWEGRUhyUWkAcBgIxMAgBlMEhjKNGAMBVsEhMpkpqckPYoGjJZiZJCNjL16btMzW7mR5SIklg8Am0YUlFDAXlqLwAwytlWQcoVoWLLr9ATZy912WFX0Zm2YdE9yHkeEek8Hk2mtB5B7Z98qoQNghjLrVN8gNHO3NGi6t9A631aduy8yNAIh2IBw0qSZ6c5jnZNXS+fbl+fnr79+/evPj7f5/tt1ffcq9VVnQfr7H3S8zb3LP1InoDr689PLtY4De63Zd/ZjZs+MZVexM3OTQa5yw93z5mVZ9rHe5dX9IjN9n+eP0jHM9MDqJt5xekay1wF03/dr8zOE8/FxPt4e7788HueVwVLm6tZxfP75W++r1mOtN1p/+pf/XI+34/1Hppdm9txLoKCxmBimqhKEFDHYAuKkNzGQUadVtpzR0FTNvqeva3pVHeuRjo9FprsFSsFCQ0h3kIYMvdtgLZbJZJqZWgsaW1rRCxU+RNNDAgaQZ5QZRPcG4pYqc4PX+YH1un6bvkiBwsAkd0bSSiKIb/mdWgDZWgcGGUCGa2bbAggA13YtKEmslc8oA85uPR468MToy48/IzFIlWHf36eXzaBJChC1QhkGYDY2gml6TW+zIDCSmZkZIyR2332v8w0AT6a7jca598VsGJJVawyw+07fPhYYDMAGQ+QgqY4EaTA0Oh5ktA6MqnJ39ib0takp6X59nudHffkZw5yrN0BZxxGa8joWAxYaaOqge/bGdlnYu7ABMrkHJrZUsjMvGgBARkuFViHTZHAdyNRiNsNxnGB6XAdoZz8EM5NkmhlCBkBVUTPNiCq5VEVgdkCCGQBbse2AXJiexq6quQWNDiHETGo2jKDqADTLdeZ67b7WWqoTL+6LGZQkpIFMy5aUCIFlH6GTVnnVgTT0TNsleabrPFxnKd0zw0FlOtMctenrfn38+NM6/cc//PvMfHn/4rzEue++nvcq3fdV59u+9pdYH1/IpmyLjM+H+/tkr+NIZmav9W4vySBLI1uFkZeqJBmTkNv1vtv36zXdruXzzTD7ThqoCECEsahi0rKZ2X17HW9vX+r88nj74Y97/+mf/92//a9/nH0/P/9S65iR61xvx/R8fn77p7//p/N4zIwlVtk2kgyudb4d57tk1/Kx8FKdooTT7N3y2JLTs/d9d1/pPd122ZVMcjOjEg4M8lrHdd+9NzOshbW7934NM5nZr5mGkEEITUZ2ZmaaaRAWzHQze+8LwBZl2zaw7wvZHMD1+v56/vZ4/0Hq3s8ktnCB080gQJaNwZCNUBW10GJAAPTOboVMKDMbGxkVGerASxYCRqsYqKXjHHh//9EqZK0HqnX+gI4ZAAC56kCFyOz0nRlmCKjQQSxKLlB3YwEkJAJCuntfMN23Mve+mPR1H8eb7fv5nNkzmRmBbWNkBnqToRtZx7vWgdB6aL3jhaAWst6/oAWgaC2kcDMbfNQDkmlYBGwwOLu1ltZhudMzgwBR1qrpAbDB8gKTDaAhoxJABgCwsbFVRQYZM70B1UpCbwAbAMDEIbn29KxVa521TtbSesDM/Uw3JHR6s7cEAjFzDTcRFDIw6cm2AiC7NH11t1fVcRAEGWYaG6Eqq5YrszMXSve190WJfe/rNXTvi24aMszO9cq+UcgmIDRyHXbt+yYosmqtMwnILhIZSBiA7s/PT9XjVPW+MNd1/+5v/vWPP/9Nzys66/jy9uPvlo7rtd/efzrrfP/4GDZ9ZTdxPT4wIAEBvHfbhbz3C8swScJIDKsqSZKZ7n33vhHreJBOP49jwez92vd3wXGs9F11rOOhWqBJA29vD0t7vyZ70n2/kqnj/G//r/+X//6/+3+d7+fj+HLW4/H4qPPt9du3//w//rt//C/+6W///m+fz68zsyYBJjhkDCMnXUgBILmmZ/a2LWUVcoHSYy2XkNONJoTYruARZBIN41WwZnZSAD3y4UruW36s4811LC+kdGsdGM9KupmamnlhsbcMo3hsGBisGiTrcb6/jm8IuaZf1/Wy2x7oqrfQoFIJ5JKO5nPReIGkBxl6ZzZAhkCAIQMIkpGVfYMxBDJSKY5PAgEvZAReg4+3j94tOZD0cbxrHRCQbeTuXdUwCKaZYGffCNiAz4PMkMxkbK9khAMIwmSYIW3r8/vn48sHsO8rqfOjjEjbln3vOx0ABgIgYeTCJ70ZYAhJuyp9kSGT7rw+VQ+EnFpf/PjQZH/+dv/1z48fftZ6UKfi6MbO1WSryhyoAGYYsClLRgbkMzQAIFMGZzdsMIZBJTCYkN1aIkhoHZlJNzP0ve+XD7RWeiwliYJMxj7kg1h1aG+pkpEKL4JqwYKRC4vQd9dZgMLknj2P9cCnVN2bDDIIabonLB9gMkm39nDv++Yac2Qzc+X1DNRyP9PXK17Heku3PHhBIOlGmbRmlBJgMWPRDDP2Grr7ThotMrM7fQP3vRsJz95//Jf/+P72/vH7f71/+091rOPHv6cH+fz5704M0BdeyU0jF0LnkesFVXUECDNtM/RMzwyy5Xv2eS6JCbYI3T2wyd5bnhHJXsvJhJ3sdDvacNTbebwxE7DW7ts+qQJlD3B9//Wv8/rx7//N//Z//3/4b/9v/+fP79//5u/+Pr373n/5w3/89qc//t2//re/+/t/9by+N+uXX35YlvCj92umj/OcTHZPmhSip8uHSwOxM2KwV0/v3IsDyq6ZHTT3jbbs8qo6Vef0U9POSu7z8SgXhowtOzMNPtbpKtXKTBIxzDBEqjoUMsNABXAdKPv1nWyfQpRr36/1eD/Ot+ytOms9zvPRFzM7vNXyxExGI69Mkxd97546JAqZQnVkQjYQIkHAS4u9P5loB2AGC1rnA5H7yTQMM9TClqrvX9e5tN7r+7dkENM7e0+tTMsCjMZMjz0IQtPaNyPXGxktCGBRa5lRBtlEwra0qu4V7+ms40i+nseZx9v9+qyjSQYjgQagO1pzIRNAlLUOysSMKRjTQyY0diaAVAn783s9yowfH3r/wue9zs1sBIK+ON6kQ0eBqDwe7zp9HgXefa29dD7WKhAZjgWWnQsEmGwYHUfuIS2fiCTqnf1CVgnba4GRJZgBkum0AcBGxrGU0Hu72lOMdR463/AiIRsvZua+vBYxXjO35pmAFiytWfO2756MZzJdPneGsAapgmde19zvs5jHDKGg2Pfc7fPt7cvHfr329ap16nizL2Bm5vqUve+s86TMjDT3vjV7CF1Cay2YhiT3vCozM/t+ruNtZaU3wscD12TPvuvx5X5+m/v5/ru/+fzj/2/ojx///vWXP7y+/7qOc6Mffvob1wFmBjP3b9KH1hcY1YBzfU7sdZxV+/Wyq/Oc3khUhTHV2TMzc8OocK3ct9Imx+Ojaj0/f/2p/0EgVdg9+3o9b/bQ/bqgJr5erzrfjbClw+t9nq/Pv/zhXfWv/sv/6ueffv8f/8O/+/UP/9FefT/X9P/yv/nf/c3v/3H36/Pbbz//63+azBplZsikm3pLPOmwwdYSAETlhYwYE7BljEiS3phizR7CqgNJCJ9FBIjpkZfPh+pgQLdZYOjkFm8hgI8HXvSFtjQ9W5G9MPLCggEgIwrNEM2eWbj3hgEEdu37ue9vb/PBMDPRMA2gwgbNUIAggGGJjhY1wmAyCGqVK4xKyYIBoFkrr1f2Vi1qweg4s3eypS0/AK2HUO/pCZYxE69TkkStkxmtM32HrioiTOYmgNNbXl5HZg8jixJTqlo60FrnW7Inz/N8sygfqCbYBibpCTQxgoAMgFUHawHMoGEZwENbejBg63HyeJ+//qkngdzXnvH9Yp0sS++rLB/ZrRICINbbQqr1sIpAxmVCrs+ZrjoYU2Ru+VBV0lKlN4CNTQ84aZiE2RfEfaqMF5m8ftuzV73JB2lYQhBsqSQLBqvM3EyDCQiyYYdoBgaGbAITmhTrPJDJJgypsoAZXKrFYCmE3GWx1nW9MiPZLHt6+t6f7Hq8LdeBL6gMmVsiwbVer+9rPbze5AphBph9G2Ek0ztsVITe3enjQKAhuLN3X/FGIBWIeb1uuv/2l3/IbitvP/6j6kjf57m+/vanX3/7i/bz/PLL4+MLsnyEYi6tX3J/pqNlrWOhW1pem1u491Tdvfs43oTC3bMJfb+A6bZ81CFpMlYd65h99b7XcXidI56v576+13F293V9W4+3tQx3rZ+tcrfLEMvlx/Xrr7N0fvnxf/Ff/2/W4zC1++rX8/3Hnzz543/+n96+/Fzv69c//mcLT2anVZJjCQgC28bCBjJDQhq65+69LcF0X/fcMwqKC0mSYGhmT99kQBksg9IBqpbr4Vouhp0AyIaldVCeefb9lKISQscBYqABrcdZtZgs+1gnk0mA6QGWj55cr9fuVp0zyjSRfQAg+VHHaSkAoKGH7GQzG0CLANA7z8+9b60FaMQMM9SR+wX48dD7F2IwLrnIaD2A6y//QoHIfpUlK9zTm0wQtmRsBkUww8gPZLmhw85sGILk0kone2OSmb2lAhEn7hlKyUzf07ddiiyVURCyyxIMJUwUGASBvQFkZJZhmFG9E+X7b/e3P9eq4+NH6gzH7M2+MNSSDmydBeS+aMAAKmqhmgYMQmAbIWHoYaAHkAoZjExgQAub2dwXs4Vkwc7+JJsZbMsAZQSzuzegSMhycGikDCCVyNCTBBDCxkhGYGQE1kImDSQtSDIzQHkZr3XYK+mZu7uJzuOEkD3s+37u+570Wqa8946o45QkCYRctXrf1/Vpi7IimDAkzMjWqut+Pb9/zUQRki1bhkwnjbLKc7/2/aT3Wsfx/nbtl9bp822db+cPf6/1kdx7+u7jcf7408fP37799fuvf7w/v/X9Yuz1g453MD0E8N4XVq0KBhSl9ypVMQm0RdJ7PwHVylCuerw3ioRwHbUemQbVcZjSbGhguaBdmrn3vVdpmOu+JWU27rcffjmO99fr+7dvf75n1/F+vH05P348Pn521efnN7zO4+2vf/hn+lozk/T0PXXs2ZYsmVVrgUIkQCSZsa1MelRi1N2WQFoFFikfYRgEoTMdzL0hmcl96zBViD0XZNWDeJRyYTOTfdN7GpLyiTy9fW3ZaIGxlbNK+7pQap3JVaU6Hj2pjM9Ddq238kOq4QmNdlXZlgKjCSIzUqGFdqYpswcAtCp7AGYAILvJMAMiA+h8YKsq9w3DwDro1lv1X//07S//cnz8RN1ojFat0ST3fVX8aRe2qyBJhAmU2QDyWUz3DvIqyQgLOjoP13HPndy9L1vn45EMQUKuhMmEACR11ETyYRuVfGKyw6DzSN8YZIAMMmUdJ4fm1z/16/N4+4JOMq73x0NMslsGruQW77BgAwATerBsG9I3p11L6yATCkAQmKEKQJANA8CoBKaH3plbWK7QAPe+91OT9fazbWRmyO7+dFWIZMhOkMsB3e3CALJU1EKKrfPIDdxIBHDCaCpCBoSKNW4cvGbvZACEytYjc/V+IsmFLfs41nEcBZanr/v6bdUhg4SdAJbXWgewr+exFnFmQNN7J+8sYGa/Xs+13gCXha0Ku+fFPIh3vwbS8L5cpdHb+eXLDx+B0VFema/9/fP+9sQ+juPjp7+596uOul7PByv6nP293v4WPK+njzeYvq91nn29tA77cKnWcr0tbZXsgjV7hL2ADBn3pImmMxnWrOOsetje9wiqTs53XKsOufq6ruu6Pr9ZscYlqSSQvY7yue/X7uch+vVZx0zf5/m4r2/X69vx/v757ev7lx/eP34xMDMMpGztuXdGLtcZ47JqkSQJBCRbZYpg2VVViztqSVV12ksu2VJNBySLYXqHAMDdN2itAg0qFxjAw1xJqo5aJxEBPOkkBDwIIkaE3RtVdxJmmAlgAWOf2Xu/PtmvqgMLGgaBGQYilGkGbDIEAAykmwBmrVUHtSgQINYBgJH19kYVy8jJCwUN8Od/+efvn98IjOlOb9dpzuaoOsoOPTMELB0HHKDMjQSLAJ7pzMV0Jt0dZkj2HY3Xwpa176vvm6F0gNdxSIHIch2RezcISipI5gYwmc6+CcgEGDLMlX2D6PTntzreqVMlZHxKJ0CZvub5iYxMQCAAACyJNKASQERMWetAh3wAve/0ne7cNwOQ3fRkNzPZN4BNLaTZmwy1Vq1Y0BgAm2EaCBBNIEnfN2G6ZzeZ7AugFiIJmBl6ABI6gFwgbCSmkQcRW4bd6ZQtz+yeUMtlJAIqsFRLB4Bq93Tf2dN9IwBAghlJx/kuae8nRquYpNsuq+7ZmV7rXKsmG43r1DqAoes4V9WMJrEWKibySfI4DknZjZArfU9f59v7cRSlevvx7ce/O44fznWUxR6vN53v7Cf9TH/Lftlrrvu6bid7bqrW8Z5UB0kjeR3rONdxWpVk5u7u/foMWC4zY8leNrZKdWBTB5hi1RIC7vt7h4kY7CW56m1pifn48vN5vFG1zmNI9wWZe6/jUaNVvP30c50fBiACBBjsWloVRggZpZnYVRIGyQIleOGy65CUtDJ0z97I4DRgCHLckPQwk45lh3N9DOz9BHCYMEMgYLSKNNMzt7BcaJihB1klFoDtfXd6uu/eF5MZnY8fqnxfv6KAoZia+6bDwFjQs6/Xk/vK/sz1yvM794UNm7mYQSSNYS0w0+HmPJhNb1kADYi90TCTuQnz26+uqSr6hhEEBtlnyV51HI/yuSwYCKC15AWCIFEKU6U6zkFC0zcAkJ59FWg9vM7pvvaNeDzeExJmZh2nz5NAkh6XQ3ffmc59ZW5ZDDD0kGGGgEydWo/s1/z6x3236pCVvtLfMbk/ky0VIFl1wJAr+5XrlX2jUAVrjKtsz+zuxuBTjw+V0jczdT4AsqlFGQDSTXbuFzJVqsKQ9lrUUh0TjvWGikAGoJZcyKqSSlASzu7bdRx1IkgDZNI3fbE3PTDdG0CTaVnlRWCSCRmcSFIByaY7CGwbTe89vatMmhm67+uVAS/gOB/H25folJbqyPR9P6/7s+8LgcoWkO7dGzcW0vSebtX5/v5hZfqetKvkJZ8jgY5j2UzvSev8OM7Hen/3efT0enuUnOfnft7r8fbxyy/H4/34eJxHPR4Pr8PHgp596/wx/Tmvv2J3z76fx/sb5Djf5GXbyMge+4R16GAGSGZmJBH3nbW+rOMUk86qh9eJwdqza53H8bAKmPtWbB/nxw/v7z8VZRnaZQKK1cn9eJyrHvfuQaiqFtHed+xOY8D24ZmdmZ6eaassMz27SVRLqkwzrDpQoeBJCQbN7J2ZZGwlDRMacGb2njzrKJ+PzN73DYnZ94u5BJG9DqNMh2ECIqJOrcqAiiokY8nIhMmAKai67rvT9pq9hWzf9+fuy+d6e/9B9R692yum+1J6IEyAjKRSQSYNTTYo981sAj0AvembQevQOvAhir4y93SDEZC8Pvu3P99/+pdcL+ngnufn159+/pvzfOz9IjvZ3TcM3oTZ976vmQlCYgTErVqqQz6QsneYRIk04LKPJJlGB6G7mU0y8Ha+JfHx2PvOJJNpABuRgZmIChYlHwyZ6DwYp5uA0PGARRvI3Jl7VTEDnr4l05OZXHfuG1mP91yvfP6W6xsG0fcTAMMwsgrwTO9Xrpc4gKSRtQ5VYRMkAQRywyAQKoEygZmMvLQeyCBUzNCbAAOsdZRMDzPdzbRroUKGIQOgSZoARmYgsQ0gg5ghZEiAJBEGCGTKp0CWrUzmfkkDAeEChtm9ZbxkDVq1DhLg9fnbvl4SCJzpAR2PD1jMMC1MBDJLOLPRmgHKGXZnJnRmB2BCkq5C63y8/bjWA7CNxDrD7Sqd7zoe55cvZ/2gOjK9XPf9uq+vOqPTuX/DpXWu48vsUOt+vUbsfYP264mQdZRKXmtN35bLDmBl7iqv47A0aVvreFQdx3q3rBkR204bdu9Og4Dz7QMz2btnemSS3f0U2ul1HNXs5/fZ99779fw6c1kHYh1veX2+vv/FmpYlYTFpEiIAMb33fdGzamHkSjIzikAgUO9mEpJMGJDikJmt7AxA4NCBwEigJawI955Zfmg6fZGBoOm+ZjY9BK3Dx0Ggd6ZdC2AG5HEGMpMN2fu+nt9IbK/l4/GDjy+Ry4V6ZnCN0nOHRl7rPI6H6wCxTn38qMcju5nNGIGtdWoVNrJUhOw92XYBYIC+7v26983A3sDjfPjxQz2+kE2tqGzBuJQMQ0/L8TqlRYaJstJ39kUAowAARGVMkn3fzJCZGUrZF2CpjqN7r7djptdatU4YeqMwA85kwqoDG0Jv2DD0ZjYGkfsmAzuvV56bYffV17fMq95/1vE+r+/7uny+6/EFr+xX318RrIVMOrOzbyDT0w29+wKXoXf2JzNKqQ5w9kVvIPuVuRE6P7QeBKzsK/uSFyx6iMDIdTxAzMwMApamXG+ulensO8wwBGbYe2bA6WQ3gyIEmvSNyscBZLrZCQiBLCy5COmdmUyDUjXMzKR7pkWAe7+ggJkcx9tab0x3X9C2cj1f3//6/PzzTK86Jc1k7yHJwGwEsK+eaXJDwpC+Xs+ZtjFr74EUhVa6u28hQ+9NOB7nWqerUKXDfmo9qt659/78dveojr5fX7/+6Xp+v5+/ff3659drz7fv8o9+/73Oj5Dcz1yv2fdaa+7P2ffuO6pMdu9kbxoAQ9VxUAXMOIS5jai6709cXscE8Nv7h1dFOt4+1rFIT4b0Oh6UJ9gLEsZae9+DDJJcNbO7n3O/Mq9SjKyy9P3zL9fru2eaiVXATKtkL2DSPVdZqiMZ+up99b6FM2QiBJpkHNWyj3QCrBUVEqok3dtreS2w45C5nzMNmR4QDIIYBKJH8VoHhAlILq1KggJgMJmbmZJwwWTGVq4Byss+pvfz+ZzB5UwSMU2mMM2Q5k4GAMgwG1lWdmduZpCRM81AT+7XzIA0sFam6c0MeK3H28cPqkq/kickzUDvGwBmwsgUlo8qH6IyTQaGhFT6BZO+s7e0TC2f8iIA0iSbASBMN90ouzfWvq+Z6W4CYmZjT8/dG2F7uqcbAwDywQxGx4HMDPsJF5r9+VWV6/rtev36+fUv+9vn/fXr6/tfZ+7j4xd/+T3ZsJHr4ye9f2HMvvN6MaOSqkgyewJRkL0QeNFkX/P8NXmhAiMoaz1UBzP0JqCgTBqkdbhOAAYBYGP5PAFmokxePY3As1QAc5Puvnvf6T0EhtnpmwxsNKoiAABN0plGQpKLMDOT7vtiz31/9nVlf8K4bHvCZOSQAYDlkjykGwLh2vd0i0UmIGq6V+GqmWQPvScz6X1f975mNhPw6/OTBhkz6ZlMKD1Uh0Um8YKV2X1fdJcPeQ3KBDYeaq0vP57roMa1Krnv7+Xj7fwlfe/nbzqO+e2f9+vz9fmX79//lIFSeVFrHcex3qESXKtnpm/oSU+GWUSE+3729ExPT1/3vrqOs+oAVGud71XL69A6hiHtUhA2ET2u5dLsXnWUH3LuuamKumRm25RPslBH1/P6rXy8vX9ZchF271oHuO+9jiNMJoWQgT0X02vZ64BgsbU7EB+VmZkEXCUbCY7oVq0CJQRsZdlr38/ul+ucGXTYCT2kBBNKEAiIAYuEDHISgsrMYET1dHfLmpmZruNt6nXdt47GctW33/7j9fmx3n6ODMwkQRQz1+uZ/uos16Pe3xjyeunxyG4YZGZTJ4E98a11MMkelSIzg80McabreMML+P6nf35//0IhNsPrtd8wVJ3nZK59g6re1johpEPkAxbZUmkduSfZgLwUUYtsgr2kA4EGe19Pcx1vH903BE06tnoas7uR7INAsKtcEFjUALAANAABwAuBVi3p8cPbOp1/vu7r+f3P3z//9MPPf//ll3/ieEONQEtlvb0R+Nz7fgWSBsDAvq/yUccDLBoBG4OLmdwv0vIJoEWT3cwnwLFgMZN5zX1VPfCCAcBpXBVGdcSNhv28X19LS66ImUwm2EXfe3ILyqa7+6p1ALjkEy1yo0FROb2ZSSIp04SSchwZhhhmbmnWOgbNzMxYFguAMcZBEkqQT7S0jnV8IGDkd1fsQiEw031lAiGbzDRTECly2YfA1/U902PCJDec3S3pOD7WedDXt69/rbfHzJ2Ma2k99HgnO9cns/T2hbV05uN4py8eb/Jjvv1B68j9+vz+5/f3n1+v78f5UY8PX98Gr/WFmtKa68KqWrtf9+vmsK2ZwABSWZN9d46da98vZKD7BqavMVUFME1Lfqx6u67fsFAgXkvyTNs1vaUSgFwwM7nHnkkCtO3r8/nlx388Hx8LbGutE8mI0jBAQaCvVx2nvYYJEbP3XuuBTcvrAAZCKxYFysQrLKcnLZFhT5LeqSoXONJM6gBClHs6ryoYATN3ucBA9hXkZREm9FBChZJJ6LK8Hvf9WsfRx/H8/tfz/W1CnY+i+/l1vf08bRt7MZppW0WPlmU7DNgM9Naq3BuSjTSAjse8vsKwqgiFR9jMpgpJUhQAKD20fiSv2U9pah1g+aj1Zq2q1fuZ3JM1O7UqPQUUoamDOrUvSKbRhNCDpARku+oALLwWDJqZyW5Gfd/A9EVnv246pUWpagGAgBmdB4LenCv3jSwttACV8an1LpV+/PtzvZ2a7M/3v3zx+aHzCzrgBqSiDrrx4vFGfx9pt87XKx8X6Xt39730QNyfn1Wr3r9gI+s8gOzvuW8IvhLk0vmOyEQqqtb5DpO+UYPoQUjO9MzlK1isBz7JCkOQqvuu4wEwsr33nQxBtgAZYE8crUFhBmRz3/cVHo8DJUlmBOyxZQCjQ5z3dWMf54l7b2bvBwCjsUXQaLKTdhWAsJddsnbfS7iK9IQjNWmS3tfsC2r2nd6uOh6n6wF076qyq2ekiAHmnvXAIvfr+fn50d3d0GTX8dBxwgnO/SKIRcHZ2fjLT/OnP/z1D//zL//4bwmH37Ue719+nBa1ar3VWj07IZo6V2EkoNZatUYzM8sHk549RMsy2ez7Bds2YGX27jrv+359fnt8KHTkeCVZdTo13EI+lrYGZmZVwWA0GjGNcLjimVmzt8J5fMiy17GOR62zr8w003O/6Mz0vi8pXkvy7Ol79+7d176uzJDZ9zWd5VrrAMJMz3Snt4ZEcmF7uWxESK2q49yJjKWZ6b5BkGQyzaR89m4cSGZmN5CZgWTnfuV67etzrbWqIOf5Nn2Xq47H/fze9/Ooerx91PH2/du3fX9dtRIBsEdNFICmCi1sSVIhg8EQytn33Hf2a+499yfZWMTpYV/pV+5X9oUAYKdz7evz65/pcb3t/fQSYLEcm7VU1t697wuQNAyAUS3JBETGUkkFgagWoe9733v3TbB81AOY180w00D3XeeZkb3onX2HhoUqssqDVMVMupMAcpEBS1IJkI2cROvhjx/pqZ//6fzX/2u//8QqvX2Q0nGGBqiTHuaqx+Nc76vO3k0auVwwGZCNu5ssQvqCpXUizVzTL9IqUUbGSyrGAAq1tB4kMLlfeX1Pv6afmaBiwEuuTBRjY8tlV1WprLLrQGIGJBkMgNh37mf6zm5FvWcmxgEAhgkJy4OGSAWQ2h0LCSGme19oAELuLXoyr9eTdNma7N5WTc/QmZ65JzMNgUQqkFWWvCyDrJItsEtVRRgol72mL8auN1QIZswwECymBybXMxlsemOHyd7Zd55f87yT+8sPv9f5E7Xsos7oUeuD8LqembvsdbxJZCaAmcyqZbv3JhhhMWOEioGEtO3jeFtek0zA3H3P3uDpzn4mn71foRC5x66QfW9oM5Ded09PZ9WqOqoOZdK3rJm9lqqqE9uOmRncu/d1XdNbQhI4KUIykyBjLx8zPR1kMAAgyRUcQdL37h4JOT4OakmaMDPYFAYhsFGapEWyR6HnGnbcDMhKRKf3TINATNNJj0u7u+9d67zvi3RI1Zp9Z26r0Pnttz8/vz29SMjsoEwI1kqaBAKkO3MDZCgDzM5cvZ9zvSY7k2R3X/363vdn35c4sJmNFirVofOw2dfXb1//+vz+ue9tjrw+u689AwFCpXuV13EgsSf7ZoZR9p37hWudD8pAWuJgACihrjoos5w0BCIzfdfjHXE+HjFrFQpO0rnvmZlsoapKh4agx0N1Uks+hNKdSfaF0Try+pZ+4iPXK9+/ab35x99B4NZx4FP1yNzszn5lbr/9pMf74/1LWdmfCBnEpFVVHz9PyPe/kvF6Z3Ze37MvH6s+ftTji9Y7Q+4XMrXwwODSemCDiYCZq/cnc5Ngax0M2VcV6zygMq1atoAEU2udqiM2VDL0RQaCC4X0ZPd9M2OrbAGRME73nj2yht3ZLstZx1HHAtID1CoCGHi9ns/rci1Tfd87IDms4zEBdJxvlphMbkTPTILoRHZCkvQwsor09ADDPbutAk889HAFeg/24/Fl6MnMjsvpZkIm/UrCbKZBWm86fpCsqjpOFLJ1HsiZCUy/juPDx8fQWoVsFhDcsxkAYWaPh4lVVYWkSeY1M2QRZmQdq9aqx2M98LLPUqlOuvf9FG0y2ZKZTlo0biAyweUZMqlaAiF67325jkjdY9uZ3v2SOdZyHfZKILYKKd0zG+FVMHtfMztAsFyuwHRbAzGoLAdm5paGhHtPjzVMCLCYWEUJgtjZswcAah22zQqjKmrJRTrT050EL61zHY/Jfn5+JvM4zxkms/t533fVm1g2Pb0/P9k73TPpNBIAAIGda7IZAAQMtejR8YCQbWWm97VtSxZKpnNnhgiDQUvnQVnr+Pjxpx9++f1xvP/65/8Ec759TD+xtA6tY+8tA727SbKHGQwGgo2AYIC+7u6Nnd7pXuux1purmLFPMETS+Xi7rs9Vh8J+3X2/IOfjQ/UWaveNRpCZfW88GFlykQDYGDQAAcRxks5909sfP2R/pp/Uyr7zekXDDEmuT7hVh/SApeNd5wdrcTfCIj4IYMBK38/sO3Pn/pbdWge10MLGqESZGXpgEMzQmwwhe2duoe6A6nhIAuDar8/7vgYhA8kMpO+ZO8zed/qeGWaLhJl9ZTYMWbC8Th8G9s4AAAzJtCRDuulM39Nz3a/ZNxgYpdP2IgPsvnsInMdBkp7z7cvHlx8gKq/DTM8EHVWHwsyMoGSRTBgyUHt2ZsAgIkn2UQaUaUmgoPSdCaz1eCiQnr73fZFJbwbpTed79p3ndxhmY6efuT77vnLfzHY9mGG2NIJ1nrBEpdPXjQ2ImruHINsLPAPM5KZYFkDozCDV6bUgu3eny7WOipJR1TnRjCxDd+6UDUbdA4Ut0AAxQbv76rmwVJE6rjFMW3VWPWwBLq+1kIhYQpBkhh5nDPR0rskmDRmmZ9/3M/Qw6Q2xBcD0zJ6d6dASM42ExOykoY2nG7YRICuSXJlJd6D73nP3vvf1AiT1dCIUWURSoCfZ9wbePn7IKN1Y8nIdw1yv37yMgUiSgaAk6XsLAaoCA8zQAeODKCALzb42bct1PMqPWhXCvQmws18wrEPnu9bjfDt+97u//4d/+Lf33vZax5umQKBVlklP9hCiwQZAqlNrAcwwVlWthQwgMCgAXvJaVet4m+njeMx0Zoche7rldT6+6HjYtapsk0YhTW+AIkn6zv3KfqVvMnIByeh4EOX1BOv40HHm9Z3ZcmVfub6lr+ynpOzkvplhX3l95to6PtAis+qxVOv4AMhdZubq/R1Gjy96+4IKDADIeMkHAwIttAjZV+4XmuQi6DjXcXh96HjDzP09+xW61mFghplSEbpnZiQy3WkABqxaM7PvK3OjkaUqVdWqtQpPaKBc8tI6juPN63CVrcw9u/vu3A1CSMzszABEtdZ5nsjIkshMct/PJESYmT3dNhFDXKZ7BvlQHXK5Vs8eR3Idp+SqY61V6wFEWuuodRqYjaGsssEWkB6A3sxmIh9aB/dGZHaub7lv4tf9Yq7sm4CwLR9gAXOF0TpQwp5s0rUOr9WZSaRSPajV0+rufc9MvLpbtUJP9jBDS/S0fMgODaxa63jDa6IMRtNTVVYFjKrKpd730DON576fYQBiC+aVuR02aatk9X6RWWtpLcmr1jqWVxGsYgg61mOtB6vqPMu1jrWOg7FdKvdk39dkAKuEQaKy90xnhiiRakEgoH33dIO6d993esCS0sPeNZqZ3ZmAWVW2k4Ct5VLf18zc99X3dR4f3ft1/TbTKq23D62P1/M58cwEkskEBCg6jodkDFhSpulhhYwiuYxs2YaNprv3/VrHAktwGEFgyOuV13fE/fzWu8/f/T1H7b50PICZzbRUmSzXOtDKZMsngRmAblTMzIxWuZYsMohhMk3obiDzam4db7NHVcR7vzK99wvJq3Cl73tfI/W+Z3emIfQA2AhmmGaaTPYNBuittXS80xsaFz5zP7OfFGRrCsFsajHP7Fdyh3Bf9+uvsFkmbR8zk77vz99mvyZCy1XIqodcUjFDb3rIAGDWYi3VoXXKR/ZOf3bfwToOMtlDrew7+9rXjXy8ffnhyy+Pxzs2IowDsiVcchkD1KnjjZjBNsAEANIJZa003Q2Z3TOpdcTY8jpdS6AwPZNmQjQzfd/ZG1j2KinUOibc963zcR5vyZCoyhyPx5utu/fIdglgXF5rHee7XGu5rICqhFyFjJZVYKk6dL8mzyhzX7Cl6DiQy9ikN570K/uT3gQKqpjROrQK9Hj/AUhMmey9r6QzIwHDBNj3vl/Xvi6GVWtmupskDLNJkEPdr9fr9b3qOHw83j6Ot7d0T99Gx3pEqSpNns+vQ+++q9aqtXf3vdO9++ruSZPM7MkNXesAz2yGmWFWtnoPsIgZY/Xs9JNpZARSVdlL65RMjCwt1bHOt3V+nI8PIGCvDIxiwIkno9IkdnkdVUth77tnCHtusmVcls9hJls65cPIwig7sn0cKdB0ZqaHJiOmuxE6zp5rz32sY/dt6Xg8EsrHQKbT1Fprnef7z9ZBV/kgPd0EFCSvsgpCT7oBekcNJFfc2AEQaPdOtst7bmTVgzq1jtyvXC8GYnrjBdmvr6rauytQ63W/7v3KTDphBiaA7XIVNrWAmU2MDEMg0/dNRhITedV5ypI0M2lLdTw+aj3WOmfS09OyS9HMBlfZUUKC7HWc2AAxAZs6qMInPewG5/WJDr//lL7z/JbrM/cz12e+f8Kh4wDJBzIYLa1SHZJYXsdJwiS7AZH79a2v73IdP/7u/PI7qegLgUhaq7ABepiNUFko/Up/T38y4/VD+Ui31gGrM7CzXyS1ls4v+Hzd93VvEsohQzDIme59zYxlABrGFoSEJD1zvbpv5Z7ZYMuQmZm+0zvp0HKBsY63x/F2TDoCnGkzcoDJ7u6ZzgR4fv+GeHz8aNW+LuNM1zpAM0mPQ/aeaQAAkCyWiz377nvfQyyMsVAkd9993eKEFk/pUD2Y2XvaC9F9JWFIv5I7aYC9eW2tB7in13qAMxuRfe95TYaQkGkhgoXBMqbnMnESwvTsK/sixqvqONbKnnsPaHn13Pd1d9qY3cncr8/JyN73DUZlBY2rqg6tkoyUsK9reuzyWiBm7IXpNAxILpC1HnbNHgAZmL5JkwGQsauOMNM7uTWTGYZMku7eQkL73untUKwqu5YoEnC6J329vs31nH1n39NbxnZ3iwAjYWR8nrIhRn1fe78QZiHC9P5+7ydh31ff17F+yLD7MjCUCzL7qipgZnYDSV4W5eU4iDCzIZMhYTazk0ZWCoxEBkAC2QKggFVHIvmQREPP57e/3Pen3t6pN3qXD/ucb7++vn0FmKkJARx6XzcIuaflqsebfBAgQtxPZkRyfaZbquzOZHqnI6QJkBmvlbkpYIb03vaxVp3Hue8XE8DSzLzuqyVZPTc2kPuTuQiS6FEdBBQ9juwbmmNJmu9/RtvvX/T2JfsTkN8zF2W0yBDoYZzduW+p8CJDk753X3tfj7ef/PgJTmwEMgEhFTHAkHTSDNnPef6a+zPXKzNaB+XMThrQKsv35/d930j2YoZ94UjDhABz99XXK93yOo4TmAwMhIws2djIYkkF7gGYmd4702IYMpOh7559m0GjtdZ6s0poZvfunRnAHmRjae/L0nU/8/qkgEzGx5koUV8vJ1Wa3Nd9zTSJXS5r9t4NWbXO4zAYgN1Xds+EDNPlo+/X89tfwGh1d++9iF3EvS960zszeHFv7PS9+wki0UQSxzIi1qqlspCQLZd8guV1PN69VjJMyCC5yrZUzDDXEauk4tpX71f3dT2/7d6RwIjdL4YxIOF9f3bfGGOvAxsUGR/yykSphLvvBKkC1tIIdplVp46PYZnBdage0jETKNcaAhCQWVZZMkST7qtn13LB3huisssqSYZAyktYBIGoqpmZfXU/MzPd1+s5fTPYhTtzu2om3YFMz+5txi5bqw6jmckAzN7sm0n3K7Bn23YtybF639frldlMVtkmwiLp7hkhMfuezowmZIKNBqP1yIRYOhgADZmx1wySJK3znOnZn9mf2bfWYSLCDL3p8Xo/f/rdX/7wH779+ue1DjJ1PGqdcnmVZKaZ1+wnAMZmNkRVmWBrHSEB2XJJKhezYZo7+6Z3ZgjTe193Zvbr9TjfZpjsme0SmZme2X09bc0AJqSb3gzM4AXG0tt79g1m7vn251yfmJnNOrU+fHwhO/PEAtM3ItcLuJ6/3p+/0oMdmmkAa/fFjFw63tHCMAMgk0k3tdCizLG0DiD7cz5/xRuWeMgndvbr9fmrJGzA9qo32yAEbMBCMjT3nmDLYt8v4vf3n9f5to43MBgKFTgAM7lQIDMzDdMzmzSWy9OTmXJ5HT4OXOlAgMxtBUgShRlj10JYHO/nzLXvi1rreEw3yKtcS2WQhQaLGeyjqmDWcRgNmoKSZdcpBOl0lV0Q8NSS9JAfmO6XS8gWEWC00vcEHe+UGQCXoklvuZCZzSqKpNHCK7Plwg4gdJTqsC3bVSP6vhlmJgQ5AyS9M5PsSWT3dfX1XNKxzkCmax3n8bbqXOucVk/I4GGwCwMoLK21jlqlwGylVYVtcBEyseqQi7Tz+m4tr4PIMrLqtGqyJ1vHIR/yUcdDVVBI8jCZmVWHWLuv9BgnQAB5RZYLRCBaq47j3SbpOg+5bO9911rreJMPwsQUs29g+Rh1g/2w17BJlLHWqiNzE4DOTY99MOq8Jtuq+8rVG3QcH+f7T1INDcAAQtHsvmGVKwhEYDYsrYJNQ4YMYnpPZrp3P3v2XDez01cIBVDrUT6IsRHpT8ogifX+E3gyMyy5VFIlzaSqENk30yAiZK0FpEdVsmcmzHRDEaXddyOgJGFmRply7b68zrBnNiMkAKrZJdVYUdnMJhsZL8p4qSr3U+ugNwOu3C8sjtM683xlfw8bSjqoAud+0hfThKOO7tfsT43257frtz/k+g0GpQe78KBBcCxsalGL3mR0HPIBwwwNtXS8M0sulnEgue/7+ek60UJMWou9X/QmkMEu3ohgMJ6UyutwLVU1kg/VA4YZQC7XYZuQCRK0JZcxqwo0DBCm06D0tko6ZmamAWEkW8uP8kmPmNIxpOp4//jhcZ7GWnV+vE0698teWOt4AyaOINgLu7v73rUe1MJm6O4m2PhYtWzZto9axwTVebz/QBmwmIlXISe971sqNMpIxs7czE6gd/bnKNj0EFQHg/zQOtCGRc/kzn7drxfMvm96BkBJZ/adTLekmCYAqUzKPs/3tQ5B913Hw3XO0D1kY8WOWMdZ65hkZgPLx6pCM9MQ2S5XFbRBM0Pu/UpfkYBMA96vl2xsxKrDloAoPTDpGy8dRxLV0nmudciVQZZXqcxGyFW1Sl7A7G2LAjGzA9Y63t6Pxw9g4uM817HswnatMHvvEvbycdgGkcPYpZnbtqsAiITkyZTX2+MDo9mkZ0bkrLNqLRfk7f39qIcEM7N3egOUhddxumo6ARQyZNAgmMFQBus46nxM72SyY5fWUT5FiQKD5ZKLtbDZM3PT/PI3//D7f/zXYPY2U/QwsVSCTM+0CCQAdeg40ULCJtCjtWoVmWS/rs+7ZzIEygESZtI7aa/jPN4Skj6OY89lIVdPdxMyc6Wv2fckxETMANzP7CufXzNNofPN779IxSqdH9j5/JZ9yYWOvG66uZ/ZN+skwejti5fv+/P57c+Z+3j/QeeP4EyrXMcBBoilEwwD0vGe+zWvr3N9pze2VkmSDjLpV/Y99zX7pVXr8UMiejJxee7r+fnb7o2dfe9+ZmlEJgy4zCK16kw6cwOZFxkkBCI0DEJVIBpXIayamX3fmgJUripQel/PZ2YsAarVBFL1UC1hbMl4QF611pt8vJ7fspsI2HMjCHWerjrWsdaJgGRGUdWa3nu2ka2QfT/v52/d16Sn7947ULWO8z1JrWPVCWPWWaddqIxsUxDmvub6xn0ljZ29c99k9vUJIGcGAFOldcoH7KTtYu6+NyDo3tPbCAuNaK8DMIJ071Gw1vl+vL1bKHO/PqfbjgjTmSbpfStTFgMB23Bfz2RAYSbdfd37CRCASU83idepaRJ2z7UNzAwS8qiCmGRaVEj2RV/Zt72IaZgylSSTnhtYxylXEizsQZEggLy81iQJZK16X+9fsNM9jaWlg8F2qWQHwAhgJmRCowW2jQqWWHhBWcuS8JXr2pdjLKokel8uuzwaSj3aEwANHSGR2VdoA1HSABls6kwiP7QeqkN1rPP98XgX0vHw8abzIVUimqSTRibDDOVaH/9/gvBGSbIkSdIrPxZRvWYekZn1140B9Sztvv97gUA0wHR3VWZGuJtdFeY9B6z90P64X38ko35U75l0d/Uj6nE5AZsbolYSGKqoUi+qIUhRIlXRS5Dq4j7EJMSQxNWodN8vrF4f9/3pmCrBnPuc94mdJFGCgPj1B3Nyv1ETaT8IePT4BRdndD11PXy+8v7MeeF33v+Kvyg4VjVr5X759V/YvktrXb/8Q8/f9PhQVbRWd1XwYQ4+OQcKCocY2a8/Obf2h9YHFIAKuO+fvj/vzy87NGuplPiF30IgBkXqh/Z3Re/3azwIcCijkFoLkMjcgOqBGgBUCxpRFKH3QiIHBYkASBLKTIKqnYOpbqBiFZSq1N2sBTY2tXrTq57fFV6ff6hatdfanrEPmeplj0pQa1+rq1enqnoDWE5CVLXWOuf1+vzj/nx54gRABQSwPQc7SeC8p4yxugkYBAW1iFCpSt2IAuYwRgXhvFsFEBEQ6qL29XhAAd1Qqa7V2zPn3KJQqQAniUdorQ8hJ9XbmXPec98eUyU1EeC57zPJxIN1v3++v/5phxKqKnzf875jJlAIklcXUtXaa13O/Tp/lFbbrrBawlJRS6rgGFDen2BU1EomDEiSllStUpz44IlT3UgSM4MBAJUSU0SFNlXAEKQqOadwLakUBxugUHnmzLm7q6tLV+9H7a1uqGoS7JlzYoSqEx8qwRT7uuz6ev2EXuuhqurFkDg4xvHqVheKqlEDUFIzJ+dGzgw+RaqUQJfWRoteqkbgc98vAjY+mRtV7jueeR9mtDdVQXAAyanren5cj0VViczJ14vcMHiwUWlf9CJk3Ht1d1fd94skZ3wGoOvMOTNAPK/PPwznfs+5AcAeD1Vr92Vzn5gQUAV4PLUvQLUxYfz1OxWKvH6CtD/GwzgZhF+39jc9f03e/vnPuX+e10/psb//dvt93u/7/ZX7T1TQOB7nCAoVtWhrPaSd9w9//g70x696fgvJvJJXJozn6wdz4lNdgtz3zBtG1T7nPu96XH318Z15ae3eHxV2lbqpAiOonPlStx0UrQe1tB9aF7pgg6Coklq1YjtFZu2uqnjGg0OQAKovY1RVyzEOSL2rNyFnqrrotbfWpp9rP79+/Jn36OPXtZ/nfvn9nvedGTseo1RfUAlVHU9Vr+6qBdVW9X5e31e1z9d9/xi/S7Lfc34mBs985rzP/XUwMlVLyy4orYeDEL3q2gRV0YtkAFUyKuIzc4/vnDcGwKPeFAHEzNzn9hmPkaqvOmQMGdvJqlVm3relWssJyDNJuhphODMAPgmlUre6PV8zX0DmXXGILQB0xs4tT1EUCOKioKvW0qrqtk8JSBzPOfNj5l1aQBiq4pscfOITCFEJSxSAEgfUq6u6q30894sCLeLMQVQXCTa4eytUlVoAAIBUAifBxuneq562VaLiOeAzd+aUlOSMATnxreqZxMf32zP31/u+v0iKgghC2STBALVa3c4QY3DimznxZO7cr5yBAYD3fZ/7xX0AfNgFR6uBq7auTUxMAM+c8/rKedvBMMczoKKglUmClnqrv6svBE5sMiSIeFSttapKqSSJ7bE95zbHDKGk1auqa3fitfcMXbtqZW7iFnNen1//PfOziq4GUFUtqbU+dH1H5PWp7rx+5P2DtfL6kdefzOAwrsdv9f3v6vKf//KP/zrvIe51rf2sj/+jrl/20rx/vH9+ch8imMnpXqxFL2pJwhAjs5au72hRRS2pVQuvnJuiHx/r+b33o1aJ4DhjDJSq1Oqr17Zfr8/f/fknsRhhVIAwGMCiVl8PLABMDEgiNzECQREHsloGO2duMGAPGEDAIOxUSxI0NIgUAhkC2DAAj2/f7PnXf/1v1e7rY86AA4iSzjkeixiHkMzkzJy5z3nN/Q547Oj58f16fFQJD0LYPlJngo3nPq/V5eTMXWs3xtBVFHsjct9gkKpBpaYLTCBQOMn9OT7J2AfDHHvU3XthgCoZanV1dwF4UhKFwZ5S1t5UIcYDJLGnioauhgPnelxCc4ai+7n2N3ver084tar36uoSZexy0/0oxTnm2Deor2fNGY8do6LjuX2/Zw4VlZSGmrnv84U9DBBi4jngEEqokAAMFKFU8RDOuW0jZ97xUIY4Iwkt1Y45EztQBaikDoltU13JnPvLc0Liic/4EE3Gnq5Fr8ms1szr5+fv4S71mXvud87BR5oCPHQEIsJLUpCVYyD3Cw8ysufWklZTO06sVZuqeb1yBgAyEw/mjOlFFbq0HvTVff3+r/98vX6sLqroigwY21NS4MwQiKHoRRUQBwIAFEggVETa17UvpIlLCwqwI6mqux7X9bz2w2d6bSIC6uo95/Z9MKXEg0IMznkhqYq94ptejPP61G7svF6ILsUDTZLcOT/wWd16fq9f/g5kPul6Pn+p9Tj3eX395LyBVlVV1+Z+c3/lvKhFIAZrb60HFDYCAdS+dD30/LU+/qpvf+tvf6mPb3r+8vH9H/34C7WoJZRM1fVc34vM/eP19ef7/sMBC6AqM0UVjV3gMRggzkwSHIACQQxRNVIJ43Nu+y41a1V3PM4Buhvb97Hd3d2rhHMTA1UtERsVYj2u77/85fX55/3H73p8dD+qen08klQVUEWOPfZx5oBXl+cGC8yQoTSq9H48fi3q9fmvc9/JKpBa/YQimczMKZGJY9t5fc68OSFGBeVz59yqDUVQb62mKkOlIHNuBDQYHwDo7v38vtZlKIIDcUGrKKu6d9NQ9BLgmXM8d+7P9/vznHeV1F3rKi6AEHO/f9ra1zeqBJl77mPfVbu68DhJ7hxXCa2lq7SqC+KhPLOWqpZNmSrNGQiRKEjynmOG5ECfGWxhlXKoFI5jitiZd3JoVZfUmZdw9y5WaIBzSGLH8bxn3mK6L61l2z4AYIMW+PP1z9f9045tFaE8pzKOfY4y1+Mh6rwPVKUej4/9/Aas7n09HN/nc+ZULeiKYA53FapHohBIEq1NoArAoMoZgBKLvfdazxDyRgG0HkrPvODkfSPowif3p3q/vn5/vX704ztduEpAiqouqtbaXUVIDjVSa31oPbU3XQAGiiqtTRWYBKmqyFR3qRmq6G5V2RM44/FdvXstRClktPp6/tL7uu/3ue+838hAPn8Gx2+qOG9Y7Cv3i7r0+M68EVqc9+/+8f/6859y6uPv9df/0PUkRS3fL79/QtG1up3P+/OPzA2UCIly35/xS/up6tw/c24oOARYyAgkddMXgEq11B/qD60P9VZvgDlg1NKuErX2t7+t73+9rv3Yv6qagMEFZAYm96dnzE0tBACGGwwFBQUVCFUqIgYAgWr1o/piUfTaz6JUbXCCevU655z7y+9PUme4fcdvykDOfP/t3x6Pxx///b+gHs9fnNBF5BgG8PLqBQfh2EmpoBLmvu3JjOeeeSN6P+a+v378jk1DJyxW7b1bvfYDFCUq/DX5Kk3mlrbSyPQQA7UEAJkbu6rWXrq+tUr9KAqgV60FyJJatapWUQZKq1buISceGe2mVaGUjKE9GK6Pb57xBJXjtbfUZ96Tg6pqk5zXV6RkJyfzVnXtBzFh7Y9aW1lUU1u6JOz7zGdVt+1zbmITqZxz31/xHRxFqe4LQFqlpoCqikLFvj1HEKSqMHFin5NkVKv3x3o8qhcl27hIAVWy7/hW9+rGllNVSEjhnPuFaD2XNtLaXVqrt40oYK2t3lqb46b68T3Vcvf+6F5gG4ayVcuMmUkcSRoqWNUCEIAKyHs8pgQLUKS+ULFaJVL0hRqgK0qRInP/yHmRE9+et6798e23b88ne2GDS6tUALik7gJm3rZxkgEADBQYJmeYwZI2WjnHptSlBpJxbltzJmTu2/fY99q6rocK8DnnnFMUsNaWCrDIDCo8ACpUNtiqZg4JY3/96dc/wwvQ/l6//R+mc7/q8a2+/QpgV2/f79w3Kbqr1rlfAFWTinn/+H3ePwCGvH5kvgCtRybYCFI5N4AKTERITF7Mm9tQqKlKJj7xK/dNpHVpPUipP759//u+nuQGbJ+579x0xYhetUkxppa0YaOFCqCgVFVA1VW9Sj0z7/tNLMHATaxCxsOcuUkgSSSSzBhBUmCTierS2nVdv/z1bz5f949/rufTMceJKVUvVJIQ9qgN8RxJ9pzzVaUqwhhXNah678d3qeGUS3wpbw4zge6SlTNf5/UpdWlhEcCTgSo90CJ4RmujSsBWiSpEFGzkJJhG4PGExF7rOgEsiGAOWt0PtQIY1UJy4RwcaM+U1loX2Oe879f9enlGXWtdtbpKvR/dl1qpbY/96RkkFQgYSKwzr7l/zP0FiK4ukZSoqkKqlTgejFBV02tdFyIJSGpPQN07cOYEC3Lf8cQSrCpwzgGg5tz3GSJUrAIX8UzGYiWcuc/9TiYOCUHIclev/VStKkSrF6FUVJGsawNz7jOjta799Mn7/SotaTn1fn/O/ULqtamq4sybmY5kCihSgqjk+8UgqUq9ttZWb7qgqlbVrmqQJGLuN3NjQ46nMHbeN1rYmfnr3/7H87d/IxDiUUnVCTmc1xGl2r2urosIO3NjEzAECBgPcjylDkZQALZnbhUOY+Mz+TI+9xcGAKm343tu9YKyU9Wo+vmhXiSowcwbH3Q4b62P8/7yj/+0f4Sj/Vt//59rfcNH69nrkddnJnhhdG2th8d6XPXtl8fzl+f3vwbI0NuZ+/35/vyXuJFyvpJRP7QfFJIoyAEjSMAIAExOzjuvz7w+8375fEnS/qjH93U9kR1T0ICJj0/OyXkBq1oUoeqqftR6AGAKBF1arb1VjQqAUNXdTuyiBMaoVjwn5/gIIL7fzKkCQYEQKpaQuhGQtRZjhNaHb0Ot6/r9n/+bolTzfvV1tcoORJY957x9pmpVLUzOAIKZt31WrVptCwCvx+r1iDLmvj9RVGv8hlTwe8659XhoPQ3ESZThHJ8bQMQDQElQJIZhDnbOC6zVABImCTEeQYlVBVRdVNGpUhLKVfR1pSSHHJLeiwAFKFQ1qLp6XRhnkFi7+9Frd3dVyznvn8T7+pDkGWghZ845tEaubkpFFaF61bVZSyqloV0lCRUw75dj+9jUolQxIJVKksrllGOooosCMufOnOQkk0xrPT6+oSIGgVXV6wPWzCkFJZgIuuvx2B/0EkKCVi3sOTdCqyHVq6qrsQ4i8wJTSCMVceYNOPJg26muTTW1KELjKUEpE5vkTaF1UQuKLihiELWqmkzOkCIF0rXptdZWbYAcdd/3O+eHnh/17S8YBOC4VkN74omD1GhRgCAE9VZtdQMA4DNzv8gxnjPrWoGqqi6AUCVgzhtUUNq9rpOcezKDGlTqtS8kQIDReqKmxX2+/vXf97/+WbX8+pG8EMqu56/qXeub+vuZr7w/GZCQUWgRQ6N6ff5Aohpqr4XJeUkCVtfzl1/347uuJ9fS40OPX4HMzVoIABWpjAECBSoorYceDzbkfX/99OdPYurS/kX749oPqvJ+Edv3ZO73z7w+My/7rfLSrv2NWux1fJOT+2ZOzsSTJBlJsEDx8fjcbzK49nquvZObpLurNUzwOQe01qPV2Emq93481vMbQGKPupIzP36f92f3ql4fH7+e19f79aP35XMQolc3KElJpYJqret69nWpGpHYjj22RcOxB7L2R+9LFXHt9WQ12LbHQK2+rqfWQ70dwGDHqFRNFVW9VmbIic2cnNvnBqobOJ6cG6f7ohcUKoNKVW2gqveltTHjuEiArKVOr674PeezaIJnZiZUr7X2pX11dyESzjCemZzBUyE58dCFQISAQCJ77V4fzc4Yz1KVHalASUiqu3t3NRjAzpxKlFRjG5SgpOjqosqcoiB2HPt+ExDxCLq7IlXTixTUGc+cKinu7mpRJVUwklbDVT4z9x0KHXvud68OQ8B2UrWc1Nrn55d9jg+FIqlctqhaBXGElSIJc+be7NayJ0RUP/bk7r1UOxMwMQU2oOoEKLpWXQCgxwMVRmutxzf6UnfOC1yquV9rPQAKeumceACY49fj8c1zly/VgiL43LUJwqAC51irVPE9PErknvu5vtmxp1eXyrfPeZVB1+Pbr3O/17rm3HPe9k0VqHr12nFqle+oBEBhU5XXj4L//M//69/+7f/Tvalrf/sL6ykJ/+H3T1VVAKhBJiJAAWB6Hd/+/b8If/zzf639WHvn/cpMa9Va6/Fb7Lzv+vagLyZ5/RQCckZXEcAAVdg4BCgCKvrCvtbDuXU+VQ+w9uPM7PvtObV9f/28v37Wx5O1sO/7huTbTQHoeuhnYMFgwNjMQQVbckKceOyp3tVCBhGpijn4VJXIfd/vuZ/1UBUgCXDQftDLM+P7fr8z78/3f65antPPxy/f//rrx8/Pn7//9pe/S8q51U0GQkpCfTspobUWF1IpUKq11mWH3FVr/JZgiGOL8loXx3O/F/jcxcJIgkJrrU2Bz9h7LVWBsYnAOS/P0bpAVQtQla5H3z73XVLVZjjnvfhWhaoRHuecADYQDCLxORrnzBTnPabUrSqYWiWR4LmL3b2rUNr58hyf26vDEJjR6u4F4AhRCsFU1TgqEitUTsAEDcnYt1RIFI7nfPm+QUjVRSmOM8mJDUBUKq14IJkTj7QBUMK5b88kOMZGACViTxyBUzTROZMBVRLmzJzxrZxaq1Izr3O/PGMbFeAxiVDMzIDmvpMjLd+u5HjcKyX7Ltqecw6JoGrnHKGUYgtI8AHUnYBNTEwVthBdCJp4cgaIhxmCeqOa9zuZ/fE858775Z8/GGtdaOEynHkrB+RAQkDFXkDOmzkQAIEAoAFg9bVqAyKO54yqgPjYbzt7PcfU2ifTtddagDyOJ3PsuJDkYOe87s8/yQm5/vrv/+N//P/68QEmUAugLq0L3sHVVzKZFxQOHK2FyPtQzpw///m/789/hfvj26/ffvmNGEZdUdEbmPPKCUCgF71xa20wGEEVAMRhDCd+5dxSaz3YK4hjxpyTuRHj99xf4BKZ17mP+oGqquC8fv7u14/MTUwVoGrW0moAOK9XzgAkVd299n5IqAQNOKBWX9Cieq29VkW2QVR5zn1/2UEFK5Hn3O+vOWe3akni/ePPr68/H7/8ypmM03iOSoRzzn3eQGuVQFAtVELrUq3V19p7740LaC3MfT4xlLoX1WAJUg52kJNB0up1LQwxOTlvz43f8StzA4SukkSV1gNVCELU6l2qzNv3j/Hg4+M5M/GqBgBgr2KO7+OZiISUVWhdWo+qrbiqpJUQApCp6L5v+10qgEpi28yoau9foZIB2wNQVK/g8TuxqsapaLDt2CNVAFTVeOyJCUddUsWKh4pwfGaOPS5HAQbbISPo3UgQzyHyTDJikCnopVp2Wvgcx1UXVBXVwBvfnpuM2KqHPUeuWsnYBzkzRE48U1qxW0vkz9//eb8/e7V9I1Y/RDGSruRNvLSqBDo+NN1X0SRCUtFFg0q1qEJFLyioEMD3KO1K7jdTkuKDJxlUUmG0Ps7r/X79/PrxT8ZAcqt77i/8MrnPiwwEjA8cLak33ShSQ0tLvdVL3VCsta+L6J7bfp/5Uqufj70+al12znkXqs3qqr1gKbJyzvH9jl4zL+Lx+P4Bh4Iu1KT0+K61UeED5nxRJT0wSqGFIdF6eE58U2LO/PP/un/8V/Xq6uu3v//2l//Q45fUhYpq+1aQcV5VW3WB0IGDQ4sCFwAlFQAAFKgIAL20P9SPrsoMXVRxn72fvS4oWKiBnBsDSF1rv9///fPn/xufZEqhCMGHQBVVVcInCZAQhVY8574tw6pupGBQqlQfzSoKsIdUVe/9hOQMHLU195z73K+oVfV4fvzlr/94ff5hsvb1+eMHQzASSklrrdoXulCRkIRASmvtS2ooKLokVZXWc63LTKPSRTdd1Utr1WqWIE6YxPd5vwjAWouqUqOFCiAGoqaLbmqRmvsQiKkCI7TWas15obrn9v02pqpEPFaVVgl8QJTsOMRHmVLDGDLTolRA/D6xetMXVYjCUhdV+1rX99KFx+MYGHwmEwghyR0Apqq7usczGZKuQiFz7pfndFfvR+1N1fiMz3iqt6qqixIWASgWFpKIc/bjWevSWrX28Rnf0JmBA2W8r0u1wxzf4VRJQhQh58y5E1c3DRgPqHtXbYh9F6oq57ZPhWtv0OvnnyXUexybaiV/JifJyW04t+2EAKiryrZ9tBZVmeG8AYBAFQAg4DDGIazroQIOlGqxL61GVfspbV3fS/3zz3/N62d04xvoKp/jeVdJMoAETg5zRNMXAACg+J0Mkih8Mu/zfs+cUq3eRJNgqqvWvq4L/L4/oWx37ThJIA9xretSnfuLpNdSXXr8ej3/xkDw64/cNyld31FB5fXmfCWTM4npBag2Yubkz3/Ov/7X+fojsJ6/rn2d95tZ2h+Aemk9pB0KRJxU9YMSdmwMiBgDhYuYBIoq5p25CVBamwIBRQwDEOIXBqNa2tvx8U2LBpPM9fxlX7/M6yWhtbQexLo2vaglNVq1FgUFEmTu+359nTlkSoGDJz4zB5B61aIxLhVifOys1ddekqAKnRCqv30vZ2n3uvr5/ddf//76/Pl4/uIZQLkkej+qVq9Lkn137e4HsSioOSdxdQUCVTXEiaqdCjpjx1JLu6qq19IqqUqloMnr59fXT4C+bHNb3YD6UWuDqaq6YHU1OjRrbSiQuolDqR+9ru7Lc7/njQZK1cmBSqK9tZZVoLWuLnzuMy/Pu1qOZm4VNh7s3K+vM/fau0pO5rznnDkv+66q0mWPx1WdxBPPzPvLc8eoVgogVklr1RJx7DNxBKDqtSQE1QSVqrpoLFX12lVdUlVJi6RABSggEClgbLvQOTPnnHnhEFcvwJ7Vj907fiVH1QBG1Ti1qCUGrNXdazvLNizj9/1yRmqo1+tHkWLt/bye36qqS2Rmpq9vfX3AlIg9vIOFurrwzMRT1VQhnJP3O/cLjA9jAoIGe+53Mggox5k7M55wjAqBKhpKTl4/fndG+wGllrBn5twm3btrEwEANFqSiFBlAkDwW2tXb9/vc39Vp1d3tWhSuR3Pfd/A2teMfUbo9flZJRpJKl3Py/b79nN9rP1BFWrGrAWlXni0G5lVAL0oMlFvcms3xXz9yOsr53Pun7k/mbsf3/r7P+r5l70/zvsLHwC7a6OCagmSZD++6fFEAqk2vQAMXboeVFFFb1WjYpXWxgYA7Myt1dofenwDqOjxQYHU3cRn3sTFBoITSvv6+GtU+NCLFDECQKCltekLFhii7u61e5eEWFqAPZkjcCJKXQZjFYRyQs6MJLqQ7zPnTO1r9ULL0v7+a+bUflBFUCuqXhuVSn3tzLy/fpp7ZlQCAIeqQAJz3tgAAQRSOxkISXznvGYCHB/bVUtVsVFXFVi9sViLbnyoqt6woDI3dmZIUQuBDaJqZny+cl4IravW/vb4da+nVHbkaO2qkl2qCtirV3d3jfIVpmqRsd8m9lC11gVkbuwySwKQHaKxrbVgzIlS3VWLoqqFANRUx7d9ilp2IKsftdoYWOuq3loP3CSSSlVa3c+9HhBEAIhDBpLCDhGWj4KDAUmlxrxfr3JDAzgGycmRsANS9ZAQJHVjMm9yZt4AiOaxH2ste0JCzjmOv37+sCZFVa2+qlClau3e+/rAt7Q8LrH76gICcSjJCQ6x5y611iIgUCGQycEmdgYCUAWg4FNS5hAAIWx8HtezqNoX60LkzJmJbzEFQsHjQ0oUiDIGQUUtYEZzv33/dI6qq7cdsFZX1b4eqoLENzFQqsf1zOAThTjxlMqq+7ye335ZH79VlUAic1MQo1I1q8BgQPvSeqqLBdqkpH6//jh//j++3wl6/qX/8j/r+TfVU+txPT7EZD59PvGhiyqwKPVyTpL4kIEgCCQQgBgZmYRaAFqwtLbWgyqqyMl9o9J6ALFwgalWr7zvmOpOGYokOc4gXdczJF8/MXm9mJP3CwNQpbXVrdqoUNX1qOtCzMwZk9hn5oCqVhjEnDP3zBiiXpJKGg+9qOXk/fXnn//679fPn5ZqXbGVsnk+P+b9EmSMAkvVgBnU5S3xPj/nvEHA+/V1zkjVa9cqe8jxTDxCxR2/w0kONjhzA90LcEqSrl0Cgx0fGrowmLGpJQlBPPeNjR3CKnphwlACFBFW79W79paokoGc8XjOzLtQdwMzd7WAqpY981XgM2CJ7l77IrZNodLej94f67rW+pA2KDQALV29uqjuZ/dSTfze6xKe+SxqUUXVqq61u9be33R9qK7aT/UGqAYhkAwe+z7j4zjYvo9f4wMSqupaJcoYQWK7ijMvewBy5tyVAJFQVW1VB859x0PT3WfePl/FFCea8eHY8TlfhK4WxG+IfdbekQKocfCQAlCSM2OoUlUXCDJjVFVVVYcbVQIRKmpRi5hapBBUUWtfj1obFkYS2iiI8Z3zQqYXdsbr8a3WvvY3rR2P6ABQa6/emTs5quATDwBFQZJzMjfnVFVpQcYHIApo7dhj995rLZ+5Hh+lZburPbc9Yd73yxkgzqp6Pr9R636/z/1GAaQmeN746PqAFQcMBuBKTCC3v/63X3+s9eznb/393/f+TqBBIYeWHt/GvD6/INFoNZCMcwPJ2CfvV3zjwQMHQcI4M8SqTRcYkIqCEpJ6qxcqVJQpYFVtCnrpeiCBVcJdVcDr8+ucc99f535fj1+kzuuTLoBaABhO3q+cAQOkMCQAUKrVu3oDULZ9v2ZelHsvCAgpSVVX1XnfjKX6+vHnH3/+i6JW9/Xo6xlncF+P3h9njidmHKMiJbTWtdeuvnqvtXf1NrantLCTU3uDQNVLsueNxw7TXR+qDkMGG1X3dpwZeqOralEkOefGh0AVXV1FDoX6gVZwNMSlhQ8xkONWq7pWh1GJjMa9LiipEKWiGpWFpRQRM/HpTA+eCVRVHZ95fd33l8eoHANjO6zajaStVSZVhVwCHJIYJxCnutba1DrHi1gSxDntPRNhVKpObgooqOQWjm9wkqpuNPcBipKLUF1a8jFANUalc885r/f75/vr5czfPr6BSrlDBSclwoaFUyoIBgQ6Z1Q+Obs+SOx31S51pakbVGjurzlzPb9TJXuVjeNVGs9dFFrUQXvAGSkgSjmcYyfdhSltVVFL3eDMSFCFFmdUOxohrkWMWq3Mxjn32T6kAR83R9fj7//jf9b3v6ufOTdCXamSnohCBkW9ltxaGwAgjJETq6R6wKw2MdJaD7RUx/MGqLa/Vu++HiGIc879vmduDXjoUlGrtZ6xlVu1oO2X3qO1q4pagGpRhuKYvnN+5058gHr+qsXmU+tJddfChgFy3txfFIFzvx98gyJigl2Uw1XtFLG0ETmvfH2iQoUAQ0HjJIMqMT5JqRKHBJWuzYiBIoxsrQ0QkCCQgpzXz6/fkyFDqvuyqY66faxaWlAwkAFnoEIMYEQApKrt46pV1RL3/Rnd+/FctUq1e90+41uJ7eqmCnpmShtz7jf7eb6+aLYWx1JTmhnu165H9QHsyHOfz5lZ67fuD6TuTFXpQhPunJ1QqiI3AZ87+9G9qCpUhKZUVV3AsYPJSBeszF37WSVsbLRpq4BKooaCoDQCCRNbgJhE80qsLtEkSXctg7pBkjwmklTJ6r36MiMpOYLYHivlc7oAzrmr1L1a23yBpLZDiWapX7FPWB3dPnfVpqJazYf9phqVx0VOoNdDqvht38Hg+CYmBsBxiOMbnCQEkGQ7dq/u/ahuUrW6qn0mMcSe9+vl8dqXfOd+Q4cuyUnymns8R5yqqtXqBQzp+ij2a16esQ/JmZSoEnjVxrFj06tLy/fMOb0/VFdVeXifN+nqb9d6VK1iQUtL1T63jeNSqjqMBEISApXUcLAxzGRubAI5CJUyb2DmpqT1YAqQX9j06t/+vb7/Cmhd59ycXPtb6TmjQ0QvLVSU4ju+4zeSeqOiICYGiKKq3nOGWFq1CgxBhXaSuc99v2vpzFfv69rbvvEps9YjmtULUiohMJzkHYU4uanW9Y2Qefnn7zk/Wase37W+1fd/0+M3PR56PLUvrSYnX4cAznmjShIbkDaSllAZV0AloXqgRYs5BAZVU0BJCw6+MYBqE4AkxKoNcB8oAiLnK+fGICj0/HY9vlExSt5fXz/mPns9r8evwxSoLhpUoqiFFr10PbS2+qHerKJgFUBJahEcpDP3vF9o4fIYQNJeiNyf79ePmc/qAsjUevzy298/nr9e1y86mXmvevR+IHLm8fj4eD6v9UhCnNzvr5+fX39Uraoy2PEcz1SnVta+cM/rJQBAvXftZy+gQzmTOUQUOUM47/vc74xzhtxkMqZa2gQycGCd+0UMEIAzJxnw+A0lAAN0UfU+hzA5J2PP/f5ZoapyfM6BwMRHvSlRq6ptI9QVYZ/khkiNoUjAPrmJAVrdXWxuA1pbCE/8Ouc9MwAFVSfxuYnPfQqgetVWlT1wbM/9ytwACCCGAEDVEspkzjumZFWBMj73cUyQVjxQ8SHn3Hcx135Qdc4nflM4lBSfM19KJm8I2HOYQena3Y+qXXXFsQ2+zxsEdXzf95d6QZG7VoPu++v5+Nj7USWH9/vAfX38IomYortBcUqIO9yObBMoQZKBIsQDRgC0SKC0L2wCamh1V3WVAACVaue+weoHJueLRFUU0qKEVfWAgsDBB0CASML4/przcgaBJx4lkuMDNoZERsCYeb9+znkxU6ourusJsk1MVHQhJ2cyc2eGI9XWemo1fmPy+pH7Z94/8Jte9fHX+virvv+mJYjWRhcW1axFLxQwWqpL3dV15iaCA0kF+c44B7u6qSLO+2fOTZf2pos5ACI2gTGGCBVjAACIo2HBXqhqf9fjIwljtLS/rfV8Pv/S+zFn/HphqnpUM4mHAKUqCBxiMCIZMD7YEMAAhZSWK6ViBtzXpd69n9V97mOneq/n9+fH972/QWMnfjyf3375ZTw//vzvP//4zxx7or5YRSNVrV7rkpI5yaxVaz+kHdoKOvbx+z73MYMCRJ55wQR1Pbt2rav3pvqcOxOtTZWhoEpNai11ZT4pan0Qi2CAeFTVVTSS8n5h9lrqzhkCoLURBLl97GNF9/t9zqsq9gETAMzuEnUmFKC57/vr85yDmjiOqqr32s8ISiXiOfOeORWXqvuiWmXFRJXVW6pzzk0sWSVM7PI5r0+f9/v+WlAMHq/1UNF756SAOIPWBnyOClBCASIeoFp2hTnnYKpX1Tr3u7d7bdvhVK/rsed+vT7/lV4/fv74ha0AsQ0SqSVlqbbOF0XikkJO0v0sBZg5a20CyJ45931/rrVnSILiM2RqV2xT9he+7dNLnrtbxGA4Saoe4QAkc083EBAUtZgDpjaA0NrxLTUsqlCpN1UI9araOdGCXkN6TJwcTgDkqlIpGbTu+bG9SMbvlaIKFRkIkrJRsKo3Da4YYWqpm1AmvUjNeX19/gF6Pj/Wfti5359KZSYEmpSrjqdqge1jOSxW05eqc+Z+/ejt8pvV7C1v7Y8QSiBSzGAx7/iIBtDS8ztzM6aa6mtf9wmIqsSqzZhJqemVGeWQwxhBAcZAwcmBXtRGgRNDFwKgihYHDIFACNEc8iYPYiCp57e/Drbt3PN6GXWoCIkuKEJ8MwcVFFWqzrkBDGpA2s1UVaAQpLpUalZXUAGeO5OSpKa384qglmqT/Pj9//nxr/81M7/9/T/ez2/Sj+q1rib23Kh1le83LKJej4I4JSpxRopW17QmZiDdy5io10PqUksXNKjUtVrXw1aVLFc1SBA7zjmmSMYxVViqplr9ADIz81486MKoOjRAAIAiUj32lWStqhTMqvWinLOWqKZKpXjmffCJNXnDqCyxulXVvTLvw5SoThJISa8M4ChnzKu0bJzBOXpjqkrs+Mt1SgsqOD6P3oWsIp5wqrfYVVu9UQHY2KWSGggBeu1aS1XEokWDVTnnDdaqMNWtAiq+sUGHV4k5Z/w6Xz98juct1V5bKq0LFVUSIGh7SpRw5EjVpQLPvKsoirC6fHI9f3P0+vzR60Gve16r+v31NfdX5h3fIQkVEDYCZ85x3E4oACBzAHzA2hsVgAqKKoqcFxgMJgdAixgghspMfDB5/czXH8TQmROb5JzXKmpVlTCoQMwwgUU3hWqv/Yu6cWipdJx4mMzcM2+fe95v36ern89feu2oodf1jeoz4zklAGLI3k/smT+TUalWg3O/7s8fYtfjm56/av2i/qAXgI3hPhgQlSQABIqgbmrHQWit6/qG5/X1JyqtB1qoUKGAY4PD6PFd60PaRNSmFibnhSAg1JfWJqACiAEoUgzEcHI+c38SoIhJsJNAd3eVzIRTVFUHU6Va6s0UFMeMGecMtnprb2IC5yQGBICQ1NRyTBXx6qoqAIkAQLcKAF6fn18/vjLO/f76+vz99//+53/933/8+Z/n3FQB7/ctqlcjZbBTJeHM+LwzB0a4qtQtSFLrWvubdMUneQNJAIlaW3Wh1dc+Mx5L1b1VopB2qeCoC4wPcebOuW0TyOkuqsYnCZQyyfi8GNtnfMDOZE5fj3XtVKtbpTMnSZUAiSLhvucGq9o+Pu/qZ++L3DMnGFG1pEu9SlXVpYaUrCrQeDy37/cZZ0p0jqk7GhA6cFRK1boelXO6qnupCiFKawGqVjcBmypJgFwYG6p7LVjj8QleMfbEKXXcM7eHM4Pu6oso593a3dfn5+f7/QbmDDmq6rVKih1EJIQjVHDmtl2h1KpykCRV8Ore+/k+t1h7XT9+/H6/X72egft8zTkeHNOVqHTZzhnoxOe84pS0Wt2SRPAYTJy5ochCixgVOBkADM7cyWAzxwFOZgCpUWjUO+dH/JIWYc7YLqX6YQOpKmwS0qQwDMSZL9pA5h0fO3jiuc/rvD/PfJ5zr64SvR/7+eGRkFbV7r03BeWqQlRVVbUqVuzAOT7vO75Zaz+/1bW1Wvuhx4f60t50QXHuzJ28EmNJAkBarVJiZijUQtK6rIoAU6UqApk4vo9UCGwQXfSiF4BNkTn58UfmjQ+IQAAIxNw3NhhgjInDJMeotB94zvmCKqjqXs9dF+leDU4VdnygwJlJBoADRoWdBIGPOr3ahEAcom6hzDn3GwJ4RhISJWpdz2dVA4T7/jpn9nVpXz53+/31+uP9+mNVwO/7lTMAlLp7XSrFdhwBQEipFwBSyb4JaMVj32HOeftMVVUVgASUylC1aj2qth1RNH1dsHK/z/lKhhIyds4hkKIWoVySAAAQTpKcAkSS6g2SVtNYqt5ahFShmoSoaxGf+wVVVVJrXat3qSlUrQgoFYheva61lnPueY/vvT+kOvN55nW/f577Tmxlzj0eCIwYaKCvKqlUXRQsGxOAKqTMUFCVQJXWVVUBlQugq6qrq2TPmQMkUaQMsf0uZKN+q+txfduPj+6euY3DADD2QDmec3tOAIgnxFBqGJOTe8bVj7WeAWdsE2beqveJ5pzqBir1+vn681//+f7819qP6/oeN6poqqoo46rqZRiorosqjLqgwAAUQMwcgAJKa8MCSKQNRVwFBFure+9zDnMA7Q+04hhqtW2q1Bu9JydAFVW04TBvfDxDCQAFsMc33Mns3uvaVY+qRVdQqeIgqZXMOa8qVVepPdBlpsiZVzxdj9WrV63Hh9bWeujxvbphQQFAJgA4idZSb85kJr7xTRdVqZBB1mq4UFettdf1eDIwpsLM3Leqai0ElNQEYuZk3rm/mEN4v36+v37CoSANAlStLiAZMIANhakqlpIhBnJ/vc9PlDOvc3/txwdd9pn7YHcvKGwAWy3tTRUuKEQSjGpTpX0F5n0LUNkn864KKjtQaz+S8dy+BwcfzwkByCytTF5fL9/UBJ9//OP/+4+//wdd2Pd997VEo4ZitVQ5h8nYRgAh9jnn2EDVCpXzOvOCknaVkIkBxzCoCtnTa0Md3/ad8855zf3GxqeqxYZGC8iYMVWoCGfuzMChC59zhrmBqobVa9HlGSdn7snpLvVSV0uiCFJDgXEAtFCRQxUwZ6r3qss5MKW0uqphPn/+7nlXt+dwRgefsWfmNecuQCUUzzk3JfXVuta6Kjn3+fnyZ+ZdAIEBQOoG4nPeX/f9hdBaQrLwnXPsCVRRDSXCOfe5v2zbnvNzztuHUJSsTjxzl7L35XDfb6UoEmRJAYkEG4NQoQIlx47trmaVWt2bijVfP/+s1nn9nPn5y6+/7bUdff38/eef/7Wf+7e//8fav5AQY4k2d85dEmwnJklhxSNQC5a6ycn5hAMQQ0kNhkMW2gBd2o+1L2pDoHTtr6/PnMn7RS3s+LNrdzdQVpUcnddPnxcA4BNMFRKxaqGCCDmHuOvq/ajrKi6HM3Puo9W9n0mqFA+2kGovVlWbwVQtdf/8/PH58789xql1qR+4COqt/YFNwGFuzjvnRqhEb0z8zvnymIQIkFp1QUMBICmthoLCjk3bxkbV6qYXAIMNVjdxchM/vv318dvftDaQ82f8JoeABABU4QG0GgC0tqroAqCajYOlUpFeXeh+fzmmC0EVXVTRT1j4JEMOAIDjN07OJCrhOcfHIcm5b/uGqLd6G87c9js+yACRSlR/3V9//Pjz9R7Wyr6ev/7bx2+/7e+/EAh7P/bjAhKjwp7zdXyAriIAYPtAutB69vqIz/v9875fBKIk4cy87/tz3p+4wDOn1FCZV8zj+kYVw32/4y8CNA2QOdTp3VTRBQB7NRmMaARAt7QCxILMTZj7dfzGYzs2abkGg4dzgKy1d5WqyvE5x7dDE0pSAYLNRBIAXX2VlhIgzOimWaoi3TbxhFAS6bjIW0VGNeee1wvQXnQV8gkJGIidTBfEnjsZc9736wxRnCFjprqLVbUg77lBRDb2nJniUb17P9T1eDyv5y+9nvac+0Yge26YgkrlxAmUoKTuWr2CGkqKj+8juvta9eGhsp7PXz3vVfr4/tt97j///Of767P78cvf/s/Hx3Pyju6D0zW+Ieu6qJYaKIk4vp1RdSZAMr5/YjBhKCudmcwrZwC1qNLa7EtVWhs1Hvry3LnfYO4DRayiRLWqWpQm8WSG4PudiWohIHDmfef+ynkjFVdVp7AdAvRa114SEqoFin3eN2avK57J2ABARft6CK7HFXjfbzzJUGBQ0SvnFd8k8RCTwznJIGVuQKtLFQ8egCoQXUgw5GaJajv45PXJPahrrdWFikCcc+ceKFTJAGBA3axFbYAAoAKgCJzDHHqzVwiYWtSl9dC62Jf27v3Q6v24qtb4ZDJhZpCwiamigINMDlUAFAEfztvvt89NTGLbnlULOBMie0rJHLDnDaDGAWZsmxLweHz7x9//7S9///e//Nu///3f/+Nv//4fj19+BRhTa3WvtV5fP0PUjWzioK61dlVVL9WlXqtXDiChzClY3REoFCHdV4gzSAQE4txv7K52IKXaey0ACpK5sROgKMCMmQEnmZmc2+dNECI4iYoYABPGA9jGkUyOY8eKGEqr9yOU1NfjUZSDkUq92jMzx06vnZJ9nNj0fqy1x4N1HAfSVUu9g+wpqdgkgjln5pW57/e71vWh67GvD/UDSqVeC+JzANGqUmuhHHtObCTUccC1VtVTtap21aq9r70JwL5+fezvXRektPf+Dtp7P/Y31Wbi9/FQupyZ8xrf9jguquCel32ScUzS3c4BS/iMZ6Q+96y11uPj9f7Zq9fjY+b++vN/3/fX91//8u3736R17uMxAiSKNHRRsau7usFgVSEkIbAzQ45ff5IDRRVAkKQSWgAUACBQxcbk3F+ff+R+xbfWVu3MHBsYx3Mgqh4gripVU8STuec+xFQjSQ2QCvGZOPEIQUmVcZjqrqpzbqBqv+9bCgmG4BzV+vj2W/VH9UYi4IOHNoIABmghUGGwiclQpb3pTRU25+DDnMzhfuODB6nrI8799WcSgBKqrYaA42EOOPcnMkFsXQ+q4gGkhgC6HupNICYgWIUgBmODUaECSDDxxO/uUskkxJnAely1GipzKyJkbuaAwfiAkRFUqUQD4IFI2nuXqsTaj2s/QEgiCoZu7PFMqwk5B+aX3/7yt3/849u369v3v/72l39fj+8Yv/5kFT7nPtQCr3Ulg93qkiOfsccg9YYFkpLzdt5UTKQmmYzPHcuDiACJKvVaC4mJUc3c+FAFA2JdVRsbpaqgCBhpIyUDrQI5NjGEjJiqIEJjZu6moUyqBGRuFVtdfVWpuxEZS3vVKjl2VXWtqKhyXKh6BTyx7TmxY2bu4eCpgO73uY9zxqt2xcJIq2t1dW/InLs8rpRQksQxIEACFd2JZgKIqFRVVYuMWmtf1QsQVZKga5NyTlV2S6W1d/XVvRRm5j4eSO7JO+R4zvtz8gLFc+ZdalUnJz5gO+dM1QKVhFTVFvf9nhxBFTZ++/H9r6x1v8+5z+P5/PUvf388HwmeU11VKgOuKqmckBQFtg9dVRde9CIGVO3Xv3x+woUuZIABChUFgA+CWqSI8dFj9+rX1+fX6ytjIlZTFKpaULHVj+pnreX7FU88eb9IVF171WqMB+JwkDurtRhDBDiSYnsmOSFVRRXI5z5juqobgSrO3s+qfT2eaz/pRWAm92BjoACIuqGguJ4MGCgkVWtt7QfVUHEg1KI3JYKu/e3b9+tx6bF1PVCrNpJtAIgHlfamoAvAkh7gzB0nc2PnHiKoJHAAUgAyhtifn7lfzBsKCiAuRK8EUCCZVV29bJMB0wtbvekLKhNkcgACsaqqyp6Qqu69Vb2vq7u19n58Z211G3WtqzemqnDse87PnBeRxPV8fvz6j4/vf6vV+M0c9YO+Pn/8UatRVW0Mxp7YdhyXvNZGZd+esR2Ifc47Sq+FABUApaCREBCkJlVSFVEF7fXQfgCA9kPrqipUdAPIWg1gQyT12gIEUjJSEAl44tMVfEqBs0orNcmcGyoJIhkrMCXTEWPbnswAVFcB4LD6yDNvclZ3qZMgEeyhptryFFNV1at7a7UzAWMzcUFVU3MODhk4ntszxgCBRN3VK7aDaqm3qgqqAUBn5j4njnOPD7YDiX3u8w5TZWdUlbj3VVVkZr6qGxbOmZsxKqSqVmG/b4+qo9jjM4A9CLRtkUFWoWY9Hp671d9++Yedn3/+eD5++/btbxbOwZ4zrhAgYR1IUipVQ845ntuOc15f/+3P/8q8/PpJjFR1aW0ElLqpQouYOfgkISYAqMihej2/n3P79pybChQhcZUoGdlvlNaCBYZB0t5Ul5Z6gXO+MlaaVDqR1aVaM/eJVTVzMufMEULY9/iEFHhmrSZ2fL8/z/0eu6qqhA+EKs479wsOwHnjE4eYWC0EVeQwk5gBFb2pRaCKbgBDinPO3NLCIAhQaiFlxueoGkr7m9Y3gBwIQqvBzBsfYjjkxiZGBQagSNGV+3XuzwAxgWqVSKmW0JxTqaY9iQfsMfeoNxJdsAjY5KBChQ2QFYACIL0WavWu/dG9UVG1eoPi9PXstSc2mfM+57X2Ugln7+v7b3//9W//5y+//Vt30aWP73o85l//+eOPf377278Bxzcl7BwjGM77PRn1KokZn9uBCFXRUlet1UvYZwjVhSBIBSYh7dH7dfA4U1V0Y6o3tUCAqlUbFYCKIgxqaqmkblL22B4HqfpKAFMr5OS2D8IEAw2MPUkJ4qKhjs/7/jw+pY1dVfbMfUpUN1BGlBMnkNj2AF2ruMLCqvXsamDmdc7bWCRQmFIkNWvtNWCnx8TVmHemCKAkoF5XVVGVGVCtgoodp6m6LvD9/vIc8ShhyYk9oPu840UcnUf/FQY5Bud+/X71Rz8eHmyHI8bzLvaSbrxqu2qFQvdMiqvuAGatyzM2qzj32Pdqfv75dd5//OVv/0bv9+ef5GOOX58/fvvLXwHLKIXtcVwlUKkms2Huz/P5v+6fvj7+XtpVD/WHalOFADIvCop4kpEawJBgk3e8RO19IeIz98CBpWrboQDIzNn9S6+tdWUOPtobmpwEUdpdHKkQKKBabRvhM/aBEJfqfb9Mefz6+nxcH716XYvxmdkJpkhk1Od9Zr4g+/GNvgCAmAx0HHxybmJkABs7Z1RJbnxLoYrAHBQSDO1k7vtee7VPDnpscEGpfU4BQA4ZaOaE0rqoBdYqgDG9UIWhrH1RG150AQAU/3+C8DZLtyw7ruam+9rniZtZAEjq84/UCPW/RRqSXpJAVeaNOHu5y2w4X7+k01162W1K02y3nrn7Js1m9/2qz/nwHM4vgAAh4RyFdkmh8sNA0rukUABKgwWlASQBbNpN1jbWxPGEQafN83nm64/z6x/6fOV//R/3v/71/PpH9v6v/9//9+uPf9ef/57/+f89MiO2zfocP2uUdO8V2SwqWXjUJNGlKMHetCnlsUecxs22QSCdGdjc3wH2hZuF/cGTpl3uApT+vPr60jPUcJJORzPyoXgMByx7X8aIOfNks/uqWOM58rEN3uzR3DN330Fpd1MdDsnrQu59JU0SV+cMHhLbEGiaYOyZz85lv02PuF1TAxtYPx/PI82cryN7ylbU46dYON22R4VwxogCyMkiGfBzugE1LyNb9qPzKEVQ20pX8sxJfuxPumGPZub5id/37/D1zJMUNvsmPVPaQEMSS8wTbqmi5mdX9oESoElaa+bn++d//6//nzyfP/7x830/86vlr3/9z+/f/4U080Ef+/ucY9uaN98qc46g7xX99esf2Z/2na8/9PyJjzxgAEKDDjaJNPTI7pguhphcds98BCgwVGTbSmNp97J7fv06eiBQukHDAQB7KAD6cIY0N55ikxsLQbP33ntnlg325/Prvj8Nss753P4QQJj5+nqer6VdN0MXDb1wkHsXCaAXWZ6+lwWDloZcAAUCFeq+vJehP39x/tD5oM179/15/mF8dAzZ3Hd/T5/Omf0hYo4cBAIA0GEuOtyLrTlNcACyAIX9QUHW+YPS799ykZsXAjfl5ntm7s/f+/N785KG68+/aR42uBg2NBTmKHQDagsXpBmS3FfJeX5hyN30tKgUJA3jL89JYolnzIGhaCxNgcJ7f37//df//j9+/3xvrpn/5//j/6Xz3O+/oBDA55GV/m2f9KaXMho/8/7IFt7tD3vmKG02tityN0HzRYOgF7AHAUoXU4oN7fujzx/WdCM16fSrKjYNCcOcB8D4zFhNIbLRab7TCGCeM+7c/CAKaMyBu5kCsv2Ql4b2nPM8H2Dzc4sRzq+xZ/auBTascLPAGOwqsnjfrVAsybPvG8ujvDFoxvMxeJPuhey+EOPe2ywITEEAyPhIFkI0lZ7s/vz8fd/vtOfzYT7I2d77AtY03PvbM0QWz/Mgz4zl8qme83x85t4783n8hZTc7LUM3F4LCsU0jW2b7Ea3fTeF/eOPf2z3vn9//frz+fza9+f59XXfn7//+c+vr3/3TFoHkCr5RBBakoIQQP346z+ef/u/+o//kz5/aB5sgAKANQ83kLZAE5o0YJ2vdpuX85mZ3W8QGij7Nnf3bRYdMVCg994b2xgEcxgjoCogMABtF1sUsN1ukhZ7ZsZnUravNZLBPg/izPF5WgmZmfOFDgCgAPo8Og9zSADGyPgAfS82PlA4mkc+PF+U/PyTAG6+CZpPSXaZ468/8QHSwuoZzaCiEJB1/tTnD/lA6KVoHj1fhN7Ipqall1g2PrQ03MuNbBAyBLl3k4wMnHOkIZnnOefoDDJ76QLdAigkADKYhgKQCGzbBoPbtEC7WwzWPMbdBUFTPI9abGZC7nu7P71vtu/+/P7Xf/7X//o/zlh//lt30z2fLzCy52mhWLIAznMQezf7vu/fCeOP3fZt3jNznseMBEBzHukcbFhrCjDP88c5j54P8znnILVtkQ+a5tJUAyEAsnS+sMEzg6aURIBo13Zy777bPZ9z5mgMoamqYvzeO+TMKUYkSdYMpWg0X58/BsiivbmkQMBiZmxkJJmRxzOlRYqUwm5/Qu/7vX1pXYxMHNL73W4RVDh3e1/2kmBjaADJpTTttq9UJK6I9i4Jtu0zj885ny/5Ybx5S8FnPud5EBjPZ98k14rPwGEG3BaESLAeKDr2wNy7UgxAe+/7s9v785755I3Rn//4NyjW3vuv//zP779//uN//N++fv3ZN0CgMhVJMUwiPx/OI595/n3+/L/617/Tw4Zc9goBTaHdxZBwL1wEQTrIDHdfSZqn2/fnOy0GCykl9Dxfc04BCR/Ztsn25zf3ktv7NtsuuRCMZ2xrRlLJfb/v+4I+n0+qe1Oc5Myc57nvz/fvv85zZgxJGJ3dt+8F4KaiwCGQABQKgYbSDbm9C+CDQAJIen/I6jyQ/PwnsnwYc37NPN/vZdMs97abxJ6Zj+Q2+vrSOUAJQIADh6T3hZDQdAMGUSgwyLT09n6T4A8MXTDNvr+TK00b6L2vztc5RzJvaBja8EYVAhu5LUADIEj3XklCAlgIgS5Flo6A7Pu+fyc/3e+8YdXb759/kotHxS1b7OMR8+vXP54Z+QFzXyqdX4D0hE2DDEZzZmghd3/f/cFkA0327r37e/fW8piN8qN+3/eHCIyUvXdf2/jIH+lLlnR0/pC0+yMkj30opt23fRmA7isJooLVFrBHmhSK0Zm5e5tNtsQFVdJoxqPRdpsrsB77IN+f77vv8zznOfM88iAnPcZ+EDAgz9iG2X0RCCTpK0lRokA37T3P15wHeO+PAdw5HySD5XuT3rtve3t/QwAwgYItqRvCZgtnPvaEtiGhsef59TXnM8/X5/Pr83wKku79yV5JSSjp/vz81WxyBbbtkZ1y5tiTvU6STd5mZ4410GBpnJONj979Qf7+/pfgfP0B/vn9/a///J+///qf6D1fc7s69gwsDRS6/ZcHkNbmw/yp5x86XzRwSdpFgAgAEgSBDXTLBhAgsLmh6PN5Pp/7vvYAgOaxh6yoJTabt3mbkCZJ8/78s+9390ojnVogbDzQ7vfd7yQytj1P6twXWZKgxFL2ZgtuA9iSJLsSnsRjI8mjeQCS7pJg40MCCyDr/NJ5eH9rRs/Tbu/b+80c/+P/pM+fQDcwOp/n8zl6uJdtd6mMfR4KIJu4pHnphXBAATgfHePDMTKBXmhbCA0YHQLjsjQIDLn9+UY5ZwDhfffmZzzyg5W8bPBBQDiHMYKGgo2NIAA6IxvYBAGWrXOq3J/fpMB7f973TZLUtkwVn4c5pE2FgPdf/+vu+/XHH//4b//96/P1PB+abjyHhrTt7ndzCQA0SRsz1nPO1+gxto4tdpWmb99NeH/++v75z79+/39+fv8nF5I0gIp9ZoYZ5pRiEbDO14MPkAQMgDUPuFmStt12IQght8V+nk/lemY+Zx4Y6PjUQLM327bP87EpOc+Zc5K2V5ZF7pv3R0S1mKNjfbUyY6iNNDw2MjOPILtyx8KSTCwd9TFSovMUDGRBrqyZ9r37++Y9RwJw7+bnN/uDgkBuqSUbsC1IFhCGCMailpS9HoOs5zwf1O/7O401z+fX5+vP7C3a3Pu+SYBkLZAsNXn35313359NsGQHdr83P3LP8ejc+wL3/jxf8zyfv//653/9z//39/dfof/4j/9x5pO76eLYk2x6bSmTLQIbRQqFDQsDNllKE0ASNTEFHT1fOgOmACTIQO/bvV9//MMauiBCWbogUAnDaEA6Zz7PnK85f5iByIMPeoShZOlNXjbDDOfr1z/O1x+JbD+fc45kZW8DzN33+fzaZc4HGVIQtjVnbFNQgbYQZJ0HGx8AW+dhPpLIZYMOmIYgP5DuN1ifPzUiv+nScs7n1weZsZ4PEOhWGgo6+AAAQLYbGoTGUAwFgSD0+2/uD6Rd9pIABCF62R/a3sWeOUAamTnPmY9FSuPku32lAZofBA0NWBIJQEKD8Xmwd5cGAJCRad/33Z8lyb3C1PZTmUbkPL/kAw1BpD+/f//Ln/njH//xfP3hOV//+Hf9+uL+5L7YIPIj0DkI6DlP2k3ChYsKzb7JpXPOM+djjQQw8+X5ej7/DgNBpgWRNHcwhfvNvT4GiEAQ7DmHcVP24gOQe/eHvhAdU+yDzAgwlm1J9vggpNiioRJaNkRh5gjvLmCru8mLADOT5u7PJoyiLa/mYIDk7v4kNOy+sH7ELlh0+5uJCPju/tzb3WMfVI+6r+fT3OSaIJPs3bE33004Rz7qoJHRq1CyP++PJfmwbNZNiGVbktr8vH/vu+NJSnP4UhUJ68xXfZKcHjAkxRJysjTzPPYooUYEsMYPjZS9L42Z0aM53f7x55/N/c//4//7/vz823/77/P1P858Ie37c85kN3fTKk0KAzaukOl9RdAXMklZEDKGhJi+cGHgQMAokPZqgwLt99+77znPrz///W4AWppk5zzSvO/fz9cfPh/Po/MFtAuezx/Nagabe/f+jALSyD6NPKd0v6911Foz59P3B9JyzjPnk+TrM3M+WDRESXN/op6Z5/MHQLdZssyH0ryaL83TfZmjsZ4n//UvFcbY3UtDAPT5k/uS1fl0Hu4SaJ7nz/fnLxSdB4tst0nAouwLlozVhQ4NCQcWEL30EiNjeMEgA90XB0PTXUbZnecP+tJ2m6Rc+Mx8/frHf/zzr7+yr/izCd3ui6Gl4Q02Mjp0abBpkIEmnmeeA0jT3N7l6/z644/N7WJbNpJs++z9ed/XE1S82b1zgV+//n2ONPZf/8RIpul9QzTTzft+mzM+PQ+QAHjcNrUleUp2f+wvMfA7oUWE0efzH+8P7/7VrgIYwEo3zYO63xTrwWDPPBAAmVxUnQdBAp4Z9NAA2DTk0kKqetTI1lZtpedmPy2i6bi219U8M+fuj4Q9JfbYj84R0O3+WCQXaZ7P3k0kBITA2hrNRYrje6ziDYZCUfsRQ26JoYDkZH9//53FfrqbdM7Z/Oz9gezdvdsWdXdLw9sGdfenXUuEvTv2nIe27fvz5u54IMla5zxfaGx05nweP3PftyvpgGk9gmb37k0CWHgODI051FGNEyGiPWc8FnqeX3/99ffvv/75H//9//Tv/+3//Pn8mnNkk2xITHBVEgIXOnJvu0FGZi8KDRudLwoJAcB0b3/+7v3ubt9vZMi+t/e7ee/9ZnP++FNfX9ulhTKhsX2eD0DlcfYtRRAQKHDkB2B/uq8kJBCZMrv37tv27iZ3HiV735tS+Hl/J3ue55yjMwhrqG+57+/5jOV91zZAQUYgM4e73Nt9aSAkpADPQYZIAtgf9ooHnua79yXQ9H7DOfPs/WmWETIgoOIcje77sj9YbWngImPoLcHqfUkAMIHnAOyl0QiCzBw9j3zsQ+ne77/+mdxznt5LIx+6HXQQjA6oeeF2F2gWAmAQADaIhkSyZ0KhwGaz2xvksZLNtsRDc7Ov7WSz6X1JsUuT2NqUWj6qbHe3u7YRFNKkpecMis3z9fE50SabVrLnjB+7m597X2PLpbLSnfnzj3/8d81AkDy21fbebxEKc5ABiufTdn++aWiSbZcNgI7mSxo25NIgQbq322oIFDGqFacBi6Eq2V3gnEdVU1rMnCM9YHvA+97cbQrA1I90TGywzvnyjECVj895PGfGVcrYHzi2Pdg9Hpg5H7McH3t6OwSSVB4J8o498wFQ5hlEd+++9/1mK3nOkefmQj2Tu/tzk4Ww2eTMeAbZnvP1MJOEaBgdPKf3FbF97733GtvHfrLb3WZTWzqSPdbcfXu/m6QX5v15dU6bGfP5/PVf/9Psf/yP/8uvf/y7z+e9727ks/3xGSTQUttzDkZHPgMWpHSXgI9msAEwpv0GVOf7h/ujGWT25q//VV15/Mf/+PWP/9P2m/no6x92aXq/20XHfoCqUGkYAe1WP3TZkAtpFqHnMEf+yKcUmM/HBrBnHiOnCrEyfs48m1cgHXuyP8jyV9jsW8b+khXaFlsjVAqAH2R6EYzZ9L0cQwkQLGR8GGF0Hvnp/tDV+UN+IM33cz7qUCPjYYRM0hal+02NALpLgwyQkCK3i4DQC0DaF8z8ooeNPABB5+DqzNcf/2bLfs754FJ+//5r398O4Y2hF4JOCISmu/QCmkElAUiAZpv1iqTdvO/P97/+/tf/vt8/QUB2HUmGNNu8lmY+ANRSk9wQxEhTGgY/3M37bU2zNIBksns3WT1HmrzrDsne39mbpNns+/78BZnn2GN9RJuf8qZFBzLCsjGSBWfwQNBljATofLkkL0I2e7vLHPiB7f69+9f2QholSwFsAemtWG0p2Ggpx7Ih2dv25/356+//fH/+CTzPH1j3/U0XKJznQ7l9ZYy2FwvqFsimFejuhhcLJvtULuDBxwIT0fbeGKjIbnKT0oaAd/feuykSkjQIIF0au0DTbsBHT7YpHifJfaWPnq/HBoEDSbuhMWRvsvYx03op3exP9r27TQGQZgo2KZFodThfs5zdQMA/P+/M+bk/M+7291//+ce//ePz+bds7vff+/NbokStMOBjEMHznDMlN2/2lY45zU+zyMgkjGUBYJJSf770fBHI9udf3z//tfev3m99/pxf//2+L/sD/Md/+79+/ePf+v23Kp2v8TG2EjWNOUIsbLsXgmGs8+h8aT5GtEjP55dty/Zj2YILN8/5nOej8yB5PpJ/vv8GnfN1ni9Eu0a22zKeGWs0ZiEwB5kGAqADZsMYIz9ECDb9uSxgQu9bwnzUYQ5HTZCYI/r9+1/8/IihMqLb/W6CRaFQkMFsaPr9sgE0j/QA0jAHYA4AgcgPMvD+/v33v/73/vyFBhkfGPvR+Wq1+Z194QRATVtYwKNpq+fR84XofQEkCm2zQOnm7l4A+77f++Z9f/7653/lXVIDtA2Sz6QBRCCgZ+bYqLfXLibvD93nc5r33t8CMFhl9733liTb3PSFag5nWqCeKWQRI5z27k/23fd30nSTwkW0XQk0cjS7S5e99/c3G7A82Pr6h88fnF/z/MEcPQ97+77dm71Fng8FAN0NBESxRsiYFtDMzIAkeY4kIPsD1/aZz8xY7O7dSy77A2VkjaDvVZtN2nuTNM2mku1pLJ2ZP895FFufM59k9y6RPZB9/zakpVTw7tvezxxIsknktKFst3dJFLkGJ3v35ta2bYRdDff9acsI6nOSTV5SSy3JlgAEaQANJPeuZHuSd3Mp88w5Yz/Jlnfzfe9LKmQ/IWpsjd6vD72/u/vz938a/eO//d/9zPf3v77/+s8ZSbzvb9ubFxXhOpskudmfH7a0tIy7S8LeZpsF2mV/aBB6Rs8HHwBJ5+vr89+f8+/ff/9X7191PQ9zEPrzvz1//jc23SJus3mlJ3uNZfe93Nt7pcFGQUB7F1k+NLRtSto0u900JSHn8xkfI+m0pQBnzn3fZFFlHVue8aiAkNpwDnNYaCBw+74UciHtS9O7tDTdBbCxMRQCEucB9fs3Rl9fOl/A+/PP3t/NpQXsAduPOPIXuRRkeZhDID/ktkGDDWYOPgCx5qGQi0BGnufYyr0ACU3b2hQBLHYlArfdHzE09Acf+YFDwQa6L5imSaENYGmbtuRiff356+uPf3x+PbIl0moOdSp5rAMNgLvZvRC76ZWFuYln5gzNvSmQkMi1sA8ckH3MSVU4Ps/zyCMLSOV5zueXfSQhNMeaghkKtYA0VFH33p/fvd+MNUMAMQYQmpGHu72Xpluw5vE55zySkTXHPrYhaRCgtKUa0d33bQrsLqlkSeMxep4/wRoff2YGT+D75++f901qJFuj3ahYsgqA7dmsskLVeT5f3TbXNPu+339lv3dfWLq9e9qmi4vtd4AkoPN8JIjo7l5ZGiGrmwRi4TNnniABgmpw+qZP75WPAABsWQKyK+SZlx0Mp1t5aFr7AIAww8c6QP0KAQj77L5ANg1Hgvn8+sfP+61z3vd9ns/Xrz/uvu99v379++frs/sNFYZF2mKA3J8fPZZ4ns+cT/utjefB7n6DMSRwuy+ku9md+ci01XmYX/6Fjf/+q9//xAcD+M//1u/v8luxrAJtMWCByF3ZM1LNfIDmlQEwEERTmn1/5jw6Q8J77YPSFDv7s/f6IUmJrTmz952j3st5sM45adLt+/PMpwm59AEAMLE8ABhBoSGXBkIXgkJDIKW/yUGDA+h50MjnPF8AHrhoomhUIj/zfGFjw1I4R+cU8AEAWAhAlgSMgaM5JTQQGp/z9cd/ZF8IFia/7/HJ/kiC/vr6M79/yqIC7W3wDwA+vD88oCNNCQBoRnV3JUk6zyMN4cw5X1+a2Z/fsptFY45HpIBGaHwMkHvf78OTNrkQ5GN7DIBt49FM7q0Klmzr8OWORjMPiQXnI59uZMZKVEjWcyQUjU+ySGCCpfAmGyMxQIKxgOBCAICEAmgOHA0wbJrFlwJIKjzPA3RfzhcNJPe1TCktJQCSKgjVsR77JNl3Q/Cc53Oe5/3+bcko9yIkCyQnVNC1kCwTUkJrD5ZwCNRToWO6L3zhsTT2JEn4fP64yb2vZSAUAKQz+qrd3U0A2+DRwZhig4Agz0OTLFRgzzkHSDa5NBYg5JlTCx2ZAkq6wPM8Fvf+wCIa2Z9nvuwnuwGPnuePz/OPZbcr/Wo+5/nS+ZrPV8rP77++Pn98/fpvXX7/67/sp1sWVQMeIattMzOIcos2wZAXH81I0/v2vgBY8xT688OGvswBum/fZpO//osNCxsYnUc+DN0FzzOF7KbZ+9PWFiNketmrCgDJA0AQyQrkgQOmTW420lBYBORKjCcJYmbO52sTaSwDAnuSt6nw/rzdFwUFWc8ffI5sMEEa5uDDGeaDnu7bu5De2++/+/N39yKxhQuXLB7s5+uXzocIQGpDA9EIbnfJBQCAsT5f2OylAYAm7KUB0MEHDkCAAO1KwgZxs/tu3t3vNNL5fP15ng8CXAz1HDAKuu3CAQAwGBtotiJNxcyDxE0aGGqANIAIt41HyABdNhQKuLukCvfnpz/fd9ca+dH4nDMzvSswU9h7NTpn0lCqyEJKCgWSJAsSCk3CbktberM/2IyLUmFXWFMbm6UVAAHLBoORseTBIMBgZHBbZDCtz0MQaosoNfKc1PIgg0k3bZvU9Hy+ANs+z2aB5/yyH0paW4ze2/d9AcQcqwBpAcJ9rzBw7/V88KSyP2c++EEKlVzZ2JbtOedIGg8i3SZd0kA9o8+RvNzVhYJASfZtkCwgRVmLZjHAvXnfe+91A00uVHNaLM0ZazAA3JnxjI1YaPvz3r/SBXtGemC2O3N8rPPIxzrPM9BsfTya8/z5+69/ntHX19f2/ec//xfoeb4k3X3f/ZGKsPU8z/EANJSi8UHGyIMPGAKA0dF5zucju7u0gOYhob997K9/9Oc7+03S77/7/cN84UOCbU533/v7zLElCcw292UDYY7OF6F3KcjquDTJfcndfduSZl+5AMBhe+99k33f77TY4GEYy2fmkQ8FhhLSKTbjdumFsEHFYOMDaKRz5COJwL3cQDHNSxdEgg1iyxECLQZAMgI0h03fRQdBIZe93KADRgfTFAyWjU0uQEMWAwZ6SwK0lQYgAdIN8cj+nPmCSp7nMacUjc4D0EDYy/60L7mSgN63jUqy930p0HKzmxbZNiCWbjdNspv3bQqiJcFGCpsGo6o3937PedrtvcnSQJo0tQwAu0t535ddkns3e7MwYxtsT+Izz3Oe8zzPrz8107YpNk0qY4MLxRr5YY4/fzCH9/YuLQbTvN23WYAGwZheKBQZGwmgyIcGUFqPdSxJAmPdkiwpApRsAVvSOU/aTa1HiCQkqSXLyabsdrO2LMEF3vc7yfBUscfFNfJWe2923Wx+a2RKiVByi8/55XkgdiWyFz+22aU1cgGSm0pzytLNfW2dmaIUeXpvu3d/3t9/vz///Pvn790XKYlmxoa977eskuSCbJtqBn9S2QPOBpOlDaw9JWzvzz/Tv0nO80fJ5u973/v3X9Cb3+O523/+83/n569ff/z5vt/VdIXalmCNz9GcNmmRocg6j/Sh6b7dF0whkdQuQfOlEZi9fb8RzJHFfNi9G57T/YarY9noQGBloHAsqbvvm/sjgoyPzgMAkG4JmICOgb1/qxfb89z7997FZfp+X5YzD3Vh76u8uT+yKRJlkiSrMwiDe0goFET3bbcUBdL3b/b2fftzS6pF0NJgEKT9+eHnN1jzB9vuN9jna2MAg7AtCVMWmzkQdAFo85IAGIACkEDR4RxIv//V/SYXQgOgo3lkAZqHMczoWIcKcvcbYQRYpEAoXdjs+1d//gUA9LaLka20ahdK+gKoKZJ0nr1d3u5SbMSogpJC00vCJnelOeccgaRHTX0OQH7SbNr7Csrd/U5eGvD48TyaU2JhW2OFM5/zfASWBG1uFwGIx/Nhf0hIpJgmmyyGOdjSYLfJ/rSl6X25lzZ7ySWgA0BAYBpyAQSkXHIpBaSwae1jGwrXMii5qMLNJmnf3WVXu0IR6ZLSVVfizCOZzfbubu4SSp+vf5ee3d9k976ADQQpusDe9/78tBiakmT3xficYcgp875/tWtP0yQktmkB+1hkL+Lem409KAA4QR022R+45O7339+/f9tn9BAQycVAW3KRRn6kX/ChHo/nodhyRVfCz2AIQrYR0DMf7JkzPv587t7sZeb9+f75+79+/fmPve/P+7dUWXDASEASqHSAuz/jD6YUaFeSNJpBxm6XGxCGOcjdMvCIBlvPwTPzgSPE8zTpvXoeaeA0aZTcu/e9L6o9eh4oAgAAbAxyu8nrGT8f+1OQVhbMvT/351+5obS992eTz/OnPTd53x/GQPaivfcHVr3Jgn0OvdwfBA0swF7en37/TW/vm5+f7g8CjEAgqPBBlVXd3r+7b7tYIGxp+/svKGlQIzbIkshlLwuBCgqhYX/Y0NufbwgAIJPQ9H7357tbxjoPAEgmIFOApubgU7i7qgK5wR4PtPsNAHM+zAHkwabLvc3iilqyrZSE1EKERJJjms0LzBl5PAdIAQHsRcC4A95ttp7z+fpTn6+2FoLkRmmZGWv23vd+1zs20m5IUoDd9+5P2RaE3Gyl2X1/fv++71/pD4CtI0SSZpNNAbi3ecmloWgGW+dL84R6DtAsDblNAGR5CAQwZX9+usGWUJtdVJLsD0QzsRDdTUVFbOvMMzM+x88n3bZ+HlBKS7JtoT42p5BucdGyVXff+950kfEBuxw9W927BAfDZv9W85mvM89ugXk+z/k1/nXml1FBEjNIHANJoFAimDm/6GTbrh0byXffsD50FyA/NOf5NHvvj5iZT+nM43MoAKKk6mb3xpbV3Z/kzowxFxkEWExo82P0eT4jW7Z1zkf2X//1v5/neb7+/P3332dcApDAyAO1LdlzZo4IQGEBIN1i2tUMNoBp6ftCkAFkNAAIkMc2uX2/+89/9vtfEBDB6t697wU8M+eZ58PzoaYAvW/vS0uiI5S8P+cMLUXn3N1sMZYR3QLnnLHazBzbz/N8//57ZnQeIHcHn3Nse87MUYVMkr3c27sgBHt7FwqGJJdc9koibF7Geo5mwPgAvd/9+S82bLjfvd/787YLodACAE3fl3vxBx9EuxAwpS0JQOnd5mV/c3/Aer6k0QwAhiBjEJwDpp758vMVgYbWVIiARzaCtu9Ltnfh4EPBpu69uy9p0vu+zTVgIQOGvbd9PWNPGpv5fMAY5CIAYGBsD5A2u5C2c54///EfyIrAovN5BOACAACUZGlIAzRuhfbu+/2NapFg2x5hmexPCQCxDunmBuzhFkDk/U0DNOkuPxcZGxADh0DTdG+QRZqWRQDNplkAmrQiabv7tiGrBAsdzXOegylKcvf1WDLinEeIKNRI8xkdSltAnnMea2Dv/pX9GY/mky6QqFHTFPtDgQFlv82cmZPspkKGAlTyr3/77+eP/8Bz5rGH0locgJIsgLCBwKbb9jmf5/n4eaRp2qAz2La/f//93rdpk9199937fd9vjM9DSa7ANqjp3b27ksEg68wc2bKT7q7RNmTvfTc5c9x4vHe///6ff/zx73fV9PgjpsnmB5YCss/MeAwIoSBLagsH0lYeZEkAtkxzexcuueRS0IH2hjnb27yMu9/9/TdjaPNu7r03iUX2TdqWhARKQ8OGLG13u4uCBTQv0nm+PCdpyTMfMTODnKzAM7tJOs/n8/nV9wcA7l7b8hTh43NokigAkgD2AhhouxhJBICxrO6S4EFGprDo/AGn33/35+82d0Ml/yJAaGnlkQcbGwIHIYvnA9DI4jmaR89DLnu7C+YcAjHnoxG5AIK2CffSi40k+TwfJVDLBaiIJPkA0FIaNpIQBH2+dB7L2NKBASIKNNgp46E0qxnqauZ8ME0AbENSANtySrrpbbab8zzzfFEDiNose1eFcPcClOzm7r4/ntqDXGnO5+v5x9Fz7/ftCsnKLunxI8++b7PoEDaR7ZltktLQ5AYZeTwkzUuhFUJgM0YgfARGSJIfBLI8X1//ds5pwbZlWxJGlJRyQt6f3UoG5jFhs21oAEuEpubBR55L2ya575usNUD3FRkNmpnH8yWlvM0La7lddYUwP/uXqWHolG0D4GLSSKLWDI/0HPnQIwSMxya52aW3fdNre84jf9rTrO0zx/MlP0jS+GhGPofS1snRmJdcizTZ23t3F5gZyTAwae69AOp93+xCAVDK7qbdXexbgLvvmed8zs/9/fn62C5NtpsUBLRt7dBlhUsh3ZdEEkUWQNOWhICQRS4YlQ1BGoBc4Nj9/otcgCwFAgE+n6/POe/PT7MWsmiaCyJGpkFGYqMZ+QFvcvODsVwytusGjapqfPeW/fr69evf/pHyzHNzQQCe7m0CEgIAWkkYoC1AAwZTd8vWEg2EwDzn6xeADAuL0PlizP1hrD/+wd6heh5GMAAANIssDYH3B8GaPtJBAfABEPr6pV9/8PzS5w9sGky1NARkDF2K7Obt++o8c5x79/1J3t2bLmdqBEgUgmQf6/NwYAymoTDWHGyfz8xJA5KmtFlEKUnSJMhdsmnSFmITgIApAAoqMoCRBhvRrDXn+SA0lmdmzpkUSAvSzU3WNlb2Zq88OseaXKjlSZK2w9cf/5CPNIhlAbDAts+AKTyDTSkFgO53359CuxBJGJq2krIvMg4CGRkfSomgvSmkpKnwUKQHAVcoBQTYlmwfRFV7nvPMZ5J7v3+rGxbWY9tpk4ZRfkmnebs/KuJJLhQmJYA0jxHjL8NNFq0gtEaVO4H7801/EE2zi+VjGeh2Qem+7/futT0+VAlJkq0qI48QHWDm19f5AxmJOZJnvuY883zkBwlAwrbwyHOE6AKWkpvdTS1sY4N0nm4BezBQY6H35/vz9afFff+5zaaQNC0WNHc3jXyMBbKEmpdeSlsAH+bgo4qWLCmCOTrDeRBA2+4ikKUBUTQP55EPLSJlPs/5/LJMAVEBzYJ0HjAFCWAOpUE+4DOHDVDJls6HGdu5ASzLM8+hnecAxpoHkIwHRPEYaMCj8xSTsC8JCCKJOT4HTW3GYIo+R88Hm27vhYIgEH394X/8N/n0502uRhBywUjt0nTfsoyZA5cJbr9/U5ApYEo3+GhEwoaCkAU0S4NMRUqn90VFLvzcnze77+/9+fn+/g1tUy4yss4XPviAgX7/3Z9vAgCGykYWnfGcjzRtE9IEKAK11qTd+717JSW579usPc2SpD0eWeDz/DrP1/HoPBp1LwBizvhJNkUSDbIsBjyeB2QZKKk7z3M+X3bLttx7311QwpkvBEQNcOZIUkkCAPbIo5kKGoCG3N4AJBRkhOy2AkzvUtjbfWl2bxsKIbkYKC0AwZrnfM6v0r3v+/O9u0lI29733bvIfj72gGmym67FWBAaBJTRblpu3nu/ge4mG0iapaa6BPcxDZCkbdOkLcm6pXQX2RozjCFNznmsgTnzNWNpYNCZM82FhAuAYSqEn/noTFDTthovrcU89mekZCFnBh9kVZS29lhGRkczcuzH/iBsRiM7mGCM61FTt+c5u81NuiVJsXweadLAiiUJxVSgkR50dB6dR34IYARjPGQRSDS9y15qaeAVhzmQBj1fYH394X/8B55uKGOxqZYHvLsvDSOfLwYcbOYgAZIaSHtfdaVDkXR8mp7znGewfab33vtjT+i9PyOSPL/+DQC6aVQUcvc2kYMWHz8fIHnf33/RAgidYT76/OE5CKDvd7+/e7e7vZe9VNi9l1qff0PT7M/P33vv2KCmEGgBFaHzMAcbjOj7r/78zQYAIN0lQJrSABBqdFBQaMDYjLAgaNDpZe/fhvve0Rl/CSRKwSgMEFpk7HYRGBJ5kJFo5KccI9okkqnGbi+AFRatPEIUEloCiKS7cAla29JxSyii2+Ymi0fni1GyAvvYAqBqPj7CSWit0Tyg7nt/fig3u/tznnlmYGjIu/c3iSziFMkFkubt+83Su32/KQANAtNeeYDsUlPo0Tzy6X0RmPbn7oWMMc5uCACklwRY+ua7myKPDUXSOeeXTfYCWMluVmDLj7EcJFN1t7seyWOP1WeeOb8Q2yupWtgqkK5zYxvJ1KAk916CKluaBsmDTUDW8xDaCFFJyON5nufPc75yt7mCsS2PjiQ0pLaf5zPnc3chFrJ2r12AAoDssUkrJGnD3YtkCzdpSBuhomzHIx9AI8+kue/vJGkJ2Xqe933tOecBuR0w7kIik+a+P9Dxh5pKfuQHIOExgoSCDCltAUtDoJALUJBI6K3QebDbpdvvbwq2JHnskY+ZkFAQNpggCQPFtC2bXJJucy+FQpDGczYR8jnIxvZIPnNy9/PrTzTdFxNuWmPlwgJpaMkF4xF4Dk2zTUkgmmE+QL//vu/fze7PX/v9X33/7v1O3r5/0QtgyEI/X1/2wFBkQS1JotJ5GFOQwXB6X3q7L4RCQMYQKNgQEggNNUm3FAAK3J+XAsxzzkx2bzKfX3/8+3+YEcDIo88XS7OkJPLjz5/IAIZCzYIMtK2FsNwWUQgxyIcin8/Xr3memZFlW2dgAAAaFqgPue/3379/flPLapsGoNDaLmRvGsvd292RJUOBggph7/v99z/3/pgm20aebO7m7ubnshnbBpIsEMINaVhs7NwXAABEoC2NDKT7Y8GAkAaseTSf8zxYyBJtbdnGFooARuOW3uQVteuxRjPjeUCigGWVzYbIthzYm90mW2E8M/IAFfN8bLXC58yX7TnDGGibpNRAdqGWaSxkF9lsdu9tbrMkJMLyJLtZWhrZktsLuXerJvEcCtnzPDMfbMASKNnu62JOs3t/0so+MzAA2dy1MRDuXktnMO298oBKCKUybttQpdi2wNgz8wDCFIJkIL1hWwyWbVtHfjwP0Gy7EAoJAqDhXvYCQgAYAa7aLpHmYS9BAJDL/en7Q34wyC3WnPNYZz6/nvMxQ2hekr5v94eElpS9ahBFBWhy083ee9/sHQ+ld0V8Zs7HesA/78+c8/P9FykJ7QxAawGJdCgABI04gqaALIDQXe4PG3JnrBl7ZMiliPb9u/vCJe1eNpoH+/7+iy4WUhJpwCQsFMk61kjPH8zB0GCwJdGQ0HBv7zbb+9KQ0GiEjSEBUshyf1druffHNsRQliAbAOMjP8wHAKjB3e2+vS8FiWy57QVAHtvYNgZqYcmPQgJSASgFLGseIBSQbU228zgJCf7M8wXQ25/fNCBLLbZtA0AarPEZT6mALtgzJM1CbaRaaYIL276bJEkrSR4DDTO5SyKPDARZGkpBCAKQJFtC0m0pucTgRNDkbi7dJODjQSaFAKCk3b27d1eIlgbAQHMXY0FyOmcenznPx6N40yYJBR3N4JS9mzdjQTWP53N8RrGVOKRZN5fWmjSbu/fNbklgztFR9qXb/WnevW+zkoB27773fu/etklRpUHubnZhwLbQeJ7n8wspCQhZ0L2wRgk/7wWBZEGSDWnXOumktVolSTdNAEJ2k1j2jG3APkBoALzZ7AJpJM2cmeneDckmb/bNz28obveb3nZRel82NJS2ABEtANF55JFEg0DQYChsiHuXGzCFJKmghezmZ3MBbCJAzwPCMAcGLI91QBJhmysMpRdVNjOaQU4rhJ2s5+y9d3+idl9E9u77IpXRjADAxtYMPj5HzyM/+OCjM4zbt13mo/mC0fP4+UPzhZxb6WEve/t+s9uf77zf0CAKmDqtbAqA0BgJINL50tc/dL7QYUMAkSAQnCOPJGQAgw0AAIA9NlL3vb//tsZ0BLnNz2ZrSLK/2csYAWlfNgAAoYGLg0wLQNtA997NhW6SXCi0CQJ29yakFCwggEaDgd1rxJzz9W8jf//9l+aj56Hbu7RNJRdJpty9kj3TNrtVKSTJ3Szo69efeCTZx3o8Z/Ojsa3db7JJ7EEuxk4CAQzYFCEIBBtQF5kYwLadtPfdXBoaCF1A/rIPBYS0zU1UWyJJLi2lhRLsMzJpi4TbQqlIrMECHZ+ZSTHQejweKNTP2IOQbR8f21PILWnLzLE+Re7GHlu2x05TykJoasaQpJSS++69YEoawLJtcBpKU7p3f7J39+fum9YiDSUJoCpJekHWQd1da0DEuSW11a5sj+EmC6J1oJt8y5YfhGcKaWzfe3/el9Tq7o/n7L3qK2NZxTNQn7GF0tzsZm/z0moegNzeF4LAJpEETre5JN0F2iIjA4yR0ZkZAMNuszxH56Hs3pu7+94uN0JY4AItBVt+CIyxwT7HMy1msGBxfYYWQGqimfG0Ibv3BVyeeboX2N3shUtRhZteGhIA0DPMhzkYAqEpQs+jGX2+dB4AHwBZHmwwTbfsT9/f7M/+/Izn8/mDggWx1F0IGIME0CLJj3zQwWasM3goCDAyc9DRDHPw4RxkGpa2wDwHee+LSPuvv/7r77//669//uff//pnbrrd+3Z/ehcC0RmdBwPAhSKQARRE91KAboQolPEcf8DNJm9zgX0vMPPIBwYM6VayGUuek8J8nvPc73/1/kYHRudwPrIYARIgy22EJKncewuysS2nQZ7zeB7bBYo9Z748zzl/SB8CBkpj1A0betsLINkHyP50F2wNgC0PMowkGqg8iLbQEoBqzqPP4zlqoAAIH2RGPscawmhyN+9tVqVJ001QbvfuDy0B0dQSFpI9GCCQXcxzfs35A53Rabb7plSPrHM+liy7XQDkSrIFROqxaEnQIQjLQk7TvmkAANQGallSs0mSeNQ2WctpLADL6VbbRhijkecYo0AwAo0glkt+fn7Tpb0bMZvc/WnfNp6RZ84xMkgxHEk2cHef56PkfX+XYpcCbYqsoafIaOahAaODTEwA2FCwMcgYVBRIdynUYAgbbM6J0vwQNktebAyyZiQoRx/pc+aXJPJ6jAas+cIHoJckuQDjFPD4Adm2RzYeaunMPAAUlsZwk/vzw0JDAKUvQHh//rn5aQKQbV8MNg3AGAMhwEEGuoslidJ9OWc+HwwAdBcu5/hz3vuzeZvtzw+wURIwQKHFA6LBYFNogLawnIOgQWAzRiaQSEOhgaUhkQ3MzPP1S/LXn38+z+e9P3//9b/ptmV/upcum+z2lgSd7pLQEtECQNn3/d28SkslW+MxM/JpELLUFGS7vSBrKNm376tRSNiUOg7knuc0t3//i3LOQ6QzbQSy7AFst03SUkqSLAkIZIkWoVEhu+/3vygu3beIMQ6yJdlnPM8pzb5pSJAqI6siAappl9zmpbe9tvU8CmAkaZBttQUKpLIsGyFB6U2bFWVm0rQxeCQrAABtNwlbCMQFsKR55tFMgjjAahHG9hTA3UqTSDO2996WOQdx5KmaXox8qLPx0AaBj3QMUOzzPLkkawPYptsKDAAFhAUgOvPxDN1gJDS2waOzkGxToefriNqAfIwmqIhy/CCj94w8p8hZ+9CfUFeAAJj5hN3v1/ro69d9v8OCe7/TxbIHLiCadvTBp6hgPQhyAQADNK8Kc9gwHp7dOxxsQBVA01wa+Q/5I6m7+jonf3AMsKEZkNMYYE5pqWhbNd1Xmm7JBUNIGUgQGqORgWmCB4Awpt1yxr337msp5L7v8zz0hJJmV/O2lzjZ65/nOdTkwJGhlwQuBkAANGwgEITOl+Zpr+aB2y42DTp6vqboG3C//4teff1fnhE0vS78wEFzgGZpud/0IiPTdIFQsMkFKDQQcnqrAxjULHrlkYfzdN/zkT8fW/f7+3/+f/8/ed/sz8+ez4zfb2jebzN513/8m6QCMjINQCtknQvJzxhwW2vYe9+ftjMfz/h5QqDWQNt4AFC6CwBAK03A+PA4+61bP79omhWnhF6QPW3b4JJNg0Fsc4hcyff+CMzUlmi3paIVKoBs21Z27/tGlsbzWC9AqgaQRvOAm5XEOfwswTUyNQKgapfWDFAqnabWbBcE26b7Hmo5rQ2lws/j82F/aASSRnqex4wwvcris3vFtljnzJPzgI5OSzbtC1c+AQmyMu212m5SgT1HGs+ZeeyRxnaSNNLROcxotL3drahJY9keIEnSdNNIhlLA1D7nzCMZGQXW4nw+zSY/Se5uCoCQBQIaKJRSYSzbCSmoErZ9HmAsFfMUUOznbjdpOfOZ8+luqmCDZAxJSigYy2OPZTMGAGQMoHmYAxDAOoPcFFka9m2LoDctctsmQuwCPB/OoaCSS5YMkP2hkSWJ56MZcjHYshDY2DqG9q6hLYj5MEdzxoOgoRc6Zyzfe3++f99eVNt+DLDXY+Pmos75POdLur3fNAA+jPEBaEi4l70AG2TNwy4YHSQAQB89/9Dzh84f+vzS+SV9PF8+j+bRPIBHbX6+/+L+6Dw6D9AE0Ljv7+4LRgA03AvQAACld8EI9ocCMMfnoxkwNlga6H3f9/fvNM8ZjZ/nj3M+0imAGtqFAoyxaSEIAIkCso2Ue3ffkuxCZKC0SUiMUyVBeAyyTUVDATNOaNBMmr6R+P39t2xscjkf2dlQZAGQbJFnjj1JGWNo2tou7E3vTeL58oyN59A2S0neFPbe+zZhjH0bGsSyvS8EApdeDA2A/v8E4d2abteWnNe9EX3MzAXs2kVKenzg+783H/hHEskCFvKbo0e4Naql6W6yzVIwZFEhJRS6bTzMfAGaQY4YzzxHtitZBZK8C63avVDPY83MsU8riqx7N8nMIDYBLMuCze7en/t+AMHzHNuh8sz5wkIxotQa+0u4TbJJbMsG4OZeS3RphQHAPlQpCBDQxh7blJTcStIYiTqRfCRjW6YYxr5JtoBHM4MF2POc4/lCm1xL9gElAWVXtm2BRwAtDTUa+/E8ZAnP9zd1k3ZnHvvYxga2N1khbAp7AQgYjKx58IEAFAQquRAovRjIzAOWB1IlwF49o/OLQqBeahsrCamatiTNZY481GBkCARAYLKb+4HQkFA0B0+7+/nZz49BPufr++vrV1rAx/ZBBCKwwKD9fJBLk7+7PwC57G1ebGRsEgI2GABTAJ3BBjNH51se+UvPN4GkBAEGM1+aJ2Vmvr6/g5HRA0Ug2kWGYAAENmNkzQEAhM4gyE3e3n8g0uCDvpABctvdve8/v3//9T8/P39Dbfs8z9ef83z5fOMH0VbnQcbGBwkAANqmtqzSbva9PxAkGCyLdgERq+dYMkABeR7OwxiwZUzuzz9/5Z+/jyxZ51tJ7wcfErgSfh4kUUhaYZB8wLYovWkLJNBBbcruzNgHag1IFt1uaEA+I4k5+BAgbZSRHnQ4py0SgSa55DYL0chnIOklCUZHMwAEeTwyIYA08tlkWcnCWMIjWdy87/uhQQayr22Ps2m2MJozR7jtve/m4gFyt0lz837yfnJfoLbwo1+JFgQKbnrvm27IZqHpnjNC0N7tfWUpAlumCwC0yKDRPOexvdl73yQkdDdvettLF3HOlzU0rquBtVTSbpJ7997uxoB1fOwvjwUUhC3ZY6FSNRTCYsre+6Z7bKuSPPZ8hfU5NJJBHqPSGFkaDWWzpM0CABhMQwOwQYZ0Szs2dreM9TwkePCX5gHIFfZ5CGD5yA86jCVXAJ4Ha1O2bEgACrntQqEkgDTyhMw5AATRLIVA2rtGe7d9NeOZr+cr2fv5B5n50rgFjT0UGbSjL/dX92X/YW/flw0BQOYczpEEARB9P31/M5KHGoDbLGpZ+nZf7md//7XvbwwSlHLmMdO8EHQBCvfDZ+WHQC4BmQJGboIMkAA0bf18MyLpviR6Hkj3bRczz/nj++vf//m///rjP9LCTV6M5uh86evxjJ+jrz/RQdZ5wARaAEC0RUJFhSZBRRpPgWJR+HxeIs80CyAqdB55kt577767P/f9fX//de9994c5379+3fcfuM2yoUjOvbvr8Zkv2WI8x3Ps8SCcqtgVLC0EAwHSgGdO73aXbjbMgDSWHs1jG6DJvdgIEknWtO19DcASJGQheYzJCoDeve8FKNLAtEkjCWRPclvSsFcEuJvcSwrjGRCQkghbHkpSoCDsGbLGSOlCQ9pA7KYLKvbz9Xw/7Pa22JIAmu52k8gyIEu0tNA0CajdZKHpTVbClqwWwJpsoFEgFnS7r8Cy1XSBKmJz994ryZCWkg1QSxIIoJHGfuxDBd292cj2jDzBwQkt4NAUjbPF5/18bM/51YQCUJDtEU4lyR4AAABkAAymgQDdQpBkA+TlhhoAARjkvm9TzWnefn76+QcuEhicTbP2BDSWDWAxBsrS0LLb90OL3OJ5gH0/BEAzzSf3H4TOlCa7d7sXOn7AWajkkbCPZdp0bSF5/tT8mbi5beXBxmaOzqPzLQsZAUAg9/NP76d3yQUAgCI/6JDbu7KlRaHb+6GUIttP79t84BJ6t/fFR883GAKgkEs+9ELA2ACyPGBC75JQaMBgEu6+n5/3/uh8P7/+7TkJUAiALT/y6HwjENjImgcbAACE5JkzzzMzWH7Oeb4wYJD0wKQU2goklSbZe8HoYNK3+zl95jwB+/T99PObr193L3tpcl/q3hRaihjTeiyNLeD4kQFMGSiAJCBtcin2aAYoUJqwsaQCQuf76xeYUC7c5vb96ftCAQoILI78BTSpioIkQm/2Z/cDpdnc7gIEyTTPsYta2tDkZhcAaEIJstGE+PjMSCT7fv7++fxFXlmWxSQrOM8vz4yf8/ySB49NIaRJ847s437JvW/3bVbVjOwihaYbrVQBRXb33vcDCySb3nI9qqctAPjYM7ZT5JOWugUKmjl49HzhuXuz73MeW0K2LY1GDDISze6nu+JaLmzeFttNIDSWBneLZOu+vz8/v4EkHmumG8kQAJBI0hZhyTaoCS0ApdEIAWAzBwAo4LYQUPaSUFPIBWgQntEZ9vb+zj//q3ch5JZsP3ZAe2/vYoMpbLpLgVCjA2aLJPuMkleUJvfSJNhHc+bruwgYG2G53SZnhoo3TcCS22bfvbcVKm5niiHM0XmwkUHIyBgKTe8yX2d+8Qnd7g9cnT80X92Xhi4afX37z3/p65vCXlLabGiFNEPo+2J0Rsc6hzkIgF4KTu/LXgo2Psj44APG1ohzOGoWWTOURIqR7n3b9XnkB7SfDw2idzWHOQANG/ZCNINEQ9v3bSI90lMwxzxzHnSQbaOkseZ5HrltsEloCuylmFGh2a7mgfroP/749/37b2nO+Xr/+RvAQlvVR3Me62SDUrZaITTYQraCqfEgGHu+Rt8AchQQA6DzzDmMALpQks1CaM55mCOP5sEWkoQMIBsBNElVtQa3BXm+j89u0uzdezepRhJts50OAskWpsIWThqjqoV0DUCyubv73vf3vX9vfzZ730uSvC32yEeeOc/MgUhDN7vZC8bz889fn3/+cjdAS2kQI6uk2fQutBSpye6HhtqyLVtUVCRyockmoSTMPHItSQOAkCEIwnZLge3dIkCkrUAlpMHonM7c/SSfdmVhwmLKWlaxsfM8z8xJyP0tk31H/Pr1r7///v9CfL7RJnRlAZTGBC3v7gcWnCy5bTWDICGh0YiGvd1Q63k8B0DQIoORdR4w84t4f3725wegQARNoJprApDQpZDAJUsKAXQOAxaiKRhotySJNcgUEtkILM25N6lgOWZaXiD9YBh7Hp2v8UDwOeckSwIXQgN0Q2mWBWgXQOj55nwxJulney95Ac4XKVmdp58fNswXPsyEfPZ3KBp8kPHBcL7QIQFoSCgQMHKzJOTSICMQOgLahVARJEEQc555/pjzx35+v7//+vr1x/f3H+c8ae796ftDIwAABLm9CwDU3aXx9y+d2YaGyrYGbBx6AWrL0NyVRudQsM95zhxsIGxosG1SI80XzzlfJz+/n19/oIOfyp6vmQFLQs1+kg3bjefYItS2ZyzgjEGbyMYAFMuaoRaM5swRQopEb9/f//zzF8CcXXgBtdX59vPdFoIEIDWLPDPNkkWkARDz9cy4cbb22AAliJtdl1aK7PGv8bP3ve8nLKatALj3032T3Pa+L8gc9ZCkqbn7g0g22+NfMEEJe7dgUzo62/3n7/+r//zYf/zx/es/0Em33IQUqD1JKb0tK0secFKQ52vmyzO2200WsGWcxnZ7uwuCAnff+/7OvrQ0I+aM7ed8fZ0vn8HYBtqWlNp+5tsyuK0kYmDOkWmK8FjSvZ9zxh75sR+QrPv5NNL4sx8QAA1JQivJRZTACAZZuF32JdAANBQwcPcjSedBpmlK05QGgehdCXkKn88/ZTEUAMi9e98W8YCatLe9CGxGWAAF2Gzvi/AcM/KAC5YR3XffDzZguXA/n92XRWANW2j2CtIFwRjfeynY8pk5mqf3JVBoAMZCAICMDQAo3E9zdR6GZjUjH+ZpQopMLR0EsMnR8RydB1nnaEYzmsE0oaCj82i+dL7Ql/zofGNTKAANe5vKjzwEZJ3B9C602cJ9359//nqe7//4138fT2vN3PfdvYzBAEBCI4kAyKMZbESpWISfsW2GGpLcvS/U55QCsgAkoaSoGADCZjxobAH6/nPOL86X7NyVR2h8QIA9wP18aAGthNuwCwlNWyoBFhoElEoA2bctSUO6SQpnzui0RbYK6Hk0xdY85CKMJFEoAF0AmxbAwgbuLruSkDzn+f7yYNRGlSTJmLZNdi/FlowlSQShJsYWxraMrDnnMQefGduS/TXfyM2me/tuf9q13b2ktLKQRTwPthFAUvuYcbdZy1T2NJFLkGbmCw0IStlUuKkqEAjk8XgoSdDI4xG4Id2kDSD5wQLgaI7N0TnPkWgiIZOb5kqSz5wvYWr7mNOMfRBp8Pz8/Jad7PjM+WWYedIV/PHn/74/P80SoB7ZQNomBWi0lY0qqU1zm7e7FDAAQSlNQ4LdFoVEovcDgKVJaV4/D1SW/CC6+34+gKhUu1IAgniQicFgEAKQnE3vbRJLtqzRMAagckkAgtJyAZthbGET7vtCm9qeGSgULIkZMb2reZiDgEAozWIjS5IFNB9y2y3B1vnW+aYmwaJpPsg6D5S9NDD2g4wh6QYgbsq9QgC5TZvQkY2NDzIyGAAobJDB2ADQLTIezaDs3j/+/Le+/9gNIHHOGRAmUBMjMMwB2u1uswRKd0VtWjeyDjI2OmKQm979NJWmIRsAQWkA40N07+fnn7/e+wNCopWP+mievZcWll5UNABCHvsIF9Lc95Nm39fb8czzXTnZkjYUREi7YBrYV2/2pQWSVAH09XhOd3vfJhzjgw/i3ReMD0Dv7gcuCSCPNIRuZLDaUmY8PvIBcjdtUwEESR7b6n4+v9PFUABa2R7DLPGMbEueM89jO03yUdYzAAxk7z9wZ4C1z3hsz3xVG873n//b168/jYyAQAUwM1/2sec8vwrJ+jxJ9n5oKGmSJZtNadWkACgtYHs8zbZFJ80MYIhMWRIje7BAyBFA27AlklDbFbUAsKqaTa4s201gbeeufWAs2eAgZg69M+eZc9/X+NhISEASqG1JnVbt3vYC8jAGAAAbAD/nkQVQ2mK3Rdz76f1BYOeWhnOkIz9oyFJAgCT7BAlBaSFQbDEEPDS57/hrztNtkpkHOfdCere7VGIQTe5ePGIgmDfvfT/YzEimAKUAdDwAID0BGmRkMIWEhIYG6H37/tCLhK3n23MAKjQIjgEaNhAACQEkuw0NSe9LIaUBaKsiui+69DZvcyEIZACBredBR+dBYMujeQAaSZqH+cpum/n61d33/Uk+yeVqzmMbgkEB4wMAAL3sBRAgogSgIdnywZHUlgaWlrJpwTKVdPBslgK8n5/P54ciPPPNuG2hWc6x7XHbtmg0R3PkM2c8mufM15fPA5Mscos82EZIGtMCAnbFnDPYtLwXCBwPae7KQ7AkiZKEvRBJwBxjNMJGBw01jaS2qJh2DYA1gCyEZWRkAEFr1KZFcqApIYtiYO+n2Wx3F7h3uxcJHXzA0lhjT1pLAlHw6Ks1wUIaaPKSDvJ5rOf0fVvs0iVDK9meyvKZmewPRDRFAsuWBNXmtQWyAHnkniRpRo8P0skWbZr3vTTn6xcSyHJ1ZUDWeEaWIhgQrWBTKYDk7hZWYJqCJAs3uXc9j84ha/ve4tU8n99/597n+w/PiZWUJClgO0k2BTBtW88jHmRp2kWhJnQXHVzbPIcgSVIpggKlgYgFOOeP//7/0Hk4w1bzzBmQ5iGCtAU0LuCRhwagoSltV/PtL1GQkOS2QHfvGYOayD7PkXTmkSdlt7sfsnq+NunGY7Vt5Qcpud6jLzxCUMgFA2xIKN0XTIsOAIZD1Hv1BBYgCwFI9v62zaT3QpSlkWiTn5u9z5nqSx4CI1pyJYGxJYN6oQFIcJABjonBEGT2AjQtbDXnvp/PP3/9+uO/2RcWSBo085DQwO2Lvr/BAIYFxADtLkVWIxkraYcvoPm9/aTbLr1Qm2ST91i0VrKFQNpK01KEzn3f8/lYxkHoPBEGBQqiud1kb4vHQqqer+d912cImz17ZaZDCjTZXT/fcKUjiQSExnMartKKBjs1RZYamu5KAgAIoDMYaukBV1Wzd8dBJDsaAJGuOmnskZANWOYuARb7+fp6nu+01ngsSN+7r+dLJm+T3L3n65dlj2TLhlPUgoqzTZrRI4HP3eJg2bLVvPRB+H5+Pv/8TgQnTZJCQAIBkg7y7kJLUcGlFUCyULB0rAEkLG0inaa7/9z3za4lClSeEM0wae7eDzAzyJgZy0MoYHbv7gVmBhAVop2ZFCJpbPsYce/7PL/Ayh4pve/9kb+e88s2Hmksw2R375u9QsMQNAYAaQCAAiGXG/alpRAYa6Z3JbEg63yRkHQ/BFn69ae+/oQikqVY9nxtPuSmtxIaYXlo2gUQHHumDYBGIveFIoOBcw60ubuRBGTvZpu2PM+ZeQillgLFhc0tBWTR28+LhA0BsAFI7+/uq/Po+1vnS1/fmkczsjDZ9r5taNr0hk3zqqLpLgbA9phWkPuWBRA0JLQQMJiGQoulM8gQDEDTlISCQUYA2Ng6ozM63+c5nsm+yAT7PN9/zDOy8UFGxlDYy14wwAwaZM1oJNu2ZGR58BATIDYAGMmyjCB77/1JFkMu4PP164//eL7/mDMFQLLOIw3J8ZwZa4Tosp/7/rzvP9L4HNmVkre7OiNZY6O927Slls6ZM/axW/bmdoNtGwDefvb9TQvQ0G0XuRoSepsFb7Zt2+5SklSLaADEgAm2kXYLdO9mu8muJPmwoZEPkLQVetBYogLSi7CAEiBQetMLJG0i7JE8NMmCR7ZdAUB9joVw60awLn4eP9+/vn79yz4AwhZQ2l1aKEIzPpaCYgmakF2LsIBMu8kmF7CP1WyStdRAsQ3OXRp7JM/5hvZeG4oqYQQgO1IZWfKhFIBGxhLQ7AeDjTgz2Pf9eb7/fJ5faW5LZDmGKV2Ez0ggbM8ZidK2UKC7FGyAhtC2LaJdCjKEBhkZjIREjYyRRAPIB5m85LYXgQZmV7sqgkCRKQCYLntJoJ5HHppSIbaNJNku3fvKtiwpSXLv/Slpb6msUiFJ0NzN3eRttkkbZGqApLvsJZek94Os5w98AAQyepABYJ5H55GMkAQg70aSvr7BEAzQhIrCkW0ITfPSMIbBRgAIJKBdBIUCkNBAaMDIYGzOAVPAjM/5fr7+PN+/dJ7P+ya1hoYWwNZ8yw+ADjoQbII0BEqTstCmrUEIWOrxl/Q0WHPONwas8/jMeb6RQRSCbKy9Pz+f/7rvbwDAZg41AYxdpbntitpji9JW2DqhvaVLI0qbJF1i68s+Y8tHmt6lYo5nHGONhyAJ6Psi6XzTCgAEDXh8dB5J3Q/NPOgMjSppPEdSAE1zNxc5kFxJ2UtLL+Q2lREIILDJvR9Ue5JNwJ75Os/YA8VqFXL3QiwBEoIkFtKRZYOaVip2W9oQArSp2xag9hETFWGMoEFu2nttz/NNrTophV7Q8Xdoc5NNFlyMJZ/dC2t/z3lU7uez3Xt/eteolA5Bx9LkCmSLtFk84zkaP19+vjTKrgQyIAqQJN192wDG3TDy2Pb7+ee+P3DHo1zjY6W7DS1y6faSdC+gShY2MgBgJGmk84hDBQYD0qMRBskSBMM5kfr+UJq374e6aReAti1cTROyF6C07b7kRTCmwwoBIJApkLZA24Z5Hnmy2buAsGWluZ8myc19iYWgpqYWEPtYD1RnxEMD6ZYEQMM5AO+lAJoDZo0fPd/YAELnYQ6qvr+kfPZFX/r6RkYGmkoHLFRKoUEgqFEobEgANN2QAMxBIGMDBDAgTNLPD/diADZQzfOcbzDjbvbzkQ20BUjaxSAD2MgISPcDkECUtoXufSmEvrd3CZLnHGvo3vezvXUl6RwAGR9A1ufnr7//5//v9//9f+77z97d9weMzBgHgihFSDPnj5lJkr7dVZNeLLu0pIAEwvY5YxuwZH3L4zOa0XxHg+VkZM/YRgBJAFQENrbmkcdzWLqbXUgxCxAKYDBWVaR5zgDnPPbUnHNoaJhjDpIs2uxLfro/ZLP37bVlD8EzKQV7rBEySzd3bQGb3f00myQtS7PNzgyIBFRhOYAYy82FpQ3VjBk8nhFuQ67SpqQASPbYtu0jeWaMAODeV4BUVmABvfs7u8un+xfkfd97P/fzu3e7/0gZf4HmHKSmCCHVQkiKBhvPnJlBm8Y20PZ4aM/zHfi8nznPOYZ8ne++b/Zn72fUJLAAFYEq2exS0kWiBjdF0ACcgw8+zMEgMGRpgHbbRchPS3fZsLQmt9n+8zt//5/dV56SvS80+UgcnzMPGNJ82H8gIPyAkXQeoFmAhgYbtmy77YIAmjkz8yATdGazu93PNqWZeZDP13dRUrJMOADttkul5w99PcwXPvp6pCG3KkChYDCMkdABw4Pd96UB2r337f2h0Xzr/AIhoUAaZgah+Zb/xIcsBcDu54e97QvBBijIAAXA0NA0F3I/v/Pzv0jQAUiZ4zn3/Zvk/PrTXweCXAHBAGAIveylcC8JWQwzOt/6+qPt3Z0553yRbQKAkEpv3s2VGM7oC07fSznPgwzsz2ff25bmvp+fn//6+7/+589//S96Ed19f35oJcsHWZpAkWiS7A0/sAAysMHnzNe3NUAb6LbpUgAkyEDY24TODA06Ok8MgJ19e1+Sdpu3uxCS8YMPgAELtdu9hCS3t73ZS2M/9pFHtjybSj6VAKnJ3nf3H6jmKy3aef4889ipli5g25p5vvx8n/Nlk6yFbJ3xedpm3/QmJNsUNt1khTBt6QpcsI9lUdlojIhrMcqmhYKGAMhqAekMZW+oUtKNFkfe3k03JdvmpemmvAbse39yX/Dn3XJl0KC0u0E6aNrXtiRh2t0CCBACg5Dm+frOxnPG3z+//373mgmJ9nNv7iYvxh6YpG0QsuhNYn+Njz06g9iGQtJdSQCC0i0uol2AwIYYaN42JL0vjRkECtD7D70wIskmBUkTgNpDDIMOGEwuTfNCABIaSAm4aN9333ezLdh6jF2Edbs048ejCh8DAWm6eMYzNXu3CUbn0Xk0X9j46Fjf35wv5uAjiaXbNiQAgVozzAH6uQBR39vECXlJCOIBQ2lpZKQDxsNjnQeLlAYB9P0hoQEoNDQkJCRsAGSAZs6hoWDz/dV9aZ5ffz5fX72vtBbNCigIgASgUEgAMIXzBdASUbDozjPYSQHNIJVCkwIUSQV6IeMpkFDe95Os7STv/a18Np+7PySUu2kKozlokEMaZIEEouZbTCOAmbJg67TupnC7aKwBSACwpHQ14/PlmXTJBb7mG9L3vfeloZCQ5L4IDGMS3XQXwAM02y5ERQwRdbKSXJpgj0ybM1CKNZ5Jm7yitkfHHp9HfsQgLFtKIw46noMn7d0YmaEIknvvJ7mKVHW3xFK7vbeEGaYWEsZgFTQWAiQTJEnB0hydMzN7V8LjLtgCRPYmNU9rlvRS6PVIVvXOWH48I5RSWY5pE1LUbTYvvggM0CCrZLPAcgv2Y08RsH1D970y0O7KLCL+/HN///3XP//81/P1x9evPxNAWB5bzr4ImyTFkmmatUBpCyHQkPR9AQAqHwSArDMAjUcANxzPF/sJN4C//oUOUGQPTYkwpL1wsTTfQPvSSyEBEM1CugvNLolse4SgEJB9kO1pSpKszwhUdrfUltXkzU2COAJpYADmcA4EANhLgg8yPszRiKb7gdBlFwJhX7oI+chn/HgGBNDFxbC7uZVmHvyA6cu+zQulS4OMTEIBaCQDAIIxAJDQIIN1HulLfgAEvffnNz4+fxDcIFPTKqADgAEAgc0GYI5mqHNz7wcBJJEGIYNB9jlCIB/bk7RJ7ie5paUABpCc977vezeK9+aPP/71r//+37HJTd7zHJTukkBJIU2byMJDAZpsFq2lNrTtRbLtIiIjKS0tUDlhPMC9m6jd5s19Sdh7jjUPcwBECovmGx3K7pJAPILsvnQp9mGO5tEMNN299+4KsBBnDNOklXTMtE1je5dkoU2TwMBJ295yldJC3/ef8gLJJkmSXQgtFLV0ZKCtZcu2k1htcwGQgQbCBCJJnjR7P7svWFhCMoAqQKB6jn0o975t0EDv3ns/SZ/nS340X5INBFlt916CRzSq5QdoF4ocUDQeBhQhkGxm5MEjGeXn5y837+ef5Oc//v3vZ76T/PP7f97P71/f//rjz/+u+S7YgqoDXW7wzFdyaYCmaUFgjbCb7V02EAAEQGgwCBps5ss62BCwznPvp/ft+5uapvs3YAyQyNPsvZ/eiwSBSEJGlEoDQqUI7S0DIGSPPUn3XrKSKZAmtkWt7K7nbFbSnENJdveTBCqZwi4bAJkNvb2396UBEAAGDJaGBIkBGZuBLntxMTrHPhQAaEIT2TItPjoPpfftvhAEHQRCZ5DByOQ2F0DGBpAZt0sDQSBzjCMPQV/fIu/Pb8b641+ehw4lWYyOEBoBAACURVDAKHv/IQVjnTMUMKUJmIRWyNiaZHc/tNaX/ZWWAAexe//5+6/3vqGe5/uP/5yvP3S+IQC2x6QCbOjeN7tkZYOg1U0XZTziVNPk/fx99ycFLDV7997sJ3mbRSaRDGRD9us51Gze++kWBYGtqg1lzgGDhbA9A+1WDXjmgUGWoZHTFuje7EvbpEnblrIIxKbWM/ONAdHcfe9eWKht2zBCpBL2gGQLQwG6bT1n9BhmBE26u2QJSHLbSuO2ty9iPHhkNzRpC6ahnjnZzf1AC/e+uZeS3nZpkACEzd2XVsg+QEJ2NOM5dJ7nOc+xTyrNo/OkS0VzfNSvBjZtRKsynjFGqNmSbuVz/JzzTRE8v/687+9Jvr//9e7P37//x31/xufXf/tvOs+9H6mhoN2b9pyv4wHbRgQAgW0KQCCX3HYhOJDuZm/vEgBkfPQ88ujrwWYjPZ/Pb/ZS7/0BSIw0AESWss0uhXbvDwV/YQPN9n66H7YAM3NGmEYIrDlnHgGQ993PP02Sa8szKe/nU2oMnDkekdi2yF0oAkBgI0PAAAJMLntpNANIwg82eVnAAG33Jbf3kpDYwgbaQJAtSyM7e/u+5PbzkpDbG1gWAiCPbBoKGBksDYENoHkACI3O4NO7zCOEPL/+/Xx/06vzfP35nx7dJlskCgtAQi4JAhuAILCT3fsPudKRvPuBSDKiSeIZbCQACWQBICyDAOCc869//2//+o//9ue//v3rz//449//cb6/kbtFNsanKTqaB5Bi22fkqQUa/bKO5AY8tgXp2oxAABDbaZsAEGZs3fdV4zm1AXlmBgWdVECzLRhJOOQ2SwO7uc1730uiioSGpvtCgfv55DYpotnm0lRNEALG42cA1ec8IwMuYJ+TZPMm1348SjYpMPMFUyTN5mIklwIhmwUAPAx3r4BUlXXOOd/z/JKHrCrNhCbBwuMzyDTJG5ZuChigkZCOZVuAfc4ZELJ97C97UGE8v1A0c77+sB7jbrsdPaLJu/ejLJuqkpq3SlE2QGlZgYbcN4vCfev5Ot+/3ved52u+/9h+/vnr/9z388e//vjzz//+9fXn/dwkqJF8ZEt6LJodWZpkw0pFRiAgm7d9+/6mAYPlUwoA8oMsP5T2w4IOwLi9v//6r/v5yf6DrfMtq3HUtN0rAG5K1giAZT/dT7NQMUjIdIvF7N5ksUoB4+ZqLBuJQj3zK6lH7+f37tu8oWk5Ix9kJGQKAhtBLwsNMhgAIBBaABsK6b5kIZLIQDC4UHDuBdCBgJHVCwJD6Kct99PPDxsApf1pXzDnlADM0fMFIEDYjIHuC2YOMj3yAwst2/c3oO9/Mb/6z1/Jekyicdt2MWAaCjIgSRrmULixaN696xkhURoEVvdFaA4FigWmbbvvP/t+gL0fuNjPr+9f//rzPM/397/Ov/6Y55um76sZ7mUvavaDDaHUTlUrm2R1DpZtPJJ6P8qLiqFO9+7PQnFSucLywQba9Uyy1PsuDT4UBD7W6fuDbBuMAGNDaJCp1SJQogIIPNLA0Gv7PMM4LKK5NILxeMZysqpKYaQHYQmVI2Mr3T0zmkmb3OSyqxsaSrtUzdJLGrqr8TOeM8+Zh4K0G2hbIyWrgIXcNnubAEhYId0dHzgwc77PMRTq45kvYSprzoxQAgittTM+Y8v2dPe+n+wV9QDbNJv3ftKPDdw3vzWSZ/fefburltTYHHOQhUnu/oTFIITNnD/+Y+aL9f2Jz/nzP//3r+8/izdXwjqnnqKWkhiDh65Zy+JpohnWYMu8H/Yiax50EK2QsbFpui+25gtMQ4OPdD7//P79++9sVaHTNASAbiIdGNvJC6Hp+7aVj0bYJdmlbdpskyayZCtJV8dgQJatNABAc85zZpISoAUfI86MkGQitmxIAAyAkIYNCfNFTQUgmMLR+ZMzQCkz/vpPnT+J6Oj54/z6E0IvgYS2GghA2F0aJIA5kLby0HSXhgYAyAsht++HvQCFBmDT+8JFdC+g84tN39/NC3Tfv//r//3+/B4DNCEhAZCRaWi623xIugvgmfM9zxfZLcUIZEAaWahgWYAFoo0t0nSTlwWw5uv719cf/36+vo3UkGCT9P2t7288M4emu4CDBYng+ADNbWKKCi5A7YFUHakJCNUEAyVke+YR1kxgZrBREHq+NY80+OjrQSDkB+guBB2fL2mrJbdZAyYJaVkJiCC7RzIGRwI2W0IBAFohmSqUpFQE2IQKNFCCdIyRayOXokKFStofkJDHlbK3RBLEHkG5Zpe2lDbdJqIGA6B5Zr7qoviMZ7KxbCNJPEmTyANJAoCgzaa3DTQNxJ7z/ELavfe+mqMxavNJKYYRDxJN2fGjOTfvJqAkWIgm8hjbY+k85/58gF+//uzN7//6+9evf//xx39mE1662cVAkpuyFIQHIbdtciEhn9//I3//z+btz/+ClFToPAhJVOZoBLCXDYTQAEEL0czz9cfmk/3s+2kLABRrZCfcXh80Bjfbrmz5IMlHMwhI7y1tU9ZHQkBSAEjufW/vbWLp3p+7795P8so6I2jTLCAsqJRmS5EBGoDAhlIKaRYCxgZoYTBQEIYNBQmgJQvJvTTdZYMkDxoA8PH46Hn0x596vpGppQd/EUOal4YNe3tfGgADUAAEwF4KAUHDrs7DOezdv/76+R//P53H+vr5+WeTBkiTZhEUGgyyZtBoBoJtP9IBNaWdeQAEcokYCrZ9NguxXYwHms2ZB4XN+Hz9+o9f//r3H//6TxAytkb7+69/fv/z/PGf6iTFhtusDCS7CCRK9819925uJIUiHx/7CKXpFgBaAIByZgj3fZNta1kzFGsoYEsAhYIMkNCAsYWsI03L7qZBtg9CEj6Ezd28USnSjA94U2FUhnOmcHP3fu79IIzkyd29C8gDNEWhiRqSbrIt1vGMx0IzvzynJLtlZdrKnHmkU1vIIBDW7mWX9uZuioYGoNgjT8n2diIkm46wrXOesZJNViPbtpAT0yZNklzb5zxgRKHh8/Nf7/0bzEKSXShNEyEQjBifwZXThAZA+Lg6acd633+Sleefn7/u+/e//uPf5+v78366b+7P/ecjfQMYW0BawCjbGZcGuj/5/M+//9f/6/PX/2fvu1mdbz9/4gNpXxoZgNzmbQtAIACh96Wc82gjuvuSi7ANBTWDF0I9Hp9HPiQAFi0BLB/bmrFMsUcaECW5QJKQObN329i+7weEDNp3KbTtJlEtnJIke0VR2gVI2kVB0NCwt+8Ll9zukqrq/rQvDHtYyFve7iXb3r6/7/vJXQBbc0AWyABY37/wYQ6CBIFgrOfRDIG9yMgIAFvzMEceBAWCrfONDRR1P/15wYzbkCKf55elBFyQZPmBQ0Ig0IClBwBL4xnZNAASiJpFMxo3S0MDWADZgkCybUEBhOf4PM/zy7/+0N7P33/v79/5+7/+/vt/nudbv341aw8ACMkP2Hbb9GY/u0maBqttL2kSITfNu4AEEv4m07soocDIrrp390K6e3cpNM2VxA0yyb6/q1fPo/kG6MKRvzXH9syA0aAD0ID0fGEnTSOPfZBnJKuFBlRC0ia7FEzBNrC7VGmA0diCInnGpn2TSkJSR5IJoix0e5u2SGO7KMwhRb37zpnjGdgrITVAdxlb03Q8NEuxEmkcsL3ZwUieMSd9UywsJUmxJ7lt0tA+z7etlO6H/rIOhqbZUvqdtKlkkyD7QJoA5YLBQBMZgOKZ3fev//V/yXz/+a/fv//+er4s//7rf93P3yNJjzlQe2xvN+0QbGX63pLn64/mA5nv/9B8I+AQsCnJ9TzMoSBrBhmlDTJS3o++9zwPNKwxNr1NEDblzebr+TVzQCQkWMhgBBREC4MMBqBIlOxNAtCS7t679/n+ZQAbL/J85f0HCyHrOY885AJptbc+YkhIaHAaq9GZ1v1cyQVauE1JWFRDUYDepZe9JQIAAOl5kLEhTUSTa6lrjcEAgIClINDR1yFgwOggAAqkNQEZGUFuP6/87XO6PwSAcr6e8/1Nbvt65u7n2Tm//kCmMFC3KwIGMASgXQmNIOWSbUc8KHAocDevkuRq3BY6YwQGhA8ytTxNNjvX2X9+//37836+5rzv++//x/+TOb0/tKoAbAEfqGmJauZ5hPd9bZqb/PBWerLBYNqkpaXMPLg0KRjAGEBpC7G290df3zoDtMtekiJ5AAhBcxjaBXsOWJI9OpN/qgGqzcwE7ua2IMAl2WTbehCDCgvM+X6eb9Gb/UIAqmVMaINtUNtNWzyTjeWru/d1x0ODoKXUchWk0TlzzDFUZewmoXMepE3AABSQBEbHHGF7DLYa9vN+3p/Q5/nS8yWdbO792Ea2lA1Mdi2d+ZI9fjQNX2LmS5qnRX5G3whpMVA5EKgQHmxYiAxESrt7b9rv719J9v18//HnfD1pn6+v981ff//P+f7Dz6QB4SMfCEAAdtfyeGQzZ77//fzn/+Ff/6HzjQ8GA0a2jUVCgwBoaJIF8MmWhDmB3AWQqTY3901yN9YDsgcEBBhjQTDYUGQAioBmQwEgSLbapqGxsAwCPvcjjjV+HsvI0gFKiwHLSPIgganRAcsi6RYsBgyQC2AgyMzAMqa3P3/TgmmY0fMHHs/BloVpWzZEgICQqAIjNIOHBMBGhzkAgABIsAEUDEDhpnnhkosOuRiAAua4tAkwlmYAzZCwt/uSgCHdLVutJJpmtbn3Ji0FENg0NLIb225snZkDNDe9STyGpQGa7F4SmpT3/fn8/b9+//U/ZPH8Yt9kNQYhI3VvGqg9so0EZDeffT9Qz6OhJI1Vz8gjZI1tH+k5YANSYYnPzNe3ni/Nt/VIQ5sCSAMgbNNDaasZ+YFgztdByn2bFQJKgey996d3bds2TS7AjD2S3vfT7IytQYYAhSYUyc/zbRtFKO/nZmlo1AjsWgBFgASoTbO927vJNr3vB1sSYNkgC+7uxhp72uy+ELqkaJDppbcUTLaktAkFQXbv21yIx56Dzvn+ZQvVQvOk8XN0vlAFZ77JJG2X49GRBpBkTkvwnMcekKBoUwoURH3fT/bmvnqe7kr75x//SY81Sf/rf/zf7z/vf/63/+N5/kwsg0oKRqMOGjw61te39eX507/+N82/KN2XvQQwgYSaGmh+2CVBAUYHW1LzgpFvd38+whSKbFCS5+t7zmkNggKy2fb96X3Z0JAQykVFoEHQNgtNFrDHMgDqXqjPmLS3u8/XF6IBZNPUxBKoDIUVCQoOgA0hl0KRRIOMDwkWAHQvoOdP7L6LYb709aXzWKbhfkpJJCUAaZPSgPFBEKAgxgAJgKAAAIDcLAmYmISGIo2eb0AzANDP3/v5DeFe7ns/y2rmsU8DAeguvRQAgMteEgAKlCpVlBaLQuhud1vGxuecA939pO/d21sCcN8fQOfAEhSwsW2e71+hINm9b1N8EHCoyFqSlS5S0+69+4btuMie3c3+zn6yteQzze3+RD97f7NCRlC2LxSwRzz4eB7OF/PsfQEMAiG5+9P90QiggSM9CDQhEACcDUU+HldbAoGqBUB4rMd+smyDZuabdPPm3ruvR+OZr28LQrfAmRMO0GawqiTNtSwLVLd7G5ABaO4/lg0o7bo0LQYZUcj7yX6yb9977w+ABAYD8mgGVNgE6fn6siaQtC1gzfP84ZnRSM85kwa49839QJINor33H3bpD6Bji0IaW565n5fcvZ9ks2tqH9mlAUzDeb42L+X3P381Or9+qX1///XX//w///qv/x+933/8As4YhoAEwF59GIibh6Kxv/9T55tcFgCBA0FBYJEFS99AswQ4dEiw0QI632dOes9jFKiwNRTLHpW9e5s0IYWy3fen+2mCjChulzESALu5CUBSKCJZQECa+4J3bxqh8dHUycxju0g6KXMGGxsZYJGGGB3mkAvFRtZ5JLFXPpqHhC6FGX1/63mQZSFXneOE7lJIAdvWkR77IAPkUgAoiFwSxpIABMBe7odeegEaDD7ICBaguwhKf34nn7s/zQL7+aQfxvbT0Ka7GB0B8gBgCi3QFloq0IzPjJy7EADQTOh9PxBYGoI1BMmyqc55sNsAMqt9//6bzfP1649//ec5X+d5QATJyLRw7/1ZSAOldC8kKejxtyBs1TNPUwmUvje3u/efn78+v//H+/MXLUCrQCKPdaThGIOgAT3PFzaQBhkM4NO2u92VBBAoh0HHY2AkbFlzvqQRTsNMPTRJ2JQ951iA5xyV3ZtcUUukaUtZ0Giso/TKBqHRjPXYhlUBwloCMJs3KsDYh90PMhpLA4KRPWfQtq+FBrojZ999fzcvgCzYvUntY1mibbKALYHHniNsqSky1PbX89jceynHZ+abOcmC9r77fpINJKhqArKce3tv7m0jW5AmKSnZ41M975tz5m6+fn37nL9//6//6//+f7+ff1z+4z/++zxft0lvAWhCk26b3CSxDAgoFIAxmJYAAMi07cUgM6MzBPpBS8OcdLiX/fz68z+Q7vtBBmSla9GkW1JRQOf4HPnoecYDSEZCGEHp0gUI9tjzPH/M+cpm7PMcIFayuwUAvOlWAsVFgmLrjMfJQgFkgDE6GM1IYg5jzgH3bu8iQ+F2f6Ao5MpHX9/ITdkloPFY80jiTBu6NAaEzsO4KQDplpQGDJTSAACFwnvZUCgQCATSvN1lPxQAxc+TQEORZA9A02yyEAhAwdB0X2Q0YAjNJvj4HBDFhIKo2q7aZHvfTSEAMp60UAnPFzYiCUDzub8988cf/36+vn2e5/ub80VuqWZA3ZfmzAMCnTPQUkCkBGDbm25nvswAkoeAnq9/PeePpAQAWpdN7qK2t/eymXNIaCgk7VoDNJdEeiShZGkLICMzR5LmADqj8yB5jjzYto+wjWwJCm3X5xlBV0Ke9kVBggANdz907RZTi9iW2X23H0RLiBhjqD0D0sICzlde730ByQdp5hTkQ9+GFM/R7e6OZ+8nG8/aDwaw3JlsmvfeRdgm3EZnFWRjZHfzvj/JWuQGaeYLKa7EnOdmUpQvMU19RgiabrUaxJcdWDPyA69mugsBASqPLMzuH3/+m+S//sf/dT/vf/vP/+Pf/+1/04iy9+M5IW82ue2btBcf60y6o0MNH/gGt69m+goBpqEBEBQMhAwPvVsKYS9hf/7v9+7395/v9+dugbZkSX0eaz739/cf/zrn0XmYLyYIGmEIGvxw777vMF1mHkiL56RtrmQgqT2IZqHP8+WZf/75+xz765FFsbT7Ju1eiH0AKASAAeiFg8QWrOdbc5q/AJ0BmtutZJDmCwZMll5CW8AaZtDBD4hdUFudoVDEcA7cfi65+GGDTUNBUEiQkSEANsCCASAQkja01Pf9fb6/zzn3/RzwfH1///nz11+7L4a2ZwRNCd3SC5amXbKoyKNDUmhS2kJWZwTZK/s8pwEAgwF7DILPew2n0KSFMfP9/Uvg86Wfv3Oz16pyNwkysPdnfBjPuGkaSXWXUNuIKe/t++U/gZrRkWdBlvXQPz0/ACUBFAlCl5S99KYZjMADllIJIklf39jEKBCaNsk7X9/ltkuXMf4CADH1pqECwLKz267laOyRhy6SfWA8jzX2l3SbbVdmE8/X+fqV9wcsz9jvR3vfkjmTfko2HE0HbY02qVIhPxRTs4tAg7n3k1xQ9gXmOeGSCze79CpAd293m7fFI5R0sWw3K8szwL33vj/JBWBu15o5hwpkz/n6njl7L8YeWU0YA233bu//nyA8ULJsy47suum+9onIrALQTbZkJpn+/99kMpEUgKp6Gffs5a4xIltGPovSBLppcMlddKU9z5ExOvP1r3/+889f//m//c///T/+9//7/PqWBmBz9zqZynJby54HJAtKAkZGIIh7l3PABAwyUpP+/NX7Q+i+6JDs3d4lee8n7Pff/na+f4dCAHTv/UDmTNUEe1rkkQQAABJzAPYD0Vh+5ANNutlk26Tb7sxQ770A+N5bOF+/Zs6ZryYCRKLkQoFmZRdoGAPY+BAoCARAaYIsGxmDRhINgYC2+SmXhg3vSmbcfWmQACANgIzI56d3yTYLAIw4BwHWDECCwCB4DkAugCFAAGSAQi5kP3/6887Xd7sI5iS0N7miMyMfQBIAoKAgdAYJCVmipFmoNK2aAC29mxshWcKJW6xByMiGJktBWG6SexsF0UjYnOfhDMQyNsKcpJTxk+J57GNmcPrSilrHPLJKs5u2AB4Zxc/X969/x6GxBWgMve+lBhjPDDZwzoPdreahlgXw3n5+CD4gCCAaUqApmAYBlmigApCAbsDNQuc8AE2bgs8jDzDnCb272bdJA6gEgArMkb7lR7YwAPYwMwAZNNI5fmYQmRmQqNtKVnvfT5I20IQUUlJ07LFqjeyGfd97f9oCnimbXINtwu67+5aeOUm+nvn6+gYsnueRJ4kDxhIQPukLZDf7QpFs02233ETojI/AmiTZd+8mP1g/98W6rT3z/fzjv//Tyb//z//b9+//OPza2yz2tC8QCha2PQe0QvYDxiHtuzSaQSBwIAQSRJd9/+J+kJHZT37+ST+Afv/777//D/bo/Nb37+qFZS94nvFzPCNkiyAbBJClAciyaS4EoXPwoS718Xkej4wsbBchp01ybNvN28qeM0+yUPmpaCKbMdBUGoCEhkLBRpC2xbQv9yIjAGSNsRHywQ8+ALvo6NffNYcUggwAAICF3bzv5197/3T/2V4EPmAoAECaRWbMGEwC0HQXG5lCACCA5lA45/n1HSOf8/2teYCfv/6Re23bIwSAGSM0okDbAgha9jaB4mJhY6CUJO++7/uze5NAcXyOjktlJ2vraEjk8QzuZdMFkJPQa9PPz74fjQBq5KYku2/yekZfjzyWc/feWxouapJ7P03GR9hGqFq89aABXMZnZCyf0RmAAAIAUnwo3UW07efFQcaGktC0IUBpcgPBAASKNNaxDUPRPB4jbwu59/38/PO9f6Bnvui+75/kJVF85gHSeAyTVEYGUqWNPdYkpMCUVAqGwcJCwjQAlQyRyH56bxoK2Hay9/5kV4IWCW+pZMsIRJpkxXPmFyVNxL2bXQE+9qSo2Aa1UIReNlmIzxdRq7T3bjbsUorsI08BCwKlkT1jRFUpYt4/7/Oc3OvH270///X73/59vv++ee/++bx/wQJgzSMfzxTCAuOjlmy6FFD3Atg6Q5EebARA2+mcb339HUFuP399Pv/93j99f/g65/e/Jel96f2P//G//v73/9XPDzDPv835haQhdAkH2G5pSUiwGes8zBc66mGDM+eRLD3SyIRJd/enrec556kcadP385csP2fOA2oqBAYk6xyPZwaZGpmGve0LaUpDAgZLA0Jmb/+8gOarKbyk8kPNgLf70ykcNv35iw06CDM0NMN4Bg5YPthgFpp+fgiARgBYHuYLQAcgl1wUZHTuz+fnX//q+yKQfX73blPru93un8/+pNiHOVFoSMAIZOZL8wX0fsgFSkuTEJrs/UBlkHtvkuR+/vxpIuQayiKkmQQoGkxbm7GORToW9t4keb6/+37y/ogBAACcRBK92Zelsp+v8zx0Dec8hnZt5nlQk4/g3j9J2rALIBinpZUfmu4l6n0/f/0nuSCAREcImuxqhjkAQTqaBxloW6DsXvaC0RcEy+dgJYvQM0gqEipN0vfeSzjn+3x/WV/73t2bvtlPAI9tgFROoel9/9Db3oA8oubK39bfinFlzzzpvXsbI8EqNai9IDS5n+17xojum5RxW1DSezdZBQCaJNmkIORUCI93P2FlQ+Ycy0VpEGmaCxVydeZAgEbZ2LbdJNTmzDnPL+vLNLl7P5sfZDz2ZFcICp/n1699/5D3569/TvW3//hf88znz39//vrH9/PlM/f+OXyBpa2RDqEh2d2f9lUKwkdK275vU0kQCPeiQkbD84VNQdbX99fzP57n9+f9F+9ljhRkOF///r/O73/vhqZ079290qRrezi9l/10F4sxDQCQaEYi/VC6TQu0bWpBm9YjAUIod2kA4H1/ABDC8syTtEgaULr4yA+Fgk3Szw8NDUBAad5maZoXXTAgGwbAo3mk0/uhlR8c2r23+9KAJZXSYFuPzqN56EjSDIIEgAAgBAQfzQAYnUGmBiMo5+trxklI2QvafXMvhdJ2PMaFdntD0y65CLA0YI1AbRHSFDU0hYIbQCTg7+f7+/vXeb48B8jeBI1lUcZKqACT3LtJ00bRWKOyEWiAZElI6G17niMJJn08D6P23d6xnucLDzglCTr2gORT0BnVhDZQACSEGMjdn/tX3/+i1zYNgIAAAIGATUIuwLhdutSSdA6UbrskJAhockWTvPvpLlZbqCTZ1jk+v3/9RgD2zPMNhzr7k31Vw9iyN7uNxHgeIxigCLBsna/vb1cOFvu++/7Vfbdv+0lucg+7MZIwMIS4tOd5Zk6Xm5ctmvOMNdskm2Jz5jnnbC6yZWNHe/d50kQez9n7ExZkHUnpUoy3lSyetOZAEjwCSAEALBQqqYN0gCaN0wgPsp7n69/ezz+lc9/4zPfvf7/vZ+9+ff/b+Xr2/imJsvtnV6yiZrPvn2Y9er5++Rxa8gEgAJuOAT4LIPV2c89eziMP8zBn/v4/h3z++//q5y/Nc3e/Zvzv/3t//sAfSRQAoDQF0OTGNo9VmCFpogkID9CsJJo2RoyFutF4NNudOXc/SThgEDYzTqKkuZbsmTNG2b335/n+onAv3w8yAqCgAwYACA0NAJAgMbSB9P7I0/1Iwxx6eb4IyJyZkWYAAJHs3T7PgwEDAJhzkMCwYKAbGkL7A0Gm4C/Naa8YAIJ9fv3qvSAAQSO3LoX2eZ7X7i43AgDSCwjDG2xkdDQFEOd8hQrXtaIZKETifP8NAT+CUs85HgCKXQTMDAoleRuRklAQts758jkIWz7GUCTvrizmfM3ggxAuLfYIqVtgxqWJmouPoGt72rUNhgNaLiFQQdq+iMTtqqUgU5AxBYCGOczZv955DAgw1Dg+AyEXhQbo3QLM2BhEWiC0CZLPY59t977JSv7+9bfz9b3vnzPnheQFyx6TFABSJOwpH2BDKYCEJ3vbNY+ts6WVXB0jo5Mm5OvrG7j3Y/Xuu/uBVapy5phJs7nAmQMAlbElgQDJM9NsC2wTmDnfZ6b7brcwtiWQz5FmfGygNoh6fVS494W3LYv9nPklHsCa83x/ff2SvpJ2/5gpmq9fM8/8/p3s/bxzvr9+/w301z//Mf7O3mwHW7UjL2Bm/NBBtJv9VIWAdR4wAGAomqFi089P98VHOr1v3z3nu++/en9y27toNI++fvEchOY5z9Oou0D2TReLOQAbWs1BByRPKSp174VFQpC29ObeO37AbUZuYnvOVxIxwj5PdjGAkKVzhuzeLd3c3hegAfR86+vRGBsCYOMjD7bm6V3eC7DL3r4/bDB0aRAQdAi0yCQ0BcAebGwI2falIdWM5pfOA6GhAQASEhpqeUAAPgQKgaWAD5g22ez2/gFSzvM9MwDQBsAHG0ppCwAaUZCQ2lurQAqMjzxNAGRsW1Vkkty8TUoBWQgomAJKsvuqm3v7ee/nY+QzCDzIBHxkSaYytdNcgvWMvgRJd1vSvE0pFPkIkUBJ6N79g5CFlRaBLZ3Ro/MAZeRBwtIZBAAHiUCQBjHzaL6B9BLIhTPni7gte2mwZM35AkuWB7j3NlVFytbnqxrz2IOQzHh8us3GltWE+7OlWIxAIckSQHt3/AA3lQ8qaJ7vOQcOGAIGGVuy7YcBSaKksiaFIklnzvnCk70UBEAB9l5XtizSVAUktUHezefnz75/JVspuQY0KdJILpWpDFiSEELGbO/mhVtJOvhY7l7mMGDNlxl5pr2NPF+yv7/+469//WXz6/ffAv/4r/9z0PP123OS++4/pYsYnzNf8zwgoLttpZG/wRrhI4kEA0YHn/N84UPTXBpo7h/ykQ9Wf/60l7391z96P5pDYQOHlnb3Y2lmrAdB/+x9SYnAmiH0vmyooLVL9765P7ufdBfybhNAHtlNSASkEBlDZWSP8WAlxiO5u20QiHYhyGygALLOg4AgwwFTuiWhgEkw4O7KD4i9shmDEACCds7xuPclwYeB0ry0BCwwNgWgBvDBZi/99P50F0BAui/AHPvoDEBBE4KQxz72kfGMPAESSfIA5MLbfSndpQID2TQRNKQLAKGbUMACIYCmXancdFcAue9LoQD2GJKAm/z588/KBJLstgBkkzUiRU0D7Q0BaKEBPLYBC4PGY2bm++vX33xObhp0HoCbiRCjsXrmS+fvmu9fv/+GTS5N71JTAFsccw4ghA/QbAk2WFISaTQP0BYkjywggI9m0iY3WYQ8tlMgwpaSdF95kMNd9hbVmtlLEbjUAIQ0+963xUiJxwUQKLDbm2127wfWUBHK8iI8354nqWTa5DJn5tmE1tYA5e6FQulu9t4fzMwkkY2shGZz//z8489f//XXX/+ZXsPuBXXcbrsabbb7VxN5WokjH+HRQ9RELk3vp32R6G3uz59/3Psvm/P17wv7/un7z8+f/6S77z8QVP/87/8i92///m+f+1fjvUl7bwlo5nl8Ttrk0kjWPJoBA9zbXYCFGxoApBk935LJbVY2cvcjf/fdNHqe5qULkh5kuEiwpca06X4+n35+DCBsnQcMBsDSaA7FttTutbF6xO3d+4Fo/Nk3WaoGIFnCJrJpaCBpwrVsIds2QAMG9327b1uApvdlQwLIQoHQSy8qpF327f0jDf5mt7lQzYONwMB4vijIyIAstjTIcHtfGgqAoJBLg0FmDtD3D7kQEgCDLQ+EhjEaYOZLOtTSufsqAer6TFMAkvt2l13ubV8IBAB7BClNFgDAQHJbgECTexdpZtLayobUsmQSIHfbe55vJGPJ2X2+vhhDACV9f+jSfe+f5NOUWn5kqt2+UsEzIx0/f5uv08FW6M3dvlCon5n56t1mETNDePe9uwj5mznMwW7ee39oUCBw25BQwG1puq/kmS8SoN32YoC2UAqhuXTPOcggj/GRnSyuBSwsbJYUaVTC3bS7kOa1OXNKsj/pC2FLCjlfXzDJBzYbAaa03bDY9757f0oMLUmzF+DMAECa/fzZXOsp09zslVQtcMagpAhaMZYkGYB7E9S7uX/cCO29nz//Qsf+gpwaCkug5xbb43PmGx1qZJ+zLbaZZnWO5kFtAnge68lyzvl6zjmP/Rg3F9ejf/3rvz7//Z+//+33z/3cn3/KkQUHjTxUQHYhkpql1XnwkQdoqxnmIDQjD0kL5zBmTreA5ORi6fu3niOWOQBSk6b6/kJgb0vI3ns/Nz8eaX7r+4HKA4AhYI0Yujd7Yeb57XlKWskP2Xvf9/OvvJ8EIHuz12fsJ5vdOzaQ0iTvh97oJgF8DoQsglwazZDL/fTz0qUh6b5lmyIgBBAyhALpffv+IRdRFqDb94cgeygl94PB9G5TCk1TaLsYEvaS2/cFaChgCh2gn7dZ5uh8g5ttChYP3aCkG9o3+ZNs4O4lYz0dlbJYDxh/6fmWBhtCl71pikGSgfR2l9SSCKCZYsjuJT5n6nqmbrpI2Ajb7SCDa7A1c75/6fubJLnp273I2ZwZybvv/fygMkZqsrs0bd/Pn96XRCFpNsaS9n3//PnrfX/oByKPRzzafLgvu7dlhk3ePyQse5cxPvID5L4EoH3pbUNBMgcOGKgN7PtDr86DqXZ341jDpnvxYEsGFVISYDyjmfEwX8gN4xEl1M1uu0SyjSm0BfyA0e4mL1AY+0saVUaOCOXIXwY3UM4849ldy+c8Zx48z/kSIovk84BhgAQASgUaO+29N4k15xzMvZ9kz3FZY4Ayz9Ps7ifg+ZKwPfNVCCkA0Pve+14jkvt+mosOOhT5AELGBQjgMa39wJz5Zc0//q//4/l+zvzb56+fmQM0kEqABBp55nl+zTwhsrrLvRRAI0BIZ7AxQLL9/FAACIDtOQAUWTbA+/n81//RP/+NIQWM7ufn8/lJ7Tn2nPnW+SYGte1d9tJAGDebfecMEkT2Jm1st0GiFvqaGRvWM8ae531/JMkGU2z5OZaNxwbA7O39w34AeZBpaCBAdzcvDUEeIIQxY+bgg03K/ZCLhpqahBYF0+zyQm3T9H3ZAAhiAgVAaV4CgGmXhv3QMNbXg5Akjc4hSEJGICPjOT6ec86DTEq2yMJnZItSen8ACAAgdB5ssskLCO2+7QJNAABILonRzFBk+Qyc0Re0wRplIQh7gE2ynwZkme9f/4G/AZhifX3hM3OwkWGgtATa0qRpS8dzb97Ph2aMx55jD91zns1PCnZbOH1vG4rOsOm9wPv5kHCchoQFW/NIg8EGg+Uv6UEPBqDBNur73vcFt6UoHY/b3EtDQyNNWtJ5vu1j6d57Py8e2zRA64REBPtbmhsAV1ToIMTe/Wv3RYO0fO6+ACV700qEVlayn4+BsQEAT8cALej33//jfP3dx/Pl5+tv0lMkHwQivbZkEEkoloFznjPPzJEmN5vati24nz95P2x2Y9QmeXf/Epw53e59oWgsA7RhIcmSIGu+kJCae/c2ve/P+352gzrnlMjcez9//dfvf/v7EsDnSE4uiS1QBcLnyG4Rg43dLkpbAJkxNqJbfGRnL7kk3AvB5hzZfS+wu33/xVhK7z8RlN5Xvcmma5W+SSW37b40bMh23+6l6b5ClrEouT9oxl+aSVM48yD7GEgC4zOBlNH5/v6duwDdtMLYMJrHM5S2MCBK294lQdCQxajQAMjILRBhQBIFxBxEPz/kApQW+QFoUsmCsgtAyEXWjM7DOcgE6eE5+v7W+WYvCYCt55tCwtcv5G4gbTXSHIBezWMhxHxJgxBCgyRhW3MkJW8JCXsxYILON3PsoSONfEBAKV1ZCNvA7oJB8pnnSNoGahuUBiBBCQkA3Zfm169/O3PE4C/bc4YsuaWFba2xprvZ935eyJknKUX219e3rff9bCJUcbfIHh1/3btsAOhuCZ5JisEgbl4AMLAA5FI0JgEkAeQCGiHjyCOrKfL3r186QwP2HHkAEABScWF39xqAc76PJ73i0pVnzrHAxcYeDHJJ9t0PYA0oG6482DrzWxogvekH8DwATbWIpAa2myaJJDMgSSBqJAAVC4xsn6QWFsm+7096AQTonMdzioVsex5hUIg1Pl8+X/p6sHf3vldgBQIHnCR76Wo0MyB14BSjYAPd2wSNhKxks7vNu29aec58ff58xn6+f/98fr6//kacTZKbn70XgYGRntLwyqEhL4RC6C5AYEOhobFtH4rmQWJDQgxmL+Xo6+cf/9Wf/56v3zq/gfLSG/T1/JZm77t7jUrYt/cDaAaLBECiQQcLaLIJkm1SGQz0nAO2XQr5en79/tvfm/XXJGUMBO1uEmFZIHEgkqioIDhwATDQhEQ2CQmg52vmi4IFAGDO0fPQYPT1xV6IfNADBoOzN1kMMgaQ1ZZKEgAgEyj6/rt+/V2/funrN4QEQJYEkNCQl0DV+/b+Qcdn9l72Nj+f98/NxQTkIsP0rvVoRs83cxhDet9uAXRmvsaPfQAQkLRp0qaQJs2KSXY327u50gElFxlApjY29jyVpJn5RpSlF8oMCAnbep7nGyVddfCkrzZzfOa0vYnPmfNlH6AglGygqc+vc76Q5SmUnHNkIVkmBb6eb2xZliBw35+/um/2zfuBYEhyb/N2X/YiME3Ho/Pgr77vvS+iFAOkAcsHfKQZaQagTTdm5hjXwqRrc55znpPs5/6BosLaAwZIkwXaSXbzl8SZh6QJQEgK/jq/MTiG5kZFatOWdEsRd9/93CTZ7PvBmZmyoSkwyd7Ph6xt2+neu9lLaSPhkcaNQZrvMw/QAgJmZp4vz8EBIKhYgFS7abK1z5mv3A/7oZVGspA4lltarKO0KXhm7v4837/3ft5//SPbJO1aKUimybvdYssGkJDZ9r7dagRgM4c52DR0oRjGnKPvX8gUYO8HW2ewbLfV+Za/ZSHrPG098/31d0CSJQrQgmCMDWgOgA5kE0DW+JACGKEzD55CU9uSsHVmu3JLKfYDWJaHAMiCTT8I7JLu2/uyF2gL0Xl0Hs0jDTZAA9Z5kEkhCCQkEDr69TeY/vz8/PXPdqFk0Uob4flCgsABANm4zUsuAAY3hYtMp1ma7qLgtC+CBBnRLIVeVD0Hzfv5a/e97ye97+cvst3kvchgnQcZwRi5P3/1/VAAbFQc3HY9mnmEAcmg7DYLABbZJJfstGya3bwGAgWEQCRLzdcvGXxI+vkXAI/mQUNVEDSl1ClBI1SK6L2iyZXP+XqS5G6zez+fP3+kpyAPpN29F8BHkgAEpczzICONp922Y9MkKUvSLcU2gra9kFJ5AAi9lPFA0gDpthfoXdjrMs8zX/Zs9v38ue+nobkN/bxt8Rl/nfPYk/Tuz3YtH48gXYw9Oqe3zWZ/drdEQAQCAMZRSVgbCiTbZne7CyQJBUPHY3/7GEPJ3eMHhHzOt89jXAo68wDIUQqxIksH+8yXz0lpVqCZZGVZX/YhhpTOyD5oWnYFkiuFLgFAxdacQsEzaIAWRtKcmbt7P+/5fvbnp/dPvfIU7tb+soZgg5a9QIMYMD7yo68HH2yAAgdZ85DtfnAg3NAA8kNTwAagz9/+rnnkw9cDRxkCIlReTLJpAPTM128wQR58kGAkJW/v5aZZzzei7fggn/M158s+sndvd+2B5r5fz7ek5+sbANNlKzvJ7t79CABkP9+aQ3N/PuylYDPW88X5wkJgel9226W3vNzb9wX4pBudR3qQynqqedBAAMlmaADmMGBToP35qz8/CGxkJvT2Lg1ZCjEEjL7QocFgc4YBhYK/QKxyP4L7XmeOv1RLa0YIQIZQUTQCQRFC0oOGQvFMa8key2pryTNtAUwchDhdtdru3pUeCbj0WqBJgopCLqARBmRZ8zBfwP35wJb4Gc+kKzhfj5+vexsCEATkfv78oUVtMuec54uikv3z/vyD+8ci6bbIpPdekt7XGXA3kSVpHs3R+WU/9sFuAxeBAsJqSwMp6X6SD2PPQ62kuzBA9wdu9t5Nmwo9j8ZF8pefR2dKUxrdu9kCts7zZQtCtZt9XxpJ8mOPzTnP8/UfaHZvgiTSECFCEwSK5Qcree99kzdcwHYauxqXtsiHOomFhaXxkebMg89uKbJsYNUAJC7g53x75v58kouKSK5NIaGRZziGtm0LaUguYHuzizQHTKG39zUWaoLH56vN+969n73rqgmez/v6fM08luX6jBFKcwXtJj+U83xLX3B0BpkEoTMAuSiMq5Y2sLA0b+9Lb1vEzKFpdhs4yM2n99P3LxBBYKOZ8TMDDZXOIMA0zcsEwABs0rbd3d0XtUAqHLy57aux5FBAnjlft/v969/9nKaItO3abqpGmLq7JACIRlITEjZsel8AD6Gfv/L+6f1rf/77/uu/+/PTfUn686f9aMQcWJC//3ae3wANDBV1ZTBYFUEeDIJe9tIACAo6YAABBsBgAknvSwKhgPEhIdD6Oec57d2b83z//vu/awoKMEdfD6JdCoCPzhc1ULb7khCDwW3bitFMSRIYJNvSEEY6z5nnmTkezRlrisHA7WbXcqu9/+r7UwzIB510AYDemZO92U/vUpJkr5A8PoMsYwm4+/l8/kpW5e7bvcLpm9zdT963tx5ZJHf3rWhv96U3BCJr35++L0DTBAKQSAC5L4GxNNIQ91Ye5pGtGQpNPZKOn6+vbzB4PEftbvaKwDVIfM3XeX6DTA2uymY3BBByAbabXmTpjEcIkGSPWBCWzsiyFUMLWN69hpAL0NBasgw6Grr3/UledXvf7o9c2cnee9tsXgDIvvf+7H2T3OzMAALQeb7OeWAwFns/NEb2NM3+CaWQotLSdD8QW+VmVxYm+5KLgKFKU0AVCzVkK10aPLKs75Q5B8i7FiS3b2X5aI4seTRfmi9mEH1fFAAZGYKhYS97xUGmxgcAt0suRT69L40EMqE/f0HYi8AHOPN1nt9hvp6vc35J6v1pFrtbEgAEad4Ey21ps2/2FWz2vj/J2rPJ7sVjz5ln/GU99+cD3LsgGpClEihQWioGGQpB9hgJAJABCPeSkHoOc+wz50AALLgQEND7sq/8JNw/f8jFBTc9NoSkKQ02PvhwvjhfYDYQeuRBUJqQiwAQ6ALYADrSSNLM5sLtfva9lPaVUWUflSLZADJC52B3X3rbxdDQwIVgECgQGoCi9JzRmNAWH3kAQBaUrSpIJWxkAMVE8vvzAaxD3FTS6EB4L/icY6vJ3RfZdUnvJjn2GOyKvUnxGaDUshFsyuaisWCQlOJK0nDGDyT7837+SUEneZOXXBIUSAMNXUQoNiQJBaIzkhVJB8ClAdp6ZmboxZw5Rns/uyHJu9jHE7Z0TLjp2liAwOeZma+ZbwQCJ7lh09qPNQnJ5o2lNNIZH/CZkU03Qdi9LwAA2WQ3JACgYaYbiWZ3N4CMANK99717k9y9u00qAexuU9nnHAQY+ev3L6QWSpqWu2/yWmcvdz/CKVAKTYI4zCluXrm5F4BRB7W01b1vs+d5LMn+/vULqRWK5fd9dzfdfVH6zDPPd8i9f7ovd/fz1/v5B0RH6WWDDbAhBgMs8jeWPBCEnkfn0flGRsZHFbI93ItN4V7mACWFsfK+yee+9+4Hg90biL4EpsYHTDzHgCwQTXZRbXY/htGc85x5PAahIpHac+9991Nuu4a7d9875/g85/mWDTDGgw7+kqSvR2eYwxgbHxRsPV96vuUv+Vtf/67nN0CLzd7eD/vpvn0/vT8WspqQhaht0gQjD3KzEFidX/717/ggs6EhIaEA2CQkNGAGncEHmdB3e9c+Ot/cu/fnnNnPttvevfvuyiLp+8O9+IDAkN4XjI2AUCEgbdoCQHO7t0ma9qYrCSUsUrPv509S5G0BgECxUPe9HwvNo+/f8wxE5zBGp7vtUhg0vzRfqCKY8eACDWaA3E0u5dfX3+xB1jl+nq/nS8SyYfcj5PmShzFytbt/0fg88kPSfdF4DnjvS3Pvp4APgM95vgA2lgEKTRsACUAwAG3vvi3oAHfvdqm6m6001iT77jaxJKgIomCPD5VmfAaw2taembEK8cAAyI/Pc864lEJJwfJju42bNgHQnGNbgOUkSZ7zBd4teGZ2c+9S0lCsOXMQgAxAIc1u7ns/7703KbQNIYjSNntzb5JCuKHmaQUWQFMlb7JdBEJkiijdP/f+g2bmADOPPJWoE0KSNGH3+/t3knA9oxO8nkH1nNFkuffTXW3ZUHu+ADY0NBgwOhxDaAGAhAYM1nl0RhK2nu9smhej5xusr2/mdHM/9+YCxnu3dynyQNhLAMsDyIMB2wcMtTRS7kLPc4B2sUvbAknJfX/+hWrx+OkN4d2FQgogsKB9IfJoHo3wIQYDAEBhDjZzkPHoPBCKNAQCwKbvD/n0/rx//RNxvn9JggFH2SQJOjzWOZJ7F6SvbyzZDIwZIwEAjTzY7U/vD0UaBAA0Sy+98qHufX0m9b/+9c+//vv/91//+f/95z/+r72fZu/7L/LpfUkImtH51jyS2EDBQO/N++7nJ7tJtgE0R2co4HNOExJus7dtEiTN8YxnRAEAAGzLJ1TP90j7vgAljTSawUYGZFtPaVvPeL5U7X2XAuNBJEFGMMwZ+QRmnnN+n/P1fP9C3PuxEaJY04R7wcY0gP1QIFSUgGUKDIVCQaYQaLrbFhvU3b0XbH8hJ0mFIWwqxhpZSLLv+2fztiu5aSEl2Zv7fv5qYrtVseZoDsK2ELQ0BY3ne76+pBEutwQU2fbMl8+RbcnyscYSGKCALGXfbqoBNAaGNi8AvXvTJJf2nAMApXSTF4C+73s8AIQwPkBbga1jzzwSY1mmAA20svFIb/LTm26aHX/13t1/3fyVvfbjeWbmaMa29d6f3YVo5s/nzzxfkvr5gwMhMfReZM5v+Rtszzxf7UI0g9xdSvuSCwCQ9kWVQe19u0suARnTLAQfSUm5YcwcCtRiBKjUlud7ni/s5vXXN3MAzYNN3mZJmmvL5wHJZg42yIw1Og8gyXMAi7YYaHb382lD7t3Qtrds4b5/7n4CXJpCmKPz6Aw2AEgjP5pvZAqgYwQJwBzOF5imfbsvoDNzhr3NNmUXgQaYGYBN78VH5wuGgErKBqDpBhuZ0rwIzbf0sOm+FBISmmabhRCA5+vRzK+///3Xr7+/P3/++z//39ntfZN93z+wJG1I2MscAAJlACGJAk1tWSRFCNujUZJ2kRBNgeMjGwkAGdEAgGTpxNz7khDun39xt7tiMdgIMMYe+1B1b1Phvfezy02RnnOeL9uiZw5Age77JiB/7ic7+JSiY4lEz7efX5wDiYKO0HhABM1BmLn7w1720tteFHD2bV5UzQhBAM20AiSMzzySuBei7uYCQBpAeDxnjhAAyu1mXR0NbIrHTYTGBw3y+EnVAmPOGTUtbiWfxMhW932p5EfEgCVEcuPeYo3luzfF0rFsUeSRPLKRJcA2OK1lECVZQGXmgJ5zPJNGNpbEnGMfgDQJzdHxsP0jxTIALiUkteQ5ScuiSpZ/nefv2+z+yX13t9ruS3m+vpO1+P71KySNqtztBj/ysUYa9va+48dz0pusziCzIGuEgg4AQYD1/MZfDQTN6AwGA5DQEDSWSVfz6PzW80ABbJ8x7PvnzetzUNsFU7O3eUl63+ZyLw0U2tx0E8kz5/HzpXNiAAAbKQWdkGQtYd596aURa5mGBCq3u+zFIZdAQAZTKJS2kO5LLrlsei+E5yBhcOACmtEM86Vff/evf9P5RnBv3z80M0dAC+n7Qy+GiLR5+/5pFkAACBoIAFDY25ZcNmwwCGSgLTagr288z/P969ff/u1//M//7X/9P9+b9/PuvXfflNw/fX/uz5+8/8rPP9mLzBxsMNC2dM55vh4QrS3SZqFsm4DRqJJHM3hUmhcAQdvt/qS1D0BwL7DOX3/+u/lh37sXQNZMc9kLVJFGOu1m/8AeD0YAyMy4TdLDQ0WRB2LJOhojIw3N3s/93M+fc77QQccMpOlYqN2PtMi2oRhsinQ0D40sgIogC6CAjx9K9tMuMqINFGksRglku+88X2ceyy2ylNg831+IFAAWWqClI0YezdiW1S7ZZCFjyjYkb7LtRWmbuwLjwWONdZBRZdKAz3mwZHseSYha9SShPufYBkCpQDMDSglpi+yZBBhQsmmkyd5sts29ue8iY4NmdFRCym6S9gFJgba0b5vRGR6KTbrIZYrTT3Zld/t8fZ/zZT/ypCmRHuakJaQr4bHnmfPlefAXUIpABoQoFBJqdCSV4GEOBUBm01sEgAZwy7j7Am3at3k3LQaxMoOQpTMYEjBfR2ek4ZixxjWllj1DjQ4e7K/nF0DpLu3MyL7v+/P5yV7AIz8HYgUjnL57XzH2V/Lp/aEBGGMDCIBc8jarGRJkBlIwgI0sDXOYwxz40vOL+UJmrBkGBGBRdN/brJ6HcxA0cJH6+Yv9MIdCwoYNMjZAgoAwB04/HzY0CJ0R6Dw8RjCz935+/nx+PkG/vv9t/Hz//v08f/NMUnJpshcJAMsPMQEByJbVliKDipBJUyJUoClQIE3SSPKckYtIaIGkgXazn2bbvj9/UWhtIwBANjKtkM9YJk1SOmZ8Zk66e3fOQUqS7L3v3RfsOba/v/9Dhr3iETS770/vCyOJZu8PjY633X1BSP35694XYIwPkC4BWTIyPpi2AACUUFTkaVEtCdraMzrz9QwmlCZl98VNdndndGY8j2YCZprgpgXmnLLbDbUYD2Tz7v257yvk8fN82SMN1ZwznhYDIhHzfB8N272b/di2BgQUI++uNdm9/QAzA7Jtyx5KiS1rWpJFAs7z6JxSqDEWlu17kyba+95F0ikqBTBSzmADL73AjLFw2/fujy3PA6vumQEpJRpPhWyS9vO3f/ufSEkM5zyIGoE8u5dEfjSHpPfFAM0CyMzBIMsmt60xY6Cft3dpel99PQhs4N3VOYBkeoQIAEQaQDQRoWm7ff8wR883DYGahBh9FQmnu/uBQnovIB/kZvfz0/cjOuPv71/PmQToeHy+mNllzrd8lLH8fj4oHu/96f1pFwIA2NjokKUXwIABbDA+OqPzzRz5AOjo65vChgYCxub51vnO7sie07tg6XAX0ry0yN2XAmDrDHOQZYGxqQEMBImEgkHWPBQIBCzr/fnzz3/+H+/nn+3Hczy/nu/fM8+Z3/j4CCx/MwcbLA1dwH7AyaUXWrTbQoEirJFGqEYjUWQEQLvb+Iy+HvkLiEziJLf9889TNYvgnOd8AeR2X2Qkimhb+6ApI1QoCtg2h557s/eTbHJ3b/O6kJght1lDifw1nvGQ213wux8KpS0aff+WDl2S3O0uTbfsBcDE9DYfIKgtXAgCkI10jiXTAiFZjDAAhTN+uHvv/tDOHNr9/JHtGfYSoAbbTZPNy93XPnTT7W7z3vfP/fnn/fzBiLGQn7R3tywa072fP7Dbn+ylufsHcA0sN0US0nDaWOlu2DbQBMt0UT/v+3nfvYtsm2I/QPcjsAakWKjKOQLQwN29n/3pXpZQED7++j7nVGywJI/mS/4ipgCf93PfSwHu+yfF44LnOXPm+XXv+/X7b5pvAWXO1zOWpfmWBoGdZO9LoZFGMwgSAABomg+97C0ByMXWeRAMADVA1sjzgPHR94O/5C+d75kHJeJ8n3DTdJf3bi6GhgTAALCSZr4QSYHuhyIPCb20bVo0pw0JYJ3zfDfsfUF4PO5W/vI8VHPGtvia+U5CLxv2QgAAGx8wQIJp28+/+v6lMTwk5DYXLJkuWSib/Lx9/0BkQ48HBxaKUoLovv3z088fzcEGwJpTCgF6F4HSfTVP921/9PXN1xeCG27wINhQSzO/vv/+P/7jf/u//7++f/2dXIhkSfbR86Wvb/mZ59GvbzjIjBkjgUEAALaPdGjbEtlgZCvQymi8WSPNpIAs2wd/AQYDDbatbvT9GyDR8727fX96X/Z2b9PkNpFVH2wZzUOBjESB7n2TTW/yMVUCRKkaLkgV3fvz8eg8353DCBsZD4I2vZKQsy96wAEhGs0Umhfy7g+b/Xy6OwKy7/Z9JRC3F7Vl8zJmjlNuGqSxzswY3Xf33X5uG9SSdCQD1gmb3WwkSSqac3QLVM/uFpJSwdhz37cq1JqZBwhFGE/9JLDNrj0+XyHh9eic75lD2xT6/vlz78rOvtkkyb53L+qZc+YAGrJvciUZt7XPmce4bVlhVfv5674fa7rZn5+8SZLEHGR5hLOoR/LM0XyBe+/uZgvHkHSTZO9eWczBY0/Sc77fz3vm6zy/96ZdW56DhADGIx/7AABzSAg0YAiCBgJpXxQwoXcBMKAZijzgNqMi0fT9AFgAQbjBks9X4ZwveUBzHmRk5gA4zd2ff3V/IFDPSGdvaBDIbaD2zHmAzdZCnpnn+TWeRjDSg+QziLLJjwlYczTfjffzB9JdbAqyzqPzrXOQKWxoaH7++Y/++Rfv2/dtVhrp4GFGv37JB5ANC+m9vT8hRvbY05ReGoDChvnW88iDaS5Aw/3Q0Iusr29sSdLQ0LCXpCANGJvk/fnZv/7xfv5bz7//+vf/Fc77+WfzIpCZL+aQ6vmmBhA0NAAJvRAhaZDGM8dzHj/fyGA4mmEOkKRJKMYeMTD3XRqMNTQqX8/vr7/9XVhfvz1uq/MFheb9a+9L2F3AcwLVbdcez6CRjf35+evz/rX7F6x6sgbLdCbJZm9vJcy7++be/WRjND6qpfn962+UpnO+JJPc99XofD2G7kKRhSjYdhhJpTcbkia56S6tKjDdtviwkWEkGYBu9mbNjBWa3WxnvpAJR2fOmNl97/vXz1//tftzxrZxJFt6ni/PSHPOl21sgSRQAXE8Wi24n8/eD/dj6jECOUl629Ls/TQr2PvJvgAdaQCKR7DQNIYzY5HcNDbLWgZl4zM+qmEEuvf9/PnjsW3gPI/l0cgWHj3dpNt+mlfjZtlbVtNw4YLGZ+zdF/B8Wb4/f6X33s/zfIM/n399//obRhpQUgqGhpqmDQn5ECjtSg8yNYUYTMwakK0RTffCBZABbAh7G2m+db405l4MbPOz+5ae8z06RBTNN54m3Mve5m1eAqgUQCN77PaV0l02AAUZj5+nLUgYGdG+N6+PAQKl1CNKwu4FNAchiw5YX99gZM2AkRlBSkm40fP19fXd96d66SXo+Zu+fiMxh4CHc/Q82GC2JNC0ZZF0Hu7tz19gPd/6Ohqj0ywJDbmQdrs/3UVH54sGHXzaUgDO0bgtBgAI4tfoN/dz3z/z9TX+fbclOgOQaMwYIgsg6S4FA9NQ2qZ7SzXDObJmHnwA24SkJWceYwqo9O6LAzDGMsYIzjzvzz97F9LPX3jmfNF6Hs8BrNqWz0jv+6/kI2g8Z5ApQFIYGB+fMWLm1zO/LFO5GqY03dERwyhDKRY2AACe4/Mb4Rk4gC0wQLP3NmEvmCpAaUo9c/wczUEjG8gGIgm6u7ZkeXzOaV9HM7O52Y9n5gzQbLJhNwTdn8/Pz399Pv/M/eu+u/cS788f6BnbnvN1nm/PA5IHSNrGxp4/f/5xP//tz/tX85aNYGzPQcb2V2n23s9n79vc+/lBmCmgTQGOjzXJJntz7wbN+FCVvPvZ7Mi2oVjWkL15N3vUkStkUdIioBgUyUC67/vnfj7dlwK2OeNkZZ85KMB5HqSv8+vPP/4rez8/fzzzb//xv/7r//f/aff4SROwD4QEuSp2Cdz20k/zkrQLgME0NNjyNIsA63xrDjpgNggSAJ95jI0f5qtZNt2lQNKc5xHbfu6+9CIE3bf3h/cDsJGf8/V3JCR0ykI1I2vft1nNF3NoKfJYQBAtaZUeAYGom4KkeZ7zy88vWQBz/EwaCoAASHp/aOjDAvAYBfDvf9PzWz7dhWCXC0iHAGiefH6INF+M8STce4t0foGZwxyd0dfDHIT8C1keMADQAJLY273YCEBnMMzRDLJGyDTg5zzz/fd5/v3nr//81z/+z7///T9+//v/mOdrb/K+ff9iPwgwUAqAKcgAFnKRbGxaOATUIhqUthDbwsmL8Xwho/jUEgIcKkv2zV2UvEzGkz//6v0LwAcsq6aayGHTm/v2/ez9qV5JylDm+MyMvy3Z4/PIj3UApHMez0EG4AJzjmesAREgn88PtqzsJbfvq0bPc+Zr98JFwya5mxcqTfYjBIQg0yDTdi8pcgYaAObdN/ZmWeZ8na9fmPfnT27AWZq229x7f7J784Hevdl7hEYYaTDbN+XzvkntpyEESNpdFKVq0v755//1/vWf/v63//Fvf/vf5/ymYg1IWFCyIU3z3p/d9XmANx/E8/w6cyxj3Xfv+zaxjmVjzQPNxgM0TcifP//o+7ZJaz2psWfOmS/PQQAUUppmW875Qk/C9oVtNq3mGz/2sWfmYQ7m+/tv9/0T2H0F5/n6+eu//Ey7//yv/1PPA23AQaEAIJru7f6gRQBQ9iUXA+m+5CIwQhTGzEEgKG1J2iVhbyr2ougMDVkKyb53PzdJAdU+3eX9ANKAQEAbgO7dn+4fiPw1z5fPN3ZdaQD2dl8GDLiBvXffhHkGm9LsfT82FOQgoXs/vRdZHpvuklDo7S4Eg9osDRgdEPPF+epd9ur5jeG+ZAEsEEVjNGSg4N56xvOFTYIP52DjA7CQF4Isj/yAAflhvmgABKT3hwQdoFsAmU3vdn+2L8P7/uuvf/zzb7/+43/8j//HzEAI+/mT/YClBw4JCQ2GsWY0D0bGetD4jGfAQO9SkLu796XIloXAxiAkuw6hEIywQRTj2np+P3/7Dz+P/GRfGj0P/gK3SwEKR77Z3au0uXJa9gaiIzAVGtmYkrDp2tZ5pGnN2Dbl6/l+vn9DCAgwz/dYZTFt2wayt/uyt6xn2KJmN+yMSNQln1aQNjJtKbQlcCiWu7u5gffz2c9b3rA+tp0sSHpm7DlyjUDGR0dz6AgzEvz+9bczz95Nlib6mDVtP00pjNA0O/Pt88uag0UBaO77ufez9919aZKLFxCZEaEbiSSoPpMWgyyMOccetWSrYjyPdz9713b20oix9Xw92DQ+zPNlPzPG0LaVRw3V1/O37++/nXPkQ+MGGZuw9737njkOz/na/ciZ51fLma+//vs/c99//5//z59//GPfP2LbnzRogOwndze3WUkAGBsBbbfvS4JBh9K2bXNJsDUPvRBye18Am9zcy8AImwaBuPm8+57nCxk/muM5Jd2f5mJj4QGQ2Es584vQ+xIX0wVmDjLQ991udykI2UmSPWPPYxsfmvddFWQVuwJqxP+fIHxdsixJkjPLj1l072PmHpFZBRAGP+b9H2yImqhn0IWqRFzc7GxVEZ61JOFlF3mwsdFCAOnO/kIjF30AFOYhQwlBQIWKOHMoMExja10w9DCNKEm+AAI5ohhy3tkPdtJ5f2W/M42ErPWJFwEvgIExkGkCffBoXTD0MINd6wU+5/z85z/r4/OcJ9mlWstKpKJuYgAvbDRwmAEj04c80gBEpAjMSGVbkihRdLrPdJdeoqYPGIyKFIANZM45ezJJn+cb9Lp+ECElkEl63r8yJ9PpLVFa9l26rUuqvd/7/S2pXLVuV416ptNbaSTZy/cwMwMiVExmhhnOnJ6d7ExbJoduueTSurxuzvd5vr2WvHo2DBAGlDTT6ZkMkDlaixkS5BA0dGcAUA9R5EGWbGVmPx5AQNLUsguXXEGrlh2Xr49/1PqB1+mv/f13z3ua6ZO07T5PZoeZPBaqQvK6pUvo/se/3R8/zCRokpkDDZZUV133bV99hsmqSmbv76EhtuyaGQKw6lq+7EKaZBJJCOy1LgZAxrWw08kcHJI5O0Isy5AESM/p2TMnQi7iWovUTCjHpFsjWUDoCe/na1DVVetyVZ+N5HrNfl6v1/3z535+EZmyTUjvTEtY9nInUCT0SR9k6WJOzlsqMKBILjA9zIHBCwYDAJQBGDCImfQmo7pEgdAAki4vAWEGeSEQCLR0Xdg9rVq6Xr07s2vdyDkPmcwz+41SZXkRztlySawqaU3vvd+SdL2QksBAAKRat6icyJfqQmKGjCyAczibM4Qk6SaNihjAYGOgqYUsmya9k6MIgCEHc6ZnRA8z6U1gABBkYJCZxsBkDgFQFcAMAcFaWi+tl3yhBQDEzBC0Xlqvfr/JXK+fvXd3AzONrFWSYNDAQcgmpEMGBkAGT2cmk0EhA2S6e2feQCJMT8/MpOmhAcDCQmSYk25I0qePYXpnPyLP93fOWfdL10/pAqqu63pZSpBWXa/742fd9zCgCYjyVb4k2eVyBBOCLaLll1VMp999vieBtknP7CfPO71LAOmdkA5j2dRyea0PXR/YYMKZk9muAvbZEFGqJQ02AMgmGckynMwhxx44maZqSE8oVAUYpnumz+kzPemTM2dgxcv3h3w5WCpfA5OWmXSgKFGkoGSRnj4wA3fdi9ea53soCAji8lr3TM9kXXdgPwKSnhlbLK26QKfPmXPfN2i6Xaq1GLo3yOValQjr4rby7ENmKiSZMVioLpDCui4oMSDkEClJAq4SDgIYdJU8AGDb8vN+Pj6ZYInRfj/1qs/f/7H3M/Rv//b/+v7rv8r3NLOHiax1rwyS0eUaMBI0gQDGwOBFBsxa7EcCG8hpjfEAqmIAgHV/IDNgK4WMsK/rup1YZTyZMCDb2NRSFZDTABmm56g+fl+f6e8vJK2PPM+wXdf0Kd/yjYIBAK3L2Gaa0wcDPn3OOYAkSaqiCeMStfAFhww9qYUN5By90Loop4dpTgMAuzkP66IBUHAhk9CTadSMkTXT50CGnq/v7ver/hlZlOqCAnMeBGVmEAA9AQyBOcgqZQBIYytFYEg2OuSiOM9f33/979fHz1qXlzQiwLKGhDkwed5aF2sB9EEkLRmbBmRj7jlbZU1NRgaYPCjEM3tygNMPjNvI4fQ+qz+TBGxZ1rpLpfNmPzNtX6pLFhq8XB/0aW3LirBQaGZGqK671oULa8DJkgaRaQAADB1b2DDnNAisBpAsFQZIb/XNhAImcwDbsgkGsO1XXcJM17qbL7uyYAgoTLdVJESLQifnrVrWxTCZ9EGs+zcn9nWtLtXMTD892/ZyhZrTJ8eOwPblu3Xr/sH7a+ZEnpnTGxJf8sLTQdN2CchM9+nR/fLX159fv/4gDZyOLaLpWKW1YLmuuj4mAoOtmmRmLK+qc845ezJ2lSszBBgC0fQAM919Mo1ASM4ESwWjzHjJtWSFyCUpM909856cOQPYBjKNBAQQq9b9+hgyGVR9+nq9vr9/ff31L626Xvfz/YtJ3T86DwU2JbxmJgCWVvkmgQEgCBgCiDk5m/1wBoELgYDBg4wXmDIAGGtdum9qUSZDH9nSOn3Wqu6nz5PpDBlEaV1owWJgwqq6b8vY1BqbHjLYwunUdUHO+1f2RgBkGA01fbyuWivdCNcCAdP77DcDRlUMnKMqrVeSTOhhBjzTzCCDgSSZk/OmD+qzn5zGoh86kOxfnAHTh/OQwwxwLSdH9Nl/93kDohiyNwnT2LpuYrLkpftFGWCGDDIi3cwgMMjUTZmy6oVvaqG11ofr43lv+fJ6+b7X9UKDjYSNpFWY7CfvNxjMDBkw2FV4henZYRCuEgUEBMjWZV2uFQYbkd6kzaQ3c6hiPJmhtbTqwl73Cyn9ldmwENQkLRyppyGspbUk16p1v3TdwJwGJJ30yBNPBgEm6f56+gsGbqoArDDJcS28EAT5wqDAwKSHORBLaKYbxmt53XhplWpZlcn0IBTLZZWEbLwmE0wtOORMECovS7ZRAa7l6z59JFXZSwRiMPSQqpUJRLQ4Sc80s8vFGIpatiHLa9UFJS3kgMEl//jt3z9//jfrspcxsWzbtjINLcvXfd2flmd6OsDMQEDAgO2Z6b2f/ba16rKruwmChKQSjAspscu17Gs4QwNkZMUeEiIrnJmWwGAB09M9TMMYS97drrK0Vknr/fXXjx8/Pn58/PX3f539rPVyXb/+/I9iALNMkRIXGEBkOhMgffocybDQoMAFkEnv7Pf0JoNMDEYAkmAAMHCmAUBlyoScd59jeRgA2Od9+l2W6wObmIE5AGkQtVg3humyks7zRpKXyiE928vIYLuSJAMTAFUZACsRZE6f90wnnRkmSTMDg5cshFxAeoOws7/zfoNVS1VygZkql0oIZBAMgtks6+MnWjkBM4HIFwPCpZyNFmPmwAG0XgT6yAIBAIIeGgIzZLCJkeSCYYYyDIAG8PVy1cePD92f+ySYdcHgpXoho8ILwEvrwgBA0mSGIJHp08R2gYGeTh/brkWwa90vu6RljJB1zsHGxiaa05YshwDIqrIXm6QAMohIQpnkHBSApNZN3ciMmYkDzPRMBkq+1gJwAwwzoKVVFrVqVQ3TZ0uwOO9f3bAWkIl8UauumwCkk/3MjKoAtMAAEjgJCQhIIheya8E5vWcfAOhpy1LhZWoCaAawpJmDZZWjWsbAFDKKknO6N9ixXSb0TuK6fF2rLtctX3IJgMw5mTJlNHHSYobY5XUBIbIGQXmtzMx5bF/3BwjDYAt6cqwyzMzpvfcGal12Tfd+3pPJRLVsuwoIaBWItNcrakaJz2kGU5Ktckosu+SSbZW9QmxnMt2qclX3ARNAP377rfuR9ds//vvs+etf/+uc98fHz7XW9C+va9XCARCAIX0QQuKSV62l16fuC8ClVUlYRszs3g8MQA+ZTMgA6ZDBAEaZhsl5st+sRdjvr55drtONVXX36QBKpvN8Zb8zDQcsXbAAMriESAggkHzNsO4fvj6kRQxkBjGaZ7/dPacJNAIYwNYqy5IXAEOBF4JaqgLoAWzTp58vaBjdP9CFrdcPfXzoutNNNzYFU1o/0pvzrftTH7/rvrBZmkACsheITOYLh1rIIOR0MycEwTkc5MVaXMYAAIAMzjRz+tefPA+26qIHSfftVZnNfefsPt8lE9OTND0AGC8EtlwUZNiHHiEUZpKuutGNSEYGkgHATLr7mdmEyAzYa11el9bFYGnSE6xVXloXAa36fOnj02U4zKQ7ibyqaqb39zf7mWlsTgNkyNjOpGdr5q7lVXhBGKSSrqULjJkZU2CXqy6p5GutDwSg68OvT5ZVpY9P1m1dzQDrvqmVCQyGCVTdt+tSBgUNGZa1LhDg5ZnNPrDkGkEZpfd7nu+ZA5nZz/MNWnWhmljIAgYXEmTS3XumZzJzzjzUEoJJnz57GIQgADMZ5sy8Q+zlfvY5X/gMAGiski/Z4Jkw08937x1mrbV8kUwOYl2f9+cP6QKASRsnmukzZ9Ji5kxOZk6By6e7z56zz8w570phn96E3g+zJVANsVdVCYRlIbkKlVQDrgLsAlyX0PV6hdrv7ev6/fd/n+d9zi+p6+OVEYOvmhzmZB6mB2BIdF0AgXISegDpAmQRgKiRCcxBQ45UaAHMM/uhJ73rfjHDyfzx//Rf/0Va68Ol3scujKWqy2tJhNPnMIGhGy9khCTSMAwjVIt1kwEwVSBrvZDkKq9J5jmmp5+TPUP64LPuK1rSopZWhWBz3WBsBICNFhJlrUtWeovSurVeBBC+qUKlurUuHLmYTR/Yed77eed5M0d1qy4oFAA8GVfhpXqxXqoXQ+aQo1U5D+c73Ukj0gNg0CFDGw75ZkROsru/5+sXZWrBSh59vNb98/n+5vn+eH2stWDkSg5zKJhBEJgDJotzcpqA7XUhIS8JDwwCIpd8S5aLML37tOW6qupKJucBSQbDnH5OkuGcJ4NteAAAOUnOFz3yqvtWvQj9/CJN3a4X4TxvBgChlMFR6dJavm/bBGvJGbr7m/PkvaePq2LAcvV5p1sfL9ucAZjTX3/k/ZVpMlKVAxGmT0AqqVyFTAYTkvN0wvScA8xMxga7sFirdIVmgnrOr/f3v7K/bQmqLq+LCBWm+wD2pbqylnTVegHJoJis9Vn1Ij29051k9pNO1JM5Z2RsnzOY6BjLdYEnbZfKg9MUiDn7fXJmWsz0mRkAGwQmA64qUGZALk+/+/l1X3VfN9Bzzv4+z3N6zzQBAAh99umetIiUnt3nQWBZspxBtWRnQlpwXdecdhBFmGm7at17f9/3R598f/9t8/u//Y/787evv/7zef4iJRUzyRAIJLEIINJkKAFnP8wgCAAZAjMIq8jMftIBAEDXjRcSSfY7Z3oOgCpn936YRHOtJVPrZWq6GZYWKmlVLQyGKqlwMp1uEgYyxmCtkj0z2fv0zjxg7KSlS9H0F5R0BXePbDBTV5mMZbsIzDBwgQAjEwCEXi/Woj5Ul68LICez4aGAYQbABmV3pjMn3+ect9RomJM+SLiQsEcDCGMwWkbCwKQ3QCnTMDBo4ADMZO904OQ0GAcgXtdn1Mwg6/XJGfDrxz/u+yPP19guJidEBhsMIUOGBgZDQHAvltNNHyDydDND8LqMoWSjwZ4IZtJJEBLTDSGhh5CEGXKSPmfv95tBrpxGSBfjZBORJDvdqVqvD1UByOv+wM40Ao0KV3ktCAQMoIWdvCf79M4coZOe0wKIJfJkdkos0/vsh1HOw37oUUm6iBEMtimAEDgzjYLIjCiqJid7OxIzMyAEAAj2OVD4rusj9iRS2QawbC8t2a7CBplCqDSkzyHg63QTQ0kOkLEu18ogMEoKQAVgLGtdC2yoVeIK0+zDQbrvl5FrscrXWnW5yra9ZpgZMTPNRPZaa5Rzds853aePxFqrrpevK5OZAK41Uvk6Z3+//7AAZdoCDIAlk0wGQJ4ZMEl3h5k5mGn219/QVfr69YWppb2fnHhd//hv/9O89veuWq4b6GkAAGVwAel0CCXktW4yZICcDaSbGWytC9N9YLDxjYwLAUqajDxX3QDFaSLjRWZyeo5tC5VDbAMM8gIxA6TDiIICIBBLIpPpKJg5M3sUA3goI5IMmjnXpSpBejaM1wBnuk/300BmMw/dmUaoLgKZ9Mn7rSq9XtRi3ZQpy8oJM0DOztnMSYY5zADIa12l4hxkBlSyPSQN5/Xxc71+yJXu9IYAADEs+SVfzDBDQAuGWH5pFQZgwCArl+5PDLVkgbDz/aV1+ff/keTsr2hZBUNQFYCFjBc45539Bmu95KK7n72/vxFDMgeBjJbW0lVIYMA2M312T890JpInTILQuhhyHsLMJp29M8216GEaBYMNyd5z3tirboYkWqXrwpCT8+yvX3OaCMou48z0eaARQQFiJjIRnqi7n2d6tD7Q4kyeBkDp8VrSncBMzzsalhEY2WAEkvRa9YK17lvrIofM8gtmOJjpPuc9++EcmJCkJ6nrNSTTNuDuzuyZbQ+GaHpMmeTs6ZkzAANSppkeEiJUrpB1XVXOnCpg0p0Ms4HebaHA8rIcBU/ZtW4wErYTa9mLcV03MsQqByfpA43GqpnhhJSvT3tZDom4Xtd9v+qq5bKcEVF3M02wr5kzCbpwQTLv6TMZyCRkJpM5SLUKBQlAY6t7u2q/v4H79bmf9/v9q+e5Pz/v1z//+tefZ39pGUJiX8iZAABEFtP0IFMLkQ6y1gUmqC6lmDCgEBgQZLI3PSQekfSMq7AZFe7zkCF8v7+Nztnv778JuAIIPJmDwULoLjIMpDM7aUTPOecX802oddd9AZnJ2colXWiSU8vJr3D6PK/XK6eZWXVFWS7ZuORKMn1yNn0ImU0GhvPk+wvABugDRov1ofWSC1mIWngxnf2V500atz5+6n6lNxgbksnMTHemVbeuTw75/sp5SIPB8oVNk7MJYAQZAoK6sZF1vQjZmwyg65IMgxdpvW7m7F9/6a769/953y+FABkEMjIxAMAABLwIxEg9B4EA5EJGJhAhI2HAll0rgW6BvORKLCCTTmbCdHbvLZB89qbnnEMy/ZXZSkF0XdJFstYdwgwsZsiZ2aGrVjKZIGZGICGUhBxN7vXTLhAyZIYZdj8xYAAZhgFSa6ku1h056ZwRBoB07+d7nm8OwngomBYlr8yBQQHIzNcvy7PPPl/AqjXUvdbyZelS2TpnoJk+7+/z7OlhOtMTZmamTz8OVWVfGKATwBpZritYM5M5vaf769ff7+8vyKp1XZVpe9liAhikFuPOyX6cqC7wyEjz9JzNzDnn2Q/Ea8k+feYMBHqmkbwuLNdtFwEIzEQuLJfETCLx4+d/X/WZvC3ZLplJ73P23v2gzAzTPXv6CU1CsF3XBUrn+vjJBC+UnPPx+h3y1//5f+Z0+b4+P9/P+6//8x8wdlmaNBkJWQCyw5mTbjJ0Y1SCAZiRi3Kmz/OcvaeHDBnOyX7TT7qZhDARy77ki7LEzMl+g6/787pe55z3118zI4ZELuz0YdC6gfROmj7Zhwwgl1X2IpYXGJctGHLO+1eeLzETrBtepL7e36en1k251p1zAFmS6AFCJMNCwwyYAaz7hRczAIAAZOm+8aI7RBLAs/v9d84700zTA9brEy/ZINmgssvX2e/sL2T64Tw5T/abnkzDYGAwQPabGbyQJTEQwAA5YDxgrY98/8LOeSP047d1v+avP7U+f//n/7zWKwkBDCZD4DzsB0YurYIDoKV1kX3ONzlr3bUqvWHQoCEwoIVt1xivEswMRLYEKAmZGFzBTGZ2DA2DSpnufUgyjcCW1N1UuRYDfdI9QZRq+b4pmkOQ6D4EX1dpASK2sQLEQuOmuO+76oJDj1ZRzvnK2a6burGl4JlpbKlgqS5hlGRnDgMR5PT3nDcDcWYzMzvf33/iGu2cbwTGCJarZlo21HRP9yTYay2jSU+OCdnTc18fctLNdM9AL6mqJgMgZKkYJt2ygOt1y5z9FmWtVcuoSq/yhd050zvPmekoSZOxL6Q9+/TpPrYtA5MJQ3ros/fpyQx9Zrbxqpogr6olisl0n/OeboDp+/Vj3Z/gpBCWe+b0wAiYTGdVhZk5aGQQMwExY5UswQwevV4/vr/+yqpaH99//9XnSbg+fnz8/O37rz+7H9UKtsBgCSEjZTBSCQyBSQctZjKdhADYGpje6SfdoclJmhxA68J2rU7jxd6/fv0BIgCvz3/4umYGTE76kEnv7CMA5zT90IcZMpKQwNiqEsVAgkxHERPkul8wiQDEdf04e191fX/9tfd39htx+gSmO7OTsZdtZARADnMyDdb1YgQABAIA5Dw5b6YhGNbiuqyVNAArvenBlpUZ6HRPn6DuzjwwSXfvvN/sA5N+p7+YAcDSBUvr0nWTgQFhIwOAfOm6QgiqV/ogI+f9Ld/+x3/zP/5t/vhfifz6MAIzELARACLTBDCFXED27n7OeXIaL/mCkIaAcjZzAABmIkEyZHqePs/MOeeRpFVyua6rbuDpnUQu7O4m43qpFjUgMplHy0Fg1MmDMUuU1wcoE2NZCUmwCUzsO6hnC0PgmdnpMWXMhIZajI2RwckAzGSi9QLIICOjVdeFlnxprUwzAYeaGAUjXdi+l67XdAhoEaZnCAToPpFwfAmv8gdxumcGbNYMxIAWMzNzZk5IcDAZcE8DNsLAWrd1368f9+tnJsNMgiAx5cyZdK2q+67rlpgcxlIBy7Zc8lqvuu4yLiMAsO/XWpe4VlXVtaeZXmvNxDLlkKG97ul5f38nY69VJaszZ7/7vKd36EnPbIhQueAA6dAxqweIPFork+nuaVwMM8/18fH19Utzfvvnv5/W19cf3W8mv/3jv2NmYLlUYGQmopBJy7ads9PvOQesEjmUdRXs9BvOpC1cK9Nw5KJu5iCoxQQhFxHs0Gc/jKiFgJF0vy470zOanuYc1AEAJhO8VC9qISOYA5N9en/1+UZoFSIWtcBk8LKAUVxerrpeH/frY79/MSFgiQEmAZCVYiwVMlrYaCjSO/uhD0HXJ17YhJw3M1ovXTcyQdeHf/6zfvyOgOj+5L6z39lf2Q/nQHzdkCBgv/9Of6U3c7gXAEiV/U6/CZkGgMwhZsj5leeLmJn0Nyxi+ZIXtcghxz/+wZl8/5nn75x3ev+f//j/fP39v5vBDDv7iwENMpgZAIZeABlIrQ+vpXqRmTlIqBjlHDIhGMQkyyLMxKrybUQOGbzAlpBVle7eD8x5/pV+n/ONjtyAdBGBQMbr+mAtKCI4GOqSisSyfYEnPREB2LODsJBt2cU4ARGUeM5z+pscGK+l+8KjgT6ULfDt+kAXGWbQ9PtNfyc7I3LQ4KFjIV9MyOBlr3t9uPT6/LmuDxgSIyaasdVnM1p13a8f1+slac5Jdj/fk4MZT9N9TtWazNDXug2hB6a35aFnMhIToKOZmWnXyzYQ0v22sADUe9PT+ySAAcqqixLKWret3g/Y8nkOwV5OgeqqtW7bVRcSqukNzaT3UQLtda3rtisDpJZlyjHBV0dW2VV117rAEyNX1bqu8rKM3D1MT2R7zsn0wPf3FzNzZj9fH58/rteP5+vJ+Sbv63VLr+lhvKdnDhlAFjIy8hBcquW6YFELAHKahIYh3X16OsFkyGAAgD4ItJKGgNhtHGAGAQ5Mz6gABykYRE8zw8CEOTBMEEzIMCRJYhchk0zbKxlmZp/Z32cG+Xn/vff77NPnEbFFMtO0YdValiBkAGzKZAgAMRihEhlyKORLuvDtj59aNxEJGfaTs8OA2U/2Nxz64cy8v/r8TZXqmhFhXR/r/mHfXj/W52/UQgtAphYMgAaGOZmd/aYfAlgq5pABZTYZtCCyafL+oqyPO++vX//r//71//2/9OP3kd9/fWkKAACeJz153uSoChkBYCOocl3LP8DMSJILjGYYMpLokQpp76+emBoGwDIiIYchI3tN5rpv0MycbqWWFpgxIcmcIdK6AYTq0ioWyDObfnLegMoYMlb5KhBBrp6HGUsh8gACYxGvsquq0p3zPs9XTjMeZk7TB1n2db8kpxsgBMAkSYPABCSvJa9MZoYAJDIlLukCn/eGZi18KbGMPJ3T3z2/gJFOd8RMANvXumxLsp3edrmWYKaxQaYsWRWM1lq3VcyUdflTvmyjcp8T4/JJd5+ZOb1tJ2S/MYFhMCSQngHhsu21hpRv0MyZHhS7YBBAJq7q08/znZnypSqYIchoXCUuywwStpL0Ofu8Sc80MD1AukmHTsb2MOHY5ar9fu71Au33t+3f/vnvc/pf//kf53zf13V//kMzzEkfRPoggQhESYzlRUQkFz2ZZL+ZYUBGtlddNyCJCC8AgIWNA6fPFqJW3l9nfyVDDoBRmaF0TQIAmQbXWhgMEgBgsJCRKQO1ltYFpk+fYzsMwmvRfV0f9+sFsdf00+fZ76/rugMANEYgCSazw5CmDxgBaJXW0nVhp/e8f+V553wxIrCTfpInfbJ3pkkzk7OBnPf8+iPvNznyWutT1w0hI1kW8vrxm378ro/fwcygka31QRkbgCGHaVmUKWNzLWxY4qKf0LKSphQl37/y/sLFx8eqSj+S//Fv//P1+Vu6CZmQwcgLSDdAhiAp3eQwtm0XaSwGBMBM+aIWIeedeTMpvaw587aNCcILyNlkkpk0M1pLUHUZh8YgXDe6mZneczayrkVO9k7vfjY9IAKCjCiivX9NjiA5k41iYDIJ08wgVq3livB12+5u5nz9/X/O8xaFDYEh4IUKBobMzKEPIC0SD/hCZlRV1JIdCCEzw7ouZJBsQlxCgmbv3unM+YYYT6e7XVXrkg1hYBDINZ2ZCUUQkgtq1bIYehJATGaLcdUMcQ2a8wDPOT7nnHNObzKQKlu2vaqY5Gx7EZ/n2xaUFQkrQJhaV8/pfs7ePZsJMD2Ck2OrfFkGkt799H5UBuawuAmIqhuSYGnOfvb30AiXh0lGZQFgNDnrda1rCVwGnfcvle/7Y4hqfb5+CP/5n//71x//lZzPn78bI9lyuU+DVIsEIcAGyCSbDDOSAGYICASSnaEBIulSLnrgIMgQbM15mNnvP/bztS5hA8D+fq/Xfd0frmIaBIUkCS/pkotaSUNQEZEhI1uYGTTkQDIjgkhvGJZBk4hS3dKKCl+yXYULwNXD824mJEiZJgMww0xmkGFyNgpz6JP5hpPZ8/5KNn0IWsXAAJN+c75h6Xrpfunjd92f4KQtvJw0c5IQVDc2M+jODH3kl9anrk8GAAsvrRsAYBi0FuVow4TQB+x1Z3/n1988R76uf/z7j//x/8YUve7a884MCQBQsBYAAOkkIQOQCZKY2SQhBJgEamm9kp455/vZ/S1195lkJpkOmZ6qGxM6yfTOTGdcldn7fGe/937n/cYGOI9EeuiHhIj+BsoX2PWh1ydaM+f7/evvP//1/f03NJM5Z6YzU6pJ5myo6c7eJMxMQDUoOWHAXh8IOMkoMIc59OlugAkQNTSc6TM5MJkhmT7MZMZW1cWZTGO8aqYnzYwtcGbIsY3VzExbdV2/2ZLjWtd6zQSGzJnOHAiDMjDTk0ytIsHYAnofAJhsACsTiOuejoZ1V/Wku9cqoSGuUllVSCRkymuqtZZnAEk9SBZCMJ3humqSARChh+WyDWTCIEPPZBBGmQMkIGCsG5hwL8s+B8vCITIAiEZ4puGUK6zpEWQGUVXPE2ys6+M+zzzvfc6z1gIGQBpDZr+RVAAQEgBByNnyBYCxEWQQdV/p7csuYyctAcreWKoFljh9ru+vs9+ushaypMw8z3ZMlb12vz9r+fOToftdAAAAPWhpVSQAEbp7F8iFJRtbEszMnn40VzIw7/ffoHXdVZdtbLBk+ZrekYvBABCAHjQ5DUe1SAFI8ouBgZrQwvZLukkjwNnf9IGFR/fv1gsN18U583wXvykrfdJNDwpzct66PmSRARDJEKQVHQawADl9CFqfeX9RkxwY6aVUziaT3tR9vv+6zptaAhp9fOSc87whMIhahZzunLdUul9JmMMMWggABgSnTw+daZXEkgwQpMsES5QkSUzPfpKVPoARmJzJ1iDbZeb0tHAIp/vr21WqmRyLSGHmtFRKVKhe6Tc6acOovBRfV10fOZ1gF9OSg9d1kX16gpEQY6ZP741kW/Lrx8+zJ7PVBaDOTJ9HZyfJNFJ66JaCllcyB5CEevd79T2nMRJpdF2E6b33t+11bXIaTaZSzqC61+9r6fR2lWbtc+YconVdc2aS6T3T53zv/evst+rr++tfz9df1+e/j2BgAFwA6Z2QuZjp/evk3NcFsrGua6Du21cN47p8XYFJqy5U6U6260oHDqrg8lqvW2tBfN3365VkwCq7kCXPZPokZ58HhqG7wWhNgplE0OedNAiwlEHG15K0+z3nnP1OPzI9JwOT5/2djNCQnrP3s/f7ZKYnp2d6vdbrx297v8/zXmudmZnDtMsimZFgEJYvMAOSJAJ2zmZG96VVBBLiuj/W/cF16ypykobMHGZUl1Tg675geu/r/jxnmJPuJFet07t7u5bX6oYzIDBzkg3AUEZKd6cRwMzZ57t7QxCyvG4wYK/R1fvp8xD28y1RvpYXE2bIyUyIxCrVEqAqEsYwgEqqC2CSju9PrYsMBQw9yJTlC6zr0nXLC5DK9296fSYNF9K8/6Y3DM7JJOp9GMECIPhOb3JkYxAoZMggAAIZMuk3OjAw6ZYu6uZa1M2MfvwEATxPvv5mHmbn/T5Qda/rQzYYINO9Mydp+qFP+pCDQSaTDskwwKQzAzOzc94570wP6K5V61qXXWFO70ykwpwZhnRnZmZm2lamFWBCeqauG0gGOL3nbE5n2qD1Ikm/gZzNOUTSWuvz9fF74P28YWAEmT15mD49p5+qQkxGWJDz5R7PBSSdfuhJRxKin6/z/iYk6X7DgSHZ+zBo3ZkQgLN37+e8n3N2MjN7ZsNMnxls3u+/Z38B0oXVyYmFATAw86bP7MkwkldNArKKmZnd+6vn7P31/vrX8/y9zwYmzGR6p8/snbMzu/vBLq8K01vLXpeTIa1ppsBWTKZ37ye9yTQjFbqDZia9UbQKLzCxq1yldQGuAoDMmTOn5zxvK67q6e+vv3r/IjPAjGXKg4NxIZ/zPPtLUzSZKVAmwz4zM4FxMiPNJKtKCCqJQgk4sx/wj5//uD8+nmf/+vOPnmfSBi9PItlrAQhsZKHpISCTSW9kysjpYKOkd/pMD2PCzJDJdN2f1EpCWavqejHD5OPHv9X9mdOApHVdvi5h0fKCk27VXdeLDD0AGfmFF5zSIiS96uO+ftjVM1JJF5NMsLO7sopr2vt55CYZetyqwmuG674AwCrVrbrxAuAgY6ObtbQuvKQLGRuBTUPASe9wkKiFF0lOI/T6jVrkYOd5c0YqSKZthxNHvlQXIr3RgAEizuTspBHYzElv5qFP9hf9JEFWvbQKCUcqIOdLdQnTT7Kfv/4FMJP338tlZJw5ExKgywLoZgCGSR+6M5vMTEu2raXruoXJCKUHzcme89BMTu926rpuQBIWQElV8mVc9kzTyKWqdV21LggSmd6bgbRKPclMACDJbDSJsEHpczg9W1A2aaGZ3WcDp89MLGOweiCYyXm/+/thkA3nfPccrbIXUq3XZNK/DGYBMrpetvb+ytloMczeOV216lpWjMv3pPt5JK11XdcnYj/fPbv7YUDAJI890zPP7v017GWJkWs/+/vXn6cPyf7+7r2hJrv77ElSmmc/f7+f70CS4E52OgMDMyqh7u8/EuzLTFxLtZCtG1la67qRSBB2JaGPsbRCSCtNAIDZZzIzc/ZDAoF2CTPTEBvXBQie/SZzryJMNqjqmhmyxUxGCDRnkO1LLrvWumzby1oDkid777fqWnXLV0NP9/k+/S1V1cePn7+5Pvb7u+RVRZAWQyRFOSEkPX2mj5dnTvqQyX4DZDiHDGVgzhEJARiM6UmClrAkbOwe9tcXruv+sMwcOEmqCnDV8i297Bsr2TAIBGVkbAAQzmkClFWuq6oACdK935BJZw7EYg6nMz19HmzZKoWMDIQMUS0CcwCYpJEpiMHMQQfAC6An3WTonvOVrz/z6488G8z9UimzczYdzmFa16WPT7ywSCQTZGGDiZlBSyUATB/Oyfsr700PGMjp9AajJV0EMKzkcDZjbPahier9/tbHpz3przxf6alVM5o+03umleQcEAKCySQEBQIz08Oe2cslRCZzMo0IkDFAMofItm172UofSWtdUhCIzLGqqiYDXK8P+yLT5yHBXvfldSOfbrvWeoGRsRFznt0PGQBFM3M2Y4lJQmSprplAaiFNiCThyTz7+X7e05kcPDMwIw1yz5kZGOje72d/e926PpEA+5p+0AjI9Dy1fF0v1e3rRUnrqvqodYcMG+v18Y+1XolBVaUwc/rM2Xt6T47sj8+fXgUASmwZMoOZObLLr+v+vK/P8jr9TH8bBKSN13Wv65YMc/I+5xA1RYBjrateH6677g/ft7R6ApYLIl/yOud98sQk8+z3dJhJb+bAiJmePp2eUaZn1UUEWMzMDHMa5efvP37+9s+EibvTpyUnJ9Mzk8yqq+oexg6kM6CqpQSwUY5dsGie59t0XUtXAaSk1efYa1336+PH9XrBqIRlOx2B0czZ/d3nme7MYCEsyU4y86TfzKS31sUMM5AZvIpMznPOk2zXIoOMF31ydtnTx5KrLAEAENoS9LO/q+wqeQGZxiYwwIJhDjggC8Dq7plWrf3r1/vrL2AynLDWMKc3Zr2u6371dJ8nvbt3usvlDHMyTZI+k41AxksqDBpsXMmkd85mBpG0SpzJbnrIJM0cQK4kX3/+1/z9v5nNkPOmpOuDHgbYk7d8rfVJGY3qUi2p0jvvd+advBEweChThqUqbGwEmZydfgMwmSSbGWTE9dtvZ3/Lqz5//vXHf7z/+kNlBiDzPF9/7e9fIVqXvAgAMzCZJpPe9PS0ofucvWfvvb9neuaEcZkZQDKDXSrt2WBG063umcOIABOQBSQ9iWWgzz69I1ChwgtsnCAXwGwyhN6H7iRAhu6GyUzAkkAYIA3JMACke1khAWohHBiHZJLT+f77+f47A/KqVbrn7BDGz/uZ/Uyn6mZmZkdRLdXldSHrur1uhvW6bGfCwGitu16/4brqQiTHuOyeDsFKvK4fXheQOS5VrelnP7+SjmRprY/1+u33f/6P14+fc87zfpie3t2Hqrquqmutu5Zz9nTiWnVJksaAZIAZ5mQ2MzMtJumkFRGXigEATu/3fvd+ZwLIJoFZ6zLCJS2ADABMpmfPbGlWXWe/ATgznUSyhbUmTJDX0J1NmkiqRD3JDMpMMzN9prGgz3DmeaZ3Le7r/vNf//n99V8zR75WrV9//XHeX0YTgBBg54Sd5OxHllXTh1q4ZIFyTs5GZL85hxAUYDL76T79vEHIABkCg1x49nmTDk2GARYhwa7u/v76owo7IPmSLgYQtiQYbGxpKFMgAzMQzt6WhnFdYEUorkWQ+fz4aSNXmvNsAnL6zDm9N33Soyh98NJ6sW6tCy0MVVofWjcMDFqcYazXS9fl65P60P0JYXb2Zg5GKmJkraUsJsnOTM6c3dLKJPsreWe/Myf9xgsPRtcn16310nqxFgAgpJJET9KSyNCHASCHOdg5b3/8W9Lz99/++Me1PsrW9ZqZmfP9/TXJWqVa0kV9qG4QLqnKF7h7p0/ZFgkzk7S9hM77oZEvZCDJzEySMAletV513digRACyvVABmTBDMnOAqy4JGJCul2tVlWxQZvrseR6SdX+87p9CGFdZdq1ateq2L4Y+x0EFMEPVh3CfB1Iu2XW9mEGoiskwT7/3+QWs66euTywALc7O7GVLdWYnyT7n+zs53UcuqygM0oUFc+ZUXVe9IncGo57neXcG32BLa9Xr43Ote87AVF3gOZukdAWm9wRRdklaUl3Xen3cr8/r/nme93m/ZxiUCFVcM6rr8lq9v5ms+qj16TkPGRvm9Hn3fkfNzPTAkM6ca30IZQ7Mfd339Vq1XAUBsKa7qrTKKsLMSLbXWle5GISXXLWGqFxaSaa3NS5Pgga2hVWiSjeUrapaq9a15EqUMNkz7ZKrTn+VWiT7u8rX5+/nfJ+vPyA9fb9+7Jxz3rIsYTKjKhfTe6YtCzKxDCFA1brlFQCYwUZGkiQku9Z1fXyqFjKCDAAGSJJmgZgAMDBjl13X9XG9PiczAyRpOGTQBWSaGfrQk8zsNz0ARA7CSwjOnt5oznmfs8Ez7Pf3Oc9at4SEBWJRuHwZZ09PIq8knG/6kEm3ZIA+9IDwAsioLsqUWaW6tEpX4SJGofj88U99/gMpdBi8WCWXbAINOn2+/v7rP+f7L/JwDkKvT/liQAsAIwh46b6omzICDZx0M5Pe2W9y6EMPOXn/resyer7+yOT147f14zdEd0/wdb9+/IMqrYt1a126XvINSmJdyEBCn7N7RwNIZV9ey1L3ZgYsr0mA67rquq/XyzbKel3Th8QFMljSui67ek7OCE2iIOv9/jUZXS/KQt199iatsjCA0H2z1umTGeQJc0a2bF+X7ptVdX+UCmRr1bKXvA6caeHr9WNdL0dgLUeYtXxbQsPAZHSW1HPO8zcATO9z3plMZn+/J0NmP9/sQyfTYLLKK4Bsl2VZEee8NXXdP+77p3zXuqk1IRlmACykmYDsdb0+1/osX3pdvqtcSeac+/X5j9//2/r4HDRJ9zP9JHFddd2wRFt++jlz7LKszOzv7+nOaamKkhdRcHfvc2Cafp+vmQbLcllIMsAAjADPNNPJjgYBqNYQZnBZi1Q/OzRJMlxlG0myZaTuBoDpzKS7J4OCq/chR4BQQhxM6rpfpx+pruuz6vr168/pAHVd5dfz/pYDAWrdaKlhNmm7QiCZISFJGhklDDPIQESt21Uqad14uW5dL7lIYygDwP760szyh+qqS8mDBzmZ02eCucFCyNjUom4tySUVM5lDIMrAAJx9jJGv667r2nufs+cciBckM9O9z2yXrYVKsqowQAZpLV+1Fl5elen0ph/Ok344T553znf2mz4YGK6FDeY0HqpotCr9zvvvfn9ldp6/8usPSczk+cr+xma9dNlLECt33fIFAPItF+smQw4Dhh6CbLSQwXhhw1JdNChaBVCLa6GbM5lz3T++f/0r7//TZxiy90yvqmt9rvVxXS8EDEx6U6YccvZz3u/ebzgCQyYzJ9lhVJe0rEIgZFeVQDZxjlyueyEnIIVgSzWYoWdKV12X65pO75avszfnAEAzmPvjg1qgyWEmGc4B1lrCYKsEA52RhLBtF75cqyo9b7xqvQaBgN47YnqYsQ2u14deH2tdk6/M29eH6/bF9AaS0ar7/rHqYtkymYXBM5NuBHJmwhEkp+cwWXWBcXmSRLqq7sCZmR6P11ozs99v0lgDQ3td1Fr35Vo0M2nQROlkRku+7vunLUAZ09PfEMLZ3zN79leyQc5pkoQ+WzYwpOSqZVZRZSWdBDJzJtN9phOEIHP6wSwvO6f3MKcPwaoA4r5ubLHOJKaqtHwyMAwzuEoudIGSwIF2qVyE6SaW11plOyBm2C67PqT1+ePfpXufx8u1Xt9///r++jO9k11SMoznzMxBQJJB1WkmAhAAYElGQrKNDEGjtWTLRd2qArCBTDMNQoYh/v5+n35UQi7f8kKGASwBw5DJQKyIsaSkkzBgqxZeSHJhk/HyzDCjkmR7LV+9n5lZ/sicmcfoPM/319ck5zyZAc8gNN3MAAIYsNZL6wKAzM7z5jzZb2RqEZCRdS3ScJAZ8MJGRq51ab24nPM17195f+X7b86gJYv4uq7u2edU3apPtHT/ZF3MSIsMfVSFjOE86UMfBmrBMGgVy3iSk73x0vWilu5XzpP3X+u+9tevP//1/4sO12KObdleReacoQfI2czJ2XTbLksikz4dkCoDIKtnMrgMIkMgIwl09p7emRESYqjrhkoEgNN7GBGvy9YkLvt1J9hV151uzkOHAYmgZF231mUttJhBxga8pJKAuM/u/UwAwKCZM+dX5o0wdZGSnJBxObPntBkyDImyz8wJwJqR7HW9pk/2GwmcGdfldT37+5y3vWSFwIg554lkL+jORoVvBsqjtuh+ENf1aXz6O9NgYcKq6369apVw1WtdnxSak31mMmIGKLkyp3Pu6+Oue6bPPmc/mQFykiQZy9K4z56Mq7QWyelnOJ1GYRVVykzO9JiFjJkZya4CZwZYdTMwsQuxarnKLtkhABZ0rbvWta5X95aQbnEDAI6rylVFJqhQokOFBEESCS/wQLjw6uc9c9bH+v766/33n3XV5+c/r+s180zGVNLpbZddM5M+dE+YxGSy+xytS3XNeSDYEAQSc6ZPzgGYgwDQSEWf7DdzkkDYT/YbzX1dkkRgwFo/tV4YgqNVVfWSLmyYTGDSmww9SRMIcCRcixmYqqtWMYhL9XF9/nj9+L10k5lpFAuhVXetNft9vv+ERtYyUnnZRWZ6MwNoXdQCGDTCppYkMpzDQGAmfdInaRgMOfSojEBL96euH/r82TkIfXzofmEIqILe718z47V0XdgABIsUXpmGkV9A5k0/mTcMQEwAk0GWXumNIUMfOEmnmzLyrY/r579r3fM8rAIgvY9tamED2HgA7ICvu9YP+17rQiXXqg/58jK0LKzJINM9+wSsgGWfPhOCpgcoF5BsmDmbUZ/u6Vq6r2VfEgaqgJxd18LM2SgBxkmQwcgZ6JPeYECInJkjQkYyTDRgcM5ButY1yNdC0909bzLYrqsQRiXXpXP6/U2emSMbYc309/BMhszMEfTz/f76c3JYS4gcRHmpLqQz2CWXSrtnPz37OALZVgYJsftkXfV6rbo4rYlUdtFIta4bLclkhETsyyWQrbVu1+0q4JwWZTEgF4zkREt2MslU1XDoI0TTYAboGclWYYiZAEi995Baq+rONHDONnhdABHGLpLDAXDV9fL1ymnG6WHGKrSF54yxXd19pu9rZdSnvVTrogOTkXVZM0ytiw++//qv/f7C1dP5+uWo7qvuq897eiSr7jmtCwhhpsNYwOAi7LNrbV3LsxjjAaSFmed7UK2XUinPOQ7cRWa/f12fP6ilMT1oMk326ee6Pmq9sGNkAMJMnue9Pl4WScsgEAxomAVAAwCkzx5yrRuvQAbc++n7c6XfWi/NQmVVEteq14csJ+8+MwPA9DkIwNdr4P38+tCSKmcLCJRhSYMXgoCCQUMO3AAY31qvTHJaEV66Lmy6wb23/cUXAE32N7hH1/pY1we1qEVADS8GhO/fZibvX9Q7ZwM5DyT9FkWAoUFDLFeG7L/TcEb35Y8fvn+mPl8f/yn1/P2Hf/63SZaXrDlbaY3r9clABpkZrTt7a5VA60MGxpJdcsnFaa1KjxjXjay6fA2OAKbTTEL7djIzJ2ch63rZ17P/vucCQ/XMs7uuLgNhQo2uy0wIUs6JSpBk5rFIJAkl03MeEGVLJCCTIdNz+xoZLcm6bq87cPqpjNK1bqQkZFSL8XTXSp8D2c/7nP2S5uyZFBKQ3s/uaZdfP/+N7rOfV2bAMkQ2wGhJzCSb3M/7K0bJIeu+lZneZ/qcQzCWPWJITiNLBdTytT642nUD3S2AGcau1+tj+uBYJcmZ7vcwtrtFprsZXNeayXRLMrYWI0nCABiQBAqaOYBVIjN99qNQVZOZtEuTwCADQpmZbhAgXekJQQgm6flWbcuZnmmcyUFc15Uh07ZEkoRJxkRle611WSNm0j3nWkvl9/6e2UMH5hyLzsauei1V0iCQbMCu0vJaq66eQ8CLwAwlVPKtqnXdfv3Ai1pJznnSSTYE0Lr0+qQWtWbEgHGZuhnbxUx6y5ek53z1vGeeyc5pMvRJP+mGwQaSk36TzGkxSSOgx6PrqiUyz3unT+cN8Vqg6eMqaXX3NGghI9tGAjJnTjOEAAAYjI0NyKKW6tK6db+0XnjpurRe8oVAgyUXsqqyNzPURY9lJgiGmSensZisdVWZDDOS0oeZ5El/Y6lec955vphhQsSgETPZO2fnfOX9NfvP5C2V5lK99PlT109dPwhaVffa3YDsVZeldGd6svtsZrCRydCT7pkRhKhAk4xUtjOdSdVCPr27mxkA2SpLPR0QEQmT7ipDsMHMmf8/QfiaY1uyZGl23xRRXdvsHHePR1aiSBRAgP3vDxtA5p9EZUbcuO5+zPZaKnNyDE9XJwGqWtZ5JgVFrxcBO2cIXbtqAXi0dl8bilqqOMfzSDhHoiippJKqKOOqNjhjx3OA61rjidNr17qgQIwhSGDDeU4IwIwdZwCQqNay7ZmM1d3Xx+vHH9jn3KUi4Ek85x2f6qoi82BWSwvrmfN93l/jc99vn6e7W0KQ4/PYPGTOZB6KOc/z/cvn2EcdMmklk2N7ACfneVBVF70mdjLjEKc8hlMOXYWwI0CayFFaJMRdVd2oJKrX3i/gPM+Zp6pUy8Q2gmZt4SDZx/bM2GOfqq5qgJi4toRQV2+7/TwlwsTTpaprHt/PASDHz/gEpzT3bT/dC6Sqatnnul6rX55JU0iq5/0e3930uhLOvAE8x2PqOONnckp7Xa+1NxIYGRUGG0EvJBpsnum111qMOfaYGEAgwwnjGNoOMRwaqqQGhxgANPggAGJaWpsCQW08GBBClGeISVqltatEVdeLiXyIbUMAYK2+1rW6q2Amz4MnMzDJVLH2BUXQ2lRRBYVNAGkVJVSMqUJAU8p5GOf95P0rvjMPCQCl7pznzJhobX18Vi1V0atazoBQ4RM/2MT4wJ0ZrVf1S2ppA8h57vgdPzAQVEkI9IUWWrp+6vqMH3LyfKOq2lWXVuf5HmUkkhI21Q0FRRU+Po96l4SKAAZUpRbYmZwnmBhByAzzJAMi6mpF8dgDqFvIHgEYSl3Vq9clJAqpS62OIUEg4+PnTUwSUtUhpKqXuqmrtKWtWvv10a9PrSuR1k6YGYJQSHJ1f9S1oWZO167ata61PyAEQsA5ZNba67p67erVe4Pn+51J1ZL6TJCwcUJ8budJRg5AOOeZGWWSYz8n4xjO2ouMj+d8zfme81Svqko8BsG6YpKRcG7nJm/7PnkePwjFZBQMpWCfuFZf1zZa/aoqAhPPIwxl23YFqsqZc+7xgbIdqVDm+NxRUVKB1NV1XaiQSnXti5bjKq1eGNsontueruruXgupSlUlLaWhil1aXTsHz5MyKtFIgVKt11qrHUJ1L2oJcKhyEs8ZQ79eP6uEtK8ftT4wa+21PqImknr3Pn5A1csEVGipe72u1w8AQKW1w4kfAgg5idZC5LyjBwJFLamJKGLHDz55f2emWhXnzOoLAeQMBlU8JV19qfZan9SKAqBSveiltQE4Wi+tF1DdQkIEQjI5T0BrP8/XOd/28UQqkG3Pc85Te9Xe8TNzJKk38Ly/n++vxCpqFSUCQBUxGJE5ee48dzwgABWAQwxAY3IecI4BIPc3M6DuBSVtrU9qAb12VSdRNVUIBBIqWNx3/FBKEg8Osa4LlfbW69LnH/Xxr6JFSRub3PjGRoV5vv7OecNUF1l//+P/zjxdFRT2vn6zIQYUoVX7okvXh/qltYFkgExsVzWrz/N4TtGSUsBEGay+qDZG5YgIOzEwOVDUpUDqnEFVpZTshxnVgvF5Zw54zozHmfEZhjEQCoMfiEqJ54QzOadWAZLUiyQJ49W7qgGo+5leCBgzU4g4QpJ9Mve53wBVx+MhM5Y9p6voLnl1U1CqKmXm+fU8f5/7+/n+Jzl4pKpeUvvA0Nqw7HSu1dvnoP74+LlfP4pWVa9Vas7znLc9AOF+f7/f76q994e0Ek/sIVarSt1dBCxLoBQwhT3vOTfqxKhYr1UAslnlpAhLJemcs4Aoiaq7KicDBG117w5Ua187ec6cc2ZO16IKp/fFKk1Iuvb4lKqq4wHOGZpMjt+AahM8JhKFqFprt+cpxsfAoe3ptUsdu8Q5gbanq0HnHtC6rn19nvc30P0xc7egrpDVa61FkGql5XYSeVk5QwBQab3ihzmqHYNNgmrOo1KvF6LUWlvp3A9rAdUXMPPARYoBCkxMqCqEz3iqe8142dRCZpwUAAaRsKhuJ7221su//uJxbUoL1jnPun5ir661r/fXjaoqeEbYb7Ei0WutD0kQVDEqAahzRsC6AIBa+GCYgw9ALZXy3KpChUwdytpba+X+RiDYl378+Cx0/dB6YdPQJQlp1YbKeZNQljp848M4DYYucqBUr/jBaH/CAtQXc+gVv8WhKzO5f6lfmHhktF4WfuajX5mH3lKb0Gu/PvDQqJUH1lKJOQBrySQWQEFRdewKBXicAwoAsTPhqkSItdbaS2HOg1TSPG9yMMFar+5rzm3P3Pf7/evMAVJNtbSo1WtUxXhRBAr1xpPznnkAJWEgAXz7nLpKq5U5Z6qoMhDS2VRVbewSIp7n/fXr9fO3VKp21SLBSVIqG4EobNfBXd1VbQ8qdbfWc/6yH2DmOXN3L+KcO9UhZopGALvXcIw6VSpqZR57FFX1ub99HvuJ8DnP/eXA5Pn6fvbffp5MGFGiKiGAevX2zNiam7JTuxdAUq0eujZoxUet7halqnO+S01ynpuwrp1n4pE45wEhuhYEom760lV1PwxSO73rRSckjhAEKBUqJwXAWlUFlTCq1bWFwBHVL3AcqSCZJ+Y57nVXrTPfmAaHYKlwO9V7ryo50go857vKqvZkX0vq+77P8wWiFDhzr7m1XzhJFKsWKmrlvKFUOyfqDc7zqHfNk0zyoDhmEg221Fqdm/v+mnnW2lqNrRK9AMA4UOL2d81nARQ+yaPeTJCoIqaAJo8UBL1sVwQV38xD0r2oCACoktb+PJn76/u832v/gOQ89j0+J1mlFkA8WhfjzEiHWhRgKAQCggAyQ5xAilrYOaP9g/XiOeih0NoxqHVd1IIIIXLG48lzvr/Nc338S68X19JuptPRanpzL54bTBUprSYgJDEnPnq9uCv3m3UpoheYWNerz6iuqv31/Y/f1/X549++/v6vWp8AGaDXwkWtaLDjIoNakBko1Stzq3tloxIQj4/nXtdVKE7OQwTHntJVlILz1FpJPLEONpS1iq74nnfc5/6bCDWke1U1hqrq9nGtphoHQRV+ANWe5y3oKlWr2jMAJDNzjvBaW73P8+3zQGHPvIefJpFsq5ag1KldVVC1L9GIHz9+V6v2girpfp59zpnxHEnAM99jrv45O6oSPXPGt6IzzUBcWvGoar9ez6OqVUUQiTMBFc55zk2paMKct+3qHp+g+/lSRkJaMJnve2a9PmDI2E8jZ3yCjNJrnTmYLuw5M8vn0A/UzGlWqVHPPGBjAFVmwiEHKS6xKYjRIkD1a9cpqYBqSKFIS/K5ZzzX9emkCDGhpDlDTumHak+mPKsrQIla8SlbEr2rWHJVJScw53uYhKKhIdXd1ZP3fd6LP2buqunV54xK6/UBJfnYPkEgOf2Mu09mqgSFQAVAkaG3AJuCqniMY5dNgHjemjeR9gVFnpzntbZ6Z0YSvYiTQYhSSCyohgCmS9msCwwQI9FbEr0kMsN5kxgTk4CrkOSZ8aywr+v99aBaVaOn6ipprSbneb67FuCYTFG1FvMgkeRYDS4augjMkoBGxmBokBmzLkkU6sW1ydH6lF4IunBy/00vqaGQk+O5j33tj74+tV7qD6ogAmwq2KpXzlfyaDVc2EAIDnMQuna+7nz9yefvYmHTS9XRn8B1/fb3/CdN78/n/E++/kue6nYmNmUQAAtMb5Vygg3EQyhsIpAI2LEKKtjOzICwqxoYz8ydeXrvMGeeWh8U2Ag8VVz7Q7Wi0CIudc4M0/ultXPfVOhGmzzEYGKKGlzq7mTmnKWSqtYSCAHdjVTVraZGEjnf9xvwzJ1Qdb0+JKDWtdGCWvul6zPPXwFpr3Vdrw/s0nOe75m7ussMBl6vj9U/jv36/JEz9v08z6rdJTmknFCSlFDNXoVBRcCo8DBnFjXPA9bEHuLSR/ZuXV2v43fUNABgv+0zHtslYlerJU/FpX5JN9XGk5NJJePzrFp7f1LFaufczxv4eL2623PmHFFQ0POenAcMpeuFCkr7pe7aq3bXapZmHkmh1LtL6lUlOwAVJ1Ws2s2Co4L4zPic8/4mlhVuqcIeH2lAgd2vdX3s9RlrfI7HGZ/vmec8QzTn7fmWKJU9nkNKcfe+rh+1ChvY/VFVyNUFhUxCFaDV0Hm/qaIrE2ziUreaE5+Brt7nzPhJBhWhr6uuFwigF4E5ogDJIQFVS/tk5gwhPuQBwBiAGApVZuY8AAIF1ZnBrm7b9/Nd3axVezn2zHmeaJxz/EittddaSN3X3p/iFS8oEmwiadNFQcy5senFWpmHQEEvrRcpqrS2Xr9rvVBj0ELJfOd5MyffX7/+4/93/+f/zPuNTcY+Yf38+d/W+unnxoc82BAIVQCYveiFgQUGExPjQxWg2vr8nS6//2YOVapN7AxEVDhUE3++fnx8fhzfPiNAAXJuBkDdqmZKEpBzyMAgwKpQgwpq1a61pRKU0lVJ7Jm5VVTFk/N+fJ/VvdfGxCPOSQZSULxeH6vW2l1V5xz7QQKAWhuEn3O+PTcGlDmTZ+0Lac5xnMycOc+xh6pe2w4BZHsGJISMzhSsXlIZJ5V5J1G/KJsBIJ6jVlXbsQ3KUK69PqkqNafGYx1QnDN3Xx8fr59znrnvMGjm+Z5zU+reOE8ORYELa/w85/m2n2rZT1VVNwaqtNQXVRJgxfHYoGUD1bVWL+B+3nNOr2v1JSi0+lLtOD5P8FKWqOO7wbGZolevklSdpLuqK3i/PqhFAkM13YB6s5S3qch4nsmc5znPe3/8ppZCqDnvouy0CtuOamUea+IIAVV1nrt856z4vO9/rP6husTjEGutq9buSKJfzLnnZM458+ucX/v6+Lg+Z3LOkdZMzvP4AGWfZqPCzPNIogolkUoqEQOco+sFpbXCO1+/9PpQKw7q2ChSVICp2h8fc99CGIrWPloQtaiFTRfdUkvt431Vqz1evSBEBM6gQQWAgHiIz3M8Z31SVWsvqiRRBenutTYAgw1Za5051+vjfr+eeQdoICRVPM+7CHiOulccLdiFYJwzWs0u1ZXHKmVGvXAYA9j++i8CWjn/K++3evv5vxE5t9YH1/Xj//h/Uh9ia+0c735VoCtzz/suCUol1ER6XUC+/sx5qMq8udHaFABzAGoR4qCqj9/uP//ZoLXzPJw7xyGsqgrU8aPe6/Vbqc+cS7hUM5LBBNzgJGBwZLFQe942tSSWPSXULYqqjG2qYKYSZuI5s1Rtp7vX3t2ApZZ29XZcqirsUYkqRO+Fo97UAgH4hFR1rUWBW8rc362taq2uG6jqws4YW6hq2ZEPsPYlNWEwVbXWupbuJUltnnre3+v1QJ37vV5GrLUyY08VRFUFjkCtujIPcJ7HBB27PU/pj8kDEJ7nPue7a895MmetxXc01FVPpp63otauPiVV1X79PO+3vr/ClGq9Lv+61+uq3X0qM52u2uq9TFWjfs+bebpX5pyDwX6b58xprfV6nfPrvP9c6+M12vn1dTMgSElV7fj9/tXrVV1x7PPcd60t3LV1NXbOm5RerevS2vc/vuf+vn3nOTHP11/ruiS6X+c+zqMCIMwckuAkUjNT17YDTJ46tz1QcEoeitRar1rbGXtsL4rq7+drNVfV3zlaPYrUCYKqFX8797W6CFgloKsfP2fO1XvpmnNnR1pkfB7ifr1QaW3P4TyoiBBV9TxPvYCUyIz2q2qoouE+qAjnuffrE5s5yXC+ksxJZuY8FMmUUioUBCowiGo82FQRn+ebDPeNqNVglYjPeZzHHjAoSexaa1d5svfPqqpqajmec4LP3BVf11WMZwhM84ZezJDkEX6oO8937saH60XIuZkgU6X1ookfqpDrx7+jOt//Q3b99u9U5f2L+wao5QQ154ln9QdqupAAAoIBihyqtPd8/dX8puuFChUAxlAHw+F5/7mvrXVRZq9ai+etSHXhk2fiA6v757VfGEKgunObmNUYeGDOPAWAHRDBx1WrtMLJhF3AWhdj4pSsRE5MZGVVretjvt9pqCvn/fi8oKNxzpm1mHPO97vrtfaPzBtKUiRUqEWrIWRCjOp6faCFp7EV210VKaUApApVCyVpBOUZiKpROUFSb2Q89uAbFgE7Z9TNuc99X5+/uR2PensexV3r+MAz51s0ovdvnp4Y1ev6qPVxzrfSva69PzH3/X3mRJznqfvu63X8oCWt6pWZmScZNNUlVMrxufr36/Uj59YinbX3NR+es2o9VWJfr33P88xdZK3rnlsheTz748e/XJ8f//H3/1hUGWr1nGdmVl9OKsHBwRlTKueAhSfO+WbeJN9fv6La+1Jvg56na77//ocf//zt35z59ddf13Xt149emRMVCKo8Mz5ilEXiM6enVFWrGwSk+9P5rglu1Vp7Sz3GvquQhGt1qTa18dUic7MXiOzqngyIVXaWyVglwPNQBzYSlLqlfu7vue/Xx4+cwFvrpbVyjqo8rti2Z2InQKmacM6zXy9qPd/f2jtxfMDkzHnH02UgDAupzcx593zsj0LYp3tTFx4whMB4zlldM+Mcz8EvZjynAZj7PudZvWBJJqXeap73n+c8e72qLlxR2w/W548/8ri7IkulXgjGqGgwYFyUIeoOcH3wvrWu5Kau+v3feR62av1L3l+5j9YH5v31/fqsjvPnf+X+Yq3Mo950ufucJ3P3a8PhHNYLOzPKxoCpIqX9e0+eX//Y+V2vHwRqgQEEgqZ6vr//10dd2i+9PilRYV/vr195f3luVLAoBMRVq64XElroJIOJD6QcrU2VMCXKDgrQ3W1DAALVFUdVUOpVvbs754EVx4YBo3RH9iRLxDPUxnq/v1fX8ofUyZDQC4xlnxL0Und8kKnCRkmgqqqJY3ctSIxHZFYt2+oACmSMiT1wTqWgIMYEakokIylGVSp67bwdgzCZea6+Vjc0wc9zxq8fqtpieq/HR1WlUrUDAvC5a7VqPd+/rtfHWh++/8ZBCMAi53l7DJznLb6xoTNQrbXHDrGNpapSl02v5zk55boVO0i7aiUI9rqqV3GCH9tde/UuhVU0aEpdlG07RteP367/8//1+d//37VW9Wv/+CO99n59/viXX3//43//j/8P/nP//Px4/Qbq3av3dV3d1zwnjlQ5xgdcokipqhpq8sRGgKAFdgBoewMwc27PdPXqBqEOiK7+mFq28fj+5nmfOYiZY/v6+Kj+OMnJIUOVYzs5z30/nlElmeTJOZ5DlVqkAK0G5rxVY5hzjt+Jqy+JZGCMYWHO2DNoqILCrlROcAG27akqO5JKoiBAYFRNKefOvPHg4zGm1yuMz/EZknPe8S0xz1NSXRdAoCHOHMco6lIJ0aqqNZ7qq6/LoF7qpdenrhd7aW2pqdJ61Y8/9Ppd+5P9oetVr9+1X3r9oes39afWKxwmAIY494O916vWDzzJUAsV95N5yvF5P/c3BJmszOABkHlChYKgkiR9/KYWgIouRQTKDFLz+nh9/ltlna9/xg8giix1+7zP/XXf97pebCvnvv8ajhBzYuu1tV4AGrUQWlv9Um9VmZlzl4ISHmOV4iceRYFzDsfS7n6Z0EjLMTlVixhuqojGz5PvZCTW3vvjQvOcb3OiYm58pFZvCHMnpgADcz85BiikXerqjQqgFGfmoSi1x84gwMzxPcoARakqOfg4KUSMQwKmVhiEuhGqIkujzJm5U5BGBQXF6Ly/7TPPNx5UpRg7Od/f7/cvylVrr1cBcMBVqFVCUMBSOhPVXv259me9Xqs/SlK1cjGQZqpV4DkH+f7+68wbZ72uqp4c+fak+lKVnwdY1y40PseeqlprrbVXFQg1ipbsgbN6q19EdPXn7/36JH1dn5D7+cb57ccfa+18P7X2zz/+1XPse3286rq665wnttYKYFavqp7j5/wCl5aqEAgQqu4Lyqj3piokcZjkSJS06lV1Bcfu4BxIMuM3ntpK7Hnvq7p7SZYReFQUJF5dJB7nGah9fXx8/gbkeQAALQkloguV+rVf1RchhEC0+sLG7l57X9AY6qIv7b0/f+r1GZVahRDEBHtyBgxNKh5sJlDjx3nWFkWpY1HtOH5Ico5UAQg2fs77l4zPfZ5vGAEQAj7nLq1FYyNLQSBjw9J6Efv9Zm4CMQAWRch9o9J+6fWDrpw3NiTnyXMD5Mn51XvB8ftvvV7sxTgZMs7xOVKpNrT2S9cLhUJrxY+//gLDCom/gP3j/0AblWqFMAZThi1dWh/X578mBw4IFZja1/45z7HvbmFLqequJQELIIWRNjTVSKrGzjwQqKKdCTO+v7++4oBUQgo4oWryTlzVYlV1qcfnnIcECoyCpxxUmTjs9bHWJV0yEmBwMpkhqV6qi3Em6i2VwH5yHkgwhfbqtTHxWCYWpaTUxAh7Zo5TEMsSKpBLrpIz9u0Y7PmaOUiEcwY8c5/zPY8TjW0GqVfXapR53ue8PZ5ze94Re+1GKSCwJgJKSnKeb/sJMzlB0BDWolf3de2XWNWtEkTKWl1VPj5M7wvO8YMqQICA5/6W8TnKEWEcARAKVbGSWCGcOeccJrZJkth5ni/7xuT9V379U+tnvX5Tv6rW199/ff3zv7r79eNfxv39/FJ5X+0MlBAiiucBoSIAVKmXI7A0vV9Vi0BSVbV2rVVarWUUVteLtGfmnCQnjoKxMeWoeruk/XLi83RdvT48KZaKMK0d9RjtXXtLhQwhDgYHLIOpoosxoOtV+4UNCWhtlIxtY2NXl/YGx0fqUgkDYKpYBZbBAJGLjjPnjidOHGxsxnShqm6F8XSvql7XZ6kdU6reoEpjqpZnPPczj+d5nseOx7Y9xGHs+xjXbioErYUWgSr1xgUIo0IAAL24LgpIPPED0bpUCy0MBoEq58nzSMvnzv2V95tzwFqNGlTrqlqokZARpDAYBL5zHnUBGMZocb5zfyWmzCoMgIY5gD4/1/Xy11fODUYmj0slZR6POZ557BPbDD5gTDwIdeMWnTmZNz44VUUBhWW7CkBV84xz4rO61QvjeVeqqkFAEqDUxOCSkKGrlZK6KEGVmDko1ALwIU/yjI2HAFDU2lQVig0RhYMdFAunEmeGR9VVSQ42BUIIhOMZG4wNFKXxmfPGkfZeH4RzbmJRqrKorpl57q/zvD1T3dU7SVGltdZ+nvd5TqI4VSzVqlb1XrvK1asURpVatO3AZKipEj4l6NDgPOddreAzhwQdMpnnzDlzUAeqV+aOxwyEWtVVUhyVqrvEgqpqRX4OavuAal0AYE8VcpcEznmYgx6uT/Z6/et/f/3+b1Dk5P76+vufrZ7M/dygta73199IqJ7z7Zn2x8fPC0g3oZRiSU3Gc5AgM8wMSEpRQl0XMHmqdvV65gugZHJdH+PvFKG2PosaA7M/XkFzv9e+YAJdSgYVdPeemTr3qgsMMI4HQkyXJGphAwRjXA4NRKoQQlTFCMz4jF9QBdVAziOJfaFSaWn5HD8TEFq9VZIE2FPV9KVM5lEvVnHfz/O+rp90V9daS7VLt3q55OML2RYpdfUG7DNzCkqoRBVVxBIg1AAYFRSC3DlvKHqxKvNIjRYEIA/znQd8pM3HD/XOPPIwh7VgUej1W82XStovZuJDoW7BqtYqMcjxiEKmFj4U7A++7sxNLfXP8DA3XTzflOiFFhQhfqMSOzP1+Ye//s7z5XN0P8x5zrd9JiCSsX2e9/31V3WJKqBARVW+3xBUIAiQgNXrkmpmPLN2IccmLvqxC6GU5JzJCZEqGdBau3pRK89DUt3ay4nHXT0JHpiZe/migELgidVr+0z1JTU2AFBLJHGKFjPH54Fa1+XnEAD7nHH3xbrquGtVNeBj1VIVdtcuVdU1mpjMQVBASl1S5qxe3f2sBTAjsJ8ZulW9Uo0qxDNStTgZA6Vjv+xatXlJBN731/hRpaa6u4RtAsWZx7D2x1qrVOdM1bFn5unqzHM8RWH3vt5+7DAnAKZ275d9pHIeQFrSqsDJoRrkpKolkNZaUhWsXvvzt/X6gQ/H5zl5/8r7T3wT63rpeqHSen3++KPXD7Fzzq9ff515AE98nhJgCUQSRcmZ3NGCBZ557KnSc+7nfNnvZM6M510NTEld5XFV7dqiCoFznkJK1m6oJF0/1vp4vt8zZ+39vF3VAkjJ+MSRCsoxIEDUWl2bbqkJ2DmT5wGqV5XW6lIhAlVVa1GlWkD8FIE4dC/1ZkiiWlInM34IMTOPqiMdTxIhEdRUQZJga22xgLGhgCBmnEHUWjRO7EHVvaiChjzfX/YJlhpqrUaVkHHOydwkQM5X5m8ELHpJwgeRGXwYE+JQS31BZQaJXlqb6mTy/sKHWHvX63e0Mk/ON88NBaVq+yQkjWG+KULgxJP7Texz8v7iuZNHvaml1096JQ8xPhQAY0KI6DwTP3n/nZg57PW6Pr6//vm8v0qlaqi1P1Dd50iiC0rdjPHJPKi0tnojBAmoaq0SyfE89gEDyVQVQOxknidz40jq1SS2kQB85hyoroXVqhAnJtXbtn0yBx9sT6qKSFVaTVcSfGIDql3VBAy2YwQquhAEJ6hgSY3KSXVVRCKQAAUIqFY1xX2/7/cXGuyqrrUcO0mMQGWAVAmgVvWqrmriOXNkzvtRVwpVF+S8wU/GYe/XuX+9//7ned6BIrsXo4S1PkCkElD33p77+C1chWcM+/q4Xq/VvdaG2CZjotoADrRKwnMMYamE4zfJWq9a7aAq4lajmhntXX0lmefJvJmJGip+iElyv33/ynn7zJx3SdQF/uuf/3Hub2Ji0aGqANSdGejqH4XxsUuqqu0JTlGl5cgm9AyJbD/nndwiUhGZgRIL8Lj31dqJVV/hfH395TNSG0M5FBI9zwlee1UJBDV2fAB78hwAyPPNHKqoRmUS7Ay2qlRNlbqpRkWo3onPedthDqAWARcgQXWt7u5aXdWrXqqGQIPxAYFCMuneva5eC0zInMS2hYpevdZaVSCQQV0QDOf5RlCFbRBVtVWa3DMHCUrapKil10+9XvTS/tTaAAVVqNSNltbW+tBeqoZQokTAB9D+zPud+8Yn33/nDACGjOd4ACCBNJSk3O/cX5xDrAw+4MybBEraun4yZkzAh5haUORBBUeg2uccKO3P14/fv79/needJH4govu6XvsTBAsKg0Cl9aHeUBSoqKLxPD5PaSmBCO7nffwEBGCgJMLMBKtKtBPbIQhqaRXxcz94gue+AZtVC8CxHQ9CCCAOJCEHH7qESSBAIcDH9iGJI7qqje0ktp8893m+4+PYMV0I+0CqunsRmHjeZGot9WfCmYMKYfvY8zzMxHnmrurXx4/r9VG9q7oknK4lWbhrF52EJB5iqqiiq9TOdL+q1zOOutfl544PtNbu7sKZ+zzf57nP865ozhOjfaXak3RXdVUF7MilxPN4HueMzcS2VAWKGrmqVl1VCy6bmQk25DieHIeBIgFUm3M4J+fO/becIGdg1Xpd189///f/69/++/+1rg8YS+v60WsdD0T7dZD9kIPKyJmqXt1Va+9L6jMm6QJMbmeckHR3gn0oMLV6f/wQK9Fq1V6Ytf+Y4f71X9d11dpVVb2goML0qrVeJFV0LVCVSHIeADUqWCAwMQyiehWKjUxcvdCFCpsxql5LMOe2J35oqJW5w6PqVNGprupdCiApHkoICiiSqsIhh3VJ2w4z9iMWASYJGSipcYuKXSX1Rg2qXkqRUKekMBBoaXU3hboBKEBVACEOFAGbjroJzJ3nhoBy3/n+xoDIhGItet1//ce8/9T+qW4CvTiBnHHmME9mVKXXD/WGyhkCVWhp/6Auaql3fGNnBgo43/8kB0gGQEBT6PV7/fh3XS+fN7Guj+7r/vVXMlKjUvd4GPUugNw5bz9feR5SCDCAgaBqbdQzt3OHLV3jFCpc6hinoapYvaWGCKdU1auWJFTqXupk5vlTq7q3fa/VMCdTKOLc38zEnnkm4xx88JMZVKgokEBA5kxuZBlQfOPDVLGrinN7/vZ8zdyJcSDVXasL6KX9MkaVkrSqdll5npC1f0gbU+pVL8oIkGx7oip19Zpwnpt11draH/162cBKfGIwqZU1Obaj6v3Z+3rfvzxnXdcwtS+pK9aMTVgGoCnVylqIzC3c63qeN4XSz/2lKjz2mZyDzzxJB049IE0KgilR1VJV1eqqLnNC7d7KOFOrVCsh8ZwnZ6gCcv+aec+ZJKWu7lSSByC11+fn7//Hjx//+vr5R1+fPkMEtm1r/DznG1hrVy+o6gaqReGM/czcz/M15xtm70vV4MxDPL49T+aE00vhvM/X9/tXryWt+76v1wfo/vru3lWNygl1Yc0Y0GpViQaCqrd6EejSfmm9IDhQdKnW6ov9QdXMwJPzJk6GObGp7tokqNSd580cziHMY4+reuac833m9oyQz+O5AQoEvbQ2AOM5VYUaVgAAEWOI4zGGOs8D6WsD9qzrI4AHCkrV8ai71yJhTubOPGBqIdDCYAMIVBgMCTGCnMxXzjfnzvOL3NpXrReBue/7++vr78ygS2sTZ05sMKr7HBCQ+53vr8yjlqpRqbauT+1Xni98COTADWj9BOd50JIERiAw6pf2h/Zn9SvngamKHTuUiKtUknBmKDJhzrx/YWtvIBMCQMKcQFdVbbSqd9W198faH7peaNVaMOP7fo5UkmLsyFEXCoYAhbDn2DGhoLuvc0735YQZApPvX79mHkV+7nMOAzYcCCY2giqKQkTHD9j2zFAhY1vVNriWtlQqoAlz7vt5I9vnud9AqQDk48d+iGuJRthz1KVaSKqJ535/3d+/PANjQF3dAHGQz+PzLu1rv1StrapVVpfKxybQ6s/P31Zf576dWddFiFQgXBRnbK+9V7+6r9BkKcSPkqo8379m7ud52xZrV3VpaRGBqjtKUaqiakd5nm+fBwyU1l4bmExVgQLVCwDo0tqAn8GO5v39V3TTE3v1hppzQ+Z+7DPzdgKZ8+T5wk+rSy+Sqqy11trVu9RaL+hCKqBQQxCl7bFBtbR2QFF1B3yfr19/ImLO+2utnfOWzvXx8nPu59sZ+4FTJQqaMOBAkpn7PI89CAQYjIq1tD6ohQCHRAjh2EMJEgaMCFB77V17aW9UZJKhK34co7K5n++ZWWurcIZydUFUjQqCRBczEEla/Xr96LWlVbVi9+pVXWut3vSq9drrNef59dc/1177+iiECgPEYzsJiYEUCYABMmYOZWIyYGKSnAcCZJ7MgwHAOe/MwaBSVTxhyODDWOuFDYFUCoIJx/P2/cvvv3huunh96PVJLyjW0toAkHniR6u0X71/+rzxoQoVQIYYn5xD1XX99nz95b//45wBahWrpb6fx3NDhkDUAiZDFwU2MQGbYJ953gRRINC6XrVe0lIKUBXgOWRM9bqqZDulrgYAbDBU4nO+zzyAZ2YmY9v2XWt3dXKu16uvV5LE1aCQQ2ASRyoEQTQGLFVVr16lsgdBpgrBOL22UMzq5XMyqSqCHAiQxEG9WwXM/cx5cp7xBKSOBQClhRqoLsi1d+0dqqpRxdECMNX7B32NiQ8ZTOz7158zs/Zrrb32Ryb3/a7a1dgBHNb1otR7g6oKcjyoVT1g2zXv8121VG0Rkqxeny5KqhRoPIWpKiuMS9g5Z0qqVuwZn/MAqgLIOFMqqXNCr1pLamBJBMxe1/74ufdHdVvp6l5XV6+u/fGju+NRZvyGU52Z8Zl4PI/jGUuU4vNU9e5Xr8/uq69d6xWTRCrS1RdUrWUM3vsVDz5Qf3//ufbHfn2+z73Xrmo7hPOcfP8iR5KdzCH2DLirACCe3G/OwUaoGptjz0Mm5yFZ1UwwQuoXwpjiTEQR0KJb3YDtYGx7NKfprlJ1xsVLbLSpRRWenDdzPBZKHI9zyFDVfVXv2pdJ96pVYHDweX+f56vXUrU1yYCBqkaJHzMkc2bOTRUqzoGDwABIaKHCQxGCSoiBFCh+q7bWD3pRRYl4ry4JTC1UIUioHIC1F4kACEkGA0BUQoeYvnKS7z8pw8q5M4/6Jfn5/o/cb1KSAETmQQbrWjS5v5LnPF+rFwZRquo2hzNMoPR69d5kMkNCTJwZYkkCQGoAuO/3mQdMJr6FCeWstdZalFRStaoAZ+yhCwA8pyTZiePpruTMvGeOqumlKkQyEE9IqT+1PrE9ZwgAhWQ8zJmHAEVJsj0AaGy1qDg3Ca2TOc/f1Vrrdb7fz/PYIcw5pFZf6i4Jkhlix/v10fvVVFVV7/X6+fO3f91rqRotTKWEqru6Q631UXvXqt4vXT9UazL20ZKu675vzDnnnHN9/Fid2GstG9u2j09IXx/X/rHUqq4mz99z3mt97CqOiWR6vxSX8bFjPMRVVSzPcCigVAXPecOp1cAZA8aTAWzHzhzbJUEyDznkUKVaOQfklNil7UlAa6ubLmpRtdZ17Re1lKW1a5WqitV1eZ6ZcQam272WtKu21FpVXVVLJS1E7BM/gtWs7qo6432tkvyMqqpb4+vjt3399Dn7+uhahVavVX2e+3l/xyd5PE9yZh4SVQFUAUAScJ53njcCQEgbLfuoyIw91GItm6aYkzmQ+MFHaVgA5rlvx5mHoCIyVWjhoJIaozTUjOd+5hxVI2HHM/Og6v0yOL7vX0CtTfz++np//13q18dvsYHajSaOMwFASs6c+9vzjg+YOOcr86aKKmpRWypCzmGOqqiiFyowPD4PKQwAQGGfcXXTpX1R0tpaC6DY18tBKu1X//i99ofWiy7i3Hc8BGzGkjyHMQYffMBQfn/lefN85wwWFIDJDLn364fW53N+nffbJ5zj517VUJ4xpgCotfaHnyFQyjzIujZqwCHBGXuqWL2qSEySYNt+am+AJHMCtZpUsH08JgbPeTJZ/YLc338fP/Hp7urqeoGJ0SLj56m+el8SqUnmPPEkGWJswB6VVm9JYHsSIFW11kuUWN0rRBwoxLm/PEGpXcmA8UmGkMiTAFC90KpqqVS9Xi9V93rVuqq3PTbqFQ9xERyAGXp5xn4A1e7aJKWrVvXeweM576/7/baDyjNBToCqFEnGQb2qr14f1dszM4+qfZ77/bfUREhVVb2qlpjxbR8QJdvqrsBzbk+gzqTk6g2xE6a611ql8plzjhAUOD7gPA92DACoBEZTzfjOuLspsDHIz/ubDKVWSltcCLUpVakkQtGxQ7pXNH7eYGL8EBdVoldTOhOH6h2naK3t0uvzNyd77R9//Nv7vv2c9dpjUwWiVGtXrVLFgKq2VlOyjUq9VQLUAiDIEOxiQwHnnJk7cVUjCIBUPt/v99/zPMwNpi4MWFIJcuwnQWqoeNBx3vETDzjzIHWVCBgitdYGnXOIsef+js9a2/F5f2eOVNKua79eP0WX1rVeUJJKEuBkfN7fnuM50JicNz65v/P+wgbAifHJ887zzrnxoQAj5zkJcDLf5DAHRCC69otaMOqt6we18CkbUvI8b2J61edvWi8MA2POIeBDmarqjxzDiQNkHlBpz/lKHnyoQkUXMnMYyKIvUY7jYDs2ue/73E+p6EUXgVr9+gSIAew8ByRJokqCEhXW6qrCiVV9xQCoq7ZSrR0IkSQV0GtBYVRVa5UWuLpKdb+/c/BJkdiUkIVKjV1V1YtzZ+6SqgVjBkHSVVXVa6M4DkKqbtsnB3dpFVVa1RtA6hYAVO29X1UFJk5Re6eECoCGqnSvlSRirY/qRRWSzxOfzBzfjlUNcXJ8534y93m+k8GGeKaXlF61pJrnu1u1u3pJ5Jx1Xa8fv1fV3hdxMR1sG1d194/9+unj9/vvqjrP2fsKht7Xp7ophLqWAuJ4aq394+cqrcoxs/cr7vf3/64+1+uPhFancs6SSIkwORJ28tyrPqjFHJWdWWv5PFULLWxJz3kWVTg2InYEagAUZJ+TUhKWCcRjNFLZU1UVqZeqqYjKmRBQqv18B+xnvz7v7wcRbfzu/fF+/71fH9X15z/+S6LBPlUY2y51FOqqLq0LU6TWFgJzDgCFioJpWn7uue/uhkVOSdAiOUct5s48COn6+Phc16ZhwMfzXXXNjDNxVJsqqj2HDBS6oNQbH3wmU0RVi2WECsoz9qCgh8WqF7af23NI1q5SF6E85z7PDbU/fqcXKjLf77/X9P18C6ouPOfrn71fyXnu79L3/vxBhjjPF5zMZO56Q4jDuVnFc5/7IX/2+oqPU507flf7nuf683/FU68/6vWD9aJU6/KJ5LUWdu5HHxeBY7p0bWh8AIachypcOadeLzAsLTozzzdVrEtjqlBRhWAtjK7X52//rer/e55f7GLKM8kvsbt+UxoXG05RxXmQJD3v71rV2pmZuUsgOT7JRcUZPxFgsEMGmyceEAlKTmagJaAAUPUHVefcHz9/1LrW2jPjOWHUiygez3MmWkelUjFIrR0nPFGZJAwUUYhqQeCQEMjBZQa/M3/o9dv1+ZuT7q3X74egZs7MTUyMtPqi17U/AfVuC1CptCWVNnHrM3pQUTsCXFXAzHOkFXnOqNSrDIECrL5SS+HajmNnrV7i+nhVX+d5QwEAa3sMy8xzv6+9qovcM6nee+/12vf79PrjWguannneVY0aptc191fFOVZpUfS+ysD0tVd+nvt55tdrf9b6sG/7l93dr+oSObbtqxoCRpnHVbvXJU6qMZQ4YiarbSRUdb+/7fBpKNQkVf2qT3JVbXBJFFJUqpTt0u7qGXcv8MyNcObcWapefZ5HMGeu62Otfu55vT6T/+z+8bzf919//vj999Se59beTgBKUYgduirS83Y22htVMoypihFSd4baV1TP96+qrNeukrOggDjMeEZVEtVbvcjKvAEhtOwD7PUpFQAARBWhCs79hYoqv58UReyn14s456muSuOc51Fvj8+5ba+1tbcDsrRsVbWqEEgEY0qlBepuQvVerw8Efcn7tfa5byj11vWBihxdK/ffWhuXXp/++kddv1HrY/3Qx5Vz8/XVWPtDXOv7iG3HuHASFTBz3u9ffzrfP37+Ud7qx/efnBMf5YoLk/cXvaUiTh2xZh5lpFYbNlWrd95/au0kmkMtWFKjk7yhr/2z1x4PICxS1cGRktEcujI3xn6q2wxyBJ443TVziOwhjkQmCcH3GyhpziHxvDO38pGEsqGqkyBHGb9bqr5g5XnYn1W99weFXUick1QS+6l6BSFRjX3mKaGSqkEQgHGoqrZdtKPxA5sYJgnd6t17FS5V1keeL+JgkplzPCSFCCjqS3o/z/PhEyChKHSe5/X5m+dNpoqSgEojkiwEBUNXVRGIgVWfVfeMXq9OuqrmmVjzA8e//f4vf399eabEnOfjx+92Jh/f7y9zkl77o/t6v//R++Pjx7++f93fv76N1/UKkDpzfrx+TPqZX6sgVK85h1DJqdK+PnpdqLt//Pjxb/Pc5/mFpmrVapPgUlVveyDVTYYYda9Va4+hSigYaWySpoBIpKrWWiIBKHycIxBl9VQ1SVX1uoKlAkkiCBPHU11Epb3XXvsq1f1+Q577a+9dKmlV7fPca+3zvs15vX5gqrtwqaoWdGWTrijjOYeySgCU1FThw7kBtLRfsFqdFEFozqkq7Zeq7ZG611IpM56HQJA2VdovaqHgrL2EPECXNihJfMTJeZMhFmRm5o5NK3nAkvZegFLr9dH7qtLaXb2oq6r2fqF1zqPVKqo23QjbDGu/1v7otXtdvS9q6fWp/dL6qc9/W5+/ocKG0r5gqbZqU0WhtbVeAC1Uuj7r41/qx7/o+qyPf9X6vWr39Vo/fr9+/2/1+Zuq0EJVzPVaa19niEQ1FLX0+gFAaW2WZu7MA2QMFpw//9PvvzJPMqjYH3Mm77+J8wwxQIwhhUOyeqF+fv3Cs/fr+vjRvc/zZN6Zh2Oft+dhnLGitTcBys7MOechs9ZVvZ/39zzTvSVNJqF6dauUVYvYc8595rgQEA82gCOnqqGemWTOOaaqOoGZ5MzcZx4/z9w3DgEAJ1Oq1R9oITwTTFfmeI5PSMyDZ+aZuWduCoBe0vIx0FWJPY9U+/W5r59rvaBQwHiSVFVhz23ZnDz3mdOvF62c59xvMiUBBgdVlSpAU72qP1TtOJ4Sk7tIlapq9Qt8v79qXZms/XOvDtm1E4hsV3/4TJHn+T7nWde19nY8x90fpXZC9/P+en18AufckdEykvo895kbZyHmOV69upKAal0/P//t6/2f+3yrX5UqJArIuCiESaUUwKpqMDATDUa4wJAztdq2GWIHJIJmQqgTneqlUtc1ftRtABIbFzVzUCKqd4DzgIqyfeY599uZ+7l//vEvz/N0fzgg1uvj/c+/e62UxlNBvWstCS3hrN7mPb4lqVKIhHmiRlCFigEM5tzjh6L3hjrnUXWvPfcNYi3/MqohAGqAQghKuroXRcLz3PZX/AEfMEBIkKicZ849c7pLtUVJnYzWBhIDASLi6k9kAsf21GqIcMh5voEPNT6eU70lJfiwtqoXkIkaythgIOfR804m7y/WznmLneed60KV8878Nd/vvZaun9RiXezGj5lW6eMPSjwP1aoVR331/rxev6dcq6XW+mS9mDs6er2o1v1ey/RS79Ynoc473M/Xf679U1UIqkuZ7/+q/YfWCxkRnvCApWX75Lw+f5PqPE/19fr8+fXnf53z/dJPMhnjrl6U6caTRA6xFoydQZtUac7zLvXqj4BxgW1UZ44gcM44KuNAjIJPbPWSJC34ZSoT59R1lUoqKK2VOfHTq5woQRAnVomqGJ+nRIUZaxU5c55uOegYTDoMIJW6tTa9oGxnTvdV1TEeqZb2q95fyFBQ2I5D8KlYgLT2Xtcn6DzfTjyTUFLBmTm5PQeBbUe9/dyJEarBJnT1dO/rVcr9/svjui7XUXHum24l41HotcBzrKp5/ix198f4eZ/vBTDn+736ej//sFUqYqjVBRW9PU/F57yLSCpsQKFIcqju/nG/38SqVYgqh/f7y6SqS6UuqrCxUQnPeSogJ06OpBRI1S1U+9XXJwMxqAph7IrIAhBzJg6grlULGTznZIYqEAzMzLHt59lNxolU+zl3N8TXvnrt8Vz7I+G533NuoNQzA0GOABE9zyiNkxwSdLQbm5iCIjPgSmRnTOx45s55PKcKfGYOWMnqF1XMgUIXvSChSitUEmklPM9tO1CN1CohaRVFGAiqzMROQreqKQCCfUpa/SrKz1c8snPuEt1SnsyTTJKSIIQ5T3U5EKA4Nz7YzMFAwPEQazVVUDnj+yv3zcC6lK5z8nwj59w83zknftSNYJ7c7zwnz5PnjagWQC8KUCa5HzLJIc7zxbwBAhlU1IWW1l4///368e+Po97SBrQ/qPX113/M87d//Zn3n5xz7r/eX38mA4qPxPrxA5WK7o+ovv/6356b2mL3XqxKFSQxkLJzqtbaH6UNJXDm2ntfr4DnVEQKiOLM+HRtyNzP/bxnjmeIkwjsSA2Y4tgeSktlXFWsAvV+7f3Z6yqVpHgSi5rnPs87jM/j83g8fmzbtk9qQENsA6UNCxot7DmHghRwvT71+qkq2nPuPA+qa32APW9szOR55kir+kKFmBm0avVaLZG4anV3lcys1RRQXcq8yZOY+MwN6z7Pc2bvj319/vjtD5H711+C7t19nfO27Hl7bvtEBgJQzmMPtM95vn7ZKek8794fYM8N4KXqM8c+malaqIVKaSfxcYKa6mEOz9oX0Tyn90qBXEXvq2oJzjkE7PHxPMkZT63W3tVLVVXtDNVImajotXq1x0CKSKbO8XOmSIhEkS5FissOzjPPOQ9MzvE59zzOVDdIRTd+Hkn2nOe9r9d5nqgPjrL2R9Gdo0x3JwbO+z1nUId1Ynsyc86RmhYIKnHOkxlsqlBNdJ5DhBaoqvK84wPJGftISKrV4CiM1RtAR8KZ3mtdr14L7aDYKsVCJPE8sdfeqh0x55fn9phzzzO9XwDAKvvYc87jmFKvVyh7zuH+Oj6jamxJq1+ZM7lhAJAzYCDnoYu1AKrVW720P1kfWp/YZFTkvJmj2tQyzkyOVZVJfv1nvv5rX7/p9dPff+XXf2be+OT+xj5pQ0hpaV1qUWYOKoAhM9ixQQAccmfeBF2/v/bHeX+hruvf+ud/X7//P/Z+yVZV5uv5/q/zfD/PL//9P7/v/6zaqxesWttPYv/2x798/Pavz/tLEtdFldZLVQhKwJzxORCq17pWL0mxJVWVqizOBFWpCAA547FH7WtfIINjMD7ywQPTvYOqOxHV3VdVQZGq9bFeP6FVFIktClwpZjhWnDJLVcIha1+fuzcaoOp1rb36Ugsg5DzFAZ955jzn/YWNKmMwVSqNDUAhapUo9VX7IqVuEzxqddXeV/flCNXM8dwFKFGhUlV8z33Hg2mu11XNKUEpYl0fP37/93l/fd9/SVPV0Fd/7m7GePycop/7DccnUnWzpOf+olR7ewyFGFNA/v8E4cGSrFmSpdd9W1XPb+Z+IyKzqqsBCIQiHPH9H4YDTjAgQIigG93VWRlxr7vZf45u5VobD0OMmJbWenxkXTEMkHFJpVBkZmRJQF3P+/7u+xX5nNNMZ2RdF1meHm80ISkDIiMzF8bn2LY7IgOwFQLmHJn8eBDRPRqu60O1wKcPMGMTyofG9h2hup4rPyMC5OOMda1PBp8mQpFZz9MT8/JsJmZ07q/H84fPcF4R8rTiUl7d0+e0zIzPDhER0CHMViSYASVjKZWJz/QGZswM+N6/fF4h2WMfjxUXCjz2tBuAwDCe3vQBSRkRzNE0HnBlKsL7zAwIdYRwpD7q8Tl97ANuv31/Q5/7je1pfMZ9ep9z57qiCmSJCPsoM9czIphAVXURw0ysi5DdM2YGleqBCgKQkgwEmGP6EAHj03TP7Dnf2IqHUvQN6HrMDBZ5qRaAUtcHGdMvIOUQAEAEKlTTzTFCazGQUgYEc+ZsgAm//xpvPT6y1uvr32f/NWdD1PXR56CIz3+t9Zl6Zj3B9+uvGWbAW9j411//de/vz8//7D739z+QUc1phOKheKgWZgY8mFoPRsenu9vubvvgiYhIRaTEjCei72+GUEhlzzlvCMVCAGeme2co1uIcjd0bZHvOu+9vfIuMrIHb9+kDoEI5Q9vDjPFwfLq3ODP2iAnBuC1IYMamD4Di7DNnT0T32/t17q/Td+nBeHpHgCLWmgibDFWVoPf3nA7U3nP2kMpigImos9+//vzvtpVXOHrvc+9xKh9SACCTjKBCOTDk9fwt6qJviOvxEcGEYn1CxlqRAdN7Q6RS+Ho8yfQ5fXbkQqPMqgfTEcVYcaoSRYQiFZm4gzme49Awvd8+B+vcffada9Vj3feXcmmtMx53REVkZs4M3QoBCkGcu33OtIWACFExmBCRwwAoGJRiZjyhwC0YEjKkcYsMBdOE6irQEFFBUFUReU5zPDPUddxSBlm17vtln8+P3/o+UZc5A3U9I0MMSEYZynIToVIC3YzH9z29GeY0MwwQyPTBHp/e++xXn11VEOdsJqZbKSIrqyoBgD4zmzmcA4UiFNKcfgOMUQBZKckH3EBWDT29cYfS7b1v93Hvs18+2729t0JVCRNRTDBTGVkVocfjketa66lKYBikiDWTKETbZ3orkygMY5iZnt7T93SD534TQV1Rl9bFgM0Q6yJqzvfsF+34+Fv8+Bs+jJUPPT71uLQWArfPe+xAIWgzoCACDIxHkXo8WRfTc29JRKkeuj6xiWf8+M9rPV7f/2P8zVh11fPj/evPef2SVuQVmfr423X9nrGkRS3Pntk/f/23P//xf72+/3w8f8uo8/O/0y8AMW5kpKpVWUBo3O+hQ4wnlKBzv6fv0PF5w4y73aAImTABgmEaIIKRPcpssFlRe+5IQhAC3++354wbRVaBwjF9GDOGDSgEwugcHcBm3G0fIOtS5KCIDMIeAiJCjDsqIjKiZqb7nNPNqB65HlFFxJiolZkosz4U9Xr/NX2HhEEREWgBTMOc+44gIgKNj6fRVCTTQsDEEdFgmdNiznSt6/r8eL9e0z3QPvf7l/GIqCLIdZkD1PVUrohlMwPuqgvRfSpT5vHxI7MwfX/DiQzPae/Tr2CE8DQ+5xyPh7GIiNm74lKE77+IqHwGtLfGICYgiAB6373vmfZYgTKzaoAIZaBAC6LdszfTj1wew2g8Y0WNhwnE6bc9KIywYdZ6SHLvwePxYG+7z/01cyAeH38wszK7d0YR6vvr+fkbkRFIHTMDATEhpUKRaQeKiFxreXb7wDANoCAgAgURYwPWRC2Q22utqiurFInKtvsoCiVjxoznbAA1WArF6tOnz76/+9yn2zNAZEAAYDCDFIq0RyTovr/7bHzO/RLuuxkFgYwHBcFoiIxMaWU9UCCON8qMqCAUmSsmmJmzscEolJcimYBSLq1FhiTVQ/Wpx6cilQ/y0vXQ9QlMb61Lzx+s5wRk6vGBAlD9iPXbjHHOMPTpnm4EYwKGub+Zw1qoaOMmAhX2dKsWY+aA68e/ZT779U9kyHj8fj2er7/+x2iIgGACCFGVWg8p++zP579cjx/nfLUttN/f31//BGPAAJODB7e7z2Z65kRFVsKI7t4+G4PyzJl21TNUqhWhkCRHRtXjjMGQIYmOiNPHdmpZce/NMaG6CuHTCAiGiIAAwHajYQztOTPOVVVrBqCyZI87a1UtEREZEQDYdmTluvp05pXX4/Hx+fH4rTJVFxFnH6m6b99vkN0QM4JQhCQppARmHLV67/P+Hnh+/iuj9s71yHpkZa413e6GsQeoXBHZ3d0NVK2qx73v1/vXnMNx91zXVZVj6HhcH/v96natpwmYx+MSsonIQrhV0cGIEYplpnUiA/fZZzxFZgAzDLUuBJIywwCeibze3z+fda31GB/3YRxZUcXgc8uecwaAsdvEdSkiPPQBocDGjhAAikjliizTGRUiYk53RYEjYiLlAeFBqZC7Zc65QxMRp98zZ+VHe5SFWPX8/vqzVr7f327Xepp7rXx9fbNS0ExjhULrnm9AGdgZRSTMgCRVTsOYMYKxh6x6PD4iIyrP2VGJas4GGPucXleirGIABocWGRDydHfWil0MnhmorLHHlkQ9GOZswNNtAxFVhchBEdmeXJfqgRrwgOKcN/Qc2xMRHsB9HA1Yw3gYAAY781paFxRjbMazv1GioTVz5mx6z9nK3feLBJ/5vqdfitWvX/36Z9ZF3/KNz+wefc150ze+ySaTYCK633o7M7g+6EMUhkC5tD5Uj/n6YtD6oIqAtpTMpYIADrDWb/v1j3l/o4sgPn6vs/fP/6h6rHUpV5++3z8/5u8QkMD1+O3x8RsaxYx5fv7rrz//x/vnPx6ff8DQJp8TqaqEe+9QeOzjuh4ehxSBI4krEs4ZEaFhbEeke5/eQChKwTa0GSbpCUyMQhX5en9VrhBCMCAiIuJ9dmWGAkTUevyYGSGPoSPLajKqaqZhYM7ZisXMMNKCRgCAKn06I3I9IED1qD4z4zH2GRxZyuLcfe4+33BCASXVzD0zbo9PJns32LbyOp5qMqOqZvqYiTAb8LHdBO5zrUswpycyr2fldb93XY+M7LGi+r4xkRXP/PH5++v711orIj2zrisy7AYYul3r2u/33ef0e0VF1rRwzsg+My5m+tylIFOeGUeuRPZRZWYh7u99vl9SEGjcfWaImpmZYTwDngYADO2xDUEwAARRRYg+7TnnXI8n6LjH7n2IR0SMD0BcY2MREEqyuxl5fM6OUITOaWa5xTkzPU6udXY/H89971wJjF3rR+QLOpAgGWbc231HLqGQgKo1ELVgphtgQAAo6iqgno+KGohMAAXMfn8tKa6KlTC9dz4+ZyygCiDUEsqKUqyoFUohUHczgwJAYSMOkGv1QcoIPFrr4/H4zPXwBAqgHhUhiFS2gpFmNIoYd+/zXfPBtn3e9/vr158TiMnMPgMjbSanGzj9zihpVI+ZjQ/0sOf9PueOk9wHBWGfe2ZC6vve9/3IJFLuOW/vb8nson/p+sG1kO+vP70e+aj56+T1dEyC1oMxd0y//fqn3akPPDS0VcUYBQ6tx/SbIPPZr1eso/pBXOu3f/3+x//pvR+//4vigrVHqoXICJBnQIqlIK6l9flDOt+/9vfPrBiUysqShMnIYbBDnD6rnsMQEQt7y1EZKGwiIojMsOP4lAoEjO85QyDc3vhEVigiUuL0hlnrCmVeD6bHHRHdt7RwQ8xM1GIUwfRRwBEeGMAjDwy40cPW7l0RjMERGRnn/sb38/MTgzE9BMD0+HCOSOUanz77++s/ntdjXU/l45w/7/fXx/wtQmhmiIiIen9/RShQROx+12jvM7OlFoU7ZPuWn71vP59rXTAOink8nqdvEvf0ve094wh5znp8/P4v/8t/+y//+3u//vjjP72/vo7vSBiA41Zba8W8cfrMaPucGYUCQBnKwmP3mTuvmtB4RiMGEQoUWdf18ffz+tPjenzabQ/qmTPOyFKE3ycUCCEiILrPECgAxtAzPUeKSIZx5YPUuTfjEZ4dE/vsyqW1wqfdeAYpTNuD+gRCYTsIyMnc+2dVuPc5O0Rk9f5aH4/9/k6kyNQyG2aQZ85+R2ZE9LldicLdjDwdgBLMmCgIOBiGAUBZIiqbCGxAEURe65EKFKd39qYdCcCYGREhCFZduzIEg0+fc0oBhoAYZjy1nmMP9+5dCvtMT14P1aO8pQVIBZ5+z9j2++ufPX59/7XOBacenj4M7nH36ZOSpxWZ+ZA0KK4fGhivXso10/r4XT6ToxCvP4lTWvHx9+Fbzx9al3/+Q5Uzw/vXevzIv/3b3Pvc/y2GyIfWit/+05wNSCvjIkJVqYtIYM6eSA0zw37hBRbMuTlbVfS4v2ZaWlIwPzCYePyY/Tr3+3r+AKN4/v4/n++3chEoFFmrChgMVF0wjJkLMz5o8vn4/vMf9iMCn1tRUVcoIODMtCdAgXo6zBAMMzrt64pQ+ByG3h3BirV3t7sY9xkASUvSTOPoHu8TsSLW/f7la0DA/v4+97vWshQRJgTjkQEUZc/YeHqf3m8YpIga2uPMAFVeEWM72yEqrswaWfEg6D5AIHygmYMtARDlMUrFmjGLCEIJjtCgUByfWLmuR0TYjlpxtj1YIQHHhlGu7IyI997lycy974+rMvJ6PO+/fp1zB1xVtt07EuDcZD5//9u/ve5f7omImDz7HmfkH0Sdc+LdmFqX4yYGUDB05mOtayJLa2Wv/brrfkctQ3oENrZDnnGqDvJpsu2DgFCtOe73yZStiBGKtcYAKKc3GADoOXufsx/PH8pEgRol3cQMzWxPVT7qughPb2RIt7GBCEUmJDHjd0q5xBihENR9vmMmlOasx99ff/6sq+YcpeS0e2wPocKuWigza+8bDVLlA4uEmT47Swig55aJCBrLkZHXgywU9IkIrYw7pCRgTnjus1eE+gYYj7fN6cAUjIywezwuIBjNecGJyBl3t7vtwyr7tPe5v+Lc9/uX2/v165w3TPWCiQBER2RGPWJq1YeiGCNCuR6Px/Wj/bYdVUTNeTOmLmz6PT0A5wCMcUKRo9OAnh96XKqltYiSqUvUExK/7vfX4/FDJQBgDnqgbJ+Pz/9Uz2dVKB/jHS7VB3kJqxZr2ebcqqeupVxzvzkhzOC+9f5rhqGTRajPe/aNmrCu39csiPGROtWAIsaKSMa2IpA8Rni/XxUrKnr/pfUReXXvmWFdg0UoynZENYMZpc9dj0/JIYVUlblqpkM6p/NaVfP+aq8WRGYphp7RzMDAGGVkZby7Z1zXA0WtBVKksru7wpAAGBijgTGgFFT3nWUkrZzde59QRoBOREF4bHt9/q79BmMCzn5JlfrbWLsHIDRnI1bWWh/x+Oyff9JHEYqaCeVDo8iL/RYBcc7BTLSPosYDHlEaT7eR4qr1fH39dfY+91bbDTG5npnP9/trrWutdN+2z7ii8K7Pz4/P3z1z9q4qTzKy3c26wlZW9d4SVHgmc0U9zn5FroxQVKGAUObpU4Qka2YEjE2AIR1RkUMkzX6/c81jEMAwWusyRoBmDChIAmZ8FAXYDikiYJiRcrB7ZgxmEhPXAs24cQiC3jtCSDCKRGfcZ2+YgOmpDGVl1umD0vvEuLRGRF3v93ef9/X8gGSmqpTpBkWVREZkZigSDDHnrcjMBxgM1jjygmEMIMaoUWgicMzZZ2+C1Id3n/vOCshxa32gwOR6RMS7b4+FezpFZkbAmOGct/tMjLoHEwR07/v727h77/3ufUeQq8gI4np8+uxzduZHxPHV1/NxzvYIN1IoMgyBAEy7TxDMMGYMAHgTCzFn0560IpGIN6AsCAxx6fHAwVlU4SEiMu07nUONe45VA4L0gIVEBGfIS8+P6aZNFIDP6dfKZNbsDVYtorBzPRBzNn2g4Jzz6+ufva4fsTLLfXbyUH9kJMPr9XNsIu0++45aZ/ICKExGKbPqt+Nj71rP7rQ7+ri3pyszqkBKuolYVUIGkIbxNGLCSoKFwm5yIkEwAMLB6pBn0o2GAYUYIuxJ5pwD030jEnq/otbIHjMM495KPFuOXNfu7e7IIhIAn7anGY2PCByaA5y+z9e5fnxatq0QIrRCSRbabKsy15WRinSf6anrml9fNlE5x6qMUGbWkkVMzBxmQslARmZi49u9DVPryjw/f/a6BmvOI64BKd736/r8HZ/92goxup6fBo8V8fH5o20mYuK6rrun3UkoM/KhPDNmjCLzQmUUo0ARGQwapxRRHmtgcNv2zBChCoQhFKGAUKiymAFyxcRMhSLtiaoA8HSPTY+PmSGJFXldVEF0n5CkhSIU9oiOhBkQKMhz+tx3ZmZWRjJj99B2A/YhApBK44zo08S8zy8UPp1VEdl9Iqvysa4FgolIZXokwraE+8zZ49nnPTPEpbUglAsishDMECADAL6nb2URNT2A7w3svvd5Tx8QCiJQEmk6NTPtGTyaYBwBwzAzI3D32e+ZthtO1ZLSNo5az6rH4/kjtOhZsdZ6KEuRwD73OW/kVIKU6T4cByICDERItjTExCoyANWCQGLOdCOQ595E6fEZdWkVShicygsP/aIWBG6G6/kj6wGhWvQAJMxkhGbDMAnW9dTjgyjwzKZ77hfSup5Mz/6e/TV9zzRjMIBKuVhPKhTX8+NfIjKjMx7e57y/969/+tc/znlJa3rYL2GPT2/3rikmAOYIqKjr8/HxL2cMXmtllqTue/xub2aYCYQQmevpYXAoCYHaA6m8MldWAaFst0JEABoYcAA9jafPbbuej/V4YuNh2r6ZjgEYw0gEimkzRgDjGXdEVj1BMLSBPncIn5FyxnAyBPLs+/75/foTnPnI+ogoBFeB5/1NG3mm2937DXb3ud8oa5VA0+OxB0K5UFU8nJqsQaLWemZVQ9sMp/c5b4Ws3vt7v7+ZTkVlsfd+vVL5+flH1gcGqKr7frtPv7/67Mq1alFhyWZGQmMGu9+AIlZWZsxM97v7PTEA6iBsDJNKmJ4DLVypoZnDmIgoEB4DtRYA+ByNJGWUIoPAguhpEgDIWoDPwRYQIACYkSMirwphxmOFwHYPjggwjCIVYc/pQwpVrhWxQPt+ZVVkAX3OtR4SUWV8Pda5371vYGhFhgJDEJkIKU7fe7+lIKTKVY+oIjynFQuCKFQQJBEpCRAAMCgiS7lCnL0JIjNEKPr0ud/4MJ4g0DC2ASJHRiA8nrN97jFAe4cIZegRWpFP5QLwMMZj20H7KDj71eysKzSoIlfWiliP5yeefd6ehqwoGHsykx48tOfe8/6e/WYOPowZMxChFD5joyIeCDzEmfM1+0UukCQikcSCYEQUHkWIwA5NpDJKWijIiwE3CtVjZAjVE12oGCMRiSGY3jONPL3pQx/GtX5bj9+60fVRP/7z4+PvuT7Q6t0z02dPt/CqC8/9+tX9hpl9MFLREKHHx/P5924PVqTdEal4MNFze84+GyAluTKZ8LSkyFiPR9UzIgb3OQAwBsPggYyQMjMkmCg8fc6NgcCMva6nPaEkAkVUEZJCCjKVxUzvt5TA6QNEZCgjC+PegOJWKK/fqaun9+nQSuW+v+cc5arHVY8SYhrjPgzn/aJvzdnnNR7TNlrPiMC2G4gsRSkWyokIxXBGQ8rt6aMoo9mb05Kmd9/vGZ9zMxlRNnbv8/28noCqPv/2x/PjEzjn9X79x32/3q+vXz//OTOSqx6ZV1QSTAIzM4QkzRDSPt/7fPd5n3sft7KCYYSlgVAwMzZCAcZn9zkAHTaSbLfbPUgz7mkwc3q/Ydx7glBErNMNEPTe5xwCaAAYG8AYR15rfWRcoVAECEgyqhQ59pyGWI9nZdFEqI/bjcf0CNCI836lRJPrERnA188/iTx99r57ezRgbCCUtqsqIhUpFRIyY0CRRCBUC8W4GSIkkhmACAAOQpkTRaBYkWu/z7R7v+hG4J2EKrCHqSxNBBmxbDMz1kxk1arnqmfUBQIMCMG9X6dv2wSZV9UKCTPdlaseH5H5eP6IWI3bRyKqshaRfW5ChGyfnvaM2z7T79mveX+NTV56/tDjh3JBoRq/8S0tTWDBzH75658IXQ/mzPme/Zpzj99D63EpkxQhlEQoHBHtntkAHPY9fQM4GEtCAYABQJNSQikfNExAoFA9FAtFPj679/7+95kDNqPHx3r8mKZ36/pQXpAROv2+96/9/nX2l99fe79gJEmrrk9lTE9kgTLrWh9DCg0dilRKgpmeUGZeUp22j8c++7g7IkIRWeNggjEMHjOqWuuRKiYGeWg3c4hQJETliiz3tg+M50y3BkVOW4KJiIi6IjIyIjKjYBTK9THsESLGW6FU9v3t3qYrhLv3F4AY79mjjFgXsO9fPvtxPSMCjMkYMjIiUhGx729PezzebuMYuPLxWI+IZcY0PkEz7tMQ4JnIddXnZz4+MosJNFUi+P71H/u8yVIuPNO3957TmRrN168/p1Wr8spQBpHUelxZVRnjJgDZlnLpKffZ74goYMV6d2utVNgniHP2+35HpKdD5Lo8jsixI+berAqIWoVi319Dyz2YeIAUVwK8PR2jyIgIe48NQcTMgNoNwYRUkSmE1H2Gjkn3nmk8JnErBMF01bpjy4G07++IjLwgfd7tc+wLReT7/eV+KZ59jh4fPfaIKAgGZk6/i6x1ATNHLEifDkEwZyty3GAxvm/LtWA4ewcRmTBMTwfAhOohcfp9H3liFQgIMOPjHg8BQUQCEWkmqmwrJ6PmRvlQs+8vFBE5dkRCwEQ+3A5hY8xwuos9rIisuqab9n69q1ZUSQEYAtt27/Hpu6MuxWKFrg/tGwUE7dmbMZgDFaSHAwNBZnz8rusDkmH2N46Z9+m9rt/0+KFYY89pPURqtLoj1GNJjzmbsbgAMBOjmfuX+x1a1FOZs18o1cZIyTkAARQV+Fau54+/f339N40iKisYn3PPHAIUUp5+f/z2r5d+jxjP3vcLzr5v4bpa9QGR9ehzS8p63O+eftkT+dQ0SBGZ2TOYARFAoHEfv5nPjBSA7M4KEoaQ2hsLzLpsbPp0rZhIIpVB5sxRJbaZmAzViAkjybvPDWNxej9rqYg99j3D2d37pUxp4wKmN6qoxXD23ved+VAtnzcxr69fTyI+PuL7zxlLAZE//v6sdb+24lGrxmYYPHMAAjGpmDlml1Yplak2vYGoK+K1MsFEyE5d6+Pjevx4Xr8plCmimgTd7+9H5sfzs/c7FJ55v7/O7vWsK7JqbX+f7lzXABMR2X3C4XZ3V4aP735LVfXs8yWy9y26GHAnRATkTPfY02NHXgjjmY5IaOR6FCSAjArhJoLImBGh1EIwU1WRia0sRuppH9oo8qqY/Yzab880otuIiBED3P3y6RTGMyd6RBqf3jCViTMqpQwAoEdWVriB4/e+v6+PJ4C71hWZkXnOBhSBRAQwjEhVQYKjCpi+iZwZbIAotOd0ayuyvWdHRKIEgMjY45nO9by/vrtbGo/TQcVMy3gIMBE0DNPDwcwMwMhuj7u3AvcQrlynT8bKrH1/e67Tm7S7r7iIOOd4JsiZzZzTp892b318aC39cobCQ3tmBILMQsIG5vW9379k1ePJw3N/I2NDzP2Glh+zW1lUqR548MaGIEJelZABgDg3+8DQ7TEZdZV7+/vPAAbVgwCMA5++v2cmrqeUZNEJgaACg8wJeg9vFO7vCOnx+8fEz3/+14+P3+r5m9az1oNxckkaQLrf33VdsVY4MlbmcmmY9/2rujMWSClAUZDDVE2AESNLMopEZuxp9kTEuq6QFAMihEKKqoUK34AHuWdm79vYs6W5rnIHSiHAfUOPCerx8Umoe0cGEggEDoVtjSDf+0X4imvmthtm1R/itg8zzAk8MAyztD51/ahcPl/vr78ej9/0uJBEKy5PMxCXfTPOKAIEzOv1tda1KoUQjK+MjBhm3N291ipNe2bsYSJUuff3OTsfj3p+VFwKDxMS8vt+P+vz+fzR75e936/X99fPnz//neGPfHJd0BEZgad9d0T1ed376+Nxnfc94EiGPneEQtqKzBi37UJx5kDb9j4zrQxQVq7rMdI5X3YDYFHjgreBNqOZgYaRagQKUnPutgEG4gLm3GbGh77JRGFjH/vIzzmOqwCBImEmTtSqrNNHEVllo8h6LBo4003lvu/H4xnB8SYIUgDEELkqn/f9ImU3wPR0YxOlmCIzsj0OYmJ8mFYVAY0yZwaCs4mM6xo7JCAgI4kCwBARRQzjtZ6/fERFgCBAKFYQcxoG4ck+u+qyPab3DRBxetvn9XVXVq2KCPCqikxpEPgYX/G4/dPtCVVdsz39ft3b0Gefvuv6F60HhM14DBnPjLdyDUxIgEAwgXsGFKoHc8b3ePARHs+837QH0y8icOM93dgk44ZAzPvX5Hte34zhX/HQp/u+b3JMD1nTrfWtejCGM/sNEEmIMGPVAgDG4DmNm+n2KyIVRRRDrMf1eN7vn/X5t3j+nutpRgkKFBHR3uH0O+Kxqmg3EOuqCIz3y4o+7X7lujJC+TF9zzSAIhTgft+Q6LjNBBiISFV4DwSzZ2xbmdMBZDzEME4l5zDtaQYM06NhCMKj4+MZ03NGjN0hKSrX9H4HU1EIMZWJhCpr9VqhVJTne2zlmr3bviIKelXPTcSc6dMRnP199SPEeb3rI2c8+43dc6OIdR3DAKzrWet6/7pDkODGUmb37T4zHpVlTTAAmgBTsc/r4/H787pafsQlYqYxIj5//yPr+vrzH9P9/v7nn3/9+/3+CvR6/TY1lUWzrnO/9j7vjx9P+zZAtnetHwIy1nr43D5WKjKU65xTQFjnuO8NzqhcqyOiIyq7+35/xxR43691PU+PPWCwPWO/X19rXZkXM4LxATIvqyEUCRCBD9B9MjIIw94ndGVepBQhhJLxeEQiW1ALG0kRgSYEc/Z98PS2W6j7nE0oRhN51bpQnfe5fnv4DPJ4I5iRggjo3juER8zMHOqIIBMSgwRwDlF9nCXoDuXjiYO9GdONZsYKS0wbO9eVj+fZ77BrPQC6wZ4eOkIM1ng43ZmPSBEAUZEI0n2/X1+ZWethH3vnynNOBKAwGg1hW0Lo9H2/vyPS5uwD43MYY9/3m+jKrMel/M37Roq1oHQ9tD4grso5bz0eev4g4B16BmMi1Nb1Y+5vrU8q6UOmIuGeQdeDfHMfDqyirccDAwFbKDzyUUQ+Hnj6NDYw3biZIaPWh/KBAc9supEAbAYwEUFpPeiWNL2Z+/r87fVX9+udZ+OTcSHQgPvctX671g9g5XJEn2Nv787nRS1Fxcz0Of1CoxFoZgD7AJnqfexZj8f7+8vu6/q0zXD2Oe8TEnZEZC27MYSIjCSkvbunI6vqmeFz+rzfV38MBo9936+IqqggJwBsnzaMPFKC0eneMOfctR6hqLw6tttn/zr7V8YC6bqOz+v1c5+9ro/Xr3/M+5dq1fq81huf6XcE+9zVlRkAGEQQUaFhIK6qh+oR+gVklCKI293eO3PVKknKzFX5viJCazETiooMUpmhAjwnJl736/H5L7UewPX8OOdE77W+u/v9/fXnP/774/39+PzxfPxw9/3+FZnrer5ff9EaTZ/v9fgx3diQM2HmvF7xzJme7gJiXfhERChsM1NZPcwwFsbTgCIyloL32+DxuBks4ZmxAaH2CaWyEmMPGwVZJc9MXhfg3vIb7xATbU9YkRfYPt2zz7dPP56fHhgJE1aW78PgiVCOCSlyebZPr/Xo80aKSOD0iYh9v/B9Pj4yF0gp20Gd+5WVmalIwOOIgiGgDZ4ZrYUiTuJAERJGqVy139+PtVBoQCHN2WdO63p8fPz+669/vO478nn1GZiBYGbMQKz1WOsKycd5PaJKKuaMCWXV8u77dbedFcc3O9bjA0IiMiTWShiNZnR6al3X9XlODz2TYH9/T0yEpRW1wBE5WlGC0HoQBQahIAvA4IBAqB6sNa8XCQMBYs5b+YMIQqoF0vUY4LbqoVxUsZvuma1IInpiXZ9aF+3SIooMxYM2zpxRPiDAYLqnW/VUaqbBjFFolepj9l/TQ4CR1vP54+fP/16/fps+CoiYc3za7aykBoxWqBy43+7bJ/O6Rkm4rkfxUOSc3b3v/YJxu2o6wnbkilrd4z5c4+H6+C2EfVAalBWSrZlhxDSTHisic2GDCNb16L0l0WZN5BXxBk67QFlAqJkYm5Alztgn65qRbRjFYI2JGEBM9/f0i/kjJgKp6uPHH+/XP3vviiQia+1zLwO63+9VV0QxkIXNPqZ9DhDkeOgmMqJ8bupS3al0LEUqBIJBRIQtqBhN8O6daZ+u52WP+ux7++w//vU/V8Wc/fj4fIC7f80/g3x+/lsoKyV0fX5ELf/ctT7zuvafbw8ROSp7pjcxgTut+VZgY3s9fhRMZF4fn6nFNONhFGlv2cwQgQxR9VQW01Xpw8ww9rQUYPuGnInMGht6ZpQwMz6KmBlmAKSfP/98loezz4mu6m2llFJ3t93umem9vyAyLiifo9AIpiM8gY2dA5nXiZe3972j1L7F1ff3fV/n7BW2bRsAjMEKeXbqGkeuiiyGaaRAAcaHXIyVMIErMX2m+9w7quyOvODAjMc2c5j1eH5+/fmPsJEBQApCQJCKjMiIyIjT99iKEpz26Q7pnC1h93mddQWgIFTn7BAeTm+kWte538whgJhpcNYjpFxPIiIAuj02M+72jCYgiADPseTZb61kGO/pTQAxHvVg0wcAAPbN4xPEMPebVcqLgTDSuOVCyTQWij4da4mSFhXUIQuCviFYRQ8KGoLpjVtVuhY2ahRQBIqFggzmKB7ED8Ysnp/N2DNIM40tCApHt2o9UGGrHTGVixEAYBSJgkHKme3uWsvb3UYnIiQh1rXObduMM8M2A1V5rf392vte9ZQ0EVIOUgWnsWcmQnjqqrwTVa4LJRXX46PvG9HnVAQRGkDKmBn2nD5IUdW7r7oyV3eDCEikqnp2//l+/fnx/E+5HtfnVWsBtZ57v4dmzsy2G89an+tJXBdtFIqMiDl33xslWDHSSKpKQBOalVrUlUSsYGbQdAMRMVFkxFX73nNaJ2Zxzn3Fsv369XPvu6Km79MtMqMeH799/v6vsSrrMezM9fz47Xp8ep97799+e845+/VL1wfMNMjd7yQjcsUldQQEtdZ5v4LRoGEGADKA8VFoumd2ZHowyryG6T4hIXc3gjFYas+BcR93zzB9AGwkhfCZGaZpY75fv96vl2mYlCQ8Z9+/zn5LMmaUXJVX5hVRESHR5wAej1217GEkQOM+1+Nyb3uf9/f766++3967z4YYZt+3NBKyBUNISwRqpgEUigHrSiIYTzeGCeagu31ONxpB5QolbXfv7+/BIc2+mQOCJqJyoQIyM3OBpDVsCYt2hzPXNd7tHVBVnolczbxeX98//+P1668gHtcPRQJAJHaDUHZv1eC2vfeOUFShiLri8SAKCab7tnvGzGBjM2bMeBgwUSjwgQOAGRgjENNv3NDjFoGCaapUC6cmITDgOd/T99iqCoUgsGR8wBgUtGmTgUIWAQVAn5mBoj1nMwaIgmIMEEUGQIBCsdbHbxD7fsFhAJiOEpGeYIIZQBEIRQDTDQDdM8OApyOy6hmxIlMQEQzd95wdEox9zrnfv37ZXXXFzLSRZw5iZgCFYDBA96l1ZVUgIpBQRBUKSWMjKrMqYPCxDzGEJEVMZVRdtpnT0zNhGwam2yBjjyISToRiLe9G8Xj8vu8vbGzbw5Cpx0etpwS2lFRh995KhURekYmKVcqFo2kqFAVEBoQ9UlQtlKGEAFake2ezkJQc7L7fr9frFZWD7/c9DOL7++t+/xIHHHke1/Xbj7//9se/hfP966+ojOTsL7s/fvzwvsdnpk8fA0TEkh4ZVQqgpECes3V63O0G9+6zT8+xW6JyVaxrPRSamSAQAIEyIqL7tNsOQARIUe1xz3hg8Ex3ZFlqQK6siHZ7TPdpfM6xj2ciIkARsULKiMxKB2QxYsZu+4A99Aw4RPcN9HkFGXlNn1wrqzLTtnvD9vSAmD6bWBFPlFISYONGBWBLiYNhppkzeL9f0yfhnGMfBvKi7fPOiuk++33fL4BKrQvkQVkQ7UFkhkoeSwQOVGsBEZm5FClVxGJ0v17j+36/3l+/PEYZWVHhaWYYA4rMvFJX1cKKWFFXzFTmnD17Y4eBCCXTeCKE8LkBBhoMAwTNnA0GAGwIBCPG082kak0300RqLWTijDd95v457190s98EwJnt6dfrr9Nf7q/Z34wZGMhQJADQxmemUSgTQAAMyiWlJBQIWbTnvOf+ps+431//9P1z+i2QkuE+W0rGJff5njkIi4gcQhIchHLh7n4r3N2mqyryinpcj2dkIiLC7nNut6sKD+rMBIOnGzPI03AgIhLUpyMCaLvdu9+9tz0kIMbjBs/Mcfc55+zzvuVh6H3b2+fu/e7zFprx2S84obnfr/Pe3m2fvb+laz1/IyurIjIUZKyPH7WujKz1WfUpEiAqUPfp00NjR6WqMpcNfSBQ4ECpSnczhwAgAgjkPtMtJZXX46lMzoHpZEd0t2Hve7+/lAFz3l8++/16+3RCRl2fn2ut3vv3v/0vn3/7T33er++/3u9fHx+/l/R+vyCe64fvE/WgR8qIipBpgnafcUSSCu/77K+ZN2P3xgCSGBCoMp9Rl5Dd7vuc9zld1yem+zAIpTICu0kNHp+UMmoQM+NWru7NdIzH/vz8rHqEgtnAeCIQZERjiGutzAvEjKLkwc2MUOVT5BB9f4tz9u5zzn33fh+fqOe6PiJXhCsf9XhSAQlFc7bdZCoS5j2+lTl2nwNijD2np1u1VEnE6WZQPD30NGCD3ed7dHJdEeVz24ZBoefHenwCxtNHEYzVAxp36Oo2gzJIzzQRiGHaO2To7rPPW6D4CMrTqDOyss5pelAicj0Vj4yM0uPjmbU8k+s6fXq/GQ8TjLQilpSZGZmRgYFCoboUCyBRJgBAqBJBBAhB3/P1C4P33G9VkQCcg41quhnDzDTMjBnNkPmY1pxBgaAPuud8z3mDRwPMNDaEzw2HCKaJIGO6UREXw3hQEMPM+J7zjsl4/KbKex/wzB4nJNJ0M9gebxiEzwbGxgYyCuTuyAxSUpaYjV21IvK4sYcdK0JXZEak+5zeViozKisXwJjxGFUoqbw8r7PfPrvyyrrAnIOBhu4+oIw6546ZqCDFGIQy68qQ+z7dkatqaSbyikwFUQnzuH6s63fFIqJCiaISIByKM5tUPq7rYzFGHp9AFYWNSrq8t3fDMEYoxMBpiECz93iUCQ0QqahhpjfuqAXsvglVVSC7h+79fe/7uj6vepyzCWL0+vXn6VdkfXz+7V/+p//nH3//X23f3z/3++f9+hNW/fgX5drvO+vjWs+9f67nH7UekeWRj7FRiMCNHHlFVJG17Zlz3G4jjwZAUXXNtKf7HCRlEQmDWzMx2D0zihW5PCPUZ1BAd797v3w2ACGTkcqambUeVY9Q2GMro6ouRUYkLQbPwEjpGWghkLEUihjE0H3PtH3OfreP5Ygatz1ZK+qKtSJkb6DWpfUAhlGEbWsAj+9zg8lAgQpg7pmeafpwWsR6fGRVhFKqtTyMrbqUq0+f7lpXKOdsxh8//hjp7M3cc+6QE7m79zsrBSipskcEIwwDw+lmouqR+ljXI6uMz3m9378mxkyI7Y0AMQMGKhcEA9DnnH3D0PSgVHvf97Zb19PdvRsgIIGDAgxnpjEQKMY93tjMMJBBGgzCPefMvee9595E6FpKYcbNGIYZua/Hx2+//T3XQ5RqkQWMG2BgLAkhPZSLQCQUDS0pAVUiJEnCmwjVp9aFlqLW41MfPx6PT0Jn39iWZ3ZEICIyc9lUrcxSpCTsPvecbXcRUSuvRcXAOXZz3BhBjAat+gwuBAAKVans7bFAJIgBu/sAkpqBvJ4fWQ9CuE+bCGboxgMiUhWRxYw8UhIhtazIj8hPI3vPULlOv08fiKFnxtP2qVwQQhPRp99//XO/fkE8Hj8UCyXKVZ8oZr/s18x95kWE1nPmtLeCrEQAAPLMAecqxRp6Zs85jAENCCIYfDYqYqGIuFZWTL//+sef//wHsR6Pj+fH79+v7/t9orTWNSYEM+vx+dvf/y0rz7nv71+/fv6Z18djPebce3/n83GfV7c/Pp4EdT0JLCmfimRMAJMZQZT0mNMeVWSEAEV6zABgcxoJCGUpbHt66Pa2LWUolQEct4DT5z4zDbh7PD7b3imhECll27aHCAICHBEMkStiwXg8MwxjExIRMPTe73MOcE73OUqr1rU+h4QYAA9e65HrmfE4e/b96+yvVEfIPr17uttG8r4BRQJSKlJa2LNf9JlzS4YzsxnEwMzonF25FMvuCK261vUYgtPSlY/fH9dnSjODwKFKBXVVe9sTisxFiBhEe0tUVkRExeP58fnH3z5//9fHx6c5PtunvY8NSneHYGZ8pndkAn08JkbHByaryEglgxSeAYOznnk9EPgwzDmEUWCEqAsFA74ZIIhRPVQXCiLIJBKgrUoAQxZZ+vhd6weEIhU5xNhkRVR8PMgiYJXyhx6/az0QCAgEtvTQekiJIIYAYGA8DAgPvYHxAKAxWBGr6goF9rhHKAMxMx7IJK9aH/V4UInQGHkCIiHcLZDQNNAzd29lZiQIZUREVWSePuOxm+6x7QZXFlFkRWQgRZRWrSvzisqIak+AciF6jBApadoDLTczmDFw31/urYrn48fKFatUpchcWSuxxkgwM3MQ457pr1///Pf/+n/89ec/9vcvkBTuo3rMYKO6IotISJ9fs/88+4tpsCKIUj3IAqMBUBEVWYyPDwwDChqmlRECHMRSIQ3Aub//9P3+eP4uRWT59Jjr40P1UOWZowxNKFeGzn6937+A54/fNN77ncHj+ej+QquuC3rFR6oYIaZ7nxvDACoIpBk8LiUDEKMi7O2W3RFZuWZ6PB5g3IaxOyIUuu/XVauyglRJwBB19elxE8DMnkMvRmKm7fZQuWIFdLfdxBWxpIreLRKBaFu+xcDMwHi8+0hMhFZ+xHr0ZZgoPz//CMXr+z8ql6oq11U/QgVArPUE7vdL4HMOd9UjkD0xoCAKTKQUqCQiZsbTtwfszFzX1c0IestmHBl5PSKCkNYTzvrx+xKKRIFi754Jezz2eJ1HnsWElGhCociAGANRkfeQaXtu6VGVV6hQRF1+PKvWdM8MaO+2+0oTMZVMA6gUK6si0/i6nmP1fmd9qBYDAxn0PT2SGc8MPhAAwACeAwROxmBocslBPbTWnI0995sslAAyiMhYCTBWLaIgsBGMGVOFAwJgDlEQnE2aCBCAgUAwjE0IhD3nS3Ehd3dG5HpiABRAxDKUEuncJyqV6RMa5hxw1IWEe4QsDVJOmdOAEGM3ghlLREqpyDR9nzvnihDtwZ7xAKFUrQUAPSf2uA6AJlcJoRh3IIhc6eb0jkAEMDYhTGYQjQhKudB4dq0fkbnvf+ITj2dk3u/N/rn6R+Qf8nz9/I/Pzz8i6p///PdVuVKVldePUQRBXViZz/x8+P7p7/+4v39FxB7W46GomZsBAIhQJMAMQh4i+3jG0DE5Nnjcw7QOMQq8OefEeq6PDyTjq/LMzqqZqow+73Punnw8nnu/X6+fbV/X53U9Pe7dbl/rY/ZX1DIeEylN4B01HM0wE0E17wBXZeQDz1QYlBWRpw+GISKJVEbUIgKIyFDYE5EoI5eEe4NyLdvnvt3d91u0AkmRpUiP0cycgdPHfRTlNsFMBKEM8MykVmRmDrTQ3u/3/X36uG/PZK4IrvW81kfG45yOpViJMmKBQvr84+8YZV6Ph1hQ2EzbrcgZC4d0fLsbzBgZDoDEhJSqh64PRfS+MzTY3YqoKqmAc972RF1RV6iAYVR1RTKCQsycc9/TwhmjCDzT56RQFpQygXbbzUyfPv06+3Y7I7HtIVJypK71QAETWeMZYZvp8/4KwqfxAWYGH6D38ThiScs+03vOJgKAos/c79kbH/bBBw5RCmGjAMhQLhyMpZhzlEvPT4CAsSIUAQ1AoAhCEX3fczY+9KHhnDnffv3pr7/YN8cIBIAP8nRDKBcEEQgEMoHWU7XmvOkNIMEosh6fGsEoMnMFUtsMQwjcc7r3Pvv29KDpM+eMzYAsacbn3jNcj2fVA8MA+OzxgIYxjLnqqloQIBsyIlMpzMyAgwxmn6+oiLXO/cajVcDYqiRq0IxDDiXtwYpSPkCEPJ7BxoaRIiNS5P3e+/559re7h/EMQATD5+9//5/+H/+vjNiv73P2zz//8fr+OWdnLqUUefbLhNZnt85rM7htT0TMeM7mHLA9KFAQoND6yFoQAaJxE5GVnhBq2r1wiIAwqsdHVK3refbOLML3fXtmbIz39vme06EMxOj5+9/WCvc9HBMR6Zm11v3+y0Mk7ncEQlErM1GDMisQSBHKWoSmiJDpiIhKi4iIiBnA0yc0ochawHEzE6HH4yMIy9N7zvE0DJoBJqREoiLXGh+YymX3eK71xHRvux2+93fvl8YeMH3GpnuP7bag+4y3kGIRCUyBZYOn+7a3h4io9ex9suQ5aCLkPt2nalUuKWLSE8Dpe4CZmZ5uOADhmUYBjAfAg8PHMN1NFIw9kckQEbEujjmHoVZCq1Kx2gxnOJnJEFGEELkKRIS7u+/ptn2/331e9mDA41sYzPS4fVpKZSGkmEHD4/ERVWgkRWXUgrHPcYfy9PG9B2RmjI0PPvgwhww9H1oPolgXeM7Gnu7xBvDBhzmsIq+ZoTdi7huCMRlEEqlYygexGITGZ+j3r3+er7+mNxgBKFKVwMxmYIo+s7/nbCkxZBABZgxmzBwyUGGTiwggMjAIpZRJlNzEGM85EZKmz82AmBlsISKUCVYmhJlzGoOSyLoWBAQKAo9PH0UFGo8QAwMiVbIABMHM2DZkXqrCNbttI4Vn9osMMpgTEYRO+/RGmVGKUKUiIaTl2+PDGHJscpC9X+M9czOuqFqfUgHr8Xx+/svu/X/+b//vf/8v/+W6flvr432/B4bBoGebzJzetok8PiMiAwXj6ffMYKabMbORySJiGFUqmOkZK5eozEUU3TGb2Wfu1/2r9/n8/O3KjMxrXfX4/Hj+7uOYPufO9aD7/fWL05W5KjErH4wBnHV9aK0BVWgIjSfvfUesjA9RmSlEkJExvWffkSuriuTQ9+57Q4QiI4lwtwBCAYhhxgAAB8ZSRgYxCgNMSIzsRkbg5ni6xSUtgcZK9XlLI0fUNQ7bMyDM9vj0gemz3W2z993d+5zj29MhTb/VHjoI5cpafe69v9+vF8jeZ7/e7/fZbxSTlSsrrqwVVaNFCIYgETOcgw+GAQUEAWMkqRQBIszMGDCRVQ9C3bsEwYQYZjb1vP74l2HAcHef07unlWV3EKCzNzZ2ZGIzuKen7Q4gAN33fr++9vv77Bdw9m4f9xtJUYKQa5XqwcjeMYKccyJjCE9rutn2Ho76YDNGgSBCtZCnN8co4MIx0/iGEDHTMz2zwaqL9pw9GtwACszs98whgliSUEwEmlo/rs+/SUG/pt+cg890z94zjYY++FBBXdIiioCBc+gDQMy9MQgyCM15YcNElJ6f7jMzlQ+wZWw80BqJmAwiIqQgokAogIgHWShkNI1Gktx0e8697xkb28duGnvO/b197NN9d989u3u7jWr2tvvs23vPTOkxs0eqdSE1DYQ079uv777v3ndEQQhpYDy9EYoUgjnntvfpX9P37J5+Z8X14/esD8TplyYgIFDfrz//8X/9H1//8T+mv9/3+2uff/7H/9j3W0pW4ffj+QPAB+NxKFZ9ruuDANy98T3uGc/ZDGBsjEJzvxlHVNWaGUnjRmbGg8Y6+/75z3OOqoYYd37+ftyjrOuhkm0UDu7Xz7OPrkddH0O/36/uyUyFQkpl5MXkWp9Y+/1OPSajp2e6u8fH3gM1p1UVfWbsnuk+uGqFwuPwRCY2YB+f9tgM06CIDKX7+BgBWigiIJk554Zghvurnr+d90saYIYOlEuM/bIbfgSLiIgTV/bxHFMDIyzCGmHweNzNHG+5zznn3u/3+36sa7rBGTmnbx97v9+vc5CHQErb3XP3K+OKKC4FnKNQjrGOCMmjAuNAxtJabOoKDzoRlSgEYLcZ5gwCoBsfpiGVCwXHE/G+v33uc58q6qo5475vuzJ9XsFzxj4GkOU7QrcRFuyzRzNfX274kadfV34GV+871BIQvZ2BDYrTN6PKzCnkvbcnHuuJiKzeGwEAEIjZG1v5oAJDGCwtIjQmpPVQXrPBBjObMfZgIphgDKEs1WPe7+mbVQxnHz6IXBOePkqTwYTCAO3zekl3rkVDFQRGUSODMYznfM+cWP82PQhoSXM2feLxB0TMwEQGgAciFCBzVj2flCSPRYAUQiBPGB+7e7+RCcYHPKeJqcyIiCOUkYPm7Je7u1+eDyH7hFIABlDYxooV2DN19/dzfhvAR4hcuPv0eIuFB53Ii2BsszOW55x7MxMC8Nl2K+mzMVIBmdfkivisvAig31/v/9///v95f719f/8m//Uf/y3Wo+rzH//3//e3v//Pj8dH7VTEuMfuJEVej+vjN1XN2TIROUJzRwUYhCGCKr6bXAhsIumz71csyU2AUaR9vn7+3GdPH9uZQUZoBOvHs99d9TXTROb1EddjOLmemeneTECG8no8JAG5HqGcyH79Skmzz72JiHBkeGxNKSJV57xwYCrTyGOmK2tw35sZzR5bFRx8XrUupJCkhMO0x5Hlc+TTEBAKRER0u3yGlmFmbCZCOZzum9ZDmSuS6MNY7pFi3DN7hpmJwEOQ2+3ec74O42nlEum+Nx3reb/f/MH1fPx4LIjX6ztjlEQUMHPGxjM+PgaRwACn97UeEgTY0mNm935nLeUDBVgjUFDADFAx/3+C8HVZkmRJ0uw+ZlE194jMU1V9GQwIgwvNX7z/IwEEahqarqqTGbG3m6mwYK37zPR0VQnDJHEfuXS9GE8erb39fk7ST2oDMOe55V710sy5PyddGkpusX9ovrU+eY69qjaaX7//D9d//6P+jcE2ZDQJk74/36/3Ytomofto5r57Wxrt6/3z5x/nRBrSQjNIIqEMBqTS6wdkzoNgmtkEgIRARAJBTEItyDwPhg6YMrVB0AAzyQEQCMZoAcRgamn/mOfDzOkP0zPUXrLHTTLTTLRecz7P/bne/4KXRpjxpV3M3M+T33/9+Of/9+v3f5xpWYgM3Q8arUvW0NKaGVmaPTyMJBNmhskk2GVLzAGCtVhV7j4gu8KZnO4DLC1gZLC99uvCM8+HxHbmTDg69mK2UffNvtZa2nvO48pQMGTIsIQ8M8B0536cCSfDKHbNpPxmOHmS6eR9Xbt2/KCNF7Xv+/P19fm//t//91prrf3j9Y/146p//PF8/zPn3n/+l84Dnu7c3zVee+0rfr1QcoZJZzxTtr31+kEftDi/2DWJlpkRzLTGaJBIsHLu7oNrv97P5+t+fv9DaG2GdHqeH1oFD7J91f7Mr8yzaq8qUJ+TGdJ4cnd3J+11Jcdy7WImw5nHrJEDlq1astOMlixMTiMnByYZK0lbmtNJ+7qq6gFMZgiZDwDYBdM5ZJCQXUpayNakl4SEJIa0pakVvVe9AMYWWptgrac/EBeTclmi/EqOehie821fVL1+/LH3K0lqWZoM8PX7b+S1dH//8+fP9+vHn8tCAIDldMNjNqlV6zlf6/qDaSjG0Of8Lr8BEjpA93M+j2Wun0AyUs1az/ffq5YkTEJ31mSej/YGMCD7ZZdLq1Yygdd+9enukxVblz1TBDj21K593q0p0Lx6zvr5L2u/kIMzM4y15Jz06eeHPf1kOlKJJMwiGPa6ypX0fX+vtVy71KoNBmSxNgMCb6pJ6Bm+tF7UojbPA6EDoS1vNtMPOSQk1NJ6SZo+k5aLIdPyGs4AXlKgp7+YoTayqrzLrOQ2hjnf3+v1HjX9YCaf6a/9+oP9njycQy25BpOsff36/ff7efppsRjAlpLYa609Sncjrdp2MTCaQcOMJwO4iswkY5BgQEnoPt3JLAFLeK/LWpQBEWsjg4mkmqJqW5ocXrtU59xJ5zkIAAzjvcac+7uqnjmTrto4rjXnPs/tqpkh2AZMCUaSGrp0JTOV4cm0VMx41f/jf/9//6//2/9LM5/fv0OW5+eP9/5v/73vxsvpsWQOWa/3ev14Nchzf4wQSEKM+3ycTLfE/flc63ru+7UaiUwYlzUSMJSWq4ScvH7++PXXf35+n7EhxM/3PdeLcz7f/7R2B18/+vn/9f21ykh939mcuS8uLNdK7vSzrz9KeLr07jxhLJtVtrUImfGkQ58+AcA2g5EphhknqXW5VhJOTj/gRGSSWLLt2plhJK0MltHAAIwY0pOZTM7zffrMBNe+3nu9RkzCkBxCppMnp+Ut3vZ27U4spwMks9e7rhdoXS+tQsuuGX7//s/P55/P8/X3X/8zz+8i5PT5AED3oPFaoEQZxpzuCWTy3OkHYFRamLp+aL9mhmRa1kgA3TcOk9yHTK0FwAxdu6gFTD/zfHgOOZjaL8snfT+3Xaq9Xm/QDFDykpU8nraw3tf109KZB9fe7/f736p+fn//Pf0wTuS1cACriLqPRZJk0PJ6rX2B+9znfDKxvK8fkgXYEJLJaG0ApFUqM+nne04DyBgIc1iLWhAIggTMMDMQ+pn7K3//+3z/Is0ESPe5z/35pgPWurBRSYKAvbbrWuunaoNUOvdDgkpc9EmCgUOHATFPc76nP+nn9fpR//jv3j+7n/u+6WMQEi687FrX2peqGE5/hsiebuZJ3909CTMydGsmIZkkp6e7AeA53xhXjQW2C6j9qmszeISttVWSqP1aLFxI0w2Z+5N+5utvBKL7N2QAo3Tm2J7pTAew5RqRfqQa+zmdNBhKEp3uw5yZ7+khh3P+8f7jWq+1qswf//Jv//bf/5/XP/673n+u9YMytsba11q71ho9PQeBjYWXLFnkPM/3nA/Tc9ra3dmXh8Oc7s9z/5a3pBnAA/YaiHBdJfXnc87TT3Ny+iCf78/f//l/aleSVZvk+9c/p480M33ur6v2qm1sr3IJQGu/Xq8f2uW6rv1j+SdMa5pJAnHfD+m9N5npATEAMGi8lm2GEbYyTz83AgkLASRPchhsY2IEIDBoQC7S6ZB2ImtmgDTnOX1O0pMzMOTz9ff3r3/2eYDuDknHrswgal0Mrkt2n2OBvPbLVcDz/bk/f53n6/7rf2aeJ0xXeckLKEaQdBhjoBYWa13JyRwYGNVmvSkzAVRCg0cqSfTkOc/na87HBCsdr0sugoT2C5sODmLmSFkFje0lQZj2kJyZTjKS13btMEnWsk2n87S91n4nz/P5676/oG3ur9/9fPVzZzLS05/JnQzp59wQi8bNyEr3uW/5Ak2CBnr6YQ5zGDAwcxpgcvpRLRomnMYehjmQmYZhGoBMPyoxzDnzPOQMPc+Hc5Zs7MwuaZWW8PL7T+3XpAlgZoG1XiBgero/ef46z9+Tj9Zr/fg3zpnPF30gkDm/cv5mZtLXflG7n98IzMyE0UySGNUPeQGQdBtNRiBXmNqXbTQwhCRDYCzv2pYZg63a0vS4dqmM1lreu9aaJPNQINPppyMihcio+2RGxfD5/j6fD8M8zSxbgHEmZlilWq7r2u9yrXW5Vs/0033u9J0z0sY1NPKwZpzTkpiyKtPdz2j/+Jf/+ud//V/857+yLqn6fDDa+7n/RibgxX3O8zAhhwl9+rmJwAATMtK247n7MMlzvnL/nQgYAgPs63qmYZhhUtdLpWmMn++/k5v0nPv773/en2/lk3zW8jmf0wdAcxIwLgxVQBij9D0E6PRzwiIzOT3dmYYsPIHCkJNbtSG2k0BhbFrZvtjv5/my1QeLNJ0nzHN/7+v92n9091pZ9rreSZLkHBeSvPaagdaqUsllDxSN12gm3enHVnJPDajvX52serPKruQBJg/K4MkoTTp9f56va73veyzPrPPc9/2rm/frX+EmNSPQzDAApg6NQhvZtssw2KCZhtBGnmnakwEopXFPVdkeolU+ZgCf8zn97FowWld//TVz189/lcqyXIezeu31hgARcq39StT303pIQHbR5/7+4rQkGC99/fPvfr7//Mf/ZZLv719gPjeQoJz0E7Fqe2RvQRJPZ85gq7JmbUvt5SRzf4uRl+vigrXmfMSe3HN/ATMiw/1wmUG15xzOoR9GkwYYSAYks5b2e+4vRQDAdF1FWS7KAIHaeNADxsFINXkmkSWb0ZCcTzNVwlv7BxgvcjjnnG/yvf/4t11vJvn9H5/7+3r961oXxL4oDT0yZfphZp5ja0aSAArFArloQidJjkX6UOy1B1cJROL1YqbP55///v/541//+7r+yOcvZGgo+cKL50xn1RpFWhJa27Kx1o/7eZ7++BhR9nme04eBIZEbZqS1Nsx9zxlOWSHpByrVpAF0rbWrqvF5PjO3FK1V12v/eG8vSYjpm2G6n+fv0r/O+XXfn7c900xmJt3zfMDYMw/TSdcq2wCAM4xynu+/5DUu7T8uavozM2ttWQWctmvtxRda13q/Jg9+9efT5/M2J+d8f9/fn73C94rKWnnu5DFT3s/95To5DUYWoH7uL7SAmTmfX3iS7+QoTUAvWwbu83X6E5IJmJlznuR0H2l7fD5PTqzCJZQkaZnneYhJjcbL1k4G8LpqVYL3Va+XaiGLkkpeVlVd3qu7mUKV5L6/7/uXLWZsvKsKFcjn3N3fkz7nJM2Q5+4+J3efz+fvv37//s9zvl7vH9f1w6viOX0y98lpJjnpHjrnzrQFMOk8bduq8qp1eS1kMGOmVSVtJulnnqfTAG7Za63uhxkDE5K+v09/E+bzTfpzf39+/6JBSDh0PtZBqbpca1VZNT0uV5kk3ZlJOmCVV4WDUqrX+x/X9S+ggfO5J+d57j7PPPf9+xewtJnJ6aqlVcxYSuacO6TWlQFc9fJasqXFAMx5CAAyyWRA0qhEDn0zaL0pT5rxnNZI+yflPN95viDSZtDaeMkb6L5PEs2cnjxMwPTDRKo5X/N8mJ5p5khI8t5QQdLLFN35/JrzNfNBAeZ51npX/Zi+mUxg8t4/9/Xu08C+3oCt6TP3h4l8oYUkWxZjWNZCmnSfh2mIGBgABOV1uQqC18gj9usfP//8r8lJulbJpDMZAYC99rbF6T7f6Z7uvn89z6OqVa9dL2CYmXPOnTydu9PAdOccVFgBz5TLrrWWak9sXRlNBvpk5IqERBpca++fPwqYp/PM6TmPvHmO6q26OGftPfdnEpJJyAMBtF5aL5AtbGBOM0EIiYXXTJYuazEBVFsuSj3NVIuTc57f6s977WUBqfTzbTwnMrXXjCRXvSXZZrCl3Mx9f/7z+fy1KoY8d/dzTjNSGMLcRsMwSU4gOSastTJ9zllyVezB2yoL2z1hBvq5vwSG7nP6wHBm1bWu1yT3eZhJgtzdJMxAbLE2UpJh8ELufuxr1X76c/qg3M+v9NOnz3Of7+8E1cYFY5HcSRBVxXg4ri0qmX4yz6ORjFxV7/Le7x/2vu8elZYs59yJGDGTASLAA0JmJicEJpKQcZFgUIa2RR/mltXP5zw3GaykZw6cJMpyXZD5fM7nd/eDQQucjGJgmOEwnRlGMFrL16v2G8lSZjKs1w4tcb3eybzf//C6ku6+If18pp/c34POzNpbtT6f35/P95wnz4MF5HkAENMuyZrJNNb2fntdABMIGIlaI8EQzXkwwDxfk8O5B0DozDxY2vX7+9/7+WaY5zP9oTw5CNZa6y04z+kOBzAwaeZMGgIww9wzo7VwybWva9Vb3gM5raTvr+fXP+f+Nc+v6Q9VWhsyz7cYQMbFfd9Skekk6ef7d/fNeNJaW6qZfp7/OXODiXP6/nx9/f7r6+svmKoC2WUbIctarl17lSCz9q7r9Xy+lJE2A+np55wPChVXgUInmWkm93NPBqJ5ai/beZ6kz3NPnzxf/dyA7Eyjk+lJcDF4LHnV5aq1l/dKf3++v879yblVa63XyEBVrbUgqMD5/uL5xovJvv6AwWuv95x7xqdPJz19zpPzkAMmdJp0MiP1hDEwjPalWjOdnLufGUDTA9UPSTO6P09/f5L0kIFkrx+uiuVyXYtuMUO8hEvrx9o/976673Maral6Ts9Ekl2u7bVVa9e19gsQJUBKzv18ORMyRHYhT8dly5mALCMyRwzOMLarCoAA5S171GucmXO+TQuGnOcMYYbO9NjGoCAs27Zq7zcw02VLdr2YsRGPWXv/IZem7a3sCfay10zJXvsFkxystTdS50CEr/1v5dXP1+QGmB6mkwznJAQEJCQje+xaiw4zfR4mUmFmHoaqnQzTkJk86c7UKkZnkplk1trX9RKmTJlz+j5MmEhFFTgNDJnpSZ/ODaJDj8qutdZr1Zrp+74tXa9X1aq97Oq+Ma/XDxkh4nS79uvHD6DPp6rWUp/7PN8hEiUTJz2kz3M/z8wZBZoJgCwXCYI5EKsYhmBLe3qwyZmnux94wJzM8zXPZ9eP+zzJb7jpZ57nM8+kYQ1a9fJaWlu16ZAbm8Ac1Uuq6YaSFwmZ5+v3dGu91355LdmdOeekn/l8zvORJC1UTN05359f8/mV/iyp6Hk+PWcyDNDdh5xJTz+dI8YuaBQKayxsMUpOknNiO0kgHZiq3dO4vF+dfD5/j/C+Bk0ajZjkMJlMCMGTTpIJstdemvPBJAO4tqi1N2QSiZlkTp/v5/vXnKf7iMkwVa4qb6+ionnIs7yYJ3PElsyEOYhar1o/pF3r1ef+3N9MZrrzzPlizuf+dfp7+tPPt9wMVdvW9ENOOPfz6RyQvVwr5+lzAmu/sXMehLHsc05ygPN8A9u1pWFTL3ZhZTJ95J3nRplJ8lzXynn6+e7PfZ7DxPvH+FJd+/qHcRIkUAhGVcheZV9rv4zBro2YtJ/P5zzP8rI3QwJDJsNk0qfTOeecPokYgZFXbbsGQp/n6T61llXMnPMMSIbMMAN9koOSDgmTTBgy7dpIndnXjx8//rWqqEKA053uSaLIlAt4PndymHlOI1atMFGv2oTM6TRGYqZnmpzc36cfVATKriLYhcs2hKRcMJMHU2sDc3q6SQDVtre9kSYx7LUBchySiFq1BQBjJt/nruvCa6Y7H4iW1l6k0YywXbXxzDREADp9kCTb2te76i3Vqsvl2vt6/ai6qq7OnPOoVp97es7zMMe1XFvr0tpG04mCQeOZc38/37/mtLWSgFUbGWDgBJjPZ6a9ttYlF0aqOfd8vpBLntMEhGQ6aQhMU2/0ouMMaTjnvmfOrqtqATM9/eG5px9stGDJixHRDCAACaPrUv2QN8gC1LlJzzk5j7TkWvvVCYBc13bVc39sJJ37BlwrGAZieVQzBdBhRq7luq732hucIdOnj0WSqoKZmeVlFWFO01l1kTGollQBgOdIAgCGktPdfZCBvr9FDQFqbQzDUKyr1qoqaTTNnO7uPKLWvuxqMgCcz1F27T9c2BU8/QCygUCnGUIwBg/kznPfX3/P+ZynP59PmnQXqKf7yIvy5Mz5dJ55HmUMSbojAEm19w+5AkGqgihP0oBtQ+cOjMDsfSUkOc/35BExtkp7yzvdhPTd+X0/v2ZYXtOd+z73DX0+n/N8keHkfg4Y6HR3k4ElLZLpXq5FOTc2qu3ROcdVtZYtZpZ85oll655Dq/vYSg9Wn2dOe62nP/aC5TIMg7wk57QQ3Xk6BICBQRo8QrBq4V3L7hJ50LSYCW1X1YUelXkaZhW2M88Ys8PsvVXXzG8nUltLh/O5k0OunvGSpCi2176YGfDEGqKZTB9gZsRQ0D058kZLq6Y/Zx5waQvZ267OkJPpVRdWOt1P5SUOCelhIGBLBsawtAzOYAohGzIjCWbO/Xhp+pFId6K9fLphVl2unfS63vfzQYMr6fvz9f7jH14/0tnb3bP2LlUTGGCYr69f0/d+/YRACyPwEgctCIBGLmbtjVCex+8flOczwOQWIOb+6j77z3/h/k4HS75UG9L3V3++5vnoerNXP3ev215zTuaWpUCi/UbBgMhBpfWWtH8UacIwTGBq1fBjDdoXQ85jiWHy5MmuS69/DP8HZ8oXIGbynOder2utC5gcRsIqGCHjAPLqtKzMY3uhM4czFLJmBmwJ6H76/i5xrfdMn+euZapqrdoFYMOyF2RUe1X6qXXVvvCq/fN5/kc/T10eMgjV3nSbMYZR1VY5fct2bWbSQ6O1FiSHAVtaa1/Lq4fn3O/nhgXkvuePJulDCPJ0C2cekqQN5dXqHkzg9PNMPnOy17/sdd3P0+dkIpAGkJBgpuSjMBBr7Uz7+Uw/o/n9/W2Tfpjeey9vq6Q85/u5f+M6HaT1enef7hsAllaUk6Mq1xayAIegSZ7ue699zo3VOenTOTLI57lJvNZevrw8IhmGEIJHGSMBa1/La63Xa7/IGTUCyJkZ9vuqvT+fO/3Yk2Q6A7JK7nQmsoPSw5gZIQuR9PG0gGkh106whOj5aG5NQOUNsnbthQ2QUSYaU1ZB93M6xxKj2mtg1Vvr6nxmzszxQIYcJp0nk9Gu2klnehgWoLkfMgADQMLEOHO67xAmM+nn7vPJ88DIk+7T93AI5/ncn0/uhwQYXT3D9JjBIeknExAYSjZarrJN6FD7h3WVcWnSfR5JULBAdll1Po9Yrr1f77XfENVa5aWNV8IEziERaJi0VskbBoECCwCwQRi8urvPR7X0+kP7VddPrWsGrZdc9+f7+f4mgWi/9/WT0fQH5qSTqArDgDj9/dxP92Mt10u2vJhDDjmZDAsVAEZQpRJz5nzwqC7X268/9PqHatsbLyDhnDsToWl6jh1bAON9/Vi1ZwIIy2/sydF6a71hAZOWVWtf1+u63rAoueS1bE23ADsJzLqugfXjB+Y5H1XRMFrXH+t6I+AwmT5S1f6J63r/sapqvXT9qL0lzwwTWWuvtd+SMCR9WmuNzNSqS2uBhFWePlJgDg8Il12qGsMAQw7DcqE6YroZMQuiZWnPWCImTBPbAN3J3f2cfgBYpPN8nfsbAcwEzKj7JMMMM53MuXtuloD+5vvrIWUqzPv981rbc873d9/fVr3eP5kOx4GZmYAyJ/3MtAhU7ZrlaAsxkWp5kzbP5Jtz0FiyJs/T6bif52PXCgnpbgTCGOb0Y8ZSppNmANEz6TyfpF2C1N7e29KunSFpMoNIg3rGVUCSVXYJJTkkDZBVy7VUm0n6wMg1dk/3uUH38+nzxYSZMZPxumq/7Uukz+c89/N8+hxsrTUYWO8t13TbRZL+SAWc6WRg6CQtZnLSub/v9EyKEV7IjJih7+mHKEqfc39+M4FhprxqXev1tgov1WI8Ggg5OSfPByBgpGKOCo2ksgsGetKyqYVcq94/39frsn3t19pX7Qt50mhc25ZdRq5a64U0ox9//mPtJQAmGeaZZ2ZMCSBlX68/9+sn6ec5yTMz0JMHHfrQANNn+mGecz6StPb8/s/8+p/ISNZirel+7u8+nznf8/nM83itTujDlIf0Pf0BZiRkDBON1kKj2ohzDhiYRGWmycEggDmdz933hwSDzsxD7ukPCvZA1bXWde7PnGfMTHc6Halq7dp7qrofjPaLbYi0pA1FmNB5pNLe63VBMsfY+wVlJE9P23ZZdvkC1t7X9XOvC9AqhGcMAIJBpevaa69V63r/WOtCBvZ6VZWkYSwYTajappiqWmN7bdeyXwydMxO5qjwzyKYmJH1/ToJsS+DJ2NReGhtkkFbBMMlS25shzZymAZQpv6SyjMW0PV7b+/LeA6Xt2q4tSq5MoLSuWp60ZgmR0zlSn+kMwH69m4QGTo/rvfbuaWa6T9LJc/o55zm55VKt5PTzzfnYA50+wQDonKGdyVpvTGdOYGJXkoVFo/ZyLE2wdM6ZJFFlgHPutdYyyTMzSacfr21bkOfOyfX+ATKmJIRVrrVfqnL5fBpmlRkLwLIG7FLJ1OlZnsLX9f7+um3vtdPPnMnGM51nwii19qKmEyr3rTxEpw8Tc+UJ0t4Lnuf+qvUvBGsnSQ5JukEI0jm3bUSmh56mNipNBjIDWMxMO5BIezIZWay9J40lL1WpFpOqi1qyJWkZGzLd0615bV2hJdkbSA5MEuVBGsbrwrkYLfL1jOY83+f+yGvSe9fJyXksjaj9StLpJH0/5zlrryHGMyPmPN3g9Z5hrZfff9a1JUL6+7Y4ZF0vMN8f7ZfqNffD2OtN56//+B/d/W//7f8GRsGgZLrWZnKez3O+X3mVCwU6z53k+fr7Wu8SX99/vb1+vF5M0veoKj0zAjoznefbzGhca87DZIaZp3NnDue7Zs9g10A/N9a6fpAwkbTWxoic57HIZIbRZKJuZDKjVgzAgsaA1SpveTFOZnJmPuX3ul4gugeokgvB6STITEmuupCnByYT+cKGhcik71PXS/ayc44FE1myZgA1IJJUbaaZwzhD7b3fa7qnu1yHTAKTGZetaoOcPP18NPSczsfcZJ4n75yCniTRa2PnJMxM5zxL2JZIDhLrva8/0urvR+stfl3X2j9+ptsyMiCSOfayyXmMxqiu1/WnJHR6vqUzk+Zxbdfq7pK9NmamQUIJz/O9pSSdY4k2Jdeafu7vv8Wl+TCCMg4B7MoqIabtJduSXdaSvNJnRjMtStBpS0hgm84QyoY+3cy57y8kDEMSKYTJgPZ1PafTx0MaUyUtL2T5TEALWUNP7y7E6e93XV4ilJ08zAylQrqStilf59wAIA+nEYhVL9ZkZO9al89jb6x0W6/T6e4E78sCZtX+6l+nj6nJqVWnj8fI13ZVMWIyM4h+bq1dywAg177eSauqSpkZ8ZxjVLvA/TxDs0r1In+turzeYERyBF4LAHJO6ln7xVzyln3O3c+puqzCWtf7fP8+963lPm3XMPdzX/0KdPfr9Q5UCQwjRE6fB9kuC8C2pHJpXZpMN9LM2O+1lEQ2Zz6//gJc3po+d/m1rxc24R//7X8jBwxkqAZhvLxonn56OB3Px9LMP5/nr7Uv8JzDpO/Ou8sbnZkkHcuiypPGQZw+y8ZBTEYDADOcfmaaqoUAG/pkTiPDmZy9NxNopoPLiwQAANcidJ61NjIDM3TLNbVlMcg1mT43KrkkJZFl+aoNABZa6ifdtymVAHIALFehRSfT/dzphprMfR/SMNOPaMCrCEPOPGBYuDuHEGa05Jo503FtATlJbNs63airygLiWulMC62pCt3Tq2rOyQS/UbpPczE5NCQ5ySBb47W43rrbNcCoJAEgBOmR4yEzatfbVTNdWlKt60cYoPOEXmsVs2tbxXlOUvuVc/qcc55JC5EZT/oID8i11mvvH+va9/O9N+ectct7YyxLdXKWK0P3DVOqtZY1xnVdCyaEGeiJmdznWfXmWhGecXFafZ4kFtbkjMdeVeBViOf7Tp/nIQwMYHSek3TSBqGq3ZPu28hlS3d6+oj35OB6+ixXZiYtnHTtq/tODkNyhghyPuFJVGujhWe9Xnu/Pp9npmu9+us/rr1gJTnn996Xy+nkjOC6LtDn85ELSNpW4ip7XWhJmkHLBmRm5LU2MwMMA9Jg1tpz7i+pAEAUHdLfX39D2wVAXG7FpUw+96+15fphOWQS7WvZ9Hf3Z1xVS+j+/k6yZq+9Js1w7QVeVelzP8/1+mlPAuNMzrRkyHluAar9+onc6TLD7j7JrfkxQUEKda2ptd8QbBqlT34/n/uHNcF//hftnfu3pj3MedKno21r7YFr/1x7jw6SpPX6qaly0Xef8/7x59pXwHZOy2V75tEIkueWSrUwYBIxCEkS5UtSdzQnsMrNETPnq/Os/UaVNPb9fL5///3++Ucth04/VXvVjwxU1drYMOlvGdU100zIYaC2THkzMMzpSTBaJQqZOfGUFTIZnEnLxuaZQsrInnP6vidZa9Xa06/3z5/n/u7cTE9wLSwYxZkGOlgFc567cxvsa6D71ERmRhlmbmaDmJrznV1iZ7JemyqIAHKIVZI1h+eMPk9/XftPrW2EK5Dw+vEnnnNCAl5mzuece+8f00KFFkQqs6iZOdMtS3HmSVradtC63n/+Y+za009QSTlP3FgmY+d5PLiWBTT42uuZU6uski0JPLoy9HOq1qqXXSpn1JNJM4cmo5nBtmtXeRKptC6sngMCzhwg54HIBWOtbg2+rj8okiRc+/XaP5d37Y3NsFyrNqC6SuWZ9Hmej+0kz/0FzETSlGdABcEsryUxSY6ESObuvqUgxriWrHO+mAaqahiIUVl9Tk6aR648T87v5777PEqffhhkntxIBjDl8xwYrwoNgweBmB6Ea2ttZCTskZNYFmJQGVfVZRlAlkFGZiiT6fRDwiAMrNe79n7uO7OsnQ4gBDC2F0hEktYeFdYA3TNjm23MWqtqzYwtj3LOee7u2Lre11prQJBOngdN38c4yTl3ebveo3R6MACNF2uptq5/1Ptf13oD3fd9/9V//5/5+z947kkQcrnWMOccysh7VbmEtTd1yRtdfv8Dr6c/fl2uDUws7VqXvOf0eb4hM6z9Xq8/tV7IiOFkDi55M656rVqQ6TPDNJKlsldypJI3IvcRVWsPPOcwlGut2rWxJZHMOQDnYcIAyTTy9AewVyfAOU+mVYvRzIEBQPQxdpXsMSDGzAxgTQ7EVZi1rhlcrnUhlzczAWymJw24KhyLdV21X669Vp3zPM+vzr32llcGy0z6ALKQq/vQJ+mZsWUPEya5O59nGMM5J+dDA+MytSzv/f7x8x/7x0+9f2i9pYsJE80wGEKrACRhMKCMk0DAcnEQoExCuGrv68Wku1mFwZYLT0bT3WlVTfLcH1QuBc1gl6qUTD+TCAx09/lMf859+mRXST7n7/N8n5xznunhcO5POmsYV+XcaEDlBcqEtOXkpGdVJTLRVNLn9F4NyUiJxks+09f1yklANp6pocUgcd9fLq8qMpnu87BraHCG8zx1LVASQLImkdOfodjSIGpyQzpzXbtnTj8nZ/kqlb2QPNhVa8Onn98Y6Tqfv49n5c/08zz3r1//oaoZV4nRPFHgQvxIzkyXNzPJlGGCTJJ+LKqWyt3d910yJqVz7v16aYxQvQCYPs8ECLgTy9d69/NguyoJAoFNBjRm7ZVoGhW1VqeqdD4tFQOTtXT6I629luX7fD/3d62XZgasSrdgZuwZAbr7TqKcSUDmdI5W1f4BjAJH3rAgkw/Sdb1rrfPcEpD7+375dT9f17Zer9faq15g45YGXNec5nzl9N4vrbcu17UBe1vGFofpAeyqDanrgkVZs6cfjLzpm2m78KB4VQ4znX6SuF7Y5gIfvmqGYUzPPTNCS7IlFVq2hs5zZGAss36AmQAahp5zRNLDMAyUq1QFnr5h8HJmOkmsZZdwMnZTJso0hHLVUsnLZdAF5HkghFoFZpz55PlUSbygMlPr9fI1/MjznP4Ak9Rak9K2x/QjWxbP9wA2ZNLwdm3KAU1PkudDt22vPXnIIFS1Xj8K6Xpf+xvWPL+6PxDITMmmlBlQkplOUkmmq14hcISgwMDM6Tw6lmR0vr8y2fs9IFMLkpkp1V5boALY++fzfMzr0ffJs05Rxs65+3ySFs2kOTXHIv0AgvRH66oiT8aDcs5ZSNM9c7oby7UzYWJXrXqee3IOlb6HHoQAzYwNpAeS9MCkc/fnqpdVnQbOnKtWeT3PbaG1p2eGXaXBKkvhnvM53mstZEvyc3rKcq20ug/T0hFSbXIyIbIsgUxVLYcApEfRvipG4Kp69Wk89pX+fD5f1+tFNCqvC8BjltYS5BwmIMHQGjFhjqSRM7NYlpueGY9rnMmc9iqv0r4YPp/f67pcBUYWkMxkoAw0illoJlFJta1MT1mM6KQfwK6RM12uq/5kPLlnmH6e55zn3Od2t5cmiDMMGVn2WnuTnPvI0nhI960zctnFgIyXauMlrXz9+znPWvv0wbbK7z+AHbBXFcl8f53zu5bm+ZrzTJVtXT9oP59/fn/9/vHzX5nMk6vWtTa5u0cjWyDU9kofXZfWzudLEqBVMzP9kWoGVSlPMnW9S5v+WKq9al+qPdPSXvruPoBXEZKRVXYm9317LQbbEgTZjJGR6QNhlLTmnHMPCxFiZDzTksRCC0KaKq+FKxkhCabP6QQLBFrWtg2NgJDBBiPZBWFk6j6/NUvrkt3pkrWLWbUWD9Pu85FVi8FUrVW19knPxNLd9+YaTggjhGXMWtIwk1UG+jm41nqB7IVMuWrLmu7n+Zv8L4Q4dowbz8wMUqnPTJ/7i5cM6WcitGaB0JDTvDok3bYz0/2Bf8iVsJZrbUkimana5TWuqqvWnm+fz53aGRKu2tJ21WBQpElP36wfBM2F77VeDI+PkNd7VVZyjxRiYVcmSVuF9Dznvr9mjlUM6ZZKrtfrx3X9Md2qLlZPhwYxs7RsT5qjMMjRiHldP2eikZbPeQJVK5+Hmb0ui87D1NICpF065S2V/FRV95k59mWueTJJ1ZUnwtbM031CxmudvtNtXz11mmRUGzIBz37V9fpDrsmTbmDtV9JeL5qeU7UZmIFFGneDM326z01dCC8vXq5NnxmttVXlrL1eVM331+nxugYAeZeWaqtclC1La23GpIfAsJZ6lCCf5xa2SiOGtdfQXmUtRK33nKe7FWxp5txf30VOrtf78/manmuvdW0IYrGIXFe6zzlrvSQnXYYyAWAyiurFaeTaO9O1X7CmP1rFXnqW1h/M6X6SJ9+/nueuqefXP/fgP/5l15/X59PdSwDdM8MMPI9r+1pMAzP5fH/9WNec7n4kwGDmZLrWS9rMwatqa12jWa8XMJ9fuChzevoR8l5a17X+qLqqCntOZ5K507vv53q/db01mm7IZEQgoxmNRvIagiGyLpeGVjwceWtVnhNUtdUnaazhyAuV15PgWmDOwWiSwd7nfIPWup77M7kZCDDa15s/+7ntkjyGyYwhILO1hBJiSiAKTCbnAdZ1BXVzn14v5FL9KJUBLXk9z5ersAWlJe+Z9H37+omWXSCkqguDoxEhOb4uucoGDydJeUlObrHP+b2vNSdZZ/JMApIEE8ejPOnzKRsJLlDosd+v1+9/vvu0WZZWreUqVWYAa1zXvt7pd8cwNUuuMWLkwrXXj6qVPGtJKruwbRfiPN/pgwjHItMnT+gZPt9ffQ4iM3uVYa/32vtzvp/nW3YmVlnOJMk5z0wgtoo14/TADOkcptH0NCAPIL21Xgw5jQYNIEqumSayaqZBA5OaMdB9w5l0Zk4+VaxVQ6cfQq2feDlMIpBc+0p6+vn5419e148w40HDAJLIOTMgUYXt0piZmedgXLI1c/p8zvM5/aGCmRnZYGSN5jxzPga7ysZmCHF5sZJOGirdGSKMQEzoZzLnvvucfm7C9MCU67r+sHzO7+d5AGtZV9W7e0D7/eN1/VhrTRr4fP/6fH89z53Out7rtZ/zq5/flmdmho4VDwPWerEWE3J0/Vhrz0R4X3+oLtaSNirkOY2NDev95//q1x9Vr6or8ufr78+//498/2WXyxhUQAAI1DLLaNL39++/k+fr7/8kT9lDI6s2ddV6o621ke1L+00trWJdyMYkcx76hmgtApTXdlmIIUGo5HST7n44NwaB0NoAsiQh19Z+WeUZwNgqsbobGJ7cv0lcG9nAkHRnyNCtyIwMwJDOk5GKCScYaSYeZIPNwERru/Z0n+eZ00zoe/omkWtmCEuVZGawsJOY2K5Ve70Aj5aY00RnAkxIIlJ1UXatyaEPOZ1jmQEJCbHWm1okkwFOn3OfnO9M0+lzM111uZYk6cqTOTmnk06HCbWu/a5VGjTYOufuPGLSIXPSqy7Vq2p12tbA83zM6TkwAiyXqQKDAi6tKnkzMtp7197dmR40tmQh23WBJ8wkEzLn3NAeSK8q6yW/pFVrB4EnOZ/nPE+nEV4bkQkAZAJo4gEtU8x03zMzcguQp2BcS0t4xtsuCwgEGsu1tAqRpGpf189znqFrCSbdYOB5vuDGQfRJVa0qsUtLOvN8W+OyEFjaXttr22U53ffzOTmyvPaqnQ5E1x5mOklmMjOu8r4Y5zTBw0xTZZUAcp7v+/4N0d4gVK4Cpvv0Sec+93Tba6aRbCfpDBMmMOd8nv6Efp7nOd/46enBa+1u7q/PeW6Yta7MdD+dZ8S+rqra14+933/8/JfX/qPW65wO4Nrv3efz+/d/oC6XSkZaBlAQDNiqPdPgCWKknTSAl1ZJBUWffH7BQeGckfXjz/ef/+X1x79U1bnv83zf33/DaC2QJq/3z2u/BfQ93X3CzNLaVdNP3x8apgFdG8EAMFDGBrDpM6dngoaBWro2Vefc049dM0NgyIxcAfCoknme3/N8QQPkYYJB7iQ0I1vdxwpO5g5n6AEaApmkyZlAuXsU6MyQzv18+vMBIM95rG3rOefz3OkbYpfXGxly+s55phsAAQMznRzOmTQTOJiZpHsSI+OZgJNMZwbA5rnvYbAmfULzwFn1YwY6kMxQkJzzPRMmmQMg7+uHas9Aj9Zetabv/tycM2mpalfnOc8HsFRrYZW3pNN30pKwezQZMkJD+tzdN3SmNSQzz93nFlLZKlGJz/OAhMpXrW2ssm3LzIAmLTkiZAigKgaQVUxM6POUlZwEe6dbo07uz/dM79dVlmvv1xtESJ8zd3mv2hhhYNWq2mstywCoz6O5mWdorVVeVhnbtp0gbC9rGc3MpDsPM6CBPndp7+uHy3bJy7UFncbLVelOgArTaSCJvGst3OtaVTVzaxVkGJIMENmuYiYJjJl+GgABZCbNhETyfl1I3c1pU7Wv2ttri2KG5QGAkInWZgJjnGlALjPd931/zvNN0t1J5zw5DT155vN5vj9Mlp10aNynOx3IOc85d2bsOudAk04O6TKSwQLgPHdd6/X6WbVsG6p8XT/t13k+9/3Pc38zDwqc6Q8cnkMDog9zXMv7TWGJCbnRhXd4pp8+ba/JZ6a1fHlNhkn9+Md4TVjXhQuEKqchLkA0feLy+8ef3td6vxHnfPf9lfNMvuij2lrFhAkDAx3InAciGyRv1WagDUCUmZkQ1gLsqrqwvAqgZ/qc+5s5WJRIGGwLUHlteScZFDxpj8jASEof0pOO28gz6bun5eW97Mo0E5KZyZx+Dkgzz/09MwhkgMnkAJJgkNb1qr0kiRmG6X7uPqesPp2MLeGcdBpZ5cHeVxV0+rlPGqZcwELp9Dnn8+nng8YuMLUACeA89zwfJrImDQNiQMB47TCdb1nT0+cDM5OZp1xDREoV6PScBp7nee7PhCnDZDqQwSVB+kkaRaUhYLuSTh+7DEYM5XrVW5nM5JykZ/r0d/dtmBmB5hnNuT+/fv175jgJOTMtY4NkreSc517rvdZ7+jnnTj/pnjlDd7ektXeS8/3p57bK9iSZOf0gI8uV7slJHkmy7ZFmnDNtu/uhIWV5CCT99BwvYwbsZQuwtrWqSus655AOCgNZ64f90igt2oBrIde+1hYKZtKAa3tJoEmVsKSyCqbzoMGWADhHwnvZRS3XTidp6iAkuwya05wGkGuttTZ4TpOQTjeASXcG1cpMpz2d0ydnHIbpdN/MAQFLAuQC7KqqPvfkqb1sSM45II1gbM8EyWsBz7mTVum63gaT5/Taf/z8+V+u6w+7bGNy7v78ztdfz69/znymP/Pccz6TgwDm+aAmSd/MoT+f+xsAnwODXJOZBJ2ZB2LP83ynDwLXMmO+fv/z8/Wfp7+w1vtV1x+4XIU9g7yGmWmS6SEGsAF5a13IdACtjY2gABPLss1gyzZCqkwmUmKNrVrlWlqvgfO5px8GauFle2aYo7X3+2etV1VVLXmlp0+f5z5z4p4+cpWL9Hk+ISJoSFbZLvpgW+R8YcokH3oYupsJgWCXrCSqpSqMvZAHNZ00jFzgJMnJCWkMSCqh6XjIdHPwAtEtgxkVw3N+9TwWIBgmnDvn6Qmw1wImZ2j6TIbSnE6PXarCmgmyaiGDGM3MzAidPjPjHCFkl8olr0eRJZbYpqxZtcK0zmiwGGx336EtmIBxIaZ7RGYGWfLak0PSz5nuzkwEgCZ0bsuD1n69M33OiGV2idGc55NE8jkB5HJtkkxLQE+wS1WZIFGWMoOxzX6900DXTCf2/v79e1Wt/YPFPLNcGMlxvDJq20mTMLYLKLtc3eNJIM0wGjxXEElZDWVf+8+qZbsTaeNiYjxa+/WnqZBSIdmM+Xx/55x6XYWhZxoKW677/nZOrYUkK89tXzNGIIIKzrlLC+mcJ3lqikEAxpqhpxGdkDMy0swpMfIxCZlZnn56ptGyi+T0A9jlUC7bM9PdM3FtqOlQ1T21N8Fc3e3CIqN1vVef+/O787W0wWdmyckM2PvaP9e+sITGkHEOOTPDOZD0WN/n6SUh6eflChhsJEk6tUBrBgkJrZf0wk4zcE5e9UZ099rv6/Xqz+8ySAyQ9F215Jf3WjMSSSOrRIIXOdov6oIF9zyPrheGRNcLmTnUws7vQ4KFCgAsZk7IYs557LX3pevn7m41AxQDBC/NwzDBqM30PWDbu5D7TKl0Xc/5RojKTEnLJS/QQIaywUDnZvJy9XN/vr/+/C8lUi4mSZBVWzY0UwLC0AQZTjJUbdkkVRDP5PQDY9WQmt2ecz7dPbO9dkVg0mu9RTLpniJMJnT68/XPNdz353V/1uulWUzA9gWeOa6fWi9IImKvDUysuqwvS5Z7kpFBZVl2JVHVQsar6kz3zNZlO/157g7p59HYtYg/37+T0ZJdXu+cR0j72j9+qgqaZeVaXk/Vc+7OY2rkdIsRwwgm+W3915PjmTknOREw/ZxHI3vVurw0DPLee63ttZOZoFryGOYkSLUIsBgB9gK8TGYm1qy91ip4up+EqmVDko46SBAcVdm71hWidJKZJMGsVSFVa8C1zcoA8/RfZz6ZkPGyfawYsJOebmnJb1dlQpKMxkmShgHsksre4Onnunbtt2y50vF1gZkQRgWgqarunkRlQBaiE8n05HzSNxnS83yAWltaoc9kMpn0PFZNOOdhjCpgGchMNLXea/2wM92TtpGiKrmqPEnmUWmtVVXJrBITuabnue+kx8aAM0meOJID3ZOxfGn/8HrB8utP/fyDa/ly55z+nP70efL81c8vYKZtU676sdYP7Zfqer3fMiSqt/aFMmde10+tTffhGBL26yde/XwmB1G1wJOGWLZerj3p6Rk1c5AR5Ey+ISzP+dDJMKcRyPShYwtggE4yM0mAMKfbgQkCmH5sixcYAgHLCzLz9BwBACSnu2Fq1QAjkT4PSNpihgwD1FpWjYUBNCWpag2R2dfVZxIQuFEsM9aIfs79OfdnzqO95KWxNc1zztM5yRl6FGbSB8Ik4mS6+8f7397vf5s844fRGc65z3mSkwQblsB1eV3+8cf7/acF4c6T8wBwEHjJxqy1mZG59iXENEYV6EyjrO3yaAYV2AjWAcB7La1+ujuAvEBJuu/nvgm1L5k5Bzh57EnuPjeZ8qq6hIGyB/XTMz19AMCuyQTGmh4OyVhZ020ZmMyZB2pdO/H9+SpdUeLq9AJXyer0TM/4dLyuVSvTooQGXMojBpjkAKj6udeqjEiWFe1JEZKTaZiJJ161XIAGqKI4czI93dKeZJhJIKq3c8KanjyfST+nkjDJNMaq53SeZM4u+hkxtqczndfrddNkvFX1Lp51/WSaNKu0LjicZGaep/YPkVJZ1XmmB44kwao15/TptTIMYvrJ8zBYEgUDCO99VW2dTsYFTKblATCyZRFZlYFu7yprztRyZ/p5Bte1r/3D1nm+koaqMpBJxoBQ1SUfIP14FHr6OWkyM2eeeG9bAJwh8oLA0voh//BO6W9Z59z0+Xz/9ZojX+c88zykTz9suA+NrtecL+obFloYlWcam+akK7PWViJbdal+oD1prZr5YKjlyQyS8GaMTN/TH+093cwBgQn4zI1UwEwzJe2qlR4GSUC6k8wqtNZe2EzGkJEbQjHP6XNXrZmTc2zZa5Lvz9+E9+vPCRBZSQ9IJdmlJGMBkEky7R4SYntJJAOxFtKTRxaMp4CZljUzSbrvTGy/rjfCtdKcz/eq3cM5vdZlr+lP398ZlreFsGuxlOd2GYExTD/P53d371UGAKN59vXf2AZUe+aBeO379z9VVwnGppgkkUvyDGtdPWe6n5NtGEDTMap1kZyTvV/IZGZttFxV51TV3lcBped5GPfpSSSEJqh9cmvJ68KIBtsbXef8rWHMSZZtL6/XhMxz+uNsr5f9laoZDbPSB+G6RuPRWut++nkeMj2ZoVyTfu7vfb332ufB1zvznNw/r/d1Vd8MuErW83wAyIy9ikw6AzPDxOvCZZDABlDBBk3fM3BdSHZ1yuNVddZM3+eMfZ20qrxqv4qx8ev9X5au6N/TJvWcXzZFIXp65rEAgQZlMgxgleSqZe9Jg5OH0fSxtq9rGqDw/Xymp2qlW0XVMsIQYZMgDzMz6miCyCRj7Wvti9qSsGUJFRZlX1XLXiqEMm3brqbBEJehkwaFhEzAnTwSXuW1GVQ1aSjL6SAYe+05TShVzgEQq3x3vr9/Xa+3jjOPd0mbveRiQh8IGKFarL1srT9eF3W9wNf+db7//v33f34/Xz//Y4c6PZu3Xi+8uNPtTkPogwoVHb8KF7oMlKkgy9b10rxnfmPPLMXTD0HrRS1skjmNjMwY4W10qTTdWiV0+rk0kvo8RmA6MJZmMqtGEmKMSiNqoOmSlvKrk1oSAwWaQEj3OKA57auYA9R6z/N75rHeCnGbNQwDI4BasmxmWpK9oDrPqg1lC8ikumGSjoKS9HN/Vi1AMqNkXCXxPL8mH4OdmUyeEWYELlc587gubAt593MDa19Y2jXnJDODkqefdw0TpSHn+a7awMDIGpL2fgcmAcGQ0JznMfbuk9QATD/MxAuxrIVzmsze22s1YK+1rtf7ev1MN9aEPp8njywG64UCST/W1H55b5gOdBtJXnUhxSex62VER7Zmd7fXtXpaVRiUzCRNKNfxub+/1r6A7qf76TyTA4WQq9Y+p/dLLJ/PB6i1zznnueu6JEuasTTadc4Hhp6qAQ5dTbqRZa9VE3AyzYCMYyEwe9wZ2dq+QmZOrbohc8h4Y+1ab55e68p0rKVlonWt/bLoAUAzE5kxtWqtyoQZqz5fX2tdLidRP4T7vjVnX/u5H5d1uZ9P6RppTsa2ZjCSbUmnH3uA9Bla9rpeWhsgSTrTWrV6ZbDqnDP97OviNFdcOzozDYFJuntIxi0LT84Zref5zMTI184woaoQ9q4qzuc+3zPP2hvbCJVXPZ/769d/vt9/Wi+wawMzjcwYAkw/ADPJcTaI5ej2LK3l13u9/uWnXv7+C9a57/v+pf79fv2p109iA3O0S7XneWaOxN5bZcKkARQ6APNiioFYFMWMoSHc3/9/gvAASZYkWa4sL7Oomnu8zKr6QKOHaPa/vKZB41dlvgg3U2GZcyYfBu2NPU8gDMToHpauF0AfCISMzXq9KQMakimtsl0FAK6NxQQZiWm5JiTBltYwZwLULnCCgMF1RYfcJP18rC3vGUBWVe2RAM7daeychmTiWmu/yEPuwEybmWSmM+3J6Zl5/NyngamtNdc5x8yquvvnPD0dqdZG1vRkeqvAS3rSCsCZKVCVXSf9dX1pf01/pCXBUDY0iPF0B7ZFHzGypx/wdV2Tm2k0h7u0MNfaOUN673V+fgepmtJaxWSYGJGh0YIsX3utyZnMzCTPOZ9hnvP08zFtu7ThLwg4nSQzXarOfc4HDr5Iy0U3E3uEO5JNEMcsr1oIsKdWrYieXPuqfb2u63Xtzk1OlXOe53ksodrrkkh/JydNEjh9HmtZGE3PdGq/vBYZhlXbJQhFAmG6mdN9n3OqrlpfdnV/35//o9wzzzk3gMr2OffQYmhpZFvJz/Of5mfvy7CXfr3+SZj8CPZ+X9dX4KTTPd0MZPp80iR07vRJkm4ymSAhk0wiAgjWWjm3GFCfB8BVKkYQTU8y/SBAPPdznirJDgEmHSIo1aqyYTrdNmigWMXMZAaQmOnzg2ut18hpT5Tk8/P7eb4znWk0dtmFWeu117YLdLjFQMFgH8OkO/f9Y2nvHYJhC2CQNP3M8yDABHqUYR6Yef6eROsFHlmvr/31fv/6x/7n//3r63++3//1fv9T69XP9zl/T3+LzOeTz1/kFAVkOp2cB1pTtMEzM9PTn5kHZ9IzI2/5QgubDni6pz8QyPTzfH6TACQ0k97rBT5zal3r/cZGILlslV3UoooyAzK+0IKk76SqthBILttry/bEQmIGMkFGi0ky8pfqSgJKprsBlxkmT85tPCjTEKYJ1/XHue/nOaJynswDw4y91t6azQw09CQnH4jKDdOseqscBWxvCavKTu6Tn9N0AoDuz0/5ev/6h3URGKtetmEBcpUuQhOwxTz3nM/zPMyB2KX0+XzfzweGhmF5UeXr0nhCrVetfZ50hx7IkxOm+wCjsdzn+fx8/3zufj5WP/d3zpN0zeKMQRZp4JzTyRhx8vmkA5k8oavWeNl+nptu6NF4r+SQCHWPvRZTk5E2jFGVMQO13lWvqtqvr68//uv967/+/PN/7uttF5JdkDnPPM+qhVdoFK8N46q63tjDwFg7PQPDEDzt0npd19oc2cpMppO59i8yc35I8nT6KdWqhcsk/QhPd+la15e65X2m+7ltk5MeXCwDkJzDYWpG93N+ZgY7fZJMDLKFx8trX3LV+sJLwl6+FnZdV13v89xkTvdzfwBKTPp+ZrA9OZB1/YLkfJYrcD4fGkS6JyPVOck56SGkOwlICM3MOfcnYKvWJthr79f1/rX2r7Xf3lfwqmVv19tVELvW641WrdV9T7pe7329M8PEDD05Y1H7La/r9V7XL2kzB850k1u18WJCTvobie6cb7L2/qXXFxOnh6fPpxiVo6y6/PUv//m/1tf/hBIN3D8/8/0fTIbT5/z89P3DPGQmDwOO1mYy5yNtbIQklsEAZe0v1sIhmeeT+4dpr6KWVmED00faKpFW1fQh6e5MiyqviemWCgJimgkDg6KZ9LSk9OnnmdM5z5DlXfUqK3MUTc7MME6aOdMPaSaZZ+gnn0wjVLvWW+OZvN5v8Lk/5IhVqKqmT6K6voSrBLJU+52ZTM755NzLl73LS0lIg+tics4TJsowcRxlNiIMCRk4tTDe+9LaM8+cz/QDB1s4yaSnmzloYUhAMw9z5NWd78/f++ufiNEiznlmmLRsbK9rrbXXxXBymGNqAdPPnEmbDExm71ddv87E7LWWrZ5OGpfYA+RMMt1AJpnAOed0twbwqo0KYRsqeXieYcCjnmkjd99WMOc86WPJthGi1vV6/XO//gBW1fvrl2uTAVzXfv2REY7tqte6Xmst0IztRdLnpDPGFoIgCUAKU6tgYACANJOZdb3/VetrtLSWXbLlbft0k0fc5/nGA7Ovr7Ve9/1/zsS1f//9v5mR9nN/Q9f6oz+PuKH7PDOjtUxlDtMzfc43INrCYBmj/ULUsmSARLZqnzzQUdIPM4hay7W131rvwbLnebqP9977uq4vcuhAkpRdyzNj4XJOOo90zMx5+jkAk3MCYtL52FhYs/b1vv4Eo7Ft+5z0PWQm6T6ZTqb2r/KCgKGXFyVbgHqSM30QCLTkFwMCmw6YWjInn2Hsl2rr+qKM8tw397FX0Nw/5/zgoYyhT57nvu/rta8//qnrH0SZ/vz85/vv/57nG4IlF2UwExJJM80EG0CwFwJMXZqStmprv+TFCCBn0iSYyRHMzOkz6UyYdJIZr8KcOYzQwgsZFxU4dLCpptN9mJl5kibS+KQnHWA0w2RCJwcRJgQgZ7qfz4cAwcwMxFXlXXqt9XL56fs5350PQrJsZDyddN9Mr7VW7ZKxkkweeO7PB1LeuKAGlzejnB5yPp+fz9+dn9pVNhw4kgjP/TkdBBySzpPnr7m/kz730+eputAycl1g0vIGnv5Q3vsrMN1rGU8Y2UPsUhECgyh7qWjsHQAUJM3Mkl0C2ZXn9P3NUPvC88yn6fTNpNMzo/Hp5/Pz+zk/mTASNVpWAaS3NiAM4JYqo3NCWGQMT56asstVkwOs9V6lJthLe+x+TiaQTFe9bCcASECmNWIqfUePonQwwxCE7Y2EDSWvmX7uOwNFAggq6dM/cuRl73QQM54esaBRdWf8LAnvtf9c6/1+/4/X9edolx9xW38kU8X+9ZW5p3zuzyt/5jx9DtZV1znYlcQS2iA0w1GYgIxshwGbpPY1CTlV16Bzf/brl9ZWHmyNCrA5h4xce30xmRlhoGd0rXpSe6/X5Vou525pjYuxxfX6onTyOR0YDZk2dU7LtV5vDtaOJnkAQfL0uXMeYO9935kz5/SLMALbwFRVSrbE0PekdL3BCiMjIHCQJ1WMalHFXnx+5udvOvv1C0GjtbGfz9+2d/5gzvTn/vz777/+37XfWlvvL5rpCM7z98/v8+a9/9iUIeDpj9bGph8aWdMjAyGHWngxJgFrvVSbWvU7ydH9gw519blrvcjpc+7P9zwPAAOT9ADAgK26WDcw/Q3CF3PneUxXvXpul4NJwZP+nOeqteyCmT4QNLa8tiyYPm0vhuTJYxqVUM7cGp323stez/O8ftXg5INNMs89naHv565c719V+2J6DunPc45V6OkTYFmul1SuskRIn6G2Re55IJkEPDPn+eyrJv18vN4nkOHcP7Vm4Hq9Jk/uo6pYspFsz0zf9/n8vL7+vPZLNsx5bhiYyZk+gyDnuZe3ZMjhs2ZNHiQgaalkDcmMkpmxt6xMhJeUPuf5QUusycwAcLrnQ0zaUq1dz+ruc/8MQRBNJpNaJn3O2a9aay00tiQ/z7M3GbxKXnZnxoCihaImc5yw9lssppHXep/n47KYz+fbkoRxP59aSy5gOploSYiAWbWWG5hpIOnpnvK4TOUwjngAa0NAlqJLkuucZ6aQSD+qkVf37Wuv9z+Qy5bJ9Pv9ej4fdXb9w35nhrG8gORea72uf9TlwQRkBlg4NEx40qSu65xW5vV+93O0ajLFnk7PDTEvKMnYWPaqutbrfe4frdJeVVsIVLZFZmzbO/MH3t5vSO6ZiSRkwC5fAIAsqVHt9UaUCm/rfPPMTFWxUe0+T59vGM0A4HM6maQz4yqooBrjYqDgWjoBkJFgZEkXGdScu8+nbHD5hYxS+0t1bb9dYkxPkvP09tYsBiaYFNf1a+21vLDo9Of/hGO/JANaL8bAdEuFmM/DRCwqCMoMEGqBkb0uBmaRc85jX4Sc3usFkEzCAMm0TrfulS8YyvSZPkgSBGghAkOSmWQaQAMzmQwFaMjM6SQAKJ2T48x9/9gkmR5pM04f4OfnWOl+klhmsOjnI2fydD/ltTdmSyMRTTqMiQJ1YSlTVduuJNAnLduWa7squXqYDH2AgXMerc+izvyefqfP5JzntnfV1tqcqW0AAJiRBISptaXNMsMkUIRk+jzT96NKTj/HXy/6gBLytCwmp3skV6G6n481VZekqmXMTPJA6BBEq9bAjMpIM8Sah7avtffPDzONx9GQ59w9R1ZYM8+qbU33t5Oc08Xa6xpkA5l00kmUme5+nu6PJddO5GGmn37SMWPNeX4mJP3c33bJBWI0w3SSc/qePkomh/SkE5Knz3POPTA53SGxs3bZ1QkiOQxgVLbBoP3aVXvVJefay7xde9d+/fF/Ta0kILvo9tj26/VVqwJTjLvTz/MkwypgEpelLb1Um4CGEnbVxVgqWYxVFiWbsmzLEzgHqOvS/tJ+AwTDtS9qgSzXdZU3g32l+3RXXdfrDQCq7SrMpDHLa9WGsmuvl4VgnjvzWFIB53Qjr30x1Kra9dw/Oc84EAA700wHrn2NSLpqsS69XiQ0wMzPnJa39GYKBnPODZo83pf++JN98fVm0Wlgzj3z1DLlOc/n56+Zx7Vef/wJzPcPmXIh7f213n+u69docJVfYqafPL/n/A336IGeabCWVIWMjMFGAHMeAsCA0C7V19rvWovJOXftLdWkmYGZTKlkSTBnzkMyM4zSmTxMW1u1hgeBzTxM0s1o7ReyXbVrLOCcJ5MlEw5t0f38/P73eX6ShmBmNM1MnvvnPI+9ywWo1tqXqxL6hJCMAJ3n3MlhsDXdmpN+pmtkuYSGZDpMznQydtUlvfGr/LINpJtor7dGobXMmHMEJ0mfVZ4eUFUhL9l1IY+GyarX6/pVZc1JuvsuqFVrXZpJJxkmtm2rqNprXa73vn7N05P2TFWRZiSv0QxB+pz79BHYNRmzn6fDgUmfyYywVzKwvPc5SVoGGMPQuW1Q9cwkZjr3OT9WSKZq+7rKXrXWrmgys9Yez4T0nPTpk3m8JpNh7G3V/XxmnnPOff9YpdrnOf084O4BmCSPfSCZpJM+MwOBDN39KDPAeOnKkGm7Vl3AaAIMmUZTa7tergtArLWThqy6Vr1d10wobOM6PWcm6u5mMn0sFfvz8+/n59/n+SF3kr6f8/mNQnn6YWCACa1rAyVkzfRkBIJMWPa+9uuNTDmSrhe4aVchI5BhOodIVQHhvV52Dclzp2/6TDeTeTqnk4MBIOc8nZ4haVCec9/3nE4myd6v5T0zDZ0DGeg+IydDHou9XjONsGx75mEOAEDm/jCjVZQwcmn/wtb0nEcuXV+qFxzm0AEBz1//+zk/aNH38/3XqvX+85/a1/76pXVRIvHU8/ycDtJMzvNxbX/9S/vl6+W6pu/n853P95wmIYcytbQ2QB9yIEzgwGECwQZji8KmPJK8a29ABkIyQWsD00MfJhqpXlUveZMhmmhmENPJKNMyQFq2YTo9p8Okw5BJzPJlb5jOcz8np5me82Ea5NrWJDfT3Q+w9mIkGcQqrWUpaYDB2tZihHE59MwNsp3kPIeBYKvqkjaw92vvr6ryWoROo6m931//qv3SWOu1rqvWcl1o7vv73N+Th8mc53QnMBhrVU53gkzwTGDM85wZGBBrLSBpZjTV0zAQoF3IyGG6T6nKSypGMEnntDC4EwoIE00nz5BE2NrvtV8gwCPB5Bkyo12v8otI3XPI3Kc/9+e298s2hVlIAFmMMZI9BdjQJP35/PT9EzpJrbWuq/ZlvRhl2mZJthhqVdPdLZe1kkmCM4MMRir7spaNLHlRwbIXFBqXgQkG1BYMCFcxOj39PGt/VX2ln5/7r2iqfikmzEC4vn5ZOc+cfk4CMUuj5/48n9/P8/s8zzQ2aRFUUpXWRptxpqcfuUJ6Dsz0ALL789OfD7KuF8Ochw4dcpL0c0NmIGcmgAl9QFOsvddaKgeYmRxyTp+ZBuhOP2iQn/vc928AVK+93r8yTcYqrwVz0iCA1kTApCcfctB41biY0nqverk4/ZPzIWFfiMlBi8k8NwQvrZde/6jrD9UGOD/z/ffcD1i6qozop4P8+mPu+/P7v2Vf+9fr9bZK15s5+fynJ2hjo8ycVS9cWlvrC12ql69/UOX9h9Y1uef5nvuHOXO+6ZsAAaaHAxOE/NJsMMrkZqDT57neX6vWnB8gPc/5yXksMUgCz/OMmjlMYAbl3D2ttRU0hwEEGYgPDNN9Dknfv/fXq9bV585zk4YB2Qv65IaGk2kZaIRHeX44d7HO/XM/n9wf6L2uWhcB1H0sRmdygL1/qd52DRJIlFZpAQyWbQin7+GIHkBFJ31PntPPlK2rz2fOh7q03vv15X11nskneT73b3Kkmkn6MCIMDWby9JMEmG7NBIRVu+xVl+V0zmQYZkgoVbVdmUkazuiMLJUkSpDneQJYQ2YGMoHBWERuZpa3a3XGq2o7SRBIlsud28xQAahMjbUo11799JqJK/LCMB5N8JIMkosc1tpJ3Z9vi/LWWkYprWssZRK1bBlVLTHdglVXpoBpqpCFyra9XLX3H3u/qoKy9prEJsw5NwDAJGPbMiEdCcPz3CSWuymTnO4Peq91ASFlc/CXSKbvcsmmqPUO9fX1r6qtXQklI6Zb+8UEA2vpBcZYfD6f+HJp5vn5z3/O87y//lH7moDd5x4GMemrvnBhp4/uRxfSOp1MYBgzkejnhLPX1rrImRyQbXud82Fiq/sjbQHAsLxcpVWO1+HOA6UqzoGZHlC5tn+tuhiDzjkCIDMe1brQTD4CsOrCz5wje3JrL/owR/uFPc8DwOE8Y1g3Cbhe782Z/szMWpeQpFWLPvn5zRxg5t77WrWFBLpe8osBA6E2da36qES9sOUNnvP3zPccWS9UklUaQFALG6AgSKY8/ST3n//8v8tJTjo00+e5f+Psa49GyzwmQWaZxgu/k26He8K0vcx6ckRsgyDMeboZbGBmknOf82AE5Qq96poOQrLkeR7Yw0bl/e6c6AH1OVHjYgbY1ztp6DlPJ5nW2F6ufV0XcM4zNLZdSWeSzDBVjpI0aBgV041C0CB5efX5ZpQOEZ4Cq3I+jEhmTtWaPMgY2yGTaKjySYcQbCR7KhOQXMyc8zvdzi9mpYdOMrtq8jzp12sJmIgImvaqVZZrpqquhx9cqh3IePtVvuwNP5oOdEZMsauu6HSeJKoiDjK86jWqhVj7pQHBwBAlk8wkvSihJPayp1wABJg5jFUrM2tfRiFpNx8vS1V29yOvQYokjYKNLAQ+z29grSsDsr2GJPcEvGwlZsi0te77rLXskhox1lrX/f3v0FXXKi0JGMXlczemVuUc9/jakvscVSP2+/3n/LNqIapek0/thSAHbQZAJbhmZrrP/ZN+li9JP9+///rP//vr17/21y8QjfbmeUgmTz4/EpKZzAx50EYkJwnRwH26uiGc9vVGBtsrOclB2AWTc9KpXbKf557x2kKcYDbwPD+v15eAyUhVnm6qCKBh7udmjgU0QyLHXgWe0yoAetDFMp+Z8zufj7/eZMkmUW3t93y+ee7n8ymWFE175v75e611XS+5qBXp8/d/6mf7619aW9DpEKZcF3jOwzDzzPkwR15anh6BVBhkzZd4DQ8Tcg8BwIyZpgyQw5iyqua0va7X13l+wMhNS+UyVbjSd2UjAIS8J89Iq1YAC2G/YJIeynslST9Jnueu2rV+pW161dcgV9mK21V5ApEXkrw8pPacHy97LVOv61ecz/lL5dIFNYyvK8ToPCf61NrA0F5es1ftJMz9nFu1bKENYu6qsoqe8/R+XaQB10pPraUqwXN3nk+CmOvayY031rkPU933uT/JLXAJ6HOTAEkfSE4SuwaodN+5B+g5aubzE3xf2WtnUF1aFzNrKtZoxZ4+WwaAtbeFJQlXWYbZ18uDXXekaCwh0jnNTFlpkjnngJc9mcwzfDKevAAzlo1It1HJ8sJly64BKLskAYMJ1/XH2i+gzxkGOOdkDpOqJS8QJYGojGbAzES21xstAHLOtyXD8CRPyPTMMDPdH8CWC8sADAzQAdzdUr9+fZVe3Z/uz2iq9ozO6cyDVdebvSKv/Sfofv77++ev9FzrtfbrOZmAvPZLVdiIOQ9luQCwRiQzc9UyIYP9/uO/Xn/8iazaWpuyXdiyevrkXlWME7QvtDS2lz2juxzmJMfy2ldnAGTLaMBJwBky7bL2di27EJOmD92TBmqVvZJoLUk9XWv36c/9c+ZRxmXjniaT6STpoympgLm/p7/BKjHgBcgm7s/f0w8Egq310usfq76Snn7O/Yz39ur70yREfi2/1i7VksxkBgsSGCb0wxw4nCPXuT8IWJwz5wPA4vxMf7C1X7q+VH+oXgBzph849KEPY4ApgMner9fXH/JKR6Z8TT9Bq7ZsyxCACcmcByyJGdtIgADEtC0CgAq5alPbtRgyo3I6mQYsg/GSNlpoG2cGMjzjhrGr+zHLtVSbEcIASgOV9P356W4gyTC2k8nMWqtqMcpo7V22awl3d5JaiwEJea0NmhnLmVZd+/qv19d/YaFV179cu9a11surQLaEzvmc80w3DMuSk04fpm1hgPRJevoYlpwJlqzJwcEO2t49nczev6q2wVLIrsvNeZ4OVcsuu7AyOae9Lq3tWklPdzKjBbEFJLddyTl9o5npmSlfrtfpz+FeiO4ncwAPzACuyinkQQCYYNtSXKXXCM0DMzMaWTXpAamZ6bRtKjwwadoizV6FwMjqPt33LiVEDTLjMlrhKAZbAiFANmXNwCCX3TPP9Aef5/mp/SXvtd/XesmQmshU1a5akuTVzyJ4UK2qvaqqLrTgQKjFRC4wBEAAfW5m5AUk2dd775dtJqNRQjMTY1hC+7pqX6q91gGYZD4uwBMSMCB7Saq9dW060zdIqzzNAGPX9XqvtXLGVOjRhQoEkXytX1alTyZrvUMYdZ/0nfN0P5uKAAiT4EoOAqzFBEnDw3O0/2AiX3pfaPn50dKEUWseXRfrhSng3Efn6/1ffd89vPeV5+Fa4tR66XrhjbRebzF9PllymSqafD4iUOt6MQCsJRWC/OTzrfXGZg6dOY2s9QIg+fzk53GV9he1yoAnB6au1+t62yVVp7GZVqJ6EfClytw3tQByUGBAcl3XO+eZxK5zf2Y4z8+1v6CYASUPalsz3fOZJGp72UV3rY1CB0CAGU8KVV2VeURBVGsGVeX5gKxatZg3+1rX16S7H1hwMgDIwgZI+mQmfWAAe006E2khD8ECJznnrLX1/qJvm85ZVWst5NpvQ62Fa6alUm1VJeMRBMZSMoj0yRBjq/tOwgQ0GcT0PedRMue579+QMaGdaEpmwHvN55MzunZmDzAl7fJK/jNEUCZDpqvKDszkeH2BLC3tI5/zAzMWU2X1VLEWWJ08d4ZVRvCMZWuSQ20kATICz1adzvP9uxZVVz8fqVZt1T73z+QkvXhz7uf7B9q1ctqzyyJhDi3DhOnAqlqWMoMMJYqZtQ0CLe8h3Q8gre4HWLXPyUyncz/fXtd+/QGTnD5n1Z6A4qp+HimqKvL19et5hJJRn3vVQos5AAV9wNRiwjAzIpOuvSX69Jh0Vzx9uC686DOyBlsAREuv1x+qwpQ3GAKUCwQA5WvV9lpElOa0RlqryCCrcEDMXpsqk8GVc1Mggcvr/nwyQZzz2IKa53AVk5xnBld1Gmx0+oABi+TjWaqX6jXTnM/M4GYy+dDostZFzFhTc38YpJn7b+0vTH3/ZDrK++tP+ZX+8fN3nts2gIzyPIeZ8/kb+PrHP+gQVAKf51FnvaISgDzP70mrLl0vJvN5kJElMUELX15gpp+5v7HP+d5nP/ftskqZeIwZkDQQUA+OcqYbG8AwgzRoeswBhgFAks755ma017VPOuE8P05d1xfWDAmi7ZJk0nlgkIZmGtAAkld5ubbrUt2uy3j6oY+rLCEw4hopoFr0SR+EbYHlkU4fpqlaa5/PLcuqyBKqF7i7XS9s4NoXaeZM2ixhiCVAyHWhWEi1Lg8GW3tkZJswCEzfk5m1Ck+xk6Rba3tdyURhkiQDghkCUUpZs331+Yiy1v25X7/+WIu7u7uHg5a9T586T58TksRI03D1iAlepztk2RmiUWAIJg9lM885Z2aYnjSM9wqdwbJk2y6t13tdL1WpJO7M0wlCVZ2THOpCfp5PElnTz+mn+5keT0nGwhCABEytX+VXQN5Jkxlka62SxQzMgFR2yWBQT3Vy0p1Q61f5azoKSffzt1j2O2pNbPvaCeAQr6jAsmyv04OMzDDnkAMhhz4QyEwzQdv7V9XyaK2r1vJaXgtgYA7AaOQ5n/P5TUZ4+vM8/5lp+VXrBUpaUJJQ8vT9k+l0c/9Mf+b0BEu1VjrpJ3k+P9/384NDlX0BOTnnnHOf/mGwqvvuvtOT9HSHM9X7eit+zu3JDOf8ffLXEuvaBLpJANXWeun1pVUAnef5e55vZGT6zMycZ87v3H/1eSBM3l//XK45R/sP7Jme+yPsuuhDbgY6M4yWxdyfz9//Tt9al9Zr1YUMgAlzPszIl9YmAZClrbUpA0zoM7mRtV7YOec83ed+zm8ScPfP5KFbwlRJkyY3OXM+zCGiDydQUMDJkyQ0g6QAjLxrVU/380DVtQUMlskg9qqZfu6/Zk4gE2aQk55BaBTNnb6f+x5ZLtsISJ77PneYTIbGI9L9DAfaLlvpSfdMd3+f8wPNQHT66dyCzJNp1RvD83P/fEPkkbAXtbS+5C2tqo35/fs/yZF9f36Q19qqjUh6+hnGgpCgWhGmpIBGPJ8bAsha++11YcqFkjlnulSFolg2Y9aqku3yqO/Pv5/7N6AEGkZVrmWXXGf6/vzunPQkPRlrEZBkbCcRXUgodM/99AdiZkK6OyFJn0c0kLTEdCcjCrm8XFczp9u1V13Sss100gyDqq7regmf05iqpVW1XAbo+4BRDfl8fqqudV1IySQBJt1pYFrJ2GAyQa0pu+wXjTTn+bl//j00QLfUFqMKgzp9sFe9Zd/PZ+Yzk/SagSgdL9sGQSYRS9cfWi9kMIFABxsihGtmyAhjch4SBobpTh/JDOckHBEws0gAj6YD00zPrGu79mjOGU0hsGTVdWmtsTLd5zAQhBPW2rUvgo2l0w0CgHQkC4Cc29q1XkByJs/pR0aSRq4LltdGNacxlHV9ab0AfCGrmW5yEAA5krQuqboz3XN/wwEACJCJEP18vv89zwcZ2WYySGN3H2a83mCAWrUuMPHMkKCl9QIglHVtDDaT6YGgM30mPU+j5bVde13/WOxz7rn/npAZIeDpO9MzYWAkFwP0zJl5mJBMYoAGSZ6BQV57fVkbpnOSU/a+vtZ+zUxyQAmqrdrosRCaaQYJe2wznhGSqtZak54OOd0fyHq9yptRTuiZRAhsVwZgrQXq7maSPqdRMTCUNZAw/WiAzDxz7nSSmTAgQJk8Omf609+/QUl/fv6juUnSw4R4WiSTz+ln5liz99fyW1q292tpKK8ww2jVKtJ30nP63LcymkEZZmaQ8Oruz3MDmX7OAyKQCCZ9zunT57m7nwzSsm2W3EwEglXbBsh5+vw0dCZ5hjv5BOG35/lMzkyqSrpypp/b0tKaAZqZk2EOA1GBvexCM5yhk4aQBpClLS9mPAJhtGpKLiNjIEL9PC6pDDDU2l57rS0TRoVVuQ99gESuApj2GJTnY7z27nM/feyFaq330JlIRSIPUzlnku4nmaULmIko25nDRET7i3UxpoONDUFWlaqGcbnWms557jyPCHOwwWAZ7a261lprf41Gtde6tDZiNOMYoLCZUtn7KhcTvHS9qQsZr1qv6/Xnvl5r71rLWpZOP+mGALZWee3tVfdzr7U59ZzHEqJq55BpLe/9ynkAbOkaBgCDgemefpggMMw907Uv1cYGY+M1/YCpVZZUCZMnSa01/ZBofeF1zve5v2HhRTXMENfyurT26+sPxPQDVm3tF+PJh4muL71eLFNm4Dl0IAhkYHrmzHTog5BK61etCxtz5vQIrwRXwZCkZwYmSHhN99Bal6pISEKYnsQZWwDgWvYGWWZ0+pynXVV1eV1rv6sWMkk66XIty6IQPTzP03kkg4lmZmamb8mT/tx/Q0ylOzngNMiuZS+wq06fJEiSAIbpTg6MXVLNNAhX+JnnA9TahMKuNfDz+bt//jv375/n734+Lq3Xl2zbcsEgzTQwcidJYybpznO+wzM5GRJJ3tevvd7el1zdp7RMdXrOefq+f34nMwEqmGQYJoBlg1fhFZEZuVYtGFtJ1161S4hpiEpYMtBmw4i2IQ3MkFio7GLWhPMMY9lkzkRnrgt7ZdoJKN3PmRoHZo5tGybpDtg76fP8kC6788yn75/frqq1jRPGYxmCzHT3sUmTdJ8fqcwaMshMTD/HIlZVVV08TR+6k9R1DT7neb03ctWq8tqXXSj2Wt5H99AYkFFg8qg+fVfARZ8OtnrScpHQZ/phIl/MwSYGkMkHRVXSwYGCQkYw4MiFPH2SvH79AlNr+C02MpKYk161R2Wr0DnnnOdVF4QOAz1coFVrbMHw8zs5iO6WYJhptBmYiTKTifbeeGrt+7ktJmMVjLV8XXgWG/dzPlSt15JrTpMDJqIWA+Bf/wQAABtZUp/HMoeqhX0+H1cxXS7msPbr/WumWa+9XqotNIO3gLWv8qoSQi7qYgIHmOfvyUd+MTBA5v6AtTdzwMjY5KPaGEnI2ptziDPAOelr/1q//rk+3wU/zyfdWACa7q4yAqH9Jdc8HwiYBJA9MAFghgHFXkzWcjozzMzaJsAImGByjm1XWYMXGCwvoFQZmIZ0n3lu1yVKY2LEMJBJbNtlPBrJYNfKOchWaUYFkoU1JxkGVRiN+3kmR367FrRsSPo5n8+zX3M+oNp/6CX//K56yeO1kU5nM3AUar9q/xE63Uk/n//MHLPSj/zVaK9XwGEyqQ5mWOva71/Pk/RBrL0kSRXayUyFI1G1ASRCJjODBIDNWi6PJ33Oeb22a0CSR4TYL613fz4GXM0IGK61gOXrta+HDnD62bts0g0NZGDaFpCkJ8zjKkYZAcZ40unzsS2XZ5J7iOsC5+R0u4xguu/vWlfVajjPvV8bgsrLE8YaldMjoVgFMAifnMxkGmGX/XZt12VftbdtyDk3eF0v/vrPurakPj9rlQeY35//Vttm0MAqj2syWsw80tLeTCA0CFVhM0Ge50HjXVoLDEYBAAKZSXM6GcZaL1lDMwEl3QcoK91PSuf4dCc96Xw+BtDMo2j6k45wd7su17p/fp85QmJcXzAZJeOiJzPH65fk8fcwPccWAEBWLXq8L/zAlAsCAQBgpgUAAsGAADPRKnShv6HpwYvlc/q1r5z79GwEZ6bnfFzLtSnPhJ6aAiAzwxgZG5k5/flLKl9fzJ4+zAHLL7rRQS9YJOTQhxlsBBpyODVp5nuX8JtZe/8C25V+Or3Xa++XpX5ureVYtq4vqRhA2CQJ3pe9zv1oBAZlHkZgBojLlgbSLTjPc85nOGJd+9dP/p0+3WECWFPeIq6k9TwPw6p1zu21qLX2GzsdRMnNAcEQMvGS7FplytbJsa1gL0Sfz3me9BEik2Q4IFXZkpz0dOy5ar1efz55bEuC5Zk+T/dcqyAQy8OZabIzba+ZZ85Zuj6f0z7K7XJKnzvhMYaZk+5m2K9/an2931/7/QtAJdHdHqxW1TkN7HUtL2sABld5IMB4GyEkb7ygBtl+ppXIJZQBE0WdSVDt6+Xakg3RsqtmIrPWhkK2lTQ4YxOFEWZy5tznvn/Sxy4NQKYByGTQsl/7+nW9/pghaYv05zyfZNKNxjYDNKT25bUk21X7Vd49sIQKZkifT3J3JoHREKZXrarXRFrLXsn5/Pw+93cVM7nvn9KawS6s8DzPfc4zwGQSAVa5XIuR1kYwwWaMoRsbAyDPdNID1NLacqleqo2t9WItuegbhDLzmbTXGxnQBGLrnPv+/PucG/G63q/r7X15v9BiQGKOXOf+Sf8wnXNDkK/9a9dVuqAYoDMPILtWeQk8oda2NTm2h0JW7fGSnH7Oc5/nQ85Mk8PAhDl4UcZrns98PvN8IEymB9vrQgSIGapS66W1JPfpOU/Oh+61f4mZ881E3qVLYOo8DzOI6Q/nnm5mfH1RC1nLCABZdYF5DgmEYWaen7/z+Z7zQEgmIxU2LiYlV5XWXrXBHTEg137bTjIUgWS65zyMmFC+9q+1vlQlMnRyIAzMJAc608mZaUjmjPACIpdl8Ko3aICEOcxYYibkel8jAIbuz8wz/cPYXpjaGxcImAFg6HPmtF1rbVFGmhnNmTAMsjzp9IGTnAFVUSvh7kkC5Omprfcf+8//gXn6G1yqWpa680OHEZDQaHTmfFxVe6vqmef0DR6/tF52DfTTjKAEDsTJYPa+3lUMtm1DG6AijWqGwKDyQulubHsLIfLc5/kZjkiBJYWk+8z0TCZ9Mw0j7uEGIGJbL6kMzDRIsk2fh7RtZFzJ088P9njCidIkCpQt1chKxyp7ZTTT6RvGdqfv+5zngYGcbmDtAsKM17W/gJmx1sx4FWkYuwx2MSUm5z7Pw1BeMEAmmbOujWuSPke107PXr1rvfm5LqoKBmekJI/b1S2jGsqsKjiRsLLwYMAhsaoFIGIPJ6XOQNSZM90zPNEJVDAzA+fyGZoYELBUDMz3EgMANcFylXcOkGwvc58zMnCECJkkfhO1rXdd+Xa+31tr7VWtbtmxVnmdaRDPP9M/kqbqShpBOjlGR5/MtkHXOTaABQGD5hRay1pZKa8t7nmfuDz4YMJRraW866/oDDmnvqnpJr4k/J+fz17m/pc3yTD/nBp5zz/nBAwZDIK43eM4DSFt+oZl5KORNLQiGHE5UWxIwaBgIhWrnDHM6P74WteRLKkGmpwNYXutyXVovVZFDGs3MzDnhmb7pqPZaCw0Ilb1XLa+rqpAzOT3MlKvWH9Gya60NMAWyjZwDQ9JJz0TS3ht7RAYQIyaTY4EYKwkjGYqpAfr59HPCjJPJSCAgMxYSM88w6YasutBCCw0Olpbj6vuHHuryKhiUpw+NS6qF7RJ4kK1JZzgnM9qvr+v95379cb3/2O9f9f5KsLz2Qtg1uKHpPh/EDM8TqNov6sJTq1gLYwRCYw9KhnO+Db4ur73qPVMzhdRk6MxkPmTs1efOfJKHjDPoNdr2WNPPY5sqzwxMZuZ0upMOMJMe43Q/z08yZIyK2nsbA5mZnpHtcnntWrUQFFapajJ9nqRh0Lqud+03eLonSBnPWrtUYNeSPcnMhICGgRBqrapta+iZAJ0u95wnp6H3ZXun+/X15/X6SuYkLttrrV21AdtLxRyYwbhsqwoGPPcHAOhDDkRrI7Dx0t6Ic/9kDmT6MMg102AMfbBVAlFb9VIJMs8zeQCG5JC4rhmd+54kSTqkmTv96ee7n0/6SZLhdJgCh6DYC0AWAqVJj5jQ93OS9trp8zw/riKCSZ9+bjDKwOv6dX39QktVmKEZsCEMhOlBAFoFoUMOQtcfWi+Kuf8eehIie+t6UZ5zzuf399//+f7rb7y0Nuj0Gbtc9so5JNLGJpl+EPILPOl5Puf+QADKFNgzPd3orNeFCxjoPnN+5rnJqVXaX8/n5/n80Me1y7btXaoVAqisVQCYtXS9td+quu/7PJ9+7tNHUjJWgSxnRl6SGa8q27atkl2u134BMmvV0BAIExVD0gdpulHsmjxMVm1JWuUl2Tk9pyfxCILBOEN6NAzAdAAw0+RYSabzA0N6mEwSAMR+f0kGAdd+Wx4dSA7E8zwwQM7Jk0kAZBgba9vFTHl57ff7z329sWE0PdMzjyxbq1yuzPTzyYQGceYwJH1d7+WFWHuVSpnudi17WzBinLTttYTjvV/X22x6lDDd58zp5JFK0QQb5JnByiTdPZ/7+Y3s6UNIzwhmbLCSAQBUrpU0YzCSqUTpxxYqmEwzMzPn3Ayl5bXtWvZe26VzbjMhCFSdaFIe6AwZbKUnpxMYLS+wGEmDOgJG0/PIdsjTPfvf//3/+/77/5k+9gWZ/NQelc95kmcIIC0k1zWd6WeY9JB035MhYcjzTQ45dOY0feggIwOywKrlumpfwDkf+p489INCMoCceNUmB2eeJgCACCHdIzyaIVKfE0JpcuY8TM55nvPz3H9jXLWqbMMgwElsi3Q/5zwuqmpUduHOsNYX8Nw/yEiAa51+bDLMIFWtF/L0ECZBAzAhmfMwh8mcZ7oJjHgOWDZ96NPT9sqwf/2pejGmM/Te9breaEGI5KoqBteudQ2lKoCAjQWoShLpfj7dN9PTg8wAkACwYNBh7pnIHoYBL5Zx7CIz/WBmRsCA0IAsmDRpEgI2HZq9r7VeGWxLSp5MZ5KEzBCUoe/nzmBVhpxn5pnpJN3n9O0ZAAwMjEZCIpNaL1UxFnZdmeQ8wwwz0M9DP7hPNzIoPZMwiabWci27FE4HkOqc5+fne19/7v1rWTau0irVrtpJkmaQjE0OwiqMLq2qaDJhTnKShpgFC9u1rtdFLWmJ8rpqXUI5LTVzyAAJ9n6ty9hoppOedOdMjifLJZS0bS+JnG5ppQcGV0ekP5+/ns8P6cFYI3foJjPP+T59g6Ay53R3P0nPAGhWaUuSveS1/DyK0LDAti0lAUFqXWhnWFU5SWKxrreFJVNPbpcGIjm4Co29h+PSOUcCbZPJodcQlE6kCzZYU9ajJEiABaTjWrJg0gOs/ernxPX8fFBe73ftt7UzCHUfL0ax/fr6Za/OkQJJHs3AmY6G6bsPa9doyDMMYk5LJRV4+lGBzWTGCFWttZAY1lozrT7TB4tYEgk5ta+Z9P2sgrWEgZHLG9f0aFW5LGViJEhiu3Yx1dMQY5nMyTznobtxGdmeyTAuMavTk9vra2lHxAGq9ukfqgL2wnU/N7D3e5g5H5VRYCSjGh7pNWkmiJkBpOr82GtmmMy5Z1rrq6YBBt5vEp5Qa7/f6eX1Xu+gRTeatV90Mr2vXzI5j2y5VFtVc545H9XWukrUbCRymI0MqDbynGZMDvJMlws0c0SAOV117ddS7eEGLJFOd3ZGyJYEosxpEgAALK3akphBWAJ1bqmY7tMMFhYSdJKec8+50/czlqRVbtvSejltimnhWi8heta6WJdBYnKEZ7A95P7ck5b3dJJnhL1mZq2ajECSZNpWaq3u+9wz7yUkb3swkxasWuSB7n4GpR86YBNOE2emxH6907KNBTFJxJB+kmMEQ9WSgZ5xOYd01utKkpzaa0BV6YdEULUQaPrcM1Ftx9nVc577735AwcAhT4n7+/vn87P311pX9z20BoIIlLyMsDsfIEwmVXs8yLUXpspVXpKSAbAFMyikJnMYYJAsY8tGnYlr2Tp59gwKM5m1qK2F3enqYWYCaO0LBGIGkL3rdftn7a9+PuWy6L7RyBYDnm6bSTFMAmNZvuxrNFaS36v86x//C2k8lvucsatec8b28gVOYlvUcDrfyK+vt61PP7irSlozxxoSFPZGYDMGSDAQJrU2fSZBAsmb8bnPro2CBzjP/dov1bWqAABb3homt+NVde64xozkZuacul5gZDyLBcxkAlhy93POQaE2A6SqbJ/nzoAWgKas++6ZWrue52/mLL9da62dzlrbnnQfrb0GFZxR6I+8mUAok0gamzITAECmDwIHepD94vMzeZDVNd3JbZbXS7VmDvJadXKmzySymTCDCy0U4ZlGUEsw/YBRIHRIZlrLEBhkEDAzMJOoPwRNTWZfL4CJJFWBmBiMwMi4YEEjMJStNd21PMx57uQB0sNMMtSs2pN40DBzgO6DG9L9WfVVy8/3HQHMPGgh7EIDgXk+vzMPE2jqJSEQFVporZWUXTC2VZtJeoxJZnrSKkGAnluutZeEvF2Lc5Oec0B2JWgAkF0Gg/FkztyfUdV+jZAsQ8IA1Crkc57++f3r/WtoppPYTlh7xQfJFkyS7ufMIFMaI+nren3VixCJjASrIJN+nk+fVjGT7haxFfR6/6Gc5+fv/XpNP1L3fBavtbf98noAW9LrnLi2JnJND7otKfKwAAAAWFZ68gQDUECfH/a7XP2cpDFwmMssSecchJXOM0JljZMjyxiECkDbpfv50bmXFmNrx5306YPHVknMwIQoA4UqfQOIGSePbIa9X/IrM5rDLJIzk3M6SXLOE3VPTzgd6bzZqqv5wBP6PD9QDJNH9hxGI685j9YGa22ADgk2wIAsQE4fraW1d95a18zQ9/TT59hWFTJAg0CaJ3k+zTNqPHfflV/rMief+8Zee1liLcIkg4RX7aSvfS3300/PA7gEi5kM1953AgjVWp2D9bq+vv/+f577+/X+E7ALl0s5z6oSTQZ3zqfPU2uJ15wmN17YeNEfwF66NsP0TD/aG9B6i9BMnjk/9+dvZpP5/fnfr9evX//4/9BLtQBVZU7SSeekMAaBQwctrYscEmyxWYs5GCYYGiZg1GCMXVL1/aMqJviiluyZA408M1jlkgVGSh+nxUC0CpugvRm4PxB5VQWGaYpzomkQ4+6f5/m8Xn+QmWmUBAgZodLqCn3bxiZkQpURXrYyPT1MAGywtRhzhLLWdboZuzZ1icPIatJD0p0ExnKmy9f7/Y8SjCyBZE2SpBiMpZyeobwYzTxiDRuHyTwPDWNsHKYZwBKqfV2/VO7nPnOujLy0y8+u6wpNxq50DxEs6SYzYRpGuur1q/Mhcl2rdmlbqv3H++t/fJ5blFS13vadyb7emfz85/8kMzOgKAMzZHqvcpago5qBAGCQcHKgWCAWAMxElEcZSQyZ2GImOSfT5XV+fp5zr1pxnXwsIiUh3ena6+7xea79zgzp0zNYQ22veqHkkz7HpZln0kPL2OX9EkwHa0A4OZojBmDGrswQvPx8Os0q7vvvyezXr8wtejrpxx4ADvl0Wy7y2Htd1+v9v9z/0tSkZQCGOeece70WZu4PoDKCAZsEjBdqMABYAZC1X8gio0WfmSCmH60N1uvCBUTdAeY8d07XujJ9Hj2n5ZI9M5koA/Jy7p4JMgiqdjV9nh9h61d3CNfesgPLS9I5N6CJzKqX7fRJn6qSlCTJQ7Z17r8Hpbleb+0l12RgEXAmH5L5fHDwmvuj2pODFh0Ea42e+b7vz+cc3u9fZR89z/3z+f73e19gjZ77J8+yLZewHNIABC1sOpwztGpTBhiD0WJZDudImilRCCJWhkMGRA5zbK31QoUtWwgbGTMzKOQwwczno9cXGDLTkMmo5L2HTGqe3zO3lpMDMzMz2Cs8YtuCv6RyFXB6sEEJBKHyxYyXbaSq9RKaczIpYMKAJulaa2ZshGQD081M6DlnMgKQakE7eGpqr/2eAbAlFZqZMDCilOmZMJokz0/VdpWr8EIFBmaiYe03OJz0LD4ur+stON//BoDyteqTPuVtJdPItWD69CPGjFCtK9YYrcITNICk/S4o9NqvWhuXvWq9LGORqv1WZl1vKd/f3+v15SL9TD9wqCpKsp+r+ViEmcnS8r7KF8NCYAbSz6jkGvd05xxfV9mzXyH9NBLDzJixSUhyns/pn6LgDYxzIkalOven0zKrvk4+Qy9X2ZIy5Nydn9KLNZZnRqbPIzRD8oghK0wSJ1WLVYqZp9ZrrV2zM6SDFn2Avk+SVVusdBuqrv16rfXm57+tlmcmMy6Rc4dxCQ8MiiToOR9kBqkQABMmTMDae7oYY895hAGtosvajCHYsJDQIp08LORFMC4vcJIq79d7Xb+AnEfonHP6se26bFY5MyHAqnfO55xnrXfo5HR3+rBeJ5MzwqDuI22pmsNQVlmf597lKiVAatXS1lrUwsg1J3BA9A0XObhI5vlIpeuFV//+fy1U/6LR+vX+H/+a+wPI+8+v/+88n/s+sLT29PPcT61KxiBzzrP2RZsxOmBsljUGINMNUUr7a+bBsBYTNQBeg5DW64/JQYKZ6ciqFwjwcn73oM6QaElVYMYAEwYwLBgAC0if9Em6+++ZJ3mrwkjSdb1mBq29LzHX/kq317Jtm1B1MWJ6JpaT7zOXm5WWBgZn7of+mTNyQcORNlYmQmBkuSatITNIM121LDLPWDPHmjOac9d1iUnfcq1aTJIEgWAMw2Nt9rWuRcQ0NQj+/wThgY5kS7qc2X1mv+8dWXW6ySE5IKCR3v/JJAiQZgTe230qM2K7m2ktr9HgSC9dF92cQnM+8Evr67o+WE0U2cbqodAKDwod/HTTChgLcbq1P379w3MBVeixaHfak3NbQPI8z096XvdfnH88z+e67jx/DyGpISQnOfAMTh9PNF89b3KqRh4mVdLVlvScvWbNmPakZx/bHiWAicOxZ9ad80gCVHL26bukvkLAxjkbZAud9rnWb6zzfPZ+7uvSOK3EaJ3Hm6z7dJ/Tp/Z5vu22lz09uyIFmhzPUjg8HnmNvNS6Ts7ypXmBjzg9SWBJ63DWsNaFQDr5qEdLa73Qc7LTrvuXWfISw+tXWwjnQ6ms9ULQkJz9mVlwIQDOJgGTtAewha15AZSeo77RlZBTa+Q5/Zy+F5f9BUABZM9Vx8g9AD37fT7Pj+eyWbMiw5zz2EIrpamkAI3dETknBdUesWSd5wMIAADp9foLcXJoOGFeEAgnaGDpvvoJ4z5vrWEtBPmxb81wtjT6erUHZT8/3Z1rzfX7/rrxYo2UpbnuX9La50fyrBcVpOcN1dzMDYvs9tAHCSjhfPfz1rowzYMsi2zPSAOWFgVd2LTNgQIAIOoWhC2N5gIAbBoAI6aa5K2zkyfZyZEug3Qt3Vg5UEkXahL2lo+xutbcQBQElB5wkjbO9gwidGZprtMfY3G6P3rdc904FNWyAQi27L432DP7c+ycs/eOrstr9TnIgZ6DlmRrEDRgUwtL5djW9SX0/PxB81r/IPvkGQ9Jz2OJscTMMEu6qZpn715ft+b76JOe6dXGzMkG4WanHdwWTvbzee8/n5/XZQE2Hg3oPIWupf24OCCQW87zfpdz3p/333/+/rU/32aen2++ftmX1+XjxkjyhU5PgxGSmVSxCix5AElAKkAerwjAEM+sNXsHutZ6wn4+8mnkmbZmzbWA7lONZ6xF08bj63XL6/LSXBjP3W6F0gApBWL57O9n/3mtX4dDSYHjWUap7CVL+Of9Zz8fr6Feakp68BS/5rVm/fSjs5/TdpKe/dN5eWnml3nJmvt1DlqXArq0fkPAyLIhMD0fmu5HswDG3Unjc2h1XxAAjK1Z/TzYul6M0dJcPU+JpPFrrS+j5mOt8bLlaSp5gO6HUmmuiyTZSULOOffra+/H67aBsa/kyflZ92ut68PHDefsqhhy9pPgWbJlhyZRN3E8a8TcCPeNwAsMQW4rSfcLL/xIk3z8+gtAButeEAo4nz+ch9G6fuOzPz/d//Z1a100YAYC0Pqal+buftoDUAEICAQ2AAZIup88f3RGXy8aacAktDQUBC2EhGxywIjsjSRj20Vpg5TmAcAABIDQ07PBwMyiRDde4xsNCSyAcc9DAztJyLov2ecchAQD1xc7pU3Nul6/7tdf17p/BBr59iyg+4CQs3dhXV8AhBqK5OsFBM1cpYBsV0QRmDVzWAj5LuQc2xAIAhqyrr963v1+aNb6QsbXrKv7vZ/HgAtQ0mdYa9bZj84DABqNHU/Sc37soTsl5yEILEf9nHeyz373+XC/gguUJF5j2et1dmUFcmp51rUfkp7o8/3daNavn3zfmlmLHM8FCmkZZjThY/bMeu8H8BCwMMH2MGsu27aXr+VrfFmCkpPT61prDZGMh9IWyTPXum4x4hoPCCyvlOfzPR5haUjv+9esLzjZ7+SZtTzMsszJQYVc1z3XZRGaHKhleazRGCgJseY8n/18h+5ujIUtrEZrXX7d9piV5ORJtnkRKVtea14uI+7r4oTzA0EgAIBZWjdz49ANYOxlLQAbgYBAEMzSKASgcDbdGkuGk0Zmn2fngMk05ZxZy1pA9sneOpsGgCLWWh5D7ElOuxGz7rXunkdsjVpyAgOt4vG1rvu6qQpFlr2mOM05D6A1NPJCSx5sAifSMAuZvYkByWD2pptZNHn/G3He/3r+9X/2fDhoRuvr+vVfTro/3xhSkrmv03f6s5bRtAeXIl1aFxiAYDQvrS/NaC7Npcpe8qij9QIjs5ZnNW13e5733/n8oQGSAIDGKko1ipI8lO5DNwWbMTZyn9OT8Wuu3/ZLzFprrTV+2QtRzZp7xjPyMjnQHlvLcpucJ9kAQRLy2GtUGQ2i7d4fElHOBtDA2He97AVODjIyLQkAjDXXkiRhTc7en/d5HleBtWbWZU/7nGcz4xnQta6c5LDPSaL1ul7/nPvFMHoR7/2mx9e05QTRhGwMzd///o9znp6HcFo0QM6z86RYWJc0pbbXus7+pFm6tBbSUm1yDnRn5xydAIUQW4Aa22u9VGm95rrJY8Ni2e05Z6dgI3rezYeSnffnrTJ+qcsFaQHyYgaP7eSxjNc+OznnPG3TXLpD00PSSr3CPvugU+WeBX7Oz3V/2RbA9lwzt9bVcwCEm+fz/rz/nL3nHnw3BezaS+uXptRtm6echOTM5fGS1Ba0Zj3s0XSOLT1BgfFcay5FYzS/dvZ+hzLXotr5lk/2oe55px/5F3afza5mICT4BgCwDAjcHk7xwktr+t7NQ05z2A9smZ6z1rSHz5vA3qxb16LUlRaQE6YaZEnTEJ9hSU3OCQ6dqqZJMrOSJrJ49uMBOuvydX3ef7wjec2iKTnnk4MG2MCa2+PAtV5Z20p5aHse2LDwYhYJNjaJJEKft3wBSBgATNP9aF54ed3neZ3T6cOYHPl6/frnOW8ADuZ1fz3P5wXnHM9hLgTQHo51G5lCYIwhdB/y4IvrJlCTABQwErRFBAKn53nOzyu/aRA5OTkF4XN+rCT3VJzNLAINgQbSlkazhDqjIjRFEiiDDHtaSllmS66t3brknDR5DitNJUlUlbeE5ZwIIIaeA0A0g2YZGhJroBBIzgmBM3KekNre/ezzOeex55p745wHgAMn5wNIY10paeDQ43Uza59N9t11zptm+WIA78/nBmEwstoZv16/61eBlDT52Pe9vnZP/dBZw7aVi42SdY3J2GMzTc9iIs5+JKpLMmePIUl2u08OWDqefb0uzQjba819zocE1ZK0NO35gDgtSK5kGUjixkCktkl2DsjrAoDUkgUWz36fs+EAnpEgRzxrvaTr8/ns89Z12Z4xFl5fX3/J196fNNE8z8/+fAOeG8g5cOxKAu9na92eV1By9vu7faQk5zwp1Vy+XoXsXcWzpAXMjLsgOQ+ur3Vy9t7L1xB8RncLY7HpaXcpHry0Ll8vZkBoMTcCTABjY0NkMaOKpimztAaPfGmk9YLVvfHSEg2GATYePPfcNgaA7vQB0xEFKLU1as7z/JQDWKbNOWvdaxbyWrc97Tmn1/V7zevz+UOPh8/+KdYR+Zzn7DQ557yTs0+MztlPPifd5+l+mIUXCQIgIQBNaRDYgNZNaErCCULz4mzNdV2/VO/nnc8b2O83XnO9eHY/72bv53x+fhp7bubSjGY0Iw2EbLKRMTScUCDJAwE0F6Jpz2kO3d0PrdctX6oLZPecIALJObs9XkOfPD/nfNoDIAM4nNC0hRyew3Oen1LbbQstrRiPLdoeevqcxT0zoIT9fn+eP2nO2eXkiARTtZJREnnNfaFpgi1P21ZtMZSzHwQyGgyyPc3pKS1qs5/9s5+3epwnPVvNeZ7PZz8/+/mTfUIBWkR7yN4NHo3I5zx/d2/dv+7XhUCGRQCwke1BPDm1Xl//tEai4iT7PEAoppghrWGxfN1el9cqta8EDp5pJE7zEQARDD0l21atCAxg1n39HqERUMCO2u7k5Jz9+ZwduCw0zFz2tIJZ12XZKJZmxq6R/VINAgEwRUnKBqfJOQ22hYpsz7xst8coKciea/1a85JEqqCe7IOv6+vr6/c/5PG451O901Ig2acR5zyf/zznfa1fMzeQVAZCS3r25+Sn/bSf072f43Gy8/6Rg2rNSPv5hAPj6wu0snreXkuzNGNdHLFTSk6fH7ppaAAM3QAxAJYurYu1SCBgrRfQFi/5JTCGhQT0PDQYaHr2/gmHKPu0AUHO+TQn55EIAoxVla7Xdd3XzOQcqG3bFlQaB831G5QE+b6/1roQXvfMaohiD5VOz/NJPkpGs9ZLc0kXBCChaR6tYW55sKULmQLufvr5dD+A1guyf/7kz3++//5f+/Od7PP8cPZc6+x39+HQffr5PJ9vK0pmXtJAAGRmgZuS0N1z2kMCgXhdgHRh46X10rxU9Tz7+YECjKVRR3PNupildcuvWeuaoZyz0cg3Od0PhALAAgOAkRhMOXS3pQAQtar3c04eanmFnKQpxDMqyacJM3UoYNmzfnkty8JA2yTNA0hKwvPT85Cd/abBSzMkYM2v5XtdXwAiAi1zwWK9ruuLnHaXY4+0oJbILvR5csJca67LN6zuh87r91/IaCClcHI+tSiAbZpzHmkqm4LFaTaRZ6FZ/lrzBV5zKcScnuV71qvMLojkCICTI3uuu3lMbcsXvi27mlnIkmWB2Gfmti2sQM0Gd61rrTuiSXvWWqI655weAgUbGQSc50k+cJ79STfU4/taHqe7DII25yOQ7npgnWCz1kuas7e95KtJaTg5n56d85THnjUvtDRrJ2nKPLt7f8CQZJ9nP88bZb1+zfqNlqjF834/3//5fP/nfj499Nk5OwfgOZ91rfMErev6L+dsk7muZP/5+z/Iue4vqMxpdkpje62FWz30p+cBmtPPmwTT/SAjY9DCZqz70vXSXLDAJKgk5IM2BgmW9EU5P++eQzYuUsg5WXO1tYyFEO05pbJty2OtbmYu5KK2+xxgzfU8J4nMoJwNeb3+0fbz+ba9rrWz11oYX/eal2wgPe/zjKbxzLq+/qt89XlzPhiABACEOKFgWAvcz0/3RxIYzNl5/93n+8/f/wo7NOeQnOdB0J2zmwpLas+6fsvu2T1PT4lpMJpLfuGFAKTBBmtdmlvXX/gmGwXo+Wasda3rS15oUWtGa+GlyiltVWvwKlj3rC/PhQeraZ+HEwRCGmQ8ppYI3W0LtS1ZqBQBAOte5SS7HIgZyW3BoxkNPRyEBiuQVElCknPO2YjSnicJTdtZNx76dD8URHuotCYUsDXjed2aa2at67Vm0tOeNNLyeqH2BMKA0HX7ulABabRWWk7ynJ5HmuzTVk33O8+n3cC1XjByyweSlB6vKVjIMk1C0BKc5M/uuylYPUv2LGx7RncgtBRlrS+v5aU0fbZSlXNSBjprEL7Wum7PADJmPHPfr3t9YWtW2733yYFDGkiOkZPu54Gjk703bVIba8BNCq5ykqScnrNmJJ9zSGzntCAL6NknT9u9N5CmRL4kn+dD4bDmRUhq3dJKU9p81qxr3ff1z2v9fp5v49Hdvp/n77M3JedpmfWL1OPxdfZ7rtf780eL+/rqzu6jdVG9//xfszJjS17r9fU/zTQhKhsBRq4CQtY9AInWYGjQQiYhAbARsEm6H1p6utvzNGfNhWAM/vz84XxABGHi83xy3utaSUG1pUE2pSG1Rmt8LyFF+8k5ua9rvIpkEDOThDQFedb8/Pznz+fPfn4+P9/77P28B9s++0k2IJCnnLNP97s9oKYEZIQ0TXtOc/q8ux8A8rx/yMEDEM7z/fPn3yfBOof3+2dX9SWJvYWzd9mMqJ5nH3ayUQGa5ukpCQBB4AUGEAAYLwwJmML5ABi8dF14aUa+5Ks9dEuXZ/V8589/0BQkWZd1jS/b8kjSCC2ApucAZkAUe7SWJCBJepLTZJZsnXN64irJ2SenWCEAnH0+6PR82h8oUHRymtoz172u13iB7KW5vC5Czm4Fg4SARQsHNXsTBFTyrOuaNfYqINta12utC811/fYsGqO1Xtf9NRKnIRDGnksys2wAGjBmzaLneX7O3gClDecQSCqbMRYCqNPa3id7lxxk2GS3B8lja+SLGVkCQ5ucrPsv5L0/2Z/dnnOaYM+1QoGzPwgvwdgzcwESyO2RjQT1AKfZpouxZeTrumZdOQm0B4AEkrPPQxmtpHCARmV/9neT/f45543A6dmi+7zPeWR6Pmf/aZ9ZXtc9czXP3m+ANV4qxWet+5oXnOd5kJmZ+9d1/ZKvJM/Pv98///nz/e+cSkI6+Zz+RJw8yU8aTpfnz3/+f19ff2m96LEvdHPc/vi6NLd90dfotgSVRdrzgTK35wub7r7ffb45GwAjaEgo3U8/bxJAuppDd3NoMcjS0lo0PQ/dJ09OYGGXSEtw8pPztDWQpNjTQCV8zoFaDkmT7JlBPk3pfd/22vuTnHUtW2c/9/U1vs7z2bsjE/bz7P0kldyeWXNfX6323m33+aEbRhoKDXb34WzsJjk72WT3eSQXyNEIs/cDTmi6z9PnuT1Knv0TtmbtNoCmZ4PanLPPfnAQEC1x6POGDQZrBCCj0NBwPrDBlLawOCGh0rqwGSTkCy/ZskHtTo7l8fjyui8ZCIAXc+u6gLawAagQkmzZ47E9S7bTk+wmYFDTaryu9bqZsTpCmqQ0+zzIMJwWNBd2UxAa2XNdMKxlmwqkWbMuTkjAsgAkRPcxCMtOTvZZXsgNKeIe37bt5kQsrbFs0Pie29B9YNGokRbd5QA0FWzAaGwHUUTRDtg39QAeAJoiadZ9zeUZSzBLt6UqiHP2s7dnDLhIa/0zTM/ez/t5/s5+VKqebAmgeaCUZydtzj57p8FgoGmzzzlPhcetRpd0mUkbKo0htJCk6ZGKBGR/klijGWj6PM8DYNKz9+f5vBHnbHrazzmf/Xnvz2ef09OEnPN53mcn++znz+fztoVNs5/POe+eMzOzcvJY87p+ybIX9slj+eQTHnvWWhJAc/b50A0tfD4/2Tvpz+ffv37/s5yT93rdmGf/W/r666//PX2n/7Y5fRBg8HiBQNJobs2Qdj/dGwGAAQiATUM3Z4MBSWgBCK0BaFEhZD+fd3NyDmzQeDHyutpJzsySZI+9vJZmyZckKGnO8RqIrRmLJodmPx+rz/OTbqSdhx6hX7/+a3cMr69/XvcvPJ615rJnXa+TSPbMrC+ACi0IiByeEJARgEC1Ozw7+1nXlZ5zPmDW6nme59/n853yef+8P38n+/P8nP0jKslys7s/nJDHFZCEACB3n+ahaQ4NAkzC3hSABgyGUAgQZACMjOg+tJLx8hQFz9z/1JpzTgiS1pWc5CDTwKabhmwAo7XwgJGTlCIAdCSgObXG16W5NPe6f63XL4/TFNvrur88X56X5pIHGUBIAqAGoBUC4nUh09rTHthUQFWAU8Br8JS2m5xzTnI8tmXPWhcycM6D4pme5qQJKN1NgO7vnpP97OcP4YSmVD37cAp0p8GCplVtXIJJyTm75zkbg9vsgr3s1ZDzdBfI6dlbTa1KC6kFlq/O7HOSjQsdjUpSQPg8DzTZ5xxSYYuZZS8QgFnr1/JtXZ6LtWaNlqKD6xljqjT1uqWBSU57JMFJC0YA53wAz5Uk55gtHaPn+Xze3+fzzomKbWnur1/X65/X6y+v2Wefz4Ei0eR5KGu+Zr2avfenYPuQJs/7Z38ecrDmun/9/m+vX/8bInn28/n5/rvnkbr3pv75858epZn1j3V/7f3zeT7IPd//8R//L617vf5x3n9gNwVJlRcyWDPYBAAtza3XS19feIFJOAEwFGRK9wO7PQBNzuk5CM6n5yGHZ+/3n/35++x3+/RsspsMzgGMJSwPNCmVpPacnlmDHUFSCrSccyzRk3OSc5Ln86YsrWQ/+wPW8j6PJV93K8mYNg3Z3X2KLPDy+qKUhI3ABiBQSVqX1kKDXbkS0ufnu59vuvfzEbquda1Rm5PnnBPPepE2ZxZ5PmRDns9zrXvW5TEJCSecozW6X8qQcHbPAwCE7qc92GAIRuvCQLBpaDjRDDaUAkuYRvdr1t0eIEAEY18ABNKcngeDjRZjraUZJNuyBLIbztnJSVJqS7ZAjD00PTvnABYz15qFaA8uKIlkX4seUWQEAECRGdrT7DRI9JCNRAvFgiT77AcqK2n2Uw5tFXyQABtaGoYaqUBJ1L0fzgeKhrE9Sc757LNlTp+cY83yjS8QUnue532yTxNiYSDs55PmlEN2Nyb0OY+4ruurOQCJXKvtu31DjK51iTuB0kTQ/ZCCPL6u+77ua73SAwFag/BCg2ddlzzJAYOQ0RHNOVBzEqqZ8eW5rbGRPHPZY3v5grE9uoCZWdcvo3M+gMeFIjw1uianzMjj6166l1/r9bWuL68b0fOcs9d9AYbkk0AMyEtzwclBvsZzXb+8Bpi5y3sma421qD23tETW19fn/WfNa3196eS+v2R//vz8/P391z//u9bsU/gt81q3tZqN0CwAwAHTlANIgxcyDQRCA4EDUPp56O5+aD03pT/f+f77cLi+uNf7/b3fPxw4SBcYcnq8sJl1J/vz887ZrKZpKrBHc0m4BRTC3nkActKCYO7rd8PePzOe9UqF+vr6qzl//vxHekDrutNzcsghx7Pac/bb65q1kO2X5tLcZDdP95sCMAAo2OMB2VfSf//n/+98/22PhNfY/sc//9v/+J//D13rWvbctSFmrl//0OsXOCpjrzvpzoH2pC3jnqcUaA5nA0BbAgcatAECRhpqAEALjAwmZW8AGZt1wcystb6MtHR9vbx+YWMTA1qX5pd8SSILFoIKfPbTBF2tkTzrWi8sAJBCd3YTUOyRR3ZzqMGUHhk3j4gtZNbIY5mGgIxD0vTkKIEwAyag9Gyyz/7kfDQ3yH6JK1VPaFQLhCwoohChZyfPziZ7N3tmmIVZGmr2gROyls2Q2Ne6FlgaWYhSzQXYfn39NmPcQgEbSyyvyxegNfiifc3Lvtvu5/PsN6RJzmn7+XwnH7WcMJ1lzchqT06aSAiHBSDTkI7GxBYgRbJtKLQZtWsuSc7nyT7Y9qxZa13XdVsDAtkKBVkzs1pa1nUxo7nW68vXy57xC661Xmu9gO6TpKdtm0OikeXkUK6v18x1zic9OT3nI57ruq1FAXnAK7g9PX0+P+e8xQLmnllCeLB9r9+Xr+f5vn8Z0/J6/YXX+/vP73/8z3/+1/9b+6DRjK1aXtIaeTAQ9qc7dEM0F1kUGgDSHIDSPLQQBCqFAV8S8sgvrduM1kVpWw9r7QahtbBHMzOeoeuckz6gkS2VICSlAQlLS7ZhzeW5fC17oQW6X/e677OfpPfrH/d1M7qvv2a+Sq/rly2Z8xQuPMg5SU7SyzdeAGNpUbeVpFnoAgAcTJ9vGq+Lbqyc5v1z/fqr7fPz/Xz+hGru2/f1+lr3y+umTu2vv5gFrLUoAKoMkpZlc0Ihm25JyBhsAEHT88YACA49ZYwWXtiMwRAESRp5KBR52mRvi6YUBECgIWGMjI2tkdaA6c7+UArpQV3r13X99n0b9WzatsmB5JyECgEaLWGkkQeEZPvkNAUnwS6F0JBwdnvIEWjdNCTYQPKUFOw118sIWQLjmXWNbXtGl2zpQoNATnL2u204OU8T2YA1jJGxm5ICpWBdlzx0tw9WW2mZacEj2bLEutbMBZz9TpKws43UkWqLNfP1BZzv9/P5aZvuqA4nP1BBXTMI27KRk+zzOdnP85NzQiFAckJayMl+enazIZbtmTWVMDO2rJ4tChjLc3bX+rJXsvd+6FkzyJ5r1mWZYs/r1399ff3jvr481/i+v37d1+8191q3x57lNW3kETS51vK65IUM2LNmgWRd1xcoJ/t5fz6flOtatvf5/Lz/pk/yoAt4fv71+fxH8yFJD6pnzpPX/QUGaV39vPN5//f//f+Y33/l+TEISWvmJRkJ0ZwmLfSUIENwEAAYGTYJZ5OAegJhhoaDRszCZqx1FRBAz8k59qwZBBTwNWbQTQznfr1sn10aKW3bWlAlzXmanQCy5Vka7Ix9UlfX/XXS7EdofNcAX1+/bUPv15c1lgXXPQlgW0jsh6bnoZ/yaATWurWGGJAH6A4Cs/e5r9d4itbc6/r1pLhrDcQzmvH9kl7MzOsl38KM6fE4+5NsIQDARqaQtKf7IbstRCPNhUrS90/PQ3b7cH563vRDPpwNgQ0gY9YMY7IBDBCSQgMAJDRtAQAbAbRtDwDURbaXEVUFQCtbGiQhY5A98hjZJkeUHAy2RHU8A50xQtBzzrNpkAESigBIT1oaEhRCowAestLSA7VFzklTILspY0/OzjnYnplZ42vWBAE0tLQkOChnPzm7ewtBeh4kgNITimys8TjNedIju2l7ZhaMZRxownkOCXKENEY5Jycp0g1g7vufQPIRWveFZpeGsbCT5pxzztn7fN7P572fdzlnP2d/9vPZ5/Ps9+f5yTkJIBwbYWlZ9ngZnzwhFM8CCLbWjO1QPEBz8Eis65r1tdaXfY8G+75f1+tLNqTZPc8I25Kaknrd9tqf5zyfEjzP/kFn5gutc3bPc56/n+dnLXEO2dKVPIg1C9jntJgRnP0haZrD3h9YPY9s8Ofz71///Ofr91/08/w8s77WfLU7592m2ZCTitt+4aW18Orn4Zzuh7Pp7vPdvQEAgGmS593nffYH0nMAKKSnbSl9f5/n45ns7r1psSQnp8q6RqszK6d7lwJtRZEKwkfecoqsKWfvz+f9Oc85eU52gdF1/8K8939ouSfP+yd9As/n7yQEVM+aGc91X/fM0izUugA9zdEMMgKggVC6H1JfL+qe3tfr+vXPdd9FJL//2//89c//Ln3BgN7Pe/98f/71H+f7P3o+Wgt2E4DYLFnneZqghY3NWNfFmASSHs7Tc5CZhS4KlLbnkA2wdz9vGgQyDdnQ7ic94LYUvELa836+z97ImsFGlkShkFBIOA/PB4rdVGvJo1rrmrkYIPKFAZgly0K+yMgXUpqeAAhmleTsnENo2uedHI3IQaZFxgbtHBh7rEEGQDLjGY09LPta8rRNs7sbZlZbEqH2nDxyaYCZGy0wwgFAfM57nw9n7+ydd/LI2MWcvTknCTmSwGT3fNKDVSl07w2dmaSa60BSMBiEZtZciPMp0TVzfYnJeUx1rfGMGFk2XNf1y5LXXXDS5Pm8cz4m5zzvz9/pI2ORc5JNmyTnJLWdKDtCILBzcvIkn/Ts85w8lpC9DJOSQGuC0tI8BXtspEnOOQcCwGmaHkrbJm16nuTs/dmftySNKSTP95+fP/8nbJG9d3J2fp73e62xfE5yKnNdv72+0ABrrq+v/23u39WH2ckOigZpvV77vOV5vv8+n/f96x9Y5/335/M91xS5btnPkaapVARCEogELzQk3e++/0bR62aMoKE7ilQaoOfQw960YPq0G8IJkn35mjRNuk+bfN4ts+4SNLDssdQAktTShhrcRGCv6/ptXRbQpMkZsEShNM3+JM9+9jln5n5//3tsNBiUlOfn0zxjtT37LQzIt64Xs/DCRvQcxu3D2SC8GAOAdM1c9+uV0N3XP/7bX//lv8/rV1DP/vn3f77//OvPz39q4OzuDdUa3beupbmQz3NowJzNZ/f93f3QAlDOIeEEAaEhQQIITXsOKZjCDqEtEt00CHkQBGlJ10jp6Xl6jjxAT1GRSTgBoM/+oW22qFJ60r08soHSUky7OU0b4RnbELDnmnUhAEAFIo3gsLPPySZ4GSBFZVywL9kAMlhrkJpiyQtbAGBLNrKXPE0JtD0PZl1XA4lke46enYf2qGBOXZH0HBDYnicnkH26dxJjJFSScw5AhQ1Y0jTJOTn7Z5+/e/YJ5xzAI2jbk5Ocvd+4M9d4IfaTnkqRFStJk1nrmkuKZmy35/35JifZez+UJPu9iWS1kUVJkvOB2IwvaRXSLFRCzxFYQNNNCwIBtEmtJuecj2cuD9hKc9Iz64JCkgNQ0CLN6Ulakm1P3cJca79/crLPz9lPTyDX67Xff7KfWTdiN9T2ep7vmWt8wymFeJZmtdu2BtH2ua6v+/qVfeZ6Pd//Nta6zvN8//t/ia1Z0FM3x9cg0yOKUioGRnORlHQ/Pfi6df+FDIYPgLCX1trPx7ZmaAFKc6DyEDenKSCZlLOZAvIL3GyRkvEw7annattWFljIXtnHa8GWXIcElnXbi5AU3mnaeX++Zy7Y9sy6fv68X/c/jAF6kj6fz+fzx76+Xr9sISMAacDyKiHRgAwLmwLQ6JoeIElRfd/n+2e9Xvr119WsZ9N8H3z9er3uRnKwMXCdz48CyfX667oXgT6Y7vfz+SMxQrPAYNLqcIoBE8jGg5vzOCrQcg59EFqDDPGYmhoVYnnWCJOeZBEYGkkNJADQfUiMuw854rTs50cz4V4MNj3pZ1iqk5PnWfIenf44M7PO+TnGXN1HK0ihbUua2mNNe5JjKIcgL1+LkLMRWld7mtJgI9pHukgU2tAG1nUTww6PuCsQ6pRCxgb17O4nOZLkaeNZQpxjZu7XqKcIn/Zkz1xYpc/zjCUVMnZPKTTCsPd+1hoie62eTYSFcp7n+Xn2k+TsJztnx/asacqhvdoBJyfqfb8w+/255hd2Amif3dMlIwF53sm5dCPOfnAt0qSxPSN5iNO4n9jS3CA0ABV0nw0k8WKN9ymAZCk5z/OkAbDKTncOZ+ecJ91tk0rYa2YhgwEhxFo3VXOWX+jebYksPJ7LXsZrmWGuLwxg32LtvfPsa+7RK2lOVZp38neztaPshOvXP6nff//r/a//dd2/eiKCDmYYjDQ5ag7s+kDA2ACuv37p/g2mcHZbBLLXTW0kDaLng4MCm2YM433e8Ba2bhy6ASDnkOS8u+uq7HJOPj1viCyApNlNvC7ZadqtBBmKYhvLnpSla3k0TtzUxp6caggPmhaR/fycnet+eX3N+qKQpJ+22GgAbLQQgNYLne43gBdzM9y/vvbPR+vlawG6f8Py/fvXf/kf/+1//N//6//+f7y+fj/vP2cfjNaQ8zwbWHOtWZJRzvl0n5xjqzkQqGVGrEvrJY00mgsvZIBKKI2kEo3kSzMAGBYMSvc35wC0PZXHFkDpPj2nOVRkQ1CAtApQPAk5TzEdktMPTVN2ewKUE5IGKt3ylUS2NdaFA0AaYaSxltfI0HPOp3mgnENKg2QZAJA5n+ZIA0ogyLLlAdWSgmhymgGHjNbp5+zdfQCPXCw3RzFz6/XLc3VAtTAgT215fI9/yXe6c0Kwl8ehqGSzH+IEKIjaLGvMNGgE+zxvM4728z2o5+zuKNZc160R5PSIcJ7n/QlqkxwBosQNCRxs2xZJcnbOIw1gDAC24eTscuA5eTtqlLOf82way0k+z0MLTQ41GNx6rfu6vmAkmWXPNZcwxhaQbHtBm51EUAB5xGF/NicM6Xb9uv/rfb+WJxvw+FrXNbMsIxMtjZKypdrrun5FTQdESPZ53nmeHBW0rv1897y9brL/9X/+P3s+r9//bD7pZ809c1/XF6zmhBJI6AHIBvo8MLr+wguA3f3D2bAAgFm+XprFibzwjW/5hdb+HJqcwNyv67pfcANQy17CzLwAYQlQYZ8DQk4KxQOGdj92x8K2bElyGgiKbahmQLbkue7flJRzzs4Zj5Dwuua6XlpDTxpsQEgSTc9DNsAYIQlCKw8NWHPR6OtXCt1+/er73fcflHZDRKrNYK2f73+zA1f3QdbMzFVKAsiqqzVIUACUBNB9IRgj46W5YIEAYevqKUnPg4OgBpBnLq0LryYkTaGWxpc8AIQeFER7ADDYKE1paesUe2YuryVf2KXJTg/E2FKyc45pcgB0FZKAMak4Z7SuuUHA8lCsW5r2QAEKCA/QUwqyNDS0liEw8pLvuX7bN7hpGgyElGKAo1GAVr5mTXuODgZBsYydnjRp9vlpt0n7aZ79+c7+4EapJA3QUoGFANkL2TItHnmANFCJ8QBByWEfAjTZJx/MeACYdic7e1PASaBpvS5wTgk5B+OZ0lIE4BlZ6QmUpgHOZ1s21XjWtexlD2AJYc2aZY+8DNda13XvcyyvWSFppdVghOWxtYBk5xwJCK3lnAjWWmk4yMtrrddKAuAAzYHDEJMTWkhC9hHMyF5z/7I4/cgYSUKxr7EkTjaq5tr7k3PuX/8jnef9veb2XPbdBLbQzGguZCKgPd1verQWBIB0P+QAmtFcgNbovkD4Zm7NkFAIWkP23h9pyWtmrnUDtKdQbMuaa+E04VSAhAQWyo48XtMkFFrCEgyw1tjreX6SjiY9a325Ts667nV/7b2tAXKObEQ516+/bJPSnv3mfLp3d3rK/nA+nE3C3pwg95zsMAYT8MrnQ5fn+vnP/095c57z73+RYAjP80CY+3r9lfP0/YaQ2EDTY19aL4S07EtaePCSLk7VouGEhqQ5NMjyaC40IM3SjDyQ9qHQ0nB2AS95AGaVIpDlNV5QWihAtzwARSNmNIY0R8QqTaDYsnRZQgXSIICc7P1JAiDWqD0zow6YQiGtkYUtD5q5XmiJAQM5h4QCaIkAC4GBJmkLaVUkhMg5NjPLNjKiPQB1zyGbxLNOTjnE8iJU9ry0Ls/MjNDe++y3+uS8d96ck/OBQK1luTnpAQdsAZ6ZtdZ1AbaxcpJ9KOt6oXjmJCf7dCcnzTlpO2vZY9nXCHKOpOS05Dk0DF7La3kGCqRgQ9sjGWRPU2ozQeCZdU5sNOvGlm0PYJuRZQCUnmYjPIYCqBAITSkyHSMxlCTJQW1pkRHYIyFqFvZ4StPs/CTHJjnykKodyx6PbM8M0EZyreXb9zVzESyApLDTp32QrvuL8fv9U2t9/drP/jwfYOennBOTAmrP84dEGhoIifyl9RtMdvebwPrCq+cA2CR9H7Cui6bnaTdJzl7r1d39+XvWmvvXyVMeMPC8v98/P0By0oJTAKFZIw9CUpqep62QQHWOiLQMTgK1XtYE9t6UHDcHNL6ez3s8z+eTfng+fZ4213UhmgB9nuf9p+MK2ADjtpT2dD/NAxtCg9r9pnu/v/v+13rN8/3uz9+Mwu7Pt/zS/UuGgzTcX/fr12e/+/03w8htANkIZAQyMHNT05RoXZohgXQ/nE/3u/vBMEvr0roQKCcPABDTwun50N08UHnwKiUneXI+qFAk5sar0BQA2kITSk2hYJAsSZT2QDU2WK4AACSPb411eV7X+o1UPYBFaeCcLYxWEsBrIaSldYEb0oNAbo7WaAZMmqStZrCiCMpTNhzAHiAc0r1PkrkMnJycs0+A5WXRE4oacgAxYtbca12nhGMZZu5f1+sXiJAkTVKgYHAE9nIaYNbqOavq3skOrOtCrLnttU9pKRyaQwUD45n0PO/v5tOedDcHazycg6yxPZrb19d9/7JHXiRiYKW0cACssfBcay6rpdrPAwBpWLbkcRLAGsCj5CTnvpZNeqwBzvOZwV5pkQDLACAAkhaapDvdGGDnE1zdhKQcSmiwAAJs2hSE3b33fj49Kcca6dYsrws90d77g5ZnnfOThP35+3/9v82eNZ/vfzXd57iTfNrvPj9nf87zDgeMh6HPp+dhGWD/9P2HE62X1qXrwnR/OLsp58jT/X6+/00jT3XO/oDJ8/lsX19eV8jOg2HUPDuPNYIiGAuoAGjT/fQcj9Okp1ahBMreommsGdu2R22a7L09zjnJeT4/Zz/Y+/kezefzFM0MJDmhabuYkWcZ0bQF5AFg0805GFltEfvPv7vfNOf9reu67tfPn79Rr9dfKf28sdd1Eff9TfZcc79efd6Q6/5HN8iIPg85AkAeNIzSaIZZxAAAgKGwwQANunS9gLMPJ5wACKQjpBFqNoJsSQHANkCgBaSRlywAG6DIFi6SlmyvNR5LKHCwOCRt2jaJYM3AxEYkn2e/bcOCtKcEK+c5eehODkADUABAYA8CCtAgEGD7mjXtoR0kUSrEjOYqBAy4yU4YL+ycMAtjj+dCm3y630n2+bRtztkP45nb65r1te7XdX3JF/byzExyznmyt32t67JaJWfv9/vsvZ/n7E+7P88bRcIS0LOzD2A17dnbyxKfZ1uDOefQQ/t8nnN2np0EstayZo2v6zWzPCOPZ625Z5Z0pWfNWvNFlR6QJNpZ1339cgutZTRQ2qb2pM2JPYAtIDnAPt1P6dhjOz1nx7bt+uAxtpy2NA1WSGlyQrGREy0t0SBQenJO1Z42bbKzn/0WgYE1c9miYdMDIL+qEZerpGKd/d7P6d7dz/58rtdfwPvnf13X8lz7NJ9SEZK9+7PWrfXitO8P52guRPe7z6d5o5sxQJGHnu4354PV8/R5+xIBYG8axvTMuu/rtZ+fns02gZQwXoGWNRcC7FnyEPL59OycDW1OdpQUkGwXck4IErM0194nOdf9WsuIEss5n+u+1n0L2nhdmlWMJiloja+58BDQhYDN2c2DIDmf7/P56eeT87A/aM5+A5L3PuDXP/5ruWkZz/Xq893nu5gByPv9+fO3ZhCcPRaG9DyfEhBj5LYk1gihkQbA9BwAGaS5AIBAw9zYVCnZGwBpXdbyXGgBAKKlAVYRpzSoJBBYYAyNJBoZGVlenrU8g2gLkNN90NTa+8nnYwU3Sc5B2w7Qc2hlAUWyAc3knOynLU1ysBmT0MogSGlJeg6EtgAVIk0PlFoRBYzcMIk9IMBugLNJjaSiyT4JgDwAjCTo7oduoens5wEjq+necFDGWrIIaD8njWzP2tk5DyQNFqvJYy9m5Zw0uwcPwI7p8/k+ez+f75NPzs/751852MsaPNZqD+C5rJkZr4UYjwgtznk+6ZHAgMYrFEoKjZl7XNW214iTNrTnEGjxCSc+WzvEvhL287Pzc/KTnJ2HBWoSCrtWo+JZ64KGY9sYmpAnJHBMcW0ZrGO41j1a8sgLEJzk8/ku20YWHjxaowF29tuaub/wshXtp06kGbItXa/X5/tf++ed5zGxkhz51v3XWi8z9DTv8/xnz9H60rwAApKu37ovgOzup/ug0fpChkCa9CmEipBzdL3wUEkjNXTNsEOZdUmCE5ocAEGdUCpbM75cIks+Ox+yIZvtJcnGOTs7ErSg8YA8bmsZ+fX1a2bkyfOs6/a6RoCgUpDrEUJBDxhWezinn5/uI/AI5Lme7z84AXLWr9/p6X709bp/vfJsxiwD5/1NDmzWLfn9/u4+un+B5xqbw8eD1q15wQI0g5DQXOCep3n6PDQAgOkpCcAsrSHAGptu+4LQg5dFMQnn0/1NaE5bk3Oe9/On3bCkwQuCTAy0RUsIAOjIr1Q5B9Kzz9417ek+gAxyG7JzHhjq0MM550MNUBF6tqAnQknoPnkIyMnueUAAFiwA010q22A8WG2KygE8l0y721MNQI5n0AKTnPOBo1NA67JBYTxeywMLzdIgZx5c5HMOpZBsEHUbrGrCEU1QLdteNGCaWa97/VrX16yvmUtSsXTd1+0qamhzZk33cz6P6D4nLVryrLl9LamewYpcFoCQkb3Wmrkq1lqzLs/Y7WAJhEVMFHABG/u6XuPltTQLsGxflh1IobDPfigAOcm2ZIk2TZokSSzRk5y0xk0ApLVmxs3OfkIAYO+zn5NiD5RGFARcEpDzJOznk3NAICEwkHOSWrd0L67Fuq4XsA/Ate6f77/L3if7HHRdr9+eBYTDmJL9Y1/yQgWk0X3p/iUPQAOQAEhotF4gJF+vuV/MAMlGpTvPtic9wtd6MbSHBtme5JAkSXaaCqq9d016koCEzGDPutG4k3MwlpCbk3PssXxykp0GaWdnn+fzEZfvVxCmOWkAe3IOMPjkIXvvd/YHNkBKjmaK8UjSzMyCdV2v7Eev19fvf3Zv8Fqv9+e7729A68rJeT4UFK1Zc3M2MmE/nwTSAt04NDQkeElLc2lGc0EAAKCA6W4PQHfPoRvwTAMzmOyQJNsupM+nzzfZtPCQYy/j8wQAIzSDgTRHa5CbIuNBhTQBgUGaccg+UBEAaa0ve2kMsmf5mhma9kCgBc/kNNmyPQOYRSFHsuSkJLRMwAAGgy0PhSINoFBaIFAAqclpSpNzBJg0gMbCIOruQ1MKRUA8C62EwJoLRHd7VCcI92SflBpjkvPsp3kAZESEbLFU2wLwRNHIHlnP87PPgZE0npyPNNDsM3NLhmByYt+2bdrHounpaXNyTiPRltKzBTNDd3IoJ8Jj27RpEVDNKOrZuwdqaSfIo8k+ex+p67qsq6E9FA7EpACQBpSECoYgBCQHAMmm0NgDpc15ykmb5DnvnAdqwCxf1oWRR8I+IJhWnjHuyQxrBmrZnuxNu+6v2EjX/ZXzJCSBQSDKIefkaQ41Sc9uDwBGZgyB9HlIaAAADEOKrVlUeMkGgZ/nPcaWZEmaS2sQiPGyl2cokhCS7BnbEhQYL/mSPXNp7lm312KWkcRaI+EZ25Ite9a61uv+Rc/Jc857XTO6iHpCk3NkW0imKpydpstLbffD2RhsZNtAsxGV1Flfv8/5EKR1ng/P1lyG/f5DN/h6/SrO5933d/PcX79ZCwCf8wBJ9ueT83Q/CK1hLc1IxsbGpgCMpZFHGmZJw9k9Jel56NFac99ATxko5/NRaLrf7+7NLFk5Z+cpaJZmAAaSnoMXIIsEIcNBXthlz7LHObuJUSguBKVN9rHG1ytJ0uR4LNjnIR8SyRRJspK0tYxcoMEjL2RbAA1BM9IlDRjAoqIVIiCXtrWGkpx9njWz1jrnOfuNRPL5/KBVfLrhnJOewELs/SFBM/eNzYFdiqwkJUjZSbbGtmxrzdKy5BFgaiuN8d7PPjsQqpa0ybLTc85z3u/n88PguV6/fnsuz7IHaa7xsmTH2Ucg1lovaaA5n6bJOeed87EH0SZNqRGAC41idXmskWUO+wSKxdiwe5CWRlULAID256FHM/VKmxjjmSRpLANrlm1A6zppCihJc4DSPFuSZ0EQYsppO56OgYT0RAdjsNye53lmbK1ZNzbWmklO8gAQyPO8249mAdKMFmzA9sxKQ0J6nvP5fvfsniQBAd0HgFC6390HGRuAQmjgQGgRjHVdkm0jj5evC6DxtdB0n/bYlA0gjAaNRAFsA57lGTzyNKX0HFEFQVFFSIE2SRvQ+Brf9oUMCM75tBv3PB/AM+LkxJo0MPfrlyxsEGnPASFRmpJCsWl73rqu5HS/dU+bnofX17V+P+9Pn3f3mzGc988PIM9a1wnsYM+6MABJA4Gc7kM2oPtiTNP9AAgCNrPwki9sAgDVDBrNpfXSDISCvM+OofnsnQovASilRKKUhgJQOLv76X66DyBPJUp7UIE2OLhpsDwCgYAUEAQBTXb2I3z2k+fTtE16OCNxzns/Dw2NEGtBejYgG1EV0x4SAJKzaTGIJCU5Ryg97UNjKe0+Z2eXFtrTc57Pk5yeh5yeYDQLAJ79JrmuFzWBnnM+HncnhKQ9tm3O3qZQIc3YbnbyJKHQ7Jz9fGYMKaccdBwolDVDs/cjJucBIPa65xdtcvBKYjs0PeUgcgomEliaWfYljb28Ls3Itq1iBpr9vZ/P7rERKcVeM/fMa+YCiFIhV4BA0KannxKvMWB5rGXEmssyYtYgARZrLUtW7AHZk+Tsg7TWS1zndPyylv7/BcHBrm3bmpzVL+LvY8y19zm+6bSNZQoWAgmBRBGJ938BCliCAqaAwJbAGDLTec/Za87RewStsTBz3eNbEgD2jJF9eak5OQ8cVFn2LV++ftg3mpS99/PZz+ezz8PR8zy2Zl5JmodqtM5zyCZJA7Q+eZItiQQAKN2HU0AzmgtMSguBYtPSIpMgg+jWaK2v5uzzjC+0ekLCaQIYCuykiSWpWEiyheVBLpWE2J93EyOoPca+nHNQ11qQ042EvNZqW+bX9z/aXNc9s4DGoEByaEm0LmZRa5bG8vTs83k3jwCpAFB6Hhyv+/n1C9Bae79p/HolPN9vFAbI95//mB28vNZo4DDMXARbnjWzKNmbnn4+PU/P4WwAaEJL0nMgZNPdc9pDNi1BM1oXXgDYc+FlLWlhYwqAPLMuyRTUZkNJsGm6HwCgh0RzeRZCDJmzz9mHSMhewlRg+wIbw4FCrfTsvZ+cAMkmASTCBs6zBQAgizx93iWshQcsFjGhPQC2ZyEgex9AAM05YwlBkSQBBEu2CJpZa2xzoMUFaBC0SZkFSgPQRIScbAV5QUNkWwBwzjnY6ckJYA9SclzBDodCKLJGkEYz8oDP8zzvb1hzv7xeoPvrC6nY1jkfrwV6Pt9B1pXEHq2hAjd43QBYjOqZe9aFJOt6/bDm8+vP5/PxPp9wGAFA2efz3g0uPelOThrG9mAAMQ22l5axEAWSxnLR3C+M7ezdbFCKbbmlZz/rug8b43kBcFDHl7w0ozHaNragBUAaz4WQKnytG5CML89lq4oh55zP03y0DwzW3oBsQ8eDEJ6Z+/5NuvC2BdZcWgMBtEbXF7jnAFqDRNtzKBQEiP30vEm8BuipPfZlpmVdF4J6vNYso/FiZC80bREgyeC2FFoBSBpwkpzaxnimSVyGJMmxLGSR3bMfz3q+PzAzozFrMUpLkwYRCoDxAiEjSyNbnspCTTmRtfd395mu7A/yur66D2drXRaA5uKE/by///75/ImXrpeuheBsgsf77N3THohngfBoBugpBZBEaUJ290EGAGmgWHhx4EBB4ADy2MgGtJ+xYHNaKnldP2au5DS7OgjYEDgQZnRdsKAIzVC5lSsDaY5AGIDa8igBhiptzVqDQEApgDU0eR6y2wBNLRPky+uWBqAhlUYzmgHYISEBjT1YHty9P01KTk4Sd9yxhZy0FI89o9HMmSHQA9DQzCytO/t5Pn/Co8bIGpueSANKnpNoVtKzT3KQKdKyryQWNGsWgaQUEKTRNUnXda/rfn19qXy+36hzLc+Slmet+9JoyeMrwSY9M7fnso0ikXK/fhTIabFlaWbNzFoLkLTW9fXzLzl5//WvTgAMwDnfPSc59BBgpycA5Zx9Hnvsi2INJUna7JOetJaB/XxUCC1tTpKEJjmH42LPaOV5JK370lrREUEDpkkCWBdYGkp222MkKefTPOccxPJS2M8Dsj338vTsXzlPKUi+EaIYwGpp2/3sdp/zoNvXD6z2YINJCBCyaVAACghgDIAJtNjtKepuElmMZfdsE9kILc8oVBoheTTCKiDwYMuGQPFoLYTErDWXkbJr2162hNqAac/7G1jXJc+67uu6RwtdNJwILFHUeGYWFGz6kAOmMLckigAo6X78+iEE+F5z36xb67KHwhixn0+f0/3MdeXZn19/9PkD0CwKeCdipMu2vPBiLorWIJNA2oduJCQhGvI0p/uQpzkgNBjGmO539wc4Z7enmpzN+TzPdxOSWkL2iPQkRR6Agm8whQoZAQEo3buksr3ATZKnOagyNJQkaQUWMslBI2Mzsxh7LI9nwkl2coBmt6UwpvQUyoBoDwLBGLtNG4rnwta6PGvNCqmRBcUgyxcgaEKU8uSUDFgDRoABzyDSk3NI99nFvm7ok0+JZ+WcdlsOQXPOm257ZHnunCCnJyXnJKdIjNctmp4DIDSatdYFR2Bd1jr72SeqzvOpl2dE1nW7AlDkpNiXDULQSjIY6lnF5Zp5yVfRda/rZaseL9sgGkFSa9yxDANc1zV2EoI0kmzbtpWenA/Ecs5OIwl69gHa2LPmsm01aXYBeSpGgpiuGeum4CI0l41naQYiG41N+viaHQBbHkr22bbbPJ9fRbXLOfvX5/mz59zXwntdAksCdW9SeXnWPjsqWOvCAxAAAGgOttbVnO6HgsCh6TmcnGc3gUBtk+2xbc+cPDkbG0ETQEZn709pu6FSseRFBZZXKUIybfugAmAkmiayQYWqCFApKqqFzbpvxrTP86ZJNw2UhsCmechudlUwNqVAo2sB40serWlNggWQD2thuh/w6+s3WxCMXq+fP342Z39+5fOre0OBnqetJCq0IHQzi9B9mpCQAE1IMRha9odsWrppCSQMsMDscsje7J02z6c96TnnUGxpLjwlbZaGmgSQRhZzIbGfPm+yAQLIc9lLWJp6CcNgUSrCgRrgQMXYAwUS0MhjkzxNiVJAQPZJAqVpAwGYGy9sMIUgTZo0IKAAksZziUlk2aoAJQ0wa9kDUNlptkuXUTiH8fX18/P9Rz/f635JA77vl4rX7es2lse2NeOFReqxsrM/QPpobEtaYBYSOVWac5hVaWmUGJm0p+Tz/uM8m8bjc570zHV3N9mySmYue/Z5A8Sf94aQc7rbznWtaxGYAbB93bNenonc9uvHP/n6+RfbIiRnnxxJFoBICzJmp5F9Xa9rje77a11XetJjCwqgpqW0BWRprUB6cFDx2LIsadYUvAbred57b0EoQMpJsTyy7ZU8sM95wOYaj68bL/keDaLXApJHdEBen+eznz/X9Zrrzvmstda1EMmpFxSx1mvNuu8fa10EAAIhGwLIl9YLIQ2YFgpGkgfjJTDPTg5pE1X2kgyOSgMgG2hctSeJrZ72nGEoAAEg7T7SIINO0h4SZI2SktgygWJsg7KTnbQUqMS6JnlQmkjyOG1ynudpHqg8mkUPgLAGmdIczTQBewxIV/fufuSxDEceX691/9BcWi951o/fgoDzPGQjGGOg5Oznm7M1F9ndv3oeiCQATAWgg0qCABcQz/O99y+y+7z7eVDIPp/v7F/p088vJet+SeppEYlkcmiRLNsLSgs0pzkQACBpds85+ZSDIGmSHhLJSBxKAY3TEyKvRmD7Qr6u+7q+hJGDQDmH4jXrddkUbGODJAPU0iWPJJqe0/30PNk7z4PBQIEkex8jnSRJ0tjGYI912QsMnTFqmhkJznnAWGnyebfpeRCeK9m048tewmhhn70hAElZ0tjeZ9PmnHIssrdkS+1JAoxHaxkhUtmatc7Tz/O2537dJ+/sfd9fc93P57EH2mTmq+exsFY+j+wCIVKCRYh9zfoisa3h7MfNPuH66fu2JBnba1ZbQGDby0loCwg4DWjsgdo6OTSeSZvEGttprBmNJNtSkwOlJDtKqb1mxl5J03ooR4xSepqnp+qIqyXdJ1tLM6+zzyB7jW8Doo3p/frhYgnPjx9/+7r/8uz3Pn/kfCRLk9Qz1317JoCPJXDPoaWb/eGk+2mLjY3N2d3tOYh092wCERIFAFqyTymADNZcObv7nGfTAADQHKmyYASyZOCgYiBQSPNA5GUNUl1p7FtrdjaNUM4xI1sePEADwh5JgHHDeBooSVA8lCEl4ZRA4XyoCQhoaXKwRwtgFoiAluYCmgOUArA4mIESycKA5LlfX0ieeV0/GDcHyAkABgAAkTxJKMgIzSWv87yVqN3nT7rp6X7nfO/8Os8HCjGHFpDHYyANlJxmAxVIVJwNGyABoHgkY2wlyecXCpxml9JKkkVlRp2EUmk8F2DJNqzxxayex6lsjTwz6yZk42VZyEByALq7v9sHQMbARqEFaAFJyF7Ls06OLETactAgr7kQSBjcc04SQFilp7KoRqZbHqDNkxNOz9Oc5Em3FPXs5y15zfJca60irXEluc4+TxvSVFizVimgGcTp3mdrZq6v19eP61rvz6/0jDXo7G35et0yACg9syZ7p6zb92vQpD0549WciLWutV6a1WDwzP58k9qz1m3sJKWWEcYleKwhsWyPPckBSmwDQNLxgADL1qw1tqzRmtKm9ogZL3tRQDnn7FNOeig9oSfZOceeWRc2hLaVqCSq8W0tyYhDJGuc1hpUGZTP811dYub6ofWV6vn8+Xz+yJPu5Bx2ARTLZtLss08OqA12c/DSXAAAIGsE0CNJswBk0Od5nxwpGqfxjNbyUknOu+dkP81mTHf2AU4LY9/ypRHSzsai5ey2mkHCNKc9vqxZDYgSQLgnZ5/lW7RGlm3PrGtRJ+xz9tnpoZwgL69rzYRz+jjpOScHgkChAZ7nTXKyVdlDNmPOZtZcN+dQqGkhwH4+PQ9Jng92e573r54DwYNWGUjM0enZ2d9NZwahEZ42AJI9pTkboMbAJpWVbNJSJLy8Xvfr93V93fcPrnsnCeBZS7Q9bUBI6jSVBcUm0ADYAAjAlpZ8yc7p2aeJsFGSUgktcMumh0amHIpkMQAasCyMZK+Jdc7Zz7N7EuEBgPbQ06TnAfCiAADguTQLoCBxDoksAABs5Zw0tPs8ydMiXfJKjmV3YGbdaZB1/6A+iV4/13oJe67zHNfy7P3Y5rorYcmTUmRPzvZcEKvXXD7MDMS4FGGDaLhmke69hdZ9r+tLNucARl559l93s667Zwfm+irIdGc/H5ST9372WjfP8Wg8y/eM7UoaQ7DvnHqGyDLCtklzYhkgNGfvd7JnDQLHxta1XtYgs2wPIEsae4UC42UbCgg1saehre8FJpGatIltyNmf7mMPLTKlWLYxJDmImbE96xKFtme/v5/P9z5772927Nnvb8trJj3rmvv6nTOkTBnDOfmookZggzxrzYUQxtZcmgtARkAg7cEwoxkk3Zeui0Zt95MEPHNLFyU9cITp2ftpQgJgTnJO7EXPOd/Z4dSMuMDIkko1C1trZFmSBFCUkIgmtV3OyUl29s55kjMztg0E9qEFMOfssffZ2SdJXcASNhQDICxjCzHGNEW0BexFT3lQGsiWBzjnG6KZr5+/eVYgpOdBooS0cUpy9kdJskuRwRR5gXuQ1/hqm7PJ7udXP29Ucs5+zgnZNPLo+vLXX/z1u9Yty2MZsL0K2Mv2LMY1AOdAIayl6weYBEBCQoICRpJLKLa9Ll8voKWnJwdkD6E9ybHtWcjWAAB2UJPsQzpzX9ftsSw0ENCsl9at69Zc2AhkMECRJQAQQLtPto0tpNK9NwBGhpItYJhZg5Tizqy1Xtmn5wHu+06C7fH5bFXi7GzEWldSae7rJwigPc9HQ1rJlgNAAE3Ay6OZGc3QGKw+51s5o8mTpCLJhgUy2s+bnJnVHKKZFwVdiOTI1zlJn1n3mrHHNnCagiQ0lWe9gFn3XPevP/7hSbwTbI/S2pKlNZ5lTQPMPk0KQ9n7yXn280EGg+daXF7rAidJ6UmaUgALuW0Tjz0La6wm9Zr103MBtF4LAAGFsE/23h9LaGNXLRrfJJ/3Z+ZqT9P0WAOQJ/nYltfXj7+Rp5CEriSIUmMCiBnj09CybgJeyAhOOAEo0kgDkJD2824PQsgzsmgkIcjuPgmUz/P2sq8FhgUaW1CaPPSdbpZlNQeh+2KsuZglrZ7TNCeQZrenUU7288Gw5uTs/U6CgUJpk677tikkh56e/ex3GxDW+EqkGXmRNAeMQE3Tc+wbuw0kZyMg2AjOBy95AVyLQA1oXVpfo+v5/n5//7UnFDi0DVQKtAV7oDQQhDxCmoUMCFFyPmf/OnlEvO7r+jkeNDQQbAhEvqjtS16cffYGSSMvW6RJ2uBSKACztAYvMAkAbQ8ESwvPICVtK9tzeRZVD3SlSDNzj5ck2QigLQQwI408INm+XwQohIZsKjA1jDQksMmmoRE1QgOCymP0vN/72TlpOp7lZZmG4llVkdUeOD3ZDw2a5/nF+YCv18+kkFlrn2+P4fz69Y9I932f/e55EC4gzzTYS0Ve9lDmXgjLxHhyzsyAYQHMQgqNqKdI9jkNun78kx+//0tz7f3MzKy7yCip1rru1z6P19f9+i1Jcj7nDcKzc6wFauW5Pvs917yu+fPP/3T9+J3yx9//v5ackMqWNGhAlj1LLs3ymhlQWrvtUbBkjzxUPhCQC2pom9CWE5KzrTW28awryT47uE0ScbyQxzbQHhEvs3w4a41mkME9BwQCRM5+PEP1eT4piPM8p+ScHnzf6X6e7+SBSljyEoQECmBMtG75wiYbPjTNA6FGNzIARlAonI2R8SxCzwawm9MGTEtqX7I1g5lZxgJLJJ6XZSR5aHHbQwRIA5IueUqpYChYVJCSVrbtcQ3YRgpKYl9zXUXJgZAkqGt5KSSnKQJooxliZhAeay2tixMKO54lDw0CGdCMZtAiXnP3CEOgOed5//rr+TyqGTWbc2bWzJ2kOaXZBwRtD01zGENoQPLyun3/mPVj1sv3b77/ybx+rh9/0VwUajBehJ4HWbg57SMKBgcnOft7umSBCMhkUwCAhgKmlqZtErHwio2FwYB2AhZUWwSPNRXVgKSi0tAQrDYHuO57ZrS+rvtWA1DaINqD0AwsSPcDRUqho+uGkCMvbGRbllWM5dEyavucs9ElTGObNnR3n+eZtWLyeWiY24gD19cIX1/r+k1I69ZczgYEyQaurx+epTo9bYG9H/kCIsMxPso+NZaGNZEWMx6A7DWz5u7zofX68twt5zlm7NndHs2smQXe3x+a8QzAeZ7nee+CvWjSnbw7qz2fz/f18y/vP//a8Pvf/qsleZABmkTj8UqSxmNaVAl5AJBkadZ8WUtz5Zzz7HNOcix5VAKlLXiuBgAKBnVvTtjHhJzn88c5AcuDBhupUluT0cjX6BYmG1jXCkmY6/YglmLlXNcV8n7eRigpxmidXbdzGZnSAsHqhpJuXCwcAOhpPw8BLwQDTc8hgLGYRU1V1J4SkGzNyON1e5w+Ruu6rQWm0MhND+VANmhIVGtuMhygJM0DYOM1XrJnXd2HRsZeM5e1pMu+JIQlW0Nod/rQ4+We7s8DvO5XqGckK8gh6dltAIzmZsYztECz5aKghRYAIEGQmYUXspeRKJjms583JDmsBeXZlltsz7VmWQQ4++QcAgKCAgBIspHRpfs3f/0F322JGSPhQYApbaF0n/0WJU1jm8EmiViVQfZiLWxkujmBMEDooQFUWVNQNRpraMmGKEDaw2kDOXAkWwJaQPYAzWOPDNTMtb4IKVWhEASEbAwCdlMazqFwTs5OTp9PE2q8MDO3PYVSa4FsJ8wsG0h7JC2/DNnn/fw65w05z4Ncpdk0kLaQ+/WaGTBzpwKAczbFaxnwguT5CLekJQBA8rgutIUYD6N1ycszeCLO2Z/PNwlAQ7V7tgIMgM4uAeJrZt3ySmLN/v7+vP94vv/cnzdjM7Tsfa0vzp712+vH77/++I+6X//8X/1XTiPXFpD9pB9Z1eDpXPIF9MSe0bSkqcCUCqCikLSSwTltQ05PyIa0QUDTCoC0oWDbrYQQkuwlX5JarBsveTU6G6+LWSjJGxUBPTxC63oFwZ7r8tw9nzVrrq9zQrEhAq/xdd9IGruiNep5eg6EROvSujQD4EUhaEZrwIAsrQtGNlHP3nm3B8BrfMuTHKhnCD2Hs6EeNzSn50k+OaelLUIzACcUTgFAHjyl0GQnbQsSliiiyDNred3yYM9M6fN8rNEaZJpZVznyQqMZQlMs0uaQDRCk4QDIl+bVbDiaAbQurS9iAECg2LOuxd49R5CEnLVGMyBm9TzJTot9Qk69liwLDE3PpgBNoDQ0GAgJQDY6nFADfR66+7zZH0p70iQBGpJNIAEkpTsNBgBogPYApNhIGDBemhGSoAAgMDAzEmlnrlQ7hbEkCYHkGZnsTQhBtjTXXdM8TVQByED2Q+Hs5rQHAiAj+bqg2Ue2Zp395vkmUJVEW5Y9nkWRhXj2e59HkrXgQHJO8iR7afZ543hdVp/vP+TRuorn/rJ0Pm9dL18XJ3Nd8rQFnezCmlfPLk3TkhxEAUaIRlJbgLFwUdCaGTlJ23N2zoYKGdbMmnH9nKOeGa91eUZ2IWeD1nWd8zlnt5+ZK+V53vv54zwb1vN8fv7+t33/+f2Pf6cfv9l2IRRxnpOnrkejsEYaMIXKvi+va62VnJxDDmrZGKTkOfukCUlOcppjK6RqWyhIM8jGruxLvlsHaJpgy9PYLM9SffZpO8sEwJjBLvj0Of2cIF2Llf1uEGNnXdc5ZEt85QS0rvtaL/uCwZ5Z1pz9kND02fv5AHjhhczZZAPIyAhoU2wEJdSa8S25LQRCIbDWzDqEbowQmDGelpNPeyShkN2WGBuZGQwAloYEMteSF0zStkjiQOwBlcoG7DVzS5MWJClpTjQLg43VIEseIYCz24ONL2wIFbOQGCHIRmYWNgJD4exkQ3sejc5nn/Nh5HUjQFqDx2Opa13r+vK6tV4zNx4A6Dk9h0YSEoBM6DndDw0yEiANLaLP++xfz3lTCAhsZjxmB1jr8iyNIGn2/tAjCQzIlzRUnEAoNDQUgCTZBWmBSWhleRa21fGkTdtWCJGcnCOLIac9RzZw3y95oAIsEOn5PAhkrZEvrZeuH9jYSLIsMV/IVprdHql1kEBybSUBQtptCqY9Z3tmf7579nW9vn78dpLuje259ucbr7Vuz2i9qPJ8kNdc6ZEvQ07AFtln5vIMIs+HNERYgICqrLW0JtRgj3DOyck+TxoJWtqzs59vz9gDYPUcjZAK2Wl79j4B+fV6/fGP/98+z9I8n3dO7tePn7/9Za1GZz//6Zxn1s/Pr3+gcZKcBJEA9gjRlqSxrRkNakJDQLTJgZSTVDIcGsDG9swwAxBZTkLIKS2pbdunJzlrjTwQkDAnBHuKKII26QFDObsn7rXm58wrOcujOdW3B7LF8Ri9au/nz+f9V60jWV4FeQm3G1qLHgEASKz7Zm8agIZsAIMB6D77w3noJrtnj8WM121fBACBmOta62LumYUMICA9j4xt+5oZRJsmZOMwC1seEhKaZCNr3Zp71njsGVCTpshAk5zkhDbJ0lhqdltZnmlPs1PGl5E91FRaSx6ARJKuC6X8qj6aSxIAbg4y0P2mm4DoeaCY83m3z/f7j6b3655rUZMAXiOUcwCNff9EIIHkwcszNFAsZLzkoSEBAAQgD4KGHs5ROgiDva6X5Zzs/UjGZmwJZFkh+/ScngdCgbQlOd0AMk3O7tlQrKIkpChpAklooKXowMl5cnZbAqWtPNLl0bpfYkD2cC2tdSJipEoACYYAYPDCi5yeffZJQh8IWHPbqwat8eQcErXjZS8ya36QRVISTsv7+b7mki5pyYui9WNeP9tDovvVU2ZdP36opaEAFOB5vkmSZ583SQlITRuCscV+diFSABZ47LUuS0TUZ599NjBrIYU911pz7efB47XO540AmkDBc71mDR40v/3++/Kzcz5//vH3//B/vz+f790///rXv/uP//79eZ7Pe71+0DS/3HLyNE+CSPJOt217jCkEd8QxiAVi5GtRqBnVRuMZ20mt8SyXNIcAAJDWKFa6201JHyick92CBxlbqJxkZ28EYwwIqNH68lwzM3PJl2SSBBXNzLrQtMfZOjs+2EBOSsqBINkDKlAD2Iy73/38ah6A60YmEMhGJgdo2xyhck4PFAtH66LQyMteui6tSxoKwnOj8cz4NisJqRgsDIIckrYApH16NgEtQMgzXpPEvkC0ycl5xpqxrZwHAzSdGXs8l2eMbbWRx9fCBuHFLLzAPQ/QPO0DBy20OAHkwXA+5GA3bxKKry80EuD9fO77vu+f7Ha/Aa57UCt5aJPQgEkoYM0AnFAhQxAAMk276eZslLZVk7P3G5pTyVCy7UFuTthVSRJmlhEsz7XWTUtN6DndD9kYayi0bQSkze4+1gxXBZKsiiS0QsDeT5NSFLLP5wPFArDH4xksW/scEgMFAOzlNSikAA0bCAk57YEIyKGSL5YxZx9XtiXAz97pI400gXDAxSd9//o+++N1t+R0ks/3N6DXj+ULzFo9m6BReki05jybZTz7/Y1Qs5/vffZ+6rnsSxjYSUop4NqMZiwK6e4Qzj5PzhG6f/w+r1f6nM9n2TL78+mM8emDwOBDDyCabOj98/d/+i/+9W+//+3en3/7v/yP//5//Td/9/f/4a9//PH5+Ps//fX/+Xf/x9//3d+dIHR+/bLKYhHSc3Logd0mFVHObk/bakplPF5zmYGx1mIJ5IVcC7TP8zzvZMPxkuTR1KTB67petMkzM3CRMUAhCAQAccjebb1medACAdY1HpCYa14zL83y9TVen/eDRrNe1/319TP2s//Q9n192QhCSDlIA5K+8JJMFixirRe0zy+AZez20CCD5/7JXDQ9Jz3WvbxQUbQuxtgY1FZkv//8x7PfFLxmrnM2oDE2MhJGvrQuAAuQhG8wmNBsunue9pRaSwji+1r3a66XZjWFRllzoTDIY1mamQWkAdPTRhIyAlUaSp93n0/PI42vfyZeEK0L1P1Q0GoPvnpOn1/kQz4IcKjmJc/94+ear5A87z4fec31kgpCsgxAkAGanmIjkCkANhiCLJkaL1h0c7bEaBAa2tCIy3Nhz3Ut38kBoKfHY0gSbEmQ9gCcYgAAyH7SI5vx4XnyQOUIqCjnedOKAeU80jXrZYmmCJNsajAC2M9uzj4PHGw6+7wh4PZQoZtzAADC2ThowLJRkNEkH/YmkOTsxOg6Pc9+txZtj2uvBTkcguDn11+0LsbnfK7XbUG2ZrSGs7VeUii+f9e4+0ErecCv1w/pQH39HE/Z1WhdGI+9fM67IA6k7JaeJskJextwEW1l3z9+oAXGuzOgk2c04YEzfsEBJ23fOe8+Hw6w1vX1/u7/9j//m7l//pf/7X//z//pf/77b//kx9/803/5X/w3f/O3/+I//Lv//f/9j/9h5tXUWu4sMTkPrWQKBHpykpRjd60lpk3OES6HIg8o+/QcuScn+eQ8OTvdFtYUCxnf972WkDz3/foNMD5JwB4JenoOCQFZHq2a9JQCMEuzgOaUzPW67i/i6/Vzff3uUTl2vZZ9idiSuttzvsszXthgEqF1v9a6qmqkNZphfenrd2mRECAQBDIEBJDIrNdCbsosrZf8wmYt6QLZ7u77z39QDjZNesixPWvWukFp2pJ2H3bYAIAkKLKXk9McJAglKaY9zRFCbpqcJD0Np3TNNTNpEeCcHU5OKDRJSDghbYtg0FoIZGnQAroPc5Hd88hG1n3xfJDaVsXO/qxZJFO8vub6ul8/93n6/sfuT6X0NDstXggAQQNAQFgQGjAJRGt0X8xCloceSoP88usnWjMv3194IbCkka617jScjTQznkEHZLkcVAq17htW9oPCyLMktaXl1CCoikFuT86xR2sQhZ4AskEgwBINBaExTXK8rnUthLwAZomRxEgaoGnPwSDQAtkLrao0gEJTZEmiJ+92AzOLknaN5bGGuudMzuvH1319vb+/BZLn9dv12+9NWdda934eCtcNgbXWC8C+1iLxes3M/nyv+4UNWAVsN5vQnJ7TfXpOkrMf2LSUCB9Ijc/+PPvX/fppRM77+3vWD3s9v36tNR67rLk47P1Z15WTz/v9/vzx2X8a5fP9f/7b/+lv/tm/+q//u//h67d/Bod8sv9xP59/+p/9699++8s//P3/dTjP+fX/AyE5hJmjYhZeAAAAAElFTkSuQmCC"

/***/ },
/* 62 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
		data: function data() {
			return {
				account: '',
				password: ''
			};
		},

		methods: {
			login: function login() {
				console.log('ok');
			}
		}
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "sign-container"
	  }, [_c('form', {
	    staticClass: "sign-form"
	  }, [_vm._m(0), _vm._v(" "), _c('div', {
	    staticClass: "group-con"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.account),
	      expression: "account"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "请输入账号"
	    },
	    domProps: {
	      "value": _vm._s(_vm.account)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.account = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "group-con"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.password),
	      expression: "password"
	    }],
	    attrs: {
	      "type": "password",
	      "placeholder": "请输入密码"
	    },
	    domProps: {
	      "value": _vm._s(_vm.password)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.password = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "group-con group-btn"
	  }, [_c('button', {
	    staticClass: "btn btn-certain",
	    on: {
	      "click": _vm.login
	    }
	  }, [_vm._v("确定")]), _vm._v(" "), _c('router-link', {
	    staticClass: "btn btn-cancle",
	    attrs: {
	      "to": "/"
	    }
	  }, [_vm._v("\n\t\t\t\t取消\n\t\t\t")])])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('caption', [_c('h1', [_vm._v("登录")])])
	}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3c4430ba", module.exports)
	  }
	}

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(65)

	/* script */
	__vue_exports__ = __webpack_require__(69)

	/* template */
	var __vue_template__ = __webpack_require__(70)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\code\\teaching-activities\\design\\src\\pages\\edit.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-352e9b22", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-352e9b22", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] edit.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(66);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(38)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-352e9b22!./../../node_modules/stylus-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-352e9b22!./../../node_modules/stylus-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports
	exports.i(__webpack_require__(67), "");

	// module
	exports.push([module.id, "\n.form-contain {\n  min-height: 100vh;\n  padding-top: 95px;\n  padding-bottom: 50px;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  -o-box-sizing: border-box;\n  box-sizing: border-box;\n  background: url(" + __webpack_require__(68) + ") 0 0 no-repeat;\n  background-size: cover;\n  text-align: center;\n}\n.edit-form {\n  display: inline-block;\n  padding: 0;\n  margin: auto;\n  text-align: left;\n}\n.edit-form label {\n  display: inline-block;\n  width: 90px;\n  text-align: left;\n  vertical-align: top;\n}\n.edit-form .btn-post {\n  width: 55%;\n}\n.edit-form .btn-edit {\n  margin-left: 25px;\n}\n.edit-form .simditor {\n  -webkit-border-radius: 10px;\n  -moz-border-radius: 10px;\n  border-radius: 10px;\n  overflow: hidden;\n}\n.group-left input,\n.select,\n.textarea-box {\n  width: 90%;\n  height: 36px;\n  padding: 10px 10px;\n  border: none;\n  outline: none;\n  background: #fff;\n  -webkit-box-shadow: inset 1px 1px 5px 2px rgba(0,0,0,0.5);\n  -moz-box-shadow: inset 1px 1px 5px 2px rgba(0,0,0,0.5);\n  -ms-box-shadow: inset 1px 1px 5px 2px rgba(0,0,0,0.5);\n  -o-box-shadow: inset 1px 1px 5px 2px rgba(0,0,0,0.5);\n  box-shadow: inset 1px 1px 5px 2px rgba(0,0,0,0.5);\n  font-size: 14px;\n  -webkit-border-radius: 15px;\n  -moz-border-radius: 15px;\n  border-radius: 15px;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  -o-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.group-left input::-webkit-input-placeholder,\n.select::-webkit-input-placeholder,\n.textarea-box::-webkit-input-placeholder {\n  color: rgba(0,0,0,0.6);\n}\n.select {\n  position: relative;\n  ((null)): 0;\n  ((null)): 0;\n  display: inline-block;\n  color: rgba(0,0,0,0.6);\n  text-align: left;\n  cursor: pointer;\n}\n.select .arrow {\n  position: absolute;\n  top: 15px;\n  right: 8px;\n  border: 8px solid transparent;\n  border-top-color: rgba(0,0,0,0.6);\n}\n.select span {\n  display: block;\n}\n.option-box {\n  position: absolute;\n  top: 36px;\n  left: 0;\n  width: 100%;\n  padding: 8px 0px;\n  padding-right: 6px;\n  -webkit-box-shadow: inset 1px 1px 5px 2px rgba(0,0,0,0.5);\n  -moz-box-shadow: inset 1px 1px 5px 2px rgba(0,0,0,0.5);\n  -ms-box-shadow: inset 1px 1px 5px 2px rgba(0,0,0,0.5);\n  -o-box-shadow: inset 1px 1px 5px 2px rgba(0,0,0,0.5);\n  box-shadow: inset 1px 1px 5px 2px rgba(0,0,0,0.5);\n  -webkit-border-radius: 12px;\n  -moz-border-radius: 12px;\n  border-radius: 12px;\n  background: #f7ae9d;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  -o-box-sizing: border-box;\n  box-sizing: border-box;\n  z-index: 2;\n}\n.option {\n  max-height: 110px;\n  overflow-y: auto;\n}\n.option::-webkit-scrollbar {\n  width: 8px;\n  margin: 10px;\n  -webkit-border-radius: 8px;\n  -moz-border-radius: 8px;\n  border-radius: 8px;\n}\n.option::-webkit-scrollbar-thumb {\n  -webkit-border-radius: 8px;\n  -moz-border-radius: 8px;\n  border-radius: 8px;\n  background: #bd1010;\n}\n.option p {\n  padding: 3px 15px;\n  cursor: pointer;\n}\n.option p:hover {\n  color: #fff;\n}\n.group-cover {\n  position: relative;\n  ((null)): 0;\n  ((null)): 0;\n}\n.group-cover input[type='file'] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 90%;\n  height: 120px;\n  opacity: 0;\n  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);\n  cursor: pointer;\n}\n.group-cover img {\n  width: 90%;\n  height: 120px;\n  vertical-align: top;\n}\n.group-content textarea {\n  width: 100%;\n  height: 100%;\n  padding: 10px;\n  border: none;\n  outline: none;\n  font-size: 14px;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  -o-box-sizing: border-box;\n  box-sizing: border-box;\n  background: transparent;\n  resize: none;\n}\n.group-content textarea::-webkit-scrollbar {\n  width: 8px;\n  margin: 10px;\n  -webkit-border-radius: 8px;\n  -moz-border-radius: 8px;\n  border-radius: 8px;\n}\n.group-content textarea::-webkit-scrollbar-thumb {\n  -webkit-border-radius: 8px;\n  -moz-border-radius: 8px;\n  border-radius: 8px;\n  background: #bd1010;\n}\n.group-content textarea::-webkit-input-placeholder {\n  color: rgba(0,0,0,0.6);\n}\n.group-content .textarea-box {\n  display: inline-block;\n  width: 95%;\n  height: 445px;\n  padding: 0;\n  text-align: left;\n  vertical-align: top;\n}\n.group-edit {\n  position: relative;\n  ((null)): 0;\n  ((null)): 0;\n}\n.group-edit input[type='file'] {\n  position: absolute;\n  top: 0;\n  left: 25px;\n  width: 74px;\n  height: 36px;\n  opacity: 0;\n  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);\n  cursor: pointer;\n}\n.group-edit .btn-edit {\n  display: inline-block;\n  margin: 0;\n}\n.file-list {\n  display: inline-block;\n  width: 400px;\n  margin: 0 15px 5px;\n  font-size: 20px;\n  line-height: 36px;\n  vertical-align: top;\n}\n.group-left,\n.group-right {\n  display: inline-block;\n  width: 300px;\n  padding: 0 30px;\n  margin-bottom: 60px;\n  vertical-align: top;\n  text-align: right;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  -o-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.group-right {\n  width: 700px;\n  padding: 0 15px;\n  text-align: left;\n}\n", ""]);

	// exports


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "@font-face {\r\n  font-family: 'Simditor';\r\n  src: url(data:application/font-woff;charset=utf-8;base64,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) format(\"woff\");\r\n  font-weight: normal;\r\n  font-style: normal;\r\n}\r\n.simditor-icon {\r\n  display: inline-block;\r\n  font: normal normal normal 14px/1 'Simditor';\r\n  font-size: inherit;\r\n  text-rendering: auto;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n  transform: translate(0, 0);\r\n}\r\n\r\n.simditor-icon-code:before {\r\n  content: '\\F000';\r\n}\r\n\r\n.simditor-icon-bold:before {\r\n  content: '\\F001';\r\n}\r\n\r\n.simditor-icon-italic:before {\r\n  content: '\\F002';\r\n}\r\n\r\n.simditor-icon-underline:before {\r\n  content: '\\F003';\r\n}\r\n\r\n.simditor-icon-times:before {\r\n  content: '\\F004';\r\n}\r\n\r\n.simditor-icon-strikethrough:before {\r\n  content: '\\F005';\r\n}\r\n\r\n.simditor-icon-list-ol:before {\r\n  content: '\\F006';\r\n}\r\n\r\n.simditor-icon-list-ul:before {\r\n  content: '\\F007';\r\n}\r\n\r\n.simditor-icon-quote-left:before {\r\n  content: '\\F008';\r\n}\r\n\r\n.simditor-icon-table:before {\r\n  content: '\\F009';\r\n}\r\n\r\n.simditor-icon-link:before {\r\n  content: '\\F00A';\r\n}\r\n\r\n.simditor-icon-picture-o:before {\r\n  content: '\\F00B';\r\n}\r\n\r\n.simditor-icon-minus:before {\r\n  content: '\\F00C';\r\n}\r\n\r\n.simditor-icon-indent:before {\r\n  content: '\\F00D';\r\n}\r\n\r\n.simditor-icon-outdent:before {\r\n  content: '\\F00E';\r\n}\r\n\r\n.simditor-icon-unlink:before {\r\n  content: '\\F00F';\r\n}\r\n\r\n.simditor-icon-caret-down:before {\r\n  content: '\\F010';\r\n}\r\n\r\n.simditor-icon-caret-right:before {\r\n  content: '\\F011';\r\n}\r\n\r\n.simditor-icon-upload:before {\r\n  content: '\\F012';\r\n}\r\n\r\n.simditor-icon-undo:before {\r\n  content: '\\F013';\r\n}\r\n\r\n.simditor-icon-smile-o:before {\r\n  content: '\\F014';\r\n}\r\n\r\n.simditor-icon-tint:before {\r\n  content: '\\F015';\r\n}\r\n\r\n.simditor-icon-font:before {\r\n  content: '\\F016';\r\n}\r\n\r\n.simditor-icon-html5:before {\r\n  content: '\\F017';\r\n}\r\n\r\n.simditor-icon-mark:before {\r\n  content: '\\F018';\r\n}\r\n\r\n.simditor-icon-align-center:before {\r\n  content: '\\F019';\r\n}\r\n\r\n.simditor-icon-align-left:before {\r\n  content: '\\F01A';\r\n}\r\n\r\n.simditor-icon-align-right:before {\r\n  content: '\\F01B';\r\n}\r\n\r\n.simditor-icon-font-minus:before {\r\n  content: '\\F01C';\r\n}\r\n\r\n.simditor-icon-markdown:before {\r\n  content: '\\F01D';\r\n}\r\n\r\n.simditor-icon-checklist:before {\r\n  content: '\\F01E';\r\n}\r\n\r\n.simditor {\r\n  position: relative;\r\n  border: 1px solid #c9d8db;\r\n}\r\n.simditor .simditor-wrapper {\r\n  position: relative;\r\n  background: #ffffff;\r\n}\r\n.simditor .simditor-wrapper > textarea {\r\n  display: none !important;\r\n  width: 100%;\r\n  box-sizing: border-box;\r\n  font-family: monaco;\r\n  font-size: 16px;\r\n  line-height: 1.6;\r\n  border: none;\r\n  padding: 22px 15px 40px;\r\n  min-height: 300px;\r\n  outline: none;\r\n  background: transparent;\r\n  resize: none;\r\n}\r\n.simditor .simditor-wrapper .simditor-placeholder {\r\n  display: none;\r\n  position: absolute;\r\n  left: 0;\r\n  z-index: 0;\r\n  padding: 22px 15px;\r\n  font-size: 16px;\r\n  font-family: arial, sans-serif;\r\n  line-height: 1.5;\r\n  color: #999999;\r\n  background: transparent;\r\n}\r\n.simditor .simditor-wrapper.toolbar-floating .simditor-toolbar {\r\n  position: fixed;\r\n  top: 0;\r\n  z-index: 10;\r\n  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);\r\n}\r\n.simditor .simditor-wrapper .simditor-image-loading {\r\n  width: 100%;\r\n  height: 100%;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: 2;\r\n}\r\n.simditor .simditor-wrapper .simditor-image-loading .progress {\r\n  width: 100%;\r\n  height: 100%;\r\n  background: rgba(0, 0, 0, 0.4);\r\n  position: absolute;\r\n  bottom: 0;\r\n  left: 0;\r\n}\r\n.simditor .simditor-body {\r\n  padding: 22px 15px 40px;\r\n  min-height: 300px;\r\n  outline: none;\r\n  cursor: text;\r\n  position: relative;\r\n  z-index: 1;\r\n  background: transparent;\r\n}\r\n.simditor .simditor-body a.selected {\r\n  background: #b3d4fd;\r\n}\r\n.simditor .simditor-body a.simditor-mention {\r\n  cursor: pointer;\r\n}\r\n.simditor .simditor-body .simditor-table {\r\n  position: relative;\r\n}\r\n.simditor .simditor-body .simditor-table.resizing {\r\n  cursor: col-resize;\r\n}\r\n.simditor .simditor-body .simditor-table .simditor-resize-handle {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 10px;\r\n  height: 100%;\r\n  cursor: col-resize;\r\n}\r\n.simditor .simditor-body pre {\r\n  /*min-height: 28px;*/\r\n  box-sizing: border-box;\r\n  -moz-box-sizing: border-box;\r\n  word-wrap: break-word !important;\r\n  white-space: pre-wrap !important;\r\n}\r\n.simditor .simditor-body img {\r\n  cursor: pointer;\r\n}\r\n.simditor .simditor-body img.selected {\r\n  box-shadow: 0 0 0 4px #cccccc;\r\n}\r\n.simditor .simditor-paste-bin {\r\n  position: fixed;\r\n  bottom: 10px;\r\n  right: 10px;\r\n  width: 1px;\r\n  height: 20px;\r\n  font-size: 1px;\r\n  line-height: 1px;\r\n  overflow: hidden;\r\n  padding: 0;\r\n  margin: 0;\r\n  opacity: 0;\r\n  -webkit-user-select: text;\r\n}\r\n.simditor .simditor-toolbar {\r\n  border-bottom: 1px solid #eeeeee;\r\n  background: #ffffff;\r\n  width: 100%;\r\n}\r\n.simditor .simditor-toolbar > ul {\r\n  margin: 0;\r\n  padding: 0 0 0 6px;\r\n  list-style: none;\r\n}\r\n.simditor .simditor-toolbar > ul > li {\r\n  position: relative;\r\n  display: inline-block;\r\n  font-size: 0;\r\n}\r\n.simditor .simditor-toolbar > ul > li > span.separator {\r\n  display: inline-block;\r\n  background: #cfcfcf;\r\n  width: 1px;\r\n  height: 18px;\r\n  margin: 11px 15px;\r\n  vertical-align: middle;\r\n}\r\n.simditor .simditor-toolbar > ul > li > .toolbar-item {\r\n  display: inline-block;\r\n  width: 46px;\r\n  height: 40px;\r\n  outline: none;\r\n  color: #333333;\r\n  font-size: 15px;\r\n  line-height: 40px;\r\n  vertical-align: middle;\r\n  text-align: center;\r\n  text-decoration: none;\r\n}\r\n.simditor .simditor-toolbar > ul > li > .toolbar-item span {\r\n  opacity: 0.6;\r\n}\r\n.simditor .simditor-toolbar > ul > li > .toolbar-item span.simditor-icon {\r\n  display: inline;\r\n  line-height: normal;\r\n}\r\n.simditor .simditor-toolbar > ul > li > .toolbar-item:hover span {\r\n  opacity: 1;\r\n}\r\n.simditor .simditor-toolbar > ul > li > .toolbar-item.active {\r\n  background: #eeeeee;\r\n}\r\n.simditor .simditor-toolbar > ul > li > .toolbar-item.active span {\r\n  opacity: 1;\r\n}\r\n.simditor .simditor-toolbar > ul > li > .toolbar-item.disabled {\r\n  cursor: default;\r\n}\r\n.simditor .simditor-toolbar > ul > li > .toolbar-item.disabled span {\r\n  opacity: 0.3;\r\n}\r\n.simditor .simditor-toolbar > ul > li > .toolbar-item.toolbar-item-title span:before {\r\n  content: \"H\";\r\n  font-size: 19px;\r\n  font-weight: bold;\r\n  font-family: 'Times New Roman';\r\n}\r\n.simditor .simditor-toolbar > ul > li > .toolbar-item.toolbar-item-title.active-h1 span:before {\r\n  content: 'H1';\r\n  font-size: 18px;\r\n}\r\n.simditor .simditor-toolbar > ul > li > .toolbar-item.toolbar-item-title.active-h2 span:before {\r\n  content: 'H2';\r\n  font-size: 18px;\r\n}\r\n.simditor .simditor-toolbar > ul > li > .toolbar-item.toolbar-item-title.active-h3 span:before {\r\n  content: 'H3';\r\n  font-size: 18px;\r\n}\r\n.simditor .simditor-toolbar > ul > li > .toolbar-item.toolbar-item-image {\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.simditor .simditor-toolbar > ul > li > .toolbar-item.toolbar-item-image > input[type=file] {\r\n  position: absolute;\r\n  right: 0px;\r\n  top: 0px;\r\n  opacity: 0;\r\n  font-size: 100px;\r\n  cursor: pointer;\r\n}\r\n.simditor .simditor-toolbar > ul > li.menu-on .toolbar-item {\r\n  position: relative;\r\n  z-index: 20;\r\n  background: #ffffff;\r\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);\r\n}\r\n.simditor .simditor-toolbar > ul > li.menu-on .toolbar-item span {\r\n  opacity: 1;\r\n}\r\n.simditor .simditor-toolbar > ul > li.menu-on .toolbar-menu {\r\n  display: block;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu {\r\n  display: none;\r\n  position: absolute;\r\n  top: 40px;\r\n  left: 0;\r\n  z-index: 21;\r\n  background: #ffffff;\r\n  text-align: left;\r\n  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu:before {\r\n  content: '';\r\n  display: block;\r\n  width: 46px;\r\n  height: 4px;\r\n  background: #ffffff;\r\n  position: absolute;\r\n  top: -3px;\r\n  left: 0;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu ul {\r\n  min-width: 160px;\r\n  list-style: none;\r\n  margin: 0;\r\n  padding: 10px 1px;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu ul > li .menu-item {\r\n  display: block;\r\n  font-size: 16px;\r\n  line-height: 2em;\r\n  padding: 0 10px;\r\n  text-decoration: none;\r\n  color: #666666;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu ul > li .menu-item:hover {\r\n  background: #f6f6f6;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu ul > li .menu-item.menu-item-h1 {\r\n  font-size: 24px;\r\n  color: #333333;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu ul > li .menu-item.menu-item-h2 {\r\n  font-size: 22px;\r\n  color: #333333;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu ul > li .menu-item.menu-item-h3 {\r\n  font-size: 20px;\r\n  color: #333333;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu ul > li .menu-item.menu-item-h4 {\r\n  font-size: 18px;\r\n  color: #333333;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu ul > li .menu-item.menu-item-h5 {\r\n  font-size: 16px;\r\n  color: #333333;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu ul > li .separator {\r\n  display: block;\r\n  border-top: 1px solid #cccccc;\r\n  height: 0;\r\n  line-height: 0;\r\n  font-size: 0;\r\n  margin: 6px 0;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-color {\r\n  width: 96px;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-color .color-list {\r\n  height: 40px;\r\n  margin: 10px 6px 6px 10px;\r\n  padding: 0;\r\n  min-width: 0;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-color .color-list li {\r\n  float: left;\r\n  margin: 0 4px 4px 0;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-color .color-list li .font-color {\r\n  display: block;\r\n  width: 16px;\r\n  height: 16px;\r\n  background: #dfdfdf;\r\n  border-radius: 2px;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-color .color-list li .font-color:hover {\r\n  opacity: 0.8;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-color .color-list li .font-color.font-color-default {\r\n  background: #333333;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-color .color-list li .font-color-1 {\r\n  background: #E33737;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-color .color-list li .font-color-2 {\r\n  background: #e28b41;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-color .color-list li .font-color-3 {\r\n  background: #c8a732;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-color .color-list li .font-color-4 {\r\n  background: #209361;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-color .color-list li .font-color-5 {\r\n  background: #418caf;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-color .color-list li .font-color-6 {\r\n  background: #aa8773;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-color .color-list li .font-color-7 {\r\n  background: #999999;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-table .menu-create-table {\r\n  background: #ffffff;\r\n  padding: 1px;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-table .menu-create-table table {\r\n  border: none;\r\n  border-collapse: collapse;\r\n  border-spacing: 0;\r\n  table-layout: fixed;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-table .menu-create-table table td {\r\n  padding: 0;\r\n  cursor: pointer;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-table .menu-create-table table td:before {\r\n  width: 16px;\r\n  height: 16px;\r\n  border: 1px solid #ffffff;\r\n  background: #f3f3f3;\r\n  display: block;\r\n  content: \"\";\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-table .menu-create-table table td.selected:before {\r\n  background: #cfcfcf;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-table .menu-edit-table {\r\n  display: none;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-table .menu-edit-table ul li {\r\n  white-space: nowrap;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-image .menu-item-upload-image {\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-image .menu-item-upload-image input[type=file] {\r\n  position: absolute;\r\n  right: 0px;\r\n  top: 0px;\r\n  opacity: 0;\r\n  font-size: 100px;\r\n  cursor: pointer;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-alignment {\r\n  width: 100%;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-alignment ul {\r\n  min-width: 100%;\r\n}\r\n.simditor .simditor-toolbar .toolbar-menu.toolbar-menu-alignment .menu-item {\r\n  text-align: center;\r\n}\r\n.simditor .simditor-popover {\r\n  display: none;\r\n  padding: 5px 8px 0;\r\n  background: #ffffff;\r\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);\r\n  border-radius: 2px;\r\n  position: absolute;\r\n  z-index: 2;\r\n}\r\n.simditor .simditor-popover .settings-field {\r\n  margin: 0 0 5px 0;\r\n  font-size: 12px;\r\n  height: 25px;\r\n  line-height: 25px;\r\n}\r\n.simditor .simditor-popover .settings-field label {\r\n  display: inline-block;\r\n  margin: 0 5px 0 0;\r\n}\r\n.simditor .simditor-popover .settings-field input[type=text] {\r\n  display: inline-block;\r\n  width: 200px;\r\n  box-sizing: border-box;\r\n  font-size: 12px;\r\n}\r\n.simditor .simditor-popover .settings-field input[type=text].image-size {\r\n  width: 83px;\r\n}\r\n.simditor .simditor-popover .settings-field .times {\r\n  display: inline-block;\r\n  width: 26px;\r\n  font-size: 12px;\r\n  text-align: center;\r\n}\r\n.simditor .simditor-popover.link-popover .btn-unlink, .simditor .simditor-popover.image-popover .btn-upload, .simditor .simditor-popover.image-popover .btn-restore {\r\n  display: inline-block;\r\n  margin: 0 0 0 5px;\r\n  color: #333333;\r\n  font-size: 14px;\r\n  outline: 0;\r\n}\r\n.simditor .simditor-popover.link-popover .btn-unlink span, .simditor .simditor-popover.image-popover .btn-upload span, .simditor .simditor-popover.image-popover .btn-restore span {\r\n  opacity: 0.6;\r\n}\r\n.simditor .simditor-popover.link-popover .btn-unlink:hover span, .simditor .simditor-popover.image-popover .btn-upload:hover span, .simditor .simditor-popover.image-popover .btn-restore:hover span {\r\n  opacity: 1;\r\n}\r\n.simditor .simditor-popover.image-popover .btn-upload {\r\n  position: relative;\r\n  display: inline-block;\r\n  overflow: hidden;\r\n  vertical-align: middle;\r\n}\r\n.simditor .simditor-popover.image-popover .btn-upload input[type=file] {\r\n  position: absolute;\r\n  right: 0px;\r\n  top: 0px;\r\n  opacity: 0;\r\n  height: 100%;\r\n  width: 28px;\r\n}\r\n.simditor.simditor-mobile .simditor-wrapper.toolbar-floating .simditor-toolbar {\r\n  position: absolute;\r\n  top: 0;\r\n  z-index: 10;\r\n  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.simditor .simditor-body, .editor-style {\r\n  font-size: 16px;\r\n  font-family: arial, sans-serif;\r\n  line-height: 1.6;\r\n  color: #333;\r\n  outline: none;\r\n  word-wrap: break-word;\r\n}\r\n.simditor .simditor-body > :first-child, .editor-style > :first-child {\r\n  margin-top: 0 !important;\r\n}\r\n.simditor .simditor-body a, .editor-style a {\r\n  color: #4298BA;\r\n  text-decoration: none;\r\n  word-break: break-all;\r\n}\r\n.simditor .simditor-body a:visited, .editor-style a:visited {\r\n  color: #4298BA;\r\n}\r\n.simditor .simditor-body a:hover, .editor-style a:hover {\r\n  color: #0F769F;\r\n}\r\n.simditor .simditor-body a:active, .editor-style a:active {\r\n  color: #9E792E;\r\n}\r\n.simditor .simditor-body a:hover, .simditor .simditor-body a:active, .editor-style a:hover, .editor-style a:active {\r\n  outline: 0;\r\n}\r\n.simditor .simditor-body h1, .simditor .simditor-body h2, .simditor .simditor-body h3, .simditor .simditor-body h4, .simditor .simditor-body h5, .simditor .simditor-body h6, .editor-style h1, .editor-style h2, .editor-style h3, .editor-style h4, .editor-style h5, .editor-style h6 {\r\n  font-weight: normal;\r\n  margin: 40px 0 20px;\r\n  color: #000000;\r\n}\r\n.simditor .simditor-body h1, .editor-style h1 {\r\n  font-size: 24px;\r\n}\r\n.simditor .simditor-body h2, .editor-style h2 {\r\n  font-size: 22px;\r\n}\r\n.simditor .simditor-body h3, .editor-style h3 {\r\n  font-size: 20px;\r\n}\r\n.simditor .simditor-body h4, .editor-style h4 {\r\n  font-size: 18px;\r\n}\r\n.simditor .simditor-body h5, .editor-style h5 {\r\n  font-size: 16px;\r\n}\r\n.simditor .simditor-body h6, .editor-style h6 {\r\n  font-size: 16px;\r\n}\r\n.simditor .simditor-body p, .simditor .simditor-body div, .editor-style p, .editor-style div {\r\n  word-wrap: break-word;\r\n  margin: 0 0 15px 0;\r\n  color: #333;\r\n  word-wrap: break-word;\r\n}\r\n.simditor .simditor-body b, .simditor .simditor-body strong, .editor-style b, .editor-style strong {\r\n  font-weight: bold;\r\n}\r\n.simditor .simditor-body i, .simditor .simditor-body em, .editor-style i, .editor-style em {\r\n  font-style: italic;\r\n}\r\n.simditor .simditor-body u, .editor-style u {\r\n  text-decoration: underline;\r\n}\r\n.simditor .simditor-body strike, .simditor .simditor-body del, .editor-style strike, .editor-style del {\r\n  text-decoration: line-through;\r\n}\r\n.simditor .simditor-body ul, .simditor .simditor-body ol, .editor-style ul, .editor-style ol {\r\n  list-style: disc outside none;\r\n  margin: 15px 0;\r\n  padding: 0 0 0 40px;\r\n  line-height: 1.6;\r\n}\r\n.simditor .simditor-body ul ul, .simditor .simditor-body ul ol, .simditor .simditor-body ol ul, .simditor .simditor-body ol ol, .editor-style ul ul, .editor-style ul ol, .editor-style ol ul, .editor-style ol ol {\r\n  padding-left: 30px;\r\n}\r\n.simditor .simditor-body ul ul, .simditor .simditor-body ol ul, .editor-style ul ul, .editor-style ol ul {\r\n  list-style: circle outside none;\r\n}\r\n.simditor .simditor-body ul ul ul, .simditor .simditor-body ol ul ul, .editor-style ul ul ul, .editor-style ol ul ul {\r\n  list-style: square outside none;\r\n}\r\n.simditor .simditor-body ol, .editor-style ol {\r\n  list-style: decimal;\r\n}\r\n.simditor .simditor-body blockquote, .editor-style blockquote {\r\n  border-left: 6px solid #ddd;\r\n  padding: 5px 0 5px 10px;\r\n  margin: 15px 0 15px 15px;\r\n}\r\n.simditor .simditor-body blockquote > :first-child, .editor-style blockquote > :first-child {\r\n  margin-top: 0;\r\n}\r\n.simditor .simditor-body code, .editor-style code {\r\n  display: inline-block;\r\n  padding: 0 4px;\r\n  margin: 0 5px;\r\n  background: #eeeeee;\r\n  border-radius: 3px;\r\n  font-size: 13px;\r\n  font-family: 'monaco', 'Consolas', \"Liberation Mono\", Courier, monospace;\r\n}\r\n.simditor .simditor-body pre, .editor-style pre {\r\n  padding: 10px 5px 10px 10px;\r\n  margin: 15px 0;\r\n  display: block;\r\n  line-height: 18px;\r\n  background: #F0F0F0;\r\n  border-radius: 3px;\r\n  font-size: 13px;\r\n  font-family: 'monaco', 'Consolas', \"Liberation Mono\", Courier, monospace;\r\n  white-space: pre;\r\n  word-wrap: normal;\r\n  overflow-x: auto;\r\n}\r\n.simditor .simditor-body pre code, .editor-style pre code {\r\n  display: block;\r\n  padding: 0;\r\n  margin: 0;\r\n  background: none;\r\n  border-radius: 0;\r\n}\r\n.simditor .simditor-body hr, .editor-style hr {\r\n  display: block;\r\n  height: 0px;\r\n  border: 0;\r\n  border-top: 1px solid #ccc;\r\n  margin: 15px 0;\r\n  padding: 0;\r\n}\r\n.simditor .simditor-body table, .editor-style table {\r\n  width: 100%;\r\n  table-layout: fixed;\r\n  border-collapse: collapse;\r\n  border-spacing: 0;\r\n  margin: 15px 0;\r\n}\r\n.simditor .simditor-body table thead, .editor-style table thead {\r\n  background-color: #f9f9f9;\r\n}\r\n.simditor .simditor-body table td, .simditor .simditor-body table th, .editor-style table td, .editor-style table th {\r\n  min-width: 40px;\r\n  height: 30px;\r\n  border: 1px solid #ccc;\r\n  vertical-align: top;\r\n  padding: 2px 4px;\r\n  text-align: left;\r\n  box-sizing: border-box;\r\n}\r\n.simditor .simditor-body table td.active, .simditor .simditor-body table th.active, .editor-style table td.active, .editor-style table th.active {\r\n  background-color: #ffffee;\r\n}\r\n.simditor .simditor-body img, .editor-style img {\r\n  margin: 0 5px;\r\n  vertical-align: middle;\r\n}\r\n", ""]);

	// exports


/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM3RUJGREYxRTUwODExRTY5QTcyQ0E1NEZCMzc1REE2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM3RUJGREYyRTUwODExRTY5QTcyQ0E1NEZCMzc1REE2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzdFQkZERUZFNTA4MTFFNjlBNzJDQTU0RkIzNzVEQTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzdFQkZERjBFNTA4MTFFNjlBNzJDQTU0RkIzNzVEQTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCAMMApIDASIAAhEBAxEB/8QAVgABAQEBAQAAAAAAAAAAAAAAAAECAwUBAQEBAQEAAAAAAAAAAAAAAAABAgMFEAEBAQEAAAAAAAAAAAAAAAAAESEBEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAwDAQACEQMRAD8A9YUcXsEACmEFBJwigiQigBAAnBQEigAEBAAAUBJxQAnABAAAUCgAEFQAAQMUBIoAAAAIBFASEUBBUAAAAAAARQEFAQVFAABFAQVAABRFAQUBAAQUBABQACAAgKKigAAAAAKAAAAAAogAAAAAICpAFAAAAAFQBAUQIAoAIAoACAoAAACKAgoAigIKAgoCCoAAAAAACCgICqIACCoAAKIoCCoAKgCKAgoCADQBADVAAAABAUBFAAAAAQFAAAAEAFUAAQURAAAABQAAAAAAAAEAAAAAAAAAAAAAARQARQEBQQAUAARQEFARFFBFAQWIAAKgoCCgIAjQAqAKCCgAAAAAKIigAAgAAAoIoAAAACAAAAAoCLAAAAAAAECAAKAgoCCgIKAigCCgIKAgqAAAAAgoAigIAKAAAAIoCAAIoogqAACgCKAAAAAAAqoiggAAAAAACgAAAAgAAAAKAigAAAAAAICgIKAAAAAAAAQAAAAAAAAAAAgAAAgoCCxAAAQUBBUAAFEUBBQEAAABABoBQQUAIAgAAAAAACgAAACAAAAAoCKAAAAAAAgoAAAAAAAAAoAACCKCgAAAAAAACKCIgoogqCgAAAAAIKAgsQBFAQUBAAABSBgDKgKBAAFBFABFAAAEUAAAAEAAAUEigAAAAACiIKAAAAAAACgACAAAAAAAAAAAAIAAAAAAAAAAigAACCiqgqAAAQgAgqAAAIoCCgMgDQCggoAAAAACggoAAIAAIoARQEFAQUERQAAAAABQRQQAAAAAAAURAUEABUAAAAFBBUAFAQVAAAAAAABUAAAABBQEFFVIKgCKAgoCAAgA0AAAAAAqKgKAIAAAoIKAAIACgAIAIAoCAACgAAAAAAAACgIAAgogigAAAAABVAFBBUAAAAAAgCKAgoCCoAABAAAAEUAAFQAAAGQFaBUAUAABAAAIoIKAAIACoAQAFQQVAURQRQAAAAABUEBVRBRAAAAAAAAAAAAAAABQQUBBQEFAQUBBUBUAAAAAAABFAQUUQAAAAACACsgK0ACAAAKCQUQAABFVAAAFQRQAAARQAAAAABABQRUUQAAAAAAAAFAQUBIsAAAAAAAAAQAFABAAAAANBQABFAQUBIaqAAAAAJFAQUUQUBgBWgABUVAAAAUAIIAqCKACKAigAAAAAAgCggAAAAAAAAKAAAAAACAAAAAKgkFAQUAAAABBQBFAQUBBQEFRQAAAFAAAAQUBAgAAAEAYBVaRQAAAAABQRRBFQAUAAAACIAAAoIAAAAAAAACgIKAAIgAAAAKAiiAqCggoCKAAAAQgAAAAAAAAAAAAAAAAIKAgoCAKAQAAAAFYAVoAAAAFQAAQFAAABRAEAAUAAAAQAAAAFAAEAAQAAAAABUFBBQAAABAAAAECgCggKIAogCiAKIAqKAIKCQUUQVBQAAAAABAAFASAAwA02QVAVAEBQAAAgICgCAoAAAAAAhBUBUFBFAABAAAAAFBEUARQQAAAAAAIAAKCAAAAAAAAAAAAAAAAAAIoAgoAACAoIAKAAAKIKA5gNNgAgoAAIAAAACgAAAAIAoAIAoIAAAAAAAAiiCCgAAAAAAAqKAIogACAAACgAAAAQECEAAAAFBAFAAACAAAAAAAIoCCoAAAADCCttgCAAAAAqKAAAAAEBAVABRAAAAAAAVBABREUAAAAUEFARQQABAAAAAFBBQEUAAAEUAAAAAAAABFAAAAAEFASCgIAAAAAAACCgOYDbYBAAAAAFAAAQAQAAFAAAAIAAAAIgKAAACoACgAIAAgAACggoAAAAAAAAAAAAgAAAAAAAAAAAKAAAAAACACgAIqACoAADmA22KIAKAigAAIAIAKAAAAAAAAgKAgAAKgKAgiwAABAAAFAAAAQAAAAAAAAABAAAAAAUAEAAAAAAAAAAAAABQAAAAAAEBRAGAHRsAQAAABAABQAAAAAAQAUAAQBQRUVBBQQAAAABQBFAAQAAAAABAAAAAAAAAAAUBBYQEFAQUgIEUEFQAAUAAAAAAAAAAAAAAABzgDbYAACgigIigAAgAAAAKAgAAAgKAEAEAAAAAVBFAAAAAAAQAAAAAAFARQAAAAQAAAAAAAAAAAAAAIkUBIKAgoCAKAAAAAAoADmA22AoAAgAgAAAAAAKAgAAAgKAgAAAAAAKIAAAAAAAAgAAKAigAAAAAAAAgACAAAAAAAAAAoBBAIAAAACgAAgCiAKgAAAQUByVB0dFEVEAAAAFQAUBAAABABQABAAAVAVBUAAAAAAQFARQBFAABAAUAEAAQAFABAUBBQEFAQUBBQEUEAAAAAEAAAAAAUABUhFATRQEFAQAHMFbbAAAAAAUAQAAAAAQFAQAAFQFRRAAAAABREUQFAAAAAAARAVAAUEFABFQAAAAAAAAAAAAAAAAQUBBQEFQAFBBUAAAAAAFAAAAcwHRsAAAAVFQAFQAQAAFAQABUBBQAAAAURFAAAABAAUAEAAQBQAEAAAAAAAAAAAAAAAAAAAAAAAAAAANABFBBUAAAAAAAAAAFcwHRsAABQAEQAAFAABAAFQVBFAAAAFEAARQAAAAQABAAAFBFBAAAAAAAAAAABQQAAAAAAAAAAAAAAAABAABBQEFRQAAAQANUAAcwHR0AUABEAABQRFAAAAUQRQAAAFBARQAAAAAEQAAVFAAAAQAAAAAAAAAABQEFAAAAAAEBFAQUBAAAAAAAAAAEUBAABQEFAQAAAHMFdHQAVABAVABQEAEUBREBQABBQAQUAAABEBUAABUUAAAAQAABUBUAQFQFQAUQBUABQAAQAQFRQEUAAQFEBVEAVAABQQAAAAAAAABAAAABzAdWwAAABQEAEUBREBRAABQAEUAAABEFAARQAAAAAEAAFQBAAAFBFABFQAFBBQEFEEFAAARQAAABAVABUACAoIABoCKAAAAAACKAACCgOYDq2AAKAACIAoAgCgCCgAgAAoACIKACKAAAAAAIgAAKgAoAAAAAABAAAAAEAAAAAAAAABAAUEBAAAAAAAAAAFAAAAAAAABAGAHVsVFAARAAFRQAAQABQQAFAARBQAAAAAAAUEQBAAUAAARQAAAAAAABABAAAAAAAAFAECAAAAgqAAACoABAAAAAAEAAUAAABBQHNUiuzYAiAKCKgCgCAACoAAoAAgAgAoAAAAACIAAAAKigAAAAACAAAAAAACAAAAAAAAAAigAAAAACKAgAAAAAACAAAAACAogCiAMgOzYAgKAIoCAAAKCAAKCIAAKigBQAAQAAAQAAAAFAQAARQAAAFBBRAABAAAAAAAAAAAEBFARRAUQBUAAAUAAVFQEVAAAAAAAQAAAGQHVtUAFAEAAAAAAFAQAQAAAFQUEAAAFBAEAAQUAAQFAARQCAAogAAgAAAAAAAABAABAAAAAABBUAAAAAAFAEAAAAAAAAAEFAAZAdmgURAAARQAAAUQAAABUVBBUVAAAAAAAAEAVAEUAAAAAAAAAAAURAAAAURUABQQBAAAAAAAAABAAAAVARUFAAAAAAEAAAAAAAGRR1aRQAAAAAAEUAAAAABUVEAAAAABBUUEVFBBRAAAAAAEAAAUBFQFAQEVAAAAEABVAEAAAAAAARQQBABQAAEAAAUAAQAAAAAAAAAZUHVoAAAEAAFAAAAAQBUAEBQAABAAAAAUQABAAUAEAAFQBRAFEAUQQVAAAAAQAAAAAAAAABQBBAFFAQAAQAAAUABBUAAAAAAAABAHZoARAUBFAAAAAQABQEAAAAQAUAEBUAFRUQAAAAAAAAAAAAAAAQAAFRQQVEAAAAAAAAAAUAQQAAAFQAABQAAEAAAAAAAAAAFQB2BUVAAAAAAEAAAAABBQAAAAQAAFEEUBAEUAAAAAAAAAAAVEAAAABUAVAQAAAAAAEUFAEBFToAAAAAAAAAAogAAAAAAAAAACoA7AoIAICgCAAAAAAAAioKAAgAAKiiCKAgqAKioAAAAAAAAAAioqIoAAAAAgAAAAAAAgKAAgIoAAAAAAAACCqgAAAAAAAACggAAAA7AKggCoAigAAAAACCooAAAAgAgKgAqKAioAoICKgKAAAIAAAAAAAIAAoAAAgAAgKCAoAIgACgAAgCgAAgoAACAAAogKogAAAAAAAqDsAoIIoCKCAAIAAAACoAoAACACCoqAcVFARQARUBFAAAABAEBRFAAAAQEAUBQAEBFAAQBUAVAFAEBAAVFAEAABQAEBQQAAAUAABAUQAABRUdkFEBQAABABAAAVABUUAAQAAAQAAUAQAAAQAAAAABRFQQUAAAARAAFUBAAABAAAAAAQFRURQFBAAABQABAAAAAFOgACAKgAAAAA0IrsggoAAgAAAgUAAAQAABQAAAEAAFQBCgAoAAAIqCCiAKgAoAAAACCCoKoigAIIAAAAACKCKgCgUAARAFBRAAAAAFEABUAAAAQFEUVBQGkB2YFAAAAABUAABABAAAVFAAAAEAEAAAAFEAUBBAAAAAAAAUBAEAABRUAVAQAAABQAAEAAASgAAiqioAAACCgAAAAAAgKAAAACANqDswAAAAAAACCooAIgAoAAgICqAIAAAIAAAAKiogAAAAAAAAAIAAoAAAAAAiogKgKoIAAAgAACgCAAACCgAAAAgAqAoCAogAAKomgOiUHdzFRUAAQAAABRAFEAURURFAAAAAABAAAAAABUVEAAAAAAAAABAAFAAAAEVEAAUAAAAQAABQBABAABQBQBEFQAABQEAAUCgKAiCiAOioru5gAgAAAgAAAAACAAKgIAAKACCgACAAAAAAgAAAAAAAAAIAiigAACAgCgAAACAAAKAIAIAAKAKAIAAgACggoACgAIAAAKAA6gjs4qAAAAAAAgACCoAAAAIAAKIoIAAqCCiAKAAAAAgACiAIoAAIigKCKgCoAACKAaAhpoAGigAAIAGmigACAgqB2gACiAoACgIAAAAKBoAIA//9k="

/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var editor = void 0;
	exports.default = {
		data: function data() {
			return {
				title: '',
				aim: '',
				time: '',
				place: '',
				selectOption: '请选择举办单位',
				optionShow: false,
				explain: '',
				cover: '../dist/imgs/cover-b.jpg',
				content: '',
				files: ''
			};
		},
		mounted: function mounted() {
			// 富文本编辑器
			editor = new Simditor({
				textarea: $('#editor'),
				toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', 'ol', 'ul', 'blockquote', 'code', 'table', 'link', 'image', 'hr', 'indent', 'outdent', 'alignment'],
				imageButton: ['upload', 'external']
			});
		},

		methods: {
			onToggleOption: function onToggleOption() {
				this.optionShow = !this.optionShow;
			},
			onChangeFile: function onChangeFile(e) {
				this.files = this.getFile(e);
				if (!this.files.length) {
					return;
				}
				console.log(this.files[0]);
			},
			onChangeOption: function onChangeOption(e) {
				this.selectOption = e.target.innerHTML;
				this.optionShow = !this.optionShow;
			},
			onChangeCover: function onChangeCover(e) {
				var file = this.getFile(e),
				    self = this,
				    reader = void 0;
				if (file.length != 1 || !/\/(?:jpeg|jpg|png)/i.test(file[0].type)) {
					return;
				}

				reader = new FileReader();
				reader.onload = function () {
					self.cover = this.result;
				};
				reader.readAsDataURL(file[0]);
			},
			getFile: function getFile(e) {
				return e.target.files || e.dataTransfer.files;
			},
			onPost: function onPost() {
				if (!this.title || !this.time || !this.place || !this.selectOption || !this.content || !this.cover) {
					alert('请填写所有必须项！');
				}
				this.content = editor.sync();
				console.log(this.title);
				console.log(this.aim);
				console.log(this.time);
				console.log(this.place);
				console.log(this.selectOption);
				console.log(this.explain);
				console.log(this.cover);
				console.log(this.content);
				console.log(this.files);
			},
			test: function test() {
				console.log(this.content);
			}
		}
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "form-contain"
	  }, [_c('form', {
	    staticClass: "edit-form"
	  }, [_c('div', {
	    staticClass: "group-left"
	  }, [_c('div', {
	    staticClass: "group-con"
	  }, [_c('span', {
	    staticClass: "must"
	  }, [_vm._v("*")]), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.title),
	      expression: "title"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "标题"
	    },
	    domProps: {
	      "value": _vm._s(_vm.title)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.title = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "group-con"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.aim),
	      expression: "aim"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "举办目的"
	    },
	    domProps: {
	      "value": _vm._s(_vm.aim)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.aim = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "group-con"
	  }, [_c('span', {
	    staticClass: "must"
	  }, [_vm._v("*")]), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.time),
	      expression: "time"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "举办时间"
	    },
	    domProps: {
	      "value": _vm._s(_vm.time)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.time = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "group-con"
	  }, [_c('span', {
	    staticClass: "must"
	  }, [_vm._v("*")]), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.place),
	      expression: "place"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "举办地点"
	    },
	    domProps: {
	      "value": _vm._s(_vm.place)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.place = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "group-con"
	  }, [_c('span', {
	    staticClass: "must"
	  }, [_vm._v("*")]), _c('div', {
	    staticClass: "select"
	  }, [_c('span', {
	    on: {
	      "click": _vm.onToggleOption
	    }
	  }, [_vm._v(_vm._s(_vm.selectOption))]), _vm._v(" "), _c('span', {
	    staticClass: "arrow",
	    on: {
	      "click": _vm.onToggleOption
	    }
	  }), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.optionShow),
	      expression: "optionShow"
	    }],
	    staticClass: "option-box"
	  }, [_c('div', {
	    staticClass: "option"
	  }, [_c('p', {
	    on: {
	      "click": _vm.onChangeOption
	    }
	  }, [_vm._v("hello")])])])])]), _vm._v(" "), _c('div', {
	    staticClass: "group-con"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.explain),
	      expression: "explain"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "附加说明"
	    },
	    domProps: {
	      "value": _vm._s(_vm.explain)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.explain = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "group-con group-cover"
	  }, [_c('span', {
	    staticClass: "must"
	  }, [_vm._v("*")]), _c('img', {
	    attrs: {
	      "src": _vm.cover
	    }
	  }), _vm._v(" "), _c('input', {
	    attrs: {
	      "type": "file"
	    },
	    on: {
	      "change": _vm.onChangeCover
	    }
	  })])]), _c('div', {
	    staticClass: "group-right"
	  }, [_c('div', {
	    staticClass: "group-con group-content"
	  }, [_c('span', {
	    staticClass: "must"
	  }, [_vm._v("*")]), _vm._v(" "), _c('div', {
	    staticClass: "textarea-box"
	  }, [_c('textarea', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.content),
	      expression: "content"
	    }],
	    attrs: {
	      "id": "editor",
	      "placeholder": "请输入举办内容"
	    },
	    domProps: {
	      "value": _vm._s(_vm.content)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.content = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "group-con group-edit"
	  }, [_c('input', {
	    attrs: {
	      "type": "file",
	      "multiple": ""
	    },
	    on: {
	      "change": _vm.onChangeFile
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "btn btn-edit",
	    staticStyle: {
	      "margin-left": "25px"
	    },
	    attrs: {
	      "value": _vm.enclosure,
	      "id": "file"
	    }
	  }, [_vm._v("附件")]), _vm._v(" "), _c('div', {
	    staticClass: "file-list"
	  }, _vm._l((_vm.files), function(file) {
	    return _c('p', {
	      staticClass: "file-content"
	    }, [_vm._v(_vm._s(file.name))])
	  }))]), _vm._v(" "), _c('div', {
	    staticClass: "group-con group-btn"
	  }, [_c('input', {
	    staticClass: "btn btn-l btn-edit btn-post",
	    attrs: {
	      "type": "button",
	      "value": "发布"
	    },
	    on: {
	      "click": _vm.onPost
	    }
	  })])])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-352e9b22", module.exports)
	  }
	}

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(72);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(73)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./common.styl", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./common.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(37)();
	// imports


	// module
	exports.push([module.id, "body,\nul,\nli,\np,\nh1 {\n  padding: 0;\n  margin: 0;\n}\nbody {\n  height: 100vh;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  -o-box-sizing: border-box;\n  box-sizing: border-box;\n}\nul li {\n  list-style: none;\n}\na {\n  text-decoration: none;\n  color: #000;\n}\n", ""]);

	// exports


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);