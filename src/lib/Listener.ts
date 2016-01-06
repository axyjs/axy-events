/**
 * @package axy-events
 * @author Oleg Grigoriev <go.vasac@gmail.com>
 */

import Event from "./Event";
import IHandler from "./IHandler";
import { IHandlerFunction, IHandlerArrayArgs } from "./IHandler";

/**
 * The listener (binding between an event and a handler)
 */
class Listener {

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
    constructor(handler: IHandler, data: any, count: number) {
        if (typeof handler === "function") {
            this.callback = <IHandlerFunction>handler;
        } else if (typeof handler[1] === "function") {
            this.callback = bindCallback(<IHandlerArrayArgs>handler);
        } else {
            this.boundMethod = new BoundMethod(<IHandlerArrayArgs>handler);
        }
        this.max = count;
        this.data = data;
    }

    /**
     * Detaches a listener from the event
     */
    public remove(): boolean {
        if (this.callback || this.boundMethod) {
            this.callback = null;
            this.boundMethod = null;
            return true;
        }
        return false;
    }

    /**
     * Calls a event handler
     *
     * @param e
     * @returns {any}
     *          result of the handler
     */
    public call(e: Event): any {
        let result: any;
        e.data = this.data;
        if (this.callback) {
            result = this.callback.call(null, e);
        } else if (this.boundMethod) {
            result = this.boundMethod.call(e);
        } else {
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
    }

    /**
     * How many time the handler was called
     */
    public get count(): number {
        return this._count;
    }

    private callback: IHandlerFunction;

    private boundMethod: BoundMethod;

    private data: any;

    private _count: number = 0;

    private max: number;
}

const bind: typeof Function.prototype.bind = Function.prototype.bind;

function bindCallback(callback: IHandlerArrayArgs): IHandlerFunction {
    const method: Function = <Function>callback[1];
    if (callback[2]) {
        const args: any[] = [callback[0]].concat(callback[2]);
        return bind.apply(method, args);
    } else {
        return method.bind(callback[0]);
    }
}

class BoundMethod {
    constructor(callback: IHandlerArrayArgs) {
        this.context = callback[0];
        this.method = <string>callback[1];
        this.args = callback[2] || [];
        this.index = this.args.length;
        this.args.push(null);
    }

    public call(e: Event): any {
        const
            args: any[] = this.args,
            context: any = this.context;
        args[this.index] = e;
        return context[this.method].apply(context, args);
    }

    private context: any;

    private method: string;

    private args: any[];

    private index: number;
}

export default Listener;
