"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "@/app/ui-components/Sidebar";
import { NavBar } from "@/app/ui-components/NavBar";
import { useUser } from "@clerk/nextjs";
import { fetchUtil } from "@/app/utils/fetch";

export default function Statistics() {
  const [income, setIncome] = useState(0);
  const [budgets, setBudgets] = useState();
  const [clicked, setClicked] = useState();
  const { user } = useUser();

  useEffect(() => {
    const getIncome = async () => {
      if (user) {
        const externalId = user.id;
        const [retrievedIncome] = await fetchUtil(
          `/api/income?externalId=${encodeURIComponent(externalId)}`
        );
        console.log(retrievedIncome);
        setIncome(retrievedIncome.income);
      }
    };

    getIncome();
  }, []);

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

  const generateReport = async () => {
    const report = await fetchUtil("/api/budget?", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({income,budgets})
    })
    return report;
      ;
  };

  return (
    <div className={`flex`}>
      <div>
        <Sidebar />
      </div>

      <div
        data-aos="zoom-in"
        className="flex flex-col ml-[17rem] w-screen h-[90vh]  gap-y-10">
        <div className=" flex border-b justify-end mb-10 ml-[-2rem] py-3 mr-3">
          <NavBar></NavBar>
        </div>
        <div className="flex flex-col gap-2    mt-[-4rem]">
          <h1 className="text-3xl font-semibold text-gray-700">Report</h1>
          <p className="text-custom-gray font-semibold">
            Discover, Analyze, learn
          </p>

          <div className="flex flex-col gap-5  h-[59vh] justify-center items-center">
            <p className="text-xl ">
              WARNING* you can only generate one report every 5 minutes
            </p>
            <button className="border p-2 bg-custom-blue  text-lg text-white font-medium rounded-xl   hover:bg-blue-500  ">
              generate a budget report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
