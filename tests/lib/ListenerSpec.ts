/// <reference path="../../typings/jasmine.d.ts" />
"use strict";

import Listener from "../../lib/Listener";
import Event from "../../lib/Event";
import IHandler from "../../lib/IHandler";

describe("Listener", function (): void {

    class CustomEvent extends Event {
        public s: string;

        public toString(): string {
            return this.s;
        }
    }

    it("function", function (): void {
        const
            handler: IHandler = function (e: Event): any {
                return Array.prototype.join.call(arguments, ",");
            },
            listener: Listener = new Listener(handler, null, 0),
            e1: CustomEvent = new CustomEvent("custom", {s: "one"}),
            e2: CustomEvent = new CustomEvent("custom", {s: "two"});
        expect(listener.count).toBe(0);
        expect(listener.call(e1)).toBe("one");
        expect(listener.count).toBe(1);
        expect(listener.call(e2)).toBe("two");
        expect(listener.count).toBe(2);
    });

    it("[object,function]", function (): void {
        const
            object: any = {
                name: "objectName",
                method: function (e: Event): any {
                    return this.name + ":" + Array.prototype.join.call(arguments, ",");
                }
            },
            handler: IHandler = [object, object.method],
            listener: Listener = new Listener(handler, null, 0),
            e1: CustomEvent = new CustomEvent("custom", {s: "one"}),
            e2: CustomEvent = new CustomEvent("custom", {s: "two"});
        expect(listener.count).toBe(0);
        expect(listener.call(e1)).toBe("objectName:one");
        expect(listener.count).toBe(1);
        object.method = function (): string {
            return "none";
        };
        expect(listener.call(e2)).toBe("objectName:two");
        expect(listener.count).toBe(2);
    });

    it("[object,name]", function (): void {
        const
            object: any = {
                name: "objectName",
                method: function (e: Event): any {
                    return this.name + ":" + Array.prototype.join.call(arguments, ",");
                }
            },
            handler: IHandler = [object, "method"],
            listener: Listener = new Listener(handler, null, 0),
            e1: CustomEvent = new CustomEvent("custom", {s: "one"}),
            e2: CustomEvent = new CustomEvent("custom", {s: "two"});
        expect(listener.count).toBe(0);
        expect(listener.call(e1)).toBe("objectName:one");
        expect(listener.count).toBe(1);
        object.method = function (): string {
            return "none";
        };
        expect(listener.call(e2)).toBe("none");
        expect(listener.count).toBe(2);
    });

    it("[object,function,args]", function (): void {
        const
            object: any = {
                name: "objectName",
                method: function (e: Event): any {
                    return this.name + ":" + Array.prototype.join.call(arguments, ",");
                }
            },
            handler: IHandler = [object, object.method, [1, 2, 3]],
            listener: Listener = new Listener(handler, null, 0),
            e1: CustomEvent = new CustomEvent("custom", {s: "one"});
        expect(listener.count).toBe(0);
        expect(listener.call(e1)).toBe("objectName:1,2,3,one");
        expect(listener.count).toBe(1);
    });

    it("[object,name,args]", function (): void {
        const
            object: any = {
                name: "objectName",
                method: function (e: Event): any {
                    return this.name + ":" + Array.prototype.join.call(arguments, ",");
                }
            },
            handler: IHandler = [object, "method", [4, 5, 6]],
            listener: Listener = new Listener(handler, null, 0),
            e1: CustomEvent = new CustomEvent("custom", {s: "one"});
        expect(listener.count).toBe(0);
        expect(listener.call(e1)).toBe("objectName:4,5,6,one");
        expect(listener.count).toBe(1);
    });

    it("remove", function (): void {
        let calls: number = 0;
        const
            handler: IHandler = function (): any {
                calls++;
            },
            listener: Listener = new Listener(handler, null, 0),
            e: Event = new Event("event");
        listener.call(e);
        expect(calls).toBe(1);
        expect(listener.count).toBe(1);
        listener.call(e);
        expect(calls).toBe(2);
        expect(listener.count).toBe(2);
        expect(listener.remove()).toBe(true);
        listener.call(e);
        expect(calls).toBe(2);
        expect(listener.count).toBe(2);
        expect(listener.remove()).toBe(false);
        listener.call(e);
        expect(calls).toBe(2);
        expect(listener.count).toBe(2);
    });

    it("event.results", function (): void {
        let value: number = 5;
        const
            handler: IHandler = function (): any {
                return value;
            },
            listener: Listener = new Listener(handler, null, 0),
            e: Event = new Event("event");
        listener.call(e);
        value = 3;
        listener.call(e);
        value = 10;
        listener.call(e);
        listener.remove();
        value = 8;
        listener.call(e);
        value = 4;
        listener.call(e);
        expect(e.results).toEqual([5, 3, 10]);
    });

    it("return false", function (): void {
        let result: any = true;
        const
            handler: IHandler = function (): any {
                return result;
            },
            listener: Listener = new Listener(handler, null, 0),
            e: Event = new Event("event");
        listener.call(e);
        expect(e.isDefaultPrevented()).toBeFalsy();
        expect(e.isPropagationStopped()).toBeFalsy();
        result = null;
        listener.call(e);
        expect(e.isDefaultPrevented()).toBeFalsy();
        expect(e.isPropagationStopped()).toBeFalsy();
        result = false;
        listener.call(e);
        expect(e.isDefaultPrevented()).toBeTruthy();
        expect(e.isPropagationStopped()).toBeTruthy();
    });

    it("bound data", function (): void {
        const
            handler: IHandler = function (e: Event): any {
                const result: any = e.data;
                e.data = null;
                return result;
            },
            listener: Listener = new Listener(handler, 27, 0),
            e: Event = new Event("event");
        expect(listener.call(e)).toBe(27);
        expect(e.data).toBeNull();
        expect(listener.call(e)).toBe(27);
    });

    it("max count", function (): void {
        let calls: number = 0;
        const
            handler: IHandler = function (e: Event): any {
                calls++;
                return calls;
            },
            listener: Listener = new Listener(handler, null, 3),
            e: Event = new Event("event");
        expect(listener.call(e)).toBe(1);
        expect(listener.call(e)).toBe(2);
        expect(listener.call(e)).toBe(3);
        expect(listener.call(e)).toBeNull();
        expect(listener.call(e)).toBeNull();
        expect(listener.count).toBe(3);
    });
});
