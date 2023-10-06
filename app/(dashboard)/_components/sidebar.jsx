import React from "react";
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto bg-white border-r shadow-sm ">
      <div className="p-6">
        <Logo />
      </div>
      <div className="w-full flex flex-col mt-1">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
