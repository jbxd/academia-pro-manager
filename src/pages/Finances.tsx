
import React from "react";
import { 
  DollarSign, Calendar, Download, CreditCard, 
  FileText, Bell, TrendingUp 
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
import RevenueChart from "@/components/charts/RevenueChart";

const Finances = () => {
  // Mock data for finances
  const pendingPayments = [
    { 
      id: "1", 
      name: "João Silva", 
      plan: "Trimestral", 
      amount: 180, 
      dueDate: "20/04/2024", 
      status: "expiring" // expiring, overdue, defaulter
    },
    { 
      id: "2", 
      name: "Maria Oliveira", 
      plan: "Mensal", 
      amount: 80, 
      dueDate: "15/04/2024", 
      status: "expiring" 
    },
    { 
      id: "3", 
      name: "Pedro Santos", 
      plan: "Semestral", 
      amount: 450, 
      dueDate: "10/03/2024", 
      status: "overdue" 
    },
    { 
      id: "4", 
      name: "Ana Costa", 
      plan: "Mensal", 
      amount: 80, 
      dueDate: "15/02/2024", 
      status: "defaulter" 
    },
  ];

  const recentPayments = [
    { 
      id: "1", 
      name: "Carlos Ferreira", 
      plan: "Anual", 
      amount: 780, 
      date: "12/03/2024", 
      method: "Cartão de Crédito" 
    },
    { 
      id: "2", 
      name: "Lúcia Mendes", 
      plan: "Mensal", 
      amount: 80, 
      date: "10/03/2024", 
      method: "PIX" 
    },
    { 
      id: "3", 
      name: "Roberto Alves", 
      plan: "Trimestral", 
      amount: 180, 
      date: "05/03/2024", 
      method: "Boleto" 
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "expiring":
        return <Badge className="bg-amber-500">Vencendo</Badge>;
      case "overdue":
        return <Badge className="bg-red-500">Atrasado</Badge>;
      case "defaulter":
        return <Badge className="bg-red-700">Inadimplente</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Financeiro</h1>
          <p className="text-muted-foreground">
            Gerencie as finanças do Team Of Monsters
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Receita Mensal</p>
                <p className="text-3xl font-bold">R$ 24.580</p>
                <p className="text-xs text-green-600">+5% vs. mês anterior</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">A Receber</p>
                <p className="text-3xl font-bold">R$ 9.360</p>
                <p className="text-xs">Próximos 5 dias</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Atrasados</p>
                <p className="text-3xl font-bold">R$ 3.240</p>
                <p className="text-xs text-red-600">18 pagamentos</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <Bell className="h-6 w-6 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Taxa de Renovação</p>
                <p className="text-3xl font-bold">92%</p>
                <p className="text-xs text-green-600">+2% vs. mês anterior</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="pending">Pagamentos Pendentes</TabsTrigger>
            <TabsTrigger value="history">Histórico de Pagamentos</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Receita Mensal</CardTitle>
                <CardDescription>
                  Valores recebidos nos últimos 6 meses
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <RevenueChart />
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Pagamentos Pendentes</CardTitle>
                  <CardDescription>
                    Pagamentos que vencem em breve
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingPayments.slice(0, 3).map((payment) => (
                      <div key={payment.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{payment.name}</p>
                          <p className="text-sm text-muted-foreground">Vence em: {payment.dueDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ {payment.amount}</p>
                          {getStatusBadge(payment.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Ver todos</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pagamentos Recentes</CardTitle>
                  <CardDescription>
                    Últimos pagamentos recebidos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPayments.map((payment) => (
                      <div key={payment.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{payment.name}</p>
                          <p className="text-sm text-muted-foreground">Pago em: {payment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ {payment.amount}</p>
                          <p className="text-sm text-muted-foreground">{payment.method}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Ver histórico completo</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Pagamentos Pendentes</CardTitle>
                  <CardDescription>
                    Todos os pagamentos pendentes
                  </CardDescription>
                </div>
                <div className="space-x-2">
                  <Button variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Notificar Todos
                  </Button>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingPayments.map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center border-b pb-4">
                      <div>
                        <p className="font-medium text-lg">{payment.name}</p>
                        <p className="text-sm">Plano {payment.plan}</p>
                        <p className="text-sm text-muted-foreground">Vence em: {payment.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">R$ {payment.amount}</p>
                        <div className="flex items-center justify-end space-x-2 mt-2">
                          {getStatusBadge(payment.status)}
                        </div>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline">
                            <Bell className="h-3 w-3 mr-1" />
                            Notificar
                          </Button>
                          <Button size="sm">
                            <CreditCard className="h-3 w-3 mr-1" />
                            Registrar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Histórico de Pagamentos</CardTitle>
                  <CardDescription>
                    Todos os pagamentos recebidos
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Histórico completo seria implementado aqui */}
                  <p className="text-muted-foreground">Histórico detalhado de pagamentos seria exibido aqui.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Financeiros</CardTitle>
                <CardDescription>
                  Relatórios e análises financeiras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <DollarSign className="h-8 w-8 mb-2" />
                    <span>Relatório de Receitas</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <CreditCard className="h-8 w-8 mb-2" />
                    <span>Relatório de Pagamentos</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <Bell className="h-8 w-8 mb-2" />
                    <span>Relatório de Inadimplência</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                    <TrendingUp className="h-8 w-8 mb-2" />
                    <span>Análise de Crescimento</span>
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

export default Finances;
