const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/", async (req, res) => {
  res.status(200).json({ message: "The sleep tracker api is up!" });
});
module.exports = server;
