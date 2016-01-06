# Emitter Options

The [Emitter](Emitter.md) constructor takes as single argument the options dictionary.
If this argument is not specified then will be taken the default options object (all fields have default values).

#### `events: Object|Array`

The dictionary `eventType` => `type parameters`.

Parameters:

* `ClassEvent` - the "class" of [event object](Event.md). By default it is `Event`.

```javascript
var options = {
        events: {
            one: {
                ClassEvent: EventOne
            },
            two: {
                ClassEvent: EventTwo
            }
        }
    };
```

Or can specify ClassEvent directly:

```javascript
var options = {
        events: {
            one: EventOne,
            two: EventTwo
        }
    };
```

An array is the fixed events list with empty parameters.

```javascript
options = {
    events: ["one", "two"]
};

// similarly
options = {
    events: {
        one: {},
        two: {}
    }
};
```

#### `notFixed: boolean`

If the `events` list is not specified then the events list is not fixed.
You can use any type of event.

If the `events` list is specified then the events list is fixed by default.

```javascript
var options = {
        events: ["one", "two"]
    },
    emitter = new Emitter(options);

emitter->emit("one", event); // ok

emitter->emit("three", event); // Error
```

If it is needed specify `events` and using not fixed events list use `notFixed`.

```javascript
var options = {
        events: {
            one: {
                ClassEvent: EventOne
            },
            two: {
                ClassEvent: EventTwo
            }
        },
        notFixed: true
    },
    emitter = new Emitter(options);

emitter->emit("one", event); // ok

emitter->emit("three", event); // ok
```

#### `default: string`

The default event type.
It used when `eventType` is not specified.

```javascript
$emitter->add(null, handler); // adds a listener for the default event

$emitter->emit(null, event); // emits a default event

$emitter->getSingle()->emit(event); // similarly
```

If the default event is not specified and `eventType` is not specified too then `Error` will be thrown.

#### `prefix: string`

Prefix of event types.

```javascript
var options = {
        prefix: "services.my."
    },
    emitter = new Emitter(options);

emitter->emit("hide", event); // emits "services.my.hide"
```

