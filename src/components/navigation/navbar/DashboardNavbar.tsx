"use client";

import React, { useState } from "react";

import { twMerge } from "tailwind-merge";

import { X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

import DashboardSidebar from "../sidebar/DashboardSidebar";

const DashboardNavbar = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((status) => !status);
  };

  return (
    <nav
      className={twMerge(
        "flex h-16 items-center border-b-[1px] px-4",
        className,
      )}
    >
      <div className="block xl:hidden">
        <div className="relative rounded p-2 transition-all hover:bg-border">
          <input
            id="sidebar-drawer"
            type="checkbox"
            onClick={toggleSidebar}
            className="absolute inset-0 opacity-0 hover:cursor-pointer"
          ></input>
          <label htmlFor="sidebar-drawer" aria-label="open sidebar">
            <Menu className="h-6 w-6" />
          </label>
        </div>
        <div className="">
          <DashboardSidebar
            className={`min-w-screen absolute inset-0 z-50 transition-all duration-300 ${
              isOpen ? "translate-x-[0%]" : "translate-x-[-100%]"
            }`}
          />
          <label
            htmlFor="sidebar-drawer"
            aria-label="close sidebar"
            className={`min-w-screen absolute inset-0 z-40 min-h-screen backdrop-blur-[2px] hover:cursor-pointer ${
              isOpen ? "block" : "hidden"
            }`}
          />
          <label
            htmlFor="sidebar-drawer"
            aria-label="close sidebar"
            className={`min-w-screen absolute inset-0 z-40 min-h-screen bg-background opacity-40 hover:cursor-pointer ${
              isOpen ? "block" : "hidden"
            }`}
          />
        </div>
      </div>

      <div className=""></div>
    </nav>
  );
};

export default DashboardNavbar;
