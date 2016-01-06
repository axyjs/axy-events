# Format of Handler

An event handler which is passed to the method `add()` can take one of the following formats.

### Function

The function that is called directly.

```javascript
emitter.add("event", function (e) {
    console.log("I am event handler");
});
```

The function takes a single argument [Event object](Event.md).
The `this` inside the function is NULL.

### Array

The numeric list with 2 or 3 elements:

* `{Object}` - thisArg
* `{Function|string}` - a method or a method name
* `{any[]}` - bound arguments

Examples:

* `[object, method]` is `method.call(object, event)`
* `[object, "method"]` is `object.method(event)`
* `[object, "method", [1, 2, 3]]` is `object.method(1, 2, 3, event)`

Method by name computed each time.

```javascript
var obj = {
    method: function () {
        console.log("one");
    }
};

emitter.add([obj, "method"]);
emitter.emit(e); // "one"

obj.method = function () {
    console.log("two");
};

emitter.emit(e); // "two"
```

## Returns value

If a handler returns `FALSE` it is the same as `e.preventDefault()` and `e.stopPropagation()`.
See [Event object](Event.md).

