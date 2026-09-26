"use client";

import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTransactionStore } from "@/store/transaction-store";
import { Transaction } from "@/types/transaction";

const categories = ["Food", "Travel", "Bills", "Shopping", "Entertainment", "Other"];

interface EditTransactionProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction;
}

export default function EditTransaction({ open, onClose, transaction }: EditTransactionProps) {
  const [type, setType] = useState<"Income" | "Expense">(transaction.type);
  const updateTransaction = useTransactionStore((state) => state.updateTransaction);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    updateTransaction(transaction.id, {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      amount: Number(formData.get("amount")),
      date: formData.get("date") as string,
      type,
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="flex items-center justify-between mb-2">
          <DialogTitle className="text-base font-semibold">Edit Transaction</DialogTitle>
          <button onClick={onClose}>
            <X size={18} className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Title</label>
            <input
              name="title"
              type="text"
              defaultValue={transaction.title}
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select
              name="category"
              defaultValue={transaction.category}
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Type</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setType("Expense")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                  type === "Expense" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => setType("Income")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                  type === "Income" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                Income
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Amount</label>
            <input
              name="amount"
              type="number"
              defaultValue={transaction.amount}
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Date</label>
            <input
              name="date"
              type="date"
              defaultValue={transaction.date}
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border text-gray-600 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-green-500 text-white font-medium"
            >
              Update
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}