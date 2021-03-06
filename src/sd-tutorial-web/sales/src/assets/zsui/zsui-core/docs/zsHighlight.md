# Documentation for Highlight component

Highlight is a behaviour that could be utilized by any custom element based component to highlight a text fragment in the document.

Incase you wish to highlight some text without using custom elements, you can use our CSS styles for highlighting.

# Usage

## Using CSS styles

-   Wrap any text within `<mark></mark>` tag would highlight it.

    ```HTML
    <mark> massa at purus</mark>
    ```

-   Alternatively, you can also apply `.zs-highlight` class to the container element to highlight it's text.
    ```HTML
    <p class="zs-highlight">Lorem ipsum dolor sit amet</p>
    ```

## Using custom element

-   Define a custom element that extends highlight behaviour.
    ```javascript
    zs.customElement(HTMLElement, 'my-highlighter', null, [zs.highlight]);
    ```
-   Add `<my-highlighter>` element to your document.
    ```HTML
    <my-highlighter>Our library includes a behaviour to highlight text.</my-highlighter>
    ```
-   Call element's `highlight()` method with text to be highlighted as argument.
    ```javascript
    document.querySelector('my-highlighter').highlight("library");
    ```

# Examples

Visit our demo [page](https://ui.zsservices.com/demo/zsui/highlight.html) to see live examples and detailed usage. 

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## highlight

Highlight text fragment in the contents of DOM element using <mark></mark> tag

### Parameters

-   `searchValue` **[String][1]** Keywork to hightlight.
-   `caseSensitive` **[Boolean][2]** Case sensitive or not. False by default.
-   `ele`  
-   `element` **([HTMLElement][3] \| [NodeList][4])** Element or NodeList to hightlight in.

## lowlight

Removes the highlighting.

### Parameters

-   `ele` **([HTMLElement][3] \| [NodeList][4])** Element or NodeList to remove hightlighting.

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[3]: https://developer.mozilla.org/docs/Web/HTML/Element

[4]: https://developer.mozilla.org/docs/Web/API/NodeList
