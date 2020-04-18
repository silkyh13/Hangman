import React, { useEffect, Component } from "react";
import "../styles/App.css";
import Board from "./Board";
import io from "socket.io-client";
const chat = io.connect("http://localhost:3000");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWord: "",
      correctLetters: [],
      show: false,
    };
  }

  showNotification = () => {
    console.log(this.state.selectedWord);
    this.setState({
      show: true,
    });
    setTimeout(() => {
      this.setState({
        show: false,
      });
    }, 2000);
  };
  handleKeyPress = (e) => {
    // e.preventDefault();
    const keyCode = e.keyCode;
    if (keyCode >= 65 && keyCode <= 90) {
      const letter = e.key;
      let copy = this.state.correctLetters;
      if (this.state.selectedWord.includes(letter)) {
        if (!this.state.correctLetters.includes(letter)) {
          copy.push(letter);
          this.setState({
            correctLetters: copy,
          });
          this.addLetter();
          this.getLetters();
        } else {
          this.showNotification();
        }
      }
    }
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.handleKeyPress, false);
    this.handleNewGame();
  };
  //works
  handleNewGame = () => {
    chat.on("this", (data) => {
      this.setState({
        selectedWord: data.selectedWord,
      });
    });
  };

  getLetters = () => {
    chat.on("letters", (data) => {
      this.setState({
        correctLetters: data.guessedLetters.correctLetters,
      });
    });
  };
  addLetter = () => {
    chat.on("letters", (data) => {
      chat.emit("my other event", {
        correctLetters: this.state.correctLetters,
      });
    });
  };
  render() {
    return (
      <div>
        <Board
          selectedWord={this.state.selectedWord}
          correctLetters={this.state.correctLetters}
          show={this.state.show}
        />
      </div>
    );
  }
}

export default App;
