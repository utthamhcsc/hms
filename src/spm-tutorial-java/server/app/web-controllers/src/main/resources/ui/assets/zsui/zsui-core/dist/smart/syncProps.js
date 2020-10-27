(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.syncPropsM = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  var caseMap = {};
  var DASH_TO_CAMEL = /-[a-z]/g;
  var CAMEL_TO_DASH = /([A-Z])/g;
  /**
   * Converts "dash-case" identifier (e.g. `foo-bar-baz`) to "camelCase"
   * (e.g. `fooBarBaz`).
   *
   * @param {string} dash Dash-case identifier
   * @return {string} Camel-case representation of the identifier
   */

  function dashToCamelCase(dash) {
    return caseMap[dash] || (caseMap[dash] = dash.indexOf('-') < 0 ? dash : dash.replace(DASH_TO_CAMEL, function (m) {
      return m[1].toUpperCase();
    }));
  }
  /**
   * Converts "camelCase" identifier (e.g. `fooBarBaz`) to "dash-case"
   * (e.g. `foo-bar-baz`).
   *
   * @param {string} camel Camel-case identifier
   * @return {string} Dash-case representation of the identifier
    */


  function camelToDashCase(camel) {
    return caseMap[camel] || (caseMap[camel] = camel.replace(CAMEL_TO_DASH, '-$1').toLowerCase());
  }
  /**
   * This behavior implements a pattern to keep properties and attributes in sync. Uses getters and setters and works with observedAttributes. 
   * @namespace {object} syncPropAttr
   */


  var syncProps = {
    /**
     * Unify how we get and store a value for the property and enable overrides.
     * @param {string} name Name of the property. 
     * @return {string} Property value
     */
    propertyGet: function propertyGet(name) {
      return this['_' + name];
    },

    /**
     * Converts a value of a property to attribute value
     * @param {any} value Property value
     * @return {string} attribute value
     */
    propToAttrValue: function propToAttrValue(value) {
      if (value == null) {
        return "";
      }

      return String(value);
    },

    /**
     * Set a property value and optionally notify when value changes
     * @param {string} name Name of the property to set
     * @param {*} newValue New value for the property
     */
    propertySet: function propertySet(name, newValue) {
      var oldValue = this['_' + name];
      this['_' + name] = newValue;
      var attrName = this.propToAttrName(name);
      var attrValue = this.getAttribute(attrName);
      var attrNewValue = this.propToAttrValue(newValue);

      if (attrNewValue != attrValue) {
        if (typeof newValue == 'boolean') {
          if (attrNewValue == 'true') {
            this.setAttribute(attrName, '');
          } else {
            this.removeAttribute(attrName);
          }
        } else {
          this.setAttribute(attrName, attrNewValue);
        }
      }

      if (oldValue != newValue && typeof this.propertyChangedCallback == 'function') {
        this.propertyChangedCallback(name, oldValue, newValue);
      }
    },

    /**
     * Convert attribute name from dash case like "my-name" to property name in lower camel case like "myName".
     * @param {string} attrName Property name
     * @returns {string} Property name
     */
    attrToPropName: function attrToPropName(attrName) {
      return dashToCamelCase(attrName);
    },

    /**
     * Convert property name from lower camel case like "myName" to attribute name in dash case like "my-name".
     * @param {string} propName Property name
     * @returns {string} Attribute name
     */
    propToAttrName: function propToAttrName(propName) {
      return camelToDashCase(propName);
    },

    /**
     * Align a property value with changed attribute value
     * @param {string} name Attribute name that was changed recently
     * @param {string} value New value of the attribute
     * @param {string} type Type of the property
     */
    syncAttr: function syncAttr(name, value, type) {
      var propName = this.attrToPropName(name);
      var propValue = this[propName];
      var propNewValue = this.attrToPropValue(propName, value, type);

      if (propNewValue != propValue) {
        this[propName] = propNewValue;
      }
    },

    /**
     * Convert an attribute value to property value
     * @param {string} propName Name of the property 
     * @param {any} value Value of the property 
     * @param {?string} type Type of the property. Can be detected. 'string' by default.
     */
    attrToPropValue: function attrToPropValue(propName, value, type) {
      var propType = type || _typeof(this[propName]);

      if (propType == 'undefined' || propType == 'object') {
        propType = 'string';
      }

      switch (propType) {
        case 'number':
          return Number(value);

        case 'boolean':
          return value == 'true' || value == '';

        default:
          // String
          return value;
      }
    },

    /**
     * Align a property value with an attribute value using getters and setters. Should be called once for each targeted property.  
     * @param {string} propName Name of the property.
     */
    syncProp: function syncProp(propName) {
      var descriptor = {
        get: function get() {
          return this.propertyGet(propName);
        },
        set: function set(newValue) {
          this.propertySet(propName, newValue);
        }
      };
      Object.defineProperty(this, propName, descriptor);
    }
  };
  var _default = syncProps;
  _exports.default = _default;
});
//# sourceMappingURL=syncProps.js.map
