import { useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function PrivateRouter({ children }) {
  const isAuthen = localStorage.getItem("access_token");
  const location = useLocation();

  const { userOrder } = useSelector((state) => state.data);
  console.log(userOrder);

  if (!isAuthen) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  if (
    userOrder.orders[userOrder.orders.length - 1].statusBarber === "Finished" ||
    userOrder.orders[userOrder.orders.length - 1].statusBarber === "Pending"
  ) {
    return <Navigate to="/payment" state={{ from: location }} replace />;
  }
  return children;
}
