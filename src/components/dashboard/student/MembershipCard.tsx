
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { CreditCard } from "lucide-react";

interface MembershipData {
  plan: string;
  startDate: string;
  endDate: string;
  daysLeft: number;
  totalDays: number;
  nextPayment: string;
  amount: string;
}

interface MembershipCardProps {
  membership: MembershipData;
}

export const MembershipCard: React.FC<MembershipCardProps> = ({ membership }) => {
  const progress = (membership.daysLeft / membership.totalDays) * 100;

  return (
    <Card className="bg-black/40 text-white border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle>Status da Mensalidade</CardTitle>
        <CardDescription className="text-gray-300">{membership.plan}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300">Período:</span>
          <span className="font-medium">{membership.startDate} até {membership.endDate}</span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Dias restantes:</span>
            <span className="font-medium">{membership.daysLeft} dias</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300">Próximo pagamento:</span>
          <span className="font-medium">{membership.nextPayment}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-300">Valor:</span>
          <span className="font-medium">{membership.amount}</span>
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
  );
};
