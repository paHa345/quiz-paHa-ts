import { useSelector } from "react-redux";
import QuestionMarker from "./QuestionMarker";
import styles from "./QuestionMarkersContainer.module.css";
import { IGameSlice } from "@/store/gameSlice";

const QuestionMarkersContainer = () => {
  const numberQuestions = useSelector(
    (state: IGameSlice) => state.gameState.questions
  );

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
    </div>
  );
};

export default QuestionMarkersContainer;
