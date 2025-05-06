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
  
  // Parse the current value to get start and end times
  const [startTime, endTime] = value ? value.split('-') : ['', ''];
  
  // Available time options
  const timeOptions: TimeOption[] = [
    { value: "07:00", label: "07:00" },
    { value: "08:00", label: "08:00" },
    { value: "18:00", label: "18:00" },
    { value: "19:00", label: "19:00" },
    { value: "20:00", label: "20:00" }
  ];

  const handleStartTimeSelect = (start: string) => {
    // If end time is already selected and valid, update the full range
    if (endTime) {
      onChange(`${start}-${endTime}`);
    } else {
      // Otherwise just update start time
      onChange(`${start}-`);
    }
  };

  const handleEndTimeSelect = (end: string) => {
    // If start time is already selected and valid, update the full range
    if (startTime) {
      onChange(`${startTime}-${end}`);
    } else {
      // Otherwise just update end time
      onChange(`-${end}`);
    }
  };

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
            {value && value.includes('-') 
              ? value 
              : "Selecione o horário de início e fim"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0" align="start">
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block font-medium">Horário de início</Label>
                <ScrollArea className="h-40 pr-4">
                  <div className="space-y-1">
                    {timeOptions.map((option) => (
                      <Button
                        key={`start-${option.value}`}
                        variant={startTime === option.value ? "default" : "outline"}
                        className="w-full justify-start mb-1"
                        onClick={() => handleStartTimeSelect(option.value)}
                        type="button"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              <div>
                <Label className="mb-2 block font-medium">Horário de término</Label>
                <ScrollArea className="h-40 pr-4">
                  <div className="space-y-1">
                    {timeOptions.map((option) => (
                      <Button
                        key={`end-${option.value}`}
                        variant={endTime === option.value ? "default" : "outline"}
                        className="w-full justify-start mb-1"
                        onClick={() => handleEndTimeSelect(option.value)}
                        type="button"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
