import styles from "./Answer.module.css";

interface Answerprops {
  name: string;
}

const Answer = ({ name }: Answerprops) => {
  return (
    <li className={`${styles.selected} ${styles.unswersElement}`}>{name}</li>
  );
};

export default Answer;
