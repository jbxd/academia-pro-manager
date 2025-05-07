
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Schedule {
  id: string | number;
  course_name: string;
  instructor: string;
  days: string;
  time: string;
  capacity: number;
  current: number;
  status?: string;
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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState<Schedule | null>(null);
  const [editFormData, setEditFormData] = useState({
    course_name: "",
    instructor: "",
    days: "",
    time: "",
    capacity: 0
  });

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

  const handleEdit = (schedule: Schedule) => {
    setCurrentSchedule(schedule);
    setEditFormData({
      course_name: schedule.course_name,
      instructor: schedule.instructor,
      days: schedule.days,
      time: schedule.time,
      capacity: schedule.capacity
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!currentSchedule) return;
    
    // Here you would typically call an API to update the schedule
    toast.success(`Turma "${editFormData.course_name}" atualizada com sucesso`);
    setIsEditDialogOpen(false);
    
    // In a real application, you would refresh the data after saving
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className={cardClasses}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{schedule.course_name}</CardTitle>
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
                  <span>{schedule.days}</span>
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
                    onClick={() => handleEdit(schedule)}
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Turma</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="course_name">Nome do Curso</Label>
              <Input
                id="course_name"
                name="course_name"
                value={editFormData.course_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructor">Instrutor</Label>
              <Input
                id="instructor"
                name="instructor"
                value={editFormData.instructor}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="days">Dias</Label>
              <Input
                id="days"
                name="days"
                value={editFormData.days}
                onChange={handleInputChange}
                placeholder="Segunda, Quarta, Sexta"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Horário</Label>
              <Input
                id="time"
                name="time"
                value={editFormData.time}
                onChange={handleInputChange}
                placeholder="18:00 - 19:30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacidade</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                value={editFormData.capacity}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
