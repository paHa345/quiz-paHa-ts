import { createSlice } from "@reduxjs/toolkit";

interface IAppState {
  name: string;
  value: number;
}

interface AppAction {
  type: string;
  payload?: any;
}

export const initAppState: IAppState = {
  name: "",
  value: 0,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState: initAppState,
  reducers: {
    setName(state, action) {
      state.name = "paHa";
    },
  },
});

export const appStateActions = appStateSlice.actions;
