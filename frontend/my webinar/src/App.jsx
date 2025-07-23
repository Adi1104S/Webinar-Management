import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HostLoginPage from "./pages/HostLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import HostDashboard from "./pages/HostDashboard";
import CreateWebinar from "./pages/CreateWebinar";
import HostWebinars from "./pages/HostWebinar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/host-login" element={<HostLoginPage />} />

        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/host-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["host"]}
              element={<HostDashboard />}
            />
          }
        >
          {/* Nested route under /host-dashboard */}
          <Route path="create-webinar" element={<CreateWebinar />} />
          <Route
            path="/host-dashboard/host-webinars"
            element={
              <ProtectedRoute
                element={<HostWebinars />}
                allowedRoles={["host"]}
              />
            }
          />
        </Route>
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
