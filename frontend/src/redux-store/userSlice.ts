import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* Adaption, Quelle: https://redux-toolkit.js.org/tutorials/typescript */

interface IFullName {
  first: string;
  last: string;
}

// Define a type for the slice state
interface IUserState {
  isSignedIn: boolean;
  name: IFullName;
  password: string;
}

// Define the initial state using that type
const initialState: IUserState = {
  isSignedIn: false,
  name: {
    first: "NO-USER",
    last: "NO-USER",
  },
  password: "NO-USER",
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<IUserState>) => {
      state.name = action.payload.name;
      state.password = action.payload.password;
      state.isSignedIn = true;
    },
    signOut: (state) => {
      state.name = initialState.name;
      state.password = initialState.password;
      state.isSignedIn = false;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export type { IUserState };

export default userSlice.reducer;
