import LederBoadsContainer from "@/components/LeaderBoards/LeaderBoardSComponent";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type propsType = {
  name: string;
};

function LeaderBoard({ name }: propsType) {
  return <LederBoadsContainer></LederBoadsContainer>;
}

export async function getServerSideProps(context: any) {
  return {
    props: { name: "paHa" },
  };
}

export default LeaderBoard;
