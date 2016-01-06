# Single Emitter

The emitter of one event type.
Can be accessed by `emitter->getSingle(eventType)`.

The follow methods similarly methods of [Emitter](Emitter.md) but not take `eventType`:

* `add(handler: IHandler [, data: any]): Listener`
* `addOnce(handler: IHandler [data: any, [, count: number]): Listener`
* `emit(event: any): Event`
* `clear(): void`
* `createEvent([data: object]): Event`

##### `getType(): string` and `getShortType(): string`

```javascript
options = {
    prefix: "app.services."
};
emitter = new Emitter(options);
single = emitter.getSingle("hide");

single.getShortType(); // hide
single.getType(); // app.services.hide
```

