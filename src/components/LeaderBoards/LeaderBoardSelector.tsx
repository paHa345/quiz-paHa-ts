import { useSelector } from "react-redux";
import styles from "./LeaderBoardSelector.module.css";
import { useDispatch } from "react-redux";
import {
  IleaderSlice,
  leaderBoardStateActions,
} from "@/store/leaderBoardSlice";
import React from "react";

const LeaderBoardSelector = () => {
  const gamesLeaderBoard = useSelector(
    (state: IleaderSlice) => state.leaderState.leadersData
  );

  const dispatch = useDispatch();

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(leaderBoardStateActions.setCurrentLeadersData(e.target.value));
  };

  const leaderBoardOption = gamesLeaderBoard?.map((el) => {
    return (
      <option key={el.id} value={el.id}>
        {el.id}
      </option>
    );
  });

  return (
    <form className={styles.leadersForm}>
      <label className={styles.selectTitle} htmlFor="city-select">
        Выберите название
      </label>
      <select
        onChange={selectHandler}
        className={styles.leadersSelect}
        name="leaders"
        id="leaders-select"
      >
        <option className={styles.leadersOption} value="">
          -- Выберите название --
        </option>
        {leaderBoardOption}
      </select>
    </form>
  );
};

export default LeaderBoardSelector;
