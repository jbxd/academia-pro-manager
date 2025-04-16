
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Em dia", value: 178, color: "#10B981" },
  { name: "Vencendo", value: 52, color: "#F59E0B" },
  { name: "Atrasados", value: 12, color: "#EF4444" },
  { name: "Inadimplentes", value: 6, color: "#6B7280" },
];

const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#6B7280"];

const StudentStatusChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} alunos`, undefined]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StudentStatusChart;
