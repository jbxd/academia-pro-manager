
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Out", revenue: 18560 },
  { month: "Nov", revenue: 19650 },
  { month: "Dez", revenue: 22400 },
  { month: "Jan", revenue: 24580 },
  { month: "Fev", revenue: 23120 },
  { month: "Mar", revenue: 26000 },
];

const RevenueChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" />
        <YAxis 
          tickFormatter={(value) => `R$ ${value/1000}k`} 
          axisLine={false}
          tickLine={false}
        />
        <Tooltip 
          formatter={(value) => [`R$ ${value}`, "Receita"]} 
          labelFormatter={(label) => `Mês: ${label}`}
        />
        <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
