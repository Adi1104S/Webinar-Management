import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, UserCircle2, Mail, ShieldCheck, Home } from "lucide-react";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-cyan-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition-all duration-300 hover:shadow-blue-300">
        <div className="flex flex-col items-center space-y-4">
          <UserCircle2 size={72} className="text-indigo-500" />
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>

          <div className="w-full">
            <div className="flex items-center text-gray-600 mb-3">
              <Mail className="mr-2 text-indigo-500" />
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-6">
              <ShieldCheck className="mr-2 text-green-500" />
              <span className="capitalize font-medium">{user.role}</span>
            </div>
          </div>

          <div className="flex space-x-4 w-full">
            <button
              onClick={handleGoHome}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 transition text-sm flex items-center justify-center"
            >
              <Home size={18} className="mr-2" />
              Go to Home
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 transition text-sm flex items-center justify-center"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
