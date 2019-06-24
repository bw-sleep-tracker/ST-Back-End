const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const authRouter = require("../routers/UserAuthRouter");
const userRouter = require("../routers/UserRouter");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/", async (req, res) => {
  res.sendStatus(200).json({ message: "The sleep tracker api is up!" });
});

server.use("/", authRouter);
server.use("/user", userRouter);
module.exports = server;
