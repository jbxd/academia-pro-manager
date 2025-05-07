
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, CheckCircle2, Info, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface Schedule {
  day: string;
  time: string;
}

interface ScheduleCardProps {
  schedule: Schedule[];
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedScheduleIndex, setSelectedScheduleIndex] = React.useState<number | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = React.useState(false);
  const [selectedSchedule, setSelectedSchedule] = React.useState<Schedule | null>(null);

  const handleViewDetails = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setDetailsDialogOpen(true);
  };

  const handleDeleteClick = (index: number) => {
    setSelectedScheduleIndex(index);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    toast.success("Horário removido com sucesso!");
    setDeleteDialogOpen(false);
    // Here you would typically call an API to delete the schedule
  };

  return (
    <>
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
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-6 w-6" 
                  onClick={() => handleViewDetails(schedule)}
                >
                  <Info className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="p-0 h-6 w-6 text-red-500 hover:text-red-600" 
                  onClick={() => handleDeleteClick(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 w-full">
            <Button 
              variant="outline" 
              className="flex-1 bg-white text-black hover:bg-gray-100"
              onClick={() => toast.info("Abrindo detalhes dos horários...")}
            >
              <Info className="h-4 w-4 mr-2" />
              Detalhes
            </Button>
            <Button 
              variant="outline"
              className="flex-1 bg-white text-black hover:bg-gray-100"
              onClick={() => toast.warning("Esta ação excluirá todos os horários.")}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Tem certeza de que deseja excluir este horário de treino? Esta ação não pode ser desfeita.
          </p>
          <DialogFooter className="flex space-x-2 sm:justify-end">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes do Horário</DialogTitle>
          </DialogHeader>
          {selectedSchedule && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Dia do Treino</h3>
                  <p className="text-sm">{selectedSchedule.day}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Horário</h3>
                  <p className="text-sm">{selectedSchedule.time}</p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  Instrutor: Alex Monteiro
                </p>
                <p className="text-sm text-muted-foreground">
                  Modalidade: Muay Thai Avançado
                </p>
                <p className="text-sm text-muted-foreground">
                  Local: Sala 2 - Academia Central
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setDetailsDialogOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
