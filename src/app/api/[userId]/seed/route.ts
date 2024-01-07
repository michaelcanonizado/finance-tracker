import { NextRequest } from "next/server";

import mongoose from "mongoose";

import User from "@/models/user";
import IncomeLog from "@/models/incomeLogs";
import ExpenseLog from "@/models/expenseLogs";

import {
  GoogleSheets,
  ICashFlowDetails,
  Wallets,
  IncomeCategories,
  ExpensesCategories,
} from "@/types/main";

import { getData } from "@/lib/getSheetsData";

const getAndFormatGoogleSheetData = async (
  sheet: GoogleSheets,
): Promise<ICashFlowDetails[]> => {
  const rawData = await getData(sheet);

  return rawData.values as ICashFlowDetails[];
};

const getWallet = (wallet: string) => {
  const wallets = ["CASH", "GCASH", "PAYPAL", "PAYMAYA", "BANK"];

  return {
    id: wallets.indexOf(wallet),
    name: wallet,
  };
};
const getIncomeCategory = (category: string) => {
  return {
    // @ts-ignore
    id: IncomeCategories.indexOf(category),
    name: category,
  };
};
const getExpenseCategory = (category: string) => {
  return {
    // @ts-ignore
    id: ExpensesCategories.indexOf(category),
    name: category,
  };
};

export async function GET(req: NextRequest) {
  mongoose.connect("mongodb://127.0.0.1:27017/finance-tracker");

  // 1) DELETE EXISTING DATA IN COLLECTIONS
  await User.deleteMany({});
  await IncomeLog.deleteMany({});
  await ExpenseLog.deleteMany({});

  // 2) CREATE USER
  const newUser = await User.create({
    username: "mikeycanonizado",
    email: "mikey@gmail.com",
    data: {
      categories: {
        income: IncomeCategories.map((category, index) => {
          return {
            id: index,
            name: category.toUpperCase(),
          };
        }),
        expense: ExpensesCategories.map((category, index) => {
          return {
            id: index,
            name: category.toUpperCase(),
          };
        }),
      },
      wallets: Wallets.map((wallet, index) => {
        return {
          id: index,
          name: wallet.toUpperCase(),
          balance: 0,
        };
      }),
      logs: {
        incomes: [],
      },
    },
  });

  let counter = 0;

  // LOAD SHEET DATA AND PUSH TO MONGO
  console.log("Getting incomes...");
  const formattedIncomeData = await getAndFormatGoogleSheetData(
    GoogleSheets.income,
  );
  console.log("Received incomes...");
  for (let data of formattedIncomeData) {
    console.log(`Pushing #${counter} income to mongo...`);
    const newIncomeLog = await IncomeLog.create({
      date: new Date(data.date),
      createdAt: new Date(data.timestamp),
      updatedAt: new Date(data.timestamp),
      amount: data.amount,
      wallet: getWallet(data.wallet),
      category: getIncomeCategory(data.category),
      description: data.description,
    });

    newIncomeLog["user_id"] = newUser;
    await newUser.data.logs.incomes.push(newIncomeLog);
    await newIncomeLog.save();
    console.log(`Pushing #${counter} income done...`);
    counter++;
  }

  counter = 0;

  console.log("Getting expenses...");
  const formattedExpensesData = await getAndFormatGoogleSheetData(
    GoogleSheets.expenses,
  );
  console.log("Recieved expenses...");
  for (let data of formattedExpensesData) {
    console.log(`Pushing #${counter} expense to mongo...`);
    const newExpenseLog = await ExpenseLog.create({
      date: new Date(data.date),
      createdAt: new Date(data.timestamp),
      updatedAt: new Date(data.timestamp),
      amount: data.amount,
      wallet: getWallet(data.wallet),
      category: getExpenseCategory(data.category),
      description: data.description,
    });

    newExpenseLog["user_id"] = newUser;
    await newUser.data.logs.expenses.push(newExpenseLog);
    await newExpenseLog.save();
    console.log(`Pushing #${counter} expense done...`);
    counter++;
  }

  counter = 0;

  console.log("Saving User...");
  // 4) SAVE USER
  newUser.save();
  console.log("Saving User Done...");

  console.log("Finding User...");
  // 5) FIND USER AND PRINT OUT
  const user = await User.find().populate([
    "data.logs.incomes",
    "data.logs.expenses",
  ]);
  console.log("User Found Goodbye!...");
  return new Response(JSON.stringify(user));
}
