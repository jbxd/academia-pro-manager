
import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  Dumbbell,
  Calendar,
  ArrowRight,
  UserCheck,
  Settings,
  Plus,
  Trash2,
  CalendarClock,
  History,
  Save
} from "lucide-react";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { AttendanceConfirmation } from "@/components/dashboard/student/AttendanceConfirmation";
import { ScheduleManager } from "@/components/training/ScheduleManager";
import { supabase } from "@/integrations/supabase/client";

const Training = () => {
  const { user } = useAuth();
  const isStudent = user?.role === "student";
  const cardClasses = isStudent ? "bg-black/40 text-white border-gray-700" : "";
  
  // State for student training schedule
  const [studentSchedule, setStudentSchedule] = useState([
    { id: "1", day: "Segunda", time: "18:00 - 19:30" },
    { id: "2", day: "Quarta", time: "18:00 - 19:30" },
    { id: "3", day: "Sexta", time: "18:00 - 19:30" },
  ]);

  // Mock data for attendance history
  const attendanceHistory = [
    { date: "10/03/2024", time: "18:30", status: "present" },
    { date: "08/03/2024", time: "19:00", status: "present" },
    { date: "06/03/2024", time: "18:00", status: "present" },
    { date: "04/03/2024", time: "17:45", status: "present" },
    { date: "03/03/2024", time: "-", status: "absent" },
    { date: "01/03/2024", time: "18:15", status: "present" },
  ];

  // Mock data for available class slots
  const availableSlots = [
    { id: "4", day: "Segunda", time: "06:00 - 07:30", availability: "high" },
    { id: "5", day: "Segunda", time: "08:00 - 09:30", availability: "high" },
    { id: "6", day: "Segunda", time: "18:00 - 19:30", availability: "low" },
    { id: "7", day: "Terça", time: "07:00 - 08:30", availability: "medium" },
    { id: "8", day: "Terça", time: "18:00 - 19:30", availability: "low" },
    { id: "9", day: "Quarta", time: "06:00 - 07:30", availability: "high" },
    { id: "10", day: "Quarta", time: "18:00 - 19:30", availability: "low" },
  ];

  // Format today's date for display
  const today = new Date();
  const formattedDate = today.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: '2-digit',
    year: 'numeric' 
  });
  
  const dayOfWeek = today.toLocaleDateString('pt-BR', { weekday: 'long' });
  const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-500">Presente</Badge>;
      case "absent":
        return <Badge variant="destructive">Ausente</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  const handleViewFullHistory = () => {
    toast.success("Visualizando histórico completo...");
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">Treinos</h1>
          <p className={isStudent ? "text-gray-200" : "text-muted-foreground"}>
            Gerencie seus horários e treinos
          </p>
        </div>

        <Card className={`mt-4 ${cardClasses}`}>
          <CardHeader className="pb-2">
            <CardTitle>Próxima Aula</CardTitle>
            <CardDescription className={isStudent ? "text-gray-300" : ""}>
              Detalhes do seu próximo treino agendado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-custom-red/20 flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-custom-red" />
                </div>
                <div>
                  <p className="font-medium text-lg">{capitalizedDayOfWeek}</p>
                  <p className={isStudent ? "text-gray-300" : "text-muted-foreground"}>{formattedDate}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-custom-red/20 flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-custom-red" />
                </div>
                <div>
                  <p className="font-medium text-lg">18:00 - 19:30</p>
                  <p className={isStudent ? "text-gray-300" : "text-muted-foreground"}>Duração: 1h30min</p>
                </div>
              </div>
              <AttendanceConfirmation date={formattedDate} time="18:00 - 19:30" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="schedule" className="space-y-4">
          <TabsList>
            <TabsTrigger value="schedule">Meus Horários</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="change">Alterar Horários</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle>Horários de Treino</CardTitle>
                <CardDescription className={isStudent ? "text-gray-300" : ""}>
                  Seus horários agendados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentSchedule.map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-custom-red/20 flex items-center justify-center mr-4">
                          <Calendar className="h-6 w-6 text-custom-red" />
                        </div>
                        <div>
                          <p className="font-medium text-lg">{schedule.day}</p>
                          <p className={isStudent ? "text-gray-300" : "text-muted-foreground"}>{schedule.time}</p>
                        </div>
                      </div>
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById("tab-change")?.click()}
                  className={isStudent ? "w-full bg-custom-red hover:bg-custom-red/80 text-white" : "w-full"}
                >
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Alterar Horários
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className={cardClasses}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Histórico de Presenças</CardTitle>
                  <CardDescription className={isStudent ? "text-gray-300" : ""}>
                    Registro das suas últimas aulas
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Ver Calendário
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceHistory.map((attendance, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center">
                        <div className={`h-12 w-12 rounded-full ${attendance.status === 'present' ? 'bg-green-500/10' : 'bg-red-500/10'} flex items-center justify-center mr-4`}>
                          {attendance.status === 'present' ? (
                            <Dumbbell className="h-6 w-6 text-green-500" />
                          ) : (
                            <Clock className="h-6 w-6 text-red-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{attendance.date}</p>
                          <p className={isStudent ? "text-sm text-gray-300" : "text-sm text-muted-foreground"}>
                            {attendance.time !== "-" ? `Check-in: ${attendance.time}` : "Não compareceu"}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(attendance.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleViewFullHistory}
                >
                  <History className="mr-2 h-4 w-4" />
                  Ver Histórico Completo
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="change" id="tab-change">
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle>Alterar Horários</CardTitle>
                <CardDescription className={isStudent ? "text-gray-300" : ""}>
                  Selecione novos horários para seus treinos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScheduleManager 
                  studentSchedule={studentSchedule}
                  availableSlots={availableSlots}
                  onScheduleChange={setStudentSchedule}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Training;
