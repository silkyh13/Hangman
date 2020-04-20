const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const randomWords = require("random-words");
let selectedWord = randomWords().toLowerCase();
let correctLetters = [];
let wrongLetters = [];
let win = false;
let showSign = false;
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const server = app.listen(port, () => {
  console.log(`listening on *:${port}`);
});

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  io.emit("this", { selectedWord });
  io.emit("correct", { correctLetters });
  io.emit("wrong", { wrongLetters });
  io.emit("result", { win, showSign });
  //sends updated word
  socket.on("my word event", (data) => {
    selectedWord = data.selectedWord;
    io.emit("this", { selectedWord });
  });

  socket.on("my other event", (data) => {
    correctLetters = data.correctLetters;
    io.emit("correct", { correctLetters });
  });

  socket.on("my wrong event", (data) => {
    wrongLetters = data.wrongLetters;
    io.emit("wrong", { wrongLetters });
  });
  socket.on("my victory event", (data) => {
    win = data.win;
    showSign = data.showSign;
    io.emit("result", { win, showSign });
  });
});
