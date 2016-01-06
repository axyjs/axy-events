/**
 * @package axy-events
 * @author Oleg Grigoriev <go.vasac@gmail.com>
 */
import Event from "./Event";
/**
 * Event handler as function
 * Takes an event object and returns anything
 * (FALSE is stopPropagation() and preventDefault())
 */
export interface IHandlerFunction {
    (e: Event): any;
}
/**
 * The array of the context and method (or method name)
 */
export declare type IHandlerArray = [Object, Function | string];
/**
 * The array of the context and method (or method name) and bound arguments
 */
export declare type IHandlerArrayArgs = [Object, Function | string, any[]];
/**
 * All variants of event handler
 */
declare type IHandler = IHandlerFunction | IHandlerArray | IHandlerArrayArgs;
export default IHandler;
