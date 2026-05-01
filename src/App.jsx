// App.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import ServicePage from "@/services/ServicePage";
import MessagesPage from "@/messaging/MessagesPage";
import DashboardPage from "@/dashboard/DashboardPage";
import Layout from "./admin/adminSettings/layout";
import AdminHome from "./admin/adminSettings/page";
import AdminFlagged from "./admin/flagged/page";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/service" element={<ServicePage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/adminSettings" element={<Layout />}>
        <Route index element={<AdminHome />} />
        <Route path="flagged" element={<AdminFlagged />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
