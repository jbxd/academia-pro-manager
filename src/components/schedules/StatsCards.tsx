
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Clock } from "lucide-react";

interface StatsCardsProps {
  isAdmin: boolean;
  cardClasses: string;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ isAdmin, cardClasses }) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className={cardClasses}>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className={isAdmin ? "text-gray-300 text-sm" : "text-muted-foreground text-sm"}>Turmas Ativas</p>
            <p className="text-3xl font-bold">12</p>
            <p className="text-xs">5 modalidades</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-custom-red/20 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-custom-red" />
          </div>
        </CardContent>
      </Card>

      <Card className={cardClasses}>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className={isAdmin ? "text-gray-300 text-sm" : "text-muted-foreground text-sm"}>Instrutores</p>
            <p className="text-3xl font-bold">8</p>
            <p className="text-xs">Disponíveis</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-custom-red/20 flex items-center justify-center">
            <Users className="h-6 w-6 text-custom-red" />
          </div>
        </CardContent>
      </Card>

      <Card className={cardClasses}>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className={isAdmin ? "text-gray-300 text-sm" : "text-muted-foreground text-sm"}>Horário Pico</p>
            <p className="text-3xl font-bold">18:00</p>
            <p className="text-xs">95% ocupação</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-custom-red/20 flex items-center justify-center">
            <Clock className="h-6 w-6 text-custom-red" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
