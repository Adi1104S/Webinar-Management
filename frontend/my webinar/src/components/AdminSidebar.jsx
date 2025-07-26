import { Users, Video } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const navItems = [
    {
      name: "Register Host",
      icon: <Users size={20} />,
      path: "/admin-dashboard/register-host",
    },
    {
      name: "Manage Users",
      icon: <Users size={20} />,
      path: "/admin-dashboard/manage-users",
    },
    {
      name: "All Webinars",
      icon: <Video size={20} />,
      path: "/admin-dashboard/webinars",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white shadow-lg flex flex-col sticky top-0">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-3xl font-bold text-white">Admin Panel</h2>
        <p className="text-sm text-gray-400 mt-1">Control Center</p>
      </div>

      <nav className="flex-1 overflow-auto p-4 space-y-2">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 
              ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span className="text-base font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        &copy; 2025 Admin Panel
      </div>
    </aside>
  );
};

export default AdminSidebar;
