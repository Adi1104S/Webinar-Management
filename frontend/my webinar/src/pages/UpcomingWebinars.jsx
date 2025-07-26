import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

// Utility function to get user object from localStorage
const getUser = () => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

const UpcomingWebinars = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(null); // holds webinar ID to confirm
  const [alertMessage, setAlertMessage] = useState(null); // for already registered or error

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const res = await axios.get("http://localhost:5000/webinar");
        const now = new Date();
        const upcoming = res.data.webinars.filter(
          (webinar) => new Date(webinar.date) > now
        );
        setWebinars(upcoming);
      } catch (err) {
        console.error("Error fetching webinars:", err);
        toast.error("Failed to load webinars");
      } finally {
        setLoading(false);
      }
    };

    fetchWebinars();
  }, []);

  const confirmAndRegister = async (webinarId) => {
    const user = getUser();

    if (!user) {
      toast.error("Please log in to register for a webinar.");
      setShowConfirm(null);
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/webinar/${webinarId}/register`, {
        userId: user._id,
      });

      if (res.data.message === "Already registered for this webinar") {
        setAlertMessage("You are already registered for this webinar.");
      } else {
        toast.success(res.data.message || "Registration successful!");
      }
    } catch (err) {
      setAlertMessage(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setShowConfirm(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-indigo-700">
          🚀 Upcoming Webinars
        </h1>

        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading webinars...</p>
        ) : webinars.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            📭 No upcoming webinars available. Check back later!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {webinars.map((webinar) => (
              <motion.div
                key={webinar._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl p-5 border border-gray-100"
              >
                <h2 className="text-xl font-semibold text-indigo-800">
                  {webinar.title}
                </h2>
                <p className="text-gray-600 mt-2">{webinar.description}</p>
                <p className="text-sm text-blue-500 mt-3">
                  📅 {new Date(webinar.date).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  🎤 Speaker: {webinar.speaker?.name}
                </p>

                <button
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                  onClick={() => setShowConfirm(webinar._id)}
                >
                  Register Now
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Registration
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to register for this webinar?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmAndRegister(showConfirm)}
                className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Modal */}
      {alertMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Notice</h2>
            <p className="text-gray-600 mb-6">{alertMessage}</p>
            <button
              onClick={() => setAlertMessage(null)}
              className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingWebinars;
