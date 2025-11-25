import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InstagramGate } from "@/components/InstagramGate";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";

const Downloads = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasFollowed, setHasFollowed] = useState(false);

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleDownload = () => {
    toast({
      title: "Download iniciado",
      description: "Os workflows do n8n estão sendo baixados...",
    });
  };

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Step 1: No user and hasn't followed Instagram
  if (!user && !hasFollowed) {
    return (
      <div className="min-h-screen bg-gradient-hero p-6">
        <div className="max-w-2xl mx-auto space-y-8 py-16">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
              Quase lá!
            </h1>
            <p className="text-xl text-muted-foreground">
              Siga-nos no Instagram para continuar o download
            </p>
          </div>

          <InstagramGate onFollowed={() => setHasFollowed(true)} />
        </div>
      </div>
    );
  }

  // Step 2: Followed Instagram but not logged in
  if (!user && hasFollowed) {
    return (
      <div className="min-h-screen bg-gradient-hero p-6">
        <div className="max-w-2xl mx-auto space-y-8 py-16">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
              Última Etapa!
            </h1>
            <p className="text-xl text-muted-foreground">
              Faça login com Google para baixar os workflows
            </p>
          </div>

          <Card className="p-8 shadow-soft text-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">
                  Faça Login para Continuar
                </h2>
                <p className="text-muted-foreground">
                  Use sua conta Google para acessar os downloads
                </p>
              </div>
              <GoogleAuthButton />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Step 3: Logged in - show download
  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-4xl mx-auto space-y-8 py-16">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Parabéns! 🎉
          </h1>
          <p className="text-xl text-muted-foreground">
            Seus workflows estão prontos para download
          </p>
        </div>

        {/* Download Card */}
        <Card className="p-8 shadow-glow bg-gradient-to-br from-card to-card/50">
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary">
              <Download className="h-8 w-8 text-primary-foreground" />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">
                Workflows n8n - Coleção Completa
              </h2>
              <p className="text-muted-foreground mb-4">
                Workflows prontos para automatizar seus processos. Inclui
                exemplos de automação, integrações e muito mais.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium">
                  Automação
                </span>
                <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium">
                  Integrações
                </span>
                <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium">
                  APIs
                </span>
                <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium">
                  Webhooks
                </span>
              </div>
            </div>

            <Button
              onClick={handleDownload}
              size="lg"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold text-lg px-8"
            >
              <Download className="mr-2 h-5 w-5" />
              Baixar Workflows Agora
            </Button>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3 text-center">Como usar os workflows?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground max-w-2xl mx-auto">
            <li>✓ Instale o n8n na sua máquina ou use a versão cloud</li>
            <li>✓ Importe os arquivos .json no seu workspace</li>
            <li>✓ Configure as credenciais necessárias</li>
            <li>✓ Execute e personalize conforme sua necessidade</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Downloads;
