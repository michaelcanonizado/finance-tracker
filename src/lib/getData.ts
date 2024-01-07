import mongoose, { HydratedDocument } from "mongoose";

import IncomeLog, { IncomeLogType } from "@/models/incomeLogs";
import ExpenseLog, { ExpenseLogType } from "@/models/expenseLogs";
import TransferLog, { TransferLogType } from "@/models/transferLogs";

import { Transactions, ICashFlow } from "@/types/main";

import { formatDate } from "@/helpers/formatDate";

function formatIncomeExpenseLogs(rawData: IncomeLogType[] | ExpenseLogType[]) {
  let totalAmount = 0;

  const formattedData = rawData.map((data) => {
    totalAmount += data.amount;

    return {
      timestamp: formatDate(data.createdAt),
      date: formatDate(data.date),
      amount: data.amount,
      category: data.category,
      description: data.description,
      wallet: data.wallet,
    };
  });

  return { values: formattedData, totalAmount: totalAmount };
}

export async function getData(collection: Transactions): Promise<ICashFlow> {
  mongoose.connect("mongodb://127.0.0.1:27017/finance-tracker");

  const userId = "659a7101e82a95dca590b658";

  let logs = null;

  if (collection === Transactions.income) {
    logs = await IncomeLog.find({
      user_id: userId,
    });
  } else if (collection === Transactions.expense) {
    logs = await ExpenseLog.find({
      user_id: userId,
    });
  } else if (collection === Transactions.transfer) {
    logs = await TransferLog.find({
      user_id: userId,
    });
  }

  const formattedlogs = formatIncomeExpenseLogs(logs);

  return {
    type: collection,
    values: formattedlogs.values,
    total: formattedlogs.totalAmount,
  } as ICashFlow;
}
