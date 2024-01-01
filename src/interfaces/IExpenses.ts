export interface IExpenses {
  headers: string[];
  data: IExpense[];
}

export interface IExpense {
  timestamp: string;
  date: string;
  amount: number;
  category: string;
  description: string;
}
