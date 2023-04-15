import styles from "./MarkerContainer.module.css";
import QuestionMarkersContainer from "./QuestionMarkersContainer";

const MarkerContainer = () => {
  return (
    <div>
      <div className={styles.markerTitle}>Вопросы</div>
      <QuestionMarkersContainer></QuestionMarkersContainer>
    </div>
  );
};

export default MarkerContainer;
