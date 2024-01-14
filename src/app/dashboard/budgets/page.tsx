"use client";
import { Sidebar } from "@/app/ui-components/Sidebar";
import { BudgetForm } from "./budgetForm";
import { BudgetTable } from "./BudgetTable";
import { useEffect, useState } from "react";
import { getBudget } from "@/app/utils/getBudget";
import { Budget } from "@prisma/client";
import { BudgetPie } from "../overview/budgetCharts/BudgetPie";
import { BudgetBar } from "../overview/budgetCharts/BudgetBar";
export default function BudgetSetup() {
  const [hasBudget, setHasBudget] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: "", name: "cup", amount: 20, category: "none", frequency: "" },
  ]);
  const toggleActive = () => {
    setIsActive(!isActive);
  };
  const budgetAlloc = getBudget(budgets);
  return (
    <div className="flex ">
      <div>
        <Sidebar />
      </div>
      <div data-aos="flip-left" className="flex flex-col justify-center gap-y-10 ml-[17rem]">
        <div className="flex flex-col gap-2   py-6">
          <h1 className="text-3xl font-semibold text-gray-700">Budgets</h1>
          <p className="text-custom-gray font-semibold">Plan, Track, Achieve</p>
        </div>
        <div className=" flex mt-[-2.5rem] gap-20 flex-wrap items-center">
          {/* <div className="border rounded-xl shadow-md bg-custom-white w-fit">
            <BudgetBar budgets={budgets}></BudgetBar>
          </div> */}

          {/* <div
            className={` ${isActive ? "opacity-30" : "opacity-100"} ${
              hasBudget ? "flex" : "opacity-30"
            }  transition-all duration-300 z-0 border shadow-md bg-custom-white w-fit rounded-xl `}>
            <BudgetPie></BudgetPie>
          </div> */}
        </div>

        <div className="flex w-fit items-center flex-wrap gap-3 ">
          <div className="flex flex-col gap-3 justify-center items-center mb-20 rounded-xl p-5 border shadow-md bg-custom-white  w- max-h-[55rem] ">
            <div
              className={`${isActive ? "opacity-30" : "opacity-100"} ${
                hasBudget ? "" : ""
              } flex transition-all duration-300`}>
              <BudgetTable
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
                hasBudget ? "hidden" : "opacity-100"
              } flex gap-3 flex-col  items-center transition-all duration-100 ease-in-out`}>
              <h1 className="text-[#CCCCCC] text-xl font-semibold text-gray-700">
                You currently have no budgets in place
              </h1>
              <button
                onClick={toggleActive}
                className="border p-2 bg-custom-blue text-white font-semibold  rounded-xl hover:scale-105 transition-all duration-500 ease-in-out">
                Add a budget
              </button>
            </div>
            <div className="flex flex-col absolute bottom0 z-[50000]">
              <BudgetForm
                isActive={isActive}
                toggleActive={toggleActive}
                budgets={budgets}
                setBudgets={setBudgets}
                setSubmitted={setSubmitted}
                submitted={submitted}
                setHasBudget={setHasBudget}
                hasBudget={true}
              />
            </div>{" "}
          </div>{" "}
          <div
            className={` ${
              isActive ? "opacity-30" : ""
            } flex flex-col gap-3 p-5 transition-all duration-300 rounded-lg  mt-[-5rem] justify-center items-center bg-white`}>
            <h1 className="text-2xl text-center font-semibold text-gray-700">
              Your Total Budget Allocation is
            </h1>
            <div className="flex items-end gap-2">
              <p className="self-center text-3xl font-bold text-blue-600">
                ${Math.round(budgetAlloc)}
              </p>
              <p className="text-lg">/per month</p>
            </div>
            <div className="mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
