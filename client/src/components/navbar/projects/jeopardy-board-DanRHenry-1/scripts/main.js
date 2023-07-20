// Global DOM Variables
let inputFieldForP1Name = document.getElementById("inputFieldForP1Name");
let inputFieldForP2Name = document.getElementById("inputFieldForP2Name");
let playBtn = document.getElementById("startGame");
let playerTwoScoreName = document.getElementById("p2Name");
let playerOneScoreName = document.getElementById("p1Name");
let p1Score = document.getElementById("p1Score");
let p2Score = document.getElementById("p2Score");
let roundName = document.getElementsByTagName("h1");
let cat1 = document.createElement("div");
let cat2 = document.createElement("div");
let cat3 = document.createElement("div");
let cat4 = document.createElement("div");
let cat5 = document.createElement("div");
let cat6 = document.createElement("div");
let answer200 = document.createElement("div");
let answer400 = document.createElement("div");
let answer600 = document.createElement("div");
let answer800 = document.createElement("div");
let answer1000 = document.createElement("div");
let answer1200 = document.createElement("div");
let answer1600 = document.createElement("div");
let answer2000 = document.createElement("div");
let passBtn = document.getElementById("passBtn")
let placeholderPassBtn = document.getElementById("placeholderPassBtn")
let guessBtn = document.getElementById("guessBtn")
let placeholderGuessBtn = document.getElementById("placeholderGuessBtn")
let answerBoard = document.getElementById("answerBoard");
let playerTurn = document.getElementById("playerTurn");
let textDisplay = document.getElementById("textDisplay");
let textDispCont = document.getElementById("textDispCont");
let inputFieldForAnswer = document.getElementById("inputFieldForAnswer");
let textDisplayBtn = document.getElementById("textDisplayBtn");
let nextRound = document.getElementsByClassName("nextRound")
let placeholderNextRound = document.getElementsByClassName("placeholderNextRound")


// Global Variables
// Fetch Categories from jService API
// const url = "https://jservice.io/api/clues?count=100";
let randomURL = "https://jservice.io/api/random?count=100"
let categoryURL = "https://jservice.io/api/category?id=";
let data;
let answer;
let question;
let category;
// const categoryArray = [];
const questionArray = [];
let _200Answer = "This man had a pet monkey named George."
let _200Question = "asdf"
// let _200Answer = "This man had a pet monkey named George."
// let _200Question = "The Man with the Yellow Hat"
let playerGuess;
let tempInput;
let win;
let player1Score = 0;
let player2Score = 0;
let playerOnesName;
let playerTwosName;
let passed;
let activePlayerScore;

//! Event Listeners
// Change answer grid cell upon click
//! https://stackoverflow.com/questions/45907673/clickable-tiles-with-css-grid
window.addEventListener("DOMContentLoaded", function() {
    let boxes = document.querySelectorAll(".answer");
    Array.from(boxes, function(box) {
        box.addEventListener("click", function() {
            activateButtons()
            box.textContent = "";
            box.style.visibility = "hidden";
            textDisplay.style.display = "block";
            textDispCont.textContent = _200Answer;
        });
    });
});

//! Sloppy fix applied and commented back in (index.html)
passBtn.addEventListener("click", function listener() {
        if (passed == undefined || passed == false) {
        console.log("passed value:", passed)
        console.log("I'll Pass Thank you")
        displayPlayerTurnMessage()
        passed = true;
        console.log("passed value:",passed)
        } else {
        switchPlayer()
        console.log("can't pass anymore")
        console.log("passed value:",passed)
// Change to close the window and the question.
    }
})


// Create round 1, 2 and 3 functions, triggered by an if statement that looks for the name of the title to avoid the DOM variables getting messed up by missing ids.

//! Global Functions

// Get Player Names on the Title Screen
async function titleScreen(){
//Added to get the player names and update the scoreboards

playBtn.addEventListener("click", saveName);


// Grab input from the player name field, and set it to the local storage
function saveName() {
    let player1Name = inputFieldForP1Name.value;
    let player2Name = inputFieldForP2Name.value;

    localStorage.setItem("playerOneName", player1Name);
    localStorage.setItem("playerTwoName", player2Name);
}
}

// Disable the pass and guess buttons / enable the placeholder pass and guess buttons
function deactivateButtons() {
    placeholderGuessBtn.style.display = "inline-block";
    guessBtn.style.display = "none";
    placeholderPassBtn.style.display = "inline-block";
    passBtn.style.display = "none";
    passed = false;
}

// Disable the close button
function hideCloseBtn() {
    textDisplayBtn.style.display = "none";
}

// Enable the pass and guess buttons / disable the placeholder pass and guess buttons
function activateButtons() {
    placeholderGuessBtn.style.display = "none";
    guessBtn.style.display = "inline-block";
    placeholderPassBtn.style.display = "none";
    passBtn.style.display = "inline-block";
}

// Enable the next round button/disable the placeholder nextround button
function enableNextRound() {
    nextRound.style.display = "inline-block"
    placeholderNextRound.style.display = "none"
}

// Check Local Storage and Populate Scoreboard and Names
function getNamesAndScoreboardInfo(){
    // Get player names from local storage and input them to the scoreboard names
    if (localStorage.playerOneName != "") {
        // playerOneName = localStorage.playerOneName;
        if (
            localStorage.playerOneName[localStorage.playerOneName.length - 1] == "s"
        ) {
            playerOneScoreName.innerText = `${localStorage.playerOneName}' Score:`;
            playerOnesName = `${localStorage.playerOneName}'`;
        } else {
            playerOneScoreName.innerText = `${localStorage.playerOneName}'s Score:`;
            playerOnesName = `${localStorage.playerOneName}'s`;
        }
    } else {
        playerOneScoreName.innerText = "Player 1's Score";
        playerOnesName = "Player 1's";
    }
    
    if (localStorage.playerTwoName != "") {
        if (
            localStorage.playerTwoName[localStorage.playerTwoName.length - 1] == "s"
        ) {
            playerTwoScoreName.innerText = `${localStorage.playerTwoName}' Score:`;
            playerTwosName = `${localStorage.playerTwoName}'`;
        } else {
            playerTwoScoreName.innerText = `${localStorage.playerTwoName}'s Score:`;
            playerTwosName = `${localStorage.playerTwoName}'s`;
        }
    } else {
        playerTwoScoreName.innerText = "Player 2's Score";
        playerTwosName = "Player 2's";
    }
    
    p1Score.textContent = player1Score;
    p2Score.textContent = player2Score;
    activePlayer = playerOnesName;

}
let randomResultArray = [];
// Fetch Information For the Answer Board
let fetchRandomCategories = async () => {
    let res = await fetch(randomURL); // Passing our file location
    let result = await res.json();
    // let data = result.data;
    data = result;
    for (let i = 0; i < 6; i++ && randomResultArray.length < 6) {
        if (data[i].category.clues_count > 6 && randomResultArray < 6) {
        randomResultArray.push(data[i].category_id)
        } else {
            fetchRandomCategories()
        }
    }
    // console.log("In Async/await", data)
    console.log(randomResultArray);
    // fetchAnswers();
}

// fetchRandomCategories()
let fetchAnswers = async () => {
    for (let i = 0; i < randomResultArray.length; i++) {
    let res = await fetch(categoryURL+(i+1)); // Passing our file location
    let result = await res.json();
    // let data = result.data;
    data = result;
    questionArray.push(data)
    }
    console.log("questionArray:",questionArray)
}
// Notify that it is player 1's turn to choose
function displayPlayerTurnMessage() {
    playerTurn.innerText = `${activePlayer} Turn. Pick an Answer!`; 
}

// Switch Players
function switchPlayer() {
    if (activePlayer == playerOnesName) {
        activePlayer = playerTwosName
    } else if (activePlayer == playerTwosName) {
        activePlayer = playerOnesName
    }
    displayPlayerTurnMessage()
}

function setActivePlayerScore() {
    console.log("activePlayer:",activePlayer);
    console.log("playerOnesName:", playerOnesName);
    if (activePlayer == playerOnesName) {
        console.log("a")
        activePlayerScore = player1Score;
        console.log("activePlayerScore:",activePlayerScore)
        console.log("player1Score",player1Score)
    } else if (activePlayer == playerTwosName) {
        console.log("b")
        activePlayerScore = player2Score;
        console.log("activePlayerScore:",activePlayerScore)
        console.log("player2Score",player2Score)
    }
}

// let fetchCategories = async () => {
//     url1 = `https://jservice.io/api/category?id=${data[0].id}`
//     let res = await fetch(url1);
//     let result = await res.json();
//     category = result;
//     console.log("categoryresult",category)
// }

//!Sloppy fix applied and commented back in
textDisplayBtn.addEventListener("click", function() {
    console.log("clickity-clickity")
    textDisplay.style.display = "none";
    deactivateButtons()
    hideCloseBtn()
})

//! Round One Function
async function roundOne () {
// Fill in Name(s) and Scoreboard Info
getNamesAndScoreboardInfo();

// Display the active player's name
displayPlayerTurnMessage()

// Get Answers for the answerboard
//! Reactivate this after looking into the loop
// fetchRandomCategories();
// fetchCategories();
//? Jeopardy Game
// In this project, we will be completing the functionality for our Jeopardy / quiz game utilizing what we learned this week!

// The game of Jeopardy consists of several players that compete to earn points by selecting questions of varying points values from a board. The board is a 6 X 6 square with each column representing a category, and the first row containing the titles of each category, and every row after being increasingly difficult questions (with correspondingly higher point values) for their categories

// You will be given placeholder data for this project in the form of an array of objects.

//? Start the Game
// Given the players have been redirected to the Round 1 page
// ? round-1.html:
// When the page loads

// Guess Button Event Listener
guessBtn.addEventListener("click", function() {
    console.log("lemme guess");
    playerGuess = inputFieldForAnswer.value;
    // playerGuessArray
    let pgArray = [];
    pgArray.push(playerGuess);
    // pgArray = pgArray.split(" ");
    // Added after turning in. Changes input text to lowercase
    pgArray = pgArray.map(item => item.toLowerCase()); 

    //_200QuestionArray
    let qArray = [];
    qArray.push(_200Question);
    // qArray = qArray.split(" ");
    // Added after turning in. Changes input text to lowercase
    qArray = qArray.map(item => item.toLowerCase()); 
    // console.log("pgArray:",pgArray)
    // console.log("qArray:",qArray)

    // if (pgArray == qArray) {

    for (item of qArray) {
        if (pgArray.includes(item)) {
            win = true;
        } else {
            win = false;
            switchPlayer()
            break;
        }
    }
        if (win == true) {
            textDispCont.textContent = "Congratulations, you answered correctly!"
            // Display the button to close the window
            textDisplayBtn.style.display = "inline-block"
            setActivePlayerScore()
            console.log(activePlayerScore)
            activePlayerScore += 200; //! Change this to reflect the actual amount
            p1Score.textContent = player1Score;
            p2Score.textContent = player2Score;
            deactivateButtons();
        } else if (win == false) {
            if (passed == false || passed == undefined) {
                textDispCont.textContent = `Wrong answer. ${activePlayer}, would you like to play?`
                setActivePlayerScore()
                console.log(activePlayer)
                console.log(activePlayerScore);
                activePlayerScore -= 200;
                p1Score.textContent = player1Score;
                p2Score.textContent = player2Score;
                passed = true;
                switchPlayer();
                setTimeout(() => {
                    textDispCont.textContent = _200Answer;
                }, 2000);
                // this.function()
                // deactivateButtons();
                // hideCloseBtn();
                } else {
                switchPlayer();
                setActivePlayerScore()
                textDispCont.textContent = `I'm sorry, ${activePlayer} that's the wrong answer.`
                activePlayerScore -= 200;
                p1Score.textContent = player1Score;
                p2Score.textContent = player2Score;
                setTimeout(() => {
                    textDisplay.style.display = "none";
                    deactivateButtons();
                    hideCloseBtn();
                    
                }, 2000);
            }
        }
    })

//!Round One Answer board DOM

// Fill Round One Answer Board

for (let i = 0; i < 6; i++) {
    // answer200.id = `answerBtn${i + 1}`;
    answer200.className = `answer`;
    answer200.textContent = `$200`;
    answer200.id = `answer200${i}`
    answerBoard.appendChild(answer200.cloneNode(true));
}

for (let i = 0; i < 6; i++) {
    // answer400.id = `answerBtn${i + 1}`;
    answer400.className = `answer`;
    answer400.textContent = `$400`;
    answer400.id = `answer400${i}`
    answerBoard.appendChild(answer400.cloneNode(true));
}

for (let i = 0; i < 6; i++) {
    // answer600.id = `answerBtn${i + 1}`;
    answer600.className = `answer`;
    answer600.textContent = `$600`;
    answerBoard.appendChild(answer600.cloneNode(true));
}

for (let i = 0; i < 6; i++) {
    // answer800.id = `answerBtn${i + 1}`;
    answer800.className = `answer`;
    answer800.textContent = `$800`;
    answerBoard.appendChild(answer800.cloneNode(true));
}

for (let i = 0; i < 6; i++) {
    // answer1000.id = `answerBtn${i + 1}`;
    answer1000.className = `answer`;
    // answer1000.textContent = `fred`;
    answer1000.textContent = `$1,000`;
    answerBoard.appendChild(answer1000.cloneNode(true));
}

// ? Select a Question
// Given an empty board, and player 1 is currently up
// When player 1 selects a card
// Then the score on the card is replaced by a question

// And the "Submit Answer" button is enabled
// And the "Pass Question" button is enabled

// ? Pass a Question
// Given a question has been chosen
// When the user clicks on the "Pass Question" button
// Then player 2 gets an opportunity to answer the question
// And the notification area changes to player 2's turn

// ? Answer a Question Correctly
// Given a question has been chosen
// When the player submits an answer
// And the answer is correct
// Then the game awards the player the amount of points that were on the card
// And the card is blanked out
// And the current player does not change

// ? Answer a Question Incorrectly
// Given a question has been chosen
// When the player submits an answer
// And the answer is incorrect
// Then the game subtracts the point total from the player's score
// And the other player gets a chance to answer the question
// And if no one guesses correctly the original player gets to choose a new question

// ? Score Board
// Given the game has been started
// When the score changes
// Then the game should display each player's current score on the page

// ? Only Allow One Question
// Given a card has already been selected
// When the player tries to pick a new card
// Then the question does not change
// And the game alerts the player that they must answer, or pass the question

// ? End Round 1
// Given that the score of one user reaches 15,000 points.
// Or the board has been cleared
// Then the game alerts the players to move on to Round 2.
// And the "Round 2" button becomes enabled
// And the "Round 2" button navigates to the Round 2 page.
// Hint: You can use query parameters in the URL to pass score information between pages

// ? Round 2
// Given the players are on the Round 2 Page
// Then the players scores are the same as they were at the end of Round 1.
// And the game logic behaves as Round 1.
// And the "Final Round" button is disabled

// ? End Round 2
// Given that the score of one user reaches 30,000 points.
// Or the board has been cleared
// Then the game alerts the players to move on to the Final Round.
// And the "Final Round" button becomes enabled
// And the "Final Round" button navigates to the Final Round page.

// ? Final Round
// Given the players are on the Final Round page
// Then they should be presented with a category
// And prompted to make a wager up to their maximum point total

// ? Let's Make a Wager!
// Given we're on the Final Round page
// When all players have made a wager
// Then the question is revealed
// And all players get a chance to answer the question before the answer is revealed

// ? Winning the Game
// Given all players have answered the final question
// When the last answer is submitted
// Then the amount wagered is added or subtracted from the total score
// And the game should notify the users who won based on the final score

// ? Icebox
// Say my Name!
// Given the the user is on the landing page

// When the user clicks "Start Game"

// Then the game should allow the user(s) to set their player names
// And should use those names throughout the game

// ? Random Questions
// Given a game has been started
// When the board is generated
// Then the board has questions different from the placeholder data

// ? Daily Double
// Given a game is started
// When the board is generated
// Then two random questions should be set as the "Daily Double" and are worth twice the amount of points on their cards

// ? Try to Make Fetch Happen
// Given a game is started
// When the board is generated
// Then the board has questions fetched from an external API
}

//! Round Two Function
async function roundTwo (){
    
    // Fill in Name(s) and Scoreboard Info
    getNamesAndScoreboardInfo();

// Get Answers for the Answerboard
    fetchRandomCategories();

    // playerTurn.innerText = `${playerOnesName} Turn. Pick an Answer!`; // (Insert player's turn here)

// Guess Button Event Listener
guessBtn.addEventListener("click", function() {
    console.log("lemme guess")
})

    // Fill Round Two Answer Board
    for (let i = 0; i < 6; i++) {
        // answer400.id = `answerBtn${i + 1}`;
        answer400.className = `answer`;
        answer400.textContent = `$400`;
        answerBoard.appendChild(answer400.cloneNode(true));
    }

    for (let i = 0; i < 6; i++) {
        // answer800.id = `answerBtn${i + 1}`;
        answer800.className = `answer`;
        answer800.textContent = `$800`;
        answerBoard.appendChild(answer800.cloneNode(true));
    }

    for (let i = 0; i < 6; i++) {
        // answer1200.id = `answerBtn${i + 1}`;
        answer1200.className = `answer`;
        answer1200.textContent = `$1,200`;
        answerBoard.appendChild(answer1200.cloneNode(true));
    }

    for (let i = 0; i < 6; i++) {
        // answer1600.id = `answerBtn${i + 1}`;
        answer1600.className = `answer`;
        answer1600.textContent = `$1,600`;
        answerBoard.appendChild(answer1600.cloneNode(true));
    }

    for (let i = 0; i < 6; i++) {
        // answer2000.id = `answerBtn${i + 1}`;
        answer2000.className = `answer`;
        answer2000.textContent = `$2,000`;
        answerBoard.appendChild(answer2000.cloneNode(true));
    }

}

if (roundName[0].innerText == "Jeopardy!") {
    titleScreen();
}
else if (roundName[0].innerText == "Round One") {
    roundOne()
} 
else if ((roundName[0].innerText == "Double Jeopardy")) {
    roundTwo()
} 
// else if ((roundName[0].innerText == "Final Jeopardy")) {
//     round3()
// }
// roundOne()