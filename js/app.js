/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

/* Create a new instance of the Game class
and add event listeners for the start button and onscreen keyboard buttons:
Add a click event listener to the "Start Game" button which creates a new Game object
and starts the game by calling the startGame() method.

Add click event listeners to each of the onscreen keyboard buttons,
so that clicking a button calls the handleInteraction() method on the Game object.
Event delegation can also be used in order to avoid having to add an event listener to each individual keyboard button.
Clicking the space between and around the onscreen keyboard buttons should not result in the handleInteraction() method being called.
*/

const startBtn = document.getElementById('btn__reset');
const game = new Game();

startBtn.addEventListener('click', () => {
    console.log('Start button is functional');
    game.startGame();
    console.log(`Active Phrase - phrase: ${game.activePhrase.phrase}`);
});

const qwerty = Array.from(document.querySelectorAll('#qwerty .key'));
qwerty.forEach(key => {
    key.addEventListener("click", (e) => {
        game.handleInteraction(e.target);
    })
});

// TEST CODE
// const phrase = new Phrase('test');

// console.log(`Phrase - phrase: ${phrase.phrase}`);
// game.phrases.forEach((phrase, index) => {
//     console.log(`Phrase ${index} - phrase: ${phrase.phrase}`);
//     });
// const logPhrase = (phrase) => {
//     console.log(`Phrase - phrase: `, phrase.phrase);
//     };
//     const game = new Game();
//     logPhrase(game.getRandomPhrase());
//     logPhrase(game.getRandomPhrase());
//     logPhrase(game.getRandomPhrase());
//     logPhrase(game.getRandomPhrase());
//     logPhrase(game.getRandomPhrase());
// const game = new Game();
// game.getRandomPhrase().addPhraseToDisplay();