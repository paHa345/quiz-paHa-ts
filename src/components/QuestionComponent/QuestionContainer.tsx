import { useSelector } from "react-redux";
import AnswerButton from "./AnswerButton";
import AnswersContainer from "./AnswersContainer";
import styles from "./QuestionContainer.module.css";
import QuestionText from "./QuestionText";
import { IGameSlice } from "@/store/gameSlice";

const QuestionContainer = () => {
  const currentQuestion = useSelector(
    (state: IGameSlice) => state.gameState.currentQuestion
  );
  const currentNumber = useSelector(
    (state: IGameSlice) => state.gameState.currentQuestionNumber
  );

  const questions = useSelector(
    (state: IGameSlice) => state.gameState.questions
  );

  return (
    <div className={styles.question}>
      <QuestionText
        questionNumber={currentNumber}
        numberOfQuestions={questions?.questions.length}
        text={currentQuestion?.text}
      ></QuestionText>

      <AnswersContainer answers={currentQuestion?.answers}></AnswersContainer>
      <AnswerButton></AnswerButton>
    </div>
  );
};

export default QuestionContainer;
