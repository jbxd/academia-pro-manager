
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";

interface Student {
  id: string;
  name: string;
  days: number;
  amount: number;
}

export const PendingPaymentsCard = () => {
  const students = [
    { name: "Pedro Oliveira", days: 32, amount: 180, id: "1" },
    { name: "Ana Silva", days: 15, amount: 180, id: "2" },
    { name: "Marcos Santos", days: 8, amount: 180, id: "3" },
    { name: "Juliana Costa", days: 5, amount: 180, id: "4" },
    { name: "Rafael Lima", days: 3, amount: 180, id: "5" },
  ];

  const handleEdit = (id: string) => {
    alert(`Edit student with ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    alert(`Delete student with ID: ${id}`);
  };

  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>Alunos com Pagamentos Pendentes</CardTitle>
        <CardDescription>
          Alunos que precisam de atenção
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex justify-between items-center border-b pb-2 last:border-0"
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
              <div className="space-x-2">
                <Button
                  className="flex-1 bg-white text-black hover:bg-gray-100"
                  onClick={() => handleEdit(student.id)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button
                  className="flex-1 bg-white text-black hover:bg-gray-100"
                  onClick={() => handleDelete(student.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
