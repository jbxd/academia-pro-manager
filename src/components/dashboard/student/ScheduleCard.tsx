
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, CheckCircle2, Info, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Schedule {
  day: string;
  time: string;
}

interface ScheduleCardProps {
  schedule: Schedule[];
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule }) => {
  const handleViewDetails = () => {
    toast.info("Visualizando detalhes...");
  };

  const handleDelete = () => {
    toast.warning("Item excluído!");
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Horários de Treino</CardTitle>
        <CardDescription>
          Seus horários agendados
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {schedule.map((schedule, index) => (
          <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">{schedule.day}</p>
                <p className="text-sm text-muted-foreground">{schedule.time}</p>
              </div>
            </div>
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            className="flex-1 bg-white text-black hover:bg-gray-100"
            onClick={handleViewDetails}
          >
            <Info className="h-4 w-4 mr-2" />
            Detalhes
          </Button>
          <Button 
            variant="outline"
            className="flex-1 bg-white text-black hover:bg-gray-100"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
