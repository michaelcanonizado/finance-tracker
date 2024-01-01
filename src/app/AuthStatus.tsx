"use client";

import React from "react";

import { usePathname } from "next/navigation";

import LandingNavbar from "@/components/navigation/navbar/LandingNavbar";
import DashboardNavbar from "@/components/navigation/navbar/DashboardNavbar";
import DashboardSidebar from "@/components/navigation/sidebar/DashboardSidebar";

const AuthStatus = ({
  children,
  shadcnTheme,
}: {
  children: React.ReactNode;
  shadcnTheme: string;
}) => {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <div className={`${shadcnTheme}`}>
        <LandingNavbar className="" />
        {children}
      </div>
    );
  }

  return (
    <div className={`flex ${shadcnTheme}`}>
      <DashboardSidebar className="hidden min-w-64 xl:flex" />
      <div className="grow">
        <DashboardNavbar className="" />
        {children}
      </div>
    </div>
  );
};

export default AuthStatus;
