import { Fragment } from "react";
import styles from "./QuestionText.module.css";

interface IQuestionTextProps {
  text: string | undefined;
  questionNumber: number;
  numberOfQuestions: number | undefined;
}

const QuestionText = ({
  text,
  questionNumber,
  numberOfQuestions,
}: IQuestionTextProps) => {
  return (
    <Fragment>
      <div className={styles.questionNumber}>
        Вопрос {questionNumber + 1} / {numberOfQuestions}
      </div>
      <div className={styles.questionText}>{text}</div>
    </Fragment>
  );
};

export default QuestionText;
