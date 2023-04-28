import { useSelector } from "react-redux";
import AnswerButton from "./AnswerButton";
import AnswersContainer from "./AnswersContainer";
import styles from "./QuestionContainer.module.css";
import QuestionText from "./QuestionText";
import { IGameSlice, gameActions } from "@/store/gameSlice";
import { useDispatch } from "react-redux";
import FinishGameButton from "./FinishGameButton";
import { useRouter } from "next/router";
import Timer from "../TimerComponent/Timer";
import TimerSection from "../TimerComponent/TimerSection";
import { appStateActions } from "@/store/app-stateSlice";

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
      console.log(currentQuestion?.answers[choosedAnswer].answer);

      if (currentQuestion?.answers[choosedAnswer].answer) {
        dispatch(
          gameActions.addUserAnswer(
            currentQuestion?.answers[choosedAnswer].answer
          )
        );
      }
      dispatch(
        gameActions.setCurrentQuestion(
          questions?.questions[currentQuestionNumber + 1]
        )
      );
      dispatch(gameActions.setCurrentQuestionNumber(currentQuestionNumber + 1));

      if (currentQuestion?.answers[choosedAnswer].correct) {
        console.log(currentQuestion?.answers[choosedAnswer]);

        console.log("correct");

        dispatch(gameActions.setPointsAfterQuestion(50));
      }

      dispatch(gameActions.setChoosedAnswer(-100));
      dispatch(gameActions.resetQuestionTime());
      dispatch(appStateActions.hideTimer());
    } else {
      dispatch(gameActions.setChooseAnswer(true));
      setTimeout(() => {
        dispatch(gameActions.setChooseAnswer(false));
      }, 1000);
    }
  };

  const clickFinishTestHandler = () => {
    if (questions && choosedAnswer > -1) {
      if (currentQuestion?.answers[choosedAnswer].answer) {
        dispatch(
          gameActions.addUserAnswer(
            currentQuestion?.answers[choosedAnswer].answer
          )
        );
      }

      if (currentQuestion?.answers[choosedAnswer].correct) {
        dispatch(gameActions.setPointsAfterQuestion(50));
      }

      dispatch(gameActions.setChoosedAnswer(-100));
      dispatch(gameActions.setResultGameStatus(true));
      dispatch(appStateActions.hideTimer());
      dispatch(gameActions.resetQuestionTime());
      router.push("/result");
    } else {
      dispatch(gameActions.setChooseAnswer(true));
      setTimeout(() => {
        dispatch(gameActions.setChooseAnswer(false));
      }, 1000);
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
