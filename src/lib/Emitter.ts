/**
 * @package axy-events
 * @author Oleg Grigoriev <go.vasac@gmail.com>
 */
import IOptions from "./IOptions";
import { normalizeOptions, INormalizedOptions, IEventParameters } from "./IOptions";
import Listener from "./Listener";
import IHandler from "./IHandler";
import Event from "./Event";
import SingleEmitter from "./SingleEmitter";

/**
 * Event emitter aggregates a few types of events.
 */
class Emitter {

    /**
     * The constructor
     */
    constructor(options: IOptions = null) {
        this.options = normalizeOptions(options);
    }

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
    public add(eventType: string, handler: IHandler, data: any = null): Listener {
        return this.getSingle(eventType).add(handler, data);
    }

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
    public addOnce(eventType: string, handler: IHandler, data: any = null, count: number = 1): Listener {
        return this.getSingle(eventType).addOnce(handler, data, count);
    }

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
    public emit(eventType: string, event: any = null): Event {
        return this.getSingle(eventType).emit(event);
    }

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
    public createEvent(eventType: string, data: Object = null): Event {
        return this.getSingle(eventType).createEvent(data);
    }

    /**
     * Clears all listeners for all events
     */
    public clear(): void {
        const nested: INested = this.nested;
        for (let k in nested) {
            if (nested.hasOwnProperty(k)) {
                nested[k].clear();
            }
        }
    }

    /**
     * Checks if a event type is exists in this emitter
     *
     * @param eventType
     *        the short event type
     * @returns {boolean}
     *          is the event type exist
     */
    public isExists(eventType: string): boolean {
        const options: INormalizedOptions = this.options;
        if (options.events.hasOwnProperty(eventType)) {
            return true;
        }
        return options.notFixed;
    }

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
    public getSingle(eventType: string): SingleEmitter {
        const nested: INested = this.nested,
            options: INormalizedOptions = this.options;
        if (!eventType) {
            if (!options.default) {
                throw new Error("No default event");
            }
            eventType = options.default;
        }
        if (!nested[eventType]) {
            const params: IEventParameters = options.events[eventType];
            if (!params) {
                if (!options.notFixed) {
                    throw new Error("Event " + eventType + " not found");
                }
            }
            nested[eventType] = new SingleEmitter({
                type: options.prefix + eventType,
                shortType: eventType,
                ClassEvent: params ? params.ClassEvent : Event,
            });
        }
        return nested[eventType];
    }

    private options: INormalizedOptions;

    private nested: INested = {};
}

interface INested {
    [type: string]: SingleEmitter;
}

export default Emitter;
