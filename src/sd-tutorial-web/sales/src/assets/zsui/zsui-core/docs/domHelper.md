# Documentation for DOM Helper

DOM Helper is a set of utility functions that help you to perform certain DOM operations with ease. It also contains JS polyfills for functions that aren't support on IE. For eg: [Element.closest()](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest).

# Usage

-   You can empty an element by deleting all nodes within it using the following syntax:
        ```javascript
            zs.domHelper.empty(Element)
        ```
    Refer to API section below for details related to each helper function.

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## domHelper

zs.domHelper

### debounce

Creates and returns a new debounced version of the passed function which will postpone its execution until after {wait} milliseconds have elapsed since the last time it was invoked.

#### Parameters

-   `func`  
-   `wait` **[number][1]** How much time to postpone execution. Omit to execute immediately.
-   `null-null` **[function][2]** Executable function to postpone

Returns **[function][2]** Returns a new debounced version of the passed function

### find

Finds child element matching provided selector

#### Parameters

-   `selector` **[string][3]** Selector has limitations based on the browser support.
-   `all` **[boolean][4]** Flag to find all matching elements. Otherwise fist found element is returned.

Returns **([element][5] \| [array][6] \| [undefined][7])** Found element or array of elements

### empty

Clear node

#### Parameters

-   `element` **[element][5]?** Optional element to clear. Otherwise current execution context will be used.

### fire

Fire an event

#### Parameters

-   `name` **[string][3]** Event name to fire
-   `params` **[object][8]?** Details to attach

Returns **[object][8]** Returns created event

### listen

Add event listener

#### Parameters

-   `name` **[string][3]** Name of the event to handle
-   `fn` **[function][2]** Event handler

### attr

Set or get attribute of an element

#### Parameters

-   `name` **[string][3]** Name of the attribute
-   `value` **[string][3]?** Value of the attribute

### html

Get the HTML contents of the element or set the HTML contents

#### Parameters

-   `str` **[string][3]?** HTML contents
-   `undefined`  

### parse

Creates a new HTMLElement with provided contents

#### Parameters

-   `html` **[string][3]** HTML contents
-   `tag` **[string][3]?** Optional tag of the element to create

### closestParent

Returns the closest ancestor of the current element (or the current element itself) which matches the selectors given in parameter. If there isn't such an ancestor, it returns null.

#### Parameters

-   `selector`  
-   `el`  
-   `null-null` **[string][3]** CSS selector for the ancestor to look for
-   `null-null` **[HTMLElement][9]?** Target element or "this" will be used.

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[4]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[5]: https://developer.mozilla.org/docs/Web/API/Element

[6]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[7]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined

[8]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[9]: https://developer.mozilla.org/docs/Web/HTML/Element
