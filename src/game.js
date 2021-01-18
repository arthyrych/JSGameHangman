// a variable for storing a word
let word;

// an array with each letter
let answerArray;

// amount of remaining unguessed letters in the word
let remainingLetters;

// amount of remaining attempts
let remainingAttempts;


// starting a new game
newGame();


function newGame () {

    // get a random word from and array in container.js
    word = getRdmWord();

    // making our answerArray var as an array for storing letters
    answerArray = [];

    // setting remaining letters depending on the word's length
    remainingLetters = word.length;

    // setting remaining attempts
    remainingAttempts = 5;

    // just for debugging (showing the picked word in console)
    console.log(word);

    // converting answerArray to underscores depending on the word's length
    for (let y = 0; y < word.length; y++) {
        answerArray[y] = '_';
    }

    // updating amount of the remaining attempts on html
    updateAttempts();
    // updating the word (underscores in answerArray => letters of the word)
    updatedWord();
}


// input button handler (sending the input into the letterHandler function)
$("#guessButton").click(function() {

    // on click the input goes into letterHandler function
    letterHandler($("#guessLetter").val());

    // clear input once it was sent
    $('#guessLetter').val('');
});


// restart button handler
$("#restart").click(function() {

    // hiding statusDiv once restart button is clicked
    hideStatusDiv();

    // clearing status message and hiding the restart button after the restart button is clicked
    $('#status').text('');
    $('#restart').hide();

    // starting a new game (picking a new word and setting remaining attempts)
    newGame();

    // showing back block with the input
    $('#fieldLetter').show();
});


// handling the inserted letter or the word
function letterHandler (newLetter) {

    // for debugging (showing what was inserted in console)
    console.log(newLetter);

    // check if the one letter was entered
    if (newLetter === '' || newLetter === null) {
        alert('Please enter at least one letter or the correct entire word.');

    // check if the input == word's length
    } else if (newLetter.length !== 1) {

        // the player winning if inserted the correct entire word
        if (newLetter.toUpperCase() == word) {

            // win message + showing the word
            writeFullWord();
            showWinMessage();

        } else {
            alert('Please enter the only one letter or the correct entire word.');
        }

    // taking the inserted letter
    } else {

        // converting input to uppercase
        newLetter = newLetter.toUpperCase();

        // checking if the entered letter was already guessed
        let canContinue = answerArray.includes(newLetter);

        if (canContinue) {
            alert('You\'ve already entered this letter.');
            return;
        }

        // var to consider if we need to subtract remaining attempts
        let remainingAttemptsSkip = 0;

        // checking if there is a char in the word-array and refreshing the status of the game
        for (let j = 0; j < word.length; j++) {
            if (word[j] === newLetter) {
                answerArray[j] = newLetter;
                remainingLetters--;

                // preventing to subtract remaining attempts
                remainingAttemptsSkip++;
            }
        }

        // checking if the entered char is not in the word and subtracting remaining attempts
        if (remainingAttemptsSkip < 1) {
            remainingAttempts--;
        }

        // updating remaining attempts on the html
        updateAttempts();


        // showing game over + the word if no remaining attempts left
        if (remainingAttempts <= 0) {
            writeFullWord();
            showFailMessage();
            return;
        }

        // updating underscores to letters
        updatedWord();

        // showing the answer and congrats
        if (remainingLetters === 0) {
            writeFullWord();
            showWinMessage();
        } 
    }   
}


function updateAttempts () {
    $('#remainingAttempts').text(remainingAttempts);
}


function updatedWord () {
    $('#word').text(answerArray.join(' '));
}


function hideFieldLetter () {
    $('#fieldLetter').hide();
}


function showRestartBtn () {
    $('#restart').show();
}


function showStatusDiv () {
    $('#status').show();
}


function hideStatusDiv () {
    $('#status').hide();
}


function showFailMessage () {
    hideFieldLetter();
    $('#status').text('Game over');
    showStatusDiv();
    showRestartBtn();
}


function showWinMessage () {
    hideFieldLetter();
    $('#status').text('Win!');
    showStatusDiv();
    showRestartBtn();
}


function writeFullWord () {
    for (let y = 0; y < word.length; y++) {
        answerArray[y] = word[y];
    }

    updatedWord();
}
