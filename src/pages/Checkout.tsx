
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { ArrowLeft, CreditCard, Calendar } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();

  const planDetails = {
    name: "Plano Trimestral",
    price: "R$ 180,00",
    description: "Acesso ilimitado à academia por 3 meses",
    benefits: [
      "Acesso a todas as áreas da academia",
      "Acompanhamento com instrutor",
      "App exclusivo",
      "Programa de treino personalizado"
    ]
  };

  const handlePayment = async () => {
    try {
      // Initialize Supabase client
      const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL || '', 
        import.meta.env.VITE_SUPABASE_ANON_KEY || ''
      );

      // Insert payment record to Supabase
      const { error } = await supabase
        .from('payments')
        .insert([
          { 
            user_id: 'user123', // Replace with actual user ID
            amount: 180,
            plan: "Plano Trimestral",
            status: "processing",
            date: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      // Redirect to payment confirmation page (or external gateway)
      toast.success("Pagamento processado com sucesso!");
      setTimeout(() => {
        navigate("/payments");
      }, 2000);
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      toast.error("Erro ao processar pagamento. Tente novamente.");
    }
  };

  return (
    <AppLayout>
      <div className="bg-gradient-black-red min-h-screen -m-6 p-6">
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="text-white" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>

          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-white">Checkout</h1>
            <p className="text-gray-200">Complete sua compra</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-black/40 text-white border-gray-700">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                  <span className="font-medium">{planDetails.name}</span>
                  <span>{planDetails.price}</span>
                </div>
                
                <div>
                  <p className="mb-2 text-gray-300">O que está incluído:</p>
                  <ul className="space-y-2">
                    {planDetails.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center">
                        <div className="h-5 w-5 rounded-full bg-custom-red/20 flex items-center justify-center mr-2">
                          <span className="text-custom-red text-xs">✓</span>
                        </div>
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-700 pt-3">
                <span className="font-bold">Total</span>
                <span className="font-bold">{planDetails.price}</span>
              </CardFooter>
            </Card>

            <Card className="bg-black/40 text-white border-gray-700">
              <CardHeader>
                <CardTitle>Método de Pagamento</CardTitle>
                <CardDescription className="text-gray-300">
                  Escolha como deseja pagar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border border-gray-700 rounded-md p-4 cursor-pointer bg-black/20">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-custom-red/20 flex items-center justify-center mr-3">
                      <CreditCard className="h-5 w-5 text-custom-red" />
                    </div>
                    <div>
                      <p className="font-medium">Cartão de Crédito</p>
                      <p className="text-sm text-gray-300">Mastercard terminando em 1234</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-700 rounded-md p-4 cursor-pointer">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Boleto Bancário</p>
                      <p className="text-sm text-gray-300">Vencimento em 3 dias úteis</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-custom-red hover:bg-custom-red/80 text-white"
                  onClick={handlePayment}
                >
                  Finalizar Pagamento
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Checkout;
