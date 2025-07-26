import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HostLoginPage from "./pages/HostLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import HostDashboard from "./pages/HostDashboard";
import CreateWebinar from "./pages/CreateWebinar";
import HostWebinars from "./pages/HostWebinar";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import UpcomingWebinars from "./pages/UpcomingWebinars";
import OngoingWebinars from "./pages/OngoingWebinars";
import AccountPage from "./pages/AccountPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/host-login" element={<HostLoginPage />} />

        {/* User Routes */}
        <Route
          path="/user/upcoming-webinars"
          element={
            <ProtectedRoute element={<UpcomingWebinars />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/user/ongoing-webinars"
          element={
            <ProtectedRoute element={<OngoingWebinars />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/account"
          element={<ProtectedRoute element={<AccountPage />} allowedRoles={["user", "host", "admin"]} />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard/*"
          element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["admin"]} />}
        />

        {/* Host Dashboard */}
        <Route
          path="/host-dashboard/*"
          element={<ProtectedRoute element={<HostDashboard />} allowedRoles={["host"]} />}
        />
        <Route
          path="/host-dashboard/create-webinar"
          element={<ProtectedRoute element={<CreateWebinar />} allowedRoles={["host"]} />}
        />
        <Route
          path="/host-dashboard/host-webinars"
          element={<ProtectedRoute element={<HostWebinars />} allowedRoles={["host"]} />}
        />
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;