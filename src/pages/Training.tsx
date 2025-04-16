
import React from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  Dumbbell,
  Calendar,
  ArrowRight,
  UserCheck,
  Settings,
  Plus
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

const Training = () => {
  // Mock data for student training schedule
  const studentSchedule = [
    { day: "Segunda", time: "18:00 - 19:30" },
    { day: "Quarta", time: "18:00 - 19:30" },
    { day: "Sexta", time: "18:00 - 19:30" },
  ];

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
    { day: "Segunda", time: "06:00 - 07:30", availability: "high" },
    { day: "Segunda", time: "08:00 - 09:30", availability: "high" },
    { day: "Segunda", time: "18:00 - 19:30", availability: "low" },
    { day: "Terça", time: "07:00 - 08:30", availability: "medium" },
    { day: "Terça", time: "18:00 - 19:30", availability: "low" },
    { day: "Quarta", time: "06:00 - 07:30", availability: "high" },
    { day: "Quarta", time: "18:00 - 19:30", availability: "low" },
  ];

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

  return (
    <AppLayout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Treinos</h1>
          <p className="text-muted-foreground">
            Gerencie seus horários e treinos
          </p>
        </div>

        <Card className="mt-4">
          <CardHeader className="pb-2">
            <CardTitle>Próxima Aula</CardTitle>
            <CardDescription>
              Detalhes do seu próximo treino agendado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-lg">Segunda-feira</p>
                  <p className="text-muted-foreground">15 de março de 2024</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-lg">18:00 - 19:30</p>
                  <p className="text-muted-foreground">Duração: 1h30min</p>
                </div>
              </div>
              <Button size="lg">
                Confirmar Presença
              </Button>
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
            <Card>
              <CardHeader>
                <CardTitle>Horários de Treino</CardTitle>
                <CardDescription>
                  Seus horários agendados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentSchedule.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-lg">{schedule.day}</p>
                          <p className="text-muted-foreground">{schedule.time}</p>
                        </div>
                      </div>
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Gerenciar Horários
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Histórico de Presenças</CardTitle>
                  <CardDescription>
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
                          <p className="text-sm text-muted-foreground">
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
                <Button variant="outline" className="w-full">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Ver Histórico Completo
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="change">
            <Card>
              <CardHeader>
                <CardTitle>Alterar Horários</CardTitle>
                <CardDescription>
                  Selecione novos horários para seus treinos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="font-medium">Horários Atuais</p>
                  <div className="grid gap-2">
                    {studentSchedule.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-2">
                        <div className="flex items-center">
                          <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
                          <span>{schedule.day} • {schedule.time}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Remover
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <p className="font-medium">Horários Disponíveis</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Selecione horários adicionais para seu treino.
                    </p>
                    
                    <div className="grid gap-2">
                      {availableSlots.map((slot, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                          <div className="flex items-center">
                            <CalendarDays className="h-5 w-5 mr-2 text-muted-foreground" />
                            <span>{slot.day} • {slot.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getAvailabilityBadge(slot.availability)}
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Adicionar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Training;
