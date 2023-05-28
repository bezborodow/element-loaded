# `elementLoaded()`
Detect when an [element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
matching a [selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
is loaded into the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model).

## Synopsis

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

### Parameters

**`selector`**: A [selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) to match against.

### Return Value

A [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that is:

 * **Already fulfilled**, if the `selector` matched an element already loaded
   into the
   [document](https://developer.mozilla.org/en-US/docs/Web/API/Window/document).
 * **Already rejected**, if no match was found and the DOM has already
   [finished
   loading](https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState).
 * **Asynchronously fulfilled**, when a
   [mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
   occurs that adds an element matching the `selector` into the DOM.
 * **Asynchronously rejected**, when the DOM has [finished
   loading](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event)
   and a matching element has not been found.

## Description

`elementLoaded()` will search the document with
[`querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
against a given `selector`. If there is a match, then the returned promise will
resolve immediately. If there is no match, but the document
[`readyState`](https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState)
is no longer `loading`, then the returned promise will reject immediately.

Otherwise, it will observe the document for
[matches](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches)
using
[`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).
If a matching mutation is observed, then the promise will resolve. By the time
that the DOM has finished loading and the [`DOMContentLoaded`
event](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event)
is fired, if no matching element has been found, then the promise will reject
and the observer will
[disconnect](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/disconnect).
