import { Fragment, useEffect, useState } from "react";
import styles from "./InLeaderTable.module.css";
import { useSelector } from "react-redux";

import { ILeaderTableUser } from "@/types";
import { IAppStateSlice } from "@/store/app-stateSlice";
import { IleaderSlice } from "@/store/leaderBoardSlice";

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
    (state: IleaderSlice) => state.leaderState.currentLeadersData
  );

  const currentGameName = useSelector(
    (state: IAppStateSlice) => state.appState.currentGamename
  );

  const [table, setTable] = useState<JSX.Element[]>();
  const [successAddToDb, setSuccessAddToDb] = useState<boolean>(false);

  async function setNewLeaderBoardTable(leadersData: ILeaderTableUser[]) {
    const req = await fetch(`./api/leaderBoard/${currentGameName}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ leadersData, serverSecret: process.env.SECRET }),
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
