// App.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import ServicePage from "@/services/ServicePage";
import MessagesPage from "@/messaging/MessagesPage";
import DashboardPage from "@/dashboard/DashboardPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/service" element={<ServicePage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
