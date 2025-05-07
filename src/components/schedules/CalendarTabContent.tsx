
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface CalendarTabContentProps {
  cardClasses: string;
}

export const CalendarTabContent: React.FC<CalendarTabContentProps> = ({ cardClasses }) => {
  return (
    <Card className={cardClasses}>
      <CardHeader>
        <CardTitle>Calendário de Aulas</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="mt-2">Calendário de aulas seria exibido aqui</p>
        </div>
      </CardContent>
    </Card>
  );
};
