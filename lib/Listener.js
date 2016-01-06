/**
 * @package axy-events
 * @author Oleg Grigoriev <go.vasac@gmail.com>
 */
/**
 * The listener (binding between an event and a handler)
 */
var Listener = (function () {
    /**
     * The constructor
     *
     * @param handler
     *        the event handler
     * @param data
     *        the bound data (available in the handler by event.data)
     * @param count
     *        limit of calls (0 - no limit)
     */
    function Listener(handler, data, count) {
        this._count = 0;
        if (typeof handler === "function") {
            this.callback = handler;
        }
        else if (typeof handler[1] === "function") {
            this.callback = bindCallback(handler);
        }
        else {
            this.boundMethod = new BoundMethod(handler);
        }
        this.max = count;
        this.data = data;
    }
    /**
     * Detaches a listener from the event
     */
    Listener.prototype.remove = function () {
        if (this.callback || this.boundMethod) {
            this.callback = null;
            this.boundMethod = null;
            return true;
        }
        return false;
    };
    /**
     * Calls a event handler
     *
     * @param e
     * @returns {any}
     *          result of the handler
     */
    Listener.prototype.call = function (e) {
        var result;
        e.data = this.data;
        if (this.callback) {
            result = this.callback.call(null, e);
        }
        else if (this.boundMethod) {
            result = this.boundMethod.call(e);
        }
        else {
            return null;
        }
        e.results.push(result);
        if (result === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        this._count++;
        if (this._count === this.max) {
            this.remove();
        }
        return result;
    };
    Object.defineProperty(Listener.prototype, "count", {
        /**
         * How many time the handler was called
         */
        get: function () {
            return this._count;
        },
        enumerable: true,
        configurable: true
    });
    return Listener;
})();
var bind = Function.prototype.bind;
function bindCallback(callback) {
    var method = callback[1];
    if (callback[2]) {
        var args = [callback[0]].concat(callback[2]);
        return bind.apply(method, args);
    }
    else {
        return method.bind(callback[0]);
    }
}
var BoundMethod = (function () {
    function BoundMethod(callback) {
        this.context = callback[0];
        this.method = callback[1];
        this.args = callback[2] || [];
        this.index = this.args.length;
        this.args.push(null);
    }
    BoundMethod.prototype.call = function (e) {
        var args = this.args, context = this.context;
        args[this.index] = e;
        return context[this.method].apply(context, args);
    };
    return BoundMethod;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Listener;
