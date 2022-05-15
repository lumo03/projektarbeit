const express = require("express");
const app = express();

const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const fs = require("fs");

const io = socketio(server, {
  cors: {
    origin: ["localhost:3000/", "192.168.178.104:3000/"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = [
  {
    id: "13k4m343i34",
    firstName: "Max",
    lastName: "Mustermann",
    password: "12345",
    balance: 100,
    stocks: [
      {
        id: "1",
        name: "Apple",
        price: 100,
        amount: 10,
      },
      {
        id: "2",
        name: "Google",
        price: 200,
        amount: 20,
      },
    ],
  },
];

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

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

app.post("/login", (req, res) => {
  let user = users.filter(
    (user) =>
      user.name == req.body.firstName && user.password == req.body.password
  );
  user = user[0];
  if (user) {
    res.send(user);
  } else {
    res
      .status(404)
      .send("Entweder ist dein Vorname oder dein Passwort falsch.");
  }
});

server.listen(8000);
