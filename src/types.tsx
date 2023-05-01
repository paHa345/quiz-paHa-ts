import type { ReactElement } from "react";
import { IleaderSlice } from "./store/leaderBoardSlice";
import { IGameSlice } from "./store/gameSlice";

// типизация layout обёртки
export type LayoutProps = ({
  children,
}: {
  children: ReactElement;
}) => ReactElement;

// из БД questions
export interface IDBAnswer {
  answer: string;
  correct: boolean;
}

export interface IDBQuestion {
  text: string;
  answers: IDBAnswer[];
}

export interface IDBGameQuestions {
  _id: string;
  id: string;
  questions: IDBQuestion[];
}

//ответы от сервера
//список всех игр, одной игры, ошибка от сервера
export interface IDBGameRequst {
  message: string;
  item?: IDBGameQuestions[] | IDBGameQuestions | string;
}

// список имён всех доступных игр, ошибка от сервера
export type IDBGameName = {
  message: string;
  item?: Omit<IDBGameQuestions, "questions">[] | string;
};

//из БД leaderBoard

export interface ILeaderTableUser {
  name: string;
  points: string;
}

export interface IDBLeaderBoard {
  _id: string;
  id: string;
  leaders: ILeaderTableUser[];
}

// тип объекта с ответами пользователя из game slice
export interface IUserAnswer {
  question: string | undefined;
  correctAnswer:
    | {
        answer: string;
        correct: boolean;
      }[]
    | undefined;

  userAnswer: string | undefined;
}

// тип ответа от сервера leaderBoard
export interface ILeadersTableRequest {
  message: string;
  item: IDBLeaderBoard;
}

// тип ответа от сервера game
export interface IGameRequest {
  message: string;
  item: IDBGameQuestions;
}
