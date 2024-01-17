import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Budget } from "@prisma/client";
import { getPieValues } from "@/app/utils/getPieValues";
import { PieLegend } from "./PieLegend";
interface BudgetProps {
  budgets: Budget[];
}

interface Data {
  name: string;
  value: number;
}

export function BudgetPie({ budgets }: BudgetProps) {
  const [data, setData] = useState<Data[]>([
    { name: "Savings&Investments", value: 0 },
    { name: "Housing", value: 0 },
    { name: "Food", value: 0 },
    { name: "Shopping", value: 0 },
    { name: "Entertainment", value: 0 },
    { name: "Transportation", value: 0 },
    { name: "Education", value: 0 },
    { name: "Miscellaneous", value: 0 },
  ]);

  useEffect(() => {
    setData(getPieValues(budgets));
  }, [budgets]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const formattedValue = `$${value.toFixed(2)}`;

      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "white",
            padding: "10px",
            border: `1px solid `,
            color: "gray-500",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
            borderRadius: "5px",
          }}>
          <p style={{ margin: 0 }}>{name}</p>
          <p style={{ margin: 0 }}>{formattedValue} / month</p>
        </div>
      );
    }

    return null;
  };

  const colors = [
    "#FF6B6B",
    "#4FD1C5",
    "#F6AD55",
    "#9F7AEA",
    "#68D391",
    "#FEB2B2",
    "#63B3ED",
  ];

  return (
    <div className="flex items-center">
      <div className="h-96 w-full z-0 flex flex-col  p-5 items-center justify-center">
        <h2 className="p-5 font-bold">Budgets By Category</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%" // Adjust the horizontal position of the Pie
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend align="right" verticalAlign="middle" layout="vertical" wrapperStyle={{fontSize: '12px', marginLeft:"px"}} /> */}
          </PieChart>
        </ResponsiveContainer>
       
      </div>
      <div>
          <PieLegend></PieLegend>
        </div>
    </div>
  );
}
