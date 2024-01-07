import mongoose, { InferSchemaType, Schema, model, models } from "mongoose";

const categorySchema = new Schema(
  {
    id: Number,
    name: String,
  },
  { _id: false },
);
const walletSchema = new Schema(
  {
    id: Number,
    name: String,
    balance: Number,
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
      type: [categorySchema],
      default: [],
    },
    wallets: {
      type: [walletSchema],
      default: [],
    },
    logs: {
      //   transfers: {},
      incomes: [{ type: Schema.Types.ObjectId, ref: "IncomeLog" }],
      //   expenses: {},
    },
  },
});

type UserType = InferSchemaType<typeof userSchema>;

const User = models.User || model<UserType>("User", userSchema);

export default User;
