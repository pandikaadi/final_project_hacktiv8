import { useLocation, Navigate } from "react-router-dom";

export default function AfterLogin({ children }) {
  const isAuthen = localStorage.getItem("access_token");
  const location = useLocation();

  if (isAuthen) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
