import { useSelector } from "react-redux";
import styles from "./AnswersTable.module.css";
import { IGameSlice } from "@/store/gameSlice";
import { Fragment } from "react";

const AnswersTable = () => {
  const userAnswersData = useSelector(
    (state: IGameSlice) => state.gameState.userAnswers
  );

  const userAnswers = userAnswersData?.map((answer) => {
    if (!answer.correctAnswer) {
      return null;
    }

    const isCorrect =
      answer.userAnswer === answer.correctAnswer[0].answer
        ? `${styles.correct}`
        : `${styles.uncorrect}`;

    return (
      <div key={answer.question} className={styles.question}>
        <div className={styles.questionText}>{answer.question}</div>
        <div className={styles.answerContainer}>
          <div className={styles.unswersElement}>
            Правильный ответ:{" "}
            {answer.correctAnswer ? answer.correctAnswer[0]?.answer : ""}
          </div>
        </div>
        <div className={styles.answerContainer}>
          <div className={isCorrect}>Ваш ответ: {answer.userAnswer}</div>
        </div>
      </div>
    );
  });

  return (
    <Fragment>
      <div className={styles.answerTableContainer}>
        <h1 className={styles.title}> Ваши ответы</h1>
        {userAnswers}
      </div>
    </Fragment>
  );
};

export default AnswersTable;
