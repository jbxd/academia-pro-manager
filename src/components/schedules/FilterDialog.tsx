
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Filter } from "lucide-react";

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
  const [filters, setFilters] = React.useState<FilterOptions>({});

  const handleFilter = () => {
    onFilter(filters);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtrar
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
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" onClick={handleFilter}>
            Aplicar Filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
