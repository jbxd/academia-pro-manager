
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterDialog } from "@/components/schedules/FilterDialog";
import { NewClassDialog } from "@/components/schedules/NewClassDialog";
import { FilterOptions } from "@/components/schedules/FilterDialog";

interface ScheduleControlsProps {
  searchTerm: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilter: (filters: FilterOptions) => void;
  onSaveChanges: () => void;
  onClassAdded: () => void;
}

export const ScheduleControls: React.FC<ScheduleControlsProps> = ({
  searchTerm,
  onSearch,
  onFilter,
  onSaveChanges,
  onClassAdded,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      <div className="flex gap-2 w-full md:w-auto">
        <Input 
          placeholder="Buscar turma..." 
          className="pl-8" 
          value={searchTerm}
          onChange={onSearch}
        />
        <FilterDialog onFilter={onFilter} />
      </div>
      <div className="flex gap-2">
        <Button onClick={onSaveChanges} className="bg-green-600 hover:bg-green-700">
          Salvar Alterações
        </Button>
        <NewClassDialog onClassAdded={onClassAdded} />
      </div>
    </div>
  );
};
