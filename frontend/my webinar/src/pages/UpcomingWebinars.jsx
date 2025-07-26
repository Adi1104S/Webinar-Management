import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import RegisterForm from "../components/RegisterForm";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

const UpcomingWebinars = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWebinar, setSelectedWebinar] = useState(null);

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
                  onClick={() => setSelectedWebinar(webinar._id)}
                >
                  Register Now
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {selectedWebinar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <RegisterForm
              webinarId={selectedWebinar}
              close={() => setSelectedWebinar(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingWebinars;
