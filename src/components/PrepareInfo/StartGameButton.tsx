import React from "react";
import styles from "./StartGameButton.module.css";
import { useDispatch } from "react-redux";
import { appStateActions } from "@/store/app-stateSlice";
import { Router, useRouter } from "next/router";

interface IStartGameButtonProps {
  userName: string;
}

const StartGameButton = ({ userName }: IStartGameButtonProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const clickStartGameButtonHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(appStateActions.setName(userName));
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
