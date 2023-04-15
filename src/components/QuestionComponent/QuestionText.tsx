import { Fragment } from "react";
import styles from "./QuestionText.module.css";

const QuestionText = () => {
  return (
    <Fragment>
      <div className={styles.questionNumber}>Вопрос 1.</div>
      <div className={styles.questionText}>
        Назовите самую крупную планету Солнечной системы
      </div>
    </Fragment>
  );
};

export default QuestionText;
