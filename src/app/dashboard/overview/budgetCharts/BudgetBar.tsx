"use client";
import { Dot } from "@/app/ui-components/Dot";
import { getBudgetBarValues } from "@/app/utils/getBudgetBarValues";
import { Budget } from "@prisma/client";
import { useState, useEffect } from "react";
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

interface Props {
  budgets: Budget[];
}
interface Data {
  name: string;
  amount: number;
}

export function BudgetBar({ budgets }: Props) {
  const [data, setData] = useState<Data[]>();
  useEffect(() => {
    setData(getBudgetBarValues(budgets).sort((a, b) => a.amount - b.amount));
  }, [budgets]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "white", // Slightly transparent white
            padding: "10px",
            border: `1px solid #245EE7`, // Your primary color
            color: "#245EE7", // Text color
            boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
            borderRadius: "5px",
          }}>
          <p style={{ margin: 0 }}>{payload[0].payload.name}</p>
          <p style={{ margin: 0 }}>${payload[0].payload.amount} / month</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="p-5 font-bold">Monthly Budgets</h1>
        <div className="flex gap-5 pr-5">
          <div className="flex items-center gap-2 border-2 bg-white  p-1 px-2 rounded-md">
            <Dot color="bg-custom-blue"></Dot>
            <p className="font-semibold text-gray-700 ">Budget</p>
          </div>
        </div>
      </div>

      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid stroke="#F1F4F8" horizontal={true} vertical={false} />
        <XAxis axisLine={false} dataKey="name" tickMargin={10} tick={false} />
        <YAxis axisLine={false} />
        <Tooltip cursor={false} content={<CustomTooltip />} />

        <Bar
          dataKey="amount"
          fill="#245EE7"
          maxBarSize={30}
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </div>
  );
}
