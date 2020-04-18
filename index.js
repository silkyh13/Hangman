const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const faker = require("faker");
let word = faker.random.word().toLowerCase();
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
  io.emit("this", { word });
  // socket.emit("news", { hello: "print me" });
  socket.on("my other event", (data) => {
    console.log(data);
  });
});
