import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "sonner";

type UserRole = "admin" | "student";

interface UserAuth {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: UserAuth | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string, role?: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  session: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// Mock data for demonstration purposes
const MOCK_USERS = [
  {
    id: "admin1",
    email: "admin@academia.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as UserRole,
    avatar: "/assets/admin-avatar.jpg",
  },
  {
    id: "student1",
    email: "student@email.com",
    password: "student123",
    name: "João Silva",
    role: "student" as UserRole,
    avatar: "/assets/student-avatar.jpg",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAuth | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        if (currentSession?.user) {
          fetchUserData(currentSession.user);
        } else {
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    const initAuth = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      
      if (currentSession?.user) {
        await fetchUserData(currentSession.user);
      } else {
        // Check if we have saved mock user in localStorage
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setUsingMockData(true);
        }
      }
      
      setIsLoading(false);
    };

    initAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserData = async (supabaseUser: User) => {
    try {
      // Instead of using RPC which is causing issues, try using a simpler approach
      // We'll try a few different methods in sequence to get user data
      
      // First, try a direct fetch using the REST API
      try {
        // Get Supabase URL and key from the environment or from the window object
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vedrtlglkvzcdxdjjjgy.supabase.co';
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZHJ0bGdsa3Z6Y2R4ZGpqamd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzQ0MzUsImV4cCI6MjA2MDQxMDQzNX0.PxGL1A2SVdaGRmMJFQscFiV9nymCzFdIwdReElW8TYU';
        
        const response = await fetch(`${supabaseUrl}/rest/v1/user_auth?id=eq.${supabaseUser.id}`, {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          if (userData && userData.length > 0) {
            const userRole = userData[0].role || 'student';
            
            setUser({
              id: supabaseUser.id,
              email: supabaseUser.email || '',
              name: (supabaseUser.user_metadata?.name as string) || supabaseUser.email?.split('@')[0] || '',
              role: userRole as UserRole,
              avatar: supabaseUser.user_metadata?.avatar_url,
            });
            setUsingMockData(false);
            return;
          }
        }
      } catch (fetchError) {
        console.error("Error fetching user data via REST:", fetchError);
      }
      
      // If direct fetch fails, try to get user role from profiles table which is in the types
      try {
        // Fixed: Use proper typing for profiles table query
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('id')  // Changed this to select 'id' which we know exists
          .eq('id', supabaseUser.id)
          .maybeSingle();
          
        if (profileData) {
          // Since profile exists but may not have role field, use default role
          setUser({
            id: supabaseUser.id,
            email: supabaseUser.email || '',
            name: (supabaseUser.user_metadata?.name as string) || supabaseUser.email?.split('@')[0] || '',
            role: 'student', // Default role
            avatar: supabaseUser.user_metadata?.avatar_url,
          });
          setUsingMockData(false);
          return;
        }
      } catch (profileError) {
        console.error("Error fetching profile data:", profileError);
      }
      
      // If all else fails, fallback to mock data if available
      const mockUser = MOCK_USERS.find(u => u.email === supabaseUser.email);
      if (mockUser) {
        const { password: _, ...userWithoutPassword } = mockUser;
        setUser(userWithoutPassword);
        setUsingMockData(true);
      } else {
        // Create basic user object from Supabase data
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: supabaseUser.email?.split('@')[0] || '',
          role: 'student',
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Fallback to mock data if available
      const mockUser = MOCK_USERS.find(u => u.email === supabaseUser.email);
      if (mockUser) {
        const { password: _, ...userWithoutPassword } = mockUser;
        setUser(userWithoutPassword);
        setUsingMockData(true);
      } else {
        // Create basic user object from Supabase data
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: supabaseUser.email?.split('@')[0] || '',
          role: 'student',
        });
      }
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // First try to login with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If Supabase login fails, fall back to mock users for demo
        console.log("Supabase login failed, trying mock users");
        
        const foundUser = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );
        
        if (!foundUser) {
          throw new Error("Credenciais inválidas");
        }
        
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        setUsingMockData(true);
      }
      
    } catch (error: any) {
      console.error("Login error:", error.message);
      setIsLoading(false);
      throw new Error(error.message || "Erro ao fazer login");
    }
    
    setIsLoading(false);
  };

  const register = async (email: string, password: string, name: string, role: UserRole = "student") => {
    setIsLoading(true);
    
    try {
      // Register with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      });

      if (error) throw error;
      
      toast.success("Cadastro realizado com sucesso! Verifique seu email para confirmar.");
      
    } catch (error: any) {
      console.error("Registration error:", error);
      setIsLoading(false);
      throw new Error(error.message || "Erro ao fazer cadastro");
    }
    
    setIsLoading(false);
  };

  const logout = async () => {
    if (usingMockData) {
      // For mock data, just clear local storage
      localStorage.removeItem("user");
      setUser(null);
      setUsingMockData(false);
    } else {
      // For Supabase auth
      await supabase.auth.signOut();
      // Session and user will be cleared by the onAuthStateChange listener
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
