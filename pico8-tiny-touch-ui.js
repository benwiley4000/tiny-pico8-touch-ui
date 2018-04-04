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
    function press(e) {
      e.preventDefault();
      __btns[playerIndex][btnIndex] = true;
      update_btns(playerIndex);
    }
    function release() {
      __btns[playerIndex][btnIndex] = false;
      update_btns(playerIndex);
    }
    domElement.addEventListener('touchstart', press);
    domElement.addEventListener('mousedown', press);
    domElement.addEventListener('touchend', release);
    domElement.addEventListener('mouseup', release);
  }

  window.registerP8Btn = registerP8Btn;
})();
