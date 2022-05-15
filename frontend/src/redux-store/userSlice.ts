import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* Adaption, Quelle: https://redux-toolkit.js.org/tutorials/typescript */

interface IFullName {
  first: string;
  last: string;
}

// Define a type for the slice state

interface IStock {
  id: string;
  name: string;
  price: number;
  amount: number;
  change: number;
}
interface IUserState {
  isSignedIn: boolean;
  id: string;
  name: IFullName;
  password: string;
  balance: number;
  stocks?: Array<IStock>;
}

// Define the initial state using that type
const initialState: IUserState = {
  isSignedIn: false,
  id: "",
  balance: -1,
  name: {
    first: "NO-USER",
    last: "NO-USER",
  },
  password: "NO-USER",
};

export const userSlice = createSlice({
  name: "game",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<IUserState>) => {
      state.name = action.payload.name;
      state.password = action.payload.password;
      state.stocks = action.payload.stocks;
      state.id = action.payload.id;
      state.isSignedIn = true;
    },
    signOut: (state) => {
      state.name = initialState.name;
      state.password = initialState.password;
      state.isSignedIn = false;
    },
    updateStocks: (state, action: PayloadAction<Array<IStock>>) => {
      state.stocks = action.payload;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export type { IUserState };

export default userSlice.reducer;
