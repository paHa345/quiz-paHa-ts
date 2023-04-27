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
    resultGame: boolean;
    questions: null | IGameQuestions;
    currentQuestionNumber: number;
    currentQuestion: null | ICurrentQuestion;
    choosedAnswer: number;
    points: number;
    inGame: boolean;
    questionTime: number;
    timeIsUp: boolean;
    dontChooseAnswer: boolean;
  };
}

interface IGameState {
  name: string;
  value: number;
  startGame: boolean;
  resultGame: boolean;
  questions: null | IGameQuestions;
  currentQuestionNumber: number;
  currentQuestion: null | ICurrentQuestion;
  choosedAnswer: number;
  points: number;
  inGame: boolean;
  questionTime: number;
  timeIsUp: boolean;
  dontChooseAnswer: boolean;
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
  },
});

export const gameActions = gameSlice.actions;
