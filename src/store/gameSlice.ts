import {
  IDBGameName,
  IDBGameQuestions,
  IDBQuestion,
  ILeaderTableUser,
  IUserAnswer,
} from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type } from "os";

export const fetchGameNames = createAsyncThunk(
  "gameState/fetchGameNames",
  async function () {
    const req = await fetch("./api/getGamesName");
    const data: IDBGameName = await req.json();
    return data;
  }
);

export interface IGameSlice {
  gameState: {
    name: string;
    value: number;
    startGame: boolean;
    resultGame: boolean;
    questions: null | IDBGameQuestions;
    currentQuestionNumber: number;
    currentQuestion: null | IDBQuestion;
    choosedAnswer: number;
    points: number;
    inGame: boolean;
    questionTime: number;
    timeIsUp: boolean;
    dontChooseAnswer: boolean;
    userAnswers: null | IUserAnswer[];
    fetchGameNamesStatus: string;
  };
}

interface IGameState {
  name: string;
  value: number;
  startGame: boolean;
  resultGame: boolean;
  questions: null | IDBGameQuestions;
  currentQuestionNumber: number;
  currentQuestion: null | IDBQuestion;
  choosedAnswer: number;
  points: number;
  inGame: boolean;
  questionTime: number;
  timeIsUp: boolean;
  dontChooseAnswer: boolean;
  userAnswers: null | IUserAnswer[];
  fetchGameNamesStatus: string;
}

interface ISetStartGameStatusAction {
  payload: boolean;
  type: string;
}

interface ISetQuestionsAction {
  type: string;
  payload: IDBGameQuestions;
}

interface ISetCurrentQuestionNumberAction {
  type: string;
  payload: number;
}

interface ISetCurrentQuestionAction {
  type: string;
  payload: IDBQuestion;
}

export const initGameState: IGameState = {
  name: "",
  value: 0,
  startGame: false,
  resultGame: false,
  questions: null,
  currentQuestionNumber: -100,
  currentQuestion: null,
  choosedAnswer: -100,
  points: 0,
  inGame: false,
  questionTime: 10,
  timeIsUp: false,
  dontChooseAnswer: false,
  userAnswers: null,
  fetchGameNamesStatus: "",
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
    setResultGameStatus(state, action: { type: string; payload: boolean }) {
      state.resultGame = action.payload;
    },
    setQuestions(state, action: ISetQuestionsAction) {
      if (action.payload) {
        const randomQuestionssArr = [];
        for (let i = 0; i < action.payload.questions.length; i++) {
          const random = Math.random() * 10;
          if (random > 5) {
            randomQuestionssArr.push(action.payload.questions[i]);
          } else {
            randomQuestionssArr.unshift(action.payload.questions[i]);
          }
        }

        action.payload.questions = randomQuestionssArr;

        action.payload.questions.map((question) => {
          const randomAnswersArr = [];
          const answersLength = question.answers.length;
          for (let i = 0; i < answersLength; i++) {
            const random = Math.random() * 10;
            if (random > 5) {
              randomAnswersArr.push(question.answers[i]);
            } else {
              randomAnswersArr.unshift(question.answers[i]);
            }
          }
          question.answers = randomAnswersArr;
        });
      }

      state.questions = action.payload;
    },
    setCurrentQuestionNumber(state, action: ISetCurrentQuestionNumberAction) {
      state.currentQuestionNumber = action.payload;
    },
    setChoosedAnswer(state, action: { type: string; payload: number }) {
      state.choosedAnswer = action.payload;
    },
    setPointsAfterQuestion(state, action: { type: string; payload: number }) {
      state.points = state.points + action.payload + state.questionTime * 2;
    },
    resetPoints(state, action: { type: string; payload: number }) {
      state.points = 0;
    },
    setInGameStatus(state, action: { type: string; payload: boolean }) {
      state.inGame = action.payload;
    },
    dicreaseQuestionTime(state) {
      state.questionTime = state.questionTime - 1;
    },
    resetQuestionTime(state) {
      state.questionTime = 10;
    },
    seTTimeIsUpStatus(state, action: { type: string; payload: boolean }) {
      state.timeIsUp = action.payload;
    },
    setChooseAnswer(state, action: { type: string; payload: boolean }) {
      state.dontChooseAnswer = action.payload;
    },
    addUserAnswer(state, action: { type: string; payload: string }) {
      const correctAnswer = state.currentQuestion?.answers.filter(
        (answer) => answer.correct
      );
      const userAnswer: IUserAnswer = {
        question: state.currentQuestion?.text,
        correctAnswer: correctAnswer,
        userAnswer: action.payload,
      };
      if (state.userAnswers === null) {
        state.userAnswers = [userAnswer];
      } else {
        state.userAnswers.push(userAnswer);
      }
    },
    resetUserAnswer(state) {
      state.userAnswers = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGameNames.fulfilled, (state, action) => {
      state.fetchGameNamesStatus = "loading";
    });
  },
});

export const gameActions = gameSlice.actions;
