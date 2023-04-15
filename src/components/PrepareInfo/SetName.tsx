import styles from "./SetName.module.css";
import StartGameButton from "./StartGameButton";

const SetName = () => {
  return (
    <div className={styles.loginForm}>
      <div className={styles.loginFormElement}>
        <label htmlFor="name">Введите имя</label>
        <input id="name" required placeholder="Введите имя" />
      </div>
      <StartGameButton></StartGameButton>
    </div>
  );
};

export default SetName;
