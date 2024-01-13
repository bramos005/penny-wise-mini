"use client";
import { disconnect } from "process";
import { Budget } from "@prisma/client";
import { useState, ChangeEvent, FormEvent } from "react";
import { fetchUtil } from "@/app/utils/fetch";
interface budgetFormProps {
  isActive: boolean;
  toggleActive: () => void;
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
  hasBudget: boolean;
  setHasBudget: (hasBudget: boolean) => void;
}

export function BudgetForm({
  isActive,
  toggleActive,
  budgets,
  setBudgets,
  setSubmitted,
  submitted,
  hasBudget,
  setHasBudget,
}: budgetFormProps) {
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      setBudgetAmount("");
    } else {
      setBudgetAmount(e.target.value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    const form = e.target as HTMLFormElement;
    e.preventDefault();
    const newBudget = await fetchUtil("/api/budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: budgetName, amount: budgetAmount }),
    });

    setSubmitted(!submitted);
    setHasBudget(true);
    setBudgetAmount("");
    setBudgetName("");
    toggleActive();
    console.log(newBudget);
  };
  return (
    <div
      data-aos="fade-right"
      className={` ${
        isActive ? "flex" : "hidden"
      }   flex-col items-center justify-center h-fit border-2 p-5 shadow-xl  rounded-md  bg-white `}>
      <button onClick={toggleActive}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 absolute top-3 right-3 hover:text-custom-blue transition duration-300">
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <h1 className="text-2xl mb-10 mt-10 font-bold">Add a Budget</h1>
      <form
        className="flex flex-col"
        aria-label="Add Budget Form"
        onSubmit={handleSubmit}>
        <label htmlFor="name"></label>
        <input
          onChange={(e) => setBudgetName(e.target.value)}
          value={budgetName}
          className=" p-2 border-2 rounded-md w-72 mb-7"
          placeholder="Budget Name"
          id="name"
          name="name"
          type="text"
          required
        />

        <label className="mb-2" htmlFor="amount"></label>
        <input
          value={budgetAmount}
          onChange={handleAmountChange}
          className=" p-2 border-2 rounded-md w-72  mb-7"
          placeholder="$ Budget Amount"
          type="number"
          id="amount"
          name="amount"
          required
        />

        <button
          type="submit"
          className="bg-custom-blue rounded-md text-white p-1 cursor-pointer hover:bg-blue-500 ">
          Add
        </button>
      </form>
    </div>
  );
}
