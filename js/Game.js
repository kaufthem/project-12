/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  /**
   * Initializes missed, phrases, activePhrase properties.
   * @constructor
   */
  constructor() {
    this.missed = 0;
    this.phrases = [
      'Tell me what you see',
      'How are you',
      'Can you guess the phrase',
      'I love JavaScript',
      'Web development is fun'
    ];
    this.activePhrase = null;
    this.enableKeyboard = true;
  }

  /**
   * Begins game by selecting a random phrase and displaying it to user
   */
  startGame() {
    const overlay = document.getElementById('overlay');
    overlay.style.transition = 'all 0.5s linear';
    overlay.style.opacity = 0;
    overlay.addEventListener('transitionend', function(e) {
      overlay.style.visibility = 'hidden';
    }, {
      capture: false, once: true, passive: false
    });

    this.activePhrase = new Phrase(this.getRandomPhrase());
    this.activePhrase.addPhraseToDisplay();
    
    const hearts = document.querySelectorAll('.tries img');
    [...hearts].forEach(i => {
      i.src = 'images/liveHeart.png';
    });
    hearts[hearts.length-1].classList.add('beating-heart');
  }

  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random()*this.phrases.length)];
  }
  
  /**
  * Handles onscreen keyboard button clicks
  * @param {HTMLButtonElement} button - The clicked button element
  */
  handleInteraction(button) {
    const key = button.innerHTML;
    button.disabled = true;
    button.classList.add('key-pressed');
    if (this.activePhrase.checkLetter(key)) {
      button.classList.add('chosen');
      this.activePhrase.showMatchedLetter(key);
      if(this.checkForWin()) {
        this.gameOver(true);
      }
    } 
    else {
      button.classList.add('wrong');
      this.removeLife();
    }
  }

  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
  removeLife() {
    this.missed++;
    const hearts = document.querySelectorAll('.tries img'),
    current = hearts[hearts.length-this.missed];
    current.src = 'images/lostHeart.png';
    current.classList.remove('beating-heart');
    if (this.missed === hearts.length) {
      this.gameOver(false);
    }
    else {
      hearts[hearts.length-this.missed-1].classList.add('beating-heart');
    }
  }
  
  /**
   * Checks for winning move
   * @return {boolean} True if game has been won, false if game wasn't won
   */
  checkForWin() {
    return document.getElementsByClassName('hide').length === 0;
  }
  
  /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
  gameOver(gameWon) {
    this.enableKeyboard = false;
    const overlay = document.getElementById('overlay'), 
    gameOverMessage = document.getElementById('game-over-message');
    overlay.style.visibility = 'visible';
    setTimeout(function () {
      overlay.style.opacity = 1;
    }, 10);
    overlay.classList.remove('start');
    if (gameWon) {
      gameOverMessage.innerHTML = 'You won!';
      overlay.classList.remove('lose');
      overlay.classList.add('win');
    }
    else {
      gameOverMessage.innerHTML = 'You lost...';
      overlay.classList.remove('win');
      overlay.classList.add('lose');
    }

    const list = document.querySelector('#phrase ul');
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
    [...document.getElementsByClassName('key')].forEach(k => {
      k.classList.remove('chosen');
      k.classList.remove('wrong');
      k.classList.remove('key-pressed');
      k.disabled = false;
    });
    [...document.querySelectorAll('.tries img')].forEach(i => {
      i.classList.remove('beating-heart');
    });
  }
}