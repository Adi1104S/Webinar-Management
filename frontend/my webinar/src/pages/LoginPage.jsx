import { useNavigate } from "react-router-dom";
import Login from "../components/auth/Login";
import toast from "react-hot-toast";

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
        // console.log(JSON.stringify(result.user.role))
        toast.success("Login successful");
        if(result.user.role=='user'){
          navigate("/");
        }
        else if(result.user.role=='admin'){
          navigate("/admin-dashboard");
        }
        else{
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
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <Login onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
