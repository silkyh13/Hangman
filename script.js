const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters"); // <span>a,b,c,d</span>
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
// head, arms,legs
const figureParts = document.querySelectorAll(".figure-part");

const words = ["hangman", "quarantine", "ephipany", "mukbang"];

let selectedWord = words[Math.floor(Math.random() * words.length)]; //one random word

const correctLetters = [];
const wrongLetters = [];

//show the letters of the word that are correct
function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      letter =>
        `<div class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</div>`
    )
    .join("")}`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  console.log(wordEl.innerText, innerWord);

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";
  }
}

// Show notification already enter this letter
function showNotification() {
  //add another name to class of div
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//add wrong letter to div
function updateWrongLettersEl() {
  let incorrect = wrongLetters.length;
  // Display wrong letters
  wrongLettersEl.innerHTML = `${incorrect > 0 ? "<p>Wrong Letters</p>" : ""}
  ${wrongLetters.map(letter => `<span>${letter}</span>`).join("")}
  `;
  //Display parts
  figureParts.forEach((part, index) => {
    if (index < incorrect) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
}

//Adding keys to correctLetters and wrongLetters
//add listener on key last pressed
window.addEventListener("keydown", e => {
  //want keyCode so can check if it is within range of letters
  const keyCode = e.keyCode;
  if (keyCode >= 65 && keyCode <= 90) {
    const letter = e.key;
    //check if the letter it representsis in the word
    if (selectedWord.includes(letter)) {
      //check if the letter is in correctLetter
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        //already enter this letter
        showNotification();
      }
    } else {
      //if wrongLetters does not have letter
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      }
      //already has wrong letter
      showNotification();
    }
  }
});
displayWord();
