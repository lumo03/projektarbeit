const express = require("express");
const app = express();

const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: ["localhost:3000/", "192.168.178.104:3000/"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());
app.options("*", cors());

const rooms = [
  {
    id: "123456789",
    players: [],
    state: {},
    game: {
      started: false,
      ended: false,
      winner: null,
    },
  },
];
const state = {};

io.on("connection", (socket) => {
  console.log("a client connected");
  socket.on("create_room", (player) => createRoom(player));
  socket.on("join_room", (roomId, cb) => joinRoom(roomId, socket, cb));
  socket.on("get_room_id", (cb) => {
    console.log(`${socket.id} requested room id`);
    cb(socket.rooms[1] ?? null);
  });
});

io.on("disconnect", (socket) => {
  console.log("a client disconnected");
});

const createRoom = async (player) => {
  const room = {
    id: Math.random().toString(9),
    players: [player.id],
    state: {},
    game: {
      started: false,
      ended: false,
      winner: null,
    },
  };
  rooms.push(room);
  player.emit("created_room", room.id);
};

const joinRoom = (roomId, player, cb) => {
  const foundRoom = rooms.find((room) => room.id === roomId);
  console.log(`found room: ${foundRoom}`);
  if (foundRoom) {
    if (foundRoom.game.started == false && foundRoom.game.ended == false) {
      foundRoom.players?.push(player.id);
      player.join(foundRoom);
      console.log(player.id);
      io.emit("joined_room", {
        roomId: roomId,
        numbersOfPlayers: rooms[roomId]?.players?.length ?? 0,
      });
      console.log(`${player.id} joined room ${roomId}`);
      io.to(foundRoom).emit("player_joined", {
        playerId: player.id,
      });
      cb("Du bist dem Raum beigetreten.");
    } else {
      player.emit(
        "room_unavailable",
        "Es gab ein Fehler beim Betreten des Raums."
      );
      console.log(
        `${player.id} tried to join room ${roomId} but it was already started or ended.`
      );
      cb("Es gab ein Fehler beim Betreten des Raums.");
    }
  } else {
    player.emit("error_room", "Der Raum existiert nicht.");
    console.log(
      `${player.id} tried to join room ${roomId} but it does not exist.`
    );
    cb("Der Raum existiert nicht.");
  }
};

server.listen(8000);
