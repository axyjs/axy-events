/// <reference path="../../typings/jasmine.d.ts" />
"use strict";

import IOptions from "../../lib/IOptions";
import { normalizeOptions } from "../../lib/IOptions";
import Event from "../../lib/Event";

describe("IOptions", function (): void {
    describe("normalizeOptions", function (): void {

        it("defaults", function (): void {
            const
                options: IOptions = null,
                expected: IOptions = {
                    events: {},
                    notFixed: true,
                    default: null,
                    prefix: ""
                };
            expect(normalizeOptions(options)).toEqual(expected);
        });

        it("merge", function (): void {
            const
                options: IOptions = {
                    notFixed: false,
                    default: "e",
                    prefix: "x."
                },
                expected: IOptions = {
                    events: {},
                    notFixed: true,
                    default: "e",
                    prefix: "x."
                };
            expect(normalizeOptions(options)).toEqual(expected);
        });

        it("events list", function (): void {
            const
                options: IOptions = {
                    events: ["one", "two", "three"],
                    default: "e",
                    prefix: "x."
                },
                expected: IOptions = {
                    events: {
                        one: {
                            ClassEvent: Event,
                        },
                        two: {
                            ClassEvent: Event,
                        },
                        three: {
                            ClassEvent: Event,
                        },
                    },
                    notFixed: false,
                    default: "e",
                    prefix: "x."
                };
            expect(normalizeOptions(options)).toEqual(expected);
        });

        it("events dict", function (): void {
            class CustomEvent extends Event {
            }
            const
                options: IOptions = {
                    events: {
                        one: CustomEvent,
                        two: {
                            ClassEvent: CustomEvent,
                        },
                        three: {},
                        four: null
                    },
                    notFixed: true,
                    default: "e",
                    prefix: "x."
                },
                expected: IOptions = {
                    events: {
                        one: {
                            ClassEvent: CustomEvent,
                        },
                        two: {
                            ClassEvent: CustomEvent,
                        },
                        three: {
                            ClassEvent: Event,
                        },
                        four: {
                            ClassEvent: Event,
                        },
                    },
                    notFixed: true,
                    default: "e",
                    prefix: "x."
                };
            expect(normalizeOptions(options)).toEqual(expected);
        });

    });
});
