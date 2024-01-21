import placeholderQuestions from "./placeholder-questions.js";

// Global DOM Variables
const apiServer = "https://danhenrydev.com/api/jeopardy";
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

const activeStudentsList = document.getElementById("activeStudentsList");

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
let resultsHTML = "";

let roundOneArray = []; //this gets used by the game and defaults to placeholder questions
let roundTwoArray = [];
let finalJeopardyCategory = [];
let customContentArray = [];
let customRoundOneArray = []; // this redefines roundOneArray to fetched content
const classList = [];
let results = [];
let gameplayCategories = {};
let customGameInformation = {};
let customCategories = {};
let customQuestions = {};
let customAnswers = {};
let customGameName = "";
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
if (roundName[0]?.innerText == "Jeopardy!") {
  round = "title";
  titleScreen();
} else if (roundName[0]?.innerText == "Round One") {
  round = "round1";
  roundOne();
} else if (roundName[0]?.innerText == "Double Jeopardy") {
  round = "round2";
  roundOne();
} else if (roundName[0]?.innerText == "Final Jeopardy") {
  round = "final";
}

// --------------------------------------- API Calls -----------------------------------------
const fetchStudentList = async () => {
  const url = `${apiServer}/user/`;
  let result = await fetch(url);
  let data = await result.json();
};

const postGameplayInformation = async () => {
  const url = `${apiServer}/gameplay/gameplayinformation/`;

  await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customGameInformation),
  });
  console.log("customGameInformation", customGameInformation);
};

const fetchInformation = async () => {
  const url = `${apiServer}/questions/`;
  let result = await fetch(url);
  let data = await result.json();

  for (let i = 0; i < data.getAllQuestions.length; i++) {
    const gameAnswers = data.getAllQuestions[i].answer.split("\r\n");
    const gameQuestions = data.getAllQuestions[i].question.split("\r\n");
    const gameCategories = data.getAllQuestions[i].category.split("\r\n");
    const gameClassName = data.getAllQuestions[i].className.split("\r\n");

    classList.push({
      className: data.getAllQuestions[i].className,
      id: data.getAllQuestions[i]._id,
    });

    // Information for the Gameplay Categories/Class/Questions/Answers/Scores
    for (let index = 0; index < gameAnswers.length; index++) {
      customContentArray.push({
        category: gameCategories[0],
        className: gameClassName[0],
        question: gameQuestions[index],
        answer: gameAnswers[index],
        score: (index + 1) * 200,
      });
    }
  }

  // Fill the class list in the admin page
  const fillClassListDropdown = () => {
    for (let i = 0; i < classList.length; i++) {
      const listing = document.createElement("option");
      // Check for consecutive duplicate classes (//todo:  come up with a solution to deal with non-consecutive duplicates: either sort alphabetically and keep the same logic, or search through the array)
      if (classList[i - 1]?.className != classList[i].className) {
        listing.value = classList[i].className;
        listing.innerText = classList[i].className;
        // listing.id = classList[i].id;
        document.getElementById("class-names")?.append(listing);
      }
    }
  };

  // Fill in the category options for the class lists
  const numbers = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
    "Twenty",
    "Twenty-One",
  ];

  // ------------------------------------------------ Function to fill the Category Options List ---------------------------------
  const fillCategoryOptionsDropdown = () => {
    if (document.getElementById(`checkBoxes`)) {
      document.getElementById(`checkBoxes`).innerHTML = "";
    }
    results = [];
    resultsHTML = "";
    console.log("customGameInformationBefore:",customGameInformation)
    gameplayCategories = {};
    customGameInformation = {};
    customCategories = {};
    customQuestions = {};
    customAnswers = {};
    customGameName = "";
    const addedCategories = document.getElementById("addedCategories");

    addedCategories.innerHTML = `\n          
    <h1>Gameplay Categories:</h1>      <ol id="tempCategories">
        
    </ol>\n    `;
    console.log("customGameInformationAfter:",customGameInformation)
    //! Fill the results with categories of the same class name
    for (let i = 0; i < data.getAllQuestions.length; i++) {
      if (
        data.getAllQuestions[i].className ===
        document.getElementById("class-names")?.value
      ) {
        results.push({
          question: data.getAllQuestions[i].question,
          answer: data.getAllQuestions[i].answer,
          className: data.getAllQuestions[i].className,
          category: data.getAllQuestions[i].category,
          score: data.getAllQuestions[i].score,
          unit: data.getAllQuestions[i].unit,
        });
      }
    }

    // console.log("results Length:", results.length, "results:", results);
    // ----------------------------------------------------- Primary Category -------------------------------------------
    // Add the first category information from the results array to the resultsHTML string. This is done separately from the rest to accomidate the bootstrap differences.
    for (let i = 0; i < results.length; i++) {
      if (i === 0) {
        resultsHTML += `
    <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="accordionHeader_${i}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
<!--         <b>${results[i].category}</b> -->
         <span>
          <strong>Unit: </strong>${results[i].unit}
          <br> 
          <strong>Category: </strong> ${results[i].category}
          </span>
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <strong class="questions">Questions:</strong>
      <div>
      <ol class="categoryItems"><li>${results[i].question.replaceAll(
        "\r\n",
        "</li><li>"
      )}</ol> 
      <strong class="answers">Answers:</strong>
      <ol class="categoryItems"><li>${results[i].answer.replaceAll(
        "\r\n",
        "</li><li>"
      )}</ol>
      </div>
    </div>
      </div>
    </div>
    `;
      }

      let dataBsTarget = `collapse${numbers[i]}`;
      // console.log("classlist:", classList[i])
      const element = document.createElement("div");
      element.value = classList[i].className;
      element.innerText = classList[i].className;
      element.id = classList[i].id;
      element.innerText = data.getAllQuestions[i].question;

      // console.log("reslength",results.length,results)
      for (let i = 0; i < results.length; i++) {
        document.getElementById("questionList").innerHTML =
          "<span>" +
          resultsHTML +
          `

        <div class="form-group" name="className">
      </span>`;
      }

      // }

      // ! -------------------------------------------- Secondary categories: ---------------------------------------------

      if (results.length > 1 && i >= 1) {
        // console.log("secondary:");
        let dataBsTarget = `collapse${numbers[i]}`;
        // resultsHTML = ""
        resultsHTML += `
<div class = "accordion-item">
<h2 class="accordion-header" id="accordionHeader_${i}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${dataBsTarget}" aria-expanded="false" aria-controls="collapse${dataBsTarget}">
            <div>
              <strong>Unit: </strong>${results[i].unit}
              <br>
              <strong>Category: </strong>${results[i].category}
            </div>
              </button>
          </h2>
          <div id="collapse${dataBsTarget}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
              <strong class="questions">Questions:</strong>
              <div>
              <ol class="categoryItems"><li>${results[i].question.replaceAll(
                "\r\n",
                "</li><li>"
              )}</ol> 
              <strong class = "answers">Answers:</strong>
              <ol class="categoryItems"><li>${results[i].answer.replaceAll(
                "\r\n",
                "</li><li>"
              )}</ol>
              </div>
            </div>
          </div>
        </div>
        `;

        const element = document.createElement("div");
        element.value = classList[i].className;
        element.innerText = classList[i].className;
        element.id = classList[i].id;
        element.innerText = data.getAllQuestions[i].question;
        // document.getElementById("questionList").innerHTML = data.getAllQuestions[i].question;
        for (let i = 0; i < results.length; i++) {
          document.getElementById("questionList").innerHTML = resultsHTML;
        }
        const categorySelectBtn = document.getElementById(
          `categorySelectBtn${i}`
        );

        categorySelectBtn?.addEventListener("click", () => {
          console.log("click");
        });
      }
    }
    addCheckboxes();

    // !---------------------------------- Checkbox Functionality -------------------------------------------------
    for (
      let i = 0;
      i < document.getElementsByClassName("checkboxInput").length;
      i++
    ) {
      //! Listen to checkbox for checked or unchecked
      document
        .getElementsByClassName("checkboxInput")
        [i].addEventListener("change", () => check(i));
    }
  };

  const check = (i) => {
    // If checked...
    if (document.getElementsByClassName("checkboxInput")[i].checked === true) {
      // Check for existing gameplayItems list on the page.
      const gameplayItems = document.getElementsByClassName("gameplayItems");

      //If the length of gameplayItems is less than 6, allow the item to be appended
      console.log("gameplayItems.length:", gameplayItems.length);
      if (gameplayItems.length >= 6) {
        alert("There's a maximum of 6 categories.\n Uncheck one to add this.");
        document.getElementsByClassName("checkboxInput")[i].checked = false;
        return;
      }
      if (gameplayItems.length < 6) {
        console.log("less than 6");
        // Add two new keys to gameplayCategories

        if (document.getElementsByClassName("checkboxInput")[i].checked) {
          gameplayCategories["id_" + i] = i;
          gameplayCategories["content_" + i] = results[i];

          // Create a new div element, gameplayItem, with a className "gameplayItems", and add text (results.category, .className, and .unit)
          const gameplayItem = document.createElement("li");
          gameplayItem.id = `gameplayItem_${i}`;
          gameplayItem.className = "gameplayItems";
          gameplayItem.innerText = `${results[i].category},${results[i].className}, ${results[i].unit}`;

          customCategories[`category_${i}`] = results[i].category;
          customGameName = "gameName";
          customQuestions[`question_${i}`] = results[i].question;
          customAnswers[`answer_${i}`] = results[i].answer;

          // Append the new gameplayItem to "tempCategories" on the page
          const tempCategories = document.getElementById("tempCategories");
          tempCategories.appendChild(gameplayItem);
          // Check if the length of gameplayItems is equal to 6,
        }

        if (gameplayItems.length === 6) {

          // Create a "Start Game" button
          const addBtnPosition = document.createElement("div")
          addBtnPosition.id = "addBtnPosition"
          
          const btn = document.createElement("button");
          btn.type = "button";
          btn.id = "addGameBtn";
          btn.innerText = "Create Game";

          // const addBtnPosition = document.getElementById("addBtnPosition");
          // Add the "Start Game" button to "addedCategories"
          document.getElementById("addedCategories").appendChild(addBtnPosition);
          addBtnPosition.appendChild(btn);

          // Add an event listener for click
          btn.addEventListener("click", postGameplayInformation);
        }
      }
    }

    if (document.getElementsByClassName("checkboxInput")[i].checked === false) {
      // console.log("gameplayItems:",gameplayItems)
      console.log("gameplayCategories:", gameplayCategories);

      const gameplayItem = document.getElementById(`gameplayItem_${i}`);

      gameplayItem.parentElement.removeChild(gameplayItem);
      delete gameplayCategories["content_" + i];
      delete gameplayCategories["id_" + i];

      delete customCategories[`category_${i}`];
      customGameName = "";
      delete customQuestions[`question_${i}`];
      delete customAnswers[`answer_${i}`];

      const startbtn = document.getElementById("addGameBtn");
      if (startbtn){
        startbtn.remove()
      }
    }
    customGameInformation.question = customQuestions;
    customGameInformation.answer = customAnswers;
    customGameInformation.gameName = customGameName;
    customGameInformation.category = customCategories;
  };

  fillClassListDropdown();
  document.getElementById("class-names")?.addEventListener("change", () => {
    fillCategoryOptionsDropdown();
  });

  // ! --------------------------------------- Add Checkboxes to Categories List --------------------------
  const addCheckboxes = () => {
    if (document.getElementsByClassName("accordion-header")) {
      const accordionHeaders =
        document.getElementsByClassName("accordion-header");
      for (let i = 0; i < accordionHeaders.length; i++) {
        const accordionHeader = document.getElementById(`accordionHeader_${i}`);

        const checkboxLabel = document.createElement("label");
        checkboxLabel.htmlFor = `btncheck${i + 1}`;
        checkboxLabel.innerText = "Add Category to Game:";
        checkboxLabel.className = "checkboxLabel";

        const checkBoxInput = document.createElement("input");
        checkBoxInput.type = "checkbox";
        checkBoxInput.className = "checkboxInput";
        checkBoxInput.id = `btncheck${i + 1}`;
        checkBoxInput.autocomplete = "off";

        const deleteSection = document.createElement("div");
        deleteSection.id = `deleteSection_${i}`;

        const deleteCategoryLabel = document.createElement("label");
        deleteCategoryLabel.htmlFor = `deleteCategoryCheck${i + 1}`;
        deleteCategoryLabel.innerText = "Delete Category:";
        deleteCategoryLabel.className = "deleteCatLabel";

        const deleteCategoryInput = document.createElement("input");
        deleteCategoryInput.type = "input";
        deleteCategoryInput.className = "deleteCatInput";
        deleteCategoryInput.id = `deleteCatInput${i + 1}`;
        deleteCategoryInput.autocomplete = "off";
        deleteCategoryInput.placeholder = `enter "delete" to delete`;

        const deleteArea = document.createElement("div");
        deleteArea.id = "deleteArea";

        const deleteImage = document.createElement("img");
        deleteImage.type = "button";
        deleteImage.src = "./assets/delete.png";
        deleteImage.alt = "Del Img";
        deleteImage.className = "deleteImg";
        deleteImage.id = `deleteImg${i}`;
        // if (deleteCategoryInput.innerText.toLocaleLowerCase() = "delete")

        accordionHeader.appendChild(checkboxLabel);
        accordionHeader.appendChild(checkBoxInput);
        accordionHeader.appendChild(deleteArea);
        deleteArea.appendChild(deleteCategoryLabel);
        deleteArea.appendChild(deleteCategoryInput);
        deleteArea.appendChild(deleteImage);
        deleteCategoryInput.addEventListener("change", () => {
          let deleteCategoryValue =
            deleteCategoryInput.value.toLocaleLowerCase();
          if (deleteCategoryValue === "delete") {
            console.log("deletebuttonwillappear");
            deleteImage.style.visibility = "visible";
          } else {
            deleteImage.style.visibility = "hidden";
            console.log("nodeletebutton");
          }
        });

        deleteImage.addEventListener("click", () => {
          let deleteCategoryValue =
            deleteCategoryInput.value.toLocaleLowerCase();
          if (deleteCategoryValue === "delete") {
            console.log(`ready to delete ${i}`);

            if (confirm(`Are you sure you want to delete ${i}?`) === true) {
              console.log(`${i} has been deleted.`);
              deleteImage.style.visibility = "hidden";
              fillCategoryOptionsDropdown();
            }
          } else {
            console.log(`clicked delete ${i}, but no text`);
          }
        });
      }
    }
  };

  fillCategoryOptionsDropdown();
  // ------------------------------------------------ Event Listener for the Questions List Button -----------------------------

  document
    .getElementById("questionsListBtn")
    ?.addEventListener("click", fillCategoryOptionsDropdown);

  for (let i = 0; i < 5; i++) {
    for (let n = 0; n < 6; n++) {
      customRoundOneArray.push(customContentArray[i + 6 * n]);
    }
  }
};

// Now replace placeholder informatiom with the fetched information
roundOneArray = customRoundOneArray;

await fetchInformation();

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

function clearInputs(e) {
  e.preventDefault();
  document.getElementById("classNameInputField").value = "";
  document.getElementById("unitNameInputField").value = "";
  document.getElementById("categoryInputField").value = "";
  document.getElementById("questionInputField").value = "";
  document.getElementById("answerInputField").value = "";
}
//---------------------------------------------- Event Listeners ----------------------------------------------
// document.getElementById("newInformationSubmitButton").addEventListener("click", ()=> {
//   document.getElementById("classNameInputField").value = "";
//   document.getElementById("unitNameInputField").value = "";
//   document.getElementById("categoryInputField").value = "";
//   document.getElementById("questionInputField").value = "";
//   document.getElementById("answerInputField").value = "";
// })

passBtn?.addEventListener("click", function listener() {
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

activeStudentsList?.addEventListener("click", fetchStudentList);

//-------------------------------------------------- Functions ------------------------------------------------
// //! Fetch answers from jeopardy api
// let fetchAnswers = async () => {
//   const url = "https://jservice.io/api/clues?count=100";
//   let randomURL = "https://jservice.io/api/random?count=100";
//   let categoryURL = "https://jservice.io/api/category?id=";
//   for (let i = 0; i < 6 - randomResultArray.length; i++) {
//     let res = await fetch(categoryURL + (i + 1)); // Passing our file location
//     let result = await res.json();
//     // let data = result.data;
//     let data = result;
//     console.log("result:", result);
//     questionArray.push(data);
//   }
// };

// let r = "\r\""
// console.log("r:",r)
// Fetch Questions and Answers from danhenrydev jeopardy api

// ----------------------------------------------------------- Fetch on Click -----------------------------------------------------------

// const url = `${apiServer}/questions`;
const fetchQuestions = async function () {
  console.log("fetching questions...");
  let response = await fetch(`${url}/questions`);
  let data = await response.json();
  console.log("data:", data);
};

const testFetchButton = document.getElementById("testFetchButton");
testFetchButton?.addEventListener("click", fetchQuestions);

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
function hideTextDisplayBtn() {
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
  } else if (activePlayer == playerOnesName) {
    activePlayer = playerTwosName;
    activePlayerScore = player2Score;
    console.log("Player's turn:", activePlayer);
    win = null;
  } else if (activePlayer == playerTwosName) {
    activePlayer = playerOnesName;
    activePlayerScore = player1Score;
    console.log("Player's turn:", activePlayer);
    win = null;
  }
  displayPlayerTurnMessage();
}

function setActivePlayerScore(pointsAvailable) {
  if (activePlayer === playerOnesName) {
    console.log("pointsAvailable:", pointsAvailable);
    console.log("activePlayerScore:", activePlayerScore);
    console.log("round1ArrayScore", roundOneArray[index].score);
    player1Score = activePlayerScore += pointsAvailable;
  } else if (activePlayer === playerTwosName) {
    player2Score = activePlayerScore += pointsAvailable;
    console.log("pointsAvailable:", pointsAvailable);
    console.log("activePlayerScore:", activePlayerScore);
    console.log("round1ArrayScore", roundOneArray[index].score);
  }
}

textDisplayBtn?.addEventListener("click", function () {
  closeTextDisplayWindow();
  deactivateButtons();
  hideTextDisplayBtn();
});

//! --------------------------------------- Open the Clue Window -----------------------
function openTextDisplayWindow() {
  textDisplay.style.display = "block";
  textDisplay.style.border = ".5em solid black";
  textDisplay.style.borderRadius = "2em";
  textDisplay.style.height = "clamp(15vh,14em,50vh)";
  // textDisplay.style.height = "11rem";
  // textDisplay.style.minHeight = "40vh";
  textDisplay.style.width = "60%";
  textDisplay.style.top = "7em";
  textDisplay.style.left = "20%";
  textDisplayBtn.innerText = "Buzz In";
  setTimeout(() => {
    textDisplayBtn.style.display = "inline-block";
    textDisplayBtn.id = "riskBtn"; //todo maybe change this later to remove the id change
    document.getElementById("riskBtn").addEventListener("click", () => {
      //todo maybe change this later to remove the id change
      console.log("click");
    });
  }, 200);

  //! --------------------------------- Hide the Clue Window text until the animation finishes -----------------
  setTimeout(() => {
    textDisplay.style.color = "white";
  }, "200");

  //!---------------------------------------------- Timer for Buzzing in ---------------------------------------
  setTimeout(() => {
    deactivateButtons();
    textDisplayBtn.id = "textDisplayBtn"; //todo maybe change this later to remove the id change
    textDisplayBtn.innerText = "Close";
    // textDisplayBtn.innerHTML = `<button id="textDisplayBtn">Risk</button>`

    if (round === "round1") {
      textDispCont.innerText =
        "Time Up! The Answer Was " + `"${roundOneArray[index].answer}"`;
    }
    if (round === "round2") {
      textDispCont.innerText =
        "Time Up! The Answer Was " + `"${roundTwoArray[index].answer}"`;
    }
    if (round === "final") {
      textDispCont.innerText =
        "Time Up! The Answer Was " + `"${finalJeopardyCategory[index].answer}"`;
    }
    textDisplayBtn.style.display = "inline-block";
  }, "5000");
}

//! ---------------------------------------- Function to Close the Clue Window ----------------------------------
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
    console.log("playerOnesName:", playerOnesName);
    console.log("playerTwosName", playerTwosName);

    if (activePlayer == playerOnesName) {
      activePlayer = playerTwosName;
    } else {
      activePlayer = playerOnesName;
    }
    displayPlayerTurnMessage();
    console.log("activePlayer", activePlayer);
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
  if (round === "round2") {
    pointsAvailable = roundTwoArray[index].score;
  }
  if (round === "final") {
    console.log("implement this later");
  }
  setActivePlayerScore(pointsAvailable);
  p1Score.textContent = player1Score;
  p2Score.textContent = player2Score;
  guessBtn.removeEventListener("click", submitGuess);
  deactivateButtons();
};

const incorrect = () => {
  playerGuess = "";
  let pointsAvailable;
  if (round === "round1") {
    pointsAvailable = roundOneArray[index].score * -1;
  }
  if (round === "round2") {
    pointsAvailable = roundTwoArray[index].score * -1;
  }
  if (round === "final") {
    console.log("implement this later");
  }
  if (passed == false || passed == undefined) {
    // activePlayerScore = 0;
    setActivePlayerScore(pointsAvailable);
    switchPlayer();
    console.log("activePlayerScore:", activePlayerScore);
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
      hideTextDisplayBtn();
    }, 2000);
  }
};

function submitGuess() {
  // Set the playerGuess Variable
  playerGuess = inputFieldForAnswer.value;

  // Clear the input field
  inputFieldForAnswer.value = "";

  // Check the Round
  if (round === "round1") {
    if (
      roundOneArray[index].answer.toLowerCase() === playerGuess.toLowerCase()
    ) {
      win = true;
      correct();
    } else {
      win = false;
      incorrect();
    }
  }
  if (round === "round2") {
    if (
      roundTwoArray[index].answer.toLowerCase() === playerGuess.toLowerCase()
    ) {
      win = true;
      correct();
    } else {
      win = false;
      incorrect();
    }
  }
  if (round === "final") {
    if (
      finalJeopardyCategory[i].answer.toLowerCase() == playerGuess.toLowerCase()
    ) {
      win = true;
      correct();
    } else {
      win = false;
      incorrect();
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
  // console.log("round1 array:", roundOneArray);
}
