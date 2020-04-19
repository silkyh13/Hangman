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
      show: false,
      dict: {},
      win: false,
      showSign: false,
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
      let badCopy = this.state.wrongLetters;
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
      } else {
        if (!this.state.wrongLetters.includes(letter)) {
          badCopy.push(letter);
          this.setState({
            wrongLetters: badCopy,
          });
          this.addBadLetter();
          this.getBadLetters();
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
    chat.on("letters", (data) => {
      this.setState({
        correctLetters: data.correctLetters,
      });
    });
  };
  addLetter = () => {
    chat.on("letters", (data) => {
      chat.emit("my other event", {
        correctLetters: this.state.correctLetters,
      });
    });
    let correctLetters = this.state.correctLetters;
    if (correctLetters.length === Object.keys(this.state.dict).length) {
      this.setState({
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
    chat.on("wrong", (data) => {
      chat.emit("my wrong event", {
        wrongLetters: this.state.wrongLetters,
      });
    });
    let wrongLetters = this.state.wrongLetters;
    if (wrongLetters.length >= Object.keys(this.state.dict).length) {
      this.setState({
        win: false,
        showSign: true,
      });
      console.log("lost");
    }
  };
  resetWord = () => {
    let newWord = randomWords().toLowerCase();
    console.log(newWord);
    chat.on("this", (data) => {
      chat.emit("my word event", {
        selectedWord: newWord,
      });
    });
  };
  render() {
    return (
      <div>
        <Board
          showSign={this.state.showSign}
          win={this.state.win}
          selectedWord={this.state.selectedWord}
          correctLetters={this.state.correctLetters}
          show={this.state.show}
          wrongLetters={this.state.wrongLetters}
        />
      </div>
    );
  }
}

export default App;
