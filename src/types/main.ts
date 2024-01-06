export enum GoogleSheets {
  income = "INCOME DATABASE",
  expenses = "EXPENSES DATABASE",
  // TEMPORARY TEST SHEET SELECTOR FOR ANY TEST NEEDED WITH DATA
  test = "TEST",
}

export const Wallets = ["CASH", "GCASH", "PAYMAYA ", "PAYPAL", "BANK"] as const;

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

export interface IExpenses {
  sheet: GoogleSheets;
}

export interface ICashFlow {
  sheet: GoogleSheets;
  values: ICashFlowDetails[];
  total: number;
}

export interface ICashFlowDetails {
  timestamp: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  wallet: string;
}
