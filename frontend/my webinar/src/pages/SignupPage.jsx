import { useNavigate } from "react-router-dom";
import Signup from "../components/auth/Signup";
import toast from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        toast.success("Signup successful");
        navigate("/login");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Signup failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <Signup onSubmit={handleSignup} />
      </div>
    </div>
  );
};

export default SignupPage;