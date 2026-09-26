"use client";

import { Wallet, TrendingUp, TrendingDown, ArrowUp, ArrowDown } from "lucide-react";
import { useTransactionStore } from "@/store/transaction-store";

export default function BalanceOverview() {
  const transactions = useTransactionStore((state) => state.transactions);

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  const cardData = [
    {
      icon: Wallet,
      title: "Total Balance",
      money: `$${totalBalance.toFixed(2)}`,
      isPositive: totalBalance >= 0,
    },
    {
      icon: TrendingUp,
      title: "Total Income",
      money: `$${totalIncome.toFixed(2)}`,
      isPositive: true,
    },
    {
      icon: TrendingDown,
      title: "Total Expense",
      money: `$${totalExpense.toFixed(2)}`,
      isPositive: false,
    },
  ];

  return (
    <section className="grid grid-cols-3 gap-5">
      {cardData.map(({ icon: Icon, title, money, isPositive }) => (
        <div
          key={title}
          className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm border"
        >
          <div className={`p-3 rounded-lg ${isPositive ? "bg-green-100" : "bg-red-100"}`}>
            <Icon size={22} className={isPositive ? "text-green-600" : "text-red-600"} />
          </div>

          <div>
            <h6 className="text-sm text-gray-500">{title}</h6>
            <h3 className="text-xl font-semibold">{money}</h3>
          </div>
        </div>
      ))}
    </section>
  );
}