import React, { useEffect } from "react";
import Word from "./Word";
import WrongLetters from "./WrongLetters";

export default function Board(props) {
  console.log(props.selectedWord);

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
        <WrongLetters wrongLetters={props.wrongLetters} />

        <div className="score-container">
          <div id="won">Won: </div>
          <div id="lost">Lost: </div>
        </div>
        <Word
          selectedWord={props.selectedWord}
          correctLetters={props.correctLetters}
        />
      </div>
      <div
        className={
          props.showSign ? "popup-container flex" : "popup-container none"
        }
        id="popup-container"
      >
        <div className="popup">
          <h2 id="final-message">
            {props.win ? "Congratulations! You won! 😃" : "Sorry, you lose. 😕"}
          </h2>
          <button id="play-button">Play again</button>
        </div>
      </div>
      <div
        className={
          props.show ? "notification-container show" : "notification-container"
        }
        id="notification-container"
      >
        <p>You have already enter this letter.</p>
      </div>
    </div>
  );
}
