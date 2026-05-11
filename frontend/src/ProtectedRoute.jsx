// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const hasCookie = document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("token="));
  console.log("Checking for creds cookie:", hasCookie);
  if (!hasCookie) {
    // If no cookie, boot them to the authentication page
    return <Navigate to="/login" replace />;
  }

  // If the cookie exists, let them pass through to the protected routes
  return <Outlet />;
};

export default ProtectedRoute;
