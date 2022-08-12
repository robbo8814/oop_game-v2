/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const startBtn = document.getElementById('btn__reset');     // Start button element
const game = new Game();                                    // Create new game

startBtn.addEventListener('click', () => {                  // Create new game on click of start button element
    console.log('Start button is functional');
    game.startGame();
    console.log(`Active Phrase - phrase: ${game.activePhrase.phrase}`);
});

const qwerty = Array.from(document.querySelectorAll('#qwerty .key'));       // Array of keyboard letter elements
qwerty.forEach(key => {                                                     // For each keyboard letter element, create click listener
    key.addEventListener("click", (e) => {
        game.handleInteraction(e.target);                                   // Handle Interaction when letter element is clicked
    })
});
document.addEventListener("keydown", (e) => {                               // For each keyboard letter element, create keydown listener
        if (this.overlay.style.display === 'none') {
            qwerty.forEach(key => {
                if (key.textContent === e.key && !key.hasAttribute('disabled')) {   // If keydown is not already guessed/disabled
                    game.handleInteraction(key);                            // Handle Interaction when letter element is clicked
                }
            })
        }
    });