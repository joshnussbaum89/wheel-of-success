// global variables
const qwerty = document.getElementById('qwerty');
// const phrase = document.getElementById('phrase');
const startGameButton = document.querySelector('.btn__reset');
// const button = document.querySelectorAll('button');
let missed = 0;

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
    const phraseLetters = document.querySelectorAll('.letter');
    // loop over the letters and check if they match the letter in the button the player has chosen
    for (let i = 0; i < phraseLetters.length; i++) {
        // If there’s a match
        if (playerGuess === phraseLetters[i].textContent) {
            // add the “show” class to the list item containing that letter
            phraseLetters[i].classList.add('show');
        }
    }
    return playerGuess;
};

// Check if player wins/loses
const checkWin = () => {
    const letterLI = document.querySelectorAll('.letter');
    const showLI = document.querySelectorAll('.show');
    const overlay = document.querySelector('#overlay');

    if (letterLI.length === showLI.length) {
        overlay.classList.add('win');
        overlay.innerHTML = `<h2>You Won 😎</h2><button class="refresh-win" onClick="window.location.reload();">Try again?</button>`;
        overlay.style.display = 'flex';
    } else if (missed > 4) {
        overlay.classList.add('lose');
        overlay.innerHTML = `<h2>You Lost 🥺</h2><button class="refresh-lose" onClick="window.location.reload();">Try again?</button>`;
        overlay.style.display = 'flex';
    }
};

// remove start screen overlay with start game button
startGameButton.addEventListener('click', () => {
    document.querySelector('#overlay').style.display = 'none';
});

// click a letter, change slyle of selected button
qwerty.addEventListener('click', (e) => {

    const buttonChoice = document.querySelectorAll('button');
    for (let i = 0; i < buttonChoice.length; i++) {
        // if button choice equals one of the button options, change stlye of that button
        if (e.target === buttonChoice[i]) {
            e.target.classList.add('chosen');
            e.target.disabled = true;
        }
    }
    const letterFound = checkLetter(e.target.textContent);

    // if player guess is not included in phrase
    if (!phraseArray.includes(letterFound)) {
        let ol = document.querySelector('ol');
        ol.removeChild(ol.lastElementChild);
        missed++;
    }
    checkWin();
});

addPhraseToDisplay(phraseArray);