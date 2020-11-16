/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  /**
   * Initializes phrase property as the parameter converted to lowercase.
   * @constructor
   */
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Display phrase on game board
   */
  addPhraseToDisplay() {
    const list = document.querySelector('#phrase ul');
    [...this.phrase].forEach(c => {
      var item = document.createElement('li');
      item.innerHTML = c;
      if (c === ' ') {
        item.className = 'space';
      }
      else {
        item.className = 'hide letter ' + c;
      }
      list.appendChild(item);
    });
  }

  /**
   * Checks if passed letter is in phrase
   * @param {string} letter - Letter to check
   */
  checkLetter(letter) {
    return this.phrase.includes(letter);
  }

  /**
   * Displays passed letter on screen after a match is found
   * @param {string} letter - Letter to display
   */
  showMatchedLetter(letter) {
    const match = document.querySelectorAll('.'+letter);
    [...match].forEach(i => {
      i.classList.remove('hide');
      i.classList.add('show');
    });
  }
}