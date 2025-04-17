
import React from "react";
import {
  CreditCard,
  DollarSign,
  Calendar,
  FileText,
  Clock,
  ArrowRight,
  Download,
  Bell,
  Trash2,
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
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const Payments = () => {
  // Mock data for student payments
  const currentMembership = {
    plan: "Plano Trimestral",
    startDate: "15/01/2024",
    endDate: "15/04/2024",
    daysLeft: 42,
    totalDays: 90,
    nextPayment: "15/04/2024",
    amount: "R$ 180,00",
  };
  
  const paymentHistory = [
    {
      id: "1",
      date: "15/01/2024",
      description: "Plano Trimestral",
      amount: "R$ 180,00",
      status: "paid",
      method: "Cartão de Crédito",
    },
    {
      id: "2",
      date: "15/10/2023",
      description: "Plano Trimestral",
      amount: "R$ 180,00",
      status: "paid",
      method: "Boleto Bancário",
    },
    {
      id: "3",
      date: "15/07/2023",
      description: "Plano Trimestral",
      amount: "R$ 180,00",
      status: "paid",
      method: "PIX",
    },
  ];

  const paymentMethods = [
    {
      id: "1",
      type: "credit-card",
      name: "Cartão de Crédito",
      details: "Mastercard terminando em 1234",
      isDefault: true,
    },
    {
      id: "2",
      type: "pix",
      name: "PIX",
      details: "CPF: ***.***.***-**",
      isDefault: false,
    },
  ];

  const progress = (currentMembership.daysLeft / currentMembership.totalDays) * 100;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Pago</Badge>;
      case "pending":
        return <Badge className="bg-amber-500">Pendente</Badge>;
      case "overdue":
        return <Badge className="bg-red-500">Atrasado</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  const handlePayment = () => {
    toast.success("Processando pagamento...");
  };

  const handleAdvancePayment = () => {
    toast.success("Processando pagamento adiantado...");
  };

  const handleAddPaymentMethod = () => {
    toast.success("Função adicionar método de pagamento ativada!");
  };

  const handleRemovePaymentMethod = (id: string) => {
    toast.success(`Método de pagamento ${id} removido com sucesso!`);
  };

  const handleChangePaymentDate = () => {
    toast.success("Função alterar data de pagamento ativada!");
  };

  const handleConfigNotifications = () => {
    toast.success("Função configurar notificações ativada!");
  };

  const handleManagePayment = (id: string) => {
    toast.success(`Gerenciando pagamento ${id}...`);
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Pagamentos</h1>
          <p className="text-muted-foreground">
            Gerencie seus pagamentos e métodos de pagamento
          </p>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Status da Mensalidade</CardTitle>
            <CardDescription>
              {currentMembership.plan}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Período:</span>
              <span className="font-medium">{currentMembership.startDate} até {currentMembership.endDate}</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Dias restantes:</span>
                <span className="font-medium">{currentMembership.daysLeft} dias</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Próximo pagamento:</span>
              <span className="font-medium">{currentMembership.nextPayment}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Valor:</span>
              <span className="font-medium">{currentMembership.amount}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleAdvancePayment}>
              <Calendar className="mr-2 h-4 w-4" />
              Realizar pagamento antecipado
            </Button>
          </CardFooter>
        </Card>

        <Tabs defaultValue="history" className="space-y-4">
          <TabsList>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="methods">Métodos de Pagamento</TabsTrigger>
            <TabsTrigger value="settings">Preferências</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Histórico de Pagamentos</CardTitle>
                  <CardDescription>
                    Seus pagamentos anteriores
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Recibos
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center border-b pb-4">
                      <div>
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                        <p className="text-sm text-muted-foreground">Via {payment.method}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{payment.amount}</p>
                        <div className="mt-1">
                          {getStatusBadge(payment.status)}
                        </div>
                        <Button variant="ghost" size="sm" className="mt-2" onClick={() => handleManagePayment(payment.id)}>
                          <FileText className="h-4 w-4 mr-2" />
                          Gerenciar pagamento
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="methods">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Métodos de Pagamento</CardTitle>
                  <CardDescription>
                    Gerencie seus métodos de pagamento
                  </CardDescription>
                </div>
                <Button onClick={handleAddPaymentMethod}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Adicionar Método
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex justify-between items-center border-b pb-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          {method.type === "credit-card" ? (
                            <CreditCard className="h-5 w-5 text-primary" />
                          ) : (
                            <DollarSign className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.details}</p>
                          {method.isDefault && (
                            <Badge variant="secondary" className="mt-1">Padrão</Badge>
                          )}
                        </div>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        {!method.isDefault && (
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleRemovePaymentMethod(method.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remover
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Pagamento</CardTitle>
                <CardDescription>
                  Configure suas preferências para futuros pagamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <p className="font-medium">Pagamento Automático</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Permitir que o sistema debite automaticamente o valor da mensalidade no vencimento.
                    </p>
                    <Button variant="outline">Ativar Pagamento Automático</Button>
                  </div>
                  <div className="border-b pb-4">
                    <p className="font-medium">Data de Vencimento</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Selecione a data de vencimento preferencial para suas mensalidades.
                    </p>
                    <Button variant="outline" onClick={handleChangePaymentDate}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Alterar Data de Vencimento
                    </Button>
                  </div>
                  <div>
                    <p className="font-medium">Notificações de Pagamento</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Receba lembretes sobre vencimentos e confirmações de pagamento.
                    </p>
                    <Button variant="outline" onClick={handleConfigNotifications}>
                      <Bell className="h-4 w-4 mr-2" />
                      Configurar Notificações
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handlePayment}>
                  <DollarSign className="mr-2 h-4 w-4" />
                  Realizar pagamento
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Payments;
