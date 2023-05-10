import { Fragment } from "react";
import styles from "./LeaderBoardTable.module.css";
import { useSelector } from "react-redux";
import { IleaderSlice } from "@/store/leaderBoardSlice";
import Image from "next/image";

const LeaderBoardTable = () => {
  const currentLeaderData = useSelector(
    (state: IleaderSlice) => state.leaderState.currentLeadersData
  );

  const table = [...currentLeaderData[0].leaders]
    .sort((a, b) => {
      return Number(b.points) - Number(a.points);
    })
    .map((el, index) => {
      let icon: string = "";

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

      return (
        <div key={`${el.name}-${index}`} className={styles.leaderBoardElement}>
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

  return (
    <Fragment>
      <h1 className={styles.leaderBoardHeader}>Список лидеров</h1>

      <div className={styles.leaderBoardTableContainer}>{table}</div>
    </Fragment>
  );
};
export default LeaderBoardTable;
