# `elementLoaded()`
Detect when an [element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
matching a [selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
is loaded into the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).

```javascript
elementLoaded(selector)
    .then((element) => {
        // ...
    });
```

## Syntax
```
elementLoaded(selector)
```

### Return Value

A [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that is:

 * **Already fulfilled**, if the `selector` matched an element already on the page.
 * **Asynchronously fulfilled**, when a [mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) occurs that adds a element matching the `selector` into the DOM).
 * **Asynchronously rejected**, when the DOM has [finished loading](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event)
    and a matching element has not been found.
