import { Fragment, useState } from "react";
import styles from "./InLeaderTable.module.css";
import { useSelector } from "react-redux";
import {
  ILeadersData,
  IleaderData,
} from "../LeaderBoards/LeaderBoardSComponent";

interface lLeadersData {
  leadersData:
    | {
        name: string;
        points: string;
      }[]
    | false;
}

const InLeaderTable = ({ leadersData }: lLeadersData) => {
  const currentLeaderData = useSelector(
    (state: IleaderData) => state.leaderState.currentLeadersData
  );

  console.log(leadersData);
  let tableEl;

  if (leadersData) {
    tableEl = [...leadersData]
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
    console.log(tableEl);
  }

  return (
    <Fragment>
      <h1 className={styles.leaderBoardHeader}>
        И заняли почётной место в таблице лидеров
      </h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Количество баллов</th>
          </tr>
        </thead>
        <tbody>{tableEl}</tbody>
      </table>
    </Fragment>
  );
};
export default InLeaderTable;
