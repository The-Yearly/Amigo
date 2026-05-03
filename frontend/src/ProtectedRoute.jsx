// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if your specific cookie exists in the browser.
  // (Replace 'your_cookie_name' with your actual auth cookie name)
  const hasCookie = document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("creds="));

  if (!hasCookie) {
    // If no cookie, boot them to the authentication page
    return <Navigate to="/signup" replace />;
  }

  // If the cookie exists, let them pass through to the protected routes
  return <Outlet />;
};

export default ProtectedRoute;
