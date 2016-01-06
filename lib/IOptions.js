/**
 * @package axy-events
 * @author Oleg Grigoriev <go.vasac@gmail.com>
 */
var Event_1 = require("./Event");
var defaults = {
    events: null,
    notFixed: false,
    default: null,
    prefix: ""
};
function normalizeEvents(events) {
    if (Array.isArray(events)) {
        var result = {};
        for (var _i = 0; _i < events.length; _i++) {
            var type = events[_i];
            result[type] = {
                ClassEvent: Event_1.default,
            };
        }
        return result;
    }
    for (var k in events) {
        if (events.hasOwnProperty(k)) {
            var e = events[k];
            if ((typeof e === "function") || (!e)) {
                events[k] = {
                    ClassEvent: e || Event_1.default,
                };
            }
            else if (!e.ClassEvent) {
                e.ClassEvent = Event_1.default;
            }
        }
    }
    return events;
}
/**
 * Normalizes options
 */
function normalizeOptions(options) {
    if (!options) {
        return {
            events: {},
            notFixed: true,
            default: null,
            prefix: ""
        };
    }
    for (var k in defaults) {
        if (defaults.hasOwnProperty(k)) {
            if (!options.hasOwnProperty(k)) {
                options[k] = defaults[k];
            }
        }
    }
    if (options.events === null) {
        options.events = {};
        options.notFixed = true;
    }
    else {
        options.events = normalizeEvents(options.events);
    }
    return options;
}
exports.normalizeOptions = normalizeOptions;
