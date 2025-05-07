
import React from "react";
import { Button } from "@/components/ui/button";
import { ScheduleList } from "@/components/schedules/ScheduleList";
import { Schedule } from "@/hooks/useSchedulesData";

interface ClassesTabContentProps {
  loading: boolean;
  error: string | null;
  filteredSchedules: Schedule[];
  searchTerm: string;
  onClearSearch: () => void;
  isAdmin: boolean;
  cardClasses: string;
  onDelete: (id: string | number) => void;
}

export const ClassesTabContent: React.FC<ClassesTabContentProps> = ({
  loading,
  error,
  filteredSchedules,
  searchTerm,
  onClearSearch,
  isAdmin,
  cardClasses,
  onDelete,
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
};
