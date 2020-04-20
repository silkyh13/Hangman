import React, { useEffect } from "react";
import Word from "./Word";
import Popup from "./Popup";
import WrongLetters from "./WrongLetters";
import parts from "./parts";

export default function Board(props) {
  console.log(props.selectedWord, "hehe", props.wrongLetters);

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
          <circle
            cx="150"
            cy="70"
            r="20"
            className={`figure-part ${
              props.wrongLetters.length > 0 ? "block" : "none"
            }`}
          />
          {props.wrongLetters.slice(1).map((part, index) => {
            let key = parts[index];
            return (
              <line
                key={index}
                x1={key.x1.toString()}
                y1={key.y1.toString()}
                x2={key.x2.toString()}
                y2={key.y2.toString()}
                className="figure-part block"
              />
            );
          })}
        </svg>
        <WrongLetters wrongLetters={props.wrongLetters} />

        <Word
          selectedWord={props.selectedWord}
          correctLetters={props.correctLetters}
        />
      </div>
      <Popup
        selectedWord={props.selectedWord}
        resetBoard={props.resetBoard}
        showSign={props.showSign}
        win={props.win}
      />

      <div
        className={
          props.notify
            ? "notification-container show"
            : "notification-container"
        }
        id="notification-container"
      >
        <p>You have already enter this letter.</p>
      </div>
    </div>
  );
}
