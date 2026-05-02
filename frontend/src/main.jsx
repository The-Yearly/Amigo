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
const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
  },
  {
    path: "/create-service",
    element: <CreateServicePage />,
  },
  {
    path: "/services",
    element: <ExplorePage />, 
  },
  {
    path: "/my/services",
    element: <MyServicesPage />, 
  },
  {
    path: "/my/requests",
    element: <MyRequestsPage  />,
  },
  {
    path: "/services/:serviceId",
    element: <ServicePage />,
  },
  {
    path: "/messages",
    element: <div>Messages Page (to be implemented)</div>,
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
        path: "auditlogs",
        element: <AuditLog />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
