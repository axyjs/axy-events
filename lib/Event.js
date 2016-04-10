/**
 * @package axy-events
 * @author Oleg Grigoriev <go.vasac@gmail.com>
 */
"use strict";
/**
 * The base event object
 */
var Event = (function () {
    /**
     * The constructor
     *
     * @param name
     * @param fields
     *        fields for merging
     */
    function Event(type, fields) {
        if (fields === void 0) { fields = null; }
        this._isPropagationStopped = false;
        this._isDefaultPrevented = false;
        this.type = type;
        if (fields) {
            merge(this, fields);
        }
        this.results = [];
    }
    /**
     * Completes the bypass listeners
     */
    Event.prototype.stopPropagation = function () {
        this._isPropagationStopped = true;
    };
    /**
     * Asks the caller not to perform a default action
     */
    Event.prototype.preventDefault = function () {
        this._isDefaultPrevented = true;
    };
    /**
     * Checks if bypass has been stoped
     */
    Event.prototype.isPropagationStopped = function () {
        return this._isPropagationStopped;
    };
    /**
     * Checks if the default action has been prevented
     */
    Event.prototype.isDefaultPrevented = function () {
        return this._isDefaultPrevented;
    };
    return Event;
}());
function merge(destination, source) {
    for (var k in source) {
        if (source.hasOwnProperty(k)) {
            destination[k] = source[k];
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Event;
