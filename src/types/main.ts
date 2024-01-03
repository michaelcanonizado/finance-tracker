export enum GoogleSheets {
  income = "INCOME DATABASE",
  expenses = "EXPENSES DATABASE",
  // TEMPORARY TEST SHEET SELECTOR FOR ANY TEST NEEDED WITH DATA
  test = "TEST",
}

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
  account?: string;
}
