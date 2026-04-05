import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import path from "node:path";

import { nextApp, nextHandler } from "./next.utils";
import { SocketRouter } from "./routes/socketRouter";
import { alarmExport } from "./routes/exportAlarms";

const { default: nextBuild } = require("next/dist/build");

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const socketRouter = SocketRouter(io);
const exportRouter = alarmExport();

const PORT = Number(process.env.PORT) || 3001;

// Middleware
app.use(express.json());


const start = async () => {
  if (process.env.NEXT_BUILD) {
    //  nur Build, kein Serverstart
    await nextBuild(path.join(__dirname, "../"));
    process.exit(0);
  }

  //  Normaler Serverstart
  await nextApp.prepare();

  // Socket.IO
  io.on("connection", (socket) => {
    console.log("socket connected:", socket.id);
  });

  // API-Routen
  app.use("/api/v1", socketRouter);
  app.use("/api/v1", exportRouter);

  // ganz wichtig: Next-Handler für alle anderen Routen
  //@ts-expect-error
  app.all("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(PORT, () => {
    console.log(`Reportus running at http://localhost:${PORT}`);
  });
};

start();