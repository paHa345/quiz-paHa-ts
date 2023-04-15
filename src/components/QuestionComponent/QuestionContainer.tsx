import AnswerButton from "./AnswerButton";
import AnswersContainer from "./AnswersContainer";
import styles from "./QuestionContainer.module.css";
import QuestionText from "./QuestionText";

const QuestionContainer = () => {
  return (
    <div className={styles.question}>
      <QuestionText></QuestionText>

      <AnswersContainer></AnswersContainer>
      <AnswerButton></AnswerButton>
    </div>
  );
};

export default QuestionContainer;
