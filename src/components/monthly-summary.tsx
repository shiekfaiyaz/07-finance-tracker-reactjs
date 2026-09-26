import { Wallet, ArrowUp, ArrowDown } from "lucide-react";

const summaryList = [
  { title: "Total Income", value: "$4,250.00", change: "10%", isPositive: true },
  { title: "Total Expense", value: "$1,750.00", change: "6%", isPositive: false },
  { title: "Savings", value: "$2,480.00", change: "12%", isPositive: true },
];

export default function MonthSummary() {
  return (
    <section className="bg-white rounded-xl w-[95%] p-5 shadow-sm border flex items-center justify-between flex-wrap gap-2">
      {/* leftside */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-green-100">
          <Wallet size={22} className="text-green-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">Monthly Summary</h3>
          <p className="text-xs text-gray-400">You spend less than last month, great job!</p>
        </div>
      </div>

      {/* rightside */}
      <div className="flex items-center gap-8">
        {summaryList.map(({ title, value, change, isPositive }) => (
          <div key={title}>
            <p className="text-xs text-gray-400">{title}</p>
            <h3 className="text-lg font-semibold">{value}</h3>
            <span
              className={`flex items-center gap-0.5 text-xs font-medium ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
              {change}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}