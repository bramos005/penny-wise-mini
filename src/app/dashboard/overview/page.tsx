
import { Sidebar } from "@/app/ui-components/Sidebar";
import {MoneyStatistics} from "./MoneyStatistics";
export default function Overview() {
  return (
    <div className="flex">
      <Sidebar />
      <div data-aos="fade-right" className="flex p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl">Overview</h1>
          <p className="text-custom-gray">
            Heres what's happening in your finance.
          </p>
          <div className="border-2 rounded-xl shadow-sm shadow-black  mt-5">
            <MoneyStatistics></MoneyStatistics>
          </div>
        </div>
      </div>
    </div>
  );
}
