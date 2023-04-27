import { useSelector } from "react-redux";
import styles from "./Timer.module.css";
import { IGameSlice, gameActions } from "@/store/gameSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface ITimerProps {
  time: number;
}

const Timer = () => {
  const time2 = useSelector(
    (state: IGameSlice) => state.gameState.questionTime
  );

  const dispatch = useDispatch();
  //   useEffect(() => {
  //     while (time > 0) {
  //       setInterval(() => {
  //         dispatch(gameActions.dicreaseQuestionTime());
  //       }, 1000);
  //     }
  //   }, []);

  return (
    <p>
      {time2} <span>секунд</span>
    </p>
  );
};

export default Timer;
