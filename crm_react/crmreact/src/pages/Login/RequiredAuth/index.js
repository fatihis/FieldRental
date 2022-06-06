import { Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
  if (!true) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
