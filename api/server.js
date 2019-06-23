const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const authRouter = require("../routes/user-auth");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/", async (req, res) => {
  res.sendStatus(200).json({ message: "The sleep tracker api is up!" });
});

server.use("/", authRouter);
module.exports = server;
