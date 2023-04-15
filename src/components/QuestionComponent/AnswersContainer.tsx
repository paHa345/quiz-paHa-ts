import Answer from "./Answer";
import styles from "./AnswersContainer.module.css";

const AnswersContainer = () => {
  const answers = [
    { name: "Луна" },
    { name: "Земля" },
    { name: "Плутон" },
    { name: "Юпитер" },
  ];
  return (
    <div className={styles.unswers}>
      <p>Варианты ответов</p>
      <ul className={styles.unswersList}>
        {answers.map((answer) => (
          <Answer key={answer.name} name={answer.name}></Answer>
        ))}
      </ul>
    </div>
  );
};

export default AnswersContainer;
