import React, { FC } from "react";
import { io, Socket } from "socket.io-client";

interface IProps {
  socket: Socket<any>;
}

const joinRoom: FC<IProps> = (props) => {
  return <div>Test</div>;
};

export default joinRoom;
