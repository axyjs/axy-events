/**
 * @package axy-events
 * @author Oleg Grigoriev <go.vasac@gmail.com>
 */
/**
 * The base event object
 */
declare class Event {
    /**
     * The event type
     */
    type: string;
    /**
     * The data that bound in `add()` method.
     * Unique for each listener.
     */
    data: any;
    /**
     * The list of handlers results
     */
    results: any[];
    /**
     * The constructor
     *
     * @param name
     * @param fields
     *        fields for merging
     */
    constructor(type: string, fields?: Object);
    /**
     * Completes the bypass listeners
     */
    stopPropagation(): void;
    /**
     * Asks the caller not to perform a default action
     */
    preventDefault(): void;
    /**
     * Checks if bypass has been stoped
     */
    isPropagationStopped(): boolean;
    /**
     * Checks if the default action has been prevented
     */
    isDefaultPrevented(): boolean;
    private _isPropagationStopped;
    private _isDefaultPrevented;
}
export default Event;
