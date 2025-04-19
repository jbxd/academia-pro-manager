
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const SchedulesHeader = () => {
  const [classCount, setClassCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchClassCount = async () => {
      setLoading(true);
      try {
        const { count, error } = await supabase
          .from('schedules')
          .select('*', { count: 'exact', head: true });
        
        if (error) throw error;
        setClassCount(count);
      } catch (error) {
        console.error("Erro ao buscar contagem de turmas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassCount();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">Gestão de Horários</h1>
        <p className="text-gray-200">
          Gerencie os horários e turmas do Team Of Monsters
        </p>
      </div>
      
      <div className="flex items-center gap-2 bg-black/30 p-3 rounded-lg">
        <div className="h-10 w-10 rounded-full bg-custom-red/20 flex items-center justify-center">
          <Calendar className="h-5 w-5 text-custom-red" />
        </div>
        <div>
          <p className="text-sm text-gray-300">Total de turmas</p>
          {loading ? (
            <div className="h-6 w-12 bg-gray-700/50 animate-pulse rounded"></div>
          ) : (
            <p className="font-bold text-xl text-white">{classCount || 0}</p>
          )}
        </div>
        {isAdmin && (
          <Button 
            size="sm" 
            variant="outline" 
            className="ml-4 text-xs border-gray-600 text-gray-300 hover:bg-gray-800"
            onClick={() => window.location.href = "/schedules"}
          >
            Ver Detalhes
          </Button>
        )}
      </div>
    </div>
  );
};
