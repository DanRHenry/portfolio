
// Do not change the import statement
// This statement imports the exported file so its contents are accessible to us

// This makes the "placeholderquestions" act like a variable essentially
// import placeholderQuestions from "./placeholder-questions.js";
// console.log({ placeholderQuestions });
// 
// console.log(placeholderQuestions)
// console.log(placeholderQuestions[0])
// When I need a question/answer, I can iterate over the array
const url = "https://jservice.io/api/categories?count=100"

const fetchAnswers = async () => {
    let res = await fetch(url); // Passing our file location
    let result = await res.json();
    // let data = result.data;
    let data = result;
    console.log("In Async/await", data)
}

fetchAnswers();
        // .then(res => res.json())
        // .then(data => {
        //     let members = data.fellowship
        //     // used for/of loop to cycle through the array
        //     for (m of members) {
        //         console.log(m.name); // logs each member object
        //     }
        // })

//? Jeopardy Game
// In this project, we will be completing the functionality for our Jeopardy / quiz game utilizing what we learned this week!

// The game of Jeopardy consists of several players that compete to earn points by selecting questions of varying points values from a board. The board is a 6 X 6 square with each column representing a category, and the first row containing the titles of each category, and every row after being increasingly difficult questions (with correspondingly higher point values) for their categories

// You will be given placeholder data for this project in the form of an array of objects.

/* ? index.html:

// Stories
// Ready, Set, Go!
// Given the players are on the landing page
// When one player clicks the 'Start Game' button
// Then the players redirected to the Round 1 page
 */

//? Start the Game
// Given the players have been redirected to the Round 1 page
// ? round-1.html:
// When the page loads

let playerOneScoreName = document.getElementById("p1Name");
let playerTwoScoreName = document.getElementById("p2Name");

// playerOneScoreName.innerText = `${localStorage.playerOneName}'s Score:`;

// Get player names from local storage and input them to the scoreboard names

let playerOnesName;
let playerTwosName;
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

// Then there is a notification that it is player 1's turn to choose
let playerTurn = document.getElementById("playerTurn");
playerTurn.innerText = `${playerOnesName} Turn. Pick an Answer!`; // (Insert player's turn here)

// And the "Guess", "Pass", and "Round 2" buttons are disabled

/* 
    Chain of events to add new element:
        1. Create our element (variable).
        2. Apply our values (reassigning values to property keys)
        3. Place our element (adding to the document body object)
*/

let cat1 = document.createElement("div");
let cat2 = document.createElement("div");
let cat3 = document.createElement("div");
let cat4 = document.createElement("div");
let cat5 = document.createElement("div");
let cat6 = document.createElement("div");
let answer400 = document.createElement("div");
let answer800 = document.createElement("div");
let answer1200 = document.createElement("div");
let answer1600 = document.createElement("div");
let answer2000 = document.createElement("div");

// let catFinal = document.createElement("div");
// let activateAnswer = document.getElementsByClassName("answer");
// let roundOneAnswerBoard = document.getElementById("roundOneAnswerBoard");
let answerBoard = document.getElementById("answerBoard");
// let finalAnswerBoard = document.getElementById("finalAnswerBoard");
// const element = document.createElement("a");
let p1Score = document.getElementById("p1Score")
let p2Score = document.getElementById("p2Score")

p1Score.textContent = "hello round 2";
p2Score.textContent = "hello round 2";

// Buffer for the points??????????

// Change answer grid cell upon click

// // //! https://stackoverflow.com/questions/45907673/clickable-tiles-with-css-grid
// window.addEventListener("DOMContentLoaded", function() {
//     let boxes = document.querySelectorAll(".answer");
  
//     Array.from(boxes, function(box) {
//       box.addEventListener("click", function() {
//         // alert(this.classList[1]);
//         box.textContent = "here"
//       });
//     });
//   });

// Sadly, my attempts to make it work failed...
/* 
let textToChange = "Sadly, my attempts failed to work..."
function changeText(text) {
    answer200.textContent = text;
}
*/
// Later, change the function to clear the square text upon submitting

// Round 2 Answer Board DOM
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

// for (let i = 0; i < 6; i++) {
//     answerBoard.appendChild(answer1200.cloneNode(true))
// }

// answer200.textContent = "test";
//! Example Code

// ? Creating our first element
/* 
    Chain of events to add new element:
        1. Create our element (variable).
        2. Apply our values (reassigning values to property keys)
        3. Place our element (adding to the document body object)
*/

/* 
    Created a variable to store a newly made element.

    Our variable now has access to various properties:
        - innerHTML: can inject(we reassign) a block of HTML
        - innerText: returns the visible text.
        - textContent: returns the full text
        ex: 
            <p>Hello<b>World</b> </p>
            -innerText would return just "Hello"
            -textContent would return "Hello World"
        
*/
// console.log("Here",placeholderQuestions[0])

//! End Example Code

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
