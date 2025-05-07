
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimeRangePickerProps {
  value: string;
  onChange: (value: string, startTime: string, endTime: string) => void;
  error?: boolean;
}

export function TimeRangePicker({ value, onChange, error }: TimeRangePickerProps) {
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");

  // Parse initial value if exists
  React.useEffect(() => {
    if (value && value.includes("-")) {
      const [start, end] = value.split("-");
      setStartTime(start);
      setEndTime(end);
    }
  }, [value]);

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
    
    if (newStartTime && endTime) {
      const timeValue = `${newStartTime}-${endTime}`;
      onChange(timeValue, newStartTime, endTime);
    }
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);
    
    if (startTime && newEndTime) {
      const timeValue = `${startTime}-${newEndTime}`;
      onChange(timeValue, startTime, newEndTime);
    }
  };

  // Helper text for time format
  const timeFormatHelp = "Formato: HH:MM (ex: 19:00)";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="start-time">Hora de início</Label>
          <Input
            id="start-time"
            type="text"
            value={startTime}
            onChange={handleStartTimeChange}
            placeholder="19:00"
            className={error ? "border-red-500" : ""}
          />
          <p className="text-xs text-muted-foreground mt-1">{timeFormatHelp}</p>
        </div>
        <div>
          <Label htmlFor="end-time">Hora de término</Label>
          <Input
            id="end-time"
            type="text"
            value={endTime}
            onChange={handleEndTimeChange}
            placeholder="20:00"
            className={error ? "border-red-500" : ""}
          />
          <p className="text-xs text-muted-foreground mt-1">{timeFormatHelp}</p>
        </div>
      </div>
    </div>
  );
}
