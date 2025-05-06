
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { SchedulesContent } from "@/components/schedules/SchedulesContent";

const Schedules = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const cardClasses = isAdmin ? "bg-black/40 text-white border-gray-700" : "";
  const [activeTab, setActiveTab] = useState("classes");

  return (
    <AppLayout>
      <SchedulesContent 
        isAdmin={isAdmin} 
        cardClasses={cardClasses} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </AppLayout>
  );
};

export default Schedules;
