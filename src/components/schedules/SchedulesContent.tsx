
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCards } from "@/components/schedules/StatsCards";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SchedulesHeader } from "@/components/schedules/SchedulesHeader";
import { ScheduleControls } from "@/components/schedules/ScheduleControls";
import { ScheduleContent } from "@/components/schedules/ScheduleContent";

// Define the popular times data
const popularTimes = [
  {
    time: "18:00 - 19:00",
    days: "Segunda, Terça, Quarta",
    occupation: 95,
  },
  {
    time: "19:00 - 20:00",
    days: "Terça, Quarta, Quinta",
    occupation: 87,
  },
  {
    time: "17:00 - 18:00",
    days: "Segunda, Quarta, Sexta",
    occupation: 78,
  },
  {
    time: "07:00 - 08:00",
    days: "Terça, Quinta",
    occupation: 65,
  },
];

interface SchedulesContentProps {
  isAdmin: boolean;
  cardClasses: string;
}

export const SchedulesContent: React.FC<SchedulesContentProps> = ({ 
  isAdmin, 
  cardClasses, 
}) => {
  const { toast: toastNotification } = useToast();
  const [schedules, setSchedules] = useState<any[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("classes");

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
      schedule.name?.toLowerCase().includes(term) ||
      schedule.instructor?.toLowerCase().includes(term) ||
      schedule.course_name?.toLowerCase().includes(term)
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

  return (
    <div className="flex flex-col gap-4">
      <SchedulesHeader />
      <StatsCards isAdmin={isAdmin} cardClasses={cardClasses} />

      <Tabs defaultValue={activeTab} value={activeTab} className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="classes">Aulas e Turmas</TabsTrigger>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
          <TabsTrigger value="analytics">Análise de Horários</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-4">
          <ScheduleControls
            searchTerm={searchTerm}
            onSearch={handleSearch}
            onFilter={handleFilter}
            onSaveChanges={handleSaveChanges}
            onClassAdded={fetchSchedules}
          />
          <ScheduleContent
            loading={loading}
            error={error}
            filteredSchedules={filteredSchedules}
            searchTerm={searchTerm}
            onClearSearch={() => {
              setSearchTerm("");
              setFilteredSchedules(schedules);
            }}
            isAdmin={isAdmin}
            cardClasses={cardClasses}
            onDelete={handleDelete}
            popularTimes={popularTimes}
            activeTab={activeTab}
          />
        </TabsContent>

        <TabsContent value="calendar">
          <ScheduleContent
            loading={loading}
            error={error}
            filteredSchedules={filteredSchedules}
            searchTerm={searchTerm}
            onClearSearch={() => {}}
            isAdmin={isAdmin}
            cardClasses={cardClasses}
            onDelete={handleDelete}
            popularTimes={popularTimes}
            activeTab={activeTab}
          />
        </TabsContent>

        <TabsContent value="analytics">
          <ScheduleContent
            loading={loading}
            error={error}
            filteredSchedules={filteredSchedules}
            searchTerm={searchTerm}
            onClearSearch={() => {}}
            isAdmin={isAdmin}
            cardClasses={cardClasses}
            onDelete={handleDelete}
            popularTimes={popularTimes}
            activeTab={activeTab}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
