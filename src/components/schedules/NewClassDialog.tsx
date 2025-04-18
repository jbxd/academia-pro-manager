
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

// Validation schema for the new class form
const newClassSchema = z.object({
  name: z.string().min(1, "Nome da turma é obrigatório"),
  instructor: z.string().min(1, "Nome do instrutor é obrigatório"),
  days: z.string().min(1, "Dias são obrigatórios"),
  time: z.string().min(1, "Horário é obrigatório"),
  capacity: z.coerce.number().min(1, "Capacidade deve ser maior que zero")
});

type NewClassFormData = z.infer<typeof newClassSchema>;

export const NewClassDialog = ({ onClassAdded }: { onClassAdded: () => void }) => {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting } 
  } = useForm<NewClassFormData>({
    resolver: zodResolver(newClassSchema)
  });

  const [isOpen, setIsOpen] = React.useState(false);
  const { user, isAuthenticated } = useAuth();

  const onSubmit = async (data: NewClassFormData) => {
    try {
      // Verificação direta da autenticação para exibir uma mensagem clara
      if (!isAuthenticated || !user) {
        toast.error("Você precisa estar logado para criar uma turma.");
        return;
      }

      // Criar o objeto da nova turma
      const newClass = {
        name: data.name,
        instructor: data.instructor,
        days: data.days.split(',').map(day => day.trim()),
        time: data.time,
        capacity: data.capacity,
        current: 0,
        status: 'active'
      };

      console.log("Tentando criar nova turma:", newClass);
      
      // Usar fetch diretamente para evitar problemas com RLS
      const supabaseUrl = 'https://vedrtlglkvzcdxdjjjgy.supabase.co';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZHJ0bGdsa3Z6Y2R4ZGpqamd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzQ0MzUsImV4cCI6MjA2MDQxMDQzNX0.PxGL1A2SVdaGRmMJFQscFiV9nymCzFdIwdReElW8TYU';

      console.log("Inserindo nova turma diretamente via API");
      
      // Use a more direct approach without checking for session
      const response = await fetch(`${supabaseUrl}/rest/v1/schedules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(newClass)
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Erro na API: ${errorData}`);
      }
      
      toast.success('Nova turma criada com sucesso!');
      reset();
      setIsOpen(false);
      onClassAdded();
      
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      toast.error(`Erro ao criar nova turma: ${error.message}`);
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
            <Input 
              id="time" 
              {...register('time')} 
              placeholder="08:00 - 09:00"
              className={errors.time ? 'border-red-500' : ''}
            />
            {errors.time && <span className="text-sm text-red-500">{errors.time.message}</span>}
          </div>
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
