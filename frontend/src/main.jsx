import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./lib/authProvider";
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
import ProtectedRoutes from "./lib/protectedRoutes";
import RootLayout from "./layout.jsx";
import SignInPage from "./auth/SignInPage";
import SignUpPage from "./auth/SignUpPage";
import ProfilePage from "./Components/Profile/ProfilePage";
import AdminProfile from "./admin/components/adminProfile";
import EditServicePage from "./services/EditServicePage";
import axios from "axios";
import { redirect } from "react-router-dom";
import Portfolio from "./services/CreatorProfile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
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
          { path: "/portfolio/:creatorId", element: <Portfolio /> },
          {
            path: "/services/edit/:serviceId",
            element: <EditServicePage />,
            loader: async ({ params }) => {
              const { data: user } = await axios
                .get(`${import.meta.env.VITE_BACKEND_URL}/api/me`, {
                  withCredentials: true,
                })
                .catch(() => {
                  throw redirect("/");
                });

              const { data: service } = await axios
                .get(
                  `${import.meta.env.VITE_BACKEND_URL}/api/services/${params.serviceId}`,
                  { withCredentials: true },
                )
                .catch(() => {
                  throw redirect("/");
                });

              if (service.creatorId !== user.uid) throw redirect("/");
              return service;
            },
          },
          { path: "/my/requests", element: <MyRequestsPage /> },
          { path: "/services/:serviceId", element: <ServicePage /> },
          { path: "/messages", element: <MessagesPage /> },
          { path: "/profile", element: <ProfilePage /> },
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
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <SignInPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
  </StrictMode>,
);
