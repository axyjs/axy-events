/**
 * @package axy-events
 * @author Oleg Grigoriev <go.vasac@gmail.com>
 */

/**
 * The base event object
 */
class Event {
    /**
     * The event type
     */
    public type: string;

    /**
     * The data that bound in `add()` method.
     * Unique for each listener.
     */
    public data: any;

    /**
     * The list of handlers results
     */
    public results: any[];

    /**
     * The constructor
     *
     * @param name
     * @param fields
     *        fields for merging
     */
    constructor(type: string, fields: Object = null) {
        this.type = type;
        if (fields) {
            merge(this, fields);
        }
        this.results = [];
    }

    /**
     * Completes the bypass listeners
     */
    public stopPropagation(): void {
        this._isPropagationStopped = true;
    }

    /**
     * Asks the caller not to perform a default action
     */
    public preventDefault(): void {
        this._isDefaultPrevented = true;
    }

    /**
     * Checks if bypass has been stoped
     */
    public isPropagationStopped(): boolean {
        return this._isPropagationStopped;
    }

    /**
     * Checks if the default action has been prevented
     */
    public isDefaultPrevented(): boolean {
        return this._isDefaultPrevented;
    }

    private _isPropagationStopped: boolean = false;

    private _isDefaultPrevented: boolean = false;
}

function merge(destination: Object, source: Object): void {
    for (let k in source) {
        if (source.hasOwnProperty(k)) {
            destination[k] = source[k];
        }
    }
}

export default Event;
