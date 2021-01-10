let word;
let answerArray;
let remainingLetters;
let remainingAttempts;


function newGame () {
    // get a random word from and array in container.js
     word = getRdmWord();
    // converting answer to an array with underscores
     answerArray = [];
    // setting the remaining letters
     remainingLetters = word.length;
    // setting remaining attempts
     remainingAttempts = 5;
    // just for debugging
    console.log(word);

    // converting answer to underscores
    for (let y = 0; y < word.length; y++) {
        answerArray[y] = '_';
    }

    updateAttempts();
    updatedWord();
}


newGame();


$("#guessButton").click(function() {
    letterHandler($("#guessLetter").val());
    // clear input
    $('#guessLetter').val('');
});


$("#restart").click(function() {
    $('#preStatus').text('');
    $('#status').text('');
    $('#restart').hide();
    newGame();
    $('#fieldLetter').show();
});


function letterHandler (newLetter) {

    console.log(newLetter);

    if (newLetter === '' || newLetter === null) {

        alert('Please enter the only ONE letter.');
        
    } else if (newLetter.length !== 1) {

        if (newLetter.toUpperCase() == word) {
            writeFullWord();
            showWinMessage();
        } else {
            alert('Please enter the only one letter or the correct entire word.');
        }

    } else {

        // converting input to uppercase
        newLetter = newLetter.toUpperCase();

        //checking already guessed letters
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

        updateAttempts();

        if (remainingAttempts <= 0) {
            writeFullWord();
            showFailMessage();
            return;
        }

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

function showFailMessage () {
    hideFieldLetter();
    $('#status').text('Unfortunately you have failed.\nThe word was: ' + word.toUpperCase() + '.');
    showRestartBtn();
}

function showWinMessage () {
    hideFieldLetter();
    $('#status').text('Excellent!\nYou won!\nThe word is ' + word + '!');
    showRestartBtn();
}

function writeFullWord () {
    for (let y = 0; y < word.length; y++) {
        answerArray[y] = word[y];
    }

    updatedWord();
}



/*
// the main function once all preconditions are set
function theMain (remainingLetters, remainingAttempts) {

    // setting a cycle to continue till the word is guessed
    while (remainingLetters > 0) {

        // ending the game if no attempts left
        if (remainingAttempts === 0) {
            break;

        } else {

            // showing the status of the game
            $('#remainingAttempts').text(remainingAttempts);
            $('#word').text(answerArray.join(' '));

            // asking for a letter
            let guess = prompt('Guess a letter or press \'Cancel\' to leave');

            // leaving the game if clicked to cancel
            if (guess === null) {
                break;

                // if user enters non a char
            } else if (guess.length !== 1) {
                alert('Please enter the only one letter.');

                // running if user filled in a char
            } else {

                // converting input to uppercase
                guess = guess.toUpperCase();

                //checking already guessed letters
                let canContinue = answerArray.includes(guess);
                if (canContinue) {
                    alert('You\'ve already entered this letter.');
                    continue;
                }

                // var to consider if we need to subtract remaining attempts
                let remainingAttemptsSkip = 0;

                // checking if there is a char in the word-array and refreshing the status of the game
                for (let j = 0; j < word.length; j++) {
                    if (word[j] === guess) {
                        answerArray[j] = guess;
                        remainingLetters--;

                        // preventing to subtract remaining attempts
                        remainingAttemptsSkip++;
                    }
                }

                // checking if the entered char is not in the word and subtracting remaining attempts
                if (remainingAttemptsSkip < 1) {
                    remainingAttempts--;
                }
            }}

    }

    // showing the answer and congrats
    if (remainingLetters === 0) {
        $('#preStatus').text(answerArray.join(" "));
        $('#status').text('Excellent!\nYou won!\nThe word is ' + word + '!');

        // running if a non-guessed letter left in the array
    } else {
        $('#status').text('Unfortunately you have failed.\nThe word was: ' + word.toUpperCase() +
            '. You\'re welcome to press F5 to start a new game.');
    }
}
*/