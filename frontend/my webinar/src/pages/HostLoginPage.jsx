import { useNavigate } from "react-router-dom";
import Login from "../components/auth/Login";
import toast from "react-hot-toast";

const HostLoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok && result.user.role === "host") {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success("Host login successful");
        // navigate("/host-dashboard"); // if you have one
      } else {
        toast.error("Access denied or invalid credentials");
      }
    } catch (err) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <Login onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default HostLoginPage;
