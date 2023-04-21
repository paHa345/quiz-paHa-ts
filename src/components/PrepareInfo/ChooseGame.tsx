import { useSelector } from "react-redux";
import styles from "./ChooseGame.module.css";
import { IleaderData } from "../LeaderBoards/LeaderBoardSComponent";
import { useDispatch } from "react-redux";
import { leaderBoardStateActions } from "@/store/leaderBoardSlice";
import { Fragment, useEffect } from "react";
import { IAppStateSlice, appStateActions } from "@/store/app-stateSlice";

const ChooseGame = () => {
  //   const gamesLeaderBoard = useSelector(
  //     (state: IleaderData) => state.leaderState.leadersData
  //   );

  const gamesNameArr = useSelector(
    (state: IAppStateSlice) => state.appState.gamesName
  );

  console.log(gamesNameArr);

  const dispatch = useDispatch();

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(appStateActions.setCurrentGameName(e.target.value));
  };

  const gamesNameOption = gamesNameArr?.map((el) => {
    return (
      <option key={el.id} value={el.id}>
        {el.id}
      </option>
    );
  });

  useEffect(() => {
    async function fetchGamesName() {
      const req = await fetch("./api/getGamesName");
      const data = await req.json();

      dispatch(appStateActions.setGamesName(data.item));
    }
    fetchGamesName();
  }, [dispatch]);
  return (
    <Fragment>
      {!gamesNameArr && <div className={styles.loading}>Loading... </div>}
      {gamesNameArr && (
        <form className={styles.leadersForm}>
          <label className={styles.chooseGameLabel} htmlFor="gameSelect">
            Выберите игру
          </label>

          <select
            onChange={selectHandler}
            className={styles.leadersSelect}
            name="leaders"
            id="leaders-select"
          >
            <option className={styles.leadersOption} value="">
              - Выберите игру -
            </option>
            {gamesNameOption}
          </select>
        </form>
      )}
    </Fragment>
  );
};

export default ChooseGame;
