const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
