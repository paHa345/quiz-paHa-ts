import { useSelector } from "react-redux";
import MarkerContainer from "../MarkerTitleComponent/MarkerContainer";
import QuestionContainer from "../QuestionComponent/QuestionContainer";
import TimerSection from "../TimerComponent/TimerSection";
import styles from "./Game.module.css";
import { IAppStateSlice } from "@/store/app-stateSlice";
import { IGameSlice } from "@/store/gameSlice";
import TimeIsUpContainer from "../TimeIsUp/TimeIsUpContainer";

const Game = () => {
  const showTimer = useSelector(
    (state: IAppStateSlice) => state.appState.showTimer
  );

  const timeIsUpNotification = useSelector(
    (state: IGameSlice) => state.gameState.timeIsUp
  );
  const currentPoints = useSelector(
    (state: IGameSlice) => state.gameState.points
  );

  return (
    <section className={styles.questions}>
      <div className={styles.container}>
        <div className={styles.questionContainer}>
          <QuestionContainer></QuestionContainer>
          <div className={styles.questionsInfo}>
            {showTimer && <TimerSection></TimerSection>}
            {timeIsUpNotification && <TimeIsUpContainer></TimeIsUpContainer>}

            {/* <MarkerContainer></MarkerContainer> */}
            <div className={styles.currentPointsContainer}>
              <p>Заработано баллов</p>
              {currentPoints}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Game;
