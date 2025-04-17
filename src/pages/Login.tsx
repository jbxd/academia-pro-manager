
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { UserPlus, Mail, Lock, User, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const Login: React.FC = () => {
  const { login, register, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Credenciais inválidas. Tente novamente.");
    }
  };
  
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Instruções de recuperação enviadas para ${forgotEmail}`);
    setActiveTab("login");
  };

  const handleRegisterClick = () => {
    setIsRegisterDialogOpen(true);
  };

  // Register form schema
  const registerFormSchema = z.object({
    name: z.string().min(3, { message: "Nome precisa ter no mínimo 3 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(6, { message: "Senha precisa ter no mínimo 6 caracteres" }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

  type RegisterFormValues = z.infer<typeof registerFormSchema>;

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onRegisterSubmit = async (values: RegisterFormValues) => {
    try {
      await register(values.email, values.password, values.name);
      setIsRegisterDialogOpen(false);
      toast.success("Cadastro realizado com sucesso! Você já pode fazer login.");
    } catch (error: any) {
      toast.error(error.message || "Erro ao fazer cadastro");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-red-900 to-black p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Team of Monsters</h1>
          <p className="text-white/70">Sistema de Gerenciamento</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "forgot")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="forgot">Esqueci a senha</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Acesso ao sistema</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Digite suas credenciais para entrar no sistema
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Senha</Label>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between items-center">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleRegisterClick}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Cadastro
                  </Button>
                  <Button type="submit" className="w-1/2" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            <div className="mt-4 text-center text-sm">
              <p className="text-white/70">
                Use para teste:
                <br />
                Admin: admin@academia.com / admin123
                <br />
                Aluno: student@email.com / student123
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="forgot">
            <Card>
              <CardHeader>
                <CardTitle>Recuperar senha</CardTitle>
                <CardDescription>
                  Enviaremos instruções de recuperação para seu email
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleForgotPassword}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="forgot-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="forgot-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Enviar instruções
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Registration Dialog */}
      <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cadastro de nova conta</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para criar sua conta
            </DialogDescription>
          </DialogHeader>
          
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <FormField
                control={registerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input placeholder="João Silva" className="pl-10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input type="email" placeholder="seu@email.com" className="pl-10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme a senha</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsRegisterDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cadastrando...
                    </>
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
