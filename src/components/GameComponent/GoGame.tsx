import { Fragment, useEffect } from "react";
import styles from "./GoGame.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  IGameSlice,
  fetchQuestionsAndSetCurrent,
  gameActions,
} from "@/store/gameSlice";
import { IAppStateSlice } from "@/store/app-stateSlice";
import { useRouter } from "next/router";
import { AppDispatch } from "@/store";
import { FetchStatus } from "@/types";
import BackToMainButton from "../ResultGame/BackToMainButton";

const GoGame = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const questions = useSelector(
    (state: IGameSlice) => state.gameState.questions
  );

  const name = useSelector((state: IAppStateSlice) => state.appState.name);

  const currentGameName = useSelector(
    (state: IAppStateSlice) => state.appState.currentGamename
  );

  const inGameStatus = useSelector(
    (state: IGameSlice) => state.gameState.inGame
  );

  const gameStatus = useSelector(
    (state: IGameSlice) => state.gameState.startGame
  );

  const fetchQuestionsStatus = useSelector(
    (state: IGameSlice) => state.gameState.fetchQuestionsStatus
  );

  const fetchError = useSelector((state: IGameSlice) => state.gameState.error);

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
    if (currentGameName) {
      dispatch(fetchQuestionsAndSetCurrent(currentGameName));
    }
  }, []);

  return (
    <Fragment>
      <section className={styles.goGameSection}>
        <div className={styles.goGameMain}>
          <div className={styles.goGameContainer}>
            {fetchQuestionsStatus === FetchStatus.Loading && (
              <div className={styles.loading}>
                <div className={styles.loadingText}>Загрузка...</div>
              </div>
            )}
            {fetchQuestionsStatus === FetchStatus.Resolve && (
              <>
                <div className={styles.mainTitle}>
                  Тест состоит из {questions?.questions.length} вопросов. За
                  правильный ответ на вопрос начисляется 50 баллов. Кроме этого
                  за правильный ответ на вопрос добавляются дополнительные
                  баллы, количество которых уменьшается со временем.
                  <br></br>
                  <br></br>
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
              </>
            )}
            {fetchQuestionsStatus === FetchStatus.Error && (
              <Fragment>
                <div className={styles.loading}>
                  <div className={styles.loadingText}>
                    {fetchError}
                    <br></br>
                    Вернитесь на главную страницу или обновите страницу и
                    повторите попытку позднее
                  </div>
                </div>
                <div className={styles.backButtonContainer}>
                  <BackToMainButton></BackToMainButton>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default GoGame;
