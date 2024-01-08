import mongoose from "mongoose";
import User from "@/models/user";
import IncomeLog from "@/models/incomeLogs";
import ExpenseLog from "@/models/expenseLogs";

import { NextRequest } from "next/server";

import { authenticateGoogleSheets } from "@/lib/authenticateGoogleSheets";

import { ICashFlowDetails } from "@/types/main";

// Set values to 'any[]' as googleSheets.spreadsheets.values.append is looking for an array of any
// export const sendCashFlowData = async (sheetName: string, values: any[][]) => {
//   const [googleSheets, auth, spreadsheetId] = await authenticateGoogleSheets();

//   const res = await googleSheets.spreadsheets.values.append({
//     auth,
//     spreadsheetId,
//     range: sheetName,
//     valueInputOption: "USER_ENTERED",
//     responseValueRenderOption: "FORMATTED_VALUE",
//     requestBody: {
//       majorDimension: "ROWS",
//       values: values,
//     },
//   });

//   return res;
// };

// export async function POST(req: NextRequest) {
//   const body = await req.json();

//   const arrayOfValues = body.values.map((row: ICashFlowDetails) => {
//     return [
//       row.timestamp,
//       row.date,
//       row.amount,
//       row.category,
//       row.description,
//       row.wallet,
//     ];
//   });

//   const res = await sendCashFlowData(body.sheet, arrayOfValues);

//   return new Response("OK");
// }
export async function POST(req: NextRequest) {
  mongoose.connect("mongodb://127.0.0.1:27017/finance-tracker");
  const user = await User.findOne({ _id: process.env.USER_ID });
  const body = await req.json();

  console.log(user);

  const values = body.values[0];

  if (body.type === "income") {
    const newTransaction = await IncomeLog.create({
      date: new Date(values.date),
      createdAt: new Date(values.timestamp),
      updatedAt: new Date(values.date),
      amount: values.amount,
      wallet: values.wallet,
      category: values.category,
      description: values.description,
    });

    console.log(newTransaction);

    newTransaction["user_id"] = user;
    await user.data.logs.incomes.push(newTransaction);
    await newTransaction.save();
    await user.save();
  }

  return new Response("OK");
}
