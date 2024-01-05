import React, { Suspense } from "react";

import DashboardTable from "@/components/dashboard/table/DashboardTable";
import DashboardTableSkeleton from "@/components/skeletons/DashboardTableSkeleton";

import { GoogleSheets } from "@/types/main";

const Income = async () => {
  return (
    <div className="mx-auto flex w-full grow flex-col lg:px-6">
      <div className="mb-8">
        <div className="mb-1">
          <h1 className="text-4xl">Income</h1>
        </div>
        <div className="">
          <p className="text-muted-foreground">List of all income</p>
        </div>
      </div>
      <Suspense fallback={<DashboardTableSkeleton />}>
        <DashboardTable src={GoogleSheets.income} />
      </Suspense>
    </div>
  );
};

export default Income;
