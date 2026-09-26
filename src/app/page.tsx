"use client";

import { useEffect, useState } from "react";
import BalanceOverview from "@/components/balance-overview";
import ExpenseCategories from "@/components/expense-categories";
import IncomeSummary from "@/components/income-expense-summary";
import RecentTransaction from "@/components/recent-transactions";
import AddForm from "@/components/add-transaction-form";
import MonthSummary from "@/components/monthly-summary";


export default function Home() {
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17) setGreeting("Good Evening");
    else setGreeting("Good Morning");
  }, []);

  return (
    
    <section className="p-6 space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs px-4 py-2 rounded-lg mb-4 text-center">
  ⚠️ Demo Practice Project — UI/UX showcase only. No real data processing or backend.
</div>
      <div>
        <h1 className="text-2xl font-semibold">{greeting}, Shaik!</h1>
        <p className="text-gray-500">Here is your financial overview this month</p>
      </div>

      <BalanceOverview />

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <IncomeSummary />
        </div>
        <div className="col-span-1">
          <ExpenseCategories />
        </div>
      </div>
         <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1">
         <RecentTransaction/>
        </div>
        <div className="col-span-1">
         <AddForm/>
        </div>
      </div>
      <div className="grid grid-cols-1">
        <MonthSummary/>
      </div>


    </section>

  );
}