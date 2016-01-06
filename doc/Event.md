# Event Object

An event object is created at the time of emit.
It is passed to each listener.
Listeners can modify it.

`emit()` returns this event object.

Event object can be an instance of `Event` or child of `Event`.

##### `type: string`

Type of event.

##### `data: any`

The data that has been linked with listener (data argument of `add()`).

##### `results: any[]`

The list of listeners return values.

##### `stopPropagation(): void`

Calling this function completes the bypass listeners.

##### `isPropagationStopped(): boolean`

Checks if `stopPropagation()` has been called.

##### `preventDefault(): void`

Asks the caller not to perform a default action.

```javascript

function handler(e) {
    if (iBusy()) {
        e.preventDefault();
    } else {
        // pre remove
    }
}

emitter->add("delete", handler);

// ...

function removeUser(userId) {
    var event = emitter->emit("delete", {id: userId});
    if (event.isDefaultPrevented()) {
        return false;
    }
    // remove user
    return true;
}
```

##### `isDefaultPrevented()`

Checks if `preventDefault()` has been called.

**Note**: methods name "prevent default" and "stop propagation" taken from DOM events.
Here they are not entirely accurate.
