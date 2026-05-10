import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";

const ProtectedRoutes = () => {
  const { user, loading } = useAuth();
  console.log(user)
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? <Outlet /> : <Navigate to="/signup" replace />;
};

export default ProtectedRoutes;