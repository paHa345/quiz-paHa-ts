import React, { useState } from "react";
import styles from "./SetGameData.module.css";
import StartGameButton from "./StartGameButton";
import ChooseGame from "./ChooseGame";
import { useSelector } from "react-redux";
import { IAppStateSlice } from "@/store/app-stateSlice";

const SetGameData = () => {
  const [name, setName] = useState<string>("");
  const setNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const currentGameName = useSelector(
    (state: IAppStateSlice) => state.appState.currentGamename
  );
  console.log(currentGameName);

  return (
    <div className={styles.loginForm}>
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

      {name.trim().length > 0 && currentGameName && (
        <StartGameButton userName={name}></StartGameButton>
      )}
    </div>
  );
};

export default SetGameData;
