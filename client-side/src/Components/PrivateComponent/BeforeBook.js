import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BeforeBook({ children }) {
  const { barber } = useSelector((state) => state.data);
  // console.log(barber, ">>>>>>>>>>>>>>>>>>");
  const location = useLocation();

  if (barber === 0) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }
  return children;
}
