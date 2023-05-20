import { useSelector } from "react-redux";
import styles from "./Timer.module.css";
import { IGameSlice } from "@/store/gameSlice";

interface ITimerProps {
  time: number;
}

const Timer = () => {
  const time2 = useSelector(
    (state: IGameSlice) => state.gameState.questionTime
  );

  return (
    <p>
      {time2} <span></span>
    </p>
  );
};

export default Timer;
