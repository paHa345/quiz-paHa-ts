import { useSelector } from "react-redux";
import QuestionMarker from "./QuestionMarker";
import styles from "./QuestionMarkersContainer.module.css";
import { IGameSlice } from "@/store/gameSlice";

const QuestionMarkersContainer = () => {
  const numberQuestions = useSelector(
    (state: IGameSlice) => state.gameState.questions
  );

  console.log(numberQuestions?.questions.length);

  const isCurrent = useSelector(
    (state: IGameSlice) => state.gameState.currentQuestionNumber
  );

  // const numbersOfQuestions = [1, 2, 3, 4, 5, 6];
  // const isCurrent = 4;

  return (
    <div className={styles.questionMarkers}>
      {numberQuestions?.questions.map((question, index) => {
        return (
          <QuestionMarker
            key={question.text}
            number={index + 1}
            isCurrent={Number(isCurrent) == index ? "true" : "false"}
          ></QuestionMarker>
        );
      })}
      {/* <div className={` ${styles.questionMarker} ${styles.currentMarker} `}>
        <p>1</p>
      </div>
      <div className={styles.questionMarker}>
        <p>2</p>
      </div>
      <div className={styles.questionMarker}>
        <p>3</p>
      </div>
      <div className={styles.questionMarker}>
        <p>4</p>
      </div>
      <div className={styles.questionMarker}>
        <p>5</p>
      </div>
      <div className={styles.questionMarker}>
        <p>6</p>
      </div> */}
    </div>
  );
};

export default QuestionMarkersContainer;
