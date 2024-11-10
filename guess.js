console.log(navigator.userAgent);
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
  );
}

// Check if the device is mobile and show alert if true
if (isMobileDevice()) {
  alert(
    "This game is designed for laptops and may not work properly on mobile devices."
  );
}
let gameName = "Guess The Word";
console.log();
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;

let footer = `${gameName} Game Created By Taim Jr`;

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

let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numOfHints = 2;
// Setting Game Options :
let increase = 2;
let wordToGuess = "";
let words = [
  "create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "Elzero",
  "School",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");
console.log(wordToGuess);
function generateInputs() {
  const inputsContainer = document.querySelector(".inputs");
  // Create Main Try Div :
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    inputsContainer.appendChild(tryDiv);
    if (i !== 1) {
      tryDiv.classList.add("disabled-inputs");
    }
    // Create Inputs :
    for (let j = 1; j <= numberOfLetters; j++) {
      let input = document.createElement("input");
      input.setAttribute("maxlength", "1");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      tryDiv.appendChild(input);
    }
  }
  inputsContainer.children[0].children[1].focus(); // choldren 1 cause 0 will get the span .
  let inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));
  // Convert Input Value To Upper Case :
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      // Move to next after Fill :
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      // console.log(currentIndex);
      if (event.key == "ArrowRight") {
        const nextInput = currentIndex + 1;
        // console.log(inputs);
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key == "ArrowLeft") {
        const perviousInput = currentIndex - 1;
        if (perviousInput >= 0) inputs[perviousInput].focus();
      }
    });
  });
}

const guessBtn = document.querySelector(".check");
guessBtn.addEventListener("click", handleGuesses);
function handleGuesses() {
  let successGuess = true;
  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];
    //Game Logic :
    // Letter Correct and In Place :
    if (letter == actualLetter && letter !== "") {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else if (wordToGuess.includes(letter)) {
      inputField.classList.add("no");
      successGuess = false;
    }
  }
  // Check If User Win Or Lose :
  if (successGuess) {
    messageArea.innerHTML = `Congrats You Win The Word Is <span>${wordToGuess}</span>`;
    // if (numOfHints === 2) {
    //   messageArea.innerHTML = `<p>Congrats You Didn't Use Hints</p>`;
    // }
    // Add Disabled Class On All Try Divs :

    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
    // Disable Guess Button :
    guessBtn.disabled = true;
    hintBtn.disabled = true;
  } else {
    let currentTryDiv = document.querySelector(`.try-${currentTry}`);
    currentTryDiv.classList.add("disabled-inputs");
    let currentTryDivInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryDivInputs.forEach((input) => (input.disabled = true));
    currentTryDiv.disabled = true;
    currentTry++;
    let nextDivInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextDivInputs.forEach((input) => (input.disabled = false));
    let nextDiv = document.querySelector(`.try-${currentTry}`);
    if (nextDiv) {
      nextDiv.classList.remove("disabled-inputs");
      nextDiv.children[1].focus();
    } else {
      // if All Tries Failed :
      messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
      // Disable Guess Button :
      guessBtn.disabled = true;
      hintBtn.disabled = true;
    }
  }
}
let hintBtn = document.querySelector(".Hint");
let hintsNumSpan = document.querySelector(".Hint span");
hintsNumSpan.innerHTML = numOfHints;
let WordLetter = [...wordToGuess];
hintBtn.addEventListener("click", giveHint);
function giveHint() {
  if (numOfHints > 0) {
    numOfHints--;
    hintsNumSpan.innerHTML = numOfHints;
    let enabledInputs = document.querySelectorAll("input:not([disabled])");
    const emptyenabledInputs = Array.from(enabledInputs).filter(
      (input) => input.value === ""
    );
    if (emptyenabledInputs.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyenabledInputs.length);
      const randomInput = emptyenabledInputs[randomIndex];
      const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
      console.log(indexToFill);
      if (indexToFill !== -1) {
        randomInput.value = wordToGuess[indexToFill].toUpperCase();
      }
    }
    // console.log(emptyenabledInputs);
  }
  if (numOfHints === 0) {
    hintBtn.disabled = true;
  }
}
// Handle BackSpace :
function handleBackSpace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    // console.log(currentIndex);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      let prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}
document.addEventListener("keydown", handleBackSpace);
window.onload = function () {
  generateInputs();
};

/*
    hintsNumSpan.innerHTML = numOfHints;

    let currTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    // console.log(WordLetter);
    let randomLetter =
      WordLetter[Math.floor(Math.random() * WordLetter.length)];

    let hintedInput = currTryInputs[wordToGuess.indexOf(randomLetter, index)];

    hintedInput.value = randomLetter;
    WordLetter[WordLetter.indexOf(randomLetter)] = "";
    WordLetter = WordLetter.filter((e) => e !== "");
    console.log(WordLetter);
  }
*/
