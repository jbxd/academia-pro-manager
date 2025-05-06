
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

interface TimeOption {
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
  
  // Available time range options
  const timeOptions: TimeOption[] = [
    { value: "07:00-08:00", label: "07:00 - 08:00" },
    { value: "08:00-09:00", label: "08:00 - 09:00" },
    { value: "18:00-19:00", label: "18:00 - 19:00" },
    { value: "19:00-20:00", label: "19:00 - 20:00" }
  ];

  const handleTimeSelect = (timeRange: string) => {
    onChange(timeRange);
    setIsOpen(false);
  };

  const selectedOption = timeOptions.find(option => option.value === value);

  return (
    <div className="flex flex-col space-y-1.5">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className={`w-full justify-start text-left font-normal ${
              error ? 'border-red-500' : ''
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Clock className="mr-2 h-4 w-4" />
            {selectedOption 
              ? selectedOption.label 
              : "Selecione o horário"}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-72 p-0" 
          align="start" 
          sideOffset={8}
          style={{ zIndex: 9999 }}
        >
          <div className="p-2">
            <Label className="mb-2 block font-medium">Horários disponíveis</Label>
            <ScrollArea className="h-60 rounded-md border">
              <div className="p-2 space-y-1">
                {timeOptions.map((option) => (
                  <div 
                    key={option.value}
                    className="w-full"
                  >
                    <Button
                      variant={value === option.value ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => handleTimeSelect(option.value)}
                      type="button"
                      tabIndex={0}
                    >
                      {option.label}
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
