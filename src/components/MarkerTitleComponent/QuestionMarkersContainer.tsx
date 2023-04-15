import QuestionMarker from "./QuestionMarker";
import styles from "./QuestionMarkersContainer.module.css";

const QuestionMarkersContainer = () => {
  const numbersOfQuestions = [1, 2, 3, 4, 5, 6];
  const isCurrent = 4;

  return (
    <div className={styles.questionMarkers}>
      {numbersOfQuestions.map((question) => {
        return (
          <QuestionMarker
            key={question}
            number={question}
            isCurrent={isCurrent == question ? "true" : "false"}
          ></QuestionMarker>
        );
      })}
      {/* <div className={` ${styles.questionMarker} ${styles.currentMarker} `}>
        <p>1</p>
      </div>
      <div className={styles.questionMarker}>
        <p>2</p>
      </div>
      <div className={styles.questionMarker}>
        <p>3</p>
      </div>
      <div className={styles.questionMarker}>
        <p>4</p>
      </div>
      <div className={styles.questionMarker}>
        <p>5</p>
      </div>
      <div className={styles.questionMarker}>
        <p>6</p>
      </div> */}
    </div>
  );
};

export default QuestionMarkersContainer;
