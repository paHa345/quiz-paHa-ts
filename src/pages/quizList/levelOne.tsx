import Game from "@/components/GameComponent/Game";
import { appStateActions, appStateSlice } from "@/store/app-stateSlice";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export interface IGame {
  message: string;
  item: {
    _id: string;
    id: string;
    questions: {
      text: string;
      true: number;
      answers: number[];
    }[];
  };
}

function LevelOne() {
  const dispatch = useDispatch();
  interface AppState {
    appState: {
      name: string;
      value: number;
    };
  }
  const name = useSelector((state: AppState) => state.appState.name);
  console.log(name);

  useEffect(() => {
    dispatch(appStateActions.setName("ooo"));
  }, [dispatch]);

  useEffect(() => {
    async function fetchQuestions() {
      const request = await fetch("../api/games/testSpace");
      const data: IGame = await request.json();
      console.log(data.item.questions[0].text);
    }
    fetchQuestions();
  }, []);

  return <Game></Game>;
}

export default LevelOne;
