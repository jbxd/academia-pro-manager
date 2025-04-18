
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, DollarSign, CalendarCheck, AlertCircle } from "lucide-react";

export const SummaryCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
  );
};
