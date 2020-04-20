const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const randomWords = require("random-words");
let selectedWord = randomWords().toLowerCase();
let correctLetters = [];
let wrongLetters = [];
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
  io.emit("letters", { correctLetters });
  io.emit("wrong", { wrongLetters });
  socket.on("my word event", (data) => {
    // console.log(data.selectedWord);
    selectedWord = data.selectedWord;
  });
  socket.on("my other event", (data) => {
    correctLetters = data.correctLetters;
  });
  socket.on("my wrong event", (data) => {
    wrongLetters = data.wrongLetters;
  });
});
