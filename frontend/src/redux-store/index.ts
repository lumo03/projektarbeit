import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlide";
import userSlice from "./userSlice";

/* Adaption, Quelle: https://redux-toolkit.js.org/tutorials/typescript */

const store = configureStore({
  reducer: {
    user: userSlice
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
