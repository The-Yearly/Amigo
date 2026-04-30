import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import CuratorWorkspace from "./Components/CreateService/CuratorWorkspace.jsx";

const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />,
  },
  {
    path: "/CuratorWorkspace",
    element: <CuratorWorkspace />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
