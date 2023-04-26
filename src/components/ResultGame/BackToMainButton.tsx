import { useRouter } from "next/router";
import styles from "./BackToMainButton.module.css";

const BackToMainButton = () => {
  const router = useRouter();
  const clickGoGameButtonHandler = () => {
    router.push("/");
  };
  return (
    <div onClick={clickGoGameButtonHandler} className={styles.cartOrderButton}>
      <a href="#">Вернуться на главную</a>
    </div>
  );
};

export default BackToMainButton;
