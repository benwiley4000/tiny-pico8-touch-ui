# tiny-pico8-touch-ui

A tiny library which makes it easy to add touch controls to your [PICO-8](https://www.lexaloffle.com/pico-8.php) web game.

### [Try it here!](https://benwiley4000.github.io/tiny-pico8-touch-ui/)

PICO-8's default web export doesn't yet support touch controls, but I want my game to support mobile, which means supporting touch. If you're like me, you might find the built-in API for controlling touch button inputs from a web page a bit esoteric, and not super easy to read/write. Why not write a tiny API wrapper that makes this much easier?

If you have a page that looks like this:

```html
<!-- ... cart stuff -->
<button id="left"> < </button>
<button id="right"> > </button>
<button id="up"> /\ </button>
<button id="down"> \/ </button>
<button id="o"> O </button>
<button id="x"> X </button>
<!-- ... script stuff -->
```

Include [this](pico8-tiny-touch-ui.js) in your page...

```html
<script src="pico8-tiny-touch-ui.js"></script>
```

Then later you can register buttons like this:

```html
<script>
  registerP8Btn(document.getElementById('left'), 0);
  registerP8Btn(document.getElementById('right'), 1);
  registerP8Btn(document.getElementById('up'), 2);
  registerP8Btn(document.getElementById('down'), 3);
  registerP8Btn(document.getElementById('o'), 4);
  registerP8Btn(document.getElementById('x'), 5);
</script>
```

Are you trying to support multiple players? Then you can do:

```js
registerP8Btn(document.getElementById('x-P1'), 5, 0 /* player 1 */);
registerP8Btn(document.getElementById('x-P2'), 5, 1 /* player 2 */);
```

That's it!

## installing as a module

You can also install from npm:

```console
npm install --save tiny-pico8-touch-ui
```

And use like this:

```js
var registerP8Btn = require('tiny-pico8-touch-ui');

registerP8Btn(document.getElementById('left'), 0);
```

## building example site

To build a new copy of the example javascript export, open PICO-8 and run:

```console
load example.p8
export index.js
```

Then open index.html in a web browser.
