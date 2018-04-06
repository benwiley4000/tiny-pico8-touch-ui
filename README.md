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

Include [this](tiny-pico8-touch-ui.js) in your page...

```html
<script src="tiny-pico8-touch-ui.js"></script>
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

> [FAQ](#faq)

## fetching script from CDN

If you prefer to fetch tiny-pico8-touch-ui.js from a CDN:

```html
<script src="https://unpkg.com/tiny-pico8-touch-ui"></script>
```

(It's better to specify a specific version string rather than letting unpkg serve you the latest version each time the page is fetched; try opening https://unpkg.com/tiny-pico8-touch-ui in a web browser first so it resolves to a more specific URL, then include that as your script `src`.)

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

## FAQ

### that worked, but there's no sound!

That will happen on many phones (not because of this library, but because PICO-8 starts running before the user has interacted with the screen).

To get around that, you can defer running your game until after the user has clicked on the screen. Here's a way to do that (this is undocumented and might change in a future PICO-8 release):

```html
<button id="myGameStartButton">Start!</button>
<script>
  var Module = {};
  // ...
  // This part is important!!
  Module.noInitialRun = true;
</script>
<script src="mygame.js"></script>
<script>
  var game_started = false;
  function startGame() {
    if (game_started) return;
    game_started = true;
    Module.calledRun = false;
    window.shouldRunNow = true;
    run();
  }
  document.querySelector('#myGameStartButton')
    .addEventListener('click', startGame);
</script>
```

### ok that works, but I don't actually want to display touch controls if the page is loaded on a computer

Check for a `touchstart` event and set a variable so when the subsequent `click` event follows, you know to show touch controls.

```html
<style>
  .touch_controls {
    display: none;
  }
  .using_touch .touch_controls {
    display: initial;
  }
</style>
<div class="touch_controls">
  <button id="left"> < </button>
  <!-- ... -->
</div>
<!-- ... -->
<script>
  var game_started = false;
  var using_touch = false;
  function startGame() {
    if (game_started) return;
    game_started = true;
    if (using_touch) {
      document.body.classList.add('using_touch');
    }
    Module.calledRun = false;
    window.shouldRunNow = true;
    run();
  }
  document.querySelector('#myGameStartButton')
    .addEventListener('click', startGame);
  
  // on a touch device, touchstart always
  // gets processed before click
  function activateTouch() {
    using_touch = true;
  }
  document.addEventListener('touchstart', activateTouch);
</script>
```
