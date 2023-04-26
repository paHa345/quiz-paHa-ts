import { useSelector } from "react-redux";
import AnswerButton from "./AnswerButton";
import AnswersContainer from "./AnswersContainer";
import styles from "./QuestionContainer.module.css";
import QuestionText from "./QuestionText";
import { IGameSlice, gameActions } from "@/store/gameSlice";
import { useDispatch } from "react-redux";
import FinishGameButton from "./FinishGameButton";
import { useRouter } from "next/router";

const QuestionContainer = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const currentQuestion = useSelector(
    (state: IGameSlice) => state.gameState.currentQuestion
  );
  const currentNumber = useSelector(
    (state: IGameSlice) => state.gameState.currentQuestionNumber
  );

  const questions = useSelector(
    (state: IGameSlice) => state.gameState.questions
  );

  const currentQuestionNumber = useSelector(
    (state: IGameSlice) => state.gameState.currentQuestionNumber
  );

  const choosedAnswer = useSelector(
    (state: IGameSlice) => state.gameState.choosedAnswer
  );

  const points = useSelector((state: IGameSlice) => state.gameState.points);

  const clickNextQuestionHandler = () => {
    if (questions && choosedAnswer > -1) {
      dispatch(
        gameActions.setCurrentQuestion(
          questions?.questions[currentQuestionNumber + 1]
        )
      );
      dispatch(gameActions.setCurrentQuestionNumber(currentQuestionNumber + 1));

      if (currentQuestion?.answers[choosedAnswer].correct) {
        dispatch(gameActions.setPointsAfterQuestion(50));
      }

      dispatch(gameActions.setChoosedAnswer(-100));
    } else {
      alert("Выберете ответ");
    }
  };

  const clickFinishTestHandler = () => {
    if (questions && choosedAnswer > -1) {
      if (currentQuestion?.answers[choosedAnswer].correct) {
        dispatch(gameActions.setPointsAfterQuestion(50));
      }

      dispatch(gameActions.setChoosedAnswer(-100));
      dispatch(gameActions.setResultGameStatus(true));
      router.push("/result");
    } else {
      alert("Выберете ответ");
    }
  };

  return (
    <div className={styles.question}>
      <QuestionText
        questionNumber={currentNumber}
        numberOfQuestions={questions?.questions.length}
        text={currentQuestion?.text}
      ></QuestionText>

      <AnswersContainer answers={currentQuestion?.answers}></AnswersContainer>
      {currentQuestionNumber + 1 === questions?.questions.length && (
        <FinishGameButton
          finishGame={clickFinishTestHandler}
        ></FinishGameButton>
      )}
      {currentQuestionNumber + 1 !== questions?.questions.length && (
        <AnswerButton nextQuestion={clickNextQuestionHandler}></AnswerButton>
      )}
    </div>
  );
};

export default QuestionContainer;
