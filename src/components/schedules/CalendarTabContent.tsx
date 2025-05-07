
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CalendarTabContentProps {
  cardClasses: string;
}

export const CalendarTabContent: React.FC<CalendarTabContentProps> = ({ cardClasses }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Calendar navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  // Helper function to get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Helper function to get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 border border-gray-100 p-1"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const isToday = new Date().toDateString() === date.toDateString();
      
      days.push(
        <div
          key={`day-${day}`}
          className={`h-12 border border-gray-100 p-1 cursor-pointer transition-colors ${
            isSelected ? 'bg-primary text-primary-foreground' : ''
          } ${isToday ? 'border-primary' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="flex flex-col h-full">
            <span className={`text-sm ${isSelected ? 'text-primary-foreground' : ''}`}>{day}</span>
            {day % 3 === 0 && (
              <span className="text-xs bg-red-100 text-red-600 rounded px-1 mt-auto">
                3 aulas
              </span>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  const handleAddEvent = () => {
    if (!selectedDate) {
      toast.error("Selecione uma data primeiro");
      return;
    }
    
    toast.success(`Adicionando aula para ${selectedDate.toLocaleDateString()}`);
    // Here you would typically open a dialog to add a class
  };
  
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
                 "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <Card className={cardClasses}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Calendário de Aulas</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {weekdays.map(day => (
            <div key={day} className="text-center font-medium p-1">{day}</div>
          ))}
          {generateCalendarDays()}
        </div>
        
        {selectedDate && (
          <div className="mt-4 p-3 border rounded-md">
            <h3 className="font-medium">
              {selectedDate.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">
                {selectedDate.getDate() % 3 === 0 
                  ? "3 aulas programadas" 
                  : "Nenhuma aula programada"}
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={handleAddEvent}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Aula
        </Button>
      </CardFooter>
    </Card>
  );
};
