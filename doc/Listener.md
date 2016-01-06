# Listener Object

Methods like `add()` creates a listener and returns the listener object.

### `remove(): boolean`

Removes a listener.

```javascript
listener = emitter.add("ev", [obj, "method"]);

listener.remove();
```

Returns `TRUE` if the listener has been removed at this time.
And `FALSE` if the listener was removed earlier.

### `call(e: Event): any`

Calls the event handler.

### `count: number`

How many times the listener was called.
