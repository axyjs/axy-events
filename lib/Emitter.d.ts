/**
 * @package axy-events
 * @author Oleg Grigoriev <go.vasac@gmail.com>
 */
import IOptions from "./IOptions";
import Listener from "./Listener";
import IHandler from "./IHandler";
import Event from "./Event";
import SingleEmitter from "./SingleEmitter";
/**
 * Event emitter aggregates a few types of events.
 */
declare class Emitter {
    /**
     * The constructor
     */
    constructor(options?: IOptions);
    /**
     * Adds event listener
     *
     * @param eventType
     *        the short event type (without the emitter prefix)
     * @param handler
     *        the event handler
     * @param [data]
     *        bound data (available in the handler by event.data)
     * @returns {Listener}
     *          the listener object
     * @throws {Error}
     *         the specified event type is not found
     */
    add(eventType: string, handler: IHandler, data?: any): Listener;
    /**
     * Adds event listener with limited number of calls
     *
     * @param eventType
     *        the short event type (without the emitter prefix)
     * @param handler
     *        the event handler
     * @param [data]
     *        bound data (available in the handler by event.data)
     * @param [count]
     *        the limit of calls
     * @returns {Listener}
     *          the listener object
     * @throws {Error}
     *         the specified event type is not found
     */
    addOnce(eventType: string, handler: IHandler, data?: any, count?: number): Listener;
    /**
     * Emits an event
     *
     * @param eventType
     *        the short event type
     * @param [event]
     *        an event instance or the dictionary of event fields
     * @returns {Event}
     *          target event object
     * @throws {Error}
     *         the specified event type is not found
     */
    emit(eventType: string, event?: any): Event;
    /**
     * Creates an event object
     *
     * @param eventType
     *        the short event type
     * @param [data]
     *        the dictionary of event field
     * @returns {Event}
     *          an instance of specified class for this event type
     * @throws {Error}
     *         the specified event type is not found
     */
    createEvent(eventType: string, data?: Object): Event;
    /**
     * Clears all listeners for all events
     */
    clear(): void;
    /**
     * Checks if a event type is exists in this emitter
     *
     * @param eventType
     *        the short event type
     * @returns {boolean}
     *          is the event type exist
     */
    isExists(eventType: string): boolean;
    /**
     * Returns a signle emitter of specified event
     *
     * @param eventType
     *        the short event type
     * @returns {SingleEmitter}
     *          the single event emitter
     * @throws {Error}
     *         the specified event type is not found
     */
    getSingle(eventType: string): SingleEmitter;
    private options;
    private nested;
}
export default Emitter;
