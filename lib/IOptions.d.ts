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
export declare type IEventsList = string[] | IEventsListDict;
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
/**
 * Normalizes options
 */
export declare function normalizeOptions(options: IOptions): INormalizedOptions;
