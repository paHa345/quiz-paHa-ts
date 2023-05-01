import { IDBLeaderBoard } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

// interface ICurrentLeaders {
//   id: string;
//   _id: string;
//   leaders: {
//     name: string;
//     points: string;
//   }[];
// }

interface ILeaderBoardState {
  leadersData: IDBLeaderBoard[] | null;
  currentLeadersData: IDBLeaderBoard[] | null | undefined;
}

export interface IleaderSlice {
  leaderState: {
    leadersData: IDBLeaderBoard[];
    currentLeadersData: IDBLeaderBoard[];
  };
}

// interface LeaderBoardAction {
//   type: string;
//   payload?: any;
// }

export const initLeaderBoardState: ILeaderBoardState = {
  leadersData: null,
  currentLeadersData: null,
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
  },
});

export const leaderBoardStateActions = leaderBoardStateSlice.actions;
