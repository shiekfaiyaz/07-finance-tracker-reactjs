import BalanceOverview from "@/components/balance-overview";
import TransactionTable from "@/components/transaction-table";

export default function Transaction() {
  return (
    <section className="p-6 space-y-6">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs px-4 py-2 rounded-lg mb-4 text-center">
  ⚠️ Demo Practice Project — UI/UX showcase only. No real data processing or backend.
</div>
      <div>
        <h2 className="text-2xl font-semibold">Transactions</h2>
        <p className="text-gray-500">
          Manage your income and expense. Add, edit or delete your transactions.
        </p>
      </div>

      {/* cards */}
      <BalanceOverview />

      {/* form + table layout */}
      <div className="grid grid-cols-1 gap-5">
        <div className="col-span-1">
          <TransactionTable />
        </div>
      </div>
    </section>
  );
}