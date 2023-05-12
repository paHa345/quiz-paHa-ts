import { configureStore } from "@reduxjs/toolkit";

import { appStateSlice } from "./app-stateSlice";
import { gameSlice } from "./gameSlice";
import { leaderBoardStateSlice } from "./leaderBoardSlice";

const store = configureStore({
  reducer: {
    appState: appStateSlice.reducer,
    gameState: gameSlice.reducer,
    leaderState: leaderBoardStateSlice.reducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
