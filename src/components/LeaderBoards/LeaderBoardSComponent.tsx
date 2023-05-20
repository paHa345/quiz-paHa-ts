import { Fragment, useEffect } from "react";
import styles from "./LeaderBoardSComponent.module.css";
import LeaderBoardSelector from "./LeaderBoardSelector";
import LeaderBoardTable from "./LeaderBoardTable";
import { useDispatch } from "react-redux";
import {
  IleaderSlice,
  fetchAllGameLeaderBoard,
  leaderBoardStateActions,
} from "@/store/leaderBoardSlice";
import { useSelector } from "react-redux";
import { appStateActions } from "@/store/app-stateSlice";
import { gameActions } from "@/store/gameSlice";
import { FetchStatus, IDBLeaderBoard } from "@/types";
import { AppDispatch } from "@/store";

const LederBoadsContainer = () => {
  const currentLeaders = useSelector(
    (state: IleaderSlice) => state.leaderState.currentLeadersData
  );

  const fetchStatus = useSelector(
    (state: IleaderSlice) => state.leaderState.fetchQuestionsStatus
  );

  const error = useSelector((state: IleaderSlice) => state.leaderState.error);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(appStateActions.setCurrentGameName(null));
    dispatch(gameActions.setStartGameStatus(false));
    dispatch(gameActions.setInGameStatus(false));
  }, [dispatch]);
  useEffect(() => {
    dispatch(leaderBoardStateActions.setLeadersData(null));
    dispatch(leaderBoardStateActions.setCurrentLeadersData(null));
    dispatch(fetchAllGameLeaderBoard());
  }, [dispatch]);
  return (
    <div className={styles.mainLeaderBoard}>
      <section className={styles.leaderBoardContainer}>
        <div className={styles.container}>
          {fetchStatus === FetchStatus.Loading && (
            <div className={styles.dataBNotification}>Загрузка...</div>
          )}
          {fetchStatus === FetchStatus.Error && (
            <div className={styles.dataBNotification}> {error} </div>
          )}
          {fetchStatus === FetchStatus.Resolve && (
            <Fragment>
              <LeaderBoardSelector></LeaderBoardSelector>
              {currentLeaders && <LeaderBoardTable></LeaderBoardTable>}
            </Fragment>
          )}
        </div>
      </section>
    </div>
  );
};

export default LederBoadsContainer;
