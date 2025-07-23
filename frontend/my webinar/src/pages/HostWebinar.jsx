import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const HostWebinars = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    date: "",
    speakerName: "",
    speakerEmail: "",
  });

  const fetchHostedWebinars = async () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return toast.error("User not found in localStorage");

      const { _id } = JSON.parse(userData);

      const res = await axios.get(`http://localhost:5000/webinar/host/${_id}`);
      setWebinars(res.data.webinars);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch hosted webinars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostedWebinars();
  }, []);

  const handleEdit = (webinar) => {
    setEditingId(webinar._id);
    setEditForm({
      title: webinar.title,
      description: webinar.description,
      date: webinar.date.slice(0, 16),
      speakerName: webinar.speaker.name,
      speakerEmail: webinar.speaker.email,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const payload = {
        title: editForm.title,
        description: editForm.description,
        date: editForm.date,
        speaker: {
          name: editForm.speakerName,
          email: editForm.speakerEmail,
        },
        host: userData._id,
      };

      await axios.put(`http://localhost:5000/webinar/${editingId}`, payload);
      toast.success("Webinar updated successfully");
      setEditingId(null);
      fetchHostedWebinars();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update webinar");
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading webinars...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-6">My Hosted Webinars</h2>

      {webinars.length === 0 ? (
        <p className="text-gray-500">No webinars hosted yet.</p>
      ) : (
        <ul className="space-y-6">
          {webinars.map((webinar) => (
            <li key={webinar._id} className="border p-4 rounded shadow-sm">
              {editingId === webinar._id ? (
                <form onSubmit={handleUpdate} className="space-y-3">
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    required
                    className="w-full border p-2 rounded"
                  />
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="datetime-local"
                    name="date"
                    value={editForm.date}
                    onChange={handleEditChange}
                    required
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="speakerName"
                    value={editForm.speakerName}
                    onChange={handleEditChange}
                    required
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="email"
                    name="speakerEmail"
                    value={editForm.speakerEmail}
                    onChange={handleEditChange}
                    required
                    className="w-full border p-2 rounded"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="bg-gray-400 text-white px-4 py-2 rounded"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="text-xl font-semibold">{webinar.title}</h3>
                  <p className="text-gray-600">{webinar.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Date: {new Date(webinar.date).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Speaker: {webinar.speaker.name} ({webinar.speaker.email})
                  </p>
                  <button
                    className="mt-4 inline-flex items-center gap-2 text-sm text-white bg-[#4200FF] hover:bg-[#3414cc] px-4 py-2 rounded-md transition duration-200"
                    onClick={() => handleEdit(webinar)}
                  >
                    Edit Webinar
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HostWebinars;
