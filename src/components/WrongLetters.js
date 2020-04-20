import React, { useEffect } from "react";

export default function WrongLetters(props) {
  let incorrect = props.wrongLetters;
  return (
    <div className="wrong-letters-container">
      <div id="wrong-letters">
        {incorrect > 0 ? <p>Wrong Letters</p> : null}
        {props.wrongLetters.map((letter, index) => {
          return <span key={index}>{letter}</span>;
        })}
      </div>
    </div>
  );
}
