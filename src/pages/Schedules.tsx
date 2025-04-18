import React, { useState } from "react";
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

const Schedules = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const cardClasses = isAdmin ? "bg-black/40 text-white border-gray-700" : "";
  
  // Convert schedules to state so we can modify it
  const [schedules, setSchedules] = useState([
    { 
      id: "1", 
      name: "Musculação", 
      instructor: "André Silva",
      days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"], 
      time: "06:00 - 22:00", 
      capacity: 50,
      current: 32,
      status: "active" 
    },
    { 
      id: "2", 
      name: "Crossfit", 
      instructor: "Carlos Mendes",
      days: ["Segunda", "Quarta", "Sexta"], 
      time: "07:00 - 08:00", 
      capacity: 15,
      current: 12,
      status: "active" 
    },
    { 
      id: "3", 
      name: "Yoga", 
      instructor: "Aline Costa",
      days: ["Terça", "Quinta"], 
      time: "08:00 - 09:00", 
      capacity: 20,
      current: 15,
      status: "active" 
    },
    { 
      id: "4", 
      name: "Pilates", 
      instructor: "Beatriz Lima",
      days: ["Segunda", "Quarta", "Sexta"], 
      time: "10:00 - 11:00", 
      capacity: 12,
      current: 10,
      status: "active" 
    },
    { 
      id: "5", 
      name: "Spinning", 
      instructor: "Fernando Oliveira",
      days: ["Terça", "Quinta", "Sábado"], 
      time: "18:00 - 19:00", 
      capacity: 20,
      current: 18,
      status: "active" 
    },
  ]);

  // Mock data for popular times
  const popularTimes = [
    { time: "18:00 - 19:00", days: "Segunda a Sexta", occupation: 95 },
    { time: "19:00 - 20:00", days: "Segunda a Sexta", occupation: 90 },
    { time: "17:00 - 18:00", days: "Segunda a Sexta", occupation: 85 },
    { time: "10:00 - 11:00", days: "Sábado", occupation: 80 },
  ];

  const handleDelete = (scheduleId: string) => {
    try {
      setSchedules(prevSchedules => prevSchedules.filter(schedule => schedule.id !== scheduleId));
      toast({
        title: "Horário excluído",
        description: `O horário foi excluído com sucesso.`,
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir o horário.",
        variant: "destructive",
      });
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
            <SearchBar isAdmin={isAdmin} />
            <ScheduleList
              schedules={schedules}
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
