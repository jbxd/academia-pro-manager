
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface AnalyticsTabProps {
  cardClasses: string;
  isAdmin: boolean;
  popularTimes: Array<{
    time: string;
    days: string;
    occupation: number;
  }>;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ 
  cardClasses, 
  isAdmin, 
  popularTimes 
}) => {
  return (
    <>
      <Card className={cardClasses}>
        <CardHeader>
          <CardTitle>Horários Mais Procurados</CardTitle>
          <CardDescription className={isAdmin ? "text-gray-300" : ""}>
            Horários com maior ocupação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularTimes.map((time, index) => (
              <div
                key={index}
                className="space-y-1 border-b pb-2 last:border-0"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">{time.time}</p>
                  <span className="text-sm font-medium">{time.occupation}%</span>
                </div>
                <div className={isAdmin ? "text-sm text-gray-300" : "text-sm text-muted-foreground"}>
                  {time.days}
                </div>
                <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                  <div
                    className="h-full bg-custom-red"
                    style={{ width: `${time.occupation}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className={`mt-4 ${cardClasses}`}>
        <CardHeader>
          <CardTitle>Distribuição de Alunos</CardTitle>
          <CardDescription className={isAdmin ? "text-gray-300" : ""}>
            Alunos por dia da semana e horário
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <Users className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-2">Gráfico de distribuição de alunos seria exibido aqui</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
