
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";

interface TimeRange {
  value: string;
  label: string;
}

interface TimeRangePickerProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export function TimeRangePicker({ value, onChange, error }: TimeRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Use only specific time ranges as requested
  const timeRanges: TimeRange[] = [
    { value: "07:00-08:00", label: "07:00-08:00" },
    { value: "08:00-09:00", label: "08:00-09:00" },
    { value: "18:00-19:00", label: "18:00-19:00" },
    { value: "19:00-20:00", label: "19:00-20:00" }
  ];

  const handleTimeRangeSelect = (timeRange: string) => {
    onChange(timeRange);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-start text-left font-normal ${
              error ? 'border-red-500' : ''
            }`}
          >
            <Clock className="mr-2 h-4 w-4" />
            {value ? value : "Selecione o horário"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0" align="start">
          <div className="p-4">
            <Label className="mb-2 block">Horário da aula</Label>
            <ScrollArea className="h-60 pr-4">
              <div className="space-y-1">
                {timeRanges.map((range) => (
                  <Button
                    key={range.value}
                    variant={value === range.value ? "default" : "outline"}
                    className="w-full justify-start mb-1"
                    onClick={() => handleTimeRangeSelect(range.value)}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
