import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { createStore, applyMiddleware } from "redux";
import { appStateSlice } from "./app-stateSlice";
import { gameSlice } from "./gameSlice";
import { leaderBoardStateSlice } from "./leaderBoardSlice";

// export const store = configureStore({reducer, middleware:applyMiddleware(thunk)});
const store = configureStore({
  reducer: {
    appState: appStateSlice.reducer,
    gameState: gameSlice.reducer,
    leaderState: leaderBoardStateSlice.reducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
