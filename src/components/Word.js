import React, { useEffect } from "react";

export default function Word(props) {
  return (
    <div className="word" id="word">
      {props.selectedWord.split("").map((letter, index) => {
        return (
          <div className="letter" key={index}>
            {props.correctLetters.includes(letter) ? letter : ""}
          </div>
        );
      })}
    </div>
  );
}
