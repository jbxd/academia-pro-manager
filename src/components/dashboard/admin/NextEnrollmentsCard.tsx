
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const NextEnrollmentsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Próximas Matrículas</CardTitle>
        <CardDescription>
          Alunos com matrícula para esta semana
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { name: "Carolina Mendes", date: "Hoje, 14:30", plan: "Plano Trimestral" },
            { name: "Bruno Alves", date: "Amanhã, 10:00", plan: "Plano Anual" },
            { name: "Fernanda Torres", date: "Quarta, 16:00", plan: "Plano Mensal" },
          ].map((student, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-2 last:border-0"
            >
              <div>
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-muted-foreground">{student.date}</p>
              </div>
              <div>
                <span className="bg-primary/10 text-primary text-xs rounded-full px-2 py-1">
                  {student.plan}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
