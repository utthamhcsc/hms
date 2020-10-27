(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["../src/smart/syncProps.m.js", "../src/smart/mixin.m.js"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("../src/smart/syncProps.m.js"), require("../src/smart/mixin.m.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.syncPropsM, global.mixinM);
    global.syncDemoM = mod.exports;
  }
})(this, function (_syncPropsM, _mixinM) {
  "use strict";

  _syncPropsM = _interopRequireDefault(_syncPropsM);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

  function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

  function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  var MyButton =
  /*#__PURE__*/
  function (_HTMLButtonElement) {
    _inherits(MyButton, _HTMLButtonElement);

    function MyButton() {
      _classCallCheck(this, MyButton);

      return _possibleConstructorReturn(this, _getPrototypeOf(MyButton).call(this));
    }

    _createClass(MyButton, [{
      key: "render",
      value: function render() {
        this.innerHTML = (this.value || 0) + "/" + (this.getAttribute('value') || 0);
      }
    }, {
      key: "propertyChangedCallback",
      value: function propertyChangedCallback(name, oldValue, newValue) {
        console.log('prop changed', name, oldValue, newValue);
        this.render();
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        console.log('attr changed', name, oldValue, newValue);

        if (name == 'value') {
          this.syncAttr(name, newValue, 'number');
        }

        if (name == 'disabled') {
          this.syncAttr(name, newValue, 'boolean');
        }
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        this.render(); // Randomly change the value on click

        this.addEventListener('click', function () {
          this.value = ~~(Math.random() * 100);
        }, true);
        this.syncProp('value');
        this.syncProp('disabled');
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['value', 'disabled'];
      }
    }]);

    return MyButton;
  }(_wrapNativeSuper(HTMLButtonElement));

  (0, _mixinM.mix)(MyButton.prototype, _syncPropsM.default);
  customElements.define('my-button', MyButton, {
    extends: 'button'
  });
});
//# sourceMappingURL=syncDemo.js.map
