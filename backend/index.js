const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
 });

io.on("connection", (socket) => {
  console.log("a client connected");
});

io.on("disconnect", (socket) => {
    console.log("a client disconnected");
});

httpServer.listen(8000);