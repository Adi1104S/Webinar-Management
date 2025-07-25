import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const UpcomingWebinars = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchWebinars();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Upcoming Webinars
      </h1>

      {loading ? (
        <p className="text-center">Loading webinars...</p>
      ) : webinars.length === 0 ? (
        <p className="text-center text-gray-500">No upcoming webinars.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {webinars.map((webinar) => (
            <motion.div
              key={webinar._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-lg p-5 shadow hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold">{webinar.title}</h2>
              <p className="text-gray-600 mt-1">{webinar.description}</p>
              <p className="text-sm mt-3 text-blue-500">
                {new Date(webinar.date).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Speaker: {webinar.speaker?.name}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingWebinars;
