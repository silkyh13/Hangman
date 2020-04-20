import React, { useEffect, Component } from "react";
import "../styles/App.css";
import Board from "./Board";
import io from "socket.io-client";
const chat = io.connect("http://localhost:3000");
const randomWords = require("random-words");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedWord: "",
      correctLetters: [],
      wrongLetters: [],
      notify: false,
      dict: {},
      win: false,
      showSign: false,
    };
  }

  showNotification = () => {
    this.setState({
      notify: true,
    });
    setTimeout(() => {
      this.setState({
        notify: false,
      });
    }, 2000);
  };
  handleKeyPress = (e) => {
    // e.preventDefault();
    const keyCode = e.keyCode;
    if (keyCode >= 65 && keyCode <= 90) {
      const letter = e.key;
      let copy = this.state.correctLetters;
      let badCopy = this.state.wrongLetters;
      if (this.state.selectedWord.includes(letter)) {
        if (!this.state.correctLetters.includes(letter)) {
          if (!this.state.showSign) {
            copy.push(letter);
            this.setState({
              correctLetters: copy,
            });
            this.addLetter();
          }
        } else {
          this.showNotification();
        }
      } else {
        if (!this.state.wrongLetters.includes(letter)) {
          if (this.state.wrongLetters.length < 6) {
            badCopy.push(letter);
            this.setState({
              wrongLetters: badCopy,
            });
            this.addBadLetter();
          }
        } else {
          this.showNotification();
        }
      }
    }
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.handleKeyPress, false);
    this.handleNewGame();
    this.getBadLetters();
    this.getLetters();
    this.getVictory();
  };
  resetBoard = () => {
    let selectedWord = randomWords().toLowerCase();
    //send new word
    chat.emit("my word event", {
      selectedWord: selectedWord,
    });
    //send new state show sign
    chat.emit("my victory event", {
      win: true,
      showSign: false,
    });
    chat.emit("my other event", {
      correctLetters: [],
    });
    chat.emit("my wrong event", {
      wrongLetters: [],
    });
  };
  getVictory = () => {
    chat.on("result", (data) => {
      this.setState({
        win: data.win,
        showSign: data.showSign,
      });
    });
  };
  //works
  handleNewGame = () => {
    chat.on("this", (data) => {
      let obj = {};
      for (let i = 0; i < data.selectedWord.length; i++) {
        let key = data.selectedWord[i];
        if (obj[key] == undefined) {
          obj[key] = 1;
        }
      }
      this.setState({
        selectedWord: data.selectedWord,
        dict: obj,
      });
    });
  };
  getLetters = () => {
    chat.on("correct", (data) => {
      this.setState({
        correctLetters: data.correctLetters,
      });
    });
  };
  addLetter = () => {
    chat.emit("my other event", {
      correctLetters: this.state.correctLetters,
    });
    this.getLetters();
    let correctLetters = this.state.correctLetters;
    if (correctLetters.length === Object.keys(this.state.dict).length) {
      chat.emit("my victory event", {
        win: true,
        showSign: true,
      });
    }
  };

  getBadLetters = () => {
    chat.on("wrong", (data) => {
      this.setState({
        wrongLetters: data.wrongLetters,
      });
    });
  };
  addBadLetter = () => {
    chat.emit("my wrong event", {
      wrongLetters: this.state.wrongLetters,
    });
    let wrongLetters = this.state.wrongLetters;
    if (wrongLetters.length >= 6) {
      chat.emit("my victory event", {
        win: false,
        showSign: true,
      });
    }
  };

  render() {
    return (
      <div>
        <Board
          resetBoard={this.resetBoard}
          showSign={this.state.showSign}
          win={this.state.win}
          selectedWord={this.state.selectedWord}
          correctLetters={this.state.correctLetters}
          notify={this.state.notify}
          wrongLetters={this.state.wrongLetters}
        />
      </div>
    );
  }
}

export default App;
