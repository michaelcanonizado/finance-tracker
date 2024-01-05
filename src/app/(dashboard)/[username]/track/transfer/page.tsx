import React from "react";

import { transferMoney } from "@/lib/transferMoney";

const TransferMoney = async () => {
  const res = await transferMoney();

  return <div>TransferMoney</div>;
};

export default TransferMoney;
