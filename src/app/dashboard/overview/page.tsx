"use client";
import { Sidebar } from "@/app/ui-components/Sidebar";

import { BudgetBar } from "./budgetCharts/BudgetBar";
import { useEffect, useState } from "react";
import { Budget } from "@prisma/client";
import { fetchUtil } from "@/app/utils/fetch";
export default function Overview() {
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: "", name: "cup", amount: 20, category: "none", frequency: "weekly" },
  ]);

  useEffect(() => {
    const getBudgets = async () => {
      const [data] = await fetchUtil("/api/budget")
      setBudgets(data);
      
    };
    getBudgets();
  }, []);
  console.log("budgets:", budgets);
  return (
    <div className="flex">
      <Sidebar />
      <div data-aos="flip-left" className="flex p-6 ml-60">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-gray-700">Overview</h1>
          <p className="text-custom-gray font-semibold">
            Heres what's happening in your finance.
          </p>
          <div className="border bg-custom-white rounded-xl  shadow-black  mt-5">
            <BudgetBar budgets={budgets} />
          </div>
        </div>
      </div>
    </div>
  );
}
