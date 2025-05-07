
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";

export interface Schedule {
  id: string | number;
  course_name: string;
  instructor: string;
  days: string;
  time: string;
  start_time: string;
  end_time: string;
  capacity: number;
  current: number;
  status?: string;
}

export function useSchedulesData() {
  const { toast: toastNotification } = useToast();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSchedules = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching schedules...");
      const { data, error } = await supabase
        .from('schedules')
        .select('*');
      
      if (error) {
        console.error('Error details:', error);
        throw error;
      }
      
      console.log("Schedules fetched:", data);
      setSchedules(data || []);
      setFilteredSchedules(data || []);
    } catch (error: any) {
      console.error('Error fetching schedules:', error);
      setError(error.message);
      toastNotification({
        title: "Erro",
        description: "Não foi possível carregar os horários.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredSchedules(schedules);
      return;
    }
    
    const filtered = schedules.filter(schedule => 
      schedule.course_name?.toLowerCase().includes(term) ||
      schedule.instructor?.toLowerCase().includes(term)
    );
    setFilteredSchedules(filtered);
  };

  const handleFilter = (filters: any) => {
    let filtered = [...schedules];

    if (filters.instructor) {
      filtered = filtered.filter(schedule => 
        schedule.instructor?.toLowerCase().includes(filters.instructor.toLowerCase())
      );
    }

    if (filters.day) {
      filtered = filtered.filter(schedule => 
        schedule.days?.includes(filters.day)
      );
    }

    if (filters.status) {
      filtered = filtered.filter(schedule => 
        schedule.status === filters.status
      );
    }

    setFilteredSchedules(filtered);
    toast("Filtros aplicados com sucesso");
  };

  const handleDelete = async (scheduleId: string | number) => {
    try {
      // Convert scheduleId to number if it's a string, since the database uses numbers for IDs
      const numericId = typeof scheduleId === 'string' ? parseInt(scheduleId, 10) : scheduleId;
      
      // Use the numeric ID for the database operation
      const { error } = await supabase
        .from('schedules')
        .delete()
        .eq('id', numericId);

      if (error) throw error;

      toastNotification({
        title: "Horário excluído",
        description: "O horário foi excluído com sucesso.",
      });
      
      fetchSchedules();
    } catch (error: any) {
      toastNotification({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o horário.",
        variant: "destructive",
      });
    }
  };

  const handleSaveChanges = async () => {
    try {
      toast("Salvando alterações...");
      await fetchSchedules();
      toast.success("Alterações salvas com sucesso!");
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error("Erro ao salvar alterações");
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredSchedules(schedules);
  };

  return {
    schedules,
    filteredSchedules,
    loading,
    error,
    searchTerm,
    fetchSchedules,
    handleSearch,
    handleFilter,
    handleDelete,
    handleSaveChanges,
    clearSearch
  };
}
