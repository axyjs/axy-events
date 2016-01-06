# axy-events

[![npm](https://img.shields.io/npm/v/axy-events.svg)](axy-events)
[![Build Status](https://travis-ci.org/axyjs/axy-events.svg?branch=master)](https://travis-ci.org/axyjs/axy-events)
[![Coverage Status](https://coveralls.io/repos/axyjs/axy-events/badge.svg?branch=master&service=github)](https://coveralls.io/github/axyjs/axy-events?branch=master)

An event emitter implementation.

It is not related to DOM-events.

Features:

* add and remove listeners.
* create listeners with limited number of calls.
* event classes inheritance.
* stopPropagation() and preventDefault().
* handlers: bound context, arguments and data.

### Classes and Interfaces

* [Emitter](doc/Emitter.md)
* [SingleEmitter](doc/SingleEmitter.md)
* [Emitter Options](doc/options.md)
* [Event Object](doc/Event.md)
* [Listener Object](doc/Listener.md)
* [Handler Format](doc/handler.md)
* [Emit Arguments](doc/emit.md)
* [TypeScript Interface](doc/typescript.md)

### How to Use

##### NPM

```
npm install axy-events
```

Use (es6-module):

```javascript
import Emitter from "axy-events";

emitter = new Emitter();
```

Default export of the library is [Emitter](doc/Emitter.md) class.

For CommonJS:

```javascript
var Emitter = require("axy-events").default;
```

##### Browser (antiquated method)

Include the js-file from the `/browser/` directory of this repo:

```html
<script src="axy-events.min.js"></script>
```

```javascript
var Emitter = axy.events;

// ...
```

##### Browser & NPM

Use [webpack](https://webpack.github.io) with NPM version.

##### TypeScript

See [typescript](doc/typescript.md) section.

### Building and testing

Required global [gulp](http://gulpjs.com/).

See `gulpfile.js` for more details.
