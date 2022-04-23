import { FC, useEffect, useState } from "react";
import { Button, Form } from "react-bulma-components";
import { io, Socket } from "socket.io-client";
import Layout from "../components/Layout";
import SocketCV from "../components/socket";

const Game: FC = () => {
  const socketC = new SocketCV();
  const [connected, setConnected] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [messages, setMessages] = useState([""]);
  const [socket, setSocket] = useState<Socket>();

  const addMessage = (message: string) => {
    setMessages((messages) => [...messages, message]);
    console.log(messages);
  };

  useEffect(() => {
    const s = io(/*"localhost:8000"*/ "192.168.178.104:8000", {
      transports: ["websocket", "polling"],
    });
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.on("connect", () => {
      setConnected(true);
    });
    socket.on("joined_room", (data) => {
      console.log(`playerId: ${data.playerId}`);
      console.log(`socketId: ${socketC.getId()}`);
      if (data.playerId === socketC.getSocket().id) {
        console.log(
          `joined room ${data.roomId} with ${data.numberOfPlayers} players`
        );
        setRoomId(data.roomId);
        addMessage(`Du bist dem Raum ${data.roomId} beigetreten.`);
      }
    });

    socketC.on("player_joined", (data) => {
      console.log(`player ${data.playerId} joined room ${data.roomId}`);
      addMessage(
        `Spieler ${data.playerId} ist dem Raum ${data.roomId} beigetreten.`
      );
    });

    socketC.on("disconnect", () => {
      console.log("disconnected from socket");
      setConnected(false);
    });
  }, [socket]);

  useEffect(() => {
    console.log(
      "There is no connection to the backend. Please check your internet connection."
    );
    console.log("Trying to reconnect...");
    if (!connected) {
      setTimeout(() => {
        socketC.connect();
      }, 10000);
    }
  }, [connected]);

  return (
    <Layout title="Spiel">
      <h1>Spiel{roomId}</h1>
      {!connected && (
        <>
          <h3>Oops, irgendwas stimmt hier nicht :( </h3>
          <p>
            Entweder ist der Server gerade nicht aktiv oder es gibt ein Problem
            mit der Internetverbindung.
          </p>
          <p>Versuche es später erneut.</p>
        </>
      )}
      {connected && roomId.trim() === "" && (
        <>
          <h3>Willkommen beim Spiel</h3>
          <p>Bitte gib einen Raum ein, um mit dem Spiel zu beginnen.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (socket == null) return;
              socket.emit("join_room", gameCode, (msg: string) => {
                setConnected(true);
                addMessage(msg);
                setRoomId(socketC.getRoom());
              });
            }}
          >
            <Form.Field>
              <Form.Control>
                <Form.Label>Raum</Form.Label>
                <Form.Input onChange={(e) => setGameCode(e.target.value)} />
              </Form.Control>
            </Form.Field>
            <Button type="submit">Raum betreten</Button>
          </form>
        </>
      )}
      {connected && roomId.trim() !== "" && (
        <>
          <h3>Willkommen beim Spiel</h3>
          <p>Du bist im Raum {roomId}</p>
          <p>Warte auf andere Spieler...</p>
          {messages.map((message) => (
            <div key={Math.floor(Math.random() * 100)}>{message}</div>
          ))}
        </>
      )}
    </Layout>
  );
};

export default Game;
