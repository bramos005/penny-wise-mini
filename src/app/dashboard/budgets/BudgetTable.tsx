"use client";
import { Budget } from "@prisma/client";
import { useEffect, useState } from "react";
import { fetchUtil } from "@/app/utils/fetch";
import { useUser } from "@clerk/nextjs";
import Aos from "aos";
interface Props {
  setBudgets: (budgets: Budget[]) => void;
  budgets: Budget[];
  hasBudget: boolean;
  setHasBudget: (hasBudget: boolean) => void;
  toggleActive: () => void;
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
}

export function BudgetTable({
  setBudgets,
  budgets,
  hasBudget,
  setHasBudget,
  toggleActive,
  submitted,
  setSubmitted,
  isLoaded,
  setIsLoaded,
}: Props) {
  const { user } = useUser();

  useEffect(() => {
    const getBudgets = async () => {
      if (user) {
        const externalId = user.id;
        console.log(externalId);
        const [newBudgets] = await fetchUtil(
          `/api/budget?externalId=${encodeURIComponent(externalId)}`
        );
        setTimeout(() => {
          setIsLoaded(true);
        }, 0);
        setBudgets(newBudgets);
      }
    };
    getBudgets();
  }, [user, submitted]);

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      Aos.refresh();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (budgets.length > 0) {
      setHasBudget(true);
    } else {
      setHasBudget(false);
    }
  }, [budgets]);

  const handleDelete = async (e: any) => {
    const svgElement = (e.target as HTMLElement).closest("svg");
    try {
      if (svgElement) {
        const id = svgElement.dataset.id;
        await fetchUtil("/api/budget", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id }),
        });
        
        setSubmitted(!submitted);
        
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div 
      className={`${
        !isLoaded || !hasBudget ? "hidden" : "flex"
      }  flex-col gap-8 w-[90vw]  animate-fade-in-down sm:w-[36rem]`}>
      <h2 className="text-2xl text-center font-semibold text-gray-700">
        Adjust your Budgets
      </h2>
      <div className="flex justify-center  overflow-y-auto   max-h-[20rem]   ">
        <table className=" divide-y divide-gray-300 shadow-lgrounded-lg  bg-white">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className=" text-[10px] px-6 py-3 text-left  font-semibold uppercase tracking-wider 623:text-sm  sm:text-xs sm:px-6">
                Name
              </th>
              <th className=" text-[10px]  px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider 623:text-sm 623:px-[12px] sm:text-xs sm:px-6">
                Budget
              </th>
              <th className="  px-2 text-[10px] py-3 text-left text-xs font-semibold uppercase tracking-wider 623:text-sm 623:px-[12px] sm:text-xs sm:px-6">
                Category
              </th>
              <th className="text-[10px] px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider  623:text-sm 623:px-[12px] sm:text-xs sm:px-6">
                Frequency
              </th>
              <th className="px-6 py-3 text-right">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {budgets.map((budget) => (
              <tr key={budget.id} className="hover:bg-gray-50">
                <td className="px-2 text-[10px] py-4 whitespace-nowrap  font-medium text-gray-900 623:text-sm  sm:text-xs sm:px-6">
                  {budget.name.toLowerCase()}
                </td>
                <td className="px-2 text-[10px] py-4 whitespace-nowrap text-sm text-gray-500 623:text-sm   sm:text-xs sm:px-6">
                  ${budget.amount}
                </td>
                <td className="px-2 py-4 text-[10px] whitespace-nowrap text-sm text-gray-500 623:text-sm  sm:text-xs sm:px-6">
                  {budget.category}
                </td>
                <td className="px-2  text-[10px] py-4 whitespace-nowrap text-sm text-gray-500 623:text-sm   sm:text-xs sm:px-6">
                  {budget.frequency}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium 623:text-sm sm:px-7">
                  <svg
                    data-id={budget.id}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer hover:text-red-600 transition-colors duration-300"
                    onClick={handleDelete}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={toggleActive}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
          Add A Budget
        </button>
      </div>
    </div>
  );
}
