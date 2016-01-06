/// <reference path="../../typings/jasmine.d.ts" />
"use strict";

import SingleEmitter from "../../lib/SingleEmitter";
import { ISingleEmitterOptions } from "../../lib/SingleEmitter";
import Event from "../../lib/Event";
import IHandler from "../../lib/IHandler";
import Listener from "../../lib/Listener";

describe("SingleEmitter", function (): void {

    let options: ISingleEmitterOptions;

    class TestEvent extends Event {
        public name: string;
    }

    beforeEach(function (): void {
        options = {
            type: "prefix.test",
            shortType: "test",
            ClassEvent: TestEvent,
        };
    });

    it("type", function(): void {
        const emitter: SingleEmitter = new SingleEmitter(options);
        expect(emitter.getType()).toBe("prefix.test");
        expect(emitter.getShortType()).toBe("test");
    });

    it("createEvent", function (): void {
        const
            emitter: SingleEmitter = new SingleEmitter(options),
            event1: TestEvent = <TestEvent>emitter.createEvent(),
            event2: TestEvent = <TestEvent>emitter.createEvent({name: "two"});
        expect(event1 instanceof TestEvent).toBeTruthy();
        expect(event2 instanceof TestEvent).toBeTruthy();
        expect(event1.name).toBeUndefined();
        expect(event2.name).toBe("two");
    });

    it("add / emit / clear", function (): void {
        let result: any[] = [],
            listener2: Listener,
            rEvent: Event;
        const
            emitter: SingleEmitter = new SingleEmitter(options),
            handler1: IHandler = function (e: Event): any {
                result.push([1, e.type, e instanceof TestEvent]);
                return 1;
            },
            subHandler2: Function = function (one: number, e: TestEvent): any {
                result.push([2, one, e.name]);
                return 2;
            },
            handler2: IHandler = [null, subHandler2, [1]],
            e1: TestEvent = <TestEvent>emitter.createEvent(),
            eb: Event = new Event("base");
        e1.name = "first";
        emitter.add(handler1);
        listener2 = emitter.add(handler2);
        rEvent = emitter.emit(e1);
        expect(rEvent).toBe(e1);
        expect(result).toEqual([[1, "prefix.test", true], [2, 1, "first"]]);
        expect(rEvent.results).toEqual([1, 2]);
        expect(rEvent.isDefaultPrevented()).toBe(false);
        expect(rEvent.isPropagationStopped()).toBe(false);
        result = [];
        rEvent = emitter.emit({name: "second"});
        expect(rEvent).not.toBe(e1);
        expect(result).toEqual([[1, "prefix.test", true], [2, 1, "second"]]);
        expect(rEvent.results).toEqual([1, 2]);
        result = [];
        expect(listener2.count).toBe(2);
        listener2.remove();
        rEvent = emitter.emit(eb);
        expect(rEvent).toBe(eb);
        expect(result).toEqual([[1, "base", false]]);
        expect(rEvent.results).toEqual([1]);
        expect(listener2.count).toBe(2);
        emitter.clear();
        result = [];
        rEvent = emitter.emit({name: "third"});
        expect(result).toEqual([]);
        expect(rEvent.results).toEqual([]);
        emitter.add([null, subHandler2, [3]]);
        result = [];
        rEvent = emitter.emit({name: "fourth"});
        expect(result).toEqual([[2, 3, "fourth"]]);
        expect(rEvent.results).toEqual([2]);
    });

    it("addOnce", function (): void {
        let result: any[];
        const
            emitter: SingleEmitter = new SingleEmitter(options),
            handler: Function = function (num: number, e: Event): any {
                result.push(num);
            };
        emitter.addOnce([null, handler, 1]);
        emitter.addOnce([null, handler, 2], null, 3);
        emitter.add([null, handler, 3]);
        result = [];
        emitter.emit({});
        emitter.emit({});
        emitter.emit({});
        emitter.emit({});
        emitter.emit({});
        expect(result).toEqual([1, 2, 3, 2, 3, 2, 3, 3, 3]);
    });

    it("bound data", function (): void {
        let result: any[];
        const
            emitter: SingleEmitter = new SingleEmitter(options),
            handler: Function = function (num: number, e: Event): any {
                result.push(num * e.data);
                e.data = 11;
            };
        emitter.addOnce([null, handler, 1], 5);
        emitter.addOnce([null, handler, 2], 10, 3);
        emitter.add([null, handler, 3], 20);
        result = [];
        emitter.emit({});
        emitter.emit({});
        emitter.emit({});
        emitter.emit({});
        emitter.emit({});
        expect(result).toEqual([5, 20, 60, 20, 60, 20, 60, 60, 60]);
    });

    it("stopPropagation", function (): void {
        let result: any[],
            e: Event;
        const
            emitter: SingleEmitter = new SingleEmitter(options),
            handler1: IHandler = function (e: Event): any {
                result.push(1);
            },
            handler2: IHandler = function (e: TestEvent): any {
                result.push(2);
                if (e.name === "stop") {
                    e.stopPropagation();
                }
            },
            handler3: IHandler = function (e: Event): any {
                result.push(3);
            };
        emitter.add(handler1);
        emitter.add(handler2);
        emitter.add(handler3);
        result = [];
        e = emitter.emit({name: "start"});
        expect(result).toEqual([1, 2, 3]);
        expect(e.isPropagationStopped()).toBe(false);
        expect(e.isDefaultPrevented()).toBe(false);
        result = [];
        e = emitter.emit({name: "stop"});
        expect(result).toEqual([1, 2]);
        expect(e.isPropagationStopped()).toBe(true);
        expect(e.isDefaultPrevented()).toBe(false);
        result = [];
        emitter.emit({name: "again"});
        expect(result).toEqual([1, 2, 3]);
    });

    it("return false", function(): void {
        let result: any[],
            e: Event;
        const
            emitter: SingleEmitter = new SingleEmitter(options),
            handler1: IHandler = function (e: Event): any {
                result.push(1);
            },
            handler2: IHandler = function (e: TestEvent): any {
                result.push(2);
                if (e.name === "stop") {
                    return false;
                }
            },
            handler3: IHandler = function (e: Event): any {
                result.push(3);
            };
        emitter.add(handler1);
        emitter.add(handler2);
        emitter.add(handler3);
        result = [];
        e = emitter.emit({name: "start"});
        expect(result).toEqual([1, 2, 3]);
        expect(e.isPropagationStopped()).toBe(false);
        expect(e.isDefaultPrevented()).toBe(false);
        result = [];
        e = emitter.emit({name: "stop"});
        expect(result).toEqual([1, 2]);
        expect(e.isPropagationStopped()).toBe(true);
        expect(e.isDefaultPrevented()).toBe(true);
        result = [];
        emitter.emit({name: "again"});
        expect(result).toEqual([1, 2, 3]);
    });
});
