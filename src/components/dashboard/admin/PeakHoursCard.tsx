
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const PeakHoursCard = () => {
  const schedules = [
    { time: "18:00 - 19:00", day: "Segunda a Sexta", occupation: 95 },
    { time: "19:00 - 20:00", day: "Segunda a Sexta", occupation: 90 },
    { time: "17:00 - 18:00", day: "Segunda a Sexta", occupation: 85 },
    { time: "10:00 - 11:00", day: "Sábado", occupation: 80 },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Horários Mais Procurados</CardTitle>
        <CardDescription>
          Horários com maior ocupação esta semana
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedules.map((schedule, index) => (
            <div
              key={index}
              className="space-y-1 border-b pb-2 last:border-0"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{schedule.time}</p>
                <span className="text-sm font-medium">{schedule.occupation}%</span>
              </div>
              <div className="text-sm text-muted-foreground">{schedule.day}</div>
              <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${schedule.occupation}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
