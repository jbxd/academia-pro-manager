
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface AttendanceConfirmationProps {
  date: string;
  time: string;
}

export const AttendanceConfirmation: React.FC<AttendanceConfirmationProps> = ({ date, time }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const { user } = useAuth();

  const handleConfirmAttendance = async () => {
    if (!user) {
      toast.error("Você precisa estar logado para confirmar presença.");
      return;
    }

    setIsConfirming(true);
    
    try {
      // Insert attendance record
      const { error } = await supabase
        .from('attendance')
        .insert([
          { 
            profile_id: user.id,
            check_in: new Date().toISOString(),
            status: 'present'
          }
        ]);

      if (error) throw error;

      toast.success("Presença confirmada com sucesso!");
    } catch (error) {
      console.error("Erro ao confirmar presença:", error);
      toast.error("Erro ao confirmar presença. Tente novamente.");
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <Button 
      size="lg" 
      onClick={handleConfirmAttendance}
      className="bg-custom-red hover:bg-custom-red/80"
      isLoading={isConfirming}
    >
      <CheckCircle2 className="mr-2 h-4 w-4" />
      Confirmar Presença
    </Button>
  );
};
