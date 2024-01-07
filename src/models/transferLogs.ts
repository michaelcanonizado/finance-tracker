import mongoose, { InferSchemaType, Schema, model, models } from "mongoose";

import { walletSchema } from "./user";

const transferLogSchema = new Schema(
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

type TransferLogType = InferSchemaType<typeof transferLogSchema>;

const TransferLog =
  models.TransferLog ||
  model<TransferLogType>("TransferLog", transferLogSchema);

export default TransferLog;
