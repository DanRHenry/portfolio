import placeholderQuestions from "./placeholder-questions.js";

// Global DOM Variables

// Title Page
let inputFieldForP1Name = document.getElementById("inputFieldForP1Name");
let inputFieldForP2Name = document.getElementById("inputFieldForP2Name");
let playBtn = document.getElementById("startGame");

// Game Page
let roundName = document.getElementsByTagName("h1");

// Scoreboard
let playerTwoScoreName = document.getElementById("p2Name");
let playerOneScoreName = document.getElementById("p1Name");
let p1Score = document.getElementById("p1Score");
let p2Score = document.getElementById("p2Score");

// Gameplay Area
let passBtn = document.getElementById("passBtn");
let placeholderPassBtn = document.getElementById("placeholderPassBtn");
let guessBtn = document.getElementById("guessBtn");
let placeholderGuessBtn = document.getElementById("placeholderGuessBtn");
let playerTurn = document.getElementById("playerTurn");
let nextRound = document.getElementsByClassName("nextRound");
let placeholderNextRound = document.getElementsByClassName(
  "placeholderNextRound"
);
let inputFieldForAnswer = document.getElementById("inputFieldForAnswer");

// Answer board
let answerBoard = document.getElementById("answerBoard");
// const categoryArray = [];
const questionArray = [];
let textDisplay = document.getElementById("textDisplay");
let textDispCont = document.getElementById("textDispCont");
let textDisplayBtn = document.getElementById("textDisplayBtn");
let answer200 = document.createElement("div");
let answer400 = document.createElement("div");
let answer600 = document.createElement("div");
let answer800 = document.createElement("div");
let answer1000 = document.createElement("div");

// Global State Variables
let playerGuess;
let win;
let player1Score = 0;
let player2Score = 0;
let playerOnesName;
let playerTwosName;
let passed;
let activePlayerScore = 0;
let activePlayer;
let round;
let index;

let randomResultArray = [];
let roundOneArray = [];
let roundTwoArray = [];
let finalJeopardyCategory = [];

// console.log("placeholderQuestions", placeholderQuestions);

// Fill Round One, Two, and final Arrays
for (let m = 0; roundTwoArray.length < 30; m++) {
  for (let questionPosition = m; questionPosition < 60; questionPosition++) {
    for (let catIndex = 0; catIndex < 6; catIndex++) {
      if (roundTwoArray.length < 30) {
        roundOneArray.push(placeholderQuestions[questionPosition]);
        questionPosition += 5;
        roundTwoArray.push(placeholderQuestions[questionPosition]);
        questionPosition += 5;
      }
    }
  }
}
finalJeopardyCategory.push(placeholderQuestions[60]);

// Swt round value
if (roundName[0].innerText == "Jeopardy!") {
  round = "title";
  titleScreen();
} else if (roundName[0].innerText == "Round One") {
  round = "round1";
  roundOne();
} else if (roundName[0].innerText == "Double Jeopardy") {
  round = "round2";
  roundOne();
} else if (roundName[0].innerText == "Final Jeopardy") {
  round = "final";
}

// Pull category names from round arrays
if (round === "round1") {
  document.getElementById("catr1-1").innerText = roundOneArray[0].category;
  document.getElementById("catr1-2").innerText = roundOneArray[1].category;
  document.getElementById("catr1-3").innerText = roundOneArray[2].category;
  document.getElementById("catr1-4").innerText = roundOneArray[3].category;
  document.getElementById("catr1-5").innerText = roundOneArray[4].category;
  document.getElementById("catr1-6").innerText = roundOneArray[5].category;
}
if (round === "round2") {
  document.getElementById("catr2-1").innerText = roundTwoArray[0].category;
  document.getElementById("catr2-2").innerText = roundTwoArray[1].category;
  document.getElementById("catr2-3").innerText = roundTwoArray[2].category;
  document.getElementById("catr2-4").innerText = roundTwoArray[3].category;
  document.getElementById("catr2-5").innerText = roundTwoArray[4].category;
  document.getElementById("catr2-6").innerText = roundTwoArray[5].category;
}

if (round === "final") {
}
//---------------------------------------------- Event Listeners ----------------------------------------------

passBtn.addEventListener("click", function listener() {
  if (passed == undefined || passed == false) {
    console.log("passed value:", passed);
    console.log("I'll Pass Thank you");
    switchPlayer();
    // displayPlayerTurnMessage();
    passed = true;
    console.log("passed value:", passed);
  } else {
    switchPlayer();
    console.log("can't pass anymore");
    console.log("passed value:", passed);
    // Change to close the window and the question.
  }
});

//-------------------------------------------------- Functions ------------------------------------------------
//! Fetch answers from jeopardy api
let fetchAnswers = async () => {
  const url = "https://jservice.io/api/clues?count=100";
  let randomURL = "https://jservice.io/api/random?count=100";
  let categoryURL = "https://jservice.io/api/category?id=";
  for (let i = 0; i < 6 - randomResultArray.length; i++) {
    let res = await fetch(categoryURL + (i + 1)); // Passing our file location
    let result = await res.json();
    // let data = result.data;
    let data = result;
    console.log("result:", result);
    questionArray.push(data);
  }
};
// fetchAnswers(); --- Commented out for now. Use JSON

//?
//! Commented Out Fetching from API for now.
// Fetch Information For the Answer Board
// let fetchRandomCategories = async () => {
//   let res = await fetch(randomURL); // Passing our file location
//   let result = await res.json();
//   // let data = result.data;
//   data = result;
//   for (let i = 0; i < 6; i++ && randomResultArray.length < 6) {
//     if (data[i].category.clues_count > 6 && randomResultArray < 6) {
//       randomResultArray.push(data[i].category_id);
//     } else {
//       fetchRandomCategories();
//     }
//   }
// console.log("In Async/await", data)
// console.log(randomResultArray);
// fetchAnswers();
// };

// fetchRandomCategories()

// console.log("questionArray:", questionArray);

//?

//?
// let fetchCategories = async () => {
//     url1 = `https://jservice.io/api/category?id=${data[0].id}`
//     let res = await fetch(url1);
//     let result = await res.json();
//     category = result;
//     console.log("categoryresult",category)
// }
//?

// Get Player Names on the Title Screen and Set to Local Storage

//!--------------------------------------------- Title Screen Function ------------------------------------------

async function titleScreen() {
  playBtn.addEventListener("click", saveName);
  function saveName() {
    let player1Name = inputFieldForP1Name.value;
    let player2Name = inputFieldForP2Name.value;

    //! Add fetch to backend
    localStorage.setItem("playerOneName", player1Name);
    localStorage.setItem("playerTwoName", player2Name);
  }
}

//!----------------------------------------------- Button Enable/Disable ----------------------------------------
// Disable the pass and guess buttons / enable the placeholder pass and guess buttons
function deactivateButtons() {
  placeholderGuessBtn.style.display = "inline-block";
  guessBtn.style.display = "none";
  placeholderPassBtn.style.display = "inline-block";
  passBtn.style.display = "none";
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
  nextRound.style.display = "inline-block";
  placeholderNextRound.style.display = "none";
}



//!------------------------------------------ Scoreboard and Name Functionality ------------------------------------
// Check Local Storage and Populate Scoreboard and Names
function getNamesAndScoreboardInfo() {
  //! Add fetch from backend
  // Get player names from local storage and input them to the scoreboard names
  if (localStorage.playerOneName != "") {
    // playerOneName = localStorage.playerOneName;
    if (
      localStorage.playerOneName[localStorage.playerOneName.length - 1] == "s"
    ) {
      playerOneScoreName.innerText = `${localStorage.playerOneName}' Score:`;
      playerOnesName = `${localStorage.playerOneName}`;
    } else {
      playerOneScoreName.innerText = `${localStorage.playerOneName}'s Score:`;
      playerOnesName = `${localStorage.playerOneName}`;
    }
  } else {
    playerOneScoreName.innerText = "Player 1's Score";
    playerOnesName = "Player 1";
  }

  if (localStorage.playerTwoName != "") {
    if (
      localStorage.playerTwoName[localStorage.playerTwoName.length - 1] == "s"
    ) {
      playerTwoScoreName.innerText = `${localStorage.playerTwoName}' Score:`;
      playerTwosName = `${localStorage.playerTwoName}`;
    } else {
      playerTwoScoreName.innerText = `${localStorage.playerTwoName}'s Score:`;
      playerTwosName = `${localStorage.playerTwoName}`;
    }
  } else {
    playerTwoScoreName.innerText = "Player 2's Score";
    playerTwosName = "Player 2";
  }

  p1Score.textContent = player1Score;
  p2Score.textContent = player2Score;
  activePlayer = playerOnesName;
}

// Notify that it is player 1's turn to choose
function displayPlayerTurnMessage() {
  // console.log("activePlayer in Display Player Turn Message Function", activePlayer)
  if (activePlayer[activePlayer.length - 1] === "s") {
    playerTurn.innerText = `${activePlayer}' turn. Pick an Answer!`;
  } else {
    playerTurn.innerText = `${activePlayer}'s turn. Pick an Answer!`;
  }
}

// Switch Players
function switchPlayer() {
  if (passed === true) {
    // passed = false;
// console.log("activeplayer:", activePlayer)
// console.log("playerOnesName", playerOnesName)
// console.log("playerTwosName", playerTwosName)

  } else 
  if (activePlayer == playerOnesName) {
    activePlayer = playerTwosName;
    activePlayerScore = player2Score;
    console.log("Player's turn:",activePlayer)
    win = null;
  } else if (activePlayer == playerTwosName) {
    activePlayer = playerOnesName;
    activePlayerScore = player1Score;
    console.log("Player's turn:",activePlayer)
    win = null;
  }
  displayPlayerTurnMessage();
}

function setActivePlayerScore(pointsAvailable) {
  if (activePlayer === playerOnesName) {
    console.log("pointsAvailable:",pointsAvailable)
    console.log("activePlayerScore:", activePlayerScore)
    console.log("round1ArrayScore",roundOneArray[index].score)
    player1Score = activePlayerScore += pointsAvailable;
  } else if (activePlayer === playerTwosName) {
    player2Score = activePlayerScore += pointsAvailable;
    console.log("pointsAvailable:",pointsAvailable)
    console.log("activePlayerScore:", activePlayerScore)
    console.log("round1ArrayScore",roundOneArray[index].score)
  }
}

function playQuestion (textDisplayBtn) {
  textDisplayBtn.innerText = "Close"

  setTimeout(() => {
  }, "10000");
}
const setToRiskButton = () => {
  // Change the text display button to  "buzz in"
  const textDisplayBtn = document.getElementById("textDisplayBtn");
  textDisplayBtn.innerText = "Buzz In"

  textDisplayBtn.addEventListener("click", () => playQuestion(textDisplayBtn))
    textDisplayBtn.innerText = "Close"
    setTimeout(() => {
    }, "10000");
}

const removeRiskButton = () => {
  const textDisplayBtn = document.getElementById("textDisplayBtn")
  textDisplayBtn.removeEventListener("click", () => {
    console.log("click");
    setTimeout(() => {
      console.log("Wrong!!!")
      // incorrect();
    }, "10000");
    // On buzzing in, clear the timer and add a new timer for the player to answer.
    // if (questionTimerActive) {
      // clearTimeout(questionTimerActive);
    // }
  })
}

const setToCloseBtn = () => {
  const textDisplayBtn = document.getElementById("textDisplayBtn");
  textDisplayBtn.innerText = "Close"
textDisplayBtn.addEventListener("click", function () {
  closeTextDisplayWindow();
  deactivateButtons();
  hideCloseBtn();
});
}

const removeCloseBtn = () => {
  textDisplayBtn.removeEventListener("click", function () {
    closeTextDisplayWindow();
    deactivateButtons();
    hideCloseBtn();
});
}

function openTextDisplayWindow() {
  textDisplay.style.display = "block";
  textDisplay.style.border = ".5em solid black";
  textDisplay.style.borderRadius = "2em";
  textDisplay.style.height = "11em";
  textDisplay.style.width = "60%";
  textDisplay.style.top = "7em";
  textDisplay.style.left = "20%";
  textDisplayBtn.innerText = "Buzz In";
  // setTimeout(() => {
    textDisplayBtn.style.display = "inline-block";
    // textDisplayBtn.id = "riskBtn"
    setToRiskButton()

    // Set a timeout while the "answer" is being read for people to buzz in.
    const questionTimerActive = setTimeout(() => {
      deactivateButtons();
      textDisplayBtn.id = "textDisplayBtn";
      removeRiskButton();
      setToCloseBtn();
      textDisplayBtn.innerText = "Close";
      // textDisplayBtn.innerHTML = `<button id="textDisplayBtn">Risk</button>`
    
      if (round === "round1") {
        textDispCont.innerText = "Time Up! The Answer Was "+`"${roundOneArray[index].answer}"`
      }
      if (round === "round2") {
        textDispCont.innerText = "Time Up! The Answer Was "+`"${roundTwoArray[index].answer}"`
      }
      if (round === "final") {
        textDispCont.innerText = "Time Up! The Answer Was "+`"${finalJeopardyCategory[index].answer}"`
      }
      textDisplayBtn.style.display = "inline-block"; 
    }, "7500")
    removeCloseBtn();
    setToRiskButton();
  // },200)

  setTimeout(() => {
    textDisplay.style.color = "white";
  }, "200");
}

function closeTextDisplayWindow() {
  textDisplay.style.color = "rgb(92, 107, 160)";
  textDisplay.style.height = "0em";
  textDisplay.style.width = "0em";
  textDisplay.style.top = "12em";
  textDisplay.style.left = "50%";
  textDisplay.style.borderRadius = "0";
  textDisplay.style.border = "0";
  if (win === false) {
    // passed = false;
    // win = undefined;
    console.log("playerOnesName:",playerOnesName)
    console.log("playerTwosName",playerTwosName)

    if (activePlayer == playerOnesName) {
      activePlayer = playerTwosName;
    } else {
      activePlayer = playerOnesName;
    }
    displayPlayerTurnMessage();
    console.log("activePlayer",activePlayer)


    
  }
}

//!----------------------------------------- Correct / Incorrect Functions -----------------------------------------

const correct = () => {
  playerGuess = "";
  textDispCont.textContent = `Congratulations ${activePlayer}, you answered correctly!`;
  textDisplayBtn.style.display = "inline-block";
  let pointsAvailable;
  if (round === "round1") {
    pointsAvailable = roundOneArray[index].score;
  }
  if (round === "round2" ) {
    pointsAvailable = roundTwoArray[index].score;
  }
  if (round === "final") {
    console.log("implement this later")
  }
  setActivePlayerScore(pointsAvailable);
  p1Score.textContent = player1Score;
  p2Score.textContent = player2Score;
  guessBtn.removeEventListener("click", submitGuess);
  deactivateButtons();
}

const incorrect = () => {
  playerGuess = "";
  let pointsAvailable;
  if (round === "round1") {
    pointsAvailable = (roundOneArray[index].score *-1);
  }
  if (round === "round2" ) {
    pointsAvailable = (roundTwoArray[index].score * -1);
  }
  if (round === "final") {
    console.log("implement this later")
  }
  if (passed == false || passed == undefined) {
    // activePlayerScore = 0;
    setActivePlayerScore(pointsAvailable);
    switchPlayer();
    console.log("activePlayerScore:",activePlayerScore)
    passed = true;
    textDispCont.textContent = `Wrong answer. ${activePlayer}, would you like to play?`;
    p1Score.textContent = player1Score;
    p2Score.textContent = player2Score;
    // passed = true;
    if (round === "round1") {
      setTimeout(() => {
        // textDispCont.textContent = placeholderQuestions[index].question;
        textDispCont.textContent = roundOneArray[index].question;
      }, 2000);
    }
    if (round === "round2") {
      setTimeout(() => {
        // textDispCont.textContent = placeholderQuestions[index].question;
        textDispCont.textContent = roundTwoArray[index].question;
      }, 2000);  
    }
    if (round === "final") {
      setTimeout(() => {
        // textDispCont.textContent = placeholderQuestions[index].question;
        textDispCont.textContent = finalJeopardyCategory.question;
      }, 2000);  
    }
    // setTimeout(() => {
    //   // textDispCont.textContent = placeholderQuestions[index].question;
    //   textDispCont.textContent = roundOneArray[i].question;
    // }, 2000);
  } else {
    // activePlayerScore = 0;
    setActivePlayerScore(pointsAvailable);
    textDispCont.textContent = `I'm sorry, ${activePlayer} that's the wrong answer.`;
    p1Score.textContent = player1Score;
    p2Score.textContent = player2Score;
    switchPlayer();
    setTimeout(() => {
      // textDisplay.style.display = "none";
      closeTextDisplayWindow();
      deactivateButtons();
      hideCloseBtn();
    }, 2000);
  }
}

function submitGuess() {
  // Set the playerGuess Variable
  playerGuess = inputFieldForAnswer.value;

  // Clear the input field
  inputFieldForAnswer.value = "";

  // Check the Round
  if (round === "round1") {
    if (roundOneArray[index].answer.toLowerCase() === playerGuess.toLowerCase()) {
      win = true;
      correct();
    } else {
      win = false;
      incorrect()
    }
  }
  if (round === "round2") {
    if (roundTwoArray[index].answer.toLowerCase() === playerGuess.toLowerCase()) {
      win = true;
      correct();
    } else {
      win = false;
      incorrect()
    }
  }
  if (round === "final") {
    if (finalJeopardyCategory[i].answer.toLowerCase() == playerGuess.toLowerCase()) {
      win = true;
      correct();
    } else {
      win = false;
      incorrect()
    }
  }
}

//! Round One Function
async function roundOne() {
  getNamesAndScoreboardInfo();
  displayPlayerTurnMessage();
  //! Reactivate this after looking into the loop
  // fetchRandomCategories();
  // fetchCategories();

  //!------------------------------------- Fill in the Answer board --------------------------------------

  // First Row
  for (let i = 0; i < 6; i++) {
    // answer200.textContent = `$200`;
    if (round === "round1") {
      answer200.textContent = `$200`;
    } else if (round === "round2") {
      answer200.textContent = `$400`;
    }
    answer200.className = `answer`;
    answerBoard.appendChild(answer200.cloneNode(true));
  }
  // Second Row
  for (let i = 0; i < 6; i++) {
    answer400.className = `answer`;
    if (round === "round1") {
      answer400.textContent = `$400`;
    } else if (round === "round2") {
      answer400.textContent = `$800`;
    }
    answerBoard.appendChild(answer400.cloneNode(true));
  }
  // Third Row
  for (let i = 0; i < 6; i++) {
    // answer600.id = `answerBtn${i + 1}`;
    answer600.className = `answer`;
    if (round === "round1") {
      answer600.textContent = `$600`;
    } else if (round === "round2") {
      answer600.textContent = `$1200`;
    }
    answerBoard.appendChild(answer600.cloneNode(true));
  }
  // Fourth Row
  for (let i = 0; i < 6; i++) {
    // answer800.id = `answerBtn${i + 1}`;
    answer800.className = `answer`;
    if (round === "round1") {
      answer800.textContent = `$800`;
    } else if (round === "round2") {
      answer800.textContent = `$1600`;
    }
    answerBoard.appendChild(answer800.cloneNode(true));
  }
  // Fifth Row
  for (let i = 0; i < 6; i++) {
    answer1000.className = `answer`;
    if (round === "round1") {
      answer1000.textContent = `$1000`;
    } else if (round === "round2") {
      answer1000.textContent = `$2000`;
    }
    answerBoard.appendChild(answer1000.cloneNode(true));
  }

  let answerSquares = document.getElementsByClassName("answer");
  for (let i = 0; i < answerSquares.length; i++) {
    answerSquares[i].addEventListener("click", function clicked() {
      passed = false;
      index = i;
      // console.log("passed",passed)
      if (round === "round1") {
        console.log("question", roundOneArray[i].question);
        console.log("answer", roundOneArray[i].answer);
        // console.log("category", roundOneArray[i].category);
      } else if (round === "round2") {
        console.log("question", roundTwoArray[i].question);
        console.log("answer", roundTwoArray[i].answer);
        // console.log("category", roundTwoArray[i].category);
      }

      let box = answerSquares[i];
      activateButtons();
      box.textContent = "";
      openTextDisplayWindow();

      //! This fills in the question (answer) when the box is clicked.
      if (round === "round1") {
        textDispCont.textContent = roundOneArray[i].question;
        console.log("pointsAvailable:", roundOneArray[i].score);
      } else if (round === "round2") {
        textDispCont.textContent = roundTwoArray[i].question;
        console.log("pointsAvailable:", roundTwoArray[i].score);
      }

      //! When clicked, the guess button calls submitGuess
      guessBtn.addEventListener("click", submitGuess);
      answerSquares[i].removeEventListener("click", clicked);
    });
  }
}
