import React, { Suspense } from "react";

import DashboardTable from "@/components/dashboard/table/DashboardTable";
import DashboardTableSkeleton from "@/components/skeletons/DashboardTableSkeleton";

import { columns } from "@/components/dashboard/table/Columns";
import { DataTable } from "@/components/dashboard/table/DataTable";

import { ICashFlow, Transactions } from "@/types/main";
import { getData } from "@/lib/getData";

async function dataLoader(): Promise<ICashFlow> {
  const data = await getData(Transactions.income);
  return data;
}

const Income = async () => {
  const data = await dataLoader();

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
        {/* <DashboardTable src={Transactions.income} /> */}
        <DataTable columns={columns} data={data.values} />
      </Suspense>
    </div>
  );
};

export default Income;
