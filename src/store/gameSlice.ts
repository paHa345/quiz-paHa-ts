import { createSlice } from "@reduxjs/toolkit";

export interface IGameQuestions {
  id: string;
  _id: string;
  questions: ICurrentQuestion[];
}
export interface ICurrentQuestion {
  text: string;
  answers: {
    answer: string;
    correct: boolean;
  }[];
}

export interface IGameSlice {
  gameState: {
    name: string;
    value: number;
    startGame: boolean;
    questions: null | IGameQuestions;
    currentQuestionNumber: number;
    currentQuestion: null | ICurrentQuestion;
    choosedAnswer: number;
  };
}

interface IGameState {
  name: string;
  value: number;
  startGame: boolean;
  questions: null | IGameQuestions;
  currentQuestionNumber: number;
  currentQuestion: null | ICurrentQuestion;
  choosedAnswer: number;
}

interface GameAction {
  type: string;
  payload?: any;
}

interface ISetStartGameStatusAction {
  payload: boolean;
  type: string;
}

interface ISetQuestionsAction {
  type: string;
  payload: IGameQuestions;
}

interface ISetCurrentQuestionNumberAction {
  type: string;
  payload: number;
}

interface ISetCurrentQuestionAction {
  type: string;
  payload: ICurrentQuestion;
}

export const initGameState: IGameState = {
  name: "",
  value: 0,
  startGame: false,
  questions: null,
  currentQuestionNumber: -100,
  currentQuestion: null,
  choosedAnswer: -100,
};

export const gameSlice = createSlice({
  name: "gameState",
  initialState: initGameState,
  reducers: {
    setCurrentQuestion(state, action: ISetCurrentQuestionAction) {
      state.currentQuestion = action.payload;
    },
    setStartGameStatus(state, action: ISetStartGameStatusAction) {
      state.startGame = action.payload;
    },
    setQuestions(state, action: ISetQuestionsAction) {
      state.questions = action.payload;
    },
    setCurrentQuestionNumber(state, action: ISetCurrentQuestionNumberAction) {
      state.currentQuestionNumber = action.payload;
    },
    setChoosedAnswer(state, action: { type: string; payload: number }) {
      state.choosedAnswer = action.payload;
    },
  },
});

export const gameActions = gameSlice.actions;
