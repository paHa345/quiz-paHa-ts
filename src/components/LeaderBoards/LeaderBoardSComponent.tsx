import { Fragment, useEffect } from "react";
import styles from "./LeaderBoardSComponent.module.css";
import LeaderBoardSelector from "./LeaderBoardSelector";
import LeaderBoardTable from "./LeaderBoardTable";
import { useDispatch } from "react-redux";
import {
  IleaderSlice,
  leaderBoardStateActions,
  leaderBoardStateSlice,
} from "@/store/leaderBoardSlice";
import { useSelector } from "react-redux";
import { appStateActions } from "@/store/app-stateSlice";
import { gameActions } from "@/store/gameSlice";
import { IDBLeaderBoard } from "@/types";

const LederBoadsContainer = () => {
  const leaderData = useSelector(
    (state: IleaderSlice) => state.leaderState.leadersData
  );

  const currentLeaders = useSelector(
    (state: IleaderSlice) => state.leaderState.currentLeadersData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appStateActions.setCurrentGameName(null));
    dispatch(gameActions.setStartGameStatus(false));
    dispatch(gameActions.setInGameStatus(false));
  }, [dispatch]);
  useEffect(() => {
    dispatch(leaderBoardStateActions.setLeadersData(null));
    dispatch(leaderBoardStateActions.setCurrentLeadersData(null));

    async function fetchLeadersData() {
      const req = await fetch("./api/leaderBoard/allGameLeaders");
      const LeadersData = await req.json();

      if (!req.ok) {
        dispatch(leaderBoardStateActions.setLeadersData(LeadersData.message));
        return;
      }

      if (LeadersData.message === "error") {
        dispatch(
          leaderBoardStateActions.setLeadersData("Не удалось получить данные")
        );
        return;
      }

      const leadersData: IDBLeaderBoard[] = LeadersData.items;
      dispatch(leaderBoardStateActions.setLeadersData(leadersData));
    }

    fetchLeadersData();
  }, [dispatch]);
  return (
    <section className={styles.leaderBoardContainer}>
      <div className={styles.container}>
        {!leaderData && <div className={styles.loadSpinner}>Loading...</div>}
        {typeof leaderData === "string" && (
          <div className={styles.errorDBNotification}> {leaderData} </div>
        )}
        {leaderData && typeof leaderData !== "string" && (
          <Fragment>
            <LeaderBoardSelector></LeaderBoardSelector>
            {currentLeaders && <LeaderBoardTable></LeaderBoardTable>}
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default LederBoadsContainer;
