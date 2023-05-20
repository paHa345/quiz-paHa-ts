import Timer from "./Timer";
import styles from "./TimerSection.module.css";
import { gameActions } from "@/store/gameSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const TimerSection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(gameActions.dicreaseQuestionTime());
    }, 1000);
    const timeout = setTimeout(() => {
      clearInterval(timer);
    }, 20000);
    return () => {
      clearTimeout(timeout);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={styles.timerSection}>
      <div className={styles.timerContainer}>
        <div className={styles.timerTitle}>Дополнительные баллы</div>
        <div className={styles.timer}>
          <Timer></Timer>
        </div>
      </div>
    </div>
  );
};

export default TimerSection;
