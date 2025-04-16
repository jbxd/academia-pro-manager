
import React from "react";
import { 
  Calendar as CalendarIcon, 
  CheckSquare, 
  UserCheck, 
  Users, 
  Clock, 
  Download,
  Search
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
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AttendanceChart from "@/components/charts/AttendanceChart";

const Attendance = () => {
  // Mock data for today's attendance
  const todaysAttendance = [
    { id: "1", name: "João Silva", time: "07:15", status: "present" },
    { id: "2", name: "Maria Oliveira", time: "08:30", status: "present" },
    { id: "3", name: "Pedro Santos", time: "12:45", status: "present" },
    { id: "4", name: "Ana Costa", time: "-", status: "expected" },
    { id: "5", name: "Carlos Ferreira", time: "-", status: "expected" },
    { id: "6", name: "Lúcia Mendes", time: "18:20", status: "present" },
    { id: "7", name: "Roberto Alves", time: "-", status: "expected" },
  ];

  // Mock data for frequently absent students
  const frequentAbsences = [
    { id: "1", name: "Ana Costa", attendance: "45%", lastVisit: "10/03/2024" },
    { id: "2", name: "Carlos Ferreira", attendance: "55%", lastVisit: "12/03/2024" },
    { id: "3", name: "Roberto Alves", attendance: "60%", lastVisit: "05/03/2024" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-500">Presente</Badge>;
      case "expected":
        return <Badge variant="outline">Esperado</Badge>;
      case "absent":
        return <Badge className="bg-red-500">Ausente</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Frequência</h1>
          <p className="text-muted-foreground">
            Gerencie a frequência dos alunos do Team Of Monsters
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Presentes Hoje</p>
                <p className="text-3xl font-bold">78</p>
                <p className="text-xs">31% dos alunos ativos</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Esperados Hoje</p>
                <p className="text-3xl font-bold">135</p>
                <p className="text-xs">54% dos alunos ativos</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Movimentação</p>
                <p className="text-3xl font-bold">18:00</p>
                <p className="text-xs">Horário mais movimentado</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="today" className="space-y-4">
          <TabsList>
            <TabsTrigger value="today">Hoje</TabsTrigger>
            <TabsTrigger value="week">Esta Semana</TabsTrigger>
            <TabsTrigger value="students">Por Aluno</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Frequência de Hoje</CardTitle>
                  <CardDescription>
                    {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </div>
                <div className="space-x-2">
                  <Button variant="outline">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Mudar Data
                  </Button>
                  <Button>
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Marcar Presença
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar aluno..." className="pl-8" />
                  </div>
                </div>

                <div className="space-y-4">
                  {todaysAttendance.map((student) => (
                    <div key={student.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        {student.time !== "-" && (
                          <p className="text-sm text-muted-foreground">Check-in: {student.time}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(student.status)}
                        {student.status === "expected" && (
                          <Button size="sm" variant="outline">Marcar</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Horários</CardTitle>
                  <CardDescription>
                    Presenças por faixa de horário
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <AttendanceChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alunos com Baixa Frequência</CardTitle>
                  <CardDescription>
                    Alunos com menos de 60% de presença
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {frequentAbsences.map((student) => (
                      <div key={student.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">Última visita: {student.lastVisit}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-red-500">{student.attendance}</p>
                          <p className="text-sm text-muted-foreground">de presença</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ver todos
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="week">
            <Card>
              <CardHeader>
                <CardTitle>Frequência Semanal</CardTitle>
                <CardDescription>
                  Total de visitas por dia da semana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">Visão detalhada da frequência semanal seria exibida aqui.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Frequência por Aluno</CardTitle>
                  <CardDescription>
                    Histórico de frequência individual
                  </CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar aluno..." className="pl-8" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">Selecione um aluno para ver seu histórico de frequência.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Relatórios de Frequência</CardTitle>
                  <CardDescription>
                    Gere relatórios de frequência
                  </CardDescription>
                </div>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Dados
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <CalendarIcon className="h-8 w-8 mb-2" />
                    <span>Relatório Mensal</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <Users className="h-8 w-8 mb-2" />
                    <span>Relatório por Aluno</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <Clock className="h-8 w-8 mb-2" />
                    <span>Relatório por Horário</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <UserCheck className="h-8 w-8 mb-2" />
                    <span>Alunos com Baixa Frequência</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Attendance;
