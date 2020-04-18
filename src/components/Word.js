import React, { useEffect } from "react";

export default function Word(props) {
  console.log(props.word);
  return (
    <div className="word" id="word">
      {props.word.split("").map((letter, index) => {
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
