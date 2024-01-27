let playerName;
    let submitNameButton = document.getElementById("submitNameButton");
    
submitNameButton.addEventListener("click", submitName)
    
    function submitName(yourNameHere) {
        let nameInput = document.getElementById("nameInput");
        playerName = nameInput.value;
        location.href="./gameBoard.html";

        console.log(`Hello, ${playerName}`);
    }