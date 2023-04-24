import styles from "./AnswerButton.module.css";

interface IAnswerButtonProps {
  nextQuestion: () => void;
}

const AnswerButton = ({ nextQuestion }: IAnswerButtonProps) => {
  return (
    <div
      onClick={nextQuestion}
      className={`${styles.unswerButton} ${styles.cartOrderButton}`}
    >
      <a href="#">Ответить</a>
    </div>
  );
};

export default AnswerButton;
