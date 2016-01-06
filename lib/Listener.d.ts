/**
 * @package axy-events
 * @author Oleg Grigoriev <go.vasac@gmail.com>
 */
import Event from "./Event";
import IHandler from "./IHandler";
/**
 * The listener (binding between an event and a handler)
 */
declare class Listener {
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
    constructor(handler: IHandler, data: any, count: number);
    /**
     * Detaches a listener from the event
     */
    remove(): boolean;
    /**
     * Calls a event handler
     *
     * @param e
     * @returns {any}
     *          result of the handler
     */
    call(e: Event): any;
    /**
     * How many time the handler was called
     */
    count: number;
    private callback;
    private boundMethod;
    private data;
    private _count;
    private max;
}
export default Listener;
