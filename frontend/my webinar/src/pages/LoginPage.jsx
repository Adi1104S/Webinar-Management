import { useNavigate } from "react-router-dom";
import Login from "../components/auth/Login";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success("Login successful");

        if (result.user.role === "user") {
          navigate("/");
        } else if (result.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/host-dashboard");
        }
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Login failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-600 px-4">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Welcome Back 👋
        </h2>
        <Login onSubmit={handleLogin} />
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
