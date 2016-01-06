# Emitter

An event emitter aggregates a few types of events.

##### `constructor([options: IOptions])`

Takes an options dictionary.
See [Options object](options.md).

##### `add(eventType: string, handler: IHandler [, data: any]): Listener`

Takes:

* `eventType` as string (or NULL for [default event](options.md)).
* `handler` is callback for listen. See [handler](handler.md) for more details about the callback format.
* `data` for [Event object](Event.md).

Returns a [listener object](Listener.md).

Throws `Error` if `eventType` is unknown (see [options](options.md)) or [handler format](handler.md) is invalid.

##### `addOnce(eventType: string, handler: IHandler, [data: any, [count: number]): Listener`

Similarly `add()` but the listener will be removed after `count` calls (by default `count` = 1).

##### `emit(eventType: string, event: any): Event`

Emits an event and executes all bound listeners.

Takes:

* `eventType` as string.
* `event` is Event object or parameters (see [emit](emit.md)).

Returns an [Event object](Event.md).

Throws `Error` if `eventType` is unknown (see [options](options.md)) or one of the listeners throwed.

##### `createEvent(eventType: string [, data: object]): Event`

Creates an event object.
"Class" of event object specified in [options](options.md).

If `data` object is specified then event object merges with this object.

```javascript
event = emitter->createEvent("click", {x: 10, y: 20});

event.type; // click
event.x; // 10
```

##### `clear(): void`

Removes all listeners of all events.

##### `isExists(eventType: string): boolean`

Checks if an event type is exists.

##### `getSingle([eventType: string]): SingleEmitter`

Returns a [Single emitter](SingleEmitter.md) for specified event type.

If `eventType` is `NULL` then returns the single emitter of [default event](options.md).
