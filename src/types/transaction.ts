export interface Transaction {
  id: string;
  title: string;
  category: string;
  type: "Income" | "Expense";
  amount: number;
  date: string;
}