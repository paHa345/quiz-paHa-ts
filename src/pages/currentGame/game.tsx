import Game from "@/components/GameComponent/Game";
import GoGame from "@/components/GameComponent/GoGame";
import {
  IAppStateSlice,
  appStateActions,
  appStateSlice,
} from "@/store/app-stateSlice";
import { IGameQuestions, IGameSlice, gameActions } from "@/store/gameSlice";
import { useRouter } from "next/router";
import { Fragment, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// export interface IGameSlice {
//   message: string;
//   item: {
//     _id: string;
//     id: string;
//     questions: {
//       text: string;
//       true: number;
//       answers: number[];
//     }[];
//   };
// }

function GamePage() {
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

  const gameStatus = useSelector(
    (state: IGameSlice) => state.gameState.startGame
  );

  useEffect(() => {
    if (!name && !currentGameName) {
      router.push("/");
    }
  }, [currentGameName, name, router]);

  useEffect(() => {
    async function fetchQuestions() {
      const request = await fetch(`../api/games/${currentGameName}`);
      const data: { status: string; item: IGameQuestions } =
        await request.json();
      dispatch(gameActions.setQuestions(data.item));
    }
    fetchQuestions();
  }, []);

  return (
    <Fragment>
      {!gameStatus && <GoGame></GoGame>}
      {gameStatus && <Game></Game>}
    </Fragment>
  );
}

export default GamePage;
