import { FC, useContext, useState } from "react";
import { Button, Form } from "react-bulma-components";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { GameContext } from "../../components/socket";
import { emit } from "../../redux-store/gameSlide";

const Room: FC = () => {
    const { socket, messages, user } = useContext(GameContext);
    const [gameCode, setGameCode] = useState("");
  return (
    <>
      <h3>Willkommen beim Spiel</h3>
      <p>Bitte gib einen Raum ein, um mit dem Spiel zu beginnen.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (socket == null) return;
          socket.emit("join_room", gameCode, (msg: string) => {
            user.isConnected = true;
            messages.push(msg);
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
  );
};

export default Room;
