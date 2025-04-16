
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Seg", attendance: 115 },
  { day: "Ter", attendance: 98 },
  { day: "Qua", attendance: 106 },
  { day: "Qui", attendance: 120 },
  { day: "Sex", attendance: 112 },
  { day: "Sáb", attendance: 75 },
  { day: "Dom", attendance: 30 },
];

const AttendanceChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip 
          formatter={(value) => [`${value} alunos`, "Frequência"]} 
          labelFormatter={(label) => `Dia: ${label}`}
        />
        <Bar dataKey="attendance" fill="#3B82F6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AttendanceChart;
