"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransactionStore } from "@/store/transaction-store";

const categories = ["Food", "Travel", "Bills", "Shopping", "Entertainment", "Other"];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  category: z.string().min(1, "Select a category"),
  date: z.string().min(1, "Date is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddForm() {
  const [type, setType] = useState<"income" | "expense">("income");
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.input<typeof formSchema>, any, z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    addTransaction({
      title: data.title,
      amount: data.amount,
      category: data.category,
      date: data.date,
      type: type === "income" ? "Income" : "Expense",
    });
    reset();
  };
  return (
    <section className="bg-white rounded-xl p-5 shadow-sm border max-w-md">
      <h2 className="text-base font-semibold mb-4">Add Transaction</h2>

      {/* income/expense toggle */}
      <div className="flex gap-2 mb-5">
        <button
          type="button"
          onClick={() => setType("income")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${type === "income" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"
            }`}
        >
          Income
        </button>
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${type === "expense" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-500"
            }`}
        >
          Expense
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Title</label>
          <input
            {...register("title")}
            type="text"
            placeholder="eg Salary, Freelance etc"
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-600">Amount</label>
          <input
            {...register("amount")}
            type="text"
            placeholder="$0.00"
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-600">Category</label>
          <select
            {...register("category")}
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
            defaultValue=""
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
        </div>

        <div>
          <label className="text-sm text-gray-600">Date</label>
          <input
            {...register("date")}
            type="date"
            className="w-full mt-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          Add Transaction
        </button>
      </form>
    </section>
  );
}