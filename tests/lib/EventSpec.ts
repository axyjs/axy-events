/// <reference path="../../typings/jasmine.d.ts" />
"use strict";

import Event from "../../lib/Event";

describe("Event", function (): void {

    class CustomEvent extends Event {
        public x: number;
        public y: number;
    }

    it("constructor and name", function (): void {
        const e: CustomEvent = new CustomEvent("custom");
        expect(e.type).toBe("custom");
        expect(e.x).toBeUndefined();
        expect(e.y).toBeUndefined();
        expect(e.hasOwnProperty("z")).toBeFalsy();
    });

    it("constructor and fields", function (): void {
        const e: CustomEvent = new CustomEvent("custom", {x: 5, z: 6});
        expect(e.type).toBe("custom");
        expect(e.x).toBe(5);
        expect(e.y).toBeUndefined();
        expect(e.hasOwnProperty("z")).toBeTruthy();
    });

    it("stopPropagation", function (): void {
        const e: Event = new Event("event");
        expect(e.isPropagationStopped()).toBe(false);
        e.stopPropagation();
        expect(e.isPropagationStopped()).toBe(true);
        e.stopPropagation();
        expect(e.isPropagationStopped()).toBe(true);
    });

    it("preventDefault", function (): void {
        const e: Event = new Event("event");
        expect(e.isDefaultPrevented()).toBe(false);
        e.preventDefault();
        expect(e.isDefaultPrevented()).toBe(true);
        e.preventDefault();
        expect(e.isDefaultPrevented()).toBe(true);
    });
});
