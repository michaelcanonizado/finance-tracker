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
      className={twMerge("sticky left-0 top-0  flex border-b-[1px]", className)}
    >
      <div className="relative z-50 flex h-16 w-full items-center justify-between gap-6 bg-background px-4">
        <div className="mr-24">
          <span className="">Logo</span>
        </div>

        <LandingNavbarLinks className="hidden grow justify-between xl:flex" />

        <div className="relative block rounded p-5 transition-all hover:cursor-pointer xl:hidden">
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
      </div>

      <div className="block xl:hidden">
        <LandingNavbarLinks
          className={`absolute left-0 right-0 top-[100%] z-40 flex-col  p-4 transition-all duration-500 ${
            isOpen ? "translate-y-[0%]" : "translate-y-[-120%]"
          }`}
        />
        <label
          htmlFor="sidebar-drawer"
          aria-label="close sidebar"
          className={`min-w-screen absolute left-0 right-0 top-[100%] z-30 min-h-screen backdrop-blur-[2px] hover:cursor-pointer ${
            isOpen ? "block" : "hidden"
          }`}
        />
        <label
          htmlFor="sidebar-drawer"
          aria-label="close sidebar"
          className={`min-w-screen absolute left-0 right-0 top-[100%] z-30 min-h-screen bg-background opacity-40 hover:cursor-pointer ${
            isOpen ? "block" : "hidden"
          }`}
        />
      </div>
    </nav>
  );
};

export default LandingNavbar;
