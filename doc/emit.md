# `emit()`

Method `emit()` runs all listeners of the specified event type.

Listeners called in the order of adding.
But the execution of the chain may be interrupted ([stopPropagation()](Event.md)).

### Event object

Each of listeners takes an [Event object](Event.md).

`emit()` creates this event object by parameters from arguments.

If it is an instance of Event or children then it is target event object.

```javascript
e = emitter.createEvent("click");
e.x = 10;
e.y = 20;

emitter.emit("click", e); // e is event object
```

If it is a plain object:

* Creates an event object.
* It merges with that plain object.

```javascript
emitter.emit("click", {x: 10, y: 20});
```

Default value:

```javascript
emitter.emit("click"); // similarly emit("click", {})
```

