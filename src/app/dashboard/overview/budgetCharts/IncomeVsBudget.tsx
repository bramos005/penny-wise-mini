import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { fetchUtil } from "@/app/utils/fetch";
import { getBudget } from "@/app/utils/getBudget";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
    ResponsiveContainer,
  XAxis
} from "recharts";
import budget from "@/app/api/budget/budget-controller";

interface Data {
  name: string;
  income: number;
  budget: number;
}

export function IncomeVsBudget({ budgets, income, setIncome }: any) {
  const [data, setData] = useState<Data[]>([]);
  const { user } = useUser();


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
  }, [budgets]);

  useEffect(() => {
    if (income > 0) {
      const budgetAlloc = getBudget(budgets);
  
      setData([{ name: "Current Month", income: income, budget: budgetAlloc }]);
    }
  }, [income, budgets]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "white",
            padding: "10px",
            border: `1px solid #9AA6B8`,
            color: "#9AA6B8",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
            borderRadius: "5px",
          }}>
          <p style={{ margin: 0 }}>{payload[0].payload.name}</p>
          <p style={{ margin: 0 }}>
            ${payload[0].payload.income} income / month
          </p>
          <p style={{ margin: 0 }}>
            ${payload[0].payload.budget} budget / month
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-[100%] flex flex-col items-center jsutify-center">
      <div className="flex items-center justify-between">
        <h1 className="p-5 font-bold">Income vs Budget</h1>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid stroke="#F1F4F8" horizontal={true} vertical={false} />
          <Bar
            dataKey="income"
            fill="#82ca9d"
            maxBarSize={30}
            radius={[5, 5, 0, 0]}
          />
          <Bar
            dataKey="budget"
            fill="#245EE7"
            maxBarSize={30}
            radius={[5, 5, 0, 0]}
          />
          <XAxis axisLine={false} dataKey="name" tickMargin={10} tick={false} />
          <Tooltip cursor={false} content={<CustomTooltip />} />
          <Legend align="right" layout="vertical" verticalAlign="middle" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
