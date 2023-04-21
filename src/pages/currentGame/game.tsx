import Game from "@/components/GameComponent/Game";
import {
  IAppStateSlice,
  appStateActions,
  appStateSlice,
} from "@/store/app-stateSlice";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export interface IGameSlice {
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
  const router = useRouter();
  interface AppState {
    appState: {
      name: string;
      value: number;
    };
  }
  const name = useSelector((state: IAppStateSlice) => state.appState.name);
  console.log(name);
  const currentGameName = useSelector(
    (state: IAppStateSlice) => state.appState.currentGamename
  );

  useEffect(() => {
    if (!name && !currentGameName) {
      router.push("/");
    }
  }, [currentGameName, name, router]);

  useEffect(() => {
    async function fetchQuestions() {
      const request = await fetch(`../api/games/${currentGameName}`);
      const data: IGameSlice = await request.json();
      console.log(data.item.questions[0].text);
    }
    fetchQuestions();
  }, []);

  return <Game></Game>;
}

export default LevelOne;
