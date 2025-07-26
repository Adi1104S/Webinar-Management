import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const RegisterForm = ({ webinarId, close }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Get userId from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      setUserId(user._id);
    } else {
      toast.error("User not logged in");
      close();
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/webinar/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          webinarId,
          userId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Registered successfully!");
        close(); // close the modal
      } else {
        toast.error(data.message || "Failed to register");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Register for Webinar</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-3 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-3 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border mb-4 rounded"
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={close}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
