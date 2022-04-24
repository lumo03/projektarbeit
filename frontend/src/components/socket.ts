import React from "react";
import { io, Socket } from "socket.io-client";

const socket = io(/*"localhost:8000"*/ "192.168.178.104:8000", {
  transports: ["websocket", "polling"],
});

interface IGameState {
  socket: Socket;
  messages: string[];
  user: {
    isConnected: boolean;
    userId?: string;
    roomId?: string;
  };
}

export const gameState: IGameState = {
  socket: socket,
  messages: [],
  user: {
    isConnected: false,
    userId: undefined,
    roomId: undefined,
  },
};

export const GameContext = React.createContext(gameState);
