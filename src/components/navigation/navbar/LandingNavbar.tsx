import React, { useState } from "react";

import { twMerge } from "tailwind-merge";

import { X, Menu } from "lucide-react";

import DashboardSidebar from "../sidebar/DashboardSidebar";
import LandingNavbarLinks from "./LandingNavbarLinks";

const LandingNavbar = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((status) => !status);
  };

  return (
    <nav
      className={twMerge(
        "sticky top-0 flex h-16 w-full items-center justify-between border-b-[1px] bg-background px-4",
        className,
      )}
    >
      <div className="flex gap-6">
        <div className="">
          <span className="">Logo</span>
        </div>
        <LandingNavbarLinks className="hidden xl:flex" />
      </div>

      <div className="block xl:hidden">
        <div className="relative rounded p-5 transition-all hover:cursor-pointer">
          <label
            htmlFor="sidebar-drawer"
            aria-label="open sidebar"
            className="absolute inset-0 grid place-items-center hover:cursor-pointer"
          >
            <input
              id="sidebar-drawer"
              type="checkbox"
              onClick={toggleSidebar}
              className="absolute inset-0 opacity-0 hover:cursor-pointer"
            ></input>
            <X
              className={`absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] transition-all duration-300 ${
                isOpen ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
              }`}
            />
            <Menu
              className={`absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] transition-all duration-300 ${
                isOpen ? "rotate-[-90deg] opacity-0" : "rotate-0 opacity-100"
              }`}
            />
          </label>
        </div>
        <div className=" bg-blue-300">
          <LandingNavbarLinks
            className={`absolute left-0 right-0 top-[100%] z-50 flex-col  p-4 transition-all duration-100 ${
              isOpen ? "flex" : "hidden"
            }`}
          />
          <label
            htmlFor="sidebar-drawer"
            aria-label="close sidebar"
            className={`min-w-screen absolute left-0 right-0 top-[100%] z-40 min-h-screen backdrop-blur-[2px] hover:cursor-pointer ${
              isOpen ? "block" : "hidden"
            }`}
          />
          <label
            htmlFor="sidebar-drawer"
            aria-label="close sidebar"
            className={`min-w-screen absolute left-0 right-0 top-[100%] z-40 min-h-screen bg-background opacity-40 hover:cursor-pointer ${
              isOpen ? "block" : "hidden"
            }`}
          />
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
