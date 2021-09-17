import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function PrivateRoute({ path, ...props }) {
  const { isUserLoggedin } = useAuth();

  return isUserLoggedin ? (
    <Route {...props} path={"/home"} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
