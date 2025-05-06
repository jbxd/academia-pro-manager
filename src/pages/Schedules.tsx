
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { SchedulesContent } from "@/components/schedules/SchedulesContent";

const Schedules = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const cardClasses = isAdmin ? "bg-black/40 text-white border-gray-700" : "";

  return (
    <AppLayout>
      <SchedulesContent 
        isAdmin={isAdmin} 
        cardClasses={cardClasses} 
      />
    </AppLayout>
  );
};

export default Schedules;
