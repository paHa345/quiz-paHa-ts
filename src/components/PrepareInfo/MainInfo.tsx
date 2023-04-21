import styles from "./MainInfo.module.css";
import SetGameData from "./SetGameData";

const MainInfo = () => {
  return (
    <main>
      <section>
        <div className={styles.container}>
          <div className={styles.bestProductsMain}>
            <h2 className={styles.bestProductH2}>Викторина</h2>
            <SetGameData></SetGameData>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainInfo;
