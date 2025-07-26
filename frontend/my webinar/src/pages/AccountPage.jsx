import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goHome = () => {
    navigate("/");
  };

  if (!user) return null;

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[370px] text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          Welcome, {capitalize(user.role)}
        </h1>

        <div className="text-left mb-6 text-gray-700 space-y-2">
          <p><strong>Email:</strong> {user.email || "N/A"}</p>
          <p><strong>Role:</strong> {capitalize(user.role)}</p>
        </div>

        <button
          onClick={goHome}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl w-full mb-3"
        >
          Go to Home
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
