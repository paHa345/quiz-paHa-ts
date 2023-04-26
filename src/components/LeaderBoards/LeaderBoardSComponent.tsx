import { Fragment, useEffect } from "react";
import styles from "./LeaderBoardSComponent.module.css";
import LeaderBoardSelector from "./LeaderBoardSelector";
import LeaderBoardTable from "./LeaderBoardTable";
import { useDispatch } from "react-redux";
import {
  leaderBoardStateActions,
  leaderBoardStateSlice,
} from "@/store/leaderBoardSlice";
import { useSelector } from "react-redux";
import { appStateActions } from "@/store/app-stateSlice";
import { gameActions } from "@/store/gameSlice";

export interface ILeadersData {
  id: string;
  _id: string;
  leaders: {
    name: string;
    points: string;
  }[];
}

export interface IleaderData {
  leaderState: {
    leadersData: {
      _id: string;
      id: string;
      leaders: {
        name: string;
        points: string;
      }[];
    }[];
    currentLeadersData: {
      _id: string;
      id: string;
      leaders: {
        name: string;
        points: string;
      }[];
    }[];
  };
}

const LederBoadsContainer = () => {
  const leaderData = useSelector(
    (state: IleaderData) => state.leaderState.leadersData
  );

  const currentLeaders = useSelector(
    (state: IleaderData) => state.leaderState.currentLeadersData
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
      console.log("sis");

      const req = await fetch("./api/leaderBoard/allGameLeaders");
      const LeadersData = await req.json();

      const leadersData: ILeadersData[] = LeadersData.items;

      dispatch(leaderBoardStateActions.setLeadersData(leadersData));
    }

    fetchLeadersData();
  }, [dispatch]);
  return (
    <section className={styles.leaderBoardContainer}>
      <div className={styles.container}>
        {!leaderData && <div className={styles.loadSpinner}>Loading...</div>}
        {leaderData && (
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
