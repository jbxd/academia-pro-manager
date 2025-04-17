
import React from "react";
import { Users, UserPlus, Search, Filter } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const Students = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const cardClasses = isAdmin ? "bg-black/40 text-white border-gray-700" : "";
  
  // Mock data for students
  const students = [
    {
      id: "1",
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 99999-8888",
      status: "active", // active, pending, expired
      paymentStatus: "up-to-date", // up-to-date, expiring, overdue, defaulter
      plan: "Plano Trimestral",
      joinDate: "15/01/2024",
    },
    {
      id: "2",
      name: "Maria Oliveira",
      email: "maria@email.com",
      phone: "(11) 97777-6666",
      status: "active",
      paymentStatus: "expiring",
      plan: "Plano Mensal",
      joinDate: "05/02/2024",
    },
    {
      id: "3",
      name: "Pedro Santos",
      email: "pedro@email.com",
      phone: "(11) 95555-4444",
      status: "active",
      paymentStatus: "overdue",
      plan: "Plano Semestral",
      joinDate: "10/10/2023",
    },
    {
      id: "4",
      name: "Ana Costa",
      email: "ana@email.com",
      phone: "(11) 93333-2222",
      status: "expired",
      paymentStatus: "defaulter",
      plan: "Plano Mensal",
      joinDate: "20/11/2023",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Ativo</Badge>;
      case "pending":
        return <Badge className="bg-amber-500">Pendente</Badge>;
      case "expired":
        return <Badge className="bg-gray-500">Expirado</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  const getPaymentStatusBadge = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "up-to-date":
        return <Badge className="bg-green-500">Em dia</Badge>;
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
          <h1 className="text-3xl font-bold text-white">Gestão de Alunos</h1>
          <p className="text-gray-200">
            Gerencie os alunos do Team Of Monsters
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar aluno..." className="pl-8 text-gray-700" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Novo Aluno
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student) => (
            <Card key={student.id} className={cardClasses}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{student.name}</CardTitle>
                  {getStatusBadge(student.status)}
                </div>
                <CardDescription className={isAdmin ? "text-gray-300" : ""}>{student.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={isAdmin ? "text-sm text-gray-300" : "text-sm text-muted-foreground"}>Telefone:</span>
                    <span>{student.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isAdmin ? "text-sm text-gray-300" : "text-sm text-muted-foreground"}>Plano:</span>
                    <span>{student.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isAdmin ? "text-sm text-gray-300" : "text-sm text-muted-foreground"}>Desde:</span>
                    <span>{student.joinDate}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className={isAdmin ? "text-sm text-gray-300" : "text-sm text-muted-foreground"}>Pagamento:</span>
                    {getPaymentStatusBadge(student.paymentStatus)}
                  </div>
                  <div className="pt-4 flex gap-2">
                    <Button className="flex-1" variant="outline">
                      Detalhes
                    </Button>
                    <Button 
                      className={isAdmin ? "flex-1 bg-custom-red hover:bg-custom-red/80" : "flex-1"}
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Students;
