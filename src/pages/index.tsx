// import Image from "next/image";
// import { Inter } from "next/font/google";

import MainInfo from "@/components/PrepareInfo/MainInfo";
import { appStateActions } from "@/store/app-stateSlice";
import { gameActions } from "@/store/gameSlice";
import { useDispatch } from "react-redux";

// const inter = Inter({ subsets: ["latin"] });

function HomePage() {
  const dispatch = useDispatch();

  dispatch(gameActions.setResultGameStatus(false));

  return <MainInfo></MainInfo>;
}

export default HomePage;
