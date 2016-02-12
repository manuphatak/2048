module.exports =
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
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  __webpack_require__(68);
  module.exports = __webpack_require__(55);


/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("immutable");

/***/ },
/* 3 */
/***/ function(module, exports) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var NEW_GAME = exports.NEW_GAME = 'NEW_GAME';
  var SHIFT_LEFT = exports.SHIFT_LEFT = 'SHIFT_LEFT';
  var SHIFT_RIGHT = exports.SHIFT_RIGHT = 'SHIFT_RIGHT';
  var SHIFT_UP = exports.SHIFT_UP = 'SHIFT_UP';
  var SHIFT_DOWN = exports.SHIFT_DOWN = 'SHIFT_DOWN';
  var CREATE_TILE = exports.CREATE_TILE = 'CREATE_TILE';
  var SET_STATE_INIT = exports.SET_STATE_INIT = 'SET_STATE_INIT';
  var SET_STATE_COMPLETE = exports.SET_STATE_COMPLETE = 'SET_STATE_COMPLETE';

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.INITIAL_STATE = undefined;

  var _immutable = __webpack_require__(2);

  var U = undefined;

  var INITIAL_STATE = exports.INITIAL_STATE = (0, _immutable.fromJS)({
    isLoading: false,

    game: {
      state: [// :off
      [U, U, U, U], [U, U, U, U], [U, U, U, U], [U, U, U, U]] }
  });

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/ExecutionEnvironment");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.handleNewGame = handleNewGame;
  exports.handleShiftLeft = handleShiftLeft;
  exports.handleShiftRight = handleShiftRight;
  exports.handleShiftDown = handleShiftDown;
  exports.handleShiftUp = handleShiftUp;
  exports.handleCreateTile = handleCreateTile;
  exports.setState = setState;

  var _actions = __webpack_require__(3);

  var ACTION = _interopRequireWildcard(_actions);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

  function handleNewGame() {
    return { type: ACTION.NEW_GAME };
  }

  function handleShiftLeft() {
    return { type: ACTION.SHIFT_LEFT };
  }

  function handleShiftRight() {
    return { type: ACTION.SHIFT_RIGHT };
  }

  function handleShiftDown() {
    return { type: ACTION.SHIFT_DOWN };
  }

  function handleShiftUp() {
    return { type: ACTION.SHIFT_UP };
  }

  function handleCreateTile(payload) {
    return {
      type: ACTION.CREATE_TILE, payload: payload
    };
  }

  function setStateInit() {
    return { type: ACTION.SET_STATE_INIT };
  }

  function setStateComplete(payload) {
    return {
      type: ACTION.SET_STATE_COMPLETE, payload: payload
    };
  }

  function setState(get) {
    var _this2 = this;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(dispatch) {
        var state;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dispatch(setStateInit());
                _context.next = 3;
                return get.apply(undefined, args);

              case 3:
                state = _context.sent;

                dispatch(setStateComplete(state));

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })),
          _this = _this2;

      return function (_x) {
        return ref.apply(_this, arguments);
      };
    }();
  }

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  var _reactAddonsPureRenderMixin = __webpack_require__(74);

  var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var PureComponent = function (_React$Component) {
    _inherits(PureComponent, _React$Component);

    function PureComponent(props) {
      _classCallCheck(this, PureComponent);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PureComponent).call(this, props));

      _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
      return _this;
    }

    return PureComponent;
  }(_react2.default.Component);

  exports.default = PureComponent;

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("react-motion");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("redux");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.tileFactory = tileFactory;
  exports.transpose = transpose;
  exports.shift = shift;

  var _immutable = __webpack_require__(2);

  var _nodeUuid = __webpack_require__(14);

  var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function tileFactory(value, col, row, id) {
    return (0, _immutable.fromJS)({ value: value, col: col, row: row, id: id || _nodeUuid2.default.v4() });
  }

  function transpose(state) {
    return state.asMutable().update(function (value) {
      return value.map(function (col, index) {
        return state.map(function (row) {
          return row.get(index);
        });
      });
    }).asImmutable();
  }

  function shift() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? (0, _immutable.List)() : arguments[0];

    return state.update(function (value) {
      return _shift(undefined, value.toStack());
    }).toList().setSize(state.size);
  }

  function _shift(x) {
    var xs = arguments.length <= 1 || arguments[1] === undefined ? (0, _immutable.Stack)() : arguments[1];

    // Guard last item.
    if (!xs.size) {
      return xs.withMutations(function (stack) {
        return stack.unshift(x);
      });
    }

    // Guard shift undefined
    if (!x) {
      return _shift(xs.first(), xs.shift());
    }

    // Guard next is undefined
    if (!xs.first()) {
      return _shift(x, xs.shift());
    }

    // next
    var y = xs.first();
    var ys = xs.shift();

    // combine blocks
    if (x.get('value') === y.get('value')) {
      return _shift(ys.first(), ys.shift()).withMutations(function (stack) {
        return stack.unshift(y.update('value', function (v) {
          return v * 2;
        }));
      });
    }

    // concat blocks
    return _shift(y, ys).withMutations(function (stack) {
      return stack.unshift(x);
    });
  }

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createRandomTileAction = createRandomTileAction;
  exports.randomTileQuantity = randomTileQuantity;

  var _lodash = __webpack_require__(73);

  var _lodash2 = _interopRequireDefault(_lodash);

  var _lodash3 = __webpack_require__(13);

  var _lodash4 = _interopRequireDefault(_lodash3);

  var _actionCreators = __webpack_require__(6);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function createRandomTileAction(gameState) {
    var quantity = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

    // get empty tiles
    var emptyTiles = gameState.getEmptyTiles().toJS();

    // Guard, no empty tiles
    if (!emptyTiles.length) {
      return undefined;
    }

    // choose random tiles from the grid
    var randomTileSample = (0, _lodash2.default)(emptyTiles, Math.min(quantity, emptyTiles.length));

    // create tiles
    var newTiles = randomTileSample.map(function (tile) {
      return (0, _lodash4.default)(tile, { value: randomTileValue() });
    });

    return (0, _actionCreators.handleCreateTile)(newTiles);
  }

  function randomTileValue() {
    var random = Math.random();
    if (random >= 0.95) {
      return 8;
    }
    if (random >= 0.70) {
      return 4;
    }
    return 2;
  }

  function randomTileQuantity() {
    return Math.random() > 0.75 ? 3 : 2;
  }

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ExecutionEnvironment = __webpack_require__(5);

  var _createBrowserHistory = __webpack_require__(70);

  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

  var _useQueries = __webpack_require__(71);

  var _useQueries2 = _interopRequireDefault(_useQueries);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var location = _ExecutionEnvironment.canUseDOM ? (0, _useQueries2.default)(_createBrowserHistory2.default)() : {};

  exports.default = location;

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("lodash.merge");

/***/ },
/* 14 */
/***/ function(module, exports) {

  module.exports = require("node-uuid");

/***/ },
/* 15 */
/***/ function(module, exports) {

  module.exports = require("react-immutable-proptypes");

/***/ },
/* 16 */
/***/ function(module, exports) {

  module.exports = require("react-redux");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shiftLeft = shiftLeft;
  exports.shiftUp = shiftUp;
  exports.shiftRight = shiftRight;
  exports.shiftDown = shiftDown;
  exports.newGame = newGame;
  exports.pushTiles = pushTiles;
  exports.refreshGameTiles = refreshGameTiles;

  var _immutable = __webpack_require__(2);

  var _utils = __webpack_require__(10);

  var _constants = __webpack_require__(4);

  function shiftLeft() {
    var gameState = arguments.length <= 0 || arguments[0] === undefined ? (0, _immutable.List)() : arguments[0];

    return gameState.update(function (value) {
      return value.map(_utils.shift);
    });
  }

  function shiftUp() {
    var gameState = arguments.length <= 0 || arguments[0] === undefined ? (0, _immutable.List)() : arguments[0];

    return gameState.update(function (value) {
      return (0, _utils.transpose)(shiftLeft((0, _utils.transpose)(value)));
    });
  }

  function shiftRight() {
    var gameState = arguments.length <= 0 || arguments[0] === undefined ? (0, _immutable.List)() : arguments[0];

    return gameState.update(function (value) {
      return value.map(function (col) {
        return (0, _utils.shift)(col.reverse()).reverse();
      });
    });
  }

  function shiftDown() {
    var gameState = arguments.length <= 0 || arguments[0] === undefined ? (0, _immutable.List)() : arguments[0];

    return gameState.update(function (value) {
      return (0, _utils.transpose)(shiftRight((0, _utils.transpose)(value)));
    });
  }

  function newGame() {
    return _constants.INITIAL_STATE.getIn(['game', 'state']);
  }

  function pushTiles(tiles) {
    return function (gameState) {
      return gameState.withMutations(function (updater) {
        tiles.forEach(pushTile(updater));
        return updater;
      });
    };

    function pushTile(state) {
      return function (tile) {
        var keyPath = [tile.get('row'), tile.get('col')];

        if (state.getIn(keyPath)) {
          return undefined;
        }

        state.setIn(keyPath, tile.set('isNew', true));
      };
    }
  }

  function refreshGameTiles(gameState) {
    return gameState.update(function (updater) {
      return updater.map(function (row, rowIndex) {
        return row.map(function (tile, colIndex) {
          return tile ? tile.updateGrid(colIndex, rowIndex, false) : undefined;
        });
      });
    });
  }

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _redux = __webpack_require__(9);

  var _reduxThunk = __webpack_require__(78);

  var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

  var _loggerMiddleware = __webpack_require__(19);

  var _loggerMiddleware2 = _interopRequireDefault(_loggerMiddleware);

  var _shiftTileMiddleware = __webpack_require__(23);

  var _shiftTileMiddleware2 = _interopRequireDefault(_shiftTileMiddleware);

  var _newGameMiddleware = __webpack_require__(22);

  var _newGameMiddleware2 = _interopRequireDefault(_newGameMiddleware);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = _redux.applyMiddleware.bind(null, _reduxThunk2.default, _newGameMiddleware2.default, _shiftTileMiddleware2.default, _loggerMiddleware2.default);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  var _ExecutionEnvironment = __webpack_require__(5);

  if (_ExecutionEnvironment.canUseDOM && ("production") !== 'production') {
    module.exports = __webpack_require__(20);
  } else {
    module.exports = __webpack_require__(21);
  }

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _reduxLogger = __webpack_require__(77);

  var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = (0, _reduxLogger2.default)({
    stateTransformer: function stateTransformer(state) {
      return state.toJS();
    },


    duration: true,

    collapsed: true
  });

/***/ },
/* 21 */
/***/ function(module, exports) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    return function (next) {
      return function (action) {
        return next(action);
      };
    };
  };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _utils = __webpack_require__(11);

  var _actions = __webpack_require__(3);

  var ACTION = _interopRequireWildcard(_actions);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  exports.default = function (store) {
    return function (next) {
      return function (action) {
        // setup
        var handle = next(action);

        // Guard, uninteresting actions.
        if (action.type !== ACTION.NEW_GAME) {
          return handle;
        }

        // next
        var nextGameState = store.getState().getIn(['game', 'state']);

        // create action to create a few new tile.
        var newTilesAction = (0, _utils.createRandomTileAction)(nextGameState, (0, _utils.randomTileQuantity)());

        // Guard, couldn't create a new tile.  (Board is full.)
        if (!newTilesAction) {
          console.error('no empty tiles', 'newTilesAction', newTilesAction);
          return handle;
        }

        // dispatch action.
        return next(newTilesAction);
      };
    };
  };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _utils = __webpack_require__(11);

  var _actions = __webpack_require__(3);

  var ACTION = _interopRequireWildcard(_actions);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  var watchActions = [ACTION.SHIFT_DOWN, ACTION.SHIFT_LEFT, ACTION.SHIFT_UP, ACTION.SHIFT_RIGHT];

  exports.default = function (store) {
    return function (next) {
      return function (action) {
        // setup
        var gameState = store.getState().getIn(['game', 'state']);
        var handle = next(action);

        // Guard, uninteresting actions.
        if (!watchActions.includes(action.type)) {
          return handle;
        }

        // next
        var nextGameState = store.getState().getIn(['game', 'state']);

        // Guard, no change.
        if (gameState.equals(nextGameState)) {
          return handle;
        }

        // create action to create one new tile.
        var newTileAction = (0, _utils.createRandomTileAction)(nextGameState, 1);

        // Guard, couldn't create a new tile.  (Board is full.)
        if (!newTileAction) {
          console.error('no empty tiles', 'newTile', newTileAction);
          return handle;
        }

        // dispatch action.
        return next(newTileAction);
      };
    };
  };

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _reduxImmutable = __webpack_require__(76);

  var _game = __webpack_require__(25);

  var _game2 = _interopRequireDefault(_game);

  var _root = __webpack_require__(26);

  var _root2 = _interopRequireDefault(_root);

  var _utils = __webpack_require__(27);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var isLoading = function isLoading(state) {
    return state;
  };

  exports.default = (0, _utils.includeRootReducer)(_root2.default, (0, _reduxImmutable.combineReducers)({ game: _game2.default, isLoading: isLoading }));

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = gameReducer;

  var _core = __webpack_require__(17);

  var _constants = __webpack_require__(4);

  var _actions = __webpack_require__(3);

  var ACTION = _interopRequireWildcard(_actions);

  var _utils = __webpack_require__(10);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  var INITIAL_GAME_STATE = _constants.INITIAL_STATE.get('game');

  function gameReducer() {
    var game = arguments.length <= 0 || arguments[0] === undefined ? INITIAL_GAME_STATE : arguments[0];
    var action = arguments[1];

    switch (action.type) {
      case ACTION.NEW_GAME:
        return game.update('state', _core.newGame);
      case ACTION.SHIFT_LEFT:
        return game.update('state', _core.shiftLeft).update('state', _core.refreshGameTiles);
      case ACTION.SHIFT_RIGHT:
        return game.update('state', _core.shiftRight).update('state', _core.refreshGameTiles);
      case ACTION.SHIFT_UP:
        return game.update('state', _core.shiftUp).update('state', _core.refreshGameTiles);
      case ACTION.SHIFT_DOWN:
        return game.update('state', _core.shiftDown).update('state', _core.refreshGameTiles);
      case ACTION.CREATE_TILE:
        // eslint-disable-line no-case-declarations
        var newTiles = action.payload.map(function (_ref) {
          var value = _ref.value;
          var col = _ref.col;
          var row = _ref.row;
          var id = _ref.id;
          return (0, _utils.tileFactory)(value, col, row, id);
        });
        return game.update('state', _core.refreshGameTiles).update('state', (0, _core.pushTiles)(newTiles));
      default:
        return game;
    }
  }

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = root;

  var _immutable = __webpack_require__(2);

  var _actions = __webpack_require__(3);

  var ACTIONS = _interopRequireWildcard(_actions);

  var _constants = __webpack_require__(4);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  function root() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? (0, _immutable.Map)() : arguments[0];
    var action = arguments[1];

    switch (action.type) {
      case ACTIONS.SET_STATE_INIT:
        return _constants.INITIAL_STATE.set('isLoading', true);

      case ACTIONS.SET_STATE_COMPLETE:
        return state.merge(action.payload).set('isLoading', false).updateIn(['game', 'state'], function (gameState) {
          return gameState.withMutations(function (mutableState) {
            return mutableState.map(function (row) {
              return row.map(function (cell) {
                return cell === null ? undefined : cell;
              });
            });
          });
        });
      default:
        return state;
    }
  }

/***/ },
/* 27 */
/***/ function(module, exports) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var includeRootReducer = exports.includeRootReducer = function includeRootReducer(rootReducer, mainReducer) {
    return function (initialState, action) {
      return mainReducer(rootReducer(initialState, action), action);
    };
  };

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  if (true) {
    module.exports = __webpack_require__(29);
  } else {
    module.exports = require('./configureStore.dev');
  }

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = makeStore;

  var _redux = __webpack_require__(9);

  var _reducers = __webpack_require__(24);

  var _reducers2 = _interopRequireDefault(_reducers);

  var _constants = __webpack_require__(4);

  var _middleware = __webpack_require__(18);

  var _middleware2 = _interopRequireDefault(_middleware);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function makeStore() {
    var initialState = arguments.length <= 0 || arguments[0] === undefined ? _constants.INITIAL_STATE : arguments[0];

    var enhancer = (0, _redux.compose)((0, _middleware2.default)());
    return (0, _redux.createStore)(_reducers2.default, initialState, enhancer);
  }

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  var _Layout = __webpack_require__(37);

  var _Layout2 = _interopRequireDefault(_Layout);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
      _classCallCheck(this, App);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
    }

    _createClass(App, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var children = _props.children;

        var props = _objectWithoutProperties(_props, ['children']);

        return _react2.default.createElement(
          _Layout2.default,
          props,
          children
        );
      }
    }]);

    return App;
  }(_react.Component);

  App.propTypes = {
    children: _react.PropTypes.element.isRequired
  };
  exports.default = App;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Game = undefined;

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  var _reactImmutableProptypes = __webpack_require__(15);

  var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

  var _redux = __webpack_require__(9);

  var _reactRedux = __webpack_require__(16);

  var _PureComponent2 = __webpack_require__(7);

  var _PureComponent3 = _interopRequireDefault(_PureComponent2);

  var _actionCreators = __webpack_require__(6);

  var actionCreators = _interopRequireWildcard(_actionCreators);

  var _GameGrid = __webpack_require__(32);

  var _GameGrid2 = _interopRequireDefault(_GameGrid);

  var _GameTiles = __webpack_require__(34);

  var _GameTiles2 = _interopRequireDefault(_GameTiles);

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Game = function (_PureComponent) {
    _inherits(Game, _PureComponent);

    function Game(props) {
      _classCallCheck(this, Game);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this, props));

      _this.onKeyDown = _this.onKeyDown.bind(_this);
      _this.keymap = {
        37: function _(e) {
          return _this.props.actions.handleShiftLeft(e);
        },
        38: function _(e) {
          return _this.props.actions.handleShiftUp(e);
        },
        39: function _(e) {
          return _this.props.actions.handleShiftRight(e);
        },
        40: function _(e) {
          return _this.props.actions.handleShiftDown(e);
        }
      };
      return _this;
    }

    _createClass(Game, [{
      key: 'render',
      value: function render() {
        var _props$actions = this.props.actions;
        var handleShiftLeft = _props$actions.handleShiftLeft;
        var handleShiftRight = _props$actions.handleShiftRight;
        var handleShiftUp = _props$actions.handleShiftUp;
        var handleShiftDown = _props$actions.handleShiftDown;
        var handleNewGame = _props$actions.handleNewGame;
        var tiles = this.props.tiles;


        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            { className: 'buttons' },
            _react2.default.createElement(
              'button',
              { onClick: handleShiftLeft },
              'Left'
            ),
            _react2.default.createElement(
              'button',
              { onClick: handleShiftRight },
              'Right'
            ),
            _react2.default.createElement(
              'button',
              { onClick: handleShiftDown },
              'Down'
            ),
            _react2.default.createElement(
              'button',
              { onClick: handleShiftUp },
              'Up'
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'button',
              { className: 'new-game', onClick: handleNewGame },
              'New Game'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'game' },
            _react2.default.createElement(_GameGrid2.default, null),
            _react2.default.createElement(_GameTiles2.default, { tiles: tiles })
          )
        );
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown, false);
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        // this.props.actions.handleNewGame();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown, false);
      }
    }, {
      key: 'onKeyDown',
      value: function onKeyDown(event) {
        var handler = this.keymap[event.keyCode];

        if (!handler) {
          return undefined;
        }

        event.preventDefault();
        handler(event);
      }
    }]);

    return Game;
  }(_PureComponent3.default);

  Game.propTypes = {
    actions: _react.PropTypes.shape({
      handleShiftLeft: _react.PropTypes.func.isRequired,
      handleShiftRight: _react.PropTypes.func.isRequired,
      handleShiftDown: _react.PropTypes.func.isRequired,
      handleShiftUp: _react.PropTypes.func.isRequired,
      handleNewGame: _react.PropTypes.func.isRequired
    }),

    value: _react.PropTypes.number.isRequired,

    tiles: _reactImmutableProptypes2.default.setOf(_reactImmutableProptypes2.default.map).isRequired
  };


  function mapStateToProps(state) {
    return { // :off
      value: state.get('value', 0),
      tiles: state.getIn(['game', 'state']).toTileSet(),
      isLoading: state.get('isLoading')
    }; // :on
  }

  function mapDispatchToProps(dispatch) {
    return { actions: (0, _redux.bindActionCreators)(actionCreators, dispatch) };
  }

  exports.Game = Game;
  exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Game);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = function () {
    return _react2.default.createElement(
      "div",
      { className: "grid-container" },
      _react2.default.createElement(
        "div",
        { className: "grid-row" },
        _react2.default.createElement("div", { className: "grid-cell" }),
        _react2.default.createElement("div", { className: "grid-cell" }),
        _react2.default.createElement("div", { className: "grid-cell" }),
        _react2.default.createElement("div", { className: "grid-cell" })
      ),
      _react2.default.createElement(
        "div",
        { className: "grid-row" },
        _react2.default.createElement("div", { className: "grid-cell" }),
        _react2.default.createElement("div", { className: "grid-cell" }),
        _react2.default.createElement("div", { className: "grid-cell" }),
        _react2.default.createElement("div", { className: "grid-cell" })
      ),
      _react2.default.createElement(
        "div",
        { className: "grid-row" },
        _react2.default.createElement("div", { className: "grid-cell" }),
        _react2.default.createElement("div", { className: "grid-cell" }),
        _react2.default.createElement("div", { className: "grid-cell" }),
        _react2.default.createElement("div", { className: "grid-cell" })
      ),
      _react2.default.createElement(
        "div",
        { className: "grid-row" },
        _react2.default.createElement("div", { className: "grid-cell" }),
        _react2.default.createElement("div", { className: "grid-cell" }),
        _react2.default.createElement("div", { className: "grid-cell" }),
        _react2.default.createElement("div", { className: "grid-cell" })
      )
    );
  };

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  var _reactMotion = __webpack_require__(8);

  var _reactImmutableProptypes = __webpack_require__(15);

  var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

  var _classnames = __webpack_require__(69);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _PureComponent2 = __webpack_require__(7);

  var _PureComponent3 = _interopRequireDefault(_PureComponent2);

  var _constants = __webpack_require__(36);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var GameTile = function (_PureComponent) {
    _inherits(GameTile, _PureComponent);

    function GameTile() {
      _classCallCheck(this, GameTile);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(GameTile).apply(this, arguments));
    }

    _createClass(GameTile, [{
      key: 'render',
      value: function render() {
        var _props$tile$toObject = this.props.tile.toObject();

        var row = _props$tile$toObject.row;
        var col = _props$tile$toObject.col;
        var value = _props$tile$toObject.value;
        var id = _props$tile$toObject.id;

        var defaultStyle = {
          left: _constants.CELL_SPACE * col, top: _constants.CELL_SPACE * row, scale: 0
        };

        var style = { // :off
          left: (0, _reactMotion.spring)(_constants.CELL_SPACE * col, _constants.tileSlideConfig),
          top: (0, _reactMotion.spring)(_constants.CELL_SPACE * row, _constants.tileSlideConfig),
          scale: (0, _reactMotion.spring)(1, _constants.tileNewConfig)
        }; // :on
        var tileClass = (0, _classnames2.default)( // :off
        'tile', 'tile-value-' + this.getValueText(value)); // :on

        return _react2.default.createElement(
          _reactMotion.Motion,
          {
            defaultStyle: defaultStyle,
            style: style
          },
          this.renderTile.bind(this, { tileClass: tileClass, value: value, id: id })
        );
      }
    }, {
      key: 'renderTile',
      value: function renderTile(_ref, style) {
        var tileClass = _ref.tileClass;
        var value = _ref.value;
        var id = _ref.id;

        return _react2.default.createElement(
          'div',
          {
            key: id,
            className: tileClass,
            style: _extends({ transform: 'scale(' + style.scale + ')' }, style)
          },
          _react2.default.createElement(
            'div',
            { className: 'tile-inner' },
            value
          )
        );
      }
    }, {
      key: 'getValueText',
      value: function getValueText(value) {
        return value <= 2048 ? value : 'super';
      }
    }]);

    return GameTile;
  }(_PureComponent3.default);

  GameTile.propTypes = {
    tile: _reactImmutableProptypes2.default.contains({
      value: _react.PropTypes.number.isRequired,
      row: _react.PropTypes.number.isRequired,
      col: _react.PropTypes.number.isRequired,
      id: _react.PropTypes.string.isRequired,
      isNew: _react.PropTypes.bool.isRequired
    })
  };
  exports.default = GameTile;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  var _PureComponent2 = __webpack_require__(7);

  var _PureComponent3 = _interopRequireDefault(_PureComponent2);

  var _GameTile = __webpack_require__(33);

  var _GameTile2 = _interopRequireDefault(_GameTile);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var GameTiles = function (_PureComponent) {
    _inherits(GameTiles, _PureComponent);

    function GameTiles() {
      _classCallCheck(this, GameTiles);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(GameTiles).apply(this, arguments));
    }

    _createClass(GameTiles, [{
      key: 'render',
      value: function render() {
        var tiles = this.props.tiles;

        return _react2.default.createElement(
          'div',
          { className: 'tile-container' },
          tiles.map(this.renderTile)
        );
      }
    }, {
      key: 'renderTile',
      value: function renderTile(tile) {
        return _react2.default.createElement(_GameTile2.default, {
          tile: tile,
          key: tile.get('id')
        });
      }
    }]);

    return GameTiles;
  }(_PureComponent3.default);

  exports.default = GameTiles;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  __webpack_require__(56);

  var _Game = __webpack_require__(31);

  var _Game2 = _interopRequireDefault(_Game);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = _Game2.default;

/***/ },
/* 36 */
/***/ function(module, exports) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var CELL_SPACE = exports.CELL_SPACE = 121;
  var tileSlideConfig = exports.tileSlideConfig = { stiffness: 210, damping: 18 };
  var tileNewConfig = exports.tileNewConfig = { stiffness: 210, damping: 15 };

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  var _Navigation = __webpack_require__(39);

  var _Navigation2 = _interopRequireDefault(_Navigation);

  __webpack_require__(57);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Layout = function (_Component) {
    _inherits(Layout, _Component);

    function Layout() {
      _classCallCheck(this, Layout);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Layout).apply(this, arguments));
    }

    _createClass(Layout, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'Layout' },
          _react2.default.createElement(_Navigation2.default, null),
          this.props.children
        );
      }
    }]);

    return Layout;
  }(_react.Component);

  Layout.propTypes = {
    children: _react.PropTypes.element.isRequired
  };
  exports.default = Layout;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  var _Location = __webpack_require__(12);

  var _Location2 = _interopRequireDefault(_Location);

  __webpack_require__(58);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  function isLeftClickEvent(event) {
    return event.button === 0;
  }

  function isModifiedEvent(event) {
    // noinspection OverlyComplexBooleanExpressionJS
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }

  var Link = function (_Component) {
    _inherits(Link, _Component);

    function Link() {
      _classCallCheck(this, Link);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Link).apply(this, arguments));
    }

    _createClass(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var to = _props.to;
        var children = _props.children;

        var props = _objectWithoutProperties(_props, ['to', 'children']);

        return _react2.default.createElement(
          'a',
          _extends({ onClick: Link.handleClick.bind(this) }, props),
          children
        );
      }
    }]);

    return Link;
  }(_react.Component);

  Link.propTypes = {
    to: _react.PropTypes.string.isRequired,
    children: _react.PropTypes.element.isRequired,
    state: _react.PropTypes.object,
    onClick: _react.PropTypes.func
  };

  Link.handleClick = function (event) {
    var allowTransition = true;
    var clickResult = undefined;

    if (undefined.props && undefined.props.onClick) {
      clickResult = undefined.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (clickResult === false || event.defaultPrevented === true) {
      allowTransition = false;
    }

    event.preventDefault();

    if (allowTransition) {
      var link = event.currentTarget;
      _Location2.default.pushState(undefined.props && undefined.props.state || null, undefined.props && undefined.props.to || link.pathname + link.search);
    }
  };

  exports.default = Link;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  var _Link = __webpack_require__(38);

  var _Link2 = _interopRequireDefault(_Link);

  __webpack_require__(59);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Navigation = function (_Component) {
    _inherits(Navigation, _Component);

    function Navigation() {
      _classCallCheck(this, Navigation);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Navigation).apply(this, arguments));
    }

    _createClass(Navigation, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'ul',
          {
            className: 'Navigation',
            role: 'menu'
          },
          _react2.default.createElement(
            'li',
            { className: 'Navigation-item' },
            _react2.default.createElement(
              'a',
              {
                className: 'Navigation-link',
                href: '/',
                onClick: _Link2.default.handleClick
              },
              'Home'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'Navigation-item' },
            _react2.default.createElement(
              'a',
              {
                className: 'Navigation-link',
                href: '/about',
                onClick: _Link2.default.handleClick
              },
              'About'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'Navigation-item' },
            _react2.default.createElement(
              'a',
              {
                className: 'Navigation-link',
                href: '/photo',
                onClick: _Link2.default.handleClick
              },
              'PhotoGallery'
            )
          )
        );
      }
    }]);

    return Navigation;
  }(_react.Component);

  exports.default = Navigation;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  __webpack_require__(60);

  var _reactMotion = __webpack_require__(8);

  var _images = __webpack_require__(41);

  var _images2 = _interopRequireDefault(_images);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var springSettings = {
    stiffness: 170,
    damping: 26
  };

  var Photo = function (_Component) {
    _inherits(Photo, _Component);

    function Photo(props) {
      _classCallCheck(this, Photo);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Photo).call(this, props));

      _this.state = { // :off
        photos: [[500, 350], [800, 600], [800, 400], [700, 500], [200, 650], [600, 600]], // :on
        currentPhoto: 0
      };
      _this.handleChange = _this.handleChange.bind(_this);
      return _this;
    }

    _createClass(Photo, [{
      key: 'render',
      value: function render() {
        var _state = this.state;
        var photos = _state.photos;
        var currentPhoto = _state.currentPhoto;

        var _photos$currentPhoto = _slicedToArray(photos[currentPhoto], 2);

        var currentWidth = _photos$currentPhoto[0];
        var currentHeight = _photos$currentPhoto[1];


        var widths = photos.map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2);

          var originalWidth = _ref2[0];
          var originalHeight = _ref2[1];
          return currentHeight / originalHeight * originalWidth;
        });

        var leftStartCoords = widths.slice(0, currentPhoto).reduce(function (sum, width) {
          return sum - width;
        }, 0);

        var configs = [];
        photos.reduce(function (prevLeft, _ref3, index) {
          var _ref4 = _slicedToArray(_ref3, 2);

          var originalWidth = _ref4[0];
          var originalHeight = _ref4[1];

          configs.push({
            left: (0, _reactMotion.spring)(prevLeft, springSettings),
            height: (0, _reactMotion.spring)(currentHeight, springSettings),
            width: (0, _reactMotion.spring)(widths[index], springSettings)
          });
          return prevLeft + widths[index];
        }, leftStartCoords);

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            'Scroll Me'
          ),
          _react2.default.createElement('input', {
            type: 'range',
            min: 0,
            max: photos.length - 1,
            value: currentPhoto,
            onChange: this.handleChange
          }),
          _react2.default.createElement(
            'div',
            { className: 'Photo' },
            _react2.default.createElement(
              _reactMotion.Motion,
              { style: { height: (0, _reactMotion.spring)(currentHeight), width: (0, _reactMotion.spring)(currentWidth) } },
              function (container) {
                return _react2.default.createElement(
                  'div',
                  {
                    className: 'Photo-inner',
                    style: container
                  },
                  configs.map(function (style, index) {
                    return _react2.default.createElement(
                      _reactMotion.Motion,
                      {
                        key: index,
                        style: style
                      },
                      function (imgStyle) {
                        return _react2.default.createElement('img', {
                          src: _images2.default[index],
                          className: 'Photo-photo',
                          style: imgStyle
                        });
                      }
                    );
                  })
                );
              }
            )
          )
        );
      }
    }, {
      key: 'handleChange',
      value: function handleChange(_ref5) {
        var value = _ref5.target.value;

        this.setState({ currentPhoto: value });
      }
    }]);

    return Photo;
  }(_react.Component);

  exports.default = Photo;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ = __webpack_require__(61);

  var _2 = _interopRequireDefault(_);

  var _3 = __webpack_require__(62);

  var _4 = _interopRequireDefault(_3);

  var _5 = __webpack_require__(63);

  var _6 = _interopRequireDefault(_5);

  var _7 = __webpack_require__(64);

  var _8 = _interopRequireDefault(_7);

  var _9 = __webpack_require__(65);

  var _10 = _interopRequireDefault(_9);

  var _11 = __webpack_require__(66);

  var _12 = _interopRequireDefault(_11);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  exports.default = {
    0: _2.default,
    1: _4.default,
    2: _6.default,
    3: _8.default,
    4: _10.default,
    5: _12.default
  };

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _immutable = __webpack_require__(2);

  var _loop = function _loop(_key2) {
    if (_key2 === "default") return 'continue';
    Object.defineProperty(exports, _key2, {
      enumerable: true,
      get: function get() {
        return _immutable[_key2];
      }
    });
  };

  for (var _key2 in _immutable) {
    var _ret = _loop(_key2);

    if (_ret === 'continue') continue;
  }

  _immutable.List.prototype.getEmptyTiles = function getEmptyTiles() {
    // eslint-disable-line no-extend-native
    return this.map(function (row, rowIndex) {
      return row.map(function (cell, colIndex) {
        return cell ? undefined : (0, _immutable.Map)({ row: rowIndex, col: colIndex });
      });
    }).flatten(true).filter(function (tile) {
      return !!tile;
    });
  };

  _immutable.List.prototype.toTileSet = function toTileSet() {
    return this.flatten(true).toSet().filter(function (tile) {
      return !!tile;
    });
  };

  _immutable.Map.prototype.updateGrid = function updateGrid(col, row) {
    var isNew = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];
    // eslint-disable-line no-extend-native
    return this.merge(isNew === undefined ? { col: col, row: row } : { col: col, row: row, isNew: isNew });
  };

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _provider = __webpack_require__(44);

  var _provider2 = _interopRequireDefault(_provider);

  var _constants = __webpack_require__(4);

  var _lodash = __webpack_require__(13);

  var _lodash2 = _interopRequireDefault(_lodash);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

  var initialState = _constants.INITIAL_STATE.toJS();

  exports.default = {
    get: function get(key) {
      var _this = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.t0 = initialState;
                _context.t1 = JSON;
                _context.next = 5;
                return _provider2.default.getItem(key);

              case 5:
                _context.t2 = _context.sent;

                if (_context.t2) {
                  _context.next = 8;
                  break;
                }

                _context.t2 = {};

              case 8:
                _context.t3 = _context.t2;
                _context.t4 = _context.t1.parse.call(_context.t1, _context.t3);
                return _context.abrupt('return', (0, _lodash2.default)(_context.t0, _context.t4));

              case 13:
                _context.prev = 13;
                _context.t5 = _context['catch'](0);
                return _context.abrupt('return', initialState);

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[0, 13]]);
      }))();
    },
    set: function set(key, value) {
      var _this2 = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _provider2.default.setItem(key, JSON.stringify(value));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    }
  };

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ExecutionEnvironment = __webpack_require__(5);

  var storage = undefined;
  if (_ExecutionEnvironment.canUseDOM) {
    storage = __webpack_require__(45);
  } else {
    storage = __webpack_require__(46).default;
  }

  exports.default = storage;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  module.exports = __webpack_require__(72);

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _immutable = __webpack_require__(2);

  function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

  var memoryStorage = (0, _immutable.Map)();

  exports.default = {
    getItem: function getItem(key) {
      var _this = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return memoryStorage.get(key);

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    setItem: function setItem(key, value) {
      var _this2 = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return memoryStorage.set(key, value);

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    }
  };

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Page = function (_Component) {
    _inherits(Page, _Component);

    function Page() {
      _classCallCheck(this, Page);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Page).apply(this, arguments));
    }

    _createClass(Page, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            'Not Found'
          ),
          _react2.default.createElement(
            'p',
            null,
            'The page you\'re looking for was not found.'
          )
        );
      }
    }]);

    return Page;
  }(_react.Component);

  exports.default = Page;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Page = function (_Component) {
    _inherits(Page, _Component);

    function Page() {
      _classCallCheck(this, Page);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Page).apply(this, arguments));
    }

    _createClass(Page, [{
      key: 'render',
      value: function render() {
        var errorMessage = this.props.error ? this.props.error.message + '\n\n' + this.props.error.stack : 'A critical error occurred.';

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            'Error'
          ),
          _react2.default.createElement(
            'pre',
            null,
            errorMessage
          )
        );
      }
    }]);

    return Page;
  }(_react.Component);

  Page.propTypes = {
    error: _react.PropTypes.instanceOf(Error)
  };
  exports.default = Page;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  var _reactMotion = __webpack_require__(8);

  var _nodeUuid = __webpack_require__(14);

  var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

  var _assert = __webpack_require__(67);

  var _assert2 = _interopRequireDefault(_assert);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _marked = [count, demo].map(regeneratorRuntime.mark); /* eslint no-console:0 */


  function count(n) {
    var x;
    return regeneratorRuntime.wrap(function count$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            x = 0;

          case 1:
            if (!(x < n)) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return x;

          case 4:
            x++;
            _context.next = 1;
            break;

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked[0], this);
  }

  var sentinel = new Error('foo');
  function demo() {
    return regeneratorRuntime.wrap(function demo$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return 10;

          case 3:
            _context2.next = 8;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2['catch'](0);

            (0, _assert2.default)(_context2.t0 === sentinel);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked[1], this, [[0, 5]]);
  }

  var Demo = function (_Component) {
    _inherits(Demo, _Component);

    function Demo(props) {
      _classCallCheck(this, Demo);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Demo).call(this, props));

      _this.state = {
        items: [// :off
        { key: 'a', size: 10 }, { key: 'b', size: 20 }, { key: 'c', size: 30 }] };
      // :on
      _this.handleRemove = _this.handleRemove.bind(_this);
      _this.handleAdd = _this.handleAdd.bind(_this);
      return _this;
    }

    _createClass(Demo, [{
      key: 'componentWillUpdate',
      value: function componentWillUpdate() {
        console.log(_nodeUuid2.default.v4());
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = count(5)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _x = _step.value;

            console.log('x', _x);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var d = demo();
        var A = d.next();
        console.log('A', A);
        var C = d.throw(sentinel);
        console.log('C', C);
      }
    }, {
      key: 'handleRemove',
      value: function handleRemove() {
        this.setState({
          items: [// :off
          { key: 'a', size: 10 }, { key: 'b', size: 20 }] });
      }
    }, {
      key: 'handleAdd',
      // :on
      value: function handleAdd() {
        this.setState({
          items: [// :off
          { key: 'a', size: 10 }, { key: 'b', size: 20 }, { key: _nodeUuid2.default.v4(), size: 40 }] });
      }
    }, {
      key: 'willLeave',
      // :on
      value: function willLeave() {
        return { width: (0, _reactMotion.spring)(0), height: (0, _reactMotion.spring)(0) };
      }
    }, {
      key: 'willEnter',
      value: function willEnter() {
        return { width: 0, height: 0 };
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            { onClick: this.handleRemove },
            '-'
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.handleAdd },
            '+'
          ),
          _react2.default.createElement(
            _reactMotion.TransitionMotion,
            {
              willLeave: this.willLeave,
              willEnter: this.willEnter,
              styles: this.state.items.map(function (item) {
                return {
                  key: item.key,
                  style: { width: item.size, height: item.size }
                };
              }),
              defaultStyle: { width: 0, height: 0 }
            },
            function (styles) {
              return _react2.default.createElement(
                'div',
                null,
                styles.map(function (config) {
                  return _react2.default.createElement('div', {
                    key: config.key,
                    style: _extends({}, config.style, { border: '1px solid' })
                  });
                })
              );
            }
          )
        );
      }
    }]);

    return Demo;
  }(_react.Component);

  var Page = function (_Component2) {
    _inherits(Page, _Component2);

    function Page() {
      _classCallCheck(this, Page);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Page).apply(this, arguments));
    }

    _createClass(Page, [{
      key: 'render',
      //eslint-disable-line react/no-multi-comp
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            'About Us'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Coming soon.'
          ),
          _react2.default.createElement(
            _reactMotion.Motion,
            {
              defaultStyle: { x: 0 },
              style: { x: (0, _reactMotion.spring)(10) }
            },
            function (value) {
              return _react2.default.createElement(
                'div',
                null,
                value.x
              );
            }
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(Demo, null)
          )
        );
      }
    }]);

    return Page;
  }(_react.Component);

  exports.default = Page;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Page = function (_Component) {
    _inherits(Page, _Component);

    function Page() {
      _classCallCheck(this, Page);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Page).apply(this, arguments));
    }

    _createClass(Page, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            'Blog'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Coming soon.'
          )
        );
      }
    }]);

    return Page;
  }(_react.Component);

  exports.default = Page;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Page = function (_Component) {
    _inherits(Page, _Component);

    function Page() {
      _classCallCheck(this, Page);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Page).apply(this, arguments));
    }

    _createClass(Page, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            'Test Article 1'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Coming soon.'
          )
        );
      }
    }]);

    return Page;
  }(_react.Component);

  exports.default = Page;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Page = function (_Component) {
    _inherits(Page, _Component);

    function Page() {
      _classCallCheck(this, Page);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Page).apply(this, arguments));
    }

    _createClass(Page, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            'Test Article 2'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Coming soon.'
          )
        );
      }
    }]);

    return Page;
  }(_react.Component);

  exports.default = Page;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  var _Game = __webpack_require__(35);

  var _Game2 = _interopRequireDefault(_Game);

  var _stores = __webpack_require__(28);

  var _stores2 = _interopRequireDefault(_stores);

  var _reactRedux = __webpack_require__(16);

  var _storage = __webpack_require__(43);

  var _storage2 = _interopRequireDefault(_storage);

  var _actionCreators = __webpack_require__(6);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var STORAGE_KEY = '2048_state';

  var store = (0, _stores2.default)();
  store.dispatch((0, _actionCreators.setState)(_storage2.default.get, STORAGE_KEY));

  store.subscribe(function () {
    _storage2.default.set(STORAGE_KEY, store.getState().toJS());
  });

  var Page = function (_Component) {
    _inherits(Page, _Component);

    function Page(props) {
      _classCallCheck(this, Page);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Page).call(this, props));

      _this.state = {
        store: store
      };
      return _this;
    }

    _createClass(Page, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          _reactRedux.Provider,
          { store: this.state.store },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h1',
              null,
              'Home Page'
            ),
            _react2.default.createElement(_Game2.default, null)
          )
        );
      }
    }]);

    return Page;
  }(_react.Component);

  exports.default = Page;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  var _Photo = __webpack_require__(40);

  var _Photo2 = _interopRequireDefault(_Photo);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var Page = function (_Component) {
    _inherits(Page, _Component);

    function Page() {
      _classCallCheck(this, Page);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Page).apply(this, arguments));
    }

    _createClass(Page, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            'Photo Gallery'
          ),
          _react2.default.createElement(_Photo2.default, null)
        );
      }
    }]);

    return Page;
  }(_react.Component);

  exports.default = Page;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react = __webpack_require__(1);

  var _react2 = _interopRequireDefault(_react);

  var _reactDom = __webpack_require__(75);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  var _ExecutionEnvironment = __webpack_require__(5);

  var _Location = __webpack_require__(12);

  var _Location2 = _interopRequireDefault(_Location);

  var _App = __webpack_require__(30);

  var _App2 = _interopRequireDefault(_App);

  __webpack_require__(42);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /// <reference path="./typings/main.d.ts" />


  var routes = {
    '/404': function _() {
      return __webpack_require__(47).default;
    }, '/500': function _() {
      return __webpack_require__(48).default;
    }, '/about': function about() {
      return __webpack_require__(49).default;
    }, '/blog': function blog() {
      return __webpack_require__(50).default;
    }, '/blog/test-article-one': function blogTestArticleOne() {
      return __webpack_require__(51).default;
    }, '/blog/test-article-two': function blogTestArticleTwo() {
      return __webpack_require__(52).default;
    }, '/': function _() {
      return __webpack_require__(53).default;
    }, '/photo': function photo() {
      return __webpack_require__(54).default;
    } }; // Auto-generated on build. See tools/lib/routes-loader.js

  var route = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(path, callback) {
      var handler, componentHandler, component;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (path !== '/' && path.endsWith('/')) {
                path = path.slice(0, -1); // eslint-disable-line no-param-reassign
              }
              handler = routes[path] || routes['/404'];
              _context.next = 4;
              return handler();

            case 4:
              componentHandler = _context.sent;
              component = typeof componentHandler === 'function' // :off
              ? componentHandler : componentHandler.default; // :on

              _context.next = 8;
              return callback(_react2.default.createElement(
                _App2.default,
                null,
                _react2.default.createElement(component)
              ));

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    })),
        _this = undefined;

    return function route(_x, _x2) {
      return ref.apply(_this, arguments);
    };
  }();

  function run() {
    var _this2 = this;

    var container = document.getElementById('app');
    _Location2.default.listen(function (location) {
      route(location.pathname, function () {
        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(component) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt('return', _reactDom2.default.render(component, container, function () {
                    // Track the page view event via Google Analytics
                    // noinspection JSUnresolvedFunction
                    window.ga('send', 'pageview');
                  }));

                case 1:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        })),
            _this = _this2;

        return function (_x3) {
          return ref.apply(_this, arguments);
        };
      }());
    });
  }

  if (_ExecutionEnvironment.canUseDOM) {
    // Run the application when both DOM is ready
    // and page content is loaded
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', run);
    } else {
      window.attachEvent('onload', run);
    }
  }

  exports.default = {
    route: route, routes: routes
  };

/***/ },
/* 56 */
/***/ function(module, exports) {

  // removed by extract-text-webpack-plugin
  module.exports = {"game":"MPbA0HITETZq_hs2HIVzL","grid-container":"wJMV0IDG8PvMT8EVWKqFI","grid-row":"_1m5UXleeKWPfNTki762hCl","grid-cell":"gSgx1IE6MojNJ26rIRBBQ","tile-container":"_20iLUg0LKj95eEgxTekvoV","tile":"_3-QJiZo4a-fInnIaQbVG1T","tile-new":"_3MqVWwVFu3HikBJWfFq93T","tile-inner":"_3jlcW9N_sRdDV3Wy5gbRho","tile-value-2":"_2Ce53ClsIv-ioiBnGRgO7I","tile-value-4":"_1iEdI7B8to-aFa6r7gsQPZ","tile-value-8":"_34CzAzk5NBXk7MCOYmdkFz","tile-value-16":"_2VzY8fJpXPcbVHb10OxpKp","tile-value-32":"Bbw2qTBoMbIMDycZinCvF","tile-value-64":"_1v-_Weg2vuIZhPTgoeFams","tile-value-128":"_2HSfUnN6jfyOpWcfzu9p6d","tile-value-256":"_1iRZS4jVZXADwoLcBe23_w","tile-value-512":"_2n4trBWPz4d3cOPn6Wd1G5","tile-value-1024":"mGxlDzl71xay1-NBlpJbA","tile-value-2048":"_23WjjWa-aHuEHPO3463KT","tile-value-super":"_3Txz5ixX6EZML9j2m1yu2T","example-enter":"_2WW0EkXGzgCNUofLzUjXLU","example-enter-active":"_2cuio3wR6GZ-BfguqzByde","example-leave":"_2NnuGKFvswCq53JE8zkDdT","example-leave-active":"_3azEWw_Up45H4dzT1-MQ-s"};

/***/ },
/* 57 */
/***/ function(module, exports) {

  // removed by extract-text-webpack-plugin

/***/ },
/* 58 */
/***/ function(module, exports) {

  // removed by extract-text-webpack-plugin

/***/ },
/* 59 */
/***/ function(module, exports) {

  // removed by extract-text-webpack-plugin

/***/ },
/* 60 */
/***/ function(module, exports) {

  // removed by extract-text-webpack-plugin

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "8f824a9be9f176bd876e3e4b4329d8de.jpg";

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "644bcebd4aab3a1ddad255c65f129942.jpg";

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "a3eba7ffd2fa332ab85e871b852abec4.jpg";

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "bbb56f6287846a2ef18574667beac426.jpg";

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "2fba24cc50cdc73c0f14e78dabd3e05e.jpg";

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "39be11088b77df7267acb326ccb58551.jpg";

/***/ },
/* 67 */
/***/ function(module, exports) {

  module.exports = require("assert");

/***/ },
/* 68 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 69 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 70 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 71 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 72 */
/***/ function(module, exports) {

  module.exports = require("localforage");

/***/ },
/* 73 */
/***/ function(module, exports) {

  module.exports = require("lodash.samplesize");

/***/ },
/* 74 */
/***/ function(module, exports) {

  module.exports = require("react-addons-pure-render-mixin");

/***/ },
/* 75 */
/***/ function(module, exports) {

  module.exports = require("react-dom");

/***/ },
/* 76 */
/***/ function(module, exports) {

  module.exports = require("redux-immutable");

/***/ },
/* 77 */
/***/ function(module, exports) {

  module.exports = require("redux-logger");

/***/ },
/* 78 */
/***/ function(module, exports) {

  module.exports = require("redux-thunk");

/***/ }
/******/ ]);