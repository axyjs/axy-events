# Using with TypeScript

The library written on TypeScript and compiled to JavaScript.

Since TypeScript 1.6 you do not have to specify d.ts files via `<reference>`.
Just import the module.

```typescript
import Emitter from "axy-events";
```

Declarations should be included automatically.

The class [Emitter](Emitter.md) is sufficient for work.
Other entities are available using Emitter methods.
But for typing you need other classes and interfaces.

The library export:

```typescript
export default Emitter;

export { SingleEmitter, Event, Listener, IOptions, IHandler };
```

* [SingleEmitter](SingleEmitter.md) - an emitter of a single event. It can be obtained by `emitter.getSingle()`.
* [Event](Event.md) - the base class of event object.
* [Listener](Listener.md) - returns from methods like `add()`.
* IOptions - the interface of [options](options.md) for Emitter constructor.
* IHandler - the interface of [handler](handler.md) for methods like `add()`.

Example:

```typescript
import Emitter, * as E from "axy-events";

const
    options: E.IOptions = {
        events: ["one", "two"]
    },
    emitter: Emitter = new Emitter(options),
    handler1: E.IHandler = function (e: E.Event) {
        console.log(1);
        e.stopPropagation();
    },
    handler2: E.IHandler = function (e: E.Event) {
        console.log(2);
    },
    listener1: E.Listener = emitter.add("one", handler1),
    listener2: E.Listener = emitter.add("one", handler2);

let e: E.Event;

e = emitter.emit("one"); // 1
if (e.isPropagationStopped()) {
    listener1.remove();
    emitter.emit("one"); // 2
}
```