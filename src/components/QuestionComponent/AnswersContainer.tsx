import { useSelector } from "react-redux";
import Answer from "./Answer";
import styles from "./AnswersContainer.module.css";
import { IGameSlice, gameActions } from "@/store/gameSlice";
import React from "react";
import { useDispatch } from "react-redux";

interface IAnswersContainerProps {
  answers: IAnserProps[] | undefined;
}

interface IAnserProps {
  answer: string;
  correct: boolean;
}

const AnswersContainer = ({ answers }: IAnswersContainerProps) => {
  const dispatch = useDispatch();
  const choosedAnswer = useSelector(
    (state: IGameSlice) => state.gameState.choosedAnswer
  );

  const dontChooseAnswer = useSelector(
    (state: IGameSlice) => state.gameState.dontChooseAnswer
  );

  const clickAnswerHandler = function (this: number, event: MouseEvent) {
    dispatch(gameActions.setChoosedAnswer(this));
  };

  return (
    <div className={styles.unswers}>
      <p>Варианты ответов</p>
      <ul className={styles.unswersList}>
        {answers?.map((answer: IAnserProps, index: number) => (
          <Answer
            clickAnswer={clickAnswerHandler.bind(index)}
            choosed={choosedAnswer === index ? true : false}
            key={answer.answer}
            name={answer.answer}
          ></Answer>
        ))}
        {dontChooseAnswer && (
          <div className={styles.dontChooseContainer}>
            <div className={styles.dontChoose}>Выберете ответ</div>
          </div>
        )}
      </ul>
    </div>
  );
};

export default AnswersContainer;
