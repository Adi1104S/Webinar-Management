import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AllWebinars = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const res = await axios.get("http://localhost:5000/webinar/all");
        setWebinars(res.data.webinars || []);
      } catch (err) {
        toast.error("Failed to fetch webinars");
      } finally {
        setLoading(false);
      }
    };

    fetchWebinars();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Webinars</h1>

      {loading ? (
        <p>Loading webinars...</p>
      ) : webinars.length === 0 ? (
        <p className="text-gray-500">No webinars found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {webinars.map((webinar) => (
            <div key={webinar._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{webinar.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{webinar.description}</p>
              <p className="text-sm text-blue-500 mt-2">
                {new Date(webinar.date).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Speaker: {webinar.speaker?.name} ({webinar.speaker?.email})
              </p>
              <p className="text-sm text-gray-500">
                Host ID: {webinar.host}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllWebinars;
