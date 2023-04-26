import { Fragment, useEffect } from "react";
import styles from "./GoGame.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IGameSlice, gameActions } from "@/store/gameSlice";
import { IAppStateSlice } from "@/store/app-stateSlice";
import { useRouter } from "next/router";

const GoGame = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const currentQuestion = useSelector(
    (state: IGameSlice) => state.gameState.currentQuestion
  );

  const currentQuestionNumber = useSelector(
    (state: IGameSlice) => state.gameState.currentQuestionNumber
  );

  const questions = useSelector(
    (state: IGameSlice) => state.gameState.questions
  );

  const name = useSelector((state: IAppStateSlice) => state.appState.name);
  console.log(name);

  const currentGameName = useSelector(
    (state: IAppStateSlice) => state.appState.currentGamename
  );

  const inGameStatus = useSelector(
    (state: IGameSlice) => state.gameState.inGame
  );

  const gameStatus = useSelector(
    (state: IGameSlice) => state.gameState.startGame
  );

  console.log(gameStatus);

  const clickGoGameButtonHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(gameActions.setStartGameStatus(true));
  };

  useEffect(() => {
    if (!inGameStatus) {
      router.push("/");
    }
  });

  useEffect(() => {
    dispatch(gameActions.setCurrentQuestionNumber(0));

    if (questions) {
      dispatch(
        gameActions.setCurrentQuestion(
          questions?.questions[currentQuestionNumber]
        )
      );
    }
  }, [questions]);

  return (
    <Fragment>
      {!currentQuestion && <div className={styles.loading}>Загрузка...</div>}
      {currentQuestion && (
        <div className={styles.goGameContainer}>
          <div className={styles.mainTitle}>
            Если готовы начать игру, жмите на кнопку...
          </div>
          <div className={styles.buttonContainer}>
            <div
              onClick={clickGoGameButtonHandler}
              className={styles.cartOrderButton}
            >
              <a href="#">Начать игру</a>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default GoGame;
