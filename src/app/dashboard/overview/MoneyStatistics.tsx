"use client";
import { Dot } from "../../ui-components/Dot";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const data = [
  { name: "Jan", income: 1300, expenses: 500 },
  { name: "Feb", income: 1500, expenses: 300 },
  { name: "Mar", income: 900, expenses: 400 },
  { name: "Apr", income: 2000, expenses: 1100 },
  { name: "May", income: 3000, expenses: 500 },
  { name: "Jun", income: 3000, expenses: 1300 },
  { name: "Jul", income: 4000, expenses: 1500 },
  { name: "Aug", income: 2000, expenses: 600 },
  { name: "Sep", income: 1000, expenses: 700 },
  { name: "Oct", income: 5000, expenses: 400 },
  { name: "Nov", income: 2300, expenses: 300 },
  { name: "Dec", income: 3000, expenses: 1100 },
];
export function MoneyStatistics() {
  return (
    <div>
      <div className="flex items-center justify-between  ">
        <h1 className="p-5 font-bold">Penny statistics</h1>
        <div className="flex gap-5 pr-5">
          <div className="flex items-center gap-2 border-2 p-1 px-2 rounded-md">
            <Dot color="bg-custom-blue"></Dot>
            <p>Income</p>
          </div>

          <div className="flex items-center gap-2 border-2 p-1 px-2 rounded-md">
            <Dot color="bg-[#D3D8E3]" />
            <p>Expenses</p>
          </div>
        </div>
          </div>
          
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid stroke="#F1F4F8" horizontal={true} vertical={false} />
        <XAxis axisLine={false} dataKey="name" tickMargin={10} tick={{ fontWeight: "400", color: "#9AA6B8" } } />
        <YAxis axisLine={false} />
              <Tooltip cursor={false} />

        <Bar dataKey="income" fill="#245EE7" radius={[5, 5, 0, 0]} />
        <Bar dataKey="expenses" fill="#D3D8E3" radius={[5, 5, 0, 0]} />
      </BarChart>
    </div>
  );
}
