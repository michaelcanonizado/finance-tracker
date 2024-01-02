export enum GoogleSheets {
  income = "INCOME DATABASE",
  expenses = "EXPENSES DATABASE",
}

export interface IExpense {
  timestamp: string;
  date: string;
  amount: number;
  category: string;
  description: string;
}
