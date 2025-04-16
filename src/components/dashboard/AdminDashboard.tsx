
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Users, DollarSign, CalendarCheck, Clock,
  TrendingUp, AlertCircle, CheckCircle, Calendar,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import StudentStatusChart from "@/components/charts/StudentStatusChart";
import RevenueChart from "@/components/charts/RevenueChart";
import AttendanceChart from "@/components/charts/AttendanceChart";

const AdminDashboard: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao painel administrativo Team Of Monsters
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Summary Cards */}
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Alunos Ativos</p>
                <p className="text-3xl font-bold">248</p>
                <p className="text-xs text-green-600">+12% este mês</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Receita Mensal</p>
                <p className="text-3xl font-bold">R$ 24.580</p>
                <p className="text-xs text-green-600">+5% vs. último mês</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Presença Hoje</p>
                <p className="text-3xl font-bold">78</p>
                <p className="text-xs">31% dos alunos ativos</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <CalendarCheck className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Pagamentos Pendentes</p>
                <p className="text-3xl font-bold">18</p>
                <p className="text-xs text-amber-600">R$ 3.240 em atraso</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different dashboard views */}
        <Tabs defaultValue="general" className="mt-4">
          <TabsList>
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="attendance">Frequência</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-7">
              <Card className="md:col-span-4">
                <CardHeader className="pb-2">
                  <CardTitle>Status dos Alunos</CardTitle>
                  <CardDescription>
                    Distribuição dos alunos por status de pagamento
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <StudentStatusChart />
                </CardContent>
              </Card>

              <Card className="md:col-span-3">
                <CardHeader className="pb-2">
                  <CardTitle>Alunos com Pagamentos Pendentes</CardTitle>
                  <CardDescription>
                    Alunos que precisam de atenção
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Pedro Oliveira", days: 32, amount: 180 },
                      { name: "Ana Silva", days: 15, amount: 180 },
                      { name: "Marcos Santos", days: 8, amount: 180 },
                      { name: "Juliana Costa", days: 5, amount: 180 },
                      { name: "Rafael Lima", days: 3, amount: 180 },
                    ].map((student, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b pb-2 last:border-0"
                      >
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {student.days > 30 
                              ? <span className="text-red-500">Inadimplente ({student.days} dias)</span> 
                              : student.days > 10 
                              ? <span className="text-amber-500">Atrasado ({student.days} dias)</span>
                              : <span className="text-amber-400">Vencendo ({student.days} dias)</span>}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ {student.amount}</p>
                          <p className="text-sm text-muted-foreground">Pendente</p>
                        </div>
                      </div>
                    ))}

                    <Button asChild className="w-full">
                      <Link to="/finances">
                        Ver todos os pagamentos
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Próximas Matrículas</CardTitle>
                  <CardDescription>
                    Alunos com matrícula para esta semana
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Carolina Mendes", date: "Hoje, 14:30", plan: "Plano Trimestral" },
                      { name: "Bruno Alves", date: "Amanhã, 10:00", plan: "Plano Anual" },
                      { name: "Fernanda Torres", date: "Quarta, 16:00", plan: "Plano Mensal" },
                    ].map((student, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b pb-2 last:border-0"
                      >
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.date}</p>
                        </div>
                        <div>
                          <span className="bg-primary/10 text-primary text-xs rounded-full px-2 py-1">
                            {student.plan}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Horários Mais Procurados</CardTitle>
                  <CardDescription>
                    Horários com maior ocupação esta semana
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "18:00 - 19:00", day: "Segunda a Sexta", occupation: 95 },
                      { time: "19:00 - 20:00", day: "Segunda a Sexta", occupation: 90 },
                      { time: "17:00 - 18:00", day: "Segunda a Sexta", occupation: 85 },
                      { time: "10:00 - 11:00", day: "Sábado", occupation: 80 },
                    ].map((schedule, index) => (
                      <div
                        key={index}
                        className="space-y-1 border-b pb-2 last:border-0"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{schedule.time}</p>
                          <span className="text-sm font-medium">{schedule.occupation}%</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{schedule.day}</div>
                        <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${schedule.occupation}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Receita Mensal</CardTitle>
                  <CardDescription>
                    Total de receitas nos últimos 6 meses
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <RevenueChart />
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Distribuição de Pagamentos</CardTitle>
                  <CardDescription>
                    Status dos pagamentos do mês atual
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-1">
                        <p className="text-3xl font-bold text-green-500">178</p>
                        <p className="text-sm text-muted-foreground">Em dia</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-3xl font-bold text-amber-500">52</p>
                        <p className="text-sm text-muted-foreground">Vencendo</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-3xl font-bold text-red-500">18</p>
                        <p className="text-sm text-muted-foreground">Atrasados</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
                          <span>Em dia</span>
                        </div>
                        <span>R$ 32.040</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-amber-500 mr-2" />
                          <span>Vencendo em até 5 dias</span>
                        </div>
                        <span>R$ 9.360</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-red-500 mr-2" />
                          <span>Atrasados</span>
                        </div>
                        <span>R$ 3.240</span>
                      </div>
                    </div>

                    <Button asChild className="w-full">
                      <Link to="/finances">
                        Ver detalhes financeiros
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-7">
              <Card className="md:col-span-4">
                <CardHeader className="pb-2">
                  <CardTitle>Frequência Semanal</CardTitle>
                  <CardDescription>
                    Total de visitas por dia da semana
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <AttendanceChart />
                </CardContent>
              </Card>

              <Card className="md:col-span-3">
                <CardHeader className="pb-2">
                  <CardTitle>Alunos Presentes Hoje</CardTitle>
                  <CardDescription>
                    Última atualização: 10 minutos atrás
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 bg-muted rounded-lg space-y-1">
                        <p className="text-3xl font-bold">78</p>
                        <p className="text-sm text-muted-foreground">Alunos hoje</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg space-y-1">
                        <p className="text-3xl font-bold">31%</p>
                        <p className="text-sm text-muted-foreground">% do total</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Horários Mais Movimentados</p>
                      </div>

                      <div className="space-y-2">
                        {[
                          { time: "06:00 - 08:00", count: 24 },
                          { time: "12:00 - 14:00", count: 18 },
                          { time: "18:00 - 20:00", count: 36 },
                        ].map((timeSlot, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between border-b pb-2 last:border-0"
                          >
                            <span>{timeSlot.time}</span>
                            <span className="font-medium">{timeSlot.count} alunos</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button asChild className="w-full">
                      <Link to="/attendance">
                        Ver registro de frequência
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminDashboard;
