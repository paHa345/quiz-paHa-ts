import { Fragment } from "react";
import styles from "./MainResult.module.css";

interface IMainResultProps {
  points: number;
}

const MainResult = ({ points }: IMainResultProps) => {
  return (
    <Fragment>
      <h1 className={styles.mainNotification}>
        Поздравляем, вы набрали баллов
      </h1>
      <p className={styles.mainResult}>{points}</p>
    </Fragment>
  );
};

export default MainResult;
