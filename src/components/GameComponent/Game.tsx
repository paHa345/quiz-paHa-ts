import MarkerContainer from "../MarkerTitleComponent/MarkerContainer";
import QuestionContainer from "../QuestionComponent/QuestionContainer";
import TimerSection from "../TimerComponent/TimerSection";
import styles from "./Game.module.css";

const Game = () => {
  return (
    <section className={styles.questions}>
      <div className={styles.container}>
        <div className={styles.questionContainer}>
          <QuestionContainer></QuestionContainer>
          <div className={styles.questionsInfo}>
            <TimerSection></TimerSection>
            <MarkerContainer></MarkerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Game;
