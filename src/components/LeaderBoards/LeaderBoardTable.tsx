import { Fragment } from "react";
import styles from "./LeaderBoardTable.module.css";
import { useSelector } from "react-redux";
import { IleaderData } from "./LeaderBoardSComponent";

const LeaderBoardTable = () => {
  const currentLeaderData = useSelector(
    (state: IleaderData) => state.leaderState.currentLeadersData
  );

  const table = [...currentLeaderData[0].leaders]
    .sort((a, b) => {
      return Number(b.points) - Number(a.points);
    })
    .map((el) => {
      return (
        <tr key={el.name}>
          <td>{el.name}</td>
          <td>{el.points}</td>
        </tr>
      );
    });

  return (
    <Fragment>
      <h1 className={styles.leaderBoardHeader}>Список лидеров</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Количество баллов</th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </table>
    </Fragment>
  );
};
export default LeaderBoardTable;
