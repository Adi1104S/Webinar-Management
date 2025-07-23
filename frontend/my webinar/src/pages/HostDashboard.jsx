import React from "react";
import { Outlet } from "react-router-dom";
import HostSidebar from "../components/HostSidebar";

const HostDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <HostSidebar />
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-semibold mb-4">Welcome to Host Dashboard</h1>
        <Outlet /> {/* This is where nested routes will render */}
      </div>
    </div>
  );
};

export default HostDashboard;
