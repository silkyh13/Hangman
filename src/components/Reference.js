import React, { useEffect, Component } from "react";
import "../styles/App.css";
const faker = require("faker");
var socket = io();

let wordEl,
  wrongLettersEl,
  playAgainBtn,
  popup,
  notification,
  finalMessage,
  figureParts,
  lost,
  won;
let win = 0;
let lose = 0;
const correctLetters = [];
const wrongLetters = [];
let selectedWord = faker.random.word().toLowerCase();
console.log(selectedWord);

function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) =>
        `<div class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</div>`
    )
    .join("")}`;
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    win++;
    finalMessage.innerText = "Congratulations! You won! 😃";
    won.innerText = `Won: ${win}`;
    popup.style.display = "flex";
  }
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}
function updateWrongLettersEl() {
  let incorrect = wrongLetters.length;
  wrongLettersEl.innerHTML = `${incorrect > 0 ? "<p>Wrong Letters</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`).join("")}
  `;
  //Display parts
  figureParts.forEach((part, index) => {
    if (index < incorrect) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  if (wrongLetters.length === figureParts.length) {
    lose++;
    finalMessage.innerText = "Sorry, you lose. 😕";
    lost.innerText = `Lost: ${lose}`;
    popup.style.display = "flex";
  }
}
const Board = () => {
  const ref = React.useRef(null);
  const display = function () {
    React.useEffect(() => {
      wordEl = document.getElementById("word");
      wrongLettersEl = document.getElementById("wrong-letters");
      playAgainBtn = document.getElementById("play-button");
      finalMessage = document.getElementById("final-message");
      popup = document.getElementById("popup-container");
      notification = document.getElementById("notification-container");
      figureParts = document.querySelectorAll(".figure-part");
      lost = document.getElementById("lost");
      won = document.getElementById("won");
      displayWord();
      //reset board when u either lose or win
      playAgainBtn.addEventListener("click", () => {
        correctLetters.splice(0);
        wrongLetters.splice(0);
        selectedWord = faker.random.word().toLowerCase();
        displayWord();
        updateWrongLettersEl();
        popup.style.display = "none";
      });
    });
  };

  display();

  return (
    <div>
      <h1>Hangman</h1>
      <p>Find the hiden word - Enter a letter</p>
      <div className="game-container">
        <svg height="300" width="200" className="figure-container">
          <line x1="60" y1="20" x2="150" y2="20" />
          <line x1="150" y1="20" x2="150" y2="50" />
          <line x1="60" y1="20" x2="60" y2="280" />
          <line x1="20" y1="280" x2="100" y2="280" />
          <circle cx="150" cy="70" r="20" className="figure-part" />
          <line x1="150" y1="90" x2="150" y2="150" className="figure-part" />
          <line x1="150" y1="120" x2="130" y2="100" className="figure-part" />
          <line x1="150" y1="120" x2="170" y2="100" className="figure-part" />
          <line x1="170" y1="180" x2="150" y2="150" className="figure-part" />
          <line x1="130" y1="180" x2="150" y2="150" className="figure-part" />
        </svg>
        <div className="wrong-letters-container">
          <div id="wrong-letters"></div>
        </div>
        <div className="score-container">
          <div id="won">Won: {win}</div>
          <div id="lost">Lost: {lose}</div>
        </div>
        <div className="word" id="word"></div>
      </div>
      <div className="popup-container" id="popup-container">
        <div className="popup">
          <h2 id="final-message"></h2>
          <button id="play-button">Play again</button>
        </div>
      </div>
      <div className="notification-container" id="notification-container">
        <p>You have already enter this letter.</p>
      </div>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  handleKeyPress = (e) => {
    const keyCode = e.keyCode;
    if (keyCode >= 65 && keyCode <= 90) {
      const letter = e.key;
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}

export default App;
