import React, { useEffect } from "react";

export default function Popup(props) {
  return (
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
  );
}
