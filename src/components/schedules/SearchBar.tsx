
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus } from "lucide-react";

interface SearchBarProps {
  isAdmin: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isAdmin }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      <div className="flex gap-2 w-full md:w-auto">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar turma..." className="pl-8" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtrar
        </Button>
      </div>
      <Button className={isAdmin ? "bg-custom-red hover:bg-custom-red/80" : ""}>
        <Plus className="h-4 w-4 mr-2" />
        Nova Turma
      </Button>
    </div>
  );
};
