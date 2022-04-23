import { FC, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import Layout from "../../components/Layout";
import { GameContext, gameState } from "../../components/socket";
import ConnectionError from "./ConnectionError";
import Room from "./Room";
import TheGame from "./TheGame";

const Game: FC = () => {
  let { socket, messages, user } = useContext(GameContext);

  const addMessage = (message: string) => {
    messages.push(message);
    console.log(message);
  };

  useEffect(() => {
    socket = io(/*"localhost:8000"*/ "192.168.178.104:8000", {
    transports: ["websocket", "polling"], });

    socket.on("connect", () => {
        user.isConnected = true;
        addMessage("Verbindung aufgebaut.");
        console.log(user);
    });
    socket.on("connect_error", (err) => {
        user.isConnected = false;
      addMessage(`Verbindung zum Server fehlgeschlagen. Reason: ${err.message}`);
    });
    return () => {
      socket.disconnect();
      user.isConnected = false;
    };
  }, []);

  return (
    <Layout title="Spiel">
        <GameContext.Provider value={gameState}>
            <h1>Aktienspiel</h1>
            {!user.isConnected && <ConnectionError /> }
            {user.isConnected && !user.roomId && <Room /> }
            {user.isConnected && user.roomId && <TheGame />}
            {messages.map((message) => (
                <div key={Math.floor(Math.random() * 100)}>{message}</div>
            ))}
        </GameContext.Provider>
    </Layout>
  );
};

export default Game;