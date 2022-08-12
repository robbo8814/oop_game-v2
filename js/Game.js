/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

/*  Game.js to create a Game class methods for starting and ending the game, handling
    interactions, getting a random phrase, checking for a win, and removing a life from the
    scoreboard.
*/
class Game {
    constructor() {
        this.missed = 0; // Track the number of missd guesses by the player. Initialised at '0'.
        this.phrases = [                                                    // 5 phrases to use in the game
                        new Phrase('Run like the wind'),
                        new Phrase('You talking to me'),
                        new Phrase('Is it safe'),
                        new Phrase('What a dump'),
                        new Phrase('Show me the money')
                        ];
        this.activePhrase = null;                                           // Phrase that is currently in play. Initialised as 'null'.
        this.overLay = document.getElementById('overlay');                  // Overlay element
        this.lives = Array.from(document.querySelectorAll('.tries img'));   // Life elements
    }

    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {
        let phrase = this.getRandomPhrase();                                // Get random phrase
        this.overLay.style.display = 'none';                                // Remove overlay display
        this.activePhrase = phrase;                                         // Assign active phrase
        this.activePhrase.addPhraseToDisplay();                             // Display active phrase
    }

    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {
        const randomPhrase = Math.floor(Math.random()*this.phrases.length); // Get random phrase
        return this.activePhrase = this.phrases[randomPhrase];              // Assign random phrase to active phrase
    }

    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    */
    handleInteraction(key) {
        const letter = key.textContent;
        key.disabled = true;
        if (this.activePhrase.checkLetter(letter)) {                        // Check if letter selected exists within Active Phrase
            key.classList.add('chosen');                                    // Assign new css style to letter
            key.classList.add('bounce');                                    // Assign custom animation to letter
            this.activePhrase.showMatchedLetter(letter);                    // Unhide matched letter within the phrase displayed
                if (this.checkForWin()) {                                   // Check for win
                    this.gameOver(true);                                    // If win, Game Over activated
                }
            } else {
                key.classList.add('wrong');                                 // If letter doesn't match change css style of letter
                this.removeLife();                                          // Remove a life
            }
    }

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        const life = this.lives.find(life => life.getAttribute("src") === "images/liveHeart.png")   // Array of all life elements that are still left
        life.setAttribute('src', "images/lostHeart.png");                                           // Set life element to life lost style
        life.classList.add('bounce');                                                               // Add custom animation to lost life element
        this.missed ++                                                                              // Count incorrect guesses
        if (this.missed === 5) {                                                                    // If 5 incorrect guesses
            this.gameOver(false);                                                                   // Game Over activated
        }
    }

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */
    checkForWin() {
        const guessedLetters = Array.from(document.querySelectorAll('#phrase li')).filter(letter => letter.classList.contains('show')); // Array of all letters that have the class 'show' as they have been correctly guessed
        const hiddenPhrase = this.activePhrase.phrase.replace(/\s/g,'');    // Active Phrase only including characters and no spaces
        if (hiddenPhrase.length === guessedLetters.length) {                // If all letters have been guessed, return true, otherwise return false
            return true;
        } else {
            return false;
        }
    }

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        // Overlay show
        this.overLay.style.display = 'block';                               // Show Overlay
        if (gameWon) {
            this.overLay.className = 'win'                                  // If Game Won, show win display
        } else {
            this.overLay.className = 'lose'                                 // If Game Lost, show lose display
        }

        // Lives Reset
        this.lives.forEach(life => {                                        // Reset life elements img src & css style
            life.setAttribute('src', "images/liveHeart.png");
            life.classList.remove('bounce')
        });
        this.missed = 0;                                                    // Reset incorrect guess number

        // Keyboard reset
        const qwerty = Array.from(document.querySelectorAll('#qwerty .key'));   // Array of keyboard elements
        qwerty.forEach(key => {                                                 // For each keyboard element reset style
            key.className = 'key';
            key.disabled = false;
        });

        // Phrase reset
        const phraseDisplay = document.querySelector('#phrase ul');         // Reset phrase display, remove old ready for new
        phraseDisplay.innerHTML = '';
        this.activePhrase = null;
    }
}