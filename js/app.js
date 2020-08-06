
// global variables
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGameButton = document.querySelector('.btn__reset');
let missed = 0;

// remove start screen overlay with start game button
startGameButton.addEventListener('click', () => {
    document.querySelector('#overlay').style.display = 'none';
});

// movie quote array 
const phrases = [
    'the body cannot live without the mind', //the matrix
    'im in a glass case of emotion', //anchorman 
    'i dont think were in kansas anymore', //the wizard of oz
    'hold on to your butts', //jurassic park
    'come with me if you want to live' //terminator 2
]

// randomly choose movie quote from phrases array
const getRandomPhraseAsArray = arr => {

    //randomly choose a phrase index 
    const randomNumber = Math.floor(Math.random() * phrases.length);

    //return the array element at random index calculated 
    const randomPhrase = phrases[randomNumber];

    //split that phrase into new array of characters
    const phraseAsCharacters = randomPhrase.split('');

    //return new character array
    return phraseAsCharacters;
};

const phraseArray = getRandomPhraseAsArray(phrases);

//set the game display
const addPhraseToDisplay = arr => {

    //loop through array of characters
    for (let i = 0; i < phraseArray.length; i++) {

        //for each character, create li, put character in li
        let li = phraseArray[i];
        let liPhrase = document.createElement('li');
        liPhrase.textContent = li.value;

        //append to #phrase ul
        const ul = document.querySelector('#phrase ul');
        ul.appendChild(liPhrase);

        //if character in array is a letter, add the class, 'letter' to li
        if (li) {
            liPhrase.classList.add('.letter');
            //character === " " add the class, 'space' to li
        } else if (li === " ") {
            liPhrase.classList.add('.space');
        }
    }

}

addPhraseToDisplay(phraseArray);