/// <reference path="../../typings/jasmine.d.ts" />
"use strict";

import Emitter from "../../lib/Emitter";
import SingleEmitter from "../../lib/SingleEmitter";
import IOptions from "../../lib/IOptions";
import IHandler from "../../lib/IHandler";
import Event from "../../lib/Event";

describe("Emitter", function (): void {

    describe("events list", function (): void {

        it("empty", function (): void {
            const emitter: Emitter = new Emitter();
            expect(emitter.isExists("one")).toBe(true);
            expect(emitter.isExists("two")).toBe(true);
        });

        it("fixed", function (): void {
            const emitter: Emitter = new Emitter({events: ["one"], prefix: "p."});
            let single: SingleEmitter;
            expect(emitter.isExists("one")).toBe(true);
            expect(emitter.isExists("two")).toBe(false);
            single = emitter.getSingle("one");
            expect(single instanceof SingleEmitter).toBe(true);
            expect(single.getType()).toBe("p.one");
            expect(emitter.getSingle("one")).toBe(single);
            expect(function (): void {
                emitter.getSingle("two");
            }).toThrow();
        });

        it("not fixed not empty", function (): void {
            const emitter: Emitter = new Emitter({events: ["one"], notFixed: true});
            expect(emitter.isExists("one")).toBe(true);
            expect(emitter.isExists("two")).toBe(true);
        });

        it("default event", function (): void {
            const
                options1: IOptions = {events: ["one", "two"], default: "one"},
                options2: IOptions = {events: ["one", "two"]},
                emitter1: Emitter = new Emitter(options1),
                emitter2: Emitter = new Emitter(options2);
            expect(emitter1.getSingle(null)).toBe(emitter1.getSingle("one"));
            expect(emitter1.getSingle(null)).toBe(emitter1.getSingle(null));
            expect(emitter1.getSingle(null)).not.toBe(emitter1.getSingle("two"));
            expect(function (): void {
                emitter2.getSingle(null);
            }).toThrow();
        });
    });

    it("add", function (): void {
        class CustomEvent extends Event {
            public name: string;
        }
        let result: any[],
            rEvent: CustomEvent;
        const
            options: IOptions = {
                events: {
                    "custom": CustomEvent,
                    "normal": null,
                }
            },
            emitter: Emitter = new Emitter(options),
            handlerC1: IHandler = function (e: CustomEvent): any {
                result.push(e.data);
            },
            handlerC2: IHandler = function (e: CustomEvent): any {
                result.push(e.name);
            },
            handlerN: IHandler = function (e: Event): any {
                result.push("n");
            };
        emitter.add("custom", handlerC1, "d");
        emitter.getSingle("custom").add(handlerC2);
        emitter.add("normal", handlerN);
        result = [];
        rEvent = <CustomEvent>emitter.emit("custom", {name: "test"});
        expect(result).toEqual(["d", "test"]);
        expect(rEvent instanceof CustomEvent).toBeTruthy();
        expect(rEvent.name).toBe("test");
        result = [];
        emitter.emit("normal");
        expect(result).toEqual(["n"]);
    });

    it("addOnce", function (): void {
        let result: any[];
        const
            emitter: Emitter = new Emitter(),
            handler1: IHandler = function (e: Event): any {
                result.push(1);
            },
            handler2: IHandler = function (e: Event): any {
                result.push(2);
            };
        emitter.add("test", handler1);
        emitter.addOnce("test", handler2);
        result = [];
        emitter.emit("unknown");
        expect(result).toEqual([]);
        emitter.emit("test");
        emitter.emit("test");
        emitter.emit("test");
        expect(result).toEqual([1, 2, 1, 1]);
    });

    it("clear", function (): void {
        let result: any[];
        const
            emitter: Emitter = new Emitter(),
            handler1: IHandler = function (e: Event): any {
                result.push(1);
            },
            handler2: IHandler = function (e: Event): any {
                result.push(2);
            },
            handler3: IHandler = function (e: Event): any {
                result.push(3);
            };
        emitter.add("one", handler1);
        emitter.add("one", handler2);
        emitter.add("two", handler3);
        result = [];
        emitter.emit("two");
        emitter.emit("one");
        expect(result).toEqual([3, 1, 2]);
        result = [];
        emitter.clear();
        emitter.emit("two");
        emitter.emit("one");
        expect(result).toEqual([]);
    });

    it("createEvent", function (): void {
        class CustomEvent extends Event {
            public name: string;
        }
        const
            options: IOptions = {
                events: {
                    "custom": CustomEvent,
                    "normal": null,
                },
                default: "normal",
                prefix: "x.",
            },
            emitter: Emitter = new Emitter(options),
            e1: CustomEvent = <CustomEvent>emitter.createEvent("custom", {name: "one"}),
            e2: CustomEvent = <CustomEvent>emitter.createEvent("custom", {name: "two"}),
            e3: Event = emitter.createEvent(null),
            e4: Event = emitter.createEvent("normal");
        expect(e1.type).toBe("x.custom");
        expect(e2.type).toBe("x.custom");
        expect(e3.type).toBe("x.normal");
        expect(e4.type).toBe("x.normal");
        expect(e1.name).toBe("one");
        expect(e2.name).toBe("two");
        expect(e3).not.toBe(e4);
        expect(function (): void {
            emitter.createEvent("unknown");
        }).toThrow();
    });

});
