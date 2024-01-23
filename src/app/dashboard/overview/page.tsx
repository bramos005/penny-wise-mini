"use client";
import { Sidebar } from "@/app/ui-components/Sidebar";
import { BudgetBar } from "./budgetCharts/BudgetBar";
import { useEffect, useState } from "react";
import { NavBar } from "@/app/ui-components/NavBar";
import { IncomeVsBudget } from "./budgetCharts/IncomeVsBudget";
import { Budget } from "@prisma/client";
import { fetchUtil } from "@/app/utils/fetch";
import { BudgetPie } from "./budgetCharts/BudgetPie";
import { getPercentage } from "@/app/utils/getPercentage";
import { getPieValues } from "@/app/utils/getPieValues";
import { useUser } from "@clerk/nextjs";
import { getBudget } from "@/app/utils/getBudget";
import Aos from "aos";

export default function Overview() {
  const [menu, setMenu] = useState(true);
  const [hasBudget, setHasBudget] = useState(false);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [income, setIncome] = useState(10000);

  const handleToggle = () => {
    setMenu(true);
  };

  const { user } = useUser();
  useEffect(() => {
    const getBudgets = async () => {
      if (user) {
        const externalId = user.id;
        try {
          const [newBudgets] = await fetchUtil(
            `/api/budget?externalId=${encodeURIComponent(externalId)}`
          );
          setTimeout(() => {
            setIsLoaded(true);
          },0)
          setBudgets(newBudgets);
          
          
        } catch (err) {
          console.error(err);
        }
      }
    };
    getBudgets();
  }, [user]);

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
    }
  }, [budgets]);

  return (
    <div className="flex">
      <div className="z-[10000000]">
        <Sidebar />
      </div>

      <div className=" w-[100vw] flex flex-col  gap-16 p-6  900:ml-[15.5rem] ">
        <div
          className={`flex border-b justify-end  ml-[-2rem] mr-[-.5rem]  mt-[-1.1rem] py-2`}>
          <NavBar></NavBar>
        </div>

        <div className={`${!isLoaded ? "hidden" : ""}`} data-aos="zoom-in">
          <div>
            {!hasBudget && (
              <div
                className={` flex font-semibold text-gray-700  text-2xl flex-col  h-[80vh] text-center  justify-center items-center w-fit fixed z-[30000] 900:w-[80vw] 900:text-3xl`}>
                <p>Insufficient data for an overview.</p>
                <p>Please add budgets to unlock insights.</p>
              </div>
            )}

            <div className=" shadow-mdflex flex-col gap-2 mt-[-3rem]">
              <h1 className="text-3xl font-semibold text-gray-700">Overview</h1>
              <p className="text-custom-gray font-semibold">
                Heres what's happening in your finance.
              </p>
            </div>
          </div>

          {hasBudget && (
            <div className={`flex items-center  flex-wrap  gap-16`}>
              <div
                data-aos="zoom-in"
                className=" w-[90vw] md:w-[39rem] border bg-custom-white rounded-xl   shadow-black ">
                <BudgetBar budgets={budgets} />
              </div>
              <div className="border bg-custom-white rounded-xl w-[90vw]  shadow-black md:w-[28rem]">
                <BudgetPie budgets={budgets} />
              </div>
              <div className="flex flex-col 1409:flex-row items-center  gap-20 flex-wrap">
                <div
                  data-aos="zoom-in"
                  className="w-[90vw] md:w-[39rem] border bg-custom-white rounded-xl   shadow-black ">
                  <IncomeVsBudget
                    income={income}
                    setIncome={setIncome}
                    budgets={budgets}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <p className="text-xl self-center font-semibold text-gray-700">
                    Your budgets take up{" "}
                    <p className="text-custom-blue text-2xl inline-flex">
                      {Math.round(getPercentage(income, getBudget(budgets)))}
                    </p>
                    % of your income
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
