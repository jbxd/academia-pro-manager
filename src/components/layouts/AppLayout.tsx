
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "./Sidebar";
import { Toaster } from "@/components/ui/sonner";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    </div>;
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  // Apply different styling based on user role
  const backgroundClass = user?.role === "student" 
    ? "bg-gradient-black-red min-h-screen -m-6 p-6"
    : "bg-gradient-black-red min-h-screen -m-6 p-6";

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className={backgroundClass}>
          {children}
        </div>
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default AppLayout;
