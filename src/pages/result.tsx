import { ILeadersData } from "@/components/LeaderBoards/LeaderBoardSComponent";
import InLeaderTable from "@/components/ResultGame/InLeaderTable";
import MainResult from "@/components/ResultGame/MainResult";
import { IAppStateSlice } from "@/store/app-stateSlice";
import { IGameSlice, gameActions } from "@/store/gameSlice";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Result = () => {
  const router = useRouter();

  const [getLeadersData, setGetLeadersData] = useState<any>(false);
  const [inLeaders, setInLeaders] = useState<any>(false);
  const [addResultToLeaderBoard, setAddResultToLeaderBoard] =
    useState<any>(false);

  const resultStatus = useSelector(
    (state: IGameSlice) => state.gameState.resultGame
  );
  const resultPoints = useSelector(
    (state: IGameSlice) => state.gameState.points
  );
  const currentGameName = useSelector(
    (state: IAppStateSlice) => state.appState.currentGamename
  );

  const userName = useSelector((state: IAppStateSlice) => state.appState.name);

  useEffect(() => {
    if (!resultStatus) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    console.log(currentGameName);

    async function getLeaderBoard() {
      const req = await fetch(`./api/leaderBoard/${currentGameName}`);
      const leadersData: ILeadersData = await req.json();

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

      console.log(sorted);

      if (resultPoints > sorted[sorted?.length - 1]?.points) {
        console.log("sheck");

        for (let i = 0; i < sorted.length; i++) {
          if (resultPoints > sorted[i].points) {
            sorted[i].points = String(resultPoints);
            sorted[i].name = userName;
            break;
          }
        }
        console.log(sorted);
        setAddResultToLeaderBoard(sorted);
        setInLeaders(true);
      } else {
        console.log("NOT");
      }
    }
  }, [getLeadersData]);

  return (
    <Fragment>
      {!getLeadersData && <div>Loading ...</div>}
      {getLeadersData && <MainResult points={resultPoints}></MainResult>}

      {inLeaders && (
        <InLeaderTable leadersData={addResultToLeaderBoard}></InLeaderTable>
      )}
    </Fragment>
  );
};

export default Result;
