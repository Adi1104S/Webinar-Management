import { Routes, Route } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import RegisterHost from "./RegisterHost";
import ManageUsers from "./ManageUsers.jsx";
import AllWebinars from "./AllWebinars.jsx";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen p-8">
        <Routes>
          <Route
            path=""
            element={
              <div className="flex flex-col items-start justify-center h-full">
                <h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome, Admin 🎉</h1>
                <p className="text-lg text-gray-700">
                  Use the sidebar to navigate between features like managing users, viewing webinars,
                  or registering new hosts.
                </p>
                <div className="mt-6">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Admin Illustration"
                    className="w-40 h-40 rounded-full border-4 border-blue-400 shadow-lg"
                  />
                </div>
              </div>
            }
          />
          <Route path="register-host" element={<RegisterHost />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="webinars" element={<AllWebinars />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
