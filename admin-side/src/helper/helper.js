import { useSelector } from "react-redux";

export const CountVote = () => {
  const { chartData } = useSelector((state) => state.data);
  console.log(chartData);
};
