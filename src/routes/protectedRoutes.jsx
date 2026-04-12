import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return <Navigate to="/error" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
