import { useLocation, Navigate } from "react-router-dom";

export default function BeforeLogin({ children }) {
  const isAuthen = localStorage.getItem("access_token");
  const location = useLocation();

  if (!isAuthen) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
}
