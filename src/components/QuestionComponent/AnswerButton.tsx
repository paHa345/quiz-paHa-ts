import styles from "./AnswerButton.module.css";

const AnswerButton = () => {
  return (
    <div className={`${styles.unswerButton} ${styles.cartOrderButton}`}>
      <a href="#">Ответить</a>
    </div>
  );
};

export default AnswerButton;
