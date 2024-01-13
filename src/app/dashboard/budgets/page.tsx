"use client";
import { Sidebar } from "@/app/ui-components/Sidebar";
import { BudgetForm } from "./budgetForm";
import { BudgetCards } from "./BudgetCards";
import { useEffect, useState } from "react";
import { fetchUtil } from "@/app/utils/fetch";
import { Budget } from "@prisma/client";

export default function Budget() {
  const [hasBudget, setHasBudget] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(true)
  const [isActive, setIsActive] = useState<boolean>(false);
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: "", name: "cup", amount: 20 },
  ]);
  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div  className="flex">
      <Sidebar />

      <div data-aos="fade-right" className="flex flex-col gap-3 justify-center items-center flex-grow">
        <div className={`${isActive?"opacity-30": "opacity-100"} flex transition-all duration-300`} >
          <BudgetCards
            setBudgets={setBudgets}
            budgets={budgets}
            toggleActive={toggleActive}
            hasBudget={hasBudget}
            setHasBudget={setHasBudget}
            submitted={submitted}
            setSubmitted={setSubmitted}
          />
        </div>
        <div
          className={`${
            isActive || hasBudget ? "hidden" : "opacity-100"
          } flex gap-3 flex-col  items-center transition-all duration-100 ease-in-out`}>
          <h1 className="text-[#CCCCCC] text-xl">
            You currently have no budgets in place
          </h1>
          <button
            onClick={toggleActive}
            className="border p-2 bg-custom-blue text-white rounded-xl hover:scale-105 transition-all duration-500 ease-in-out">
            Add a budget
          </button>
        </div>
        <div className="flex flex-col absolute z-1000">
          <BudgetForm isActive={isActive} toggleActive={toggleActive} budgets={budgets} setBudgets={setBudgets} setSubmitted={setSubmitted} submitted={submitted} setHasBudget={setHasBudget} hasBudget={true} />
        </div>
      </div>
    </div>
  );
}
