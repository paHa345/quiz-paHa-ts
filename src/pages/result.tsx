import ResultGame from "@/components/ResultGame/ResultGame";
import { IGameSlice } from "@/store/gameSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Result = () => {
  const router = useRouter();

  const resultStatus = useSelector(
    (state: IGameSlice) => state.gameState.resultGame
  );

  useEffect(() => {
    if (!resultStatus) {
      router.push("/");
    }
  }, []);

  return <ResultGame></ResultGame>;
};

export default Result;
