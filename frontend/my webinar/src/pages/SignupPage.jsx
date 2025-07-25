import { useNavigate } from "react-router-dom";
import Signup from "../components/auth/Signup";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 px-4">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Create Your Account ✨
        </h2>
        <Signup onSubmit={handleSignup} />
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 font-medium hover:underline">
            Login here
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
