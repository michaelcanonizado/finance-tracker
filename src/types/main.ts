export enum Transactions {
  income = "income",
  expense = "expense",
  transfer = "transfer",
}

export const Wallets = ["CASH", "GCASH", "PAYMAYA", "PAYPAL", "BANK"] as const;

export const IncomeCategories = [
  "SALARY",
  "ALLOWANCE",
  "INVESTMENT",
  "BUSINESS",
  "OTHER",
] as const;
export const ExpensesCategories = [
  "FOOD/DRINK",
  "TRANSPORTATION",
  "SHOPPING",
  "CELLPHONE",
  "HOUSING",
  "EDUCATION",
  "OTHER",
] as const;

export interface ICashFlow {
  type: Transactions;
  values: ICashFlowDetails[];
  total: number;
}
export interface ICashFlowDetails {
  id: string;
  timestamp: string | Date;
  date: string | Date;
  amount: number;
  category: {
    id: number;
    name: string;
  };
  description: string;
  wallet: {
    id: number;
    name: string;
  };
}
