import mongoose, { InferSchemaType, Schema, model, models } from "mongoose";

import { categorySchema, walletSchema } from "./user";

const incomeLogSchema = new Schema(
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
    fromWallet: {
      type: walletSchema,
      required: true,
    },
    toWallet: {
      type: walletSchema,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

type IncomeLogType = InferSchemaType<typeof incomeLogSchema>;

const IncomeLog =
  models.IncomeLog || model<IncomeLogType>("IncomeLog", incomeLogSchema);

export default IncomeLog;
