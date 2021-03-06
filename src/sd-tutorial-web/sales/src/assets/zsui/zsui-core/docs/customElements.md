# Documentation for Custom Elements

We use `Web Components` and `jQuery plugins` to build and extend ZSUI library.

> One of the key features of the Web Components standard is the ability to create [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) that encapsulate your functionality on an HTML page.

Our library includes a tiny helper `zs.customElement` to create custom 
elements.

Include on a page.

```html
<script scr="./zsui/polyfills/polyfills.min.js"></script>
<script scr="./zsui/utils/customElements.min.js"></script>
```

Define your first component.

```javascript
var MyComponent = zs.customElement(HTMLElement, 'my-component', null, {
	prop1: 1,
	showId: function() {
		this.innerHTML += ' #' + this.id;
	},
	events: {
		attach: function () {
			this.innerHTML = 'My component';
			this.showId();
		}
	}
});
```

Use this custom element like any other element in HTML.

```HTML
<my-component id="c1">...</my-component>
```

You can create instances though HTML or in javascript.

```javascript
var el = document.createElement('my-component');
el.id = "c2";
document.body.appendChild(el);
```

Make sure to always use `document.createElement` in javascript and **not** `MyComponent` directly. This will normalize all behaviors across all browsers.

## Life-cycle callbacks and events

`zs.customElement` helper substitutes [callbacks](<>) with events. You can handle life-cycle and regular DOM events with `events` object.

```javascript
var MyComponent2 = zs.customElement(HTMLElement, 'my-component-2', null, {
	// Log events
	log: function(event) {
		console.log(event);
		this.innerHTML += ' ' + event.type;
	},
	observedAttributes: ['my-attr'], // It is easy to forget this... :)
	// Handle events at a class level for all instances
	events: {
		create: function(event) {
			this.log(event);
		},
		detach: function(event) {
			this.log(event);
		},
		attach: function (event) {
			this.log(event);
		},
		attributeChange: function(event) {
			this.log(event);
		}
	}
});

// Check the order of events 
var el = document.createElement('my-component-2'); // created
el = document.body.appendChild(el); // connected
el.log({type: 'afterConnected'}); // afterConnected
el.setAttribute('my-attr', 'new'); // attributeChange
```

In Chrome
`create attach afterConnected attributeChange`

In IE11 
`create afterConnected attach attributeChange`

>  `connectedCallback` or `attach` event is asynchronous in IE11 when polyfill is used. Don't rely on life-cycle events order.

## Customizing built-ins

You can extend native elements providing a `tag` parameter.

```javascript
zs.customElement(HTMLButtonElement, 'my-button', 'button', {
	events: {
		click: function(event) {
			this.innerHTML = 'Clicked';
		},
		attach: function (event) {
			this.innerHTML = 'My Button';
		}
	}
});
```

Make sure to use `is` attribute in HTML now.

```HTML
<button is="my-button">...</button>
```

And add a second parameter to `document.createElement` if you decide to create in javascript.

```javascript
var el = document.createElement('button', {is: 'my-button'});
```

Now you could face minor inconsistencies.

```javascript
el.getAttribute('is'); // `null` in Chrome, but `my-button` in IE11.
```

Our helper will normalize it after adding element to the DOM and by creating an extra property `_is`.

```javascript
el._is; // 'my-button'
document.body.appendChild(el);
el.getAttribute('is'); // 'my-button' in Chrome
```

## ES2015 classes are not 100% polyfillable

You would face issues only when trying to use classes and customize built-ins.   

```javascript
class MyButton extends HTMLButtonElement {
	constructor() {
		super()
	}
}
customElements.define('my-button', MyButton, {extends: 'button'});

var el = document.createElement('button', {is: 'my-button'});
```

The code above will perfectly work in Chrome. But if you try to [transpile](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=usage&spec=false&loose=false&code_lz=MYGwhgzhAECyCeAhArgF1QewHbQKYA9VcsATGACQBVYAZFdbAURFwFtjVoBvAKAEhg2CKgBOyYJhEAKAJTd-fCMgAOuaTP4BfHtuDJhGVszYcIAOhK4AZgEssuKQHJW8ALQAjNJiyOANHCQvbH8uAiJSCAAuaEdPBh9NGQBuHh4ANzARPBBoAF5oEgw9dixUM2ARXDAiYxLUJzjvP24bKJiXDyCE5KA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env&prettier=false&targets=&version=6.26.0&envVersion=1.6.2) it to ES5 and run it will break.

> Use  `zs.customElement` helper or [this guide](https://github.com/WebReflection/document-register-element).

More [examples](https://ui.zsservices.com/demo/zsui/customElements.html)...

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## zs

Type: [object][1]

### customElement

Define a custom element and normalize across browsers. Helps to avoid caveats and provides shortcuts to handle events, extend existing elements and add new features.

#### Parameters

-   `parentClass` **[HTMLElement][2]** Prototype of a new element. Should be an instance of HTMLElement.
-   `isWhat` **[string][3]** Name of the new element can be used as a tag name "&lt;my-element>" or as "is" attribute value "&lt;p is='my-element'>"
-   `tag` **([string][3] | null)** Tag name is used only when customizing built-ins. E.g. when extending the native HTMLFormElement you need to use "form" here so your new element will be used like &lt;form is="my-form">. Not recommended.
-   `behaviors` **([array][4] \| [object][1])?** Optional list of behaviors to add to the new custom element. We can pass special properties to define getters and setters, event listeners and attributes we observe. E.g `{myProp:1, myMethod: function() {}, events: {'click': function() {}}, properties: {test: {get: function() {}, set: function() {}}}, observedAttributes:['test']}`. All behaviors will be mixed and applied to the original prototype of the HTML element.

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[2]: https://developer.mozilla.org/docs/Web/HTML/Element

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
