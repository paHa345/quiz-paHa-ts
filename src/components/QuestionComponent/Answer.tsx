import styles from "./Answer.module.css";

interface Answerprops {
  name: string;
  choosed: boolean;
  clickAnswer: (event: any) => void;
}

const Answer = ({ name, choosed, clickAnswer }: Answerprops) => {
  const selected = choosed ? styles.selected : "";

  return (
    <li
      onClick={clickAnswer}
      className={`${selected} ${styles.unswersElement}`}
    >
      {name}
    </li>
  );
};

export default Answer;
