import styles from "./QuestionMarker.module.css";

interface QuestionMarkerProps {
  number: number;
  isCurrent: string;
}

const QuestionMarker = ({ number, isCurrent }: QuestionMarkerProps) => {
  const currentStyle = isCurrent === "true" ? styles.currentMarker : "";

  return (
    <div className={`${styles.questionMarker} ${currentStyle}`}>
      <p>{number}</p>
    </div>
  );
};

export default QuestionMarker;
