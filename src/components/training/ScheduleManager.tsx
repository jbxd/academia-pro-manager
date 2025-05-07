import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, Trash2, Plus, Save } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface Schedule {
  id: string;
  day: string;
  time: string;
}

interface AvailableSlot extends Schedule {
  availability: string;
}

interface ScheduleManagerProps {
  studentSchedule: Schedule[];
  availableSlots: AvailableSlot[];
  onScheduleChange: (newSchedule: Schedule[]) => void;
}

export const ScheduleManager: React.FC<ScheduleManagerProps> = ({
  studentSchedule,
  availableSlots,
  onScheduleChange,
}) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "high":
        return <Badge className="bg-green-500">Disponível</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Médio</Badge>;
      case "low":
        return <Badge className="bg-red-500">Quase Cheio</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  const handleAddSchedule = (slot: AvailableSlot) => {
    const exists = studentSchedule.some(schedule => schedule.id === slot.id);
    if (exists) {
      toast.error("Horário já adicionado!");
      return;
    }
    
    const newSchedule = [...studentSchedule, { id: slot.id, day: slot.day, time: slot.time }];
    onScheduleChange(newSchedule);
    toast.success("Horário adicionado com sucesso!");
  };

  const handleRemoveClick = (id: string) => {
    setScheduleToDelete(id);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (scheduleToDelete) {
      const newSchedule = studentSchedule.filter(schedule => schedule.id !== scheduleToDelete);
      onScheduleChange(newSchedule);
      toast.success("Horário removido com sucesso!");
      setIsConfirmDialogOpen(false);
      setScheduleToDelete(null);
    }
  };

  const handleSaveChanges = async () => {
    if (!user) {
      toast.error("Você precisa estar logado para salvar as alterações.");
      return;
    }

    setIsSaving(true);
    
    try {
      // In a real application, you would save the schedule to the database
      // Since we don't have a student_schedules table in the database yet,
      // we'll simulate saving by using the schedules table
      
      const scheduleIds = studentSchedule.map(s => s.id);
      
      // Create a schedule update record in the schedules table
      const { error } = await supabase
        .from('schedules')
        .update({
          user_id: user.id,
          status: 'confirmed'
        })
        .in('id', scheduleIds);
      
      if (error) throw error;
      
      toast.success("Alterações salvas com sucesso!");
    } catch (error) {
      console.error("Error saving schedule changes:", error);
      toast.error("Erro ao salvar alterações. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <p className="font-medium">Horários Atuais</p>
        <div className="grid gap-2">
          {studentSchedule.map((schedule) => (
            <div key={schedule.id} className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center">
                <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{schedule.day} • {schedule.time}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleRemoveClick(schedule.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remover
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <p className="font-medium">Horários Disponíveis</p>
          <p className="text-sm text-gray-300 mb-4">
            Selecione horários adicionais para seu treino.
          </p>
          
          <div className="grid gap-2">
            {availableSlots.map((slot) => (
              <div key={slot.id} className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>{slot.day} • {slot.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {getAvailabilityBadge(slot.availability)}
                  <Button 
                    size="sm"
                    onClick={() => handleAddSchedule(slot)}
                    className="bg-custom-red hover:bg-custom-red/80"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Button 
          onClick={handleSaveChanges}
          className="w-full bg-custom-red hover:bg-custom-red/80"
          disabled={isSaving}
        >
          {isSaving ? (
            <span className="flex items-center">
              <span className="animate-spin mr-2">⏳</span>
              Salvando...
            </span>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </>
          )}
        </Button>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Tem certeza de que deseja excluir este horário de treino? Esta ação não pode ser desfeita.
          </p>
          <DialogFooter className="flex space-x-2 sm:justify-end">
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
