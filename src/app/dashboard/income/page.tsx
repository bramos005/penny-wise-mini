"use client";
import { FormEvent, useState, useEffect } from "react";
import { Sidebar } from "@/app/ui-components/Sidebar";
import { NavBar } from "@/app/ui-components/NavBar";
import { fetchUtil } from "@/app/utils/fetch";
import { useUser } from "@clerk/nextjs";
export default function Income() {
  const [income, setIncome] = useState("0");
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const handleFocus = () => {
    setShowPopup(true);
    setIsSubmitted(false);
  };
  const handleBlur = () => {
    setShowPopup(false);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIncome(income);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
    if (user) {
      const externalId = user.id;
      const setIncome = await fetchUtil("/api/income", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ externalId, income }),
      });
    }
  };
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

  return (
    <div className="flex ">
      <div className="z-[10000]">
        <Sidebar />
      </div>
      <div
       
        className="flex flex-col w-screen   p-6 900:ml-[15.5rem]  ">
        <div className=" flex border-b justify-end ml-[-2rem] mr-[-.5rem] pb-[.7rem] mt-[-1rem] pt-[.3rem]  ">
          <NavBar></NavBar>
        </div>
        <div  data-aos="zoom-in" className="flex flex-col   gap-y-10">
          <div className="flex flex-col gap-2    py-6">
            <h1 className="text-3xl font-semibold text-gray-700">Income</h1>
            <p className="text-custom-gray font-semibold">Earn, Record, Grow</p>
            <p
              className={` ${
                !showPopup ? "hidden" : "fixed"
              } bottom-16 left-60 text-custom-gray`}>
              press enter to submit
            </p>
            <p
              className={` ${
                !isSubmitted ? " hidden " : "fixed "
              } bottom-[-1rem] left-[17.8rem] text-custom-blue font-semibold`}>
              Submitted!
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className=" font-semibold  text-xl flex mt-[-2.5rem] gap-5 flex-wrap items-center">
            <label className="text-gray-700" htmlFor="income">
              My Monthly Income is
            </label>

            <input
              value={income}
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="number"
              onChange={(e) => setIncome(e.target.value)}
              placeholder="0"
              className=" border-2 rounded-md text-custom-blue  w-36"
              id="income"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
