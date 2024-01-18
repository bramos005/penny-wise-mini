"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "@/app/ui-components/Sidebar";
import { NavBar } from "@/app/ui-components/NavBar";
import { useUser } from "@clerk/nextjs";
import { fetchUtil } from "@/app/utils/fetch";

export default function Statistics() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [income, setIncome] = useState(0);
  const [budgets, setBudgets] = useState();
  const [clicked, setClicked] = useState();
  const [report, setReport] = useState("");
  const { user } = useUser();
  const [generatingPage, setGeneratingPage] = useState("generating.");

  useEffect(() => {
    if (isGenerating) {
      setInterval(() => {
        setTimeout(() => {
          setGeneratingPage("generating..");
        }, 200);
        setTimeout(() => {
          setGeneratingPage("generating...");
        }, 400);

        setTimeout(() => {
          setGeneratingPage("generating.");
        });
      }, 500);
    }
  }, [isGenerating]);

  useEffect(() => {
    const getIncome = async () => {
      if (user) {
        const externalId = user.id;
        const [retrievedIncome] = await fetchUtil(
          `/api/income?externalId=${encodeURIComponent(externalId)}`
        );

        setIncome(retrievedIncome.income);
      }
    };

    getIncome();
  }, [user]);

  useEffect(() => {
    const getBudgets = async () => {
      if (user) {
        const externalId = user.id;
        const [newBudgets] = await fetchUtil(
          `/api/budget?externalId=${encodeURIComponent(externalId)}`
        );
        console.log(newBudgets);
        setBudgets(newBudgets);
      }
    };
    getBudgets();
  }, [user]);

  const generateReport = async () => {
    const report = await fetchUtil("/api/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ income, budgets }),
    });
    return report;
  };

  const handleClick = async () => {
    setIsGenerating(true);
    const [res] = await generateReport();
    console.log(res);
    setTimeout(() => {
      setReport(res.report);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className={`flex`}>
      <div className={`${isGenerating ? "pointer-events-none" : ""}  z-[10000] `}>
        <Sidebar />
      </div>

      <div
        data-aos="zoom-in"
        className="flex flex-col  w-screen h-[90vh] pl-7 gap-y-10 900:ml-[17rem]">
        <div className=" flex border-b justify-end mb-10 ml-[-2rem] py-3 mr-3">
          <NavBar></NavBar>
        </div>

        <div>
          <div className="flex flex-col gap-2  mt-[-4rem]">
            <h1 className="text-3xl font-semibold text-gray-700 ">Report</h1>
            <p className="text-custom-gray font-semibold">
              Discover, Analyze, learn
            </p>

            <div className="flex flex-col gap-5  h-[59vh] justify-center items-center">
              <div
                className={`${
                  report === "" ? "hidden" : ""
                } flex flex-col w-[50vw] border rounded-md shadow-md bg-custom-white`}>
                <pre className="text-wrap">{report}</pre>
              </div>

              <button
                onClick={handleClick}
                className={` ${isGenerating ? "hidden" : ""} ${
                  report !== "" ? "hidden" : ""
                } border p-2 bg-custom-blue  text-lg text-white font-medium rounded-xl   hover:bg-blue-500  `}>
                generate a budget report
              </button>
            </div>
          </div>
          <div
            className={`${
              !isGenerating ? "hidden" : ""
            } text-xl fixed right-[37vw]  bottom-96`}>
            <p>{generatingPage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
