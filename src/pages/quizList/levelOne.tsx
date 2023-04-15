import Game from "@/components/GameComponent/Game";
import { appStateActions, appStateSlice } from "@/store/app-stateSlice";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

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

  return <Game></Game>;
}

export default LevelOne;
