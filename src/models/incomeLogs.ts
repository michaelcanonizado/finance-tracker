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
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export type IncomeLogType = InferSchemaType<typeof incomeLogSchema>;

const IncomeLog =
  models.IncomeLog || model<IncomeLogType>("IncomeLog", incomeLogSchema);

export default IncomeLog;
