import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Calendar, CreditCard, Clock, CheckCircle2, Dumbbell, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createClient } from '@supabase/supabase-js';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data for student
  const studentData = {
    name: "João Silva",
    membership: {
      plan: "Plano Trimestral",
      startDate: "15/01/2024",
      endDate: "15/04/2024",
      daysLeft: 42,
      totalDays: 90,
      nextPayment: "15/04/2024",
      amount: "R$ 180,00"
    },
    attendance: [
      { date: "10/03/2024", time: "18:30" },
      { date: "08/03/2024", time: "19:00" },
      { date: "06/03/2024", time: "18:00" },
      { date: "04/03/2024", time: "17:45" },
    ],
    schedule: [
      { day: "Segunda", time: "18:00 - 19:30" },
      { day: "Quarta", time: "18:00 - 19:30" },
      { day: "Sexta", time: "18:00 - 19:30" },
    ]
  };

  const progress = (studentData.membership.daysLeft / studentData.membership.totalDays) * 100;

  const handlePayment = () => {
    // Redirect to checkout page
    navigate("/checkout");
  };

  const handleConfirmAttendance = async () => {
    try {
      // Initialize Supabase client
      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL || '', 
        import.meta.env.VITE_SUPABASE_ANON_KEY || ''
      );

      // Insert attendance record
      const { error } = await supabase
        .from('attendances')
        .insert([
          { 
            student_id: 'user123', // Replace with actual user ID
            date: new Date().toISOString(),
            status: 'present'
          }
        ]);

      if (error) throw error;

      toast.success("Presença confirmada com sucesso!");
    } catch (error) {
      console.error("Erro ao confirmar presença:", error);
      toast.error("Erro ao confirmar presença. Tente novamente.");
    }
  };

  return (
    <div className="bg-gradient-black-red min-h-screen -m-6 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">Olá, {studentData.name}</h1>
          <p className="text-gray-200">
            Bem-vindo à sua área do aluno do Team Of Monsters
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-black/40 text-white border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle>Status da Mensalidade</CardTitle>
              <CardDescription className="text-gray-300">
                {studentData.membership.plan}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Período:</span>
                <span className="font-medium">{studentData.membership.startDate} até {studentData.membership.endDate}</span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Dias restantes:</span>
                  <span className="font-medium">{studentData.membership.daysLeft} dias</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Próximo pagamento:</span>
                <span className="font-medium">{studentData.membership.nextPayment}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Valor:</span>
                <span className="font-medium">{studentData.membership.amount}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full bg-custom-red text-white hover:bg-custom-red/80 border-none">
                <Link to="/checkout">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Realizar pagamento
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Horários de Treino</CardTitle>
              <CardDescription>
                Seus horários agendados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentData.schedule.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{schedule.day}</p>
                      <p className="text-sm text-muted-foreground">{schedule.time}</p>
                    </div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/training">
                  <Clock className="mr-2 h-4 w-4" />
                  Alterar horários
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Últimas Presenças</CardTitle>
              <CardDescription>
                Seu histórico recente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentData.attendance.map((attendance, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center mr-3">
                      <Dumbbell className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">{attendance.date}</p>
                      <p className="text-sm text-muted-foreground">{attendance.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/training">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Ver histórico completo
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="mt-4 bg-black/40 text-white border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle>Próxima Aula</CardTitle>
            <CardDescription className="text-gray-300">
              Detalhes do seu próximo treino agendado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-custom-red/20 flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-custom-red" />
                </div>
                <div>
                  <p className="font-medium text-lg">Segunda-feira</p>
                  <p className="text-gray-300">15 de março de 2024</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-custom-red/20 flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-custom-red" />
                </div>
                <div>
                  <p className="font-medium text-lg">18:00 - 19:30</p>
                  <p className="text-gray-300">Duração: 1h30min</p>
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={handleConfirmAttendance}
                className="bg-custom-red hover:bg-custom-red/80"
              >
                Confirmar Presença
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
