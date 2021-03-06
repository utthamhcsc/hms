# Synchronize properties and attributes

One of [best practices](https://developers.google.com/web/fundamentals/web-components/best-practices) of Web components is to keep primitive data attributes and properties in sync, reflecting from property to attribute, and vice verse.

`syncProps` extension adds several methods to  components including  `syncProp` and `syncAttr` methods to make  attributes and properties in sync.

Keep in mind that attribute names are always in lower dash case and property names will be in lower camel case like `foo-bar-baz` => `fooBarBaz`.

Attribute values are always strings but `syncAttr` accepts a third parameter to enforce a type for the property `<button value="0"></button>` => `button.value = 0;` or `<button disabled></button>` => `button.disabled = true;`. We support boolean, number and string types.

Use this example to define a new component.

```javascript
import syncProps from './node_modules/zsui-core/src/smart/syncProps.m.js';
import {mix} from './node_modules/zsui-core/src/smart/mixin.m.js';

class MyButton extends HTMLButtonElement {
	constructor() {
		super();
	}
	
	// Make sure you define attributes to observe
	static get observedAttributes() {
		return ['value', 'disabled'];
	}
	
	// Display property and attribute 
	render() {
		this.innerHTML = (this.value || 0) + "/" + (this.getAttribute('value') || 0);
	}
	
	// Add this method to capture property changes
	propertyChangedCallback(name, oldValue, newValue) {
		this.render();
	}

	// Handle this to sync attributes with properties
	attributeChangedCallback(name, oldValue, newValue) {
		
		// You can enforce different types for properties
		if (name == 'value') {
			this.syncAttr(name, newValue, 'number');
		}
		if (name == 'disabled') {
			this.syncAttr(name, newValue, 'boolean');
		}
	}

	connectedCallback() {
		this.render();
		
		// Randomly change the value on click
		this.addEventListener('click', function() {
			this.value = ~~(Math.random()*100);			
		}, true);
		

		// Set initial state and synchronize property with attribute
		this.syncProp('value');
		this.syncProp('attribute');
	}
}

mix(MyButton.prototype, syncProps); // Extend the button
```

Register the  button component and add an instance to the page.

```javascript
customElements.define('my-button', MyButton, {extends: 'button'});
let myButton = document.createElement('button', {is: 'my-button'});
myButton.value = 0;
myButton.getAttribute('value'); // 0
document.body.appendChild(myButton); 
```

You can click the button to see results. Try disabling the button through the property and watch for attribute.

```javascript
myButton.disabled = true;
myButton.getAttribute('disabled'); // ""
myButton.disabled = false;
myButton.getAttribute('disabled'); // null
```

# Demo

[Example](https://ui.zsservices.com/zsui/syncProps.html)

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## dashToCamelCase

Converts "dash-case" identifier (e.g. `foo-bar-baz`) to "camelCase"
(e.g. `fooBarBaz`).

### Parameters

-   `dash` **[string][1]** Dash-case identifier

Returns **[string][1]** Camel-case representation of the identifier

## camelToDashCase

Converts "camelCase" identifier (e.g. `fooBarBaz`) to "dash-case"
(e.g. `foo-bar-baz`).

### Parameters

-   `camel` **[string][1]** Camel-case identifier

Returns **[string][1]** Dash-case representation of the identifier

## syncPropAttr

This behavior implements a pattern to keep properties and attributes in sync. Uses getters and setters and works with observedAttributes.

Type: [object][2]

## propertyGet

Unify how we get and store a value for the property and enable overrides.

### Parameters

-   `name` **[string][1]** Name of the property.

Returns **[string][1]** Property value

## propToAttrValue

Converts a value of a property to attribute value

### Parameters

-   `value` **any** Property value

Returns **[string][1]** attribute value

## propertySet

Set a property value and optionally notify when value changes

### Parameters

-   `name` **[string][1]** Name of the property to set
-   `newValue` **any** New value for the property

## attrToPropName

Convert attribute name from dash case like "my-name" to property name in lower camel case like "myName".

### Parameters

-   `attrName` **[string][1]** Property name

Returns **[string][1]** Property name

## propToAttrName

Convert property name from lower camel case like "myName" to attribute name in dash case like "my-name".

### Parameters

-   `propName` **[string][1]** Property name

Returns **[string][1]** Attribute name

## syncAttr

Align a property value with changed attribute value

### Parameters

-   `name` **[string][1]** Attribute name that was changed recently
-   `value` **[string][1]** New value of the attribute
-   `type` **[string][1]** Type of the property

## attrToPropValue

Convert an attribute value to property value

### Parameters

-   `propName` **[string][1]** Name of the property
-   `value` **any** Value of the property
-   `type` **[string][1]?** Type of the property. Can be detected. 'string' by default.

## syncProp

Align a property value with an attribute value using getters and setters. Should be called once for each targeted property.

### Parameters

-   `propName` **[string][1]** Name of the property.

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object
