const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const faker = require("faker");
let selectedWord = faker.random.word().toLowerCase();
let guessedLetters = { correctLetters: [] };
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
  io.emit("letters", { guessedLetters });
  socket.on("my other event", (data) => {
    guessedLetters.correctLetters = data.correctLetters;
    console.log("new letters?", guessedLetters.correctLetters, data);
  });
});
