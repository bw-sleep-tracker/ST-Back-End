const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const authRouter = require("../routers/UserAuthRouter");
const userRouter = require("../routers/UserRouter");
const trackerRouter = require("../routers/TrackerRouter");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get("/", async (req, res) => {
  res.sendStatus(200).json({ message: "The sleep tracker api is up!" });
});

server.use("/", authRouter);
server.use("/user", userRouter);
server.use("/tracker", trackerRouter);
module.exports = server;
