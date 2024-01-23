"use client";
import { Sidebar } from "@/app/ui-components/Sidebar";
import { BudgetForm } from "./budgetForm";
import { BudgetTable } from "./BudgetTable";
import { useEffect, useState } from "react";
import { getBudget } from "@/app/utils/getBudget";
import { Budget } from "@prisma/client";
import { NavBar } from "@/app/ui-components/NavBar";
import { BudgetPie } from "../overview/budgetCharts/BudgetPie";
import { BudgetBar } from "../overview/budgetCharts/BudgetBar";
import Aos from "aos";


export default function BudgetSetup() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasBudget, setHasBudget] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [budgets, setBudgets] = useState<Budget[] | []>([]);
  const toggleActive = () => {
    setIsActive(!isActive);
  };
  useEffect(() => {
    Aos.init()
  },[])
  useEffect(() => {
    if (isLoaded) {
      Aos.refresh();
    }
  }, [isLoaded,hasBudget]);

 
  


  const budgetAlloc = getBudget(budgets);
  return (
    <div className={`flex`}>
      <div className="z-[10000]">
        <Sidebar />
      </div>

      <div  className="flex flex-col w-screen h-[90vh]  gap-y-10 900:ml-[17rem] ">
 
        <div className=" flex border-b mt-[.3rem] justify-end mb-10 ml-[-2rem] pt-2 pb-[.7rem] mr-3 900:w-[75vw] 1280:w-[79vw] 1300:w-[80vw] 1409:w-[81vw] 1500:w-[83vw]">
          <NavBar></NavBar>
        </div>
        <div data-aos="zoom-in" className="flex flex-col gap-2 ml-8   mt-[-4rem] 900:ml-0  ">
          <h1 className="text-3xl font-semibold text-gray-700  s">Budgets</h1>
          <p className="text-custom-gray font-semibold">Plan, Track, Achieve.</p>
        </div>
        <div data-aos="zoom-in" className=" flex mt-[-2.5rem] gap-20 flex-wrapitems-center"></div>
        <div
          className={`flex w-fit ${
            hasBudget ? " justify-center " : "h-[80vh] w-[78vw]"
          } items-center  flex-wrap gap-3 `}>
          <div data-aos="zoom-in"
            className={`flex flex-col gap-3  ${
              hasBudget ? "shadow-md bg-custom-white" : ""
            } justify-center items-center mb-20 rounded-xl p-5   max-h-[55rem]`}>
            <div  
              className={`${isActive || !hasBudget || !isLoaded ? "opacity-30" : "opacity-100"}  flex transition-all  duration-300`}>
              <BudgetTable
                isLoaded={isLoaded}
                setIsLoaded={setIsLoaded}
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
               !isLoaded || hasBudget  ? "hidden" : " "
              } flex gap-7 flex-col justify-center items-center transition-all duration-100 text-center ease-in-out w-[93vw] 900:w-[60vw] lg:w-[70vw] xl:w-[80vw] `}>
              <h1 className=" flex text-3xl   font-semibold text-gray-700 sm: justify-center">
                You currently have no budgets in place
              </h1>
              <button
                onClick={toggleActive}
                className="border p-2 bg-custom-blue  text-lg text-white font-medium  rounded-xl   hover:bg-blue-500  ">
                Add a Budget
              </button>
            </div>
            <div className="flex flex-col absolute  z-[50000]">
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
            </div>
          </div>
          <div
            className={` ${isActive ? "opacity-30" : ""} ${
              hasBudget ? "" : "hidden"
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
