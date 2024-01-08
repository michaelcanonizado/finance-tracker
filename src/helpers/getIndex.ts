import { IncomeCategories, ExpensesCategories } from "@/types/main";

export const getIncomeCategory = (category: string) => {
  return {
    // @ts-ignore
    id: IncomeCategories.indexOf(category),
    name: category,
  };
};
export const getExpenseCategory = (category: string) => {
  return {
    // @ts-ignore
    id: ExpensesCategories.indexOf(category),
    name: category,
  };
};
export const getWallet = (wallet: string) => {
  const wallets = ["CASH", "GCASH", "PAYPAL", "PAYMAYA", "BANK"];

  return {
    id: wallets.indexOf(wallet),
    name: wallet,
  };
};
