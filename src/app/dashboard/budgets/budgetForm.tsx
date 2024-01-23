"use client";
import { disconnect } from "process";
import { Budget } from "@prisma/client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { fetchUtil } from "@/app/utils/fetch";
import { useUser } from "@clerk/nextjs";
import Aos from "aos";
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
  setSubmitted,
  submitted,
  setHasBudget,
}: budgetFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [frequency, setFrequency] = useState("");
  const [userId, setUserid] = useState("");
  const { user } = useUser();

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      setAmount("");
    } else {
      setAmount(e.target.value);
    }
  };
  
  useEffect(() => {
  Aos.refresh()
},[isActive])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
   

    if (user) {
      const externalId = user.id;
      const newBudget = await fetchUtil("/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, amount, category, frequency, externalId }),
      });
    }

    setSubmitted(!submitted);
    setHasBudget(true);
    setAmount("");
    setName("");
    setCategory("selectCategory");
    toggleActive();
  };
  return (
    <div
      data-aos="flip-left"
      className={` ${
        isActive ? "flex" : "hidden"
      }   flex-col items-center justify-center h-fit border-2 p-5 shadow-xl   rounded-md  bg-white z-20000`}>
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
        <label htmlFor="frequency"></label>
        <select
          onChange={(e) => setFrequency(e.target.value)}
          value={frequency}
          className={` p-2 border-2 rounded-md w-72 mb-7 ${
            frequency === "" ? "text-custom-gray" : ""
          }`} required>
          <option value="" disabled>
            Select A Frequency
          </option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <label htmlFor="category"></label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className={` p-2 border-2 rounded-md w-72 mb-7 ${
            category === "" ? "text-custom-gray" : ""
          }`}
          id="category"
          name="category"
          required>
          <option className="text-custom-white" value="" disabled >
            Select A Category
          </option>
          <option value="savings&investments">Savings / Investments</option>
          <option value="housing">Housing </option>
          <option value="food">Food</option>
          <option value="shopping">Shopping</option>
          <option value="entertainment">Entertainment</option>
          <option value="transportation">Transportation</option>
          <option value="education">Education</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
        <label htmlFor="name"></label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className=" p-2 border-2 rounded-md w-72 mb-7"
          placeholder="Budget Name"
          id="name"
          name="name"
          type="text"
          required
        />

        <label className="mb-2" htmlFor="amount"></label>
        <input
          value={amount}
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
