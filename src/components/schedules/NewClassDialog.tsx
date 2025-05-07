
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { TimeRangePicker } from "./TimeRangePicker";

const newClassSchema = z.object({
  name: z.string().min(1, "Nome da turma é obrigatório"),
  instructor: z.string().min(1, "Nome do instrutor é obrigatório"),
  days: z.string().min(1, "Dias são obrigatórios"),
  time: z.string().min(1, "Horário é obrigatório").optional(),
  start_time: z.string().min(1, "Horário de início é obrigatório"),
  end_time: z.string().min(1, "Horário de término é obrigatório"),
  capacity: z.coerce.number().min(1, "Capacidade deve ser maior que zero")
});

type NewClassFormData = z.infer<typeof newClassSchema>;

export const NewClassDialog = ({ onClassAdded }: { onClassAdded: () => void }) => {
  const { 
    register, 
    handleSubmit, 
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting } 
  } = useForm<NewClassFormData>({
    resolver: zodResolver(newClassSchema),
    defaultValues: {
      start_time: "",
      end_time: ""
    }
  });

  const [isOpen, setIsOpen] = React.useState(false);
  const { user, isAuthenticated } = useAuth();
  
  // Get the current time value from the form
  const timeValue = watch("time") || "";

  const onSubmit = async (data: NewClassFormData) => {
    try {
      if (!isAuthenticated || !user) {
        toast.error("Você precisa estar logado para criar uma turma.");
        return;
      }

      console.log("Creating class with time range:", data.time || "");
      console.log("Start time:", data.start_time);
      console.log("End time:", data.end_time);
      
      // Format the display time string
      const displayTime = `${data.start_time}-${data.end_time}`;
      
      // Create the class object with all fields as text strings
      const newClass = {
        course_name: data.name,
        instructor: data.instructor,
        days: data.days,
        capacity: data.capacity,
        current: 0,
        time: displayTime,
        // Store simple time strings
        start_time: data.start_time,
        end_time: data.end_time
      };

      const { error } = await supabase
        .from('schedules')
        .insert([newClass]);

      if (error) {
        console.error('Error creating class:', error);
        throw new Error(error.message);
      }

      toast.success('Nova turma criada com sucesso!');
      reset();
      setIsOpen(false);
      onClassAdded();
    } catch (error: any) {
      console.error('Error creating class:', error);
      toast.error(`Erro ao criar nova turma: ${error.message}`);
    }
  };

  // Handler for time range selection
  const handleTimeRangeChange = (value: string, startTime: string, endTime: string) => {
    setValue('time', value, { shouldValidate: true });
    setValue('start_time', startTime, { shouldValidate: true });
    setValue('end_time', endTime, { shouldValidate: true });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-custom-red hover:bg-custom-red/80">
          <Plus className="h-4 w-4 mr-2" />
          Nova Turma
        </Button>
      </DialogTrigger>
      <DialogContent className="z-50 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Nova Turma</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para criar uma nova turma.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome da Turma</Label>
            <Input 
              id="name" 
              {...register('name')} 
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
          </div>
          <div>
            <Label htmlFor="instructor">Instrutor</Label>
            <Input 
              id="instructor" 
              {...register('instructor')}
              className={errors.instructor ? 'border-red-500' : ''}
            />
            {errors.instructor && <span className="text-sm text-red-500">{errors.instructor.message}</span>}
          </div>
          <div>
            <Label htmlFor="days">Dias (separados por vírgula)</Label>
            <Input 
              id="days" 
              {...register('days')} 
              placeholder="Segunda, Quarta, Sexta"
              className={errors.days ? 'border-red-500' : ''}
            />
            {errors.days && <span className="text-sm text-red-500">{errors.days.message}</span>}
          </div>
          <div>
            <Label htmlFor="time">Horário</Label>
            <TimeRangePicker
              value={timeValue}
              onChange={handleTimeRangeChange}
              error={!!errors.time || !!errors.start_time || !!errors.end_time}
            />
            {errors.time && <span className="text-sm text-red-500">{errors.time.message}</span>}
            {errors.start_time && <span className="text-sm text-red-500">{errors.start_time.message}</span>}
            {errors.end_time && <span className="text-sm text-red-500">{errors.end_time.message}</span>}
          </div>
          
          {/* Hidden fields to store the actual time values */}
          <input type="hidden" {...register('start_time')} />
          <input type="hidden" {...register('end_time')} />
          
          <div>
            <Label htmlFor="capacity">Capacidade</Label>
            <Input 
              type="number" 
              id="capacity" 
              {...register('capacity')}
              className={errors.capacity ? 'border-red-500' : ''}
            />
            {errors.capacity && <span className="text-sm text-red-500">{errors.capacity.message}</span>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Criando...' : 'Criar Turma'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
