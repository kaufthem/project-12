/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
var game = new Game();
game.enableKeyboard = false;

document.getElementById('btn__reset').addEventListener('click', function() {
  game = new Game();
  game.startGame();
});

[...document.getElementsByClassName('key')].forEach(k => {
  k.addEventListener('click', function() {
    game.handleInteraction(k);
  });
});

document.addEventListener('keyup', function(e) {
  if (!game.enableKeyboard) return;
  if (/^[a-zA-Z]{1}$/.test(e.key)) {
    [...document.getElementsByClassName('key')].forEach(k => {
      if (e.key.toLowerCase() === k.innerHTML && !k.disabled) {
        game.handleInteraction(k);
      }
    });
  }
});