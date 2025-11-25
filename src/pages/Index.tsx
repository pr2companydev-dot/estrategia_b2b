import { Download, Workflow, Zap, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const workflows = [
    {
      id: 1,
      title: "Automação de E-mails",
      description: "Envio automático de e-mails personalizados com triggers",
      tags: ["Email", "Automação", "Marketing"],
    },
    {
      id: 2,
      title: "Integração com APIs",
      description: "Conecte diferentes APIs e sincronize dados automaticamente",
      tags: ["API", "Integração", "Dados"],
    },
    {
      id: 3,
      title: "Webhooks e Notificações",
      description: "Receba e processe webhooks com notificações em tempo real",
      tags: ["Webhook", "Notificação", "Real-time"],
    },
    {
      id: 4,
      title: "Processamento de Dados",
      description: "Transforme e processe grandes volumes de dados",
      tags: ["Dados", "ETL", "Processamento"],
    },
  ];

  const handleDownload = () => {
    navigate("/downloads");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary shadow-glow mb-4">
            <Workflow className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Workflows n8n
            </span>
            <br />
            Gratuitos para Você
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Automatize seus processos com workflows prontos para usar.
            Baixe gratuitamente e comece a automatizar hoje mesmo!
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="text-center space-y-2 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <Download className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold">Download Gratuito</h3>
            <p className="text-sm text-muted-foreground">
              Acesso completo aos workflows
            </p>
          </div>
          
          <div className="text-center space-y-2 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <Zap className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold">Fácil de Usar</h3>
            <p className="text-sm text-muted-foreground">
              Importe e customize rapidamente
            </p>
          </div>
          
          <div className="text-center space-y-2 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <Workflow className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold">Pronto para Produção</h3>
            <p className="text-sm text-muted-foreground">
              Workflows testados e funcionais
            </p>
          </div>
        </div>

        {/* Workflows Grid */}
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Workflows Disponíveis</h2>
            <p className="text-muted-foreground">
              Explore nossa coleção de automações prontas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {workflows.map((workflow) => (
              <Card
                key={workflow.id}
                className="p-6 hover:shadow-glow transition-all duration-300 cursor-pointer bg-card/80 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-primary shrink-0">
                    <FileJson className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-2">
                      {workflow.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {workflow.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {workflow.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-muted rounded-md text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center pt-8">
            <Card className="inline-block p-8 shadow-soft">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">
                  Pronto para Começar?
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Clique no botão abaixo para baixar todos os workflows gratuitamente
                </p>
                <Button
                  onClick={handleDownload}
                  size="lg"
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold text-lg px-8"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Baixar Workflows Grátis
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
