(function() {
  var __btns = {};

  // re-compute pico8_buttons[playerIndex] bitfield using new states
  function update_btns(playerIndex) {
    pico8_buttons[playerIndex] =
      Object.keys(__btns[playerIndex]).reduce(function(val, btn) {
        return val | (__btns[playerIndex][btn] ? Math.pow(2, btn) : 0);
      }, 0);
  }

  // domElement, btnIndex are required
  // playerIndex is optional and defaults to 0 (single player)
  function registerP8Btn(domElement, btnIndex, playerIndex) {
    // initialize objects if needed
    playerIndex = playerIndex || 0;
    window.pico8_buttons = window.pico8_buttons || [];
    pico8_buttons[playerIndex] = pico8_buttons[playerIndex] || 0;
    __btns[playerIndex] = __btns[playerIndex] || {};

    // listen for touchstart and touchend to toggle buttons
    domElement.addEventListener('touchstart', function() {
      __btns[playerIndex][btnIndex] = true;
      update_btns(playerIndex);
    });
    domElement.addEventListener('touchend', function() {
      __btns[playerIndex][btnIndex] = false;
      update_btns(playerIndex);
    });
  }

  window.registerP8Btn = registerP8Btn;
})();
