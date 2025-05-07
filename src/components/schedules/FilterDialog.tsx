
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import { toast } from "sonner";

interface FilterDialogProps {
  onFilter: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  instructor?: string;
  day?: string;
  timeRange?: string;
  status?: string;
}

export const FilterDialog: React.FC<FilterDialogProps> = ({ onFilter }) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});
  const [filtersApplied, setFiltersApplied] = useState(false);

  const handleFilter = () => {
    onFilter(filters);
    setActiveFilters({...filters});
    setFiltersApplied(true);
    setOpen(false);
    toast.success("Filtros aplicados com sucesso");
  };

  const handleClearFilters = () => {
    const emptyFilters = {};
    setFilters(emptyFilters);
    setActiveFilters(emptyFilters);
    onFilter(emptyFilters);
    setFiltersApplied(false);
    toast.info("Filtros removidos");
  };

  const countActiveFilters = () => {
    return Object.values(activeFilters).filter(Boolean).length;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filtrar
          {filtersApplied && countActiveFilters() > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {countActiveFilters()}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtrar Turmas</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="instructor">Instrutor</Label>
            <Input
              id="instructor"
              value={filters.instructor || ''}
              onChange={(e) => setFilters({ ...filters, instructor: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="day">Dia da Semana</Label>
            <Select
              value={filters.day || ''}
              onValueChange={(value) => setFilters({ ...filters, day: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o dia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os dias</SelectItem>
                <SelectItem value="Segunda">Segunda</SelectItem>
                <SelectItem value="Terça">Terça</SelectItem>
                <SelectItem value="Quarta">Quarta</SelectItem>
                <SelectItem value="Quinta">Quinta</SelectItem>
                <SelectItem value="Sexta">Sexta</SelectItem>
                <SelectItem value="Sábado">Sábado</SelectItem>
                <SelectItem value="Domingo">Domingo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={filters.status || ''}
              onValueChange={(value) => setFilters({ ...filters, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="full">Lotado</SelectItem>
                <SelectItem value="available">Disponível</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={handleClearFilters}
              className="flex-1"
            >
              <X className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
            <Button 
              onClick={handleFilter}
              className="flex-1"
            >
              <Filter className="h-4 w-4 mr-2" />
              Aplicar Filtros
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
