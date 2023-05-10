import styles from "./MainInfo.module.css";
import SetGameData from "./SetGameData";

const MainInfo = () => {
  return (
    <main>
      <section className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.bestProductsMain}>
            <SetGameData></SetGameData>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainInfo;
