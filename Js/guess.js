let gameName = "Guess The Word";
document.querySelector("h1").innerHTML = gameName;
document.title = gameName;
// Start Footer Style :
let footer = `Created By Taim Jr`;

footer.split("").forEach(function (letter) {
  if (letter === " ") {
    let span = document.createElement("span");
    span.classList.add("no-under-score");
    span.textContent = letter;
    document.querySelector("footer").appendChild(span);
  } else {
    let span = document.createElement("span");
    span.textContent = letter;
    document.querySelector("footer").appendChild(span);
  }
});

// End Footer Style .
let inputs = document.querySelector(".inputs");
let words = [
  "create",
  "update",
  "delete",
  "school",
  "castle",
  "island",
  "forest",
  "flower",
  "spring",
  "bridge",
  "summer",
  "planet",
  "charge",
  "bright",
  "people",
  "silver",
  "animal",
  "winter",
  "friend",
  "bucket",
  "sunset",
  "copper",
  "golden",
  "market",
  "beacon",
  "temple",
  "garden",
  "filter",
  "rocket",
  "sprint",
  "screen",
];
let wordToGuess = words[Math.floor(Math.random() * words.length)];
let currentTry = 1;
let numberOfTries = 5;
let numberOfLetters = 6;
let numOfHints = 2;
function generateInputs() {
  for (let i = 1; i <= numberOfTries; i++) {
    let tryDiv = document.createElement("div");
    tryDiv.classList.add(`Try-${i}`);
    let spanDiv = document.createElement("span");
    spanDiv.textContent = `Try ${i}`;
    tryDiv.appendChild(spanDiv);
    inputs.appendChild(tryDiv);
    if (i !== 1) {
      tryDiv.classList.add(`disabled-Inputs`);
    }
    for (let j = 1; j <= numberOfLetters; j++) {
      let tryDivInput = document.createElement("input");
      tryDivInput.type = "text";
      tryDivInput.setAttribute("maxlength", "1");
      // tryDivInput.disabled = true;
      tryDivInput.id = `try-${i}-letter-${j}`;
      tryDiv.appendChild(tryDivInput);
    }
  }

  // inputs.children[0].children[1].focus();
  let disabledInputs = document.querySelectorAll(".disabled-Inputs input");
  // console.log(Array.from(disabledInputs));
  disabledInputs.forEach((input) => (input.disabled = true));
  // Convert Input Value To UpperCase :
  let divinputs = document.querySelectorAll("input");
  divinputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase(); // I user Input i could use this
      if (divinputs[index + 1]) divinputs[index + 1].focus(); // I forgot the if in here .
    });
    input.addEventListener("keydown", function (event) {
      // console.log(event);
      const currentIndex = Array.from(divinputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        let nexIndex = currentIndex + 1;
        let nextInput = divinputs[nexIndex];
        if (nextInput) {
          nextInput.focus();
        }
      }
      if (event.key === "ArrowLeft") {
        let pervIndex = currentIndex - 1;
        let pervInput = divinputs[pervIndex];
        if (pervInput) {
          pervInput.focus();
        }
      }
    });
  });
  // console.log(divinputs);
}
let checkBtn = document.querySelector(".check");
let hintBtn = document.querySelector(".hints");
function handleGuess() {
  let successGuess = true;
  for (let i = 1; i <= numberOfLetters; i++) {
    let letter = wordToGuess[i - 1].toLowerCase();
    let input = document.querySelector(`#try-${currentTry}-letter-${i}`);
    let inputVal = input.value.toLowerCase();
    if (inputVal === letter && inputVal !== "") {
      input.classList.add("in-place");
    } else if (wordToGuess.includes(inputVal) && inputVal !== "") {
      input.classList.add("not-in-place");
      successGuess = false;
    } else {
      input.classList.add("wrong");
      successGuess = false;
    }
  }
  let Message = document.querySelector(".message");
  // let messageSpan = document.querySelector(".message span");
  if (successGuess) {
    Message.innerHTML = `Congrats You Win The Word Is : <span>${wordToGuess.toUpperCase()}</span>`;
    let allTries = document.querySelectorAll(".inputs > div");
    // console.log(allTries);
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-Inputs"));
    // cureentDiv.classList.add("disabled-Inputs");
    // let currentDivInputs = document.querySelectorAll(
    //   `.Try-${currentTry} input`
    // );
    // currentDivInputs.forEach((input) => (input.disabled = true));
    // console.log(checkBtn);
    checkBtn.disabled = true;
    hintBtn.disabled = true;
    document.querySelector(".menu-shape").classList.add("disabled-menu");
    document.querySelector(".menu-shape").disabled = true;
  } else {
    let currentTryDiv = document.querySelector(`.Try-${currentTry}`);
    currentTryDiv.classList.add("disabled-Inputs");
    let tryDivInputs = document.querySelectorAll(`.Try-${currentTry} input`);
    tryDivInputs.forEach((input) => (input.disabled = true));
    currentTry++;
    let nextTryDiv = document.querySelector(`.Try-${currentTry}`);
    if (nextTryDiv) {
      nextTryDiv.classList.remove("disabled-Inputs");
      let nexttryDivInputs = document.querySelectorAll(
        `.Try-${currentTry} input`
      );
      nexttryDivInputs.forEach((input) => (input.disabled = false));
    } else {
      // if All Tries Failed :
      Message.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
      // Disable Buttons :
      checkBtn.disabled = true;
      hintBtn.disabled = true;
      document.querySelector(".menu-shape").classList.add("disabled-menu");
    }
  }
}
// Mange Hints :
document.querySelector(".hints span").innerHTML = numOfHints;
function handletHints() {
  if (numOfHints > 0) {
    numOfHints--;
    document.querySelector(".hints span").innerHTML = numOfHints;
    let enabledInputs = document.querySelectorAll("input:not([disabled])");
    // console.log(enabledInputs);
    let emptyenabledInputs = Array.from(enabledInputs).filter(
      (input) => input.value === ""
    );
    // console.log(emptyenabledInputs);
    if (emptyenabledInputs.length > 0) {
      let randomIndex = Math.floor(Math.random() * emptyenabledInputs.length);
      // console.log(randomIndex);
      let randomInput = emptyenabledInputs[randomIndex]; // detect the rmpty so if it 5 in enabled it will be 0 in enabled and detect only the empty one
      // console.log(randomInput);
      let indexToFill = Array.from(enabledInputs).indexOf(randomInput);
      // console.log(indexToFill);
      if (indexToFill !== -1) {
        randomInput.value = wordToGuess[indexToFill].toUpperCase();
      }
    } else {
      document.querySelector(".hints span").innerHTML = numOfHints + 1;
      numOfHints++;
      let popMessage = document.createElement("div");
      popMessage.innerHTML =
        "<p>the Inputs Fields are already Fill make some space to use Hints</p>";
      hintBtn.appendChild(popMessage);
      // Set a timeout to remove the message after 3 seconds

      setTimeout(() => {
        popMessage.remove();
      }, 3000); // Duration matches the fade-out transition
    }
  }
  if (numOfHints === 0) {
    hintBtn.disabled = true;
  }
}
hintBtn.addEventListener("click", handletHints);
// End Hints .
// Handle Back Space :
function handleBackSpace(event) {
  if (event.key == "Backspace") {
    let inputs = document.querySelectorAll("input:not([disabled])");
    let currentInput = event.target;
    console.log(event.key);
    let pervInput = inputs[Array.from(inputs).indexOf(currentInput) - 1];
    if (pervInput) {
      currentInput.value = "";
      pervInput.value = "";
      pervInput.focus();
    }
  }
}
document.addEventListener("keydown", handleBackSpace);
// End Back Space Handling .
checkBtn.addEventListener("click", handleGuess);

window.onload = function () {
  generateInputs();
};
// console.log(wordToGuess);
/*
  Things i Forget : 
 If(i !== 1){
  add disable class
}
  and css : pointer-events: none;
*/
// handle Toggle Menu :
let menuBtn = document.querySelector(".menu-shape");
let gameDifcBtn = document.querySelector(".menu ul .gameD");

function handleMenu() {
  menuBtn.classList.toggle("clicked");
  let menu = document.querySelector(".menu ul");
  if (menuBtn.classList.contains("clicked")) {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}
let menu = document.querySelector(".menu ul");
document.addEventListener("click", function (event) {
  if (menuBtn.classList.contains("clicked")) {
    if (
      event.target !== menu &&
      event.target !== menuBtn &&
      event.target !== gameDifcBtn
    ) {
      menu.style.display = "none";
      menuBtn.classList.remove("clicked");
    }
  }
});

// End Toggle Menu .
// Handle Difficulty Btn .
function handleDifcBtn(event) {
  event.target.classList.toggle("clicked");
  DifBtnArrow = gameDifcBtn.children[0];
  let btns = document.querySelector(".buttons");
  DifBtnArrow.style.borderColor = "black transparent transparent  transparent";
  if (event.target.classList.contains("clicked")) {
    DifBtnArrow.style.borderColor =
      "black transparent transparent  transparent";

    btns.style.display = "flex";
  } else {
    DifBtnArrow.style.borderColor =
      " transparent  transparent  transparent black";
    btns.style.display = "none";
  }
}
// Handle Difficulty Btn End .
// Handling Difficulty Levels :

gameDifcBtn.addEventListener("click", handleDifcBtn);
menuBtn.addEventListener("click", handleMenu);
// Handling difficulty Levels :
let easyBtn = document.querySelector(".easy");
let normalBtn = document.querySelector(".normal");
let hardBtn = document.querySelector(".hard");

// Hard State :
hardBtn.addEventListener("click", handleHard);
function handleHard() {
  numberOfTries = 3;
  inputs.innerHTML = "";
  generateInputs();
  numOfHints = 1;
  document.querySelector(".hints span").innerHTML = numOfHints;
}
// Normal State :
normalBtn.addEventListener("click", handleNormal);
function handleNormal() {
  numberOfTries = 5;
  inputs.innerHTML = "";
  generateInputs();
  numOfHints = 2;
  document.querySelector(".hints span").innerHTML = numOfHints;
}
// Easy State :
easyBtn.addEventListener("click", handleEasy);
function handleEasy() {
  numberOfTries = 7;
  inputs.innerHTML = "";
  generateInputs();
  numOfHints = 3;
  document.querySelector(".hints span").innerHTML = numOfHints;
}

// Handle Dark Mode :
darkModeArea = document.querySelector(".dark-mode");
darkModeSpan = document.querySelector(".dark-mode span");

darkModeArea.addEventListener("click", handleDarkMode);
function handleDarkMode() {
  // darkModeSpan.style.left = "0";
  if (!document.querySelector(".active-dark")) {
    darkModeSpan.style.left = "35px";
    darkModeSpan.style.backgroundColor = "white";
    darkModeArea.style.cssText =
      "    box-shadow: 1px 1px 15px #333 ; ; border-color : #333 ; background-color : #333";

    // body change :
    document.body.style.cssText = "background-color : black ; color: white";
    document.querySelector("h1").style.color = "var(--primary-color)";
    document
      .querySelectorAll(".ketText")
      .forEach((key) => (key.style.color = "black"));
    // document.querySelector(".message span").style.cssText =
    //   "color :white !important;";
    darkModeArea.classList.add("active-dark");
  } else {
    console.log(1);
    darkModeSpan.style.left = "5px";
    darkModeSpan.style.backgroundColor = "#e46713";
    darkModeArea.style.cssText =
      "box-shadow: 1px 1px 15px #e46713 ; ; border-color : #e46713 ; background-color : #ddd";
    // body change :
    document.body.style.cssText = "background-color : #eee ; color: black";
    document.querySelector("h1").style.color = "black";
    document;
    // .querySelectorAll(".ketText")
    // .forEach((key) => (key.style.color = "black"));
    darkModeArea.classList.remove("active-dark");
  }
}
