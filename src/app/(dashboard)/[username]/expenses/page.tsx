import React from "react";

import DashboardTable from "@/components/dashboard/table/DashboardTable";

import { GoogleSheets } from "@/types/main";
import { getData } from "@/lib/getSheetsData";

const Expenses = async () => {
  const data = await getData(GoogleSheets.expenses);

  return (
    <div className="flex min-h-screen flex-col p-6">
      <div className="mb-8">
        <div className="mb-1">
          <h1 className="text-4xl">Expenses</h1>
        </div>
        <div className="">
          <p className="text-muted-foreground">List of all expenses</p>
        </div>
      </div>
      <DashboardTable data={data} />
    </div>
  );
};

export default Expenses;
