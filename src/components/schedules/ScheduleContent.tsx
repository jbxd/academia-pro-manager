
import React from "react";
import { ClassesTabContent } from "@/components/schedules/ClassesTabContent";
import { CalendarTabContent } from "@/components/schedules/CalendarTabContent";
import { AnalyticsTab } from "@/components/schedules/AnalyticsTab";
import { Schedule } from "@/hooks/useSchedulesData";

interface ScheduleContentProps {
  loading: boolean;
  error: string | null;
  filteredSchedules: Schedule[];
  searchTerm: string;
  onClearSearch: () => void;
  isAdmin: boolean;
  cardClasses: string;
  onDelete: (id: string | number) => void;
  popularTimes: Array<{
    time: string;
    days: string;
    occupation: number;
  }>;
  activeTab: string;
}

export const ScheduleContent: React.FC<ScheduleContentProps> = ({
  loading,
  error,
  filteredSchedules,
  searchTerm,
  onClearSearch,
  isAdmin,
  cardClasses,
  onDelete,
  popularTimes,
  activeTab,
}) => {
  if (activeTab === "classes") {
    return (
      <ClassesTabContent
        loading={loading}
        error={error}
        filteredSchedules={filteredSchedules}
        searchTerm={searchTerm}
        onClearSearch={onClearSearch}
        isAdmin={isAdmin}
        cardClasses={cardClasses}
        onDelete={onDelete}
      />
    );
  }

  if (activeTab === "calendar") {
    return <CalendarTabContent cardClasses={cardClasses} />;
  }

  return (
    <AnalyticsTab
      cardClasses={cardClasses}
      isAdmin={isAdmin}
      popularTimes={popularTimes}
    />
  );
};
