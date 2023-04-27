import { Fragment, useEffect } from "react";
import styles from "./QuestionText.module.css";
import { useDispatch } from "react-redux";
import { appStateActions } from "@/store/app-stateSlice";

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appStateActions.showTimer());
  });
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
