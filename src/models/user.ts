import mongoose, { InferSchemaType, Schema, model, models } from "mongoose";

export const categorySchema = new Schema(
  {
    id: Number,
    name: String,
  },
  { _id: false },
);
export const walletSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);
export const userWalletSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  data: {
    categories: {
      income: {
        type: [categorySchema],
        default: [],
      },
      expense: {
        type: [categorySchema],
        default: [],
      },
    },
    wallets: {
      type: [userWalletSchema],
      default: [],
    },
    logs: {
      transfers: [{ type: Schema.Types.ObjectId, ref: "TransferLog" }],
      incomes: [{ type: Schema.Types.ObjectId, ref: "IncomeLog" }],
      expenses: [{ type: Schema.Types.ObjectId, ref: "ExpenseLog" }],
    },
  },
});

type UserType = InferSchemaType<typeof userSchema>;

const User = models.User || model<UserType>("User", userSchema);

export default User;
