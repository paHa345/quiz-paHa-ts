import React, { useEffect, useState } from "react";
import styles from "./SetGameData.module.css";
import StartGameButton from "./StartGameButton";
import ChooseGame from "./ChooseGame";
import { useSelector } from "react-redux";
import { IAppStateSlice, appStateActions } from "@/store/app-stateSlice";
import { useDispatch } from "react-redux";
import { gameActions } from "@/store/gameSlice";
import { leaderBoardStateActions } from "@/store/leaderBoardSlice";

const SetGameData = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const setNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const currentGameName = useSelector(
    (state: IAppStateSlice) => state.appState.currentGamename
  );

  useEffect(() => {
    dispatch(appStateActions.setCurrentGameName(null));
    dispatch(gameActions.setStartGameStatus(false));
    dispatch(gameActions.setInGameStatus(false));
    dispatch(gameActions.resetUserAnswer());
    dispatch(leaderBoardStateActions.resetResultStatus());
  }, [dispatch]);

  return (
    <>
      <div className={styles.loginForm}>
        <h2 className={styles.bestProductH2}>Space Quiz</h2>
        <div className={styles.loginFormElement}>
          <label htmlFor="name">Введите имя</label>
          <input
            onChange={setNameHandler}
            value={name}
            id="name"
            required
            placeholder="Введите имя"
          />
        </div>
        <ChooseGame></ChooseGame>

        <div className={styles.startGameContainer}>
          {name.trim().length > 0 && currentGameName && (
            <StartGameButton userName={name}></StartGameButton>
          )}
        </div>
      </div>
    </>
  );
};

export default SetGameData;
