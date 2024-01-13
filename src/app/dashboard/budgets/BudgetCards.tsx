"use client";
import { Budget } from "@prisma/client";
import { FormEvent, useEffect } from "react";
import { fetchUtil } from "@/app/utils/fetch";
interface Props {
  setBudgets: (budgets: Budget[]) => void;
  budgets: Budget[];
  hasBudget: boolean;
  setHasBudget: (hasBudget: boolean) => void;
  toggleActive: () => void;
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
}

export function BudgetCards({
  setBudgets,
  budgets,
  hasBudget,
  setHasBudget,
  toggleActive,
  submitted,
  setSubmitted,
}: Props) {
  useEffect(() => {
    const getBudgets = async () => {
      const [newBudgets] = await fetchUtil("/api/budget");
      if (newBudgets.length === 0) {
        setHasBudget(false);
      }
      setBudgets(newBudgets);
    };
    getBudgets();
  }, [submitted]);
  useEffect(() => {
    if (budgets.length === 0) {
      setHasBudget(false);
    }
  }, []);

  const handleDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
    const svgElement = (e.target as HTMLElement).closest("svg");
    try {
      if (svgElement) {
        const id = svgElement.dataset.id;
        console.log(id);
        const deleted = await fetchUtil("/api/budget", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id }),
        });
      }
      setSubmitted(!submitted);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`${hasBudget ? "flex" : "hidden"} flex-col  gap-5`}
      onClick={handleDelete}>
      <table className="w-96 min-h-fit  shadow-lg rounded-md bg-custom-white">
        <thead>
          <tr>
            <th>Category</th>
            <th>Budget</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="">
          {budgets.map((budget) => {
            return (
              <tr className="bg-white border  rounded-md" key={budget.id}>
                <td className="text-center capitalize">
                  {budget.name.toLowerCase()}
                </td>
                <td className="text-center ">${budget.amount}</td>
                <td className="">
                  <svg
                    data-id={budget.id}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 m-auto cursor-pointer hover:scale-110 hover:text-custom-blue transition-all duration-500 ">
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center">
        <button
          onClick={toggleActive}
          type="submit"
          className="bg-custom-blue rounded-md text-white p-2 cursor-pointer hover:bg-blue-500 hover:scale-110 transition-all duration-500">
          Add A Budget
        </button>
      </div>
    </div>
  );
}
