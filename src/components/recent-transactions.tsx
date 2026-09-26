"use client";

import Link from "next/link";
import { useTransactionStore } from "@/store/transaction-store";
import { categoryIcons } from "@/lib/category-icons";

export default function RecentTransaction() {
  const transactions = useTransactionStore((state) => state.transactions);
  const recentList = transactions.slice(0, 5); // latest 5 (newest first, since addTransaction unshifts)

  return (
    <section className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">Recent Transactions</h2>
        <Link href="/transactions" className="text-sm text-blue-500 hover:underline">
          View all
        </Link>
      </div>

      <div>
        {recentList.length === 0 && (
          <p className="text-sm text-gray-400 py-4 text-center">No transactions yet</p>
        )}

        {recentList.map((t, i) => {
          const isIncome = t.type === "Income";
          const Icon = categoryIcons[t.category] || categoryIcons.Other;
          return (
            <div key={t.id}>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${isIncome ? "bg-green-100" : "bg-red-100"}`}>
                    <Icon size={18} className={isIncome ? "text-green-600" : "text-red-600"} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{t.title}</h4>
                    <span className="text-xs text-gray-400">{t.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${isIncome ? "text-green-600" : "text-red-500"}`}>
                    {isIncome ? "+" : "-"}${t.amount.toFixed(2)}
                  </p>
                  <span className="text-xs text-gray-400">{t.date}</span>
                </div>
              </div>
              {i !== recentList.length - 1 && <hr className="w-full" />}
            </div>
          );
        })}
      </div>
    </section>
  );
}