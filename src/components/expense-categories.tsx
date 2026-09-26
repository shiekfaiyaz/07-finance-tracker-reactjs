"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTransactionStore } from "@/store/transaction-store";

const categoryColors: Record<string, string> = {
  Food: "#22c55e",
  Travel: "#ec4899",
  Bills: "#f97316",
  Shopping: "#3b82f6",
  Entertainment: "#a855f7",
  Other: "#94a3b8",
};

export default function ExpenseCategories() {
  const transactions = useTransactionStore((state) => state.transactions);
  const expenses = transactions.filter((t) => t.type === "Expense");

  const total = expenses.reduce((sum, t) => sum + t.amount, 0);

const grouped = expenses.reduce<Record<string, number>>((acc, t) => {
  acc[t.category] = (acc[t.category] || 0) + t.amount;
  return acc;
}, {});

  const categories = Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
    percent: total > 0 ? Math.round((value / total) * 100) : 0,
    color: categoryColors[name] || categoryColors.Other,
  }));

  return (
    <section className="bg-white rounded-xl p-5 shadow-sm border h-full">
      <h2 className="text-base font-semibold mb-4">Expense Categories</h2>

      {categories.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10">No expenses yet</p>
      ) : (
        <>
          <div className="relative w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={2}
                >
                  {categories.map((c) => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-lg font-semibold">${total.toFixed(2)}</p>
              <p className="text-xs text-gray-400">Total Expense</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {categories.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <p className="text-gray-600">{c.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-medium">${c.value.toFixed(2)}</p>
                  <p className="text-gray-400 w-9 text-right">{c.percent}%</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}