
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  
  // Generate time ranges with 1-hour intervals
  const generateTimeRanges = (): TimeRange[] => {
    const ranges: TimeRange[] = [];
    for (let hour = 6; hour < 22; hour++) {
      const startHour = hour.toString().padStart(2, '0');
      const endHour = (hour + 1).toString().padStart(2, '0');
      const timeRange = `${startHour}:00-${endHour}:00`;
      ranges.push({ value: timeRange, label: timeRange });
    }
    return ranges;
  };

  const timeRanges = generateTimeRanges();

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
            <div className="h-60 overflow-y-auto space-y-1 pr-2">
              {timeRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={value === range.value ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleTimeRangeSelect(range.value)}
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
