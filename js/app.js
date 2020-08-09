// global variables
const qwerty = document.getElementById('qwerty');
const startGameButton = document.querySelector('.btn__reset');
const button = document.querySelectorAll('button');
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

    for (let i = 0; i < phraseArray.length; i++) {

        // for each character, create li, put character in li, append to #phrase ul
        let li = phraseArray[i];
        let liPhrase = document.createElement('li');
        liPhrase.textContent = li;
        const ul = document.querySelector('#phrase ul');
        ul.appendChild(liPhrase);

        if (li !== " ") {
            liPhrase.classList.add('letter');
        } else if (li === " ") {
            liPhrase.classList.add('space');
        }

    }

};

addPhraseToDisplay(phraseArray);

// check if player guess match any letters
const checkLetter = playerGuess => {

    const phraseLetters = document.querySelectorAll('.letter');

    for (let i = 0; i < phraseLetters.length; i++) {
        if (playerGuess === phraseLetters[i].textContent) {
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

    const letterChoice = checkLetter(e.target.textContent);
    const buttonChoice = document.querySelectorAll('button');

    for (let i = 0; i < buttonChoice.length; i++) {
        if (e.target === buttonChoice[i]) {
            e.target.classList.add('chosen');
            e.target.disabled = true;
        }
    }

    // check if player guess is a letter AND if guess is a letter in phrase
    const chosenButton = document.querySelectorAll('.chosen');

    for (let j = 0; j < chosenButton.length; j++) {

        if (!phraseArray.includes(letterChoice) && e.target === chosenButton[j]) {
            let ol = document.querySelector('ol');
            ol.removeChild(ol.lastElementChild);
            missed++;
        }

        checkWin();

    }

});