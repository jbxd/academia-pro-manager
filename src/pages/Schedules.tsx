
import React from "react";
import { 
  Clock, Calendar, Users, Plus, 
  Edit2, Trash2, Search, Filter,
} from "lucide-react";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const Schedules = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const cardClasses = isAdmin ? "bg-black/40 text-white border-gray-700" : "";
  
  // Mock data for class schedules
  const schedules = [
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
  ];

  // Mock data for popular times
  const popularTimes = [
    { time: "18:00 - 19:00", days: "Segunda a Sexta", occupation: 95 },
    { time: "19:00 - 20:00", days: "Segunda a Sexta", occupation: 90 },
    { time: "17:00 - 18:00", days: "Segunda a Sexta", occupation: 85 },
    { time: "10:00 - 11:00", days: "Sábado", occupation: 80 },
  ];

  const getCapacityBadge = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) {
      return <Badge className="bg-red-500">Lotado</Badge>;
    } else if (percentage >= 70) {
      return <Badge className="bg-amber-500">Quase Cheio</Badge>;
    } else {
      return <Badge className="bg-green-500">Disponível</Badge>;
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

        <div className="grid gap-4 md:grid-cols-3">
          <Card className={cardClasses}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className={isAdmin ? "text-gray-300 text-sm" : "text-muted-foreground text-sm"}>Turmas Ativas</p>
                <p className="text-3xl font-bold">12</p>
                <p className="text-xs">5 modalidades</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-custom-red/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-custom-red" />
              </div>
            </CardContent>
          </Card>

          <Card className={cardClasses}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className={isAdmin ? "text-gray-300 text-sm" : "text-muted-foreground text-sm"}>Instrutores</p>
                <p className="text-3xl font-bold">8</p>
                <p className="text-xs">Disponíveis</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-custom-red/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-custom-red" />
              </div>
            </CardContent>
          </Card>

          <Card className={cardClasses}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className={isAdmin ? "text-gray-300 text-sm" : "text-muted-foreground text-sm"}>Horário Pico</p>
                <p className="text-3xl font-bold">18:00</p>
                <p className="text-xs">95% ocupação</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-custom-red/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-custom-red" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="classes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="classes">Aulas e Turmas</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="analytics">Análise de Horários</TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-grow">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar turma..." className="pl-8" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrar
                </Button>
              </div>
              <Button className={isAdmin ? "bg-custom-red hover:bg-custom-red/80" : ""}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Turma
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {schedules.map((schedule) => (
                <Card key={schedule.id} className={cardClasses}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>{schedule.name}</CardTitle>
                      {getCapacityBadge(schedule.current, schedule.capacity)}
                    </div>
                    <CardDescription className={isAdmin ? "text-gray-300" : ""}>Instrutor: {schedule.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className={isAdmin ? "text-sm text-gray-300" : "text-sm text-muted-foreground"}>Dias:</span>
                        <span>{schedule.days.join(", ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isAdmin ? "text-sm text-gray-300" : "text-sm text-muted-foreground"}>Horário:</span>
                        <span>{schedule.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isAdmin ? "text-sm text-gray-300" : "text-sm text-muted-foreground"}>Ocupação:</span>
                        <span>{schedule.current} / {schedule.capacity}</span>
                      </div>
                      <div className="h-2 w-full bg-muted overflow-hidden rounded-full mt-2">
                        <div
                          className="h-full bg-custom-red"
                          style={{ width: `${(schedule.current / schedule.capacity) * 100}%` }}
                        />
                      </div>
                      <div className="pt-4 flex gap-2">
                        <Button className="flex-1" variant="outline">
                          <Edit2 className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                        <Button className="flex-1" variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle>Calendário de Aulas</CardTitle>
                <CardDescription className={isAdmin ? "text-gray-300" : ""}>
                  Visão geral de todas as aulas agendadas
                </CardDescription>
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
            <Card className={cardClasses}>
              <CardHeader>
                <CardTitle>Horários Mais Procurados</CardTitle>
                <CardDescription className={isAdmin ? "text-gray-300" : ""}>
                  Horários com maior ocupação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularTimes.map((time, index) => (
                    <div
                      key={index}
                      className="space-y-1 border-b pb-2 last:border-0"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{time.time}</p>
                        <span className="text-sm font-medium">{time.occupation}%</span>
                      </div>
                      <div className={isAdmin ? "text-sm text-gray-300" : "text-sm text-muted-foreground"}>{time.days}</div>
                      <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                        <div
                          className="h-full bg-custom-red"
                          style={{ width: `${time.occupation}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={`mt-4 ${cardClasses}`}>
              <CardHeader>
                <CardTitle>Distribuição de Alunos</CardTitle>
                <CardDescription className={isAdmin ? "text-gray-300" : ""}>
                  Alunos por dia da semana e horário
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-2">Gráfico de distribuição de alunos seria exibido aqui</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Schedules;
