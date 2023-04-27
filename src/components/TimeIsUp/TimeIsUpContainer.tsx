import { Fragment } from "react";
import styles from "./TimeIsUpContainer.module.css";

const Backdrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalOverlay = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.tytleContent}>
          <div>Время вышло. Загрузка...</div>
        </div>
      </div>
    </div>
  );
};

const TimeIsUpContainer = () => {
  return (
    <Fragment>
      <Backdrop></Backdrop>
      <ModalOverlay></ModalOverlay>
    </Fragment>
  );
};

export default TimeIsUpContainer;
