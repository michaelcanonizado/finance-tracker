import mongoose, { InferSchemaType, Schema, model, models } from "mongoose";

const incomeLogSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    wallet_id: { type: Schema.Types.Number, ref: "User" },
  },
  { timestamps: true },
);

type IncomeLogType = InferSchemaType<typeof incomeLogSchema>;

const IncomeLog =
  models.IncomeLog || model<IncomeLogType>("IncomeLog", incomeLogSchema);

export default IncomeLog;
