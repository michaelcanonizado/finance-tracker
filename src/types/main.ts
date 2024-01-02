export enum GoogleSheets {
  income = "INCOME DATABASE",
  expenses = "EXPENSES DATABASE",
}

export interface IExpenses {
  sheet: GoogleSheets;
}

export interface ICashFlow {
  sheet: GoogleSheets;
  values: ICashFlowDetails[];
}

export interface ICashFlowDetails {
  timestamp: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  account?: string;
}
