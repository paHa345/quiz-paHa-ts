import styles from "./MainInfo.module.css";
import SetName from "./SetName";

const MainInfo = () => {
  return (
    <main>
      <section>
        <div className={styles.container}>
          <div className={styles.bestProductsMain}>
            <h2 className={styles.bestProductH2}>Викторина</h2>
            <SetName></SetName>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainInfo;
