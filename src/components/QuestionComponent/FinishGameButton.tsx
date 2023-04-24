import styles from "./FinishGameButton.module.css";

interface IFinishGameButtonProps {
  finishGame: () => void;
}

const FinishGameButton = ({ finishGame }: IFinishGameButtonProps) => {
  return (
    <div
      onClick={finishGame}
      className={`${styles.unswerButton} ${styles.cartOrderButton}`}
    >
      <a href="#">Завершить тест</a>
    </div>
  );
};

export default FinishGameButton;
