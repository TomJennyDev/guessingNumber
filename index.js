let secretNumber;
let pastGuesses = [];
let lastGuess;
let guessesRemaining = 5;

const CORRECT_MESSAGE = "Correct! You must be a powerful psychic.";
const INCORRECT_MESSAGE = "Incorrect. You are merely a normal human.";
const INCORRECT_MESSAGE_HIGH = "was too high!";
const INCORRECT_MESSAGE_LOW = "was too low!";

const getELE = (element) => document.querySelector(element);

function generateNumber() {
  // MILESTONE 2: Right now the secret number is always 5. Change this
  // to return a secret number between 1 and 10.
  return Math.floor(Math.random() * 10) + 1;
}

function checkIsCorrect() {
  // MILESTONE 4: Right now every guess will be true. Change
  // the above code so it checks to make sure lastGuess
  // is equal to secretNumber.
  return lastGuess > secretNumber ? 1 : lastGuess < secretNumber ? -1 : 0; 
}

function makeGuess() {
  if (!secretNumber) {
    secretNumber = generateNumber();
  }

  // MILESTONE 3: ADD CODE HERE to pop up a dialog box
  // asking the user for a number.
  
  //check input of user
  do {
  lastGuess = +prompt("What is your number? Please input an integer number from 1 to 10"); 
   if(!lastGuess || lastGuess > 10 || lastGuess < 1 ) alert("Please input an integer number from 1 to 10");
  } while(!lastGuess || lastGuess > 10 || lastGuess < 1 )
  
  if (lastGuess) {
    pastGuesses.push(lastGuess);
    guessesRemaining = guessesRemaining - 1;
  }

  //--------------------------------------------
  updatePage();
}
  

function updatePage() {
  getELE("#last-guess").classList.add("text-hightlight");
 
  
  const lastGuessString = `${lastGuess} <span id="incorrect-message"> ${
    checkIsCorrect() === 1 ? INCORRECT_MESSAGE_HIGH : INCORRECT_MESSAGE_LOW
  }</span>`;
  getELE("#last-guess").innerHTML = lastGuessString;

  const previousGuessString = `${pastGuesses.join(", ")} `;
  getELE("#guesses-previous").innerHTML = previousGuessString;

  const correct = getELE("#correct");
  const isCorrect = checkIsCorrect();
  if (!isCorrect) {
    getELE("#incorrect-message").innerHTML = "";
    correct.className = ("successful");
    correct.innerHTML = CORRECT_MESSAGE;
  } else {
    correct.className = ("fail");
    correct.innerHTML = INCORRECT_MESSAGE;
  }
  const remaining = getELE("#guesses-remaining");
  remaining.innerHTML = guessesRemaining;
  
  if(!guessesRemaining) {
    remaining.parentNode.style.display = "none";
    getELE("#gameover").style.display = "block";
  };
  
  if (!guessesRemaining || !isCorrect) {
    getELE(".btn-guess").disabled = true;
    getELE(".btn-playagain").disabled = false;
  }
}

function resetGame() {
  secretNumber = 0;
  guessesRemaining = 5;
  pastGuesses = [];
  isGameOver = true;
  
  getELE(".btn-guess").disabled = false;
  getELE(".btn-playagain").disabled = true;

  getELE("#correct").innerHTML = "?";
  getELE("#correct").className ="";

  getELE("#last-guess").innerHTML = "?";
  getELE("#last-guess").className ="";

  getELE("#guesses-remaining").parentNode.style.display = "block";
  getELE("#guesses-remaining").innerHTML = guessesRemaining;
  getELE("#gameover").style.display = "none";
  

  getELE("#suggest-message").innerHTML = "";

  getELE("#guesses-previous").innerHTML = "?";


}
