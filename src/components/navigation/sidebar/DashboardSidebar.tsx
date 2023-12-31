import React from "react";

import { twMerge } from "tailwind-merge";

import { LayoutPanelLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardSidebar = ({ className }: { className?: string }) => {
  const user = "user";

  const sidebarRoutes = [
    { title: "Accounts", href: `/${user}/accounts` },
    { title: "Payments", href: `/${user}/payments` },
    { title: "Balances", href: `/${user}/balances` },
    { title: "Reports", href: `/${user}/reports` },
  ];

  return (
    <aside
      className={twMerge(
        "min-h-screen w-64 flex-col border-r-[1px] bg-background px-4",
        className,
      )}
    >
      <div className="h-16">Logo</div>
      <div className="flex grow flex-col gap-6">
        <Link href={`/${user}`}>
          <Button className="flex w-full justify-start">
            <LayoutPanelLeft className="mr-2 h-6 w-6" /> Home
          </Button>
        </Link>
        <div className="flex flex-col gap-2">
          <div className="">
            <span className="">Main Menu</span>
          </div>
          {sidebarRoutes.map((route, index) => {
            return (
              <Link href={route.href} key={index}>
                <Button className="flex w-full justify-start bg-background text-foreground hover:text-background">
                  <LayoutPanelLeft className="mr-2 h-6 w-6" />
                  {route.title}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
