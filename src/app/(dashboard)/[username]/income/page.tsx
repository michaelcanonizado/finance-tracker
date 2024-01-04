import React from "react";

import DashboardTable from "@/components/dashboard/table/DashboardTable";

import { GoogleSheets } from "@/types/main";
import { getData } from "@/lib/getSheetsData";

const Income = async () => {
  const data = await getData(GoogleSheets.income);

  return (
    <div className="mx-auto w-fit lg:px-6">
      <div className="mb-8">
        <div className="mb-1">
          <h1 className="text-4xl">Income</h1>
        </div>
        <div className="">
          <p className="text-muted-foreground">List of all income</p>
        </div>
      </div>
      <DashboardTable data={data} />
    </div>
  );
};

export default Income;
