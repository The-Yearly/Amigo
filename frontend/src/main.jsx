import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ServicePage from "./services/ServicePage";
import ExplorePage from "./services/ExplorePage";
import MyServicesPage from "./services/MyServicesPage";
import MyRequestsPage from "./services/MyRequestsPage";
import Layout from "./admin/layout";
import AdminHome from "./admin/page";
import AdminFlagged from "./admin/flagged/page";
import ManageAdmins from "./admin/manageAdmins/page";
import AuditLog from "./admin/auditlog/page";
import CreateServicePage from "./services/CreateServicePage";
import MessagesPage from "./messaging/MessagesPage";
import SignUp from "./auth/page";
import RootLayout from "./layout.jsx";
import ProtectedRoute from "./ProtectedRoute";
import SignInPage from "./auth/SignInPage";
import SignUpPage from "./auth/SignUpPage";
import ProfilePage from "./Components/Profile/ProfilePage";
import AdminProfile from "./admin/components/adminProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        element: <RootLayout />,
        children: [
          { path: "/services", element: <ExplorePage /> },
          { path: "/create-service", element: <CreateServicePage /> },
          { path: "/my/services", element: <MyServicesPage /> },
          { path: "/my/requests", element: <MyRequestsPage /> },
          { path: "/services/:serviceId", element: <ServicePage /> },
          { path: "/messages", element: <MessagesPage /> },
          { path: "/profile", element: <ProfilePage /> },
        ],
      },
    ],
  },

  {
    path: "/signup",
    element: <SignUpPage />,
  },

  {
    path: "/login",
    element: <SignInPage />,
  },

  {
    path: "/adminSettings",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "flagged",
        element: <AdminFlagged />,
      },
      {
        path: "permissions",
        element: <ManageAdmins />,
      },
      {
        path: "adminProfile",
        element: <AdminProfile />,
      },
      {
        path: "auditlogs",
        element: <AuditLog />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={router} />,
  // </StrictMode>
);
