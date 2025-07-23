import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreateWebinar = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    speakerName: "",
    speakerEmail: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = localStorage.getItem("user"); // assumes host ID is stored here
    const parsedUser = JSON.parse(userData);
    const hostId = parsedUser._id;
    // console.log(hostId)
    if (!hostId) {
      return toast.error("Host ID not found. Please log in.");
    }

    const payload = {
      title: form.title,
      description: form.description,
      date: form.date,
      speaker: {
        name: form.speakerName,
        email: form.speakerEmail,
      },
      host: hostId,
    };

    try {
      const res = await axios.post("http://localhost:5000/webinar", payload);
      toast.success("Webinar created successfully!");
      setForm({
        title: "",
        description: "",
        date: "",
        speakerName: "",
        speakerEmail: "",
      });
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to create webinar";
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4">Create a Webinar</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Webinar Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Webinar Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="speakerName"
          placeholder="Speaker Name"
          value={form.speakerName}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="speakerEmail"
          placeholder="Speaker Email"
          value={form.speakerEmail}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Webinar
        </button>
      </form>
    </div>
  );
};

export default CreateWebinar;
