import { NextRequest } from "next/server";

import mongoose from "mongoose";

import User from "@/models/user";
import IncomeLog from "@/models/incomeLogs";

async function addData() {
  await User.deleteMany({});
  await IncomeLog.deleteMany({});

  const newUser = await User.create({
    username: "mikeycanonizado",
    email: "mikey@gmail.com",
    data: {
      categories: [
        { id: 1, name: "FOOD" },
        { id: 2, name: "TRANSPORTATION" },
        { id: 3, name: "EDUCATION" },
      ],
      wallets: [
        { id: 1, name: "CASH" },
        { id: 2, name: "BANK" },
        { id: 3, name: "GCASH" },
        { id: 4, name: "PAYPAL" },
      ],
      logs: {
        incomes: [],
      },
    },
  });

  for (let i = 0; i < 5; i++) {
    const randWalletId = Math.floor(Math.random() * (3 - 0) + 0);

    const newIncomeLog = await IncomeLog.create({
      date: new Date(new Date().getTime()),
      amount: Math.floor(Math.random() * (1001 - 500) + 500),
    });

    newIncomeLog["user_id"] = newUser;
    newIncomeLog["wallet_id"] = newUser.data.wallets[randWalletId].id;
    newUser.data.logs.incomes.push(newIncomeLog);

    newIncomeLog.save();
  }

  newUser.save();
}

async function showData() {
  const user = await User.find();
  const incomeLogs = await IncomeLog.find();

  console.log(User);
  console.log(incomeLogs);
}

export async function GET(req: NextRequest) {
  mongoose.connect("mongodb://127.0.0.1:27017/finance-tracker");

  const addres = await addData();
  const showres = await showData();

  return new Response("OK");
}
