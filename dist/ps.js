/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash.assign");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(20);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var client = __webpack_require__(8);
var authorize = __webpack_require__(24);
var Route = __webpack_require__(25);

var API_KEY_HEADER = 'x-api-key';

// Used for caching auth credentials between multiple requests in the same process
var cacheObject = {};

// This function takes an 'endpointSpec' (an object with properties that describe the
// HTTP endpoint we are going to hit), a 'methodParams' (an object that contains all
// of the params we want to send to that endpoint), and a Node-style callback function,
// and executes the respective request to that endpoint.
//
// An 'endpointSpec' looks like this:
//   {
//     group: 'foo',
//     name: 'bar',
//     method: 'post',
//     route: '/baz/qux',
//     requires: {
//       hello: String,
//       there: String,
//     },
//     file: 'paramName',
//     returns: {}
//   }
//
// And part of this method's responsibility is to convert this into a URL and request
// parameters that can be sent into the 'client' function.
function method(endpointSpec, methodParams, cb) {
	// Check if any required parameters are missing, or of the wrong type
	if (endpointSpec.requires) {
		for (var requiredKey in endpointSpec.requires) {
			var requiredType = endpointSpec.requires[requiredKey];
			var givenParam = methodParams[requiredKey];

			if (givenParam === void 0 || givenParam === null) {
				return cb(new Error('Missing required parameter `' + requiredKey + '`'));
			}

			if ((typeof givenParam === 'undefined' ? 'undefined' : (0, _typeof3.default)(givenParam)) !== requiredType) {
				return cb(new Error('Parameter `' + requiredKey + '` expected to be a ' + requiredType));
			}
		}
	}

	// Generate a URL path by substituting route segments with their values
	var route = new Route(endpointSpec.route);
	var path = route.reverse(methodParams);
	var method = endpointSpec.method;

	var maybeAuthEmail = methodParams.authEmail;
	var maybeAuthPassword = methodParams.authPassword;
	var maybeAuthAccessToken = methodParams.accessToken || methodParams.access_token;
	var maybeAuthApiKey = methodParams.apiKey || methodParams.api_key;

	var methodHeaders = {};

	var file;
	if (endpointSpec.file) {
		file = methodParams[endpointSpec.file];
		delete methodParams[endpointSpec.file];
	}

	// Only bother with the auth ritual if the endpoint is defined as requiring it.
	if (endpointSpec.auth) {
		// Authorize takes a handful of optional auth credentials and returns
		// a token or an api key, depending on the precedence it defines.
		return authorize(maybeAuthEmail, maybeAuthPassword, maybeAuthAccessToken, maybeAuthApiKey, cacheObject, function _authCb(authErr, foundAccessToken, foundApiKey) {
			if (authErr) return cb(authErr);

			// The API key should always get the highest precedence
			if (foundApiKey) {
				methodHeaders[API_KEY_HEADER] = foundApiKey;
				delete methodParams.apiKey;
			} else if (foundAccessToken) {
				if (!methodParams.access_token) {
					methodParams.access_token = foundAccessToken;
				}
			}

			return client(method, path, methodParams, methodHeaders, file, cb);
		});
	}

	return client(method, path, methodParams, methodHeaders, file, cb);
}

module.exports = method;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {"name":"paperspace-node","version":"0.1.3","description":"Paperspace API for node","main":"index.js","repository":"https://github.com/Paperspace/paperspace-node","author":"Paperspace <support@paperspace.com>","license":"ISC","bin":{"paperspace":"./bin/paperspace"},"scripts":{"test":"tape ./test/*.test.js | tap-spec","lint":"eslint .","docs":"jsdoc ./index.js -R README.md -c jsdoc.json","prettier":"prettier --single-quote --trailing-comma es5 --use-tabs --write lib/**/*.js","build":"buble -y dangerousForOf ./cli/index.js > build.js"},"dependencies":{"async":"1.5.2","chalk":"^2.3.0","copy-webpack-plugin":"^4.2.0","email-prompt":"^0.3.1","email-validator":"^1.1.1","flow-babel-webpack-plugin":"^1.1.0","fs-promise":"^2.0.3","json-stable-stringify":"1.0.1","lodash.assign":"4.0.6","lodash.clone":"4.3.2","lodash.defaultsdeep":"4.3.4","lodash.find":"4.5.0","lodash.isequal":"4.3.0","lodash.uniq":"4.4.0","lodash.uniqwith":"4.4.0","moment":"^2.13.0","node-fetch":"^1.7.3","ora":"^1.3.0","prompt":"^1.0.0","qs":"^6.1.0","route-parser":"0.0.5","shebang-loader":"^0.0.1","superagent":"1.8.3","yargs":"^5.0.0"},"devDependencies":{"babel-core":"6.26.0","babel-eslint":"8.0.1","babel-loader":"7.1.2","babel-plugin-transform-async-to-generator":"6.24.1","babel-plugin-transform-flow-comments":"6.22.0","babel-plugin-transform-runtime":"6.23.0","babel-preset-env":"1.6.0","docdash":"^0.4.0","eslint":"3.19.0","jsdoc":"^3.4.0","prettier":"^1.3.1","repl":"0.1.3","tap-spec":"4.1.1","tape":"4.6.0","webpack":"3.6.0","webpack-node-externals":"^1.6.0"}}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var configInfo = __webpack_require__(21);
var request = __webpack_require__(22);

var processEnv = typeof process !== 'undefined' && process.env || {};
var nodeEnv = processEnv.NODE_ENV;
var config = configInfo[nodeEnv || 'production'];

// Simple wrapper over the request function that inserts a 'host' parameter
// as the first argument, since most use cases are always going to use the
// same host as provided via the baked-in config.
function client(method, path, inputs, headers, file, cb) {
	var body = null;
	var query = {};
	var options = {};

	// It's assumed these will be provided, but just in case...
	if (!headers) headers = {};

	// Send input params as the query string if this is a GET, otherwise send
	// with the HTTP request body
	switch (method.toLowerCase()) {
		case 'get':
			query = inputs;
			break;

		case 'post':
			if (file) {
				query = inputs;
				break;
			}

		default:
			// Don't leave the access token on the inputs object since the jwt
			// really belongs on the query string (at least, per the way the interface
			// to the Paperspace API is currently set up).
			query.access_token = inputs.access_token;
			delete inputs.access_token;
			body = inputs;
			break;
	}

	// The rubber finally meats the road with 'request', which initiates
	// the request via Superagent
	return request(config.host, method, path, body, query, headers, options, file, cb, inputs.debug);
}

module.exports = client;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("ms");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Native

var os = __webpack_require__(6);

// Ours
var _ = 1.2,
    version = _.version; //require("./pkg");

module.exports = "now " + version + " node-" + process.version + " " + os.platform() + " (" + os.arch() + ")";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(54);

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = __webpack_require__(5);

var _stringify2 = _interopRequireDefault(_stringify);

/**
 * Reads the config file
 *
 * Optionally, always queries the API to get the user info even if the
 * config file is not present
 *
 * @param  {Boolean} force [false] Queries the API even if the config
 *                                 file is not present. If `true`, `token`
 *                                 *must* be specified
 * @param  {String}  token         Will be used to autenticate in the API
                                   if needed
 * @param  {String}  apiUrl        URL of the API to be used
 * @return {Object}
 */
var read = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$force = _ref2.force,
        force = _ref2$force === undefined ? false : _ref2$force,
        token = _ref2.token,
        apiUrl = _ref2.apiUrl;

    var existing, user, _token, _user;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            existing = {};

            try {
              existing = fs.readFileSync(file, "utf8");
              existing = JSON.parse(existing);
            } catch (err) {}

            // Will happen if `force`d or if `--token` is used and it's different from
            // The one that's stored (which can be `undefined`)

            if (!(force && token || token && token !== existing.token)) {
              _context.next = 9;
              break;
            }

            _context.next = 5;
            return getUser({ token: token, apiUrl: apiUrl });

          case 5:
            user = _context.sent;

            if (!user) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", {
              token: token,
              user: {
                uid: user.uid,
                username: user.username,
                email: user.email
              }
            });

          case 8:
            return _context.abrupt("return", {});

          case 9:
            if (existing.token) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", {});

          case 11:
            if (!(!existing.lastUpdate || Date.now() - existing.lastUpdate > TTL)) {
              _context.next = 17;
              break;
            }

            // TODO: update `teams` info
            _token = existing.token;
            _context.next = 15;
            return getUser({ token: _token });

          case 15:
            _user = _context.sent;

            if (_user) {
              existing.user = _user;
              existing.lastUpdate = Date.now();
              save(existing);
            }

          case 17:
            return _context.abrupt("return", existing);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function read() {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Merges the `data` object onto the
 * JSON config stored in `.now.json`.
 *
 * (atomic)
 * @param {Object} data
 */

var merge = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
    var cfg;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = _assign2.default;
            _context2.t1 = {};
            _context2.next = 4;
            return read();

          case 4:
            _context2.t2 = _context2.sent;
            _context2.t3 = data;
            cfg = (0, _context2.t0)(_context2.t1, _context2.t2, _context2.t3);

            save(cfg);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function merge(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

// Removes a key from the config and store the result


var remove = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(key) {
    var cfg;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return read();

          case 2:
            cfg = _context3.sent;

            delete cfg[key];
            fs.writeFileSync(file, (0, _stringify2.default)(cfg, null, 2));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function remove(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

// We need to remove the config file when running `now logout`


function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// Native
var _require = __webpack_require__(6),
    homedir = _require.homedir;

var path = __webpack_require__(55);

// Packages
var fs = __webpack_require__(56);
var ms = __webpack_require__(10);

// Ours

var _require2 = __webpack_require__(57),
    getUser = _require2.get;

// `8h` is arbitrarily used based on the average sleep time


var TTL = ms("8h");

var file = process.env.NOW_JSON ? path.resolve(process.env.NOW_JSON) : path.resolve(homedir(), ".paperspace.json");

function setConfigFile(nowjson) {
  file = path.resolve(nowjson);
}

function save(data) {
  fs.writeFileSync(file, (0, _stringify2.default)(data, null, 2));
}var removeFile = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", fs.remove(file));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function removeFile() {
    return _ref5.apply(this, arguments);
  };
}();

module.exports = {
  setConfigFile: setConfigFile,
  read: read,
  merge: merge,
  remove: remove,
  removeFile: removeFile
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Native

var _stringify = __webpack_require__(5);

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var main = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
		var config, token;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return cfg.read({ token: argv.token });

					case 2:
						config = _context.sent;

						console.log(config);

						token = argv.token || config.token;

						if (!(!token || shouldLogin)) {
							_context.next = 21;
							break;
						}

						_context.prev = 6;
						_context.next = 9;
						return login(apiUrl);

					case 9:
						token = _context.sent;
						_context.next = 12;
						return cfg.read();

					case 12:
						config = _context.sent;
						_context.next = 18;
						break;

					case 15:
						_context.prev = 15;
						_context.t0 = _context['catch'](6);
						return _context.abrupt('return', stopDeployment('Authentication error \u2013 ' + _context.t0.message));

					case 18:
						if (!shouldLogin) {
							_context.next = 21;
							break;
						}

						console.log('> Logged in successfully. Token saved in ~/.paperspace.json');
						return _context.abrupt('return', exit(0));

					case 21:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this, [[6, 15]]);
	}));

	return function main() {
		return _ref.apply(this, arguments);
	};
}();

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var argv = __webpack_require__(15).argv;

// Convert arg value	s that look boolean to boolean
for (var arg in argv) {
	if (arg !== '$0' && typeof argv[arg] === 'string') {
		var val = argv[arg];
		if (val === 'true' || argv[arg] === 'false') {
			argv[arg] = val === 'true';
		}
	}
}

var givenNamespace = argv._[0];
var givenName = argv._[1];

// Packages
var chalk = __webpack_require__(4);

// Ours
var paperspace = __webpack_require__(16);

var _require = __webpack_require__(46),
    handleError = _require.handleError,
    error = _require.error;

var login = __webpack_require__(47);
var cfg = __webpack_require__(13);

var _require2 = __webpack_require__(58),
    version = _require2.version;

var ua = __webpack_require__(12);
var help = __webpack_require__(59);

var apiUrl = 'https://dev-api.paperspace.io/';
var shouldLogin = argv.login;

if (!givenNamespace && !givenName) {
	help();
	process.exit();
}

var stopDeployment = function stopDeployment(msg) {
	error(msg);
	process.exit(1);
};

console.log(givenName);
console.log(givenNamespace);

if (givenNamespace == 'login') {
	main();
} else {
	var safeJSON = function safeJSON(obj) {
		try {
			return (0, _stringify2.default)(obj, null, 2) + '\n';
		} catch (err) {
			console.error(err);
			return '{}';
		}
	};

	var foundMethod;

	paperspace.eachEndpoint(function _each(namespace, name, method) {
		if (namespace === givenNamespace && name == givenName) {
			foundMethod = {
				namespace: namespace,
				name: name,
				method: method
			};
		}
	});

	if (!foundMethod) {
		console.error('No such command `' + givenNamespace + ' ' + givenName + '`');
		process.exit(1);
	}

	if (argv.help) {
		help();
		process.exit();
	}

	foundMethod.method(argv, function _methodCb(methodErr, methodResp) {
		if (methodErr) {
			process.stdout.write(safeJSON({
				error: methodErr.message,
				status: methodResp && methodResp.statusCode,
				response: methodResp && methodResp.body
			}));

			process.exit(1);
		}

		process.stdout.write(safeJSON(methodResp.body || {}));
	});
}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("yargs");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(0);
var pkg = __webpack_require__(7);
var endpoints = __webpack_require__(17);

var NO_CREDS = new Error('Please provide Paperspace credentials');

// Iterate through all the endpoints available and return the namespace,
// method name, and method to the iterator function
function eachEndpoint(iterator) {
	for (var namespace in endpoints) {
		var methods = endpoints[namespace];

		for (var name in methods) {
			var method = methods[name];

			iterator(namespace, name, method);
		}
	}

	return endpoints;
}

function wrapMethod(method, options) {
	return function _methodWrapper(params, cb) {
		// Merge the options passed into the paperspace 'constructor' with the params
		// passed to the method call itself, making it more convenient for params to
		// be passed once and then reused when actually making the requests, but allowing
		// each method to live standalone as well
		var full = options;
		if (cb) {
			full = assign({}, full, params);
		} else {
			cb = params;
		}

		return method(full, cb);
	};
}

function isAnyAuthOptionPresent(opts) {
	return opts.authEmail && opts.authPassword || // Option 1: email auth
	opts.token || opts.accessToken || opts.access_token || // Option 2: jwt auth
	opts.apiKey || opts.api_key // Option 3: API key auth (preferred)
	;
}

// Entrypoint to the API for those who want to use a certain set of credentials
// for authenticating all requests
function paperspace(options) {
	if (!options) {
		throw NO_CREDS;
	}

	if (!isAnyAuthOptionPresent(options)) {
		throw NO_CREDS;
	}

	var api = {};

	eachEndpoint(function _eachEndpoint(namespace, name, method) {
		if (!api[namespace]) api[namespace] = {};
		api[namespace][name] = wrapMethod(method, options);
	});

	return api;
}

// Expose this so the command-line tool can easily autogen its API
paperspace.eachEndpoint = eachEndpoint;

paperspace.VERSION = pkg.version;

module.exports = paperspace;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	machines: __webpack_require__(18),
	networks: __webpack_require__(34),
	scripts: __webpack_require__(36),
	templates: __webpack_require__(42),
	users: __webpack_require__(44)
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @namespace machines
 */

module.exports = {
	create: __webpack_require__(19),
	destroy: __webpack_require__(26),
	list: __webpack_require__(27),
	restart: __webpack_require__(28),
	show: __webpack_require__(29),
	start: __webpack_require__(30),
	stop: __webpack_require__(31),
	utilization: __webpack_require__(32),
	waitfor: __webpack_require__(33)
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof machines
 * @method create
 * @description Create a new Paperspace virtual machine. If you are using an individual account,
 * you will be assigned as the owner of the machine. If you are a team administrator, you must
 * specify who the machine should belong to, either by their user id, or their email address.
 * If you pass a full set of user parameters, we will create a user within your team and assign
 * them the machine. This action can only be performed by the account owner. (Team members cannot
 * create machines themselves; only the team administrator may do so.)
 * @param {object} params - Machine creation parameters
 * @param {string} params.region - Name of the region: 'East Coast (NY2)' or 'West Coast (CA1)'
 * @param {string} params.machineType - Machine type: either 'Air', 'Standard', 'Pro', 'Advanced', 'GPU+', 'P5000', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', or 'C10'<p>
 * Note:<br>
 * Windows os templates cannot be used to create CPU-only machine types 'C1' - 'C10'.<br>
 * Ubuntu os templates cannot be used to create GRID GPU machine types: 'Air', 'Standard', 'Pro', or 'Advanced'.
 * @param {number} params.size - Storage size for the machine in GB
 * @param {string} params.billingType - Either 'monthly' or 'hourly' billing
 * @param {string} params.machineName - A memorable name for this machine
 * @param {string} params.templateId - Template id of the template to use for creating this machine
 * @param {boolean} [params.assignPublicIp] - Assign a new public ip address on machine creation
 * @param {string} [params.networkId] - If creating on a specific network, specify its id
 * @param {string} [params.teamId] - If creating the machine for a team, specify the team id
 * @param {string} [params.userId] - If assigning to an existing user other than yourself, specify the user id
 * @param {string} [params.email] - If creating a new user for this machine, specify their email address
 * @param {string} [params.password] - If creating a new user, specify their password
 * @param {string} [params.firstName] - If creating a new user, specify their first name
 * @param {string} [params.lastName] - If creating a new user, specify their last name
 * @param {string} [params.notificationEmail] - Send a notification to this email address when complete
 * @param {string} [params.scriptId] - The script id of a script to be run on startup.  See the [Script Guide]{@link https://paperspace.github.io/paperspace-node/scripts.md} for more info on using scripts.
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} machine - The created machine JSON object
 * @example
 * paperspace.machines.create({
 *   region: 'East Coast (NY2)',
 *   machineType: 'Air',
 *   size: 50,
 *   billingType: 'hourly',
 *   machineName: 'My Machine 1',
 *   templateId: 't123abc',
 *   assignPublicIp: true, // optional - assign a new public ip address
 *   networkId: 'n123abc', // optional - only if creating on a specific network
 *   teamId: 'te456def', // optional - required if creating this machine for a team
 *   userId: 'u123abc', // optional - required if assigning to an existing user other than yourself
 *   email: 'example@example.com', // optional - if creating a new user
 *   password: 'secret123', // optional - if creating a new user
 *   firstName: 'Jon', // optional - if creating a new user
 *   lastName: 'Snow', // optional - if creating a new user
 *   notificationEmail: 'example@example.com', // optional - address to send a notification when complete
 *   scriptId: 'sc123abc', // optional - a script to be run on startup
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines create \
 *     --region "East Coast (NY2)" \
 *     --machineType "Air" \
 *     --size 50 \
 *     --billingType "hourly" \
 *     --machineName "My Machine 1" \
 *     --templateId "t123abc" \
 *     --assignPublicIp true \
 *     --networkId "n123abc" \
 *     --teamId "te456def" \
 *     --userId "u123abc" \
 *     --email "example@example.com" \
 *     --password "secret123" \
 *     --firstName "Jon" \
 *     --lastName "Snow" \
 *     --notificationEmail "example@example.com" \
 *     --scriptId "sc123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /machines/createSingleMachinePublic {"region": "East Coast (NY2)", "machineType": "Air", "size": 50, "billingType": "monthly", "machineName": "My Machine 1", "templateId": "t123abc", "assignPublicIp": true, "networkId": "n123abc", "teamId": "te456def", "userId": "u123abc", "email": "example@example.com", "password": "secret123", "firstName": "Jon", "lastName": "Snow", "notificationEmail": "example@example.com"}
 * x-api-key: 1ba4f98e7c0...
 * # Returns 201 on success
 * @example
 * // Example return value:
 * {
 *   "id": "ps123abc",
 *   "name": "My Machine",
 *   "os": null,
 *   "ram": null,
 *   "cpus": 1,
 *   "gpu": null,
 *   "storageTotal": null,
 *   "storageUsed": null,
 *   "usageRate": "Air hourly",
 *   "shutdownTimeoutInHours": 24,
 *   "shutdownTimeoutForces": false,
 *   "performAutoSnapshot": false,
 *   "autoSnapshotFrequency": null,
 *   "autoSnapshotSaveCount": null,
 *   "agentType": "WindowsDesktop",
 *   "dtCreated": "2017-02-16T20:26:54.880Z",
 *   "state": "provisioning",
 *   "networkId": null,
 *   "privateIpAddress": null,
 *   "publicIpAddress": "169.255.255.254",
 *   "region": null,
 *   "userId": "u123abc",
 *   "teamId": "te456def"
 *   "scriptId": "sc123abc"
 *   "dtLastRun": null
 * }
 */

function create(params, cb) {
  return method(create, params, cb);
}

assign(create, {
  auth: true,
  group: 'machines',
  name: 'create',
  method: 'post',
  route: '/machines/createSingleMachinePublic',
  requires: {
    region: 'string',
    machineType: 'string',
    size: 'number',
    billingType: 'string',
    machineName: 'string',
    templateId: 'string'
  },
  returns: {}
});

module.exports = create;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/typeof");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	production: {
		host: 'https://api.paperspace.io'
	},
	local: {
		host: 'http://localhost:3102'
	},
	test: {
		host: 'http://localhost:3102'
	}
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var qs = __webpack_require__(9);
var superagent = __webpack_require__(23);

var FSLASH = '/';

function objectToQueryString(obj) {
	// Convert null query params to 'null'
	for (var param in obj) {
		if (obj[param] === null) {
			obj[param] = 'null';
		}
	}
	return qs.stringify(obj, { encode: true });
}

// General-purpose HTTP request method, based on superagent
function request(host, method, path, params, query, headers, options, file, cb, debug) {
	if (!options) options = {};

	// Remove leading/trailing slash from the path/host so that we can join
	// the two together no matter which way the user chose to provide them.
	if (path[0] === FSLASH) {
		path = path.slice(1);
	}
	if (host[host.length - 1] === FSLASH) {
		host = host.slice(0, host.length - 1);
	}

	var url = host + FSLASH + path;

	var req = superagent[method](url);

	if (!options.withoutCredentials) req.withCredentials();

	if (!file) {
		// Clean up extra parameters that may have gotten in here
		// if the request came from the CLI module. This is hacky; move elsewhere
		if (params) {
			delete params._;
			delete params.$0;
			req.send(params);
		}
		if (query) {
			delete query._;
			delete query.$0;
			req.query(objectToQueryString(query));
		}
	} else {
		//for file upload params are sent as query params
		req.accept('application/json');
		req.attach('file', file);
		delete query._;
		delete query.$0;
		req.query(objectToQueryString(query));
	}

	if (headers) {
		for (var headerKey in headers) {
			req.set(headerKey, headers[headerKey]);
		}
	}

	// TODO: Add nicer debug utils? Use the 'debug' module?
	if (debug) {
		console.log(method, url, params, query, headers);
	}

	return req.end(function _requestCallback(err, res) {
		if (cb) return cb(err, res);

		return res;
	});
}

module.exports = request;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("superagent");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var client = __webpack_require__(8);

var processEnv = typeof process !== 'undefined' && process.env || {};

function apiKeyAuth(apiToken, cb) {
	// noop; Just forward the API key to the request handler
	return cb(null, null, apiToken); // HACK: Pass API token as second param
}

function accessTokenAuth(accessToken, cb) {
	// noop; Just forward the token to the request handler
	return cb(null, accessToken);
}

function emailAuth(authEmail, authPassword, cache, cb) {
	// If using email auth, we will hit an endpoint to sign them in, obtain
	// an access_token, and then use that for the request.
	var noHeaders = {};
	return client('post', '/users/login', { email: authEmail, password: authPassword }, noHeaders, function clientCb(clientErr, clientResp) {
		if (clientErr) return cb(clientErr, clientResp);
		return cb(null, clientResp.body.id);
	});
}

function authorize(authEmail, authPassword, accessToken, apiKey, cache, cb) {
	// The preferred way to authorize is via an actual api token
	if (!apiKey) apiKey = processEnv.PAPERSPACE_API_KEY;
	if (apiKey) cache.apiKey = apiKey;else apiKey = cache.apiKey;
	if (apiKey) return apiKeyAuth(apiKey, cb);

	// The user can also supply an actual access_token a.k.a. a jwt, for requests
	// Possibly worth adding a deprecation warning here.
	if (!accessToken) accessToken = processEnv.PAPERSPACE_TOKEN;
	if (accessToken) cache.accessToken = accessToken;else accessToken = cache.accessToken;
	if (accessToken) return accessTokenAuth(accessToken, cb);

	// Finally, they are also allowed to use their account credentials if they so desire
	// Possibly worth adding a deprecation warning here.
	if (!authEmail) authEmail = processEnv.PAPERSPACE_AUTH_EMAIL;
	if (!authPassword) authPassword = processEnv.PAPERSPACE_AUTH_PASSWORD;
	if (authEmail && authPassword) {
		return emailAuth(authEmail, authPassword, cache, cb);
	}

	// If none of the above are provided, we can't go forward at all
	return cb(new Error('Please provide authentication credentials'));
}

module.exports = authorize;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("route-parser");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof machines
 * @method destroy
 * @description Destroy the machine with the given id. When this action is performed,
 * the machine is immediately shut down and marked for deletion from the datacenter.
 * Any snapshots that were derived from the machine are also deleted. Access to the machine
 * is terminated immediately and billing for the machine is prorated to the hour.
 * This action can only be performed by the user who owns the machine, or in the case of
 * a team, the team administrator.
 * @param {object} params - Machine destroy parameters
 * @param {string} params.machineId - The id of the machine to destroy
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.destroy({
 *   machineId: 'ps123abc',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines destroy --machineId "ps123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /machines/ps123abc/destroyMachine
 * x-api-key: 1ba4f98e7c0...
 * # Returns 204 on success
 */

function destroy(params, cb) {
  return method(destroy, params, cb);
}

assign(destroy, {
  auth: true,
  group: 'machines',
  name: 'destroy',
  method: 'post',
  route: '/machines/:machineId/destroyMachine',
  requires: {
    machineId: 'string'
  },
  returns: {}
});

module.exports = destroy;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof machines
 * @method list
 * @description List information about all machines available to either the current
 * authenticated user or the team, if the user belongs to a team.
 * The list method takes an optional first argument to limit the returned machine objects.
 * @param {object} [filter] - An optional filter object to limit the returned machine objects
 * @param {string} [filter.machineId] - Optional machine id to match on. Note: must be specified as "machineId", not "id".
 * @param {string} [filter.name] - Optional name to match on
 * @param {string} [filter.os] - Optional os to match on
 * @param {string} [filter.ram] - Optional ram value to match on
 * @param {number} [filter.cpus] - Optional cpu count to mactch on
 * @param {string} [filter.gpu] - Optional gpu to match on
 * @param {string} [filter.storageTotal] - Optional storageTotal value to match on
 * @param {string} [filter.storageUsed] - Optional storageUsed value to match on
 * @param {string} [filter.usageRate] - Optional usageRate value to match on
 * @param {number} [filter.shutdownTimeoutInHours] - Optional shutdownTimeoutInHours value to mactch on
 * @param {boolean} [filter.performAutoSnapshot] - Optional performAutoSnapshot value to match on, either true or false
 * @param {string} [filter.autoSnapshotFrequency] - Optional autoSnapshotFrequency value to mactch on
 * @param {number} [filter.autoSnapshotSaveCount] - Optional autoSnapshotSaveCount value to mactch on
 * @param {string} [filter.agentType] - Optional agentType value to mactch on
 * @param {string} [filter.dtCreated] - Optional datatime created value to match on
 * @param {string} [filter.state] - Optional state value to mactch on
 * @param {string} [filter.networkId] - Optional networkId to mactch on
 * @param {string} [filter.privateIpAddress] - Optional privateIpAddress to mactch on
 * @param {string} [filter.publicIpAddress] - Optional publicIpAddress to mactch on
 * @param {string} [filter.region] - Optional region to mactch on
 * @param {string} [filter.userId] - Optional userId to mactch on
 * @param {string} [filter.teamId] - Optional teamId to mactch on
 * @param {string} [filter.scriptId] - Optional scriptId to mactch on
 * @param {string} [filter.dtLastRun] - Optional script datatime last run value to match on
 * @param {function} cb - Node-style error-first callback function
 * @returns {array} [ machine, ... ] - JSON array of machine objects
 * @example
 * paperspace.machines.list(function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines list
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /machines/getMachines
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * [
 *   {
 *     "id": "ps123abc",
 *     "name": "My Machine",
 *     "os": "Microsoft Windows Server 2016 Datacenter",
 *     "ram": "8589938688",
 *     "cpus": 4,
 *     "gpu": "GRID K160Q (2GB)",
 *     "storageTotal": "53687091200",
 *     "storageUsed": "110080",
 *     "usageRate": "Air monthly",
 *     "shutdownTimeoutInHours": 168,
 *     "shutdownTimeoutForces": false,
 *     "performAutoSnapshot": false,
 *     "autoSnapshotFrequency": null,
 *     "autoSnapshotSaveCount": null,
 *     "agentType": "WindowsDesktop",
 *     "dtCreated": "2016-11-18T05:18:29.533Z",
 *     "state": "ready",
 *     "networkId": "n789ghi",
 *     "privateIpAddress": "10.64.21.47",
 *     "publicIpAddress": null,
 *     "region": "East Coast (NY2)",
 *     "userId": "u123abc",
 *     "teamId": "te456def"
 *     "scriptId": "sc123abc"
 *     "dtLastRun": "2017-06-30T07:22:49.763Z"
 *   }
 * ]
 */

function list(params, cb) {
  return method(list, params, cb);
}

assign(list, {
  auth: true,
  group: 'machines',
  name: 'list',
  method: 'get',
  route: '/machines/getMachines',
  requires: {},
  returns: {}
});

module.exports = list;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof machines
 * @method restart
 * @description Restart an individual machine. If the machine is already restarting,
 * this action will request the machine be restarted again.
 * This action can only be performed by the user who owns the machine.
 * @param {object} params - Machine restart parameters
 * @param {string} params.machineId - Id of the machine to shut down
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.restart({
 *   machineId: 'ps123abc',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines restart --machineId "ps123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /machines/ps123abc/restart
 * x-api-key: 1ba4f98e7c0...
 * # Returns 204 on success
 */

function restart(params, cb) {
  return method(restart, params, cb);
}

assign(restart, {
  auth: true,
  group: 'machines',
  name: 'restart',
  method: 'post',
  route: '/machines/:machineId/restart',
  requires: {
    machineId: 'string'
  },
  returns: {}
});

module.exports = restart;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


'use strict';

var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof machines
 * @method show
 * @description Show machine information for the machine with the given id.
 * @param {object} params - Machine show parameters
 * @param {string} params.machineId - Id of the machine to show
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} machine - The machine JSON object
 * @example
 * paperspace.machines.show({
 *   machineId: 'ps123abc',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines show \
 *     --machineId "ps123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /machines/getMachinePublic?machineId=ps123abc
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * {
 *   "id": "ps123abc",
 *   "name": "My Machine",
 *   "os": "Microsoft Windows Server 2016 Datacenter",
 *   "ram": "8589938688",
 *   "cpus": 4,
 *   "gpu": "GRID K160Q (2GB)",
 *   "storageTotal": "53687091200",
 *   "storageUsed": "110080",
 *   "usageRate": "Air monthly",
 *   "shutdownTimeoutInHours": 168,
 *   "shutdownTimeoutForces": false,
 *   "performAutoSnapshot": false,
 *   "autoSnapshotFrequency": null,
 *   "autoSnapshotSaveCount": null,
 *   "agentType": "WindowsDesktop",
 *   "dtCreated": "2016-11-18T05:18:29.533Z",
 *   "state": "ready",
 *   "networkId": "n789ghi",
 *   "privateIpAddress": "10.64.21.47",
 *   "publicIpAddress": null,
 *   "region": "East Coast (NY2)",
 *   "userId": "u123abc",
 *   "teamId": "te456def"
 *   "scriptId": "sc123abc"
 *   "dtLastRun": "2017-06-30T07:22:49.763Z"
 * }
 */

function show(params, cb) {
  return method(show, params, cb);
}

assign(show, {
  auth: true,
  group: 'machines',
  name: 'show',
  method: 'get',
  route: '/machines/getMachinePublic',
  requires: {
    machineId: 'string'
  },
  returns: {}
});

module.exports = show;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof machines
 * @method start
 * @description Start up an individual machine. If the machine is already started,
 * this action is a no-op. If the machine is off, it will be booted up.
 * This action can only be performed by the user who owns the machine.
 * @param {object} params - Machine start parameters
 * @param {string} params.machineId - Id of the machine to shut down
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.start({
 *   machineId: 'ps123abc',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines start --machineId "ps123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /machines/ps123abc/start
 * x-api-key: 1ba4f98e7c0...
 * # Returns 204 on success
 */

function start(params, cb) {
  return method(start, params, cb);
}

assign(start, {
  auth: true,
  group: 'machines',
  name: 'start',
  method: 'post',
  route: '/machines/:machineId/start',
  requires: {
    machineId: 'string'
  },
  returns: {}
});

module.exports = start;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof machines
 * @method stop
 * @description Stop an individual machine. If the machine is already stopped
 * or has been shut down, this action is a no-op. If the machine is running, it
 * will be stopped and any users logged in will be immediately kicked out.
 * This action can only be performed by the user who owns the machine.
 * @param {object} params - Machine stop parameters
 * @param {string} params.machineId - Id of the machine to shut down
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.machines.stop({
 *   machineId: 'ps123abc',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines stop --machineId "ps123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /machines/ps123abc/stop
 * x-api-key: 1ba4f98e7c0...
 * # Returns 204 on success
 */

function stop(params, cb) {
  return method(stop, params, cb);
}

assign(stop, {
  auth: true,
  group: 'machines',
  name: 'stop',
  method: 'post',
  route: '/machines/:machineId/stop',
  requires: {
    machineId: 'string'
  },
  returns: {}
});

module.exports = stop;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof machines
 * @method utilization
 * @description Show machine utilization data for the machine with the given id. Machine upgrades are not represented in utilization data.
 * @param {string} params.machineId - Id of the machine to show
 * @param {string} params.billingMonth - Billing period to query in `YYYY-MM` format
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} machine - The utilization JSON object
 * @example
 * paperspace.machines.utilization({
 *   machineId: 'ps123abc',
 *   billingMonth: '2017-08',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines utilization \
 *     --machineId "ps123abc" \
 *     --billingMonth "2017-08"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /machines/getUtilization?machineId=ps123abc&billingMonth=2017-08
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * {
 *   "machineId": "ps123abc",
 *   "secondsUsed": 1000,
 *   "utilization": {
 *     "machineId": "ps123abc",
 *     "secondsUsed": 1000,
 *     "hourlyRate": "0.40",
 *     "billingMonth": "2017-08",
 *   },
 *   "storageUtilization": {
 *     "machineId": "ps123abc",
 *     "secondsUsed": 3000,
 *     "hourlyRate": "7.00",
 *     "billingMonth": "2017-08",
 *   },
 * }
 */

function utilization(params, cb) {
  return method(utilization, params, cb);
}

assign(utilization, {
  auth: true,
  group: 'machines',
  name: 'utilization',
  method: 'get',
  route: '/machines/getUtilization',
  requires: {
    machineId: 'string',
    billingMonth: 'string'
  },
  returns: {}
});

module.exports = utilization;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof machines
 * @method waitfor
 * @description Wait for the machine with the given id to enter a certain machine
 * state. This action polls the server and returns only when we detect that the machine
 * has transitioned into the given state. States available are:
 *   - off
 *   - ready
 *
 * When the callback is called, the returned object will be information about the machine.
 * @param {object} params - Machine waitfor parameters
 * @param {string} params.machineId - Id of the machine to wait for
 * @param {string} params.state - Name of the state to wait for
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} machine - The machine JSON object
 * @example
 * paperspace.machines.waitfor({
 *   machineId: 'ps123abc',
 *   state: 'off',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace machines waitfor \
 *     --machineId "ps123abc" \
 *     --state "off"
 * @example
 * # HTTP request:
 * # The waitefor method is only available using the API client.
 * # Use the show method to query the state of the machine via HTTP.
 * @example
 * //Example return value:
 * {
 *   "id": "ps123abc",
 *   "name": "My Machine",
 *   "os": "Microsoft Windows Server 2016 Datacenter",
 *   "ram": "8589938688",
 *   "cpus": 4,
 *   "gpu": "GRID K160Q (2GB)",
 *   "storageTotal": "53687091200",
 *   "storageUsed": "110080",
 *   "usageRate": "Air monthly",
 *   "shutdownTimeoutInHours": 168,
 *   "shutdownTimeoutForces": false,
 *   "performAutoSnapshot": false,
 *   "autoSnapshotFrequency": null,
 *   "autoSnapshotSaveCount": null,
 *   "agentType": "WindowsDesktop",
 *   "dtCreated": "2016-11-18T05:18:29.533Z",
 *   "state": "ready",
 *   "networkId": "n789ghi",
 *   "privateIpAddress": "10.64.21.47",
 *   "publicIpAddress": null,
 *   "region": "East Coast (NY2)",
 *   "userId": "u123abc",
 *   "teamId": "te456def"
 *   "scriptId": "sc123abc"
 *   "dtLastRun": "2017-06-30T07:22:49.763Z"
 * }
 */

var INTERVAL = 5000; // ms

function waitfor(params, cb) {
  if (!params.state) {
    return cb(new Error('Missing required parameter state'));
  }
  var state = ('' + params.state).toLowerCase();
  var targetState;
  switch (state) {
    case 'ready':
    case 'off':
      targetState = state;
      break;
    default:
      console.log(state);
      return cb(new Error('state must be either off or ready'));
  }
  return method(waitfor, params, function _cb(err, resp) {
    if (err) {
      return cb(err);
    }
    var machine = resp.body;
    if (machine && machine.state === targetState) {
      return cb(null, resp);
    }
    var interval = setTimeout(function _interval() {
      return waitfor(params, cb);
    }, INTERVAL);
    return interval;
  });
}

assign(waitfor, {
  auth: true,
  group: 'machines',
  name: 'waitfor',
  method: 'get',
  route: '/machines/getMachinePublic',
  requires: {
    machineId: 'string',
    state: 'string'
  },
  returns: {}
});

module.exports = waitfor;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @namespace networks
 */

module.exports = {
  list: __webpack_require__(35)
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof networks
 * @method list
 * @description List information about all networks available to either the current
 * authenticated user or the team, if the user belongs to a team.
 * The list method takes an optional first argument to limit the returned network objects.
 * @param {object} [filter] - An optional filter object to limit the returned network objects
 * @param {string} [filter.id] - Optional network id to match on
 * @param {string} [filter.name] - Optional name to match on
 * @param {string} [filter.region] - Optional region to match on
 * @param {string} [filter.dtCreated] - Optional datatime created value to match on
 * @param {string} [filter.network] - Optional network to mactch on
 * @param {string} [filter.netmask] - Optional netmask to mactch on
 * @param {string} [filter.teamId] - Optional teamId to mactch on
 * @param {function} cb - Node-style error-first callback function
 * @returns {array} [ network, ... ] - JSON array of network objects
 * @example
 * paperspace.networks.list(function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace networks list
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /networks/getNetworks
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * [
 *   {
 *     "id": "n123abc",
 *     "name": "Example Network",
 *     "region": "East Coast (NY2)",
 *     "dtCreated": "2016-12-22T16:36:42.613Z",
 *     "network": "10.64.21.0",
 *     "netmask": "255.255.255.0",
 *     "teamId": "te456def"
 *   }
 * ]
 */

function list(params, cb) {
  return method(list, params, cb);
}

assign(list, {
  auth: true,
  group: 'networks',
  name: 'list',
  method: 'get',
  route: '/networks/getNetworks',
  requires: {},
  returns: {}
});

module.exports = list;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @namespace scripts
 */

module.exports = {
	create: __webpack_require__(37),
	destroy: __webpack_require__(38),
	list: __webpack_require__(39),
	show: __webpack_require__(40),
	text: __webpack_require__(41)
	//update: require('./update'),
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof scripts
 * @method create
 * @description Creates a new startup script.  Optionally specify a machine to use this startup script.
 * For Linux machines the script should be a bash script.  For Windows machines the script should be a powershell script.
 * See the samples directory for sample startup scripts for Windows.  Note: script data is limited to 16KB per script.
 * See the [Script Guide]{@link https://paperspace.github.io/paperspace-node/scripts.md} for more info on using scripts.
 * @param {object} params - Script create parameters
 * @param {string} params.scriptName - A unique name for the script
 * @param {string} [params.scriptFile] - File path to a file containing the script data; either scriptFile or scriptText must be provide.
 * @param {string} [params.scriptText] - A string containing the script text; either scriptFile or scriptText must be provide.
 * @param {string} [params.scriptDescription] - Description of the script
 * @param {boolean} [params.isEnabled] - Determines if the script is enabled or not.  Defaults to true
 * @param {boolean} [params.runOnce] - Determines if the script is run on first boot or every boot.  Defaults to false
 * @param {string} [params.machineId] - Machine id of a machine that should execute this script at startup
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} script - The created script JSON object
 * @example
 * paperspace.scripts.create({
 *   scriptName: 'My Script',
 *   scriptFile: './my_script_file.sh', // must specify either scriptFile or scriptText
 *   scriptDescription: 'A startup script', // optional
 *   isEnabled: true, // optional
 *   runOnce: false, // optional
 *   machineId: 'ps123abc', // optional
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace scripts create \
 *     --scriptName "My Script" \
 *     --scriptDescription "A startup script" \
 *     --scriptText "services start nginx" \
 *     --isEnabled true \
 *     --runOnce false \
 *     --machineId "ps123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /scripts/createScript {"scriptName": "My Script", "scriptDescription": "A startup script", "isEnabled": true, "runOnce": false, "machineId": "ps123abc"}
 * x-api-key: 1ba4f98e7c0...
 * (file contents as multipart form data)
 * # Returns 200 on success
 * @example
 * // Example return value:
 * {
 *   "id": "sc123abc",
 *   "ownerType": "user",
 *   "ownerId": "u456def",
 *   "name": "My Script",
 *   "description": "my_script_file.sh",
 *   "dtCreated": "2017-06-15T19:22:13.507Z",
 *   "isEnabled": true,
 *   "runOnce": false
 * }
 */

function create(params, cb) {
  if (!params.scriptFile && !params.scriptText) return cb(new Error('Missing required parameter: either scriptFile or scriptText'));
  if (params.scriptFile && params.scriptText) return cb(new Error('Only one of scriptFile or scriptText allowed'));
  return method(create, params, cb);
}

assign(create, {
  auth: true,
  group: 'scripts',
  name: 'create',
  method: 'post',
  route: '/scripts/createScript',
  requires: {
    scriptName: 'string'
  },
  file: 'scriptFile',
  returns: {}
});

module.exports = create;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof scripts
 * @method destroy
 * @description Destroys the starup script with the given id. When this action is performed,
 * the script is immediately disassociated from any machines it is assigned to as well.
 * @param {object} params - Script destroy parameters
 * @param {string} params.scriptId - The id of the script to destroy
 * @param {function} cb - Node-style error-first callback function
 * @example
 * paperspace.scripts.destroy({
 *   scriptId: 'sc123abc',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace scripts destroy --scriptId "sc123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * POST /scripts/sc123abc/destroy
 * x-api-key: 1ba4f98e7c0...
 * # Returns 204 on success
 */

function destroy(params, cb) {
  return method(destroy, params, cb);
}

assign(destroy, {
  auth: true,
  group: 'scripts',
  name: 'destroy',
  method: 'post',
  route: '/scripts/:scriptId/destroy',
  requires: {
    scriptId: 'string'
  },
  returns: {}
});

module.exports = destroy;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof scripts
 * @method list
 * @description List information about all scripts assigned to either the current
 * authenticated user or the team, if the user belongs to a team.
 * The list method takes an optional first argument to limit the returned script objects.
 * @param {object} [filter] - An optional filter object to limit the returned script objects
 * @param {string} [filter.id] - Optional script id to match on
 * @param {string} [filter.ownerType] - Optional ownerType to match on, either 'user' or 'team'
 * @param {string} [filter.ownerId] - Optional ownerId to match on, either a userId or teamId
 * @param {string} [filter.name] - Optional name to match on
 * @param {string} [filter.description] - Optional description to mactch on
 * @param {string} [filter.dtCreated] - Optional datatime created value to match on
 * @param {boolean} [filter.isEnabled] - Optional isEnabled value to match on, either true or false
 * @param {boolean} [filter.runOnce] - Optional runOnce value to match on, either true or false
 * @param {function} cb - Node-style error-first callback function
 * @returns {array} [ script, ... ] - JSON array of script objects
 * @example
 * paperspace.scripts.list(function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace scripts list
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /scripts/getScripts
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * [
 *   {
 *     "id": "sc123abc",
 *     "ownerType": "user",
 *     "ownerId": "u456def",
 *     "name": "My Script",
 *     "description": "original file: my_script.sh",
 *     "dtCreated": "2017-05-30T14:49:16.724Z",
 *     "isEnabled": true,
 *     "runOnce": false
 *   }
 * ]
 */

function list(params, cb) {
  return method(list, params, cb);
}

assign(list, {
  auth: true,
  group: 'scripts',
  name: 'list',
  method: 'get',
  route: '/scripts/getScripts',
  requires: {},
  returns: {}
});

module.exports = list;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof scripts
 * @method show
 * @description Show information for the script with the given id, except for the script text.
 * Use the [scripts text]{@link https://paperspace.github.io/paperspace-node/scripts.html#.text} method retrieve the script text.
 * @param {object} params - Script show parameters
 * @param {string} params.scriptId - Id of the script to show
 * @param {function} cb - Node-style error-first callback function
 * @returns {object} script - The script JSON object
 * @example
 * paperspace.scripts.show({
 *   scriptId: 'sc123abc',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace scripts show \
 *     --scriptId "sc123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /scripts/getScript?scriptId=sc123abc
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * {
 *   "id": "sc123abc",
 *   "ownerType": "user",
 *   "ownerId": "u456def",
 *   "name": "My Script",
 *   "description": "original file: my_script.sh",
 *   "dtCreated": "2017-05-30T14:49:16.724Z",
 *   "isEnabled": true,
 *   "runOnce": false
 *   "machines": [
 *     {
 *       "machineId": "ps123abc",
 *       "dtLastRun": "2017-07-06T12:38:17.325Z"
 *     },
 *     {
 *       "machineId": "ps456def",
 *       "dtLastRun": null
 *     }
 *   ]
 * }
 */

function show(params, cb) {
  return method(show, params, cb);
}

assign(show, {
  auth: true,
  group: 'scripts',
  name: 'show',
  method: 'get',
  route: '/scripts/getScript',
  requires: {
    scriptId: 'string'
  },
  returns: {}
});

module.exports = show;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof scripts
 * @method text
 * @description Gets the text of the script with the given id.
 * @param {object} params - Script text parameters
 * @param {string} params.scriptId - Id of the script to get text for
 * @param {function} cb - Node-style error-first callback function
 * @returns {string} script - The script JSON object
 * @example
 * paperspace.scripts.text({
 *   scriptId: 'sc123abc',
 * }, function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace scripts text \
 *     --scriptId "sc123abc"
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /scripts/getScriptText?scriptId=sc123abc
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * "services start nginx"
 */

function text(params, cb) {
  return method(text, params, cb);
}

assign(text, {
  auth: true,
  group: 'scripts',
  name: 'text',
  method: 'get',
  route: '/scripts/getScriptText',
  requires: {
    scriptId: 'string'
  },
  returns: {}
});

module.exports = text;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @namespace templates
 */

module.exports = {
  list: __webpack_require__(43)
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof templates
 * @method list
 * @description List information about all templates available to either the current
 * authenticated user or the team, if the user belongs to a team.
 * The list method takes an optional first argument to limit the returned template objects.
 * @param {object} [filter] - An optional filter object to limit the returned template objects
 * @param {string} [filter.id] - Optional template id to match on
 * @param {string} [filter.name] - Optional name to match on
 * @param {string} [filter.label] - Optional label to mactch on
 * @param {string} [filter.os] - Optional os to match on
 * @param {string} [filter.dtCreated] - Optional datatime created value to match on
 * @param {string} [filter.teamId] - Optional teamId to match on
 * @param {string} [filter.userId] - Optional userId to match on
 * @param {string} [filter.region] - Optional region to match on
 * @param {function} cb - Node-style error-first callback function
 * @returns {array} [ template, ... ] - JSON array of template objects
 * @example
 * paperspace.templates.list(function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace templates list
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /templates/geTemplates
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * // Example return value:
 *[
 *  // A public template:
 *  {
 *    "id": "t123abc",
 *    "name": "paperspace/t123abc",
 *    "label": "Windows 10",
 *    "os": "Windows 10 (Server 2016)",
 *    "dtCreated": "2017-01-03T23:41:06.801Z"
 *  },
 *  // A team-owned template:
 *  {
 *    "id": "t456def",
 *    "name": "t456def",
 *    "label": "New Template 1",
 *    "os": "Ubuntu 14.04.5 LTS; uname: 4.2.0-27-generic; distro: ubuntu; major: 14; minor: 04",
 *    "teamId": "te456def",
 *    "userId": null,
 *    "region": "East Coast (NY2)",
 *    "dtCreated": "2017-02-06T18:46:44.882Z"
 *  }
 *]
 */

function list(params, cb) {
  return method(list, params, cb);
}

assign(list, {
  auth: true,
  group: 'templates',
  name: 'list',
  method: 'get',
  route: '/templates/getTemplates',
  requires: {},
  returns: {}
});

module.exports = list;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @namespace users
 */

module.exports = {
  list: __webpack_require__(45)
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var method = __webpack_require__(1);
var assign = __webpack_require__(0);

/**
 * @memberof users
 * @method list
 * @description List information about all users available to either the current
 * authenticated user or the team, if the user belongs to a team.
 * The list method takes an optional first argument to limit the returned user objects.
 * @param {object} [filter] - An optional filter object to limit the returned user objects
 * @param {string} [filter.id] - Optional user id to match on
 * @param {string} [filter.email] - Optional email to match on
 * @param {string} [filter.firstname] - Optional firstname to mactch on
 * @param {string} [filter.lastname] - Optional lastname to match on
 * @param {string} [filter.dtCreated] - Optional datatime created value to match on
 * @param {string} [filter.teamId] - Optional teamId to match on
 * @param {function} cb - Node-style error-first callback function
 * @returns {array} [ user, ... ] - JSON array of user objects
 * @example
 * paperspace.users.list(function(err, resp) {
 *   // handle error or http response
 * });
 * @example
 * $ paperspace users list
 * @example
 * # HTTP request:
 * https://api.paperspace.io
 * GET /users/getUsers
 * x-api-key: 1ba4f98e7c0...
 * # Returns 200 on success
 * @example
 * //Example return value:
 * [
 *   {
 *     "id": "u123abc",
 *     "email": "jon@example.com",
 *     "firstname": "Jon",
 *     "lastname": "Snow",
 *     "dtCreated": "2017-04-15T16:20:59.609Z",
 *     "teamId": "te456def"
 *   },
 *   {
 *     "id": "u789ghi",
 *     "email": "jeff@example.com",
 *     "firstname": "Jeff",
 *     "lastname": "Green",
 *     "dtCreated": "2016-12-07T15:59:09.769Z",
 *     "teamId": "te456def"
 *   }
 * ]
 */

function list(params, cb) {
  return method(list, params, cb);
}

assign(list, {
  auth: true,
  group: 'users',
  name: 'list',
  method: 'get',
  route: '/users/getUsers',
  requires: {},
  returns: {}
});

module.exports = list;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Packages

var ms = __webpack_require__(10);
var chalk = __webpack_require__(4);

var error = function error(msg) {
  if (msg instanceof Error) {
    msg = msg.message;
  }

  console.error(chalk.red("> Error!") + " " + msg);
};

function handleError(err) {
  if (err.status === 403) {
    error("Authentication error. Run `now -L` or `now --login` to log-in again.");
  } else if (err.status === 429) {
    if (err.retryAfter === "never") {
      error(err.message);
    } else if (err.retryAfter === null) {
      error("Rate limit exceeded error. Please try later.");
    } else {
      error("Rate limit exceeded error. Try again in " + ms(err.retryAfter * 1000, { long: true }) + ", or upgrade your account by runnung " + ("" + chalk.gray("`") + chalk.cyan("now upgrade") + chalk.gray("`")));
    }
  } else if (err.userError) {
    error(err.message);
  } else if (err.status === 500) {
    error("Unexpected server error. Please retry.");
  } else {
    error("Unexpected error. Please try later. (" + err.message + ")");
  }
}

module.exports = {
  handleError: handleError,
  error: error
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _promise = __webpack_require__(48);

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = __webpack_require__(5);

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var loginUser = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, email, password) {
		var data, res, body;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						data = objectToQueryString({
							email: email,
							password: password
						});
						_context.next = 3;
						return fetch(url + '/users/login', {
							method: 'POST',
							headers: {
								// "Content-Length": Buffer.byteLength(data),
								'Content-Type': 'application/x-www-form-urlencoded',
								'User-Agent': ua
							},
							body: data
						});

					case 3:
						res = _context.sent;
						_context.next = 6;
						return res.json();

					case 6:
						body = _context.sent;

						if (!(res.status !== 200)) {
							_context.next = 9;
							break;
						}

						throw new Error('Verification error: ' + res.status + ' \u2013 ' + (0, _stringify2.default)(body));

					case 9:
						return _context.abrupt('return', body);

					case 10:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function loginUser(_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}();

var enterPassword = function () {
	var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
							var schema = {
								properties: {
									password: {
										hidden: true
									}
								}
							};

							prompt.start();

							prompt.get(schema, function (err, result) {
								if (err) return reject(new Error('Password error'));
								resolve(result.password);
							});
						}));

					case 1:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, this);
	}));

	return function enterPassword() {
		return _ref2.apply(this, arguments);
	};
}();

var register = function () {
	var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(url) {
		var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    _ref4$retryEmail = _ref4.retryEmail,
		    retryEmail = _ref4$retryEmail === undefined ? false : _ref4$retryEmail;

		var email, password, spinner, final, user;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						email = void 0;
						_context3.prev = 1;
						_context3.next = 4;
						return readEmail({ invalid: retryEmail });

					case 4:
						email = _context3.sent;
						_context3.next = 11;
						break;

					case 7:
						_context3.prev = 7;
						_context3.t0 = _context3['catch'](1);

						process.stdout.write('\n');
						throw _context3.t0;

					case 11:

						process.stdout.write('\n');

						if (validate(email)) {
							_context3.next = 14;
							break;
						}

						return _context3.abrupt('return', register(url, { retryEmail: true }));

					case 14:
						password = void 0;
						_context3.prev = 15;
						_context3.next = 18;
						return enterPassword();

					case 18:
						password = _context3.sent;
						_context3.next = 25;
						break;

					case 21:
						_context3.prev = 21;
						_context3.t1 = _context3['catch'](15);

						process.stdout.write('\n');
						throw _context3.t1;

					case 25:

						process.stdout.write('\n');

						spinner = ora({
							text: 'Logging in...'
						}).start();
						final = void 0;

						// await sleep(500);

						user = void 0;
						_context3.prev = 29;
						_context3.next = 32;
						return loginUser(url, email, password);

					case 32:
						user = _context3.sent;
						_context3.next = 39;
						break;

					case 35:
						_context3.prev = 35;
						_context3.t2 = _context3['catch'](29);

						spinner.stop();
						throw new Error('Couldn\'t retrieve user details ' + _context3.t2.message);

					case 39:

						spinner.text = 'Successfully logged in!';
						spinner.stopAndPersist('✔');

						process.stdout.write('\n');

						// console.log(user);

						return _context3.abrupt('return', {
							token: user.id,
							user: {
								email: user.user.email,
								id: user.user.id,
								teamId: user.user.teamId,
								handle: user.user.handle,
								firstName: user.user.firstName,
								lastName: user.user.lastName
							},
							lastUpdate: Date.now()
						});

					case 43:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, this, [[1, 7], [15, 21], [29, 35]]);
	}));

	return function register(_x4) {
		return _ref3.apply(this, arguments);
	};
}();

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

// Native
var os = __webpack_require__(6);

// Packages

var _require = __webpack_require__(49),
    stringifyQuery = _require.stringify;

var chalk = __webpack_require__(4);
var fetch = __webpack_require__(11);

var _require2 = __webpack_require__(50),
    validate = _require2.validate;

var readEmail = __webpack_require__(51);
var ora = __webpack_require__(52);
var prompt = __webpack_require__(53);
var qs = __webpack_require__(9);

// Ours
// const pkg = require('./pkg');
var ua = __webpack_require__(12);
var cfg = __webpack_require__(13);

function objectToQueryString(obj) {
	return qs.stringify(obj, { encode: false });
}

function sleep(ms) {
	return new _promise2.default(function (resolve, reject) {
		try {
			setTimeout(resolve, ms);
		} catch (err) {
			reject(new Error('no idea'));
		}
	});
}

module.exports = function () {
	var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(url) {
		var loginData;
		return _regenerator2.default.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.next = 2;
						return register(url);

					case 2:
						loginData = _context4.sent;
						_context4.next = 5;
						return cfg.merge(loginData);

					case 5:
						_context4.next = 7;
						return cfg.remove('currentTeam');

					case 7:
						_context4.next = 9;
						return cfg.remove('email');

					case 9:
						return _context4.abrupt('return', loginData.token);

					case 10:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, this);
	}));

	return function (_x6) {
		return _ref5.apply(this, arguments);
	};
}();

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("email-validator");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("email-prompt");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("ora");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("prompt");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("fs-promise");

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Gets all the info we have about an user
 *
 * @param  {Object} fetch    Optionally, _our_ `fetch` can be passed here
 * @param  {String} token    Only necessary if `fetch` is undefined
 * @param  {String} apiUrl   Only necessary if `fetch` is undefined
 * @param  {Boolean} filter  If `true`, the `filter` used will to the data
 *                           before returning
 * @return {Object}
 */
var get = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        fetch = _ref2.fetch,
        token = _ref2.token,
        _ref2$apiUrl = _ref2.apiUrl,
        apiUrl = _ref2$apiUrl === undefined ? "https://api.zeit.co" : _ref2$apiUrl,
        _ref2$filter = _ref2.filter,
        filter = _ref2$filter === undefined ? true : _ref2$filter;

    var headers, endpoint, url, res, json;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            headers = {};
            endpoint = "/www/user";
            url = fetch ? endpoint : apiUrl + endpoint;

            if (!fetch) {
              headers = {
                Authorization: "Bearer " + token
              };
              fetch = _fetch;
            }

            _context.prev = 4;
            _context.next = 7;
            return fetch(url, { headers: headers });

          case 7:
            res = _context.sent;
            _context.next = 10;
            return res.json();

          case 10:
            json = _context.sent;

            if (!filter) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", _filter(json));

          case 13:
            return _context.abrupt("return", json);

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](4);
            return _context.abrupt("return", {});

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 16]]);
  }));

  return function get() {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _fetch = __webpack_require__(11);

function _filter(data) {
  data = data.user;

  return {
    uid: data.uid,
    username: data.username,
    email: data.email
  };
}

module.exports = {
  get: get,
  filter: _filter
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable import/no-unresolved */

// let pkg;
// try {
//   pkg = require("../package.json");
// } catch (err) {
//   pkg = require("../../package.json");
// }

var pkg = __webpack_require__(7);

module.exports = pkg;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var chalk = __webpack_require__(4);
var logo = 'PS';
var DEETS_NOTE = 'See https://paperspace.github.io/paperspace-node for details';

module.exports = function () {
    console.log('\n  ' + chalk.bold('' + logo) + ' [options] <command | path>\n\n  ' + chalk.dim("Commands:") + '\n\n    ' + chalk.dim("Machines") + '\n      create                  [options]      Deploy a new job ' + chalk.bold("(default)") + '\n      destroy                 [id]           Destroy a machine\n      list                    [cmd]          List all machines\n      restart                 [id]           Restart a machine\n      show                    [cmd]          Show a machine\'s details\n      start                   [id]           Start a machine\n      stop                    [id]           Stop a machine\n      utilization             [cmd]          Show utilization\n      waitfor                 [cmd]          Wait for a machine to change state\n\n    ' + chalk.dim("Networks") + '\n      list\n\n    ' + chalk.dim("Scripts") + '\n      create\n      destroy\n      list\n      show\n      text\n\n    ' + chalk.dim("Templates") + '\n      list\n\n    ' + chalk.dim("Users") + '\n      list\n\n    ' + chalk.dim("Jobs") + ' ' + chalk.blue("NEW") + ' \n\n      run                  [path]      Deploy a new job ' + chalk.bold("(default)") + '\n      ls | list            [app]       List jobs\n      rm | remove          [id]        Remove a job\n      logs                 [url]       Displays the logs for a job\n      stop                 [args]      Scales the instance count of a job\n      help                 [cmd]       Displays complete help for [cmd]\n\n    ' + chalk.dim("Administrative") + '\n\n      login                            Login into your account or creates a new one\n      logout                           Logout from your account\n\n  ' + chalk.dim("Options:") + '\n\n    -h, --help                Output usage information\n    -v, --version             Output the version number\n    -t ' + chalk.underline("TOKEN") + ', --token=' + chalk.underline("TOKEN") + '   Login token\n    -L, --login               Configure login\n\n\t---\n\t' + chalk.dim(DEETS_NOTE) + '\n\n  ' + chalk.dim("Examples:") + '\n\n  ' + chalk.gray("–") + ' Create a cloud IDE\n\n    ' + chalk.cyan("$ paperspace create") + '\n    ' + chalk.cyan("$") + ' ' + chalk.green("Success!") + ' ' + chalk.white("Your new machine is running! 🌈") + '\n    ' + chalk.dim("Connect through a terminal:") + ' ' + chalk.white("`ssh root@101.12.12.14`") + '\n    ' + chalk.dim("Open desktop in a web browser") + ' ' + chalk.white.underline("https://www.paperspace.com/desktop/ps6hu89a") + '\n    ' + chalk.dim("-------------------------") + '\n    ' + chalk.bold("Machine") + '\n    ' + chalk.white("id:") + '  ' + chalk.white("ps6hu89a") + '   ' + chalk.white("cpu: ") + ' ' + chalk.white("4") + '\n    ' + chalk.white("RAM:") + ' ' + chalk.white("16GB") + '       ' + chalk.white("HD: ") + '  ' + chalk.white("50GB") + '\n\n    ' + chalk.bold("GPU") + '\n    ' + chalk.white("Nvidia Tesla P5000 (8GB)") + '\n\n  ' + chalk.gray("–") + ' Create a jupyter notebook with GPU\n\n    ' + chalk.cyan("$ paperspace create jupyter") + '\n    ' + chalk.cyan("$") + ' ' + chalk.green("Success!") + ' ' + chalk.white("Your notebook is running! 🌈") + '\n    ' + chalk.dim("Open desktop in a web browser") + ' ' + chalk.white.underline("https://101.12.12.14:2083") + '\n    ' + chalk.dim("-------------------------") + '\n    ' + chalk.bold("Machine") + '\n    ' + chalk.white("id:") + '  ' + chalk.white("ps6hu89a") + '   ' + chalk.white("cpu: ") + ' ' + chalk.white("4") + '\n    ' + chalk.white("RAM:") + ' ' + chalk.white("16GB") + '       ' + chalk.white("HD: ") + '  ' + chalk.white("50GB") + '\n\n    ' + chalk.bold("GPU") + '\n    ' + chalk.white("Nvidia Tesla P5000 (8GB)") + '\n    ' + chalk.dim("-------------------------") + '\n\n    ' + chalk.magenta("Opening browser now...") + '\n\n  ' + chalk.gray("–") + ' Create a jupyter notebook (CPU only)\n\n    ' + chalk.cyan("$ paperspace create jupyter --c4") + '\n    ' + chalk.cyan("$") + ' ' + chalk.green("Success!") + ' ' + chalk.white("Your notebook is running! 🌈") + '\n    ' + chalk.dim("Open desktop in a web browser") + ' ' + chalk.white.underline("https://101.12.12.14:2083") + '\n    ' + chalk.dim("-------------------------") + '\n    ' + chalk.bold("Machine") + '\n    ' + chalk.white("id:") + '  ' + chalk.white("ps6hu89a") + '   ' + chalk.white("cpu: ") + ' ' + chalk.white("4") + '\n    ' + chalk.white("RAM:") + ' ' + chalk.white("16GB") + '       ' + chalk.white("HD: ") + '  ' + chalk.white("50GB") + '\n\n    ' + chalk.magenta("Opening browser now...") + '\n');
};

// help();

/***/ })
/******/ ]);