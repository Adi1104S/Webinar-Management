import { Users, Video } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const navItems = [
    {
      name: "Register Host",
      icon: <Users />,
      path: "/admin-dashboard/register-host",
    },
    {
      name: "Manage Users",
      icon: <Users />,
      path: "/admin-dashboard/manage-users",
    },
    {
      name: "All Webinars",
      icon: <Video />,
      path: "/admin-dashboard/webinars",
    },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
      <nav className="space-y-4">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 ${
                isActive ? "bg-gray-800" : ""
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
