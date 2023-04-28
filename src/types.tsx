import type { ReactElement } from "react";
import { ILeadersData } from "./components/LeaderBoards/LeaderBoardSComponent";

export type LayoutProps = ({
  children,
}: {
  children: ReactElement;
}) => ReactElement;

export interface ILeaderTableUser {
  name: string;
  points: string;
}

export interface ILeadersTableRequest {
  message: string;
  item: ILeadersData;
}

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
