import { Fragment, useEffect, useState } from "react";
import styles from "./InLeaderTable.module.css";
import { useSelector } from "react-redux";
import {
  ILeadersData,
  IleaderData,
} from "../LeaderBoards/LeaderBoardSComponent";
import { ILeaderTableUser } from "@/types";
import { IGameSlice } from "@/store/gameSlice";
import { IAppStateSlice } from "@/store/app-stateSlice";

interface lLeadersData {
  numberInLeader: number | undefined;
  leadersData:
    | {
        name: string;
        points: string;
      }[]
    | false;
}

const InLeaderTable = ({ leadersData, numberInLeader }: lLeadersData) => {
  const currentLeaderData = useSelector(
    (state: IleaderData) => state.leaderState.currentLeadersData
  );

  const currentGameNamer = useSelector(
    (state: IAppStateSlice) => state.appState.currentGamename
  );

  const [table, setTable] = useState<any>();
  const [successAddToDb, setSuccessAddToDb] = useState<boolean>(false);

  async function setNewLeaderBoardTable(leadersData: ILeaderTableUser[]) {
    const req = await fetch(`./api/leaderBoard/${currentGameNamer}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ leadersData }),
    });
    const data = await req.json();
    console.log(data);
    if (data.message === "success") {
      setSuccessAddToDb(true);
      setTimeout(() => {
        setSuccessAddToDb(false);
      }, 2000);
    }
  }

  useEffect(() => {
    if (leadersData) {
      const tableEl = [...leadersData]
        .sort((a, b) => {
          return Number(b.points) - Number(a.points);
        })
        .map((el, index) => {
          const currentUserResult =
            index === numberInLeader ? `${styles.currentResilt}` : ``;
          return (
            <tr className={currentUserResult} key={`${el.name}-${index}`}>
              <td>{el.name}</td>
              <td>{el.points}</td>
            </tr>
          );
        });
      setTable(tableEl);
      setNewLeaderBoardTable(leadersData);
    }
  }, []);

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
        <tbody>{table}</tbody>
      </table>
      {successAddToDb && (
        <h1 className={styles.notification}>
          Таблица лидеров успешно обновлена
        </h1>
      )}
    </Fragment>
  );
};
export default InLeaderTable;
