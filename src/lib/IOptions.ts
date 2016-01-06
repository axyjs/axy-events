/**
 * @package axy-events
 * @author Oleg Grigoriev <go.vasac@gmail.com>
 */
import Event from "./Event";

/**
 * Parameters of an event
 */
export interface IEventParameters {
    /**
     * Class (function-constructor) of event object.
     * By default Event.
     */
    ClassEvent?: typeof Event;
}

/**
 * Events list as dictionary.
 * type => parameters
 * parameters is dictionary.
 * or event class for short syntax.
 */
export interface IEventsListDict {
    [index: string]: (IEventParameters | typeof Event);
}

/**
 * Events lists: dictionary or list of event types
 */
export type IEventsList = string[] | IEventsListDict;

/**
 * Events list in the normalized view (short syntax has been removed)
 */
export interface INormalizedEventsList {
    [index: string]: IEventParameters;
}

/**
 * The interface of options for the Emitter constructor
 */
interface IOptions {
    /**
     * A list of valid events
     */
    events?: IEventsList;

    /**
     * Is events list fixed?
     * TRUE - allows use event that not contained in events list
     */
    notFixed?: boolean;

    /**
     * Default event type (if is not specified in corresponded methods)
     */
    default?: string;

    /**
     * Prefix of event types (describes the emitter)
     */
    prefix?: string;
}

const defaults: IOptions = {
    events: null,
    notFixed: false,
    default: null,
    prefix: ""
};

/**
 * The options after normalization
 */
export interface INormalizedOptions {
    events: INormalizedEventsList;
    notFixed: boolean;
    default: string;
    prefix: string;
}

export default IOptions;

function normalizeEvents(events: IEventsList): IEventsListDict {
    if (Array.isArray(events)) {
        const result: IEventsListDict = {};
        for (let type of events) {
            result[type] = {
                ClassEvent: Event,
            };
        }
        return result;
    }
    for (let k in events) {
        if ((<IEventsListDict>events).hasOwnProperty(k)) {
            const e: IEventParameters|typeof Event = events[k];
            if ((typeof e === "function") || (!e)) {
                events[k] = {
                    ClassEvent: e || Event,
                };
            } else if (!(<IEventParameters>e).ClassEvent) {
                (<IEventParameters>e).ClassEvent = Event;
            }
        }
    }
    return <IEventsListDict>events;
}

/**
 * Normalizes options
 */
export function normalizeOptions(options: IOptions): INormalizedOptions {
    if (!options) {
        return {
            events: {},
            notFixed: true,
            default: null,
            prefix: ""
        };
    }
    for (let k in defaults) {
        if (defaults.hasOwnProperty(k)) {
            if (!options.hasOwnProperty(k)) {
                options[k] = defaults[k];
            }
        }
    }
    if (options.events === null) {
        options.events = {};
        options.notFixed = true;
    } else {
        options.events = normalizeEvents(options.events);
    }
    return <INormalizedOptions>options;
}
