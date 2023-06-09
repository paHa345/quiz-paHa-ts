import React from "react";
import styles from "./StartGameButton.module.css";
import { useDispatch } from "react-redux";
import { appStateActions } from "@/store/app-stateSlice";
import { useRouter } from "next/router";
import { gameActions } from "@/store/gameSlice";

interface IStartGameButtonProps {
  userName: string;
}

const StartGameButton = ({ userName }: IStartGameButtonProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const clickStartGameButtonHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(appStateActions.setName(userName));
    dispatch(gameActions.resetPoints(0));
    dispatch(gameActions.setInGameStatus(true));

    router.push("./currentGame/game");
  };
  return (
    <div
      onClick={clickStartGameButtonHandler}
      className={styles.cartOrderButton}
    >
      <a href="#">Начать</a>
    </div>
  );
};

export default StartGameButton;
