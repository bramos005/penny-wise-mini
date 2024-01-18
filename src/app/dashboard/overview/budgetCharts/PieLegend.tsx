import { Dot } from "@/app/ui-components/Dot";

["#FF6B6B", "#4FD1C5", "#F6AD55", "#9F7AEA", "#68D391", "#FEB2B2", "#63B3ED"];
export function PieLegend() {
  return (
    <div className="flex text-[7px] gap-3 flex-col mr-5 sm:text-sm">
      <div className="flex gap-2 items-center">
        <Dot color="bg-[#FF6B6A] "></Dot>
        <p>Savings/Investments</p>
      </div>

      <div className="flex gap-2 items-center">
        <Dot color="bg-[#4FD1C5]"></Dot>
        <p>Housing</p>
      </div>

      <div className="flex gap-2 items-center">
        <Dot color="bg-[#F6AE55]"></Dot>
        <p>Food</p>
      </div>

      <div className="flex gap-2 items-center">
        <Dot color="bg-[#A07AEA]"></Dot>
        <p>Shopping</p>
      </div>

      <div className="flex gap-2 items-center">
        <Dot color="bg-[#68D391]"></Dot>
        <p>Entertainment</p>
      </div>

      <div className="flex gap-2 items-center">
        <Dot color="bg-[#FEB2B2]"></Dot>
        <p>Transportation</p>
      </div>

      <div className="flex gap-2 items-center">
        <Dot color="bg-[#63B3ED]"></Dot>
        <p>Education</p>
      </div>

      <div className="flex gap-2 items-center">
        <Dot color="bg-[#FF6B6A]"></Dot>
        <p>Miscellaneous</p>
      </div>
    </div>
  );
}
