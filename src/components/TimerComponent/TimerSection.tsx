import { useSelector } from "react-redux";
import Timer from "./Timer";
import styles from "./TimerSection.module.css";
import { IGameSlice, gameActions } from "@/store/gameSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const TimerSection = () => {
  // const time = useSelector((state: IGameSlice) => state.gameState.questionTime);

  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(gameActions.dicreaseQuestionTime());
    }, 1000);
    const timeout = setTimeout(() => {
      clearInterval(timer);
    }, 10000);
    return () => {
      clearTimeout(timeout);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={styles.timerSection}>
      <div className={styles.timerContainer}>
        <div className={styles.timerTitle}>Осталось времени</div>
        <div className={styles.timer}>
          <Timer></Timer>
        </div>
      </div>
    </div>
  );
};

export default TimerSection;
