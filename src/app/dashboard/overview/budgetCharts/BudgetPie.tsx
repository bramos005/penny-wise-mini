"useClient"

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Budget } from '@prisma/client';
import { useEffect, useState } from 'react';
import { getPieValues } from '@/app/utils/getPieValues';
interface  BudgetProps {
  budgets: Budget[]
}


interface Data {
  name: string,
  value: number
}

export function BudgetPie({ budgets }: BudgetProps) {

  const [data, setData] = useState<Data[]>([{ name: "Savings&Investments", value: 0 },
  { name: "Housing", value: 0 },
  { name: "Food", value: 0 },
  { name: "Shopping", value: 0 },
  { name: "Entertainment", value: 0 },
  { name: "Transportation", value: 0 },
  { name: "Education", value: 0 },
  { name: "Miscellaneous", value: 0 }])
  useEffect(() => {
    setData(getPieValues(budgets));
  }, [budgets])
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const formattedValue = `$${value.toFixed(2)}`;
      
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: "white",
          padding: "10px",
          border: `1px solid #245EE7`,
          color: "#245EE7",
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
  const COLORS = [
    'rgb(36, 94, 231)',   // Base Color
    'rgb(41, 99, 236)',   // Slightly Lighter
    'rgb(31, 89, 226)',   // Slightly Darker
    'rgb(46, 104, 241)',  // More Lighter
    'rgb(26, 84, 221)',   // More Darker
    'rgb(51, 109, 246)',  // Even More Lighter
    'rgb(21, 79, 216)'    // Even More Darker
  ];
;
// const data = [
//   { name: 'Rent', value: Math.round(Math.random() * 1000) },
//   { name: 'Groceries', value: Math.round(Math.random() * 1000) },
//   { name: 'Utilities', value: Math.round(Math.random() * 1000) },
//   { name: 'Transportation', value: Math.round(Math.random() * 1000) },
//   { name: 'Entertainment', value: Math.round(Math.random() * 1000) },
//   { name: 'Savings', value: Math.round(Math.random() * 1000) },
//   { name: 'Miscellaneous', value: Math.round(Math.random() * 1000) }
// ];

    return (
      <div className="h-96 w-96 z-0 flex flex-col p-5 items-center justify-center">
        <h2 className="p-5 font-bold">Budgets By Category</h2>
        
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
        //   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
            >
              {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
          
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
      </PieChart>
    </ResponsiveContainer></div>
  );
};


