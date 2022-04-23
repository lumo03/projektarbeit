import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";

/* Adaption, Quelle: https://redux-toolkit.js.org/tutorials/typescript */

// Define a type for the slice state
interface IGameState {
  socket: Socket;
  user: {
    isConnected: boolean;
    userId?: string;
    roomId?: string;
  }
}

// Define the initial state using that type
const initialState: IGameState = {
  socket: io(/*"localhost:8000"*/ "192.168.178.104:8000", {
    transports: ["websocket", "polling"],
  }),
  user: {
    isConnected: false
  }
};

interface IEmit {
  event: string;
  data: any;
  callback?: () => void;
}

interface IOn {
  event: string;
  callback: (data: any) => void;
}

export const gameSlice = createSlice({
  name: "game",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    emit: (state, action: PayloadAction<IEmit>) => {
      state.socket.emit(action.payload.event, action.payload.data, action.payload.callback)
    },
    on: (state, action: PayloadAction<IOn>) => {
      state.socket.on(action.payload.event, action.payload.callback)
    },
  }
});

export const { emit, on } = gameSlice.actions;

export type { IGameState };

export default gameSlice.reducer;
