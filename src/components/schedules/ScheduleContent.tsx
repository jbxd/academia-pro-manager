
import React from "react";
import { Button } from "@/components/ui/button";
import { ScheduleList } from "@/components/schedules/ScheduleList";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsTab } from "@/components/schedules/AnalyticsTab";

interface ScheduleContentProps {
  loading: boolean;
  error: string | null;
  filteredSchedules: any[];
  searchTerm: string;
  onClearSearch: () => void;
  isAdmin: boolean;
  cardClasses: string;
  onDelete: (id: string) => void;
  popularTimes: Array<{
    time: string;
    days: string;
    occupation: number;
  }>;
  activeTab: string;
}

export const ScheduleContent: React.FC<ScheduleContentProps> = ({
  loading,
  error,
  filteredSchedules,
  searchTerm,
  onClearSearch,
  isAdmin,
  cardClasses,
  onDelete,
  popularTimes,
  activeTab,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Erro!</strong>
        <span className="block sm:inline"> Não foi possível carregar as turmas. Tente novamente mais tarde.</span>
      </div>
    );
  }

  if (activeTab === "classes") {
    if (filteredSchedules.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg">Nenhuma turma encontrada.</p>
          {searchTerm && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={onClearSearch}
            >
              Limpar busca
            </Button>
          )}
        </div>
      );
    }

    return (
      <ScheduleList
        schedules={filteredSchedules}
        isAdmin={isAdmin}
        cardClasses={cardClasses}
        onDelete={onDelete}
      />
    );
  }

  if (activeTab === "calendar") {
    return (
      <Card className={cardClasses}>
        <CardHeader>
          <CardTitle>Calendário de Aulas</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-2">Calendário de aulas seria exibido aqui</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <AnalyticsTab
      cardClasses={cardClasses}
      isAdmin={isAdmin}
      popularTimes={popularTimes}
    />
  );
};
