import { useSelector } from "react-redux";
import styles from "./ChooseGame.module.css";
import { useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import {
  IAppStateSlice,
  appStateActions,
  fetchGameNames,
} from "@/store/app-stateSlice";
import { FetchStatus, IDBGameName, IDBGameQuestions } from "@/types";
import { IGameSlice, gameActions } from "@/store/gameSlice";
import { AppDispatch } from "@/store";

const ChooseGame = () => {
  const gamesNameArr = useSelector(
    (state: IAppStateSlice) => state.appState.gamesName
  );

  const fetchGameStatus = useSelector(
    (state: IAppStateSlice) => state.appState.fetchGameNamesStatus
  );
  const fetchError = useSelector(
    (state: IAppStateSlice) => state.appState.error
  );

  const dispatch = useDispatch<AppDispatch>();

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(appStateActions.setCurrentGameName(e.target.value));
  };

  const status = useSelector(
    (state: IAppStateSlice) => state.appState.fetchGameNamesStatus
  );

  let gamesNameOption;

  if (typeof gamesNameArr === "object") {
    gamesNameOption = gamesNameArr?.map((el) => {
      return (
        <option key={el.id} value={el.id}>
          {el.id}
        </option>
      );
    });
  }

  useEffect(() => {
    dispatch(fetchGameNames());
  }, [dispatch]);
  return (
    <Fragment>
      {fetchGameStatus === FetchStatus.Loading && (
        <div className={styles.loading}>Загрузка... </div>
      )}
      {fetchGameStatus === FetchStatus.Error && (
        <div className={styles.errorNotification}>
          <p className={styles.errorText}>{fetchError}</p>
        </div>
      )}

      {fetchGameStatus === FetchStatus.Resolve && (
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
