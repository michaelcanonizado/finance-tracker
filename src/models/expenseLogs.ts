import mongoose, { InferSchemaType, Schema, model, models } from "mongoose";

import { categorySchema, walletSchema } from "./user";

const expenseLogSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    wallet: {
      type: walletSchema,
      required: true,
    },
    category: {
      type: categorySchema,
      retuired: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export type ExpenseLogType = InferSchemaType<typeof expenseLogSchema>;

const ExpenseLog =
  models.ExpenseLog || model<ExpenseLogType>("ExpenseLog", expenseLogSchema);

export default ExpenseLog;
