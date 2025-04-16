
import React from "react";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  CreditCard,
  Building,
  MessageSquare,
  Info,
  HelpCircle,
} from "lucide-react";
import AppLayout from "@/components/layouts/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

const Settings = () => {
  const { user } = useAuth();

  return (
    <AppLayout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações do Team Of Monsters
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            {user?.role === "admin" && (
              <>
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="general">Geral</TabsTrigger>
                <TabsTrigger value="payment">Pagamentos</TabsTrigger>
                <TabsTrigger value="notifications">Notificações</TabsTrigger>
                <TabsTrigger value="security">Segurança</TabsTrigger>
                <TabsTrigger value="company">Empresa</TabsTrigger>
                <TabsTrigger value="integrations">Integrações</TabsTrigger>
              </>
            )}
            {user?.role === "student" && (
              <>
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="notifications">Notificações</TabsTrigger>
                <TabsTrigger value="security">Segurança</TabsTrigger>
                <TabsTrigger value="payment">Pagamento</TabsTrigger>
                <TabsTrigger value="help">Ajuda</TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Perfil</CardTitle>
                <CardDescription>
                  Gerencie suas informações pessoais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Aqui você pode atualizar suas informações pessoais, foto de perfil e outras configurações relacionadas ao seu perfil.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {user?.role === "admin" && (
            <>
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações Gerais</CardTitle>
                    <CardDescription>
                      Configurações gerais do sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Aqui você pode configurar definições gerais do sistema, como idioma, fuso horário e outras preferências.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="company">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações da Empresa</CardTitle>
                    <CardDescription>
                      Informações e configurações da academia
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Aqui você pode atualizar as informações da academia, como nome, endereço, logo e informações de contato.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations">
                <Card>
                  <CardHeader>
                    <CardTitle>Integrações</CardTitle>
                    <CardDescription>
                      Gerencie integrações com outros sistemas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Aqui você pode configurar integrações com sistemas de pagamento, notificações e outras plataformas.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Notificações</CardTitle>
                <CardDescription>
                  Gerencie como você recebe alertas e notificações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Aqui você pode configurar suas preferências de notificação, como alertas por e-mail, SMS ou no aplicativo.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Segurança</CardTitle>
                <CardDescription>
                  Gerencie sua senha e segurança da conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Aqui você pode atualizar sua senha, configurar autenticação de dois fatores e outras configurações de segurança.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Pagamento</CardTitle>
                <CardDescription>
                  {user?.role === "admin"
                    ? "Configure métodos de pagamento e processadores"
                    : "Configure seus métodos de pagamento e preferências"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    {user?.role === "admin"
                      ? "Aqui você pode configurar integrações com processadores de pagamento, taxas, e outras configurações financeiras."
                      : "Aqui você pode adicionar ou remover cartões de crédito, configurar pagamentos recorrentes e gerenciar suas preferências de pagamento."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {user?.role === "student" && (
            <TabsContent value="help">
              <Card>
                <CardHeader>
                  <CardTitle>Ajuda e Suporte</CardTitle>
                  <CardDescription>
                    Obtenha ajuda e respostas para suas dúvidas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Aqui você encontra respostas para perguntas frequentes, tutoriais e pode entrar em contato com o suporte.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
