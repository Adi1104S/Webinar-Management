import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center p-6 shadow bg-white sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-indigo-700">
        WebinarPro
      </Link>

      {user ? (
        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="text-indigo-700 text-2xl"
          >
            <FaUserCircle />
          </button>
          {openMenu && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-52 z-50 border text-sm">
              <Link to="/account" className="block px-4 py-2 hover:bg-gray-100">
                👤 My Account
              </Link>
              <Link
                to="/user/upcoming-webinars"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                📅 Upcoming Webinars
              </Link>
              <Link
                to="/user/ongoing-webinars"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                🚀 Ongoing Webinars
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                🔓 Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <nav className="space-x-4 text-sm font-medium">
          <Link to="/login" className="text-gray-700 hover:text-indigo-700">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Sign Up
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
