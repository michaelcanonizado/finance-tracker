import React, { Suspense } from "react";

import DashboardTable from "@/components/dashboard/table/DashboardTable";
import DashboardTableSkeleton from "@/components/skeletons/DashboardTableSkeleton";

import { Transactions } from "@/types/main";

const Expenses = async () => {
  return (
    <div className="mx-auto w-full lg:px-6">
      <div className="mb-8">
        <div className="mb-1">
          <h1 className="text-4xl">Expenses</h1>
        </div>
        <div className="">
          <p className="text-muted-foreground">List of all expenses</p>
        </div>
      </div>
      <Suspense fallback={<DashboardTableSkeleton />}>
        <DashboardTable src={Transactions.expense} />
      </Suspense>
    </div>
  );
};

export default Expenses;
