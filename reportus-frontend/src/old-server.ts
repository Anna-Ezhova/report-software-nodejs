import express from "express";

import { nextApp, nextHandler } from "./next.utils";

import { createServer } from "node:http";
//import socket from "./socket";
import { SocketRouter } from "./routes/socketRouter";
import { Server } from "socket.io";
// const nextBuild = require('next/dist/build');

const { default: nextBuild } = require("next/dist/build");
import path from "node:path";
import { alarmExport } from "./routes/exportAlarms";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
// socket.connect(server);

//socket router

const socketRouter = SocketRouter(io);
const exportRouter = alarmExport();

app.use("/api/v1", socketRouter);
app.use("/api/v1", exportRouter);

const PORT = Number(process.env.PORT) || 3001;

app.use(express.json()); // for parsing application/json

//@ts-expect-error
app.post("/msg", (req, res, next) => {
  const message = req.body.message;
  res.json({ receivedMessage: message });
});

const start = async () => {
  //@ts-expect-error
  app.use((req, res) => nextHandler(req, res));

  if (process.env.NEXT_BUILD) {
    io.on("connection", (socket) => {
      console.log(socket.id);
    });

    app.listen(PORT, async () => {
      await nextBuild(path.join(__dirname, "../"));
      process.exit();
    });
    return;
  }

  nextApp.prepare().then(() => {
    console.log(`Reportus starting at ${PORT}`);

    server.listen(PORT, () => {});
  });
};

start();
