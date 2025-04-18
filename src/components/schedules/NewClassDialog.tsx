
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface NewClassFormData {
  name: string;
  instructor: string;
  days: string;
  time: string;
  capacity: number;
}

export const NewClassDialog = ({ onClassAdded }: { onClassAdded: () => void }) => {
  const { register, handleSubmit, reset } = useForm<NewClassFormData>();

  const onSubmit = async (data: NewClassFormData) => {
    try {
      const { error } = await supabase.from('schedules').insert({
        name: data.name,
        instructor: data.instructor,
        days: data.days.split(',').map(day => day.trim()),
        time: data.time,
        capacity: parseInt(data.capacity.toString()),
        current: 0,
        status: 'active'
      });

      if (error) throw error;

      toast.success('Nova turma criada com sucesso!');
      reset();
      onClassAdded();
    } catch (error) {
      toast.error('Erro ao criar nova turma');
      console.error('Error:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-custom-red hover:bg-custom-red/80">
          <Plus className="h-4 w-4 mr-2" />
          Nova Turma
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Nova Turma</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome da Turma</Label>
            <Input id="name" {...register('name', { required: true })} />
          </div>
          <div>
            <Label htmlFor="instructor">Instrutor</Label>
            <Input id="instructor" {...register('instructor', { required: true })} />
          </div>
          <div>
            <Label htmlFor="days">Dias (separados por vírgula)</Label>
            <Input id="days" {...register('days', { required: true })} placeholder="Segunda, Quarta, Sexta" />
          </div>
          <div>
            <Label htmlFor="time">Horário</Label>
            <Input id="time" {...register('time', { required: true })} placeholder="08:00 - 09:00" />
          </div>
          <div>
            <Label htmlFor="capacity">Capacidade</Label>
            <Input type="number" id="capacity" {...register('capacity', { required: true, min: 1 })} />
          </div>
          <Button type="submit" className="w-full">Criar Turma</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
