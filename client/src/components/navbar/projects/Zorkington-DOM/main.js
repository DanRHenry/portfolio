// DOM Bindings
const stuff = document.getElementById("inventory");
const textInput = document.getElementById("inputText");
const look = document.getElementById("look");
const take = document.getElementById("take");
const helpBtn = document.getElementById("help-btn");
const displayText = document.getElementById("displayText");
const north = document.getElementById("North");
const south = document.getElementById("South");
const east = document.getElementById("East");
const west = document.getElementById("West");
const submit = document.getElementById("submit-btn");
const helpBox = document.getElementById("helpBox");

// Useful Links:
// https://mixkit.co/free-sound-effects/horror/
// https://groups.google.com/a/chromium.org/g/chromium-extensions/c/AzO_taH2b7U?pli=1 // Creating JSON from local storage

// Global Variables
let nameInput;
let input;
let item = [];
let cL = [];
let inventory = ["keycard"];
let locationArray = []; // This will store all constructed location objects
let z = 0;
let x = 9;
let y = 9;
let playerLocation = [z, x, y];
let locationIndex = 0;
let response;
let inventoryList = "";

// Intro Welcome Message

const welcomeMessage = `<span>Welcome to the <br><br><strong>UprightEd <br>Zorkington Project!</strong> <br><br>Before we get started... Please enter your <strong>name.</strong></span>`;

function submitName() {
  nameInput = textInput.value;
  textInput.value = "";
}

// Event Listeners

// Help Button
helpBtn.addEventListener("click", () => {
  helpBox.style.display = "flex";
  closeBox.addEventListener("click", () => {
    helpBox.style.display = "none";
  });
});

// Directions
north.addEventListener("click", function () {
  go("north");
});

north.addEventListener("click", function () {
  response = textInput.value.toLowerCase();
  describe();
});

south.addEventListener("click", function () {
  response = textInput.value.toLowerCase();
  go("south");
});
south.addEventListener("click", function () {
  response = textInput.value.toLowerCase();
  describe();
});

east.addEventListener("click", function () {
  response = textInput.value.toLowerCase();
  go("east");
});
east.addEventListener("click", function () {
  response = textInput.value.toLowerCase();
  describe();
});

west.addEventListener("click", function () {
  response = textInput.value.toLowerCase();
  go("west");
});

west.addEventListener("click", function () {
  response = textInput.value.toLowerCase();
  describe();
});

stuff.addEventListener("click", function () {
  displayInventory();
});

look.addEventListener("click", describe);

displayText.innerHTML = `${welcomeMessage}`;

function submitTextNameCheck() {
  if (nameInput == undefined) {
    if (textInput.value == null || textInput.value < 1) {
      displayText.innerHTML = `I didn't understand that. <br> Please enter your <strong> name </strong>.`;
    } else {
      submitName();
      displayText.innerHTML = `Hi, <span><strong>${nameInput}</strong>! <br>We are happy that you have come to take a tour of our <span><strong>Zorkington project</strong>! <br><br>You're at the entrance to the <span><strong>PTSB January Cohort</strong>. You see a <span><strong>magnetic stripe reader</strong>.`;
    }
  } else if (nameInput) {
    submitText();
  }
}

// ----------- Submit event listener, asks for name or redirects to other keywords -----------
textInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submitTextNameCheck();
  }
});

//! Input Code Added Starting Here
function submitText() {
  response = textInput.value.toLowerCase();
  input = response.split(" ");
  response = textInput.value.toLowerCase();
  textInput.value = "";
  input.push(textInput);
  input = response.split(" ");
  input = input.map((item) => item.toLowerCase());
   if (input.includes("the")) {
    input.splice(input.indexOf("the"), 1);
  }
 
  //!------------------------------ Search input for keywords ------------------------------

  //------------------------------ Display Current Location Array --------------------------
  if (input.includes("cl")) {
    cLFunction();
  }

  //------------------------------- Populate the Current Location --------------------------
  //---------------------- Use if there is no location for the coordinates -----------------
  else if (input.includes("popcl")) {
    popCL();
  }

  //-------------------- Display the array of location objects for debugging ---------------
  else if (input.includes("location")) {
    console.log(playerLocation, "\n", locationArray);
    displayText.innerHTML = `${playerLocation}, ${locationArray}`;
  }

  //------------------------------------- Look command: ------------------------------------
  else if (input.includes("look") || input.includes("search")) {
    describe();
  }

  //-------------------------------------- Where am I? -------------------------------------
  //--Display Location coordinate (locationArray[locationIndex].coordinate), and Current Location (cL)--
  else if (input.includes("where")) {
    whereAmI();
  }

  //-------------------------------------- Move north: -------------------------------------
  else if (
    (input.includes("go") && input.includes("north")) ||
    (input.includes("move") && input.includes("north")) ||
    (input.includes("walk") && input.includes("north")) ||
    (input.includes("go") && input.includes("forward")) ||
    (input.includes("move") && input.includes("forward")) ||
    (input.includes("walk") && input.includes("forward"))
  ) {
    go("north");
  }

  //--------------------------------------- Move south: ------------------------------------
  else if (
    (input.includes("go") && input.includes("south")) ||
    (input.includes("move") && input.includes("south")) ||
    (input.includes("walk") && input.includes("south")) ||
    (input.includes("go") && input.includes("backward")) ||
    (input.includes("move") && input.includes("backward")) ||
    (input.includes("walk") && input.includes("backward"))
  ) {
    go("south");
  }

  //--------------------------------------- Move east: -------------------------------------
  // Search input for keywords go, move, walk, south
  else if (
    (input.includes("go") && input.includes("east")) ||
    (input.includes("move") && input.includes("east")) ||
    (input.includes("walk") && input.includes("east")) ||
    (input.includes("go") && input.includes("right")) ||
    (input.includes("move") && input.includes("right")) ||
    (input.includes("walk") && input.includes("right"))
  ) {
    go("east");
  }

  // -------------------------------------- Move west: -------------------------------------
  // Search input for keywords go, move, walk, south
  else if (
    (input.includes("go") && input.includes("west")) ||
    (input.includes("move") && input.includes("west")) ||
    (input.includes("walk") && input.includes("west")) ||
    (input.includes("go") && input.includes("left")) ||
    (input.includes("move") && input.includes("left")) ||
    (input.includes("walk") && input.includes("left"))
  ) {
    go("west");
  }

  // --------------------------------------- Move up: --------------------------------------
  // Search input for keywords go, move, walk, south
  else if (
    (input.includes("go") && input.includes("up")) ||
    (input.includes("move") && input.includes("up")) ||
    (input.includes("walk") && input.includes("up"))
  ) {
    go("up");
  }

  // -------------------------------------- Move down: -------------------------------------
  // Search input for keywords go, move, walk, south
  else if (
    (input.includes("go") && input.includes("down")) ||
    (input.includes("move") && input.includes("down")) ||
    (input.includes("walk") && input.includes("down"))
  ) {
    go("down");
  }

  // ------------------------------------ Warp to start: -----------------------------------
  else if (
    input.includes("warp")
    // input.includes("please") ||
    // input.includes("abracadabra") ||
    // input.includes("hocus")
  ) {
    warp();
  }

  // -------------------------------------- Exit game: -------------------------------------
  else if (input.includes("quit") || input.includes("exit")) {
    exitGame();
  }

  // --------------------------------- Take/pick up items: ---------------------------------
  /* 
  Check to see if an item exists in the current location
  If it does, add it to the inventory and remove it from the current location object.
  */
  else if (input.includes("take") || input.includes("pick")) {
    let itemToTake;
    console.log("Take here", input);
    if (input.includes("take")) {
      itemToTake = input[input.indexOf("take") + 1];
      takeItem(itemToTake);
    } else if (input.includes("pick")) {
      itemToTake = input[input.indexOf("pick") + 2];
      takeItem(itemToTake);
    } else {
      takeItem();
    }
  }

  // ------------------------------------- Drop Item: --------------------------------------
  // Use the splice command to remove the dropped item from the inventory
  else if (input.includes("drop") || input.includes("leave")) {
    let itemToDrop;
    if (input.includes("drop")) {
      itemToDrop = input[input.indexOf("drop") + 1];
      console.log("itemtodrop:", itemToDrop);
      drop(itemToDrop);
    } else if (input.includes("leave")) {
      console.log(input);
      let itemToDrop = input[input.indexOf("leave") + 1]; // Takes the next word in the input index to use as an item argument
      itemToDrop = input[indexOf("leave") + 1];
      console.log("itemtoleave:", itemToDrop);
      drop(itemToDrop);
    }
  }

  // This works for unlocking doors, but doesn't work for detecting if there is nothing to unlock
  else if (input.includes("unlock") || input.includes("swipe")) {
    unlock();
  }

  //------------------------------------ View Inventory: -----------------------------------
  else if (
    input.includes("inventory") ||
    input.includes("items") ||
    input.includes("i")
  ) {
    displayInventory();
  }

  // ------------------------------------ Open the door ------------------------------------
  else if (input.includes("open") && locationArray[locationIndex].funct) {
    locationArray[locationIndex].funct();
    //?    start()
  } else if (input.includes("open") && !locationArray[locationIndex].funct) {
    displayText.innerHTML = `There's nothing to open here!`;
    //?    start()
  }

  // ------------------------------- Command not recognized: -------------------------------
  else {
    displayText.innerHTML = `I don't understand what you're saying.`;
    //?  start()
  }
}

// Functions

//!-------------------------------Location Class Constructor------------------------------
class Location {
  constructor(
    coordinate,
    name,
    description,
    north,
    east,
    south,
    west,
    up,
    down,
    item,
    lock,
    funct
  ) {
    this.coordinate = coordinate; // Location on map
    this.description = description; // wordy description from looking around
    this.north = north;
    this.east = east;
    this.south = south;
    this.west = west;
    this.up = up; // Default direction to closed
    this.down = down; // Default direction to closed
    this.name = name; // quick name of location
    this.item = item;
    this.lock = lock; // holds a string that matches a key used to unlock it
    this.funct = funct;
  }
}

//!-------------------------- Standard Location Creation Function ------------------------
function createLocation(newLocation) {
  console.log("newLocation",newLocation)
  newLocation = new Location(
    newLocation.coordinate,
    newLocation.name,
    newLocation.description,
    newLocation.north,
    newLocation.east,
    newLocation.south,
    newLocation.west,
    newLocation.up,
    newLocation.down,
    newLocation.item,
    newLocation.lock,
    newLocation.funct
  );
  return locationArray.push(newLocation);
}

/*//!-------------------------------- Locations indices-----------------------------------
  0 = newLocation variable
  1 = coordinate
  2 = name
  3 = description
  4 = north
  5 = east
  6 = south
  7 = west
  8 = up
  9 = down
  10 = item
  11 = lock
  12 = funct
 */

//!------------------------ Locations to Populate locationArray---------------------------
// Create Start Location
const startingLocation = {
  coordinate: [0, 9, 9],
  name: "home",
  description:
    "You're at the entrance to the PTSB January Cohort. <br> You see a <span><strong>magnetic stripe reader.</strong></span>",
  north: "blocked",
  east: undefined,
  south: undefined,
  west: undefined,
  up: undefined,
  down: undefined,
  item: [`keycard`, `crayon`, `index`, `football`],
  lock: "keycard",
  funct: undefined,
};

createLocation(startingLocation);

// Create Hallway

const hallwayLocation = {
  coordinate: [0, 9, 10],
  name: "hallway",
  description:
    "\nThere are doors up and down the hallway. <br>Through a window to your <em>left</em>, you can see <strong>Morgan Walker</strong>. She appears to be meeting with a <em>student</em>. Best not disturb them. <br>To the <em>right</em> is a <strong>door</strong to an office.",
  north: undefined,
  east: undefined,
  south: undefined,
  west: "blocked",
  up: undefined,
  down: undefined,
  item: [],
  lock: undefined,
  funct: undefined,
};

createLocation(hallwayLocation);

// Create topOfStairway

const topOfStairwayLocation = {
  coordinate: [0, 8, 11],
  name: "stairwell",
  description: "You stand at a stairwell going down",
  north: "blocked",
  east: undefined,
  south: "blocked",
  west: "blocked",
  up: undefined,
  down: "open",
  item: [],
  lock: undefined,
  funct: undefined,
};

createLocation(topOfStairwayLocation);

// Create dungeon
const dungeonLocation = {
  coordinate: [-1, 8, 11],
  name: "dungeon",
  description:
    "You have stumbled on a dungeon. There is a narrow path to your right.",
  north: "blocked",
  east: undefined,
  south: "blocked",
  west: "blocked",
  up: "open",
  down: undefined,
  item: [],
  lock: undefined,
  funct: undefined,
};
createLocation(
  dungeonLocation
  // "dungeon", //0
  // [-1, 8, 11], //1
  // `stairwell`, //2
  // // `\nYou have stumbled on a ${green}dungeon${reset}.\nThere is a narrow path to your ${yellow}right${reset}`,//3
  // "You have stumbled on a dungeon. There is a narrow path to your right.",
  // "blocked", //4 north
  // undefined, //5 east
  // "blocked", //6 south
  // "blocked", //7 west
  // "open", //8 up
  // undefined, //9 down
  // [], //10 item
  // undefined, //11 lock
  // undefined // 12 funct
);

// Create Traproom
const trapRoomLocation = {
  coordinate: [-1, 9, 11],
  name: "trapRoom",
  description:
    "It's a trap! The door has closed and locked behind you! It isn't budging. You see a note that reads: Speak the magic word, and you may exit.",
  north: "blocked",
  east: "blocked",
  south: "blocked",
  west: "blocked",
  up: undefined,
  down: undefined,
  item: [],
  lock: undefined,
  funct: undefined,
};

createLocation(trapRoomLocation);

// Create Kate's Office
const katesOfficeLocation = {
  coordinate: [0, 9, 12],
  name: "katesOffice",
  description:
    "<strong>Kate</strong> is waiving hello. <br>There's a <strong>lamp</strong> on Kate's desk.",
  north: "blocked",
  east: "blocked",
  south: undefined,
  west: "blocked",
  up: undefined,
  down: undefined,
  item: [],
  lock: undefined,
  funct: undefined,
};

createLocation(katesOfficeLocation);

// Create End of Hall

const endOfHallLocation = {
  coordinate: [0, 9, 11],
  name: "endOfHall",
  description:
    "You reach the end of the hall,\nthe door to <strong>Kate's office</strong> is ahead. <br>To the left is a <strong>stairwell</strong>.",
  north: undefined,
  east: "blocked",
  south: undefined,
  west: undefined,
  up: undefined,
  down: undefined,
  item: [],
  lock: undefined,
  funct: undefined,
};

createLocation(endOfHallLocation);

// Create Ben's Office
const bensOfficeLocation = {
  coordinate: [0, 10, 10],
  name: "bensOffice",
  description:
    "<br><strong>Ben</strong> is sitting at his computer, leading a help session. <br>He offers you <em>sympathy</em>.<br>",
  north: "blocked",
  east: "blocked",
  south: "blocked",
  west: undefined,
  up: undefined,
  down: undefined,
  item: ["tissue"],
  lock: undefined,
  funct: undefined,
};

createLocation(bensOfficeLocation);

//! ------------------------- Populate Current Location Array ----------------------------
function popCL(location) {
  cL = [];
  if (locationArray[location]) {
    cL.push(locationArray[location].north);
    cL.push(locationArray[location].east);
    cL.push(locationArray[location].south);
    cL.push(locationArray[location].west);
    cL.push(locationArray[location].up);
    cL.push(locationArray[location].down);
  } else {
    console.log("gonna have to make something up in the popcl function");
  }
}

//!Search function for finding the playerLocation coordinates in the locationArray(object)
function search() {
  for (let locationIndex = 0; locationIndex < locationArray.length; locationIndex++) {
    if (
      JSON.stringify(locationArray[locationIndex].coordinate) !=
      JSON.stringify(playerLocation)
    ) {
      console.log("nothing here");
    } else if (
      JSON.stringify(locationArray[locationIndex].coordinate) ==
      JSON.stringify(playerLocation)
    ) {
      popCL(locationIndex);
      return locationIndex = locationIndex;
    } else if (locationArray[locationIndex].coordinate == undefined) {
      onTheFlyLocation();
    }
  }
}

//?---------------------------------------------------------

//! Functions Section:

// ------------------------------------- Warp function --------------------------------
function warp() {
  if (cL[6] == "blocked") {
    displayText.innerHTML = `You cannot warp out of here`;
    playerLocation = locationArray[locationIndex].coordinate;
    displayText.innerHTML = `locationArray[locationIndex].coordinate: ${locationArray[locationIndex].coordinate}`;
  } else {
    [z, x, y] = [0, 9, 9];
    playerLocation = [z, x, y];
    displayText.innerHTML = `You have warped home!`;
  }
}

// ------------------- Creating a new location if none is present. -----------------------
function onTheFlyLocation() {
  if (!playerLocation[locationIndex])
    displayText.innerHTML = `about to create a new playerLocation, ${playerLocation}`;
  let newLocation = `_${playerLocation}`;

  createLocation(
    newLocation,
    playerLocation,
    undefined,
    "nothing special about this area",
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    []
  );
}

// -------------------------------- Take Items function: ---------------------------------
function takeItem(itemToTake) {
  search();
  if (locationArray[locationIndex] == undefined || locationArray[locationIndex].item.length == 0) {
    displayText.innerHTML = `There's nothing to pick up.`;
    //?        start();
  } else {
    let localItem = locationArray[locationIndex].item;
    if (itemToTake != undefined && localItem[localItem.indexOf(itemToTake)]) {
      inventory.push(localItem[localItem.indexOf(itemToTake)]);
      localItem.splice(localItem.indexOf(itemToTake), 1);
      let itemMessage = `You pick up the <strong>${itemToTake}</strong>`;
      setTimeout(() => {
        displayText.innerHTML = itemMessage;
      }, 0);
      setTimeout(() => {
        describe();
      }, 2000);
      itemToTake = undefined;
      //?          start();
    } else if (
      itemToTake != undefined &&
      !localItem[localItem.indexOf(itemToTake)]
    ) {
      displayText.innerHTML = `You can't take that.`;
      itemToTake = undefined;
      //?          start();
    } else if (itemToTake == undefined) {
      displayText.innerHTML = `Can you be more specific?`;
    }
  }
}

// ---------------------------- Confirm Drop Items Function ------------------------------
function dropYN(item) {
  let currentLocation = locationArray[locationIndex];
  let itemMessage = `You set down the <strong>${item}</strong>.`;
  setTimeout(() => {
    displayText.innerHTML = itemMessage;
  }, 0);
  setTimeout(() => {
    describe();
  }, 2000);

  currentLocation.item.push(item);
  inventory.splice([inventory.indexOf(item)], 1);
  //?          start();
}

// --------------------------------- Drop Items Function ---------------------------------
function drop(item) {
  search();

  // -------------------------------- Drop Inventory Check ---------------------------------

  if (!inventory.includes(item)) {
    displayText.innerHTML = `You can't drop what you don't have.`;
    //?        start();
  } else {
    dropYN(item);
  }
  //?          start();
}

// ---------------------------------- Movement Function ----------------------------------
function go(text) {
  search();
  let blockedNEWS = `The way is blocked.`;
  /* Search for the index of the current location in the locations array
   */
  // If the text is "blocked", do not move, but display a message.
  if (text == "north" || text == "forward") {
    if (cL[0] == "blocked") {
      blocked(blockedNEWS);
      playerLocation = locationArray[locationIndex].coordinate;
    } else {
      y++;
      playerLocation = [z, x, y];
    }
  } else if (text == "east" || text == "right") {
    if (cL[1] == "blocked") {
      blocked(blockedNEWS);
      playerLocation = locationArray[locationIndex].coordinate;
    } else {
      x++;
      playerLocation = [z, x, y];
    }
  } else if (text == "south" || text == "backward") {
    if (cL[2] == "blocked") {
      blocked(blockedNEWS);
      playerLocation = locationArray[locationIndex].coordinate;
    } else {
      y--;
      playerLocation = [z, x, y];
    }
  } else if (text == "west" || text == "left") {
    if (cL[3] == "blocked") {
      blocked(blockedNEWS);
      playerLocation = locationArray[locationIndex].coordinate;
    } else {
      x--;
      playerLocation = [z, x, y];
    }
  } else if (text == "up") {
    if (cL[4] != "open") {
      blocked(`You can't go up from here.`);
      // displayText.innerHTML = `You can't go up from here.`;
      if (locationArray[locationIndex]) {
        playerLocation = locationArray[locationIndex].coordinate;
      }
    } else {
      z++;
      playerLocation = [z, x, y];
    }
  } else if (text == "down") {
    if (cL[5] != "open") {
      // displayText.innerHTML = `You can't go up from here.`;
      blocked(`You can't go down from here.`);
      if (locationArray[locationIndex]) {
        playerLocation = locationArray[locationIndex].coordinate;
      }
    } else {
      z--;
      playerLocation = [z, x, y];
    }
  }

  onTheFlyLocation();
  popCL();
  describe();
}

// ----------------------------------- Looking around ------------------------------------
function describe() {
  search();
  console.log("locationArray",locationArray)
  if (!locationArray[locationIndex]) {
    displayText.innerHTML = `You don't see anything interesting...`;
  } else if (locationArray[locationIndex].item.length > 0 && locationArray[locationIndex].description) {
    let items = [];
    for (let c = 0; c < locationArray[locationIndex].item.length; c++) {
      items.push(`${locationArray[locationIndex].item[c]},`);
    }
    word = items[items.length - 1];
    word = word.slice(0, -1);
    let itemList = "";
    if (items.length > 1) {
      items[items.length - 1] = `and a ` + word + `.`;
      for (item of items) {
        (itemList += item), (itemList += " ");
      }
      itemList = itemList.slice(0, -1);
    } else {
      itemList = items[0];
      itemList = itemList.slice(0, -1);
    }
    displayText.innerHTML = `You look around and see... <br> ${locationArray[locationIndex].description} You also see a <strong>${itemList}</strong>`;
    //?            start();
  } else if (locationArray[locationIndex].description) {
    displayText.innerHTML = `You look around and see... <br> ${locationArray[locationIndex].description}`;
    //?          start();
  }
}

function moveNotice(input) {
  setTimeout(() => {
    displayText.innerHTML = `You move ${input}.`;
  }, 0);
  setTimeout(() => {
    displayText.innerHTML = `<${locationArray[locationIndex].description}`;
  }, 1000);
}

function blocked(message) {
  setTimeout(() => {
    displayText.innerHTML = message;
  }, 0);
  setTimeout(() => {
    describe();
  }, 2000);
}

// ----------------------------- Unlocking doors function: -------------------------------
function unlock() {
  if (!locationArray[locationIndex]) {
    setTimeout(() => {
      displayText.innerHTML = "There's nothing to unlock.";
    }, 0);
    setTimeout(() => {
      describe();
    }, 2000);
  } else if (locationArray[locationIndex].lock == undefined) {
    setTimeout(() => {
      displayText.innerHTML = "There's nothing to unlock.";
    }, 0);
    setTimeout(() => {
      describe();
    }, 2000);
  } else if (inventory.includes(locationArray[locationIndex].lock)) {
    if (locationArray[locationIndex].north == "blocked") {
      locationArray[locationIndex].north = undefined;
    } else if (locationArray[locationIndex].east == "blocked") {
      locationArray[locationIndex].east = undefined;
    } else if (locationArray[locationIndex].south == "blocked") {
      locationArray[locationIndex].south = undefined;
    } else if (locationArray[locationIndex].west == "blocked") {
      locationArray[locationIndex].west = undefined;
    }
    setTimeout(() => {
      displayText.innerHTML = `You hear a <strong>mechanism <em>click</em></strong>.<br>The <strong>door</strong> swings open.`;
    }, 0);
    setTimeout(() => {
      describe();
    }, 2000);
    inventory.splice(inventory.indexOf(locationArray[locationIndex].lock), 1);
    locationArray[locationIndex].lock = undefined;
    cL[cL.indexOf("blocked")] = undefined;
    //?    start()
  }
}

// ---------------------------------- Inventory ----------------------------------------
function displayInventory() {
  if (inventory.length == 0) {
    displayText.innerHTML = `You have <strong>nothing</strong> in your inventory`;
  } else {
    inventoryList = "<ol>";
    inventory.forEach((item) => {
      inventoryList += `<li>`;
      inventoryList += item;
      inventoryList += `<br>`;
    });
    inventoryList += `</ol>`;
    displayText.innerHTML = `<strong>Inventory:</strong> <br>${inventoryList}`;
  }
}

//! ---------------------------- Debugging commands Section ------------------------------

// -------------------- Display information about current location -----------------------
function whereAmI() {
  let currentLocation = locationArray.indexOf(playerLocation);
  displayText.innerHTML = `playerLocation: ${playerLocation}`;
  if (locationArray[currentLocation]) {
    displayText.innerHTML = `locationArray[locationIndex].coordinate: ${locationArray[currentLocation].coordinate}`;
    displayText.innerHTML = `cL: ${cL}`;
  } else {
    displayText.innerHTML = `cL: ${cL}`;
  }
  //?    start();
}

// ------------------- Display Current Location Directional Information ------------------
function cLFunction() {
  displayText.innerHTML = `cL Array: ${cL}`;
  if (locationArray[locationIndex]) {
    displayText.innerHTML = locationArray[locationIndex];
  } else {
    displayText.innerHTML = `there is no information at locationArray, index ${i}`;
  }
  //?  start()
}
