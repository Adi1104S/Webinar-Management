import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const roles = ["user", "host", "admin"];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("all");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/registration", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.users);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/registration/update/${userId}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Role updated successfully");
      fetchUsers(); // Refresh user list
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers =
    selectedRole === "all"
      ? users
      : users.filter((user) => user.role === selectedRole);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Role:</label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border rounded p-1"
        >
          <option value="all">All</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value)
                    }
                    className="border rounded p-1"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No users with role "{selectedRole}" found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
