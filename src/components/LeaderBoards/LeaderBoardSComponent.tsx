import styles from "./LeaderBoardSComponent.module.css";

const LederBoadsContainer = () => {
  return (
    <section className={styles.leaderBoardContainer}>
      <div className={styles.container}>
        <h1 className={styles.leaderBoardHeader}>Список лидеров</h1>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Количество баллов</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>paha345</td>
              <td>4</td>
            </tr>
            <tr>
              <td>paha345</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LederBoadsContainer;
