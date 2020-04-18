import React, { useEffect, Component } from "react";
import "../styles/App.css";
import Board from "./Board";
import io from "socket.io-client";
const chat = io.connect("http://localhost:3000");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      correctLetters: ["a", "e", "i"],
    };
  }
  componentDidMount = () => {
    chat.on("this", (data) => {
      this.setState({
        word: data.word,
      });
    });
  };
  render() {
    return (
      <div>
        <Board
          word={this.state.word}
          correctLetters={this.state.correctLetters}
        />
      </div>
    );
  }
}

export default App;
