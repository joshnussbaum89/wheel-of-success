
// global variables
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGameButton = document.querySelector('.btn__reset');
const button = document.querySelectorAll('button');
let missed = 0;

// remove start screen overlay with start game button
startGameButton.addEventListener('click', () => {
    document.querySelector('#overlay').style.display = 'none';
});

// movie quote array 
const phrases = [
    'the body cannot live without the mind', // the matrix
    'im in a glass case of emotion', // anchorman 
    'i dont think were in kansas anymore', // the wizard of oz
    'hold on to your butts', // jurassic park
    'come with me if you want to live' // terminator 2
]

// randomly choose movie quote from phrases array
const getRandomPhraseAsArray = arr => {

    // randomly choose a phrase index 
    const randomNumber = Math.floor(Math.random() * phrases.length);

    // return the array element at random index calculated 
    const randomPhrase = phrases[randomNumber];

    // split that phrase into new array of characters
    const phraseAsCharacters = randomPhrase.split('');

    // return new character array
    return phraseAsCharacters;
};

const phraseArray = getRandomPhraseAsArray(phrases);

// set the game display
const addPhraseToDisplay = arr => {

    // loop through array of characters
    for (let i = 0; i < phraseArray.length; i++) {

        // for each character, create li, put character in li
        let li = phraseArray[i];
        let liPhrase = document.createElement('li');
        liPhrase.textContent = li;
        // append to #phrase ul
        const ul = document.querySelector('#phrase ul');
        ul.appendChild(liPhrase);

        // if character in array is a letter, add the class, 'letter' to li
        // else add the class, 'space'
        if (li !== " ") {
            liPhrase.classList.add('letter');
        } else if (li === " ") {
            liPhrase.classList.add('space');
        }
    }
};

// check if player guess match any letters
const checkLetter = playerGuess => {
    let checkLetter = document.querySelector('ul .letter');
    // loop over the letters and check if they match the letter in the button the player has chosen
    for (let i = 0; i < checkLetter.length; i++) {
        // If there’s a match
        if (playerGuess === checkLetter[i]) {
            // add the “show” class to the list item containing that letter
            // store the matching letter inside of a variable
            let matchingLetter = checkLetter[i].classList.add('show');
            // return that letter.
            return matchingLetter;
            // If a match wasn’t found, return null.
        } else if (playerGuess !== checkLetter[i]) {
            return null;
        }
    }
};

// click a letter, change slyle of selected button
qwerty.addEventListener('click', (e) => {
    // save button choice to variable
    let buttonChoice = event.target;
    // loop through buttons because querySelectorAll('button') creates list
    for (let i = 0; i < button.length; i++) {
        // if button choice equals one of the button options, change stlye of that button
        if (buttonChoice === button[i]) {
            buttonChoice.classList.add('chosen');
            // disable that button
            buttonChoice.disabled = true; // adds a glitch to the button transition...?
        }
    }

    // CALL THE CHECKLETTER FUNCTION **************************************************

    //  If the checkLetter function does not find a letter, remove one of the heart
    //  images and increment the missed counter

});

addPhraseToDisplay(phraseArray);