
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Users, DollarSign, Calendar, Clock, 
  BarChart, Settings, LogOut, Menu, X, 
  User, CreditCard, CalendarDays
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const adminLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <BarChart className="h-5 w-5" /> },
    { to: "/students", label: "Alunos", icon: <Users className="h-5 w-5" /> },
    { to: "/finances", label: "Financeiro", icon: <DollarSign className="h-5 w-5" /> },
    { to: "/attendance", label: "Frequência", icon: <Calendar className="h-5 w-5" /> },
    { to: "/schedules", label: "Horários", icon: <Clock className="h-5 w-5" /> },
    { to: "/settings", label: "Configurações", icon: <Settings className="h-5 w-5" /> },
  ];

  const studentLinks = [
    { to: "/profile", label: "Perfil", icon: <User className="h-5 w-5" /> },
    { to: "/payments", label: "Pagamentos", icon: <CreditCard className="h-5 w-5" /> },
    { to: "/training", label: "Treinos", icon: <CalendarDays className="h-5 w-5" /> },
    { to: "/settings", label: "Configurações", icon: <Settings className="h-5 w-5" /> },
  ];

  const links = user?.role === "admin" ? adminLinks : studentLinks;

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarClasses = cn(
    "fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out md:relative",
    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
  );

  return (
    <>
      <div className={sidebarClasses}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">Team Of Monsters</span>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "hover:bg-sidebar-accent/50"
                  )
                }
              >
                {link.icon}
                <span className="ml-3">{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="border-t border-sidebar-border p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full flex items-center justify-start p-0 hover:bg-sidebar-accent/50">
                <div className="flex items-center space-x-3 p-2 rounded-md w-full">
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left">
                    <span className="font-medium">{user?.name}</span>
                    <span className="text-xs opacity-70">{user?.role === "admin" ? "Administrador" : "Aluno"}</span>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <NavLink to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed left-4 top-4 z-40 md:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
};

export default Sidebar;
