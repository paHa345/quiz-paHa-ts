import { Fragment } from "react";
import styles from "./LeaderBoardTable.module.css";
import { useSelector } from "react-redux";
import { IleaderSlice } from "@/store/leaderBoardSlice";

const LeaderBoardTable = () => {
  const currentLeaderData = useSelector(
    (state: IleaderSlice) => state.leaderState.currentLeadersData
  );

  const table = [...currentLeaderData[0].leaders]
    .sort((a, b) => {
      return Number(b.points) - Number(a.points);
    })
    .map((el, index) => {
      return (
        <tr key={`${el.name}-${index}`}>
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
