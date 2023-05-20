import { Fragment, useEffect } from "react";
import styles from "./ResultGame.module.css";
import { useSelector } from "react-redux";
import { IGameSlice, gameActions } from "@/store/gameSlice";
import { IAppStateSlice } from "@/store/app-stateSlice";
import MainResult from "./MainResult";
import InLeaderTable from "./InLeaderTable";
import { FetchStatus } from "@/types";
import { useDispatch } from "react-redux";
import BackToMainButton from "./BackToMainButton";
import AnswersTable from "./AnswersTable";
import { AppDispatch } from "@/store";
import {
  IleaderSlice,
  fetchLeaderBoardAndSetLeaders,
} from "@/store/leaderBoardSlice";

const ResultGame = () => {
  const dispatch = useDispatch<AppDispatch>();

  const resultPoints = useSelector(
    (state: IGameSlice) => state.gameState.points
  );
  const currentGameName = useSelector(
    (state: IAppStateSlice) => state.appState.currentGamename
  );
  const userName = useSelector((state: IAppStateSlice) => state.appState.name);
  const fetchStatus = useSelector(
    (state: IleaderSlice) => state.leaderState.fetchQuestionsStatus
  );
  const error = useSelector((state: IleaderSlice) => state.leaderState.error);
  const newLeaderBoard = useSelector(
    (state: IleaderSlice) => state.leaderState.newLeaderBoard
  );
  const mumberInLeaderBoard = useSelector(
    (state: IleaderSlice) => state.leaderState.numberInLeaderBoard
  );

  useEffect(() => {
    dispatch(gameActions.setInGameStatus(false));
    dispatch(gameActions.setStartGameStatus(false));

    if (currentGameName !== null) {
      dispatch(
        fetchLeaderBoardAndSetLeaders({
          currentGameName,
          points: resultPoints,
          userName,
        })
      );
    }
  }, []);

  return (
    <section className={styles.resultGameContainer}>
      <div className={styles.container}>
        <Fragment>
          {fetchStatus === FetchStatus.Loading && (
            <div className={styles.dataBNotification}>Загрузка ...</div>
          )}
          {fetchStatus === FetchStatus.Error && (
            <Fragment>
              <div className={styles.errorNotification}>{error}</div>
              <div>
                {" "}
                <BackToMainButton></BackToMainButton>
              </div>
            </Fragment>
          )}
          {fetchStatus === FetchStatus.Resolve && (
            <MainResult points={resultPoints}></MainResult>
          )}

          {newLeaderBoard && (
            <InLeaderTable
              numberInLeader={mumberInLeaderBoard}
              leadersData={newLeaderBoard}
            ></InLeaderTable>
          )}

          {fetchStatus === FetchStatus.Resolve && <AnswersTable></AnswersTable>}

          {fetchStatus === FetchStatus.Resolve && (
            <BackToMainButton></BackToMainButton>
          )}
        </Fragment>
      </div>
    </section>
  );
};

export default ResultGame;
