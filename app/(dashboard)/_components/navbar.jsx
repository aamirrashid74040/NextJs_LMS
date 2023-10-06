import React from "react";
import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "@/components/navbar-routes";

const Navbar = () => {
  return (
    <div className="h-full bg-white p-4 border-b shadow-sm flex items-center">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
