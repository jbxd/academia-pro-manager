
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  
  // Generate time options in 30-minute intervals
  const generateTimeOptions = (): TimeOption[] => {
    const options: TimeOption[] = [];
    for (let hour = 6; hour < 23; hour++) {
      for (let minute of [0, 30]) {
        const hourStr = hour.toString().padStart(2, '0');
        const minuteStr = minute.toString().padStart(2, '0');
        const timeStr = `${hourStr}:${minuteStr}`;
        options.push({ value: timeStr, label: timeStr });
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();
  
  const [startTime, endTime] = value ? value.split('-') : ['', ''];

  const handleStartTimeSelect = (time: string) => {
    onChange(`${time}-${endTime || ''}`.replace(/-$/, ''));
  };

  const handleEndTimeSelect = (time: string) => {
    onChange(`${startTime || ''}-${time}`.replace(/^-/, ''));
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
        <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
          <div className="p-4 grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-2 block">Horário início</Label>
              <div className="h-60 overflow-y-auto space-y-1 pr-2">
                {timeOptions.map((option) => (
                  <Button
                    key={`start-${option.value}`}
                    variant={startTime === option.value ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleStartTimeSelect(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Horário fim</Label>
              <div className="h-60 overflow-y-auto space-y-1 pr-2">
                {timeOptions.map((option) => (
                  <Button
                    key={`end-${option.value}`}
                    variant={endTime === option.value ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleEndTimeSelect(option.value)}
                    disabled={startTime && option.value <= startTime}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
