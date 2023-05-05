import { FetchStatus, IDBGameName } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchGameNames = createAsyncThunk(
  "appState/fetchGameNames",
  async function (_, { rejectWithValue }) {
    try {
      const req = await fetch("./api/getGamesName");
      const data: IDBGameName = await req.json();
      if (!req.ok) {
        throw new Error(`Ошибка сервера: ${data.message}`);
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export interface IAppStateSlice {
  appState: {
    name: string;
    value: number;
    gamesName: { id: string; _id: string }[] | null | string | undefined;
    currentGamename: string | null;
    showTimer: boolean;
    fetchGameNamesStatus: FetchStatus;
    error: string;
  };
}

interface IAppState {
  name: string;
  value: number;
  gamesName: { id: string; _id: string }[] | null | string | undefined;
  currentGamename: string | null;
  showTimer: boolean;
  fetchGameNamesStatus: FetchStatus;
  error: string;
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
  fetchGameNamesStatus: FetchStatus.Loading,
  error: "",
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
        payload: { id: string; _id: string }[] | string | undefined;
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
  extraReducers: (builder) => {
    builder.addCase(fetchGameNames.pending, (state) => {
      state.fetchGameNamesStatus = FetchStatus.Loading;
      state.error = "";
    });
    builder.addCase(fetchGameNames.fulfilled, (state, action) => {
      state.fetchGameNamesStatus = FetchStatus.Resolve;
      state.gamesName = action.payload.item;
    });
    builder.addCase(fetchGameNames.rejected, (state, action) => {
      state.fetchGameNamesStatus = FetchStatus.Error;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const appStateActions = appStateSlice.actions;
