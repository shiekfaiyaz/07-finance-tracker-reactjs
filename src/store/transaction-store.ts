import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Transaction } from "@/types/transaction";

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, t: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: [],

      addTransaction: (t) =>
        set((state) => ({
          transactions: [{ ...t, id: crypto.randomUUID() }, ...state.transactions],
        })),

      updateTransaction: (id, t) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...t, id } : tx
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        })),
    }),
    { name: "finance-tracker-storage" } // localStorage key
  )
);