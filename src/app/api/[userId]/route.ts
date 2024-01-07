import { NextRequest } from "next/server";

import mongoose from "mongoose";

import User from "@/models/user";
import IncomeLog from "@/models/incomeLogs";

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
