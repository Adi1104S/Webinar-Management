import { useState } from "react";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, role: "host" };

    try {
      const res = await fetch("http://localhost:5000/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Host registered");
        setForm({ name: "", email: "", password: "" });
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Error registering host");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Register New Host</h2>
        <input
          type="text"
          name="name"
          placeholder="Host Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Host Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Register Host
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
