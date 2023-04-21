import { createSlice } from "@reduxjs/toolkit";

interface IGameState {
  name: string;
  value: number;
}

interface GameAction {
  type: string;
  payload?: any;
}

export const initGameState: IGameState = {
  name: "",
  value: 0,
};

export const gameSlice = createSlice({
  name: "gameState",
  initialState: initGameState,
  reducers: {
    setCurrentQuestion(state, action) {
      state.name = "paHa";
    },
  },
});

export const gameActions = gameSlice.actions;
