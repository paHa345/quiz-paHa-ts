import { Fragment, useEffect, useState } from "react";
import styles from "./InLeaderTable.module.css";
import { useSelector } from "react-redux";

import { FetchStatus, ILeaderTableUser } from "@/types";
import { IAppStateSlice } from "@/store/app-stateSlice";
import { IleaderSlice, patchNewLeadersData } from "@/store/leaderBoardSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import Image from "next/image";

interface lLeadersData {
  numberInLeader: number;
  leadersData: ILeaderTableUser[];
}

const InLeaderTable = ({ leadersData, numberInLeader }: lLeadersData) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentGameName = useSelector(
    (state: IAppStateSlice) => state.appState.currentGamename
  );
  const patchStatus = useSelector(
    (state: IleaderSlice) => state.leaderState.patchLeaderStatus
  );
  const [table, setTable] = useState<JSX.Element[]>();

  useEffect(() => {
    if (currentGameName) {
      dispatch(
        patchNewLeadersData({ currentGameName, leadersData, numberInLeader })
      );
    }

    if (leadersData) {
      const tableEl = [...leadersData]
        .sort((a, b) => {
          return Number(b.points) - Number(a.points);
        })
        .map((el, index) => {
          const currentUserResult =
            index === numberInLeader ? `${styles.currentResilt}` : ``;
          let icon: string = "";
          let bestClass: string = ``;

          switch (index) {
            case 0:
              icon = "sun";
              break;
            case 1:
              icon = "moon";
              break;
            case 2:
              icon = "jupiter";
              break;
            default:
              break;
          }
          if (index > 2) {
            icon = "galaxy";
          }

          bestClass = index < 3 ? `${"bestClass"}` : "";
          console.log(bestClass);
          return (
            <div
              key={`${el.name}-${index}`}
              className={`${currentUserResult} ${styles.leaderBoardElement} ${
                index < 3 ? `${styles.bestClass}` : ""
              }`}
            >
              <div className={styles.leaderBoardElementIcon}>
                <Image
                  height={50}
                  width={50}
                  src={`/${icon}.png`}
                  alt="placeLogo"
                ></Image>
              </div>
              <div className={styles.leaderBoardElementMain}>
                <div className={styles.leaderBoardElementName}>{el.name}</div>
                <div className={styles.leaderBoardElementPoint}>
                  Очков: {el.points}
                </div>
              </div>
              <div className={styles.leaderBoardElementPlace}>{index + 1}</div>
            </div>
          );
        });
      setTable(tableEl);
    }
  }, []);

  useEffect(() => {});

  return (
    <Fragment>
      <h1 className={styles.leaderBoardHeader}>
        И заняли почётное место в таблице лидеров
      </h1>

      <div className={styles.leaderBoardTableContainer}>{table}</div>

      {patchStatus === FetchStatus.Loading && (
        <h1 className={styles.notification}>
          Обновление таблицы лидеров на сервере
        </h1>
      )}
      {patchStatus === FetchStatus.Resolve && (
        <h1 className={styles.resolveNotification}>
          Таблица лидеров успешно обновлена
        </h1>
      )}
      {patchStatus === FetchStatus.Error && (
        <h1 className={styles.errorNotification}>
          Не удалось обновить таблицу. Ошибка сервера
        </h1>
      )}
    </Fragment>
  );
};
export default InLeaderTable;
