import styles from "./TimerSection.module.css";

const TimerSection = () => {
  return (
    <div className={styles.timerSection}>
      <div className={styles.timerContainer}>
        <div className={styles.timerTitle}>На вопрос</div>
        <div className={styles.timer}>
          <p>
            10 <span>секунд</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimerSection;
