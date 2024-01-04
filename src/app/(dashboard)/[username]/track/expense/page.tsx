import React from "react";

import DashboardRecordForm from "@/components/dashboard/track/DashboardRecordForm";

const RecordExpense = () => {
  return (
    <div className="mx-auto w-fit">
      <div className="mt-8 rounded border px-6 py-14 sm:px-12">
        <div className="mb-10">
          <h1 className="text-4xl">Record Expense</h1>
        </div>
        <DashboardRecordForm variant="expense" />
      </div>
    </div>
  );
};

export default RecordExpense;
