import {
  FetchStatus,
  IDBAllLeadersRequest,
  IDBLeaderBoard,
  ILeaderTableUser,
  ILeadersTableRequest,
} from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllGameLeaderBoard = createAsyncThunk(
  "leaderBoardState/fetchAllGameLeaderBoard",
  async function (_, { rejectWithValue }) {
    try {
      const req = await fetch("./api/leaderBoard/allGameLeaders");
      const leadersData: IDBAllLeadersRequest = await req.json();

      if (!req.ok) {
        throw new Error(`Ошибка сервера: ${leadersData.message}`);
      }

      return leadersData.item;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLeaderBoardAndSetLeaders = createAsyncThunk(
  "leaderBoardState/fetchLeaderBoardAndSetLeaders",
  async function (
    {
      currentGameName,
      points,
      userName,
    }: { currentGameName: string; points: number; userName: string },
    { rejectWithValue }
  ) {
    try {
      const req = await fetch(`./api/leaderBoard/${currentGameName}`);
      const leadersData: ILeadersTableRequest = await req.json();
      if (!req.ok) {
        throw new Error(`Ошибка сервера: ${leadersData.message}`);
      }

      return { leadersData, points, userName };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const patchNewLeadersData = createAsyncThunk(
  "leaderBoardState/patchNewLeadersData",
  async function (
    {
      currentGameName,
      leadersData,
      numberInLeader,
    }: {
      currentGameName: string;
      leadersData: ILeaderTableUser[];
      numberInLeader: number;
    },
    { rejectWithValue }
  ) {
    try {
      const req = await fetch(`./api/leaderBoard/${currentGameName}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ leadersData, serverSecret: process.env.SECRET }),
      });
      const data = await req.json();
      if (!req.ok) {
        throw new Error(`Ошибка сервера: ${data.message}`);
      }
      return { data, numberInLeader, leadersData };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface ILeaderBoardState {
  leadersData: IDBLeaderBoard[] | null | undefined;
  currentLeadersData: IDBLeaderBoard[] | null | undefined;
  fetchQuestionsStatus: FetchStatus;
  error: string;
  inLeadersStatus: boolean;
  newLeaderBoard: ILeaderTableUser[] | null;
  numberInLeaderBoard: number;
  patchLeaderStatus: FetchStatus;
  patchError: string | null;
}

export interface IleaderSlice {
  leaderState: {
    leadersData: IDBLeaderBoard[] | null | undefined;
    currentLeadersData: IDBLeaderBoard[];
    fetchQuestionsStatus: FetchStatus;
    error: string;
    inLeadersStatus: boolean;
    newLeaderBoard: ILeaderTableUser[] | null;
    numberInLeaderBoard: number;
    patchLeaderStatus: FetchStatus;
    patchError: string | null;
  };
}

export const initLeaderBoardState: ILeaderBoardState = {
  leadersData: null,
  currentLeadersData: null,
  fetchQuestionsStatus: FetchStatus.Loading,
  error: "",
  inLeadersStatus: false,
  newLeaderBoard: null,
  numberInLeaderBoard: 0,
  patchLeaderStatus: FetchStatus.Loading,
  patchError: "",
};

export const leaderBoardStateSlice = createSlice({
  name: "leaderBoardState",
  initialState: initLeaderBoardState,
  reducers: {
    setLeadersData(state, action) {
      console.log(action.payload);

      state.leadersData = action.payload;
    },
    setCurrentLeadersData(state, action) {
      if (action.payload?.length > 0) {
        const current = state.leadersData?.filter(
          (el) => el?.id === action.payload
        );
        state.currentLeadersData = current;
      } else {
        state.currentLeadersData = null;
      }
    },
    resetResultStatus(state) {
      state.inLeadersStatus = false;
      state.newLeaderBoard = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLeaderBoardAndSetLeaders.pending, (state) => {
      state.fetchQuestionsStatus = FetchStatus.Loading;
      state.error = "";
    });
    builder.addCase(
      fetchLeaderBoardAndSetLeaders.fulfilled,
      (state, action) => {
        const leadersData = action.payload.leadersData.item.leaders;
        const resultPoints = action.payload.points;
        const userName = action.payload.userName;

        const sorted = leadersData.sort(
          (
            a: { name: string; points: string },
            b: { name: string; points: string }
          ) => {
            return Number(b.points) - Number(a.points);
          }
        );

        if (resultPoints > Number(sorted[sorted?.length - 1]?.points)) {
          const leaderObj = {
            name: userName,
            points: String(resultPoints),
          };
          let index;
          for (let i = 0; i < sorted.length; i++) {
            if (resultPoints > Number(sorted[i].points)) {
              state.numberInLeaderBoard = i;

              index = i;

              break;
            }
          }

          const first = sorted.slice(0, index);
          const secound = sorted.slice(index, sorted.length);

          const newLeaderBoard = [...first, leaderObj, ...secound];
          newLeaderBoard.splice(newLeaderBoard.length - 1, 1);

          console.log(newLeaderBoard);
          state.newLeaderBoard = newLeaderBoard;

          state.inLeadersStatus = true;
        }

        state.fetchQuestionsStatus = FetchStatus.Resolve;
      }
    );
    builder.addCase(fetchLeaderBoardAndSetLeaders.rejected, (state, action) => {
      state.fetchQuestionsStatus = FetchStatus.Error;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    builder.addCase(patchNewLeadersData.pending, (state) => {
      state.patchLeaderStatus = FetchStatus.Loading;
      state.error = "";
    });
    builder.addCase(patchNewLeadersData.fulfilled, (state, action) => {
      state.patchLeaderStatus = FetchStatus.Resolve;
    });
    builder.addCase(patchNewLeadersData.rejected, (state, action) => {
      state.fetchQuestionsStatus = FetchStatus.Error;
      if (typeof action.payload === "string") {
        state.patchError = action.payload;
      }
    });
    builder.addCase(fetchAllGameLeaderBoard.pending, (state) => {
      state.fetchQuestionsStatus = FetchStatus.Loading;
      state.error = "";
    });
    builder.addCase(fetchAllGameLeaderBoard.fulfilled, (state, action) => {
      state.leadersData = action.payload;
      state.fetchQuestionsStatus = FetchStatus.Resolve;
    });
    builder.addCase(fetchAllGameLeaderBoard.rejected, (state, action) => {
      state.fetchQuestionsStatus = FetchStatus.Error;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const leaderBoardStateActions = leaderBoardStateSlice.actions;
