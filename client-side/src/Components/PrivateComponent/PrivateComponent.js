import { useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetOrders } from "../../store/actionCreators/actionCreator";

export default function PrivateRouter({ children }) {
  const isAuthen = localStorage.getItem("access_token");
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetOrders(isAuthen));
  }, [dispatch, isAuthen]);

  const { loading } = useSelector((state) => state.client);
  const { userOrder } = useSelector((state) => state.data);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAuthen) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  if (
    userOrder.orders[userOrder.orders.length - 1].statusBarber === "Pending"
  ) {
    return <Navigate to="/payment" state={{ from: location }} replace />;
  }
  return children;
}
