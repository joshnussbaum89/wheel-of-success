
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

    //randomly choose a phrase from phrases array
    const randomPhrase = Math.floor(Math.random() * phrases.length);

    //return the array element at random index calculated 
    const phraseAtIndex = phrases[randomPhrase];

    //split that phrase into new array of characters
    const phraseAsCharacters = phraseAtIndex.split(', ')

    //return new character array
    return phraseAsCharacters;
};

console.log(getRandomPhraseAsArray());