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
        const phraseDisplay = document.querySelector('#phrase ul');         // Phrase elements
        for (let i=0; i<this.phrase.length; i++) {                          // For each character of phrase, display li element on screen
            let li = document.createElement("li");
            if (this.phrase[i] === ' ') {                                   // If character is space, add space to display
                li.classList.add('space');
                li.textContent = ' ';
            } else {
                li.classList.add("hide", "letter", `${this.phrase[i]}`);    // If character is letter, display hidden letter elements
                li.textContent = `${this.phrase[i]}`;
            }
            phraseDisplay.append(li);
        }
    }

        /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */
    checkLetter(letter) {
        if (this.phrase.includes(letter)) {                                 // If phrase includes letter, return true, else return false
            return true;
        } else {
            return false;
        }
    };

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter) {                                             // Change class of matched letter to show on li element of phrase display
        const liElements = document.querySelectorAll('#phrase li')
        liElements.forEach(liElement => {
            let classes = liElement.classList;
            if(classes.contains(letter)) {
                classes.replace("hide", "show");
            }
        })
    };
}