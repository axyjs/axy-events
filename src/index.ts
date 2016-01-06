/**
 * An event emitter implementation
 *
 * The default export of the es6-module is Emitter.
 * The additional export designed for TypeScript typing.
 *
 * @package axy-events
 * @author Oleg Grigoriev <go.vasac@gmail.com>
 * @license MIT
 */
/* tslint:disable:no-unused-variable */
import Emitter from "./lib/Emitter";
import SingleEmitter from "./lib/SingleEmitter";
import Event from "./lib/Event";
import Listener from "./lib/Listener";
import IOptions from "./lib/IOptions";
import IHandler from "./lib/IHandler";

export default Emitter;
export { SingleEmitter, Event, Listener, IOptions, IHandler };
