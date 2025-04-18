
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
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewClassFormData>();
  const [isOpen, setIsOpen] = React.useState(false);

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
      setIsOpen(false);
      onClassAdded();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao criar nova turma');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <Input 
              id="name" 
              {...register('name', { required: true })} 
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <span className="text-sm text-red-500">Campo obrigatório</span>}
          </div>
          <div>
            <Label htmlFor="instructor">Instrutor</Label>
            <Input 
              id="instructor" 
              {...register('instructor', { required: true })}
              className={errors.instructor ? 'border-red-500' : ''}
            />
            {errors.instructor && <span className="text-sm text-red-500">Campo obrigatório</span>}
          </div>
          <div>
            <Label htmlFor="days">Dias (separados por vírgula)</Label>
            <Input 
              id="days" 
              {...register('days', { required: true })} 
              placeholder="Segunda, Quarta, Sexta"
              className={errors.days ? 'border-red-500' : ''}
            />
            {errors.days && <span className="text-sm text-red-500">Campo obrigatório</span>}
          </div>
          <div>
            <Label htmlFor="time">Horário</Label>
            <Input 
              id="time" 
              {...register('time', { required: true })} 
              placeholder="08:00 - 09:00"
              className={errors.time ? 'border-red-500' : ''}
            />
            {errors.time && <span className="text-sm text-red-500">Campo obrigatório</span>}
          </div>
          <div>
            <Label htmlFor="capacity">Capacidade</Label>
            <Input 
              type="number" 
              id="capacity" 
              {...register('capacity', { required: true, min: 1 })}
              className={errors.capacity ? 'border-red-500' : ''}
            />
            {errors.capacity && <span className="text-sm text-red-500">Campo obrigatório e deve ser maior que 0</span>}
          </div>
          <Button type="submit" className="w-full">Criar Turma</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
