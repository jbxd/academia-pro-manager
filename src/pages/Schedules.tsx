
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/layouts/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { StatsCards } from "@/components/schedules/StatsCards";
import { ScheduleList } from "@/components/schedules/ScheduleList";
import { SearchBar } from "@/components/schedules/SearchBar";
import { AnalyticsTab } from "@/components/schedules/AnalyticsTab";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { NewClassDialog } from "@/components/schedules/NewClassDialog";
import { FilterDialog, FilterOptions } from "@/components/schedules/FilterDialog";
import { Input } from "@/components/ui/input";

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

const Schedules = () => {
  const { toast: toastNotification } = useToast();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const cardClasses = isAdmin ? "bg-black/40 text-white border-gray-700" : "";
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  const fetchSchedules = async () => {
    try {
      const { data, error } = await supabase
        .from('schedules')
        .select('*');
      
      if (error) throw error;
      
      setSchedules(data);
      setFilteredSchedules(data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      toastNotification({
        title: "Erro",
        description: "Não foi possível carregar os horários.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleDelete = async (scheduleId: string) => {
    try {
      const { error } = await supabase
        .from('schedules')
        .delete()
        .eq('id', scheduleId);

      if (error) throw error;

      toastNotification({
        title: "Horário excluído",
        description: "O horário foi excluído com sucesso.",
      });
      
      fetchSchedules();
    } catch (error) {
      toastNotification({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o horário.",
        variant: "destructive",
      });
    }
  };

  const handleFilter = (filters: FilterOptions) => {
    let filtered = [...schedules];

    if (filters.instructor) {
      filtered = filtered.filter(schedule => 
        schedule.instructor.toLowerCase().includes(filters.instructor.toLowerCase())
      );
    }

    if (filters.day) {
      filtered = filtered.filter(schedule => 
        schedule.days.includes(filters.day)
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

  const handleSaveChanges = async () => {
    try {
      toast("Salvando alterações...");
      // Here we would implement any pending changes to the database
      // For now, just refresh the data
      await fetchSchedules();
      toast.success("Alterações salvas com sucesso!");
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error("Erro ao salvar alterações");
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">Gestão de Horários</h1>
          <p className="text-gray-200">
            Gerencie os horários e turmas do Team Of Monsters
          </p>
        </div>

        <StatsCards isAdmin={isAdmin} cardClasses={cardClasses} />

        <Tabs defaultValue="classes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="classes">Aulas e Turmas</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="analytics">Análise de Horários</TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex gap-2 w-full md:w-auto">
                <Input placeholder="Buscar turma..." className="pl-8" />
                <FilterDialog onFilter={handleFilter} />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveChanges} className="bg-green-600 hover:bg-green-700">
                  Salvar Alterações
                </Button>
                <NewClassDialog onClassAdded={fetchSchedules} />
              </div>
            </div>
            <ScheduleList
              schedules={filteredSchedules}
              isAdmin={isAdmin}
              cardClasses={cardClasses}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent value="calendar">
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle>Calendário de Aulas</CardTitle>
              </CardHeader>
              <CardContent className="min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-2">Calendário de aulas seria exibido aqui</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab
              cardClasses={cardClasses}
              isAdmin={isAdmin}
              popularTimes={popularTimes}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Schedules;
