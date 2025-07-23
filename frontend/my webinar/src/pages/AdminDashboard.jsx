import { Routes, Route } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import RegisterHost from "./RegisterHost";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 bg-gray-100 min-h-screen p-8">
        <Routes>
          <Route
            path=""
            element={
              <>
                <h1 className="text-3xl font-semibold mb-6">Welcome, Admin</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <DashboardCard title="Hosts" value="12" />
                  <DashboardCard title="Total Users" value="1,250" />
                  <DashboardCard title="Sessions" value="3,870" />
                </div>
              </>
            }
          />
          <Route path="register-host" element={<RegisterHost />} />
        </Routes>
      </main>
    </div>
  );
};

const DashboardCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AdminDashboard;
