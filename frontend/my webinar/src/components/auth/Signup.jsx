import { useState } from "react";

const Signup = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "", // no default
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">Signup</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        value={formData.name}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        value={formData.email}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        value={formData.password}
        required
      />

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="" disabled>Select role</option>
        <option value="user">User</option>
        <option value="host">Host</option>
      </select>

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
        Signup
      </button>
    </form>
  );
};

export default Signup;
