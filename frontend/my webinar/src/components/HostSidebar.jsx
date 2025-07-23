import { Link, useLocation } from "react-router-dom";
import { FaCalendarPlus, FaSignOutAlt, FaListUl } from "react-icons/fa";

const HostSidebar = () => {
  const location = useLocation();

  const navLinks = [
    {
      path: "/host-dashboard/create-webinar",
      label: "Create Webinar",
      icon: <FaCalendarPlus />,
    },
    {
      path: "/host-dashboard/host-webinars",
      label: "Webinars",
      icon: <FaListUl />,
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#4200FF] text-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6">Host Dashboard</h2>
        <nav className="space-y-4">
          {navLinks.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                location.pathname === path
                  ? "bg-white text-[#4200FF]"
                  : "hover:bg-[#5e3eff]"
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#5e3eff] text-left">
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default HostSidebar;
