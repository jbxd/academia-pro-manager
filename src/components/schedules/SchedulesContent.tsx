
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCards } from "@/components/schedules/StatsCards";
import { SchedulesHeader } from "@/components/schedules/SchedulesHeader";
import { ScheduleControls } from "@/components/schedules/ScheduleControls";
import { ClassesTabContent } from "@/components/schedules/ClassesTabContent";
import { CalendarTabContent } from "@/components/schedules/CalendarTabContent";
import { AnalyticsTab } from "@/components/schedules/AnalyticsTab";
import { useSchedulesData } from "@/hooks/useSchedulesData";

// Define the popular times data
const popularTimes = [
  {
    time: "18:00 - 19:00",
    days: "Segunda, Terça, Quarta",
    occupation: 95,
  },
  {
    time: "19:00 - 20:00",
    days: "Terça, Quarta, Quinta",
    occupation: 87,
  },
  {
    time: "17:00 - 18:00",
    days: "Segunda, Quarta, Sexta",
    occupation: 78,
  },
  {
    time: "07:00 - 08:00",
    days: "Terça, Quinta",
    occupation: 65,
  },
];

interface SchedulesContentProps {
  isAdmin: boolean;
  cardClasses: string;
}

export const SchedulesContent: React.FC<SchedulesContentProps> = ({ 
  isAdmin, 
  cardClasses, 
}) => {
  const [activeTab, setActiveTab] = useState("classes");
  
  const {
    filteredSchedules,
    loading,
    error,
    searchTerm,
    fetchSchedules,
    handleSearch,
    handleFilter,
    handleDelete,
    handleSaveChanges,
    clearSearch
  } = useSchedulesData();

  return (
    <div className="flex flex-col gap-4">
      <SchedulesHeader />
      <StatsCards isAdmin={isAdmin} cardClasses={cardClasses} />

      <Tabs defaultValue={activeTab} value={activeTab} className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="classes">Aulas e Turmas</TabsTrigger>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
          <TabsTrigger value="analytics">Análise de Horários</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-4">
          <ScheduleControls
            searchTerm={searchTerm}
            onSearch={handleSearch}
            onFilter={handleFilter}
            onSaveChanges={handleSaveChanges}
            onClassAdded={fetchSchedules}
          />
          <ClassesTabContent
            loading={loading}
            error={error}
            filteredSchedules={filteredSchedules}
            searchTerm={searchTerm}
            onClearSearch={clearSearch}
            isAdmin={isAdmin}
            cardClasses={cardClasses}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="calendar">
          <CalendarTabContent cardClasses={cardClasses} />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsTab
            cardClasses={cardClasses}
            isAdmin={isAdmin}
            popularTimes={popularTimes}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
