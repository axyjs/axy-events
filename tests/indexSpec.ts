/// <reference path="../typings/jasmine.d.ts" />
"use strict";

import Emitter, * as Events from "..";

describe("index", function (): void {
    it("index", function (): void {
        const
            result: any[] = [],
            options: Events.IOptions = {
                events: ["one", "two"]
            },
            emitter: Emitter = new Emitter(options),
            single: Events.SingleEmitter = emitter.getSingle("one"),
            handler: Events.IHandler = function (e: Events.Event): any {
                result.push(e.data);
                return 2;
            },
            listener: Events.Listener = single.add(handler, "data");
        expect(result).toEqual([]);
        expect(emitter.emit("one").results).toEqual([2]);
        expect(result).toEqual(["data"]);
        expect(listener.count).toBe(1);
    });
});
