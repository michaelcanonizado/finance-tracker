import React from "react";

import { twMerge } from "tailwind-merge";

import {
  LayoutPanelLeft,
  Receipt,
  PiggyBank,
  ArrowRight,
  ListPlus,
  ListMinus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardSidebar = ({ className }: { className?: string }) => {
  const user = "user";

  const linkIconClasses = "mr-2 h-6 w-6";

  const sidebarRoutes = [
    {
      title: "Main",
      routes: [
        {
          title: "Payments",
          href: `/${user}/payments`,
          icon: <ArrowRight className={linkIconClasses} />,
        },
        {
          title: "Balances",
          href: `/${user}/balances`,
          icon: <ArrowRight className={linkIconClasses} />,
        },
        {
          title: "Reports",
          href: `/${user}/reports`,
          icon: <ArrowRight className={linkIconClasses} />,
        },
      ],
    },
    {
      title: "Track",
      routes: [
        {
          title: "Income",
          href: `/${user}/track/income`,
          icon: <ListPlus className={linkIconClasses} />,
        },
        {
          title: "Expense",
          href: `/${user}/track/expense`,
          icon: <ListMinus className={linkIconClasses} />,
        },
      ],
    },
    {
      title: "Tables",
      routes: [
        {
          title: "Income",
          href: `/${user}/income`,
          icon: <PiggyBank className={linkIconClasses} />,
        },
        {
          title: "Expenses",
          href: `/${user}/expenses`,
          icon: <Receipt className={linkIconClasses} />,
        },
      ],
    },
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

        {sidebarRoutes.map((type, index) => {
          return (
            <div className="flex flex-col gap-2" key={index}>
              <div className="">
                <span className="">{type.title}</span>
              </div>{" "}
              {type.routes.map((route, index) => {
                return (
                  <Link href={route.href} key={index}>
                    <Button className="flex w-full justify-start bg-background text-foreground hover:text-background">
                      {/* <LayoutPanelLeft className="mr-2 h-6 w-6" /> */}
                      {route.icon}
                      {route.title}
                    </Button>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
