import styies from "./MainResult.module.css";

interface IMainResultProps {
  points: number;
}

const MainResult = ({ points }: IMainResultProps) => {
  return <div>Поздравляем, вы набрали баллов {points}</div>;
};

export default MainResult;
