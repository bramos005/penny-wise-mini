"useClient"
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function BudgetPie (){
  const COLORS = ['#245EE7', '#5078D4', '#1B4B9A', '#29B6F6'];
const data = [
  { name: 'Rent', value: Math.round(Math.random() * 1000) },
  { name: 'Groceries', value: Math.round(Math.random() * 1000) },
  { name: 'Utilities', value: Math.round(Math.random() * 1000) },
  { name: 'Transportation', value: Math.round(Math.random() * 1000) },
  { name: 'Entertainment', value: Math.round(Math.random() * 1000) },
  { name: 'Savings', value: Math.round(Math.random() * 1000) },
  { name: 'Miscellaneous', value: Math.round(Math.random() * 1000) }
];

    return (
      <div className="h-96 w-96 z-0 ">
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
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer></div>
  );
};


