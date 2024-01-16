"use client";
import { Sidebar } from "@/app/ui-components/Sidebar";
import { BudgetBar } from "./budgetCharts/BudgetBar";
import { useEffect, useState } from "react";
import { NavBar } from "@/app/ui-components/NavBar";
import { Budget } from "@prisma/client";
import { fetchUtil } from "@/app/utils/fetch";
import { BudgetPie } from "./budgetCharts/BudgetPie";
import { getPieValues } from "@/app/utils/getPieValues";
import { useUser } from "@clerk/nextjs";
 
export default function Overview() {
  const [hasBudget, setHasBudget] = useState<boolean>(false);
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: "",
      name: "chatgpt",
      amount: 20,
      category: "education",
      frequency: "monthly",
      userId: "",
    },
  ]);

  const { user } = useUser();
  useEffect(() => {
    const getBudgets = async () => {
      if (user) {
        const externalId = user.id;
        console.log(externalId);
        const [newBudgets] = await fetchUtil(
          `/api/budget?externalId=${encodeURIComponent(externalId)}`
        );
        setBudgets(newBudgets);
      }
    };
    getBudgets();
  }, [user]);

  useEffect(() => {
    if (budgets.length > 0) {
      setHasBudget(true);
    }
  }, [budgets.length]);

console.log(budgets.length)
  return (
    <div className="flex ">
      <Sidebar />
      <div
        data-aos="zoom-in"
        className="flex flex-col w-[90vw]   gap-16 p-6 ml-[15.5rem]  ">
        <div className=" flex border-b justify-end ml-[-2rem]  mt-[-1rem] py-2 ">
          <NavBar></NavBar>
        </div>
        <div>
          <div
            className={`${
              hasBudget ? "hidden" : ""
            } flex font-semibold text-gray-700 text-3xl flex-col w-[80vw] h-[80vh] justify-center items-center fixed z-[30000]`}>
            <p>Insufficient data for an overview.</p>
            <p>Please add budgets to unlock insights.</p>
          </div>
          <div
            className=" shadow-mdflex flex-col gap-2 mt-[-3rem]">
            <h1 className="text-3xl font-semibold text-gray-700">Overview</h1>
            <p className="text-custom-gray font-semibold">
              Heres what's happening in your finance.
            </p>
          </div>
        </div>
        <div
          className={` ${
            !hasBudget ? "hidden" : ""
          } flex items-center flex-wrap  gap-16`}>
          <div className="border bg-custom-white rounded-xl  shadow-black ">
            <BudgetBar budgets={budgets} />
          </div>
          <div className="border bg-custom-white rounded-xl  shadow-black">
            <BudgetPie budgets={budgets} />
          </div>
        </div>
      </div>
    </div>
  ); 
}
