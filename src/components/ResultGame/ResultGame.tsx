import { Fragment, useEffect, useState } from "react";
import styles from "./ResultGame.module.css";
import { useSelector } from "react-redux";
import { IGameSlice, gameActions } from "@/store/gameSlice";
import { IAppStateSlice, appStateActions } from "@/store/app-stateSlice";
import MainResult from "./MainResult";
import InLeaderTable from "./InLeaderTable";
import { ILeadersTableRequest } from "@/types";
import { useDispatch } from "react-redux";
import BackToMainButton from "./BackToMainButton";

const ResultGame = () => {
  const dispatch = useDispatch();
  const [getLeadersData, setGetLeadersData] = useState<any>(false);
  const [inLeaders, setInLeaders] = useState<any>(false);
  const [addResultToLeaderBoard, setAddResultToLeaderBoard] =
    useState<any>(false);

  const [numberInLeaderBoard, setNumberInLeaderBoard] = useState<any>();

  const resultPoints = useSelector(
    (state: IGameSlice) => state.gameState.points
  );
  const currentGameName = useSelector(
    (state: IAppStateSlice) => state.appState.currentGamename
  );

  const userName = useSelector((state: IAppStateSlice) => state.appState.name);

  useEffect(() => {
    console.log(currentGameName);
    dispatch(gameActions.setInGameStatus(false));
    dispatch(gameActions.setStartGameStatus(false));

    async function getLeaderBoard() {
      const req = await fetch(`./api/leaderBoard/${currentGameName}`);
      const leadersData: ILeadersTableRequest = await req.json();
      console.log(leadersData);

      setGetLeadersData(leadersData.item.leaders);
    }

    if (currentGameName) {
      getLeaderBoard();
    }
  }, []);

  useEffect(() => {
    if (getLeadersData) {
      console.log("get");

      const sorted = getLeadersData.sort(
        (
          a: { name: string; points: string },
          b: { name: string; points: string }
        ) => {
          return Number(b.points) - Number(a.points);
        }
      );

      if (resultPoints > sorted[sorted?.length - 1]?.points) {
        const leaderObj = {
          name: userName,
          points: String(resultPoints),
        };
        let index;
        for (let i = 0; i < sorted.length; i++) {
          if (resultPoints > sorted[i].points) {
            // sorted[i].points = String(resultPoints);
            // sorted[i].name = userName;
            setNumberInLeaderBoard(i);
            index = i;

            break;
          }
        }

        const first = sorted.slice(0, index);

        const secound = sorted.slice(index, sorted.length);

        const newLeaderBoard = [...first, leaderObj, ...secound];
        newLeaderBoard.splice(newLeaderBoard.length - 1, 1);


        setAddResultToLeaderBoard(newLeaderBoard);
        setInLeaders(true);
      } else {
        console.log("NOT");
      }
    }
  }, [getLeadersData]);

  return (
    <section className={styles.resultGameContainer}>
      <div className={styles.container}>
        <Fragment>
          {!getLeadersData && (
            <div style={{ padding: "5rem", fontSize: "3.2rem" }}>
              Loading ...
            </div>
          )}
          {getLeadersData && <MainResult points={resultPoints}></MainResult>}

          {inLeaders && (
            <InLeaderTable
              numberInLeader={numberInLeaderBoard}
              leadersData={addResultToLeaderBoard}
            ></InLeaderTable>
          )}
          {getLeadersData && <BackToMainButton></BackToMainButton>}
        </Fragment>
      </div>
    </section>
  );
};

export default ResultGame;
