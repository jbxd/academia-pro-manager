import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SummaryCards } from "./admin/SummaryCards";
import { PendingPaymentsCard } from "./admin/PendingPaymentsCard";
import { NextEnrollmentsCard } from "./admin/NextEnrollmentsCard";
import { PeakHoursCard } from "./admin/PeakHoursCard";
import StudentStatusChart from "@/components/charts/StudentStatusChart";
import RevenueChart from "@/components/charts/RevenueChart";
import AttendanceChart from "@/components/charts/AttendanceChart";

const AdminDashboard: React.FC = () => {
  return (
    <div className="bg-gradient-black-red min-h-screen -m-6 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-200">
            Bem-vindo ao painel administrativo Team Of Monsters
          </p>
        </div>

        <SummaryCards />

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

              <PendingPaymentsCard />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <NextEnrollmentsCard />
              <PeakHoursCard />
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
    </div>
  );
};

export default AdminDashboard;
