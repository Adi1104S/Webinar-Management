import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const HomePage = () => {
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
    <div className="bg-white text-gray-800">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 shadow-md bg-white sticky top-0 z-50">
        <Link to="/" className="text-2xl font-bold text-indigo-700">
          WebinarPro
        </Link>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setOpenMenu((prev) => !prev)}
              className="text-indigo-700 text-2xl"
            >
              <FaUserCircle />
            </button>
            {openMenu && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-52 z-50 border text-sm">
                <Link
                  to="/account"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
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

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="min-h-[80vh] bg-gradient-to-br from-indigo-700 to-purple-800 text-white flex flex-col items-center justify-center px-6 text-center py-20"
      >
        <motion.h1
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
        >
          Host, Manage & Scale <br /> Your Webinars Seamlessly
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl max-w-2xl mb-6"
        >
          A powerful platform built for simplicity and speed. Whether you're an
          admin, host, or participant—WebinarPro makes it easy.
        </motion.p>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/login"
            className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.section>

      {/* Info Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose WebinarPro?</h2>
        <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
          Everything you need to deliver successful webinars, workshops,
          lectures, or live training—all in one platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            title="Quick Setup"
            desc="Create and publish webinars in less than a minute."
          />
          <FeatureCard
            title="Role-based Dashboard"
            desc="Separate dashboards for admin, host, and users ensure secure control."
          />
          <FeatureCard
            title="Live Management"
            desc="View, edit, and manage your webinars in real-time."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 text-center">
        <div className="max-w-5xl mx-auto space-y-3">
          <p className="text-lg font-semibold">WebinarPro</p>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} WebinarPro. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">Built with ❤️ using React</p>
        </div>
      </footer>
    </div>
  );
};

// Info box component
const FeatureCard = ({ title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl transition"
  >
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
);

export default HomePage;
