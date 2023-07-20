//* Returning an error. Fix later

// let nameInput = document.getElementById("nameInput");
// let playerName;
// let submitNameButton = document.getElementById("submitNameButton");

// submitNameButton.addEventListener("click", submitName)

// function submitName(yourNameHere) {
//     let nameInput = document.getElementById("nameInput");
//     playerName = nameInput.value;
//     console.log(`Hello, ${playerName}`);
//     document.createElement('div')
//     document.div
// }
// console.log(yourNameHere);
// console.log(`I can still see ${playerName}`);

// let nameInput = document.getElementById("nameInput");
//     function submitName() {
        
//         console.log(playerName);
//         return playerName;
//     }


// console.log(playerName);

//* Example from further down the code

// let verticalInput = document.getElementById("verticalInput");

// let verticalSubmitBTN = document.getElementById("verticalSubmitButton");

/* verticalSubmitBTN.addEventListener("click", submitVerticalAnswer)

function submitVerticalAnswer() {
    let verticalInput = document.getElementById("verticalInput");
    // let vI = verticalInput;
    // verticalInput.innerText = verticalInput.innerText.replace(vI, "");
    console.log (verticalInput.value);
} */




// Put all letters into an array, letterBag
let letterBag = [
    "A", "A", "A", "A", "A", "A", "A", "A", "A", "B", "B", "C", "C", "D", "D", "D", "D", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "F", "F", "G", "G", "G", "H", "H", "I", "I", "I", "I", "I", "I", "I", "I", "I", "J", "K", "L", "L", "L", "L", "M", "M", "N", "N", "N", "N", "N", "N", "O", "O", "O", "O", "O", "O", "O", "O", "P", "P", "Q", "R", "R", "R", "R", "R", "R", "S", "S", "S", "S", "T", "T", "T", "T", "T", "T", "U", "U", "U", "U", "V", "V", "W", "W", "X", "Y", "Y", "Z", "*", "*"
];

let playableLetters = [];

// Populate Playable Letter Array with randomLetter from letterBag and remove letters used from the letterBag
function pullLettersFromLetterBag(){
    while (playableLetters.length < 7) {
        let randomLetterNumber = Math.floor(Math.random() *letterBag.length);
        playableLetters.push(letterBag[randomLetterNumber]);
        letterBag.splice(randomLetterNumber, 1); 
    }
    for (let i=0; i<=6; i++) {
        let id = document.getElementById(i);
        let letterToReplace = id.innerText
        id.innerText = id.innerText.replace (letterToReplace, playableLetters[i]);
    }
}

pullLettersFromLetterBag();


//Listen for the button click, and return the letters to the letterbag and 

let tradeInLettersButton = document.getElementById("tradeInLetters");

function tradeInLetters() {
    // console.log(letterBag)

    tradeInLettersButton.addEventListener("click", returnLettersToLetterbag)
    function returnLettersToLetterbag() {
        letterBag.push(...playableLetters)
        playableLetters = []
        pullLettersFromLetterBag();
    }
}

tradeInLetters();

// Give the gameGridBox a coordinate system???

// Trial, populate the gameGridBoxes with letters from the playableLetters

function putLettersInTheGameGridBoxes(){
    while (playableLetters.length < 7) {
        let randomLetterNumber = Math.floor(Math.random() *letterBag.length);
        playableLetters.push(letterBag[randomLetterNumber]);
        letterBag.splice(randomLetterNumber, 1); 
    }
    for (let i=0; i<=6; i++) {
        let id = document.getElementById(i);
        let letterToReplace = id.innerText
        id.innerText = id.innerText.replace (letterToReplace, playableLetters[i]);
    }
}



// Accept input from the Vertical Field

let verticalInput = document.getElementById("verticalInput");

let verticalSubmitBTN = document.getElementById("verticalSubmitButton");

verticalSubmitBTN.addEventListener("click", submitVerticalAnswer)

function submitVerticalAnswer() {
    let verticalInput = document.getElementById("verticalInput");
    // let vI = verticalInput;
    // verticalInput.innerText = verticalInput.innerText.replace(vI, "");
    console.log (verticalInput.value);
}
// Accept input from the Horizontal Field

let horizontalInput = document.getElementById("horizontalInput");

let horizontalSubmitBTN = document.getElementById("horizontalSubmitButton");

horizontalSubmitBTN.addEventListener("click", submitHorizontalAnswer)

function submitHorizontalAnswer() {
    let horizontalInput = document.getElementById("horizontalInput");
    // let vI = verticalInput;
    // verticalInput.innerText = verticalInput.innerText.replace(vI, "");
    console.log (horizontalInput.value);

}

// Work on this later
// Get words from word-game-dictionary
/* 
let url = "https://www.programmableweb.com/api/word-game-dictionary"

function fetch(url) {
    let response = await fetch(url);
    let results = await response.json();
    let data = results.data[1];
    console.log(data);
}


async function INFO(url, randomNumber) {
    fetch(url)
 *//* 
        - JSONify the data returned */
/*     try {   //  - Within the function, create a TRY/CATCH.
        let response = await fetch(url); // - TRY to fetch the url
        let results = await response.json();
        let data = results.data[randomNumber];
        // - console.log 3 different positions:
        console.log("Full Results: ", data); // - The overall promise returned * hint: use the random number to target an object within the array provided.
        console.log("Name Value: ", data.name); // - The name of a single character
        console.log("Image URL: ", data.imageUrl); // - The imageURL of the character that is provided.
        // - CATCH any error that is returned.
    } catch (error) {
        console.error(error);
    }
} */


// clickedGameTile(); 
    // console.log(tradeInLetters);
    



// Unfinished:
// On the click of a gameGridBox square, change the background color and set its position as the starting point for adding a word

    // {




    

// function clickedGameTile(changeTileColor); {
//     gameGridBox.addEventListener("click", changeTileColor)
//     function changeTileColor() {
//         console.log(hello);
//     }
// } 

//     }
//     }

    


// }

// let tileSquare = document.getElementsByClassName('gameGridBox');
// if (
    


//    element.addEventListener(event, function, useCapture);

// Assign a variable to submitName
    // let submitName = document.getElementById('submitName');
    // console.log(submitName);
// Get a name from the submitName field
    // function takeName(name){
        
    // }
    // submitName.addEventListener("onclick", takeName)

/*     <!-- Put these into JS later - see menu assignment
A - 1 point <br>
B - 3 points <br>
C - 3 points <br>
D - 2 points <br> 
E - 1 point <br> 
F - 4 points <br>
G - 2 points <br>
H - 4 points <br>
I - 1 point <br>
J - 8 points <br>
K - 5 points <br>
L - 1 point <br>
M - 3 points <br>
N - 1 point <br>
O - 1 point <br>
P - 3 points <br>
Q - 10 points <br>
R - 1 point <br>
S - 1 point <br>
T - 1 point <br>
U - 1 point <br>
V - 4 points <br>
W - 4 points <br>
X - 8 points <br>
Y - 4 points <br>
Z - 10 points <br>
    --> */
