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
import AccountPage from "./pages/AccountPage"; // ✅ Import your Account Page
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

        {/* Webinar View Pages (User) */}
        <Route path="/user/upcoming-webinars" element={<UpcomingWebinars />} />
        <Route path="/user/ongoing-webinars" element={<OngoingWebinars />} />

        {/* User Account Page (Protected) */}
        <Route
          path="/account"
          element={
            <ProtectedRoute
              element={<AccountPage />}
              allowedRoles={["user"]}
            />
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              allowedRoles={["admin"]}
            />
          }
        />

        {/* Host Dashboard */}
        <Route
          path="/host-dashboard/*"
          element={
            <ProtectedRoute
              element={<HostDashboard />}
              allowedRoles={["host"]}
            />
          }
        >
          <Route path="create-webinar" element={<CreateWebinar />} />
          <Route path="host-webinars" element={<HostWebinars />} />
        </Route>
      </Routes>

      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
