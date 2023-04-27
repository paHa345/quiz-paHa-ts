import { createSlice } from "@reduxjs/toolkit";

export interface IAppStateSlice {
  appState: {
    name: string;
    value: number;
    gamesName: { id: string; _id: string }[] | null;
    currentGamename: string | null;
    showTimer: boolean;
  };
}

interface IAppState {
  name: string;
  value: number;
  gamesName: { id: string; _id: string }[] | null;
  currentGamename: string | null;
  showTimer: boolean;
}

interface AppAction {
  type: string;
  payload?: any;
}

export const initAppState: IAppState = {
  name: "",
  value: 0,
  gamesName: null,
  currentGamename: null,
  showTimer: true,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState: initAppState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setGamesName(
      state,
      action: {
        payload: { id: string; _id: string }[];
        type: string;
      }
    ) {
      state.gamesName = action.payload;
    },
    setCurrentGameName(
      state,
      action: {
        payload: string | null;
        type: string;
      }
    ) {
      if (action.payload && action.payload.trim()) {
        state.currentGamename = action.payload;
      }

      if (!action.payload) {
        state.currentGamename = action.payload;
      }
    },
    showTimer(state) {
      state.showTimer = true;
    },
    hideTimer(state) {
      state.showTimer = false;
    },
  },
});

export const appStateActions = appStateSlice.actions;
