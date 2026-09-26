"use client";

import { useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import { useTransactionStore } from "@/store/transaction-store";
import { categoryIcons } from "@/lib/category-icons";
import EditTransaction from "@/components/edit-transaction";
import { Transaction } from "@/types/transaction";

export default function TransactionTable() {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Transaction | null>(null);

  const transactions = useTransactionStore((state) => state.transactions);
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);

  return (
    <section className="bg-white rounded-xl p-5 shadow-sm border">
      {/* filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <select className="border rounded-lg px-3 py-2 text-sm text-gray-600 outline-none">
          <option>All Types</option>
          <option>Income</option>
          <option>Expense</option>
        </select>

        <select className="border rounded-lg px-3 py-2 text-sm text-gray-600 outline-none">
          <option>All Categories</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Bills</option>
          <option>Shopping</option>
          <option>Entertainment</option>
        </select>

        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2.5 font-semibold text-gray-700">Date</th>
              <th className="py-2.5 font-semibold text-gray-700">Title</th>
              <th className="py-2.5 font-semibold text-gray-700">Category</th>
              <th className="py-2.5 font-semibold text-gray-700">Type</th>
              <th className="py-2.5 font-semibold text-gray-700">Amount</th>
              <th className="py-2.5 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions
              .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
              .map((t) => {
                const isIncome = t.type === "Income";
                const Icon = categoryIcons[t.category] || categoryIcons.Other;
                return (
                  <tr key={t.id} className="border-b last:border-0">
                    <td className="py-3 text-gray-400">{t.date}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${isIncome ? "bg-green-100" : "bg-red-100"}`}>
                          <Icon size={16} className={isIncome ? "text-green-600" : "text-red-600"} />
                        </div>
                        <span className="font-medium">{t.title}</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-500">{t.category}</td>
                    <td className="py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          isIncome ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td className={`py-3 font-medium ${isIncome ? "text-green-600" : "text-red-500"}`}>
                      {isIncome ? "+" : "-"}${t.amount.toFixed(2)}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setEditing(t)} className="text-blue-500 hover:text-blue-600">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => deleteTransaction(t.id)} className="text-red-500 hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditTransaction
          open={!!editing}
          onClose={() => setEditing(null)}
          transaction={editing}
        />
      )}
    </section>
  );
}