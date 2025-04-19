
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export const SchedulesHeader = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-white">Gestão de Horários</h1>
      <p className="text-gray-200">
        Gerencie os horários e turmas do Team Of Monsters
      </p>
    </div>
  );
};
