
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

interface Schedule {
  id: string | number;
  name: string;
  instructor: string;
  days: string[];
  time: string;
  capacity: number;
  current: number;
  status: string;
}

interface ScheduleListProps {
  schedules: Schedule[];
  isAdmin: boolean;
  cardClasses: string;
  onDelete: (id: string | number) => void;
}

export const ScheduleList: React.FC<ScheduleListProps> = ({ 
  schedules, 
  isAdmin, 
  cardClasses,
  onDelete
}) => {
  const getCapacityBadge = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) {
      return <Badge className="bg-red-500">Lotado</Badge>;
    } else if (percentage >= 70) {
      return <Badge className="bg-amber-500">Quase Cheio</Badge>;
    } else {
      return <Badge className="bg-green-500">Disponível</Badge>;
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {schedules.map((schedule) => (
        <Card key={schedule.id} className={cardClasses}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>{schedule.name}</CardTitle>
              {getCapacityBadge(schedule.current, schedule.capacity)}
            </div>
            <CardDescription className={isAdmin ? "text-gray-300" : ""}>
              Instrutor: {schedule.instructor}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={isAdmin ? "text-sm text-gray-300" : "text-sm text-muted-foreground"}>
                  Dias:
                </span>
                <span>{schedule.days.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className={isAdmin ? "text-sm text-gray-300" : "text-sm text-muted-foreground"}>
                  Horário:
                </span>
                <span>{schedule.time}</span>
              </div>
              <div className="flex justify-between">
                <span className={isAdmin ? "text-sm text-gray-300" : "text-sm text-muted-foreground"}>
                  Ocupação:
                </span>
                <span>{schedule.current} / {schedule.capacity}</span>
              </div>
              <div className="h-2 w-full bg-muted overflow-hidden rounded-full mt-2">
                <div
                  className="h-full bg-custom-red"
                  style={{ width: `${(schedule.current / schedule.capacity) * 100}%` }}
                />
              </div>
              <div className="pt-4 flex gap-2">
                <Button 
                  className="flex-1 bg-white text-black hover:bg-gray-100" 
                  variant="outline"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button 
                  className="flex-1 bg-red-500 text-white hover:bg-red-600"
                  variant="destructive"
                  onClick={() => onDelete(schedule.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
