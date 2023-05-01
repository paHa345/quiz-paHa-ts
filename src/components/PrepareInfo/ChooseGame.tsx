import { useSelector } from "react-redux";
import styles from "./ChooseGame.module.css";
import { useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import { IAppStateSlice, appStateActions } from "@/store/app-stateSlice";
import { IDBGameName, IDBGameQuestions } from "@/types";

const ChooseGame = () => {
  //   const gamesLeaderBoard = useSelector(
  //     (state: IleaderData) => state.leaderState.leadersData
  //   );

  const gamesNameArr = useSelector(
    (state: IAppStateSlice) => state.appState.gamesName
  );

  const dispatch = useDispatch();

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(appStateActions.setCurrentGameName(e.target.value));
  };

  let gamesNameOption;

  if (typeof gamesNameArr === "object") {
    gamesNameOption = gamesNameArr?.map((el) => {
      console.log(el);

      return (
        <option key={el.id} value={el.id}>
          {el.id}
        </option>
      );
    });
  }

  useEffect(() => {
    async function fetchGamesName() {
      const req = await fetch("./api/getGamesName");
      const data: IDBGameName = await req.json();
      // console.log(data.item[0].id);
      if (!req.ok) {
        dispatch(appStateActions.setGamesName(data.message));
        return;
      }

      dispatch(appStateActions.setGamesName(data.item));
    }
    fetchGamesName();
  }, [dispatch]);
  return (
    <Fragment>
      {!gamesNameArr && <div className={styles.loading}>Загрузка... </div>}
      {typeof gamesNameArr === "string" && (
        <div className={styles.errorNotification}>
          <p className={styles.errorText}>{gamesNameArr}</p>
        </div>
      )}

      {gamesNameArr && typeof gamesNameArr !== "string" && (
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
