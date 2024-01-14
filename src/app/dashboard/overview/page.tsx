"use client"
import { Sidebar } from "@/app/ui-components/Sidebar";
import {MoneyStatistics} from "./MoneyStatistics";
export default function Overview() {
  return (
    <div className="flex">
      <Sidebar />
      <div data-aos="flip-left" className="flex p-6 ml-60">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-gray-700">Overview</h1>
          <p className="text-custom-gray font-semibold">
            Heres what's happening in your finance.
          </p>
          <div className="border-2 rounded-xl  shadow-black  mt-5">
            <MoneyStatistics></MoneyStatistics>
          </div>
        </div>
      </div>
    </div>
  );
}
