// global variables
const qwerty = document.getElementById('qwerty')
const startGameButton = document.querySelector('.btn__reset')
const button = document.querySelectorAll('button')
let phraseArray
let missed = 0

// movie quote array
const phrases = [
  'the body cannot live without the mind', // the matrix
  'im in a glass case of emotion', // anchorman
  'toto ive a feeling were not in kansas anymore', // the wizard of oz
  'hold on to your butts', // jurassic park
  'come with me if you want to live', // terminator 2
  'im gonna make him an offer he cant refuse', // the godfather
  'ill have what shes having', // when harry met sally
]

// Randomly choose movie quote from phrases array
const getRandomPhraseAsArray = () => {
  const randomNumber = Math.floor(Math.random() * phrases.length)
  const randomPhrase = phrases[randomNumber]
  const phraseAsCharacters = randomPhrase.split('')

  return phraseAsCharacters
}

// set the game display
const addPhraseToDisplay = () => {
  phraseArray = getRandomPhraseAsArray(phrases)

  for (let i = 0; i < phraseArray.length; i++) {
    // for each character, create li, put character in li, append to #phrase ul
    let li = phraseArray[i]
    let liPhrase = document.createElement('li')
    liPhrase.textContent = li
    const ul = document.querySelector('#phrase ul')
    ul.appendChild(liPhrase)

    if (li !== ' ') {
      liPhrase.classList.add('letter')
    } else if (li === ' ') {
      liPhrase.classList.add('space')
    }
  }
}

// check if player guess match any letters
const checkLetter = (playerGuess) => {
  const phraseLetters = document.querySelectorAll('.letter')

  for (let i = 0; i < phraseLetters.length; i++) {
    if (playerGuess === phraseLetters[i].textContent) {
      phraseLetters[i].classList.add('show')
    }
  }

  return playerGuess
}

// Check if player wins/loses
const checkWin = () => {
  const letterLI = document.querySelectorAll('.letter')
  const showLI = document.querySelectorAll('.show')
  const overlay = document.querySelector('#overlay')

  if (letterLI.length === showLI.length) {
    overlay.classList.add('win')
    overlay.innerHTML = `<h2>You Won 😎</h2><button class="refresh-win" onClick="window.location.reload();">Try again?</button>`
    overlay.style.display = 'flex'
  } else if (missed > 4) {
    overlay.classList.add('lose')
    overlay.innerHTML = `<h2>You Lost 🥺</h2><button class="refresh-lose" onClick="window.location.reload();">Try again?</button>`
    overlay.style.display = 'flex'
  }
}

// Start game
const handleStartGame = () => {
  document.querySelector('#overlay').style.display = 'none'
  addPhraseToDisplay()
}

// Choose letter
const handleLetterClick = (e) => {
  const letterChoice = checkLetter(e.target.textContent)
  const buttonChoice = document.querySelectorAll('button')
  let scoreboard = document.querySelector('#scoreboard ol')

  for (let i = 0; i < buttonChoice.length; i++) {
    if (e.target === buttonChoice[i]) {
      e.target.classList.add('chosen')
      e.target.disabled = true
    }
  }

  const chosenButton = document.querySelectorAll('.chosen')
  for (let j = 0; j < chosenButton.length; j++) {
    if (!phraseArray.includes(letterChoice) && e.target === chosenButton[j]) {
      scoreboard.removeChild(scoreboard.lastElementChild)
      missed++
    }
  }

  checkWin()
}

// User clicks "start"
startGameButton.addEventListener('click', handleStartGame)

// User clicks letter
qwerty.addEventListener('click', handleLetterClick)
