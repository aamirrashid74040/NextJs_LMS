import React from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";
const DashboardLayout = ({ children }) => {
  return (
    <div className="h-full">
      <div className={`h-[80px] md:pl-56 w-full fixed inset-y-0 z-50`}>
        <Navbar />
      </div>
      <div className="hidden md:flex flex-col h-full w-56 fixed z-50">
        <Sidebar />
      </div>
      <main className={`pt-[80px] md:pl-56 h-full`}>{children}</main>
    </div>
  );
};

export default DashboardLayout;
