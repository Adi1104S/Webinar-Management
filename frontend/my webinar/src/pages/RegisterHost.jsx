import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import AdminSidebar from "../components/AdminSidebar";

const RegisterHost = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/admin/register-host",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Host registered successfully!");
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex">
      {/* <AdminSidebar /> */}
      <main className="flex-1 bg-gray-100 min-h-screen p-8">
        <h1 className="text-3xl font-semibold mb-6">Register New Host</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded p-6 max-w-lg"
        >
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Host Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Host Email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Register Host
          </button>
        </form>
      </main>
    </div>
  );
};

export default RegisterHost;
