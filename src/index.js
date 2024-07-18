require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.APP_PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello, World!");
});

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/users"));

const configureSocket = require("./routes/socket");
const server = configureSocket(app);

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

module.exports = server;
