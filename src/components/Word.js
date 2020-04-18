import React, { useEffect } from "react";

export default function Word(props) {
  console.log(props.selectedWord, "correct letters :", props.correctLetters);
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

// wordEl.innerHTML = `${selectedWord
//   .split("")
//   .map(
//     (letter) =>
//       `<div class="letter">${
//         correctLetters.includes(letter) ? letter : ""
//       }</div>`
//   )
//   .join("")}`;
