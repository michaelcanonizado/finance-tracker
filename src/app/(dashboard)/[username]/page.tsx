import { sendCashFlowData } from "@/lib/sendCashFlowData";
import { GoogleSheets } from "@/types/main";
import React from "react";

const Home = async () => {
  const res = await sendCashFlowData(GoogleSheets.test);

  return (
    <div className="min-h-screen p-6">
      <h1>Dashboard</h1>
    </div>
  );
};

export default Home;
