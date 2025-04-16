
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users, DollarSign, CalendarCheck, Clock,
  TrendingUp, AlertCircle, CheckCircle, Calendar
} from "lucide-react";
import AppLayout from "@/components/layouts/AppLayout";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import StudentDashboard from "@/components/dashboard/StudentDashboard";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <AppLayout>
      {user.role === "admin" ? <AdminDashboard /> : <StudentDashboard />}
    </AppLayout>
  );
};

export default Dashboard;
