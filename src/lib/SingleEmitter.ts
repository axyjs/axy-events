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
class SingleEmitter {

    /**
     * The constructor
     */
    constructor(private options: ISingleEmitterOptions) {
    }

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
    add(handler: IHandler, data: any = null): Listener {
        return this.addOnce(handler, data, 0);
    }

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
    addOnce(handler: IHandler, data: any = null, count: number = 1): Listener {
        const listener: Listener = new Listener(handler, data, count);
        this.listeners.push(listener);
        return listener;
    }

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
    emit(e: any = null): Event {
        let event: Event;
        if (e instanceof Event) {
            event = <Event>e;
        } else {
            event = this.createEvent(e);
        }
        for (let listener of this.listeners) {
            listener.call(event);
            if (event.isPropagationStopped()) {
                break;
            }
        }
        return event;
    }

    /**
     * Clears all listeners of this event
     */
    clear(): void {
        this.listeners = [];
    }

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
    createEvent(data: Object = null): Event {
        return new this.options.ClassEvent(this.options.type, data);
    }

    /**
     * Returns full type of event
     *
     * @returns {string}
     */
    getType(): string {
        return this.options.type;
    }

    /**
     * Returns short type (without prefix) of event
     *
     * @returns {string}
     */
    getShortType(): string {
        return this.options.shortType;
    }

    private listeners: Listener[] = [];
}

export default SingleEmitter;
