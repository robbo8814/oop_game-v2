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
        this.phrases = [
                        new Phrase('Say'),
                        new Phrase('What is up dog'),
                        new Phrase('What is for dinner'),
                        new Phrase('How can this be done'),
                        new Phrase('There is a snake in my boot')
                        ]// 5 phrases to use in the game
        this.activePhrase = null; // Phrase that is currently in play. Initialised as 'null'.
        /* activePhrase: This is the Phrase object that’s currently in play.
        The initial value is null. Within the startGame() method,
        this property will be set to the Phrase object returned from a call to the getRandomPhrase() method.
        */
       this.overLay = document.getElementById('overlay');
    }

    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {
        let phrase = this.getRandomPhrase();
        this.overLay.style.display = 'none';
        this.activePhrase = phrase;
        this.activePhrase.addPhraseToDisplay();
        /* startGame(): hides the start screen overlay, calls the getRandomPhrase() method,
        and sets the activePhrase property with the chosen phrase.
        It also adds that phrase to the board by calling the addPhraseToDisplay() method on the activePhrase property.
        */
        
    }

    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {
        const randomPhrase = Math.floor(Math.random()*this.phrases.length);
        return this.activePhrase = this.phrases[randomPhrase];
        // This method randomly retrieves one of the phrases stored in the phrases array and returns it.
    }
    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    */
    handleInteraction(key) {
        const letter = key.textContent;
        // const matched = this.activePhrase.checkLetter(letter);
        key.disabled = true;
        if (this.activePhrase.checkLetter(letter)) {
        key.classList.add('chosen')
        this.activePhrase.showMatchedLetter(letter);
            if (this.checkForWin()) {
                this.gameOver(true);
            }
        } else {
        key.classList.add('wrong');
        this.removeLife();
        }
    }

    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        const lives = Array.from(document.querySelectorAll('.tries img'));
        const life = lives.find(life => life.getAttribute("src") === "images/liveHeart.png")
        life.setAttribute('src', "images/lostHeart.png")
        this.missed ++
        if (this.missed === 5) {
            this.gameOver(false);
        }
        /* This method removes a life from the scoreboard, by replacing one of the liveHeart.png images
        with a lostHeart.png image (found in the images folder) and increments the missed property.
        If the player has five missed guesses (i.e they're out of lives),
        then end the game by calling the gameOver() method.
        */
    }

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */
    checkForWin() {
        const guessedLetters = Array.from(document.querySelectorAll('#phrase li')).filter(letter => letter.classList.contains('show'));
        const hiddenPhrase = this.activePhrase.phrase.replace(/\s/g,'');
        if (hiddenPhrase.length === guessedLetters.length) {
            return true;
        } else {
            return false;
        }
        // This method checks to see if the player has revealed all of the letters in the active phrase.
    }

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        this.overLay.style.display = 'block';
        if (gameWon) {
            this.overLay.className = 'win'
        } else {
            this.overLay.className = 'lose'
        }
        // Lives Reset
        const lives = Array.from(document.querySelectorAll('.tries img'));
        lives.forEach(life => life.setAttribute('src', "images/liveHeart.png"));
        this.missed = 0;
        // Keyboard reset
        const qwerty = Array.from(document.querySelectorAll('#qwerty .key'));
        qwerty.forEach(key => key.className = 'key');
        // Phrase reset
        const phraseDisplay = document.querySelector('#phrase ul');
        phraseDisplay.innerHTML = '';
        this.activePhrase = null;
        /* This method displays the original start screen overlay, and depending on the outcome of the game,
        updates the overlay h1 element with a friendly win or loss message,
        and replaces the overlay’s start CSS class with either the win or lose CSS class.
        */
    }
}