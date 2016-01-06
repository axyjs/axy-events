/**
 * @package axy-events
 * @author Oleg Grigoriev <go.vasac@gmail.com>
 */
import Listener from "./Listener";
import Event from "./Event";
import IHandler from "./IHandler";
/**
 * The interface of the single emitter options
 */
export interface ISingleEmitterOptions {
    /**
     * The full event type
     */
    type: string;
    /**
     * The short event type (without prefix)
     */
    shortType: string;
    /**
     * The class (function-constructor) of this emitter event objects
     */
    ClassEvent: typeof Event;
}
/**
 * Emitter of single event
 */
declare class SingleEmitter {
    private options;
    /**
     * The constructor
     */
    constructor(options: ISingleEmitterOptions);
    /**
     * Adds event listener
     *
     * @param handler
     *        the event handler
     * @param [data]
     *        bound data (available in the handler by event.data)
     * @returns {Listener}
     *          the listener object
     * @throws {Error}
     *         the specified event type is not found
     */
    add(handler: IHandler, data?: any): Listener;
    /**
     * Adds event listener with limited number of calls
     *
     * @param handler
     *        the event handler
     * @param [data]
     *        bound data (available in the handler by event.data)
     * @param [count]
     *        the limit of calls
     * @returns {Listener}
     *          the listener object
     */
    addOnce(handler: IHandler, data?: any, count?: number): Listener;
    /**
     * Emits an event
     *
     * @param [event]
     *        an event instance or the dictionary of event fields
     * @returns {Event}
     *          target event object
     * @throws {Error}
     *         the specified event type is not found
     */
    emit(e?: any): Event;
    /**
     * Clears all listeners of this event
     */
    clear(): void;
    /**
     * Creates an event object
     *
     * @param [data]
     *        the dictionary of event field
     * @returns {Event}
     *          an instance of specified class for this event type
     * @throws {Error}
     *         the specified event type is not found
     */
    createEvent(data?: Object): Event;
    /**
     * Returns full type of event
     *
     * @returns {string}
     */
    getType(): string;
    /**
     * Returns short type (without prefix) of event
     *
     * @returns {string}
     */
    getShortType(): string;
    private listeners;
}
export default SingleEmitter;
