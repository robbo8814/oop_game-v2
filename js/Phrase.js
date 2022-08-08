/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
    * Display phrase on game board
    */
    addPhraseToDisplay() {
        const phraseDisplay = document.querySelector('#phrase ul');
        
        for (let i=0; i<this.phrase.length; i++) {
            let li = document.createElement("li");

            if (this.phrase[i] === ' ') {
                li.classList.add('space');
                li.textContent = ' ';
            } else {
                li.classList.add("hide", "letter", `${this.phrase[i]}`);
                li.textContent = `${this.phrase[i]}`;
            }
            phraseDisplay.append(li);
        }
        
        /* addPhraseToDisplay(): this adds letter placeholders to the display when the game starts.
        Each letter is presented by an empty box, one li element for each letter.
        See the example_phrase_html.txt file for an example of what the rendered HTML
        for a phrase should look like when the game starts, including any id or class attributes needed.
        When the player correctly guesses a letter, the empty box is replaced with the matched letter
        (see the showMatchedLetter() method below). Make sure the phrase displayed on the screen uses
        the letter CSS class for letters and the space CSS class for spaces.
        */
    }
        /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */
    checkLetter(letter) {
        if (this.phrase.includes(letter)) {
            return true;
        } else {
            return false;
        }
    };

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter) {
        const liElements = document.querySelectorAll('#phrase li')
        liElements.forEach(liElement => {
            let classes = liElement.classList;
            if(classes.contains(letter)) {
                classes.replace("hide", "show");
            }
        })
    };
}